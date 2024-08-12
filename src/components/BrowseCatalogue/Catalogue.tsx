import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import imagesData from "./images.json";
import ImageGallery from "./ImageGallery";
import icon from "/src/assets/image.png";
import { useSelector } from 'react-redux';
import { RootState} from '../../redux/store';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


const JewelryApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    material: "",
    gemstone: "",
    design: "",
    type: "",
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  

  const navigate = useNavigate();
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);

  return (
    <div className="min-h-screen bg-[#fff9f5] p-[2vw]">
      <header className="flex justify-between mb-4 mx-4 items-center relative">
        <img
          src={icon}
          alt=""
          className="xs:w-[6rem] xs:h-[2rem] md:w-[12rem] md:h-[4.5rem] xl:w-[14rem]"
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
                className="bg-[#F5E8D7] ml-2 md:p-2 outline-none md:w-64 md:text-sm w-20 text-[0.6rem] p-1"
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/catalog/likedimages")}
            className="relative p-2"
          >
            <div className="rounded-full md:p-3 bg-[#F5E8D7] p-1">
              <AiOutlineHeart size={20} color="gray" />
              {likedImages.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 font-serif text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {likedImages.length}
                </span>
              )}
            </div>
          </button>
        </div>

        <button
          className=" z-50 md:hidden"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
            {sidebarVisible ? (
        <AiOutlineClose size={24} color="gray" />
      ) : (
        <AiOutlineMenu size={24} color="gray" />
      )}
        </button>
      </header>
      <ImageGallery
        images={imagesData}
        searchTerm={searchTerm}
        filters={filters}
        setFilters={setFilters}
        sidebarVisible={sidebarVisible}
      />
    </div>
  );
};

export default JewelryApp;
