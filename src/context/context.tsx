/* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createContext, useEffect, useState, ReactNode } from 'react';
// // import fetchAIResponse from '../config/awsAPI'; // Import the AWS API interaction logic

// // interface ContextProps {
// //   prevConversations: any[];
// //   setPrevConversations: React.Dispatch<React.SetStateAction<any[]>>;
// //   onSent: (prompt: string) => void;
// //   recentPrompt: string;
// //   showResult: boolean;
// //   loading: boolean;
// //   resultData: string;
// //   input: string;
// //   setInput: React.Dispatch<React.SetStateAction<string>>;
// //   messages: any[];
// //   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
// //   userInput: string;
// //   setUserInput: React.Dispatch<React.SetStateAction<string>>;
// //   buttons: { text: string, value: string }[];
// //   setButtons: React.Dispatch<React.SetStateAction<{ text: string, value: string }[]>>;
// //   botState: string;
// //   setBotState: React.Dispatch<React.SetStateAction<string>>;
// //   sendMessage: () => void;
// // }

// // export const Context = createContext<ContextProps | undefined>(undefined);

// // const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //   const [input, setInput] = useState<string>('');
// //   // const [recentPrompt, setRecentPrompt] = useState<string>('');
// //   const [recentPrompt] = useState<string>('');
// //   const [prevConversations, setPrevConversations] = useState<any[]>(() => {
// //     sessionStorage.removeItem('prevConversations');
// //     return [];
// //   });
// //   const [showResult, setShowResult] = useState<boolean>(false);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   // const [resultData, setResultData] = useState<string>('');
// //   const [resultData] = useState<string>('');
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [userInput, setUserInput] = useState<string>('');
// //   const [buttons, setButtons] = useState<{ text: string, value: string }[]>([]);
// //   const [botState, setBotState] = useState<string>('recommendation');
// //   // const [partialResponse, setPartialResponse] = useState<string>('');

// //   useEffect(() => {
// //     sessionStorage.setItem('prevConversations', JSON.stringify(prevConversations));
// //   }, [prevConversations]);

// //   const onSent = async (prompt: string) => {
// //     setLoading(true);
// //     setShowResult(true);

// //     setPrevConversations((prevConversations) => [
// //       ...prevConversations,
// //       { prompt, response: '', loading: true },
// //     ]);

// //     const payload = { user_prompt: prompt, state: botState, conversation_history: prevConversations };
// //     const response = await fetchAIResponse(payload);

// //     const newResponse = response.chatbot_response.split('*').join('<br>');

// //     setPrevConversations((prevConversations) => {
// //       const updatedConversations = [...prevConversations];
// //       updatedConversations[updatedConversations.length - 1] = {
// //         ...updatedConversations[updatedConversations.length - 1],
// //         response: newResponse,
// //         loading: false,
// //       };
// //       return updatedConversations;
// //     });

// //     try {
// //       const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
// //       const buttonValues = JSON.parse(cleanedString);

// //       if (Array.isArray(buttonValues)) {
// //         setButtons(buttonValues.map((value: string) => ({
// //           text: value,
// //           value: value,
// //         })));
// //       } else {
// //         setButtons([]);
// //       }
// //     } catch (error) {
// //       console.error('Error parsing button values:', error);
// //       setButtons([]);
// //     }

// //     setLoading(false);
// //     setInput('');
// //   };

// //   const sendMessage = async () => {
// //     if (!userInput.trim()) return;

// //     const payload = {
// //       user_prompt: userInput,
// //       state: botState,
// //       conversation_history: messages,
// //     };

// //     const response = await fetchAIResponse(payload);

// //     setMessages((prevMessages) => [
// //       ...prevMessages,
// //       { text: userInput, isBot: false },
// //       { text: response.chatbot_response, isBot: true },
// //     ]);
// //     setUserInput('');

// //     try {
// //       const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
// //       const buttonValues = JSON.parse(cleanedString);

// //       if (Array.isArray(buttonValues)) {
// //         setButtons(buttonValues.map((value: string) => ({
// //           text: value,
// //           value: value,
// //         })));
// //       } else {
// //         setButtons([]);
// //       }
// //     } catch (error) {
// //       console.error('Error parsing button values:', error);
// //       setButtons([]);
// //     }
// //   };

// //   const contextValue = {
// //     prevConversations,
// //     setPrevConversations,
// //     onSent,
// //     recentPrompt,
// //     showResult,
// //     loading,
// //     resultData,
// //     input,
// //     setInput,
// //     messages,
// //     setMessages,
// //     userInput,
// //     setUserInput,
// //     buttons,
// //     setButtons,
// //     botState,
// //     setBotState,
// //     sendMessage,
// //   };

// //   return (
// //     <Context.Provider value={contextValue}>
// //       {children}
// //     </Context.Provider>
// //   );
// // };

// // export default ContextProvider;

// import { createContext, useEffect, useState, ReactNode } from 'react';
// import { fetchAIResponse, fetchAIResponse2, invokeImageGenerator } from '../config/awsAPI'; // Import AWS API interaction logic

// interface ContextProps {
//   prevConversations: any[];
//   setPrevConversations: React.Dispatch<React.SetStateAction<any[]>>;
//   onSent: (prompt: string) => void;
//   recentPrompt: string;
//   showResult: boolean;
//   loading: boolean;
//   resultData: string;
//   input: string;
//   setInput: React.Dispatch<React.SetStateAction<string>>;
//   messages: any[];
//   setMessages: React.Dispatch<React.SetStateAction<any[]>>;
//   userInput: string;
//   setUserInput: React.Dispatch<React.SetStateAction<string>>;
//   buttons: { text: string; value: string }[];
//   setButtons: React.Dispatch<React.SetStateAction<{ text: string; value: string }[]>>;
//   botState: string;
//   setBotState: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: () => void;
//   formData: Record<string, any>;
//   setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
// }

// export const Context = createContext<ContextProps | undefined>(undefined);

// const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [input, setInput] = useState<string>('');
//   const [recentPrompt] = useState<string>('');
//   const [prevConversations, setPrevConversations] = useState<any[]>(() => {
//     sessionStorage.removeItem('prevConversations');
//     return [];
//   });
//   const [showResult, setShowResult] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [resultData] = useState<string>('');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [userInput, setUserInput] = useState<string>('');
//   const [buttons, setButtons] = useState<{ text: string; value: string }[]>([]);
//   const [botState, setBotState] = useState<string>('recommendation');
//   const [formData, setFormData] = useState<Record<string, any>>({}); // State to store form data

//   useEffect(() => {
//     sessionStorage.setItem('prevConversations', JSON.stringify(prevConversations));
//   }, [prevConversations]);

//   const onSent = async (prompt: string) => {
//     setLoading(true);
//     setShowResult(true);

//     setPrevConversations((prevConversations) => [
//       ...prevConversations,
//       { prompt, response: '', loading: true },
//     ]);
//     const session_id = localStorage.getItem("sessionId");
//     // const payload = { user_prompt: prompt, state: botState, conversation_history: prevConversations };
//     const payload = { session_id: session_id, user_question: prompt }
//     const response = await fetchAIResponse2(payload);
//     console.log(JSON.parse(response.body))
//     console.log(JSON.parse(response.body).assistant_response)
//     console.log(session_id)
//     // const newResponse = response.chatbot_response.split('*').join('<br>');
//     const newResponse = JSON.parse(response.body).assistant_response
//     const newBotState = JSON.parse(response.body).bot_state;
//     setBotState(newBotState)

//     setPrevConversations((prevConversations) => {
//       const updatedConversations = [...prevConversations];
//       updatedConversations[updatedConversations.length - 1] = {
//         ...updatedConversations[updatedConversations.length - 1],
//         response: newResponse,
//         loading: false,
//       };
//       return updatedConversations;
//     });
//     console.log(newBotState)
//     // Step 4: If bot state is "finalize", call image generator
//     if (newBotState === "finalization") {
//       console.log("here")
//       console.log(newResponse)
//       try {
//         const imagePayload = { prompt: newResponse }; // Adjust as per your image generator API
//         const imageResponse = await invokeImageGenerator(imagePayload);
//         console.log("here")
//         console.log(imageResponse)
//         const imageUrls = imageResponse.uploaded_image_urls; // Parse the image URLs from response
//         console.log(imageUrls)
//         // Step 5: Add a new conversation for the images
//         setPrevConversations((prevConversations) => [
//           ...prevConversations,
//           {
//             prompt: "", // Label for the image section
//             response: imageUrls.map((url: string) => `<img src="${url}" />`).join(" "),
//             loading: false,
//           },
//         ]);
//       } catch (error) {
//         console.error("Failed to fetch images:", error);
//       }
//     }

//     try {
//       console.log(JSON.parse(response.body).button_values)
//       // const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
//       // const buttonValues = JSON.parse(cleanedString);
//       // const buttonValues = JSON.parse(response.body).button_values
//       const buttonValues = ''

//       if (Array.isArray(buttonValues)) {
//         setButtons(buttonValues.map((value: string) => ({
//           text: value,
//           value: value,
//         })));
//       } else {
//         setButtons([]);
//       }
//     } catch (error) {
//       console.error('Error parsing button values:', error);
//       setButtons([]);
//     }

//     setLoading(false);
//     setInput('');
//   };

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const payload = {
//       user_prompt: userInput,
//       state: botState,
//       conversation_history: messages,
//     };

//     const response = await fetchAIResponse(payload);

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: userInput, isBot: false },
//       { text: response.chatbot_response, isBot: true },
//     ]);
//     setUserInput('');

//     try {
//       const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
//       const buttonValues = JSON.parse(cleanedString);

//       if (Array.isArray(buttonValues)) {
//         setButtons(buttonValues.map((value: string) => ({
//           text: value,
//           value: value,
//         })));
//       } else {
//         setButtons([]);
//       }
//     } catch (error) {
//       console.error('Error parsing button values:', error);
//       setButtons([]);
//     }
//   };

//   const contextValue = {
//     prevConversations,
//     setPrevConversations,
//     onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     messages,
//     setMessages,
//     userInput,
//     setUserInput,
//     buttons,
//     setButtons,
//     botState,
//     setBotState,
//     sendMessage,
//     formData,
//     setFormData,
//   };

//   return <Context.Provider value={contextValue}>{children}</Context.Provider>;
// };

// export default ContextProvider;

import { createContext, useEffect, useState, ReactNode } from 'react';
import { fetchAIResponse, fetchAIResponse2, invokeImageGenerator } from '../config/awsAPI'; // Import AWS API interaction logic

interface ContextProps {
  prevConversations: any[];
  setPrevConversations: React.Dispatch<React.SetStateAction<any[]>>;
  onSent: (prompt: string) => void;
  recentPrompt: string;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  buttons: { text: string; value: string }[];
  setButtons: React.Dispatch<React.SetStateAction<{ text: string; value: string }[]>>;
  botState: string;
  setBotState: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<string>('');
  const [recentPrompt] = useState<string>('');
  const [prevConversations, setPrevConversations] = useState<any[]>(() => {
    sessionStorage.removeItem('prevConversations');
    return [];
  });
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [buttons, setButtons] = useState<{ text: string; value: string }[]>([]);
  const [botState, setBotState] = useState<string>('recommendation');
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    sessionStorage.setItem('prevConversations', JSON.stringify(prevConversations));
  }, [prevConversations]);

  const onSent = async (prompt: string) => {
    setLoading(true);
    setShowResult(true);

    setPrevConversations((prevConversations) => [
      ...prevConversations,
      { prompt, response: '', loading: true },
    ]);

    const session_id = localStorage.getItem('sessionId');
    if (!session_id) {
      console.error('Session ID is missing.');
      setLoading(false);
      return;
    }

    const payload = { session_id: session_id, user_question: prompt };

    try {
      const response = await fetchAIResponse(payload);
      const responseBody = JSON.parse(response.body);

      if (responseBody && responseBody.assistant_response) {
        const newResponse = responseBody.assistant_response;
        const newBotState = responseBody.bot_state;
        setBotState(newBotState);

        setPrevConversations((prevConversations) => {
          const updatedConversations = [...prevConversations];
          updatedConversations[updatedConversations.length - 1] = {
            ...updatedConversations[updatedConversations.length - 1],
            response: newResponse,
            loading: false,
          };
          return updatedConversations;
        });

        // If bot state is "finalization", call image generator
        if (newBotState === 'finalizer_agent') {
          try {
            const imagePayload = { prompt: newResponse };
            const imageResponse = await invokeImageGenerator(imagePayload);
            const imageUrls = imageResponse.uploaded_image_urls || [];

            setPrevConversations((prevConversations) => [
              ...prevConversations,
              {
                prompt: '',
                response: imageUrls.map((url: string) => `<img src="${url}" />`).join(' '),
                loading: false,
              },
            ]);
          } catch (imageError) {
            console.error('Failed to fetch images:', imageError);
          }
        }

        // Handle button values
        try {
          const buttonValues = responseBody.button_values || '';
          if (Array.isArray(buttonValues)) {
            setButtons(
              buttonValues.map((value: string) => {
                // Use a regular expression to remove everything after (and including) the first '-'
                const cleanedValue = value.replace(/-.*$/, '');
                console.log(value)
                return {
                  text: cleanedValue,
                  value: value,
                };
              })
            );
          }
          else {
            setButtons([]); // Clear buttons if not an array
          }
        } catch (error) {
          console.error('Error parsing button values:', error);
          setButtons([]);
        }
      } else {
        console.error('Invalid response structure:', responseBody);
      }
    } catch (error) {
      console.error('Error in fetchAIResponse:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const payload = {
      user_prompt: userInput,
      state: botState,
      conversation_history: messages,
    };

    const response = await fetchAIResponse2(payload);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, isBot: false },
      { text: response.chatbot_response, isBot: true },
    ]);
    setUserInput('');

    try {
      const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
      const buttonValues = JSON.parse(cleanedString);

      if (Array.isArray(buttonValues)) {
        setButtons(buttonValues.map((value: string) => ({
          text: value,
          value: value,
        })));
      } else {
        setButtons([]);
      }
    } catch (error) {
      console.error('Error parsing button values:', error);
      setButtons([]);
    }
  };

  const contextValue = {
    prevConversations,
    setPrevConversations,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    messages,
    setMessages,
    userInput,
    setUserInput,
    buttons,
    setButtons,
    botState,
    setBotState,
    sendMessage,
    formData,
    setFormData,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
