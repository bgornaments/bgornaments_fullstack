import React from "react";

const Privacy: React.FC = () => {
    return (
        <>
            <div className="bg-white w-full min-h-screen flex flex-col items-center px-[5vw] py-[5vh]">
                {/* Main Heading */}
                <h1 className="font-custom text-lightGolden text-5xl sm:text-5xl md:text-5xl mb-6 text-center">
                    Privacy Policy
                </h1>

                {/* Intro Paragraph */}
                <p className="text-customBlack/50 text-[4vw] sm:text-[2.5vw] md:text-[1.2vw] text-center max-w-3xl leading-relaxed mb-10">
                    At KinMitra, we value your privacy. This Privacy Policy explains how we
                    collect, use, and protect your information when you use our platform.
                </p>

                {/* Sections */}
                <div className="mt-8 space-y-6 max-w-3xl w-full px-2">
                    <div>
                        <h2 className="font-bold text-lightGolden text-[5vw] sm:text-[3vw] md:text-[1.2vw] text-left">
                            Information We Collect
                        </h2>
                        <p className="text-customBlack/50 text-[3.5vw] sm:text-[2.2vw] md:text-[1vw] leading-relaxed text-left">
                            We may collect personal details such as your name, email, and
                            login information to provide a better experience.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lightGolden text-[5vw] sm:text-[3vw] md:text-[1.2vw] text-left">
                            How We Use Your Information
                        </h2>
                        <p className="text-customBlack/50 text-[3.5vw] sm:text-[2.2vw] md:text-[1vw] leading-relaxed text-left">
                            Your information is used to enhance your experience, provide
                            personalized recommendations, and ensure smooth platform
                            operations.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lightGolden text-[5vw] sm:text-[3vw] md:text-[1.2vw] text-left">
                            Data Protection
                        </h2>
                        <p className="text-customBlack/50 text-[3.5vw] sm:text-[2.2vw] md:text-[1vw] leading-relaxed text-left">
                            We implement security measures to protect your data and do not
                            share it with third parties without your consent.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-lightGolden text-[5vw] sm:text-[3vw] md:text-[1.2vw] text-left">
                            Contact Us
                        </h2>
                        <p className="text-customBlack/50 text-[3.5vw] sm:text-[2.2vw] md:text-[1vw] leading-relaxed text-left">
                            If you have any questions about our Privacy Policy, feel free to
                            contact us at ceo@kinmitra.com.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Privacy;
