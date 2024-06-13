import React, { useRef, useEffect } from 'react';

interface CameraShift {
	x: number;
	y: number;
}

const drawMandelbrot = (
	ctx: CanvasRenderingContext2D,
	resolution: number,
	maxIter: number,
	zoom: number,
	shift: CameraShift
) => {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	for (let x = 0; x < width; x += resolution) {
		for (let y = 0; y < height; y += resolution) {
			let zx = 0;
			let zy = 0;

			const cx = (x - width / 2 + shift.x * zoom * 0.1) / zoom - 0.5;
			const cy = (y - height / 2 + shift.y * zoom * 0.1) / zoom;

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
			ctx.fillRect(x, y, resolution, resolution);
		}
	}
};

interface FrameProps {
	resolution: number;
	maxIter: number;
	zoom: number;
	shift: CameraShift;
}

const Frame: React.FC<FrameProps> = ({ resolution, maxIter, zoom, shift }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas && canvas.parentElement) {
			const context = canvas.getContext('2d');
			if (context) {
				drawMandelbrot(context, resolution, maxIter, zoom * 100, shift);
			}
		}
	}, [resolution, maxIter, zoom, shift.x, shift.y, shift]);

	return (
		<canvas
			className="fractalCanvas"
			ref={canvasRef}
			width="1600" // TODO: make it so that these are props, and can be changed by menu. There will be 2 new props, canvasWidth and canvasHeight, that will be passed to the canvas element. In menu, the use can change the resolution, which will change the canvasWidth and canvasHeight. The canvas will be redrawn with the new resolution. By default it will be 2000. Even though the canvas will change, the css will keep it the same size. Ill put this in "advanced" or something, cus changing "resolution" in menu will have the same effect to the end user.
			height="1600"></canvas>
	);
};

export default Frame;
