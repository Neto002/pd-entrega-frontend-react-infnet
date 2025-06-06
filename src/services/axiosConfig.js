import axios from "axios";
import { logout } from "../store/slices/authSlice";
import { store } from "../store";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      store.dispatch(logout());

      const isOnLoginPage = window.location.pathname === "/login";

      if (!isOnLoginPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
