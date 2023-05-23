import React, { useState } from 'react';
import * as S from './StyledToolBar';
import eraserIcon from '../assets/eraser.svg';
import penIcon from '../assets/pen.svg';
import redoIcon from '../assets/redo.svg';
import undoIcon from '../assets/undo.svg';
import strokeLight from '../assets/stroke-light.svg';
import strokeMedium from '../assets/stroke-medium.svg';
import strokeBold from '../assets/stroke-bold.svg';

const ToolBar = ({ setBrushColor, setStrokeWidth, setMode, handleUndo, handleRedo }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeStrokeWidth, setActiveStrokeWidth] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const colorArray = ['#000000', '#FFFFFF', '#CF3F41', '#2D66CB', '#E6B649', '#479734'];
  const strokeWidths = [5, 10, 15];
  const toolbarButtons = [
    { tool: 'brush', icon: penIcon },
    { tool: 'eraser', icon: eraserIcon },
    { tool: 'undo', icon: undoIcon },
    { tool: 'redo', icon: redoIcon },
  ];

  // stroke 굵기 확정되면 수정하기
  const getStrokeIcon = (width) => {
    if (width === 5) {
      return strokeLight;
    } else if (width === 10) {
      return strokeMedium;
    } else if (width === 15) {
      return strokeBold;
    }
    return strokeLight;
  };

  const handleButtonClick = (tool) => {
    if (tool === 'undo') {
      handleUndo();
      setActiveButton('undo');
    } else if (tool === 'redo') {
      handleRedo();
      setActiveButton('redo');
    } else {
      setActiveButton((prevTool) => (prevTool === tool ? null : tool));
      setMode(tool);
    }
  };

  const handleColorCircleClick = (color) => {
    setActiveColor((prevColor) => (prevColor === color ? null : color));
    setBrushColor(color);
  };

  const handleStrokeButtonClick = (width) => {
    setActiveStrokeWidth((prevWidth) => (prevWidth === width ? null : width));
    setStrokeWidth(width);
  };

  return (
    <S.DesignbarWrapper>
      <S.ToolWrapper>
        {toolbarButtons.map((button) => (
          <button
            key={button.tool}
            type='button'
            onClick={() => handleButtonClick(button.tool)}
            className={activeButton === button.tool ? 'active' : ''}
          >
            <img src={button.icon} alt={button.tool} />
          </button>
        ))}
      </S.ToolWrapper>

      {activeButton === 'brush' && (
        <S.SidebarWrapper className='sidebar'>
          <S.StrokeWrapper>
            {strokeWidths.map((width) => (
              <button
                key={width}
                type='button'
                onClick={() => handleStrokeButtonClick(width)}
                className={activeStrokeWidth === width ? 'active' : ''}
              >
                <img src={getStrokeIcon(width)} alt={`stroke-${width}`} />
              </button>
            ))}
          </S.StrokeWrapper>
          <S.ColorWrapper>
            {colorArray.map((color, index) => (
              <S.ColorChip
                key={index}
                onClick={() => handleColorCircleClick(color)}
                className={activeColor === color ? 'active' : ''}
              >
                <S.ColorCircle
                  style={{
                    backgroundColor: color,
                    border: color === '#FFFFFF' ? '1px solid #646464' : null,
                  }}
                />
              </S.ColorChip>
            ))}
          </S.ColorWrapper>
        </S.SidebarWrapper>
      )}
    </S.DesignbarWrapper>

    // <button type='button' onClick={handleColorButtonClick}>
    //   Color
    // </button>
    // {showColorPicker && <CirclePicker onChangeComplete={handleChange} />}
  );
};

export default ToolBar;
