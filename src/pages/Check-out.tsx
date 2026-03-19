import { useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import AddressModal from "../components/Address";
import { useCartContext } from "../contexts/cartContext";
import type { CartItem } from "../interfaces/cart";
import { endpoints } from "../services/urls";
import { postRequest } from "../services/handle-apis";
import type { Address, AddressResponse } from "../interfaces/address";
import { toast } from "react-toastify";
import LoginModal from "../Module/Auth/Pages/Login";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, addToCart } = useCartContext();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {
      setUserDetails(JSON.parse(user));
      fetchAddresses(JSON.parse(user)._id);
    } else {
      setOpenLogin(true);
    }
  }, [openLogin])

  async function fetchAddresses(userId: string) {
    try {
      const res = await postRequest<AddressResponse>(endpoints.getAddressByUserId, { userId });
      if (res.success) {
        setAddresses(res.data);
        setSelectedAddress(res.data.length > 0 ? res.data[0]._id : null);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  }

  const proceedPayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    const orderData = {
      shippingAddressId: selectedAddress,
      orderItems: cartItems.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.unit
      })),
      userId: userDetails._id,
      paymentMethod: "COD",
    };
    const res = await postRequest<any>(endpoints.createOrder, orderData);
    if (res.success) {
      toast.success("Order placed successfully!");
      navigate("/orders");
    } else {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-background))] dark:bg-[#0f172a] py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <AddressModal show={openAddressModal} setShow={setOpenAddressModal} />
      <LoginModal show={openLogin} setShow={setOpenLogin} />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDE */}
          <div className="lg:w-2/3 flex flex-col gap-5">

            {/* 🟢 Address Section */}
            <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                  Delivery Address
                </h3>

                <button
                  onClick={() => setOpenAddressModal(true)}
                  className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-green-100 dark:hover:border-green-900/50"
                >
                  <FaPlusCircle /> Add New
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {addresses.length > 0 ? addresses.map((addr: Address) => {
                  const isSelected = selectedAddress === addr._id;

                  return (
                    <div
                      key={addr._id}
                      onClick={() => setSelectedAddress(addr._id)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all
                        ${isSelected
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-sm"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] hover:border-green-400 dark:hover:border-gray-500"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">
                            {addr.fullName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {addr.phone}
                          </p>
                        </div>

                        <input
                          type="radio"
                          checked={isSelected}
                          readOnly
                          className="accent-green-600 mt-1"
                        />
                      </div>

                      <p className="text-sm mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {addr.pincode}, {addr.address}
                      </p>
                    </div>
                  );
                }) : (
                  <div className="p-6 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">No addresses found. Add a new address to proceed.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Item */}
            <div className="flex flex-col gap-4">
              {cartItems.length > 0 ? cartItems.map((item: CartItem) => (
                <div key={item.productId} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl flex flex-col sm:flex-row gap-6 border border-gray-100 dark:border-gray-800 shadow-sm">

                  <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="https://via.placeholder.com/150"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://media.gettyimages.com/id/185071735/photo/red-apple-with-droplet.jpg?s=612x612&w=gi&k=20&c=0tybCsUgMrmbLja8UcKPrzm9XwLIAmxm8InbcmOYfhQ=";
                      }}
                      alt={item.productName || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg leading-tight">
                          {item.productName}
                        </h3>

                        <button className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" onClick={() => { addToCart(item.productId, -item.unit) }}>
                          <FaTrash size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xl font-bold text-green-600 dark:text-green-500">
                          ₹{item.sellPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 sm:mt-0 pt-2 sm:pt-0">
                      <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => { addToCart(item.productId, -1) }} className="p-2 sm:px-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-1 text-gray-900 dark:text-gray-100 font-semibold min-w-[2.5rem] text-center">
                          {item.unit}
                        </span>
                        <button onClick={() => { addToCart(item.productId, 1) }} className="p-2 sm:px-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="bg-white dark:bg-[#1e293b] p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">Your cart is empty.</p>
                  <button onClick={() => navigate("/")} className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium">Continue Shopping</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm sticky top-6">

              <h3 className="font-bold mb-5 text-gray-900 dark:text-gray-100 text-lg">
                Order Summary
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between items-center">
                  <span>Sub Total </span>
                  <span className="text-gray-900 dark:text-gray-200 font-medium">₹{totalAmount}</span>
                </div>

                {/* <div className="flex justify-between text-green-600 dark:text-green-500 font-medium">
                  <span>Discount</span>
                  <span>-₹500</span>
                </div> */}

                <div className="flex justify-between items-center">
                  <span>Delivery</span>
                  <span className="text-green-600 dark:text-green-500 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 mt-5 pt-5 flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900 dark:text-gray-100">Total</span>
                <span className="text-green-600 dark:text-green-500">₹{totalAmount}</span>
              </div>

              <button
                onClick={proceedPayment}
                disabled={cartItems.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:dark:bg-gray-800 disabled:text-gray-400 disabled:dark:text-gray-600 disabled:cursor-not-allowed text-white py-3.5 mt-6 rounded-xl font-bold transition-colors shadow-sm"
              >
                Proceed to Order
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;