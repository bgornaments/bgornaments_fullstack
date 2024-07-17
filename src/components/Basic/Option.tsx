import React from "react";
import Card from "./Card";
import catalogue from "/src/assets/jewelry.png";
import assistant from "/src/assets/assistant.png"

const App: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
        <div className="xs:w-[90vw] xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[5vh] md:gap-[10vh] ">
          <div className="flex flex-col gap-[3vh] items-center ">
          <h4 className="text-customGreen text-center xs:text-[4.3vw] md:text-[4.4vw] xl:text-[2.2vw] pt-[1vh]">Discover Your Perfect Jewellery Design</h4>
          <p className="text-customBlack text-center xs:text-[2.5vw] md:text-[2.4vw] xl:text-[1vw]">Choose from our curated catalogue or create your own unique piece"</p>
          </div>
          <div className="hidden xl:block">
          <div className="flex  gap-[8vw] ">
          <Card
              img={catalogue}
              height="32vw"
              width="22vw"
              h4Text="Browse Designs from Catalogue"
              h4Size="1.5vw"
              pText="Explore our curated collection of stunning jewellery designs."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/form"
            />
            <Card
              img={assistant}
              height="32vw"
              width="22vw"
              h4Text="Create Your Own Design"
              h4Size="1.5vw"
              pText="Unleash your creativity and design a piece that's uniquely yours."
              pSize="1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/modes"
            />

          </div>

          </div>
          <div className="hidden md:block xl:hidden">
          <div className="flex  gap-[8vw]">
          <Card
              img={catalogue}
              height="55vw"
              width="38vw"
              h4Text="Browse Designs from Catalogue"
              h4Size="2.6vw"
              pText="Explore our curated collection of stunning jewellery designs."
              pSize="2vw"
              imgWidth="18vw"
              gap="4vw"
              link="/form"
            />
            <Card
              img={assistant}
             height="55vw"
              width="38vw"
              h4Text="Create Your Own Design"
              h4Size="2.6vw"
              pText="Unleash your creativity and design a piece that's uniquely yours."
              pSize="2vw"
              imgWidth="18vw"
              gap="4vw"
              link="/modes"
            />

          </div>

          </div>
          <div className="block md:hidden">
          <div className="flex flex-col gap-[5vh]">
             <Card
              img={catalogue}
              height="60vw"
              width="44vw"
              h4Text="Browse Designs from Catalogue"
              h4Size="3vw"
              pText="Explore our curated collection of stunning jewellery designs."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/form"
            />
            <Card
              img={assistant}
              height="60vw"
              width="44vw"
              h4Text="Create Your Own Design"
              h4Size="3vw"
              pText="Unleash your creativity and design a piece that's uniquely yours."
              pSize="2vw"
              imgWidth="14vw"
              gap="5vw"
              link="/modes"
            />

          </div>

          </div>
        </div>

    </div>
  );
};

export default App;
