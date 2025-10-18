import { useNavigate } from "react-router-dom";

const RegistrationOrGuestCheckout = () => {
    const navigate = useNavigate();

  return (
    <section className=''>
        <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            NIE MASZ JESZCZE KONTA? <br /> ZAREJESTRUJ SIĘ!
          </h2>
          <button className="bg-orange-500 text-white font-bold py-3 px-12 rounded-full hover:bg-orange-600 transition-colors mb-6 hover:cursor-pointer"
            onClick={()=>navigate("/rejestracja")}
          >
            ZAREJESTRUJ SIĘ
          </button>
          <p className="text-sm text-gray-600 mb-4">
            ZAREJESTRUJ SIĘ I ZYSKAJ SZYBKI DOSTĘP DO:
          </p>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>Szybkie i wygodne zakupy</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>Możliwość śledzenia statusu swojego zamówienia</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>Dostęp do historii zakupów i listy życzeń</span>
            </li>
          </ul>
        </div>
        </div>
    </section>
  )
}

export default RegistrationOrGuestCheckout;