import React from "react";
import goldBG from "../../assets/GoldLeafBackground.jpg";

const ProfileSection: React.FC = () => {
    return (
        <div className="banner-container relative w-full h-[15vh] sm:h-[15vh] md:h-[20vh] lg:h-[30vh] bg-cover bg-no-repeat bg-center rounded-t-xl"
            style={{ backgroundImage: `url(${goldBG})` }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative flex justify-center items-center w-full h-full">
                <div className="profile-image w-[20%] sm:w-[15%] md:w-[15%] lg:w-[20%] aspect-square bg-gray-300 rounded-full border-4 border-[#E0AE2A] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=489&auto=format&fit=crop"
                        alt="User Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
