import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import PropTypes from "prop-types";
import { getCategories } from "../../services/productsService";
import { capitalize } from "../../util/format";

export default function ProductFilters({
  onFilterChange,
  initialCategory,
  minPrice,
  maxPrice,
}) {
  const [priceRange, setPriceRange] = useState([
    minPrice || 0,
    maxPrice || 1000,
  ]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
      onFilterChange({ categories: [initialCategory], priceRange });
    }
  }, [initialCategory]);

  useEffect(() => {
    setPriceRange([minPrice || 0, maxPrice || 1000]);
  }, [minPrice, maxPrice]);

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange });
  };

  const handlePriceChange = (e) => {
    const newPriceRange = [minPrice || 0, parseInt(e.target.value)];
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
              {capitalize(category)}
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
            min={minPrice || 0}
            max={maxPrice || 1000}
            step="1"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>R$ {minPrice?.toFixed(2) || "0.00"}</span>
            <span>R$ {priceRange[1].toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialCategory: PropTypes.string,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};
