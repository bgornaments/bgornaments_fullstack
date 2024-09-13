import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";

const AIimages: React.FC = () => {
  const images = useSelector((state: RootState) => state.form.imageData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [storedImages, setStoredImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { user } = useAuthenticator();
  const navigate = useNavigate();
  const location = useLocation(); 

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
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to download images. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('redirectPath', location.pathname);
          navigate("/login");
        }
      });
      return;
    }

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
            numImages: 3
          }),
        };

        const response = await axios.post(IMAGE_GENERATOR, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsedBody = JSON.parse(response.data.body);
        console.log("Parsed body: ",parsedBody);
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

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <div className="flex flex-col gap-[3vh] items-center pt-[2vh] ">
        <img
          src={icon}
          alt=""
          className="xs:w-[3.8rem] md:w-[4.8rem] xl:w-[6.5rem]"
        />
        <h2 className="text-lightGolden flex justify-center xs:text-[1.3rem] md:text-[2.7vw] xl:text-[2.3vw] tracking-widest leading-tight font-custom text-center">
          Select your Personalised Design
        </h2>
      </div>
      <div className="py-[2.5vw] flex gap-[5vh] w-[70vw] h-full flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {storedImages.map((image: string, index: number) => (
            <div
              key={index}
              className={`flex transition transform hover:scale-110 duration-300 justify-center items-center border rounded-xl cursor-pointer bg-navbar ${
                selectedImage === image
                  ? "border-[0.4vw] border-customGreen"
                  : "border-customGreen"
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
          <div className="text-center text-lg text-gray-500 mt-4">
            {/* Generating image variations, please wait... */}
            <Lottie options={defaultOptions} height={100} width={300} />
          </div>
        )}
        <div className="flex flex-col items-center justify-center mt-[1vw] xs:gap-[2vh] xl:gap-[3vh]">
          <button
            onClick={handleRefineDesign}
            className="flex items-center gap-[1vw]  xs:text-[1rem] md:text-[2.4vw] xl:text-[2vw] tracking-widest leading-tight font-custom text-center xs:px-[2vw] xs:py-[1.2vw] md:px-[1.8vw] md:py-[1vw] xl:px-[1.2vw] xl:py-[0.8vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300"
          >
            <img src={refresh} alt="" className="w-[1.5vw]" />
            Refine Selected Design
          </button>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-[1vw]  xs:text-[1rem] md:text-[2.4vw] xl:text-[2vw] tracking-widest leading-tight font-custom text-center xs:px-[2vw] xs:py-[1.2vw] md:px-[1.8vw] md:py-[1vw] xl:px-[1.2vw] xl:py-[0.8vw] rounded-3xl cursor-pointer shadow-md shadow-[#F5E8D7] text-[#B9944C] border border-[#B9944C] transition transform hover:scale-105 duration-300"
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