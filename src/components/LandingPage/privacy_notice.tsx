// const PrivacyNotice:React.FC = () =>{
//     return(
//         <h1>Privacy Notice</h1>
//     )
// }
// export default PrivacyNotice;

import React from "react";

const Privacy: React.FC = () => {
    return (
        <>
            <div className="bg-white w-full min-h-screen flex flex-col items-center px-[5vw] py-[5vh]">
                <h1 className="font-custom text-lightGolden text-[3vw] mb-6">
                    Privacy Policy
                </h1>
                <p className="text-customBlack/50 text-[1.2vw] text-center max-w-3xl leading-relaxed">
                    At KinMitra, we value your privacy. This Privacy Policy explains how we
                    collect, use, and protect your information when you use our platform.
                </p>
                <div className="mt-8 space-y-6 max-w-3xl">
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">Information We Collect</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            We may collect personal details such as your name, email, and
                            login information to provide a better experience.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">How We Use Your Information</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            Your information is used to enhance your experience, provide
                            personalized recommendations, and ensure smooth platform
                            operations.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">Data Protection</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            We implement security measures to protect your data and do not
                            share it with third parties without your consent.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">Contact Us</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
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
