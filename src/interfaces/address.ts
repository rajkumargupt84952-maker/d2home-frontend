export interface AddressResponse {
  success: boolean;
  message: string;
  data: Address[];
}
export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}