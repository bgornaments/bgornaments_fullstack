// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "/src/assets/image.png";
// import img21 from "/src/assets/Group 28.png";
// import img3 from "/src/assets/img3.svg";
// import img7 from "/src/assets/img7.svg";
// import img8 from "/src/assets/img8.svg";
// import img9 from "/src/assets/img9.svg";
// import Navbar from './Navbar';
// import Swal from 'sweetalert2';
// import { useAuthenticator } from "@aws-amplify/ui-react";


// const Core_2: React.FC = () => {
//   const { user } = useAuthenticator();
//   const navigate = useNavigate();

//     const handleDesignNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
//           localStorage.setItem('redirectPath', 'modes'); //changed from 'location.pathname' and 'modes'
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
//       <div className="flex flex-col ">
//         <div className="min-h-screen w-full flex flex-col  items-center gap-[10vh]">
//           <div className="flex gap-[3vh] flex-col items-center mt-[5vh]">
//             <div>
//               <img src={logo} alt="" className="w-[6rem]" />
//             </div>
//             <div className="text-customGreen xs:text-[2.4rem] text-center ">
//               <h1 className="font-custom tracking-widest leading-tight font-bold">
//                 From Imagination <br /> To Adornment
//               </h1>
//             </div>
//           </div>

//           <div className="bg-navbar h-[30vh] w-full flex items-center justify-center ">
//             <img className="w-[45vh]" alt="Pexels arif" src={img21} />
//           </div>

//           <div className="flex gap-[6vw] text-[0.9rem] justify-center items-center ">
//             <button
//               onClick={handleDesignNowClick}
//               className="px-[1.4rem] py-[0.7rem] border border-customGreen  rounded-full text-customGreen"
//             >
//               <div>Design Now -&gt;</div>
//             </button>
//             <a href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect" target="_blank" rel="noopener noreferrer">
//               <button className="flex items-center gap-[1vw] text-customGreen justify-center">
//                 <div className="rounded-full border border-customGreen p-[0.9rem] flex justify-center items-center" >
//                   <img src={img3} alt="" className="w-[0.7rem]" />
//                 </div>
//                 <p>Play Video</p>
//               </button>
//             </a>
//           </div>
//         </div>
//         <div className=" flex justify-center items-center sm:pt-[2rem] pb-[3rem]">
//           <div className="flex flex-col h-[80%] w-[60%] gap-[5vh] ">
//             <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
//               <img src={img9} alt="" className="size-[1.5rem]" />
//               <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
//                 Personalised Bespoke Designs
//               </p>
//             </div>
//             <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
//               <img src={img8} alt="" className="size-[1.5rem]" />
//               <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
//                 Data-Driven Insights
//               </p>
//             </div>
//             <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
//               <img src={img7} alt="" className="size-[1.5rem]" />
//               <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
//                 Seamless User Experience
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Core_2;
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/image.png";
import img21 from "/src/assets/Group 28.png";
import img3 from "/src/assets/img3.svg";
import img7 from "/src/assets/img7.svg";
import img8 from "/src/assets/img8.svg";
import img9 from "/src/assets/img9.svg";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Core_2: React.FC = () => {
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
      <div className="flex flex-col">
        <div className="min-h-screen w-full flex flex-col items-center gap-[10vh]">
          <div className="flex gap-[3vh] flex-col items-center mt-[5vh]">
            <div>
              <img src={logo} alt="Logo" className="w-[6rem]" />
            </div>
            <div className="text-customGreen xs:text-[2.4rem] text-center">
              <h1 className="font-custom tracking-widest leading-tight font-bold">
                From Imagination <br /> To Design
              </h1>
            </div>
          </div>

          <div className="bg-navbar h-[30vh] w-full flex items-center justify-center">
            <img className="w-[45vh]" alt="Design Preview" src={img21} />
          </div>

          <div className="flex gap-[6vw] text-[0.9rem] justify-center items-center">
            <button
              onClick={handleDesignNowClick}
              className="px-[1.4rem] py-[0.7rem] border border-customGreen rounded-full text-customGreen"
            >
              <div>Design Now -&gt;</div>
            </button>
            <a
              href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-[1vw] text-customGreen justify-center">
                <div className="rounded-full border border-customGreen p-[0.9rem] flex justify-center items-center">
                  <img src={img3} alt="Play" className="w-[0.7rem]" />
                </div>
                <p>Play Video</p>
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center sm:pt-[2rem] pb-[3rem]">
          <div className="flex flex-col h-[80%] w-[60%] gap-[5vh]">
            <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
              <img src={img9} alt="Personalised Designs" className="size-[1.5rem]" />
              <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
                Personalised Bespoke Designs
              </p>
            </div>
            <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
              <img src={img8} alt="Data Insights" className="size-[1.5rem]" />
              <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
                Data-Driven Insights
              </p>
            </div>
            <div className="bg-navbar gap-[0.8rem] min-h-[10rem] rounded-lg border border-darkGolden flex flex-col justify-center items-center text-darkGolden">
              <img src={img7} alt="User Experience" className="size-[1.5rem]" />
              <p className="max-w-[60%] text-center text-[1.3rem] font-custom">
                Seamless User Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Core_2;
