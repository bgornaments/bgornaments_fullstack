import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface SketchCanvasHandle {
  getDataUrl: () => string;
}

const SketchCanvas = forwardRef<SketchCanvasHandle>((props, ref) => {
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
  }, []);

  useEffect(() => {
    if (context) {
      context.lineWidth = lineWidth;
    }
  }, [lineWidth, context]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);
    context.lineTo(x, y);
    context.stroke();
  };

  const endDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  useImperativeHandle(ref, () => ({
    getDataUrl: () => {
      return canvasRef.current ? canvasRef.current.toDataURL() : '';
    }
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
      <div className="border border-gray-300 relative w-full max-w-3xl" style={{ height: '500px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ cursor: 'url("/pencil-icon.png") 16 32, auto' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
      </div>
    </div>
  );
});

export default SketchCanvas;
