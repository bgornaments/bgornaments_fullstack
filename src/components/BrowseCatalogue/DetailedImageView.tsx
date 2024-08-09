import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imagesData from "./images.json";
import icon from "/src/assets/image.png";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import img from "/src/assets/add-to-favorites.png"
import ai from "/src/assets/chatbot.png"
import plus from "/src/assets/plus.png"

const DetailedImageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imageData, setImageData] = useState<any>(null);
  // const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );


  useEffect(() => {
    const image = imagesData.find((img) => img.id === parseInt(id || "0"));
    setImageData(image);
  }, [id]);

  // const handleRefineDesign = async () => {
  //   if (imageData) {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       console.log("clicked");
  //       console.log(id);
  //       setGeneratedImages([]);
  //     } catch (error) {
  //       setError("Error refining design. Please try again.");
  //       console.error("Error refining design:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#fff9f5] p-[2vw]">
      <header className="flex justify-between mb-4 mx-4">
        <img
          src={icon}
          alt=""
          className="xs:w-[10rem] md:w-[12rem] xl:w-[14rem] "
        />
        <div className="flex gap-[2rem]">
          <button
            onClick={() => navigate("/catalog/likedimages")}
            className="relative p-2"
          >
            <div className="rounded-full p-3 bg-[#F5E8D7]">
              <AiOutlineHeart size={20} color="gray" />
              {likedImages.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 font-serif text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {likedImages.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </header>
      {imageData ? (
        <>
          <div className="flex items-center justify-center align-middle mt-[5vh] gap-[10vw] h-full">
            <img
              src={imageData.src}
              alt={imageData.description}
              className="h-[22vw] max-w-[35vw] rounded-xl shadow-[0_0_120px_100px_#F5E8D7] mt-[10vh]"
            />
            <div className="flex flex-col gap-[5vh]">
              <h2 className="text-sm tracking-wider font-bold text-customBlack">{imageData.type}</h2>
              <p className="text-customGreen text-3xl tracking-widest font-bold max-w-[40vw] leading-relaxed">{imageData.description}</p>
              <div className="w-full">
                <hr />
                <div className="flex justify-between items-center">
                <p className="my-2 text-customGreen text-md mx-4 tracking-wide">Product Details</p>
                <img src={plus} alt="" className="size-[1vw] mx-4" />
                </div>
                <hr />
              </div>
              <div>
              <p className="text-sm tracking-wider mb-4 text-customBlack">Love the design? Try creating something similar with AI!</p>
              <button className="mb-4 flex justify-center items-center gap-[0.4rem] border border-customGreen py-1 px-3 rounded-xl text-sm text-customBlack font-bold">
              <p>Generate Designs</p>
              <img src={ai} alt="" className="w-[1.2rem]" />
              </button>
              <button className="flex justify-center items-center gap-[0.4rem] border border-customGreen py-1 px-3 rounded-xl text-sm text-customBlack font-bold">
              <p>Add to Favorites</p>
              <img src={img} alt="" className="w-[1.1rem]" />
              </button>

              </div>
          
            </div>
          </div>
          {/* {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4">
            {generatedImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Generated ${idx}`}
                className="w-1/4 h-auto"
              />
            ))}
          </div> */}
        </>
      ) : (
        <p>Loading image data...</p>
      )}
    </div>
  );
};

export default DetailedImageView;
