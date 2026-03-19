import React, { useState } from "react";
import loginImage from "../assets/img/baner-1.png";
import { postRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import { toast } from "react-toastify";

interface AddressModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ show, setShow }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName || !phone || !pincode || !address || !city || !state) {
      setError("All fields are required.");
      return;
    }

    if (phone.length !== 10) {
      setError("Enter valid 10 digit phone number.");
      return;
    }

    try {

        const userId = JSON.parse(localStorage.getItem("user") || "{}");
        if(!userId._id) {
          setError("User not found. Please login again.");
          return;
        }
        const addressData = {
          userId: userId._id,
          fullName,
          phone,
          pincode,
          address,
          city,
          state,
          country: "India",
        }
        const res = await postRequest<any>(endpoints.createShippingAddress,addressData );
        if(res.success) {
          toast.success("Address saved successfully!");
          setShow(false);
        }
      setLoading(true);
      setSuccess("Address saved successfully!");

      setFullName("");
      setPhone("");
      setPincode("");
      setAddress("");
      setCity("");
      setState("");

    } catch (err: any) {
      setError(err?.message || "Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200 dark:border-gray-800">

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl z-10"
        >
          ✕
        </button>

        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-green-900">
          <img
            src={loginImage}
            alt="Address"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-white text-xl font-semibold">
              Deliver to Your Doorstep
            </h2>
            <p className="text-gray-200 text-sm mt-1">
              Fast • Reliable • Secure
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-6 sm:p-8 md:p-10">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Add Address
          </h1>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-green-600 text-sm mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 rounded-md">
              ✓ {success}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-style"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-style"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="input-style"
            />

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-style resize-none"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-style w-1/2"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input-style w-1/2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;