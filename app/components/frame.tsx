import React, { useRef, useEffect } from 'react';

const drawMandelbrot = (ctx: CanvasRenderingContext2D) => {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;
	const maxIter = 100;
	const zoom = 150;

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let zx = 0;
			let zy = 0;
			const cx = (x - width / 2) / zoom;
			const cy = (y - height / 2) / zoom;
			let iter = maxIter;

			while (zx * zx + zy * zy < 4 && iter > 0) {
				const tmp = zx * zx - zy * zy + cx;
				zy = 2.0 * zx * zy + cy;
				zx = tmp;
				iter--;
			}

			const color =
				iter === 0
					? 'black'
					: `hsl(${(360 * iter) / maxIter}, 100%, 50%)`;
			ctx.fillStyle = color;
			ctx.fillRect(x, y, 1, 1);
		}
	}
};

const Frame: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			if (context) {
				drawMandelbrot(context);
			}
		}
	}, []);

	return <canvas ref={canvasRef} width="800" height="600"></canvas>;
};

export default Frame;
