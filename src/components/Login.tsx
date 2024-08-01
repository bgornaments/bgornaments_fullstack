import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import Lottie from "react-lottie";
import login from "/src/assets/login.json";

const Login: React.FC = () => {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (route === "authenticated") {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [route, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
      <div className="lg:w-1/2 lg:min-h-screen lg:bg-[#FFF9F5] flex items-center justify-center">
        <div className=" h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
        <div className="bg-customBeige p-1 xs:m-4 lg:m-5  rounded-xl ">
          <Authenticator />
        </div>
      </div>
    </div>
  );
};

export default Login;
