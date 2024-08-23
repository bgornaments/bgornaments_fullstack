import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import MuiPagination from "./Pagination";
import FilterSidebar from "./FilterSidebar";
import FloatingButton from "./FloatingButton";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateFormData } from '../../redux/formSlice';
import { addLikedImage, removeLikedImage, setLikedImages } from '../../redux/likedImagesSlice';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";

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

const ImageGallery: React.FC<{
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
  sidebarVisible: boolean;
}> = ({
  searchTerm,
  filters,
  setFilters,
  sidebarVisible,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);
  const { occasion, jewelryType, gender, ageGroup } = formData;

  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ImageData[] = await response.json();
        console.log(data);
        data.sort((a, b) => {
          if (a.Timestamp && b.Timestamp) {
            return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
          }
          return 0;
        });
        setImages(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  const handleLike = (url: string) => {
    if (likedImages.includes(url)) {
      dispatch(removeLikedImage(url));
    } else {
      dispatch(addLikedImage(url));
    }
    const updatedLikedImages = likedImages.includes(url)
      ? likedImages.filter((imageUrl) => imageUrl !== url)
      : [...likedImages, url];
    localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
  };

  const handleImageClick = (url: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to View image details. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('redirectPath', location.pathname);
          navigate("/login");
        }
      });
      return;
    }
    const detailedViewUrl = `/catalog/${encodeURIComponent(url)}`;
    window.open(detailedViewUrl, '_blank', 'noopener,noreferrer');
  };

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
      image.ProcessedFlag === true &&
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.material ? image.material === filters.material : true) &&
      (filters.gemstone ? image.gemstone === filters.gemstone : true) &&
      (filters.design ? image.design === filters.design : true) &&
      (filters.type ? image.JewelleryType === filters.type : true)
  );

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setFilters({ material: "", gemstone: "", design: "", type: "" });
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><FaSpinner className="text-3xl animate-spin" /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className={`md:block ${sidebarVisible ? 'block' : 'hidden'} w-full md:w-[23%] `}>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          sidebarVisible={sidebarVisible} 
        />
      </div>

      <main className="w-full md:w-3/4 p-8 flex flex-col gap-[1.5vh] text-customBlack">
        {filtersMatchFormData() && (
          <>
            <h4 className="text-md md:text-2xl font-serif font-semibold leading-loose">{heading}</h4>
            <p className="text-[0.5rem] md:text-sm">{resultDescription}</p>
          </>
        )}

        {paginatedImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 mt-8">
            {paginatedImages.map((image) => (
              <div
                key={image.url}
                className="relative group w-full h-56"
                onClick={() => handleImageClick(image.url)}
              >
        <div className="relative w-full h-full">
    {imageLoading[image.url] && (
      <div className="absolute inset-0 flex items-center justify-center">
        <FaSpinner className="text-3xl animate-spin" />
      </div>
    )}
    <img
      src={image.url}
      alt={image.description}
      className={`w-full h-[11rem] lg:h-full object-cover rounded-lg ${imageLoading[image.url] ? 'opacity-0' : 'opacity-100'}`}
      onClick={() => handleImageClick(image.url)}
      onLoad={() => setImageLoading(prev => ({ ...prev, [image.url]: false }))}
      onError={() => setImageLoading(prev => ({ ...prev, [image.url]: false }))}
      onLoadStart={() => setImageLoading(prev => ({ ...prev, [image.url]: true }))}
    />
  </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white p-2 text-center rounded-lg">
                  <p>{image.description}</p>
                </div>
                <button
                  className="absolute top-2 right-2 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleLike(image.url);
                  }}
                >
                  <AiOutlineHeart
                    size={24}
                    color={likedImages.includes(image.url) ? "red" : "gray"}
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
