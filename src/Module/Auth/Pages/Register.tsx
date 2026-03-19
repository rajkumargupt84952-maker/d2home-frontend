import React, { useState } from "react";
import loginImage from "../../../assets/img/baner-1.png";
import { postRequest } from "../../../services/handle-apis";
import { endpoints } from "../../../services/urls";
import type { RegisterResponse } from "../../../interfaces/users";

interface RegisterModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, setShow }) => {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim() || !phoneNo.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);
            const res = await postRequest<RegisterResponse>(endpoints.register, {
                name,
                phoneNo,
                password,
            });

            // Save token from registration
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            setSuccess(res.message || "Account created successfully! You are now logged in.");
            setName("");
            setPhoneNo("");
            setPassword("");

            // Auto-close after short delay
            setTimeout(() => setShow(false), 1500);
        } catch (err: any) {
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl border border-green-300/40 bg-white dark:bg-[rgb(var(--sidebar-bg))] shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl z-10"
                >
                    ✕
                </button>

                {/* Left Image */}
                <div className="hidden md:flex md:flex-1 relative bg-green-900">
                    <img
                        src={loginImage}
                        alt="Fresh veggies"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-900/80 to-transparent p-6">
                        <h2 className="text-white text-xl font-semibold tracking-wide">
                            Freshness Delivered Daily
                        </h2>
                        <p className="text-green-100 text-sm mt-1">
                            Organic • Local • Handpicked
                        </p>
                    </div>
                </div>

                {/* Register Form */}
                <div className="flex-1 p-8 md:p-12">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        Sign up
                    </h1>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md px-3 py-2">
                            {error}
                        </p>
                    )}

                    {/* Success */}
                    {success && (
                        <p className="text-green-600 text-sm mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md px-3 py-2">
                            ✓ {success}
                        </p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Phone number
                            </label>
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center rounded-md bg-green-600 text-white px-4 py-2 font-semibold hover:bg-green-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Creating account…
                                </span>
                            ) : (
                                "Register"
                            )}
                        </button>

                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                            onClick={() => setShow(false)}
                            className="text-green-600 font-medium hover:underline"
                        >
                            Sign in
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default RegisterModal;