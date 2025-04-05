import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { getCategories } from "../../services/productsService";
import { capitalize } from "../../util/format";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Função para fechar o menu do usuário quando clicar fora dele
  const handleClickOutside = (e) => {
    if (isUserMenuOpen && !e.target.closest(".user-menu-container")) {
      setIsUserMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Adicionar e remover o event listener para cliques fora do menu
  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="bg-white shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menu Principal - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Início
            </Link>

            {/* Menu de Categorias */}
            <div className="relative">
              <button
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                onMouseEnter={() => setShowCategories(true)}
              >
                Categorias
              </button>

              {showCategories && (
                <div
                  onMouseLeave={() => setShowCategories(false)}
                  className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/produtos/${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {capitalize(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/produtos"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Produtos
            </Link>
          </div>

          {/* Carrinho, Login e Tema - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/carrinho"
                className="text-gray-700 hover:text-gray-900"
              >
                <FaShoppingCart className="h-6 w-6" />
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                >
                  <FaUser className="h-6 w-6" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-2" />
                        Sair
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                <FaUser className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Início
              </Link>

              {/* Categorias Mobile */}
              <div className="relative">
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  Categorias
                </button>

                {showCategories && (
                  <div className="pl-4">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/categoria/${category.toLowerCase()}`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Carrinho, Login e Tema Mobile */}
              <div className="flex items-center space-x-4 px-3 py-2">
                {isAuthenticated && (
                  <Link
                    to="/carrinho"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <FaShoppingCart className="h-6 w-6" />
                  </Link>
                )}

                {isAuthenticated ? (
                  <button
                    className="text-gray-700 hover:text-gray-900"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="mr-2" />
                      Sair
                    </div>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <FaUser className="h-6 w-6" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
