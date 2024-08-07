import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import imagesData from "./images.json";
import ImageGallery from "./ImageGallery";
import icon from "/src/assets/image.png";
import { useSelector } from 'react-redux';
import { RootState} from '../../redux/store';
// import { addLikedImage, removeLikedImage } from '../../redux/likedImagesSlice';

const JewelryApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    material: "",
    gemstone: "",
    design: "",
    type: "",
  });

  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();

  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);

  // const handleLike = (id: number) => {
  //   if (likedImages.includes(id)) {
  //     dispatch(removeLikedImage(id));
  //   } else {
  //     dispatch(addLikedImage(id));
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#fff9f5] p-[2vw]">
      <header className="flex justify-between mb-4 mx-4">
        <img
          src={icon}
          alt=""
          className="xs:w-[10rem] md:w-[12rem] xl:w-[14rem]"
        />
        <div className="flex gap-[2rem]">
          <div className="relative flex items-center">
            <div className="flex items-center bg-[#F5E8D7] rounded-xl p-1 shadow-md">
              <FiSearch className="text-gray-500 ml-2" size={16} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#F5E8D7] ml-2 p-2 outline-none w-64 text-sm"
              />
            </div>
          </div>
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
      <ImageGallery
        images={imagesData}
        searchTerm={searchTerm}
        filters={filters}
        setFilters={setFilters}
        // handleLike={handleLike}
        // likedImages={likedImages}
      />
    </div>
  );
};

export default JewelryApp;
