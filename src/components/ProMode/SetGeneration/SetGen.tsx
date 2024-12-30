// import React, { useState, useEffect } from 'react'; 
// import UploadImg from '../UploadImg'; 
// import axios from 'axios';
// import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';

// const SetGen: React.FC = () => {
//   const [isUploadVisible, setIsUploadVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [sourceType, setSourceType] = useState("Necklace");
//   const [targetType, setTargetType] = useState("Necklace");
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const [error, setError] = useState<string>("");

//   const sessionId = localStorage.getItem('sessionId');

//   useEffect(() => {
//     if (!sessionId) {
//       alert('Session ID not found. Please refresh the page.');
//     }
//   }, [sessionId]);

//   // Handle API call for image generation
//   const handleGenerate = async () => {
//     if (!selectedImage) {
//       alert("Please upload an image to proceed.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     const payload = {
//       image: selectedImage.split(",")[1], // Remove the base64 prefix
//       source_type: sourceType,
//       target_type: targetType,
//     };

//     // Log payload before making the API call
//     console.log("Payload being sent to API:", payload);

//     try {
//       const response = await axios.post(
//         "https://62vphpjt4l.execute-api.us-east-1.amazonaws.com/default/SetGenerator",
//         payload
//       );

//       // Log the response from the API
//       console.log("API Response:", response);

//       if (response.status === 200) {
//         setGeneratedImages(response.data.uploaded_image_urls || []);
//       } else {
//         setError(`Error: ${response.status} - ${response.data}`);
//       }
//     } catch (e) {
//       setError("Failed to make API request.");
//       // Log error
//       console.error("Error during API request:", e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle image selection
//   const handleImageSelect = (imageBase64: string) => setSelectedImage(imageBase64);

//   return (
//     <div className="flex-1 min-h-screen pb-[15vh] relative">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
//           <img
//             src={kinmitraAnimation}
//             alt="Loading Animation"
//             className="w-[200px] h-[200px] object-cover"
//           />
//         </div>
//       )}

//       {/* Background and White Overlay */}
//       <div
//         className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
//         style={{
//           backgroundImage:
//             "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
//         }}
//       ></div>
//       <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>

//       {/* Header */}
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
//         <p>Set Generation</p>
//         <img
//           className="w-[50px] rounded-full"
//           src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
//           alt="User Icon"
//         />
//       </div>

//       {/* Main Content */}
//       <main className="flex flex-col items-center flex-grow p-6 relative z-10">
//         <div className="flex flex-wrap gap-6 justify-center items-center w-full">
//           {/* Uploaded Image Preview */}
//           <div
//             className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
//             onClick={() => setIsUploadVisible(true)}
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

//           {/* Generated Images */}
//           {generatedImages.length > 0 ? (
//             <div className="flex flex-wrap gap-4">
//               {generatedImages.map((image, index) => (
//                 <div key={index} className="h-[250px] w-[250px]">
//                   <img
//                     src={image}
//                     alt={`Generated ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
//               <span className="text-sm text-gray-600">Generated Image</span>
//             </div>
//           )}
//         </div>

//         {/* Dropdowns for Source and Target Types */}
//         <div className="flex flex-col gap-4 mt-4">
//           <div className="flex items-center gap-4">
//             <label className="text-gray-700 font-medium w-32 text-right">Source Type:</label>
//             <select
//               value={sourceType}
//               onChange={(e) => setSourceType(e.target.value)}
//               className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="Necklace">Necklace</option>
//               <option value="Earring">Earring</option>
//               <option value="Pendant">Pendant</option>
//               <option value="Rings">Rings</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-4">
//             <label className="text-gray-700 font-medium w-32 text-right">Target Type:</label>
//             <select
//               value={targetType}
//               onChange={(e) => setTargetType(e.target.value)}
//               className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               <option value="Necklace">Necklace</option>
//               <option value="Earring">Earring</option>
//               <option value="Pendant">Pendant</option>
//               <option value="Rings">Rings</option>
//             </select>
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={handleGenerate}
//           disabled={isLoading}
//           className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {isLoading ? "Generating..." : "Generate"}
//         </button>

//         {/* Error Message */}
//         {error && <p className="mt-4 text-red-500">{error}</p>}
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

// export default SetGen;
import React, { useState, useEffect } from 'react'; 
import UploadImg from '../UploadImg'; 
import axios from 'axios';
import kinmitraAnimation from '/src/assets/kinmitraAnimation.gif';

const SetGen: React.FC = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [sourceType, setSourceType] = useState("Necklace");
  const [targetType, setTargetType] = useState("Necklace");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    if (!sessionId) {
      alert('Session ID not found. Please refresh the page.');
    }
  }, [sessionId]);

  // API call function
  const callLambda = async (endpointUrl: string, payload: object) => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(endpointUrl, payload);
      return response.data;
    } catch (error) {
      console.error("Lambda call error:", error);
      return null;
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle API call for image generation
  const handleGenerate = async () => {
    if (!selectedImage) {
      alert("Please upload an image to proceed.");
      return;
    }

    setIsLoading(true);
    setError("");

    const payload = {
      image: selectedImage.split(",")[1], // Remove the base64 prefix
      source_type: sourceType,
      target_type: targetType,
    };

    // Log payload before making the API call
    console.log("Payload being sent to API:", payload);

    try {
      const response = await callLambda(
        "https://62vphpjt4l.execute-api.us-east-1.amazonaws.com/default/SetGenerator",
        payload
      );

      // Log the response from the API
      console.log("API Response:", response);

      if (response) {
        setGeneratedImages(response.uploaded_image_urls || []);
      } else {
        setError("Error: Unable to generate images.");
      }
    } catch (e) {
      setError("Failed to make API request.");
      // Log error
      console.error("Error during API request:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image selection
  const handleImageSelect = (imageBase64: string) => setSelectedImage(imageBase64);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
          <img
            src={kinmitraAnimation}
            alt="Loading Animation"
            className="w-[200px] h-[200px] object-cover"
          />
        </div>
      )}

      {/* Background and White Overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-bottom opacity-70 z-[-100]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-golden-linear-background_23-2148957745.jpg?t=st=1730912970~exp=1730916570~hmac=2214eb1073666d65e11ff89c47d76300904bf1001e6128bf610138ef42d5e872&w=900')",
        }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-60 z-[-90]"></div>

      {/* Header */}
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
        <p>Set Generation</p>
        <img
          className="w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/vector-set-women-with-jewelry-flat-design-style_995281-17686.jpg"
          alt="User Icon"
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-6 relative z-10">
        <div className="flex flex-wrap gap-6 justify-center items-center w-full">
          {/* Uploaded Image Preview */}
          <div
            className="h-[250px] w-[250px] border-2 flex items-center justify-center cursor-pointer p-4"
            onClick={() => setIsUploadVisible(true)}
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

          {/* Generated Images */}
          {generatedImages.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="h-[250px] w-[250px]">
                  <img
                    src={image}
                    alt={`Generated ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[250px] w-[250px] border-2 flex items-center justify-center p-4">
              <span className="text-sm text-gray-600">Generated Image</span>
            </div>
          )}
        </div>

        {/* Dropdowns for Source and Target Types */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium w-32 text-right">Source Type:</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
              className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Necklace">Necklace</option>
              <option value="Earring">Earring</option>
              <option value="Pendant">Pendant</option>
              <option value="Rings">Rings</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium w-32 text-right">Target Type:</label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Necklace">Necklace</option>
              <option value="Earring">Earring</option>
              <option value="Pendant">Pendant</option>
              <option value="Rings">Rings</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500">{error}</p>}
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

export default SetGen;
