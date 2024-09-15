// src/components/LogoCarousel.tsx
import React, { useEffect, useRef } from "react";
import colLogo1 from "/src/assets/colLogo1.png";
import colLogo2 from "/src/assets/colLogo2.png";
import colLogo3 from "/src/assets/colLogo3.png";
import colLogo4 from "/src/assets/colLogo4.png";
import colLogo5 from "/src/assets/colLogo5.png";
import certi from "/src/assets/Group 27.png";
import vision from "/src/assets/vision.png";

const LogoCarousel: React.FC = () => {
  const logosRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const logos = logosRef.current;
    if (logos) {
      const clone = logos.cloneNode(true) as HTMLUListElement;
      clone.setAttribute("aria-hidden", "true");
      logos.insertAdjacentElement("afterend", clone);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-20">
      <h3 className="w-full text-customGreen xs:text-[2rem] xl:text-[3.5vw] md:text-[3.4vw] tracking-widest leading-tight font-bold font-custom text-center">
        Associations and Certifications
      </h3>
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] my-10 md:my-20 ">
        <ul
          ref={logosRef}
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        >
          <li>
            <img
              src={colLogo1}
              alt="Facebook"
              className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
            />
          </li>
          <li>
            <img
              src={colLogo2}
              alt="Disney"
              className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
            />
          </li>
          <li>
            <img
              src={colLogo3}
              alt="Airbnb"
              className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
            />
          </li>
          <li>
            <img
              src={colLogo4}
              alt="Apple"
              className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
            />
          </li>
          <li>
            <img
              src={colLogo5}
              alt="Spark"
              className="w-[20vh] md:w-[15vh] xl:w-[24vh]"
            />
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-col my-10">
        <div className="py-[10vh] my-[6vh] border-navbar border  flex justify-around items-center">
          <div className="md:max-w-[40vw] flex flex-col justify-center items-center gap-[4vh] ">
            <h4 className="max-w-[90%] text-customGreen xs:text-[1.8rem] md:text-[3vw] tracking-widest leading-tight font-bold font-custom text-center ">
              Proudly Recognized by the Government of India
            </h4>
            <p className="xs:max-w-[80%] md:w-full text-[0.6rem] xl:text-[0.8rem] text-center text-darkGolden">
              We are proud to be officially recognized by the Government of
              India as an innovative startup, reflecting our commitment to
              pioneering solutions and driving industry progress. This
              recognition underscores our dedication to innovation and impact.
            </p>
            <a href="https://recognition-be.startupindia.gov.in/s3/download/document/RECOGNITION_CERTIFICATE/c9c3cdf7-e66a-431e-8444-f8335f384985.pdf" target="_blank" rel="noopener noreferrer">
              <button className="flex items-center justify-center px-[2rem] py-[1rem] md:px-[1.5rem] md:py-[0.4rem] text-[1rem]  rounded-full text-customRed border border-customGreen gap-2">
                <p>View Certificate</p>
                <img src={vision} alt="" className="h-[4vh] " />
              </button>
            </a>
          </div>
          <img
            src={certi}
            alt=""
            className="hidden md:block md:h-[30vw] xl:h-[20vw]"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
