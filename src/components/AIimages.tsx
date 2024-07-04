import React from "react";
import icon from "/src/assets/image.png";
import { useState, useEffect } from "react";
import axios from "axios";


const AIimages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/images.json")
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError("Error fetching images");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <div className=" flex flex-col items-center bg-[#fff9f6] pt-[2vw] min-h-screen">
        <div className=" ">
          <img src={icon} alt="" className="w-[5vh]" />
        </div>
        <div className="w-[80%] sm:w-[60%] mt-[3vw] flex flex-col gap-[3vw]">
          <h2 className="text-[1.2rem] sm:text-[1.5rem] font-secondary text-customBlack ">
            Select your Perfect Design
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {images.map((image) => (
              <div key={image.id} className="flex justify-center items-center">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>


      </div>
    </>
  );
};

export default AIimages;
