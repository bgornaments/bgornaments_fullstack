// import React, { ReactNode, useEffect, useState } from "react";
// import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// import { useNavigate } from "react-router-dom";
// import "@aws-amplify/ui-react/styles.css";
// import Lottie from "react-lottie";
// import login from "/src/assets/login.json";
// import { fetchAuthSession } from "aws-amplify/auth";

// interface LoginProps {
//   children?: ReactNode;
// }

// const formFields = {
//   signUp: {
//     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
//     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
//     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
//     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
//     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
//     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
//   },
// };

// const Login: React.FC<LoginProps> = ({ children }) => {
//   const { user } = useAuthenticator();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState<string | null>(null);
//   const [messageType, setMessageType] = useState<"success" | "error" | "warn" | null>(null);

//   const defaultOptions = {
//     loop: false,
//     autoplay: true,
//     animationData: login,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   // Fetch session and persist data
//   useEffect(() => {
//     const fetchSession = async () => {
//       if (user) {
//         try {
//           const session = await fetchAuthSession({ forceRefresh: true });
//           console.log("Full session object:", session);
    
//           if (session?.tokens?.idToken?.payload) {
//             const payload = session.tokens.idToken.payload;
//             const cognitoUsername = payload["cognito:username"];
//             console.log("Cognito Username:", cognitoUsername);
    
//             // API call for trial status
//             const url = `https://4ouksse92i.execute-api.us-east-1.amazonaws.com/default/checkTrialStatus?cognito_username=${cognitoUsername}`;
//             const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
//             const responseData = await response.json();
            
//             console.log("API Response Data:", responseData);  // Debugging line to check response
    
//             if (response.ok) {
//               const { trial_start_date, trial_end_date, trial_status, cognito_username } = responseData.data;
//               // Persist session data in sessionStorage
//               localStorage.setItem("cognito_username", cognito_username);
//               localStorage.setItem("trial_status", trial_status.toLowerCase());
//               localStorage.setItem("trial_start_date", trial_start_date);
//               localStorage.setItem("trial_end_date", trial_end_date);
    
//               const trialDaysLeft = Math.max(
//                 0,
//                 Math.ceil((new Date(trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
//               );
//               localStorage.setItem("trial_days_left", trialDaysLeft.toString());
    
//               setMessage("Trial status retrieved successfully.");
//               setMessageType("success");
    
//               if (trialDaysLeft > 0) {
//                 alert(`${trialDaysLeft} days left in your trial version.`);
//               } else {
//                 alert("Your trial version has expired.");
//               }
//             } else {
//               setMessage(responseData.message || "Failed to retrieve trial status.");
//               setMessageType("error");
//             }
//           } else {
//             setMessage("ID Token payload is unavailable in the session.");
//             setMessageType("error");
//           }
//         } catch (err) {
//           console.error("Error fetching session:", err);
//           setMessage("Error occurred while fetching session.");
//           setMessageType("error");
//         }
//       } else {
//         console.warn("User is not authenticated.");
//         setMessage("User is not authenticated.");
//         setMessageType("error");
//       }
//     };    

//     fetchSession();
//   }, [user]);

//   useEffect(() => {
//     const fetchSession = async () => {
//       if (user) {
//         const redirectTo = sessionStorage.getItem("redirectTo");
//         if (redirectTo) {
//           sessionStorage.removeItem("redirectTo"); // Clear the redirect path after use
//           navigate(redirectTo);
//         } else {
//           navigate("/"); // Default fallback
//         }
//       }
//     };
  
//     fetchSession();
//   }, [user, navigate]);

//   const messageStyles = {
//     success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
//     error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
//     warn: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4",
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
//       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
//         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
//           <Lottie options={defaultOptions} />
//         </div>
//       </div>

//       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
//         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
//           <Authenticator formFields={formFields}>
//             {({ signOut, user }) => (
//               <div>
//                 {message && <div className={messageStyles[messageType || "success"]}>{message}</div>}
//                 {user ? (
//                   <div>
//                     {children}
//                     <button onClick={signOut} className="mt-4">
//                       Sign out
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <h1>Please sign in below:</h1>
//                   </div>
//                 )}
//               </div>
//             )}
//           </Authenticator>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { ReactNode, useEffect, useState } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import Lottie from "react-lottie";
import login from "/src/assets/login.json";
import { fetchAuthSession } from "aws-amplify/auth";

