import React, { useState, useEffect } from 'react';

interface OutfitBasedJewelryProps {
  onClose: () => void;
}

const OutfitBasedJewelry: React.FC<OutfitBasedJewelryProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'yourImages'>('upload');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = 'unknown'; // Fixed userId for now

  // Set Initial Session ID on Component Mount
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
      setSessionId(newSessionId);
      console.log('Initialized Session ID:', newSessionId);
    }
  }, [sessionId]);

  // Generate QR Code based on sessionId
  const handleGenerateQRCode = () => {
    if (!sessionId) {
      alert('Session ID not set. Please try again.');
      return;
    }

    try {
      console.log('Generating QR Code for Session ID:', sessionId);

      const redirectUrl = `https://bgo-mobile-upload-website-j9cf.vercel.app/?userId=${userId}&sessionId=${sessionId}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        redirectUrl
      )}&size=150x150`;

      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  // Fetch Images from Backend
  const fetchImageUrls = async () => {
    if (!sessionId) {
      console.warn('Session ID not set. Cannot fetch images.');
      return;
    }

    console.log('Fetching images for userId:', userId, 'and sessionId:', sessionId);

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
      console.log('Full API Response:', data);

      // Flatten the array of URLs if it's nested
      const urls = data.urls.flat() || []; // Using .flat() to flatten the array of arrays
      console.log('Fetched Image URLs:', urls);

      if (urls.length > 0) {
        setImages(urls);
        console.log('Images set to state successfully.');
      } else {
        console.warn('No images found for the provided sessionId.');
      }
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      alert('Failed to load images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch images when "Your Images" tab is selected
  useEffect(() => {
    if (activeTab === 'yourImages') {
      fetchImageUrls();
    }
  }, [activeTab]);

  // Render Tab Content
  const renderTabContent = () => {
    if (activeTab === 'upload') {
      return (
        <div className="flex flex-col items-center gap-4">
          {/* QR Code Display Space */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center border rounded-md">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" className="max-h-full" />
            ) : (
              <p className="text-gray-500">QR code will appear here after clicking "Generate QR"</p>
            )}
          </div>
          <button
            onClick={handleGenerateQRCode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Generate QR
          </button>
        </div>
      );
    } else if (activeTab === 'yourImages') {
      return (
        <div className="flex flex-col items-center gap-4">
          {isLoading ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images found for this session.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            {/* Tab Buttons */}
            <button
              className={`py-2 px-4 ${activeTab === 'upload' ? 'text-white bg-gray-700' : 'text-gray-700'}`}
              onClick={() => setActiveTab('upload')}
            >
              Generate QR
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'yourImages' ? 'text-white bg-gray-700' : 'text-gray-700'}`}
              onClick={() => setActiveTab('yourImages')}
            >
              Your Images
            </button>
          </div>
          {/* Close Button */}
          <button onClick={onClose} className="text-gray-700 text-lg font-bold">
            ✕
          </button>
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default OutfitBasedJewelry;
