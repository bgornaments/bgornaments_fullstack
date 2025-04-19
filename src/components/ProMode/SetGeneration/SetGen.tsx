/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UploadImg from '../UploadImg';
import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';
import GlassComponent from '../../GlassComponent';
import DownloadButton from '../../DownloadButton';
import { Set_Gen } from '../../../constantsAWS';
import Navbar from '../../../landingNew/navbar';
import logo from '../../../assets/image.png';
import imgVar from '../../../assets/image_variations_icon.jpg';
import s2d from '../../../assets/sketch.png';
import outfitmatch from '../../../assets/outfit_matching_icon.jpg';
import astro from '../../../assets/vedic-astrology.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const SetGen: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sourceType, setSourceType] = useState("Necklace");
  const [targetType, setTargetType] = useState("Necklace");

  const sessionId = localStorage.getItem('sessionId');
  const trialDaysLeft = parseInt(localStorage.getItem('trial_days_left') || '0');
  const trialStatus = localStorage.getItem('trial_status')?.toLowerCase();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const base_url = Set_Gen;

  useEffect(() => {
    if (trialStatus && trialDaysLeft > 0) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, [trialDaysLeft, trialStatus]);

  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  const callLambda = async (endpointUrl: string, payload: object) => {
    setIsLoading(true);
    console.log('Sending payload to Lambda:', payload);
    try {
      const response = await axios.post(endpointUrl, payload);
      console.log('Lambda response:', response);
      return response.data;
    } catch (error) {
      setError('Error processing the request. Please try again later.');
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
    setGeneratedImages([]);
  };

  const handleProcessImage = async () => {
    setIsProcessing(true);
    setError(null);
    if (selectedImage) {
      const payload = {
        image: selectedImage.split(',')[1],
        source_type: sourceType,
        target_type: targetType,
      };
      const response = await callLambda(base_url, payload);
      console.log("Lambda response:", response);

      if (response && response.body) {
        try {
          const parsedBody = JSON.parse(response.body);
          if (parsedBody.uploaded_image_urls && Array.isArray(parsedBody.uploaded_image_urls)) {
            setGeneratedImages(parsedBody.uploaded_image_urls);
            await saveGeneratedImages(parsedBody.uploaded_image_urls);
          } else {
            setError('Failed to generate set or invalid response format.');
          }
        } catch (error) {
          setError('Error parsing Lambda response.');
        }
      } else {
        setError('Lambda response is empty or malformed.');
      }
    } else {
      setError('No image uploaded.');
    }
    setIsProcessing(false);
  };

  const saveGeneratedImages = async (imageUrls: string[]) => {
    const cognitoUserId = localStorage.getItem('cognito_username');

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

  const features = [
    {
      title: 'Image Variation',
      imgSrc: imgVar,
      alt: 'Jewelry set on a wooden plate',
      description: 'Effortlessly create jewelry sets, optimized for your needs with flexibility.',
      link: '/expert-mode/image-variation',
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
      link: '/expert-mode/astrology',
    },
  ];

  return (
    <>
      {showComponent ? (
        <div className="flex-1 min-h-screen relative">
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
              <img src={kinmitraAnimation} alt="Loading Animation" className="w-[200px] h-[200px] object-cover" />
            </div>
          )}
          <Navbar onContactClick={() => {
            demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-80 z-[-90]"></div>
          <div className="w-[70%] mx-auto bg-[#fffdfa] flex flex-col items-center flex-grow p-6 relative z-10 mt-2">
            <div className="flex items-center justify-center text-xl p-5 text-[#585858] relative z-10 w-full">
              <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                  Set Generator
                </h1>
                <p className="text-lightGreen lg:text-xl">
                  Create stunning jewelry sets effortlessly
                </p>
              </header>
            </div>

            <main className="flex flex-col items-center flex-grow p-6 relative z-10">
              <div className="flex flex-wrap gap-6 justify-center items-center w-full">
                <div
                  className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-4 flex items-center justify-center cursor-pointer p-4"
                  onClick={() => {
                    if (!selectedImage) {
                      setIsUploadVisible(true);
                      setSelectedImage(null);
                      setGeneratedImages([]);
                      setError(null);
                    }
                  }}
                >
                  {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-gray-600">Click to upload</span>
                  )}
                </div>

                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((imageUrl, index) => (
                      <div key={index} className="relative h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
                        <img
                          src={imageUrl}
                          alt={`Generated Variation ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <DownloadButton imageUrl={imageUrl} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] border-4 flex items-center justify-center cursor-pointer p-4">
                    <span className="text-sm text-gray-600">Generated Image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-medium w-32 text-right">Source Type:</label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value)}
                    className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="Necklace">Necklace</option>
                    <option value="Earring">Earring</option>
                    <option value="Pendant">Pendant</option>
                    <option value="Rings">Rings</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-medium w-32 text-right">Target Type:</label>
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                    className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="Necklace">Necklace</option>
                    <option value="Earring">Earring</option>
                    <option value="Pendant">Pendant</option>
                    <option value="Rings">Rings</option>
                  </select>
                </div>
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

              {isProcessing && (
                <div className="mt-6 flex items-center">
                  <span className="mr-2">Processing...</span>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}

              {error && <div className="mt-6 text-red-500">{error}</div>}
            </main>
          </div>

          {isUploadVisible && (
            <UploadImg
              onClose={() => setIsUploadVisible(false)}
              sessionId={sessionId}
              onImageSelect={handleImageSelect}
            />
          )}
          <div className="h-16"></div>
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
          <div className="h-16"></div>
          <footer className="bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
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

export default SetGen;