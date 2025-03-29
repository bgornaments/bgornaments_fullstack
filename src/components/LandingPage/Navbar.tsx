// import React, { useState, useEffect } from "react";
// import logo from "/src/assets/image.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import Swal from "sweetalert2";
// import userManual from "/src/assets/user-manual.pdf";

// const Navbar: React.FC = () => {
//   const { user, signOut } = useAuthenticator(context => [context.user]);
//   const navigate = useNavigate();

//   // State to control the visibility of the User Manual button
//   const [showUserManual, setShowUserManual] = useState<boolean>(false);

//   useEffect(() => {
//     const trialDaysLeft = parseInt(localStorage.getItem("trial_days_left") || "0");
//     const trialStatus = localStorage.getItem("trial_status")?.toLowerCase();

//     if (trialStatus && trialDaysLeft > 0) {
//       setShowUserManual(true);
//     } else {
//       setShowUserManual(false);
//     }
//   }, []);

//   const handleDesignClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
//           localStorage.setItem("redirectPath", location.pathname);
//           navigate("/login");
//         }
//       });
//     } else {
//       navigate("/catalog");
//     }
//   };

//   const handleContactClick = () => {
//     navigate("/Contact-Us");
//   };

//   const handleUserManualClick = () => {
//     window.open(userManual, "_blank");
//   };

//   return (
//     <div className="w-full h-[10vh] bg-navbar flex items-center px-6 md:px-12 xl:px-20 justify-between">
//       {/* Left - Logo */}
//       <div className="flex items-center">
//         <Link to="/" className="block">
//           <img src={logo} alt="Logo" className="w-[14vh] xl:w-[16vh]" />
//         </Link>
//       </div>

//       {/* Center - Navigation Links */}
//       <div className="flex flex-1 justify-center space-x-6 md:space-x-10 text-darkGolden text-[0.9rem] md:text-[1rem] font-bold">
//         <Link to="/">Home</Link>
//         <button onClick={handleDesignClick}>AI Designs</button>
//         <Link to="/">Pricing</Link>
//         <button onClick={handleContactClick}>Contact Us</button>

//         {showUserManual && (
//           <button onClick={handleUserManualClick}>User Manual</button>
//         )}
//       </div>

//       {/* Right - Profile & Authentication */}
//       <div className="flex items-center space-x-4 text-darkGolden">
//         {user ? (
//           <Link to="#" onClick={signOut} className="text-[0.9rem] font-bold">
//             Logout
//           </Link>
//         ) : (
//           <Link to="/login" className="text-[0.9rem] font-bold">Login</Link>
//         )}

//         {/* Profile Image - Click to Navigate to Profile Page */}
//         <img
//           className="w-[35px] h-[35px] rounded-full cursor-pointer border-2 border-darkGolden"
//           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
//           alt="User Icon"
//           onClick={() => navigate("/profile-page")}
//         />
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { useState } from "react";
import logo from "/src/assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react"; // Import icons for hamburger and close

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Track menu state

  const handleDesignClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          localStorage.setItem("redirectPath", location.pathname);
          navigate("/login");
        }
      });
    } else {
      navigate("/catalog");
    }
  };
  return (
    <nav className="w-full h-[10vh] bg-navbar flex items-center px-6 md:px-12 xl:px-20 justify-between relative">
      {/* Mobile - Hamburger Icon (Left) */}
      <div className="md:hidden">
        {isOpen ? (
          <X className="w-8 h-8 text-darkGolden cursor-pointer" onClick={() => setIsOpen(false)} />
        ) : (
          <Menu className="w-8 h-8 text-darkGolden cursor-pointer" onClick={() => setIsOpen(true)} />
        )}
      </div>

      {/* Center - Logo (Absolute Center on Small Screens) */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-[5%] md:translate-x-0">
        <Link to="/" className="block">
          <img src={logo} alt="Logo" className="w-[16vh] md:w-[18vh] xl:w-[20vh]" />
        </Link>
      </div>

      {/* Desktop - Navigation Links */}
      <div className="hidden md:flex flex-1 justify-center space-x-6 md:space-x-10 text-darkGolden text-[1rem] md:text-[1.2rem] font-bold">
        <Link to="/">Home</Link>
        <button onClick={handleDesignClick}>AI Designs</button>
        <Link to="/">Pricing</Link>
        <Link to="/Contact-Us">Contact Us</Link>
      </div>

      {/* Right - Profile & Authentication */}
      <div className="hidden md:flex items-center space-x-4 text-darkGolden">
        {user ? (
          <Link to="#" onClick={signOut} className="text-[1.2rem] font-bold">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-[1.2rem] font-bold">Login</Link>
        )}
        <img
          className="w-[35px] h-[35px] rounded-full cursor-pointer border-2 border-darkGolden"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
          onClick={() => navigate("/profile-page")}
        />
      </div>

      {/* Mobile - Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-navbar text-darkGolden flex flex-col space-y-4 p-6 text-center shadow-lg">
          <Link to="/" className="py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <button onClick={handleDesignClick} className="py-2">AI Designs</button>
          <Link to="/" className="py-2" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/Contact-Us" className="py-2" onClick={() => setIsOpen(false)}>Contact Us</Link>
          {user ? (
            <Link to="#" onClick={() => { signOut(); setIsOpen(false); }} className="py-2 font-bold">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="py-2 font-bold" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
