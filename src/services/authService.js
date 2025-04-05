import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com/auth",
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao fazer login" };
  }
};
