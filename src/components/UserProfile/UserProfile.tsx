import React, { useState } from "react";
import UserDetails from "./components/UserDetails";
import PromoDetails from "./components/PromoCards";
import ImagePopup from "./ImagePopup";
import "./UserProfile.css";
import YourUploads from "../../assets/c9be35cc-78ed-47f0-a66e-a633d662ccd8_image_0.png";
import YourGenerated from "../../assets/db514319-ffd0-4fb9-b31f-3c973a6477d1_image_0.png";

const UserProfile: React.FC = () => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<"uploaded" | "generated" | null>(null);

    // Function to fetch uploaded images (loaded once on mount)
    const fetchUploadedImages = async () => {
        const cognitoUserId = localStorage.getItem("cognito_username") || "default-user-id";

        try {
            console.log("Fetching uploaded images...");
            const response = await fetch(
                "https://6587blymh2.execute-api.ap-south-1.amazonaws.com/default/userUploadedImages",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: cognitoUserId }),
                }
            );
            const data = await response.json();
            console.log("Uploaded Images Response:", data);

            if (data.images && Array.isArray(data.images)) {
                setUploadedImages(data.images);
            } else {
                console.error("Unexpected API response:", data);
                setUploadedImages([]);
            }
        } catch (error) {
            console.error("Error fetching uploaded images:", error);
            setUploadedImages([]);
        }
    };

    // Function to fetch generated images (called only on click)
    const fetchGeneratedImages = async () => {
        const cognitoUserId = localStorage.getItem("cognito_username") || "default-user-id";
        const apiUrl = `https://1ih5vdayz5.execute-api.us-east-1.amazonaws.com/test/image?CognitoUserID=${cognitoUserId}`;

        console.log("Fetching generated images from:", apiUrl);

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("Generated Images API Response:", data);

            if (data.S3Links && Array.isArray(data.S3Links)) {
                setGeneratedImages(data.S3Links);
            } else {
                console.error("Unexpected API response:", data);
                setGeneratedImages([]);
            }
        } catch (error) {
            console.error("Error fetching generated images:", error);
            setGeneratedImages([]);
        }
    };

    return (
        <div className="user-profile-container">
            {/* Header Section */}
            <div className="header">
                <div className="name">
                    <h2>
                        <img
                            src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
                            alt="Kinmitra Logo"
                            className="logo"
                        />
                    </h2>
                    <p className="tagline">
                        By <b>BGO</b>
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <UserDetails />
                <PromoDetails />
            </div>

            {/* Centered line with 60% width */}
            <div className="divider-line"></div>

            {/* Next components aligned responsively */}
            <div className="flex flex-wrap justify-center gap-4 mt-16 px-4">
                {/* Your Uploaded Images Card */}
                <div
                    className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A] cursor-pointer"
                    onClick={() => {
                        setPopupType("uploaded");
                        fetchUploadedImages();
                        setIsPopupOpen(true);
                    }}
                >
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src={YourUploads}
                            alt="Your Uploaded Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center">
                            Your Uploaded Images
                        </h1>
                    </div>
                </div>

                {/* Your Generated Images Card */}
                <div
                    className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A] cursor-pointer"
                    onClick={() => {
                        setPopupType("generated");
                        fetchGeneratedImages();
                        setIsPopupOpen(true);
                    }}
                >
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src={YourGenerated}
                            alt="Your Generated Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center">
                            Your Generated Images
                        </h1>
                    </div>
                </div>
            </div>

            {/* Image Popup */}
            {isPopupOpen && (
                <ImagePopup
                    images={popupType === "uploaded" ? uploadedImages : generatedImages}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
};

export default UserProfile;
