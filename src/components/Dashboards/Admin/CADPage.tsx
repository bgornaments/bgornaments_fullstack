import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

interface CADItem {
  orderId: string;
  userId: string;
  CAD_id: string;
  cadOrderDate: string;
  cadStatus: string;
}

const CADPage: React.FC = () => {
  const [cadItems, setCadItems] = useState<CADItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchCADItems = async () => {
      try {
        const response = await fetch('https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tableName: 'CAD_Table' }),
        });
// console.log(response)
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to fetch data');
        }

        const result = await response.json();
        const parsedBody = JSON.parse(result.body);
        setCadItems(parsedBody.data);
      } catch (err: any) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCADItems();
  }, []);

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
      <h1 className="text-xl font-bold mb-4">CAD Modeling Data</h1>
      <table className="min-w-full border border-transparent">
        <thead>
          <tr className="bg-beige text-left">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">User ID</th>
            <th className="py-3 px-4">CAD ID</th>
            <th className="py-3 px-4">CAD Order Date</th>
            <th className="py-3 px-4">CAD Status</th>
            <th className="py-3 px-4">More Details</th>
          </tr>
        </thead>
        <tbody>
          {cadItems.map((item, index) => (
            <tr key={item.CAD_id} >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{item.orderId}</td>
              <td className="py-3 px-4">{item.userId}</td>
              <td className="py-3 px-4">{item.CAD_id}</td>
              <td className="py-3 px-4">{item.cadOrderDate}</td>
              <td className="py-3 px-4">{item.cadStatus}</td>

              <td className="py-3 px-4">
                <button
                  className="bg-beige p-2 rounded-full shadow-md"
                //   onClick={() => navigate(`/cad/${item.CAD_id}`)}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CADPage;
