// // import React, { useContext } from 'react';
// // import { Context } from '../../context/context';
// // import './main.css';
// // import { assets } from '../../assets/assets';  // Make sure you have declared *.png module
// // import ButtonRow from './ButtonRow';

// // const Main: React.FC = () => {
// //   const {
// //     prevConversations,
// //     onSent,
// //     setInput,
// //     input,
// //     showResult,
// //     loading,
// //     buttons,  
// //     setBotState,  
// //   } = useContext(Context);  // TypeScript should now understand that Context is defined

// //   const handleSend = () => {
// //     if (input.trim()) {
// //       onSent(input);
// //       setInput('');
// //     }
// //   };

// //   const handleButtonClick = (button: { text: string, value: string }) => {
// //     setInput(button.value);
// //     if (button.value.toLowerCase().includes('proceed')) {
// //       setBotState('customization');
// //     }
// //     onSent(button.value);
// //   };

// //   return (
// //     <div className="main">
// //       <div className="background-image"></div>

// //       {/* Navigation Bar */}
// //       <div className="nav">
// //         <div className="name">
// //           <h2>
// //             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" />
// //           </h2>
// //           <p>Pro Mode</p>
// //         </div>
// //         <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// //       </div>

// //       <div className="main-container">
// //         <div className="chat-container">
// //           {!showResult ? (
// //             <div className="greet">
// //               <p><span>Hello There!</span></p>
// //               <p>The app is currently in beta mode</p>
// //             </div>
// //           ) : (
// //             <div className="result">
// //               <div className="conversation">
// //                 {prevConversations.map((conversation, index) => (
// //                   <div key={index} className="conversation-item">
// //                     <div className="user-text">
// //                       <p>{conversation.prompt}</p>
// //                       <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
// //                     </div>
// //                     <div className="result-data">
// //                       <img src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
// //                       {conversation.loading ? (
// //                         <div className="loader">
// //                           <hr className='hr1' /><hr className='hr2'/><hr className='hr3'/>
// //                         </div>
// //                       ) : (
// //                         <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //               {buttons.length > 0 && (
// //                 <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <div className="main-bottom">
// //           <div className="search-box">
// //             <input
// //               onChange={(e) => setInput(e.target.value)}
// //               value={input}
// //               type="text"
// //               placeholder="Enter a prompt"
// //               disabled={loading}
// //             />
// //             <div>
// //               <img 
// //                 src={assets.send_icon} 
// //                 alt="Send Icon" 
// //                 onClick={handleSend}  
// //                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
// //               />
// //             </div>
// //           </div>
// //           <p className="bottom-info">
// //             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Main;

// import React, { useContext } from 'react';
// import { Context } from '../../context/context';
// import '../../App.css';
// import { assets } from '../../assets/assets';
// import ButtonRow from './ButtonRow';

// interface Button {
//   text: string;
//   value: string;
// }

// const ProModeChatUI: React.FC = () => {
//   const context = useContext(Context);

//   // If context is undefined, return an empty fragment or some fallback UI
//   if (!context) {
//     return <div>Loading...</div>;
//   }

//   const {
//     prevConversations,
//     onSent,
//     setInput,
//     input,
//     showResult,
//     loading,
//     // resultData,
//     buttons,
//     setBotState,
//   } = context;

//   const handleSend = () => {
//     if (input.trim()) {
//       onSent(input);
//       setInput('');  // Clear the input field immediately after sending
//     }
//   };

//   const handleButtonClick = (button: Button) => {
//     setInput(button.value);  // Set the input field with button value
//     if (button.value.toLowerCase().includes("proceed")) {
//       setBotState('customization');  // Change bot state
//     }
//     onSent(button.value);  // Trigger the bot response with the button value
//   };

//   return (
//     <div className="main">
//       <div className="background-image"></div>

