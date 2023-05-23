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
  const colorArray = ['#000000', '#FFFFFF', '#CF3F41', '#2D66CB', '#E6B649', '#479734'];

  const handleButtonClick = (tool) => {
    if (tool === 'undo') {
      handleUndo();
    } else if (tool === 'redo') {
      handleRedo();
    } else {
      setActiveButton(tool === activeButton ? null : tool);
      setMode(tool);
    }
  };

  const handleColorCircleClick = (color) => {
    setBrushColor(color);
  };

  const handleStrokeButtonClick = (width) => {
    setStrokeWidth(width);
  };

  return (
    <S.DesignbarWrapper>
      <S.ToolWrapper>
        <button
          type='button'
          onClick={() => handleButtonClick('brush')}
          className={activeButton === 'brush' ? 'active' : ''}
        >
          <img src={penIcon} alt='pen' />
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick('eraser')}
          className={activeButton === 'eraser' ? 'active' : ''}
        >
          <img src={eraserIcon} alt='eraser' />
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick('undo')}
          className={activeButton === 'undo' ? 'active' : ''}
        >
          <img src={undoIcon} alt='undo' />
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick('redo')}
          className={activeButton === 'redo' ? 'active' : ''}
        >
          <img src={redoIcon} alt='redo' />
        </button>
      </S.ToolWrapper>

      {activeButton === 'brush' && (
        <S.SidebarWrapper className='sidebar'>
          <S.StrokeWrapper>
            <button type='button' onClick={() => handleStrokeButtonClick(5)}>
              <img src={strokeLight} alt='strokeLight' />
            </button>
            <button type='button' onClick={() => handleStrokeButtonClick(10)}>
              <img src={strokeMedium} alt='strokeMedium' />
            </button>
            <button type='button' onClick={() => handleStrokeButtonClick(15)}>
              <img src={strokeBold} alt='strokeBold' />
            </button>
          </S.StrokeWrapper>
          <div>
            <S.ColorWrapper>
              {colorArray.map((color, index) => (
                <S.ColorChip key={index}>
                  <S.ColorCircle
                    style={{
                      backgroundColor: color,
                      border: color === '#FFFFFF' ? '1px solid #646464' : null,
                    }}
                    onClick={() => handleColorCircleClick(color)}
                  />
                </S.ColorChip>
              ))}
            </S.ColorWrapper>
          </div>
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
