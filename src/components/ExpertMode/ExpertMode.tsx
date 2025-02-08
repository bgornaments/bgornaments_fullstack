import React, { useEffect } from "react";
import Card from "../Basic/Card";
import setgen from "/src/assets/set_generator_icon.jpg";
import imgvar from "/src/assets/image_variations_icon.jpg";
import astr from "/src/assets/vedic-astrology.png";

const ExpertMode: React.FC = () => {

  useEffect(() => {
    const existingSessionId = sessionStorage.getItem("sessionId");
    if (!existingSessionId) {
      const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
      sessionStorage.setItem("sessionId", newSessionId);
      localStorage.setItem("sessionId", newSessionId);
      console.log("New Session ID created:", newSessionId);
    } else {
      console.log(`Session ID already exists: ${existingSessionId}`);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="xs:w-[90vw] xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[2rem] md:gap-[10vh]">
        <div className="flex flex-col gap-[3vh] items-center">
          <h4 className="text-customGreen text-center xs:text-[1.2rem] md:text-[1.7rem] xl:text-[2rem] pt-[1rem]">
            Expert Mode
          </h4>
          <p className="text-customBlack text-center xs:text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]">
            Select a feature
          </p>
        </div>
        <div className="hidden xl:block">
          <div className="flex gap-[8vw]">
            <Card
              img={setgen}
              height="32vw"
              width="22vw"
              h4Text="Set Generator"
              h4Size="1.5vw"
              pText="Effortlessly create jewellery sets, optimized for your needs with flexibility."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/expert-mode/set-generation"
            />
            <Card
              img={imgvar}
              height="32vw"
              width="22vw"
              h4Text="Image Variation"
              h4Size="1.5vw"
              pText="Generate unique image variations instantly for endless creative possibilities."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/expert-mode/image-variation"
            />
            <Card
              img={astr}
              height="32vw"
              width="22vw"
              h4Text="Astrology Jewelry"
              h4Size="1.5vw"
              pText="Find your perfect astrology jewelry with personalized astrology guidance."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link=""
            />
          </div>
        </div>
        <div className="hidden md:block xl:hidden">
          <div className="flex flex-col gap-[8vw]">
            <Card
              img={setgen}
              height="70vh"
              width="38vw"
              h4Text="Set Generator"
              h4Size="1.5rem"
              pText="Effortlessly create custom data sets, optimized for your needs with precision and flexibility."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link="/expert-mode/set-generation"
            />
            <Card
              img={imgvar}
              height="70vh"
              width="38vw"
              h4Text="Image Variation"
              h4Size="1.5rem"
              pText="Generate unique image variations instantly for endless creative possibilities."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link="/expert-mode/image-variation"
            />
            <Card
              img={astr}
              height="70vh"
              width="38vw"
              h4Text="Astrology Jewelry"
              h4Size="1.5rem"
              pText="Find your perfect astrology jewelry with personalized astrology guidance."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link="/expert-mode/image-variation"
            />
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex flex-col gap-[5vh]">
            <Card
              img={setgen}
              height="60vw"
              width="44vw"
              h4Text="Set Generator"
              h4Size="3vw"
              pText="Effortlessly create custom data sets, optimized for your needs with precision and flexibility."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/expert-mode/set-generation"
            />
            <Card
              img={imgvar}
              height="60vw"
              width="44vw"
              h4Text="Image Variation"
              h4Size="3vw"
              pText="Generate unique image variations instantly for endless creative possibilities."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/expert-mode/image-variation"
            />
            <Card
              img={astr}
              height="60vw"
              width="44vw"
              h4Text="Astrology Jewelry"
              h4Size="3vw"
              pText="Find your perfect astrology jewelry with personalized astrology guidance."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/expert-mode/image-variation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertMode;
