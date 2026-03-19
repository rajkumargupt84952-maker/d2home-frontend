import { useNavigate,useParams  } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { postRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type { Order, OrderDetailsResponse, OrderItem } from "../interfaces/orders";

const OrderDetails = () => {
  const navigate = useNavigate();
const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<Order|null>(null);
 
  // 👉 Replace with API
useEffect(() => {
  if(id) {
    fetchOrderDetails(id);
  }
  },[id])

  async function fetchOrderDetails(orderId: string) {
    try {
    const res = await postRequest<OrderDetailsResponse>(endpoints.getOrderById, { orderId });
    if(res.success) {
      // 👉 Transform data if needed and set to state
      console.log("Order details:", res.data);
      setOrderData(res.data);
    }
   } catch (err) {
      console.error("Error fetching order details:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-background))] dark:bg-[#0f172a] py-8 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white dark:bg-[#1e293b] border dark:border-gray-700"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Details
          </h1>
        </div>

        {/* Order Info */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border dark:border-gray-800 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order ID: <span className="font-semibold">{orderData?.orderNumber}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {orderData?.createdAt}
              </p>
            </div>

            <span className="text-green-600 dark:text-green-400 font-bold">
              {orderData?.orderStatus}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border dark:border-gray-800 mb-6">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">
            Order Status
          </h3>

          <div className="flex flex-col gap-4">

            {/* {["Order Placed", "Shipped", "Out for Delivery", "Delivered"].map((step, index) => ( */}
              <div  className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" />
                <p className="text-gray-700 dark:text-gray-300">{orderData?.orderStatus}</p>
              </div>
            {/* ))} */}

          </div>
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border dark:border-gray-800 mb-6">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">
            Items
          </h3>

          <div className="flex flex-col gap-4">
            {orderData?.orderItems.map((item: OrderItem, index:number) => (
              <div key={index} className="flex gap-4 items-center">

                <img
                  src={item.productImage[0]}
                   onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                    }}
                  alt={item.productName}
                  className="w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
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
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border dark:border-gray-800 mb-6">
          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
            Delivery Address
          </h3>

          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {orderData?.shippingAddress.fullName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {orderData?.shippingAddress.phone}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {orderData?.shippingAddress.address}
          </p>
        </div>

        {/* Payment */}
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border dark:border-gray-800">
          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
            Payment Details
          </h3>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Payment Method</span>
            <span>{orderData?.paymentMethod}</span>
          </div>

          <div className="flex justify-between font-bold mt-3 text-gray-900 dark:text-white">
            <span>Total Paid</span>
            <span>₹{orderData?.totalPrice}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;