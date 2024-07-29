import React from "react";
import { Link } from "react-router-dom";
import img10 from "/src/assets/img10.png";
import frame1 from "/src/assets/Frame (1).svg";
import frame2 from "/src/assets/Frame (2).svg";
// import Footer from "./Footer";

const Page1: React.FC = () => {
  return (
    <>
      <div className="bg-[#fff9f5] min-h-screen flex flex-col w-full p-[2rem] justify-center items-center gap-[1.3rem] md:gap-[2rem] xl:gap-[3.5rem]">
        <header>
          <h2 className="text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[3rem] leading-loose text-center w-full">
            Personalised Design Made Easy
          </h2>
        </header>
        <div className="flex xs:flex-col md:flex-row items-center gap-[2rem] xl:gap-[5rem]">
          <img
            src={img10}
            alt="Jewelry Design Example"
            className="w-[10rem] md:w-[20rem] xl:w-[25rem]"
          />
          <section className="flex flex-col  w-full items-center justify-center">
            <div className="flex flex-col p-[2rem] gap-[1.4rem] xl:max-w-[40rem]">
              <header>
                <h3 className="text-customGreen xs:text-center md:text-start text-[1.2rem] md:text-[1.4rem] xl:text-[2rem]">
                  Custom Designs Just for You
                </h3>
              </header>
              <p className="font-serif text-[#00000066] text-[1rem] xl:text-[1.3rem]">
                Leverage AI to create personalized jewellery designs tailored to
                your unique style. Answer a few questions and let AI do the
                rest.
              </p>
              <div className="text-[1rem] xl:text-[1.2rem] flex flex-col gap-[0.5rem]">
                <div className="flex gap-[1vw] items-center">
                  <img
                    src={frame1}
                    alt="Interactive Design Process"
                    className="w-[1rem] xl:w-[1.2rem]"
                  />
                  <p className="text-[#b9944c] font-serif">
                    Interactive Design Process.
                  </p>
                </div>
                <p className="text-[#00000066] font-serif">
                  Share your preferences by answering a few simple questions,
                  and our AI will generate initial jewellery design concepts for
                  you.
                </p>
              </div>
              <div className="text-[1rem] xl:text-[1.2rem] flex flex-col gap-[0.5rem] ">
                <div className="flex gap-[1vw] items-center">
                  <img
                    src={frame2}
                    alt="Tailored to Your Taste"
                    className="w-[1rem] xl:w-[1.2rem]"
                  />
                  <p className="text-[#b9944c] font-serif">
                    Tailored to Your Taste.
                  </p>
                </div>
                <p className="text-[#00000066] font-serif">
                  Our AI will ask additional questions to refine the designs,
                  ensuring the final pieces match your unique style and
                  preferences.
                </p>
              </div>
              <div className="mt-[1.5vw] flex xs:justify-center ">
                <Link
                  to="/form"
                  className="bg-customGreen px-[2rem] py-[1rem] md:px-[1.5rem] md:py-[0.7rem] text-[1rem]  rounded-full text-customBeige"
                >
                  Get Started -&gt;
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page1;
