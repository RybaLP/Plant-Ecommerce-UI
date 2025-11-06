import { useClientInfo } from "../hooks/useClientInfo";
import { useClientContactInfo } from "../hooks/useClientContactInfo";
import { calculateDeliveryDay } from "../utils/calculateDeliveryDate";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import type { GuestFormStore } from "../interfaces/zustand-stores/guestFormStore";
import { useState } from "react";
import { useGuestFormStore } from "../store/useGuestFormStore";
import { useAuthenticationStore } from "../store/authenticationStore";
import { GoPencil } from "react-icons/go";
import UpdateAddressForm from "./updateAddressForm";
import type { Address } from "../interfaces/address";
import toast from "react-hot-toast";
import { useUpdateClientAddress } from "../hooks/useUpdateClientAddress";
import type { ClientContactInfo } from "../interfaces/clientContactInfo";
import { TbUser } from "react-icons/tb";
import { TbBuilding } from "react-icons/tb";

interface PropType {
  setDeliveryPrice: React.Dispatch<React.SetStateAction<number>>;
  deliveryPrice: number;
  isCompanyOrder: boolean;
  isAddressFormOpen: boolean;
  setPayOnDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  setGuestInfo: (data: Partial<GuestFormStore>) => void;
  setNip: React.Dispatch<React.SetStateAction<string>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setIsCompanyOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddressFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientContactInfo: ClientContactInfo | undefined | null;
}

