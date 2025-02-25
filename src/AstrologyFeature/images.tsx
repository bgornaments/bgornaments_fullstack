import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateFormData } from "../redux/formSlice";
import { addLikedImage, removeLikedImage, setLikedImages } from "../redux/likedImagesSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaSpinner } from "react-icons/fa";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Asset imports for filter icons
import filter_1 from "/src/assets/filter_1.png";
import filter_2 from "/src/assets/filter_2.png";
import filter_3 from "/src/assets/filter_3.png";
import filter_4 from "/src/assets/filter_4.png";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MuiPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

// ----------------------
// FilterSidebar Component
// ----------------------
type FilterKeys = "material" | "gemstone" | "design" | "type";

interface FilterSidebarProps {
  filters: { material: string; gemstone: string; design: string; type: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ material: string; gemstone: string; design: string; type: string }>
  >;
  resetFilters: () => void;
  sidebarVisible: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  resetFilters,
  sidebarVisible,
}) => {
  const [expanded, setExpanded] = useState<{ [key in FilterKeys]: boolean }>({
    material: false,
    gemstone: false,
    design: false,
    type: false,
  });

  const filterOptions = [
    {
      name: "type" as FilterKeys,
      label: "Jewelry Type",
      image: filter_4,
      options: ["Rings", "Necklaces", "Bracelets", "Earrings", "Bangles", "Pendants", "Chains"],
    },
    {
      name: "material" as FilterKeys,
      label: "Material",
      image: filter_1,
      options: ["Gold", "Silver", "Rose gold", "Platinum"],
    },
    {
      name: "gemstone" as FilterKeys,
      label: "Gemstone Type",
      image: filter_2,
      options: ["Diamond", "Emerald", "Ruby"],
    },
    {
      name: "design" as FilterKeys,
      label: "Design Style",
      image: filter_3,
      options: ["Classic", "Modern", "Vintage"],
    },
  ];

  const toggleExpand = (filterName: FilterKeys) => {
    setExpanded((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleFilterChange = (filterName: FilterKeys, option?: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: option || "" }));
  };

  return (
    <aside
      className={`w-full p-8 fixed top-14 left-0 md:static ${
        sidebarVisible ? "bg-[#ffffff]" : ""
      } z-50`}
    >
      {filterOptions.map((filter) => (
        <div className="mb-6" key={filter.name}>
          <h3
            className="text-sm lg:text-lg text-customBlack/70 mb-4 cursor-pointer flex items-center font-custom tracking-widest font-black"
            onClick={() => toggleExpand(filter.name)}
          >
            <img src={filter.image} alt={`${filter.label} icon`} className="w-4 mr-2" />
            {filter.label}
          </h3>
          {expanded[filter.name] && (
            <div>
              <div className="flex flex-wrap gap-2 mb-2 mx-2">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-1 xs:text-[2.3vw] md:text-[1.1vw] lg:text-[0.8vw] rounded-xl cursor-pointer shadow-md transition-all ${
                      filters[filter.name] === option
                        ? "bg-navbar text-customBlack/70"
                        : "bg-transparent text-customBlack/70 border border-navbar"
                    }`}
                    onClick={() => handleFilterChange(filter.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="text-lightGolden xs:text-[2.3vw] md:text-[1.1vw] lg:text-[0.8vw] hover:underline mx-3 opacity-80"
                onClick={() => handleFilterChange(filter.name)}
              >
                Clear choice
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-[10vw] justify-center md:justify-start">
        <button className="text-lightGolden text-sm hover:underline opacity-80" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </aside>
  );
};

// ----------------------
// ImageGallery Component
// ----------------------
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

interface ImageGalleryProps {
  searchTerm: string;
  filters: { material: string; gemstone: string; design: string; type: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ material: string; gemstone: string; design: string; type: string }>
  >;
  sidebarVisible: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
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
  // Set itemsPerPage to 6 for a 3x2 grid.
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ImageData[] = await response.json();
        data.sort((a, b) => {
          if (a.Timestamp && b.Timestamp) {
            return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
          }
          return 0;
        });
        setImages(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!occasion || !jewelryType || !gender || !ageGroup) {
      const savedFormData = localStorage.getItem("formData");
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
    const savedLikedImages = localStorage.getItem("likedImages");
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
    localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
  };

  const encodeUrl = (url: string) => btoa(url);

  const handleImageClick = (url: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Log In",
        text: "You need to log in to view image details. Click the button below to log in.",
        icon: "warning",
        confirmButtonText: "Log In",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("redirectPath", location.pathname);
          navigate("/login");
        }
      });
      return;
    }
    const detailedViewUrl = `/expert-mode/astrology/astroSign/astro-images/${encodeUrl(url)}`;
    window.open(detailedViewUrl, "_blank", "noopener,noreferrer");
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
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="text-3xl animate-spin text-customGreen" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar: on md screens it takes 15% of width */}
      <div className={`md:block ${sidebarVisible ? "block" : "hidden"} w-full md:w-[15%] mt-4`}>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          sidebarVisible={sidebarVisible}
        />
      </div>
      {/* Main Gallery: on md screens uses 85% of width */}
      <main className="w-full md:w-[85%] p-4 flex flex-col gap-4 text-customBlack">
        {paginatedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16 mt-8">
            {paginatedImages.map((image) => (
              <div
                key={image.url}
                className="relative group w-full aspect-square" // ensures square aspect ratio
                onClick={() => handleImageClick(image.url)}
              >
                <div className="relative w-full h-full">
                  {imageLoading[image.url] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaSpinner className="text-3xl animate-spin" />
                    </div>
                  )}
                  <LazyLoadImage
                    src={image.url}
                    alt={image.description}
                    className={`w-full h-full object-cover rounded-lg ${
                      imageLoading[image.url] ? "opacity-0" : "opacity-100"
                    }`}
                    placeholder={<FaSpinner />}
                    afterLoad={() => setImageLoading((prev) => ({ ...prev, [image.url]: false }))}
                    onError={() => setImageLoading((prev) => ({ ...prev, [image.url]: false }))}
                    onLoadStart={() => setImageLoading((prev) => ({ ...prev, [image.url]: true }))}
                  />
                </div>
                <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white p-2 text-center rounded-lg">
                  <p className="text-[2vw] md:text-[1vw] tracking-widest max-w-[80%]">
                    {image.description}
                  </p>
                </div>
                <button
                  className="absolute top-2 right-2 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(image.url);
                  }}
                >
                  <AiOutlineHeart size={24} color={likedImages.includes(image.url) ? "red" : "black"} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-56">
            <p className="text-gray-500">No results found</p>
          </div>
        )}
        <div className="flex w-full">
          <div className="flex-1 flex justify-center">
            <MuiPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </main>
    </div>
  );
};

// ----------------------
// Main AstroJewelryApp Component (Hamburger added)
// ----------------------
const AstroJewelryApp: React.FC = () => {
  // The search term is static as header is removed.
  const [searchTerm] = useState("");
  const [filters, setFilters] = useState({ material: "", gemstone: "", design: "", type: "" });
  // Manage sidebar visibility (for small screens).
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hamburger menu visible on small screens */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      <div className="px-[2vw] pb-10">
        <ImageGallery
          searchTerm={searchTerm}
          filters={filters}
          setFilters={setFilters}
          sidebarVisible={sidebarVisible}
        />
      </div>
    </div>
  );
};

export default AstroJewelryApp;
