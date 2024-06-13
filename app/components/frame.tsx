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
			const cy = (y - height / 2 + shift.y * zoom * -0.1) / zoom;

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
	canvasSize: number;
	maxIter: number;
	zoom: number;
	shift: CameraShift;
	showCrosshair: boolean;
}

const Frame: React.FC<FrameProps> = ({
	resolution,
	canvasSize,
	maxIter,
	zoom,
	shift,
	showCrosshair
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas && canvas.parentElement) {
			const context = canvas.getContext('2d');
			if (context) {
				drawMandelbrot(context, resolution, maxIter, zoom * 100, shift);
			}
		}
	}, [
		resolution,
		canvasSize,
		maxIter,
		zoom,
		shift.x,
		shift.y,
		shift,
		showCrosshair
	]);

	return (
		<div className='fractalCanvasContainer'>
			<canvas
				className="fractalCanvas"
				ref={canvasRef}
				width={canvasSize}
				height={canvasSize}></canvas>
			{showCrosshair && (
				<svg
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					style={{ zIndex: 10 }}
					width="20"
					height="20"
					viewBox="0 0 20 20">
					<line
						x1="10"
						y1="0"
						x2="10"
						y2="20"
						stroke="white"
						strokeWidth="2"
					/>
					<line
						x1="0"
						y1="10"
						x2="20"
						y2="10"
						stroke="white"
						strokeWidth="2"
					/>
				</svg>
			)}
		</div>
	);
};

export default Frame;
