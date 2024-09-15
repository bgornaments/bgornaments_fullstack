import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface Order {
  orderID: string;
  orderDate: string;
  orderStatus: string;
  item: string;
  userId: string;
  url: string;
  JewelleryType: string;
  userMail: string;
  measurements: any;
}

const OrderDetailsPage: React.FC = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user } = useAuthenticator();
  const [jewelryType, setJewelryType] = useState<string>("");
  const [measurements, setMeasurements] = useState<any>({
    innerDiameter: "",
    bangleThickness: "",
    ringSize: "",
    length: "",
    width: "",
    chainLength: "",
    chainType: "",
    postType: "",
    claspType: "",
    neckCircumference: "",
    notes: "",
  });
  const [fetchedMeasurements, setFetchedMeasurements] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchOrderDetails = async () => {
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
              filterAttribute: "orderID", 
              filterValue: orderID || "", 
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
        const orderData = parsedBody.data[0] || null; 

        setOrder(orderData); 

        if (orderData) {
          if (orderData.measurements) {
            setMeasurements(orderData.measurements);
            setFetchedMeasurements(true);
          }

          if (orderData.JewelleryType) {
            setJewelryType(orderData.JewelleryType);
          }
        }
      } catch (err: any) {
        console.error(err.message);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };
    if (orderID) {
      fetchOrderDetails();
    }
  }, [orderID]);

  // useEffect(() => {
  //   const fetchOrderDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://j6d5qam295.execute-api.us-east-1.amazonaws.com/getData",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ tableName: "Orders_Table" , filterAttribute : "orderID" , filterValue : orderID}),
  //         }
  //       );
  //       console.log(response)
  //       if (!response.ok) {
  //         const errorResponse = await response.json();
  //         throw new Error(errorResponse.message || "Failed to fetch data");
  //       }

  //       const result = await response.json();
  //       const parsedBody = JSON.parse(result.body);
  //       console.log(parsedBody)
  //       const orderData = parsedBody.data.find(
  //         (item: Order) => item.orderID === orderID
  //       );
  //       setOrder(orderData || null);

  //       if (orderData) {
  //         if (orderData.measurements) {
  //           setMeasurements(orderData.measurements);
  //           setFetchedMeasurements(true);
  //         }

  //         if (orderData.JewelleryType) {
  //           setJewelryType(orderData.JewelleryType);
  //         }
  //       }
  //     } catch (err: any) {
  //       console.error(err.message);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrderDetails();
  // }, [orderID]);

  const updateOrderStatus = async (orderID: string) => {
    try {
      const response = await fetch(
        "https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableName: "Orders_Table",
            orderID: orderID,
            attribute: "orderStatus",
            newValue: "Completed",
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to update order status"
        );
      }

      const result = await response.json();
      console.log("Order status updated:", result.updatedAttributes);

      return result;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const handleSaveMeasurements = async () => {
    const payload: { [key: string]: string } = {};

    for (const key in measurements) {
      if (measurements[key]) {
        payload[key] = measurements[key];
      }
    }

    if (order && order.orderID) {
      payload["orderID"] = order.orderID;
    } else {
      Swal.fire({
        title: "Error!",
        text: "Order ID is missing.",
        icon: "error",
      });
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Measurements",
      text: "Are you sure you want to save these measurements? They cannot be changed afterwards.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save them!",
      cancelButtonText: "No, cancel!",
    });

    if (!isConfirmed) return;

    try {
      const response = await fetch(
        "https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableName: "Orders_Table",
            attributes: { orderID: order.orderID },
            measurements: payload,
          }),
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to save measurements");
      }
      await updateOrderStatus(order.orderID);
      Swal.fire({
        title: "Success!",
        text: "Measurements saved and order status updated successfully.",
        icon: "success",
      });
      setMeasurements({
        innerDiameter: "",
        bangleThickness: "",
        ringSize: "",
        length: "",
        width: "",
        chainLength: "",
        chainType: "",
        postType: "",
        claspType: "",
        neckCircumference: "",
        notes: "",
      });
      setJewelryType("");
      setFetchedMeasurements(false);
      window.location.reload();
    } catch (err: any) {
      console.error(err.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to save measurements or update order status.",
        icon: "error",
      });
    }
  };

  const handleSendForCAD = async () => {
    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "You must be logged in to send the design for CAD modeling.",
        icon: "error",
      });
      return;
    }

    const orderDetails = {
      tableName: "CAD_Table",
      attributes: {
        userId: user?.userId,
        orderID: order?.orderID,
        url: order?.url,
        userMail: order?.userMail,
        measurements: order?.measurements,
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

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to send design");
      }

      const updateOrderStatus = {
        tableName: "Orders_Table",
        orderID: order?.orderID,
        attribute: "orderStatus",
        newValue: "Sent For CAD",
      };

      const statusResponse = await fetch(
        "https://stp1a8pmee.execute-api.us-east-1.amazonaws.com/placeOrder/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateOrderStatus),
        }
      );

      if (!statusResponse.ok) {
        const errorResponse = await statusResponse.json();
        throw new Error(
          errorResponse.message || "Failed to update order status"
        );
      }

      Swal.fire({
        title: "Success!",
        text: "Design sent for CAD modeling and order status updated.",
        icon: "success",
      });
    } catch (err: any) {
      console.error(err.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to send design for CAD modeling.",
        icon: "error",
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
    <div className="min-h-screen bg-[#fff9f5] px-10 flex flex-col gap-[6vh] pt-20">
      <div className="flex items-center justify-center gap-10 h-[16rem]">
        <img
          src={order.url}
          alt="Order item"
          className="h-[100%] rounded-lg shadow-lg"
        />
        <div className="flex flex-col gap-10 md:flex-row md:items-center h-[100%]  p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-customBlack mb-4">
            Order Details
          </h1>
          <div>
            <p>
              <strong className="text-customGreen">Order ID:</strong>{" "}
              {order.orderID}
            </p>
            <p>
              <strong className="text-customGreen">Order Date:</strong>{" "}
              {order.orderDate}
            </p>
            <p>
              <strong className="text-customGreen">Status:</strong>{" "}
              {order.orderStatus}
            </p>
            <p>
              <strong className="text-customGreen">Item:</strong> {order.item}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {fetchedMeasurements ? (
          <div className="flex flex-col gap-10 md:flex-row md:items-center p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-customBlack mb-4k">
              Existing Measurements
            </h3>
            <div>
              {Object.keys(measurements).map(
                (key) =>
                  key !== "orderID" &&
                  measurements[key] && (
                    <p key={key} className="mb-2">
                      <strong className="text-customGreen">{key}:</strong>{" "}
                      {measurements[key]}
                    </p>
                  )
              )}
            </div>
          </div>
        ) : (
          <div className=" p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-customBlack mb-2">
              Add Measurements
            </h2>
            <div className="mb-4">
              {jewelryType ? (
                <>
                  {jewelryType === "Bangles" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Inner Diameter"
                        value={measurements.innerDiameter}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            innerDiameter: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Bangle Thickness"
                        value={measurements.bangleThickness}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            bangleThickness: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                    </div>
                  )}
                  {jewelryType === "Rings" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Ring Size"
                        value={measurements.ringSize}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            ringSize: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                    </div>
                  )}
                  {jewelryType === "Pendants" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Length"
                        value={measurements.length}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            length: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Width"
                        value={measurements.width}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            width: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                    </div>
                  )}
                  {jewelryType === "Earrings" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Post Type"
                        value={measurements.postType}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            postType: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Clasp Type"
                        value={measurements.claspType}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            claspType: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                    </div>
                  )}
                  {jewelryType === "Necklaces" && (
                    <div className="flex flex-col gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Chain Length"
                        value={measurements.chainLength}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            chainLength: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Neck Circumference"
                        value={measurements.neckCircumference}
                        onChange={(e) =>
                          setMeasurements({
                            ...measurements,
                            neckCircumference: e.target.value,
                          })
                        }
                        className="border border-customGreen p-2 rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 mt-4">
                    <textarea
                      placeholder="Notes"
                      value={measurements.notes}
                      onChange={(e) =>
                        setMeasurements({
                          ...measurements,
                          notes: e.target.value,
                        })
                      }
                      className="border border-customGreen p-2 rounded-lg"
                      rows={4}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-red-500">
                    Please select a jewelry type to enter measurements.
                  </p>
                  <select
                    value={jewelryType}
                    onChange={(e) => setJewelryType(e.target.value)}
                    className="border border-customGreen p-2 rounded-lg mt-4"
                  >
                    <option value="">Choose Jewelry Type</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Rings">Rings</option>
                    <option value="Pendants">Pendants</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Necklaces">Necklaces</option>
                  </select>
                </div>
              )}
            </div>
            {jewelryType && (
              <button
                onClick={() => handleSaveMeasurements()}
                className="border border-customGreen py-2 px-4 rounded-xl text-customBlack bg-customGreen font-bold"
              >
                Save Measurements
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleSendForCAD()}
          className="flex items-center gap-2 justify-center bg-customGreen text-white py-2 px-5 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-customGreen-dark active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen-dark"
        >
          Send Design for CAD Modeling
          <AiOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
