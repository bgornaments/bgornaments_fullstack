import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import arrow from '/src/assets/swirly-scribbled-arrow 3 (1).png';
import arrow2 from '/src/assets/swirly-scribbled-arrow 3.png';
import heart from '/src/assets/add-to-favorites (1).png';

interface ImageData {
  id: number;
  url: string;
  altText: string;
}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [shuffledImages, setShuffledImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<ImageData[]>('https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB');
        const shuffled = shuffleArray(response.data);
        setImages(shuffled);
        setShuffledImages(shuffled); 
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const savedLikedImages = localStorage.getItem('likedImages');
    if (savedLikedImages) {
      setLikedImages(JSON.parse(savedLikedImages));
    }
  }, []);

  const handleLike = (url: string) => {
    const updatedLikedImages = likedImages.includes(url)
      ? likedImages.filter(imageUrl => imageUrl !== url)
      : [...likedImages, url];

    setLikedImages(updatedLikedImages);
    localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
  };

  const scrollLeft = () => {
    const container = document.querySelector('.carousel-container');
    container?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.carousel-container');
    container?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const shuffleArray = (array: ImageData[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const encodeUrl = (url: string) => {
    return btoa(url); 
  };

  const handleImageClick = (url: string) => {
    const detailedViewUrl = `/catalog/${encodeUrl(url)}`;
    window.open(detailedViewUrl, '_blank', 'noopener,noreferrer');
    console.log(images)
  };

  return (
    <div className="flex flex-col">
      <div className='flex justify-between items-center px-8 md:px-14'>
        <p className="text-center text-xl md:text-2xl xl:text-3xl font-bold xs:my-5 md:my-8 text-customGreen font-custom">
          You may also like ~
        </p>
        <div className="flex justify-end md:gap-2 md:p-1">
          <button onClick={scrollLeft} className="rounded-full pt-6">
            <img src={arrow} alt="" className='w-6 md:w-10 xl:w-16' />
          </button>
          <button onClick={scrollRight} className="rounded-full pb-6">
            <img src={arrow2} alt="" className='w-6 md:w-10 xl:w-16' />
          </button>
        </div>
      </div>

      <div className="carousel-container overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar xs:px-5 md:px-8 pb-10">
        {shuffledImages.map((image, index) => (
          <div className="inline-block xs:py-1 md:py-4 xs:px-4 md:px-6 px-10 no-scrollbar" key={`${image.id}-${index}`}>
            <div className='bg-navbar p-4 md:p-6 xl:p-10 rounded-md'>
              <LazyLoadImage
                src={image.url}
                alt={image.altText}
                onClick={() => handleImageClick(image.url)}
                className="size-20 md:size-30 lg:size-40 object-cover rounded-2xl shadow-sm"
              />
              <div className='flex items-center mt-6 justify-between xl:px-2'>
                <p className="text-center text-[0.3rem] md:text-[0.4rem] lg:text-[0.6rem] text-customBlack/50">
                  {likedImages.includes(image.url) ? 'Added to Favorites' : 'Add to Favorites'}
                </p>
                <button onClick={() => handleLike(image.url)} className="focus:outline-none">
                  <img src={heart} alt="" className='w-3 md:w-4 lg:w-6' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
