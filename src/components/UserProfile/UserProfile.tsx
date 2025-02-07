// import React from "react";
// import UserDetails from './components/UserDetails';
// import PromoDetails from './components/PromoCards';
// import "./UserProfile.css";

// const UserProfile: React.FC = () => {
//     return (
//         <div className="relative min-h-screen p-4">
//             {/* Header Section (unchanged) */}
//             <div className="absolute top-4 left-4 z-10 text-white font-serif">
//                 <div className="name flex flex-col items-center gap-1">
//                     <h2 className="text-xl">
//                         <img
//                             src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
//                             alt="Kinmitra Logo"
//                             className="h-5"
//                         />
//                     </h2>
//                     <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
//                         By <b>BGO</b>
//                     </p>
//                 </div>
//             </div>

//             <div className="main border-2 mt-16 pl-5 pb-5 border-[#E0AE2A] p-5 rounded-xl">
//                 <UserDetails/>
//                 <PromoDetails/>
//             </div>

//             {/* Centered line with 60% width */}
//             <div className="line mx-auto w-[60%] border-t-2 border-[#E0AE2A] mt-8"></div>

//             {/* Next components aligned responsively */}
//             <div className="next-components mt-16 flex flex-col sm:flex-row gap-4">
//                 <div className="your-images shadow border">
//                     <div className="h-1/3 w-full "> {/* when hovered on the image getss zommed in a bit inside the div only without overflow */}
//                         <img src="" alt="your images" />
//                     </div>
//                     <div className="h-2/3 w-full">
//                         <h1>Your Images</h1>
//                     </div>  
//                 </div>
//                 <div className="generated-images shadow border">
//                     <div className="h-1/3 w-full"> {/* when hovered on the image getss zommed in a bit inside the div only without overflow */}
//                         <img src="" alt="generated images" />
//                     </div>
//                     <div className="h-2/3 w-full">
//                         <h1>Generated Images</h1>
//                     </div>  
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
import React from "react";
import UserDetails from './components/UserDetails';
import PromoDetails from './components/PromoCards';
import "./UserProfile.css";
import YourUploads from '../../assets/c9be35cc-78ed-47f0-a66e-a633d662ccd8_image_0.png';
import YourGenerated from '../../assets/db514319-ffd0-4fb9-b31f-3c973a6477d1_image_0.png';

const UserProfile: React.FC = () => {
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
                <div className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A]">
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src={YourUploads}
                            alt="Your Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center">
                            Your Uploaded Images
                        </h1>
                    </div>
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 animate-glow pointer-events-none"></div>
                </div>

                {/* Your Previous Orders */}
                <div className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A]">
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src="https://www.shutterstock.com/image-vector/purchase-history-vector-icon-symbol-260nw-1766837960.jpg"
                            alt="Your Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center p-4">
                            Your Previous Orders
                        </h1>
                    </div>
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 animate-glow pointer-events-none"></div>
                </div>

                {/* Your Generated Images Card */}
                <div className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A]">
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src={YourGenerated}
                            alt="Your Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center">
                            Your Generated Images
                        </h1>
                    </div>
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 animate-glow pointer-events-none"></div>
                </div>

                {/* Designs you may like */}
                <div className="group relative flex flex-col items-center justify-center w-[200px] h-[300px] md:w-[250px] md:h-[375px] rounded-xl overflow-hidden border-2 border-[#E0AE2A] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#E0AE2A]">
                    <div className="w-full h-1/2 overflow-hidden p-4">
                        <img
                            src="https://design4users.com/wp-content/uploads/2020/09/images_in_ui_illustration_tubik.jpg"
                            alt="Your Images"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-[#6B5B3E]"
                        />
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center">
                        <h1 className="text-lg md:text-xl font-bold text-[#E0AE2A] text-center p-4">
                            Designs you may like
                        </h1>
                    </div>
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 animate-glow pointer-events-none"></div>
                </div>
            </div>

        </div>
    );
};

export default UserProfile;