/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

export interface SketchCanvasHandle {
  getDataUrl: () => string;
}

const SketchCanvas = forwardRef<SketchCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingMouseRef = useRef(false);
  const isDrawingTouchRef = useRef(false);
  const [lineWidth, setLineWidth] = useState(2);
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
      context.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  /** Get Mouse Coordinates */
  const getMouseCoords = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  /** Get Touch Coordinates */
  const getTouchCoords = (event: TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const touch = event.touches[0] || event.changedTouches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  /** MOUSE EVENTS */
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
    context?.closePath();
  };

  /** TOUCH EVENTS */
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
    context?.closePath();
  };

  useImperativeHandle(ref, () => ({
    getDataUrl: () => (canvasRef.current ? canvasRef.current.toDataURL() : ""),
  }));

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 flex items-center">
        <label htmlFor="width" className="mr-2 text-gray-700">
          Pencil Width:
        </label>
        <input
          id="width"
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="accent-blue-500"
        />
        <span className="ml-2 text-gray-700">{lineWidth}</span>
      </div>
      <div
        className="border border-gray-300 relative w-full max-w-3xl"
        style={{ height: "500px" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          style={{ cursor: 'url("/pencil-icon.png") 16 32, auto' }}
          /** Mouse Events */
          onMouseDown={startMouseDrawing}
          onMouseMove={drawMouse}
          onMouseUp={endMouseDrawing}
          onMouseLeave={endMouseDrawing}
          /** Touch Events */
          onTouchStart={startTouchDrawing}
          onTouchMove={drawTouch}
          onTouchEnd={endTouchDrawing}
        />
      </div>
    </div>
  );
});

export default SketchCanvas;