const DeliveryAndPayment = ({
  setDeliveryPrice,
  deliveryPrice,
  setPayOnDelivery,
  setGuestInfo,
  setIsCompanyOrder,
  isCompanyOrder,
  isAddressFormOpen,
  setIsAddressFormOpen,
  clientContactInfo
}: PropType) => {

  const { isAuthenticated } = useAuthenticationStore();

  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");

  const { mutateAsync } = useUpdateClientAddress();
  
  // guest address
  const { shippingAddress, guestEmail, guestPhone, guestFirstName, guestLastName, updateGuestAddress } = useGuestFormStore();

  // user address
  const { client } = useClientInfo();

  const finalShippingAddress = isAuthenticated ? clientContactInfo?.address : shippingAddress;
  
  // update address function
  const handleSubmitUpdatedAddress = async (updatedAddress: Address) => {
    try {
      if (!isAuthenticated) {
        updateGuestAddress(updatedAddress);
        setIsAddressFormOpen(false);
        toast.success("Pomyślnie zaktualizowano adres.");
        return;
      }

      try {
        await mutateAsync(updatedAddress);
        setIsAddressFormOpen(false);
      } catch (error) {
        toast.error("Nie udało się zaktualizować adresu.");   
      }

    } catch (error) {
        toast.error("Nie udało się zaktualizować adresu.");   
    }
  }

  return (
    <section className="p-6 max-w-4xl mx-auto flex flex-col gap-8">
      {/* Header Section - NOWA WERSJA */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dostawa i płatność
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Prezentujemy tylko opcje dostępne dla tego zamówienia. 
          Wypełniamy je na podstawie Twoich ostatnich zakupów.
        </p>
      </div>

      {/* Main Container - NOWA WERSJA */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Delivery Method Section - NOWA WERSJA */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TbTruckDelivery className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Sposób dostawy</h2>
          </div>
          
          <div className="space-y-4">
            {/* Delivery Option Card */}
            <label className="flex items-center justify-between p-4 border-2 border-blue-500 rounded-xl cursor-pointer bg-blue-50 transition-all hover:bg-blue-100 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input 
                    type="radio" 
                    name="delivery" 
                    className="sr-only" 
                    defaultChecked 
                  />
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 text-lg">Kurier</span>
                  <p className="text-sm text-gray-600 mt-1">Szybka i bezpieczna dostawa</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CiDeliveryTruck size={32} className="text-gray-600" />
                <div className="text-right">
                  <span className="font-bold text-gray-900 text-lg">{deliveryPrice} zł</span>
                  <p className="text-sm text-gray-600">koszt dostawy</p>
                </div>
              </div>
            </label>
            
            {/* Delivery Date Info */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">!</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Najwcześniejsza dostawa:{" "}
                  <span className="text-blue-600 font-semibold">{calculateDeliveryDay()}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Data może ulec zmianie w zależności od dostępności produktów
                </p>
              </div>
            </div>
          </div>
        </div>

       <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <TbUser className="text-green-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Kupujesz jako</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  !isCompanyOrder 
                    ? "border-green-500 bg-green-50 text-green-700 shadow-sm" 
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                onClick={() => setIsCompanyOrder(false)}
              >
                <TbUser size={32} className={!isCompanyOrder ? "text-green-600" : "text-gray-500"} />
                <span className="font-semibold text-lg">Osoba prywatna</span>
                <p className="text-sm text-center text-gray-600">Zamówienie na osobę prywatną</p>
              </button>

              <button 
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  isCompanyOrder 
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" 
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
                onClick={() => setIsCompanyOrder(true)}
              >
                <TbBuilding size={32} className={isCompanyOrder ? "text-blue-600" : "text-gray-500"} />
                <span className="font-semibold text-lg">Firma</span>
                <p className="text-sm text-center text-gray-600">Zamówienie firmowe z VAT</p>
              </button>
            </div>

            {isCompanyOrder && (
              <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg">Dane firmy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nazwa firmy *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Wprowadź nazwę firmy"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIP *
                    </label>
                    <input 
                      type="text" 
                      value={nip}
                      placeholder="Wprowadź NIP"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setNip(value);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


{/* address and courier  */}
   <div className="p-6 border border-gray-200 rounded-lg bg-white">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold text-gray-900">Adres dostawy</h2>
    <button 
      className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
      onClick={() => setIsAddressFormOpen(true)}
    >
      <GoPencil size={16} />
      <span className="font-medium">Edytuj</span>
    </button>
  </div>

  {/* Address Form */}
  {isAddressFormOpen && (
    <UpdateAddressForm 
      setIsAddressFormOpen={setIsAddressFormOpen}
      handleSubmitUpdatedAddress={handleSubmitUpdatedAddress}
      finalShippingAddress={finalShippingAddress}
    />
  )}

  {/* Address Info */}
  <div className="bg-gray-50 p-4 rounded-lg mb-6">
    <div className="space-y-2 text-gray-700">
      <p className="font-medium">
        {isAuthenticated ? client?.firstName : guestFirstName} {isAuthenticated ? client?.lastName : guestLastName}
      </p>
      <p>{finalShippingAddress?.street}</p>
      <p>{finalShippingAddress?.city}</p>
      <p>{isAuthenticated ? client?.email : guestEmail}</p>
      <p>{isAuthenticated ? clientContactInfo?.phoneNumber : guestPhone}</p>
    </div>
  </div>

  {/* Courier Selection */}
  <div>
    <h3 className="font-semibold text-gray-900 mb-3">Przesyłkę dostarczy</h3>
    <div className="space-y-2">
      <label className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <input type="radio" name="courier" value={20} onChange={(e)=>setDeliveryPrice(Number(e.target.value))} />
          <span>FedEx</span>
        </div>
        <span>20 zł</span>
      </label>

      <label className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <input type="radio" name="courier" value={18.00} onChange={(e)=>setDeliveryPrice(Number(e.target.value))}/>
          <span>InPost</span>
        </div>
        <span>18 zł</span>
      </label>

      <label className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3">
          <input type="radio" name="courier" value={15.00} defaultChecked onChange={(e)=>setDeliveryPrice(Number(e.target.value))}/>
          <span className="font-medium">GLS</span>
        </div>
        <span className="font-medium">15 zł</span>
      </label>
    </div>
  </div>
</div>


        {/* payment  */}

        <div className="p-6 border border-gray-200 rounded-lg bg-white">
  <h2 className="font-semibold text-lg mb-4">Płatność</h2>

  <div className="flex flex-col gap-3">
    <label className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input 
          type="radio" 
          name="metoda-platnosci" 
          defaultChecked 
          value="platnosc-karta" 
          onChange={() => setPayOnDelivery(false)}
        />
        <span>Płatność kartą online</span>
      </div>
    </label>

    <label className="flex justify-between items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input 
          type="radio" 
          name="metoda-platnosci" 
          value="platnosc-za-pobraniem" 
          onChange={() => setPayOnDelivery(true)}
        />
        <span>Płatność za pobraniem</span>
      </div>
      <span className="text-red-600 font-medium">+7 zł</span>
    </label>
  </div>
</div>


      </div>
    </section>
  )
}

export default DeliveryAndPayment;