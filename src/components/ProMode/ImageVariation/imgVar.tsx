import React, { useState, useEffect } from 'react';
import UploadImg from '../UploadImg'; // Ensure correct import path
import axios from 'axios';
import '/src/assets/kinmitraAnimation.mp4'
import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';
import GlassComponent from '../../GlassComponent';
import DownloadButton from '../../DownloadButton';
import { Dialog } from "@headlessui/react";
import { IMAGE_GENERATOR_LEONARDO_NEW } from '../../../constantsAWS';

const ImgVar: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [modifiableParams, setModifiableParams] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string[]>([]);
  const [selectedModification, setSelectedModification] = useState<string | null>(null);
  const [customModification, setCustomModification] = useState<string>('');
  const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL
  const [s3Link, setS3Link] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isProcessing, setIsProcessing] = useState(false); // To disable buttons after click
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [customParam, setCustomParam] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  // Handle Wheel Zooming
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { offsetX, offsetY, target } = event.nativeEvent;

    if (target instanceof HTMLImageElement) {
      const { width, height } = target.getBoundingClientRect();
      const xPercent = ((offsetX / width) * 100).toFixed(2) + "%";
      const yPercent = ((offsetY / height) * 100).toFixed(2) + "%";

      setOrigin({ x: xPercent, y: yPercent });
      setZoom((prevZoom) => Math.max(1, prevZoom + event.deltaY * -0.01));
    }
  };

  // Handle Keyboard Zooming (Ctrl + '+' or Ctrl + '-')
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === '+') {
      setZoom((prevZoom) => Math.min(3, prevZoom + 0.1)); // Zoom in
    } else if (event.ctrlKey && event.key === '-') {
      setZoom((prevZoom) => Math.max(1, prevZoom - 0.1)); // Zoom out
    }
  };

  // Add event listener for keyboard events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const imageToDownload = generatedImageUrl;

  const sessionId = localStorage.getItem('sessionId');

  const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/';
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
    const trialDaysLeft = parseInt(localStorage.getItem('trial_days_left') || '0');
    const trialStatus = localStorage.getItem('trial_status')?.toLowerCase();

    console.log("trialDaysLeft:", trialDaysLeft);
    console.log("trialStatus:", trialStatus);

    if (trialStatus && trialDaysLeft > 0) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, []);

  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  const callLambda = async (endpointUrl: string, payload: object) => {
    setIsLoading(true);
    try {
      const response = await axios.post(endpointUrl, payload);
      return response.data;
    } catch (error) {
      console.error("Lambda call error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (imageBase64: string) => setSelectedImage(imageBase64);

  const handleProcessImage = async () => {
    setIsProcessing(true);
    if (selectedImage) {
      const payload = {
        user_id: 'unknown',
        session_id: sessionId || '1234567',
        image_base64: selectedImage.split(',')[1],
      };

      console.log('payload for fetching s3 link:', payload);

      const response = await callLambda(
        `${base_url}handle_promode_session_images`,
        payload
      );
      if (response && response.s3_link) {
        const captionResponse = await callLambda(
          `${base_url}generate_image_caption`,
          { url: response.s3_link }
        );
        setS3Link(response.s3_link);
        setCaption(captionResponse.caption || '');
        await fetchModifiableParams(captionResponse.caption);
      }
    }
    setIsProcessing(false);
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
        setModifiableParams(Array.isArray(paramsArray) ? paramsArray : []);
      } catch (err) {
        console.error('Failed to parse parameters:', err);
        setModifiableParams([]);
      }
    }
  };
  const fetchModifications = async (selectedParam: string) => {
    if (caption && selectedParam) {
      const payload = { parameter: selectedParam, description: caption };

      console.log('payload for fetching modification:', payload);

      const response = await callLambda(
        `${base_url}generate_possible_modifications`,
        payload
      );
      if (response && response.suggestions) {
        try {
          const suggestionsArray = JSON.parse(response.suggestions);
          setModifications(Array.isArray(suggestionsArray) ? suggestionsArray : []);
        } catch (err) {
          console.error('Failed to parse suggestions:', err);
          setModifications([]);
        }
      }
    }
  };
  const handleNext = async () => {
    setIsProcessing(true);
    if (!selectedModification) {
      alert('Please select a modification or enter a custom one.');
      return;
    }
    const instruction = selectedModification === 'Other' ? customModification : selectedModification;
    const payload = {
      description: caption,
      instruction: instruction,
    };

    console.log('payload for after modification prompt generation:', payload);

    const response = await callLambda(
      `${base_url}generate_variation_sd_prompt`,
      payload
    );
    if (response && response.output_prompt) {
      setFinalPrompt(response.output_prompt);
      await generateImageUrl(response.output_prompt, s3Link);
    }
    setIsProcessing(false);
  };

  const generateImageUrl = async (finalPrompt: string, references3url: string) => {
    const payload = {
      references3url: references3url,
      prompt: finalPrompt,
      init_strength: sliderVal / 100,
      requestType: "img_variation"// add request type based on the case img_generation, img_variation, mask_img_variation
    };
    // Need to send masks3url when it is masked image variation
    // Use handle_promode_session_images to convert base64 of mask to s3 link
    console.log('payload for image generation:', payload);


    const response = await callLambda(
      IMAGE_GENERATOR_LEONARDO_NEW,
      payload
    );
    if (response && response.uploaded_image_urls) {
      setGeneratedImageUrl(response.uploaded_image_urls);
    }
  };
  const handleUploadNewImage = () => {
    setSelectedImage(null);
    setCaption('');
    setModifiableParams([]);
    setSelectedParam(null);
    setModifications([]);
    setSelectedModification(null);
    setCustomModification('');
    setFinalPrompt('');
    setGeneratedImageUrl(null);
    setS3Link('');
  };

  return (
    <>
      {showComponent ? (
        <div className="flex-1 min-h-screen pb-[15vh] relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
              <img
                src={kinmitraAnimation}
                alt="Loading Animation"
                className="w-[200px] h-[200px] object-cover"
              />
            </div>
          )}
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
                className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-2 flex items-center justify-center cursor-pointer p-4"
                onClick={() => {
                  if (!selectedImage) {
                    setIsUploadVisible(true); // Show upload image modal if no image or after image generation
                    handleUploadNewImage(); // Reset states to start fresh
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
              <div
                className="relative h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-2 flex items-center justify-center p-4 overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => generatedImageUrl && setIsOpen(true)}
              >
                {generatedImageUrl ? (
                  <>
                    <img
                      src={generatedImageUrl[0] ?? ""}
                      alt="Generated Variation"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isHovered && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-[#E0AE2A] text-lg font-semibold">
                        Click to open
                      </div>
                    )}
                    {imageToDownload && (
                      <div className="absolute top-2 right-2">
                        <DownloadButton imageUrl={imageToDownload} />
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-gray-600">Generated Image</span>
                )}
              </div>

              {/* Popup Modal for Image Preview with Zoom */}
              {generatedImageUrl && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

                    <Dialog.Panel className="relative p-4 max-w-3xl bg-white rounded-lg shadow-lg">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-0 right-0 text-[#FF0000] bg-white hover:text-[red] bg-red-800 p-2 rounded-full text-xl z-10"
                      >
                        ✖
                      </button>
                      <div className="flex">
                        <div className="text-white bg-gray-900 p-4 rounded-lg mr-4">
                          <h2 className="text-lg font-semibold mb-2">How to Zoom:</h2>
                          <ul className="text-sm list-disc pl-4">
                            <li>Scroll up to zoom in</li>
                            <li>Scroll down to zoom out</li>
                          </ul>
                        </div>

                        {/* Image Preview with Zoom */}
                        <div className="overflow-hidden flex items-center justify-center" onWheel={handleWheel}>
                          <img
                            src={generatedImageUrl[0] ?? ""}
                            alt="Generated Variation"
                            style={{
                              transform: `scale(${zoom})`,
                              transformOrigin: `${origin.x} ${origin.y}`, // Set the transform origin
                            }}
                            className="rounded-lg transition-transform duration-200 max-w-[80vw] max-h-[70vh]"
                          />
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>
                </Dialog>
              )}

            </div>
            {selectedImage && !isProcessing && (
              <button
                onClick={handleProcessImage}
                className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                disabled={isProcessing}
              >
                Process Image
              </button>
            )}
            {modifiableParams.length > 0 && (
              <div className="mt-6 flex items-center space-x-4">
                {/* Dropdown */}
                <select
                  className="border p-2 rounded w-full max-w-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  value={selectedParam || ''}
                  onChange={(e) => setSelectedParam(e.target.value)}
                >
                  <option value="">Select a Modifiable Parameter</option>
                  {modifiableParams.map((param, index) => (
                    <option key={index} value={param}>
                      {param}
                    </option>
                  ))}
                  <option value="Other">Other</option> {/* Added 'Other' option */}
                </select>

                {/* Custom Input for 'Other' */}
                {selectedParam === 'Other' && (
                  <input
                    type="text"
                    placeholder="Enter custom parameter"
                    value={customParam}
                    onChange={(e) => setCustomParam(e.target.value)}
                    className="border p-2 rounded w-full max-w-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />
                )}

                {/* 'Go' Button */}
                <button
                  onClick={() => {
                    if (selectedParam || customParam) {
                      fetchModifications(selectedParam || customParam); // Pass customParam if selectedParam is 'Other'
                    } else {
                      alert('Please select a parameter to modify.');
                    }
                  }}
                  className={`px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition ${(!selectedParam && !customParam) || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={(!selectedParam && !customParam) || isProcessing}
                >
                  Go
                </button>
              </div>
            )}

            {modifications.length > 0 && (
              <div className="mt-6 flex-col items-center justify-between space-x-4">
                {/* Dropdown */}
                <select
                  className="border p-2 rounded w-full max-w-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                  value={selectedModification || ''}
                  onChange={(e) => setSelectedModification(e.target.value)}
                >
                  <option value="">Select a Modification</option>
                  {modifications.map((mod, index) => (
                    <option key={index} value={mod}>
                      {mod}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {/* Custom Input for 'Other' */}
                {selectedModification === 'Other' && (
                  <div className="mt-4 w-full">
                    <input
                      type="text"
                      placeholder="Enter custom modification"
                      value={customModification}
                      onChange={(e) => setCustomModification(e.target.value)}
                      className="border p-2 rounded w-full max-w-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center w-full max-w-md">
                  <label
                    htmlFor="range-slider"
                    className="text-gray-700 font-semibold mb-2 text-center"
                  >
                    Set Similarity Level ({sliderVal})
                  </label>
                  <input
                    id="range-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                    className="slider w-full max-w-sm h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none outline-none cursor-pointer transition-all duration-300 ease-in-out"
                  />
                </div>

                {/* 'Next' Button */}
                <div className="mt-6 flex flex-col items-center justify-center w-full">
                  {/* 'Next' Button */}
                  <button
                    onClick={handleNext}
                    className={`px-8 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition ${!selectedModification || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={!selectedModification || isProcessing}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {finalPrompt && (
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="text-lg font-bold">Generated Prompt:</h3>
                <p>{finalPrompt}</p>
              </div>
            )}
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
      ) : (
        <GlassComponent />
      )}
    </>
  );
};
export default ImgVar;