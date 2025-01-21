/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

interface UploadImgProps {
  onClose: () => void;
  sessionId: string | null;
  onImageSelect: (imageUrl: string) => void; // Callback to send the selected image
}

const UploadImg: React.FC<UploadImgProps> = ({ onClose, sessionId, onImageSelect }) => {
  const [activeTab, setActiveTab] = useState<'upload using qr'| 'upload from device' | 'yourImages'>('yourImages');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setImageFile] = useState<File | null>(null);

  const userId = 'unknown'; // Fixed userId for now

  // Utility function to fetch an image URL and convert it to Base64
  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchImageUrls = async () => {
    if (!sessionId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/fetch_km_session_images_urls_from_db',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            session_id: sessionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      const urls = data.urls.flat() || [];

      const base64Images = await Promise.all(
        urls.map((url: string) => fetchImageAsBase64(url))
      );

      setImages((prevImages) => {
        const uniqueImages = new Set(prevImages);
        base64Images.forEach((img) => uniqueImages.add(img));
        return Array.from(uniqueImages);
      });
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      alert('Failed to load images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Trigger image fetching when the active tab switches to 'yourImages'
    if (activeTab === 'yourImages') {
      fetchImageUrls();
    }
  }, [activeTab, sessionId]); // Dependency on activeTab and sessionId

  const handleGenerateQRCode = () => {
    if (!sessionId) {
      alert('Session ID not set. Please try again.');
      return;
    }

    try {
      const redirectUrl = `https://bgo-mobile-upload-website-j9cf.vercel.app/?userId=${userId}&sessionId=${sessionId}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        redirectUrl
      )}&size=150x150`;
      setQrCode(qrCodeUrl);
    } catch (error) {
      alert('Failed to generate QR code. Please try again.');
    }
  };

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGoClick = () => {
    if (selectedImage) {
      // Add the image to your images list and switch to the "yourImages" tab
      setImages((prevImages) => [...prevImages, selectedImage]);
      setActiveTab('yourImages');
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'yourImages') {
      return (
        <div className="flex flex-col items-center gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="loader border-t-blue-600 border-4 w-8 h-8 rounded-full animate-spin"></div>
              <p className="ml-4 text-gray-600">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-lg">No images found for this session.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((base64, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-md border shadow-md hover:shadow-lg transition duration-200"
                >
                  <img
                    src={base64}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover cursor-pointer group-hover:scale-105 transition-transform"
                    onClick={() => setSelectedImage(base64)}
                  />
                  {selectedImage === base64 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                      <span className="text-white text-xl font-semibold">Selected</span>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  if (selectedImage) {
                    onImageSelect(selectedImage);
                    onClose();
                  }
                }}
                className="w-full mt-20 ml-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 shadow-lg transition duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      );
    } 
    else if (activeTab === 'upload using qr') {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center border rounded-md shadow-md">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" className="max-h-full" />
            ) : (
              <p className="text-gray-500 text-left text-lg">
                1. Click "Generate QR". <br />
                2. Scan it with your phone. <br />
                3. Upload an image to see it in "Your Images".</p>
            )}
          </div>
          <button
            onClick={handleGenerateQRCode}
            className="px-6 py-3 mt-4 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Generate QR
          </button>
        </div>
      );
    }
    else if (activeTab === 'upload from device') {
      return (
        <div
          className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 p-6 rounded-md"
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-20 h-auto object-contain mb-4 rounded-md shadow-md"
            />
          ) : (
            <p className="text-gray-500">Drag and drop an image or click below to select an image from your device.</p>
          )}
          {!selectedImage ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="px-6 py-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-300"
          >
            Upload from Device
          </label>
        </div>
      ) : (
        <button
          onClick={handleGoClick}
          className="px-6 py-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition duration-300"
        >
          Go
        </button>
      )}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className={`py-2 px-6 rounded-md font-semibold transition-all ${activeTab === 'upload using qr'
                ? 'text-white bg-blue-600 shadow-md hover:bg-blue-700'
                : 'text-blue-600 border border-blue-600 hover:bg-blue-100'
                }`}
              onClick={() => setActiveTab('upload using qr')}
            >
              Quick QR Uploader
            </button>
            <button
              className={`py-2 px-6 rounded-md font-semibold transition-all ${activeTab === 'upload from device'
                ? 'text-white bg-blue-600 shadow-md hover:bg-blue-700'
                : 'text-blue-600 border border-blue-600 hover:bg-blue-100'
                }`}
              onClick={() => setActiveTab('upload from device')}
            >
              Upload from Device
            </button>
            <button
              className={`py-2 px-6 rounded-md font-semibold transition-all ${activeTab === 'yourImages'
                ? 'text-white bg-blue-600 shadow-md hover:bg-blue-700'
                : 'text-blue-600 border border-blue-600 hover:bg-blue-100'
                }`}
              onClick={() => setActiveTab('yourImages')}
            >
              Your Images
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 text-xl font-bold hover:text-red-500 transition duration-300"
          >
            ✕
          </button>
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default UploadImg;
