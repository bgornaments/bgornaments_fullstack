import React from "react";
import goldBG from "../../../assets/Gold Leaf background.jpg";
const UserDetails: React.FC = () => {
    return (
        <div className="border-2 border-[#E0AE2A] relative mx-auto bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
                    {/* Banner and Profile Section */}
                    <div className="banner-container relative w-full h-[15vh] sm:h-[15vh] md:h-[20vh] lg:h-[30vh] bg-cover bg-no-repeat bg-center rounded-t-xl"
                        style={{
                            backgroundImage: `url(${goldBG})`,
                        }}>
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="relative flex justify-center items-center w-full h-full">
                            <div className="profile-image w-[20%] sm:w-[15%] md:w-[15%] lg:w-[20%] aspect-square bg-gray-300 rounded-full border-4 border-[#E0AE2A] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=489&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Details Section (unchanged) */}
                    <div className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 bg-gray-150">
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">Username</span>
                            <span className="font-bold text-gray-800">username</span>
                        </div>
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">Email</span>
                            <span className="font-bold text-gray-800">email@example.com</span>
                        </div>
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">Subscription</span>
                            <span className="font-bold text-gray-800">Premium</span>
                        </div>
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">Mobile Number</span>
                            <span className="font-bold text-gray-800">+91 1234567890</span>
                        </div>
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">Account Type</span>
                            <span className="font-bold text-gray-800">Manufacturer</span>
                        </div>
                        <div className="flex flex-col items-center bg-[#E0AE2A] p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <span className="font-semibold text-white">GSTIN</span>
                            <span className="font-bold text-gray-800">GST123456789</span>
                        </div>
                    </div>
                </div>
    );
};

export default UserDetails;
