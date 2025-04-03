/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

export interface SketchCanvasHandle {
  getDataUrl: () => string;
  clearCanvas: () => void;
}

const SketchCanvas = forwardRef<SketchCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingMouseRef = useRef(false);
  const isDrawingTouchRef = useRef(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = lineWidth;
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.lineWidth = isEraser ? Math.max(lineWidth * 2, 10) : lineWidth;
      context.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
      context.beginPath(); // Prevents stroke artifacts
    }
  }, [lineWidth, isEraser, context]);

  const getMouseCoords = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const getTouchCoords = (event: TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const touch = event.touches[0] || event.changedTouches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  const startMouseDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    isDrawingMouseRef.current = true;
    context.beginPath();
    const { x, y } = getMouseCoords(e.nativeEvent as MouseEvent);
    context.moveTo(x, y);
  };

  const drawMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMouseRef.current || !context) return;
    const { x, y } = getMouseCoords(e.nativeEvent as MouseEvent);
    context.lineTo(x, y);
    context.stroke();
  };

  const endMouseDrawing = () => {
    isDrawingMouseRef.current = false;
    context?.beginPath();
  };

  const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!context) return;
    isDrawingTouchRef.current = true;
    context.beginPath();
    const { x, y } = getTouchCoords(e.nativeEvent);
    context.moveTo(x, y);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawingTouchRef.current || !context) return;
    const { x, y } = getTouchCoords(e.nativeEvent);
    context.lineTo(x, y);
    context.stroke();
  };

  const endTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawingTouchRef.current = false;
    context?.beginPath();
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useImperativeHandle(ref, () => ({
    getDataUrl: () => (canvasRef.current ? canvasRef.current.toDataURL() : ""),
    clearCanvas,
  }));

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <label htmlFor="width" className="mr-2 text-gray-700">
            Pencil Width:
          </label>
          <input
            id="width"
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="accent-blue-500"
          />
          <span className="ml-2 text-gray-700">{lineWidth}</span>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`px-3 py-1 rounded-md ${isEraser ? 'bg-gray-300' : 'bg-white border border-gray-300'}`}
          >
            Eraser
          </button>
        </div>
      </div>
      <div
        className="border border-gray-300 relative w-full max-w-3xl bg-white"
        style={{ height: "500px" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          style={{ 
            cursor: isEraser 
              ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 20 20'><rect x='0' y='0' width='20' height='20' fill='white' stroke='black' stroke-width='1'/></svg>") 10 10, auto`
              : `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='${Math.max(2, lineWidth/2)}' fill='black'/></svg>") 8 8, auto`
          }}
          onMouseDown={startMouseDrawing}
          onMouseMove={drawMouse}
          onMouseUp={endMouseDrawing}
          onMouseLeave={endMouseDrawing}
          onTouchStart={startTouchDrawing}
          onTouchMove={drawTouch}
          onTouchEnd={endTouchDrawing}
        />
      </div>
    </div>
  );
});

export default SketchCanvas;
