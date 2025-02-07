import React, { useState, useEffect } from "react";
import logo from "/src/assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";
import userManual from "/src/assets/user-manual.pdf";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();

  // State to control the visibility of the User Manual button
  const [showUserManual, setShowUserManual] = useState<boolean>(false);

  useEffect(() => {
    const trialDaysLeft = parseInt(localStorage.getItem("trial_days_left") || "0");
    const trialStatus = localStorage.getItem("trial_status")?.toLowerCase();

    if (trialStatus && trialDaysLeft > 0) {
      setShowUserManual(true);
    } else {
      setShowUserManual(false);
    }
  }, []);

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

  const handleContactClick = () => {
    navigate("/Contact-Us");
  };

  const handleUserManualClick = () => {
    window.open(userManual, "_blank");
  };

  return (
    <div className="w-full h-[10vh] bg-navbar flex items-center px-6 md:px-12 xl:px-20 justify-between">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Link to="/" className="block">
          <img src={logo} alt="Logo" className="w-[8vh] xl:w-[10vh]" />
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="flex flex-1 justify-center space-x-6 md:space-x-10 text-darkGolden text-[0.9rem] md:text-[1rem] font-bold">
        <Link to="/">Home</Link>
        <button onClick={handleDesignClick}>AI Designs</button>
        <Link to="/">Pricing</Link>
        <button onClick={handleContactClick}>Contact Us</button>

        {showUserManual && (
          <button onClick={handleUserManualClick}>User Manual</button>
        )}
      </div>

      {/* Right - Profile & Authentication */}
      <div className="flex items-center space-x-4 text-darkGolden">
        {user ? (
          <Link to="#" onClick={signOut} className="text-[0.9rem] font-bold">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-[0.9rem] font-bold">Jeweller Login</Link>
        )}

        {/* Profile Image - Click to Navigate to Profile Page */}
        <img
          className="w-[35px] h-[35px] rounded-full cursor-pointer border-2 border-darkGolden"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
          onClick={() => navigate("/profile-page")}
        />
      </div>
    </div>
  );
};

export default Navbar;
