import React, { useState } from "react";

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { question: "What is KinMitra?", answer: "KinMitra is a platform designed for jewellery designers to easily create personalized designs." },
    { question: "How can I sign up?", answer: "Click on the Sign Up button on the homepage and follow the steps to create your account." },
  ];

  
  return (
    <div className="mt-12 mb-12 flex flex-col items-center px-4">
      <h2 className="font-custom text-4xl md:text-5xl text-[#e0ae2a] text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl">
        If you can't find an answer you're looking for, feel free to drop us a line.
      </p>

      <section className="w-full max-w-4xl space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-[#F8F8F8] rounded-xl p-4 shadow-md">
            <button
              type="button"
              onClick={() => toggleQuestion(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Faqs;
