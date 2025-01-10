import React from "react";
import logo from "/src/assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";

//f5e8d7
const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
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
          localStorage.setItem('redirectPath', location.pathname);
          navigate("/login");
        }
      });
    } else {
      navigate("/catalog");
    }
  };

  return (
    <div className="w-full h-[10vh] bg-navbar flex xs:justify-center md:justify-between items-center top-0 md:px-[2.5rem] xl:px-[4.8rem]">
      <div className="hidden md:block">
        <Link to="/" className="block">
          <img src={logo} alt="Logo" className="md:w-[15vh] xl:w-[20vh]" />
        </Link>
      </div>
      <div className="flex xl:gap-[3.5rem] md:gap-[1.5rem] xs:gap-[1.8rem] xs:text-[0.8rem] md:text-[1rem] xl:text-[1.1rem] md:px-[2rem] justify-around text-darkGolden">
        <Link to="/" className="font-bold">Home</Link>
        <button onClick={handleDesignClick} className="font-bold">AI Designs</button>
        <Link to="/" className="font-bold">Pricing</Link>
        {user ? (
          <Link to="#" onClick={signOut} className="font-bold">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="font-bold">Jeweller Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
