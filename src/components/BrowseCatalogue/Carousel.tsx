import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        setImages(response.data);
        setShuffledImages(shuffleArray(response.data)); 
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
    console.log(images)
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

  const handleImageClick = (url: string) => {
  
    const detailedViewUrl = `/catalog/${encodeURIComponent(url)}`;
    window.open(detailedViewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col">
      <div className='flex justify-between items-center px-14'>
        <p className="text-center text-2xl font-bold my-8 text-customGreen">
          You may also like ~
        </p>
        <div className="flex justify-end gap-2 p-2">
          <button onClick={scrollLeft} className="rounded-full pt-6">
            <img src={arrow} alt="" className='w-16' />
          </button>
          <button onClick={scrollRight} className="rounded-full pb-6">
            <img src={arrow2} alt="" className='w-16' />
          </button>
        </div>
      </div>

      <div className="carousel-container overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
        {shuffledImages.map((image, index) => (
          <div className="inline-block py-4 px-10 no-scrollbar" key={`${image.id}-${index}`}>
            <div className='bg-[#F5E8D7] p-10 rounded-md'>
              <img src={image.url} alt={image.altText} onClick={() => handleImageClick(image.url)} className="w-40 h-40 object-cover rounded-2xl shadow-sm" />
              <div className='flex items-center mt-6 justify-between px-2'>
                <p className="text-center text-[0.6rem] text-[#00000080]">
                  {likedImages.includes(image.url) ? 'Added to Favorites' : 'Add to Favorites'}
                </p>
                <button onClick={() => handleLike(image.url)} className="focus:outline-none">
                  <img src={heart} alt="" className='w-6' />
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
