import React, { useState, useEffect , useRef } from "react";
import icon from "/src/assets/image.png";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import ai from "/src/assets/chatbot.png";
import Swal from "sweetalert2";
import { RootState, AppDispatch } from "../../redux/store";
import {
  addLikedImage,
  removeLikedImage,
  setLikedImages,
} from "../../redux/likedImagesSlice";
import { useAuthenticator } from "@aws-amplify/ui-react";
import line from "/src/assets/Line 10.png";
import order from "/src/assets/image 3.png";
import Carousel from "./Carousel";
import heart from "/src/assets/add-to-favorites (1).png";
import { FaFileImage, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ImageData {
  url: string;
  description: string;
  material: string;
  gemstone: string;
  design: string;
  JewelleryType: string;
}

const DetailedImageView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { url } = useParams<{ url: string }>();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const navigate = useNavigate();
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );
  const { user } = useAuthenticator();
  const [activeTab, setActiveTab] = useState<"details" | "description">(
    "details"
  );
  const detailsRef = useRef<HTMLDivElement>(null);

  const decodeUrl = (encodedUrl: string) => {
    return atob(encodedUrl);
  };
  useEffect(() => {
    const fetchImage = async () => {
      if (!url) {
        setError("No URL provided to fetch the image.");
        console.log(error);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tableName: "KinMitra",
              filterAttribute: "url",
              filterValue: decodeUrl(url),
            }),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse.message || "Failed to fetch image data"
          );
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        console.log(parsedBody);
        const image = parsedBody.data.find(
          (img: ImageData) => img.url === decodeUrl(url)
        );

        setImageData(image || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [url]);

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

  useEffect(() => {
    const savedLikedImages = localStorage.getItem("likedImages");
    if (savedLikedImages) {
      dispatch(setLikedImages(JSON.parse(savedLikedImages)));
    }
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    if (!imageData) return;
    const instructions = `
      <p>1. Approach retailer staff for measurements and alteration requests.<br />
      2. Place order for your unique design.</p>
      <input type="checkbox" id="confirmCheckbox" style="margin-top: 10px;" />
      <label for="confirmCheckbox"> I have understood the instructions.</label>
    `;

    const result = await Swal.fire({
      title: "Next Steps",
      html: instructions,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Place Order",
      preConfirm: () => {
        const checkbox = Swal.getPopup()?.querySelector(
          "#confirmCheckbox"
        ) as HTMLInputElement;
        if (!checkbox.checked) {
          Swal.showValidationMessage(
            "You need to confirm the instructions to proceed"
          );
          return false;
        }
        return true;
      },
    });

    if (result.isConfirmed) {
      setIsPlacingOrder(true);

      const orderDetails = {
        tableName: "Orders_Table",
        attributes: {
          userId: user?.userId,
          item: imageData.description,
          url: imageData.url,
          userMail: user.signInDetails?.loginId,
          type: imageData?.JewelleryType,
        },
      };

      try {
        const response = await fetch(
          "https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          }
        );

        if (response.ok) {
          Swal.fire(
            "Order Placed!",
            "Your order has been placed successfully. Finalize your measurements with the help of retailer staff.",
            "success"
          );
          navigate("/orders");
        } else {
          Swal.fire("Failed!", "Failed to place the order.", "error");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        Swal.fire(
          "Error!",
          "An error occurred while placing the order.",
          "error"
        );
      } finally {
        setIsPlacingOrder(false);
      }
    }
  };
  const handleTabClick = (tab: "details" | "description") => {
    setActiveTab(tab);
  };

  const handleShowMoreDetailsClick = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab("details");
  };

  return (
    <>
      <div className="">
        <header className="w-full h-[10vh] bg-navbar flex  items-center top-0 px-[8vw] md:px-[2.5rem] xl:px-[4.8rem]">
          <div className="flex items-center justify-between w-full">
            <Link to="/">
              <img
                src={icon}
                alt="Logo"
                className="w-[12vh] md:w-[10vh] xl:w-[20vh]"
              />
            </Link>
            <button
              onClick={() => navigate("/catalog/likedimages")}
              className="relative p-2"
            >
              <div className="rounded-full md:p-[0.7vh] xl:p-[1.2vh] md:border md:shadow-sm md:shadow-black/30 md:bg-white">
                <AiOutlineHeart size={20} color="black" />
                {likedImages.length > 0 && (
                  <span className="absolute top-0 right-0 bg-customRed text-white rounded-full xs:size-4 xs:text-[1.1vh] md:size-5 flex items-center justify-center md:text-xs">
                    {likedImages.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="animate-spin text-4xl text-customGreen" />
          </div>
        ) : imageData ? (
          <>
            <div className="flex flex-col md:flex-row items-center justify-around align-middle mt-[5vh] xs:gap-[3vh] md:gap-0  h-full  px-5 mb-[4vh] md:mb-[7vh]">
            <div className="relative max-w-[70%] md:max-w-[40%]">
  <img
    src={imageData.url}
    alt={imageData.description}
    className="h-[40vw] rounded-xl"
  />
  <button
    onClick={() => window.open(imageData.url, "_blank")}
    className="absolute top-2 right-2 p-2 bg-customGreen text-white rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95"
  >
    <FaFileImage/>
  </button>
</div>
              <div className="flex flex-col md:items-start max-w-[85%] md:max-w-[40%] md:pt-[1vh]">
                <p className="text-customGreen  xs:mx-10 md:mx-0 text-center md:text-start text-2xl md:text-3xl xl:text-4xl tracking-wide md:tracking-widest font-black md:max-w-[40vw] leading-normal font-custom transition-transform transform hover:scale-105 active:scale-95 ">
                  {imageData.description
                    ? imageData.description.split(" ").slice(0, 4).join(" ")
                    : `Simple ${imageData.JewelleryType || "Jewellery"} Design`}
                </p>

                <div className="flex justify-between items-center mt-1 md:mt-4 w-full ">
                  <div className="text-sm md:text-base xl:text-xl tracking-widest font-black text-customBlack/50 font-custom">
                    {imageData.JewelleryType || "Jewellery"}
                  </div>
                  <button
                    onClick={() => handleLike(imageData.url)}
                    className={`flex justify-center items-center gap-[0.4rem] md:px-10 ${
                      likedImages.includes(imageData.url)
                        ? " text-lightGolden"
                        : "text-customBlack/40"
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center transition-transform transform hover:scale-110 active:scale-95 ">
                      <img
                        src={heart}
                        alt="favorite icon"
                        className="w-[0.9rem] md:w-[1.4rem] "
                      />

                      <span className="text-[0.6rem] md:text-[0.7rem] xl:text-sm font-custom tracking-widest">
                        {likedImages.includes(imageData.url)
                          ? "Added to Favorites"
                          : "Add to Favorites"}
                      </span>
                    </div>
                  </button>
                </div>
                <div className="mt-6 md:mt-12 flex flex-col items-start justify-start text-start">
                  <div className="text-customGreen font-medium text-[0.7rem] md:text-base tracking-widest">
                    Description
                  </div>
                  <p className="xl:text-sm  md:leading-6 font-medium text-[0.6rem] md:text-[0.8rem] text-customBlack/50 mt-2">
                    {imageData.description
                      ? imageData.description.split(" ").slice(0, 4).join(" ")
                      : `Simple ${
                          imageData.JewelleryType || "Jewellery"
                        } Design`}
                  </p>
                  <button 
                  onClick={handleShowMoreDetailsClick}
                  className="text-sm md:text-lg xl:text-xl leading-6 tracking-widest text-lightGolden mt-1 md:mt-2 font-custom font-black transition-transform transform hover:scale-105 hover:text-customGreen active:scale-95 focus:outline-none">
                    Show More Details
                  </button>
                </div>

                <div className="flex flex-col items-start mt-4 md:mt-10 justify-center ">
                  <p className="md:text-sm  md:leading-6 font-medium text-[0.6rem] md:text-[0.8rem]  text-customBlack/50 mt-2">
                    Loved the design? Create a similar ones with AI!
                  </p>
                  <button className="flex gap-2 justify-center items-center transition-transform transform hover:scale-105 hover:text-customGreen active:scale-95 focus:outline-none  ">
                    <p className="text-sm md:text-lg xl:text-xl leading-6 tracking-widest text-lightGolden mt-1 md:mt-2 font-custom font-black ">
                      Generate Similar Designs
                    </p>
                    <img src={ai} alt="" className="w-4 md:w-6" />
                  </button>
                </div>

                <div className="mt-8 md:mt-16 w-full flex justify-center md:justify-start">
                  <button
                    className="flex justify-center items-center gap-2 md:gap-4 bg-lightGolden py-1 md:py-3 px-4 font-bold text-white rounded-xl
                  shadow-lg transition-transform transform hover:scale-105 hover:bg-customGreen active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                  >
                    <p className="text-base md:text-xl xl:text-2xl font-custom ">
                      Place Order
                    </p>
                    <img src={order} alt="" className="w-4 md:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>No image data found.</p>
          </div>
        )}
      </div>
      <img src={line} alt="" />

      <div className="flex justify-between items-center">
        <div className="my-8 md:my-20 px-8 md:px-14 md:max-w-[50%]" ref={detailsRef}>
          <div className="">
            <button
              className={`mr-10 text-lg md:text-xl xl:text-2xl font-bold font-custom ${
                activeTab === "details"
                  ? "text-customGreen border-b-2 border-customGreen"
                  : "text-black/40 border-b-4 border-transparent"
              } transition-all duration-300`}
              onClick={() => handleTabClick("details")}
            >
              Details
            </button>

            <button
              className={`text-lg md:text-xl xl:text-2xl font-bold font-custom ${
                activeTab === "description"
                  ? "text-customGreen border-b-2 border-customGreen"
                  : "text-black/40 border-b-4 border-transparent"
              } transition-all duration-300`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
          </div>

          {activeTab === "details" ? (
            <div className="flex flex-col md:gap-3 xl:gap-4 mt-4 md:mt-8 text-customBlack/50 text-sm md:text-lg xl:text-xl min-h-[5rem] md:min-h-[8rem] xl:min-h-[10rem]">
              <p className="font-custom tracking-wider">Material: {imageData?.material}</p>
              <p className="font-custom tracking-wider">Type of Gemstone: {imageData?.gemstone}</p>
              <p className="font-custom tracking-wider">Design Style: {imageData?.design}</p>
              <p className="font-custom tracking-wider">Jewellery Type: {imageData?.JewelleryType}</p>
            </div>
          ) : (
            <div className="flex flex-col md:gap-3 xl:gap-4 mt-4 md:mt-8 text-customBlack/50 text-sm md:text-lg xl:text-xl min-h-[5rem] md:min-h-[8rem] xl:min-h-[10rem]">
              <p className="font-custom tracking-wider">{imageData?.description}</p>
            </div>
          )}
        </div>

        <div className="px-10 py-8">
          <img
            src={imageData?.url}
            alt={imageData?.gemstone}
            className="w-0 md:w-48 xl:w-56 rounded-xl"
          />
        </div>
      </div>


      <Carousel />
    </>
  );
};

export default DetailedImageView;
