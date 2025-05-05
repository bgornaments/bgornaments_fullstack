import React, { useState, useEffect } from "react";

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Debug: Log when Faqs component mounts
  useEffect(() => {
    console.log('Faqs component mounted');
  }, []);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { question: "What is KinMitra?", answer: "KinMitra is an AI-powered platform that helps you design personalized jewelry based on your client's style and preferences — all through a simple and interactive process." },
    // { question: "How can I sign up?", answer: "Click on the Sign Up button on the homepage and follow the steps to create your account." },
    { question: "Is KinMitra free to use?", answer: "You can start with a 3-day free trial to explore our design features and see what KinMitra can do for you." },

    { question: "How do I activate the free trial?", answer: "Click the 'Free Trial' button in the navigation bar. If you're not logged in, you’ll be prompted to log in or sign up first." },
    { question: "What happens after the 3-day trial ends?", answer: "After the trial, access to KinMitra may be limited. Join the waitlist to stay informed, request extended access, and get early feature updates." },
    { question: "Why should I join the waitlist?", answer: "Joining the waitlist helps you stay connected and ensures you don’t miss early feature launches, extended access opportunities, or pricing updates." },
    { question: "Can I join the waitlist during my trial?", answer: "Yes! You can join at any time — during or after the trial. Just submit 'Join the Waitlist' form on the website." }
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
                className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
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