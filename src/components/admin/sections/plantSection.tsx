import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Plant } from "../../../interfaces/plant";
import { AdminPlantCard } from "../comp/adminPlantCard";
import CreatePlantForm from "../comp/forms/createPlantForm";

interface Props {
  isAuthenticated: boolean;
}

const PlantsSection = ({ isAuthenticated }: Props) => {
  const plants: Plant[] = useQueryClient().getQueryData(["all-plants"]) ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatePlantFormOpen , setIsCraetePlantFormOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  const filteredPlants: Plant[] = searchTerm.length > 0 
    ? plants.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : plants; 

  const plantsPerPage = 12;
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(filteredPlants.length / plantsPerPage);


  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (plants.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Zarządzanie roślinami</h1>
        <p>Brak roślin do wyświetlenia</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Zarządzanie roślinami</h1>

      <button className="bg-emerald-400 text-white font-bold rounded-2xl p-2 hover:cursor-pointer mb-4" onClick={() => 
        setIsCraetePlantFormOpen(true)
      }>
        Dodaj roślinę do oferty
      </button>
      
      <div className="mb-4">
        <div className="relative max-w-md">
          <input 
            type="text" 
            onChange={handleChange} 
            value={searchTerm}
            placeholder="Szukaj rośliny po nazwie..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Znaleziono {filteredPlants.length} roślin dla: "{searchTerm}"
          </p>
        )}
      </div>

      <div className="mb-4 text-gray-600">
        Wyświetlanie {indexOfFirstPlant + 1}-{Math.min(indexOfLastPlant, filteredPlants.length)} z {filteredPlants.length} roślin
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentPlants.map((plant) => (
          <AdminPlantCard key={plant.id} plant={plant} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Poprzednia
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 border rounded ${
                currentPage === page
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Następna
          </button>
        </div>
      )}

      {isCreatePlantFormOpen && <CreatePlantForm setIsOpen = {setIsCraetePlantFormOpen}/>}
      
    </div>
  );
};

export default PlantsSection;