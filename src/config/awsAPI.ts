/* eslint-disable @typescript-eslint/no-explicit-any */
// Fetches the chatbot response from the new endpoint
export const fetchAIResponse = async (payload: { session_id: string, user_question: string }) => {
  try {
    const response = await fetch(
      // 'https://2ngxc0t5ma.execute-api.us-east-1.amazonaws.com/default/kq_query_workflow', // Updated endpoint
      'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/langgraph_chatbot',
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

// Previous API call function, no longer used, but leaving it here for context
export const fetchAIResponse2 = async (payload: any) => {
  try {
    const response = await fetch(
      'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/langgraph_chatbot', // Deprecated API endpoint
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
    return data;
  } catch (error) {
    console.error('Error in fetchAIResponse2:', error);
    throw error;
  }
};

// Image generator API call, remains the same
export const invokeImageGenerator = async (payload: any) => {
  try {
    const response = await fetch(
      'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_images_leonardo',
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
