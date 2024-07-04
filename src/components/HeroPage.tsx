import React from "react";
import Core_2 from "./Core_2";
import Core from "./Core";
import Page1 from "./Page1";

const HeroPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <Core />
      </div>
      <div className="block md:hidden">
        <Core_2 />
      </div>
      <Page1/>
    </>
  );
};

export default HeroPage;
