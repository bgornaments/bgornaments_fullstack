import React from "react";

interface ImagePopupProps {
  images: string[];
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl h-[80vh] flex flex-col">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Uploaded Images</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Image Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.length > 0 ? (
              images.map((url, index) => (
                <div key={index} className="w-40 h-40 sm:w-48 sm:h-48 border rounded-lg overflow-hidden shadow-md">
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No images found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
