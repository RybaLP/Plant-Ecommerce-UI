import type { Plant } from "../interfaces/plant";
import { useNavigate } from "react-router-dom";

interface Props {
    plant : Plant;
    handleAddToCart : (item : {plantId : number, quantity : number , plant : Plant}) => void;
}


const ProductCard = ({plant, handleAddToCart} : Props) => {

    const navigate = useNavigate();

  return (
     <article key={plant.id} className="hover:cursor-pointer bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            onClick={()=>navigate(`/produkt/${plant.id}`)}>
              <div className="relative">
                <img src={plant.imageUrl} alt={plant.name} className="w-full h-48 object-cover" />
                <button
                  className="hover:cursor-pointer absolute bottom-2 left-1/2 -translate-x-1/2 bg-green-700 text-white font-semibold py-2 px-4 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  onClick={(e)=>{ e.stopPropagation() ; handleAddToCart({plantId : plant.id , quantity : 1 , plant})}}
                >
                  + Do koszyka
                </button>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{plant.name}</h3>
                <p className="text-xl font-bold text-green-700">{plant.price.toFixed(2)} zł</p>
              </div>
            </article>
  )
}

export default ProductCard