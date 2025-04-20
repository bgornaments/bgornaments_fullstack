import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";
import vid from '../assets/LandingPageVideo.mp4';

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
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-[1.2] sepia-[0.1]"
        src={vid}
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