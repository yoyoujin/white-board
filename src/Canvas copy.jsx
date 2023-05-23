import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import ToolBar from './ToolBar/ToolBar';

const Canvas = () => {
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [brushColor, setBrushColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState('5');
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine([{ x: pos.x, y: pos.y, stroke: brushColor, strokeWidth: strokeWidth }]);
  };

  const handleMouseUp = () => {
    setIsPaint(false);
    const endPoint = currentLine[currentLine.length - 1];
    const updatedLines = [...lines, [...currentLine, endPoint]];
    setLines(updatedLines);
    setCurrentLine([]);
  };

  const handleMouseMove = (e) => {
    if (!isPaint) return;

    const stage = stageRef.current;
    stage.setPointersPositions(e.evt);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine((prevLine) => [
      ...prevLine,
      { x: pos.x, y: pos.y, stroke: brushColor, strokeWidth: strokeWidth },
    ]);
  };

  console.log(mode);
  console.log(lines);
  console.log(brushColor);

  return (
    <>
      <ToolBar setBrushColor={setBrushColor} setMode={setMode} setStrokeWidth={setStrokeWidth} />
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
        style={{ backgroundColor: 'pink' }}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.flatMap(({ x, y }) => [x, y])}
              stroke={line[0].stroke}
              strokeWidth={line[0].strokeWidth}
              lineCap='round'
              lineJoin='round'
              //   globalCompositeOperation={mode === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
          {currentLine.length > 0 && (
            <Line
              points={currentLine.flatMap(({ x, y }) => [x, y])}
              stroke={currentLine[0].stroke}
              strokeWidth={currentLine[0].strokeWidth}
              lineCap='round'
              lineJoin='round'
              globalCompositeOperation={mode === 'eraser' ? 'destination-out' : 'source-over'}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
