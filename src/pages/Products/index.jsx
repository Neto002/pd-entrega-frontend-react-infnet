import { useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import ProductFilters from "../../components/ProductFilters";

export default function Products() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
  });

  // Dados de exemplo para produtos
  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      price: 1299.99,
      category: "Eletrônicos",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Notebook Pro",
      price: 4599.99,
      category: "Eletrônicos",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Fones de Ouvido Wireless",
      price: 299.99,
      category: "Acessórios",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Smartwatch Fitness",
      price: 599.99,
      category: "Acessórios",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Camiseta Casual",
      price: 89.99,
      category: "Roupas",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      rating: 4.2,
    },
    {
      id: 6,
      name: "Tênis Esportivo",
      price: 199.99,
      category: "Esportes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      rating: 4.6,
    },
  ];

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters onFilterChange={setFilters} />
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
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
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
