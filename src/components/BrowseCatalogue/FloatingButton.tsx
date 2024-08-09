import React, { useState, useEffect } from 'react';
// import { FiPlus } from 'react-icons/fi';
import btn from "/src/assets/Group 1.png";
import arrow from "/src/assets/left-arrow.png"

const FloatingButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton(true);
      const timeout = setTimeout(() => setShowButton(false), 5000);
      setTimer(timeout);
    }, 10000);

    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleClick = () => {
    if (timer) clearTimeout(timer);
    setShowButton(!showButton);
  };

  const handleExploreMore = () => {
    window.location.href = '/modes';
  };

  return (
    <div className="fixed bottom-4 right-0">
      {showButton && (
        <button
          className=" bottom-full focus:outline-none"
          onClick={handleExploreMore}
        >
          <img
            src={btn}
            alt="Explore More"
            className="w-[12rem] transition-transform duration-300 ease-in-out"
          />
        </button>
      )}
      <button
        className="focus:outline-none"
        onClick={handleClick}
        style={{ position: 'relative' }}
      >
        <img src={arrow} alt="" className='w-[3rem]' />
      </button>
    </div>
  );
};

export default FloatingButton;
