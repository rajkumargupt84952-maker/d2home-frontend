import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { endpoints } from "../services/urls";
import { postRequest } from "../services/handle-apis";
import type { Order, OrderItem, OrdersResponse } from "../interfaces/orders";

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrdersList] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {
      fetchOrders(JSON.parse(user)._id);
    }
  }, [])
  async function fetchOrders(userId: string) {
    try {
      const res = await postRequest<OrdersResponse>(endpoints.getMyOrders, { userId });
      if (res.success) {
        setOrdersList(res.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }

    // 👉 Replace with API later

    const getStatusStyle = (status: string) => {
      switch (status) {
        case "Delivered":
          return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
        case "Pending":
          return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
        case "Cancelled":
          return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
        default:
          return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      }
    };
  const orderDetailPage = (_id: string) => {
  navigate(`/order-details/${_id}`);
};
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-background))] dark:bg-[#0f172a] py-8 px-4">

        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              <FaArrowLeft />
            </button>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              My Orders
            </h1>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-6">

            {orderList.length > 0 ? (
              orderList.map((order) => (
                <div
                  key={order._id}
                  className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
                >

                  {/* Top */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order ID: <span className="font-semibold">{order.orderNumber}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.createdAt}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusStyle(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-4">
                    {order.orderItems.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex gap-4 items-center">

                        <img
                          src={item.productImage[0]}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                          }}
                          alt={item.productName}
                          className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                        />

                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-gray-900 dark:text-white">
                          ₹{item.sellPrice * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700 mt-4 pt-4 flex justify-between items-center">

                    <p className="font-bold text-gray-900 dark:text-white">
                      Total: ₹{order.totalPrice}
                    </p>

                    <button className="text-green-600 dark:text-green-400 font-semibold hover:underline" onClick={() => orderDetailPage(order._id)}>
                      View Details
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  No Orders Yet
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Start shopping to see your orders here.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  Shop Now
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  export default Orders;