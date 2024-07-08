import React from 'react';
import { Link } from 'react-router-dom';

const Core: React.FC = () => {
  return (
    <div className="div1 w-full h-screen">
      <div className="absolute right-1/2 p-[2vw]">
        <img src="/src/assets/image.png" alt="" className="w-[3.5vw]" />
      </div>
      <div className="bg-[#fff9f5] h-2/3 flex">
        <div className="w-9/12 flex items-center">
          <div className="flex flex-col gap-[2vw] lg:mt-[15vh]">
            <h1 className="font-secondary text-customGreen text-[4vw] ml-[2.5vw] px-[3vw] tracking-wide leading-relaxed">
              From Imagination <br /> to Adornment
            </h1>
            <h2 className="ml-[2.5vw] px-[3vw] text-[1.5vw] text-customBlack">
              Welcome to BgOrnaments
            </h2>
            <div className="ml-[2.5vw] px-[3vw] flex gap-10">
              <Link to="/form" className="rounded-full bg-customGreen px-[2vw] py-[1vw] text-white/80 text-[1vw]">
                Design Now -&gt;
              </Link>
              <button className="flex justify-center items-center gap-3 text-[1vw] text-customGreen">
                <div className="rounded-full border-2 border-customGreen p-[1vw]">
                  <img src="/src/assets/img3.svg" alt="" className="w-[1vw]" />
                </div>
                <div>Play Video</div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute w-[40vw] h-[72.2vh] right-[4vw] md:top-[15%] xl:top-[1%]">
          <div className="absolute w-[39vw] h-[10vw] top-[15vw] right-[15%] rounded-[80%/90%] border border-solid border-[#b9944c] rotate-[-55.00deg]" />
          <img
            className="absolute w-[12vw] h-[20vw] top-[10vw] right-0"
            alt="Pexels cottonbro"
            src="/src/assets/img2.png"
          />
          <img
            className="absolute w-[20vw] h-[28vw] top-[6vw] right-[40%]"
            alt="Pexels arif"
            src="/src/assets/img1.png"
          />
        </div>
        <div className="w-3/12 bg-[#f5e8d7] h-[72.2vh]"></div>
      </div>
      <div className="bg-[#fff9f5] h-1/3 flex items-center">
        <div className="w-1/5 h-[75%] bg-customGreen">
          <div className="w-[90%] flex justify-center">
            <img src="/src/assets/img3.png" alt="" className="sm:w-[60%] md:w-[45%] xl:w-[35%]" />
          </div>
        </div>
        <div className="h-2/3 w-[55%] bg-[#f5e8d7] flex">
          <div className="border-r border-[#b9944c] w-1/3 flex flex-col gap-6 justify-center items-center text-customGreen">
            <img src="/src/assets/img9.svg" alt="" className="size-[2.5vw]" />
            <p className="max-w-[60%] text-center text-[1.2vw]">
              Personalised Bespoke Designs
            </p>
          </div>
          <div className="border-r border-[#b9944c] w-1/3 flex flex-col gap-6 justify-center items-center text-customGreen">
            <img src="/src/assets/img8.svg" alt="" className="size-[2.5vw]" />
            <p className="max-w-[60%] text-center text-[1.2vw]">
              Data-Driven Insights
            </p>
          </div>
          <div className="w-1/3 flex flex-col gap-6 justify-center items-center text-customGreen">
            <img src="/src/assets/img7.svg" alt="" className="size-[2.5vw]" />
            <p className="max-w-[60%] text-center text-[1.2vw]">
              Seamless User Experience
            </p>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Core;
