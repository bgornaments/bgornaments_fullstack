import React, { ReactNode, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import Lottie from "react-lottie";
import login from "/src/assets/login.json";

const formFields = {
  signUp: {
    email: {
      order: 1,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    phone_number: {
      order: 2,
      placeholder: "Enter your Phone number",
      label: "Phone number",
      isRequired: true,
      dialCode: '+91',
    },
    pan: {
      order: 3,
      placeholder: "Enter your PAN number",
      label: "PAN",
      isRequired: true,
    },
    gst: {
      order: 4,
      placeholder: "Enter your GST number",
      label: "GST",
      isRequired: true,
    },
    password: {
      order: 5,
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 6,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const Login: React.FC<{ children?: ReactNode }> = ({ children }) => {
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

      <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
        <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
          <Lottie options={defaultOptions} />
        </div>
      </div>

      <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
        <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
          <Authenticator.Provider>
            <Authenticator formFields={formFields}>
              {({ signOut, user }) => (
                <div>
                  {user ? (
                    <div>
                      {children}
                      <button onClick={signOut} className="mt-4">
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h1>Please sign in below:</h1>
                    </div>
                  )}
                </div>
              )}
            </Authenticator>
          </Authenticator.Provider>
        </div>
      </div>
    </div>
  );
};

export default Login;
