import { useCartStore } from "../../store/useCartStore";
import toast from "react-hot-toast"; 

type Props = {
    handleWarningCart : () => void;
}

const CleanCartWarning = (props : Props) => {

    const {handleWarningCart} = props;
    const {clearCart} = useCartStore();

    const handleCleanCart = () => {
        clearCart();
        handleWarningCart(); 
        toast.success("Koszyk został wyczyszczony."); 
    }
    
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            
            <div className='bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center'>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Potwierdzenie
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Czy na pewno chcesz **całkowicie wyczyścić** swój koszyk? Tej operacji nie można cofnąć.
                </p>

                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={handleCleanCart}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        Tak, wyczyść
                    </button>

                    <button 
                        onClick={handleWarningCart}
                        className="px-6 py-2 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
                    >
                        Anuluj
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CleanCartWarning;