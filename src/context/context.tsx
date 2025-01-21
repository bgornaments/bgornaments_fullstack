/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useEffect, useState, ReactNode } from 'react';
// import { fetchAIResponse, fetchAIResponse2, invokeImageGenerator } from '../config/awsAPI'; 

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
//   isImageLoading: boolean;
//   setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

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

//     const session_id = localStorage.getItem('sessionId');
//     if (!session_id) {
//       console.error('Session ID is missing.');
//       setLoading(false);
//       return;
//     }

//     const payload = { session_id: session_id, user_question: prompt };

//     console.log('Calling fetchAIResponse API with prompt:', prompt);
//     console.log('Payload for fetchAIResponse:', payload);

//     try {
//       if (prompt === "Place order") {
//         console.log('Detected "Place order" prompt, skipping AI response.');
//         const thankYouMessage = "Thank you for placing your order! We'll process it shortly.";
//         setPrevConversations((prevConversations) => {
//           const updatedConversations = [...prevConversations];
//           updatedConversations[updatedConversations.length - 1] = {
//             ...updatedConversations[updatedConversations.length - 1],
//             response: thankYouMessage,
//             loading: false,
//           };
//           return updatedConversations;
//         });

//         setButtons([]);
//         return;
//       }

//       console.log('Calling fetchAIResponse API...');
//       const response = await fetchAIResponse(payload);
//       const responseBody = JSON.parse(response.body);

//       console.log('Response from fetchAIResponse:', responseBody);

//       if (responseBody && responseBody.assistant_response) {
//         const newResponse = responseBody.assistant_response;
//         const newBotState = responseBody.bot_state;
//         setBotState(newBotState);
//         console.log("Bot state:", newBotState);

//         setPrevConversations((prevConversations) => {
//           const updatedConversations = [...prevConversations];
//           updatedConversations[updatedConversations.length - 1] = {
//             ...updatedConversations[updatedConversations.length - 1],
//             response: newResponse,
//             loading: false,
//           };
//           return updatedConversations;
//         });

//         if (newBotState === 'finalizer_agent' && prompt !== "PLACE_ORDER") {
//           console.log('Bot state is finalizer_agent, calling invokeImageGenerator API...');
//           setIsImageLoading(true);
//           try {
//             const imagePayload = { prompt: newResponse };
//             console.log('Payload for invokeImageGenerator:', imagePayload);
//             const imageResponse = await invokeImageGenerator(imagePayload);
//             const imageUrls = imageResponse.uploaded_image_urls || [];

//             console.log('Response from invokeImageGenerator:', imageUrls);

//             setIsImageLoading(false);
//             if (imageUrls.length > 0) {
//               setPrevConversations((prevConversations) => [
//                 ...prevConversations,
//                 {
//                   prompt: 'Image generated',
//                   response: imageUrls.map((url: string) => `<img src="${url}" />`).join(' '),
//                   loading: false,
//                 },
//               ]);
//             }
//           } catch (imageError) {
//             console.error('Failed to generate image:', imageError);
//           } finally {
//             setIsImageLoading(false);
//           }
//         }

