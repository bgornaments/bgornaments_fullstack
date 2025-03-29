// const TermsAndConditions:React.FC = () =>{
//     return(
//         <h1>Terms and conditions</h1>
//     )
// }
// export default TermsAndConditions;

import React from "react";

const TermsAndConditions: React.FC = () => {
    return (
        <>
            <div className="bg-white w-full min-h-screen flex flex-col items-center px-[5vw] py-[5vh]">
                <h1 className="font-custom text-lightGolden text-[3vw] mb-6">
                    Terms & Conditions
                </h1>
                <p className="text-customBlack/50 text-[1.2vw] text-center max-w-3xl leading-relaxed">
                    Welcome to KinMitra. By using our platform, you agree to the following terms and conditions. Please read them carefully.
                </p>
                <div className="mt-8 space-y-6 max-w-3xl">
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">1. Use of Services</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            Our platform provides AI-powered jewelry design tools. You agree to use KinMitra only for lawful purposes and not to misuse our services.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">2. Account Responsibilities</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account and ensuring all activity under your account complies with these terms.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">3. Intellectual Property</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            All designs generated on KinMitra are the property of their respective creators. The platform retains rights to use generated content for promotional purposes.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">4. Limitations of Liability</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            KinMitra is not liable for any direct or indirect damages arising from the use of our platform. Users assume full responsibility for their interactions and transactions.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">5. Modifications to Terms</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            We reserve the right to update these terms at any time. Continued use of KinMitra signifies acceptance of the modified terms.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-[1.5vw] text-lightGolden">6. Contact Us</h2>
                        <p className="text-customBlack/50 text-[1vw] leading-relaxed">
                            If you have any questions regarding these Terms & Conditions, please contact us at ceo@kinmitra.com.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
