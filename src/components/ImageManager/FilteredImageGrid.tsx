// src/FilteredImageGrid.js
import { useLocation } from 'react-router-dom';
import '/src/components/ImageManager/ImageGrid.css';

interface Image {
    imageId: string;
    imageUrl: string;
    selected?: boolean;
    discarded?: boolean;
}

function FilteredImageGrid() {
    const location = useLocation();
    const { images, title } = location.state || { images: [], title: "Images" };

    return (
        <div>
            <h1>{title}</h1>
            <div className="image-grid">
                {images.map((img: Image) => (
                    <div key={img.imageId} className="image-item">
                        <img src={img.imageUrl} alt="" className="image" />
                        <p>{img.imageId}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilteredImageGrid;
