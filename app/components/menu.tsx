import React, { useState } from 'react';

interface SettingsProps {
	resolution: number;
	maxIter: number;
	zoom: number;
	updateSettings: (resolution: number, maxIter: number, zoom: number) => void;
}

const Menu: React.FC<SettingsProps> = ({
	resolution,
	maxIter,
	zoom,
	updateSettings
}) => {
	// Local state to hold temporary values before submission
	const [tempResolution, setTempResolution] = useState(resolution);
	const [tempMaxIter, setTempMaxIter] = useState(maxIter);
	const [tempZoom, setTempZoom] = useState(zoom);

	// Handlers to update local state
	const handleResolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempResolution(parseInt(e.target.value));
	};

	const handleMaxIterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempMaxIter(parseInt(e.target.value));
	};

	const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempZoom(parseFloat(e.target.value));
	};

	// Submit handler to update the parent component's state
	const handleSubmit = () => {
		updateSettings(tempResolution, tempMaxIter, tempZoom);
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
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};

export default Menu;
