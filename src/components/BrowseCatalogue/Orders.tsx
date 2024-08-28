import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.userId) { 
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to view your orders.',
        icon: 'warning',
        confirmButtonText: 'Log In',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tableName: 'Orders_Table', userId: user.userId }), 
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to fetch data');
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);

        setOrders(parsedBody.data || []);
      } catch (err) {
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, [user, navigate]);

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
        {orders.length > 0 ? (
          <table className="min-w-full border border-transparent">
            <thead>
              <tr className="bg-beige text-left">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Transaction Id</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">More Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderID} className={`${index % 2 === 0 ? "bg-white" : "bg-beige-light"}`}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{order.orderDate}</td>
                  <td className="py-3 px-4">{order.orderID}</td>
                  <td className="py-3 px-4">{order.orderStatus}</td>
                  <td className="py-3 px-4">
                    <button className="bg-beige p-2 rounded-full shadow-md">
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
