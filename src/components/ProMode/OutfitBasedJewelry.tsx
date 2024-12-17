import React, { useState } from 'react';

interface OutfitBasedJewelryProps {
  onClose: () => void;
}

const OutfitBasedJewelry: React.FC<OutfitBasedJewelryProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'yourImages'>('upload');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const generateRandomSessionId = (): number => {
    return Math.floor(Math.random() * 1000000); // Generate a random session ID
  };

  const handleGenerateQRCode = () => {
    try {
      const userId = 'unknown';
      const sessionId = generateRandomSessionId();

      // Construct the redirect URL with the desired domain
      const redirectUrl = `https://bgo-mobile-upload-website-j9cf.vercel.app/?userId=${userId}&sessionId=${sessionId}`;

      // Construct the QR code URL using the redirect URL
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(redirectUrl)}&size=150x150`;

      // Set the generated QR code URL in state
      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'upload') {
      return (
        <div className="flex flex-col items-center gap-4">
          {/* QR Code Display Space */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center border rounded-md">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" className="max-h-full" />
            ) : (
              <p className="text-gray-500">QR code will appear here</p>
            )}
          </div>
          {/* Generate QR Code Button */}
          <button
            onClick={handleGenerateQRCode}
            className="bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] text-white py-2 px-6 rounded-md"
          >
            Generate QR Code
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500">Please upload an image to view here.</p>
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
          <button
            onClick={onClose}
            className="text-gray-700 text-lg font-bold"
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

export default OutfitBasedJewelry;