//       {/* Navigation Bar */}
//       <div className="nav">
//         <div className="name">
//           <h2>
//             <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" />
//           </h2>
//           <p>Pro Mode</p>
//         </div>
//         <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
//       </div>

//       <div className="main-container">

//         {/* Chat Container */}
//         <div className="chat-container">
//           {!showResult ? (
//             <div className="greet">
//               <p><span>Hello There!</span></p>
//               <p>The app is currently in beta mode</p>
//             </div>
//           ) : (
//             <div className="result">
//               <div className="conversation">
//                 {prevConversations.map((conversation, index) => (
//                   <div key={index} className="conversation-item">
//                     <div className="user-text">
//                       <p>{conversation.prompt}</p>
//                       <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
//                     </div>
//                     <div className="result-data">
//                       <img src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
//                       {conversation.loading ? (
//                         <div className="loader">
//                           <hr className="hr1" /><hr className="hr2" /><hr className="hr3" />
//                         </div>
//                       ) : (
//                         <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {buttons.length > 0 && (
//                 <ButtonRow
//                   buttons={buttons}
//                   onButtonClick={handleButtonClick}
//                 />
//               )}
//             </div>
//           )}
//         </div>

//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               onChange={(e) => setInput(e.target.value)}
//               value={input}
//               type="text"
//               placeholder="Enter a prompt"
//               disabled={loading}
//             />
//             <div>
//               <img
//                 src={assets.send_icon}
//                 alt="Send Icon"
//                 onClick={handleSend}
//                 style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
//               />
//             </div>
//           </div>
//           <p className="bottom-info">
//             <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProModeChatUI;


import React, { useContext } from 'react';
import { Context } from '../../context/context';
import { assets } from '../../assets/assets';
import ButtonRow from './ButtonRow';

interface Button {
  text: string;
  value: string;
}

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
    showResult,
    loading,
    // resultData,
    buttons,
    setBotState,
  } = context;

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
      setInput('');  // Clear the input field immediately after sending
    }
  };

  const handleButtonClick = (button: Button) => {
    setInput(button.value);  // Set the input field with button value
    if (button.value.toLowerCase().includes("proceed")) {
      setBotState('customization');  // Change bot state
    }
    onSent(button.value);  // Trigger the bot response with the button value
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')" }}></div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <div className="name flex-col items-center gap-3">
          <h2 className="text-xl">
            <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className=" h-5" />
          </h2>
          <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">Pro Mode</p>
        </div>
        <img className="w-[50px] rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
      </div>

      <div className="main-container max-w-[900px] mx-auto">
        {/* Chat Container */}
        <div className="chat-container">
          {!showResult ? (
            <div className="my-12 text-5xl text-[#c4c7c5] font-medium p-5 flex flex-col justify-center items-center">
              <p>
              <p className="inline-block bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
  Hello There!
</p>
              </p>
              <p>The app is currently in beta mode</p>
            </div>
          ) : (
            <div className="result px-5 max-h-[70vh] overflow-y-scroll flex flex-col gap-5">
              <div className="conversation">
                {prevConversations.map((conversation, index) => (
                  <div key={index} className="conversation-item mb-5">
                    <div className="user-text flex justify-end items-center gap-2.5">
                      <p className="bg-[#e6e7e8] text-black p-2.5 rounded-xl max-w-[70%]">
                        {conversation.prompt}
                      </p>
                      <img className="w-10 rounded-full" src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
                    </div>
                    <div className="result-data flex items-start gap-4 mt-4">
                      <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
                      {conversation.loading ? (
                        <div className="loader w-full flex flex-col gap-2.5">
                        <hr className="hr1" />
                        <hr className="hr2" />
                        <hr className="hr3" />
                      </div>
                      ) : (
                        <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {buttons.length > 0 && (
                <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
          <div className="flex items-center justify-between gap-5 bg-[rgba(178,128,29,0.4)] p-2.5 rounded-full">
            <input
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
              onChange={(e) => setInput(e.target.value)}
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