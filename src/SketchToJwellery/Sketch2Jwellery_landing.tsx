import React, { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import UploadImg from '../components/ProMode/UploadImg';
import SketchCanvas, { SketchCanvasHandle } from './SketchCanvas';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png'
import setGen from '../assets/set_generator_icon.jpg';
import s2d from '../assets/sketch.png';
import outfitmatch from '../assets/outfit_matching_icon.jpg';
import astro from '../assets/vedic-astrology.png';
import Navbar from '../landingNew/navbar';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';


const SketchToDesign: React.FC = () => {
    const navigate = useNavigate();
    const [isUploadVisible, setUploadVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const sketchRef = useRef<SketchCanvasHandle>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const demoSectionRef = useRef<HTMLDivElement>(null);
    const getSessionId = () => {
        const sessionId = sessionStorage.getItem("sessionId") || localStorage.getItem("sessionId");
        console.log("Retrieved sessionId:", sessionId);
        return sessionId;
    };

    const AddPaddingToBase64 = ({ base64Image, bgColor = "white" }: { base64Image: string; bgColor?: string }): Promise<string> => {
        console.log("Starting AddPaddingToBase64...");
        const img = new Image();
        img.src = base64Image;
        return new Promise<string>((resolve) => {
            img.onload = () => {
                console.log("Image loaded successfully.");
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    console.error("Canvas context is not available. Returning original image.");
                    resolve(base64Image);
                    return;
                }

                const padding = Math.abs(img.width - img.height) / 2;
                const newWidth = img.width + (img.width > img.height ? 0 : padding * 2);
                const newHeight = img.height + (img.height > img.width ? 0 : padding * 2);
                canvas.width = newWidth;
                canvas.height = newHeight;
                console.log("New canvas dimensions:", newWidth, "x", newHeight);

                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, newWidth, newHeight);

                const x = img.width > img.height ? 0 : padding;
                const y = img.height > img.width ? 0 : padding;
                ctx.drawImage(img, x, y);
                console.log("Padding applied:", padding > 0);

                resolve(canvas.toDataURL("image/png"));
            };
        });
    };

    const handleImageSelect = async (imageUrl: string) => {
        console.log("handleImageSelect called with:", imageUrl);
        const paddedImage = await AddPaddingToBase64({ base64Image: imageUrl });
        setUploadedImage(paddedImage);
        setUploadVisible(false);
        console.log("Final Image URL after padding:", paddedImage);
    };

    const handleNext = () => {
        console.log("handleNext clicked.");
        if (!uploadedImage) {
            alert("Please upload or draw a sketch before proceeding.");
            return;
        }
        console.log("Navigating to sketchModification with image:", uploadedImage);
        navigate("sketchModification", { state: { image: uploadedImage } });
    };

    const handleDrawClick = () => {
        console.log("handleDrawClick triggered.");
        setShowModal(true);
    };

    const handleDoneDrawing = async () => {
        console.log("handleDoneDrawing initiated.");
        if (sketchRef.current) {
            const dataUrl = sketchRef.current.getDataUrl();
            console.log("Drawn image captured:", dataUrl);
            const paddedImage = await AddPaddingToBase64({ base64Image: dataUrl });
            setUploadedImage(paddedImage);
            console.log("Padded drawn image stored.");
        }
        setShowModal(false);
    };

    const handleUploadClick = () => {
        console.log("handleUploadClick called.");
        setUploadVisible(true);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log("File input changed.");
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log("File selected:", file.name);
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const base64Image = ev.target?.result as string;
                console.log("Base64 image loaded:", base64Image.substring(0, 30) + "...");
                const paddedImage = await AddPaddingToBase64({ base64Image });
                setUploadedImage(paddedImage);
                console.log("Padded image set in state.");
            };
            reader.readAsDataURL(file);
        }
    };

    const features = [
        {
          title: 'Image Variation',
          imgSrc:
            setGen,
          alt: 'Jewelry set on a wooden plate',
          description: 'Effortlessly create jewelry sets, optimized for your needs with flexibility.',
        },
        {
          title: 'Sketch To Design',
          imgSrc:
            s2d,
          alt: 'Notebook with a sketch of a diamond and a pencil',
          description: 'Effortlessly transform your rough sketches to exquisite jewelry designs.',
        },
        {
          title: 'Outfit Matching Jewelry',
          imgSrc:
            outfitmatch,
          alt: 'Golden picture frame',
          description: 'Perfectly match your jewelry & accessories to the outfit to impress everyone.',
        },
        {
          title: 'Astrology Jewelry',
          imgSrc:
            astro,
          alt: 'Astrology chart with a glowing center',
          description: 'Find your perfect astrology jewelry with personalized astrology guidance.',
        },
      ];
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar onContactClick={() => {
                demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }} />
            {/* Header */}
            <div className="w-[70%] mx-auto bg-[#fffdfa] flex flex-col items-center flex-grow p-6 relative z-10 mt-2">
            <header className="py-6 text-center">
                <h1 className="text-4xl md:text-5xl font-custom font-bold text-lightGolden">
                    Sketch to Design
                </h1>
                <p className="text-lightGreen mb-6 lg:text-xl">
                    Transform your sketch to jewelry design
                </p>
            </header>

            {/* Main content */}
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-6 md:space-y-0">
                    {/* Buttons column */}
                    <div className="inline-block md:-mt-12 md:mb-12 md:mr-16">
                        <div className="flex flex-col items-stretch space-y-3 md:space-y-8 w-72">
                            <button
                                onClick={handleUploadClick}
                                className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md"
                            >
                                Upload a sketch
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <p className="text-black font-semibold text-center">OR</p>
                            <button
                                onClick={handleDrawClick}
                                className="w-full whitespace-nowrap px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-600 rounded-md"
                            >
                                Draw a sketch
                            </button>
                        </div>
                    </div>

                    {/* Image preview column */}
                    <div className="flex flex-col items-center">
                        <div className="
                            border-2 border-yellow-400 
                            w-80 h-80 
                            md:w-96 md:h-96 
                            lg:w-[16rem] lg:h-[16rem] 
                            xl:w-[20rem] xl:h-[20rem] 
                            2xl:w-[28em] 2xl:h-[28rem] 
                            flex items-center justify-center
                        ">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded Sketch" className="w-full h-full object-contain" />
                            ) : (
                                <p className="text-gray-400 text-center">
                                    Uploaded/Drawn Sketch Preview (Placeholder)
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleNext}
                            className="mt-4 md:mt-6 px-8 md:px-10 py-3 md:py-4 bg-yellow-600 text-white rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>

            {/* Upload Image Component - Shows when upload button is clicked */}
            {isUploadVisible && (
                <UploadImg
                    sessionId={getSessionId()}
                    onImageSelect={handleImageSelect}
                    onClose={() => setUploadVisible(false)}
                />
            )}
        </div>
            {/* Modal Popup for Drawing Sketch */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Draw your Sketch</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        {/* SketchCanvas component inside the modal */}
                        <SketchCanvas ref={sketchRef} />
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-yellow-600 text-white rounded"
                                onClick={handleDoneDrawing}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='h-16'></div>
            <div className="w-full bg-gray-100 border-t border-b border-gray-300">
                <div className="py-6 font-custom mx-8">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow text-center border border-orange-200 min-h-[350px] flex flex-col justify-between max-w-[80%] mx-auto"
                                >
                                    <h2 className="text-orange-600 text-lg font-semibold mb-2 bg-orange-100 p-3 rounded-t-2xl">
                                        {feature.title}
                                    </h2>
                                    <div className="flex-grow flex flex-col items-center justify-center px-4">
                                        <img
                                            src={feature.imgSrc}
                                            alt={feature.alt}
                                            width={100}
                                            height={100}
                                            className="mb-8"
                                        />
                                        <p className="text-gray-600 text-base">{feature.description}</p>
                                    </div>
                                </div>
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
    );
};

export default SketchToDesign;