import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
// import { Link } from 'react-router-dom';
import { RootState } from "../../redux/store";
import icon from "/src/assets/image.png";
import { removeLikedImage, setLikedImages } from "../../redux/likedImagesSlice";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const LikedImages: React.FC = () => {
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );
  const dispatch = useDispatch();
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedImages = localStorage.getItem("likedImages");
    if (storedLikedImages) {
      dispatch(setLikedImages(JSON.parse(storedLikedImages)));
    }
  }, [dispatch]);

  const handleUnlike = (url: string) => {
    dispatch(removeLikedImage(url));
    const updatedLikedImages = likedImages.filter(
      (imageUrl) => imageUrl !== url
    );
    localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
  };
  const encodeUrl = (url: string) => {
    return btoa(url); 
  };
  const handleImageClick = (url: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to View image details. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("redirectPath", location.pathname);
          navigate("/login");
        }
      });
      return;
    }
    const detailedViewUrl = `/catalog/${encodeUrl(url)}`;
    window.open(detailedViewUrl, "_blank", "noopener,noreferrer");
  };

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
          <button className="relative p-2">
            <div className="rounded-full md:p-[0.7vh] xl:p-[1.2vh] md:border md:shadow-sm md:shadow-black/30 md:bg-white">
              <AiOutlineHeart size={20} color="black" />
              {likedImages.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full xs:size-4 xs:text-[1.1vh] md:size-5 flex items-center justify-center md:text-xs">
                  {likedImages.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </header>

      <section className="flex flex-col gap-8 px-14 mt-6">
        <h2 className="text-2xl md:text-3xl font-medium leading-loose text-lightGolden items-center text-center font-custom">
          Liked Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-12 lg:px-10">
          {likedImages.length > 0 ? (
            likedImages.map((url) => (
              <div key={url} className="relative group w-full  min-h-[11rem] md:min-h-[10rem] lg:min-h-full">
                <div
                  onClick={() => handleImageClick(url)}
                  className="relative w-full h-full"
                >
                  <img
                    src={url}
                    alt="Liked"
                    className="w-full h-[11rem] lg:h-full object-cover rounded-lg"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 rounded-full p-1"
                  onClick={() => handleUnlike(url)}
                >
                  <AiOutlineHeart size={24} color="red" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No liked images found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LikedImages;
