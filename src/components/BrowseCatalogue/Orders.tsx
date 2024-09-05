import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuthenticator } from "@aws-amplify/ui-react";
import icon from "/src/assets/image.png";
import { Link } from "react-router-dom";

interface Order {
  orderID: string;
  orderDate: string;
  url: string;
  orderStatus: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthenticator();
  const navigate = useNavigate();

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
              userId: user.userId,
            }),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Failed to fetch data");
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        console.log(parsedBody)

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

    fetchOrders();
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
    <div className="min-h-screen bg-[#fff9f5] p-[2vw]">
      <Link to="/" className="flex justify-between mb-4 mx-4 items-center relative">
        <img
          src={icon}
          alt=""
          className="xs:w-[6rem] xs:h-[2rem] md:w-[12rem] md:h-[4.5rem] xl:w-[14rem]"
        />
      </Link>
      <section className="p-[3vw]">
        <h1 className="text-xl font-bold mb-8 text-customGreen">Track All Orders!</h1>
        <div>
          {orders.length > 0 ? (
            <table className="min-w-full border border-transparent">
              <thead>
                <tr className="text-center text-customGreen font-bold">
                  <th className="py-3 ">#</th>
                  <th className="py-3 ">Image</th>
                  <th className="py-3">Order Date</th>
                  <th className="py-3">Status</th>
                  {/* <th className="py-3 ">More Details</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.orderID} className="text-center">
                    <td className="py-3 font-serif">{index + 1}</td>
                    <td className="py-3 flex justify-center">
                      <img src={order.url} alt="" className="w-[10vw] rounded-lg" />
                    </td>
                    <td className="py-3 font-serif">{order.orderDate.split(' ')[0]}</td>
                    <td className="py-3 font-serif">{order.orderStatus}</td>
                    {/* <td className="py-3">
                      <button className="bg-beige p-2 rounded-full shadow-md">
                        ✏️
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
