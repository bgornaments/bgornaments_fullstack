// // // // // // // // // // /* eslint-disable @typescript-eslint/no-unused-vars */
// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import UploadImg from './UploadImg';  // Ensure correct import path

// // // // // // // // // // const ImgVar: React.FC = () => {
// // // // // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);  // State to store selected image

// // // // // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // // // // //   if (!sessionId) {
// // // // // // // // // //     alert('Session ID not found. Please refresh the page.');
// // // // // // // // // //   }

// // // // // // // // // //   const handleImageSelect = (imageUrl: string) => {
// // // // // // // // // //     setSelectedImage(imageUrl);  // Update selected image
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="flex-1 min-h-screen pb-[15vh] relative">
// // // // // // // // // //       <div
// // // // // // // // // //         className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-20 z-[-100]"
// // // // // // // // // //         style={{
// // // // // // // // // //           backgroundImage:
// // // // // // // // // //             "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
// // // // // // // // // //         }}
// // // // // // // // // //       ></div>

// // // // // // // // // //       <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
// // // // // // // // // //         <div className="name flex flex-col items-center gap-1">
// // // // // // // // // //           <h2 className="text-xl">
// // // // // // // // // //             <img
// // // // // // // // // //               src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
// // // // // // // // // //               alt="Kinmitra Logo"
// // // // // // // // // //               className="h-5"
// // // // // // // // // //             />
// // // // // // // // // //           </h2>
// // // // // // // // // //           <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
// // // // // // // // // //             Pro Mode
// // // // // // // // // //           </p>
// // // // // // // // // //         </div>
// // // // // // // // // //         <p>Image Variation</p>
// // // // // // // // // //         <img
// // // // // // // // // //           className="w-[50px] rounded-full"
// // // // // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // // // // //           alt="User Icon"
// // // // // // // // // //         />
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="flex flex-col items-center justify-center text-center mt-10">
// // // // // // // // // //         <div className="flex space-x-20 items-center justify-center w-full">
// // // // // // // // // //           {/* First div - Clickable area for uploading or displaying selected image */}
// // // // // // // // // //           <div
// // // // // // // // // //             className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
// // // // // // // // // //             onClick={() => {
// // // // // // // // // //               if (!selectedImage) {
// // // // // // // // // //                 setIsUploadVisible(true); // Open UploadImg modal when clicked if no image is selected
// // // // // // // // // //               }
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             {selectedImage ? (
// // // // // // // // // //               <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />  // Display selected image
// // // // // // // // // //             ) : (
// // // // // // // // // //               <span className="text-sm text-gray-600">Click to upload</span>  // Display "Click to upload" text
// // // // // // // // // //             )}
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* Second div - Placeholder for Generated Image */}
// // // // // // // // // //           <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
// // // // // // // // // //             <span className="text-sm text-gray-600">Generated Image</span>
// // // // // // // // // //             {/* Add image rendering here */}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {isUploadVisible && (
// // // // // // // // // //         <UploadImg
// // // // // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // // // // //           sessionId={sessionId}
// // // // // // // // // //           onImageSelect={handleImageSelect}  // Pass the callback
// // // // // // // // // //         />
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default ImgVar;
// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // const ImgVar: React.FC = () => {
// // // // // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!sessionId) {
// // // // // // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // // // // // //     }
// // // // // // // // // //   }, [sessionId]);

// // // // // // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // // // // // //       return response.data;
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error(`Error calling Lambda function at ${endpointUrl}:`, error);
// // // // // // // // // //       return {};
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // // // // // //   const handleProcessImage = async () => {
// // // // // // // // // //     if (selectedImage) {
// // // // // // // // // //       const payload = {
// // // // // // // // // //         user_id: 'unknown',
// // // // // // // // // //         session_id: sessionId || '1234567',
// // // // // // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // // // // // //       };

// // // // // // // // // //       console.log("Payload for lambda fxn: ", payload);

// // // // // // // // // //       const response = await callLambda(
// // // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // // // // // //         payload
// // // // // // // // // //       );
// // // // // // // // // //       const s3Link = response.s3_link || '';
// // // // // // // // // //       console.log("Response of lambda fxn: ",response);
// // // // // // // // // //       console.log("Caption Payload: ", s3Link);

// // // // // // // // // //       const captionResponse = await callLambda(
// // // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // // // // // //         { "url": s3Link }
// // // // // // // // // //       );
// // // // // // // // // //       setCaption(captionResponse.caption || '');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // // // // // //         <img
// // // // // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // // // // //           alt="User Icon"
// // // // // // // // // //           className="h-10 w-10 rounded-full"
// // // // // // // // // //         />
// // // // // // // // // //       </header>

// // // // // // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // // // // // //         <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // // // // // //           <div
// // // // // // // // // //             className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // // // // // //             onClick={() => setIsUploadVisible(true)}
// // // // // // // // // //           >
// // // // // // // // // //             {selectedImage ? (
// // // // // // // // // //               <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // // // // // //             ) : (
// // // // // // // // // //               <span className="text-gray-500">Click to Upload</span>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // // // // // //             {variationImages.length > 0 ? (
// // // // // // // // // //               variationImages.map((url, index) => (
// // // // // // // // // //                 <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // // // // // //               ))
// // // // // // // // // //             ) : (
// // // // // // // // // //               <span className="text-gray-500">Generated Image</span>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {selectedImage && !caption && (
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={handleProcessImage}
// // // // // // // // // //             className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // // // // // //           >
// // // // // // // // // //             {loading ? 'Processing...' : 'Generate Caption'}
// // // // // // // // // //           </button>
// // // // // // // // // //         )}

// // // // // // // // // //         {caption && (
// // // // // // // // // //           <div className="mt-6 text-center">
// // // // // // // // // //             <p className="text-gray-600">{caption}</p>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </main>

// // // // // // // // // //       {isUploadVisible && (
// // // // // // // // // //         <UploadImg
// // // // // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // // // // //           sessionId={sessionId}
// // // // // // // // // //           onImageSelect={handleImageSelect}
// // // // // // // // // //         />
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default ImgVar;
// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // // // // import axios from 'axios';

// // // // // // // // // const ImgVar: React.FC = () => {
// // // // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!sessionId) {
// // // // // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // // // // //     }
// // // // // // // // //   }, [sessionId]);

// // // // // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // // // // //       return response.data;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error(`Error calling Lambda function at ${endpointUrl}:`, error);
// // // // // // // // //       return {};
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // // // // //   const handleProcessImage = async () => {
// // // // // // // // //     if (selectedImage) {
// // // // // // // // //       const payload = {
// // // // // // // // //         user_id: 'unknown',
// // // // // // // // //         session_id: sessionId || '1234567',
// // // // // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // // // // //       };

// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // // // // //         payload
// // // // // // // // //       );
// // // // // // // // //       const s3Link = response.s3_link || '';

// // // // // // // // //       const captionResponse = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // // // // //         { url: s3Link }
// // // // // // // // //       );
// // // // // // // // //       setCaption(captionResponse.caption || '');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const fetchModifiableParams = async () => {
// // // // // // // // //     if (caption) {
// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/list_key_modifiable_params',
// // // // // // // // //         { description: caption }
// // // // // // // // //       );
// // // // // // // // //       setModifiableParams(response || []);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const fetchModifications = async () => {
// // // // // // // // //     if (selectedParam) {
// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications',
// // // // // // // // //         { parameter: selectedParam, description: caption }
// // // // // // // // //       );
// // // // // // // // //       setModifications(response || []);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // // // // //         <img
// // // // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // // // //           alt="User Icon"
// // // // // // // // //           className="h-10 w-10 rounded-full"
// // // // // // // // //         />
// // // // // // // // //       </header>

// // // // // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // // // // //         <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // // // // //           <div
// // // // // // // // //             className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // // // // //             onClick={() => setIsUploadVisible(true)}
// // // // // // // // //           >
// // // // // // // // //             {selectedImage ? (
// // // // // // // // //               <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // // // // //             ) : (
// // // // // // // // //               <span className="text-gray-500">Click to Upload</span>
// // // // // // // // //             )}
// // // // // // // // //           </div>

// // // // // // // // //           <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // // // // //             {variationImages.length > 0 ? (
// // // // // // // // //               variationImages.map((url, index) => (
// // // // // // // // //                 <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // // // // //               ))
// // // // // // // // //             ) : (
// // // // // // // // //               <span className="text-gray-500">Generated Image</span>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {selectedImage && !caption && (
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleProcessImage}
// // // // // // // // //             className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // // // // //           >
// // // // // // // // //             {loading ? 'Processing...' : 'Generate Caption'}
// // // // // // // // //           </button>
// // // // // // // // //         )}

