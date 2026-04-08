import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";

const DrawingCanvas = ({ socket, room }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevPointRef = useRef(null);
  
  const { activeDrawer } = useGame();
  const isMyTurn = activeDrawer === socket.id;

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("draw_from_server", (data) => {
      const { prevX, prevY, x, y } = data;

      const context = contextRef.current;

      context.beginPath();
      context.moveTo(prevX, prevY);
      context.lineTo(x, y);
      context.stroke();
    });

    socket.on("round_started", () => {
      clearCanvas();
    });

    return () => {
      socket.off("draw_from_server");
      socket.off("round_started");
    };
  }, [socket]);

  const startDrawing = ({ nativeEvent }) => {
    if (!isMyTurn) return;

    const { offsetX, offsetY } = nativeEvent;

    prevPointRef.current = { x: offsetX, y: offsetY };

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    const prevPoint = prevPointRef.current;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    socket.emit("draw", {
      room,
      prevX: prevPoint?.x,
      prevY: prevPoint?.y,
      x: offsetX,
      y: offsetY,
    });

    prevPointRef.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    prevPointRef.current = null;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas
        className={`w-[500px] h-[500px] border-2 border-black ${!isMyTurn ? 'cursor-not-allowed opacity-90' : 'cursor-crosshair'}`}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {isMyTurn && (
        <button className="m-2 px-4 py-1 border bg-red-100 hover:bg-red-200 text-red-700 rounded transition" onClick={clearCanvas}>
          Clear Canvas
        </button>
      )}
    </div>
  );
};

export default DrawingCanvas;
