/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
// // /* eslint-disable react-hooks/rules-of-hooks */
// // // // // import React, { useContext, useEffect } from 'react';
// // // // // import { Context } from '../../context/context';
// // // // // import { assets } from '../../assets/assets';
// // // // // import ButtonRow from './ButtonRow';

// // // // // interface Button {
// // // // //   text: string;
// // // // //   value: string;
// // // // // }

// // // // // const generateBasicInfoString = (formData: Record<string, any>): string => {
// // // // //   return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}`;
// // // // // };

// // // // // // const generateBasicInfoString = (): string => {
// // // // // //   return `I want a necklace for a wedding for a female aged 20-25`;
// // // // // // };

// // // // // const ProModeChatUI: React.FC = () => {
// // // // //   const context = useContext(Context);

// // // // //   if (!context) {
// // // // //     return <div>Loading...</div>;
// // // // //   }

// // // // //   const {
// // // // //     prevConversations,
// // // // //     onSent,
// // // // //     setInput,
// // // // //     input,
// // // // //     loading,
// // // // //     buttons,
// // // // //     setBotState,
// // // // //     formData,
// // // // //   } = context;

// // // // //   useEffect(() => {
// // // // //     if (Object.keys(formData).length > 0) {
// // // // //       const generatedPrompt = generateBasicInfoString(formData);
// // // // //       setInput(generatedPrompt); // Automatically set the input field
// // // // //     }
// // // // //   }, [formData, setInput]);

// // // // //   // useEffect(() => {
// // // // //   //   const generatedPrompt = generateBasicInfoString();
// // // // //   //   setInput(generatedPrompt); // Set the input state with the generated string
// // // // //   // }, [setInput]);

// // // // //   const handleSend = () => {
// // // // //     if (input.trim()) {
// // // // //       onSent(input);
// // // // //       setInput(''); // Clear the input field immediately after sending
// // // // //     }
// // // // //   };

// // // // //   const handleButtonClick = (button: Button) => {
// // // // //     setInput(button.value); // Set the input field with button value
// // // // //     if (button.value.toLowerCase().includes('proceed')) {
// // // // //       setBotState('customization'); // Change bot state
// // // // //     }
// // // // //     onSent(button.value); // Trigger the bot response with the button value
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex-1 min-h-screen pb-[15vh] relative">
// // // // //       <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]" 
// // // // //            style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}>
// // // // //       </div>

// // // // //       {/* Navigation Bar */}
// // // // //       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
// // // // //         <div className="name flex-col items-center gap-3">
// // // // //           <h2 className="text-xl">
// // // // //             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
// // // // //           </h2>
// // // // //           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
// // // // //             Pro Mode
// // // // //           </p>
// // // // //         </div>
// // // // //         <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // // // //       </div>

// // // // //       <div className="main-container max-w-[900px] mx-auto">
// // // // //         {/* Chat Container */}
// // // // //         <div className="chat-container scrollbar-hidden overflow-y-auto">
// // // // //         <div className="result px-5 max-h-[70vh] overflow-y-auto scrollbar-hidden flex flex-col gap-5">
// // // // //               <div className="conversation">
// // // // //                 {prevConversations.map((conversation, index) => (
// // // // //                   <div key={index} className="conversation-item mb-5 scrollbar-hidden">
// // // // //                     <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
// // // // //                       <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
// // // // //                         {conversation.prompt}
// // // // //                       </p>
// // // // //                       <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // // // //                     </div>
// // // // //                     <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
// // // // //                       <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
// // // // //                       {conversation.loading ? (
// // // // //                         <div className="loader w-full flex flex-col gap-2.5">
// // // // //                           <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000s;" />
// // // // //                           <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
// // // // //                           <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
// // // // //                         </div>
// // // // //                       ) : (
// // // // //                         <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //               {buttons.length > 0 && (
// // // // //                 <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
// // // // //               )}
// // // // //             </div>
// // // // //         </div>

