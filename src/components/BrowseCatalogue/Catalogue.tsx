import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import icon from "/src/assets/image.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

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
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );

  return (
    <div className="min-h-screen">
      <header className="w-full h-[10vh] bg-navbar flex  items-center top-0 px-[8vw] md:px-[2.5rem] xl:px-[4.8rem]">
        <div className="flex items-center justify-between w-full">
          <Link to="/">
            <img
              src={icon}
              alt="Logo"
              className="w-[12vh] md:w-[10vh] xl:w-[20vh]"
            />
          </Link>
          <div className="flex ">
            <div className="relative flex items-center ">
              <div className="flex items-center xs:rounded-md shadow-md bg-white">
                <FiSearch className="ml-2" size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-2 md:p-[0.7vh] outline-none md:w-64 md:text-[1.7vh] w-20 text-[0.6rem] p-1 bg-white/0 text-customBlack/70"
                />
              </div>
            </div>
            <button
              onClick={() => navigate("/catalog/likedimages")}
              className="relative p-2"
            >
              <div className="rounded-full md:p-[0.7vh] xl:p-[1.2vh] md:border md:shadow-sm md:shadow-black/30 md:bg-white">
              <AiOutlineHeart size={20} color="black" />
              {likedImages.length > 0 && (
                <span className="absolute top-0 right-0 bg-customRed text-white rounded-full xs:size-4 xs:text-[1.1vh] md:size-5 flex items-center justify-center md:text-xs">
                  {likedImages.length}
                </span>
              )}
            </div>
            </button>
            <button
              className=" z-50 md:hidden"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              {sidebarVisible ? (
                <AiOutlineClose size={20} color="black" />
              ) : (
                <AiOutlineMenu size={20} color="black" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="px-[2vw] pb-10">
        <ImageGallery
          searchTerm={searchTerm}
          filters={filters}
          setFilters={setFilters}
          sidebarVisible={sidebarVisible}
        />
      </div>
    </div>
  );
};

export default JewelryApp;
