import { FaStar, FaShoppingCart } from "react-icons/fa";
import Carousel from "../../components/Carousel";

export default function Home() {
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

  // Dados de exemplo para produtos em destaque
  const featuredProducts = [
    {
      id: 1,
      name: "Smartphone XYZ",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Notebook Pro",
      price: 4599.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Fones de Ouvido Wireless",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Smartwatch Fitness",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
      rating: 4.7,
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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

      {/* Seção de Categorias */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Categorias Populares
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Eletrônicos", "Roupas", "Acessórios", "Casa"].map((category) => (
            <div
              key={category}
              className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <h3 className="font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
