import React, { useState, useEffect } from 'react';

interface CameraShift {
	x: number;
	y: number;
}

interface SettingsProps {
	resolution: number;
	canvasSize: number;
	maxIter: number;
	zoom: number;
	shift: CameraShift;
	showCrosshair: boolean;
	updateSettings: (
		resolution: number,
		canvasSize: number,
		maxIter: number,
		zoom: number,
		shift: CameraShift
	) => void;
	updateCrosshair: (showCrosshair: boolean) => void;
}

const Menu: React.FC<SettingsProps> = ({
	resolution,
	canvasSize,
	maxIter,
	zoom,
	shift,
	showCrosshair,
	updateSettings,
	updateCrosshair
}) => {
	const [tempResolution, setTempResolution] = useState(resolution);
	const [tempCanvasSize, setTempCanvasSize] = useState(canvasSize);
	const [tempMaxIter, setTempMaxIter] = useState(maxIter);
	const [tempZoom, setTempZoom] = useState(zoom);
	const [tempShiftX, setTempShiftX] = useState(shift.x);
	const [tempShiftY, setTempShiftY] = useState(shift.y);

	useEffect(() => {
		const handleShowCrosshairChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			updateCrosshair(target.checked);
		};

		const crosshairCheckbox = document.getElementById(
			'crosshairCheckbox'
		) as HTMLInputElement;
		crosshairCheckbox.addEventListener('change', handleShowCrosshairChange);

		return () => {
			crosshairCheckbox.removeEventListener(
				'change',
				handleShowCrosshairChange
			);
		};
	}, [updateCrosshair]);

	const handleResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempResolution(parseInt(e.target.value));
	};

	const handleRawResolutionChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setTempCanvasSize(parseInt(e.target.value));
	};

	const handleMaxIterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempMaxIter(parseInt(e.target.value));
	};

	const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempZoom(parseFloat(e.target.value));
	};

	const handleShiftXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempShiftX(parseFloat(e.target.value));
	};

	const handleShiftYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempShiftY(parseFloat(e.target.value));
	};

	const handleSubmit = () => {
		updateSettings(tempResolution, tempCanvasSize, tempMaxIter, tempZoom, {
			x: tempShiftX,
			y: tempShiftY
		});
	};

	return (
		<div>
			<label>
				Digital Resolution:
				<input
					step="0.1"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempResolution}
					onChange={handleResolutionChange}
				/>
			</label>
			<label>
				Raw Digital Resolution:
				<input
					step="100"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempCanvasSize}
					onChange={handleRawResolutionChange}
				/>
			</label>
			<label>
				Computational Resolution:
				<input
					step="1"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempMaxIter}
					onChange={handleMaxIterChange}
				/>
			</label>
			<label>
				Zoom:
				<input
					step="10"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempZoom}
					onChange={handleZoomChange}
				/>
			</label>
			<label>
				Shift X:
				<input
					step="0.01"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempShiftX}
					onChange={handleShiftXChange}
				/>
			</label>
			<label>
				Shift Y:
				<input
					step="0.01"
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempShiftY}
					onChange={handleShiftYChange}
				/>
			</label>
			<hr />
			<button onClick={handleSubmit}>Submit</button>
			<hr />
			<label>
				Show Crosshair:
				<input
					id="crosshairCheckbox"
					type="checkbox"
					checked={showCrosshair}
					onChange={e => updateCrosshair(e.target.checked)} // Added onChange handler
				/>
			</label>
			<hr />
		</div>
	);
};

export default Menu;
