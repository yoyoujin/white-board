import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import ToolBar from './ToolBar';

const DrawingCanvas = () => {
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine([{ x: pos.x, y: pos.y }]);
  };

  const handleMouseUp = () => {
    setIsPaint(false);
    setLines((prevLines) => [...prevLines, currentLine]);
    setCurrentLine([]);
  };

  const handleMouseMove = (e) => {
    if (!isPaint) return;

    const stage = stageRef.current;
    stage.setPointersPositions(e.evt);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine((prevLine) => [...prevLine, { x: pos.x, y: pos.y }]);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  console.log(lines);
  console.log(currentLine);

  return (
    <>
      <ToolBar />
      <div>
        Tool:
        <select id='tool' value={mode} onChange={handleModeChange}>
          <option value='brush'>Brush</option>
          <option value='eraser'>Eraser</option>
        </select>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 25}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.flatMap(({ x, y }) => [x, y])}
              stroke='#df4b26'
              strokeWidth={5}
              lineCap='round'
              lineJoin='round'
            />
          ))}
          {currentLine.length > 0 && (
            <Line
              points={currentLine.flatMap(({ x, y }) => [x, y])}
              stroke='#df4b26'
              strokeWidth={5}
              lineCap='round'
              lineJoin='round'
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default DrawingCanvas;
