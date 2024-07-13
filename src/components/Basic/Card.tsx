import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  img: string;
  height: string;
  width: string;
  h4Text: string;
  h4Size: string;
  pText: string;
  pSize: string;
  imgWidth: string;
  gap: string;
  link: string;
}

const Card: React.FC<CardProps> = ({
  img,
  height,
  width,
  h4Text,
  h4Size,
  pText,
  pSize,
  imgWidth,
  gap,
  link,
}) => {
  return (
    <Link
      to={link}
      className={`flex flex-col justify-center items-center bg-[#FFF9F5] rounded-[2vw] border border-customGreen shadow-green hover:scale-105 hover:transition-all `}
      style={{ width, height, gap }}
    >
      <div className="bg-[#F5E8D7] w-full flex text-center justify-center items-center">
      <h4
        className="text-customGreen text-center font-bold py-[1.5vw] max-w-[20vw]"
        style={{ fontSize: h4Size }}
      >
        {h4Text}
      </h4>
      </div>
      <img src={img} alt="card image " style={{ width: imgWidth }} />
      <p
        className="text-customBlack text-center max-w-[16vw] "
        style={{ fontSize: pSize }}
      >
        {pText}
      </p>
    </Link>
  );
};

export default Card;
