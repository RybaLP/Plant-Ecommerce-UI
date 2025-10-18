import { useClientInfo } from "../hooks/useClientInfo";
import { useClientContactInfo } from "../hooks/useClientContactInfo";
import { calculateDeliveryDay } from "../utils/calculateDeliveryDate";
import { CiDeliveryTruck } from "react-icons/ci";
import type { GuestFormStore } from "../interfaces/zustand-stores/guestFormStore";
import { useState } from "react";
import { useGuestFormStore } from "../store/useGuestFormStore";
import { useAuthenticationStore } from "../store/authenticationStore";


interface PropType {
  setDeliveryPrice: React.Dispatch<React.SetStateAction<number>>;
  deliveryPrice : number;
  isCompanyOrder : boolean,
  setPayOnDelivery : React.Dispatch<React.SetStateAction<boolean>>;
  setGuestInfo : (data : Partial<GuestFormStore>) => void;
  setNip : React.Dispatch<React.SetStateAction<string>>;
  setCompanyName : React.Dispatch<React.SetStateAction<string>>;
  setIsCompanyOrder : React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryAndPayment = ({setDeliveryPrice, deliveryPrice, setPayOnDelivery, setGuestInfo, setIsCompanyOrder, isCompanyOrder} : PropType) => {

  const {isAuthenticated} = useAuthenticationStore();

  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  
  // guest address
  const {shippingAddress,guestEmail,guestPhone,guestFirstName,guestLastName} = useGuestFormStore();

  // user address
  const {clientContactInfo} = useClientContactInfo();
  const {client} = useClientInfo();

  const finalShippingAddress = isAuthenticated ? clientContactInfo?.address : shippingAddress; 


  return (
      <section className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Dostawa i płatność</h1>
          <p className="text-gray-700">Prezentujemy tylko opcje dostępne dla tego zamówienia. Wypełniamy je na podstawie Twoich ostatnich zakupów.</p>
        </div>


      {/* delivery  */}
      <div className=" p-4 border rounded-lg flex flex-col mt-4">
        <h2 className="font-semibold mb-4">Sposób dostawy</h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <input type="radio" name="delivery" className="accent-blue-500" defaultChecked />
              <span>Kurier</span>
            </div>
            {<CiDeliveryTruck size={30}/>}
            <span className="ml-auto text-sm text-gray-400">{deliveryPrice} zł.</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span>Najwcześniej w : {calculateDeliveryDay()}</span>
          </label>
        </div>

      {/* order type */}
        <div className="p-6 border rounded-lg flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Kupujesz jako</h2>
          <div className="flex gap-4">
            <button className={`flex-1 py-2 rounded border hover:bg-gray-50 ${!isCompanyOrder ? "border-black font-semibold" : "border-gray-300"}`} onClick={()=>setIsCompanyOrder(false)}>
              Osoba prywatna
            </button>

            <button className={`flex-1 py-3 rounded border hover:bg-gray-50 ${isCompanyOrder ? "border-black font-semibold" : "border-gray-300"}`} onClick={()=>setIsCompanyOrder(true)}>
              Firma
            </button>
          </div>

          {isCompanyOrder && (
            <div>
              <input type="text" placeholder="Nazwa firmy" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>

              <input type="text" value={nip} placeholder="NIP" onChange={(e)=>{
                const value = e.target.value.replace(/\D/g, '').slice(0,10);
                setNip(value);
              }}/>

            </div>
          )}

        </div>

        {/* adress info */}

        <div className="p-6 border rounded-lg flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Adres dostawy</h2>
          <div className="text-gray-800 space-y-1">
            <span>{isAuthenticated ? client?.firstName : guestFirstName} {isAuthenticated ? client?.lastName : guestLastName}</span>
            <br />
            <span>{finalShippingAddress?.street}</span>
            <br />
            <span>{finalShippingAddress?.city}</span>
            <br />
            <span>{isAuthenticated ? client?.email : guestEmail}</span>
            <br />
            <span>{isAuthenticated ? clientContactInfo?.phoneNumber : guestPhone}</span>
          </div>

          {/* courier */}
          <div className="p-6 border rounded-lg flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Przesyłkę dostarczy</h2>
                <div className="flex flex-col gap-2">
                  <label className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="courier" value={20} onChange={(e)=>setDeliveryPrice(Number(e.target.value))} />
                    <span>FedEx</span> <span>20 zł.</span>
                  </label>

                  <label className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="courier" value={18.00} onChange={(e)=>setDeliveryPrice(Number(e.target.value))}/>
                    <span>InPost</span> <span>18 zł.</span>
                  </label>

                  <label className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="courier" value={15.00} defaultChecked onChange={(e)=>setDeliveryPrice(Number(e.target.value))}/>
                    <span>GLS</span> <span>15 zł.</span>
                  </label>
                </div>
              </div>
        </div>


        {/* payments */}

        <div className="p-6 border rounded-lg flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Płatność</h2>

          <div className="flex flex-col gap-2">

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="metoda-platnosci" defaultChecked value="platnosc-karta" onChange={()=>setPayOnDelivery(false)}/>
              <span>Platność kartą online</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="metoda-platnosci" value="platnosc-za-pobraniem" onChange={() => setPayOnDelivery(true)}/>
              <span>Płatność za pobraniem</span><span>+7zł</span>
            </label>

          </div>
        </div>
      </div>
    </section>
   )
}

export default DeliveryAndPayment;