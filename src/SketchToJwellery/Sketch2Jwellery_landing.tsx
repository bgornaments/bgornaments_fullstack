import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UploadImg from '../components/ProMode/UploadImg';

const SketchToDesign: React.FC = () => {
    const navigate = useNavigate();
    const [isUploadVisible, setUploadVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    // Fetch session ID from localStorage/sessionStorage
    const getSessionId = () => {
        return sessionStorage.getItem("sessionId") || localStorage.getItem("sessionId");
    };

    // Handle image selection
    const handleImageSelect = (imageUrl: string) => {
        setUploadedImage(imageUrl);
        setUploadVisible(false); // Hide upload modal after selection
    };

    const handleNext = () => {
        navigate('sketchModification');
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
                                onClick={() => setUploadVisible(true)}
                                className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md"
                            >
                                Upload a sketch
                            </button>
                            <p className="text-black font-semibold text-center">OR</p>
                            <button className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md">
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
                            onClick={handleNext} // Next button remains unchanged
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
                    sessionId={getSessionId()} // Fetch and pass sessionId
                    onImageSelect={handleImageSelect} // Handle selected image
                    onClose={() => setUploadVisible(false)} // Close modal when needed
                />
            )}
        </div>
    );
};

export default SketchToDesign;