// // // // //         <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
// // // // //           <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
// // // // //             <input
// // // // //               className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
// // // // //               onChange={(e) => setInput(e.target.value)}
// // // // //               value={input}
// // // // //               type="text"
// // // // //               placeholder="Enter a prompt"
// // // // //               disabled={loading}
// // // // //             />
// // // // //             <div className="flex items-center gap-4">
// // // // //               <img
// // // // //                 className="w-6 cursor-pointer"
// // // // //                 src={assets.send_icon}
// // // // //                 alt="Send Icon"
// // // // //                 onClick={handleSend}
// // // // //                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
// // // // //               />
// // // // //             </div>
// // // // //           </div>
// // // // //           <p className="text-xs my-3 text-center font-light">
// // // // //             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );  
// // // // // };

// // // // // export default ProModeChatUI;

// // // // import React, { useContext, useEffect } from 'react';
// // // // import { Context } from '../../context/context';
// // // // import { assets } from '../../assets/assets';
// // // // import ButtonRow from './ButtonRow';

// // // // interface Button {
// // // //   text: string;
// // // //   value: string;
// // // // }

// // // // const generateBasicInfoString = (formData: Record<string, any>): string => {
// // // //   return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}.`;
// // // // };

// // // // const ProModeChatUI: React.FC = () => {
// // // //   const context = useContext(Context);

// // // //   if (!context) {
// // // //     return <div>Loading...</div>;
// // // //   }

// // // //   const {
// // // //     prevConversations,
// // // //     onSent,
// // // //     setInput,
// // // //     input,
// // // //     loading,
// // // //     buttons,
// // // //     setBotState,
// // // //     formData,
// // // //   } = context;

// // // //   // Retrieve formData from localStorage if not available in context
// // // //   useEffect(() => {
// // // //     const storedFormData = localStorage.getItem('formData');
// // // //     if (storedFormData) {
// // // //       const parsedData = JSON.parse(storedFormData);
// // // //       if (Object.keys(parsedData).length > 0) {
// // // //         const generatedPrompt = generateBasicInfoString(parsedData);
// // // //         setInput(generatedPrompt);  // Automatically set the input field
// // // //         console.log("Generated Prompt:", generatedPrompt); // Log the generated prompt
// // // //       }
// // // //     } else if (formData && Object.keys(formData).length > 0) {
// // // //       const generatedPrompt = generateBasicInfoString(formData);
// // // //       setInput(generatedPrompt);  // Automatically set the input field
// // // //       console.log("Generated Prompt:", generatedPrompt); // Log the generated prompt
// // // //     }
// // // //   }, [formData, setInput]); // Watch for formData changes

// // // //   const handleSend = () => {
// // // //     if (input.trim()) {
// // // //       onSent(input);
// // // //       setInput(''); // Clear the input field immediately after sending
// // // //     }
// // // //   };

// // // //   const handleButtonClick = (button: Button) => {
// // // //     setInput(button.value); // Set the input field with button value
// // // //     if (button.value.toLowerCase().includes('proceed')) {
// // // //       setBotState('customization'); // Change bot state
// // // //     }
// // // //     onSent(button.value); // Trigger the bot response with the button value
// // // //   };

// // // //   return (
// // // //     <div className="flex-1 min-h-screen pb-[15vh] relative">
// // // //       <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
// // // //         style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}>
// // // //       </div>

// // // //       {/* Navigation Bar */}
// // // //       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
// // // //         <div className="name flex-col items-center gap-3">
// // // //           <h2 className="text-xl">
// // // //             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
// // // //           </h2>
// // // //           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
// // // //             Pro Mode
// // // //           </p>
// // // //         </div>
// // // //         <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // // //       </div>

