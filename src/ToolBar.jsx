import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

const ToolBar = ({ setBrushColor, setMode }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleModeChange = (changeMode) => {
    setMode(changeMode);
  };

  const handleColorButtonClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChange = (e) => {
    setBrushColor(e.hex);
  };

  return (
    <div>
      <button onClick={handleModeChange}>Brush</button>
      <button onClick={handleModeChange}>Eraser</button>
      <button>Stroke</button>
      <button onClick={handleColorButtonClick}>Color</button>
      <button>Undo</button>
      <button>Redo</button>
      {showColorPicker && <CirclePicker onChangeComplete={handleChange} />}
    </div>
  );
};

export default ToolBar;
