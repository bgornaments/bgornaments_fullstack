/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './astro.css';

interface AstroSignatureType {
  zodiac_summary: string;
  personality_summary: string;
  key_personality_traits: string[];
  elemental_insight: string;
}

interface AstroSuggestionsType {
  recommended_gemstone: string;
  metal_choice: string;
  design_style: string;
  engraving_suggestions: string[];
}

const LoadingAnimation: React.FC = () => (
  <div className="loading">
    <div className="loading-text">
      <span className="loading-text-words">L</span>
      <span className="loading-text-words">O</span>
      <span className="loading-text-words">A</span>
      <span className="loading-text-words">D</span>
      <span className="loading-text-words">I</span>
      <span className="loading-text-words">N</span>
      <span className="loading-text-words">G</span>
    </div>
  </div>
);

const AstroSignature: React.FC = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const payload = locationState.state as {
    dob: string;
    tob: string;
    location: { lat: number; lon: number };
  };

  // State for storing API responses and loading status
  const [astroSignatureData, setAstroSignatureData] = useState<AstroSignatureType | null>(null);
  const [astroSuggestionsData, setAstroSuggestionsData] = useState<AstroSuggestionsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [astrologyResponse, setAstrologyResponse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Added error state like SetGen

  const base_url = 'https://3t81apzou3.execute-api.ap-south-1.amazonaws.com/dev/get_astrology_collection';

  useEffect(() => {
    if (payload) {
      console.log("Fetching astrology data with payload:", payload);
      fetch('https://3t81apzou3.execute-api.ap-south-1.amazonaws.com/dev/get_astrology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response from get_astrology:", data);
          let responsePayload: any = null;
          let astroData: AstroSignatureType | null = null;
          let suggestionsData: AstroSuggestionsType | null = null;

          if (data.statusCode === 200 && data.body) {
            responsePayload = JSON.parse(data.body);
            astroData = responsePayload.astrology_signature;
            suggestionsData = responsePayload.recommended_jewelry;
          } else if (data.astrology_signature || data.recommended_jewelry) {
            responsePayload = data;
            astroData = data.astrology_signature;
            suggestionsData = data.recommended_jewelry;
          }
          
          setAstrologyResponse(responsePayload);
          console.log("Stored full astrology response:", responsePayload);

          if (astroData) setAstroSignatureData(astroData);
          if (suggestionsData) setAstroSuggestionsData(suggestionsData);
          
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching astrology data:', error);
          setLoading(false);
        });
    }
  }, [payload]);

  // Function to call the Lambda API (similar to SetGen)
  const callLambda = async (endpointUrl: string, payload: object) => {
    setIsGenerating(true); // Using isGenerating like isLoading in SetGen
    setError(null); // Reset error state
    console.log('Sending payload to Lambda:', payload);
    try {
      const response = await axios.post(endpointUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000, // 30-second timeout
      });
      console.log('Lambda response:', response.data);
      return response.data;
    } catch (error) {
      setError('Error processing the request. Please try again later.');
      console.error("Lambda call error:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const saveGeneratedImages = async (imageUrls: string[]) => {
    const cognitoUserId = localStorage.getItem('cognito_username');

    if (!cognitoUserId) {
        console.error("Cognito User ID not found in local storage.");
        return;
    }

    const payload = {
        CognitoUserID: cognitoUserId,
        ImageId: cognitoUserId, // Added ImageId as required
        S3Links: imageUrls,
    };

    console.log("Saving images with payload:", payload);

    try {
        const response = await axios.post(
            "https://1ih5vdayz5.execute-api.us-east-1.amazonaws.com/test/image",
            payload
        );

        if (response.status === 200) {
            console.log(`Links saved for user: ${cognitoUserId}`);
        } else {
            console.error("Failed to save image links:", response.data);
        }
    } catch (error) {
        console.error("Error saving image links:", error);
    }
};

  const defaultSignature = {
    zodiac_summary: "Your zodiac summary will appear here.",
    personality_summary: "Your personality summary will appear here.",
    key_personality_traits: [],
    elemental_insight: "Your elemental insight will appear here."
  };

  const defaultSuggestions = {
    recommended_gemstone: "Default Gemstone",
    metal_choice: "Default Metal",
    design_style: "Default Design",
    engraving_suggestions: ["Default Engraving"]
  };

  const handleView = async () => {
    console.log("View button clicked");
    if (!astrologyResponse) {
      setError("No astrology data available to generate images.");
      console.error("No astrology response available for fetching images");
      return;
    }

    const response = await callLambda(base_url, astrologyResponse);
    if (response) {
      let imageUrls: string[] = [];
      if (response.statusCode === 200 && response.body) {
        const parsedBody = JSON.parse(response.body);
        imageUrls = parsedBody.image_urls || [];
        console.log("Parsed image URLs from body:", imageUrls);
      } else if (response.image_urls && Array.isArray(response.image_urls)) {
        imageUrls = response.image_urls;
        console.log("Direct image URLs:", imageUrls);
      } else {
        setError("Unexpected response format from image generation.");
        console.error("Unexpected image data format:", response);
        return;
      }

      if (imageUrls.length > 0) {
        console.log("Attempting to save images:", imageUrls);
        await saveGeneratedImages(imageUrls);
        console.log("Image saving completed");
      } else {
        console.warn("No image URLs found to save");
      }

      navigate('astro-images', {
        state: {
          jewelryFilters: {
            jewelryType: ["Pendant", "Necklaces", "Earrings", "Rings"],
            gemstone: [astroSuggestionsData?.recommended_gemstone || "Default Gemstone"],
            metal: [astroSuggestionsData?.metal_choice || "Default Metal"],
            designStyle: [astroSuggestionsData?.design_style || "Default Design"],
            engraving: astroSuggestionsData?.engraving_suggestions || ["Default Engraving"],
          },
          images: response
        }
      });
      console.log("Navigation triggered with images and filters");
    }
  };

  const astroSignature = astroSignatureData || defaultSignature;
  const astroSuggestions = astroSuggestionsData || defaultSuggestions;

  return (
    <div className="main min-h-screen p-4 sm:p-8 rounded-lg shadow-lg text-center max-w-full flex flex-col justify-center items-center">
      {isGenerating && (
        <div className="fullscreen-loader">
          <div className="generator"></div>
        </div>
      )}

      <div className="header absolute top-0 left-0 right-0 p-4 sm:p-8 text-center z-20 mb-4">
        <h1 className="text-yellow-600 text-xl sm:text-2xl font-bold mb-2 lg:text-4xl drop-shadow-[0px_0px_16px_rgba(224,174,42,1.0)]">
          Astrology Based Jewellery
        </h1>
      </div>
      <div className="astro-container flex flex-col gap-4 ml-4 sm:ml-14 mr-4 sm:mr-14 mt-16 sm:mt-16">
        <div className="astro-signature flex sm:flex-row justify-between items-stretch">
          <div className="astro-signature-left-part contentHeading text-xl flex-1 ml-2 sm:ml-4 mr-2 sm:mr-1 screen-lg:ml-8 screen-lg:mr-4 border-2 border-[#e0ae2a] rounded-md p-4 bg-[#F1E7D4] flex items-center justify-center max-w-40 transition-[background-position_0s_ease] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-[linear-gradient(45deg,transparent_25%,rgba(224,174,42,0.3)_50%,transparent_75%,transparent_100%)]">
            <strong>
              Your <br />Astrology <br />Signature
            </strong>
          </div>
          <div className="astro-signature-right-part contentBody flex-1 ml-2 sm:ml-1 mr-2 sm:mr-4 screen-lg:mr-8 screen-lg:ml-4 border-2 border-[#e0ae2a] rounded-md p-4 text-left">
            {loading ? (
              <LoadingAnimation />
            ) : (
              <>
                {astroSignature.zodiac_summary} {""}
                {astroSignature.personality_summary}
                <br />
                <strong>Key Traits:</strong> {astroSignature.key_personality_traits.join(", ")}
                <br />
                {astroSignature.elemental_insight}
              </>
            )}
          </div>
        </div>

        <div className="astro-suggestions flex sm:flex-row justify-between items-stretch">
          <div className="astro-suggestions-left-part contentHeading text-xl flex-1 ml-2 sm:ml-4 mr-2 sm:mr-1 screen-lg:ml-8 screen-lg:mr-4 border-2 border-[#e0ae2a] rounded-md p-4 bg-[#F1E7D4] flex items-center justify-center max-w-40 transition-[background-position_0s_ease] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-[linear-gradient(45deg,transparent_25%,rgba(224,174,42,0.3)_50%,transparent_75%,transparent_100%)]">
            <strong>
              Astrology <br />Based <br />Suggestions
            </strong>
          </div>
          <div className="astro-suggestions-right-part contentBody flex-1 ml-2 sm:ml-1 mr-2 sm:mr-4 screen-lg:mr-8 screen-lg:ml-4 border-2 border-[#e0ae2a] rounded-md p-4 text-left">
            {loading ? (
              <LoadingAnimation />
            ) : (
              <>
                💎Recommended Gemstone: {astroSuggestions.recommended_gemstone}
                <br />
                🔗Metal Choice: {astroSuggestions.metal_choice}
                <br />
                🪄Design Style: {astroSuggestions.design_style}
                <br />
                ✨Engraving Suggestions: {astroSuggestions.engraving_suggestions.join(", ")}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-box border-2 border-[#e0ae2a] rounded-md p-4 mt-8 bg-[#F1E7D4] relative overflow-hidden shadow-2xl transition-[background-position_0s_ease] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-[linear-gradient(45deg,transparent_25%,rgba(224,174,42,0.3)_50%,transparent_75%,transparent_100%)]">
        <h2>
          💎💎💎 Let’s get your astrologically aligned jewelry 💎💎💎
        </h2>
      </div>
      
      <div className="view-design">
        <button 
          onClick={handleView} 
          className="border-2 border-[#e0ae2a] rounded-xl m-4 p-2 bg-[#F1E7D4]"
          disabled={isGenerating} // Disable button while generating, like SetGen
        >
          {isGenerating ? 'Generating...' : 'View Design'}
        </button>
      </div>
      {error && <div className="mt-4 text-red-500">{error}</div>} {/* Display error like SetGen */}
    </div>
  );
};

export default AstroSignature;