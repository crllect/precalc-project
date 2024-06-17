import React, { useState } from 'react';
import Frame from './frame';
import Menu from './menu';

interface CameraShift {
	x: number;
	y: number;
}

const FrameContainer: React.FC = () => {
	const [settings, setSettings] = useState({
		resolution: 1,
		canvasSize: 1600,
		maxIter: 50,
		zoom: 3,
		shift: { x: 0, y: 0 }
	});
	const [showCrosshair, setShowCrosshair] = useState(false);

	const updateSettings = (
		resolution: number,
		canvasSize: number,
		maxIter: number,
		zoom: number,
		shift: CameraShift
	) => {
		setSettings({ resolution, canvasSize, maxIter, zoom, shift });
	};

	const updateCrosshair = (show: boolean) => {
		setShowCrosshair(show);
	};

	return (
		<div className="!z-10 container">
			<div className="flex flex-row">
				<div className="">
					<Frame {...settings} showCrosshair={showCrosshair} />
				</div>
				<div className="menuContainer">
					<Menu
						{...settings}
						showCrosshair={showCrosshair}
						updateSettings={updateSettings}
						updateCrosshair={updateCrosshair}
					/>
				</div>
			</div>
		</div>
	);
};

export default FrameContainer;
