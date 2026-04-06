import { useEffect, useRef, useState } from "react";

const DrawingCanvas = ({ socket, room }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevPointRef = useRef(null);

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

    return () => socket.off("draw_from_server");
  }, [socket]);

  const startDrawing = ({ nativeEvent }) => {
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
        className="w-[500px] h-[500px] border-2 border-black"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <button className="m-2 p-1 border" onClick={clearCanvas}>
        Clear
      </button>
    </div>
  );
};

export default DrawingCanvas;
