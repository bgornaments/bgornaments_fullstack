import { Link } from "react-router-dom";
import logo from '../assets/image.png';
import img1 from "/src/assets/img1.png"
import img2 from "/src/assets/img2.png"


const Core_2 = () => {
  return (
    <>
      <div className="h-screen w-full  flex flex-col items-center gap-[8vw] mt-[1vw] bg-[#fff9f5]">
        <div className="w-[15vw]">
          <img src={logo} alt="" />
        </div>
        <div className="text-customGreen text-[9vw] text-center">
          <h1>
            From Imagination <br /> To Adornment
          </h1>
        </div>
        <div className="w-full pt-[10vh]">
          <div className="bg-customBeige  w-full h-[27vh]">
            <div className=" absolute left-10 w-[80%] h-[40%]   top-[40%] ">
              <div className="absolute  w-[85vw] h-[25vw] top-[20vw] right-[15%] rounded-[80%/90%] border border-solid border-[#b9944c] rotate-[-55.00deg]" />
              <img
                className="absolute w-[25vw] h-[35vw] top-[10vw] right-0"
                alt="Pexels cottonbro"
                src={img2}
              />
              <img
                className="absolute w-[45vw] h-[60vw]  top-[6vw] right-[40%]"
                alt="Pexels arif"
                src={img1}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-[7vh] gap-[7vw] items-center " >

          <Link to="/form" className="bg-customGreen  px-[5vw] py-[2vh] rounded-full text-customBeige">
          <div>Design Now -&gt;</div>
          </Link>

          <button className="flex items-center gap-[2vw] text-customGreen">
          <div className="rounded-full border-2 border-customGreen p-[3.5vw]">
                  <img src="/src/assets/img3.svg" alt="" className="w-[3vw]" />
                </div>
           <p>Play Video</p>
          </button>
        </div>
      </div>
      <div className="h-screen   flex justify-center items-center bg-[#fff9f5]">
      <div className="flex flex-col  h-[80%] w-[60%] gap-[2vw]">
        <div className="bg-customBeige h-1/3 rounded-lg border border-[#b9944c] flex flex-col gap-[2vw] justify-center items-center text-customGreen">
        <img src="/src/assets/img9.svg" alt="" className="size-[7vw]" />
            <p className="max-w-[60%] text-center text-[4vw]">
              Personalised Bespoke Designs
            </p>
        </div>
        <div className="bg-customBeige h-1/3 rounded-lg border border-[#b9944c] flex flex-col gap-[2vw] justify-center items-center text-customGreen">
        <img src="/src/assets/img8.svg" alt="" className="size-[7vw]" />
            <p className="max-w-[60%] text-center text-[4vw]">
              Data-Driven Insights
            </p></div>
        <div className="bg-customBeige h-1/3 rounded-lg border border-[#b9944c] flex flex-col gap-[2vw] justify-center items-center text-customGreen">
        <img src="/src/assets/img7.svg" alt="" className="size-[7vw]" />
            <p className="max-w-[60%] text-center text-[4vw]">
              Seamless User Experience
            </p></div>
      </div>
      </div>

      
    </>
  );
};

export default Core_2;
