import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuthenticator } from "@aws-amplify/ui-react";
import icon from "/src/assets/image.png";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import {
  setLikedImages,
} from "../../redux/likedImagesSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface Order {
  orderID: string;
  orderDate: string;
  url: string;
  orderStatus: string;
}

const OrdersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const likedImages = useSelector(
    (state: RootState) => state.likedImages.likedImages
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLikedImages = localStorage.getItem("likedImages");
    if (savedLikedImages) {
      dispatch(setLikedImages(JSON.parse(savedLikedImages)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user || !user.userId) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please log in to view your orders.",
        icon: "warning",
        confirmButtonText: "Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return; 
    }
  
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tableName: "Orders_Table",
              filterAttribute: "userId",
              filterValue: user.userId, 
            }),
          }
        );
  
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Failed to fetch data");
        }
  
        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        console.log(parsedBody);
        const sortedOrders = (parsedBody.data || []).sort((a: Order, b: Order) => {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        });
  
        setOrders(sortedOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.userId) {
      fetchOrders();
    }
  }, [user, navigate]); 

  if (loading && user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fff9f5] p-[2vw]">
        <FaSpinner className="text-customGreen text-3xl animate-spin" />
      </div>
    );
  }

  if (!user || !user.userId) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header className="w-full h-[10vh] bg-navbar flex items-center top-0 px-[8vw] md:px-[2.5rem] xl:px-[4.8rem]">
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
      <section className="p-[4vw]">
        <h1 className="text-lg md:text-xl font-bold mb-6 text-customGreen font-custom">Track All Orders!</h1>
        <div>
          {orders.length > 0 ? (
            <table className="min-w-full border border-transparent">
              <thead>
                <tr className="text-center text-customGreen font-bold">
                  <th className="py-2 text-base md:text-xl font-custom">#</th>
                  <th className="py-2 text-base md:text-xl font-custom">Image</th>
                  <th className="py-2 text-base md:text-xl font-custom">Order Date</th>
                  <th className="py-2 text-base md:text-xl font-custom">Status</th>
                </tr>
              </thead>
              <tbody className="text-customBlack/40 text-xs md:text-sm">
                {orders.map((order, index) => (
                  <tr key={order.orderID} className="text-center">
                    <td className="py-2 text-xs md:text-sm">{index + 1}</td>
                    <td className="py-2 flex justify-center">
                      <img src={order.url} alt="" className="w-[10vw] rounded-lg" />
                    </td>
                    <td className="py-2 text-xs md:text-sm">{order.orderDate.split(' ')[0]}</td>
                    <td className="py-2 text-xs md:text-sm">{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xs md:text-sm text-customBlack/40">No orders found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
