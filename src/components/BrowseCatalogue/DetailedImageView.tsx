import React, { useState, useEffect } from "react";
import icon from "/src/assets/image.png";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import img from "/src/assets/add-to-favorites.png";
import ai from "/src/assets/chatbot.png";
import plus from "/src/assets/plus.png";
import { FaSpinner } from 'react-icons/fa';
import { RootState, AppDispatch } from '../../redux/store';
import { addLikedImage, removeLikedImage, setLikedImages } from '../../redux/likedImagesSlice';

interface ImageData {
  url: string;
  description: string;
  material: string;
  gemstone: string;
  design: string;
  type: string;
}

const DetailedImageView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { url } = useParams<{ url: string }>();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB`);
        const data = await response.json();
        const image = data.find((img: ImageData) => img.url === url);
        setImageData(image || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(error)
      }
    };
    fetchImage();
  }, [url]);

  const handleLike = (url: string) => {
    if (likedImages.includes(url)) {
      dispatch(removeLikedImage(url));
    } else {
      dispatch(addLikedImage(url));
    }

    const updatedLikedImages = likedImages.includes(url)
      ? likedImages.filter((imageUrl) => imageUrl !== url)
      : [...likedImages, url];

    localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
  };

  useEffect(() => {
    const savedLikedImages = localStorage.getItem('likedImages');
    if (savedLikedImages) {
      dispatch(setLikedImages(JSON.parse(savedLikedImages)));
    }
  }, [dispatch]);

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
          <div className="flex flex-col md:flex-row items-center justify-center align-middle mt-[5vh] gap-[10vw] h-full">
            <img
              src={imageData.url}
              alt={imageData.description}
              className="h-[50vw] md:h-[22vw] md:max-w-[35vw] rounded-xl md:shadow-[0_0_120px_100px_#F5E8D7] shadow-[0_0_120px_30px_#F5E8D7] md:mt-[10vh]"
            />
            <div className="flex flex-col gap-[3vh] md:gap-[5vh] md:items-start items-center">
              <h2 className="text-sm tracking-wider md:font-bold text-customBlack">{imageData.type}</h2>
              <p className="text-customGreen text-xl xs:mx-10 md:mx-0 text-center md:text-start md:text-3xl tracking-widest font-bold md:max-w-[40vw] leading-relaxed">{imageData.description}</p>
              <div className="w-full">
                <hr />
                <div className="flex justify-between items-center mx-10 md:mx-4 ">
                  <p className="my-2 text-customGreen text-sm md:text-md tracking-wide">Product Details</p>
                  <img src={plus} alt="" className=" size-[3vw] md:size-[1vw]" />
                </div>
                <hr />
              </div>
              <div className="flex flex-col items-center xs:mx-10 md:mx-0">
                <p className="text-sm tracking-wider mb-4 text-customBlack text-center">Love the design? Try creating something similar with AI!</p>
                <button className="mb-4 flex justify-center items-center gap-[0.4rem] border border-customGreen py-1 px-3 rounded-xl text-sm text-customBlack font-bold">
                  <p>Generate Designs</p>
                  <img src={ai} alt="" className="w-[1.2rem]" />
                </button>
                <button
                  onClick={() => handleLike(imageData.url)}
                  className={`flex justify-center items-center gap-[0.4rem] border border-customGreen py-1 px-3 rounded-xl text-sm text-customBlack font-bold ${likedImages.includes(imageData.url) ? 'bg-customGreen text-white' : ''
                    }`}
                >
                  <p>{likedImages.includes(imageData.url) ? 'Added to Favorites' : 'Add to Favorites'}</p>
                  <img src={img} alt="" className="w-[1.1rem]" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="text-customGreen text-3xl animate-spin" />
        </div>
      )}
    </div>
  );
};

export default DetailedImageView;
