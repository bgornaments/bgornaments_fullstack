// export default Modes;
import React from "react";
import Card from "./Card";
import lightning from "/src/assets/lightning.png";
import pro from "/src/assets/worker.png";
import expert from "/src/assets/data-analysis.png";
import icon from "/src/assets/image.png";
import { useNavigate } from "react-router-dom";

const Modes: React.FC = () => {
  const navigate = useNavigate();

  const handleModeClick = (mode: string) => {
    localStorage.setItem("redirectPath", mode); // Save the clicked mode path in localStorage
    navigate("/form"); // Redirect to the forms page
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="xs:w-[90vw] xl:w-[75vw] flex flex-col justify-center items-center xs:gap-[5vh] xl:gap-[10vh]">
        <div className="flex flex-col gap-[2vh] md:gap-[3vh] items-center">
          {/* <img
            src={icon}
            alt=""
            className="xs:w-[3.8rem] md:w-[4.8rem] xl:w-[6.5rem]"
          /> */}
          {/* <h4 className="pt-[1vh] text-lightGolden xs:text-[5vw] md:text-[3vw] xl:text-[2.3vw] tracking-widest leading-tight font-bold font-custom text-center"> */}
          <h4 className="pt-[1vh] text-lightGolden xs:text-[5vw] md:text-[3vw] xl:text-[2.3vw] font-bold font-custom text-center">
            Create Your Own Design{" "}
          </h4>
          <p className="text-customGreen text-center xs:text-[2vw] md:text-[1.2vw] xl:text-[1.2vw]">
            Choose the Mode of Operation{" "}
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-[5vw]">
            <Card
              img={lightning}
              height="32vw"
              width="22vw"
              h4Text="Lightning Mode"
              h4Size="1.8vw"
              pText="Quick and Effortless Design for Beginners"
              pSize="1vw"
              imgWidth="8.4vw"
              gap="2.5vw"
              link="#"
              onClick={() => handleModeClick("/lightningMode")}
            />
            <Card
              img={pro}
              height="32vw"
              width="22vw"
              h4Text="Pro Mode"
              h4Size="1.8vw"
              pText="Detailed Customization for Design Lovers"
              pSize="1vw"
              imgWidth="9vw"
              gap="2.5vw"
              link="#"
              onClick={() => handleModeClick("/promode")}
            />
            <Card
              img={expert}
              height="32vw"
              width="22vw"
              h4Text="Expert Mode"
              h4Size="1.8vw"
              pText="Advanced Creativity Tools and Features for Experts"
              pSize="1vw"
              imgWidth="9vw"
              gap="2.5vw"
              link="/expert-mode"
            />
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex flex-col gap-[3vh]">
            <Card
              img={lightning}
              height="42vw"
              width="45vw"
              h4Text="Lightning Mode"
              h4Size="3.8vw"
              pText="Quick and Effortless Design for Beginners"
              pSize="1.7vw"
              imgWidth="8.4vw"
              gap="2.4vh"
              link="#"
              onClick={() => handleModeClick("/lightningMode")}
            />
            <Card
              img={pro}
              height="42vw"
              width="45vw"
              h4Text="Pro Mode"
              h4Size="3.8vw"
              pText="Detailed Customization for Design Lovers"
              pSize="1.7vw"
              imgWidth="9vw"
              gap="2.4vh"
              link="#"
              onClick={() => handleModeClick("/promode")}
            />
            <Card
              img={expert}
              height="42vw"
              width="45vw"
              h4Text="Expert Mode"
              h4Size="3.8vw"
              pText="Advanced Creativity Tools and Features for Experts"
              pSize="1.7vw"
              imgWidth="9vw"
              gap="2.4vh"
              link="/expert-mode"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modes;
