import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  updateProductStock,
} from "../../services/productsService";
import {
  FaPlus,
  FaMinus,
  FaCheck,
  FaTimes,
  FaImage,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    category: "",
    rating: { rate: 0, count: 0 },
  });
  const [createFormData, setCreateFormData] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    category: "",
    rating: { rate: 0, count: 0 },
  });
  const [editingStock, setEditingStock] = useState(null);
  const [tempStock, setTempStock] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    setPreviewImage(product.image);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(productId);
        fetchProducts();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("edit", editFormData);
      await updateProduct(selectedProduct.id, editFormData);
      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      console.log("create", createFormData);
      await createProduct(createFormData);
      setShowCreateModal(false);
      setCreateFormData({
        title: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        category: "",
        rating: { rate: 0, count: 0 },
      });
      fetchProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleStockChange = (productId, change) => {
    const product = products.find((p) => p.id === productId);
    const newStock = Math.max(0, product.stock + change);
    updateProductStock(productId, { stock: newStock })
      .then(() => fetchProducts())
      .catch((error) => console.error("Erro ao atualizar estoque:", error));
  };

  const startEditingStock = (product) => {
    setEditingStock(product.id);
    setTempStock(product.stock.toString());
  };

  const cancelEditingStock = () => {
    setEditingStock(null);
    setTempStock("");
  };

  const saveStockEdit = async (productId) => {
    try {
      const newStock = parseInt(tempStock);
      if (isNaN(newStock) || newStock < 0) {
        throw new Error("Quantidade inválida");
      }
      await updateProductStock(productId, { stock: newStock });
      setEditingStock(null);
      setTempStock("");
      fetchProducts();
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert("Erro ao atualizar estoque. Por favor, insira um número válido.");
    }
  };

  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (isEdit) {
          setEditFormData((prev) => ({ ...prev, image: base64String }));
        } else {
          setCreateFormData((prev) => ({ ...prev, image: base64String }));
        }
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setCreateFormData({
      title: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      category: "",
      rating: { rate: 0, count: 0 },
    });
    setPreviewImage("");
    setShowCreateModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Administração de Produtos</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaPlus />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Nome</th>
              <th className="px-6 py-3 border-b text-left">Preço</th>
              <th className="px-6 py-3 border-b text-left">Estoque</th>
              <th className="px-6 py-3 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{product.title}</td>
                <td className="px-6 py-4 border-b">
                  R$ {product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b">
                  {editingStock === product.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={tempStock}
                        onChange={(e) => setTempStock(e.target.value)}
                        className="w-20 px-2 py-1 border rounded"
                        min="0"
                      />
                      <button
                        onClick={() => saveStockEdit(product.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={cancelEditingStock}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStockChange(product.id, -1)}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        <FaMinus />
                      </button>
                      <span
                        onClick={() => startEditingStock(product)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleStockChange(product.id, 1)}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 mr-2"
                    title="Editar produto"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                    title="Excluir produto"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4">Editar Produto</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Imagem</label>
                <div className="flex items-center space-x-4">
                  {previewImage && (
                    <img
                      src={
                        previewImage.startsWith("http") ||
                        previewImage.startsWith("data")
                          ? previewImage
                          : `http://localhost:3000/uploads/${previewImage}`
                      }
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="hidden"
                    />
                    <FaImage className="w-8 h-8 text-gray-400" />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.price}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Categoria</label>
                <input
                  type="text"
                  value={editFormData.category}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4">Novo Produto</h3>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Imagem</label>
                <div className="flex items-center space-x-4">
                  {previewImage && (
                    <img
                      src={
                        previewImage.startsWith("http") ||
                        previewImage.startsWith("data")
                          ? previewImage
                          : `http://localhost:3000/uploads/${previewImage}`
                      }
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="hidden"
                    />
                    <FaImage className="w-8 h-8 text-gray-400" />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={createFormData.title}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={createFormData.price}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Estoque</label>
                <input
                  type="number"
                  value={createFormData.stock}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      stock: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Categoria</label>
                <input
                  type="text"
                  value={createFormData.category}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={createFormData.description}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
