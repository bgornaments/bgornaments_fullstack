/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
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

interface ImageMaskingPopupProps {
  imgvar: string;
  onClose: () => void;
}

export interface ImageMaskingPopupHandle {
  s3Link: string | null;
  isExported: boolean;
  setExportedData: (link: string, exported: boolean) => void;
}

const ImageMaskingPopup = forwardRef<ImageMaskingPopupHandle, ImageMaskingPopupProps>(
  ({ imgvar, onClose }, ref) => {
    // Canvas references
    const imageCanvasRef = useRef<HTMLCanvasElement>(null);
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

    // Drawing states
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
    const [brushSize, setBrushSize] = useState(5);
    const [drawingPath, setDrawingPath] = useState<Array<{ x: number; y: number }>>([]);
    const [masks, setMasks] = useState<any[]>([]);
    const [eraserSize, setEraserSize] = useState(3);

    // <-- NEW EXPORT STATES -->
    // s3Link will store the URL returned from the API
    const [s3Link, setS3Link] = useState<string | null>(null);
    // isExported becomes true when the export API call succeeds.
    const [isExported, setIsExported] = useState(false);

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
        ctx.lineWidth = mask.brushSize !== undefined ? mask.brushSize : brushSize;

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

      // Eraser tool logic
      if (selectedTool === "eraser") {
        const rect = overlayCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMasks((prevMasks) =>
          prevMasks.filter((mask) => {
            if (mask.tool === "freehand" && mask.drawingPath) {
              // Filter out erased points
              mask.drawingPath = mask.drawingPath.filter((point: { x: number; y: number; }) => {
                const dx = point.x - x;
                const dy = point.y - y;
                return Math.sqrt(dx * dx + dy * dy) > eraserSize;
              });
              return mask.drawingPath.length > 0; // Remove mask if no points left
            }

            // Check for overlap for other shapes
            if (mask.tool === "rectangle") {
              return !(
                x >= mask.startPos.x &&
                x <= mask.endPos.x &&
                y >= mask.startPos.y &&
                y <= mask.endPos.y
              );
            }

            if (mask.tool === "circle") {
              const dx = mask.startPos.x - x;
              const dy = mask.startPos.y - y;
              return Math.sqrt(dx * dx + dy * dy) > mask.radius;
            }

            if (mask.tool === "oval") {
              const cx = (mask.startPos.x + mask.endPos.x) / 2;
              const cy = (mask.startPos.y + mask.endPos.y) / 2;
              const rx = Math.abs(mask.endPos.x - mask.startPos.x) / 2;
              const ry = Math.abs(mask.endPos.y - mask.startPos.y) / 2;

              // Check if point (x, y) is inside the ellipse
              return (Math.pow(x - cx, 2) / Math.pow(rx, 2) + Math.pow(y - cy, 2) / Math.pow(ry, 2)) > 1;
            }

            return true; // Keep masks that are not erased
          })
        );

        redrawAllMasks(ctx);
        return;
      }

      // For other drawing tools, redraw and show preview
      redrawAllMasks(ctx);
      const rect = overlayCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.fillStyle = "rgba(255,0,0, 0.5)";
      ctx.strokeStyle = "rgba(255,0,0, 0.5)";
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
        default:
          break;
      }
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
      // If eraser is active, end without adding a mask.
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
        default:
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

    const exportOverlay = async () => {
      const overlayCanvas = overlayCanvasRef.current;
      if (!overlayCanvas) return;

      // Convert canvas to Base64 and remove header
      const base64Image = overlayCanvas.toDataURL("image/png");
      console.log(base64Image);

      // base64Image = base64Image.replace(/^data:image\/png;base64,/, "");

      // Retrieve user details from local storage
      const user_id = localStorage.getItem("cognito_username");
      const session_id = localStorage.getItem("sessionId");

      if (!user_id || !session_id) {
        console.error("User ID or Session ID is missing");
        return;
      }

      const payload = {
        user_id: 'unknown',
        session_id: session_id || '1234567',
        image_base64: base64Image.split(',')[1],
      };

      console.log('payload for fetching s3 link:', payload);

      const response = await callLambda(
        "https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images",
        payload
      );
      if (response && response.s3_link) {
        setIsExported(true);
        setS3Link(response.s3_link);
      }
      else {
        console.error("Upload failed:", response);
      }
    };

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

    // Expose the new export states to parent components via the ref.
    useImperativeHandle(ref, () => ({
      s3Link,
      isExported,
      setExportedData: (link: string, exported: boolean) => {
        setS3Link(link);
        setIsExported(exported);
      },
    }));

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
        <div className="bg-white border-4 border-[#e0ae2a] shadow-lg rounded-2xl p-7 w-[90%] md:w-[70%] h-[80%] flex flex-row relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-red-500 text-xl hover:text-red-600"
          >
            ✖
          </button>

          <div className="flex flex-col gap-4 w-[20%] pr-4">
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
                  ? "bg-[white] border-4 border-[#e0ae2a] text-white"
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
                  min="0"
                  max="5"
                  value={eraserSize}
                  onChange={(e) => setEraserSize(Number(e.target.value))}
                  className="w-full appearance-none h-2 rounded-lg bg-[#e0ae2a]"
                />
              </div>
            )}

            <button
              onClick={exportOverlay}
              className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer bg-white hover:bg-[#e0ae2a] hover:border-4 hover:rounded-lg hover:border-white hover:text-white"
            >
              Export
            </button>
          </div>

          <div className="flex-1 relative flex justify-center items-center">
            <div className="border-2 border-[#e0ae2a] rounded-lg shadow-lg relative flex justify-center items-center h-full w-full" style={{
              cursor: selectedTool === "eraser" ? `url(${eraserIcon}) 10 10, auto` : "default",
            }}
            >
              <canvas ref={imageCanvasRef} className="absolute rounded-lg" />
              <canvas
                ref={overlayCanvasRef}
                style={{
                  cursor: selectedTool === "eraser" ? `url(${eraserIcon}), auto` : "default",
                }}
                className="absolute rounded-lg"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
            </div>
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

