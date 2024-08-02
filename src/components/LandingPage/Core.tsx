import React from "react";

import { Link } from "react-router-dom";
import img21 from "/src/assets/Group 28.png";
import img3 from "/src/assets/img3.svg"
import img4 from "/src/assets/img3.png"
import img7 from "/src/assets/img7.svg"
import img8 from "/src/assets/img8.svg"
import img9 from "/src/assets/img9.svg"
import Navbar from './Navbar';
import { useAuthenticator } from "@aws-amplify/ui-react";

const Core: React.FC = () => {
  const { user } = useAuthenticator();
  // console.log(user.signInDetails?.loginId)

  return (
    <>
    <Navbar/>
    <div className="bg-[#FFFFFF] w-full min-h-screen flex flex-col">
        <div className="h-[65vh] w-full flex">
          <div className="w-9/12 h-full flex items-center ">
          <div className="flex flex-col gap-[2vw]">
            <h1 className="font-secondary text-customGreen xl:text-[3.5vw] md:text-[4.5vw]  ml-[2.5vw] px-[3vw] tracking-wide leading-relaxed">
              From Imagination <br /> to Adornment
            </h1>
            <h2 className="ml-[2.5vw] px-[3vw] text-[1.5vw] text-customBlack">
             Welcome to KinVision {user && `, ${user.signInDetails?.loginId}`}
            </h2>
            <div className="ml-[2.5vw] px-[3vw] flex gap-10">
              <Link to="/form" className="rounded-full bg-customGreen px-[2vw] py-[1vw] text-white/80 md:text-[1.5vw] xl:text-[1vw]">
                Design Now -&gt;
              </Link>
              <button className="flex justify-center items-center gap-3 md:text-[1.5vw] xl:text-[1vw] text-customGreen">
                <div className="rounded-full border-2 border-customGreen p-[1vw]">
                  <img src={img3} alt="" className="w-[1vw]" />
                </div>
                <div>Play Video</div>
              </button>
            </div>
          </div>
          
          </div>
          <div className="w-3/12 bg-[#FDF5E6] h-full flex items-center "></div>
          <img
            src={img21}
            alt=""
            className="absolute  md:right-[3vw] xl:right-[8vw] md:top-[25vh] xl:top-[18vh] xl:h-[50vh] md:h-[30vh]"
          />
        </div>
        <div className="h-[20vh] w-full flex">
          <div className="w-9/12 bg-[#FDF5E6] h-full flex items-center">
            <div className="border-r border-[#b9944c] bg-customGreen md:h-[25vh] lg:h-[28vh] w-1/4 ">
              <div className="w-[90%] flex justify-center">
                <img src={img4} alt="" className="md:w-[11vh] lg:w-[13vh]" />
              </div>
            </div>
            <div className="border-r border-[#b9944c] w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-customGreen">
              <img src={img9} alt="" className=" md:w-[3vh] xl:w-[4vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2vh] xl:max-w-[60%]">
                Personalised Bespoke Designs
              </p>
            </div>
            <div className="border-r border-[#b9944c] w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-customGreen">
              <img src={img8} alt="" className=" md:w-[3vh] xl:w-[4vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2vh] xl:max-w-[60%]">
                Data-Driven Insights
              </p>
            </div>
            <div className="border-r border-[#b9944c] w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-customGreen">
              <img src={img7} alt="" className=" md:w-[3vh] xl:w-[4vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2vh] xl:max-w-[60%]">
                Seamless User Experience
              </p>
            </div>
          </div>
          <div className="w-3/12 h-full"></div>
        </div>
      </div>

    </>
  );
};

export default Core;
// {
//   "username": "84680408-5021-7095-5833-9fb9b96f8876",
//   "userId": "84680408-5021-7095-5833-9fb9b96f8876",
//   "signInDetails": {
//       "loginId": "vanshikas2022@gmail.com",
//       "authFlowType": "USER_SRP_AUTH"
//   }
// }