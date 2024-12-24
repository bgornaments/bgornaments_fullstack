/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

interface UploadImgProps {
  onClose: () => void;
  sessionId: string | null;
  onImageSelect: (imageUrl: string) => void; // Callback to send the selected image
}

const UploadImg: React.FC<UploadImgProps> = ({ onClose, sessionId, onImageSelect }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'yourImages'>('yourImages');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = 'unknown'; // Fixed userId for now

  useEffect(() => {
    if (!sessionId) return;

    const fetchImageUrls = async () => {
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
        setImages(urls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
        alert('Failed to load images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrls();
  }, [sessionId]);

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

  // const handleNextImage = () => {
  //   if (images.length > 0) {
  //     const nextIndex = (images.indexOf(selectedImage || images[0]) + 1) % images.length;
  //     setSelectedImage(images[nextIndex]);
  //   }
  // };

  const renderTabContent = () => {
    if (activeTab === 'yourImages') {
      return (
        <div className="flex flex-col items-center gap-4">
          {isLoading ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => setSelectedImage(url)}
                  />
                  {selectedImage === url && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                      <span className="text-white text-xl">Selected</span>
                    </div>
                  )}
                </div>
              ))}
              {/* Next Button */}
              <button
                onClick={() => {
                  if (selectedImage) {
                    onImageSelect(selectedImage); // Pass selected image to parent
                    onClose(); // Close the modal after selection
                  }
                }}
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No images found for this session.</p>
          )}
        </div>
      );
    } else if (activeTab === 'upload') {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center border rounded-md shadow-md">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" className="max-h-full" />
            ) : (
              <p className="text-gray-500">QR code will appear here after clicking "Generate QR"</p>
            )}
          </div>
          <button
            onClick={handleGenerateQRCode}
            className="px-6 py-3 mt-4 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition"
          >
            Generate QR
          </button>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className={`py-2 px-6 ${activeTab === 'upload' ? 'text-white bg-blue-500' : 'text-blue-500'}`}
              onClick={() => setActiveTab('upload')}
            >
              Generate QR
            </button>
            <button
              className={`py-2 px-6 ${activeTab === 'yourImages' ? 'text-white bg-blue-500' : 'text-blue-500'}`}
              onClick={() => setActiveTab('yourImages')}
            >
              Your Images
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-700 text-xl font-bold hover:text-red-500 transition"
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
