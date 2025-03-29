// export default HeroPage;
import React from "react";
import Core_2 from "./Core_2";
import Core from "./Core";
import Page1 from "./Page1";
//import Page2 from "./Page2";
// import Page3 from "./Page3";
import Footer from "./Footer";
import LogoCarousel from "./LogoCarousel";
import DemoForm from "./BookADemo";

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
      {/*<Page2 />*/}
      {/* <Page3 /> */}
      <div
        className="demo-form-container"
        style={{
          border: "2px solid #DC7E51",
          margin: "0 auto",
          padding: "16px",
          width: "90%",
          maxWidth: "1200px",
          borderRadius: "8px",
          marginBottom: "24px", // Added margin-bottom for spacing
        }}
      >
        <DemoForm />
      </div>
      <div className="mt-8"> {/* Added margin-top to Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HeroPage;
