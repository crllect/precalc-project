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
		maxIter: 100,
		zoom: 5,
		shift: { x: 0, y: 0 }
	});

	const updateSettings = (
		resolution: number,
		maxIter: number,
		zoom: number,
		shift: CameraShift
	) => {
		setSettings({ resolution, maxIter, zoom, shift });
	};

	return (
		<div className="!z-10 absolute">
			<Menu {...settings} updateSettings={updateSettings} />
			<Frame {...settings} />
		</div>
	);
};

export default FrameContainer;
