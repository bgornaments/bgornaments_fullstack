import React from "react";
import Card from "./Card";
import catalogue from "/src/assets/jewelry.png";
import assistant from "/src/assets/assistant.png"

const App: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
      <div className="bg-[#FFF9F5] rounded-[3vw] w-[90vw] h-[94vh] flex justify-center items-center">

        <div className="w-[75vw]  h-[80vh] flex flex-col justify-center items-center gap-[5vw]">
          <div className="flex flex-col gap-[2vw] items-center">
          <h4 className="text-customGreen text-[2.2vw]">Discover Your Perfect Jewellery Design</h4>
          <p className="text-customBlack text-[1vw]">Choose from our curated catalogue or create your own unique piece"</p>
          </div>
          <div className="flex gap-[8vw]">
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
              //link="/form"
              link="/option"
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
      </div>
    </div>
  );
};

export default App;
