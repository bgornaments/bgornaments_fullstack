import React from "react";
import logo from "/src/assets/image.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

//f5e8d7
const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator(context => [context.user]);

  return (
    <div className="w-full h-[10vh] bg-navbar flex xs:justify-center md:justify-between items-center top-0 md:px-[2.5rem] xl:px-[4.8rem]">
      <div className="hidden md:block">
        <Link to="/" className="block">
          <img src={logo} alt="Logo" className="md:w-[15vh] xl:w-[20vh]" />
        </Link>
      </div>
      <div className="flex xl:gap-[3.5rem] md:gap-[1.5rem] xs:gap-[2.2rem] xs:text-[0.8rem] md:text-[1rem] xl:text-[1.25rem] md:px-[2rem] justify-around text-darkGolden">
        <Link to="/" className="font-bold">Home</Link>
        <Link to="/catalog" className="font-bold">AI Designs</Link>
        <Link to="/" className="font-bold">Features</Link>
        {user ? (
          <Link to="#" onClick={signOut} className="font-bold">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="font-bold">Retailer Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
