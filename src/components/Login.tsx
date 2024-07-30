import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

const Login: React.FC = () => {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (route === "authenticated") {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [route, navigate]);

  return (
    <div className="bg-[#FFF9F5] w-full min-h-screen flex flex-col  items-center justify-center">
      <div className="bg-customGreen p-2 rounded-xl">
        <Authenticator />
      </div>
    </div>
  );
};

export default Login;
