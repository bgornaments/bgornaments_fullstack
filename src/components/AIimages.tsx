import React, { useState, useEffect } from "react";
import icon from "/src/assets/image.png";
import download from "/src/assets/download.png";
import refresh from "/src/assets/refresh.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setImageData } from "../redux/formSlice";
import { IMAGE_GENERATOR } from "../constantsAWS";
import Lottie from "react-lottie";
import genData from "/src/assets/genData.json";

const AIimages: React.FC = () => {
  const images = useSelector((state: RootState) => state.form.imageData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [storedImages, setStoredImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: genData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem("images", JSON.stringify(images));
      setStoredImages(images);
    } else {
      const savedImages = localStorage.getItem("images");
      if (savedImages) {
        setStoredImages(JSON.parse(savedImages));
      }
    }
  }, [images]);

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

  const handleRefineDesign = async () => {
    if (selectedImage) {
      setIsLoading(true);
      setError(null);

      try {
        const payload = {
          body: JSON.stringify({
            imgURL: selectedImage,
            taskType: "IMAGE_VARIATION",
            numImages: 3,
          }),
        };

        const response = await axios.post(IMAGE_GENERATOR, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const parsedBody = JSON.parse(response.data.body);
        const newImages = parsedBody.uploaded_image_urls;
        console.log("New Image Variations:", newImages);

        const updatedImages = [...storedImages, ...newImages];
        setStoredImages(updatedImages);
        dispatch(setImageData(updatedImages));
        localStorage.setItem("images", JSON.stringify(updatedImages));
      } catch (error) {
        console.error("Error refining design:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please select an image for refinement.");
    }
  };

  // const handleExtraClose = () => {
  //   setShowExtra(false);
  // };

  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex flex-col items-center relative">
      <div className="flex flex-col gap-[1vh] items-center pt-[1vh] ">
        <img
          src={icon}
          alt=""
          className="xs:w-[24vw] md:w-[19vh] xl:w-[12vw]"
        />
        <h2 className="xs:text-[4vw] md:text-[3vw]  xl:text-[1.5vw] font-secondary text-customBlack flex justify-center">
          Let&#39;s design your perfect piece
        </h2>
      </div>
      <div className="py-[2.5vw] flex gap-[5vh] w-[70vw] h-full flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {storedImages.map((image: string, index: number) => (
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
        {error && (
          <p className="text-center text-lg text-red-500 mt-4">{error}</p>
        )}
        {isLoading && (
          <p className="text-center text-lg text-gray-500 mt-4">
            {/* Generating image variations, please wait... */}
            <Lottie options={defaultOptions} height={100} width={300} />

          </p>
        )}
        <div className="flex flex-col items-center justify-center mt-[1vw] xs:gap-[2vh] xl:gap-[3vh]">
        <button
            onClick={handleRefineDesign}
            className="flex items-center gap-[1vw] xs:text-[3vw] md:text-[2.3vw] xl:text-[1.3vw] xs:px-[2vw] xs:py-[1.2vw] md:px-[1.8vw] md:py-[1vw] xl:px-[1.2vw] xl:py-[0.8vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300"
          >
            <img src={refresh} alt="" className="w-[1.5vw]" />
            Refine Selected Design
          </button>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-[1vw] xs:text-[3vw] md:text-[2.3vw] xl:text-[1.3vw] xs:px-[2vw] xs:py-[1.2vw] md:px-[1.8vw] md:py-[1vw] xl:px-[1.2vw] xl:py-[0.8vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300"
          >
            <img src={download} alt="" className="w-[1.5vw]" />
            Download Selected Design
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AIimages;
