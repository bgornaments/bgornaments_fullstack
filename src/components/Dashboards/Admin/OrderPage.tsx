const OrderPage = () => {
  const orders = [
    {
      id: 1,
      date: "10/3/2023",
      transactionId: "p234pdeqd232",
      status: "Order Pending",
    },
    {
      id: 2,
      date: "16/3/2023",
      transactionId: "p234pdeqd259",
      status: "Order Completed",
    },
  ];

  return (
    <div className="text-[#00000080]">
      <h1 className="text-xl font-bold">Track All Orders!</h1>
      <div className="">
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
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">More Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                // className={`text-left ${
                //   index % 2 === 0 ? "bg-white" : "bg-beige-light"
                // }`}
              >
                <td className="py-3 px-4">
                  {order.id}
                </td>

                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.transactionId}</td>
                <td className="py-3 px-4">{order.status}</td>
                <td className="py-3 px-4">
                  <button className="bg-beige p-2 rounded-full shadow-md">
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

export default OrderPage;
