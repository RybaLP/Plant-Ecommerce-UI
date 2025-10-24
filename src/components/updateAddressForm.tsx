import { useState } from "react";
import type { SetStateAction } from "react";
import type { Address } from "../interfaces/address";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  handleSubmitUpdatedAddress: (updatedAddress: Address) => void;
  setIsAddressFormOpen: React.Dispatch<SetStateAction<boolean>>;
  finalShippingAddress: Address | undefined;
}

const UpdateAddressForm = ({
  handleSubmitUpdatedAddress,
  setIsAddressFormOpen,
  finalShippingAddress,
}: Props) => {
  const [address, setAddress] = useState<Address>(
    finalShippingAddress ?? { street: "", city: "", postalCode: "", country: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitUpdatedAddress(address);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        
        <span
          onClick={() => setIsAddressFormOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Zaktualizuj adres dostawy
        </h1>

        <p className="text-gray-600 mb-6">
          Wprowadź nowe dane adresowe, aby zmienić miejsce dostawy zamówienia.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Ulica"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Miasto"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            placeholder="Kod pocztowy"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Kraj"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
            readOnly
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors"
          >
            Zapisz zmiany
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressForm;
