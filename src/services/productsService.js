import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const getProducts = async () => {
  const response = await api.get("", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/category/${category}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
