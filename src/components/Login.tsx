// // // // // // // // // // /* eslint-disable @typescript-eslint/no-unused-vars */
// // // // // // // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // // // // // // // // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // // // // // // import React, { ReactNode, useEffect } from "react";
// // // // // // // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import "@aws-amplify/ui-react/styles.css";
// // // // // // // // import Lottie from "react-lottie";
// // // // // // // // import login from "/src/assets/login.json";
// // // // // // // // import { fetchAuthSession } from 'aws-amplify/auth';

// // // // // // // // const session = await fetchAuthSession();

// // // // // // // // console.log("id token", session.tokens.idToken)
// // // // // // // // console.log("access token", session.tokens.accessToken)
// // // // // // // // await fetchAuthSession({ forceRefresh: true });

// // // // // // // // const formFields = {
// // // // // // // //   signUp: {
// // // // // // // //     email: {
// // // // // // // //       order: 1,
// // // // // // // //       placeholder: "Enter your email address",
// // // // // // // //       label: "Email",
// // // // // // // //       isRequired: true,
// // // // // // // //     },
// // // // // // // //     phone_number: {
// // // // // // // //       order: 2,
// // // // // // // //       placeholder: "Enter your Phone number",
// // // // // // // //       label: "Phone number",
// // // // // // // //       isRequired: true,
// // // // // // // //       dialCode: '+91',
// // // // // // // //     },
// // // // // // // //     pan: {
// // // // // // // //       order: 3,
// // // // // // // //       placeholder: "Enter your PAN number",
// // // // // // // //       label: "PAN",
// // // // // // // //       isRequired: true,
// // // // // // // //     },
// // // // // // // //     gst: {
// // // // // // // //       order: 4,
// // // // // // // //       placeholder: "Enter your GST number",
// // // // // // // //       label: "GST",
// // // // // // // //       isRequired: true,
// // // // // // // //     },
// // // // // // // //     password: {
// // // // // // // //       order: 5,
// // // // // // // //       placeholder: "Enter your password",
// // // // // // // //       label: "Password",
// // // // // // // //       isRequired: true,
// // // // // // // //     },
// // // // // // // //     confirm_password: {
// // // // // // // //       order: 6,
// // // // // // // //       placeholder: "Confirm your password",
// // // // // // // //       label: "Confirm Password",
// // // // // // // //       isRequired: true,
// // // // // // // //     },
// // // // // // // //   },
// // // // // // // // };

