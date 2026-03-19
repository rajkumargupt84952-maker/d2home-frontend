export interface CartItem {
   productId: string;
  unit: number;
  sellPrice: number;
  productImage: string[];
  productName: string;
  description: string;
}
export interface CartData {
   _id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CartResponse {
    success: boolean;
  message: string;
  data: CartData;
}