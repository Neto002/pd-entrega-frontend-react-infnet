import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleFinalizePurchase = () => {
    alert("Compra finalizada!");
    clearCart();
    navigate("/produtos");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-600 mb-4">
            Adicione alguns produtos para começar suas compras
          </p>
          <Link
            to="/produtos"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Carrinho de Compras</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 flex items-center"
        >
          <FaTrash className="mr-2" />
          Limpar Carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Produtos */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 mt-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({getCartItemsCount()} itens)</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R$ {getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleFinalizePurchase}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
