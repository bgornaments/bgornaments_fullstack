/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadImg from '../UploadImg'; // Ensure correct import path
import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';
import GlassComponent from '../../GlassComponent';
import DownloadButton from '../../DownloadButton';
import { Set_Gen } from '../../../constantsAWS';

const SetGen: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]); // Store generated image URLs
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sourceType, setSourceType] = useState("Necklace");
  const [targetType, setTargetType] = useState("Necklace");

  const sessionId = localStorage.getItem('sessionId');
  const trialDaysLeft = parseInt(localStorage.getItem('trial_days_left') || '0');
  const trialStatus = localStorage.getItem('trial_status')?.toLowerCase();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  const base_url = Set_Gen;

  // Check trial validity
  useEffect(() => {
    if (trialStatus && trialDaysLeft > 0) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, [trialDaysLeft, trialStatus]);

  // Check session ID on mount
  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  // Function to call the Lambda API
  const callLambda = async (endpointUrl: string, payload: object) => {
    setIsLoading(true);
    console.log('Sending payload to Lambda:', payload); // Log the payload
    try {
      const response = await axios.post(endpointUrl, payload);
      console.log('Lambda response:', response); // Log the response
      return response.data;
    } catch (error) {
      setError('Error processing the request. Please try again later.');
      console.error("Lambda call error:", error); // Log the error details
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image selection
  const makeImageSquare = (imageBase64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageBase64;
      img.onload = () => {
        const size = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = "white"; // or transparent if needed
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);
          resolve(canvas.toDataURL()); // Return new base64 image
        }
      };
    });
  };
  
  const handleImageSelect = async (imageBase64: string) => {
    console.log("handleImageSelect: Running – image selected.");
    const squaredImage = await makeImageSquare(imageBase64);
    setSelectedImage(squaredImage);
  };
  

  // Handle image processing and generation
  const handleProcessImage = async () => {
    setIsProcessing(true);
    if (selectedImage) {
      const payload = {
        image: selectedImage.split(',')[1], // Sending Base64 image string
        source_type: sourceType,
        target_type: targetType,
      };
      const response = await callLambda(base_url, payload);
      console.log("Lambda response:", response); // Log the entire response

      // Check if the response has a body and parse it
      if (response && response.body) {
        try {
          const parsedBody = JSON.parse(response.body);
          if (parsedBody.uploaded_image_urls) {
            setGeneratedImages(parsedBody.uploaded_image_urls);
          } else {
            setError('Failed to generate set.');
          }
        } catch (error) {
          setError('Error parsing Lambda response.');
        }
      } else {
        setError('Lambda response is empty or malformed.');
      }
    } else {
      setError('No image uploaded.');
    }
    setIsProcessing(false);
  };

  return (
    <>
      {showComponent ? (
        <div className="flex-1 min-h-screen pb-[15vh] relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
              <img src={kinmitraAnimation} alt="Loading Animation" className="w-[200px] h-[200px] object-cover" />
            </div>
          )}
          {/* White overlay on the background image */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
            style={{
              backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg')",
            }}
          ></div>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-80 z-[-90]"></div>
          {/* Header as in Code 1 */}
          <div className="flex items-center justify-center text-xl p-5 text-[#585858] relative z-10 w-full">
            <header className="text-center">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                Set Generator
              </h1>
              {/* Subtitle */}
              <p className="text-lightGreen lg:text-xl">
                Create stunning jewelry sets effortlessly
              </p>
            </header>
          </div>

          {/* Main Content */}
          {/* Main Content */}
          <main className="flex flex-col items-center flex-grow p-6 relative z-10">
            <div className="flex flex-wrap gap-6 justify-center items-center w-full">
              <div
                className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
                onClick={() => {
                  if (!selectedImage) {
                    setIsUploadVisible(true); // Always show the upload modal
                    setSelectedImage(null);   // Reset selected image state
                    setGeneratedImages([]);   // Reset generated images state
                    setError(null);
                  }      // Reset any error state
                }}
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-gray-600">Click to upload</span>
                )}
              </div>

              <div className="relative h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
                {generatedImages.length > 0 ? (
                  <>
                    <img
                      src={generatedImages[0]}
                      alt="Generated Variation"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <DownloadButton imageUrl={generatedImages[0]} />
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-gray-600">Generated Image</span>
                )}
              </div>
            </div>

            {/* Dropdowns for Source and Target Types */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium w-32 text-right">Source Type:</label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="Necklace">Necklace</option>
                  <option value="Earring">Earring</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Rings">Rings</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium w-32 text-right">Target Type:</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="Necklace">Necklace</option>
                  <option value="Earring">Earring</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Rings">Rings</option>
                </select>
              </div>
            </div>

            {selectedImage && !isProcessing && (
              <button
                onClick={handleProcessImage}
                className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                disabled={isProcessing}
              >
                Process Image
              </button>
            )}

            {error && <div className="mt-6 text-red-500">{error}</div>}
          </main>

          {/* Upload Image Modal */}
          {isUploadVisible && (
            <UploadImg
              onClose={() => setIsUploadVisible(false)}
              sessionId={sessionId}
              onImageSelect={handleImageSelect}
            />
          )}

        </div>
      ) : (
        <GlassComponent />
      )}
    </>
  );
};

export default SetGen;
