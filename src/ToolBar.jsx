import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

const ToolBar = ({ setBrushColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorButtonClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChange = (e) => {
    setBrushColor(e.hex);
  };

  return (
    <div>
      <button>Brush</button>
      <button>Eraser</button>
      <button>Stroke</button>
      <button onClick={handleColorButtonClick}>Color</button>
      <button>Undo</button>
      <button>Redo</button>
      {showColorPicker && <CirclePicker onChangeComplete={handleChange} />}
    </div>
  );
};

export default ToolBar;
