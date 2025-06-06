import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";
// import vid from '../assets/LandingPageVideo.mp4';
import home_image from '../assets/home_image.png';

const HeroSection: React.FC = () => {
  const [isTinyScreen, setIsTinyScreen] = useState(false);
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSize = () => {
      setIsTinyScreen(window.innerWidth < 500 && window.innerHeight < 1050);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => {
        console.warn('Autoplay failed:', e);
      });
    }
  }, []);

  const handleDesignStudioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to proceed. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem('redirectTo', '/modes'); // Store path in sessionStorage
          navigate("/login");
        }
      });
    } else {
      navigate("/modes");
    }
  };

  return (
    <section className="relative h-[100vh] overflow-hidden text-white text-center flex flex-col justify-center items-center">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-[1.2] sepia-[0.1]"
        // src={vid}
        src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H2qwMhbkqkzg2flz4/videoblocks-646c7a82cdf8cd05c427ac1b_rrp7owas3__0405133d275c6b206830714a02f00c75__P360.mp4"
      /> */}

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={home_image} // Placeholder image
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
          The AI-powered jewellery design assistant for modern jewellers.
          {/* {user && <span className="text-base italic ml-2">{user.signInDetails?.loginId}</span>} */}
        </p>
        <div className={`${isTinyScreen ? "flex flex-col items-center gap-2" : "space-x-4"}`}>
          <button
            onClick={handleDesignStudioClick}
            className="bg-yellow-500 text-white px-5 py-2 rounded text-lg"
          >
            Try the Design Studio
          </button>
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