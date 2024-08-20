import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import icon from "/src/assets/image.png";
import { removeLikedImage, setLikedImages } from '../../redux/likedImagesSlice'; 

const LikedImages: React.FC = () => {
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);
  const dispatch = useDispatch();

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
          </div>
          <button
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
      </header>
      <section className='mx-14 flex flex-col gap-8 '>

      <h2 className="text-md md:text-2xl font-serif font-medium leading-loose text-[#E0AE2A] items-center text-center">Liked Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {likedImages.length > 0 ? (
          likedImages.map((url) => (
            <div key={url} className="relative group w-full h-56">
              <Link to={`/catalog/${encodeURIComponent(url)}`} className="relative w-full h-full">
                <img
                  src={url}
                  alt="Liked"
                  className="w-full h-[15rem] object-cover rounded-lg"
                />
              </Link>
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
