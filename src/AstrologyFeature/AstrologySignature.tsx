import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const payload = locationState.state as {
    dob: string;
    tob: string;
    location: { lat: number; lon: number };
  };

  const [astroSignatureData, setAstroSignatureData] = useState<AstroSignatureType | null>(null);
  const [astroSuggestionsData, setAstroSuggestionsData] = useState<AstroSuggestionsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (payload) {
      fetch('https://3t81apzou3.execute-api.ap-south-1.amazonaws.com/dev/get_astrology_jewelry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          
          let astroData: AstroSignatureType | null = null;
          let suggestionsData: AstroSuggestionsType | null = null;

          // Handle Lambda proxy response format
          if (data.statusCode === 200 && data.body) {
            const parsedBody = JSON.parse(data.body);
            astroData = parsedBody.astrology_signature;
            suggestionsData = parsedBody.recommended_jewelry;
          } 
          // Handle direct response format
          else if (data.astrology_signature || data.recommended_jewelry) {
            astroData = data.astrology_signature;
            suggestionsData = data.recommended_jewelry;
          }

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

  // Fallback data if API response is not available
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

  const astroSignature = astroSignatureData || defaultSignature;
  const astroSuggestions = astroSuggestionsData || defaultSuggestions;

  return (
    <div className="main min-h-screen p-4 sm:p-8 rounded-lg shadow-lg text-center max-w-full flex flex-col justify-center items-center">
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

      <div className="jewellery-type mt-4">
        <select id="jewelleryType" className="border-2 border-[#e0ae2a] rounded-md p-2">
          <option value="" disabled selected>
            Select Jewellery Type
          </option>
          <option value="ring">Ring</option>
          <option value="earrings">Earrings</option>
          <option value="necklace">Necklace</option>
          <option value="pendant">Pendant</option>
        </select>
      </div>
      <div className="view-design">
        <button className="border-2 border-[#e0ae2a] rounded-xl m-4 p-2 bg-[#F1E7D4]">View Design</button>
      </div>
    </div>
  );
};

export default AstroSignature;
