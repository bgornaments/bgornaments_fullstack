import React, { useRef, useState, useEffect } from "react";

interface ImageMaskingPopupProps {
  imgvar: string;
  onClose: () => void;
}

const ImageMaskingPopup: React.FC<ImageMaskingPopupProps> = ({ imgvar, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState<number>(5); // Default brush size

  useEffect(() => {
    if (!imgvar) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imgvar;
    img.onload = () => {
      const maxWidth = canvas.parentElement!.clientWidth * 0.9; // 90% of container width
      const maxHeight = canvas.parentElement!.clientHeight * 0.9; // 90% of container height
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imgvar]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white h-[80%] w-[90%] md:w-[70%] p-4 rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-bold">Mask Image</h2>
          <button onClick={onClose} className="text-red-500 font-bold">✖</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 h-[20%] w-full md:w-[80%] mx-auto">
          {['rectangle', 'circle', 'triangle', 'hexagon', 'freeform'].map((tool) => (
            <button
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`px-2 py-1 text-sm md:px-3 md:py-1 md:text-base rounded-md ${selectedTool === tool ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {tool.charAt(0).toUpperCase() + tool.slice(1)}
            </button>
          ))}
          {selectedTool === "freeform" && (
            <div className="flex items-center gap-2">
              <label htmlFor="brushSize" className="text-sm md:text-base">Brush Size:</label>
              <input
                type="range"
                id="brushSize"
                min="1"
                max="10"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-16 md:w-24"
              />
              <span className="text-sm md:text-base">{brushSize}</span>
            </div>
          )}
        </div>
        <div className="border-2 border-black flex justify-center items-center h-[60%] w-full md:w-[80%] mx-auto">
          <div className="h-[90%] w-[90%] flex justify-center items-center">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageMaskingPopup;
