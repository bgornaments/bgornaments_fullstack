import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import MuiPagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";
import { useNavigate } from "react-router-dom";
import FloatingButton from "./FloatingButton";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateFormData } from '../../redux/formSlice';
import { addLikedImage, removeLikedImage, setLikedImages } from '../../redux/likedImagesSlice';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner icon or use any other loading indicator

interface ImageGalleryProps {
  images: Array<{
    id: number;
    src: string;
    description: string;
    material: string;
    gemstone: string;
    design: string;
    type: string;
  }>;
  searchTerm: string;
  filters: { material: string; gemstone: string; design: string; type: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      material: string;
      gemstone: string;
      design: string;
      type: string;
    }>
  >;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  searchTerm,
  filters,
  setFilters,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form.formData);
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);
  const { occasion, jewelryType, gender, ageGroup } = formData;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (!occasion || !jewelryType || !gender || !ageGroup) {
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        dispatch(updateFormData(parsedData));
      }
    }
  }, [dispatch, occasion, jewelryType, gender, ageGroup]);

  useEffect(() => {
    setFilters({
      material: "", 
      gemstone: "",  
      design: "",   
      type: formData.jewelryType || "", 
    });
  }, [formData, setFilters]);

  useEffect(() => {
    const savedLikedImages = localStorage.getItem('likedImages');
    if (savedLikedImages) {
      dispatch(setLikedImages(JSON.parse(savedLikedImages)));
    }
  }, [dispatch]);

  const heading = `${occasion || 'Occasion'} ${jewelryType || 'Jewelry Type'} from ${gender === 'Female' ? 'her' : 'him'}`;
  const resultDescription = `Showing results for ${jewelryType || 'jewelry type'} for the occasion of ${occasion || 'occasion'}, for a ${gender === 'Female' ? 'female' : 'male'} aged ${ageGroup || 'age group'}`;

  const filtersMatchFormData = () => {
    return (
      filters.material === "" &&
      filters.gemstone === "" &&
      filters.design === "" &&
      filters.type === (formData.jewelryType || "")
    );
  };

  const filteredImages = images.filter(
    (image) =>
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.material ? image.material === filters.material : true) &&
      (filters.gemstone ? image.gemstone === filters.gemstone : true) &&
      (filters.design ? image.design === filters.design : true) &&
      (filters.type ? image.type === filters.type : true)
  );

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLike = (id: number) => {
    if (likedImages.includes(id)) {
      dispatch(removeLikedImage(id));
    } else {
      dispatch(addLikedImage(id));
    }
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
  };

  const resetFilters = () => {
    setFilters({ material: "", gemstone: "", design: "", type: "" });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />

      <main className="w-full md:w-3/4 p-8 flex flex-col gap-[1.5vh] text-customBlack">
        {filtersMatchFormData() && (
          <>
            <h4 className="text-2xl font-serif font-semibold leading-loose">{heading}</h4>
            <p className="text-sm">{resultDescription}</p>
          </>
        )}

        {paginatedImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 mt-8">
            {paginatedImages.map((image) => (
              <div
                key={image.id}
                className="relative group w-full h-56"
                onClick={() => navigate(`/catalog/${image.id}`)} 
              >
                <div className="relative w-full h-full">
                  {imageLoading[image.id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaSpinner className="text-white text-3xl animate-spin" />
                    </div>
                  )}
                  <img
                    src={image.src}
                    alt={image.description}
                    className={`w-full h-full object-cover rounded-lg ${imageLoading[image.id] ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setImageLoading(prev => ({ ...prev, [image.id]: false }))}
                    onError={() => setImageLoading(prev => ({ ...prev, [image.id]: false }))}
                    onLoadStart={() => setImageLoading(prev => ({ ...prev, [image.id]: true }))}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white p-2 text-center rounded-lg">
                  <p>{image.description}</p>
                </div>
                <button
                  className="absolute top-2 right-2 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleLike(image.id);
                  }}
                >
                  <AiOutlineHeart
                    size={24}
                    color={likedImages.includes(image.id) ? "red" : "gray"}
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-56">
            <p className="text-gray-500">No results found</p>
          </div>
        )}
        <FloatingButton />

        <div className="bottom-0 left-0 right-0 flex w-full">
          <div className="flex-1 flex justify-center">
            <MuiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageGallery;
