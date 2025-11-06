import { useQueryClient } from '@tanstack/react-query'
import { FaSearch } from 'react-icons/fa'
import type { Plant } from '../../../interfaces/plant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllPlants } from '../../../hooks/useAllPlants';

const SearchBar = () => {

  useAllPlants();
  const queryClient = useQueryClient();
  const plants: Plant[] = queryClient.getQueryData(["all-plants"]) || [];
  
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredPlants: Plant[] =
    searchTerm.length > 0
      ? plants.filter((plant) =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectPlant = (id: number) => {
    navigate(`/produkt/${id}`);
    setSearchTerm("");
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-lg">
      <form
        role="search"
        className="w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative">
          <input
            type="search"
            placeholder="Czego szukasz?"
            aria-label="Wyszukiwarka produktów"
            className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/25 transition-all duration-200 placeholder:text-white/70"
            onChange={handleChange}
            onClick={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            value={searchTerm}
          />
          <button
            type="submit"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          >
            <FaSearch aria-hidden="true" />
            <span className="sr-only">Szukaj</span>
          </button>
        </div>
      </form>

      {isFocused && searchTerm && filteredPlants.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-emerald-200 rounded-xl shadow-lg mt-2 z-50 overflow-hidden">
          {filteredPlants.slice(0, 6).map((plant) => (
            <div
              key={plant.id}
              className="flex items-center gap-3 p-3 hover:bg-emerald-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
              onMouseDown={() => handleSelectPlant(plant.id)}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex flex-col flex-1">
                <span className="text-gray-900 font-medium">{plant.name}</span>
                <span className="text-sm text-emerald-600 font-semibold">
                  {plant.price.toFixed(2)} zł
                </span>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;