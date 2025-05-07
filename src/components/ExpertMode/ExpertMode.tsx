import React from "react";
import Card from "../Basic/Card";
import setgen from "/src/assets/set_generator_icon.jpg";
import imgvar from "/src/assets/image_variations_icon.jpg";
import astr from "/src/assets/vedic-astrology.png";
import outfit from "/src/assets/outfit_matching_icon.jpg";
import sketch from "/src/assets/sketch.png";

const ExpertMode: React.FC = () => {

  // useEffect(() => {
  //   const existingSessionId = sessionStorage.getItem("sessionId");
  //   if (!existingSessionId) {
  //     const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
  //     sessionStorage.setItem("sessionId", newSessionId);
  //     localStorage.setItem("sessionId", newSessionId);
  //     console.log("New Session ID created:", newSessionId);
  //   } else {
  //     console.log(`Session ID already exists: ${existingSessionId}`);
  //   }
  // }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="xs:w-[90vw] xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[2rem] md:gap-[10vh]">
        <div className="flex flex-col gap-[3vh] items-center">
          {/* <h4 className="text-customGreen text-center xs:text-[1.2rem] md:text-[1.7rem] xl:text-[2rem] pt-[1rem]"> */}
          <h4 className="pt-[1vh] text-lightGolden xs:text-[5vw] md:text-[3vw] xl:text-[2.3vw] font-bold font-custom text-center">
            Expert Mode
          </h4>
          {/* <p className="text-customBlack text-center xs:text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]"> */}
          <p className="text-customGreen text-center xs:text-[2vw] md:text-[1.2vw] xl:text-[1.2vw]">
            Select a feature
          </p>
        </div>
        <div className="hidden xl:block">
          <div className="flex flex-wrap gap-[3vw] justify-center max-w-[75vw] mb-4">
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
              h4Text="Design Variation"
              h4Size="1.5vw"
              pText="Generate unique jewelry design variations instantly for endless creative possibilitiess."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/expert-mode/image-variation"
            />
            <Card
              img={sketch}
              height="32vw"
              width="22vw"
              h4Text="Sketch To Jewelry"
              h4Size="1.5vw"
              pText="Effortlessly transform your rough sketches to exquisite jewelry designs."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/expert-mode/sketchToJwellery"
            />
            <Card
              img={outfit}
              height="32vw"
              width="22vw"
              h4Text="Outfit Matching Jewelry"
              h4Size="1.5vw"
              pText="Perfectly match your jewelry and accessories to the outfit to impress everyone."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link=""
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
              link="/expert-mode/astrology"
            />
          </div>
        </div>
        <div className="hidden md:block xl:hidden">
          <div className="flex flex-col gap-[8vw] mb-4">
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
              h4Text="Design Variation"
              h4Size="1.5rem"
              pText="Generate unique jewelry design variations instantly for endless creative possibilities."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link="/expert-mode/image-variation"
            />
            <Card
              img={sketch}
              height="70vh"
              width="38vw"
              h4Text="Sketch To Jewelry"
              h4Size="1.5rem"
              pText="Effortlessly transform your rough sketches to exquisite jewelry designs."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link="/expert-mode/sketchToJwellery"
            />
            <Card
              img={outfit}
              height="70vh"
              width="38vw"
              h4Text="Outfit Matching Jewelry"
              h4Size="1.5rem"
              pText="Perfectly match your jewelry and accessories to the outfit to impress everyone."
              pSize="1rem"
              imgWidth="8rem"
              gap="2.3rem"
              link=""
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
              link="/expert-mode/astrology"
            />
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex flex-col gap-[5vh] mb-4">
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
              h4Text="Design Variation"
              h4Size="3vw"
              pText="Generate unique jewelry design variations instantly for endless creative possibilities."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/expert-mode/image-variation"
            />
            <Card
              img={sketch}
              height="60vw"
              width="44vw"
              h4Text="Sketch To Jewelry"
              h4Size="3vw"
              pText="Effortlessly transform your rough sketches to exquisite jewelry designs."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/expert-mode/sketchToJwellery"
            />
            <Card
              img={outfit}
              height="60vw"
              width="44vw"
              h4Text="Outfit Matching Jewelry"
              h4Size="3vw"
              pText="Perfectly match your jewelry and accessories to the outfit to impress everyone."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link=""
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
              link="/expert-mode/astrology"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertMode;
