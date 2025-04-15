import React from 'react';

const PersonalizedDesignSection: React.FC = () => {
  return (
    <section className="bg-[#fefaf2] text-center py-12 font-serif">
      <h2 className="text-4xl font-bold mb-12 text-[#e0ae2a] font-custom text-5xl">
        Personalised Design Made Easy
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12 px-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://storage.googleapis.com/a1aa/image/eVXiQw98MZad6YcOtEjXYGNR3T6xQg3ko7c6mGL2P6c.jpg"
            alt="Custom Designs"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Custom Designs Just for You.
          </h3>
          <p className="text-gray-600">
            Leverage AI to create personalized jewellery designs tailored to your unique style. Answer a few questions and let AI do the rest.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://storage.googleapis.com/a1aa/image/ShklPBgaQqD95r8-XiXf9_HLKSufnszVLGBwkklUlg8.jpg"
            alt="Interactive Design"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Interactive Design Process.
          </h3>
          <p className="text-gray-600">
            Share your preferences by answering a few simple questions, and our AI will generate initial jewellery design concepts for you.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://storage.googleapis.com/a1aa/image/0ZmeRP-t3G7iUN4BMUkj3ZYJIN2cv3xlxfVvu4e6lWI.jpg"
            alt="Tailored Designs"
            width={100}
            height={100}
            className="mb-4 rounded"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Tailored to Your Taste.
          </h3>
          <p className="text-gray-600">
            Our AI will ask additional questions to refine the designs, ensuring the final pieces match your unique style and preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDesignSection;
