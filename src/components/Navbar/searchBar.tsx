import { useQueryClient } from '@tanstack/react-query'
import { FaSearch } from 'react-icons/fa'
import type { Plant } from '../../interfaces/plant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
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
    <div className="relative max-w-lg mx-8">
      <form
        role="search"
        className="w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          placeholder="Czego szukasz?"
          aria-label="Wyszukiwarka produktów"
          className="w-full bg-[#333] text-gray-200 py-2 px-4 pl-10 rounded-full focus:outline-none"
          onChange={handleChange}
          onClick={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          value={searchTerm}
        />
        <button
          type="submit"
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
        >
          <FaSearch aria-hidden="true" />
          <span className="sr-only">Szukaj</span>
        </button>
      </form>

      {isFocused && searchTerm && filteredPlants.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-[#222] border border-gray-700 rounded-xl shadow-lg mt-2 z-50 overflow-hidden">
          {filteredPlants.slice(0, 6).map((plant) => (
            <div
              key={plant.id}
              className="flex items-center gap-3 p-3 hover:bg-emerald-600 transition-colors cursor-pointer"
              onMouseDown={() => handleSelectPlant(plant.id)}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-gray-100 font-medium">{plant.name}</span>
                <span className="text-sm text-gray-400">
                  {plant.price.toFixed(2)} zł
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
