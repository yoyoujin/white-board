import React, { useState } from 'react';
import * as S from './StyledPenSideBar';
import strokeLight from '../assets/stroke-light.svg';
import strokeMedium from '../assets/stroke-medium.svg';
import strokeBold from '../assets/stroke-bold.svg';
import polygon from '../assets/Polygon 5.png';

const PenSideBar = () => {
  const colorArray = ['000000', 'FFFFFF', 'CF3F41', '2D66CB', 'E6B649', '479734'];
  const [selectedColor, setSelectedColor] = useState('');
  console.log(selectedColor);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <S.SidebarWrapper>
      <img src={polygon} alt='' />
      <div className='strokeButton'>
        <button type='button'>
          <img src={strokeLight} alt='strokeLight' />
        </button>
        <button type='button'>
          <img src={strokeMedium} alt='strokeMedium' />
        </button>
        <button type='button'>
          <img src={strokeBold} alt='strokeBold' />
        </button>
      </div>
      <div>
        <ul>
          {colorArray.map((color) => (
            <li
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            ></li>
          ))}
        </ul>
      </div>
    </S.SidebarWrapper>
  );
};

export default PenSideBar;
