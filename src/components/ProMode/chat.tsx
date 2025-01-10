/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Context } from '../../context/context';
import { assets } from '../../assets/assets';
import ButtonRow from './ButtonRow';
import PopUp from './PopUp';
import './chat.css';
import Sidebar from './Sidebar';
import * as inflection from 'inflection';
import GlassComponent from '../GlassComponent';

interface Button {
  text: string;
  value: string;
}

const generateBasicInfoString = (formData: Record<string, any>): string => {
  const jewelryType = inflection.singularize(formData.jewelryType).toLowerCase();
  const occasion = formData.occasion.toLowerCase();
  const gender = formData.gender.toLowerCase();
  const ageGroup = formData.ageGroup.toLowerCase();

  return `I want a ${jewelryType} for ${occasion} for a ${gender} aged ${ageGroup}.`;
};

const ProModeChatUI: React.FC = () => {
  const context = useContext(Context);
  const location = useLocation();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
    const trialDaysLeft = parseInt(sessionStorage.getItem('trial_days_left') || '0');
    const trialStatus = sessionStorage.getItem('trial_status')?.toLowerCase();

    console.log("trialDaysLeft:", trialDaysLeft); // Log trial days left
    console.log("trialStatus:", trialStatus); // Log trial status as boolean

    // Check if trialStatus is true and trialDaysLeft is greater than 0
    if (trialStatus && trialDaysLeft > 0) {
      setShowComponent(true); // Show component if trial is active and days left are positive
    } else {
      setShowComponent(false); // Hide component if trial is inactive or days are not positive
    }
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    prevConversations,
    onSent,
    setInput,
    input,
    loading,
    buttons,
    formData,
    botState, // Access botState
    // setBotState, // Access setBotState
  } = context;

  const hasSentFirstPrompt = useRef(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Store session ID
  // const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    console.log(location.pathname);
    // const isProMode = location.pathname === "/promode" || location.pathname === "/promode/";
    const isProMode = location.pathname.startsWith("/promode");


    // if (isProMode) {
    // const existingSessionId = localStorage.getItem("sessionId");

    // if (existingSessionId) {
    //   // Alert about deletion of the current session ID
    //   // alert(`Session ID ${existingSessionId} is being deleted.`);
    //   console.log(`Session ID ${existingSessionId} is being deleted.`)

    //   // Delete the existing session ID
    //   sessionStorage.removeItem("sessionId");
    //   localStorage.removeItem("sessionId");
    // }

    // Generate and save a new session ID
    // const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
    // sessionStorage.setItem("sessionId", newSessionId);
    // localStorage.setItem("sessionId", newSessionId);

    if (isProMode) {
      const existingSessionId = sessionStorage.getItem("sessionId");

      if (existingSessionId) {
        // Alert about deletion of the current session ID
        // alert(`Session ID ${existingSessionId} is being deleted.`);
        console.log(`Session ID ${existingSessionId} is being deleted.`)

        // Delete the existing session ID
        sessionStorage.removeItem("sessionId");
        localStorage.removeItem("sessionId");
        const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
        sessionStorage.setItem("sessionId", newSessionId);
        localStorage.setItem("sessionId", newSessionId);
        console.log("New Session ID created:", newSessionId);
        console.log("here");
      }

      if (!existingSessionId) {
        // Generate and save a new session ID only if it doesn't exist already
        const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
        sessionStorage.setItem("sessionId", newSessionId);
        localStorage.setItem("sessionId", newSessionId);
        console.log("New Session ID created:", newSessionId);
        console.log("here");
      }
    }
    // setSessionId(newSessionId);

    // Alert about creation of the new session ID
    // alert(`For user ID, a new Session ID ${newSessionId} is created. (This alert is for temporary basis. Will be removed later)`);
    // console.log("New Session ID created:" + "(This alert is for temporary basis. Will be removed later)", newSessionId);
    // console.log("here")

  }, [location.pathname]);

  useEffect(() => {
    if (!hasSentFirstPrompt.current) {
      const storedFormData = localStorage.getItem('formData');
      let generatedPrompt = '';

      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        if (Object.keys(parsedData).length > 0) {
          generatedPrompt = generateBasicInfoString(parsedData);
        }
      } else if (formData && Object.keys(formData).length > 0) {
        generatedPrompt = generateBasicInfoString(formData);
      }

      if (generatedPrompt) {
        onSent(generatedPrompt); // Directly send the prompt
        hasSentFirstPrompt.current = true; // Mark the first prompt as sent
      }
    }
  }, [formData, onSent]);

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
      setInput(''); // Clear the input field immediately after sending
    }
  };

  const handleButtonClick = (button: Button) => {
    // setInput(button.value); // Set the input field with button value
    // if (button.value.toLowerCase().includes('proceed')) {
    //   setBotState('customization'); // Change bot state
    // }
    console.log(button.value)
    onSent(button.value); // Trigger the bot response with the button value
  };

  const handleShowJewelry = () => {
    setIsPopupVisible(true); // Show the popup
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const isMainRoute = location.pathname === "/promode";

  return (
    <>
      {showComponent ? (
        <div>
          <div>
            {isMainRoute ? (
              <div className="flex-1 min-h-screen pb-[15vh] relative">
                <div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
                  style={{
                    backgroundImage:
                      "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
                  }}
                ></div>

                {/* Navigation Bar */}
                <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
                  <div className="name flex flex-col items-center gap-1">
                    <h2 className="text-xl">
                      <img
                        src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
                        alt="Kinmitra Logo"
                        className="h-5"
                      />
                    </h2>
                    <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
                      Pro Mode
                    </p>
                    <button
                      onClick={toggleSidebar}
                      className="text-[#585858] text-2xl cursor-pointer focus:outline-none"
                    >
                      ☰
                    </button>
                  </div>
                  <img
                    className="w-[50px] rounded-full"
                    src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
                    alt="User Icon"
                  />
                </div>

                <div className="main-container max-w-[900px] mx-auto scrollbar-hidden">
                  {/* Chat Container */}
                  <div className="chat-container scrollbar-hidden overflow-y-auto">
                    <div className="result px-5 max-h-[70vh] overflow-y-auto flex flex-col gap-5 custom-scrollbar">
                      <div className="conversation">
                        {prevConversations.map((conversation, index) => (
                          <div key={index} className="conversation-item mb-6">

                            {/* User Prompt */}
                            <div className="user-text flex justify-end items-center gap-3">
                              {conversation.prompt.includes('<img') ? (
                                <div
                                  className="max-w-[70%] text-right"
                                  dangerouslySetInnerHTML={{ __html: conversation.prompt }}
                                />
                              ) : (
                                <p className="bg-[#e6e7e8] text-black p-3 rounded-xl max-w-[70%] text-right whitespace-pre-wrap">
                                  {conversation.prompt}
                                </p>
                              )}
                              <img
                                className="w-10 h-10 rounded-full"
                                src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
                                alt="User Icon"
                              />
                            </div>

                            {/* AI Response */}
                            <div className="result-data flex items-start gap-4 mt-4">
                              <img
                                className="w-10 h-10 rounded-full"
                                src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg"
                                alt="AI Icon"
                              />
                              {conversation.loading ? (
                                <div className="loader w-3/4 flex flex-col gap-2">
                                  <div className="h-5 bg-gradient-to-r from-blue-300 to-white rounded-full animate-pulse" />
                                  <div className="h-5 bg-gradient-to-r from-blue-300 to-white rounded-full animate-pulse animation-delay-200" />
                                  <div className="h-5 bg-gradient-to-r from-blue-300 to-white rounded-full animate-pulse animation-delay-400" />
                                </div>
                              ) : conversation.response.includes('<img') ? (
                                <div
                                  className="max-w-[70%]"
                                  dangerouslySetInnerHTML={{ __html: conversation.response }}
                                />
                              ) : (
                                <p className="bg-[#f1f1f1] text-black p-3 rounded-xl max-w-[70%] whitespace-pre-wrap">
                                  {conversation.response}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>


                      {buttons.length > 0 && (
                        <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
                      )}
                    </div>
                  </div>

                  {/* Popup Button */}
                  {botState === 'finalizing' && ( // Show button only if botState is 'finalizing'
                    <button
                      onClick={handleShowJewelry}
                      className="bg-[#f59699] text-white border border-white rounded-[10px] py-1.5 px-4 text-md cursor-pointer transition-colors duration-300 ease-in-out shadow-md hover:bg-[#B2801D] active:transform active:translate-y-0.5 ml-11 mt-2"
                    >
                      Show Jewelry
                    </button>
                  )}

                  {/* Render PopUp if the state is true */}
                  {isPopupVisible && (
                    <PopUp
                      onClose={() => setIsPopupVisible(false)}
                      onProceed={(selectedImage: string) => {
                        onSent(
                          `<img src="${selectedImage}" alt="Selected Image" class="max-w-full rounded-md" />`
                        );
                        setIsPopupVisible(false); // Close the popup
                      }}
                    />
                  )}

                  {/* Sidebar */}
                  <Sidebar
                    isSidebarVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                  />

                  {/* Input Field */}
                  <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
                    <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
                      <input
                        className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSend(); // Send on Enter

                        }}
                        value={input}
                        type="text"
                        placeholder="Enter a prompt"
                        disabled={loading}
                      />
                      <div className="flex items-center gap-4">
                        <img
                          className="w-6 cursor-pointer"
                          src={assets.send_icon}
                          alt="Send Icon"
                          onClick={handleSend}
                          style={{
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.5 : 1,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      ) : (
        <GlassComponent />
      )}
    </>
  );
};

export default ProModeChatUI;