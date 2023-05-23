import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import ToolBar from './ToolBar/ToolBar';
import * as S from './StyledCanvas';

const Canvas = () => {
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [brushColor, setBrushColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState('5');
  const [undoneItem, setUndoneItem] = useState(null);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine([
      { x: pos.x, y: pos.y, stroke: brushColor, strokeWidth: strokeWidth, mode: mode },
    ]);
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
    setCurrentLine((prevLine) => [
      ...prevLine,
      { x: pos.x, y: pos.y, stroke: brushColor, strokeWidth: strokeWidth, mode: mode },
    ]);
  };

  const handleUndo = () => {
    if (lines.length === 0) {
      return;
    }

    const lastItem = lines[lines.length - 1];
    const updatedLines = lines.slice(0, -1);
    setLines(updatedLines);
    setUndoneItem(lastItem);
  };

  const handleRedo = () => {
    if (undoneItem) {
      setLines([...lines, undoneItem]);
      setUndoneItem(null);
    }
  };

  console.log(lines);

  return (
    <S.WhiteboardWrapper>
      <S.ToolbarWrapper>
        <ToolBar
          setBrushColor={setBrushColor}
          setMode={setMode}
          setStrokeWidth={setStrokeWidth}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
        />
      </S.ToolbarWrapper>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
        style={{ backgroundColor: '#494949' }}
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
              globalCompositeOperation={
                line[0].mode === 'eraser' ? 'destination-out' : 'source-over'
              }
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
    </S.WhiteboardWrapper>
  );
};

export default Canvas;
