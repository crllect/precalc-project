import React, { useState } from 'react';
import Frame from './frame';
import Menu from './menu';

const FrameContainer: React.FC = () => {
  const [settings, setSettings] = useState({ resolution: 1, maxIter: 100, zoom: 1 });

  const updateSettings = (resolution: number, maxIter: number, zoom: number) => {
    setSettings({ resolution, maxIter, zoom });
  };

  return (
    <div className='!z-10 absolute'>
      <Menu {...settings} updateSettings={updateSettings} />
      <Frame {...settings} />
    </div>
  );
};

export default FrameContainer;
