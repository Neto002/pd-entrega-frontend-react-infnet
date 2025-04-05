import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export default function ProductFilters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Eletrônicos",
    "Roupas",
    "Acessórios",
    "Casa e Decoração",
    "Esportes",
    "Livros",
  ];

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange });
  };

  const handlePriceChange = (e) => {
    const newPriceRange = [0, parseInt(e.target.value)];
    setPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FaFilter className="mr-2" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {/* Filtro de Categorias */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categorias</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Filtro de Preço */}
      <div>
        <h3 className="font-medium mb-2">Faixa de Preço</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>R$ 0</span>
            <span>R$ {priceRange[1].toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
