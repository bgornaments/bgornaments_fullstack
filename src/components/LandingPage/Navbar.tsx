import React from "react";
import logo from "/src/assets/image.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

//f5e8d7
const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);

  return (
    <div className="w-full h-[10vh] bg-[#f5e8d7] flex xs:justify-center md:justify-between items-center top-0 md:px-[2.5rem] xl:px-[4rem] shadow-xl shadow-[#b9944c]">
      <div className="hidden md:block">
        <img src={logo} alt="" className="md:w-[15vh] xl:w-[22vh]" />
      </div>
      <div className="flex xl:gap-[3rem] md:gap-[1.5rem] xs:gap-[1.6rem] xs:text-[2vh] md:text-[1.5vh] xl:text-[2.3vh] justify-around text-customGreen text-bold md:px-[4rem]">
        <Link to="/">Home</Link>
        <Link to="/catalog">Designs Catalogue</Link>
        <Link to="/">Features</Link>
        {user ? (
          <Link to="#" onClick={signOut}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
