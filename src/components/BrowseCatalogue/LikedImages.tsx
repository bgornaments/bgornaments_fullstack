import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import icon from "/src/assets/image.png";
import { removeLikedImage, setLikedImages } from '../../redux/likedImagesSlice'; 
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";

const LikedImages: React.FC = () => {
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);
  const dispatch = useDispatch();
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedImages = localStorage.getItem('likedImages');
    if (storedLikedImages) {
      dispatch(setLikedImages(JSON.parse(storedLikedImages)));
    }
  }, [dispatch]);

  const handleUnlike = (url: string) => {
    dispatch(removeLikedImage(url));
    const updatedLikedImages = likedImages.filter((imageUrl) => imageUrl !== url);
    localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
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
          localStorage.setItem('redirectPath', location.pathname);
          navigate("/login");
        }
      });
      return;
    }
    const detailedViewUrl = `/catalog/${encodeURIComponent(url)}`;
    window.open(detailedViewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen  p-[2vw]">
      <header className="flex justify-between mb-4 mx-14 items-center relative">
        <img
          src={icon}
          alt=""
         className="xs:w-[4.2rem] md:w-[5.4rem] xl:w-[8.5rem]"
        />
        <div className="flex gap-[2rem]">
          <div className="relative flex items-center">
          </div>
          <button
            className="relative p-2"
          >
            <div className="rounded-full md:p-3  p-1 border  bg-navbar">
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
      <section className='mx-14 flex flex-col gap-8 '>

      <h2 className="text-md md:text-3xl font-medium leading-loose text-lightGolden items-center text-center font-custom">Liked Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {likedImages.length > 0 ? (
          likedImages.map((url) => (
            <div key={url} className="relative group w-full h-56">
              <div onClick={() => handleImageClick(url)} className="relative w-full h-full">
                <img
                  src={url}
                  alt="Liked"
                  className="w-full h-[15rem] object-cover rounded-lg"
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
