import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface ImageData {
  url: string;
  description: string;
  material: string;
  gemstone: string;
  design: string;
  JewelleryType: string;
  ProcessedFlag?: boolean;
  Timestamp?: string;
}

interface FormData {
  description: string;
  gemstone: string;
  type: string;
  material: string;
  design: string;
}

const MetadataEditor: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    gemstone: "",
    type: "",
    material: "",
    design: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewingMetadata, setViewingMetadata] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB");
        const isResponseOk = response.ok;
        if (!isResponseOk) {
          throw new Error('Network response was not ok');
        }
        const data: ImageData[] = await response.json();
        const sortedData = data.sort((a, b) => {
          const aTimestamp = a.Timestamp;
          const bTimestamp = b.Timestamp;
          if (aTimestamp && bTimestamp) {
            const aDate = new Date(aTimestamp);
            const bDate = new Date(bTimestamp);
            const timeDiff = bDate.getTime() - aDate.getTime();
            return timeDiff;
          }
          return 0;
        });
        setImages(sortedData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof FormData) => {
    const newValue = e.target.value;
    const updatedFormData = { ...formData };
    updatedFormData[key] = newValue;
    setFormData(updatedFormData);
  };

  const handleAddData = async () => {
    if (!selectedImage) {
      return;
    }
    try {
      const requestBody = {
        url: selectedImage,
        description: formData.description,
        gemstone: formData.gemstone,
        JewelleryType: formData.type,
        material: formData.material,
        design: formData.design,
        mode: "add_to_catalog",
      };
      const jsonBody = JSON.stringify(requestBody);
      const sendData = { body: jsonBody };
      const config = { headers: { "Content-Type": "application/json" } };
      await axios.post(
        "https://q6j33yoy61.execute-api.us-east-1.amazonaws.com/fetchdb",
        sendData,
        config
      );
      const updatedImages = images.filter((image) => {
        const shouldKeep = image.url !== selectedImage;
        return shouldKeep;
      });
      setImages(updatedImages);
      setSelectedImage(null);
      setViewingMetadata(null);
      const resetForm = {
        description: "",
        gemstone: "",
        type: "",
        material: "",
        design: ""
      };
      setFormData(resetForm);
      alert("Metadata added successfully!");
    } catch {
      alert("Failed to add data to catalogue");
    }
  };

  const handleViewMetadata = (url: string) => {
    setViewingMetadata(url);
    setSelectedImage(url);
    const image = images.find((img) => {
      const matches = img.url === url;
      return matches;
    });
    if (image) {
      const newFormData = {
        description: image.description || "",
        gemstone: image.gemstone || "",
        type: image.JewelleryType || "",
        material: image.material || "",
        design: image.design || ""
      };
      setFormData(newFormData);
    }
  };

  const handleCancelViewMetadata = () => {
    setViewingMetadata(null);
    setSelectedImage(null);
    const resetForm = {
      description: "",
      gemstone: "",
      type: "",
      material: "",
      design: ""
    };
    setFormData(resetForm);
  };

  const handleMouseEnter = (url: string) => {
    setHoveredImage(url);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const filteredImages = images.filter((image) => {
    const isProcessed = image.ProcessedFlag === true;
    return isProcessed;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#d4af37]">
        Loading...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-[#d4af37]">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5e6] via-[#f0f0f0] to-[#e6e9f0] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-[#d4af37] mb-4">
          Metadata Editor
        </h1>
        <p className="text-lg text-[#8c7853] max-w-2xl mx-auto">
          Easily edit jewelry details with our Metadata Editor! Update descriptions, gemstones,
          and more in a quick popup, then save to keep your collection fresh and customized.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredImages.map((image) => (
          <motion.div
            key={image.url}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#e6e6e6] relative"
            onMouseEnter={() => handleMouseEnter(image.url)}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={image.url} 
              alt={image.description} 
              className="w-full h-80 object-cover" 
            />
            {hoveredImage === image.url && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              >
                <div className="text-white p-4 space-y-2">
                  <p className="mb-2">Description: {image.description || "N/A"}</p>
                  <p className="mb-2">Gemstone: {image.gemstone || "N/A"}</p>
                  <p className="mb-2">Type: {image.JewelleryType || "N/A"}</p>
                  <p className="mb-2">Material: {image.material || "N/A"}</p>
                  <p className="mb-2">Design: {image.design || "N/A"}</p>
                </div>
              </motion.div>
            )}
            <div className="p-4 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewMetadata(image.url)}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white px-6 py-2 rounded-full font-medium"
              >
                Edit Metadata
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {viewingMetadata && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full border border-[#d4af37]"
          >
            <h3 className="font-semibold text-[#8c7853] text-xl mb-4">
              Edit Metadata
            </h3>
            {[
              { label: "Description", key: "description" },
              { label: "Gemstone", key: "gemstone" },
              { label: "Type", key: "type" },
              { label: "Material", key: "material" },
              { label: "Design", key: "design" },
            ].map(({ label, key }) => (
              <label key={key} className="block mb-4">
                <span className="text-[#8c7853]">
                  {label}:
                </span>
                <input
                  type="text"
                  value={formData[key as keyof FormData]}
                  onChange={(e) => handleChange(e, key as keyof FormData)}
                  className="mt-1 border border-[#e6e6e6] p-2 w-full rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                />
              </label>
            ))}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddData}
                className="bg-[#d4af37] text-white px-6 py-2 rounded-full"
              >
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelViewMetadata}
                className="bg-[#8c7853] text-white px-6 py-2 rounded-full"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MetadataEditor;