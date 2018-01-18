const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const watchify = require('watchify');
const util = require('gulp-util');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

const watchedBrowserify = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: ['src/hues.ts'],
        cache: {},
        packageCache: {}
    }).plugin(tsify));

watchedBrowserify.on('log', util.log);

gulp.task('default', () => {
  browserSync.init({
      server: {
          baseDir: './dist'
      }
  });

  gulp.watch('./src/*.ts', ['reload:js']);
  gulp.watch('./src/*.css', ['reload:css']);
  gulp.watch('./src/*.html', ['reload:html']);
});

gulp.task('reload:js', ['js'], browserSync.reload);
gulp.task('reload:css', ['css'], browserSync.reload);
gulp.task('reload:html', ['html'], browserSync.reload);

gulp.task('js', () => {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
    return gulp.src('./src/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('img', () => {
    return gulp.src('./src/favicon.png')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['js', 'css', 'html', 'img']);
