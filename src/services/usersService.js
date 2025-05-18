import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/users",
});

export const signup = async (username, password) => {
  try {
    const response = await api.post("/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao cadastrar usuário" };
  }
};
