import React, { useState, useEffect } from 'react';
import { Lightbulb, Target, Puzzle, Globe, Smartphone, Clock } from "lucide-react";
import logo from "/src/assets/image.png";

interface FeatureCircleProps {
  icon: JSX.Element;
  text: string;
  textSize: string;
  containerSize: string;
}

const FeatureCircle: React.FC<FeatureCircleProps> = ({ icon, text, textSize, containerSize }) => (
  <div className={`flex flex-col items-center text-center ${containerSize}`}>
    <div className="text-yellow-500 mb-1">{icon}</div>
    <p className={`text-black ${textSize}`}>{text}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsSmallScreen(width < 1000 && height < 1200);
      setIsVerySmallScreen(width < 500 && height < 1100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconSize = isVerySmallScreen ? 28 : isSmallScreen ? 36 : 40;
  const textSizeClass = isVerySmallScreen ? "text-sm" : isSmallScreen ? "text-base" : "text-lg";
  const featureCircleWidth = isVerySmallScreen ? "w-20" : "w-24";

  // Update the container size for very small screens to reduce the radius
  const circleContainerSize = isVerySmallScreen
    ? "w-[280px] h-[280px] my-4 mx-auto"
    : isSmallScreen
      ? "w-[420px] h-[420px] my-8 mx-auto"
      : "w-[500px] h-[500px]";

  return (
    <section className="py-20 bg-white relative overflow-hidden px-8">
      <div
        className={`max-w-7xl mx-auto flex ${isSmallScreen ? "flex-col items-center" : "flex-col md:flex-row items-center"}`}
      >
        {/* Left Column */}
        <div className={`${isSmallScreen ? "text-center" : "md:w-1/2 text-left"}`}>
          <h2 className={`text-5xl font-semibold text-[#e0ae2a] mb-6 font-custom tracking-wide leading-tight ${isSmallScreen ? "mx-auto" : "lg:ml-16"}`}>
            Designed for Jewellery Designers
          </h2>
          <p className={`text-gray-700 max-w-lg mb-8 text-xl mt-6 ${isSmallScreen ? "mx-auto text-center" : "text-center md:text-left lg:ml-16"}`}>
            KinMitra is your AI co-designer, helping you craft stunning jewellery designs faster than ever.
          </p>
          <p className={`text-gray-700 max-w-lg mb-0 text-xl ${isSmallScreen ? "mx-auto text-center" : "text-center md:text-left lg:ml-16"}`}>
            Revolutionize your creative journey with KinMitra's intelligent jewellery design tools to ideate, visualize, and refine your creations — all in one place.
          </p>
        </div>

        {/* Right Column */}
        <div className={`${isSmallScreen ? "mt-10 mb-4" : "md:w-1/2 flex justify-end lg:mr-16"}`}>
          <div className={`relative ${circleContainerSize}`}>
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Lightbulb size={iconSize} />}
                    text="AI-Driven Creativity"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
              <div className="absolute top-[25%] right-[-5px] -translate-y-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Target size={iconSize} />}
                    text="Effortless Personalization"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
              <div className="absolute bottom-[25%] right-[-5px] translate-y-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Smartphone size={iconSize} />}
                    text="Mobile Friendly"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Globe size={iconSize} />}
                    text="Web Software"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
              <div className="absolute bottom-[25%] left-[-5px] translate-y-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Puzzle size={iconSize} />}
                    text="Synthesizable Designs"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
              <div className="absolute top-[25%] left-[-5px] -translate-y-1/2">
                <div className="animate-counter-spin">
                  <FeatureCircle
                    icon={<Clock size={iconSize} />}
                    text="Trend Innovation"
                    textSize={textSizeClass}
                    containerSize={featureCircleWidth}
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={logo}
                alt="KinMitra Logo"
                className={`object-contain ${isVerySmallScreen ? "w-20 h-16" : isSmallScreen ? "w-28 h-24" : "w-36 h-28"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
