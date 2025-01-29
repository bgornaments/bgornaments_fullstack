/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

interface UploadImgProps {
  onClose: () => void;
  sessionId: string | null;
  onImageSelect: (imageUrl: string) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({ onClose, sessionId, onImageSelect }) => {
  const [activeTab, setActiveTab] = useState<'upload using qr' | 'upload from device' | 'yourImages'>('yourImages');
  const [activeSubTab, setActiveSubTab] = useState<'uploaded' | 'generated'>('uploaded');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Changed to allow multiple image selection
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
    if (activeTab === 'yourImages') {
      fetchImageUrls();
    }
  }, [activeTab, sessionId]);

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
      reader.onloadend = () => setSelectedImages((prev) => [...prev, reader.result as string]); // Add to selected images
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImages((prev) => [...prev, reader.result as string]); // Add to selected images
      reader.readAsDataURL(file);
    }
  };

  const handleGoClick = () => {
    if (selectedImages.length > 0) {
      // Add selected images to the "yourImages" list
      setImages((prevImages) => [...prevImages, ...selectedImages]);
      console.log(selectedImages[0]);
      
      // Clear the selected images from the "Upload from Device" tab
      setSelectedImages([]);
      setActiveTab('yourImages');
    }
  };

  const renderYourImagesContent = () => {
    if (activeSubTab === 'uploaded') {
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
                    onClick={() => setSelectedImages([base64])}
                  />
                  {selectedImages.includes(base64) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                      <span className="text-white text-xl font-semibold">Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              if (selectedImages.length > 0) {
                onImageSelect(selectedImages[0]); // Selecting the first image
                onClose();
              }
            }}
            className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000">
            Next
          </button>
        </div>
      );
    }
    else if (activeSubTab === 'generated') {
      return (
        <div className="flex flex-col items-center gap-4">
          {/* Placeholder for generated images content */}
          <p className="text-gray-500 text-center py-6 text-lg">No generated images yet.</p>
          <button
            onClick={() => {
              if (selectedImages.length > 0) {
                onImageSelect(selectedImages[0]); // Selecting the first image
                onClose();
              }
            }}
            className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000">
            Next
          </button>
        </div>
      );
    }
    return (
      <div className="text-gray-500 text-center py-6 text-lg">No generated images yet.</div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'yourImages') {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveSubTab('uploaded')}
              className={`py-2 px-6 rounded-md font-semibold transition-all ${activeSubTab === 'uploaded'
                ? 'text-white bg-[#E0AE2A] shadow-md'
                : 'text-[#E0AE2A] border border-[#E0AE2A] hover:bg-[#FDEEC7]'
                }`}
            >
              Your Uploaded Images
            </button>
            <button
              onClick={() => setActiveSubTab('generated')}
              className={`py-2 px-6 rounded-md font-semibold transition-all ${activeSubTab === 'generated'
                ? 'text-white bg-[#E0AE2A] shadow-md '
                : 'text-[#E0AE2A] border border-[#E0AE2A] hover:bg-[#FDEEC7]'
                }`}
            >
              Your Generated Images
            </button>
          </div>
          {renderYourImagesContent()}
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
            className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000">
            Generate QR
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 p-6 rounded-md"
        onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
        {selectedImages.length > 0 ? (
          selectedImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Selected ${idx}`} className="w-20 h-auto object-contain mb-4 rounded-md shadow-md" />
          ))
        ) : (
          <p className="text-gray-500">Drag and drop an image or click below to select an image from your device.</p>
        )}
        {!selectedImages.length ? (
          <div>
            <input type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" id="fileInput" multiple />
            <label htmlFor="fileInput" className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000">
              Upload from Device
            </label>
          </div>
        ) : (
          <button onClick={handleGoClick} className="px-6 py-3 text-[#E0AE2A] border-2 border-[#E0AE2A] rounded-md cursor-pointer
              bg-gradient-to-r from-white via-[#FDEEC7] via-[#E0AE2A] to-white
              hover:bg-gradient-to-r hover:from-white hover:via-[#E0AE2A] hover:to-[#FDEEC7] 
              hover:text-white transition duration-1000">
              Go
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-12 w-11/12 sm:w-full max-w-lg sm:max-w-2xl h-auto shadow-2xl animate-fade-in relative">
        {/* Reduced padding and width for smaller screens */}
        {/* X Button in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-xl font-bold border border-red-500 w-8 h-8 rounded-md hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
        >
          <span className="text-xl">✕</span>
        </button>

        <div className="mb-6">
          {/* Button Container */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <button
              className={`py-2 px-4 sm:py-3 sm:px-6 rounded-md text-sm sm:text-base font-semibold transition-all ${activeTab === 'upload using qr'
                  ? 'text-white bg-[#E0AE2A] shadow-md'
                  : 'text-[#E0AE2A] border border-[#E0AE2A] hover:bg-[#FDEEC7]'
                }`}
              onClick={() => setActiveTab('upload using qr')}
            >
              Quick QR Uploader
            </button>

            <button
              className={`py-2 px-4 sm:py-3 sm:px-6 rounded-md text-sm sm:text-base font-semibold transition-all ${activeTab === 'upload from device'
                  ? 'text-white bg-[#E0AE2A] shadow-md'
                  : 'text-[#E0AE2A] border border-[#E0AE2A] hover:bg-[#FDEEC7]'
                }`}
              onClick={() => setActiveTab('upload from device')}
            >
              Upload from Device
            </button>

            <button
              className={`py-2 px-4 sm:py-3 sm:px-6 rounded-md text-sm sm:text-base font-semibold transition-all ${activeTab === 'yourImages'
                  ? 'text-white bg-[#E0AE2A] shadow-md'
                  : 'text-[#E0AE2A] border border-[#E0AE2A] hover:bg-[#FDEEC7]'
                }`}
              onClick={() => setActiveTab('yourImages')}
            >
              Your Images
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );


};

export default UploadImg;
