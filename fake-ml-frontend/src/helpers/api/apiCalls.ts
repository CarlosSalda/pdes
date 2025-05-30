import axios from "axios";
import { config } from "../config";

export const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});
export const getUser = async (token: string | null) => {
  const response = await axiosInstance.get(`auth/getUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// export const register = async (data: any) => {
//   const response = await axiosInstance.post("/auth/register", data);
//   return response.data;
// };

// export const registerAdmin = async (data: any) => {
//   const response = await axiosInstance.post("/auth/register-admin", data);
//   return response.data;
// };

export const login = async (data: { email: string; password: string }) => {
  console.log("Axios baseURL:", axiosInstance.defaults.baseURL);
  console.log(config);
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
