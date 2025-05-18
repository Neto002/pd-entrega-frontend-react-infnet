import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/products",
});

// Converte uma string base64 para um blob
const base64ToBlob = (base64, mime = "image/png") => {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
};

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
  // Só realizar o processo de conversão se a imagem for uma string base64 (data:image/png;base64,...)
  if (data.image.startsWith("data")) {
    const blob = base64ToBlob(data.image);
    const file = new File([blob], "image.png", { type: "image/png" });
    data.image = file;
  }

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
  // Converte a imagem de base64 para arquivo antes de enviar a request
  const blob = base64ToBlob(data.image);
  const file = new File([blob], "image.png", { type: "image/png" });
  data.image = file;

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
