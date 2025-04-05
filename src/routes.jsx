import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos/:categoria" element={<Products />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
