import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./ImageGrid.css";

interface Image {
    imageId: string;
    imageUrl: string;
    selected?: boolean;
    discarded?: boolean;
}

function ImageGrid() {
    const [images, setImages] = useState<Image[]>([]);
    const [filteredImages, setFilteredImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);  // Tracks selected images
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://2isixn6on3.execute-api.ap-south-1.amazonaws.com/dev/fetch_img_urls_from_dynamodb');
                const data = await response.json();

                // Filter out images that are marked as selected or deleted
                const filteredImages = data.filter((img: Image) => !img.selected && !img.discarded);

                setImages(data);
                setFilteredImages(filteredImages)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching images:", error);
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading) return <div className="loading">Loading images...</div>;

    // Toggle selection of an image
    const handleSelectImage = (imageId: string) => {
        setSelectedImages(prev =>
            prev.includes(imageId) ? prev.filter(id => id !== imageId) : [...prev, imageId]
        );
    };

    // Send selected images to the backend with an action ("select" or "discard")
    const updateImages = async (action: string) => {
        try {
            const response = await fetch('https://2isixn6on3.execute-api.ap-south-1.amazonaws.com/dev/select_discard_images_in_dynamodb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageIds: selectedImages,
                    action: action
                })
            });
            console.log(JSON.stringify({
                imageIds: selectedImages,
                action: action
            }))

            if (response.ok) {
                alert(`Images marked as ${action}ed successfully.`);
                setSelectedImages([]); // Clear selection after updating
            } else {
                console.error(`Error ${action}ing images`);
            }
        } catch (error) {
            console.error(`Error ${action}ing images:`, error);
        }
    };


    // Show only selected images
    const handleShowSelectedImages = () => {
        const selectedImagesList = images.filter(img => img.selected);
        navigate('/filteredImages', { state: { images: selectedImagesList, title: "Selected Images" } });
    };

    const handleShowDeletedImages = () => {
        const deletedImagesList = images.filter(img => img.discarded);
        navigate('/filteredImages', { state: { images: deletedImagesList, title: "Deleted Images" } });
    };

    return (
        <div>
            <div className="buttons">
                <button onClick={() => updateImages("select")}>Select Images</button>
                <button onClick={() => updateImages("discard")}>Discard Images</button>
            </div>
            <div className="buttons">
                <button onClick={handleShowSelectedImages}>Show Selected Images</button>
                <button onClick={handleShowDeletedImages}>Show Deleted Images</button>
            </div>
            <div className="image-grid">
                {filteredImages.map(image => (
                    <div key={image.imageId} className="image-item">
                        <img src={image.imageUrl} alt="" className="image" />
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedImages.includes(image.imageId)}
                                onChange={() => handleSelectImage(image.imageId)}
                            />
                            Select
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
