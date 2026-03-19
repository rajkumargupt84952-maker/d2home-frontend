// api.ts
import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";

import { BASE_URL } from "./urls";

// =====================
// Axios Instance
// =====================
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// GET REQUEST
// =====================
export const getRequest = async <T = unknown>(
  endpoint: string
): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data || err.message;
  }
};

// =====================
// POST REQUEST
// =====================
export const postRequest = async <T = unknown, B = unknown>(
  endpoint: string,
  body: B
): Promise<T> => {
  try {
    const response = await api.post<T>(endpoint, body);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data || err.message;
  }
};
