import * as $ from 'jquery';

$(() => {
  const interval = 100;
  let container = <HTMLElement>document.querySelector('.container');
  let direction = 'up';

  const getRotationDeg = (degree: number) => {
    if (direction === 'up') {
      if (degree < 179) {
        degree = degree + 1;
      } else {
        direction = 'down';
      }
    }

    if (direction === 'down') {
      if (degree > 0) {
        degree = degree - 1;
      } else {
        direction = 'up';
      }
    }

    return degree;
  };

  const rotateDeg = () => {
    let styles = getComputedStyle(container).getPropertyValue('background');
    const startIndex = styles.lastIndexOf('gradient(') + 9;
    const stopIndex = styles.lastIndexOf('deg');
    let oldDeg = styles.substr(startIndex, stopIndex - startIndex);
    let deg = parseInt(oldDeg, 10);
    
    deg = getRotationDeg(deg);

    const degStr = deg === 0 ? '0' : deg.toString();
    console.log(degStr);
    styles = styles.replace(oldDeg, degStr);
    container.style.background = styles;
  };

  setInterval(rotateDeg, interval);
});
