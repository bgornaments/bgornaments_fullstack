import React from 'react';
import { Link } from 'react-router-dom';

const LikedImages: React.FC = () => {

  return (
    <div className="m-10 flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-4">Liked Images</h2>
      {/* <div className="grid grid-cols-4 gap-4">
        {likedImagesData.length === 0 ? (
          <div className='flex justify-center items-center'>
            <p>No liked images yet.</p>
          </div>
        ) : (
          likedImagesData.map(image => (
            <div key={image.id} className="relative group w-[20vw] h-[20vw]">
              <img src={image.src} alt={image.description} className="w-[20vw] h-[20vw] object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white p-2 text-center">
                <p>{image.description}</p>
              </div>
              <button
                className="absolute top-2 right-2  rounded-full p-1"
                onClick={() => handleLike(image.id)}
              >
                <AiOutlineHeart size={24} color={likedImages.includes(image.id) ? 'red' : 'gray'} />
              </button>
            </div>
          ))
        )}
      </div> */}
      <footer className="flex justify-center">
        <Link to="/catalog" className="p-2">
          Back to Gallery
        </Link>
      </footer>
    </div>
  );
};

export default LikedImages;
