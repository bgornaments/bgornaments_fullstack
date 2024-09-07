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
    <div className="bg-white w-full min-h-screen flex flex-col">
        <div className="h-[65vh] w-full flex">
          <div className="w-9/12 h-full flex items-center ">
          <div className="flex flex-col gap-[1.7vw] px-[5vw]">
            <h1 className="font-custom font-bold text-customGreen xl:text-[4.5vw] md:text-[3.5vw] tracking-widest leading-tight">
              From Imagination <br /> To Adornment
            </h1>
            <h2 className="text-[1.5vw] text-lightGolden">
             Welcome to KinMitra <span className="text-[0.8vw] italic">{user && `${user.signInDetails?.loginId}`}</span>
            </h2>
            <div className="flex gap-14">
              <Link to="/form" className="rounded-full border border-customGreen text-customGreen px-[2vw] py-[0.8vw] md:text-[1.5vw] xl:text-[1vw]">
                Design Now -&gt;
              </Link>
              <button className="flex justify-center items-center gap-3 md:text-[1.5vw] xl:text-[1vw] text-customGreen">
                <div className="rounded-full border-2 border-customRed p-[1vw] flex justify-center items-center">
                  <img src={img3} alt="" className="w-[0.8vw]" />
                </div>
                <div>Play Video</div>
              </button>
            </div>
          </div>
          
          </div>
          <div className="w-3/12 bg-navbar h-full flex items-center "></div>
          <img
            src={img21}
            alt=""
            className="absolute  md:right-[3vw] xl:right-[8vw] md:top-[25vh] xl:top-[16vh] xl:h-[55vh] md:h-[30vh]"
          />
        </div>
        <div className="h-[20vh] w-full flex">
          <div className="w-9/12 bg-navbar h-full flex items-center">
            <div className="border-r border-darkGolden bg-custom-gradient rounded-r-3xl md:h-[25vh] lg:h-[28vh] w-1/4 ">
              <div className="w-[90%] flex justify-center">
                <img src={img4} alt="" className="md:w-[11vh] lg:w-[13vh]" />
              </div>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden ">
              <img src={img9} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Personalised <br /> Bespoke <br /> Designs
              </p>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden">
              <img src={img8} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Data- <br />Driven <br />Insights
              </p>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden">
              <img src={img7} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Seamless <br />User <br /> Experience
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