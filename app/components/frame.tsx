import React, { useRef, useEffect } from 'react';

const drawMandelbrot = (
	ctx: CanvasRenderingContext2D,
	resolution: number,
	maxIter: number,
	zoom: number
) => {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	for (let x = 0; x < width; x += resolution) {
		for (let y = 0; y < height; y += resolution) {
			let zx = 0;
			let zy = 0;
			const cx = (x - width / 2) / zoom - 0.5;
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
			ctx.fillRect(x, y, resolution, resolution);
		}
	}
};

interface FrameProps {
	resolution: number;
	maxIter: number;
	zoom: number;
}

const Frame: React.FC<FrameProps> = ({ resolution, maxIter, zoom }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas && canvas.parentElement) {
			const context = canvas.getContext('2d');
			if (context) {
				drawMandelbrot(context, resolution, maxIter, zoom);
			}
		}
	}, [resolution, maxIter, zoom]); // Re-render when these props change

	return (
		<canvas
			className="fractalCanvas"
			ref={canvasRef}
			width="2000"
			height="2000"></canvas>
	);
};

export default Frame;
