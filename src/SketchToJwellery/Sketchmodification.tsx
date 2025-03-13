import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SketchToDesign: React.FC = () => {
    const location = useLocation();
    const image = location.state?.image || null;
    const sketchDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const styleRef = useRef<HTMLSelectElement>(null);
    const materialRef = useRef<HTMLSelectElement>(null);
    const finishRef = useRef<HTMLSelectElement>(null);
    const ornamentationRef = useRef<HTMLSelectElement>(null);
    const gemstonePreferencesRef = useRef<HTMLInputElement>(null);
    const customizationRequestRef = useRef<HTMLInputElement>(null);

    // Retrieve session_id
    const session_id = localStorage.getItem("sessionId");

    // Load History from sessionStorage
    const [history, setHistory] = useState<string[]>(() => {
        const savedHistory = session_id ? sessionStorage.getItem(`history_${session_id}`) : null;
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);

    // Save History to sessionStorage when it updates
    useEffect(() => {
        if (session_id) {
            sessionStorage.setItem(`history_${session_id}`, JSON.stringify(history));
        }
    }, [history, session_id]);

    const handleConvertToDesign = async () => {
        console.log("Convert to Design button clicked");

        // Retrieve values from form elements
        const sketch_description = sketchDescriptionRef.current?.value || "";
        const style = styleRef.current?.value || "";
        const materialValue = materialRef.current?.value || "";
        const finishValue = finishRef.current?.value || "";
        const ornamentationValue = ornamentationRef.current?.value || "";
        const gemstone_preferences = gemstonePreferencesRef.current?.value || "";
        const special_request = customizationRequestRef.current?.value || "";

        // Retrieve user ID
        const user_id = localStorage.getItem("cognito_username");

        if (!user_id || !session_id) {
            console.error("User ID or Session ID is missing.");
            alert("User session details are missing.");
            return;
        }

        if (!image) {
            console.error("No image available");
            alert("Please provide a sketch image.");
            return;
        }

        try {
            // Convert image to Base64 (if needed)
            const base64Image = image.startsWith("data:image") ? image.split(",")[1] : image;

            // Upload image to AWS API
            const uploadResponse = await fetch(
                "https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id, session_id, image_base64: base64Image }),
                }
            );

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                console.error("Image upload error:", errorData);
                alert(`Image upload failed: ${errorData.message || "Unknown error"}`);
                return;
            }

            const uploadData = await uploadResponse.json();
            console.log("AWS API response:", uploadData);
            const references3url = uploadData.s3_link;
            if (!references3url) {
                alert("Error uploading image. Please try again.");
                return;
            }

            // Prepare payload for sketch-to-design API
            const payload = {
                sketch_description,
                style,
                material: materialValue,
                finish: finishValue,
                ornamentation: ornamentationValue,
                gemstone_preferences,
                special_request,
                references3url,
                init_strength: 0.45,
            };
            console.log("Payload prepared:", payload);

            // Call sketch-to-design API
            const response = await fetch(
                "https://plbpx719zg.execute-api.ap-south-1.amazonaws.com/dev/generate_sketch2design_leonardo",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API response error:", errorData);
                alert(`Error generating design: ${errorData.message || "Unknown error"}`);
                return;
            }

            const data = await response.json();
            console.log("API raw response:", data);

            // Ensure correct property access
            const generatedDesigns = data.generated_designs || data.body?.generated_designs;
            if (generatedDesigns && generatedDesigns.length > 0) {
                const newDesignUrl = generatedDesigns[0];
                console.log("New design URL received ✅:", newDesignUrl);

                // Update history and persist in sessionStorage
                setHistory((prev) => {
                    const updatedHistory = [newDesignUrl, ...prev];
                    sessionStorage.setItem(`history_${session_id}`, JSON.stringify(updatedHistory));
                    return updatedHistory;
                });
                setGeneratedDesign(newDesignUrl); // Set the generated design
            } else {
                alert("Error generating design. Please try again.");
            }

        } catch (err) {
            console.error("Error during API call", err);
            alert("Error during design generation. Check console for details.");
        }
    };

    return (
        <div className="bg-white flex flex-col items-center min-h-screen p-4">
            {/* Header Section */}
            <header className="py-6 text-center w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-600">
                    Sketch to Design
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-green-600 mt-2">
                    Transform your sketches into stunning jewellery
                </p>
            </header>

            {/* Main Content */}
            <div className="w-full max-w-6xl">
                {/* Layout for medium-sized screens (430x932 < screen size <= 820x1180) */}
                <div className="lg:hidden">
                    {/* Preview and Controls Section */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Preview Area */}
                        <div className="border-2 border-yellow-600 rounded-lg p-4 h-[28rem] w-full md:w-[28rem] flex items-center justify-center shadow-md">
                            {generatedDesign ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={generatedDesign}
                                        alt="Generated Design"
                                        className="w-full h-full object-contain"
                                    />
                                    <img
                                        src={image}
                                        alt="Sketch Preview"
                                        className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            ) : image ? (
                                <img
                                    src={image}
                                    alt="Sketch Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-gray-500">
                                    Preview Area for Uploaded/Drawn Sketch
                                </span>
                            )}
                        </div>

                        {/* Controls Section */}
                        <div className="flex flex-col w-full md:w-64">
                            {/* Controls Div */}
                            <div className="controls border border-yellow-600 rounded-lg p-4 w-full h-[24rem] overflow-y-auto shadow-md">
                                <h2 className="text-yellow-600 font-bold mb-4">Basic</h2>
                                <div className="space-y-4 mb-6">
                                    <label
                                        htmlFor="describe-sketch"
                                        className="block text-gray-700 font-bold"
                                    >
                                        Describe the sketch:
                                    </label>
                                    <textarea
                                        id="describe-sketch"
                                        ref={sketchDescriptionRef}
                                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                        placeholder="Enter sketch details..."
                                    ></textarea>
                                </div>

                                <h2 className="text-yellow-600 font-bold mb-4">
                                    Design Controls
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            label: "Style Preferences",
                                            id: "style-preferences",
                                            options: [
                                                "Delicate",
                                                "Traditional",
                                                "Modern",
                                                "Ornate",
                                                "Balance",
                                            ],
                                            ref: styleRef,
                                            required: true,
                                        },
                                        {
                                            label: "Material",
                                            id: "material",
                                            options: ["Gold", "Platinum", "Silver"],
                                            ref: materialRef,
                                            required: true,
                                        },
                                        {
                                            label: "Finish",
                                            id: "finish",
                                            options: ["Matte", "Polished", "Antique"],
                                            ref: finishRef,
                                            required: true,
                                        },
                                        {
                                            label: "Ornamentation",
                                            id: "ornamentation",
                                            options: ["Plain", "Engraved", "Filigree"],
                                            ref: ornamentationRef,
                                            required: true,
                                        },
                                    ].map(({ label, id, options, ref, required }) => (
                                        <div key={id}>
                                            <label
                                                htmlFor={id}
                                                className="block text-gray-700 font-bold mb-1"
                                            >
                                                {label}:
                                                {required && <span className="text-red-500"> *</span>}
                                            </label>
                                            <select
                                                id={id}
                                                ref={ref as React.RefObject<HTMLSelectElement>}
                                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select {label}
                                                </option>
                                                {options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                    {[
                                        { label: "Gemstone Preferences", id: "gemstone-preferences", ref: gemstonePreferencesRef },
                                        { label: "Customization Request", id: "customization-request", ref: customizationRequestRef },
                                    ].map(({ label, id, ref }) => (
                                        <div key={id}>
                                            <label
                                                htmlFor={id}
                                                className="block text-gray-700 font-bold mb-1"
                                            >
                                                {label}:
                                            </label>
                                            <input
                                                type="text"
                                                id={id}
                                                ref={ref as React.RefObject<HTMLInputElement>}
                                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder={`Enter ${label.toLowerCase()}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Convert to Design Button */}
                            <button
                                onClick={handleConvertToDesign}
                                className="bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700 mt-4"
                            >
                                Convert to Design
                            </button>
                        </div>
                    </div>

                    {/* History Section */}
                    <div className="mt-6 w-full">
                        <h2 className="text-yellow-600 font-bold mb-4">History</h2>
                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {history.length > 0
                                ? history.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`History Item ${index + 1}`}
                                        className="w-24 h-24 rounded-md border border-gray-400 shadow-sm flex-shrink-0"
                                    />
                                ))
                                : null}
                        </div>
                    </div>
                </div>

                {/* Layout for larger screens (>= 14-inch laptops) */}
                <div className="hidden lg:block">
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center mt-8 space-y-6 md:space-y-0 md:space-x-6 mb-12">
                        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
                            {/* History Section */}
                            <div className="border border-yellow-600 rounded-lg p-4 w-52 sm:w-60 md:w-64 h-68 sm:h-96 md:h-[28rem] overflow-y-auto shadow-md flex flex-col items-center">
                                <h2 className="text-yellow-600 font-bold mb-4">History</h2>
                                <div className="space-y-4 w-full flex flex-col items-center">
                                    {history.length > 0
                                        ? history.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`History Item ${index + 1}`}
                                                className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-md border border-gray-400 shadow-sm"
                                            />
                                        ))
                                        : null}
                                </div>
                            </div>

                            {/* Preview Area */}
                            <div className="border-2 border-yellow-600 rounded-lg p-4 h-80 sm:h-96 md:h-[28rem] md:w-[28rem] w-72 sm:w-80 md:w-96 flex items-center justify-center shadow-md">
                                {generatedDesign ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={generatedDesign}
                                            alt="Generated Design"
                                            className="w-full h-full object-contain"
                                        />
                                        <img
                                            src={image}
                                            alt="Sketch Preview"
                                            className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </div>
                                ) : image ? (
                                    <img
                                        src={image}
                                        alt="Sketch Preview"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-500">
                                        Preview Area for Uploaded/Drawn Sketch
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Controls Section */}
                        <div className="outer w-52 sm:w-60 md:w-64 h-80 sm:h-96 md:h-[28rem] flex flex-col">
                            {/* Controls Div */}
                            <div className="controls border border-yellow-600 rounded-lg p-4 w-full flex-grow overflow-y-auto shadow-md">
                                <h2 className="text-yellow-600 font-bold mb-4">Basic</h2>
                                <div className="space-y-4 mb-6">
                                    <label
                                        htmlFor="describe-sketch"
                                        className="block text-gray-700 font-bold"
                                    >
                                        Describe the sketch:
                                    </label>
                                    <textarea
                                        id="describe-sketch"
                                        ref={sketchDescriptionRef}
                                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                        placeholder="Enter sketch details..."
                                    ></textarea>
                                </div>

                                <h2 className="text-yellow-600 font-bold mb-4">
                                    Design Controls
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            label: "Style Preferences",
                                            id: "style-preferences",
                                            options: [
                                                "Delicate",
                                                "Traditional",
                                                "Modern",
                                                "Ornate",
                                                "Balance",
                                            ],
                                            ref: styleRef,
                                            required: true,
                                        },
                                        {
                                            label: "Material",
                                            id: "material",
                                            options: ["Gold", "Platinum", "Silver"],
                                            ref: materialRef,
                                            required: true,
                                        },
                                        {
                                            label: "Finish",
                                            id: "finish",
                                            options: ["Matte", "Polished", "Antique"],
                                            ref: finishRef,
                                            required: true,
                                        },
                                        {
                                            label: "Ornamentation",
                                            id: "ornamentation",
                                            options: ["Plain", "Engraved", "Filigree"],
                                            ref: ornamentationRef,
                                            required: true,
                                        },
                                    ].map(({ label, id, options, ref, required }) => (
                                        <div key={id}>
                                            <label
                                                htmlFor={id}
                                                className="block text-gray-700 font-bold mb-1"
                                            >
                                                {label}:
                                                {required && <span className="text-red-500"> *</span>}
                                            </label>
                                            <select
                                                id={id}
                                                ref={ref as React.RefObject<HTMLSelectElement>}
                                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select {label}
                                                </option>
                                                {options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                    {[
                                        { label: "Gemstone Preferences", id: "gemstone-preferences", ref: gemstonePreferencesRef },
                                        { label: "Customization Request", id: "customization-request", ref: customizationRequestRef },
                                    ].map(({ label, id, ref }) => (
                                        <div key={id}>
                                            <label
                                                htmlFor={id}
                                                className="block text-gray-700 font-bold mb-1"
                                            >
                                                {label}:
                                            </label>
                                            <input
                                                type="text"
                                                id={id}
                                                ref={ref as React.RefObject<HTMLInputElement>}
                                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder={`Enter ${label.toLowerCase()}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Convert to Design Button */}
                            <button
                                onClick={handleConvertToDesign}
                                className="bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-700 mt-4"
                            >
                                Convert to Design
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SketchToDesign;