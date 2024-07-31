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
    <div className="w-full min-h-screen flex">
      <div className="w-1/2 min-h-screen bg-[#FFF9F5] flex items-center justify-center shadow-md ">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
      <div className="w-1/2 min-h-screen bg-white rounded-2xl flex items-center justify-center">
        <div className="bg-customBeige p-1 rounded-xl">
          <Authenticator />
        </div>
      </div>
    </div>
  );
};

export default Login;
