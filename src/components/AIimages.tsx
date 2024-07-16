import React, { useState } from "react";
import icon from "/src/assets/image.png";
import { useLocation } from "react-router-dom";
import download from "/src/assets/download.png";
import refresh from "/src/assets/refresh.png";

const AIimages: React.FC = () => {
  const location = useLocation();
  const { images } = location.state || {};

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleDownloadImage = async () => {
    if (selectedImage) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = selectedImage;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(image, 0, 0);
          const dataURL = canvas.toDataURL("image/png");

          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "ai-generated-image.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      image.onerror = (error) => {
        console.error("Error loading image for download:", error);
      };
    }
  };

  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex flex-col items-center">
    <div className="mt-[2vw]">
      <img src={icon} alt="" className="w-[12vw]" />
    </div>
    <h2 className="text-[1.5vw] font-secondary text-customBlack">
      Select your Perfect Design
      </h2>
    <div className="py-[2.5vw] flex gap-[3vw] w-[70vw] h-full flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image: string, index:number) => (
          <div
            key={index}
            className={`flex transition transform hover:scale-110 duration-300 justify-center items-center border rounded-xl cursor-pointer bg-customGreen ${
              selectedImage === image
                ? "border-[0.4vw] border-customGreen"
                : "border-gray-300"
            }`}
            onClick={() => handleSelectImage(image)}
          >
            <img
              src={image}
              alt={`Generated ${index}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>

        <div className="flex flex-col items-center justify-center mt-[1vw] gap-[1vw]">
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-[1vw] text-[1.2vw] px-[2vw] py-[1vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300"
          >
              <img src={download} alt="" className="w-[1.5vw]" />
            Download Selected Design
          </button>
          <button className="flex items-center gap-[1vw] text-[1.2vw] px-[2vw] py-[1vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300">
          <img src={refresh} alt="" className="w-[1.5vw]" />
            
            Refine Selected Design
          </button>
        </div>

      </div>
  </div>
  );
};

export default AIimages;
