import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from "/src/assets/image.png";
import certImage from "/src/assets/cert.png";
import homepageimg1 from '/src/assets/homepageImg1.jpg';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
const LandingPage: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const text = intro.querySelector<HTMLDivElement>(".intro-text");
    if (!text) return;

    const tl = gsap.timeline();

    requestAnimationFrame(() => {
      tl.to(text, {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.in",
        willChange: "transform, opacity",
      }).to(intro, {
        opacity: 0,
        duration: 2,
        pointerEvents: "none",
        onComplete: () => {
          intro.style.display = "none";
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="px-0">
      {/* Intro Animation Overlay */}
      <section
        ref={introRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        <div
          className="intro-text"
          style={{
            fontSize: "8vw",
            fontWeight: 800,
            color: "#e0ae2a",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <img src={logo} alt="" />
        </div>
      </section>

      {/* Header */}
      <header className="flex justify-between items-center py-6 border-b-2 border-gray-200 text-lg font-custom">
        <div className="flex items-center space-x-2 pl-8 text-lg font-custom">
          <img src={logo} alt="Logo" className="w-40" />
        </div>
        <nav className="flex space-x-6 text-lg font-custom">
          <a href="#" className='font-custom text-xl'>Home</a>
          <a href="#" className='font-custom text-xl'>AI Designs</a>
          <a href="#" className='font-custom text-xl'>Pricing</a>
          <a href="#" className='font-custom text-xl'>Contact Us</a>
        </nav>
        <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-lg font-custom mr-8">Log In</button>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white pt-32 pb-32 text-lg font-custo"
        style={{ backgroundImage: `url(${homepageimg1})` }}
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.9) 90%)',
          }}
        />
        <div className="relative z-20 text-white text-center flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-5xl font-custom">Design Smarter. Create Faster.</h1>
          <p className="max-w-md text-gray-200 mb-6 text-xl font-custom">
            KinMitra revolutionizes the design journey with intelligent tools that help you ideate, visualize, and refine your creations — all in one place.
          </p>
          <div className="space-x-4">
            <button className="bg-yellow-500 text-white px-5 py-2 rounded text-lg font-custom">Try the Design Studio</button>
            <button className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded text-lg font-custom">See Video</button>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="bg-[#FFFBF6] py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          <div className="md:w-1/2 px-8">
            <h2 className="text-5xl font-custom text-darkGolden mb-6 font-custom">
              Proudly Recognized by the Government of India
            </h2>
            <p className="text-xl text-black-200 mb-8 font-custom">
              We are proud to be officially recognized by the Government of India as an innovative brand, reflecting our commitment to preserving culture and driving industry progress.
              This recognition underscores our dedication to innovation and impact.
            </p>
            <a
              href="https://recognition-be.startupindia.gov.in/s3/download/document/RECOGNITION_CERTIFICATE/c9c3cdf7-e66a-431e-8444-f8335f384985.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-yellow-500 text-white px-5 py-2 rounded text-base font-custom">
                View Certificate
              </button>
            </a>
          </div>
          <div className="md:w-1/2 px-8">
            <img
              src={certImage}
              alt="Certificate"
              className="rounded shadow"
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#f8f8f8] py-8 text-sm text-gray-600 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <img src={logo} alt="Company Logo" className="mb-4 w-40" />
            <p className="text-center md:text-left mb-4 font-custom text-xl">
              Your Style, Our Craftsmanship — Together,
              <br />
              We Sparkle with Elegance.
            </p>
            <div className="flex space-x-4 text-lg">
              <a className="text-gray-600 hover:text-gray-800" href="#"><FaFacebookF /></a>
              <a className="text-gray-600 hover:text-gray-800" href="#"><FaTwitter /></a>
              <a className="text-gray-600 hover:text-gray-800" href="#"><FaInstagram /></a>
              <a className="text-gray-600 hover:text-gray-800" href="#"><FaLinkedinIn /></a>
              <a className="text-gray-600 hover:text-gray-800" href="#"><FaYoutube /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-16 text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <h3 className="text-gray-800 font-bold mb-4 font-custom text-2xl">Company</h3>
              <ul className="space-y-2">
                <li><a className="text-gray-600 hover:text-gray-800 font-custom text-xl" href="#">Home</a></li>
                <li><a className="text-gray-600 hover:text-gray-800 font-custom text-xl" href="#">AI Design</a></li>
                <li><a className="text-gray-600 hover:text-gray-800 font-custom text-xl" href="#">Pricing</a></li>
                <li><a className="text-gray-600 hover:text-gray-800 font-custom text-xl" href="#">Contact Us</a></li>
                <li><a className="text-gray-600 hover:text-gray-800 font-custom text-xl" href="#">Our Work</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-800 font-bold mb-4 font-custom text-2xl">Support</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 font-custom text-xl">+91 (835) 608-5861</li>
                <li className="text-gray-600 font-custom text-xl">ceo@kinmitra.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
          Copyright © 2025 - KinMitra: A Bharat Gold Ornaments Product
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
