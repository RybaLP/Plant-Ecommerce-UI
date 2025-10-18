import { useLandingPagePlants } from "../hooks/useLandingPagePlants";
import type { Plant } from "../interfaces/plant";
import { useAddToCart } from "../hooks/useAddToCart";
import { useCart } from "../hooks/useCart";
import { useAuthenticationStore } from "../store/authenticationStore";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {

  const {plants} = useLandingPagePlants();
  const {addToCart} = useAddToCart();
  const isAuthenticated = useAuthenticationStore(state => state.isAuthenticated);
  const {addMutate} = useCart();
  const {addItem} = useCartStore();

  const navigate = useNavigate();


  const handleAddToCart = (items : {plantId : number , quantity : number , plant : Plant }) => {
    
    if (isAuthenticated) {
       addMutate.mutate({plantId : items.plantId, quantity : items.quantity, plant : items.plant});
    } else {
       addItem({plantId : items.plantId , plant : items.plant , quantity : items.quantity});
    }
  }

  return (
    <section className='py-12 px-4 md:px-8 bg-gray-50'>
        <div className='container mx-auto'>
            <h2 className='text-center text-4xl font-bold text-green-800 mb-10'>Wybrane dla ciebie</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                {plants?.map((plant : Plant) => (
            <article key={plant.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            onClick={()=>navigate(`/produkt/${plant.id}`)}>
              <div className="relative">
                <img src={plant.imageUrl} alt={plant.name} className="w-full h-48 object-cover" />
                <button
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-green-700 text-white font-semibold py-2 px-4 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
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
          ))}
            </div>

            <div className="text-center mt-10">
            <a href="/produkty" className="inline-block bg-green-800 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-700 transition-colors duration-300">
                Pokaż wszystkie produkty
            </a>
        </div>
        </div>
    </section>
  )
}

export default ProductGrid