import React, { createContext, useContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../services/handle-apis";
import { endpoints } from "../services/urls";
import type { CartItem, CartResponse } from "../interfaces/cart";
import { toast } from "react-toastify";

// 1. Define types
interface CartContextType {
  cartCount: number;
  addToCart: (productId: string, unit: number) => Promise<void>;
  getCartData: () => Promise<void>;
  cartItems: CartItem[];
  totalAmount: number;
}

// 2. Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Provider component
export const CartProvider = ({ children }: { children: any }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);


  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userId._id) return;
    try {
      const res = await postRequest<CartResponse>(endpoints.getCart, { userId: userId._id });
      if (res.success) {
        setCartItems(res.data.items);
        setCartCount(res.data.items.length);
        setTotalAmount(res.data.totalPrice);
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }


  }
  const addToCart = async (productId: string, unit: number) => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userId._id) {
      toast.error("Please login to add products to cart");
      return;
    }
    try {
      const res = await postRequest<CartResponse>(endpoints.singleCart, { productId, unit, userId: userId._id });
      if (res.success) {
        getCartData()
      }
      toast.dismiss();
      toast.success("Cart updtated successfully");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");

    }
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart, getCartData, cartItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Custom hook (important)
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside CartProvider");
  }
  return context;
};