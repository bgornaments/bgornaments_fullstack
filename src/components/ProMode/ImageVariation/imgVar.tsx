/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import UploadImg from '../UploadImg'; // Ensure correct import path
import axios from 'axios';
// import '/src/assets/kinmitraAnimation.mp4'
import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';
import GlassComponent from '../../GlassComponent';
import DownloadButton from '../../DownloadButton';
import { Dialog } from "@headlessui/react";
import ImageMaskingPopup, { ImageMaskingPopupHandle } from '../../MaskImage';
import { Img_Var_Base } from '../../../constantsAWS';
import { IMAGE_GENERATOR_LEONARDO_NEW } from '../../../constantsAWS';
import Navbar from '../../../landingNew/navbar';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image.png';
import setgen from '../../../assets/set_generator_icon.jpg';
import s2d from '../../../assets/sketch.png';
import outfitmatch from '../../../assets/outfit_matching_icon.jpg';
import astro from '../../../assets/vedic-astrology.png';

const ImgVar: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [modifiableParams, setModifiableParams] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string[]>([]);
  const [selectedModification, setSelectedModification] = useState<string | null>(null);
  const [customModification, setCustomModification] = useState<string>('');
  // const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
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
  const [showMaskingPopup, setShowMaskingPopup] = useState(false);
  const popupRef = useRef<ImageMaskingPopupHandle>(null);
  const [maskS3url, setMaskS3url] = useState<string | null>(null);
  const [isMaskExported, setIsMaskExported] = useState<boolean>(false);
  const [, setGeneratedImages] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);;

  const handleShowMaskingPopup = () => {
    console.log("handleShowMaskingPopup: Running – setting showMaskingPopup to true.");
    setShowMaskingPopup(true);
  };

  useEffect(() => {
    console.log("Updated S3 URL:", maskS3url);
    console.log("Exported Status:", isMaskExported);
  }, [maskS3url, isMaskExported]);

  useEffect(() => {
    if (!showMaskingPopup && maskS3url && isMaskExported) {
      const timer = setTimeout(() => {
        alert('Mask is applied!');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMaskingPopup, maskS3url, isMaskExported]);

  const handleCloseMaskingPopup = (s3Link: string | null, isExported: boolean) => {
    console.log("handleCloseMaskingPopup: Running – closing masking popup.");
    setShowMaskingPopup(false);

    console.log("handleCloseMaskingPopup: s3Link =", s3Link);
    console.log("handleCloseMaskingPopup: isExported =", isExported);

    setMaskS3url(s3Link);
    setIsMaskExported(isExported);

    if (isExported) {
      console.log("handleCloseMaskingPopup: Exported! Setting payload with S3 URL:", s3Link);
      const payload = { imageUrl: s3Link };
      console.log("handleCloseMaskingPopup: Payload =", payload);
    } else {
      console.log("handleCloseMaskingPopup: Not exported yet.");
    }
  };

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
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  // const sessionId = localStorage.getItem('sessionId');

  const base_url = Img_Var_Base;
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
    const existingSessionId = sessionStorage.getItem("sessionId");

    if (existingSessionId) {
      console.log(`Session ID ${existingSessionId} is being deleted.`)

      sessionStorage.removeItem("sessionId");
      localStorage.removeItem("sessionId");
      const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
      sessionStorage.setItem("sessionId", newSessionId);
      localStorage.setItem("sessionId", newSessionId);
      console.log("New Session ID created:", newSessionId);
    }

    if (!existingSessionId) {
      const newSessionId = (Math.floor(Math.random() * 1000000)).toString();
      sessionStorage.setItem("sessionId", newSessionId);
      localStorage.setItem("sessionId", newSessionId);
      console.log("New Session ID created:", newSessionId);
      setSessionId(newSessionId);
    }

    // if (!sessionId) {
    //   alert('Session ID not found. Please refresh the page.');
    // }
  },);

  const callLambda = async (endpointUrl: string, payload: object) => {
    console.log("callLambda: Running with endpointUrl:", endpointUrl, "and payload:", payload);
    setIsLoading(true);
    try {
      const response = await axios.post(endpointUrl, payload);
      console.log("callLambda: Received response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lambda call error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const makeImageSquare = (imageBase64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageBase64;
      img.onload = () => {
        const size = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);
          resolve(canvas.toDataURL());
        }
      };
    });
  };

  const handleImageSelect = async (imageBase64: string) => {
    console.log("handleImageSelect: Running – image selected.");
    const squaredImage = await makeImageSquare(imageBase64);
    setSelectedImage(squaredImage);
  };

  const handleProcessImage = async () => {
    console.log("handleProcessImage: Running.");
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

  const features = [
    {
      title: 'Set Generation',
      imgSrc: setgen,
      alt: 'Jewelry set on a wooden plate',
      description: 'Effortlessly create jewelry sets, optimized for your needs with flexibility.',
      link: '/expert-mode/set-generation',
    },
    {
      title: 'Sketch To Design',
      imgSrc: s2d,
      alt: 'Notebook with a sketch of a diamond and a pencil',
      description: 'Effortlessly transform your rough sketches to exquisite jewelry designs.',
      link: '/expert-mode/sketchToJwellery',
    },
    {
      title: 'Outfit Matching Jewelry',
      imgSrc: outfitmatch,
      alt: 'Golden picture frame',
      description: 'Perfectly match your jewelry & accessories to the outfit to impress everyone.',
      link: '/expert-mode/.../#',
    },
    {
      title: 'Astrology Jewelry',
      imgSrc: astro,
      alt: 'Astrology chart with a glowing center',
      description: 'Find your perfect astrology jewelry with personalized astrology guidance.',
      link: '/expert-mode/astro',
    },
  ];

  const handleNext = async () => {
    setIsProcessing(true);
    if (!selectedModification) {
      alert('Please select a modification or enter a custom one.');
      return;
    }
    const instruction = selectedModification === 'Other' ? customModification : selectedModification;
    // const payload = {
    //   description: caption,
    //   instruction: instruction,
    // };

    // console.log('payload for after modification prompt generation:', payload);

    // const response = await callLambda(
    //   `${base_url}generate_variation_sd_prompt`,
    //   payload
    // );
    // if (response && response.output_prompt) {
    //   // setFinalPrompt(response.output_prompt);
    //   await generateImageUrl(response.output_prompt, s3Link);
    // }
    await generateImageUrl(instruction, s3Link);
    setIsProcessing(false);
  };

  const generateImageUrl = async (finalPrompt: string, references3url: string) => {
    console.log("generateImageUrl: Running.");
    console.log("generateImageUrl: Using stored state values:");
    console.log(" - maskS3url:", maskS3url);
    console.log(" - isMaskExported:", isMaskExported);
    console.log(" - references3url:", references3url);
    console.log(" - prompt:", finalPrompt);
    console.log(" - init_strength:", sliderVal / 100);

    let payload: Record<string, any>;
    if (isMaskExported && maskS3url) {
      payload = {
        masks3url: maskS3url,
        references3url: references3url,
        prompt: finalPrompt,
        init_strength: sliderVal / 100,
        requestType: "mask_img_variation",
      };
      console.log("generateImageUrl: Using mask payload:", payload);
    } else {
      payload = {
        references3url: references3url,
        prompt: finalPrompt,
        init_strength: sliderVal / 100,
        requestType: "img_variation",
      };
      console.log("generateImageUrl: Using normal payload:", payload);
    }
    console.log("generateImageUrl: Final payload to send:", payload);

    try {
      const response = await callLambda(IMAGE_GENERATOR_LEONARDO_NEW, payload);
      if (response && response.uploaded_image_urls) {
        console.log("generateImageUrl: Received uploaded_image_urls:", response.uploaded_image_urls);
        setGeneratedImageUrl(response.uploaded_image_urls);
        if (Array.isArray(response.uploaded_image_urls)) {
          setGeneratedImages(prev => [...prev, ...response.uploaded_image_urls]);
          await saveGeneratedImages(response.uploaded_image_urls);
        }
      } else {
        console.log("generateImageUrl: No uploaded_image_urls received.");
      }
    } catch (error) {
      console.error("generateImageUrl: Error generating image URL:", error);
    }
  };

  const saveGeneratedImages = async (imageUrls: string[]) => {
    const cognitoUserId = localStorage.getItem('cognito_username'); // Retrieve user ID

    if (!cognitoUserId) {
      console.error("Cognito User ID not found in local storage.");
      return;
    }

    const payload = {
      CognitoUserID: cognitoUserId,
      ImageId: cognitoUserId,
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

  const handleUploadNewImage = () => {
    setSelectedImage(null);
    setCaption('');
    setModifiableParams([]);
    setSelectedParam(null);
    setModifications([]);
    setSelectedModification(null);
    setCustomModification('');
    // setFinalPrompt('');
    setGeneratedImageUrl(null);
    setS3Link('');
    setGeneratedImages([]);
  };

  return (
    <>
      {showComponent ? (
        <div className="flex flex-col min-h-screen">
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
          <Navbar
            onContactClick={() => {
              demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            onFaqClick={() => {
              faqsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>
          <main className="w-[70%] mx-auto bg-[#ffffff] flex flex-col items-center flex-grow p-6 relative z-10 mt-8 min-h-screen shadow-[4px_4px_4px_rgba(0,0,0,0.1),-4px_-4px_4px_rgba(0,0,0,0.1),4px_-4px_4px_rgba(0,0,0,0.1),-4px_4px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-center text-xl p-5 text-[#585858] relative w-full">
              <header className="text-center">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                  Design Variation
                </h1>
                {/* Subtitle */}
                <p className="text-lightGreen lg:text-xl">
                  Get unlimited unique variations of your design
                </p>
              </header>
            </div>
            {/* Main Content */}
            <div className="flex flex-wrap gap-6 justify-center items-center w-full">
              <div
                className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-4 flex items-center justify-center cursor-pointer p-4"
                onClick={() => {
                  if (!selectedImage) {
                    setIsUploadVisible(true);
                    handleUploadNewImage();
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
                className="relative h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-4 flex items-center justify-center p-4 overflow-hidden cursor-pointer"
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

            <div>
              <button onClick={handleShowMaskingPopup} className="mt-8 p-2 bg-[#e0ae2a] text-white rounded">
                Mask Image
              </button>
            </div>

            {/* Show Masking Popup if showMaskingPopup is true */}
            {showMaskingPopup && selectedImage && (
              <ImageMaskingPopup
                ref={popupRef}
                imgvar={selectedImage}
                onClose={handleCloseMaskingPopup} // Updated to use the new handler
              />
            )}
            {selectedImage && !isProcessing && (
              <button
                onClick={handleProcessImage}
                className="mt-6 px-8 py-3 bg-[#e0ae2a] text-white rounded-lg shadow hover:bg-[#d49b1f] transition"
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
                    const paramToSend = selectedParam === "Other" ? customParam : selectedParam;
                    if (paramToSend) {
                      fetchModifications(paramToSend);
                    } else {
                      alert("Please select or enter a parameter to modify.");
                    }
                  }}
                  className={`px-6 py-2 bg-[#e0ae2a] text-white rounded-lg shadow-md hover:bg-[#d49b1f] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition ${(!selectedParam && !customParam) || isProcessing ? "opacity-50 cursor-not-allowed" : ""
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
                    className={`px-8 py-3 bg-[#e0ae2a] text-white rounded-lg shadow-md hover:bg-[#d49b1f] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition ${!selectedModification || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={!selectedModification || isProcessing}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
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
          <div className='h-16'></div>
          <div className="w-full bg-gray-100 border-t border-b border-gray-300">
            <div className="py-6 font-custom mx-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <Link
                      to={feature.link}
                      key={index}
                      className="bg-white rounded-2xl shadow text-center border border-orange-200 min-h-[350px] flex flex-col justify-between max-w-[80%] mx-auto hover:shadow-xl transition-shadow duration-300"
                    >
                      <h2 className="text-orange-600 text-lg font-semibold mb-2 bg-orange-100 p-3 rounded-t-2xl">
                        {feature.title}
                      </h2>
                      <div className="flex-grow flex flex-col items-center justify-center px-4">
                        <img
                          src={feature.imgSrc}
                          alt={feature.alt}
                          width={150}
                          height={150}
                          className="mb-8"
                        />
                        <p className="text-gray-600 text-base">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='h-16'></div>
          <footer className="bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              {/* Logo & Tagline */}
              <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <Link to="/">
                  <img src={logo} alt="Company Logo" className="mb-4 w-32" />
                </Link>
                <p className="text-center md:text-left mb-4 text-2xl font-custom">
                  Your Style, Our Craftsmanship — Together,
                  <br />
                  We Sparkle with Elegance.
                </p>
                <div className="flex space-x-4 text-xl">
                  <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/profile.php?id=61574416178019" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                  <a className="text-gray-600 hover:text-gray-800" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col md:flex-row md:space-x-16 text-center md:text-left">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Company</h3>
                  <ul className="space-y-2">
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Home</Link></li>
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Our Work</Link></li>
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/catalog">AI Design</Link></li>
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/">Pricing</Link></li>
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/Contact-Us">Contact Us</Link></li>
                    <li><Link className="text-gray-600 hover:text-gray-800 text-base" to="/kinmitra_team">Our Team</Link></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Support</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-600 text-base">+91 (835) 608-5861</li>
                    <li className="text-gray-600 text-base">ceo@kinmitra.com</li>
                  </ul>
                  <div className="mt-4">
                    <a href="/privacy-Notice" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-base block">Privacy Notice</a>
                    <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-base block mt-1">Terms & Conditions</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom copyright */}
            <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
              Copyright © 2025 KinMitra. All rights reserved. <br /> Unauthorized reproduction or distribution is prohibited.
              KinMitra is a registered trademark of Bharat Gold Ornaments Pvt. Ltd.
            </div>
          </footer>
        </div>
      ) : (
        <GlassComponent />
      )}
    </>
  );
};
export default ImgVar;