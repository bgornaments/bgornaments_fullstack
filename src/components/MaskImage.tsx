/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import React, { useRef, useState, useEffect } from "react";
import rectangleIcon from "../assets/rectangle.png";
import circleIcon from "../assets/circle.png";
import ovalIcon from "../assets/shape.png";
import freehandIcon from "../assets/pen.png";
import { motion } from "framer-motion";

interface ImageMaskingPopupProps {
  imgvar: string;
  onClose: () => void;
}

const ImageMaskingPopup: React.FC<ImageMaskingPopupProps> = ({ imgvar, onClose }) => {
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [brushSize, setBrushSize] = useState(5);
  const [drawingPath, setDrawingPath] = useState<Array<{ x: number; y: number }>>([]);
  const [exportMessage, setExportMessage] = useState(false);
  const [exportedLink, setExportedLink] = useState<string | null>(null);
  const [masks, setMasks] = useState<any[]>([]); // State to store masks

  useEffect(() => {
    if (!imgvar) return;
    const imageCanvas = imageCanvasRef.current;
    if (!imageCanvas) return;
    const ctx = imageCanvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = imgvar;
    img.onload = () => {
      const maxWidth = imageCanvas.parentElement!.clientWidth * 0.9;
      const maxHeight = imageCanvas.parentElement!.clientHeight * 0.9;
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      imageCanvas.width = img.width * scale;
      imageCanvas.height = img.height * scale;

      const overlayCanvas = overlayCanvasRef.current;
      if (overlayCanvas) {
        overlayCanvas.width = imageCanvas.width;
        overlayCanvas.height = imageCanvas.height;
      }

      ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
    };
  }, [imgvar]);

  const redrawAllMasks = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas before redrawing
    masks.forEach((mask) => {
      ctx.fillStyle = "rgba(255,0,0, 0.5)";
      ctx.strokeStyle = "rgba(255,0,0, 1)";
      ctx.lineWidth = mask.brushSize !== undefined ? mask.brushSize : brushSize; // Use mask's brushSize if available, else current brushSize

      switch (mask.tool) {
        case "rectangle":
          ctx.fillRect(mask.startPos.x, mask.startPos.y, mask.endPos.x - mask.startPos.x, mask.endPos.y - mask.startPos.y);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(mask.startPos.x, mask.startPos.y, mask.radius, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "oval":
          ctx.beginPath();
          ctx.ellipse(
            (mask.startPos.x + mask.endPos.x) / 2,
            (mask.startPos.y + mask.endPos.y) / 2,
            Math.abs(mask.endPos.x - mask.startPos.x) / 2,
            Math.abs(mask.endPos.y - mask.startPos.y) / 2,
            0,
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
        case "freehand":
          ctx.beginPath();
          if (mask.drawingPath.length > 0) {
            ctx.moveTo(mask.drawingPath[0].x, mask.drawingPath[0].y);
            for (let i = 1; i < mask.drawingPath.length; i++) {
              ctx.lineTo(mask.drawingPath[i].x, mask.drawingPath[i].y);
            }
            ctx.stroke();
          }
          break;
        default:
          break;
      }
    });
  };


  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTool) return;
    setIsDrawing(true);
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;
    const rect = overlayCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });

    if (selectedTool === "freehand") {
      setDrawingPath([]); // Reset drawing path on mouse down for freehand
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !selectedTool || !startPos) return;
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;
    const ctx = overlayCanvas.getContext("2d");
    if (!ctx) return;

    redrawAllMasks(ctx); // Redraw existing masks

    const rect = overlayCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = "rgba(0,0,0, 0.5)";
    ctx.strokeStyle = "rgba(0,0,0, 1)";
    ctx.lineWidth = brushSize;

    switch (selectedTool) {
      case "rectangle":
        ctx.fillRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        break;

      case "circle":
        const radius = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2);
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "oval":
        ctx.beginPath();
        ctx.ellipse(
          (startPos.x + x) / 2,
          (startPos.y + y) / 2,
          Math.abs(x - startPos.x) / 2,
          Math.abs(y - startPos.y) / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.fill();
        break;

      case "freehand":
        setDrawingPath((prev) => [...prev, { x, y }]);
        const currentPath = [...drawingPath, { x, y }]; // Include current point for drawing
        if (currentPath.length > 1) {
          ctx.beginPath();
          ctx.moveTo(currentPath[0].x, currentPath[0].y);
          for (let i = 1; i < currentPath.length; i++) {
            ctx.lineTo(currentPath[i].x, currentPath[i].y);
          }
          ctx.stroke();
        }
        break;
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (!selectedTool || !startPos) return;

    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;
    const ctx = overlayCanvas.getContext("2d");
    if (!ctx) return;

    const currentMask = {
      tool: selectedTool,
      startPos: { ...startPos },
      brushSize: brushSize, 
    };

    switch (selectedTool) {
      case "rectangle":
        currentMask.endPos = calculateEndPos(overlayCanvas, event); 
        break;
      case "circle":
        currentMask.radius = calculateRadius(startPos, calculateEndPos(overlayCanvas, event)); 
        break;
      case "oval":
        currentMask.endPos = calculateEndPos(overlayCanvas, event); 
        break;
      case "freehand":
        currentMask.drawingPath = [...drawingPath];
        setDrawingPath([]); 
        break;
      default:
        break;
    }

    setMasks((prevMasks) => [...prevMasks, currentMask]);
    setStartPos(null);
  };

  const calculateEndPos = (canvas: HTMLCanvasElement | null, event: React.MouseEvent<HTMLCanvasElement>): { x: number, y: number } => {
    if (!canvas || !event) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const calculateRadius = (start: { x: number, y: number } | null, end: { x: number, y: number }): number => {
    if (!start) return 0;
    return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
  };


  const exportOverlay = () => {
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas) return;
    const base64Image = overlayCanvas.toDataURL("image/png");
    console.log(base64Image);
    setExportMessage(true);
    setExportedLink(base64Image);
    setTimeout(() => setExportMessage(false), 3000);
    return base64Image;
  };

  const handleViewImage = () => {
    if (!exportedLink) return;
    fetch(exportedLink)
      .then((res) => res.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, "_blank");
      })
      .catch((err) => console.error("Error opening image:", err));
  };

  useEffect(() => {
    const timer = setTimeout(() => setExportMessage(false), 5000); // Auto-hide after 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      {exportMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 right-2 bg-green-500 text-white border border-green-700 text-sm px-4 py-2 rounded shadow-lg"
        >
          Link exported in console!!
        </motion.div>

      )}
      <div className="bg-white border-4 border-[#e0ae2a] shadow-lg rounded-2xl p-7 w-[90%] md:w-[70%] h-[80%] flex flex-row relative">
        <button onClick={onClose} className="absolute top-1 right-2 text-red-500 text-xl hover:text-red-600">✖</button>

        <div className="flex flex-col gap-4 w-[20%] pr-4">
          <h2 className="text-lg font-bold text-[#e0ae2a] ">Mask Image</h2>
          {[
            { icon: rectangleIcon, name: "rectangle" },
            { icon: circleIcon, name: "circle" },
            { icon: ovalIcon, name: "oval" },
            { icon: freehandIcon, name: "freehand" }
          ].map((tool) => (
            <button
              key={tool.name}
              onClick={() => setSelectedTool(tool.name)}
              className={`px-3 py-2 rounded-lg flex items-center justify-center transition-all ${selectedTool === tool.name
                ? "bg-[white] border-4 border-[#e0ae2a] text-white"
                : "bg-[#f0d9a8] hover:bg-[#e0ae2a]"
                }`}
            >
              <img src={tool.icon} alt={tool.name} className="w-6 h-6" />
            </button>
          ))}
          {selectedTool === "freehand" && (
            <div className="flex flex-col gap-2 mt-4">
              <label className=" text-sm">Brush Size: {brushSize}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full appearance-none h-2 rounded-lg bg-[#e0ae2a]"
              />
            </div>
          )}
          <button onClick={exportOverlay} className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
  bg-white hover:bg-[#e0ae2a] hover:border-4 hover:rounded-lg hover:border-white hover:text-white">
            Export
          </button>

        </div>

        <div className="flex-1 relative flex justify-center items-center">
          <div className="border-2 border-[#e0ae2a] rounded-lg shadow-lg relative flex justify-center items-center h-full w-full">
            <canvas ref={imageCanvasRef} className="absolute rounded-lg" />
            <canvas ref={overlayCanvasRef} className="absolute rounded-lg" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
          </div>
        </div>
      </div>
      {exportedLink && (
        <button
          onClick={handleViewImage}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 text-[#E0AE2A] 
              border-2 border-[#E0AE2A] rounded-md cursor-pointer 
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white 
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000 shadow-lg">
          View Image
        </button>
      )}


    </div>
  );
};

export default ImageMaskingPopup;