import React from "react";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (
    <>
      {/* <div className="bg-[#fff9f5] h-screen flex flex-col w-full p-[3vw] justify-center  items-center gap-[8vw]">
        <div>
          <h2 className="text-customGreen text-[3vw] leading-loose">
            Personalised Design Made Easy
          </h2>
        </div>
        <div className="flex flex-col md:flex-row w-full h-full bg-blue-500 justify-center items-center gap-[5vw]">
          <div className=" flex justify-center items-center">
            <img src="/src/assets/img10.png" alt="" className="w-[30vw]" />
          </div>
          <div className=" bg-blue-200 flex flex-col gap-[1.5vw]">
            <div>
              <h3 className="text-customGreen text-[1.5vw]">
                Custom Designs just for You
              </h3>
            </div>
            <div>
              <p className="font-serif text-[#00000066] text-[1.3vw] max-w-[34vw] ">
                Leverage AI to create personalized jewellery designs tailored to
                your unique style. Answer a few questions and let AI do the
                rest.
              </p>
            </div>
            <div className="text-[1.2vw] flex flex-col gap-[1vw]">
              <div className="flex gap-[1vw]">
                <img src="/src/assets/Frame (1).svg" alt="" className="w-[1.5vw]" />
                <p className="text-[#b9944c] font-serif">Interactive Design Process. </p>
              </div>
              <p className="text-[#00000066] max-w-[30vw] font-serif">
              Share your preferences by answering a few simple questions, and
              our AI will generate initial jewellery design concepts for you.
              </p>
            </div>
            <div className="text-[1.2vw] flex flex-col gap-[1vw]">
              <div className="flex gap-[1vw]">
                <img src="/src/assets/Frame (2).svg" alt="" className="w-[1.5vw]"/>
                <p className="text-[#b9944c] font-serif">Tailored to Your Taste. </p>
              </div>
              <p className="text-[#00000066] max-w-[30vw] font-serif">
                Our AI will ask additional questions to refine the designs,
                ensuring the final pieces match your unique style and
                preferences.
              </p>
            </div>

            <div>
            <button className="rounded-full bg-customGreen px-[2vw] py-[1vw] text-white/80 text-[1vw]">
                Get Started -&gt;
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="bg-[#fff9f5] h-screen flex flex-col w-full xs:p-[10vw] md:p-[3vw] justify-center items-center xs:gap-[6vh] md:gap-[8vh]">
        <header>
          <h2 className="text-customGreen xs:text-[6vw] md:text-[3vw] leading-loose text-center">
            Personalised Design Made Easy
          </h2>
        </header>
        <section className="flex flex-col md:flex-row w-full h-full items-center justify-center xs:gap-[5vh] md:gap-[25vh]">
          <div className="flex justify-center items-center ">
            <img
              src="/src/assets/img10.png"
              alt="Jewelry Design Example"
              className="xs:w-[45vw] md:w-[25vw]"
            />
          </div>
          <div className=" flex flex-col gap-[1.5vw] p-[2vw] ">
            <header>
              <h3 className="text-customGreen xs:text-center md:text-left xs:text-[5vw] md:text-[1.5vw]">
                Custom Designs Just for You
              </h3>
            </header>
            <p className="font-serif text-[#00000066] xs:text-[3vw] md:text-[1.3vw] xs:max-w-full md:max-w-[34vw]">
              Leverage AI to create personalized jewellery designs tailored to
              your unique style. Answer a few questions and let AI do the rest.
            </p>
            <div className=" xs:text-[3vw] md:text-[1.2vw] flex flex-col gap-[1vw]">
              <div className="flex gap-[1vw] items-center">
                <img
                  src="/src/assets/Frame (1).svg"
                  alt="Interactive Design Process"
                  className="xs:w-[3vw] md:w-[1.5vw]"
                />
                <p className="text-[#b9944c] font-serif">
                  Interactive Design Process.
                </p>
              </div>
              <p className="text-[#00000066] xs:max-w-full md:max-w-[30vw] font-serif">
                Share your preferences by answering a few simple questions, and
                our AI will generate initial jewellery design concepts for you.
              </p>
            </div>
            <div className=" xs:text-[3vw] md:text-[1.2vw] flex flex-col gap-[1vw]">
              <div className="flex gap-[1vw] items-center">
                <img
                  src="/src/assets/Frame (2).svg"
                  alt="Tailored to Your Taste"
                  className="xs:w-[3vw] md:w-[1.5vw]"
                />
                <p className="text-[#b9944c] font-serif">
                  Tailored to Your Taste.
                </p>
              </div>
              <p className="text-[#00000066] xs:max-w-full md:max-w-[30vw] font-serif">
                Our AI will ask additional questions to refine the designs,
                ensuring the final pieces match your unique style and
                preferences.
              </p>
            </div>
            <div className="mt-[1.5vw] flex xs:justify-center md:justify-normal">
              <Link to="/form" className="rounded-full bg-customGreen xs:px-[4vw] xs:py-[2vw] md:px-[2vw] md:py-[1vw] text-white/80 xs:text-[3vw] md:text-[1vw] transition-transform transform hover:scale-105">
                Get Started -&gt;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page1;
