{/*With navigations*/}
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import logo from "/src/assets/image.png";
import certImage from "/src/assets/cert.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

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
    <div className="px-0 font-custom">
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
          <img src={logo} alt="KinMitra Logo" />
        </div>
      </section>

      {/* Header */}
      <header className="flex justify-between items-center py-6 border-b-2 border-gray-200 text-xl font-custom">
        <div className="flex items-center space-x-2 pl-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-40" />
          </Link>
        </div>
        <nav className="flex space-x-6 text-xl font-custom">
          <Link to="/" className="font-custom">Home</Link>
          <Link to="/catalog" className="font-custom">AI Designs</Link>
          <Link to="/" className="font-custom">Pricing</Link>
          <Link to="/Contact-Us" className="font-custom">Contact Us</Link>
        </nav>
        <Link to="/login">
          <button className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded text-xl font-custom mr-8">Log In</button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden text-white text-center flex flex-col justify-center items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-[1.2] sepia-[0.1]"
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H2qwMhbkqkzg2flz4/videoblocks-646c7a82cdf8cd05c427ac1b_rrp7owas3__0405133d275c6b206830714a02f00c75__P360.mp4"
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 90%)',
          }}
        />
        <div className="relative z-20 px-4">
          <h1 className="text-5xl font-bold mb-6 font-custom">Design Smarter. Create Faster.</h1>
          <p className="max-w-md mx-auto text-gray-200 text-2xl mb-6 font-custom">
            KinMitra revolutionizes the design journey with intelligent tools that help you ideate, visualize, and refine your creations — all in one place.
          </p>
          <div className="space-x-4">
            <Link to="/modes">
              <button className="bg-yellow-500 text-white px-5 py-2 rounded text-xl font-custom">Try the Design Studio</button>
            </Link>
            <a 
              href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded text-xl font-custom">See Video</button>
            </a>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="bg-[#FFFBF6] py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          <div className="md:w-1/2 px-8">
            <h2 className="text-3xl md:text-5xl font-custom text-darkGolden mb-6">Proudly Recognized by the Government of India</h2>
            <p className="text-2xl text-gray-700 mb-6 font-custom">
              We are proud to be officially recognized by the Government of India as an innovative brand, reflecting our commitment to preserving culture and driving industry progress.
              This recognition underscores our dedication to innovation and impact.
            </p>
            <a
              href="https://recognition-be.startupindia.gov.in/s3/download/document/RECOGNITION_CERTIFICATE/c9c3cdf7-e66a-431e-8444-f8335f384985.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-yellow-500 text-white px-5 py-2 rounded text-xl font-custom">View Certificate</button>
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

      {/* Book a Demo Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto border border-yellow-500 rounded-lg p-1">
          <div className="flex flex-col md:flex-row border border-yellow-500 rounded-lg overflow-hidden">
            {/* Left Panel */}
            <div className="md:w-1/2 bg-[#F8F8F8] p-6 space-y-4">
              <h3 className="text-2xl font-semibold font-custom">Book a Demo</h3>
              <p className="text-xl text-gray-700 font-custom">Book a free demo to explore features tailored to you. Get expert guidance.</p>
              <div className="text-sm">
                <p className='text-lg font-custom'>📞 +91 (931) 008-5981</p>
                <p className='text-lg font-custom'>✉️ ceo@kinmitra.com</p>
                <div className="flex space-x-4 mt-4 text-xl">
                  <a href="https://linkedin.com/company/bgornaments" target="_blank" rel="noopener noreferrer">🔗</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
                  <a href="https://instagram.com/kinmitra_com" target="_blank" rel="noopener noreferrer">📸</a>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:w-1/2 p-6 bg-white space-y-4">
              <div className="flex space-x-2">
                <input type="text" placeholder="First Name" className="w-1/2 border px-3 py-2 text-sm rounded" />
                <input type="text" placeholder="Last Name" className="w-1/2 border px-3 py-2 text-sm rounded" />
              </div>
              <input type="text" placeholder="Phone Number" className="w-full border px-3 py-2 text-sm rounded" />
              <input type="email" placeholder="Email" className="w-full border px-3 py-2 text-sm rounded" />
              <textarea placeholder="Write your message..." className="w-full border px-3 py-2 text-sm rounded h-24" />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded text-xl font-custom">Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FEFAF5] rounded-tl-[50px] rounded-br-lg p-6" style={{ width: 'calc(100% - 100px)', margin: '0 auto' }}>
            <div className="max-w-4xl mx-auto rounded-tl-[40px] p-8 bg-white shadow">
              <h4 className="text-2xl font-semibold mb-6 font-custom">Subscribe to get the latest jewelry trends, style tips, and exclusive offers from KinMitra.</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 border px-4 py-3 rounded-l text-sm"
                />
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-r text-xl font-custom">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><Link className="text-gray-600 hover:text-gray-800 text-xl font-custom" to="/">Home</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-xl font-custom" to="/catalog">AI Design</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-xl font-custom" to="/">Pricing</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-xl font-custom" to="/Contact-Us">Contact Us</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-800 text-xl font-custom" to="/">Our Work</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-800 font-bold mb-4 text-2xl font-custom">Support</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 text-xl font-custom">+91 (835) 608-5861</li>
                <li className="text-gray-600 text-xl font-custom">ceo@kinmitra.com</li>
              </ul>
              <div className="mt-4">
                <a href="/privacy-Notice" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-lg font-custom block">Privacy Notice</a>
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-lg font-custom block mt-1">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
          Copyright © 2025
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;