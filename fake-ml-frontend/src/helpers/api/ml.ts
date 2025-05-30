import { axiosInstance } from "./apiCalls";

export const findProducts = async (product: string, token: string | null) => {
  const response = await axiosInstance.get(`meli/items?query=${product}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProductById = async (id: string, token: string | null) => {
  const response = await axiosInstance.get(`meli/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
