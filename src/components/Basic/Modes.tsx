import React from "react";
import Card from "./Card";
import lightning from "/src/assets/lightning.png";
import pro from "/src/assets/worker.png";
import expert from "/src/assets/data-analysis.png";

const Modes: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex justify-center items-center">
      <div className="xs:w-[90vw] xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[5vh] xl:gap-[10vh] ">
        <div className="flex flex-col gap-[3vh] items-center ">
          <h4 className="text-customGreen text-center xs:text-[4.3vw] md:text-[4.4vw] xl:text-[2.2vw] pt-[1vh]">
            Create Your Own Design{" "}
          </h4>
          <p className="text-customBlack text-center xs:text-[2.5vw] md:text-[2.4vw] xl:text-[1vw]">
            Choose the Mode of Operation{" "}
          </p>
        </div>
        <div className="hidden xl:block ">
          <div className="flex gap-[5vw]">
            <Card
              img={lightning}
              height="32vw"
              width="22vw"
              h4Text="Lightning Mode"
              h4Size="1.5vw"
              pText="Quick and Effortless Design for Beginners"
              pSize="1.1vw"
              imgWidth="8.4vw"
              gap="2vw"
              link="/lightningMode"
            />
            <Card
              img={pro}
              height="32vw"
              width="22vw"
              h4Text="Pro Mode"
              h4Size="1.5vw"
              pText="Detailed Customization for Design Lovers"
              pSize="1.1vw"
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
              pText="Advanced Creativity Tools and Features for Experts"
              pSize="1.1vw"
              imgWidth="9vw"
              gap="2vw"
              link="/modes"
            />
          </div>
        </div>
        <div className="hidden md:block xl:hidden">
          <div className="flex flex-col items-center gap-[3vh]">
            <div className="flex gap-[6vh]">
              <Card
                img={lightning}
              height="48vw"
              width="40vw"
                h4Text="Lightning Mode"
                h4Size="3.3vw"
                pText="Quick and Effortless Design for Beginners"
                pSize="2vw"
                imgWidth="11vw"
                gap="3.8vw"
                link="/lightningMode"
              />
              <Card
                img={pro}
              height="48vw"
              width="40vw"
                h4Text="Pro Mode"
                h4Size="3.3vw"
                pText="Detailed Customization for Design Lovers"
                pSize="2vw"
                imgWidth="11vw"
                gap="3.8vw"
                link="/modes"
              />
            </div>
          <div>
            <Card
              img={expert}
              height="48vw"
              width="40vw"
              h4Text="Expert Mode"
                h4Size="3.3vw"
              pText="Advanced Creativity Tools and Features for Experts"
              pSize="2vw"
              imgWidth="11vw"
              gap="3.8vw"
              link="/modes"
            />
          </div>
          </div>
        </div>
        <div className="block md:hidden ">
          <div className="flex flex-col gap-[3vh]">
            <Card
              img={lightning}
              height="42vw"
              width="45vw"
              h4Text="Lightning Mode"
              h4Size="3vw"
              pText="Quick and Effortless Design for Beginners"
              pSize="2vw"
              imgWidth="8.4vw"
              gap="2.5vw"
              link="/lightningMode"
            />
            <Card
              img={pro}
              height="42vw"
              width="45vw"
              h4Text="Pro Mode"
              h4Size="3vw"
              pText="Detailed Customization for Design Lovers"
              pSize="2vw"
              imgWidth="9vw"
              gap="2.5vw"
              link="/modes"
            />
            <Card
              img={expert}
              height="42vw"
              width="45vw"
              h4Text="Expert Mode"
              h4Size="3vw"
              pText="Advanced Creativity Tools and Features for Experts"
              pSize="2vw"
              imgWidth="9vw"
              gap="2.5vw"
              link="/modes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modes;