// // // //       <div className="main-container max-w-[900px] mx-auto">
// // // //         {/* Chat Container */}
// // // //         <div className="chat-container scrollbar-hidden overflow-y-auto">
// // // //           <div className="result px-5 max-h-[70vh] overflow-y-auto scrollbar-hidden flex flex-col gap-5">
// // // //             <div className="conversation">
// // // //               {prevConversations.map((conversation, index) => (
// // // //                 <div key={index} className="conversation-item mb-5 scrollbar-hidden">
// // // //                   <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
// // // //                     <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
// // // //                       {conversation.prompt}
// // // //                     </p>
// // // //                     <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // // //                   </div>
// // // //                   <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
// // // //                     <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
// // // //                     {conversation.loading ? (
// // // //                       <div className="loader w-full flex flex-col gap-2.5">
// // // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000s;" />
// // // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
// // // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
// // // //                       </div>
// // // //                     ) : (
// // // //                       <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             {buttons.length > 0 && (
// // // //               <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
// // // //           <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
// // // //             <input
// // // //               className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
// // // //               onChange={(e) => setInput(e.target.value)}
// // // //               onKeyDown={(e) => {
// // // //                 if (e.key === 'Enter') {
// // // //                   handleSend(); 
// // // //                 }
// // // //               }}
// // // //               value={input}
// // // //               type="text"
// // // //               placeholder="Enter a prompt"
// // // //               disabled={loading}
// // // //             />
// // // //             <div className="flex items-center gap-4">
// // // //               <img
// // // //                 className="w-6 cursor-pointer"
// // // //                 src={assets.send_icon}
// // // //                 alt="Send Icon"
// // // //                 onClick={handleSend}
// // // //                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //           <p className="text-xs my-3 text-center font-light">
// // // //             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProModeChatUI;

// // // import React, { useContext, useEffect, useRef } from 'react';
// // // import { Context } from '../../context/context';
// // // import { assets } from '../../assets/assets';
// // // import ButtonRow from './ButtonRow';

// // // interface Button {
// // //   text: string;
// // //   value: string;
// // // }

// // // const generateBasicInfoString = (formData: Record<string, any>): string => {
// // //   return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}.`;
// // // };

// // // const ProModeChatUI: React.FC = () => {
// // //   const context = useContext(Context);

// // //   if (!context) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   const {
// // //     prevConversations,
// // //     onSent,
// // //     setInput,
// // //     input,
// // //     loading,
// // //     buttons,
// // //     setBotState,
// // //     formData,
// // //   } = context;

// // //   const hasSentFirstPrompt = useRef(false);

// // //   // Send generated statement directly as the first prompt
// // //   useEffect(() => {
// // //     if (!hasSentFirstPrompt.current) {
// // //       const storedFormData = localStorage.getItem('formData');
// // //       let generatedPrompt = '';

// // //       if (storedFormData) {
// // //         const parsedData = JSON.parse(storedFormData);
// // //         if (Object.keys(parsedData).length > 0) {
// // //           generatedPrompt = generateBasicInfoString(parsedData);
// // //         }
// // //       } else if (formData && Object.keys(formData).length > 0) {
// // //         generatedPrompt = generateBasicInfoString(formData);
// // //       }

// // //       if (generatedPrompt) {
// // //         onSent(generatedPrompt); // Directly send the prompt
// // //         hasSentFirstPrompt.current = true; // Mark the first prompt as sent
// // //       }
// // //     }
// // //   }, [formData, onSent]);

// // //   const handleSend = () => {
// // //     if (input.trim()) {
// // //       onSent(input);
// // //       setInput(''); // Clear the input field immediately after sending
// // //     }
// // //   };

// // //   const handleButtonClick = (button: Button) => {
// // //     setInput(button.value); // Set the input field with button value
// // //     if (button.value.toLowerCase().includes('proceed')) {
// // //       setBotState('customization'); // Change bot state
// // //     }
// // //     onSent(button.value); // Trigger the bot response with the button value
// // //   };

