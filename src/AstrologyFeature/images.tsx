/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useNavigate, useLocation } from "react-router-dom";

// Asset imports for filter icons
import filter_1 from "/src/assets/filter_1.png";
import filter_2 from "/src/assets/filter_2.png";
import filter_3 from "/src/assets/filter_3.png";
import filter_4 from "/src/assets/filter_4.png";

// -----------------------------------------------------
// Define an interface for jewelry filter options
// -----------------------------------------------------
interface JewelryFilters {
  jewelryType: string[];
  gemstone: string[];
  metal: string[];
  designStyle: string[];
  engraving: string[];
}

// ----------------------
// FilterSidebar Component
// ----------------------
type FilterKeys = keyof JewelryFilters; // "jewelryType" | "gemstone" | "metal" | "designStyle" | "engraving"

interface FilterSidebarProps {
  filters: { jewelryType: string; gemstone: string; metal: string; designStyle: string; engraving: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ jewelryType: string; gemstone: string; metal: string; designStyle: string; engraving: string }>
  >;
  resetFilters: () => void;
  sidebarVisible: boolean;
  jewelryFilters: JewelryFilters;
  onGenerateMore: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  resetFilters,
  sidebarVisible,
  jewelryFilters,
  onGenerateMore,
}) => {
  const [expanded, setExpanded] = useState<{ [key in FilterKeys]: boolean }>({
    jewelryType: false,
    gemstone: false,
    metal: false,
    designStyle: false,
    engraving: false,
  });

  const filterOptions: { name: FilterKeys; label: string; image: string; options: string[] }[] = [
    {
      name: "jewelryType",
      label: "Jewelry Type",
      image: filter_4,
      options: jewelryFilters.jewelryType,
    },
    {
      name: "gemstone",
      label: "Gemstone",
      image: filter_2,
      options: jewelryFilters.gemstone,
    },
    {
      name: "metal",
      label: "Metal",
      image: filter_1,
      options: jewelryFilters.metal,
    },
    {
      name: "designStyle",
      label: "Design Style",
      image: filter_3,
      options: jewelryFilters.designStyle,
    },
    {
      name: "engraving",
      label: "Engraving Option",
      image: filter_3, // Reusing icon (replace with a dedicated icon if available)
      options: jewelryFilters.engraving,
    },
  ];

  const toggleExpand = (filterName: FilterKeys) => {
    setExpanded((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleFilterChange = (filterName: FilterKeys, option?: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: option || "" }));
  };

  return (
    <aside className={`w-full p-8 top-14 left-0 md:static ${sidebarVisible ? "bg-[#ffffff]" : ""} z-50`}>
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
                    className={`px-4 py-1 text-[14px] md:text-[0.9vw] rounded-xl cursor-pointer shadow-md transition-all ${
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
      {/* Generate More Designs option */}
      <div className="flex gap-[10vw] justify-center md:justify-start mt-4">
        <button
          className="rounded-xl border-2 border-lightGolden bg-lightGolden/10 px-4 py-2 text-lightGolden text-sm hover:underline opacity-80"
          onClick={onGenerateMore}
        >
          Generate More Designs
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
  filters: { jewelryType: string; gemstone: string; metal: string; designStyle: string; engraving: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ jewelryType: string; gemstone: string; metal: string; designStyle: string; engraving: string }>
  >;
  sidebarVisible: boolean;
  jewelryFilters: JewelryFilters;
  // New prop: initialImages passed from location state
  initialImages: ImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  searchTerm,
  filters,
  setFilters,
  sidebarVisible,
  jewelryFilters,
  initialImages,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const likedImages = useSelector((state: RootState) => state.likedImages.likedImages);
  const { occasion, jewelryType, gender, ageGroup } = formData;
  // Use initialImages from props instead of fetching via API
  const [images, setImages] = useState<ImageData[]>(initialImages);
  const [loading, ] = useState(false);
  const [error, ] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [generatePage, setGeneratePage] = useState(1);
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (!occasion || !jewelryType || !gender || !ageGroup) {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        dispatch(updateFormData(parsedData));
      }
    }
  }, [dispatch, occasion, jewelryType, gender, ageGroup]);

  // Set initial filters based on formData; note that gemstone, metal, designStyle, engraving now start as empty strings.
  useEffect(() => {
    setFilters({
      jewelryType: formData.jewelryType || "",
      gemstone: "",
      metal: "",
      designStyle: "",
      engraving: "",
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

  // Filter images based on search term and filters.
  const filteredImages = images.filter(
    (image) =>
      image.ProcessedFlag === true &&
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.metal ? image.material === filters.metal : true) &&
      (filters.gemstone ? image.gemstone === filters.gemstone : true) &&
      (filters.designStyle ? image.design === filters.designStyle : true) &&
      (filters.jewelryType ? image.JewelleryType === filters.jewelryType : true)
  );

  const resetFilters = () => {
    setFilters({ jewelryType: "", gemstone: "", metal: "", designStyle: "", engraving: "" });
  };

  // Function to handle "Generate More Designs" (optional additional images)
  const handleGenerateMore = async () => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${generatePage}&limit=6`);
      if (!response.ok) {
        alert("No response from API");
        return;
      }
      const data = await response.json();
      alert("Generate more clicked!");
      if (!data || !Array.isArray(data)) {
        alert("No response from API");
        return;
      }
      // Map the Picsum API response to our ImageData structure.
      const newImages: ImageData[] = data.map((item: any) => ({
        url: item.download_url,
        description: `Image by ${item.author}`,
        material: "",
        gemstone: "",
        design: "",
        JewelleryType: "",
        ProcessedFlag: true,
        Timestamp: new Date().toISOString(),
      }));
      // Append the new images to the existing list.
      setImages((prev) => [...prev, ...newImages]);
      setGeneratePage((prev) => prev + 1);
    } catch (error) {
      alert("No response from API");
    }
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
      {/* Sidebar */}
      <div className={`md:block ${sidebarVisible ? "block" : "hidden"} w-full md:w-[15%] mt-4`}>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          sidebarVisible={sidebarVisible}
          jewelryFilters={jewelryFilters}
          onGenerateMore={handleGenerateMore}
        />
      </div>
      {/* Main Gallery */}
      <main className="w-full md:w-[85%] p-4 flex flex-col gap-4 text-customBlack">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 mt-8">
            {filteredImages.map((image) => (
              <div
                key={image.url}
                className="relative group w-[80%] mx-auto aspect-square ml-8"
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
                    className={`w-full h-full object-cover rounded-lg ${imageLoading[image.url] ? "opacity-0" : "opacity-100"}`}
                    placeholder={<FaSpinner />}
                    afterLoad={() => setImageLoading((prev) => ({ ...prev, [image.url]: false }))}
                    onError={() => setImageLoading((prev) => ({ ...prev, [image.url]: false }))}
                    onLoadStart={() => setImageLoading((prev) => ({ ...prev, [image.url]: true }))}
                  />
                </div>
                <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white p-2 text-center rounded-lg">
                  <p className="text-[2vw] md:text-[1vw] tracking-widest max-w-[80%]">{image.description}</p>
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
      </main>
    </div>
  );
};

// ----------------------
// Main AstroJewelryApp Component
// ----------------------
const AstroJewelryApp: React.FC = () => {
  const locationState = useLocation();

  // Extract jewelryFilters and images from location state.
  const defaultJewelryFilters: JewelryFilters = {
    jewelryType: ["Pendant", "Necklaces", "Earrings", "Rings"],
    gemstone: ["Diamond", "Emerald", "Ruby"],
    metal: ["Gold", "Silver", "Rose gold", "Platinum"],
    designStyle: ["Classic", "Modern", "Vintage"],
    engraving: ["No Engraving", "Engrave Name", "Custom Engraving"],
  };

  const initialJewelryFilters: JewelryFilters = locationState.state?.jewelryFilters || defaultJewelryFilters;

  const initialImagesFromState: string[] = locationState.state?.images?.image_urls || [];
  
  const initialImages = initialImagesFromState.map((url: string) => ({
    url,
    description: "Astrology generated design",
    material: "",
    gemstone: "",
    design: "",
    JewelleryType: "",
    ProcessedFlag: true,
    Timestamp: new Date().toISOString(),
  }));

  const [searchTerm] = useState("");
  const [filters, setFilters] = useState({
    jewelryType: "",
    gemstone: "",
    metal: "",
    designStyle: "",
    engraving: "",
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="header absolute top-0 left-0 right-0 p-4 sm:p-8 text-center z-20 mb-4 lg:border-2 lg:h-28 lg:bg-[#f7f2ee] ">
        <h1 className="text-yellow-600 text-xl sm:text-2xl font-bold mb-2 lg:text-3xl drop-shadow-[0px_0px_16px_rgba(224,174,42,1.0)]">
          Your Astrology Collection
        </h1>
      </div>
      {/* Hamburger menu (visible on small screens) */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      {/* The container below now includes a margin-top on large screens to shift the image gallery down from the header */}
      <div className="px-[2vw] pb-10 lg:mt-24">
        <ImageGallery
          searchTerm={searchTerm}
          filters={filters}
          setFilters={setFilters}
          sidebarVisible={sidebarVisible}
          jewelryFilters={initialJewelryFilters}
          initialImages={initialImages}
        />
      </div>
    </div>
  );
};

export default AstroJewelryApp;
