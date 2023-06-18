import { KonvaEventObject } from 'konva/lib/Node';
import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
// import { io, Socket } from 'socket.io-client';
import ToolBar from '../ToolBar/ToolBar';
import * as S from './StyledWhiteBoard';

interface Lines {
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
  mode: string;
}

const WhiteBoard: React.FC = () => {
  const [isDraw, setIsDraw] = useState(false);
  const [mode, setMode] = useState('pen');
  const [lines, setLines] = useState<Lines[][]>([]);
  const [currentLine, setCurrentLine] = useState<Lines[]>([]);
  const [penColor, setPenColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [undoneItem, setUndoneItem] = useState<Lines[] | null>(null);
  const stageRef = useRef<any>(null);
  // const socketRef = useRef<Socket | null>(null);

  // useEffect(() => {
  //   //마운트될 때 서버에 연결하고, 언마운트될 때 연결 해제
  //   socketRef.current = io();

  //   return () => {
  //     socketRef.current?.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   // lines 업데이트될 때마다 서버로 전송
  //   socketRef.current?.emit('updatedLine', lines);
  // }, [lines]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    setIsDraw(true);
    const pos = e.target.getStage()?.getPointerPosition() ?? { x: 0, y: 0 };
    setCurrentLine([
      { x: pos.x, y: pos.y, stroke: penColor, strokeWidth: strokeWidth, mode: mode },
    ]);
  };

  const handleMouseUp = () => {
    setIsDraw(false);
    setLines((prevLines) => [...prevLines, currentLine]);
    setCurrentLine([]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDraw) return;

    const stage = stageRef.current;
    if (stage) {
      stage.setPointersPositions(e.evt);
      const pos = e.target.getStage()?.getPointerPosition() ?? { x: 0, y: 0 };
      setCurrentLine((prevLine) => [
        ...prevLine,
        { x: pos.x, y: pos.y, stroke: penColor, strokeWidth: strokeWidth, mode: mode },
      ]);
    }
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

  return (
    <S.WhiteboardWrapper>
      <S.ToolbarWrapper>
        <ToolBar
          setPenColor={setPenColor}
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

export default WhiteBoard;