// // // // // // // // const Login: React.FC<{ children?: ReactNode }> = ({ children }) => {
// // // // // // // //   const { route } = useAuthenticator();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const defaultOptions = {
// // // // // // // //     loop: false,
// // // // // // // //     autoplay: true,
// // // // // // // //     animationData: login,
// // // // // // // //     rendererSettings: {
// // // // // // // //       preserveAspectRatio: "xMidYMid slice",
// // // // // // // //     },
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (route === "authenticated") {
// // // // // // // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // // // // // // //       localStorage.removeItem("redirectPath");
// // // // // // // //       navigate(redirectPath);
// // // // // // // //     }
// // // // // // // //   }, [route, navigate]);

// // // // // // // //   return (
// // // // // // // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">

// // // // // // // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // // // // // // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // // // // // // //           <Lottie options={defaultOptions} />
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // // // // // // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // // // // // // //           <Authenticator.Provider>
// // // // // // // //             <Authenticator formFields={formFields}>
// // // // // // // //               {({ signOut, user }) => (
// // // // // // // //                 <div>
// // // // // // // //                   {user ? (
// // // // // // // //                     <div>
// // // // // // // //                       {children}
// // // // // // // //                       <button onClick={signOut} className="mt-4">
// // // // // // // //                         Sign out
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   ) : (
// // // // // // // //                     <div>
// // // // // // // //                       <h1>Please sign in below:</h1>
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </Authenticator>
// // // // // // // //           </Authenticator.Provider>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Login;

// // // // // // // import React, { ReactNode, useEffect } from "react";
// // // // // // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import "@aws-amplify/ui-react/styles.css";
// // // // // // // import Lottie from "react-lottie";
// // // // // // // import login from "/src/assets/login.json";
// // // // // // // import { fetchAuthSession } from "aws-amplify/auth";

// // // // // // // interface LoginProps {
// // // // // // //   children?: ReactNode;
// // // // // // // }

// // // // // // // const formFields = {
// // // // // // //   signUp: {
// // // // // // //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// // // // // // //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// // // // // // //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// // // // // // //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// // // // // // //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// // // // // // //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// // // // // // //   },
// // // // // // // };

// // // // // // // const Login: React.FC<LoginProps> = ({ children }) => {
// // // // // // //   const { route, user } = useAuthenticator();  // Move useAuthenticator to the top level
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const defaultOptions = {
// // // // // // //     loop: false,
// // // // // // //     autoplay: true,
// // // // // // //     animationData: login,
// // // // // // //     rendererSettings: {
// // // // // // //       preserveAspectRatio: "xMidYMid slice",
// // // // // // //     },
// // // // // // //   };

// // // // // // //   // Handle session fetch logic
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchSession = async () => {
// // // // // // //       if (user) {  // Ensure the user is authenticated before fetching session
// // // // // // //         try {
// // // // // // //           // Try to fetch the session (force refresh if needed)
// // // // // // //           const session = await fetchAuthSession({ forceRefresh: true });
// // // // // // //           console.log("Full session object:", session);  // Log full session to inspect

// // // // // // //           // Check if tokens are available in the session
// // // // // // //           if (session?.tokens) {
// // // // // // //             console.log("ID Token:", session.tokens.idToken);
// // // // // // //             console.log("Access Token:", session.tokens.accessToken);

// // // // // // //             // You can use these tokens for API requests or other logic here
// // // // // // //           } else {
// // // // // // //             console.warn("Tokens are not available in the session.");
// // // // // // //           }
// // // // // // //         } catch (err) {
// // // // // // //           console.error("Error fetching session:", err);
// // // // // // //         }
// // // // // // //       } else {
// // // // // // //         console.warn("User is not authenticated.");
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchSession();
// // // // // // //   }, [user]);  // Re-run effect if user state changes

// // // // // // //   useEffect(() => {
// // // // // // //     if (route === "authenticated") {
// // // // // // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // // // // // //       localStorage.removeItem("redirectPath");
// // // // // // //       navigate(redirectPath);
// // // // // // //     }
// // // // // // //   }, [route, navigate]);

// // // // // // //   return (
// // // // // // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// // // // // // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // // // // // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // // // // // //           <Lottie options={defaultOptions} />
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // // // // // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // // // // // //           <Authenticator formFields={formFields}>
// // // // // // //             {({ signOut, user }) => (
// // // // // // //               <div>
// // // // // // //                 {user ? (
// // // // // // //                   <div>
// // // // // // //                     {children}
// // // // // // //                     <button onClick={signOut} className="mt-4">
// // // // // // //                       Sign out
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 ) : (
// // // // // // //                   <div>
// // // // // // //                     <h1>Please sign in below:</h1>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </Authenticator>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Login;
// // // // // // import React, { ReactNode, useEffect } from "react";
// // // // // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import "@aws-amplify/ui-react/styles.css";
// // // // // // import Lottie from "react-lottie";
// // // // // // import login from "/src/assets/login.json";
// // // // // // import { fetchAuthSession } from "aws-amplify/auth";

// // // // // // interface LoginProps {
// // // // // //   children?: ReactNode;
// // // // // // }

// // // // // // const formFields = {
// // // // // //   signUp: {
// // // // // //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// // // // // //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// // // // // //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// // // // // //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// // // // // //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// // // // // //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// // // // // //   },
// // // // // // };

// // // // // // const Login: React.FC<LoginProps> = ({ children }) => {
// // // // // //   const { route, user } = useAuthenticator();  // Move useAuthenticator to the top level
// // // // // //   const navigate = useNavigate();

// // // // // //   const defaultOptions = {
// // // // // //     loop: false,
// // // // // //     autoplay: true,
// // // // // //     animationData: login,
// // // // // //     rendererSettings: {
// // // // // //       preserveAspectRatio: "xMidYMid slice",
// // // // // //     },
// // // // // //   };

// // // // // //   // Handle session fetch logic
// // // // // //   useEffect(() => {
// // // // // //     const fetchSession = async () => {
// // // // // //       if (user) {  // Ensure the user is authenticated before fetching session
// // // // // //         try {
// // // // // //           // Try to fetch the session (force refresh if needed)
// // // // // //           const session = await fetchAuthSession({ forceRefresh: true });
// // // // // //           console.log("Full session object:", session);  // Log full session to inspect

// // // // // //           // Check if tokens are available in the session
// // // // // //           if (session?.tokens?.idToken?.payload) {
// // // // // //             const payload = session.tokens.idToken.payload;

// // // // // //             console.log("Parsed ID Token Payload:", payload);

// // // // // //             // Extract cognito:username
// // // // // //             const cognitoUsername = payload["cognito:username"];
// // // // // //             console.log("Cognito Username:", cognitoUsername);

// // // // // //             // You can use cognitoUsername for further logic
// // // // // //           } else {
// // // // // //             console.warn("ID Token payload is not available in the session.");
// // // // // //           }
// // // // // //         } catch (err) {
// // // // // //           console.error("Error fetching session:", err);
// // // // // //         }
// // // // // //       } else {
// // // // // //         console.warn("User is not authenticated.");
// // // // // //       }
// // // // // //     };

// // // // // //     fetchSession();
// // // // // //   }, [user]);  // Re-run effect if user state changes

// // // // // //   useEffect(() => {
// // // // // //     if (route === "authenticated") {
// // // // // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // // // // //       localStorage.removeItem("redirectPath");
// // // // // //       navigate(redirectPath);
// // // // // //     }
// // // // // //   }, [route, navigate]);

// // // // // //   return (
// // // // // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// // // // // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // // // // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // // // // //           <Lottie options={defaultOptions} />
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // // // // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // // // // //           <Authenticator formFields={formFields}>
// // // // // //             {({ signOut, user }) => (
// // // // // //               <div>
// // // // // //                 {user ? (
// // // // // //                   <div>
// // // // // //                     {children}
// // // // // //                     <button onClick={signOut} className="mt-4">
// // // // // //                       Sign out
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <div>
// // // // // //                     <h1>Please sign in below:</h1>
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </Authenticator>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Login;
// // // // // import React, { ReactNode, useEffect, useState } from "react";
// // // // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import "@aws-amplify/ui-react/styles.css";
// // // // // import Lottie from "react-lottie";
// // // // // import login from "/src/assets/login.json";
// // // // // import { fetchAuthSession } from "aws-amplify/auth";

// // // // // interface LoginProps {
// // // // //   children?: ReactNode;
// // // // // }

// // // // // const formFields = {
// // // // //   signUp: {
// // // // //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// // // // //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// // // // //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// // // // //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// // // // //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// // // // //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// // // // //   },
// // // // // };

// // // // // const Login: React.FC<LoginProps> = ({ children }) => {
// // // // //   const { route, user } = useAuthenticator();  // Move useAuthenticator to the top level
// // // // //   const navigate = useNavigate();
// // // // //   const [message, setMessage] = useState<string | null>(null);
// // // // //   const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

// // // // //   const defaultOptions = {
// // // // //     loop: false,
// // // // //     autoplay: true,
// // // // //     animationData: login,
// // // // //     rendererSettings: {
// // // // //       preserveAspectRatio: "xMidYMid slice",
// // // // //     },
// // // // //   };

// // // // //   // Handle session fetch logic
// // // // //   useEffect(() => {
// // // // //     const fetchSession = async () => {
// // // // //       if (user) {  // Ensure the user is authenticated before fetching session
// // // // //         try {
// // // // //           // Try to fetch the session (force refresh if needed)
// // // // //           const session = await fetchAuthSession({ forceRefresh: true });
// // // // //           console.log("Full session object:", session);  // Log full session to inspect

// // // // //           // Check if tokens are available in the session
// // // // //           if (session?.tokens?.idToken?.payload) {
// // // // //             const payload = session.tokens.idToken.payload;

// // // // //             console.log("Parsed ID Token Payload:", payload);

// // // // //             // Extract cognito:username
// // // // //             const cognitoUsername = payload["cognito:username"];
// // // // //             console.log("Cognito Username:", cognitoUsername);

// // // // //             // Set trial period dates (10 days trial from now)
// // // // //             const trialStartDate = new Date().toISOString();
// // // // //             const trialEndDate = new Date();
// // // // //             trialEndDate.setDate(trialEndDate.getDate() + 10); // 10 days from today
// // // // //             const trialEndDateString = trialEndDate.toISOString();

// // // // //             // Make an API call to save trial data
// // // // //             const trialData = {
// // // // //               cognito_username: cognitoUsername,
// // // // //               trial_start_date: trialStartDate,
// // // // //               trial_end_date: trialEndDateString,
// // // // //               trial_status: "True",
// // // // //             };

// // // // //             const response = await fetch("https://lhn7iin1ia.execute-api.us-east-1.amazonaws.com/default/DynamoEntry", {
// // // // //               method: "POST",
// // // // //               headers: {
// // // // //                 "Content-Type": "application/json",
// // // // //               },
// // // // //               body: JSON.stringify(trialData),
// // // // //             });

// // // // //             if (response.ok) {
// // // // //               setMessage("Trial period started successfully.");
// // // // //               setMessageType("success");
// // // // //             } else {
// // // // //               setMessage("Failed to start trial period. Please try again.");
// // // // //               setMessageType("error");
// // // // //             }
// // // // //           } else {
// // // // //             setMessage("ID Token payload is not available in the session.");
// // // // //             setMessageType("error");
// // // // //           }
// // // // //         } catch (err) {
// // // // //           console.error("Error fetching session:", err);
// // // // //           setMessage("Error occurred while fetching session.");
// // // // //           setMessageType("error");
// // // // //         }
// // // // //       } else {
// // // // //         console.warn("User is not authenticated.");
// // // // //         setMessage("User is not authenticated.");
// // // // //         setMessageType("error");
// // // // //       }
// // // // //     };

// // // // //     fetchSession();
// // // // //   }, [user]);  // Re-run effect if user state changes

// // // // //   useEffect(() => {
// // // // //     if (route === "authenticated") {
// // // // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // // // //       localStorage.removeItem("redirectPath");
// // // // //       navigate(redirectPath);
// // // // //     }
// // // // //   }, [route, navigate]);

// // // // //   // CSS styles for message display
// // // // //   const messageStyles = {
// // // // //     success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
// // // // //     error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// // // // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // // // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // // // //           <Lottie options={defaultOptions} />
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // // // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // // // //           <Authenticator formFields={formFields}>
// // // // //             {({ signOut, user }) => (
// // // // //               <div>
// // // // //                 {message && (
// // // // //                   <div className={messageStyles[messageType || 'success']}>
// // // // //                     {message}
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {user ? (
// // // // //                   <div>
// // // // //                     {children}
// // // // //                     <button onClick={signOut} className="mt-4">
// // // // //                       Sign out
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div>
// // // // //                     <h1>Please sign in below:</h1>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </Authenticator>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Login;
// // // // import React, { ReactNode, useEffect, useState } from "react";
// // // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "@aws-amplify/ui-react/styles.css";
// // // // import Lottie from "react-lottie";
// // // // import login from "/src/assets/login.json";
// // // // import { fetchAuthSession } from "aws-amplify/auth";

// // // // interface LoginProps {
// // // //   children?: ReactNode;
// // // // }

// // // // const formFields = {
// // // //   signUp: {
// // // //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// // // //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// // // //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// // // //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// // // //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// // // //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// // // //   },
// // // // };

// // // // const Login: React.FC<LoginProps> = ({ children }) => {
// // // //   const { route, user } = useAuthenticator();  // Move useAuthenticator to the top level
// // // //   const navigate = useNavigate();
// // // //   const [message, setMessage] = useState<string | null>(null);
// // // //   const [messageType, setMessageType] = useState<'success' | 'error' | 'warn' | null>(null); // Add 'warn' for warnings

// // // //   const defaultOptions = {
// // // //     loop: false,
// // // //     autoplay: true,
// // // //     animationData: login,
// // // //     rendererSettings: {
// // // //       preserveAspectRatio: "xMidYMid slice",
// // // //     },
// // // //   };

// // // //   // Handle session fetch logic
// // // //   useEffect(() => {
// // // //     const fetchSession = async () => {
// // // //       if (user) {  // Ensure the user is authenticated before fetching session
// // // //         try {
// // // //           // Try to fetch the session (force refresh if needed)
// // // //           const session = await fetchAuthSession({ forceRefresh: true });
// // // //           console.log("Full session object:", session);  // Log full session to inspect

// // // //           // Check if tokens are available in the session
// // // //           if (session?.tokens?.idToken?.payload) {
// // // //             const payload = session.tokens.idToken.payload;

// // // //             console.log("Parsed ID Token Payload:", payload);

// // // //             // Extract cognito:username
// // // //             const cognitoUsername = payload["cognito:username"];
// // // //             console.log("Cognito Username:", cognitoUsername);

// // // //             // Set trial period dates (10 days trial from now)
// // // //             const trialStartDate = new Date().toISOString();
// // // //             const trialEndDate = new Date();
// // // //             trialEndDate.setDate(trialEndDate.getDate() + 10); // 10 days from today
// // // //             const trialEndDateString = trialEndDate.toISOString();

// // // //             // Make an API call to save trial data
// // // //             const trialData = {
// // // //               cognito_username: cognitoUsername,
// // // //               trial_start_date: trialStartDate,
// // // //               trial_end_date: trialEndDateString,
// // // //               trial_status: "True",
// // // //             };

// // // //             const response = await fetch("https://lhn7iin1ia.execute-api.us-east-1.amazonaws.com/default/DynamoEntry", {
// // // //               method: "POST",
// // // //               headers: {
// // // //                 "Content-Type": "application/json",
// // // //               },
// // // //               body: JSON.stringify(trialData),
// // // //             });

// // // //             const responseData = await response.json();

// // // //             // Check for success or failure message from the backend
// // // //             if (response.ok) {
// // // //               setMessage(responseData.message || "Trial period started successfully.");
// // // //               setMessageType("success");
// // // //             } else {
// // // //               setMessage(responseData.message || "Failed to start trial period. Please try again.");
// // // //               setMessageType("error");
// // // //             }
// // // //           } else {
// // // //             setMessage("ID Token payload is not available in the session.");
// // // //             setMessageType("error");
// // // //           }
// // // //         } catch (err) {
// // // //           console.error("Error fetching session:", err);
// // // //           setMessage("Error occurred while fetching session.");
// // // //           setMessageType("error");
// // // //         }
// // // //       } else {
// // // //         console.warn("User is not authenticated.");
// // // //         setMessage("User is not authenticated.");
// // // //         setMessageType("error");
// // // //       }
// // // //     };

// // // //     fetchSession();
// // // //   }, [user]);  // Re-run effect if user state changes

// // // //   useEffect(() => {
// // // //     if (route === "authenticated") {
// // // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // // //       localStorage.removeItem("redirectPath");
// // // //       navigate(redirectPath);
// // // //     }
// // // //   }, [route, navigate]);

// // // //   // CSS styles for message display
// // // //   const messageStyles = {
// // // //     success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
// // // //     error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
// // // //     warn: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4", // Add warn style
// // // //   };

// // // //   return (
// // // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// // // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // // //           <Lottie options={defaultOptions} />
// // // //         </div>
// // // //       </div>

// // // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // // //           <Authenticator formFields={formFields}>
// // // //             {({ signOut, user }) => (
// // // //               <div>
// // // //                 {message && (
// // // //                   <div className={messageStyles[messageType || 'success']}>
// // // //                     {message}
// // // //                   </div>
// // // //                 )}
// // // //                 {user ? (
// // // //                   <div>
// // // //                     {children}
// // // //                     <button onClick={signOut} className="mt-4">
// // // //                       Sign out
// // // //                     </button>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div>
// // // //                     <h1>Please sign in below:</h1>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </Authenticator>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;
// // // import React, { ReactNode, useEffect, useState } from "react";
// // // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // // import { useNavigate } from "react-router-dom";
// // // import "@aws-amplify/ui-react/styles.css";
// // // import Lottie from "react-lottie";
// // // import login from "/src/assets/login.json";
// // // import { fetchAuthSession } from "aws-amplify/auth";

// // // interface LoginProps {
// // //   children?: ReactNode;
// // // }

// // // const formFields = {
// // //   signUp: {
// // //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// // //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// // //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// // //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// // //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// // //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// // //   },
// // // };

// // // const Login: React.FC<LoginProps> = ({ children }) => {
// // //   const { route, user } = useAuthenticator();
// // //   const navigate = useNavigate();
// // //   const [message, setMessage] = useState<string | null>(null);
// // //   const [messageType, setMessageType] = useState<'success' | 'error' | 'warn' | null>(null);

// // //   const defaultOptions = {
// // //     loop: false,
// // //     autoplay: true,
// // //     animationData: login,
// // //     rendererSettings: {
// // //       preserveAspectRatio: "xMidYMid slice",
// // //     },
// // //   };

// // //   // Handle session fetch logic
// // //   useEffect(() => {
// // //     const fetchSession = async () => {
// // //       if (user) {
// // //         try {
// // //           const session = await fetchAuthSession({ forceRefresh: true });
// // //           console.log("Full session object:", session);

// // //           if (session?.tokens?.idToken?.payload) {
// // //             const payload = session.tokens.idToken.payload;
// // //             console.log("Parsed ID Token Payload:", payload);

// // //             const cognitoUsername = payload["cognito:username"];
// // //             console.log("Cognito Username:", cognitoUsername);

// // //             const trialStartDate = new Date().toISOString();
// // //             const trialEndDate = new Date();
// // //             trialEndDate.setDate(trialEndDate.getDate() + 10);
// // //             const trialEndDateString = trialEndDate.toISOString();

// // //             const trialData = {
// // //               cognito_username: cognitoUsername,
// // //               trial_start_date: trialStartDate,
// // //               trial_end_date: trialEndDateString,
// // //               trial_status: "True",
// // //             };

// // //             const response = await fetch("https://lhn7iin1ia.execute-api.us-east-1.amazonaws.com/default/DynamoEntry", {
// // //               method: "POST",
// // //               headers: {
// // //                 "Content-Type": "application/json",
// // //               },
// // //               body: JSON.stringify(trialData),
// // //             });

// // //             const responseData = await response.json();
// // //             console.log("Backend response:", responseData); // Log backend response

// // //             if (response.ok) {
// // //               setMessage(responseData.message || "Trial period started successfully.");
// // //               setMessageType("success");
// // //             } else {
// // //               setMessage(responseData.message || "Failed to start trial period. Please try again.");
// // //               setMessageType("error");
// // //             }
// // //           } else {
// // //             setMessage("ID Token payload is not available in the session.");
// // //             setMessageType("error");
// // //           }
// // //         } catch (err) {
// // //           console.error("Error fetching session:", err);
// // //           setMessage("Error occurred while fetching session.");
// // //           setMessageType("error");
// // //         }
// // //       } else {
// // //         console.warn("User is not authenticated.");
// // //         setMessage("User is not authenticated.");
// // //         setMessageType("error");
// // //       }
// // //     };

// // //     fetchSession();
// // //   }, [user]);

// // //   useEffect(() => {
// // //     if (route === "authenticated") {
// // //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// // //       localStorage.removeItem("redirectPath");
// // //       navigate(redirectPath);
// // //     }
// // //   }, [route, navigate]);

// // //   const messageStyles = {
// // //     success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
// // //     error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
// // //     warn: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4",
// // //   };

// // //   return (
// // //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// // //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// // //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// // //           <Lottie options={defaultOptions} />
// // //         </div>
// // //       </div>

// // //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// // //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// // //           <Authenticator formFields={formFields}>
// // //             {({ signOut, user }) => (
// // //               <div>
// // //                 {/* Display message if it exists */}
// // //                 {message && (
// // //                   <div className={messageStyles[messageType || 'success']}>
// // //                     {message}
// // //                   </div>
// // //                 )}
// // //                 {user ? (
// // //                   <div>
// // //                     {children}
// // //                     <button onClick={signOut} className="mt-4">
// // //                       Sign out
// // //                     </button>
// // //                   </div>
// // //                 ) : (
// // //                   <div>
// // //                     <h1>Please sign in below:</h1>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </Authenticator>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // import React, { ReactNode, useEffect, useState } from "react";
// // import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// // import { useNavigate } from "react-router-dom";
// // import "@aws-amplify/ui-react/styles.css";
// // import Lottie from "react-lottie";
// // import login from "/src/assets/login.json";
// // import { fetchAuthSession } from "aws-amplify/auth";

// // interface LoginProps {
// //   children?: ReactNode;
// // }

// // const formFields = {
// //   signUp: {
// //     email: { order: 1, placeholder: "Enter your email", label: "Email", isRequired: true },
// //     phone_number: { order: 2, placeholder: "Enter your phone", label: "Phone", isRequired: true },
// //     pan: { order: 3, placeholder: "Enter your PAN number", label: "PAN", isRequired: true },
// //     gst: { order: 4, placeholder: "Enter your GST number", label: "GST", isRequired: true },
// //     password: { order: 5, placeholder: "Enter your password", label: "Password", isRequired: true },
// //     confirm_password: { order: 6, placeholder: "Confirm password", label: "Confirm Password", isRequired: true },
// //   },
// // };

// // const Login: React.FC<LoginProps> = ({ children }) => {
// //   const { route, user } = useAuthenticator();
// //   const navigate = useNavigate();
// //   const [message, setMessage] = useState<string | null>(null);
// //   const [messageType, setMessageType] = useState<'success' | 'error' | 'warn' | null>(null);

// //   const defaultOptions = {
// //     loop: false,
// //     autoplay: true,
// //     animationData: login,
// //     rendererSettings: {
// //       preserveAspectRatio: "xMidYMid slice",
// //     },
// //   };

// //   // Handle session fetch logic
// //   useEffect(() => {
// //     const fetchSession = async () => {
// //       if (user) {
// //         try {
// //           const session = await fetchAuthSession({ forceRefresh: true });
// //           console.log("Full session object:", session);
  
// //           if (session?.tokens?.idToken?.payload) {
// //             const payload = session.tokens.idToken.payload;
// //             const cognitoUsername = payload["cognito:username"];
// //             console.log("Cognito Username:", cognitoUsername);
  
// //             // Construct the URL with cognito_username as query parameter
// //             const url = `https://4ouksse92i.execute-api.us-east-1.amazonaws.com/default/checkTrialStatus?cognito_username=${cognitoUsername}`;
// //             const response = await fetch(url, {
// //               method: "GET",
// //               headers: {
// //                 "Content-Type": "application/json",
// //               },
// //             });
  
// //             const responseData = await response.json();
// //             console.log("GET request backend response:", responseData);
  
// //             if (response.ok) {
// //               const { trial_start_date, trial_end_date, trial_status, cognito_username } = responseData.data;
  
// //               // Add key-value pairs to session storage
// //               sessionStorage.setItem("cognito_username", cognito_username);
// //               sessionStorage.setItem("trial_status", trial_status);
// //               sessionStorage.setItem("trial_start_date", trial_start_date);
// //               sessionStorage.setItem("trial_end_date", trial_end_date);
  
// //               // Calculate 'trial days left'
// //               const currentDate = new Date();
// //               const endDate = new Date(trial_end_date);
// //               const timeDiff = endDate.getTime() - currentDate.getTime();
// //               const trialDaysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Ensure no negative days
// //               sessionStorage.setItem("trial_days_left", trialDaysLeft.toString());
  
// //               console.log("Trial days left:", trialDaysLeft);
  
// //               setMessage(responseData.message || "Trial status retrieved successfully.");
// //               setMessageType("success");
// //             } else {
// //               setMessage(responseData.message || "Failed to retrieve trial status.");
// //             }
// //           } else {
// //             setMessage("ID Token payload is not available in the session.");
// //             setMessageType("error");
// //           }
// //         } catch (err) {
// //           console.error("Error fetching session:", err);
// //           setMessage("Error occurred while fetching session.");
// //           setMessageType("error");
// //         }
// //       } else {
// //         console.warn("User is not authenticated.");
// //         setMessage("User is not authenticated.");
// //         setMessageType("error");
// //       }
// //     };
  
// //     fetchSession();
// //   }, [user]);
  

// //   useEffect(() => {
// //     if (route === "authenticated") {
// //       const redirectPath = localStorage.getItem("redirectPath") || "/";
// //       localStorage.removeItem("redirectPath");
// //       navigate(redirectPath);
// //     }
// //   }, [route, navigate]);

// //   const messageStyles = {
// //     success: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4",
// //     error: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4",
// //     warn: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4",
// //   };

// //   return (
// //     <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center">
// //       <div className="lg:w-1/2 lg:min-h-screen lg:bg-navbar flex items-center justify-center">
// //         <div className="h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
// //           <Lottie options={defaultOptions} />
// //         </div>
// //       </div>

// //       <div className="lg:w-1/2 lg:min-h-screen bg-white flex items-center justify-center">
// //         <div className="p-1 xs:m-8 lg:m-5 rounded-xl">
// //           <Authenticator formFields={formFields}>
// //             {({ signOut, user }) => (
// //               <div>
// //                 {/* Display message if it exists */}
// //                 {message && (
// //                   <div className={messageStyles[messageType || 'success']}>
// //                     {message}
// //                   </div>
// //                 )}
// //                 {user ? (
// //                   <div>
// //                     {children}
// //                     <button onClick={signOut} className="mt-4">
// //                       Sign out
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <div>
// //                     <h1>Please sign in below:</h1>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </Authenticator>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
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

//             if (response.ok) {
//               const { trial_start_date, trial_end_date, trial_status, cognito_username } = responseData.data;

//               // Persist session data in sessionStorage
//               sessionStorage.setItem("cognito_username", cognito_username);
//               sessionStorage.setItem("trial_status", trial_status);
//               sessionStorage.setItem("trial_start_date", trial_start_date);
//               sessionStorage.setItem("trial_end_date", trial_end_date);

//               const trialDaysLeft = Math.max(
//                 0,
//                 Math.ceil((new Date(trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
//               );
//               sessionStorage.setItem("trial_days_left", trialDaysLeft.toString());

//               setMessage("Trial status retrieved successfully.");
//               setMessageType("success");
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

  // Fetch session and persist data
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
              // Persist session data in sessionStorage
              sessionStorage.setItem("cognito_username", cognito_username);
              sessionStorage.setItem("trial_status", trial_status.toLowerCase());
              sessionStorage.setItem("trial_start_date", trial_start_date);
              sessionStorage.setItem("trial_end_date", trial_end_date);
    
              const trialDaysLeft = Math.max(
                0,
                Math.ceil((new Date(trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              );
              sessionStorage.setItem("trial_days_left", trialDaysLeft.toString());
    
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

  // Handle automatic logout on app close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        // Log out when the user closes the browser or tab
        sessionStorage.removeItem("cognito_username");
        sessionStorage.removeItem("trial_status");
        sessionStorage.removeItem("trial_start_date");
        sessionStorage.removeItem("trial_end_date");
        sessionStorage.removeItem("trial_days_left");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
