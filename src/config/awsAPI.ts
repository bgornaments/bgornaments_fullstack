// interface Payload {
//   user_prompt: string;
//   state: string;
//   conversation_history: any[];
// }

// interface AIResponse {
//   chatbot_response: string;
//   button_values: string;
// }

// const fetchAIResponse = async (payload: Payload): Promise<AIResponse> => {
//   try {
//     const response = await fetch(
//       'https://2isixn6on3.execute-api.ap-south-1.amazonaws.com/dev/get_chatbot_response',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching chatbot response: ${response.statusText}`);
//     }

//     const data: AIResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error in fetchAIResponse:", error);
//     throw error;
//   }
// };

// export default fetchAIResponse;

const fetchAIResponse = async (payload: any) => {
  try {
    const response = await fetch(
      'https://2isixn6on3.execute-api.ap-south-1.amazonaws.com/dev/get_chatbot_response',
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
    return data;
  } catch (error) {
    console.error("Error in fetchAIResponse:", error);
    throw error;
  }
};

export default fetchAIResponse;
