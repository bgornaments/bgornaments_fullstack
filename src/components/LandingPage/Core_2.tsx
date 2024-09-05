import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/image.png";
import img21 from "/src/assets/Group 28.png";
import img3 from "/src/assets/img3.svg";
import img7 from "/src/assets/img7.svg";
import img8 from "/src/assets/img8.svg";
import img9 from "/src/assets/img9.svg";
import Navbar from './Navbar';

// import { useAuthenticator } from "@aws-amplify/ui-react";

const Core_2: React.FC = () => {
  // const { user } = useAuthenticator();
  // console.log(user.signInDetails?.loginId)
  // console.log(user)
  return (
    <>
      <Navbar />
      <div className="flex flex-col ">
        <div className="bg-[#ffffff] min-h-screen w-full flex flex-col  items-center gap-[10vh]">
          <div className="flex gap-[3vh] flex-col items-center mt-[3vh]">
            <div>
              <img src={logo} alt="" className="w-[12rem]" />
            </div>
            <div className="text-customGreen xs:text-[2rem] text-center ">
              <h1>
                From Imagination <br /> To Adornment
              </h1>
            </div>
          </div>

          <div className="bg-customBeige h-[30vh] w-full flex items-center justify-center ">
            <img className="w-[45vh]" alt="Pexels arif" src={img21} />
          </div>

          <div className="flex gap-[3vw] text-[1rem] justify-center items-center ">
            <Link
              to="/form"
              className="bg-customGreen px-[2rem] py-[1rem] rounded-full text-white"
            >
              <div>Design Now -&gt;</div>
            </Link>

            <button className="flex items-center gap-[1vw] text-customGreen justify-center">
              <div className="rounded-full border-2 border-customGreen p-[0.8rem]">
                <img src={img3} alt="" className="w-[1rem]" />
              </div>
              <p>Play Video</p>
            </button>
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center bg-[#fff9f5] sm:pt-[2rem] pb-[3rem]">
          <div className="flex flex-col h-[80%] w-[60%] gap-[5vh] ">
            <div className="bg-customBeige gap-[0.6rem] min-h-[10rem] rounded-lg border border-[#b9944c] flex flex-col justify-center items-center text-customGreen">
              <img src={img9} alt="" className="size-[2rem]" />
              <p className="max-w-[60%] text-center text-[1rem]">
                Personalised Bespoke Designs
              </p>
            </div>
            <div className="bg-customBeige gap-[0.6rem] min-h-[10rem] rounded-lg border border-[#b9944c] flex flex-col justify-center items-center text-customGreen">
              <img src={img8} alt="" className="size-[2rem]" />
              <p className="max-w-[60%] text-center text-[1rem]">
                Data-Driven Insights
              </p>
            </div>
            <div className="bg-customBeige gap-[0.6rem] min-h-[10rem] rounded-lg border border-[#b9944c] flex flex-col justify-center items-center text-customGreen">
              <img src={img7} alt="" className="size-[2rem]" />
              <p className="max-w-[60%] text-center text-[1rem]">
                Seamless User Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Core_2;
