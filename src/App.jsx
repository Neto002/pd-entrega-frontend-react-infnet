import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";
import { CartProvider } from "./contexts/CartContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-white text-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </CartProvider>
      </Router>
    </Provider>
  );
}

export default App;
