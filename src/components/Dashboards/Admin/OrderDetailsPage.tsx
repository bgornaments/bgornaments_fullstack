import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface Order {
  orderID: string;
  orderDate: string;
  orderStatus: string;
  item: string;
  userId: string;
  url: string;
}

const OrderDetailsPage: React.FC = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuthenticator();
  const [jewelryType, setJewelryType] = useState<string>('');
  const [measurements, setMeasurements] = useState<any>({
    length: '',
    weight: '',
    notes: '',
    diamondSize: '',
    chainLength: '',
    innerDiameter: '',
    ringSize: '',
    outerDiameter: '',
  });

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

  const handleSaveMeasurements = async () => {
    const payload: { [key: string]: string } = {};

    for (const key in measurements) {
      if (measurements[key]) {
        payload[key] = measurements[key];
      }
    }

    if (order && order.orderID) {
      payload['orderID'] = order.orderID;
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Order ID is missing.',
        icon: 'error',
      });
      return;
    }

    try {
      const response = await fetch('https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: 'Orders_Table',
          attributes: { orderID: order.orderID },
          measurements: payload,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to save measurements');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Measurements saved successfully.',
        icon: 'success',
      });

      setMeasurements({
        length: '',
        weight: '',
        notes: '',
        diamondSize: '',
        chainLength: '',
        innerDiameter: '',
        ringSize: '',
        outerDiameter: '',
      });
      setJewelryType('');
    } catch (err: any) {
      console.error(err.message);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save measurements.',
        icon: 'error',
      });
    }
  };

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
      <div className="flex justify-center items-center min-h-screen bg-[#fff9f5]">
        <FaSpinner className="text-customGreen text-3xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fff9f5]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fff9f5]">
        <p className="text-red-500 text-lg">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f5] p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={order.url}
            alt="Order item"
            className="w-[10rem] md:w-[12rem] xl:w-[14rem] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleSendForCAD()}
            className="flex items-center gap-2 border border-customGreen py-2 px-4 rounded-xl text-customBlack bg-customGreen text-white font-bold"
          >
            Send Design for CAD Modeling
            <AiOutlineShoppingCart />
          </button>
        </div>
      </header>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-customBlack mb-4">Order Details</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between  p-4 rounded-lg shadow-md">
          <div>
            <p><strong>Order ID:</strong> {order.orderID}</p>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <p><strong>Item:</strong> {order.item}</p>
          </div>
          {/* <img
            src={order.url}
            alt="Order item"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          /> */}
        </div>
        <div className=" p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-customBlack mb-2">Add Measurements</h2>
          <div className="mb-4">
            <button
              onClick={() => setJewelryType(jewelryType ? '' : 'Necklaces')}
              className="border border-customGreen py-2 px-4 rounded-xl text-customBlack bg-customGreen text-white font-bold"
            >
              {jewelryType ? 'Cancel' : 'Add Measurements'}
            </button>
            {jewelryType && (
              <>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-customBlack">
                    Choose Jewelry Type
                  </label>
                  <select
                    value={jewelryType}
                    onChange={(e) => setJewelryType(e.target.value)}
                    className="block w-full border border-customGreen p-2 rounded-lg"
                  >
                    <option value="">Select Jewelry Type</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Pendants">Pendants</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Rings">Rings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
                {jewelryType === 'Necklaces' && (
                  <div className="flex flex-col gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Diamond Size"
                      value={measurements.diamondSize}
                      onChange={(e) => setMeasurements({ ...measurements, diamondSize: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Chain Length"
                      value={measurements.chainLength}
                      onChange={(e) => setMeasurements({ ...measurements, chainLength: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                    <textarea
                      placeholder="Notes"
                      value={measurements.notes}
                      onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                  </div>
                )}
                {jewelryType === 'Rings' && (
                  <div className="flex flex-col gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Inner Diameter"
                      value={measurements.innerDiameter}
                      onChange={(e) => setMeasurements({ ...measurements, innerDiameter: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Ring Size"
                      value={measurements.ringSize}
                      onChange={(e) => setMeasurements({ ...measurements, ringSize: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Outer Diameter"
                      value={measurements.outerDiameter}
                      onChange={(e) => setMeasurements({ ...measurements, outerDiameter: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                    <textarea
                      placeholder="Notes"
                      value={measurements.notes}
                      onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                      className="border border-customGreen p-2 rounded-lg"
                    />
                  </div>
                )}
                <button
                  onClick={handleSaveMeasurements}
                  className="mt-4 border border-customGreen py-2 px-4 rounded-xl text-customBlack bg-customGreen text-white font-bold"
                >
                  Save Measurements
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
