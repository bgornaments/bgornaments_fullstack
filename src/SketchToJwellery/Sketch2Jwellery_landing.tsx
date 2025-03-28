import React, { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import UploadImg from '../components/ProMode/UploadImg';
import SketchCanvas, { SketchCanvasHandle } from './SketchCanvas';

const SketchToDesign: React.FC = () => {
    const navigate = useNavigate();
    const [isUploadVisible, setUploadVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const sketchRef = useRef<SketchCanvasHandle>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getSessionId = () => {
        const sessionId = sessionStorage.getItem("sessionId") || localStorage.getItem("sessionId");
        console.log("Retrieved sessionId:", sessionId);
        return sessionId;
    };

    const AddPaddingToBase64 = ({ base64Image, bgColor = "white" }: { base64Image: string; bgColor?: string }): Promise<string> => {
        console.log("Starting AddPaddingToBase64...");
        const img = new Image();
        img.src = base64Image;
        return new Promise<string>((resolve) => {
            img.onload = () => {
                console.log("Image loaded successfully.");
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    console.error("Canvas context is not available. Returning original image.");
                    resolve(base64Image);
                    return;
                }

                const padding = Math.abs(img.width - img.height) / 2;
                const newWidth = img.width + (img.width > img.height ? 0 : padding * 2);
                const newHeight = img.height + (img.height > img.width ? 0 : padding * 2);
                canvas.width = newWidth;
                canvas.height = newHeight;
                console.log("New canvas dimensions:", newWidth, "x", newHeight);

                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, newWidth, newHeight);

                const x = img.width > img.height ? 0 : padding;
                const y = img.height > img.width ? 0 : padding;
                ctx.drawImage(img, x, y);
                console.log("Padding applied:", padding > 0);

                resolve(canvas.toDataURL("image/png"));
            };
        });
    };

    const handleImageSelect = async (imageUrl: string) => {
        console.log("handleImageSelect called with:", imageUrl);
        const paddedImage = await AddPaddingToBase64({ base64Image: imageUrl });
        setUploadedImage(paddedImage);
        setUploadVisible(false);
        console.log("Final Image URL after padding:", paddedImage);
    };

    const handleNext = () => {
        console.log("handleNext clicked.");
        if (!uploadedImage) {
            alert("Please upload or draw a sketch before proceeding.");
            return;
        }
        console.log("Navigating to sketchModification with image:", uploadedImage);
        navigate("sketchModification", { state: { image: uploadedImage } });
    };

    const handleDrawClick = () => {
        console.log("handleDrawClick triggered.");
        setShowModal(true);
    };

    const handleDoneDrawing = async () => {
        console.log("handleDoneDrawing initiated.");
        if (sketchRef.current) {
            const dataUrl = sketchRef.current.getDataUrl();
            console.log("Drawn image captured:", dataUrl);
            const paddedImage = await AddPaddingToBase64({ base64Image: dataUrl });
            setUploadedImage(paddedImage);
            console.log("Padded drawn image stored.");
        }
        setShowModal(false);
    };

    const handleUploadClick = () => {
        console.log("handleUploadClick called.");
        setUploadVisible(true);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log("File input changed.");
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log("File selected:", file.name);
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const base64Image = ev.target?.result as string;
                console.log("Base64 image loaded:", base64Image.substring(0, 30) + "...");
                const paddedImage = await AddPaddingToBase64({ base64Image });
                setUploadedImage(paddedImage);
                console.log("Padded image set in state.");
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="py-6 text-center">
                <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                    Sketch to Design
                </h1>
                <p className="text-lightGreen mb-6 lg:text-xl">
                    Transform your sketch to jewelry design
                </p>
            </header>

            {/* Main content */}
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-6 md:space-y-0">
                    {/* Buttons column */}
                    <div className="inline-block md:-mt-12 md:mb-12 md:mr-16">
                        <div className="flex flex-col items-stretch space-y-3 md:space-y-8 w-72">
                            <button
                                onClick={handleUploadClick}
                                className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md"
                            >
                                Upload a sketch
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <p className="text-black font-semibold text-center">OR</p>
                            <button
                                onClick={handleDrawClick}
                                className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md"
                            >
                                Draw a sketch
                            </button>
                        </div>
                    </div>

                    {/* Image preview column */}
                    <div className="flex flex-col items-center">
                        <div className="
                            border-2 border-yellow-400 
                            w-80 h-80 
                            md:w-96 md:h-96 
                            lg:w-[16rem] lg:h-[16rem] 
                            xl:w-[20rem] xl:h-[20rem] 
                            2xl:w-[28em] 2xl:h-[28rem] 
                            flex items-center justify-center
                        ">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded Sketch" className="w-full h-full object-contain" />
                            ) : (
                                <p className="text-gray-400 text-center">
                                    Uploaded/Drawn Sketch Preview (Placeholder)
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleNext}
                            className="mt-4 md:mt-6 px-8 md:px-10 py-3 md:py-4 bg-yellow-600 text-white rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>

            {/* Upload Image Component - Shows when upload button is clicked */}
            {isUploadVisible && (
                <UploadImg
                    sessionId={getSessionId()}
                    onImageSelect={handleImageSelect}
                    onClose={() => setUploadVisible(false)}
                />
            )}

            {/* Modal Popup for Drawing Sketch */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Draw your Sketch</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        {/* SketchCanvas component inside the modal */}
                        <SketchCanvas ref={sketchRef} />
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-yellow-600 text-white rounded"
                                onClick={handleDoneDrawing}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SketchToDesign;