// // //   return (
// // //     <div className="flex-1 min-h-screen pb-[15vh] relative">
// // //       <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
// // //            style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}>
// // //       </div>

// // //       {/* Header */}
// // //       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
// // //         <div className="name flex-col items-center gap-3">
// // //           <h2 className="text-xl">
// // //             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
// // //           </h2>
// // //           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
// // //             Pro Mode
// // //           </p>
// // //         </div>
// // //         <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // //       </div>

// // //       {/* Chat Container */}

// // //       <div className="main-container max-w-[900px] mx-auto">
// // //         <div className="chat-container scrollbar-hidden overflow-y-auto">
// // //           <div className="result px-5 max-h-[70vh] overflow-y-auto scrollbar-hidden flex flex-col gap-5">
// // //             <div className="conversation">
// // //               {prevConversations.map((conversation, index) => (
// // //                 <div key={index} className="conversation-item mb-5 scrollbar-hidden">
// // //                   <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
// // //                     <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
// // //                       {conversation.prompt}
// // //                     </p>
// // //                     <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// // //                   </div>
// // //                   <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
// // //                     <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
// // //                     {conversation.loading ? (
// // //                       <div className="loader w-full flex flex-col gap-2.5">
// // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000s;" />
// // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
// // //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
// // //                       </div>
// // //                     ) : (
// // //                       <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             {buttons.length > 0 && (
// // //               <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Text Input Bar with send button */}

// // //         <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
// // //           <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
// // //             <input
// // //               className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === 'Enter') handleSend(); // Send on Enter
// // //               }}
// // //               value={input}
// // //               type="text"
// // //               placeholder="Enter a prompt"
// // //               disabled={loading}
// // //             />
// // //             <div className="flex items-center gap-4">
// // //               <img
// // //                 className="w-6 cursor-pointer"
// // //                 src={assets.send_icon}
// // //                 alt="Send Icon"
// // //                 onClick={handleSend}
// // //                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
// // //               />
// // //             </div>
// // //           </div>
// // //           <p className="text-xs my-3 text-center font-light">
// // //             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProModeChatUI;

// // import React, { useState, useContext, useEffect, useRef } from 'react';
// // import { Context } from '../../context/context';
// // import { assets } from '../../assets/assets';
// // import ButtonRow from './ButtonRow';
// // import Popup from './PopUp';

// // interface Button {
// //   text: string;
// //   value: string;
// // }

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //       <div className="bg-white rounded-lg p-5 max-w-[80%] max-h-[80%] overflow-auto">
// //         <button className="absolute top-2 right-2 text-black" onClick={onClose}>
// //           ✖
// //         </button>
// //         {mode === 'recommendation' || mode === 'initialization' ? (
// //           <p className="text-lg font-semibold text-center">
// //             Proceed in the chat further to generate images.
// //           </p>
// //         ) : (
// //           <div className="grid grid-cols-4 gap-4">
// //             {imageUrls.map((url, index) => (
// //               <img key={index} src={url} alt={`Jewellery ${index + 1}`} className="w-full h-auto" />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const generateBasicInfoString = (formData: Record<string, any>): string => {
// //   return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}.`;
// // };

// // const ProModeChatUI: React.FC = () => {
// //   const [isPopupOpen, setPopupOpen] = useState(false);
// //   const [botState, setBotState] = useState('recommendation'); // Replace with dynamic state management

// //   const context = useContext(Context);

// //   if (!context) {
// //     return <div>Loading...</div>;
// //   }

// //   const {
// //     prevConversations,
// //     onSent,
// //     setInput,
// //     input,
// //     loading,
// //     buttons,
// //     formData,
// //   } = context;

// //   const hasSentFirstPrompt = useRef(false);

// //   useEffect(() => {
// //     if (!hasSentFirstPrompt.current) {
// //       const storedFormData = localStorage.getItem('formData');
// //       let generatedPrompt = '';

