export interface LoginResponse {
  token: string;
  message: string;
  data: UserData;
}

export interface UserData {
  _id: string;
  name: string;
  phoneNo: string;
  __v: number;
}
export interface RegisterResponse {
  token: string;
  message: string;
  data: UserData;
}