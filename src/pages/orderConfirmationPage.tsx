import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md"; 
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkOrderNumber } from "../api/checkOrderNumber";

const OrderConfirmationPage = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(!orderNumber) {
      navigate("/");
      return;
    }

    const verifyOrder = async () => {
      try {
        await checkOrderNumber(orderNumber);
      } catch (error) {
        navigate("/blad-zamowienia");        
      } finally {
        setLoading(false);
      }
    }

    verifyOrder();
  },[orderNumber, navigate]);


  if (loading) {
  return (
      <div className="flex items-center justify-center h-screen">
        <p>Sprawdzanie zamówienia...</p>
      </div>
    );
  }
  

  return (
    <section className="bg-white text-gray-900 p-6 rounded-lg shadow-sm max-w-4xl mx-auto my-10">
      
      <header className="flex flex-col items-center mb-8 border-b pb-6">
        <FaCheckCircle className="text-green-500 mb-4" size={64} />
        
        <h1 className="text-3xl font-bold text-center">
          Potwierdzenie Zamówienia
        </h1>
      </header>

      <div className="text-center p-4">
        <p className="text-xl mb-4 font-semibold">
          Dziękujemy za zakupy w naszym sklepie!
        </p>
        
        <p className="text-gray-700 mb-2">
          Twoje zamówienie zostało pomyślnie złożone.
        </p>
        
        <div className="bg-gray-100 p-3 rounded-lg inline-block my-4">
          <p className="text-sm text-gray-500">
            Wygenerowany kod zamówienia:
          </p>
          <p className="text-2xl font-extrabold text-orange-500 tracking-wider">
            {orderNumber || "BRAK NUMERU"} 
          </p>
        </div>
        
        <p className="text-gray-700 mt-4">
          Szczegóły i potwierdzenie zamówienia zostały wysłane na adres e-mail.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Prosimy sprawdzić również folder Spam.
        </p>
      </div>

      <div className="mt-8 flex justify-center border-t pt-6">
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 p-3 font-bold bg-green-500 hover:bg-green-600 text-white transition rounded-md shadow-md"
        >
          <MdOutlineArrowBack size={24} />
          Wróć do strony głównej
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;