import React from 'react';
import step1 from "/src/assets/step1.png";
import step2 from "/src/assets/step2.png";
import step3 from "/src/assets/step3.png";

const PersonalizedDesignSection: React.FC = () => {
  return (
    <section className="text-center py-12 font-serif">
      <h2 className="text-4xl font-bold mb-12 text-[#e0ae2a] font-custom text-5xl">
        Personalised Design Made Easy
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12 px-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            // src="https://storage.googleapis.com/a1aa/image/eVXiQw98MZad6YcOtEjXYGNR3T6xQg3ko7c6mGL2P6c.jpg"
            src={step1}
            alt="Custom Designs"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Custom Designs Just for You.
          </h3>
          <p className="text-gray-600">
            {/* Leverage AI to create personalized jewellery designs tailored to your unique style. Answer a few questions and let AI do the rest. */}
            Answer a few questions and let KinMitra craft your unique style.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            // src="https://storage.googleapis.com/a1aa/image/ShklPBgaQqD95r8-XiXf9_HLKSufnszVLGBwkklUlg8.jpg"
            src={step2}
            alt="Interactive Design"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Interactive Design Process.
          </h3>
          <p className="text-gray-600">
            {/* Share your preferences by answering a few simple questions, and our AI will generate initial jewellery design concepts for you. */}
            {/* Share your preferences, and KinMitra will create personalized jewellery concepts. */}
            Share preferences, and KinMitra will craft personalized jewellery.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            // src="https://storage.googleapis.com/a1aa/image/0ZmeRP-t3G7iUN4BMUkj3ZYJIN2cv3xlxfVvu4e6lWI.jpg"
            src={step3}
            alt="Tailored Designs"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Tailored to Your Taste.
          </h3>
          <p className="text-gray-600">
            {/* Our AI will ask additional questions to refine the designs, ensuring the final pieces match your unique style and preferences. */}
            KinMitra will refine the designs to perfectly match your style.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDesignSection;
