import React, { useState } from 'react';

interface CameraShift {
	x: number;
	y: number;
}

interface SettingsProps {
	resolution: number;
	maxIter: number;
	zoom: number;
	shift: CameraShift;
	updateSettings: (
		resolution: number,
		maxIter: number,
		zoom: number,
		shift: CameraShift
	) => void;
}

const Menu: React.FC<SettingsProps> = ({
	resolution,
	maxIter,
	zoom,
	shift,
	updateSettings
}) => {
	const [tempResolution, setTempResolution] = useState(resolution);
	const [tempMaxIter, setTempMaxIter] = useState(maxIter);
	const [tempZoom, setTempZoom] = useState(zoom);
	const [tempShiftX, setTempShiftX] = useState(shift.x);
	const [tempShiftY, setTempShiftY] = useState(shift.y);

	const handleResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempResolution(parseInt(e.target.value));
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
		updateSettings(tempResolution, tempMaxIter, tempZoom, {
			x: tempShiftX,
			y: tempShiftY
		});
	};

	return (
		<div>
			<label>
				Resolution:
				<input
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempResolution}
					onChange={handleResolutionChange}
				/>
			</label>
			<label>
				Max Iterations:
				<input
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempMaxIter}
					onChange={handleMaxIterChange}
				/>
			</label>
			<label>
				Zoom:
				<input
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					step="0.1"
					value={tempZoom}
					onChange={handleZoomChange}
				/>
			</label>
			<label>
				Shift X:
				<input
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempShiftX}
					onChange={handleShiftXChange}
				/>
			</label>
			<label>
				Shift Y:
				<input
					className="border-2 border-black rounded-md p-1 m-1 text-black bg-white"
					type="number"
					value={tempShiftY}
					onChange={handleShiftYChange}
				/>
			</label>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};

export default Menu;
