/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// interface Button {
//   text: string;
//   value: string;
// }

const SetGen: React.FC = () => {
  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
        }}
      ></div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        {/* Left Section: Logo and Name */}
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

        {/* Right Section: User Icon */}
        <img
          className="w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-3xl font-bold text-[#585858] mb-4">
          Welcome to Pro Mode
        </h1>
        <p className="text-lg text-[#7a7a7a]">
          Experience the best user interface with seamless performance!
        </p>
        <button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] text-white font-semibold rounded-lg shadow-lg hover:opacity-90"
          onClick={() => alert('Button clicked!')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SetGen;
