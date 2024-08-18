// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface ImageData {
//   id: number;
//   src: string;
//   description: string;
//   material: string;
//   gemstone: string;
//   design: string;
//   type: string;
//   flag: number;
// }

// const ImageEditor: React.FC = () => {
//   const [images, setImages] = useState<ImageData[]>([]);
//   const [editingImage, setEditingImage] = useState<ImageData | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           "https://xv0pa26r4d.execute-api.us-east-1.amazonaws.com/prod"
//         );
//         const allImages: ImageData[] = response.data;
//         const flaggedImages = allImages.filter((image) => image.flag === 0);
//         setImages(flaggedImages);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     key: keyof Omit<ImageData, "id" | "flag" | "src">
//   ) => {
//     if (editingImage) {
//       setEditingImage({
//         ...editingImage,
//         [key]: e.target.value,
//       });
//     }
//   };

//   const handleSave = async () => {
//     if (editingImage) {
//       try {
//         const requestBody = {
//           body: JSON.stringify(editingImage),
//         };
//         const response = await axios.post(
//           "https://xv0pa26r4d.execute-api.us-east-1.amazonaws.com/prod",
//           requestBody,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response.data);
//         // setEditingImage(null);
//         // window.location.reload();
//       } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             console.error("Error updating image:", error.response.data);
//             alert(
//               `Error: ${error.response.data.error || "Unknown error occurred"}`
//             );
//           } else {
//             console.error("Error updating image:", error.message);
//             alert("Failed to update image");
//           }
//         } else if (error instanceof Error) {
//           console.error("Unexpected error:", error.message);
//           alert("An unexpected error occurred");
//         } else {
//           console.error("Unknown error:", error);
//           alert("An unknown error occurred");
//         }
//       }
//     }
//   };

//   const handleAddToCatalogue = async () => {
//     if (editingImage) {
//         try {
//             await handleSave();
//             const requestBody = {
//                 body: JSON.stringify({
//                     id: editingImage.id,
//                     flag: 1,
//                 }),
//             };
//             console.log(requestBody);
//             const response = await axios.post(
//                 "https://16s5b48qaf.execute-api.us-east-1.amazonaws.com/prod2/",
//                 requestBody,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             console.log(response.data);

//             alert("Image added to catalogue successfully");
//             setEditingImage(null);
//             window.location.reload();
//         } catch (error) {
//             console.error("Error adding image to catalogue:", error);
//             alert("Failed to add image to catalogue");
//         }
//     }
// };

//   return (
//     <div className="min-h-screen bg-[#fff9f5] p-20">
//       <h1 className="text-2xl font-bold mb-4">Image Editor</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {images.map((image) => (
//           <div key={image.id} className="border p-4 rounded-lg shadow-md">
//             <img
//               src={image.src}
//               alt={image.description}
//               className="w-full h-80 object-cover mb-2 rounded-lg"
//             />
//             <div>
//               <button
//                 onClick={() => setEditingImage(image)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {editingImage && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center ">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//             <h2 className="text-xl font-bold mb-4">Edit Image</h2>
//             <label className="block mb-2">
//               Description:
//               <input
//                 type="text"
//                 value={editingImage.description}
//                 onChange={(e) => handleChange(e, "description")}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Material:
//               <input
//                 type="text"
//                 value={editingImage.material}
//                 onChange={(e) => handleChange(e, "material")}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Gemstone:
//               <input
//                 type="text"
//                 value={editingImage.gemstone}
//                 onChange={(e) => handleChange(e, "gemstone")}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Design:
//               <input
//                 type="text"
//                 value={editingImage.design}
//                 onChange={(e) => handleChange(e, "design")}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Type:
//               <input
//                 type="text"
//                 value={editingImage.type}
//                 onChange={(e) => handleChange(e, "type")}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <button
//               onClick={handleSave}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={handleAddToCatalogue}
//               className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Add to Catalogue
//             </button>
//             <button
//               onClick={() => setEditingImage(null)}
//               className="bg-red-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageEditor;
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ImageData {
  url: string;
}

interface FormData {
  description: string;
  gemstone: string;
  type: string;
  material: string;
  design: string;
}

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    gemstone: "",
    type: "",
    material: "",
    design: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://q6j33yoy61.execute-api.us-east-1.amazonaws.com/fetchdb"
        );
        // console.log(response)
        setImages(response.data.body.map((url: string) => ({ url })));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleAddData = async () => {
    if (selectedImage) {
      try {
        const requestBody = {
          url: selectedImage,
          ...formData,
        };
        const sendData = {
          body: JSON.stringify(requestBody),
        };
        console.log(requestBody);
        const response = await axios.post(
          "https://q6j33yoy61.execute-api.us-east-1.amazonaws.com/fetchdb",
          sendData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        // alert("Data added to catalogue successfully");
        setSelectedImage(null);
        setFormData({
          description: "",
          gemstone: "",
          type: "",
          material: "",
          design: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error adding data to catalogue:", error);
        alert("Failed to add data to catalogue");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] p-20">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.url} className="border p-4 rounded-lg shadow-md">
            <img
              src={image.url}
              alt="Uploaded"
              className="w-full h-80 object-cover mb-2 rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(image.url)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add Data for Image</h2>
            <label className="block mb-2">
              Description:
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Gemstone:
              <input
                type="text"
                value={formData.gemstone}
                onChange={(e) => handleChange(e, "gemstone")}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Type:
              <input
                type="text"
                value={formData.type}
                onChange={(e) => handleChange(e, "type")}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Material:
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleChange(e, "material")}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Design:
              <input
                type="text"
                value={formData.design}
                onChange={(e) => handleChange(e, "design")}
                className="border p-2 w-full"
              />
            </label>
            <button
              onClick={handleAddData}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Catalogue
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
