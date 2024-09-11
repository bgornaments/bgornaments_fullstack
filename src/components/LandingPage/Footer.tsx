import React from 'react'
import logo from "/src/assets/image.png";


const Footer: React.FC = () => {
  return (
    <>
          <div className="w-full h-[25vh] bg-navbar flex xs:justify-center items-center bottom-0 md:px-[2.5rem] xl:px-[4rem]">
          <img src={logo} alt="" className="xs:w-[12rem] md:w-[16rem] xl:w-[20rem]" />
          </div>
    </>
  )
}

export default Footer