// //       if (storedFormData) {
// //         const parsedData = JSON.parse(storedFormData);
// //         if (Object.keys(parsedData).length > 0) {
// //           generatedPrompt = generateBasicInfoString(parsedData);
// //         }
// //       } else if (formData && Object.keys(formData).length > 0) {
// //         generatedPrompt = generateBasicInfoString(formData);
// //       }

// //       if (generatedPrompt) {
// //         onSent(generatedPrompt);
// //         hasSentFirstPrompt.current = true;
// //       }
// //     }
// //   }, [formData, onSent]);

// //   const handleSend = () => {
// //     if (input.trim()) {
// //       onSent(input);
// //       setInput('');
// //     }
// //   };

// //   const handleButtonClick = (button: Button) => {
// //     setInput(button.value);
// //     onSent(button.value);
// //   };

// //   const togglePopup = () => setPopupOpen(!isPopupOpen);

// //   return (
// //     <div className="flex-1 min-h-screen pb-[15vh] relative">
// //       <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
// //         style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}>
// //       </div>

// //       {/* Header */}
// //       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
// //         <div className="name flex-col items-center gap-3">
// //           <h2 className="text-xl">
// //             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
// //           </h2>
// //           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
// //             Pro Mode
// //           </p>
// //         </div>
// //         <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// //       </div>

// //       {/* Chat Container */}

// //       <div className="main-container max-w-[900px] mx-auto">
// //         <div className="chat-container scrollbar-hidden overflow-y-auto">
// //           <div className="result px-5 max-h-[70vh] overflow-y-auto scrollbar-hidden flex flex-col gap-5">
// //             <div className="conversation">
// //               {prevConversations.map((conversation, index) => (
// //                 <div key={index} className="conversation-item mb-5 scrollbar-hidden">
// //                   <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
// //                     <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
// //                       {conversation.prompt}
// //                     </p>
// //                     <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// //                   </div>
// //                   <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
// //                     <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
// //                     {conversation.loading ? (
// //                       <div className="loader w-full flex flex-col gap-2.5">
// //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000s;" />
// //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
// //                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
// //                       </div>
// //                     ) : (
// //                       <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Added the "Show me Jewellery" Button here */}
// //             <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />

// //             <button
// //               onClick={togglePopup}
// //               className="bg-[#f59699] text-white border border-white rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors duration-300 ease-in-out shadow-md hover:bg-[#B2801D] active:transform active:translate-y-0.5"
// //               style={{
// //                 display: 'inline-block',
// //                 alignSelf: 'left',
// //                 maxWidth: '200px',
// //                 textAlign: 'center',
// //                 marginLeft:'22px',
// //                 zIndex: 1000, // Ensure the button is on top
// //               }}
// //             >
// //               Show me Jewellery
// //             </button>

// //           </div>
// //         </div>

// //         {/* Text Input Bar with send button */}

// //         <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
// //           <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
// //             <input
// //               className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => {
// //                 if (e.key === 'Enter') handleSend(); // Send on Enter
// //               }}
// //               value={input}
// //               type="text"
// //               placeholder="Enter a prompt"
// //               disabled={loading}
// //             />
// //             <div className="flex items-center gap-4">
// //               <img
// //                 className="w-6 cursor-pointer"
// //                 src={assets.send_icon}
// //                 alt="Send Icon"
// //                 onClick={handleSend}
// //                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
// //               />
// //             </div>
// //           </div>
// //           <p className="text-xs my-3 text-center font-light">
// //             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProModeChatUI;

// import React, { useState, useContext, useEffect, useRef } from 'react';
// import { Context } from '../../context/context';
// import { assets } from '../../assets/assets';
// import ButtonRow from './ButtonRow';
// import PopUp from './PopUp';  // Corrected import for PopUp component

// const ProModeChatUI: React.FC = () => {
//   const [isPopupOpen, setPopupOpen] = useState(false);  // Track popup state
//   const [botState, setBotState] = useState('recommendation');

