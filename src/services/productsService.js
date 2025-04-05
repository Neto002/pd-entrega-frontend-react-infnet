import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export const getProducts = async () => {
  const response = await api.get("");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/category/${category}`);
  return response.data;
};
