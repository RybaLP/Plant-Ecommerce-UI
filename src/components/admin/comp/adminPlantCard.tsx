import { useState } from "react";
import type { Plant } from "../../../interfaces/plant";
import DeletePlantNotification from "../../notifications/deletePlantNotification";
import UpdatePlantForm from "./forms/updatePlantForm";

interface PlantCardProps {
  plant: Plant;
}

export const AdminPlantCard = ({ plant }: PlantCardProps) => {

  const [isUpdateFormOpen , setIsUpdateFormOpen] = useState(false);

  const [isOpen , setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const handleOpenForm = (plant : Plant) => {
      setSelectedPlant(plant)
      setIsOpen(true);
  }

  const handleOpenUpdateForm = (plant : Plant) => {
    setSelectedPlant(plant);
    setIsUpdateFormOpen(true);
  }

  console.log("PLANT PASSED TO CARD:", plant);


  return (
    
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={plant.imageUrl} 
        alt={plant.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{plant.name}</h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Kategoria:</span> {plant.category}</p>
        <p><span className="font-medium">Rozmiar:</span> {plant.size}</p>
        <p><span className="font-medium">W magazynie:</span> {plant.quantityInStock}</p>
        <p className="text-lg font-bold text-green-700">{plant.price} zł</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
        onClick={() => handleOpenUpdateForm(plant)}>
          Edytuj
        </button>
        <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
        onClick={() => handleOpenForm(plant)}>
          Usuń
        </button>
      </div>

      {isOpen && selectedPlant && (
        <DeletePlantNotification setIsOpen={setIsOpen} plant={selectedPlant} />
      )}

      {isUpdateFormOpen && selectedPlant && (
      <UpdatePlantForm
        plant={selectedPlant}
        setIsOpen={setIsUpdateFormOpen}
      />
  )}


    </div>
  );
};