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

export const fetchAIResponse = async (payload: any) => {
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
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error in fetchAIResponse:", error);
    throw error;
  }
};

export const fetchAIResponse2 = async (payload: any) => {
  try {
    const response = await fetch(
      // 'https://2ngxc0t5ma.execute-api.us-east-1.amazonaws.com/default/kq_query_workflow',
      'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/langgraph_chatbot',
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
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error in fetchAIResponse:", error);
    throw error;
  }
};

export const invokeImageGenerator = async (payload: any) => {
  try {
    const response = await fetch(
      'https://2isixn6on3.execute-api.ap-south-1.amazonaws.com/dev/generate_images',
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
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error in fetchAIResponse:", error);
    throw error;
  }
};
