import { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Carousel from "../../components/Carousel";
import { getCategories, getProducts } from "../../services/productsService";
import { capitalize } from "../../util/format";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  // Dados de exemplo para o carousel
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      caption: "Nova Coleção de Verão",
      description: "Confira as últimas tendências para o verão",
    },
    {
      url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      caption: "Promoções Imperdíveis",
      description: "Até 50% de desconto em produtos selecionados",
    },
    {
      url: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      caption: "Entrega Grátis",
      description: "Para compras acima de R$ 200",
    },
  ];

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

  // Buscar produtos ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Obter os 5 primeiros produtos para exibição em destaque
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Carousel */}
      <div className="mb-12">
        <Carousel images={carouselImages} />
      </div>

      {/* Produtos em Destaque */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Produtos em Destaque
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Nenhum produto disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="p-4">
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
                    <span className="text-gray-500 ml-2">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seção de Categorias */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Categorias Populares
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              to={`/produtos/${category}`}
              key={category}
              className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <span className="font-semibold">{capitalize(category)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
