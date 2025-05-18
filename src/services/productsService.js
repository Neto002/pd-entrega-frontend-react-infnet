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

export const updateProduct = async (id, data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await api.put(`/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateProductStock = async (id, data) => {
  const response = await api.patch(`/${id}/stock`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const createProduct = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  console.log(formData);

  const response = await api.post("/", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
