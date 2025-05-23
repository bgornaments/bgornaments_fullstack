import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import download from "../assets/download_gif.gif";
import axios from 'axios';
import './SketchToDesign.css';
import Navbar from "../landingNew/navbar";
import logo from '../assets/image.png'
import imgVar from '../assets/image_variations_icon.jpg';
import astro from '../assets/vedic-astrology.png';
import outfitmatch from '../assets/outfit_matching_icon.jpg';
import setgen from '../assets/set_generator_icon.jpg'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const SketchToDesign: React.FC = () => {
    const location = useLocation();
    const image = location.state?.image || null;
    const sketchDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const styleRef = useRef<HTMLSelectElement>(null);
    const materialRef = useRef<HTMLSelectElement>(null);
    const finishRef = useRef<HTMLSelectElement>(null);
    const ornamentationRef = useRef<HTMLSelectElement>(null);
    const gemstonePreferencesRef = useRef<HTMLInputElement>(null);
    const customizationRequestRef = useRef<HTMLInputElement>(null);

    // Retrieve session_id
    const session_id = localStorage.getItem("sessionId");
    const [isLoading, setIsLoading] = useState(false);

    // Load History from sessionStorage
    const [history, setHistory] = useState<string[]>(() => {
        const savedHistory = session_id ? sessionStorage.getItem(`history_${session_id}`) : null;
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);

    // Save History to sessionStorage when it updates
    useEffect(() => {
        if (session_id) {
            sessionStorage.setItem(`history_${session_id}`, JSON.stringify(history));
        }
    }, [history, session_id]);

    // Function to handle image download
    const handleDownloadImage = () => {
        if (generatedDesign) {
            // Create an anchor element and set properties for download
            const link = document.createElement('a');
            link.href = generatedDesign;
            link.download = `design-${Date.now()}.jpg`; // Set a dynamic filename
            document.body.appendChild(link); // Append to body
            link.click(); // Programmatically click the link to trigger download
            document.body.removeChild(link); // Clean up
        }
    };

    const handleConvertToDesign = async () => {
        console.log("Convert to Design button clicked");
        setIsLoading(true);
        // Retrieve values from form elements
        const sketch_description = sketchDescriptionRef.current?.value || "";
        const style = styleRef.current?.value || "";
        const materialValue = materialRef.current?.value || "";
        const finishValue = finishRef.current?.value || "";
        const ornamentationValue = ornamentationRef.current?.value || "";
        const gemstone_preferences = gemstonePreferencesRef.current?.value || "";
        const special_request = customizationRequestRef.current?.value || "";

        // Retrieve user ID
        const user_id = localStorage.getItem("cognito_username");

        if (!user_id || !session_id) {
            console.error("User ID or Session ID is missing.");
            alert("User session details are missing.");
            return;
        }

        if (!image) {
            console.error("No image available");
            alert("Please provide a sketch image.");
            return;
        }

        try {
            // Convert image to Base64 (if needed)
            const base64Image = image.startsWith("data:image") ? image.split(",")[1] : image;

            // Upload image to AWS API
            const uploadResponse = await fetch(
                "https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id, session_id, image_base64: base64Image }),
                }
            );

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                console.error("Image upload error:", errorData);
                alert(`Image upload failed: ${errorData.message || "Unknown error"}`);
                return;
            }

            const uploadData = await uploadResponse.json();
            console.log("AWS API response:", uploadData);
            const references3url = uploadData.s3_link;
            if (!references3url) {
                alert("Error uploading image. Please try again.");
                return;
            }

            // Prepare payload for sketch-to-design API
            const payload = {
                sketch_description,
                style,
                material: materialValue,
                finish: finishValue,
                ornamentation: ornamentationValue,
                gemstone_preferences,
                special_request,
                references3url,
                init_strength: 0.45,
            };
            console.log("Payload prepared:", payload);

            // Call sketch-to-design API
            const response = await fetch(
                "https://plbpx719zg.execute-api.ap-south-1.amazonaws.com/dev/generate_sketch2design_leonardo",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API response error:", errorData);
                alert(`Error generating design: ${errorData.message || "Unknown error"}`);
                return;
            }

            const data = await response.json();
            console.log("API raw response:", data);

            // Ensure correct property access
            const generatedDesigns = data.generated_designs || data.body?.generated_designs;
            if (generatedDesigns && generatedDesigns.length > 0) {
                const newDesignUrl = generatedDesigns[0];
                console.log("New design URL received ✅:", newDesignUrl);

                // Update history and persist in sessionStorage
                setHistory((prev) => {
                    const updatedHistory = [newDesignUrl, ...prev];
                    sessionStorage.setItem(`history_${session_id}`, JSON.stringify(updatedHistory));
                    return updatedHistory;
                });
                setGeneratedDesign(newDesignUrl);
                await saveGeneratedImages([newDesignUrl]);
            } else {
                alert("Error generating design. Please try again.");
            }

        } catch (err) {
            console.error("Error during API call", err);
            alert("Error during design generation. Check console for details.");
        }
        finally {
            setIsLoading(false);
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
    const demoSectionRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);
    const features = [
        {
            title: 'Image Variation',
            imgSrc: imgVar,
            alt: 'Jewelry set on a wooden plate',
            description: 'Effortlessly create jewelry sets, optimized for your needs with flexibility.',
            link: '/expert-mode/image-variation',
        },
        {
            title: 'Astrology Jwellery',
            imgSrc: astro,
            alt: 'Find your perfect astrology jewelry with personalized astrology guidance.',
            description: 'Find your perfect astrology jewelry with personalized astrology guidance.',
            link: '/expert-mode/astrology',
        },
        {
            title: 'Outfit Matching Jewelry',
            imgSrc: outfitmatch,
            alt: 'Golden picture frame',
            description: 'Perfectly match your jewelry & accessories to the outfit to impress everyone.',
            link: '/expert-mode/.../#',
        },
        {
            title: 'Set Generation',
            imgSrc: setgen,
            alt: 'Astrology chart with a glowing center',
            description: 'Find your perfect astrology jewelry with personalized astrology guidance.',
            link: '/expert-mode/set-generation',
        },
    ];

    return (
        <div className="bg-white flex flex-col items-center min-h-screen">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fullscreen-loader">
                    <div className="generator"></div>
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
            {/* Header Section */}
            <div className="w-[70%] mx-auto bg-[#fffdfa] flex flex-col items-center flex-grow p-6 relative z-10 mt-8 min-h-screen shadow-[4px_4px_4px_rgba(0,0,0,0.1),-4px_-4px_4px_rgba(0,0,0,0.1),4px_-4px_4px_rgba(0,0,0,0.1),-4px_4px_4px_rgba(0,0,0,0.1)]">
                <header className="py-6 text-center w-full">
                    <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                        Sketch to Design
                    </h1>
                    <p className="text-lightGreen mb-6 lg:text-xl">
                        Transform your sketch to jewelry design
                    </p>
                </header>

                {/* Main Content */}
                <div className="w-full max-w-6xl">
                    {/* Layout for medium-sized screens (430x932 < screen size <= 820x1180) */}
                    <div className="lg:hidden">
                        {/* Preview and Controls Section */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Preview Area */}
                            <div className="border-4 rounded-lg p-4 h-[28rem] w-full md:w-[28rem] flex items-center justify-center shadow-md relative">
                                {generatedDesign ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={generatedDesign}
                                            alt="Generated Design"
                                            className="w-full h-full object-contain"
                                        />
                                        <img
                                            src={image}
                                            alt="Sketch Preview"
                                            className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                                        />
                                        {/* Download button */}
                                        <div
                                            className="absolute top-2 right-2 cursor-pointer z-10"
                                            onClick={handleDownloadImage}
                                        >
                                            <img
                                                src={download}
                                                alt="Download"
                                                className="w-8 h-8"
                                            />
                                        </div>
                                    </div>
                                ) : image ? (
                                    <img
                                        src={image}
                                        alt="Sketch Preview"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-500">
                                        Preview Area for Uploaded/Drawn Sketch
                                    </span>
                                )}
                            </div>

                            {/* Controls Section */}
                            <div className="flex flex-col w-full md:w-64">
                                {/* Controls Div */}
                                <div className="controls border-4 rounded-lg p-4 w-full h-[24rem] overflow-y-auto shadow-md">
                                    <h2 className="text-yellow-600 font-bold mb-4">Basic</h2>
                                    <div className="space-y-4 mb-6">
                                        <label
                                            htmlFor="describe-sketch"
                                            className="block text-gray-700 font-bold"
                                        >
                                            Describe the sketch:
                                        </label>
                                        <textarea
                                            id="describe-sketch"
                                            ref={sketchDescriptionRef}
                                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            rows={3}
                                            placeholder="Enter sketch details..."
                                        ></textarea>
                                    </div>

                                    <h2 className="text-yellow-600 font-bold mb-4">
                                        Design Controls
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                label: "Style Preferences",
                                                id: "style-preferences",
                                                options: [
                                                    "Delicate",
                                                    "Traditional",
                                                    "Modern",
                                                    "Ornate",
                                                    "Balance",
                                                ],
                                                ref: styleRef,
                                                required: true,
                                            },
                                            {
                                                label: "Material",
                                                id: "material",
                                                options: ["Gold", "Platinum", "Silver"],
                                                ref: materialRef,
                                                required: true,
                                            },
                                            {
                                                label: "Finish",
                                                id: "finish",
                                                options: ["Matte", "Polished", "Antique"],
                                                ref: finishRef,
                                                required: true,
                                            },
                                            {
                                                label: "Ornamentation",
                                                id: "ornamentation",
                                                options: ["Plain", "Engraved", "Filigree"],
                                                ref: ornamentationRef,
                                                required: true,
                                            },
                                        ].map(({ label, id, options, ref, required }) => (
                                            <div key={id}>
                                                <label
                                                    htmlFor={id}
                                                    className="block text-gray-700 font-bold mb-1"
                                                >
                                                    {label}:
                                                    {required && <span className="text-red-500"> *</span>}
                                                </label>
                                                <select
                                                    id={id}
                                                    ref={ref as React.RefObject<HTMLSelectElement>}
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        Select {label}
                                                    </option>
                                                    {options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                        {[
                                            { label: "Gemstone Preferences", id: "gemstone-preferences", ref: gemstonePreferencesRef },
                                            { label: "Customization Request", id: "customization-request", ref: customizationRequestRef },
                                        ].map(({ label, id, ref }) => (
                                            <div key={id}>
                                                <label
                                                    htmlFor={id}
                                                    className="block text-gray-700 font-bold mb-1"
                                                >
                                                    {label}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={id}
                                                    ref={ref as React.RefObject<HTMLInputElement>}
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    placeholder={`Enter ${label.toLowerCase()}...`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Convert to Design Button */}
                                <button
                                    onClick={handleConvertToDesign}
                                    className="border-2 border-[#e0ae2a] text-[#e0ae2a] font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700 hover:text-white mt-4"
                                >
                                    Convert to Design
                                </button>
                            </div>
                        </div>

                        {/* History Section */}
                        <div className="mt-6 w-full">
                            <h2 className="text-yellow-600 font-bold mb-4">History</h2>
                            <div className="flex overflow-x-auto space-x-4 pb-4">
                                {history.length > 0
                                    ? history.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`History Item ${index + 1}`}
                                            className="w-24 h-24 rounded-md border border-gray-400 shadow-sm flex-shrink-0"
                                        />
                                    ))
                                    : null}
                            </div>
                        </div>
                    </div>

                    {/* Layout for larger screens (>= 14-inch laptops) */}
                    <div className="hidden lg:block">
                        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-8 space-y-6 md:space-y-0 md:space-x-6 mb-12">
                            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                                {/* History Section */}
                                <div className="border-4 rounded-lg p-4 w-52 sm:w-60 md:w-64 h-68 sm:h-96 md:h-[28rem] overflow-y-auto shadow-md flex flex-col items-center">
                                    <h2 className="text-yellow-600 font-bold mb-4">History</h2>
                                    <div className="space-y-4 w-full flex flex-col items-center">
                                        {history.length > 0
                                            ? history.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`History Item ${index + 1}`}
                                                    className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-md border border-gray-400 shadow-sm"
                                                />
                                            ))
                                            : null}
                                    </div>
                                </div>

                                {/* Preview Area */}
                                <div className="border-4 rounded-lg p-4 h-80 sm:h-96 md:h-[28rem] md:w-[28rem] w-72 sm:w-80 md:w-96 flex items-center justify-center shadow-md relative">
                                    {generatedDesign ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={generatedDesign}
                                                alt="Generated Design"
                                                className="w-full h-full object-contain"
                                            />
                                            <img
                                                src={image}
                                                alt="Sketch Preview"
                                                className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                                            />
                                            {/* Download button */}
                                            <div
                                                className="absolute top-2 right-2 cursor-pointer z-10"
                                                onClick={handleDownloadImage}
                                            >
                                                <img
                                                    src={download}
                                                    alt="Download"
                                                    className="w-8 h-8"
                                                />
                                            </div>
                                        </div>
                                    ) : image ? (
                                        <img
                                            src={image}
                                            alt="Sketch Preview"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-500">
                                            Preview Area for Uploaded/Drawn Sketch
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Controls Section */}
                            <div className="outer w-52 sm:w-60 md:w-64 h-80 sm:h-96 md:h-[28rem] flex flex-col">
                                {/* Controls Div */}
                                <div className="controls border-4 rounded-lg p-4 w-full flex-grow overflow-y-auto shadow-md">
                                    <h2 className="text-yellow-600 font-bold mb-4">Basic</h2>
                                    <div className="space-y-4 mb-6">
                                        <label
                                            htmlFor="describe-sketch"
                                            className="block text-gray-700 font-bold"
                                        >
                                            Describe the sketch:
                                        </label>
                                        <textarea
                                            id="describe-sketch"
                                            ref={sketchDescriptionRef}
                                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            rows={3}
                                            placeholder="Enter sketch details..."
                                        ></textarea>
                                    </div>

                                    <h2 className="text-yellow-600 font-bold mb-4">
                                        Design Controls
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                label: "Style Preferences",
                                                id: "style-preferences",
                                                options: [
                                                    "Delicate",
                                                    "Traditional",
                                                    "Modern",
                                                    "Ornate",
                                                    "Balance",
                                                ],
                                                ref: styleRef,
                                                required: true,
                                            },
                                            {
                                                label: "Material",
                                                id: "material",
                                                options: ["Gold", "Platinum", "Silver"],
                                                ref: materialRef,
                                                required: true,
                                            },
                                            {
                                                label: "Finish",
                                                id: "finish",
                                                options: ["Matte", "Polished", "Antique"],
                                                ref: finishRef,
                                                required: true,
                                            },
                                            {
                                                label: "Ornamentation",
                                                id: "ornamentation",
                                                options: ["Plain", "Engraved", "Filigree"],
                                                ref: ornamentationRef,
                                                required: true,
                                            },
                                        ].map(({ label, id, options, ref, required }) => (
                                            <div key={id}>
                                                <label
                                                    htmlFor={id}
                                                    className="block text-gray-700 font-bold mb-1"
                                                >
                                                    {label}:
                                                    {required && <span className="text-red-500"> *</span>}
                                                </label>
                                                <select
                                                    id={id}
                                                    ref={ref as React.RefObject<HTMLSelectElement>}
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>
                                                        Select {label}
                                                    </option>
                                                    {options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                        {[
                                            { label: "Gemstone Preferences", id: "gemstone-preferences", ref: gemstonePreferencesRef },
                                            { label: "Customization Request", id: "customization-request", ref: customizationRequestRef },
                                        ].map(({ label, id, ref }) => (
                                            <div key={id}>
                                                <label
                                                    htmlFor={id}
                                                    className="block text-gray-700 font-bold mb-1"
                                                >
                                                    {label}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={id}
                                                    ref={ref as React.RefObject<HTMLInputElement>}
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    placeholder={`Enter ${label.toLowerCase()}...`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Convert to Design Button */}
                                <button
                                    onClick={handleConvertToDesign}
                                    className="border-2 border-[#e0ae2a] text-[#e0ae2a] font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700 hover:text-white mt-4"
                                >
                                    Convert to Design
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <footer className="bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8 min-w-full">
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
    );
};

export default SketchToDesign;