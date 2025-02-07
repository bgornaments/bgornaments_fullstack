/* eslint-disable @typescript-eslint/no-unused-vars */
// export default ContextProvider;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from 'react';
// import { fetchAIResponse, fetchAIResponse2, invokeImageGenerator } from '../config/awsAPI'; 
// import { fetchAIResponse, fetchAIResponse2 } from '../config/awsAPI';
import { CHATBOT, IMAGE_GENERATOR_LEONARDO } from "../constantsAWS"

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
  // sendMessage: () => void;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  isImageLoading: boolean;
  setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

/* eslint-disable @typescript-eslint/no-explicit-any */
// Fetches the chatbot response from the new endpoint
const fetchAIResponse = async (payload: { session_id: string, user_question: string }) => {
  try {
    const response = await fetch(
      // 'https://2ngxc0t5ma.execute-api.us-east-1.amazonaws.com/default/kq_query_workflow', // Updated endpoint
      CHATBOT,
      // "https://u7f34stbg0.execute-api.us-east-1.amazonaws.com/default/kq_query_workflow_Sagar",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );


    if (!response.ok) {
      throw new Error(`Error fetching chatbot response: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // Output structure: { 'user_question': user_question, 'assistant_response': assistant_response, 'button_values': button_values }
  } catch (error) {
    console.error('Error in fetchAIResponse:', error);
    throw error;
  }
};

// Image generator API call, remains the same
const invokeImageGenerator = async (payload: any) => {
  try {
    const response = await fetch(
      IMAGE_GENERATOR_LEONARDO,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching image generator response: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error in invokeImageGenerator:', error);
    throw error;
  }
};


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
        console.log("Previous Bot State: ", botState);
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

        if (newBotState === 'finalizer_agent' && prompt !== "PLACE_ORDER") {
          console.log('Calling invokeImageGenerator API...');
          setIsImageLoading(true);
          try {
            const imagePayload = { prompt: newResponse };
            const imageResponse = await invokeImageGenerator(imagePayload);
            const imageUrls = imageResponse.uploaded_image_urls || [];
            setIsImageLoading(true);
            if (imageUrls.length > 0) {
              setPrevConversations((prevConversations) => [
                ...prevConversations,
                {
                  prompt: 'Finalize',
                  response: imageUrls.map((url: string) => `<img src="${url}" />`).join(' '),
                  loading: false,
                },
              ]);
            }
          } catch (imageError) {
            setIsImageLoading(false);
          }
        }

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
    formData,
    setFormData,
    isImageLoading,
    setIsImageLoading,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