//   const context = useContext(Context);

//   if (!context) {
//     return <div>Loading...</div>;
//   }

//   const {
//     prevConversations,
//     onSent,
//     setInput,
//     input,
//     loading,
//     buttons,
//     formData,
//   } = context;

//   const hasSentFirstPrompt = useRef(false);

//   useEffect(() => {
//     if (!hasSentFirstPrompt.current) {
//       const storedFormData = localStorage.getItem('formData');
//       let generatedPrompt = '';

//       if (storedFormData) {
//         const parsedData = JSON.parse(storedFormData);
//         if (Object.keys(parsedData).length > 0) {
//           generatedPrompt = generateBasicInfoString(parsedData);
//         }
//       } else if (formData && Object.keys(formData).length > 0) {
//         generatedPrompt = generateBasicInfoString(formData);
//       }

//       if (generatedPrompt) {
//         onSent(generatedPrompt);
//         hasSentFirstPrompt.current = true;
//       }
//     }
//   }, [formData, onSent]);

//   const handleSend = () => {
//     if (input.trim()) {
//       onSent(input);
//       setInput('');
//     }
//   };

//   const handleButtonClick = (button: Button) => {
//     setInput(button.value);
//     onSent(button.value);
//   };

//   const togglePopup = () => setPopupOpen(!isPopupOpen);  // Toggle popup visibility

//   return (
//     <div className="flex-1 min-h-screen pb-[15vh] relative">
//       <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
//            style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}></div>

//       {/* Header */}
//       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
//         <div className="name flex-col items-center gap-3">
//           <h2 className="text-xl">
//             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
//           </h2>
//           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
//             Pro Mode
//           </p>
//         </div>
//         <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
//       </div>

//       {/* Chat Container */}
//       <div className="main-container max-w-[900px] mx-auto">
//         <div className="chat-container scrollbar-hidden overflow-y-auto">
//           <div className="result px-5 max-h-[70vh] overflow-y-auto scrollbar-hidden flex flex-col gap-5">
//             <div className="conversation">
//               {prevConversations.map((conversation, index) => (
//                 <div key={index} className="conversation-item mb-5 scrollbar-hidden">
//                   <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
//                     <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
//                       {conversation.prompt}
//                     </p>
//                     <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
//                   </div>
//                   <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
//                     <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
//                     {conversation.loading ? (
//                       <div className="loader w-full flex flex-col gap-2.5">
//                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000s;" />
//                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
//                         <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
//                       </div>
//                     ) : (
//                       <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Show me Jewellery Button */}
//             <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
//             <button
//               onClick={togglePopup}
//               className="bg-[#f59699] text-white border border-white rounded-lg py-2 px-4 text-sm cursor-pointer transition-colors duration-300 ease-in-out shadow-md hover:bg-[#B2801D] active:transform active:translate-y-0.5"
//               style={{ display: 'inline-block', alignSelf: 'center', maxWidth: '200px', textAlign: 'center' }}
//             >
//               Show me Jewellery
//             </button>
//           </div>
//         </div>

//         {/* Text Input Bar with send button */}
//         <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
//           <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
//             <input
//               className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSend();
//               }}
//               value={input}
//               type="text"
//               placeholder="Enter a prompt"
//               disabled={loading}
//             />
//             <div className="flex items-center gap-4">
//               <img
//                 className="w-6 cursor-pointer"
//                 src={assets.send_icon}
//                 alt="Send Icon"
//                 onClick={handleSend}
//                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
//               />
//             </div>
//           </div>
//           <p className="text-xs my-3 text-center font-light">
//             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
//           </p>
//         </div>
//       </div>

//       {/* PopUp Component */}
//       <PopUp isOpen={isPopupOpen} onClose={togglePopup} mode="jewellery" />
//     </div>
//   );
// };

