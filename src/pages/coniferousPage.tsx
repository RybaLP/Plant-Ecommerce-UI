import { useQueryClient } from "@tanstack/react-query";
import type { Plant } from "../interfaces/plant";
import { useState } from "react";
import type { FilterType } from "../types/filterType";
import { useCartStore } from "../store/useCartStore";
import { useCart } from "../hooks/useCart";
import { useAuthenticationStore } from "../store/authenticationStore";
import PriceFilter from "../components/priceFilter";
import ProductCard from "../components/productCard";

const ConiferousPage = () => {
  const queryClient = useQueryClient();
  const plants = queryClient.getQueryData<Plant[]>(["all-plants"]) ?? [];

  const { isAuthenticated } = useAuthenticationStore();
  const { addMutate } = useCart();
  const { addItem } = useCartStore();

  const [filterType, setFilterType] = useState<FilterType>("default");

  const coniferousPlantsList = plants.filter(
    (plant) => plant.category === "CONIFEROUS"
  );

  const filteredConiferousPlantsList = [...coniferousPlantsList].sort(
    (a, b) => {
      switch (filterType) {
        case "asc":
          return a.price - b.price;
        case "desc":
          return b.price - a.price;
        case "lowAmount":
          return a.quantityInStock - b.quantityInStock;
        case "highAmount":
          return b.quantityInStock - a.quantityInStock;
        default:
          return 0;
      }
    }
  );

   const handleAddToCart = (items : {plantId : number , quantity : number , plant : Plant }) => {
      if (isAuthenticated) {
        addMutate.mutate({plantId : items.plantId, quantity : items.quantity, plant : items.plant});
      } else {
        addItem({plantId : items.plantId , plant : items.plant , quantity : items.quantity});
      }
  }

  return (
     <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-8 max-w-[1400px] mx-auto">
    <h1 className="text-3xl font-bold text-center mb-8">Rośliny iglaste</h1>
      <PriceFilter onChange={setFilterType} />
    </div>
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {filteredConiferousPlantsList.map((plant) => (
        <ProductCard
          key={plant.id}
          plant={plant}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  </div>
  );
};

export default ConiferousPage;
