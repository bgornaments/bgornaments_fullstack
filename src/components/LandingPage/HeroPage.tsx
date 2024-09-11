import React from "react";
import Core_2 from "./Core_2";
import Core from "./Core";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Footer from "./Footer";
import LogoCarousel from "./LogoCarousel"
const HeroPage: React.FC = () => {
  return (
    <>
      <div className="hidden md:block">
        <Core />
      </div>
      <div className="block md:hidden">
        <Core_2 />
      </div>
      <Page1 />
      <LogoCarousel />
      <Page2 />
      <Page3 />
      <Footer />
    </>
  );
};

export default HeroPage;
