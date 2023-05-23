import React, { useState } from 'react';
// import { CirclePicker } from 'react-color';
import * as S from './StyledToolBar';
import eraserIcon from '../assets/eraser.svg';
import penIcon from '../assets/pen.svg';
import redoIcon from '../assets/redo.svg';
import undoIcon from '../assets/undo.svg';
import strokeLight from '../assets/stroke-light.svg';
import strokeMedium from '../assets/stroke-medium.svg';
import strokeBold from '../assets/stroke-bold.svg';

const ToolBar = ({ setBrushColor, setMode }) => {
  // const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const colorArray = ['#000000', '#FFFFFF', '#CF3F41', '#2D66CB', '#E6B649', '#479734'];

  // const handleModeChange = (changeMode) => {
  //   setMode(changeMode);
  // };

  const handleButtonClick = (tool) => {
    setActiveButton(tool === activeButton ? null : tool);
  };

  // const handleColorButtonClick = () => {
  //   setShowColorPicker(!showColorPicker);
  // };

  // const handleChange = (e) => {
  //   setBrushColor(e.hex);
  // };

  return (
    <S.ToolWrapper>
      <button
        type='button'
        onClick={() => handleButtonClick('pen')}
        className={activeButton === 'pen' ? 'active' : ''}
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

      {activeButton === 'pen' && (
        <S.SidebarWrapper>
          {/* <img src={polygon} alt='' className='polygon' /> */}
          <S.StrokeWrapper>
            <button type='button'>
              <img src={strokeLight} alt='strokeLight' />
            </button>
            <button type='button'>
              <img src={strokeMedium} alt='strokeMedium' />
            </button>
            <button type='button'>
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
                  />
                </S.ColorChip>
              ))}
            </S.ColorWrapper>
          </div>
        </S.SidebarWrapper>
      )}
    </S.ToolWrapper>

    // <button type='button' onClick={handleColorButtonClick}>
    //   Color
    // </button>
    // {showColorPicker && <CirclePicker onChangeComplete={handleChange} />}
  );
};

export default ToolBar;
