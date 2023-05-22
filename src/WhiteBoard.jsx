import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingCanvas = () => {
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const stageRef = useRef(null);
  const lastLineRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const pos = e.target.getStage().getPointerPosition();
    const newLine = {
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation: mode === 'brush' ? 'source-over' : 'destination-out',
      lineCap: 'round',
      lineJoin: 'round',
      points: [pos.x, pos.y],
    };
    setLines((prevLines) => [...prevLines, newLine]);
    lastLineRef.current = newLine;
  };

  const handleMouseMove = (e) => {
    if (!isPaint) return;

    const pos = e.target.getStage().getPointerPosition();
    const newPoints = lastLineRef.current.points.concat([pos.x, pos.y]);

    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      updatedLines[prevLines.length - 1].points = newPoints;
      return updatedLines;
    });
  };

  const handleMouseUp = () => {
    setIsPaint(false);
    lastLineRef.current = null;
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
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
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line key={index} {...line} />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default DrawingCanvas;
