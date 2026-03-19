export interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
}
export type PaymentMethod = "COD" | "ONLINE";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;

  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;

  isDelivered: boolean;
  deliveredAt?: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ShippingAddress {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  pincode: string;
  country: string;
}
export interface OrderItem {
  _id: string;
  productId: string;
  productName: string;
  productImage: string[];
  sellPrice: number;
  quantity: number;
}

export interface OrderDetailsResponse {  
    success: boolean;
  data: Order
}
