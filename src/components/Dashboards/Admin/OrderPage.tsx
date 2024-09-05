import React, { useState, useEffect } from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';

interface Order {
  orderID: string;
  orderDate: string;
  orderStatus: string;
  item: string;
  userId: string;
  url: string;
  userMail: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
        
        const sortedOrders = parsedBody.data.sort((a: Order, b: Order) => {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        });

        setOrders(sortedOrders);
        
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

  // const handleDeleteClick = async (orderID: string) => {
  //     const confirmDelete = window.confirm('Are you sure you want to delete this order?');
  //     if (!confirmDelete) return;

  //     const data=JSON.stringify({
  //       tableName: 'Orders_Table',
  //       primaryKey: 'orderID',
  //       primaryKeyValue: { orderID }
  //     });
  //     console.log(data)
  //     try {
  //       const response = await fetch('https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData', {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: data,
  //       });
    
  //       if (!response.ok) {
  //         const errorResponse = await response.json();
  //         throw new Error(errorResponse.message || 'Failed to delete item');
  //       }
    
  //       const data = await response.json();
  //       console.log(data.message);
  //     } catch (error) {
  //       console.error(error.message);  
  //     }
  //   };
    

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
      <h1 className="text-xl font-bold mb-8 text-customGreen">Track All Orders!</h1>
      <div>
        <table className="min-w-full border border-transparent">
          <thead>
            <tr className="text-customGreen text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4">Order Image</th>
              <th className="py-3 px-4">Order Image</th>
              <th className="py-3 px-4">User Id</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">More Details</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderID}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{order.orderDate.split(' ')[0]}</td>
                <td className="py-3 px-4">{order.orderDate.split(' ')[0]}</td>
                <td className="py-3 px-4">
                  <img src={order.url} alt="" className='w-[8vw] rounded-lg' />
                </td>
                <td className="py-3 px-4">{order.userMail}</td>
                <td className="py-3 px-4">{order.orderStatus}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-beige p-2 rounded-full shadow-md"
                    onClick={() => handleDetailsClick(order.orderID)}
                  >
                    ✏️
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 p-2 rounded-full shadow-md text-white"
                    // onClick={() => handleDeleteClick(order.orderID)}
                  >
                    <FaTrash />
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
