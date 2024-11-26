// /* eslint-disable @typescript-eslint/no-explicit-any */
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

// // context.tsx
// import { createContext, useEffect, useState, ReactNode } from 'react';
// import fetchAIResponse from '../config/awsAPI'; // Import the AWS API interaction logic

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
//   buttons: { text: string, value: string }[];
//   setButtons: React.Dispatch<React.SetStateAction<{ text: string, value: string }[]>>;
//   botState: string;
//   setBotState: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: () => void;
// }

// export const Context = createContext<ContextProps | undefined>(undefined);

// const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [input, setInput] = useState<string>('');
//   // const [recentPrompt, setRecentPrompt] = useState<string>('');
//   const [recentPrompt] = useState<string>('');
//   const [prevConversations, setPrevConversations] = useState<any[]>(() => {
//     sessionStorage.removeItem('prevConversations');
//     return [];
//   });
//   const [showResult, setShowResult] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   // const [resultData, setResultData] = useState<string>('');
//   const [resultData] = useState<string>('');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [userInput, setUserInput] = useState<string>('');
//   const [buttons, setButtons] = useState<{ text: string, value: string }[]>([]);
//   const [botState, setBotState] = useState<string>('recommendation');
//   // const [partialResponse, setPartialResponse] = useState<string>('');

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

//     const payload = { user_prompt: prompt, state: botState, conversation_history: prevConversations };
//     const response = await fetchAIResponse(payload);

//     const newResponse = response.chatbot_response.split('*').join('<br>');

//     setPrevConversations((prevConversations) => {
//       const updatedConversations = [...prevConversations];
//       updatedConversations[updatedConversations.length - 1] = {
//         ...updatedConversations[updatedConversations.length - 1],
//         response: newResponse,
//         loading: false,
//       };
//       return updatedConversations;
//     });

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
//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;

import { createContext, useEffect, useState, ReactNode } from 'react';
import fetchAIResponse from '../config/awsAPI'; // Import AWS API interaction logic

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
  const [formData, setFormData] = useState<Record<string, any>>({}); // State to store form data

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

    const payload = { user_prompt: prompt, state: botState, conversation_history: prevConversations };
    const response = await fetchAIResponse(payload);

    const newResponse = response.chatbot_response.split('*').join('<br>');

    setPrevConversations((prevConversations) => {
      const updatedConversations = [...prevConversations];
      updatedConversations[updatedConversations.length - 1] = {
        ...updatedConversations[updatedConversations.length - 1],
        response: newResponse,
        loading: false,
      };
      return updatedConversations;
    });

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

    setLoading(false);
    setInput('');
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const payload = {
      user_prompt: userInput,
      state: botState,
      conversation_history: messages,
    };

    const response = await fetchAIResponse(payload);

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