import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface SketchCanvasHandle {
  getDataUrl: () => string;
}

const SketchCanvas = forwardRef<SketchCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(1);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = lineWidth;
        setContext(ctx);
      }
    }
  }, [lineWidth]);

  useEffect(() => {
    if (context) {
      context.lineWidth = lineWidth;
    }
  }, [lineWidth, context]);

  const getCoords = (event: MouseEvent | TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    if (event instanceof TouchEvent) {
      const touch = event.touches[0] || event.changedTouches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    } else {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    const { x, y } = getCoords(e);
    context.moveTo(x, y);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !context) return;
    const { x, y } = getCoords(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    context?.closePath();
  };

  useImperativeHandle(ref, () => ({
    getDataUrl: () => (canvasRef.current ? canvasRef.current.toDataURL() : ''),
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
        style={{ height: '500px' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ cursor: 'url("/pencil-icon.png") 16 32, auto' }}
          onMouseDown={(e) => startDrawing(e as unknown as MouseEvent)}
          onMouseMove={(e) => draw(e as unknown as MouseEvent)}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={(e) => startDrawing(e as unknown as TouchEvent)}
          onTouchMove={(e) => draw(e as unknown as TouchEvent)}
          onTouchEnd={endDrawing}
        />
      </div>
    </div>
  );
});

export default SketchCanvas;