interface LoginProps {
  children?: ReactNode;
}

const formFields = {
  signUp: {
    email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
    phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
    pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
    gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
    password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
    confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
  },
};

const Login: React.FC<LoginProps> = ({ children }) => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "warn" | null>(null);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchSession = async () => {
      if (user) {
        try {
          const session = await fetchAuthSession({ forceRefresh: true });
          console.log("Full session object:", session);

          if (session?.tokens?.idToken?.payload) {
            const payload = session.tokens.idToken.payload;
            const cognitoUsername = payload["cognito:username"];
            console.log("Cognito Username:", cognitoUsername);

            // API call for trial status
            const url = `https://4ouksse92i.execute-api.us-east-1.amazonaws.com/default/checkTrialStatus?cognito_username=${cognitoUsername}`;
            const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
            const responseData = await response.json();

            console.log("API Response Data:", responseData);  // Debugging line to check response

            if (response.ok) {
              const { trial_start_date, trial_end_date, trial_status, cognito_username } = responseData.data;
              // Persist session data in localStorage
              localStorage.setItem("cognito_username", cognito_username);
              localStorage.setItem("trial_status", trial_status.toLowerCase());
              localStorage.setItem("trial_start_date", trial_start_date);
              localStorage.setItem("trial_end_date", trial_end_date);

              const trialDaysLeft = Math.max(
                0,
                Math.ceil((new Date(trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              );
              localStorage.setItem("trial_days_left", trialDaysLeft.toString());

              setMessage("Trial status retrieved successfully.");
              setMessageType("success");

              if (trialDaysLeft > 0) {
                alert(`${trialDaysLeft} days left in your trial version.`);
              } else {
                alert("Your trial version has expired.");
              }
            } else {
              setMessage(responseData.message || "Failed to retrieve trial status.");
              setMessageType("error");
            }
          } else {
            setMessage("ID Token payload is unavailable in the session.");
            setMessageType("error");
          }
        } catch (err) {
          console.error("Error fetching session:", err);
          setMessage("Error occurred while fetching session.");
          setMessageType("error");
        }
      } else {
        console.warn("User is not authenticated.");
        setMessage("User is not authenticated.");
        setMessageType("error");
      }
    };

    fetchSession();
  }, [user]);

  useEffect(() => {
    const fetchSession = async () => {
      if (user) {
        const redirectTo = sessionStorage.getItem("redirectTo");
        if (redirectTo) {
          sessionStorage.removeItem("redirectTo"); // Clear the redirect path after use
          navigate(redirectTo);
        } else {
          navigate("/"); // Default fallback
        }
      }
    };

    fetchSession();
  }, [user, navigate]);

  // Ensure localStorage is cleared when all tabs are closed
  useEffect(() => {
    const onTabClose = () => {
      const otherTabs = localStorage.getItem("openTabsCount");
      if (otherTabs === "0") {
        // Clear localStorage when all tabs are closed
        localStorage.clear();
      }
    };

    const incrementTabCount = () => {
      const count = localStorage.getItem("openTabsCount");
      localStorage.setItem("openTabsCount", (parseInt(count || "1") + 1).toString());
    };

    const decrementTabCount = () => {
      const count = localStorage.getItem("openTabsCount");
      localStorage.setItem("openTabsCount", (parseInt(count || "0") - 1).toString());
    };

    window.addEventListener("beforeunload", onTabClose);
    incrementTabCount();

    // Cleanup on tab close
    return () => {
      decrementTabCount();
      window.removeEventListener("beforeunload", onTabClose);
    };
  }, []);

  const messageStyles = {
    success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
    error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
    warn: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4",
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
      <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
        <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
          <Lottie options={defaultOptions} />
        </div>
      </div>

      <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
        <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
          <Authenticator formFields={formFields}>
            {({ signOut, user }) => (
              <div>
                {message && <div className={messageStyles[messageType || "success"]}>{message}</div>}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
