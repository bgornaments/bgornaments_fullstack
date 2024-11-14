// import React, { useContext } from 'react';
// import { Context } from '../../context/context';
// import './main.css';
// import { assets } from '../../assets/assets';  // Make sure you have declared *.png module
// import ButtonRow from './ButtonRow';

// const Main: React.FC = () => {
//   const {
//     prevConversations,
//     onSent,
//     setInput,
//     input,
//     showResult,
//     loading,
//     buttons,  
//     setBotState,  
//   } = useContext(Context);  // TypeScript should now understand that Context is defined

//   const handleSend = () => {
//     if (input.trim()) {
//       onSent(input);
//       setInput('');
//     }
//   };

//   const handleButtonClick = (button: { text: string, value: string }) => {
//     setInput(button.value);
//     if (button.value.toLowerCase().includes('proceed')) {
//       setBotState('customization');
//     }
//     onSent(button.value);
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
//                           <hr className='hr1' /><hr className='hr2'/><hr className='hr3'/>
//                         </div>
//                       ) : (
//                         <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {buttons.length > 0 && (
//                 <ButtonRow buttons={buttons} onButtonClick={handleButtonClick} />
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

// export default Main;

import React, { useContext } from 'react';
import { Context } from '../../context/context';
import '../../App.css';
import { assets } from '../../assets/assets';
import ButtonRow from './ButtonRow';

interface Button {
  text: string;
  value: string;
}

const ProModeChatUI: React.FC = () => {
  const context = useContext(Context);

  // If context is undefined, return an empty fragment or some fallback UI
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
    <div className="main">
      <div className="background-image"></div>

      {/* Navigation Bar */}
      <div className="nav">
        <div className="name">
          <h2>
            <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" />
          </h2>
          <p>Pro Mode</p>
        </div>
        <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
      </div>

      <div className="main-container">

        {/* Chat Container */}
        <div className="chat-container">
          {!showResult ? (
            <div className="greet">
              <p><span>Hello There!</span></p>
              <p>The app is currently in beta mode</p>
            </div>
          ) : (
            <div className="result">
              <div className="conversation">
                {prevConversations.map((conversation, index) => (
                  <div key={index} className="conversation-item">
                    <div className="user-text">
                      <p>{conversation.prompt}</p>
                      <img src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg" alt="User Icon" />
                    </div>
                    <div className="result-data">
                      <img src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg" alt="AI Icon" />
                      {conversation.loading ? (
                        <div className="loader">
                          <hr className="hr1" /><hr className="hr2" /><hr className="hr3" />
                        </div>
                      ) : (
                        <p dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {buttons.length > 0 && (
                <ButtonRow
                  buttons={buttons}
                  onButtonClick={handleButtonClick}
                />
              )}
            </div>
          )}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt"
              disabled={loading}
            />
            <div>
              <img
                src={assets.send_icon}
                alt="Send Icon"
                onClick={handleSend}
                style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
              />
            </div>
          </div>
          <p className="bottom-info">
            <b>KinMitra</b> has all the rights of images and designs. For more details contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProModeChatUI;
