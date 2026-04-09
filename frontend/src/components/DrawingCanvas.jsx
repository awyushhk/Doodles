import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import DrawingToolbar from "./DrawingToolbar";
import "./styles/DrawingCanvas.css";

const CANVAS_W = 800;
const CANVAS_H = 600;

const DrawingCanvas = ({ socket, room }) => {
  const { activeDrawer } = useGame();
  const isMyTurn = socket && activeDrawer === socket.id;

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevPointRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    contextRef.current = ctx;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  useEffect(() => {
    if (!socket) return;
    socket.on("draw_from_server", ({ prevX, prevY, x, y, color: c, lineWidth: lw }) => {
      const ctx = contextRef.current;
      const savedColor = ctx.strokeStyle;
      const savedLw = ctx.lineWidth;
      ctx.strokeStyle = c;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.strokeStyle = savedColor;
      ctx.lineWidth = savedLw;
    });
    
    socket.on("clear_canvas", () => {
      const ctx = contextRef.current;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    });

    return () => {
      socket.off("draw_from_server");
      socket.off("clear_canvas");
    };
  }, [socket]);

  const toCanvasCoords = (canvas, clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (CANVAS_W / rect.width),
      y: (clientY - rect.top) * (CANVAS_H / rect.height),
    };
  };

  const getCoordinates = (nativeEvent) => {
    if (nativeEvent.touches && nativeEvent.touches.length > 0) {
      return { clientX: nativeEvent.touches[0].clientX, clientY: nativeEvent.touches[0].clientY };
    }
    return { clientX: nativeEvent.clientX, clientY: nativeEvent.clientY };
  };

  const startDrawing = ({ nativeEvent }) => {
    if (!isMyTurn) return;
    const { clientX, clientY } = getCoordinates(nativeEvent);
    const { x, y } = toCanvasCoords(canvasRef.current, clientX, clientY);
    prevPointRef.current = { x, y };
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !isMyTurn) return;
    const { clientX, clientY } = getCoordinates(nativeEvent);
    const { x, y } = toCanvasCoords(canvasRef.current, clientX, clientY);
    const prev = prevPointRef.current;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    socket.emit("draw", { room, prevX: prev?.x, prevY: prev?.y, x, y, color, lineWidth });
    prevPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    prevPointRef.current = null;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!isMyTurn) return;
    const ctx = contextRef.current;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    socket.emit("clear_canvas", { room });
  };

  return (
    <>
      <DrawingToolbar 
        isMyTurn={isMyTurn}
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        clearCanvas={clearCanvas}
      />
      <div className="dc-canvas-wrap">
        <canvas ref={canvasRef} className={`dc-canvas ${isMyTurn ? "can-draw" : "no-draw"}`}
          onMouseDown={startDrawing} onMouseMove={draw}
          onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
          onTouchStart={startDrawing} onTouchMove={draw}
          onTouchEnd={stopDrawing} onTouchCancel={stopDrawing} />
      </div>
    </>
  );
};

export default DrawingCanvas;
