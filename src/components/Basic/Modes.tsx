import React from "react";
import Card from "./Card";
import lightning from "/src/assets/lightning.png";
import pro from "/src/assets/worker.png"
import expert from "/src/assets/data-analysis.png"

const Modes: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
      <div className="bg-[#FFF9F5] rounded-[3vw] w-[90vw] h-[94vh] flex justify-center items-center">
        <div className="w-[75vw]  h-[80vh] flex flex-col justify-center items-center gap-[5vw]">
          <div className="flex flex-col items-center gap-[2vw]">
            <h4 className="text-customGreen text-[2.2vw]">
              Create Your Own Design{" "}
            </h4>
            <p className="text-customBlack text-[1vw]">
              Choose the Mode of Operation{" "}
            </p>
          </div>
          <div className="flex gap-[5vw]">
            <Card
              img={lightning}
              height="32vw"
              width="22vw"
              h4Text="Lightning Mode"
              h4Size="1.5vw"
              pText="Quick and Effortless Design Selection: Explore our curated collection of stunning jewelry designs."
              pSize="0.8vw"
              imgWidth="9vw"
              gap="2vw"
              link="/lightningMode"
            />
            <Card
              img={pro}
              height="32vw"
              width="22vw"
              h4Text="Pro Mode"
              h4Size="1.5vw"
              pText="Detailed Customization for Professionals: For professionals looking for detailed customization."
              pSize="0.8vw"
              imgWidth="9vw"
              gap="2vw"
              link="/modes"
            />
            <Card
              img={expert}
              height="32vw"
              width="22vw"
              h4Text="Expert Mode"
              h4Size="1.5vw"
              pText="Advanced Tools and Features for Experts: Unleash your creativity with advanced tools and features."
              pSize="0.8vw"
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

export default Modes;
