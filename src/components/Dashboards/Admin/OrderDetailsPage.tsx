import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";


interface Order {
  orderID: string;
  orderDate: string;
  orderStatus: string;
  item: string;
  userId: string;
  url: string
}

const OrderDetailsPage: React.FC = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuthenticator();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tableName: 'Orders_Table', orderID }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to fetch data');
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        const orderData = parsedBody.data.find((item: Order) => item.orderID === orderID);
        setOrder(orderData || null);
      } catch (err: any) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderID]);

  const handleSendForCAD = async () => {
    if (!user) {
      Swal.fire({
        title: 'Error!',
        text: 'You must be logged in to send the design for CAD modeling.',
        icon: 'error',
      });
      return;
    }

    const orderDetails = {
      tableName: "CAD_Table",
      attributes: {
        userId: user?.userId,
        orderID: order?.orderID, 
      },
    };

    try {
      const response = await fetch('https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to send design');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Design sent for CAD modeling.',
        icon: 'success',
      });
    } catch (err: any) {
      console.error(err.message);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send design for CAD modeling.',
        icon: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-customGreen text-3xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <div className="mb-4">
        {order.item && (
          <img src={order.url} alt="Order item" className="w-[20vh] mb-4" />
        )}
        <p><strong>Order ID:</strong> {order.orderID}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Item:</strong> {order.item}</p>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSendForCAD}
      >
        Send Design for CAD Modeling
      </button>
    </div>
  );
};

export default OrderDetailsPage;
