import { useState } from "react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
  // Dados de exemplo para o carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Smartphone XYZ",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
      quantity: 1,
    },
    {
      id: 2,
      name: "Fones de Ouvido Wireless",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      quantity: 2,
    },
  ]);

  // Função para atualizar a quantidade de um item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Função para remover um item do carrinho
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Função para finalizar o pedido
  const finishOrder = () => {
    alert("Pedido finalizado!");
    clearCart();
  };

  // Cálculo do total do carrinho
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Seu carrinho está vazio</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de Produtos */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 border-b last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                  </div>

                  {/* Controles de Quantidade */}
                  <div className="flex items-center mx-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-4 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Preço Total do Item */}
                  <div className="text-right mx-4">
                    <p className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Botão Remover */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={finishOrder}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Finalizar Pedido
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
