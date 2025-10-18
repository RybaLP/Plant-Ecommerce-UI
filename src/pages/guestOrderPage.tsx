import { useGuestFormStore } from "../store/useGuestFormStore"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import GuestOrderForm from "../components/guestOrderForm";
import { useCartStore } from "../store/useCartStore";

  interface GuestErrors {
    guestFirstName?: string;
    guestLastName?: string;
    guestEmail?: string;
    guestPhone?: string;
    nip? : string,
    companyName? : string,
    shippingAddress?: {     
      street?: string;
      postalCode?: string;
      city?: string;
    };
  }

const GuestOrderPage = () => {

  const {guestEmail, guestFirstName, guestLastName , shippingAddress,
     guestPhone, setGuestInfo, nip , companyName} = useGuestFormStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<GuestErrors>({});

  const {cart, totalPrice} = useCartStore();

  const validate = () : boolean => {
 
      const newErrors: GuestErrors = {};

      if (!guestFirstName.trim()) {
        newErrors.guestFirstName = "Podaj imię";
      }

      if (!guestLastName.trim()) {
        newErrors.guestLastName = "Podaj nazwisko";
      }

      if (!guestEmail.trim()) {
        newErrors.guestEmail = "Podaj email";
      } else if (!/^\S+@\S+\.\S+$/.test(guestEmail)) {
        newErrors.guestEmail = "Niepoprawny email";
      }

      if (!guestPhone.trim()) {
        newErrors.guestPhone = "Podaj numer telefonu";
      }

      // address validation
      const addressErrors: GuestErrors["shippingAddress"] = {};

      if (!shippingAddress?.street?.trim()) {
        addressErrors.street = "Podaj ulicę";
      }

      if (!shippingAddress?.postalCode?.trim()) {
        addressErrors.postalCode = "Podaj kod pocztowy";
      }

      if (!shippingAddress?.city?.trim()) {
        addressErrors.city = "Podaj miasto";
      }

      if (Object.keys(addressErrors).length > 0) {
        newErrors.shippingAddress = addressErrors;
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
      };

    const handleSubmit = (e : React.FormEvent) => {
      e.preventDefault();
      if (validate() === true) {
         navigate("/koszyk/zamowienie");
      } else {
        toast.error("Popraw błędy w formularzu");
        return;
      }
    }

  return (
    <>
    <form onSubmit={handleSubmit} className="flex items-center flex-col">
        <GuestOrderForm
        guestFirstName={guestFirstName}
        guestLastName={guestLastName}
        guestEmail={guestEmail}
        guestPhone={guestPhone}
        shippingAddress={shippingAddress}
        setGuestInfo={setGuestInfo}
        errors={errors}
        />
        <button type="submit" className="p-10 bg-orange-400 text-white">Przejdź dalej</button>
    </form>

    <section className="container flex items-center">

      <h1>PODSUMOWANIE</h1>

      <div className="">
        <span>Kwota do zapłaty w tym vat</span> <span>{totalPrice} zł</span>
        <button className="p-10 rounded-2xl text-xl text-white">DALEJ</button>
      </div>


    </section>


    </>
  )
}
export default GuestOrderPage;