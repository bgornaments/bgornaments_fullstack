import React from "react";

const SketchToDesign: React.FC = () => {
    return (
        <div className="bg-white flex flex-col items-center min-h-screen">
            {/* Header Section */}
            <header className="py-6 text-center w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-600">Sketch to Design</h1>
                <p className="text-base sm:text-lg md:text-xl text-green-600 mt-2">Transform your sketches into stunning jewellery</p>
            </header>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-8 space-y-6 md:space-y-0 md:space-x-6 mb-12">
                <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                    {/* History Section */}
                    <div className="border border-yellow-600 rounded-lg p-4 w-52 sm:w-60 md:w-64 h-68 sm:h-96 md:h-[28rem] overflow-y-auto shadow-md flex flex-col items-center">
                        <h2 className="text-yellow-600 font-bold mb-4">History</h2>
                        <div className="space-y-4 w-full flex flex-col items-center">
                            {[237, 238, 239, 240, 241, 242, 243, 244].map((id, index) => (
                                <img
                                    key={index}
                                    src={`https://picsum.photos/id/${id}/100/100`}
                                    alt={`History Item ${index + 1}`}
                                    className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-md border border-gray-400 shadow-sm"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="border border-yellow-600 rounded-lg p-4 h-80 sm:h-96 md:h-[28rem] md:w-[28rem] w-72 sm:w-80 md:w-96 flex items-center justify-center bg-gray-200 shadow-md">
                        <span className="text-gray-500">Preview Area for Uploaded/Drawn Sketch</span>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="border border-yellow-600 rounded-lg p-4 w-52 sm:w-60 md:w-64 h-80 sm:h-96 md:h-[28rem] overflow-y-auto shadow-md">
                    <h2 className="text-yellow-600 font-bold mb-4">Basic</h2>
                    <div className="space-y-4 mb-6">
                        <label htmlFor="describe-sketch" className="block text-gray-700 font-bold">Describe the sketch:</label>
                        <textarea
                            id="describe-sketch"
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows={3}
                            placeholder="Enter sketch details..."
                        ></textarea>
                    </div>

                    <h2 className="text-yellow-600 font-bold mb-4">Design Controls</h2>
                    <div className="space-y-4">
                        {[
                            { label: "Style Preferences", id: "style-preferences", options: ["Delicate", "Traditional", "Modern", "Ornate", "Balance"] },
                            { label: "Material", id: "material", options: ["Gold", "Platinum", "Silver"] },
                            { label: "Finish", id: "finish", options: ["Matte", "Polished", "Antique"] },
                            { label: "Ornamentation", id: "ornamentation", options: ["Plain", "Engraved", "Filigree"] },
                        ].map(({ label, id, options }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-gray-700 font-bold mb-1">{label}:</label>
                                <select id={id} className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option value="" disabled selected>Select {label}</option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        {[
                            { label: "Gemstone Preferences", id: "gemstone-preferences" },
                            { label: "Customization Request", id: "customization-request" },
                        ].map(({ label, id }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-gray-700 font-bold mb-1">{label}:</label>
                                <input type="text" id={id} className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder={`Enter ${label.toLowerCase()}...`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Convert to Design Button */}
            <button className="bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700 mt-4">
                Convert to Design
            </button>
        </div>
    );
};

export default SketchToDesign;
