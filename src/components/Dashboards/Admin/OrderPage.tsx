import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

interface Order {
  orderID: string;
  orderDate: string;
  orderStatus: string;
  item: string;
  userId: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tableName: 'Orders_Table' }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to fetch data');
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        setOrders(parsedBody.data);
      } catch (err: any) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDetailsClick = (url: string) => {
    
    const detailedViewUrl = `/order/${encodeURIComponent(url)}`;
    window.open(detailedViewUrl, '_blank', 'noopener,noreferrer');
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

  return (
    <div className="text-[#00000080] p-4">
      <h1 className="text-xl font-bold mb-4">Track All Orders!</h1>
      <div>
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold">All</div>
          <div className="flex gap-4">
            <button className="hover:text-yellow-500">Open</button>
            <button className="hover:text-yellow-500">Closed</button>
          </div>
        </div>
        <table className="min-w-full border border-transparent">
          <thead>
            <tr className="bg-beige text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4">Transaction Id</th>
              <th className="py-3 px-4">User Id</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">More Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderID}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{order.orderDate}</td>
                <td className="py-3 px-4">{order.orderID}</td>
                <td className="py-3 px-4">{order.userId}</td>
                <td className="py-3 px-4">{order.orderStatus}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-beige p-2 rounded-full shadow-md"
                    onClick={() => handleDetailsClick(order.orderID)}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
