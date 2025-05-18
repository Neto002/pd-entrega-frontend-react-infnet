import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { store } from "../../store";

const token = localStorage.getItem("token");

// Verifica se o token expirou e se o usuário está autenticado
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
}

const initialState = {
  user: null,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
