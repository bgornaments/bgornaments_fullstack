import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [isTinyScreen, setIsTinyScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsTinyScreen(window.innerWidth < 500 && window.innerHeight < 1050);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <section className="relative h-[100vh] overflow-hidden text-white text-center flex flex-col justify-center items-center">
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
        <h1 className="text-6xl font-bold mb-6 font-custom">Design Smarter. Create Faster.</h1>
        <p className="max-w mx-auto text-gray-200 text-xl mb-10">
          The AI-powered design studio for modern jewelry designers.
        </p>
        <div className={`${isTinyScreen ? "flex flex-col items-center gap-2" : "space-x-4"}`}>
          <Link to="/modes">
            <button className="bg-yellow-500 text-white px-5 py-2 rounded text-lg">Try the Design Studio</button>
          </Link>
          <a
            href="https://qflpgffwo9.execute-api.us-east-1.amazonaws.com/prod/redirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded text-lg">See Video</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
