import React from "react";
import { useNavigate } from "react-router-dom";
import img10 from "/src/assets/img10.png";
import frame1 from "/src/assets/Frame.svg";
import frame2 from "/src/assets/Frame (1).svg";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";


const Page1: React.FC = () => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to download images. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('redirectPath', location.pathname);
          navigate("/login");
        }
      });
    } else {
      navigate("/form"); 
    }
  };
  return (
    <>
      <div className=" flex flex-col w-full p-[2rem] justify-center items-center gap-[1.3rem] md:gap-[2rem] xl:gap-[3rem]">
        <header>
          <h2 className="w-full text-customGreen xs:text-[2rem] xl:text-[3.5vw] md:text-[3.4vw] tracking-widest leading-tight font-bold font-custom text-center">
            Personalised Design Made Easy
          </h2>
        </header>
        <div className="flex xs:flex-col md:flex-row items-center gap-[2rem] xl:gap-[5rem]">
          <img
            src={img10}
            alt="Jewelry Design Example"
            className="w-[10rem] md:w-[16rem] xl:w-[25rem]"
          />
          <section className="flex flex-col  w-full items-center justify-center">
            <div className="flex flex-col md:p-[2rem] gap-[1rem] lg:max-w-[40rem]">
              <header>
                <h3 className="text-lightGolden xs:text-center md:text-start text-[1.5rem] md:text-[1.4rem] xl:text-[2.4rem] font-custom">
                  Custom Designs Just for You
                </h3>
              </header>
              <p className="text-[#0d0d0d] text-[0.8rem] xl:text-[1.4rem] font-custom">
                Leverage AI to create personalized jewellery designs tailored to
                your unique style. Answer a few questions and let AI do the
                rest.
              </p>
              <div className=" flex flex-col gap-[0.5rem]">
                <div className="flex gap-[1vw] items-center">
                  <img
                    src={frame1}
                    alt="Interactive Design Process"
                    className="w-[1rem] xl:w-[1.2rem]"
                  />
                  <p className="text-lightGolden font-custom text-[1.2rem] xl:text-[1.5rem]">
                    Interactive Design Process.
                  </p>
                </div>
                <p className="text-[##0d0d0d] text-[0.6rem] xl:text-[0.9rem]">
                  Share your preferences by answering a few simple questions,
                  and our AI will generate initial jewellery design concepts for
                  you.
                </p>
              </div>
              <div className=" flex flex-col gap-[0.5rem] ">
                <div className="flex gap-[1vw] items-center">
                  <img
                    src={frame2}
                    alt="Tailored to Your Taste"
                    className="w-[1rem] xl:w-[1.2rem]"
                  />
                  <p className="text-lightGolden font-custom text-[1.2rem] xl:text-[1.5rem]">
                    Tailored to Your Taste.
                  </p>
                </div>
                <p className="text-[#0d0d0d] text-[0.6rem] xl:text-[0.9rem]">
                  Our AI will ask additional questions to refine the designs,
                  ensuring the final pieces match your unique style and
                  preferences.
                </p>
              </div>
              <div className="mt-[3vw] flex xs:justify-center ">
                <button
                  onClick={handleGetStarted}
                  className="px-[2rem] py-[1rem] md:px-[1.5rem] md:py-[0.7rem] text-[1rem]  rounded-full text-customRed border border-customGreen"
                >
                  Get Started -&gt;
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page1;
