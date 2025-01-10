// // import React from "react";
// // import { Link } from "react-router-dom";

// // interface CardProps {
// //   img: string;
// //   height: string;
// //   width: string;
// //   h4Text: string;
// //   h4Size: string;
// //   pText: string;
// //   pSize: string;
// //   imgWidth: string;
// //   gap: string;
// //   link: string;
// // }

// // const Card: React.FC<CardProps> = ({
// //   img,
// //   height,
// //   width,
// //   h4Text,
// //   h4Size,
// //   pText,
// //   pSize,
// //   imgWidth,
// //   gap,
// //   link,
// // }) => {
// //   return (
// //     <Link
// //       to={link}
// //       className={`flex flex-col justify-center items-center rounded-[2vw] border border-customGreen hover:scale-105 hover:transition-all `}
// //       style={{ width, height, gap }}
// //     >
// //       <div className="bg-navbar w-full flex text-center justify-center items-center">
// //       <h4
// //         className="text-customGreen text-center font-bold py-[1.5vw] xs:max-w-[32vw] xl:max-w-[20vw] font-custom"
// //         style={{ fontSize: h4Size }}
// //       >
// //         {h4Text}
// //       </h4>
// //       </div>
// //       <img src={img} alt="card image " style={{ width: imgWidth }} />
// //       <p
// //         className="text-customBlack/70 text-center xs:max-w-[35vw]  md:max-w-[16vw] "
// //         style={{ fontSize: pSize }}
// //       >
// //         {pText}
// //       </p>
// //     </Link>
// //   );
// // };

// // export default Card;
// import React from "react";
// import { useAuthenticator } from "@aws-amplify/ui-react"; // Assuming you're using AWS Amplify for authentication
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Assuming you have SweetAlert2 for alerts

// interface CardProps {
//   img: string;
//   height: string;
//   width: string;
//   h4Text: string;
//   h4Size: string;
//   pText: string;
//   pSize: string;
//   imgWidth: string;
//   gap: string;
//   link: string;
// }

// const Card: React.FC<CardProps> = ({
//   img,
//   height,
//   width,
//   h4Text,
//   h4Size,
//   pText,
//   pSize,
//   imgWidth,
//   gap,
//   link,
// }) => {
//   const { user } = useAuthenticator();
//   const navigate = useNavigate();

//   const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
//           localStorage.setItem('redirectPath', location.pathname);
//           navigate("/login");
//         }
//       });
//     } else {
//       navigate(link); // If the user is logged in, navigate to the link
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col justify-center items-center rounded-[2vw] border border-customGreen hover:scale-105 hover:transition-all`}
//       style={{ width, height, gap }}
//       onClick={handleCardClick} // Handle card click
//     >
//       <div className="bg-navbar w-full flex text-center justify-center items-center">
//         <h4
//           className="text-customGreen text-center font-bold py-[1.5vw] xs:max-w-[32vw] xl:max-w-[20vw] font-custom"
//           style={{ fontSize: h4Size }}
//         >
//           {h4Text}
//         </h4>
//       </div>
//       <img src={img} alt="card image" style={{ width: imgWidth }} />
//       <p
//         className="text-customBlack/70 text-center xs:max-w-[35vw] md:max-w-[16vw]"
//         style={{ fontSize: pSize }}
//       >
//         {pText}
//       </p>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react"; // AWS Amplify for authentication
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 for alerts

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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; // Optional onClick prop
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
  onClick,
}) => {
  const { user } = useAuthenticator(); // Authentication hook
  const navigate = useNavigate(); // Navigation hook

  // Handle default click functionality
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e); // Call the custom onClick if provided
      return;
    }

    if (!user) {
      // Alert user to log in if not authenticated
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
          localStorage.setItem("redirectPath", location.pathname); // Save current path
          navigate("/login");
        }
      });
    } else {
      // Navigate to the provided link
      navigate(link);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-[2vw] border border-customGreen hover:scale-105 hover:transition-all`}
      style={{ width, height, gap }}
      onClick={handleCardClick} // Attach the click handler
    >
      {/* Header Section */}
      <div className="bg-navbar w-full flex text-center justify-center items-center">
        <h4
          className="text-customGreen text-center font-bold py-[1.5vw] xs:max-w-[32vw] xl:max-w-[20vw] font-custom"
          style={{ fontSize: h4Size }}
        >
          {h4Text}
        </h4>
      </div>

      {/* Image Section */}
      <img src={img} alt="card image" style={{ width: imgWidth }} />

      {/* Description Section */}
      <p
        className="text-customBlack/70 text-center xs:max-w-[35vw] md:max-w-[16vw]"
        style={{ fontSize: pSize }}
      >
        {pText}
      </p>
    </div>
  );
};

export default Card;
