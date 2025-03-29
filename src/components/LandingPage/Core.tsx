// import React from "react";
// import { useNavigate } from "react-router-dom";
// import img21 from "/src/assets/Group 28.png";
// import img3 from "/src/assets/img3.svg"
// import img4 from "/src/assets/img3.png"
// import img7 from "/src/assets/img7.svg"
// import img8 from "/src/assets/img8.svg"
// import img9 from "/src/assets/img9.svg"
// import Navbar from './Navbar';
// import Swal from 'sweetalert2';
// import { useAuthenticator } from "@aws-amplify/ui-react";


// const Core: React.FC = () => {
//   const { user } = useAuthenticator();
//   const navigate = useNavigate();

//   const handleDesignNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (!user) {
//       Swal.fire({
//         title: "Please Log In",
//         text: "You need to log in to proceed. Click the button below to log in.",
//         icon: "warning",
//         confirmButtonText: "Log In",
//         confirmButtonColor: "#3085d6",
//         showCancelButton: true,
//         cancelButtonText: "Cancel",
//         cancelButtonColor: "#d33",
//         reverseButtons: true,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           sessionStorage.setItem('redirectTo', '/modes'); // Store path in sessionStorage
//           navigate("/login");
//         }
//       });
//     } else {
//       navigate("/modes");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="bg-white w-full min-h-screen flex flex-col">
//         <div className="h-[65vh] w-full flex">
//           <div className="w-9/12 h-full flex items-center ">
//             <div className="flex flex-col md:gap-[5vh] xl:gap-[3vh] px-[5vw]">
//               <h1 className="font-custom font-bold text-customGreen text-[4.5vw] tracking-widest leading-tight">
//                 From Imagination <br /> To Design
//               </h1>
//               <h2 className="text-[1.5vw] text-lightGolden">
//                 Welcome to KinMitra <span className="text-[0.8vw] italic">{user && `${user.signInDetails?.loginId}`}</span>
//               </h2>
//               <div className="flex gap-14">
//                 <button onClick={handleDesignNowClick} className="rounded-full border border-customGreen text-customGreen px-[2vw] py-[0.8vw] md:text-[1.5vw] xl:text-[1vw]">
//                   Design Now -&gt;
//                 </button>
//                 <a href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect" target="_blank" rel="noopener noreferrer">
//                   <button className="flex justify-center items-center gap-3 md:text-[1.5vw] xl:text-[1vw] text-customGreen">
//                     <div className="rounded-full border border-customGreen p-[1vw] flex justify-center items-center">
//                       <img src={img3} alt="" className="w-[0.8vw]" />
//                     </div>
//                     <div>Play Video</div>
//                   </button>
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="w-3/12 bg-navbar h-full flex items-center "></div>
//           <img
//             src={img21}
//             alt=""
//             className="absolute  md:right-[3vw] lg:right-[8vw] md:top-[25vh] xl:top-[16vh] xl:h-[53vh] md:h-[30vh]"
//           />
//         </div>
//         <div className="h-[20vh] w-full flex">
//           <div className="w-9/12 h-full flex items-center">
//             <div className="border-r border-darkGolden bg-transparent rounded-r-3xl md:h-[25vh] lg:h-[28vh] w-1/4 bg-custom-gradient">
//               <div className="w-[90%] flex justify-center">
//                 <img src={img4} alt="" className="md:w-[11vh] lg:w-[13vh]" />
//               </div>
//             </div>
//             <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
//               <img src={img9} alt="" className=" md:w-[3vh]" />
//               <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
//                 Personalised <br /> Bespoke <br /> Designs
//               </p>
//             </div>
//             <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
//               <img src={img8} alt="" className=" md:w-[3vh]" />
//               <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
//                 Trend <br />Driven <br />Innovation
//               </p>
//             </div>
//             <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
//               <img src={img7} alt="" className=" md:w-[3vh]" />
//               <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
//                 Seamless <br />User <br /> Experience
//               </p>
//             </div>
//           </div>
//           <div className="w-3/12 h-full"></div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default Core;


import React from "react";
import { useNavigate } from "react-router-dom";
import img21 from "/src/assets/Group 28.png";
import img3 from "/src/assets/img3.svg"
import img4 from "/src/assets/img3.png"
import img7 from "/src/assets/img7.svg"
import img8 from "/src/assets/img8.svg"
import img9 from "/src/assets/img9.svg"
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";


const Core: React.FC = () => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  const handleDesignNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to proceed. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem('redirectTo', '/modes'); // Store path in sessionStorage
          navigate("/login");
        }
      });
    } else {
      navigate("/modes");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white w-full min-h-screen flex flex-col">
        <div className="h-[65vh] w-full flex">
          <div className="w-9/12 h-full flex items-center ">
            <div className="flex flex-col md:gap-[5vh] xl:gap-[3vh] px-[5vw]">
              <h1 className="font-custom text-lightGolden text-[3vw]">
                From Imagination <br /> To Design
              </h1>
              <h2 className="font-custom text-[1.5vw] text-lightGreen">
                Welcome to KinMitra <span className="text-[1vw]">{user && `${user.signInDetails?.loginId}`}</span>
              </h2>
              <div className="flex gap-14">
                <button onClick={handleDesignNowClick} className="rounded-full border border-customGreen text-customGreen px-[2vw] py-[0.8vw] md:text-[1.5vw] xl:text-[1vw]">
                  Design Now -&gt;
                </button>
                <a href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect" target="_blank" rel="noopener noreferrer">
                  <button className="flex justify-center items-center gap-3 md:text-[1.5vw] xl:text-[1vw] text-customGreen">
                    <div className="rounded-full border border-customGreen p-[1vw] flex justify-center items-center">
                      <img src={img3} alt="" className="w-[0.8vw]" />
                    </div>
                    <div>Play Video</div>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-3/12 bg-navbar h-full flex items-center "></div>
          <img
            src={img21}
            alt=""
            className="absolute  md:right-[3vw] lg:right-[8vw] md:top-[25vh] xl:top-[16vh] xl:h-[53vh] md:h-[30vh]"
          />
        </div>
        <div className="h-[20vh] w-full flex">
          <div className="w-9/12 h-full flex items-center">
            <div className="border-r border-darkGolden bg-transparent rounded-r-3xl md:h-[25vh] lg:h-[28vh] w-1/4 bg-custom-gradient">
              <div className="w-[90%] flex justify-center">
                <img src={img4} alt="" className="md:w-[11vh] lg:w-[13vh]" />
              </div>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
              <img src={img9} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Personalised <br /> Bespoke <br /> Designs
              </p>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
              <img src={img8} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Trend <br />Driven <br />Innovation
              </p>
            </div>
            <div className="border-r border-lightGolden w-1/4 h-full flex flex-col gap-[1.5vh] justify-center items-center text-darkGolden bg-navbar">
              <img src={img7} alt="" className=" md:w-[3vh]" />
              <p className="text-center md:text-[1.5vh] xl:text-[2.8vh] xl:max-w-[60%] font-custom leading-tight">
                Seamless <br />User <br /> Experience
              </p>
            </div>
          </div>
          <div className="w-3/12 h-full"></div>
        </div>
      </div>

    </>
  );
};

export default Core;
