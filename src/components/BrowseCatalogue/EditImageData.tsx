/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [metadata, setMetadata] = useState<{ [url: string]: any }>({});
  const [viewingMetadata, setViewingMetadata] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://q6j33yoy61.execute-api.us-east-1.amazonaws.com/fetchdb"
        );
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

  const handleAddData = async (mode: "add_to_catalog" | "discard_images" = "add_to_catalog") => {
    if (!selectedImage && mode === "add_to_catalog") return;
    if (selectedImages.size === 0 && mode === "discard_images") return;

    try {
      const requestBody = mode === "add_to_catalog"
        ? {
          url: selectedImage,
          ...formData,
          mode: "add_to_catalog"
        }
        : {
          url: Array.from(selectedImages),
          mode: "discard_images"
        };

      const sendData = {
        body: JSON.stringify(requestBody),
      };

      console.log(`${mode === "add_to_catalog" ? "Adding" : "Discarding"} data:`, requestBody);
      const response = await axios.post(
        "https://q6j33yoy61.execute-api.us-east-1.amazonaws.com/fetchdb",
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response);

      if (mode === "add_to_catalog") {
        setMetadata((prev) => ({
          ...prev,
          [selectedImage!]: { ...requestBody },
        }));
        setImages((prevImages) =>
          prevImages.filter((image) => image.url !== selectedImage)
        );
        setSelectedImage(null);
        setViewingMetadata(null);
        setFormData({
          description: "",
          gemstone: "",
          type: "",
          material: "",
          design: "",
        });
        alert("Metadata added successfully!");
      } else {
        // Handle discard_images mode
        setImages((prevImages) =>
          prevImages.filter((image) => !selectedImages.has(image.url))
        );
        setSelectedImages(new Set());
        alert("Images discarded successfully!");
      }
    } catch (error) {
      console.error(`Error ${mode === "add_to_catalog" ? "adding data to catalogue" : "discarding images"}:`, error);
      alert(`Failed to ${mode === "add_to_catalog" ? "add data to catalogue" : "discard images"}`);
    }
  };

  const handleDiscardImages = () => {
    if (selectedImages.size > 0) {
      handleAddData("discard_images");
    }
  };

  const toggleSelectImage = (url: string) => {
    setSelectedImages((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(url)) {
        updatedSelected.delete(url);
      } else {
        updatedSelected.add(url);
      }
      return updatedSelected;
    });
  };

  const handleFetchMetadata = async () => {
    try {
      const urlsArray = Array.from(selectedImages);
      const sendData = {
        body: JSON.stringify({ urls: urlsArray }),
      };
      console.log("Fetching metadata for URLs:", urlsArray);

      const response = await axios.post(
        "https://xy4dltx58c.execute-api.us-east-1.amazonaws.com/getMD/",
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      const results = JSON.parse(response.data.body);
      console.log("Fetched metadata:", results);

      if (Array.isArray(results)) {
        const metadataMap: { [url: string]: any } = {};
        results.forEach((result: any) => {
          metadataMap[result.url] = result;
        });
        // Merge new metadata with existing metadata
        setMetadata((prev) => ({
          ...prev,
          ...metadataMap,
        }));
      } else {
        console.error("Expected an array but got:", results);
        alert("Unexpected response format. Please try again.");
      }

      setSelectedImages(new Set());
    } catch (error) {
      console.error("Error fetching metadata:", error);
      alert("Failed to fetch metadata");
    }
  };

  const handleViewMetadata = (url: string) => {
    setViewingMetadata(url);
    const selectedMetadata = metadata[url]?.metadata || {};
    setFormData({
      description: metadata[url]?.short_description?.[0] || "",
      gemstone: selectedMetadata.Gemstones || "",
      type: "",
      material: selectedMetadata.Material || "",
      design: selectedMetadata["Design style"] || "",
    });
  };

  const handleCancelViewMetadata = () => {
    setViewingMetadata(null);
    setSelectedImage(null);
    setFormData({
      description: "",
      gemstone: "",
      type: "",
      material: "",
      design: "",
    });
  };

  const handleViewAndSelectImage = (url: string) => {
    handleViewMetadata(url);
    setSelectedImage(url);
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] p-20">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>
      <div className="flex gap-4 my-4">
        <button
          onClick={selectedImages.size > 0 ? handleFetchMetadata : undefined}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {selectedImages.size > 0
            ? "Generate Metadata"
            : "Select Images to get metadata"}
        </button>
        <button
          onClick={selectedImages.size > 0 ? handleDiscardImages : undefined}
          className={`px-4 py-2 rounded text-white ${selectedImages.size > 0 ? "bg-red-500" : "bg-red-300 cursor-not-allowed"
            }`}
        >
          {selectedImages.size > 0
            ? "Discard Images"
            : "Select Images to discard"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.url} className="border p-4 rounded-lg shadow-md">
            <img
              src={image.url}
              alt="Uploaded"
              className="w-full h-80 object-cover mb-2 rounded-lg"
            />
            <div className="flex items-center justify-around">
              <button
                onClick={() => setSelectedImage(image.url)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Data
              </button>
              {metadata[image.url] && (
                <button
                  onClick={() => handleViewAndSelectImage(image.url)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                >
                  View Metadata
                </button>
              )}
              <input
                type="checkbox"
                onChange={() => toggleSelectImage(image.url)}
                checked={selectedImages.has(image.url)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            {viewingMetadata === image.url && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h3 className="font-semibold">Edit Metadata:</h3>
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
                    onClick={() => handleAddData("add_to_catalog")}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Metadata
                  </button>
                  <button
                    onClick={handleCancelViewMetadata}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && !viewingMetadata && (
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
              onClick={() => handleAddData("add_to_catalog")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelViewMetadata}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
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