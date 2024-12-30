import React, { useState, useEffect } from 'react';
import UploadImg from './UploadImg'; // Ensure correct import path
import axios from 'axios';

const ImgVar: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [modifiableParams, setModifiableParams] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string[]>([]);
  const [selectedModification, setSelectedModification] = useState<string | null>(null);
  const [customModification, setCustomModification] = useState<string>('');
  const [, setFinalPrompt] = useState<string>(''); // To store the final prompt
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL
  const [s3Link, setS3Link] = useState("");

  const sessionId = localStorage.getItem('sessionId');
  const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  const callLambda = async (endpointUrl: string, payload: object) => {
    try {
      const response = await axios.post(endpointUrl, payload);
      console.log("Lambda response:", response); // Log the full response
      return response.data;
    } catch (error) {
      console.error("Lambda call error:", error);
      return null;
    }
  };

  const handleImageSelect = (imageBase64: string) => setSelectedImage(imageBase64);

  const handleProcessImage = async () => {
    if (selectedImage) {
      console.log("Processing image...");
      const payload = {
        user_id: 'unknown',
        session_id: sessionId || '1234567',
        image_base64: selectedImage.split(',')[1], // Base64 encoding before sending to Lambda
      };

      const response = await callLambda(
        `${base_url}handle_promode_session_images`,
        payload
      );

      if (response && response.s3_link) {
        console.log("Image processed, fetching caption...");
        const captionResponse = await callLambda(
          `${base_url}generate_image_caption`,
          { url: response.s3_link }
        );

        setS3Link(response.s3_link); // Store the s3_link in state
        console.log("Caption generated:", captionResponse);
        setCaption(captionResponse.caption || '');

        // Fetch modifiable parameters after caption generation
        await fetchModifiableParams(captionResponse.caption);
      }
    }
  };

  const fetchModifiableParams = async (caption: string) => {
    const paramsResponse = await callLambda(
      `${base_url}list_key_modifiable_params`,
      { description: caption }
    );

    if (paramsResponse && paramsResponse.parameters) {
      try {
        const fixedJsonString = paramsResponse.parameters.replace(/'/g, '"');
        const paramsArray = JSON.parse(fixedJsonString);

        if (Array.isArray(paramsArray)) {
          setModifiableParams(paramsArray);
        } else {
          console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
          setModifiableParams([]);
        }
      } catch (err) {
        console.error('Failed to parse parameters:', err);
        setModifiableParams([]);
      }
    } else {
      console.error('Failed to fetch modifiable parameters. Response:', paramsResponse);
      setModifiableParams([]);
    }
  };

  const fetchModifications = async (selectedParam: string) => {
    if (caption && selectedParam) {
      const payload = {
        parameter: selectedParam,
        description: caption,
      };

      const response = await callLambda(
        `${base_url}generate_possible_modifications`,
        payload
      );

      if (response && response.suggestions) {
        try {
          const suggestionsArray = JSON.parse(response.suggestions);

          if (Array.isArray(suggestionsArray)) {
            setModifications(suggestionsArray);
          } else {
            console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
            setModifications([]);
          }
        } catch (err) {
          console.error('Failed to parse suggestions:', err);
          setModifications([]);
        }
      } else {
        console.error('Failed to fetch modifications. Response:', response);
        setModifications([]);
      }
    }
  };

  const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedModification(value);
    if (value === 'Other') {
      setCustomModification(''); // Clear custom input when "Other" is selected
    }
  };

  const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomModification(e.target.value);
  };

  const handleNext = async () => {
    if (!selectedModification) {
      alert('Please select a modification or enter a custom one.');
      return;
    }

    const instruction = selectedModification === 'Other' ? customModification : selectedModification;

    const payload = {
      description: caption,
      instruction: instruction,
    };

    try {
      console.log("Calling endpoint with payload:", payload);
      const response = await callLambda(
        `${base_url}generate_variation_sd_prompt`,
        payload
      );

      console.log("API Response:", response);

      if (response && response.output_prompt) {
        setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
        // Call the generate image URL endpoint after getting the final prompt
        await generateImageUrl(response.output_prompt, s3Link);  // Pass selectedImage to generate the image
      } else {
        console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
        setFinalPrompt("Error: Could not generate prompt.");
      }
    } catch (error) {
      console.error("Error generating final prompt:", error);
      setFinalPrompt("Error: Something went wrong.");
    }
  };


  const generateImageUrl = async (finalPrompt: string, references3url: string) => {
    // const base64Image = imageUrl.split(',')[1] || '';
    const payload = {
      references3url: references3url,
      prompt: finalPrompt,
      init_strength: 0.5,
    };

    console.log("Payload for generateImageUrl:", payload);

    try {
      const response = await callLambda(
        `${base_url}generate_images_leonardo`,
        payload
      );

      console.log("Response from generate_images:", response);

      if (response && response.uploaded_image_urls) {
        setGeneratedImageUrl(response.uploaded_image_urls);
      } else {
        alert("Error: Unable to generate the image. Please check the API response.");
        console.error('API response does not include "generated_image_url". Response:', response);
      }
    } catch (error) {
      console.error("Error while generating image URL:", error);

      alert("An error occurred while generating the image. Please try again later.");
    }
  };


  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* White overlay on the background image */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>

      {/* Header as in Code 1 */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858] relative z-10">
        <div className="name flex flex-col items-center gap-1">
          <h2 className="text-xl">
            <img
              src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
              alt="Kinmitra Logo"
              className="h-5"
            />
          </h2>
          <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
            Pro Mode
          </p>
        </div>
        <p>Image Variation</p>
        <img
          className="w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-6 relative z-10">
        <div className="flex flex-wrap gap-6 justify-center items-center w-full">
          <div
            className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
            onClick={() => {
              if (!selectedImage) {
                setIsUploadVisible(true);
              }
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-600">Click to upload</span>
            )}
          </div>

          <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
            {generatedImageUrl ? (
              <img
                src={generatedImageUrl}
                alt="Generated Variation"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-sm text-gray-600">Generated Image</span>
            )}
          </div>
        </div>

        {selectedImage && (
          <button
            onClick={handleProcessImage}
            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Process Image
          </button>
        )}

        {modifiableParams.length > 0 && (
          <div className="mt-6">
            <select
              className="border p-2 rounded"
              value={selectedParam || ''}
              onChange={(e) => setSelectedParam(e.target.value)}
            >
              <option value="">Select a Modifiable Parameter</option>
              {modifiableParams.map((param, index) => (
                <option key={index} value={param}>
                  {param}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (selectedParam) {
                  fetchModifications(selectedParam); // Call the function to fetch modifications
                } else {
                  alert('Please select a parameter to modify.');
                }
              }}
              className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              disabled={!selectedParam}
            >
              Go
            </button>

          </div>
        )}

        {modifications.length > 0 && (
          <div className="mt-6">
            <select
              className="border p-2 rounded"
              value={selectedModification || ''}
              onChange={handleModificationChange}
            >
              <option value="">Select a Modification</option>
              {modifications.map((mod, index) => (
                <option key={index} value={mod}>
                  {mod}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedModification === 'Other' && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter custom modification"
                  value={customModification}
                  onChange={handleCustomModificationChange}
                  className="border p-2 rounded"
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
            disabled={!selectedModification}
          >
            Next
          </button>
        </div>

        {/* {finalPrompt && (
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Generated Prompt:</h3>
            <p>{finalPrompt}</p>
          </div>
        )} */}
      </main>

      {/* Upload Image Modal */}
      {isUploadVisible && (
        <UploadImg
          onClose={() => setIsUploadVisible(false)}
          sessionId={sessionId}
          onImageSelect={handleImageSelect}
        />
      )}
    </div>
  );
};

export default ImgVar;

