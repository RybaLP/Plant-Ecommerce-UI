import { useParams } from 'react-router-dom';
import { usePlant } from '../hooks/usePlant';
import { useState } from 'react';
import { useAddToCart } from '../hooks/useAddToCart';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import ReviewSection from '../components/reviewSection';
import toast from "react-hot-toast";
import { useAuthenticationStore } from '../store/authenticationStore';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { plant, isLoading, isError } = usePlant(id!);
  const { addToCart } = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const {isAuthenticated} = useAuthenticationStore();

  if (isLoading) return <p className="text-center py-10">Ładowanie...</p>;
  if (isError) return <p className="text-center text-red-600 py-10">Błąd podczas pobierania roślin</p>;
  if (!plant) return;

  const handleIncreaseQuantity = () => {
    if (quantity < plant.quantityInStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {

    if (plant) {
      const loadingToastId = toast.loading(`Dodawanie ${quantity} szt. do koszyka...`);

      if (!isAuthenticated) {
          const result = await addToCart({
          plantId: plant.id,
          quantity: quantity,
          plant: plant,
      });

      toast.dismiss(loadingToastId); 

      if (result.success) {
          toast.success("Produkt został pomyślnie dodany do koszyka");
          setQuantity(1);
        } else {
          toast.error("Wystąpił bląd przy dodawaniu do koszsyka");
        }
      }

      else if (isAuthenticated) {
        addToCart({plantId : plant.id, quantity : quantity, plant : plant});
        console.log({plantId : plant.id, quantity : quantity, plant : plant})
        toast.success("Produkt został pomyślnie dodany do koszyka");
        setQuantity(1);
      }

      toast.dismiss(loadingToastId); 
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-50">
          <img 
            src={plant.imageUrl} 
            alt={plant.name} 
            className="w-full h-96 object-cover lg:h-full"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{plant.name}</h1>
          
          <p className="text-2xl font-semibold text-green-700 mb-6">
            {plant.price.toFixed(2)} zł
          </p>

          <h2 className="text-xl font-bold text-gray-800 mb-3">Opis produktu</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {plant.description || "Brak opisu dla tego produktu."}
          </p>

          {/* quantity counter */}
          <div className='flex items-center gap-4 border rounded-lg w-max p-2'>
            <button onClick={handleDecreaseQuantity} className='text-gray-600 hover:text-gray-900'>
              <CiSquareMinus size={50} />
            </button>

            <span className='text-xl font-semibold'>{quantity}</span>

            <button 
              onClick={handleIncreaseQuantity} 
              className='text-gray-600 hover:text-gray-900'
              disabled={quantity >= plant.quantityInStock}
            >
              <CiSquarePlus size={50} />
            </button>
          </div>

          <p className='text-gray-600 text-sm mt-2'>
            Dostępne: {plant.quantityInStock} sztuk
          </p>

          <button 
            className="mt-auto bg-green-700 text-white py-4 px-8 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors duration-300"
            onClick={handleAddToCart}
          >
            + Dodaj do koszyka
          </button>
        </div>
      </div>

      <section className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <ReviewSection reviews={plant.reviews} />
      </section>

    </section>
  );
};

export default ProductPage;