//         try {
//           const buttonValues = responseBody.button_values || '';
//           if (Array.isArray(buttonValues)) {
//             setButtons(buttonValues.map((value: string) => {
//               const cleanedValue = value.replace(/-.*$/, '');
//               return { text: cleanedValue, value: value };
//             }));
//           } else {
//             setButtons([]);
//           }
//         } catch (error) {
//           console.error('Error parsing button values:', error);
//           setButtons([]);
//         }
//       } else {
//         console.error('Invalid response structure:', responseBody);
//       }
//     } catch (error) {
//       console.error('Error in fetchAIResponse:', error);
//     } finally {
//       setLoading(false);
//       setInput('');
//     }
//   };

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const payload = {
//       user_prompt: userInput,
//       state: botState,
//       conversation_history: messages,
//     };

//     console.log('Calling fetchAIResponse2 API with user input:', userInput);
//     console.log('Payload for fetchAIResponse2:', payload);

//     try {
//       const response = await fetchAIResponse2(payload);
//       console.log('Response from fetchAIResponse2:', response);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: userInput, isBot: false },
//         { text: response.chatbot_response, isBot: true },
//       ]);
//       setUserInput('');

//       const cleanedString = response.button_values.replace(/^'|'$/g, '"').replace(/'/g, '"');
//       const buttonValues = JSON.parse(cleanedString);

//       console.log('Parsed button values from fetchAIResponse2:', buttonValues);

//       if (Array.isArray(buttonValues)) {
//         setButtons(buttonValues.map((value: string) => ({
//           text: value,
//           value: value,
//         })));
//       } else {
//         setButtons([]);
//       }
//     } catch (error) {
//       console.error('Error in sendMessage:', error);
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
//     isImageLoading,
//     setIsImageLoading,
//   };

//   return <Context.Provider value={contextValue}>{children}</Context.Provider>;
// };

// export default ContextProvider;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from 'react';
import { fetchAIResponse, fetchAIResponse2, invokeImageGenerator } from '../config/awsAPI'; 

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
  isImageLoading: boolean;
  setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [input, setInput] = useState<string>('');
  const [prevConversations, setPrevConversations] = useState<any[]>(() => {
    sessionStorage.removeItem('prevConversations');
    return [];
  });
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [buttons, setButtons] = useState<{ text: string; value: string }[]>([]);
  const [botState, setBotState] = useState<string>('recommendation');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

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
      setLoading(false);
      return;
    }

    const payload = { session_id: session_id, user_question: prompt };

    try {
      if (prompt === "Place order") {
        const thankYouMessage = "Thank you for placing your order! We'll process it shortly.";
        setPrevConversations((prevConversations) => {
          const updatedConversations = [...prevConversations];
          updatedConversations[updatedConversations.length - 1] = {
            ...updatedConversations[updatedConversations.length - 1],
            response: thankYouMessage,
            loading: false,
          };
          return updatedConversations;
        });

        setButtons([]);
        return;
      }

      console.log('Calling fetchAIResponse API...');
      const response = await fetchAIResponse(payload);
      const responseBody = JSON.parse(response.body);

      if (responseBody && responseBody.assistant_response) {
        const newResponse = responseBody.assistant_response;
        console.log("Previous Bot State: ",botState);
        const newBotState = responseBody.bot_state;
        setBotState(newBotState);
        console.log("Current Bot State: ", newBotState);
        

        setPrevConversations((prevConversations) => {
          const updatedConversations = [...prevConversations];
          updatedConversations[updatedConversations.length - 1] = {
            ...updatedConversations[updatedConversations.length - 1],
            response: newResponse,
            loading: false,
          };
          return updatedConversations;
        });

        // if (newBotState === 'finalizer_agent' && prompt !== "PLACE_ORDER") {
        //   console.log('Calling invokeImageGenerator API...');
        //   setIsImageLoading(true);
        //   try {
        //     const imagePayload = { prompt: newResponse };
        //     const imageResponse = await invokeImageGenerator(imagePayload);
        //     const imageUrls = imageResponse.uploaded_image_urls || [];
        //     setIsImageLoading(true);
        //     if (imageUrls.length > 0) {
        //       setPrevConversations((prevConversations) => [
        //         ...prevConversations,
        //         {
        //           prompt: 'Finalize',
        //           response: imageUrls.map((url: string) => `<img src="${url}" />`).join(' '),
        //           loading: false,
        //         },
        //       ]);
        //     }
        //   } catch (imageError) {
        //     setIsImageLoading(false);
        //   }
        // }

        try {
          const buttonValues = responseBody.button_values || '';
          if (Array.isArray(buttonValues)) {
            setButtons(buttonValues.map((value: string) => {
              const cleanedValue = value.replace(/-.*$/, '');
              return { text: cleanedValue, value: value };
            }));
          } else {
            setButtons([]);
          }
        } catch (error) {
          setButtons([]);
        }
      }
    } catch (error) {
      setLoading(false);
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

    console.log('Calling fetchAIResponse2 API...');
    try {
      const response = await fetchAIResponse2(payload);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, isBot: false },
        { text: response.chatbot_response, isBot: true },
      ]);
      setUserInput('');

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
      setButtons([]);
    }
  };

  const contextValue = {
    prevConversations,
    setPrevConversations,
    onSent,
    recentPrompt: '',
    showResult,
    loading,
    resultData: '',
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
    isImageLoading,
    setIsImageLoading,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
