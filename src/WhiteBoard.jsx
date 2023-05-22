import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingCanvas = () => {
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [lines, setLines] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const pos = e.target.getStage().getPointerPosition();
    setCoordinates({ x: pos.x, y: pos.y });
    const newLine = {
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation: mode === 'brush' ? 'source-over' : 'destination-out',
      lineCap: 'round',
      lineJoin: 'round',
      points: [pos.x, pos.y, pos.x, pos.y],
    };
    setLines((prevLines) => [...prevLines, newLine]);
  };

  const handleMouseUp = () => {
    setIsPaint(false);
  };

  const handleMouseMove = (e) => {
    if (!isPaint) return;

    const stage = stageRef.current;
    stage.setPointersPositions(e.evt);
    const pos = e.target.getStage().getPointerPosition();
    setCoordinates({ x: pos.x, y: pos.y });
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      const lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = [...lastLine.points, pos.x, pos.y];
      return updatedLines;
    });
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  console.log(coordinates);

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
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line key={index} {...line} />
          ))}
        </Layer>
      </Stage>
      <div>
        Current Coordinates: X: {coordinates.x}, Y: {coordinates.y}
      </div>
    </>
  );
};

export default DrawingCanvas;