// export default ProModeChatUI;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/context';
import { assets } from '../../assets/assets';
import ButtonRow from './ButtonRow';
import PopUp from './PopUp';
import './chat.css';

interface Button {
  text: string;
  value: string;
}

const generateBasicInfoString = (formData: Record<string, any>): string => {
  return `I want a ${formData.jewelryType} for ${formData.occasion} for a ${formData.gender} aged ${formData.ageGroup}.`;
};

const ProModeChatUI: React.FC = () => {
  const context = useContext(Context);

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
    setBotState,
    formData,
  } = context;

  const hasSentFirstPrompt = useRef(false);

  // State to manage the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Send generated statement directly as the first prompt
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
    setInput(button.value); // Set the input field with button value
    if (button.value.toLowerCase().includes('proceed')) {
      setBotState('customization'); // Change bot state
    }
    onSent(button.value); // Trigger the bot response with the button value
  };

  // Handler for "Show Jewelry" button
  const handleShowJewelry = () => {
    setIsPopupVisible(true);  // Show the popup
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
        style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}></div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <div className="name flex-col items-center gap-3">
          <h2 className="text-xl">
            <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-5" />
          </h2>
          <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
            Pro Mode
          </p>
        </div>
        <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
      </div>

      <div className="main-container max-w-[900px] mx-auto scrollbar-hidden">
        {/* Chat Container */}
        <div className="chat-container scrollbar-hidden overflow-y-auto ">
          <div className="result px-5 max-h-[70vh] overflow-y-auto flex flex-col gap-5 custom-scrollbar">
            <div className="conversation">
              {prevConversations.map((conversation, index) => (
                <div key={index} className="conversation-item mb-5 scrollbar-hidden">
                  <div className="user-text flex justify-end items-center gap-2.5 scrollbar-hidden">
                    {conversation.prompt.includes('<img') ? (
                      <div
                        className="max-w-[70%]"
                        dangerouslySetInnerHTML={{ __html: conversation.prompt }}
                      />
                    ) : (
                      <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
                        {conversation.prompt}
                      </p>
                    )}
                    <img
                      className="w-10 rounded-full"
                      src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="result-data flex items-start gap-4 mt-4 scrollbar-hidden">
                    <img
                      className="w-10 rounded-full"
                      src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg"
                      alt="AI Icon"
                    />
                    {conversation.loading ? (
                      <div className="loader w-3/4 h-20 flex flex-col gap-2.5">
                        <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 1000ms;" />
                        <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 500ms;" />
                        <hr className="rounded border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader animation-delay: 0ms;" />
                      </div>
                    ) : conversation.response.includes('<img') ? (
                      <div
                        className="max-w-[70%]"
                        dangerouslySetInnerHTML={{ __html: conversation.response }}
                      />
                    ) : (
                      <p className="bg-transparent text-black p-2.5 rounded-xl max-w-[70%] scrollbar-hidden">
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
        <button
          onClick={handleShowJewelry}
          className="bg-[#f59699] 
          text-white 
          border 
          border-white 
          rounded-[10px] 
          py-1.5 
          px-4 
          text-md 
          cursor-pointer 
          transition-colors 
          duration-300 
          ease-in-out 
          shadow-md 
          hover:bg-[#B2801D] 
          active:transform 
          active:translate-y-0.5 
          ml-11
          mt-2"
        >
          Show Jewelry
        </button>


        {/* Render PopUp if the state is true */}
        {isPopupVisible && (
          <PopUp
            onClose={() => setIsPopupVisible(false)}
            onProceed={(selectedImage: string) => {
              onSent(`<img src="${selectedImage}" alt="Selected Image" class="max-w-full rounded-md" />`);
              setIsPopupVisible(false); // Close the popup
            }}
          />
        )}



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
                style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
              />
            </div>
          </div>
          <p className="text-xs my-3 text-center font-light">
            <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProModeChatUI;
