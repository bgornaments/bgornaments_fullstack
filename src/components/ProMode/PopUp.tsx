// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PopUp: React.FC<{ onClose: () => void, onProceed: (selectedImage: string) => void }> = ({ onClose, onProceed }) => {

//   const imageUrls = Array.from({ length: 50 }, (_, index) => `https://picsum.photos/id/${index + 1}/200/300`);

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const navigate = useNavigate();

//   const handleImageClick = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//     console.log('Selected Image:', imageUrl);  // Log the latest selected image
//   };

//   // Handle Proceed button click
//   const handleProceed = () => {
//     if (selectedImage) {
//       console.log('Proceeding with selected image:', selectedImage); // Log the selected image before proceeding
//       onProceed(selectedImage);  // Send selected image to parent

//       // Navigate back to the main page and pass selected image via state
//       navigate('/', { state: { selectedImage } });
//       onClose();  // Close the popup
//     } else {
//       alert('Please select an image before proceeding.');
//     }
//   };

//   return (
//     <div className="flex-1 min-h-screen pb-[15vh] relative overflow-hidden">
//       {/* Background */}
//       <div
//         className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
//         style={{
//           backgroundImage:
//             "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
//         }}
//       ></div>

//       {/* Navigation Bar */}
//       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
//         <div className="name flex-col items-center gap-3">
//           <h2 className="text-xl">
//             <img
//               src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
//               alt="Kinmitra Logo"
//               className="h-5"
//             />
//           </h2>
//           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
//             Pro Mode
//           </p>
//         </div>
//         <img
//           className="w-[50px] rounded-full cursor-pointer"
//           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
//           alt="User Icon"
//         />
//       </div>

//       {/* Popup */}
//       <div className="fixed inset-0 bg-white bg-opacity-20 flex justify-center items-center z-40 overflow-hidden">
//         <div className="rounded-lg p-5 max-w-[80%] max-h-[80%] overflow-y-auto scroll-hidden z-30">
//           <button
//             className="absolute top-2 right-2 text-black text-lg cursor-pointer"
//             onClick={onClose}
//           >
//             ✖
//           </button>
//           <div className="grid grid-cols-4 gap-4">
//             {imageUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`Random ${index + 1}`}
//                 className={`w-full h-auto rounded-md shadow-sm cursor-pointer ${selectedImage === url ? 'border-4 border-blue-500' : ''}`}
//                 onClick={() => handleImageClick(url)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer with action buttons */}
//       <div
//         className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between w-full px-10 z-50 pointer-events-auto"
//       >
//         <button
//           className="h-10 w-48 bg-[#123456] text-white rounded-lg cursor-pointer"
//           onClick={() => {
//             console.log('Back to Chat clicked');
//             onClose(); // Close the popup
//           }}
//         >
//           Back to Chat
//         </button>
//         <button
//           className="h-10 w-60 bg-[#123456] text-white rounded-lg cursor-pointer"
//           onClick={handleProceed}
//         >
//           Proceed with Selected Image
//         </button>
//       </div>

//       {/* Add the CSS to hide scrollbar but still allow scrolling */}
//       <style>
//         {`
//           .scroll-hidden::-webkit-scrollbar {
//             display: none;
//           }
//           .scroll-hidden {
//             -ms-overflow-style: none;  /* IE and Edge */
//             scrollbar-width: none; /* Firefox */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default PopUp;

import React, { useState } from 'react';

const PopUp: React.FC<{ onClose: () => void, onProceed: (selectedImage: string) => void }> = ({ onClose, onProceed }) => {

    const imageUrls = Array.from({ length: 50 }, (_, index) => `https://picsum.photos/id/${index + 1}/200/300`);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        console.log('Selected Image:', imageUrl);  // Log the latest selected image
    };

    // Handle Proceed button click
    const handleProceed = () => {
        if (selectedImage) {
            console.log('Proceeding with selected image:', selectedImage);
            onProceed(selectedImage); // Send selected image to the parent
            onClose(); // Close the popup
        } else {
            alert('Please select an image before proceeding.');
        }
    };    

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            {/* Popup Box */}
            <div className="bg-white p-4 rounded-lg w-[90%] md:w-[60%] max-h-[80%] overflow-y-auto relative z-50">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-black text-lg cursor-pointer"
                    onClick={onClose}
                >
                    ✖
                </button>

                {/* Image Grid with padding */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-2 mb-16">
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Random ${index + 1}`}
                            className={`w-full h-auto rounded-md shadow-sm cursor-pointer ${selectedImage === url ? 'border-4 border-blue-500' : ''}`}
                            onClick={() => handleImageClick(url)}
                        />
                    ))}
                </div>

                {/*Action Buttons Inside Popup */}
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-around w-full gap-5 px-5">
                    <button
                        className="h-10 w-48 bg-[#f59699] text-white rounded-lg cursor-pointer text-sm"
                        onClick={onClose}
                    >
                        Back to Chat
                    </button>
                    <button
                        className="h-10 w-60 bg-[#f59699] text-white rounded-lg cursor-pointer text-sm"
                        onClick={handleProceed}
                    >
                        Proceed with Selected Image
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PopUp;
