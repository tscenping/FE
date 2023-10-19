import React, { useEffect } from 'react';

const CanvasRect = (): JSX.Element => {
  useEffect(() => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      // Set the rectangle color
      context.fillStyle = 'blue';

      // Draw a rectangle
      context.fillRect(100, 100, 100, 100);
    }
  }, []);

  return (
    <canvas id="myCanvas" width={300} height={300}></canvas>
  );
};

export default CanvasRect;
