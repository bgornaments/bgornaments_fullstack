import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Swal from "sweetalert2";
import imagesData from "./images.json";
import { IMAGE_GENERATOR } from "../../constantsAWS"; 

const DetailedImageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imageData, setImageData] = useState<any>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const image = imagesData.find((img) => img.id === parseInt(id || "0"));
    setImageData(image);
  }, [id]);

  const handleRefineDesign = async () => {
    if (imageData) {
      setIsLoading(true);
      setError(null);
  
      try {
        const payload = {
          imgURL: imageData.src,
          taskType: "IMAGE_VARIATION",
          numImages: 3,
        };
  
        const response = await axios.post(IMAGE_GENERATOR, JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log("API response:", response);

        const parsedBody = JSON.parse(response.data.body);
        if (parsedBody.error) {
          throw new Error(parsedBody.error);
        }
        const newImages = parsedBody.uploaded_image_urls;
        setGeneratedImages(newImages);
      } catch (error) {
        setError("Error refining design. Please try again.");
        console.error("Error refining design:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  
  

  return (
    <div className="min-h-screen p-4">
      {imageData ? (
        <>
          <div className="flex flex-col items-center">
            <img src={imageData.src} alt={imageData.description} className="w-1/2 h-auto mb-4" />
            <p>{imageData.description}</p>
            <button
              onClick={handleRefineDesign}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Refine Selected Design
            </button>
          </div>
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4">
            {generatedImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Generated ${idx}`} className="w-1/4 h-auto" />
            ))}
          </div>
        </>
      ) : (
        <p>Loading image data...</p>
      )}
    </div>
  );
};

export default DetailedImageView;
