import { useAllPlants } from "../hooks/useAllPlants";
import { useCart } from "../hooks/useCart";
import { useCartStore } from "../store/useCartStore";
import { useAuthenticationStore } from "../store/authenticationStore";
import ProductCard from "../components/productCard";
import type { Plant } from "../interfaces/plant";
import PriceFilter from "../components/priceFilter";
import type { FilterType } from "../types/filterType";
import { useState } from "react";


const DeciduousPlantsPage = () => {

  const {plants, isLoading} = useAllPlants();
  const {isAuthenticated} = useAuthenticationStore();
  const {addMutate} = useCart();
  const {addItem} = useCartStore();
  const [filterType, setFilterType] = useState<FilterType>("default");

   const handleAddToCart = (items : {plantId : number , quantity : number , plant : Plant }) => {
      if (isAuthenticated) {
        addMutate.mutate({plantId : items.plantId, quantity : items.quantity, plant : items.plant});
      } else {
        addItem({plantId : items.plantId , plant : items.plant , quantity : items.quantity});
      }
  }

  const decidousPlantsList = plants?.filter((plant) => plant.category === "DECIDUOUS") ?? [];

  const filteredDecidousPlantsList : Plant [] = decidousPlantsList.sort((a,b)=>{
    switch (filterType){
      case "asc":
        return a.price - b.price;
      case "desc":
        return a.price - b.price;
      case "highAmount":
        return b.quantityInStock - a.quantityInStock;
      case "lowAmount":
        return a.quantityInStock - b.quantityInStock;
      default:
        return 0;
    }
  })

    if (isLoading) {
        return <div className="text-center mt-10">Ładowanie roślin...</div>;
    }

    if (decidousPlantsList.length === 0) {
        return <div className="text-center mt-10">Brak roślin owocowych w bazie.</div>;
    }

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-8 max-w-[1400px] mx-auto">
    <h1 className="text-3xl font-bold text-center mb-8">Rośliny owocowe</h1>
      <PriceFilter onChange={setFilterType} />
    </div>
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {filteredDecidousPlantsList.map((plant) => (
        <ProductCard
          key={plant.id}
          plant={plant}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  </div>
  )
}

export default DeciduousPlantsPage