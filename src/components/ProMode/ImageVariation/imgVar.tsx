import React, { useState } from 'react';
import UploadImg from './UploadImg';  // Ensure correct import path

const ImgVar: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);  // State to store selected image

  const sessionId = localStorage.getItem('sessionId');

  if (!sessionId) {
    alert('Session ID not found. Please refresh the page.');
  }

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);  // Update selected image
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
        }}
      ></div>

      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <div className="name flex flex-col items-center gap-1">
          <h2 className="text-xl">
            <img
              src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
              alt="Kinmitra Logo"
              className="h-5"
            />
          </h2>
          <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
            Pro Mode
          </p>
        </div>
        <p>Image Variation</p>
        <img
          className="w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
        />
      </div>

      <div className="flex flex-col items-center justify-center text-center mt-10">
        <div className="flex space-x-20 items-center justify-center w-full">
          {/* First div - Clickable area for uploading or displaying selected image */}
          <div
            className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
            onClick={() => {
              if (!selectedImage) {
                setIsUploadVisible(true); // Open UploadImg modal when clicked if no image is selected
              }
            }}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />  // Display selected image
            ) : (
              <span className="text-sm text-gray-600">Click to upload</span>  // Display "Click to upload" text
            )}
          </div>

          {/* Second div - Placeholder for Generated Image */}
          <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
            <span className="text-sm text-gray-600">Generated Image</span>
            {/* Add image rendering here */}
          </div>
        </div>
      </div>

      {isUploadVisible && (
        <UploadImg
          onClose={() => setIsUploadVisible(false)}
          sessionId={sessionId}
          onImageSelect={handleImageSelect}  // Pass the callback
        />
      )}
    </div>
  );
};

export default ImgVar;
