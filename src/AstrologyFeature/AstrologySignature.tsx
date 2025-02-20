import React from "react";

const AstrologySignature: React.FC = () => {
    return (
        <div className="main min-h-screen p-4 sm:p-8 rounded-lg shadow-lg text-center max-w-full flex flex-col justify-center items-center">
            <div className="header absolute top-0 left-0 right-0 p-4 sm:p-8 text-center z-20 mb-4">
                <h1 className="text-yellow-600 text-xl sm:text-2xl font-bold mb-2 lg:text-4xl drop-shadow-[0px_0px_16px_rgba(224,174,42,1.0)]">
                    Astrology Based Jewellery
                </h1>
            </div>
            <div className="astro-signature flex sm:flex-row justify-center items-center ml-4 sm:ml-14 mr-4 sm:mr-14 mt-16 sm:mt-16">
                <div className="astro-signature-left-part contentHeading flex-[0.3] ml-2 sm:ml-4 mr-2 sm:mr-1 screen-lg:ml-8 screen-lg:mr-4 border-2 border-[#e0ae2a] rounded-md p-4 bg-[#F1E7D4] mb-4 mt-4">
                    <strong>
                        Your <br />Astrology <br />Signature
                    </strong>
                </div>
                <div className="astro-signature-right-part contentBody flex-[0.7] ml-2 sm:ml-1 mr-2 sm:mr-4 screen-lg:mr-8 screen-lg:ml-4 border-2 border-[#e0ae2a] rounded-md p-4 text-left">
                    “You are a Taurus (Sun) with a Pisces Moon. Your ruling planet is Venus.”
                    <br />
                    “Your element is Earth, so you resonate with natural, grounding stones.”
                </div>
            </div>
            <br />
            <div className="astro-suggestions flex sm:flex-row justify-center items-center ml-4 sm:ml-14 mr-4 sm:mr-14">
                <div className="astro-suggestions-left-part contentHeading flex-[0.3] ml-2 sm:ml-4 mr-2 sm:mr-1 screen-lg:ml-8 screen-lg:mr-4 border-2 border-[#e0ae2a] rounded-md p-4 bg-[#F1E7D4] mb-4 mt-4">
                    <strong>
                        Astrology <br />Based <br />Suggestions
                    </strong>
                </div>
                <div className="astro-suggestions-right-part contentBody flex-[0.7] ml-2 sm:ml-1 mr-2 sm:mr-4 screen-lg:mr-8 screen-lg:ml-4 border-2 border-[#e0ae2a] rounded-md p-4 text-left">
                    💎 Recommended Gemstone: Emerald
                    <br />
                    🔗 Metal Choice: Gold
                    <br />
                    🔶 Design Style: Elegant, smooth curves
                    <br />
                    ✨ Engraving Suggestion: “Taurus Symbol” or “Venus Yantra”
                </div>
            </div>
            <div className="text-box border-2 border-[#e0ae2a] rounded-md p-4 mt-8 bg-[#F1E7D4] relative overflow-hidden shadow-2xl transition-[background-position_0s_ease] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-[linear-gradient(45deg,transparent_25%,rgba(224,174,42,0.3)_50%,transparent_75%,transparent_100%)]">
                <h2>
                    💎💎💎 Let’s get your astrologically aligned jewelry 💎💎💎
                </h2>
            </div>

            <div className="jewellery-type mt-4">
                <select id="jewelleryType" className="border-2 border-[#e0ae2a] rounded-md p-2">
                    <option value="" disabled selected>Select Jewellery Type</option>
                    <option value="ring">Ring</option>
                    <option value="earrings">Earrings</option>
                    <option value="necklace">Necklace</option>
                    <option value="pendant">Pendant</option>
                </select>
            </div>
            <div className="view-design">
                <button className="border-2 border-[#e0ae2a] rounded-xl m-4 p-2 bg-[#F1E7D4]">View Design</button>
            </div>
        </div>
    );
};

export default AstrologySignature;