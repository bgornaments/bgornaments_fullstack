import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

interface CADItem {
  url: string;
  orderId: string;
  userId: string;
  userMail: string;
  CAD_id: string;
  cadOrderDate: string;
  cadStatus: string;
  measurements:any,
}

const CADDetailsPage: React.FC = () => {
        const { cadId } = useParams<{ cadId: string }>();
      
  const [cadItem, setCadItem] = useState<CADItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCADItemDetails = async () => {
    try {
      const response = await fetch("https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: 'CAD_Table',
          filterAttribute: 'CAD_id',  
          filterValue: cadId || ""
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch CAD details');
      }
  
      const result = await response.json();
      const parsedBody = JSON.parse(result.body);
      console.log(parsedBody);
  
      const cadItemData = parsedBody.data[0] || null; 
  
      console.log("Found CAD item data:", cadItemData);
  
      setCadItem(cadItemData);  
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);  
    }
  };
  
  useEffect(() => {
    if (cadId) {
      fetchCADItemDetails();  
    }
  }, [cadId]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fff9f5]">
        <FaSpinner className="text-customGreen text-3xl animate-spin" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="p-4 min-h-screen bg-[#fff9f5] rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-customGreen">CAD Details</h2>
    {cadItem ? (
      <div className="p-6 rounded-lg shadow-md">
        <p className="mb-2"><strong>CAD ID:</strong> <span className="text-customGreen">{cadItem.CAD_id}</span></p>
        <p className="mb-2"><strong>User ID:</strong> <span className="text-customGreen">{cadItem.userId}</span></p>
        <p className="mb-2"><strong>User Email:</strong> <span className="text-customGreen">{cadItem.userMail}</span></p>
        <p className="mb-2"><strong>CAD Order Date:</strong> <span className="text-customGreen">{new Date(cadItem.cadOrderDate).toLocaleString()}</span></p>
        <p className="mb-4"><strong>CAD Status:</strong> <span className="text-customGreen">{cadItem.cadStatus}</span></p>
        <img src={cadItem.url} alt="CAD Model" className="rounded-lg mb-4 w-60" />
        
        <h3 className="text-2xl font-semibold my-4 text-customGreen">Measurements</h3>
        {cadItem.measurements ? (
            <div>
              {Object.keys(cadItem.measurements).map(
                (key) =>
                  key !== "orderID" && cadItem.measurements[key] && (
                    <p key={key} className="mb-2">
                      <strong className="text-customGreen">{key}:</strong> {cadItem.measurements[key]}
                    </p>
                  )
              )}
            </div>
          ) : (
          <p className="text-gray-500">No measurements available.</p>
        )}
      </div>
    ) : (
      <p className="text-gray-500">No CAD data available.</p>
    )}
  </div>
  );
  
};

export default CADDetailsPage;
