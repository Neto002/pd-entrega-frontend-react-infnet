import { useEffect, useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../contexts/CartContext";
import ProductFilters from "../../components/ProductFilters";
import { getProducts } from "../../services/productsService";
import { capitalize } from "../../util/format";

export default function Products() {
  const { categoria } = useParams();
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    categories: categoria ? [categoria] : [],
    priceRange: [0, 1000],
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Atualiza os filtros quando a categoria da URL muda
  useEffect(() => {
    if (categoria) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoria],
      }));
    }
  }, [categoria]);

  // Função para filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return matchesCategory && matchesPrice;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Produto adicionado ao carrinho!", {
      duration: 2000,
      style: {
        background: "#4CAF50",
        color: "#fff",
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters
            onFilterChange={setFilters}
            initialCategory={categoria}
          />
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <p className="text-gray-600">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {capitalize(product.category)}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(product.rating.rate)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="cursor-pointer bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
