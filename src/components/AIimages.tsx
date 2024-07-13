import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setImageData } from "../redux/formSlice";
import icon from "/src/assets/image.png";

interface RootState {
  form: {
    imageData: string[];
  };
}

const AIimages: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageData = useSelector((state: RootState) => state.form.imageData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!Array.isArray(imageData) || imageData.length === 0) {
      setIsLoading(true);
      axios
        .get("/api/get-images") // Replace with your actual API endpoint
        .then((response) => {
          dispatch(setImageData(response.data));
        })
        .catch((error) => console.error("Error fetching images:", error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, imageData]);

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleDownloadImage = () => {
    if (selectedImage) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${selectedImage}`;
      link.download = "ai-generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSendImageDetails = () => {
    if (selectedImage) {
      axios
        .post("/api/refine-image", { image: selectedImage })
        .then((response) => {
          console.log("Image details sent:", response.data);
        })
        .catch((error) => console.error("Error sending image details:", error));
    }
  };

  return (
    <div className="p-8 bg-[#fff9f6] min-h-screen flex flex-col items-center justify-center">
      {isLoading ? (
        <p className="text-2xl">Loading...</p>
      ) : (
        <div className="flex flex-col items-center bg-[#fff9f6] pt-[2vw] min-h-screen">
          <div>
            <img src={icon} alt="icon" className="w-[5vh]" />
          </div>
          <div className="w-[80%] sm:w-[60%] mt-[3vw] flex flex-col gap-[3vw]">
            <h2 className="text-[1.2rem] sm:text-[1.5rem] font-secondary text-customBlack">
              Select your Perfect Design
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageData.map((image, index) => (
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
                    src={`data:image/png;base64,${image}`}
                    alt={`Generated ${index}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center mt-[1vw] gap-[1vw]">
              <button
                onClick={handleDownloadImage}
                className="transition transform hover:scale-105 duration-300 border border-[#B9944C] px-[2vw] py-[1vw] rounded-full text-[#B9944C] text-[1.3vw] shadow-md shadow-[#b9954c32]"
              >
                Download Selected Design
              </button>
              <button
                onClick={handleSendImageDetails}
                className="transition transform hover:scale-105 duration-300 border border-[#B9944C] px-[2vw] py-[1vw] rounded-full text-[#B9944C] text-[1.3vw] shadow-md shadow-[#b9954c32]"
              >
                Refine Selected Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIimages;
