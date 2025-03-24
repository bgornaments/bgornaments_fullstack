/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion } from "framer-motion";
import rectangleIcon from "../assets/rectangle.png";
import circleIcon from "../assets/circle.png";
import ovalIcon from "../assets/shape.png";
import freehandIcon from "../assets/pen.png";
import eraserIcon from "../assets/eraser.png";
import axios from "axios";
import './MaskStyle.css';

interface ImageMaskingPopupProps {
  imgvar: string;
  onClose: (s3Link: string | null, isExported: boolean) => void;
}

export interface ImageMaskingPopupHandle {
  s3Link: string | null;
  isExported: boolean;
  setExportedData: (link: string, exported: boolean) => void;
}

const ImageMaskingPopup = forwardRef<ImageMaskingPopupHandle, ImageMaskingPopupProps>(
  ({ imgvar, onClose }, ref) => {
    const imageCanvasRef = useRef<HTMLCanvasElement>(null);
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
    const [brushSize, setBrushSize] = useState(5);
    const [drawingPath, setDrawingPath] = useState<Array<{ x: number; y: number }>>([]);
    const [masks, setMasks] = useState<any[]>([]);
    const [eraserSize, setEraserSize] = useState(5);
    const [s3Link, setS3Link] = useState<string | null>(null);
    const [isExported, setIsExported] = useState(false);

    // Load saved masks on mount
    useEffect(() => {
      const savedMasks = sessionStorage.getItem('savedMasks');
      if (savedMasks) {
        try {
          const parsedMasks = JSON.parse(savedMasks);
          setMasks(parsedMasks);
        } catch (error) {
          console.error("Error parsing saved masks:", error);
          sessionStorage.removeItem('savedMasks');
        }
      }
    }, []);

    // Initialize canvas and draw masks
    useEffect(() => {
      if (!imgvar) return;

      const imageCanvas = imageCanvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;
      if (!imageCanvas || !overlayCanvas) return;

      const imageCtx = imageCanvas.getContext("2d");
      const overlayCtx = overlayCanvas.getContext("2d");
      if (!imageCtx || !overlayCtx) return;

      const img = new Image();
      img.src = imgvar;
      img.onload = () => {
        const maxWidth = imageCanvas.parentElement!.clientWidth * 0.9;
        const maxHeight = imageCanvas.parentElement!.clientHeight * 0.9;
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

        const canvasWidth = Math.floor((img.width * scale) / 8) * 8;
        const canvasHeight = Math.floor((img.height * scale) / 8) * 8;

        imageCanvas.width = canvasWidth;
        imageCanvas.height = canvasHeight;
        overlayCanvas.width = canvasWidth;
        overlayCanvas.height = canvasHeight;

        imageCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        if (masks.length > 0) {
          redrawAllMasks(overlayCtx);
        }
      };
    }, [imgvar, masks]);

    const redrawAllMasks = (
      ctx: CanvasRenderingContext2D,
      masksToDraw: any[] = masks
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      masksToDraw.forEach((mask) => {
        ctx.lineWidth = mask.brushSize || brushSize;
        if (mask.tool === "freehand") {
          ctx.strokeStyle = "rgba(0,0,0,0.5)";
          ctx.beginPath();
          if (mask.drawingPath && mask.drawingPath.length > 0) {
            ctx.moveTo(mask.drawingPath[0].x, mask.drawingPath[0].y);
            for (let i = 1; i < mask.drawingPath.length; i++) {
              ctx.lineTo(mask.drawingPath[i].x, mask.drawingPath[i].y);
            }
            ctx.stroke();
          }
        } else {
          ctx.strokeStyle = "rgba(0,0,0,1)";
          ctx.fillStyle = "rgba(0,0,0,1)";
          switch (mask.tool) {
            case "rectangle":
              ctx.fillRect(
                mask.startPos.x,
                mask.startPos.y,
                mask.endPos.x - mask.startPos.x,
                mask.endPos.y - mask.startPos.y
              );
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
          }
        }
      });
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!selectedTool) return;
      setIsDrawing(true);
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const rect = overlayCanvas.getBoundingClientRect();
      const scaleX = overlayCanvas.width / rect.width;
      const scaleY = overlayCanvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      setStartPos({ x, y });

      if (selectedTool === "freehand") {
        setDrawingPath([]);
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !selectedTool || !startPos) return;
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const ctx = overlayCanvas.getContext("2d");
      if (!ctx) return;

      if (selectedTool === "eraser") {
        const rect = overlayCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newMasks = masks
          .map((mask) => {
            if (mask.tool === "freehand" && mask.drawingPath) {
              return {
                ...mask,
                drawingPath: mask.drawingPath.filter((point: { x: number; y: number }) => {
                  const dx = point.x - x;
                  const dy = point.y - y;
                  return Math.sqrt(dx * dx + dy * dy) > eraserSize;
                }),
              };
            }
            if (mask.tool === "rectangle" && mask.endPos) {
              const x1 = Math.min(mask.startPos.x, mask.endPos.x);
              const x2 = Math.max(mask.startPos.x, mask.endPos.x);
              const y1 = Math.min(mask.startPos.y, mask.endPos.y);
              const y2 = Math.max(mask.startPos.y, mask.endPos.y);
              return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? null : mask;
            }
            if (mask.tool === "circle") {
              const dx = mask.startPos.x - x;
              const dy = mask.startPos.y - y;
              return Math.sqrt(dx * dx + dy * dy) > mask.radius ? mask : null;
            }
            if (mask.tool === "oval" && mask.endPos) {
              const cx = (mask.startPos.x + mask.endPos.x) / 2;
              const cy = (mask.startPos.y + mask.endPos.y) / 2;
              const rx = Math.abs(mask.endPos.x - mask.startPos.x) / 2;
              const ry = Math.abs(mask.endPos.y - mask.startPos.y) / 2;
              return (Math.pow(x - cx, 2) / Math.pow(rx, 2) +
                Math.pow(y - cy, 2) / Math.pow(ry, 2)) > 1
                ? mask
                : null;
            }
            return mask;
          })
          .filter(
            (mask) =>
              mask !== null &&
              (mask.tool !== "freehand" || (mask.drawingPath && mask.drawingPath.length > 0))
          );

        setMasks(newMasks);
        redrawAllMasks(ctx, newMasks);
        return;
      }

      redrawAllMasks(ctx);
      const rect = overlayCanvas.getBoundingClientRect();
      const scaleX = overlayCanvas.width / rect.width;
      const scaleY = overlayCanvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      ctx.fillStyle = "rgba(0,0,0, 1)";
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
          const currentPath = [...drawingPath, { x, y }];
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

    const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (selectedTool === "eraser") {
        setIsDrawing(false);
        return;
      }
      setIsDrawing(false);
      if (!selectedTool || !startPos) return;

      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const ctx = overlayCanvas.getContext("2d");
      if (!ctx) return;

      const currentMask: {
        tool: string;
        startPos: { x: number; y: number };
        brushSize: number;
        endPos?: { x: number; y: number };
        radius?: number;
        drawingPath?: { x: number; y: number }[];
      } = {
        tool: selectedTool,
        startPos: { ...startPos },
        brushSize: brushSize,
      };

      switch (selectedTool) {
        case "rectangle":
          currentMask.endPos = calculateEndPos(overlayCanvas, event);
          break;
        case "circle":
          const endPos = calculateEndPos(overlayCanvas, event);
          currentMask.radius = calculateRadius(startPos, endPos);
          break;
        case "oval":
          currentMask.endPos = calculateEndPos(overlayCanvas, event);
          break;
        case "freehand":
          currentMask.drawingPath = [...drawingPath];
          setDrawingPath([]);
          break;
      }

      setMasks((prevMasks) => [...prevMasks, currentMask]);
      setStartPos(null);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!selectedTool) return;
      setIsDrawing(true);
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const rect = overlayCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setStartPos({ x, y });
      if (selectedTool === "freehand") {
        setDrawingPath([]);
      }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!isDrawing || !selectedTool || !startPos) return;
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const ctx = overlayCanvas.getContext("2d");
      if (!ctx) return;

      const rect = overlayCanvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (selectedTool === "eraser") {
        setMasks((prevMasks) =>
          prevMasks.filter((mask) => {
            if (mask.tool === "freehand" && mask.drawingPath) {
              mask.drawingPath = mask.drawingPath.filter((point: { x: number; y: number }) => {
                const dx = point.x - x;
                const dy = point.y - y;
                return Math.sqrt(dx * dx + dy * dy) > eraserSize;
              });
              return mask.drawingPath.length > 0;
            }
            if (mask.tool === "rectangle" && mask.endPos) {
              const x1 = Math.min(mask.startPos.x, mask.endPos.x);
              const x2 = Math.max(mask.startPos.x, mask.endPos.x);
              const y1 = Math.min(mask.startPos.y, mask.endPos.y);
              const y2 = Math.max(mask.startPos.y, mask.endPos.y);
              return !(x >= x1 && x <= x2 && y >= y1 && y <= y2);
            }
            if (mask.tool === "circle") {
              const dx = mask.startPos.x - x;
              const dy = mask.startPos.y - y;
              return Math.sqrt(dx * dx + dy * dy) > mask.radius;
            }
            if (mask.tool === "oval" && mask.endPos) {
              const cx = (mask.startPos.x + mask.endPos.x) / 2;
              const cy = (mask.startPos.y + mask.endPos.y) / 2;
              const rx = Math.abs(mask.endPos.x - mask.startPos.x) / 2;
              const ry = Math.abs(mask.endPos.y - mask.startPos.y) / 2;
              return (Math.pow(x - cx, 2) / Math.pow(rx, 2) + Math.pow(y - cy, 2) / Math.pow(ry, 2)) > 1;
            }
            return true;
          })
        );
        redrawAllMasks(ctx);
        return;
      }

      redrawAllMasks(ctx);

      ctx.fillStyle = "rgba(0,0,0, 1)";
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
          const currentPath = [...drawingPath, { x, y }];
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

    const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (selectedTool === "eraser") {
        setIsDrawing(false);
        return;
      }
      setIsDrawing(false);
      if (!selectedTool || !startPos) return;
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;
      const ctx = overlayCanvas.getContext("2d");
      if (!ctx) return;

      const touch = e.changedTouches[0];
      const rect = overlayCanvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const currentMask: {
        tool: string;
        startPos: { x: number; y: number };
        brushSize: number;
        endPos?: { x: number; y: number };
        radius?: number;
        drawingPath?: { x: number; y: number }[];
      } = {
        tool: selectedTool,
        startPos: { ...startPos },
        brushSize: brushSize,
      };

      switch (selectedTool) {
        case "rectangle":
          currentMask.endPos = { x, y };
          break;
        case "circle":
          currentMask.radius = calculateRadius(startPos, { x, y });
          break;
        case "oval":
          currentMask.endPos = { x, y };
          break;
        case "freehand":
          currentMask.drawingPath = [...drawingPath];
          setDrawingPath([]);
          break;
      }
      setMasks((prevMasks) => [...prevMasks, currentMask]);
      setStartPos(null);
    };

    const calculateEndPos = (
      canvas: HTMLCanvasElement,
      event: React.MouseEvent<HTMLCanvasElement>
    ): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const calculateRadius = (
      start: { x: number; y: number },
      end: { x: number; y: number }
    ): number => {
      return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
    };

    const callLambda = async (endpointUrl: string, payload: object) => {
      try {
        const response = await axios.post(endpointUrl, payload);
        return response.data;
      } catch (error) {
        console.error("Lambda call error:", error);
        return null;
      }
    };

    const [isSaving, setIsSaving] = useState(false);

    const saveAndExportOverlay = async () => {
      if (isSaving) return; // Prevent multiple clicks
      setIsSaving(true);
      try {
        const overlayCanvas = overlayCanvasRef.current;
        if (!overlayCanvas) return;

        const overlayCtx = overlayCanvas.getContext("2d");
        if (!overlayCtx) return;
        redrawAllMasks(overlayCtx);

        sessionStorage.setItem('savedMasks', JSON.stringify(masks));

        const base64Image = overlayCanvas.toDataURL("image/png");
        const user_id = localStorage.getItem("cognito_username");
        const session_id = localStorage.getItem("sessionId");

        if (!user_id || !session_id) {
          console.error("User ID or Session ID is missing");
          onClose(null, false);
          return;
        }

        const payload = { user_id: 'unknown', session_id, image_base64: base64Image.split(',')[1] };
        const response = await callLambda(
          "https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images",
          payload
        );

        if (response && response.s3_link) {
          setS3Link(response.s3_link);
          setIsExported(true);
          onClose(response.s3_link, true);
        } else {
          onClose(null, false);
        }
      } catch (error) {
        console.error("Error in saveAndExportOverlay:", error);
        onClose(null, false);
      } finally {
        setIsSaving(false);
      }
    };

    // Updated useImperativeHandle to ensure latest state is exposed
    useImperativeHandle(ref, () => ({
      s3Link,
      isExported,
      setExportedData: (link: string, exported: boolean) => {
        setS3Link(link);
        setIsExported(exported);
      },
    }));

    const handleViewImage = () => {
      if (!s3Link) return;
      fetch(s3Link)
        .then((res) => res.blob())
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          window.open(objectUrl, "_blank");
        })
        .catch((err) => console.error("Error opening image:", err));
    };

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const updateCursor = (e: { clientX: any; clientY: any; }) => setCursorPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", updateCursor);
      return () => window.removeEventListener("mousemove", updateCursor);
    }, []);

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
        {isExported && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-2 right-2 bg-green-500 text-white border border-green-700 text-sm px-4 py-2 rounded shadow-lg"
          >
            Link exported successfully!
          </motion.div>
        )}

        <div className="bg-white border-4 border-[#e0ae2a] shadow-lg rounded-2xl p-7 w-[90%] md:w-[70%] h-[80%] flex flex-col md:flex-row relative">
          {/* Responsive Toolbar: Above Canvas for Small Screens */}
          <div className="md:hidden flex flex-wrap gap-2 justify-center pb-4">
            <h2 className="text-lg font-bold text-[#e0ae2a] w-full text-center">Mask Image</h2>
            {[
              { icon: rectangleIcon, name: "rectangle" },
              { icon: circleIcon, name: "circle" },
              { icon: ovalIcon, name: "oval" },
              { icon: freehandIcon, name: "freehand" },
              { icon: eraserIcon, name: "eraser" },
            ].map((tool) => (
              <button
                key={tool.name}
                onClick={() => setSelectedTool(tool.name)}
                className={`w-[30%] sm:w-[28%] px-3 py-2 rounded-lg flex items-center justify-center transition-all ${selectedTool === tool.name
                  ? "bg-white border-4 border-[#e0ae2a] text-white"
                  : "bg-[#f0d9a8] hover:bg-[#e0ae2a]"
                  }`}
              >
                <img src={tool.icon} alt={tool.name} className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            ))}
          </div>

          {/* Sidebar Toolbar (For Larger Screens) */}
          <div className="hidden md:flex flex-col gap-4 w-[20%] pr-4">
            <h2 className="text-lg font-bold text-[#e0ae2a]">Mask Image</h2>
            {[
              { icon: rectangleIcon, name: "rectangle" },
              { icon: circleIcon, name: "circle" },
              { icon: ovalIcon, name: "oval" },
              { icon: freehandIcon, name: "freehand" },
              { icon: eraserIcon, name: "eraser" },
            ].map((tool) => (
              <button
                key={tool.name}
                onClick={() => setSelectedTool(tool.name)}
                className={`px-3 py-2 rounded-lg flex items-center justify-center transition-all ${selectedTool === tool.name
                  ? "bg-white border-4 border-[#e0ae2a] text-white"
                  : "bg-[#f0d9a8] hover:bg-[#e0ae2a]"
                  }`}
              >
                <img src={tool.icon} alt={tool.name} className="w-6 h-6" />
              </button>
            ))}

            {selectedTool === "freehand" && (
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm">Brush Size: {brushSize}</label>
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

            {selectedTool === "eraser" && (
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm">Eraser Size: {eraserSize}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={eraserSize}
                  onChange={(e) => setEraserSize(Number(e.target.value))}
                  className="w-full appearance-none h-2 rounded-lg bg-[#e0ae2a]"
                />
              </div>
            )}

            {/* Done Button (Inside Sidebar for Large Screens) */}
            <button
              onClick={saveAndExportOverlay}
              disabled={isSaving}
              className={`px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer bg-white hover:bg-[#e0ae2a] hover:border-4 hover:rounded-lg hover:border-white hover:text-white ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? "Saving..." : "Done"}
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative flex justify-center items-center">
            <div className="border-2 border-[#e0ae2a] rounded-lg shadow-lg relative flex justify-center items-center h-full w-full">
              <canvas ref={imageCanvasRef} className="absolute rounded-lg border-2 border-[#e0ae2a]" />
              <canvas
                ref={overlayCanvasRef}
                className="absolute rounded-lg"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: selectedTool === "eraser" ? "none" : "default" }}
              />
              {selectedTool === "eraser" && (
                <img
                  src={eraserIcon}
                  alt="eraser cursor"
                  style={{
                    position: "fixed",
                    left: cursorPos.x,
                    top: cursorPos.y,
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                    width: `${0.8 + ((eraserSize - 1) / 9)}rem`,
                    height: `${0.8 + ((eraserSize - 1) / 9)}rem`,
                    zIndex: 9999,
                  }}
                />
              )}
            </div>
          </div>

          {/* Done Button (For Small Screens, Below the Toolbar) */}
          <div className="md:hidden flex justify-center pt-4">
          <button
              onClick={saveAndExportOverlay}
              disabled={isSaving}
              className={`px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer bg-white hover:bg-[#e0ae2a] hover:border-4 hover:rounded-lg hover:border-white hover:text-white ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? "Saving..." : "Done"}
            </button>
          </div>
        </div>

        {s3Link && (
          <button
            onClick={handleViewImage}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-2 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] hover:text-white transition duration-1000 shadow-lg"
          >
            View Image
          </button>
        )}
      </div>
    );
  }
);

export default ImageMaskingPopup;