// // // // // // // // //         {caption && (
// // // // // // // // //           <div className="mt-6 text-center">
// // // // // // // // //             <p className="text-gray-600 mb-4">{caption}</p>
// // // // // // // // //             <button
// // // // // // // // //               onClick={fetchModifiableParams}
// // // // // // // // //               className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // // // // // //             >
// // // // // // // // //               Fetch Modifiable Parameters
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {modifiableParams.length > 0 && (
// // // // // // // // //           <div className="mt-6">
// // // // // // // // //             <select
// // // // // // // // //               className="border p-2 rounded"
// // // // // // // // //               value={selectedParam || ''}
// // // // // // // // //               onChange={(e) => {
// // // // // // // // //                 setSelectedParam(e.target.value);
// // // // // // // // //                 setModifications([]);
// // // // // // // // //               }}
// // // // // // // // //             >
// // // // // // // // //               <option value="">Select a Parameter</option>
// // // // // // // // //               {modifiableParams.map((param, index) => (
// // // // // // // // //                 <option key={index} value={param}>
// // // // // // // // //                   {param}
// // // // // // // // //                 </option>
// // // // // // // // //               ))}
// // // // // // // // //             </select>
// // // // // // // // //             <button
// // // // // // // // //               onClick={fetchModifications}
// // // // // // // // //               className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // // // // // //               disabled={!selectedParam}
// // // // // // // // //             >
// // // // // // // // //               Fetch Modifications
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {modifications.length > 0 && (
// // // // // // // // //           <div className="mt-6">
// // // // // // // // //             <select
// // // // // // // // //               className="border p-2 rounded"
// // // // // // // // //               value={selectedModification || ''}
// // // // // // // // //               onChange={(e) => setSelectedModification(e.target.value)}
// // // // // // // // //             >
// // // // // // // // //               <option value="">Select a Modification</option>
// // // // // // // // //               {modifications.map((mod, index) => (
// // // // // // // // //                 <option key={index} value={mod}>
// // // // // // // // //                   {mod}
// // // // // // // // //                 </option>
// // // // // // // // //               ))}
// // // // // // // // //             </select>
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </main>

// // // // // // // // //       {isUploadVisible && (
// // // // // // // // //         <UploadImg
// // // // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // // // //           sessionId={sessionId}
// // // // // // // // //           onImageSelect={handleImageSelect}
// // // // // // // // //         />
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ImgVar;
// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // // // // import axios from 'axios';

// // // // // // // // // const ImgVar: React.FC = () => {
// // // // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!sessionId) {
// // // // // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // // // // //     }
// // // // // // // // //   }, [sessionId]);

// // // // // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // // // // //       return response.data;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error(`Error calling Lambda function at ${endpointUrl}:`, error);
// // // // // // // // //       return null;
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // // // // //   const handleProcessImage = async () => {
// // // // // // // // //     if (selectedImage) {
// // // // // // // // //       const payload = {
// // // // // // // // //         user_id: 'unknown',
// // // // // // // // //         session_id: sessionId || '1234567',
// // // // // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // // // // //       };

// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // // // // //         payload
// // // // // // // // //       );

// // // // // // // // //       if (response && response.s3_link) {
// // // // // // // // //         const captionResponse = await callLambda(
// // // // // // // // //           'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // // // // //           { url: response.s3_link }
// // // // // // // // //         );
// // // // // // // // //         setCaption(captionResponse?.caption || '');
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const fetchModifiableParams = async () => {
// // // // // // // // //     if (caption) {
// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/list_key_modifiable_params',
// // // // // // // // //         { description: caption }
// // // // // // // // //       );

// // // // // // // // //       if (response && response.parameters) {
// // // // // // // // //         try {
// // // // // // // // //           // Replace single quotes with double quotes and parse
// // // // // // // // //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// // // // // // // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // // // // // // //           if (Array.isArray(paramsArray)) {
// // // // // // // // //             setModifiableParams(paramsArray);
// // // // // // // // //           } else {
// // // // // // // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // // // // // // //             setModifiableParams([]);
// // // // // // // // //           }
// // // // // // // // //         } catch (err) {
// // // // // // // // //           console.error('Failed to parse parameters:', err);
// // // // // // // // //           setModifiableParams([]);
// // // // // // // // //         }
// // // // // // // // //       } else {
// // // // // // // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // // // // // // //         setModifiableParams([]);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };  


// // // // // // // // //   const fetchModifications = async (selectedParam: string) => {
// // // // // // // // //     if (caption && selectedParam) {
// // // // // // // // //       const response = await callLambda(
// // // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications',
// // // // // // // // //         {
// // // // // // // // //           parameter: selectedParam,
// // // // // // // // //           description: caption,
// // // // // // // // //         }
// // // // // // // // //       );

// // // // // // // // //       if (response && response.suggestions) {
// // // // // // // // //         try {
// // // // // // // // //           // Parse the stringified array in `suggestions`
// // // // // // // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // // // // // // //           if (Array.isArray(suggestionsArray)) {
// // // // // // // // //             setVariationImages(suggestionsArray);
// // // // // // // // //           } else {
// // // // // // // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // // // // // // //             setVariationImages([]);
// // // // // // // // //           }
// // // // // // // // //         } catch (err) {
// // // // // // // // //           console.error('Failed to parse suggestions:', err);
// // // // // // // // //           setVariationImages([]);
// // // // // // // // //         }
// // // // // // // // //       } else {
// // // // // // // // //         console.error('Failed to fetch modifications. Response:', response);
// // // // // // // // //         setVariationImages([]);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };


// // // // // // // // //   return (
// // // // // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // // // // //         <img
// // // // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // // // //           alt="User Icon"
// // // // // // // // //           className="h-10 w-10 rounded-full"
// // // // // // // // //         />
// // // // // // // // //       </header>

// // // // // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // // // // //         {loading && (
// // // // // // // // //           <div className="flex items-center justify-center w-full h-full">
// // // // // // // // //             <video
// // // // // // // // //               src="src\assets\Animation - 1735119904272.mp4"
// // // // // // // // //               autoPlay
// // // // // // // // //               loop
// // // // // // // // //               muted
// // // // // // // // //               className="w-1/3"
// // // // // // // // //             />
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {!loading && (
// // // // // // // // //           <>
// // // // // // // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // // // // //               <div
// // // // // // // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // // // // //                 onClick={() => setIsUploadVisible(true)}
// // // // // // // // //               >
// // // // // // // // //                 {selectedImage ? (
// // // // // // // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // // // // //                 ) : (
// // // // // // // // //                   <span className="text-gray-500">Click to Upload</span>
// // // // // // // // //                 )}
// // // // // // // // //               </div>

// // // // // // // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // // // // //                 {variationImages.length > 0 ? (
// // // // // // // // //                   variationImages.map((url, index) => (
// // // // // // // // //                     <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // // // // //                   ))
// // // // // // // // //                 ) : (
// // // // // // // // //                   <span className="text-gray-500">Generated Image</span>
// // // // // // // // //                 )}
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             {selectedImage && !caption && (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleProcessImage}
// // // // // // // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // // // // //               >
// // // // // // // // //                 Generate Caption
// // // // // // // // //               </button>
// // // // // // // // //             )}

// // // // // // // // //             {caption && (
// // // // // // // // //               <div className="mt-6 text-center">
// // // // // // // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={fetchModifiableParams}
// // // // // // // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // // // // // //                 >
// // // // // // // // //                   Fetch Modifiable Parameters
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             )}

// // // // // // // // //             {modifiableParams.length > 0 && (
// // // // // // // // //               <div className="mt-6">
// // // // // // // // //                 <select
// // // // // // // // //                   className="border p-2 rounded"
// // // // // // // // //                   value={selectedParam || ''}
// // // // // // // // //                   onChange={(e) => {
// // // // // // // // //                     setSelectedParam(e.target.value);
// // // // // // // // //                     setModifications([]);
// // // // // // // // //                   }}
// // // // // // // // //                 >
// // // // // // // // //                   <option value="">Select a Parameter</option>
// // // // // // // // //                   {modifiableParams.map((param, index) => (
// // // // // // // // //                     <option key={index} value={param}>
// // // // // // // // //                       {param}
// // // // // // // // //                     </option>
// // // // // // // // //                   ))}
// // // // // // // // //                 </select>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={fetchModifications}
// // // // // // // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // // // // // //                   disabled={!selectedParam}
// // // // // // // // //                 >
// // // // // // // // //                   Fetch Modifications
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             )}

// // // // // // // // //             {modifications.length > 0 && (
// // // // // // // // //               <div className="mt-6">
// // // // // // // // //                 <select
// // // // // // // // //                   className="border p-2 rounded"
// // // // // // // // //                   value={selectedModification || ''}
// // // // // // // // //                   onChange={(e) => setSelectedModification(e.target.value)}
// // // // // // // // //                 >
// // // // // // // // //                   <option value="">Select a Modification</option>
// // // // // // // // //                   {modifications.map((mod, index) => (
// // // // // // // // //                     <option key={index} value={mod}>
// // // // // // // // //                       {mod}
// // // // // // // // //                     </option>
// // // // // // // // //                   ))}
// // // // // // // // //                 </select>
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //           </>
// // // // // // // // //         )}
// // // // // // // // //       </main>

// // // // // // // // //       {isUploadVisible && (
// // // // // // // // //         <UploadImg
// // // // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // // // //           sessionId={sessionId}
// // // // // // // // //           onImageSelect={handleImageSelect}
// // // // // // // // //         />
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ImgVar;
// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // // // import axios from 'axios';

// // // // // // // // const ImgVar: React.FC = () => {
// // // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!sessionId) {
// // // // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // // // //     }
// // // // // // // //   }, [sessionId]);

// // // // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // // // //     setLoading(true);
// // // // // // // //     console.log('Calling Lambda:', endpointUrl, 'Payload:', payload);

// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // // // //       console.log('Lambda Response:', response.data);
// // // // // // // //       return response.data;
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error(`Error calling Lambda at ${endpointUrl}:`, error);
// // // // // // // //       return null;
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // // // //   const handleProcessImage = async () => {
// // // // // // // //     if (selectedImage) {
// // // // // // // //       const payload = {
// // // // // // // //         user_id: 'unknown',
// // // // // // // //         session_id: sessionId || '1234567',
// // // // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // // // //       };

// // // // // // // //       const response = await callLambda(
// // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // // // //         payload
// // // // // // // //       );

// // // // // // // //       if (response && response.s3_link) {
// // // // // // // //         const captionResponse = await callLambda(
// // // // // // // //           'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // // // //           { url: response.s3_link }
// // // // // // // //         );
// // // // // // // //         setCaption(captionResponse?.caption || '');
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const fetchModifiableParams = async () => {
// // // // // // // //     if (caption) {
// // // // // // // //       const response = await callLambda(
// // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/list_key_modifiable_params',
// // // // // // // //         { description: caption }
// // // // // // // //       );

// // // // // // // //       if (response && response.parameters) {
// // // // // // // //         try {
// // // // // // // //           const fixedJsonString = response.parameters.replace(/'/g, '"').replace(/\s/g, '');
// // // // // // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // // // // // //           if (Array.isArray(paramsArray)) {
// // // // // // // //             setModifiableParams(paramsArray);
// // // // // // // //           } else {
// // // // // // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // // // // // //             setModifiableParams([]);
// // // // // // // //           }
// // // // // // // //         } catch (err) {
// // // // // // // //           console.error('Failed to parse parameters:', err);
// // // // // // // //           setModifiableParams([]);
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // // // // // //         setModifiableParams([]);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const fetchModifications = async (selectedParam: string) => {
// // // // // // // //     if (caption && selectedParam) {
// // // // // // // //       const response = await callLambda(
// // // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications',
// // // // // // // //         {
// // // // // // // //           parameter: selectedParam,
// // // // // // // //           description: caption,
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       if (response && response.suggestions) {
// // // // // // // //         try {
// // // // // // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // // // // // //           if (Array.isArray(suggestionsArray)) {
// // // // // // // //             setVariationImages(suggestionsArray);
// // // // // // // //           } else {
// // // // // // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // // // // // //             setVariationImages([]);
// // // // // // // //           }
// // // // // // // //         } catch (err) {
// // // // // // // //           console.error('Failed to parse suggestions:', err);
// // // // // // // //           setVariationImages([]);
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         console.error('Failed to fetch modifications. Response:', response);
// // // // // // // //         setVariationImages([]);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // // // //         <img
// // // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // // //           alt="User Icon"
// // // // // // // //           className="h-10 w-10 rounded-full"
// // // // // // // //         />
// // // // // // // //       </header>

// // // // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // // // //         {loading && (
// // // // // // // //           <div className="flex items-center justify-center w-full h-full">
// // // // // // // //             {/* <video
// // // // // // // //               src="src/assets/Animation - 1735119904272.mp4"
// // // // // // // //               autoPlay
// // // // // // // //               loop
// // // // // // // //               muted
// // // // // // // //               className="w-1/3"
// // // // // // // //             /> */}
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {!loading && (
// // // // // // // //           <>
// // // // // // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // // // //               <div
// // // // // // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // // // //                 onClick={() => setIsUploadVisible(true)}
// // // // // // // //               >
// // // // // // // //                 {selectedImage ? (
// // // // // // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // // // //                 ) : (
// // // // // // // //                   <span className="text-gray-500">Click to Upload</span>
// // // // // // // //                 )}
// // // // // // // //               </div>

// // // // // // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // // // //                 {variationImages.length > 0 ? (
// // // // // // // //                   variationImages.map((url, index) => (
// // // // // // // //                     <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // // // //                   ))
// // // // // // // //                 ) : (
// // // // // // // //                   <span className="text-gray-500">Generated Image</span>
// // // // // // // //                 )}
// // // // // // // //               </div>
// // // // // // // //             </div>

// // // // // // // //             {selectedImage && !caption && (
// // // // // // // //               <button
// // // // // // // //                 onClick={handleProcessImage}
// // // // // // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // // // //               >
// // // // // // // //                 Generate Caption
// // // // // // // //               </button>
// // // // // // // //             )}

// // // // // // // //             {caption && (
// // // // // // // //               <div className="mt-6 text-center">
// // // // // // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // // // // // //                 <button
// // // // // // // //                   onClick={fetchModifiableParams}
// // // // // // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // // // // //                 >
// // // // // // // //                   Fetch Modifiable Parameters
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {modifiableParams.length > 0 && (
// // // // // // // //               <div className="mt-6">
// // // // // // // //                 <select
// // // // // // // //                   className="border p-2 rounded"
// // // // // // // //                   value={selectedParam || ''}
// // // // // // // //                   onChange={(e) => {
// // // // // // // //                     setSelectedParam(e.target.value);
// // // // // // // //                     setModifications([]);
// // // // // // // //                   }}
// // // // // // // //                 >
// // // // // // // //                   <option value="">Select a Parameter</option>
// // // // // // // //                   {modifiableParams.map((param, index) => (
// // // // // // // //                     <option key={index} value={param}>
// // // // // // // //                       {param}
// // // // // // // //                     </option>
// // // // // // // //                   ))}
// // // // // // // //                 </select>
// // // // // // // //                 <button
// // // // // // // //                   onClick={() => fetchModifications(selectedParam!)}
// // // // // // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // // // // //                   disabled={!selectedParam}
// // // // // // // //                 >
// // // // // // // //                   Fetch Modifications
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {modifications.length > 0 && (
// // // // // // // //               <div className="mt-6">
// // // // // // // //                 <select
// // // // // // // //                   className="border p-2 rounded"
// // // // // // // //                   value={selectedModification || ''}
// // // // // // // //                   onChange={(e) => setSelectedModification(e.target.value)}
// // // // // // // //                 >
// // // // // // // //                   <option value="">Select a Modification</option>
// // // // // // // //                   {modifications.map((mod, index) => (
// // // // // // // //                     <option key={index} value={mod}>
// // // // // // // //                       {mod}
// // // // // // // //                     </option>
// // // // // // // //                   ))}
// // // // // // // //                 </select>
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </main>

// // // // // // // //       {isUploadVisible && (
// // // // // // // //         <UploadImg
// // // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // // //           sessionId={sessionId}
// // // // // // // //           onImageSelect={handleImageSelect}
// // // // // // // //         />
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default ImgVar;
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // // import axios from 'axios';

// // // // // // // const ImgVar: React.FC = () => {
// // // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // // //   useEffect(() => {
// // // // // // //     if (!sessionId) {
// // // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // // //     }
// // // // // // //   }, [sessionId]);

// // // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // // //       return response.data;
// // // // // // //     } catch (error) {
// // // // // // //       console.error(`Error calling Lambda function at ${endpointUrl}:`, error);
// // // // // // //       return null;
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // // //   const handleProcessImage = async () => {
// // // // // // //     if (selectedImage) {
// // // // // // //       const payload = {
// // // // // // //         user_id: 'unknown',
// // // // // // //         session_id: sessionId || '1234567',
// // // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // // //       };

// // // // // // //       const response = await callLambda(
// // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // // //         payload
// // // // // // //       );

// // // // // // //       if (response && response.s3_link) {
// // // // // // //         const captionResponse = await callLambda(
// // // // // // //           'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // // //           { url: response.s3_link }
// // // // // // //         );
// // // // // // //         setCaption(captionResponse?.caption || '');
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const fetchModifiableParams = async () => {
// // // // // // //     if (caption) {
// // // // // // //       const response = await callLambda(
// // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/list_key_modifiable_params',
// // // // // // //         { description: caption }
// // // // // // //       );

// // // // // // //       if (response && response.parameters) {
// // // // // // //         try {
// // // // // // //           // Replace single quotes with double quotes and parse
// // // // // // //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// // // // // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // // // // //           if (Array.isArray(paramsArray)) {
// // // // // // //             setModifiableParams(paramsArray);
// // // // // // //           } else {
// // // // // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // // // // //             setModifiableParams([]);
// // // // // // //           }
// // // // // // //         } catch (err) {
// // // // // // //           console.error('Failed to parse parameters:', err);
// // // // // // //           setModifiableParams([]);
// // // // // // //         }
// // // // // // //       } else {
// // // // // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // // // // //         setModifiableParams([]);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const fetchModifications = async (selectedParam: string) => {
// // // // // // //     if (caption && selectedParam) {
// // // // // // //       console.log("Calling Lambda:", 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications');
// // // // // // //       const payload = {
// // // // // // //         parameter: selectedParam,
// // // // // // //         description: caption,
// // // // // // //       };

// // // // // // //       console.log("Payload:", payload);

// // // // // // //       const response = await callLambda(
// // // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications',
// // // // // // //         payload
// // // // // // //       );

// // // // // // //       console.log("Lambda Response:", response);

// // // // // // //       if (response && response.suggestions) {
// // // // // // //         try {
// // // // // // //           // Parse the stringified array in `suggestions`
// // // // // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // // // // //           if (Array.isArray(suggestionsArray)) {
// // // // // // //             setModifications(suggestionsArray);
// // // // // // //           } else {
// // // // // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // // // // //             setModifications([]);
// // // // // // //           }
// // // // // // //         } catch (err) {
// // // // // // //           console.error('Failed to parse suggestions:', err);
// // // // // // //           setModifications([]);
// // // // // // //         }
// // // // // // //       } else {
// // // // // // //         console.error('Failed to fetch modifications. Response:', response);
// // // // // // //         setModifications([]);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // // //         <img
// // // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // // //           alt="User Icon"
// // // // // // //           className="h-10 w-10 rounded-full"
// // // // // // //         />
// // // // // // //       </header>

// // // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // // //         {loading && (
// // // // // // //           <div className="flex items-center justify-center w-full h-full">
// // // // // // //             <video
// // // // // // //               src="src\assets\Animation - 1735119904272.mp4"
// // // // // // //               autoPlay
// // // // // // //               loop
// // // // // // //               muted
// // // // // // //               className="w-1/3"
// // // // // // //             />
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {!loading && (
// // // // // // //           <>
// // // // // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // // //               <div
// // // // // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // // //                 onClick={() => setIsUploadVisible(true)}
// // // // // // //               >
// // // // // // //                 {selectedImage ? (
// // // // // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // // //                 ) : (
// // // // // // //                   <span className="text-gray-500">Click to Upload</span>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // // //                 {variationImages.length > 0 ? (
// // // // // // //                   variationImages.map((url, index) => (
// // // // // // //                     <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // // //                   ))
// // // // // // //                 ) : (
// // // // // // //                   <span className="text-gray-500">Generated Image</span>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {selectedImage && !caption && (
// // // // // // //               <button
// // // // // // //                 onClick={handleProcessImage}
// // // // // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // // //               >
// // // // // // //                 Generate Caption
// // // // // // //               </button>
// // // // // // //             )}

// // // // // // //             {caption && (
// // // // // // //               <div className="mt-6 text-center">
// // // // // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // // // // //                 <button
// // // // // // //                   onClick={fetchModifiableParams}
// // // // // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // // // //                 >
// // // // // // //                   Fetch Modifiable Parameters
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             )}

// // // // // // //             {modifiableParams.length > 0 && (
// // // // // // //               <div className="mt-6">
// // // // // // //                 <select
// // // // // // //                   className="border p-2 rounded"
// // // // // // //                   value={selectedParam || ''}
// // // // // // //                   onChange={(e) => {
// // // // // // //                     setSelectedParam(e.target.value);
// // // // // // //                     setModifications([]);  // Clear previous modifications
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <option value="">Select a Parameter</option>
// // // // // // //                   {modifiableParams.map((param, index) => (
// // // // // // //                     <option key={index} value={param}>
// // // // // // //                       {param}
// // // // // // //                     </option>
// // // // // // //                   ))}
// // // // // // //                 </select>
// // // // // // //                 <button
// // // // // // //                   onClick={() => fetchModifications(selectedParam || '')}
// // // // // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // // // //                   disabled={!selectedParam}
// // // // // // //                 >
// // // // // // //                   Fetch Modifications
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //             )}

// // // // // // //             {modifications.length > 0 && (
// // // // // // //               <div className="mt-6">
// // // // // // //                 <select
// // // // // // //                   className="border p-2 rounded"
// // // // // // //                   value={selectedModification || ''}
// // // // // // //                   onChange={(e) => setSelectedModification(e.target.value)}
// // // // // // //                 >
// // // // // // //                   <option value="">Select a Modification</option>
// // // // // // //                   {modifications.map((mod, index) => (
// // // // // // //                     <option key={index} value={mod}>
// // // // // // //                       {mod}
// // // // // // //                     </option>
// // // // // // //                   ))}
// // // // // // //                 </select>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </main>

// // // // // // //       {isUploadVisible && (
// // // // // // //         <UploadImg
// // // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // // //           sessionId={sessionId}
// // // // // // //           onImageSelect={handleImageSelect}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ImgVar;
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // // import axios from 'axios';

// // // // // // const ImgVar: React.FC = () => {
// // // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // // //   const [caption, setCaption] = useState<string>('');
// // // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // // //   const [customModification, setCustomModification] = useState<string>('');
// // // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // // //   const [loading, setLoading] = useState<boolean>(false);

// // // // // //   const sessionId = localStorage.getItem('sessionId');

// // // // // //   useEffect(() => {
// // // // // //     if (!sessionId) {
// // // // // //       alert('Session ID not found. Please refresh the page.');
// // // // // //     }
// // // // // //   }, [sessionId]);

// // // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await axios.post(endpointUrl, payload);
// // // // // //       return response.data;
// // // // // //     } catch (error) {
// // // // // //       console.error(`Error calling Lambda function at ${endpointUrl}:`, error);
// // // // // //       return null;
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // // //   const handleProcessImage = async () => {
// // // // // //     if (selectedImage) {
// // // // // //       const payload = {
// // // // // //         user_id: 'unknown',
// // // // // //         session_id: sessionId || '1234567',
// // // // // //         image_base64: selectedImage.split(',')[1],
// // // // // //       };

// // // // // //       const response = await callLambda(
// // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/handle_promode_session_images',
// // // // // //         payload
// // // // // //       );

// // // // // //       if (response && response.s3_link) {
// // // // // //         const captionResponse = await callLambda(
// // // // // //           'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_image_caption',
// // // // // //           { url: response.s3_link }
// // // // // //         );
// // // // // //         setCaption(captionResponse?.caption || '');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchModifiableParams = async () => {
// // // // // //     if (caption) {
// // // // // //       const response = await callLambda(
// // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/list_key_modifiable_params',
// // // // // //         { description: caption }
// // // // // //       );

// // // // // //       if (response && response.parameters) {
// // // // // //         try {
// // // // // //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// // // // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // // // //           if (Array.isArray(paramsArray)) {
// // // // // //             setModifiableParams(paramsArray);
// // // // // //           } else {
// // // // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // // // //             setModifiableParams([]);
// // // // // //           }
// // // // // //         } catch (err) {
// // // // // //           console.error('Failed to parse parameters:', err);
// // // // // //           setModifiableParams([]);
// // // // // //         }
// // // // // //       } else {
// // // // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // // // //         setModifiableParams([]);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchModifications = async (selectedParam: string) => {
// // // // // //     if (caption && selectedParam) {
// // // // // //       const payload = {
// // // // // //         parameter: selectedParam,
// // // // // //         description: caption,
// // // // // //       };

// // // // // //       const response = await callLambda(
// // // // // //         'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/generate_possible_modifications',
// // // // // //         payload
// // // // // //       );

// // // // // //       if (response && response.suggestions) {
// // // // // //         try {
// // // // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // // // //           if (Array.isArray(suggestionsArray)) {
// // // // // //             setModifications(suggestionsArray);
// // // // // //           } else {
// // // // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // // // //             setModifications([]);
// // // // // //           }
// // // // // //         } catch (err) {
// // // // // //           console.error('Failed to parse suggestions:', err);
// // // // // //           setModifications([]);
// // // // // //         }
// // // // // //       } else {
// // // // // //         console.error('Failed to fetch modifications. Response:', response);
// // // // // //         setModifications([]);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // // // //     const value = e.target.value;
// // // // // //     setSelectedModification(value);
// // // // // //     if (value === 'Other') {
// // // // // //       setCustomModification(''); // Clear custom input when "Other" is selected
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     setCustomModification(e.target.value);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // // //         <img
// // // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // // //           alt="User Icon"
// // // // // //           className="h-10 w-10 rounded-full"
// // // // // //         />
// // // // // //       </header>

// // // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // // //         {loading && (
// // // // // //           <div className="flex items-center justify-center w-full h-full">
// // // // // //             <video
// // // // // //               src="src\assets\Animation - 1735119904272.mp4"
// // // // // //               autoPlay
// // // // // //               loop
// // // // // //               muted
// // // // // //               className="w-1/3"
// // // // // //             />
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {!loading && (
// // // // // //           <>
// // // // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // // //               <div
// // // // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // // //                 onClick={() => setIsUploadVisible(true)}
// // // // // //               >
// // // // // //                 {selectedImage ? (
// // // // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // // //                 ) : (
// // // // // //                   <span className="text-gray-500">Click to Upload</span>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // // //                 {variationImages.length > 0 ? (
// // // // // //                   variationImages.map((url, index) => (
// // // // // //                     <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // // //                   ))
// // // // // //                 ) : (
// // // // // //                   <span className="text-gray-500">Generated Image</span>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {selectedImage && !caption && (
// // // // // //               <button
// // // // // //                 onClick={handleProcessImage}
// // // // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // // //               >
// // // // // //                 Generate Caption
// // // // // //               </button>
// // // // // //             )}

// // // // // //             {caption && (
// // // // // //               <div className="mt-6 text-center">
// // // // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // // // //                 <button
// // // // // //                   onClick={fetchModifiableParams}
// // // // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // // //                 >
// // // // // //                   Fetch Modifiable Parameters
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {modifiableParams.length > 0 && (
// // // // // //               <div className="mt-6">
// // // // // //                 <select
// // // // // //                   className="border p-2 rounded"
// // // // // //                   value={selectedParam || ''}
// // // // // //                   onChange={(e) => {
// // // // // //                     setSelectedParam(e.target.value);
// // // // // //                     setModifications([]);  // Clear previous modifications
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <option value="">Select a Parameter</option>
// // // // // //                   {modifiableParams.map((param, index) => (
// // // // // //                     <option key={index} value={param}>
// // // // // //                       {param}
// // // // // //                     </option>
// // // // // //                   ))}
// // // // // //                 </select>
// // // // // //                 <button
// // // // // //                   onClick={() => fetchModifications(selectedParam || '')}
// // // // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // // //                   disabled={!selectedParam}
// // // // // //                 >
// // // // // //                   Fetch Modifications
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {modifications.length > 0 && (
// // // // // //               <div className="mt-6">
// // // // // //                 <select
// // // // // //                   className="border p-2 rounded"
// // // // // //                   value={selectedModification || ''}
// // // // // //                   onChange={handleModificationChange}
// // // // // //                 >
// // // // // //                   <option value="">Select a Modification</option>
// // // // // //                   {modifications.map((mod, index) => (
// // // // // //                     <option key={index} value={mod}>
// // // // // //                       {mod}
// // // // // //                     </option>
// // // // // //                   ))}
// // // // // //                   <option value="Other">Other</option>
// // // // // //                 </select>
// // // // // //                 {selectedModification === 'Other' && (
// // // // // //                   <div className="mt-4">
// // // // // //                     <input
// // // // // //                       type="text"
// // // // // //                       placeholder="Enter custom modification"
// // // // // //                       value={customModification}
// // // // // //                       onChange={handleCustomModificationChange}
// // // // // //                       className="border p-2 rounded"
// // // // // //                     />
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </>
// // // // // //         )}
// // // // // //       </main>

// // // // // //       {isUploadVisible && (
// // // // // //         <UploadImg
// // // // // //           onClose={() => setIsUploadVisible(false)}
// // // // // //           sessionId={sessionId}
// // // // // //           onImageSelect={handleImageSelect}
// // // // // //         />
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ImgVar;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // // import axios from 'axios';

// // // // // const ImgVar: React.FC = () => {
// // // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // // //   const [caption, setCaption] = useState<string>('');
// // // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // // //   const [customModification, setCustomModification] = useState<string>('');
// // // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // // //   const [loading, setLoading] = useState<boolean>(false);
// // // // //   const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt

// // // // //   const sessionId = localStorage.getItem('sessionId');
// // // // //   const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

// // // // //   useEffect(() => {
// // // // //     if (!sessionId) {
// // // // //       alert('Session ID not found. Please refresh the page.');
// // // // //     }
// // // // //   }, [sessionId]);

// // // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //         const response = await axios.post(endpointUrl, payload);
// // // // //         console.log("Lambda response:", response); // Log the full response
// // // // //         return response.data;
// // // // //     } catch (error) {
// // // // //         console.error("Lambda call error:", error.response || error);
// // // // //         setLoading(false);
// // // // //         return null;
// // // // //     } finally {
// // // // //         setLoading(false);
// // // // //     }
// // // // // };


// // // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // // //   const handleProcessImage = async () => {
// // // // //     if (selectedImage) {
// // // // //       const payload = {
// // // // //         user_id: 'unknown',
// // // // //         session_id: sessionId || '1234567',
// // // // //         image_base64: selectedImage.split(',')[1],
// // // // //       };

// // // // //       const response = await callLambda(
// // // // //         `${base_url}handle_promode_session_images`,
// // // // //         payload
// // // // //       );

// // // // //       if (response && response.s3_link) {
// // // // //         const captionResponse = await callLambda(
// // // // //           `${base_url}generate_image_caption`,
// // // // //           { url: response.s3_link }
// // // // //         );
// // // // //         setCaption(captionResponse?.caption || '');
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const fetchModifiableParams = async () => {
// // // // //     if (caption) {
// // // // //       const response = await callLambda(
// // // // //         `${base_url}list_key_modifiable_params`,
// // // // //         { description: caption }
// // // // //       );

// // // // //       if (response && response.parameters) {
// // // // //         try {
// // // // //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// // // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // // //           if (Array.isArray(paramsArray)) {
// // // // //             setModifiableParams(paramsArray);
// // // // //           } else {
// // // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // // //             setModifiableParams([]);
// // // // //           }
// // // // //         } catch (err) {
// // // // //           console.error('Failed to parse parameters:', err);
// // // // //           setModifiableParams([]);
// // // // //         }
// // // // //       } else {
// // // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // // //         setModifiableParams([]);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const fetchModifications = async (selectedParam: string) => {
// // // // //     if (caption && selectedParam) {
// // // // //       const payload = {
// // // // //         parameter: selectedParam,
// // // // //         description: caption,
// // // // //       };

// // // // //       const response = await callLambda(
// // // // //         `${base_url}generate_possible_modifications`,
// // // // //         payload
// // // // //       );

// // // // //       if (response && response.suggestions) {
// // // // //         try {
// // // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // // //           if (Array.isArray(suggestionsArray)) {
// // // // //             setModifications(suggestionsArray);
// // // // //           } else {
// // // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // // //             setModifications([]);
// // // // //           }
// // // // //         } catch (err) {
// // // // //           console.error('Failed to parse suggestions:', err);
// // // // //           setModifications([]);
// // // // //         }
// // // // //       } else {
// // // // //         console.error('Failed to fetch modifications. Response:', response);
// // // // //         setModifications([]);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // // //     const value = e.target.value;
// // // // //     setSelectedModification(value);
// // // // //     if (value === 'Other') {
// // // // //       setCustomModification(''); // Clear custom input when "Other" is selected
// // // // //     }
// // // // //   };

// // // // //   const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     setCustomModification(e.target.value);
// // // // //   };

// // // // //   const handleNext = async () => {
// // // // //     if (!selectedModification) {
// // // // //         alert('Please select a modification or enter a custom one.');
// // // // //         return;
// // // // //     }

// // // // //     const instruction = selectedModification === 'Other' ? customModification : selectedModification;

// // // // //     const payload = {
// // // // //         description: caption,
// // // // //         instruction: instruction,
// // // // //     };

// // // // //     try {
// // // // //         console.log("Calling endpoint with payload:", payload);
// // // // //         const response = await callLambda(
// // // // //             `${base_url}generate_variation_sd_prompt`,
// // // // //             payload
// // // // //         );

// // // // //         // Log the API response
// // // // //         console.log("API Response:", response);

// // // // //         if (response && response.output_prompt) {
// // // // //             setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
// // // // //         } else {
// // // // //             console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
// // // // //             setFinalPrompt("Error: Could not generate prompt.");
// // // // //         }
// // // // //     } catch (error) {
// // // // //         console.error("Error generating final prompt:", error);
// // // // //         setFinalPrompt("Error: Something went wrong.");
// // // // //     }
// // // // // };

// // // // //   return (
// // // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // // //         <img
// // // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // // //           alt="User Icon"
// // // // //           className="h-10 w-10 rounded-full"
// // // // //         />
// // // // //       </header>

// // // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // // //         {loading && (
// // // // //           <div className="flex items-center justify-center w-full h-full">
// // // // //             <video
// // // // //               src="src\assets\Animation - 1735119904272.mp4"
// // // // //               autoPlay
// // // // //               loop
// // // // //               muted
// // // // //               className="w-1/3"
// // // // //             />
// // // // //           </div>
// // // // //         )}

// // // // //         {!loading && (
// // // // //           <>
// // // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // // //               <div
// // // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // // //                 onClick={() => setIsUploadVisible(true)}
// // // // //               >
// // // // //                 {selectedImage ? (
// // // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // // //                 ) : (
// // // // //                   <span className="text-gray-500">Click to Upload</span>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // // //                 {variationImages.length > 0 ? (
// // // // //                   variationImages.map((url, index) => (
// // // // //                     <img key={index} src={url} alt={`Variation ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <span className="text-gray-500">Generated Image</span>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             {selectedImage && !caption && (
// // // // //               <button
// // // // //                 onClick={handleProcessImage}
// // // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // // //               >
// // // // //                 Generate Caption
// // // // //               </button>
// // // // //             )}

// // // // //             {caption && (
// // // // //               <div className="mt-6 text-center">
// // // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // // //                 <button
// // // // //                   onClick={fetchModifiableParams}
// // // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // // //                 >
// // // // //                   Fetch Modifiable Parameters
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}

// // // // //             {modifiableParams.length > 0 && (
// // // // //               <div className="mt-6">
// // // // //                 <select
// // // // //                   className="border p-2 rounded"
// // // // //                   value={selectedParam || ''}
// // // // //                   onChange={(e) => {
// // // // //                     setSelectedParam(e.target.value);
// // // // //                     setModifications([]);  // Clear previous modifications
// // // // //                   }}
// // // // //                 >
// // // // //                   <option value="">Select a Parameter</option>
// // // // //                   {modifiableParams.map((param, index) => (
// // // // //                     <option key={index} value={param}>
// // // // //                       {param}
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //                 <button
// // // // //                   onClick={() => fetchModifications(selectedParam || '')}
// // // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // // //                   disabled={!selectedParam}
// // // // //                 >
// // // // //                   Fetch Modifications
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}

// // // // //             {modifications.length > 0 && (
// // // // //               <div className="mt-6">
// // // // //                 <select
// // // // //                   className="border p-2 rounded"
// // // // //                   value={selectedModification || ''}
// // // // //                   onChange={handleModificationChange}
// // // // //                 >
// // // // //                   <option value="">Select a Modification</option>
// // // // //                   {modifications.map((mod, index) => (
// // // // //                     <option key={index} value={mod}>
// // // // //                       {mod}
// // // // //                     </option>
// // // // //                   ))}
// // // // //                   <option value="Other">Other</option>
// // // // //                 </select>
// // // // //                 {selectedModification === 'Other' && (
// // // // //                   <div className="mt-4">
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       placeholder="Enter custom modification"
// // // // //                       value={customModification}
// // // // //                       onChange={handleCustomModificationChange}
// // // // //                       className="border p-2 rounded"
// // // // //                     />
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}

// // // // //             <div className="mt-6">
// // // // //               <button
// // // // //                 onClick={handleNext}
// // // // //                 className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
// // // // //                 disabled={!selectedModification}
// // // // //               >
// // // // //                 Next
// // // // //               </button>
// // // // //             </div>

// // // // //             {finalPrompt && (
// // // // //               <div className="mt-6 p-4 bg-gray-100 rounded-lg">
// // // // //                 <h3 className="text-lg font-bold text-gray-700">Generated Prompt:</h3>
// // // // //                 <p className="text-gray-600">{finalPrompt}</p>
// // // // //               </div>
// // // // //             )}
// // // // //           </>
// // // // //         )}
// // // // //       </main>

// // // // //       {isUploadVisible && (
// // // // //         <UploadImg
// // // // //           onClose={() => setIsUploadVisible(false)}
// // // // //           sessionId={sessionId}
// // // // //           onImageSelect={handleImageSelect}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ImgVar;
// // // // import React, { useState, useEffect } from 'react';
// // // // import UploadImg from './UploadImg'; // Ensure correct import path
// // // // import axios from 'axios';

// // // // const ImgVar: React.FC = () => {
// // // //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// // // //   const [caption, setCaption] = useState<string>('');
// // // //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// // // //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// // // //   const [modifications, setModifications] = useState<string[]>([]);
// // // //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// // // //   const [customModification, setCustomModification] = useState<string>('');
// // // //   const [variationImages, setVariationImages] = useState<string[]>([]);
// // // //   const [loading, setLoading] = useState<boolean>(false);
// // // //   const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
// // // //   const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL

// // // //   const sessionId = localStorage.getItem('sessionId');
// // // //   const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

// // // //   useEffect(() => {
// // // //     if (!sessionId) {
// // // //       alert('Session ID not found. Please refresh the page.');
// // // //     }
// // // //   }, [sessionId]);

// // // //   const callLambda = async (endpointUrl: string, payload: object) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post(endpointUrl, payload);
// // // //       console.log("Lambda response:", response); // Log the full response
// // // //       return response.data;
// // // //     } catch (error) {
// // // //       console.error("Lambda call error:", error.response || error);
// // // //       setLoading(false);
// // // //       return null;
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// // // //   const handleProcessImage = async () => {
// // // //     if (selectedImage) {
// // // //       const payload = {
// // // //         user_id: 'unknown',
// // // //         session_id: sessionId || '1234567',
// // // //         image_base64: selectedImage.split(',')[1],
// // // //       };

// // // //       const response = await callLambda(
// // // //         `${base_url}handle_promode_session_images`,
// // // //         payload
// // // //       );

// // // //       if (response && response.s3_link) {
// // // //         const captionResponse = await callLambda(
// // // //           `${base_url}generate_image_caption`,
// // // //           { url: response.s3_link }
// // // //         );
// // // //         setCaption(captionResponse?.caption || '');
// // // //       }
// // // //     }
// // // //   };

// // // //   const fetchModifiableParams = async () => {
// // // //     if (caption) {
// // // //       const response = await callLambda(
// // // //         `${base_url}list_key_modifiable_params`,
// // // //         { description: caption }
// // // //       );

// // // //       if (response && response.parameters) {
// // // //         try {
// // // //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// // // //           const paramsArray = JSON.parse(fixedJsonString);

// // // //           if (Array.isArray(paramsArray)) {
// // // //             setModifiableParams(paramsArray);
// // // //           } else {
// // // //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// // // //             setModifiableParams([]);
// // // //           }
// // // //         } catch (err) {
// // // //           console.error('Failed to parse parameters:', err);
// // // //           setModifiableParams([]);
// // // //         }
// // // //       } else {
// // // //         console.error('Failed to fetch modifiable parameters. Response:', response);
// // // //         setModifiableParams([]);
// // // //       }
// // // //     }
// // // //   };

// // // //   const fetchModifications = async (selectedParam: string) => {
// // // //     if (caption && selectedParam) {
// // // //       const payload = {
// // // //         parameter: selectedParam,
// // // //         description: caption,
// // // //       };

// // // //       const response = await callLambda(
// // // //         `${base_url}generate_possible_modifications`,
// // // //         payload
// // // //       );

// // // //       if (response && response.suggestions) {
// // // //         try {
// // // //           const suggestionsArray = JSON.parse(response.suggestions);

// // // //           if (Array.isArray(suggestionsArray)) {
// // // //             setModifications(suggestionsArray);
// // // //           } else {
// // // //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// // // //             setModifications([]);
// // // //           }
// // // //         } catch (err) {
// // // //           console.error('Failed to parse suggestions:', err);
// // // //           setModifications([]);
// // // //         }
// // // //       } else {
// // // //         console.error('Failed to fetch modifications. Response:', response);
// // // //         setModifications([]);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // //     const value = e.target.value;
// // // //     setSelectedModification(value);
// // // //     if (value === 'Other') {
// // // //       setCustomModification(''); // Clear custom input when "Other" is selected
// // // //     }
// // // //   };

// // // //   const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setCustomModification(e.target.value);
// // // //   };

// // // //   const handleNext = async () => {
// // // //     if (!selectedModification) {
// // // //       alert('Please select a modification or enter a custom one.');
// // // //       return;
// // // //     }

// // // //     const instruction = selectedModification === 'Other' ? customModification : selectedModification;

// // // //     const payload = {
// // // //       description: caption,
// // // //       instruction: instruction,
// // // //     };

// // // //     try {
// // // //       console.log("Calling endpoint with payload:", payload);
// // // //       const response = await callLambda(
// // // //         `${base_url}generate_variation_sd_prompt`,
// // // //         payload
// // // //       );

// // // //       // Log the API response
// // // //       console.log("API Response:", response);

// // // //       if (response && response.output_prompt) {
// // // //         setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
// // // //         // Call the generate image URL endpoint after getting the final prompt
// // // //         await generateImageUrl(response.output_prompt);
// // // //       } else {
// // // //         console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
// // // //         setFinalPrompt("Error: Could not generate prompt.");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error generating final prompt:", error);
// // // //       setFinalPrompt("Error: Something went wrong.");
// // // //     }
// // // //   };

// // // //   // New function to generate image URL
// // // //   const generateImageUrl = async (finalPrompt: string) => {
// // // //     const payload = {
// // // //       references3url: selectedImage || '',  // Assuming you have the S3 link after the image is uploaded
// // // //       prompt: finalPrompt,
// // // //       init_strength: 0.8,  // Example value, you can adjust this as needed
// // // //     };

// // // //     const response = await callLambda(
// // // //       `${base_url}generate_images`,
// // // //       payload
// // // //     );

// // // //     if (response && response.generated_image_url) {
// // // //       setGeneratedImageUrl(response.generated_image_url);
// // // //     } else {
// // // //       console.error('Failed to generate image URL.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// // // //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// // // //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// // // //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// // // //         <img
// // // //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// // // //           alt="User Icon"
// // // //           className="h-10 w-10 rounded-full"
// // // //         />
// // // //       </header>

// // // //       <main className="flex flex-col items-center flex-grow p-6">
// // // //         {loading && (
// // // //           <div className="flex items-center justify-center w-full h-full">
// // // //             <video
// // // //               src="src\assets\Animation - 1735119904272.mp4"
// // // //               autoPlay
// // // //               loop
// // // //               muted
// // // //               className="w-1/3"
// // // //             />
// // // //           </div>
// // // //         )}

// // // //         {!loading && (
// // // //           <>
// // // //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// // // //               <div
// // // //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// // // //                 onClick={() => setIsUploadVisible(true)}
// // // //               >
// // // //                 {selectedImage ? (
// // // //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// // // //                 ) : (
// // // //                   <span className="text-gray-500">Click to Upload</span>
// // // //                 )}
// // // //               </div>

// // // //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// // // //                 {generatedImageUrl ? (
// // // //                   <img src={generatedImageUrl} alt="Generated Variation" className="w-full h-full object-cover rounded-lg" />
// // // //                 ) : (
// // // //                   <span className="text-gray-500">Generated Image</span>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {selectedImage && !caption && (
// // // //               <button
// // // //                 onClick={handleProcessImage}
// // // //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
// // // //               >
// // // //                 Generate Caption
// // // //               </button>
// // // //             )}

// // // //             {caption && (
// // // //               <div className="mt-6 text-center">
// // // //                 <p className="text-gray-600 mb-4">{caption}</p>
// // // //                 <button
// // // //                   onClick={fetchModifiableParams}
// // // //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// // // //                 >
// // // //                   Fetch Modifiable Parameters
// // // //                 </button>
// // // //               </div>
// // // //             )}

// // // //             {modifiableParams.length > 0 && (
// // // //               <div className="mt-6">
// // // //                 <select
// // // //                   className="border p-2 rounded"
// // // //                   value={selectedParam || ''}
// // // //                   onChange={(e) => {
// // // //                     setSelectedParam(e.target.value);
// // // //                     setModifications([]);  // Clear previous modifications
// // // //                   }}
// // // //                 >
// // // //                   <option value="">Select a Parameter</option>
// // // //                   {modifiableParams.map((param, index) => (
// // // //                     <option key={index} value={param}>
// // // //                       {param}
// // // //                     </option>
// // // //                   ))}
// // // //                 </select>
// // // //                 <button
// // // //                   onClick={() => fetchModifications(selectedParam || '')}
// // // //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// // // //                   disabled={!selectedParam}
// // // //                 >
// // // //                   Fetch Modifications
// // // //                 </button>
// // // //               </div>
// // // //             )}

// // // //             {modifications.length > 0 && (
// // // //               <div className="mt-6">
// // // //                 <select
// // // //                   className="border p-2 rounded"
// // // //                   value={selectedModification || ''}
// // // //                   onChange={handleModificationChange}
// // // //                 >
// // // //                   <option value="">Select a Modification</option>
// // // //                   {modifications.map((mod, index) => (
// // // //                     <option key={index} value={mod}>
// // // //                       {mod}
// // // //                     </option>
// // // //                   ))}
// // // //                   <option value="Other">Other</option>
// // // //                 </select>
// // // //                 {selectedModification === 'Other' && (
// // // //                   <div className="mt-4">
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="Enter custom modification"
// // // //                       value={customModification}
// // // //                       onChange={handleCustomModificationChange}
// // // //                       className="border p-2 rounded"
// // // //                     />
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}

// // // //             <div className="mt-6">
// // // //               <button
// // // //                 onClick={handleNext}
// // // //                 className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
// // // //                 disabled={!selectedModification}
// // // //               >
// // // //                 Next
// // // //               </button>
// // // //             </div>

// // // //             {finalPrompt && (
// // // //               <div className="mt-6 p-4 bg-gray-100 rounded-lg">
// // // //                 <h3 className="text-lg font-bold text-gray-700">Generated Prompt:</h3>
// // // //                 <p className="text-gray-600">{finalPrompt}</p>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </main>

// // // //       {isUploadVisible && (
// // // //         <UploadImg
// // // //           onClose={() => setIsUploadVisible(false)}
// // // //           sessionId={sessionId}
// // // //           onImageSelect={handleImageSelect}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ImgVar;
// // import React, { useState, useEffect } from 'react';
// // import UploadImg from './UploadImg'; // Ensure correct import path
// // import axios from 'axios';

// // const ImgVar: React.FC = () => {
// //   const [isUploadVisible, setIsUploadVisible] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //   const [caption, setCaption] = useState<string>('');
// //   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
// //   const [selectedParam, setSelectedParam] = useState<string | null>(null);
// //   const [modifications, setModifications] = useState<string[]>([]);
// //   const [selectedModification, setSelectedModification] = useState<string | null>(null);
// //   const [customModification, setCustomModification] = useState<string>('');
// //   const [variationImages, setVariationImages] = useState<string[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
// //   const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL

// //   const sessionId = localStorage.getItem('sessionId');
// //   const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

// //   useEffect(() => {
// //     if (!sessionId) {
// //       alert('Session ID not found. Please refresh the page.');
// //     }
// //   }, [sessionId]);

// //   const callLambda = async (endpointUrl: string, payload: object) => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(endpointUrl, payload);
// //       console.log("Lambda response:", response); // Log the full response
// //       return response.data;
// //     } catch (error) {
// //       console.error("Lambda call error:", error.response || error);
// //       setLoading(false);
// //       return null;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

// //   const handleProcessImage = async () => {
// //     if (selectedImage) {
// //       const payload = {
// //         user_id: 'unknown',
// //         session_id: sessionId || '1234567',
// //         image_base64: selectedImage.split(',')[1],
// //       };

// //       const response = await callLambda(
// //         `${base_url}handle_promode_session_images`,
// //         payload
// //       );

// //       if (response && response.s3_link) {
// //         const captionResponse = await callLambda(
// //           `${base_url}generate_image_caption`,
// //           { url: response.s3_link }
// //         );
// //         setCaption(captionResponse?.caption || '');
// //       }
// //     }
// //   };

// //   const fetchModifiableParams = async () => {
// //     if (caption) {
// //       const response = await callLambda(
// //         `${base_url}list_key_modifiable_params`,
// //         { description: caption }
// //       );

// //       if (response && response.parameters) {
// //         try {
// //           const fixedJsonString = response.parameters.replace(/'/g, '"');
// //           const paramsArray = JSON.parse(fixedJsonString);

// //           if (Array.isArray(paramsArray)) {
// //             setModifiableParams(paramsArray);
// //           } else {
// //             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
// //             setModifiableParams([]);
// //           }
// //         } catch (err) {
// //           console.error('Failed to parse parameters:', err);
// //           setModifiableParams([]);
// //         }
// //       } else {
// //         console.error('Failed to fetch modifiable parameters. Response:', response);
// //         setModifiableParams([]);
// //       }
// //     }
// //   };

// //   const fetchModifications = async (selectedParam: string) => {
// //     if (caption && selectedParam) {
// //       const payload = {
// //         parameter: selectedParam,
// //         description: caption,
// //       };

// //       const response = await callLambda(
// //         `${base_url}generate_possible_modifications`,
// //         payload
// //       );

// //       if (response && response.suggestions) {
// //         try {
// //           const suggestionsArray = JSON.parse(response.suggestions);

// //           if (Array.isArray(suggestionsArray)) {
// //             setModifications(suggestionsArray);
// //           } else {
// //             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
// //             setModifications([]);
// //           }
// //         } catch (err) {
// //           console.error('Failed to parse suggestions:', err);
// //           setModifications([]);
// //         }
// //       } else {
// //         console.error('Failed to fetch modifications. Response:', response);
// //         setModifications([]);
// //       }
// //     }
// //   };

// //   const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const value = e.target.value;
// //     setSelectedModification(value);
// //     if (value === 'Other') {
// //       setCustomModification(''); // Clear custom input when "Other" is selected
// //     }
// //   };

// //   const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setCustomModification(e.target.value);
// //   };

// //   const handleNext = async () => {
// //     if (!selectedModification) {
// //       alert('Please select a modification or enter a custom one.');
// //       return;
// //     }

// //     const instruction = selectedModification === 'Other' ? customModification : selectedModification;

// //     const payload = {
// //       description: caption,
// //       instruction: instruction,
// //     };

// //     try {
// //       console.log("Calling endpoint with payload:", payload);
// //       const response = await callLambda(
// //         `${base_url}generate_variation_sd_prompt`,
// //         payload
// //       );

// //       // Log the API response
// //       console.log("API Response:", response);

// //       if (response && response.output_prompt) {
// //         setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
// //         // Call the generate image URL endpoint after getting the final prompt
// //         await generateImageUrl(response.output_prompt);
// //       } else {
// //         console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
// //         setFinalPrompt("Error: Could not generate prompt.");
// //       }
// //     } catch (error) {
// //       console.error("Error generating final prompt:", error);
// //       setFinalPrompt("Error: Something went wrong.");
// //     }
// //   };


// //   // New function to generate image URL
// //   const generateImageUrl = async (finalPrompt: string) => {
// //     const payload = {
// //       references3url: selectedImage || '',  // Assuming you have the S3 link after the image is uploaded
// //       prompt: finalPrompt,
// //       init_strength: 0.8,  // Example value, you can adjust this as needed
// //     };

// //     const response = await callLambda(
// //       `${base_url}generate_images`,
// //       payload
// //     );

// //     if (response && response.generated_image_url) {
// //       setGeneratedImageUrl(response.generated_image_url); // Store the generated image URL
// //     } else {
// //       console.error('Failed to generate image URL.');
// //     }
// //   };


// //   return (
// //     <div className="flex flex-col items-center min-h-screen bg-gray-50">
// //       <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
// //         <img src="https://www.kinmitra.com/assets/image-BEwmDLXF.png" alt="Kinmitra Logo" className="h-6" />
// //         <h1 className="text-xl font-bold text-gray-700">Image Variation Tool</h1>
// //         <img
// //           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
// //           alt="User Icon"
// //           className="h-10 w-10 rounded-full"
// //         />
// //       </header>

// //       <main className="flex flex-col items-center flex-grow p-6">
// //         {loading && (
// //           <div className="flex items-center justify-center w-full h-full">
// //             <video
// //               src="src\assets\Animation - 1735119904272.mp4"
// //               autoPlay
// //               loop
// //               muted
// //               className="w-1/3"
// //             />
// //           </div>
// //         )}

// //         {!loading && (
// //           <>
// //             <div className="flex flex-wrap gap-6 justify-center items-center w-full">
// //               <div
// //                 className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center cursor-pointer p-4 bg-gray-100"
// //                 onClick={() => setIsUploadVisible(true)}
// //               >
// //                 {selectedImage ? (
// //                   <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-lg" />
// //                 ) : (
// //                   <span className="text-gray-500">Click to Upload</span>
// //                 )}
// //               </div>

// //               <div className="h-[250px] w-[250px] border-2 rounded-lg flex items-center justify-center p-4 bg-gray-100">
// //                 {generatedImageUrl ? (
// //                   <img src={generatedImageUrl} alt="Generated Variation" className="w-full h-full object-cover rounded-lg" />
// //                 ) : (
// //                   <span className="text-gray-500">Generated Image</span>
// //                 )}
// //               </div>
// //             </div>

// //             {selectedImage && !caption && (
// //               <button
// //                 onClick={handleProcessImage}
// //                 className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// //               >
// //                 Process Image
// //               </button>
// //             )}

// //             {caption && (
// //               <div className="mt-6 text-center">
// //                 {/* <p className="text-gray-600 mb-4">{caption}</p> */}
// //                 <button
// //                   onClick={fetchModifiableParams}
// //                   className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
// //                 >
// //                   Process Image
// //                 </button>
// //               </div>
// //             )}

// //             {modifiableParams.length > 0 && (
// //               <div className="mt-6">
// //                 <select
// //                   className="border p-2 rounded"
// //                   value={selectedParam || ''}
// //                   onChange={(e) => {
// //                     setSelectedParam(e.target.value);
// //                     setModifications([]);  // Clear previous modifications
// //                   }}
// //                 >
// //                   <option value="">Select a Modifiable Parameter</option>
// //                   {modifiableParams.map((param, index) => (
// //                     <option key={index} value={param}>
// //                       {param}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <button
// //                   onClick={() => fetchModifications(selectedParam || '')}
// //                   className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
// //                   disabled={!selectedParam}
// //                 >
// //                   Go
// //                 </button>
// //               </div>
// //             )}

// //             {modifications.length > 0 && (
// //               <div className="mt-6">
// //                 <select
// //                   className="border p-2 rounded"
// //                   value={selectedModification || ''}
// //                   onChange={handleModificationChange} // Make sure this updates selectedModification
// //                 >
// //                   <option value="">Select a Modification</option>
// //                   {modifications.map((mod, index) => (
// //                     <option key={index} value={mod}>
// //                       {mod}
// //                     </option>
// //                   ))}
// //                   <option value="Other">Other</option>
// //                 </select>

// //                 {selectedModification === 'Other' && (
// //                   <div className="mt-4">
// //                     <input
// //                       type="text"
// //                       placeholder="Enter custom modification"
// //                       value={customModification} // Ensure this is properly linked to the state
// //                       onChange={handleCustomModificationChange} // Make sure this updates customModification
// //                       className="border p-2 rounded"
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             <div className="mt-6">
// //               <button
// //                 onClick={handleNext} // Ensure handleNext does the correct action
// //                 className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
// //                 disabled={!selectedModification} // Disables the button if no modification is selected
// //               >
// //                 Next
// //               </button>
// //             </div>

// //             {finalPrompt && (
// //               <div className="mt-6 p-4 bg-gray-100 rounded-lg">
// //                 <h3 className="text-lg font-bold text-gray-700">Generated Prompt:</h3>
// //                 <p className="text-gray-600">{finalPrompt}</p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </main>

// //       {isUploadVisible && (
// //         <UploadImg
// //           onClose={() => setIsUploadVisible(false)}
// //           sessionId={sessionId}
// //           onImageSelect={handleImageSelect}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ImgVar;
// import React, { useState, useEffect } from 'react';
// import UploadImg from './UploadImg'; // Ensure correct import path
// import axios from 'axios';

// const ImgVar: React.FC = () => {
//   const [isUploadVisible, setIsUploadVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [caption, setCaption] = useState<string>('');
//   const [modifiableParams, setModifiableParams] = useState<string[]>([]);
//   const [selectedParam, setSelectedParam] = useState<string | null>(null);
//   const [modifications, setModifications] = useState<string[]>([]);
//   const [selectedModification, setSelectedModification] = useState<string | null>(null);
//   const [customModification, setCustomModification] = useState<string>('');
//   const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
//   const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL

//   const sessionId = localStorage.getItem('sessionId');
//   const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

//   useEffect(() => {
//     if (!sessionId) {
//       alert('Session ID not found. Please refresh the page.');
//     }
//   }, [sessionId]);

//   const callLambda = async (endpointUrl: string, payload: object) => {
//     try {
//       const response = await axios.post(endpointUrl, payload);
//       console.log("Lambda response:", response); // Log the full response
//       return response.data;
//     } catch (error) {
//       console.error("Lambda call error:", error.response || error);
//       return null;
//     }
//   };

//   const handleImageSelect = (imageUrl: string) => setSelectedImage(imageUrl);

//   const handleProcessImage = async () => {
//     if (selectedImage) {
//       console.log("Processing image...");
//       const payload = {
//         user_id: 'unknown',
//         session_id: sessionId || '1234567',
//         image_base64: selectedImage.split(',')[1],
//       };

//       const response = await callLambda(
//         `${base_url}handle_promode_session_images`,
//         payload
//       );

//       if (response && response.s3_link) {
//         console.log("Image processed, fetching caption...");
//         const captionResponse = await callLambda(
//           `${base_url}generate_image_caption`,
//           { url: response.s3_link }
//         );

//         console.log("Caption generated:", captionResponse);

//         const paramsResponse = await callLambda(
//           `${base_url}list_key_modifiable_params`,
//           { description: captionResponse?.caption || '' }
//         );

//         if (paramsResponse && paramsResponse.parameters) {
//           try {
//             const fixedJsonString = paramsResponse.parameters.replace(/'/g, '"');
//             const paramsArray = JSON.parse(fixedJsonString);

//             if (Array.isArray(paramsArray)) {
//               setModifiableParams(paramsArray);
//             } else {
//               console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
//               setModifiableParams([]);
//             }
//           } catch (err) {
//             console.error('Failed to parse parameters:', err);
//             setModifiableParams([]);
//           }
//         }
//       }
//     }
//   };

//   const fetchModifiableParams = async () => {
//     if (caption) {
//       const response = await callLambda(
//         `${base_url}list_key_modifiable_params`,
//         { description: caption }
//       );

//       if (response && response.parameters) {
//         try {
//           const fixedJsonString = response.parameters.replace(/'/g, '"');
//           const paramsArray = JSON.parse(fixedJsonString);

//           if (Array.isArray(paramsArray)) {
//             setModifiableParams(paramsArray);
//           } else {
//             console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
//             setModifiableParams([]);
//           }
//         } catch (err) {
//           console.error('Failed to parse parameters:', err);
//           setModifiableParams([]);
//         }
//       } else {
//         console.error('Failed to fetch modifiable parameters. Response:', response);
//         setModifiableParams([]);
//       }
//     }
//   };

//   const fetchModifications = async (selectedParam: string) => {
//     if (caption && selectedParam) {
//       const payload = {
//         parameter: selectedParam,
//         description: caption,
//       };

//       const response = await callLambda(
//         `${base_url}generate_possible_modifications`,
//         payload
//       );

//       if (response && response.suggestions) {
//         try {
//           const suggestionsArray = JSON.parse(response.suggestions);

//           if (Array.isArray(suggestionsArray)) {
//             setModifications(suggestionsArray);
//           } else {
//             console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
//             setModifications([]);
//           }
//         } catch (err) {
//           console.error('Failed to parse suggestions:', err);
//           setModifications([]);
//         }
//       } else {
//         console.error('Failed to fetch modifications. Response:', response);
//         setModifications([]);
//       }
//     }
//   };

//   const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedModification(value);
//     if (value === 'Other') {
//       setCustomModification(''); // Clear custom input when "Other" is selected
//     }
//   };

//   const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCustomModification(e.target.value);
//   };

//   const handleNext = async () => {
//     if (!selectedModification) {
//       alert('Please select a modification or enter a custom one.');
//       return;
//     }

//     const instruction = selectedModification === 'Other' ? customModification : selectedModification;

//     const payload = {
//       description: caption,
//       instruction: instruction,
//     };

//     try {
//       console.log("Calling endpoint with payload:", payload);
//       const response = await callLambda(
//         `${base_url}generate_variation_sd_prompt`,
//         payload
//       );

//       // Log the API response
//       console.log("API Response:", response);

//       if (response && response.output_prompt) {
//         setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
//         // Call the generate image URL endpoint after getting the final prompt
//         await generateImageUrl(response.output_prompt);
//       } else {
//         console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
//         setFinalPrompt("Error: Could not generate prompt.");
//       }
//     } catch (error) {
//       console.error("Error generating final prompt:", error);
//       setFinalPrompt("Error: Something went wrong.");
//     }
//   };

//   const generateImageUrl = async (finalPrompt: string) => {

//     const payload = {
//       references3url: selectedImage || '',
//       prompt: finalPrompt,
//       init_strength: 0.8,
//     };

//     console.log("Payload for generateImageUrl:", payload);

//     try {
//       const response = await callLambda(
//         `${base_url}generate_images`,
//         payload
//       );

//       console.log("Response from generate_images:", response);

//       if (response && response.generated_image_url) {
//         setGeneratedImageUrl(response.generated_image_url);
//       } else {
//         alert("Error: Unable to generate the image. Please check the API response.");
//         console.error('API response does not include "generated_image_url". Response:', response);
//       }
//     } catch (error) {
//       console.error("Error while generating image URL:", error);
//       alert("An error occurred while generating the image. Please try again later.");
//     }
//   };  

//   return (
//     <div className="flex-1 min-h-screen pb-[15vh] relative">
//       {/* White overlay on the background image */}
//       <div
//         className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
//         style={{
//           backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
//         }}
//       ></div>
//       <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>

//       {/* Header as in Code 1 */}
//       <div className="flex items-center justify-between text-xl p-5 text-[#585858] relative z-10">
//         <div className="name flex flex-col items-center gap-1">
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
//         <p>Image Variation</p>
//         <img
//           className="w-[50px] rounded-full"
//           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
//           alt="User Icon"
//         />
//       </div>

//       {/* Main Content */}
//       <main className="flex flex-col items-center flex-grow p-6 relative z-10">
//         <div className="flex flex-wrap gap-6 justify-center items-center w-full">
//           <div
//             className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
//             onClick={() => {
//               if (!selectedImage) {
//                 setIsUploadVisible(true);
//               }
//             }}
//           >
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt="Selected"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-sm text-gray-600">Click to upload</span>
//             )}
//           </div>

//           <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
//             {generatedImageUrl ? (
//               <img
//                 src={generatedImageUrl}
//                 alt="Generated Variation"
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             ) : (
//               <span className="text-sm text-gray-600">Generated Image</span>
//             )}
//           </div>
//         </div>

//         {selectedImage && (
//           <button
//             onClick={handleProcessImage}
//             className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
//           >
//             Process Image
//           </button>
//         )}

//         {modifiableParams.length > 0 && (
//           <div className="mt-6">
//             <select
//               className="border p-2 rounded"
//               value={selectedParam || ''}
//               onChange={(e) => setSelectedParam(e.target.value)}
//             >
//               <option value="">Select a Modifiable Parameter</option>
//               {modifiableParams.map((param, index) => (
//                 <option key={index} value={param}>
//                   {param}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => {
//                 console.log(`Modifying parameter: ${selectedParam}`);
//                 alert(`Modifying: ${selectedParam}`); // Handle modification here
//               }}
//               className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
//               disabled={!selectedParam}
//             >
//               Go
//             </button>
//           </div>
//         )}

//         {modifications.length > 0 && (
//           <div className="mt-6">
//             <select
//               className="border p-2 rounded"
//               value={selectedModification || ''}
//               onChange={handleModificationChange}
//             >
//               <option value="">Select a Modification</option>
//               {modifications.map((mod, index) => (
//                 <option key={index} value={mod}>
//                   {mod}
//                 </option>
//               ))}
//               <option value="Other">Other</option>
//             </select>

//             {selectedModification === 'Other' && (
//               <div className="mt-4">
//                 <input
//                   type="text"
//                   placeholder="Enter custom modification"
//                   value={customModification}
//                   onChange={handleCustomModificationChange}
//                   className="border p-2 rounded"
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         <div className="mt-6">
//           <button
//             onClick={handleNext}
//             className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
//             disabled={!selectedModification}
//           >
//             Next
//           </button>
//         </div>

//         {finalPrompt && (
//           <div className="mt-6 p-4 bg-white rounded-lg">
//             <h3 className="text-lg font-bold">Generated Prompt:</h3>
//             <p>{finalPrompt}</p>
//           </div>
//         )}
//       </main>

//       {/* Upload Image Modal */}
//       {isUploadVisible && (
//         <UploadImg
//           onClose={() => setIsUploadVisible(false)}
//           sessionId={sessionId}
//           onImageSelect={handleImageSelect}
//         />
//       )}
//     </div>
//   );
// };

// export default ImgVar;

import React, { useState, useEffect } from 'react';
import UploadImg from './UploadImg'; // Ensure correct import path
import axios from 'axios';

const ImgVar: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [modifiableParams, setModifiableParams] = useState<string[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [modifications, setModifications] = useState<string[]>([]);
  const [selectedModification, setSelectedModification] = useState<string | null>(null);
  const [customModification, setCustomModification] = useState<string>('');
  const [finalPrompt, setFinalPrompt] = useState<string>(''); // To store the final prompt
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null); // To store the generated image URL
  const [s3Link, setS3Link] = useState("");

  const sessionId = localStorage.getItem('sessionId');
  const base_url = 'https://yhzyxry6rj.execute-api.ap-south-1.amazonaws.com/dev/'; // Replace with your base URL

  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  const callLambda = async (endpointUrl: string, payload: object) => {
    try {
      const response = await axios.post(endpointUrl, payload);
      console.log("Lambda response:", response); // Log the full response
      return response.data;
    } catch (error) {
      console.error("Lambda call error:", error);
      return null;
    }
  };

  const handleImageSelect = (imageBase64: string) => setSelectedImage(imageBase64);

  const handleProcessImage = async () => {
    if (selectedImage) {
      console.log("Processing image...");
      const payload = {
        user_id: 'unknown',
        session_id: sessionId || '1234567',
        image_base64: selectedImage.split(',')[1], // Base64 encoding before sending to Lambda
      };

      const response = await callLambda(
        `${base_url}handle_promode_session_images`,
        payload
      );

      if (response && response.s3_link) {
        console.log("Image processed, fetching caption...");
        const captionResponse = await callLambda(
          `${base_url}generate_image_caption`,
          { url: response.s3_link }
        );

        setS3Link(response.s3_link); // Store the s3_link in state
        console.log("Caption generated:", captionResponse);
        setCaption(captionResponse.caption || '');

        // Fetch modifiable parameters after caption generation
        await fetchModifiableParams(captionResponse.caption);
      }
    }
  };

  const fetchModifiableParams = async (caption: string) => {
    const paramsResponse = await callLambda(
      `${base_url}list_key_modifiable_params`,
      { description: caption }
    );

    if (paramsResponse && paramsResponse.parameters) {
      try {
        const fixedJsonString = paramsResponse.parameters.replace(/'/g, '"');
        const paramsArray = JSON.parse(fixedJsonString);

        if (Array.isArray(paramsArray)) {
          setModifiableParams(paramsArray);
        } else {
          console.error('Parsed parameters are not an array. Parsed result:', paramsArray);
          setModifiableParams([]);
        }
      } catch (err) {
        console.error('Failed to parse parameters:', err);
        setModifiableParams([]);
      }
    } else {
      console.error('Failed to fetch modifiable parameters. Response:', paramsResponse);
      setModifiableParams([]);
    }
  };

  const fetchModifications = async (selectedParam: string) => {
    if (caption && selectedParam) {
      const payload = {
        parameter: selectedParam,
        description: caption,
      };

      const response = await callLambda(
        `${base_url}generate_possible_modifications`,
        payload
      );

      if (response && response.suggestions) {
        try {
          const suggestionsArray = JSON.parse(response.suggestions);

          if (Array.isArray(suggestionsArray)) {
            setModifications(suggestionsArray);
          } else {
            console.error('Parsed suggestions are not an array. Parsed result:', suggestionsArray);
            setModifications([]);
          }
        } catch (err) {
          console.error('Failed to parse suggestions:', err);
          setModifications([]);
        }
      } else {
        console.error('Failed to fetch modifications. Response:', response);
        setModifications([]);
      }
    }
  };

  const handleModificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedModification(value);
    if (value === 'Other') {
      setCustomModification(''); // Clear custom input when "Other" is selected
    }
  };

  const handleCustomModificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomModification(e.target.value);
  };

  const handleNext = async () => {
    if (!selectedModification) {
      alert('Please select a modification or enter a custom one.');
      return;
    }

    const instruction = selectedModification === 'Other' ? customModification : selectedModification;

    const payload = {
      description: caption,
      instruction: instruction,
    };

    try {
      console.log("Calling endpoint with payload:", payload);
      const response = await callLambda(
        `${base_url}generate_variation_sd_prompt`,
        payload
      );

      console.log("API Response:", response);

      if (response && response.output_prompt) {
        setFinalPrompt(response.output_prompt);  // Assign output_prompt to the state
        // Call the generate image URL endpoint after getting the final prompt
        await generateImageUrl(response.output_prompt, s3Link);  // Pass selectedImage to generate the image
      } else {
        console.error("Failed to generate final prompt. Response does not contain 'output_prompt'.");
        setFinalPrompt("Error: Could not generate prompt.");
      }
    } catch (error) {
      console.error("Error generating final prompt:", error);
      setFinalPrompt("Error: Something went wrong.");
    }
  };


  const generateImageUrl = async (finalPrompt: string, references3url: string) => {
    // const base64Image = imageUrl.split(',')[1] || '';
    const payload = {
      references3url: references3url,
      prompt: finalPrompt,
      init_strength: 0.8,
    };

    console.log("Payload for generateImageUrl:", payload);

    try {
      const response = await callLambda(
        `${base_url}generate_images_leonardo`,
        payload
      );

      console.log("Response from generate_images:", response);

      if (response && response.uploaded_image_urls) {
        setGeneratedImageUrl(response.uploaded_image_urls);
      } else {
        alert("Error: Unable to generate the image. Please check the API response.");
        console.error('API response does not include "generated_image_url". Response:', response);
      }
    } catch (error) {
      console.error("Error while generating image URL:", error);

      alert("An error occurred while generating the image. Please try again later.");
    }
  };


  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* White overlay on the background image */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>

      {/* Header as in Code 1 */}
      <div className="flex items-center justify-between text-xl p-5 text-[#585858] relative z-10">
        <div className="name flex flex-col items-center gap-1">
          <h2 className="text-xl">
            <img
              src="https://www.kinmitra.com/assets/image-BEwmDLXF.png"
              alt="Kinmitra Logo"
              className="h-5"
            />
          </h2>
          <p className="inline-block text-xl font-medium bg-gradient-to-r from-[#00AA4F] via-[#E0AE2A] to-[#EB2D2E] bg-clip-text text-transparent animate-[moveText_4s_linear_infinite]">
            Pro Mode
          </p>
        </div>
        <p>Image Variation</p>
        <img
          className="w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-6 relative z-10">
        <div className="flex flex-wrap gap-6 justify-center items-center w-full">
          <div
            className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
            onClick={() => {
              if (!selectedImage) {
                setIsUploadVisible(true);
              }
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-600">Click to upload</span>
            )}
          </div>

          <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
            {generatedImageUrl ? (
              <img
                src={generatedImageUrl}
                alt="Generated Variation"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-sm text-gray-600">Generated Image</span>
            )}
          </div>
        </div>

        {selectedImage && (
          <button
            onClick={handleProcessImage}
            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Process Image
          </button>
        )}

        {modifiableParams.length > 0 && (
          <div className="mt-6">
            <select
              className="border p-2 rounded"
              value={selectedParam || ''}
              onChange={(e) => setSelectedParam(e.target.value)}
            >
              <option value="">Select a Modifiable Parameter</option>
              {modifiableParams.map((param, index) => (
                <option key={index} value={param}>
                  {param}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (selectedParam) {
                  fetchModifications(selectedParam); // Call the function to fetch modifications
                } else {
                  alert('Please select a parameter to modify.');
                }
              }}
              className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              disabled={!selectedParam}
            >
              Go
            </button>

          </div>
        )}

        {modifications.length > 0 && (
          <div className="mt-6">
            <select
              className="border p-2 rounded"
              value={selectedModification || ''}
              onChange={handleModificationChange}
            >
              <option value="">Select a Modification</option>
              {modifications.map((mod, index) => (
                <option key={index} value={mod}>
                  {mod}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>

            {selectedModification === 'Other' && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter custom modification"
                  value={customModification}
                  onChange={handleCustomModificationChange}
                  className="border p-2 rounded"
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
            disabled={!selectedModification}
          >
            Next
          </button>
        </div>

        {finalPrompt && (
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Generated Prompt:</h3>
            <p>{finalPrompt}</p>
          </div>
        )}
      </main>

      {/* Upload Image Modal */}
      {isUploadVisible && (
        <UploadImg
          onClose={() => setIsUploadVisible(false)}
          sessionId={sessionId}
          onImageSelect={handleImageSelect}
        />
      )}
    </div>
  );
};

export default ImgVar;
