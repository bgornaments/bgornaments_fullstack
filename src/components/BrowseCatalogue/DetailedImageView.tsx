import React, { useState, useEffect } from "react";
import icon from "/src/assets/image.png";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import img from "/src/assets/add-to-favorites.png";
import ai from "/src/assets/chatbot.png";
// import plus from "/src/assets/plus.png";
// import { FaSpinner } from "react-icons/fa";
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
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const navigate = useNavigate();
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );
  const { user } = useAuthenticator();

  const icons = {
    filledHeart: "/src/assets/add-to-favorites (1).png",
    emptyHeart: "/src/assets/add-to-favorites (1).png",
  };

  useEffect(() => {
    // console.log(imageData?.JewelleryType)
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://dem48tvmua.execute-api.us-east-1.amazonaws.com/getDB`
        );
        const data = await response.json();
        const image = data.find((img: ImageData) => img.url === url);
        setImageData(image || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.log(error);
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

  return (
    <>
      <div className="min-h-screen ">
        <header className="flex justify-between my-4 mx-4">
          <img
            src={icon}
            alt=""
            className="xs:w-[10rem] md:w-[12rem] xl:w-[14rem]"
          />
          <div className="flex gap-[2rem]">
            <button
              onClick={() => navigate("/catalog/likedimages")}
              className="relative p-2"
            >
              <div className="rounded-full p-3 bg-[#F5E8D7]">
                <AiOutlineHeart size={20} color="gray" />
                {likedImages.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 font-serif text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {likedImages.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </header>
        <img src={line} alt="" />

        {imageData ? (
          <>
            <div className="flex flex-col md:flex-row items-center justify-center align-middle mt-[2vh] gap-[10vw] h-full px-5">
              <img
                src={imageData.url}
                alt={imageData.description}
                className="h-[40vw] rounded-xl mt-10 max-w-[40%]"
              />
              <div className="flex flex-col md:items-start max-w-[33%]">
                <p className="text-customGreen text-lg xs:mx-10 md:mx-0 text-center md:text-start md:text-2xl tracking-widest font-bold md:max-w-[40vw] leading-relaxed">
                  {imageData.description.split(" ").slice(0, 4).join(" ")}
                </p>

                <div className="flex justify-between items-center mt-4 w-full ">
                  <div className="text-base tracking-wider md:font-bold text-customBlack">
                    {imageData.JewelleryType}
                  </div>
                  <button
                    onClick={() => handleLike(imageData.url)}
                    className={`flex justify-center items-center gap-[0.4rem] px-10 ${
                      likedImages.includes(imageData.url)
                        ? " text-black"
                        : "text-customBlack"
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={
                          likedImages.includes(imageData.url)
                            ? icons.filledHeart
                            : icons.emptyHeart
                        }
                        alt="favorite icon"
                        className="w-[1.4rem] "
                      />

                      <span className="text-[.7rem]">
                        {likedImages.includes(imageData.url)
                          ? "Added to Favorites"
                          : "Add to Favorites"}
                      </span>
                    </div>
                  </button>
                </div>
                <div className="mt-12">
                  <div className="text-customGreen font-bold text-base tracking-widest">
                    Description
                  </div>
                  <p className="font-serif text-base leading-6 tracking-wider text-customBlack mt-2">
                    {imageData.description}
                  </p>
                  <p className="font-serif text-base leading-6 tracking-wider text-[#E0AE2A] mt-2">
                    Show More Details -
                  </p>
                </div>

                <div className="flex flex-col items-start mt-10 justify-center">
                  <p className="text-base text-customBlack text-center font-serif tracking-wider">
                    Loved the design? Create a similar ones with AI!
                  </p>
                  <button className="flex gap-4 justify-center items-center mt-2 font-serif text-base  text-[#E0AE2A]">
                    <p className="font-serif tracking-wider">
                      Generate Similar Designs
                    </p>
                    <img src={ai} alt="" className="w-6" />
                  </button>
                </div>

                <div className="mt-20">
                  <button
                    className="flex gap-4 bg-[#E0AE2A] py-3 px-4 font-bold text-white rounded-xl
                  shadow-lg transition-transform transform hover:scale-105 hover:bg-customGreen-dark active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen-dark"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                  >
                    <p>Place Order</p>
                    <img src={order} alt="" className="w-6" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <img src={line} alt="" />
      <Carousel />
      <p className="my-20"></p>
    </>
  );
};

export default DetailedImageView;
