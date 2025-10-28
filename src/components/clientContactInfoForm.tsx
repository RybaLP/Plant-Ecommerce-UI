import { useState, type SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import type { Address } from "../interfaces/address";
import type { ClientContactInfo } from "../interfaces/clientContactInfo";
import { useCreateClientContactInfo } from "../hooks/useCreateClientContactInfo";

interface Props {
  setIscontactInfoOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ClientContactInfoForm = ({ setIscontactInfoOpen }: Props) => {
  const createClientContactInfo = useCreateClientContactInfo();

  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    postalCode: "",
    country: "Polska",
  });

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ClientContactInfo = {
      address,
      phoneNumber,
    };

    createClientContactInfo.mutate(data, {
      onSuccess: () => {
        setIscontactInfoOpen(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">

        <span
          onClick={() => setIscontactInfoOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Zaktualizuj dane kontaktowe
        </h1>

        <p className="text-gray-600 mb-6">
          Wprowadź nowe dane, aby zmienić adres dostawy i numer telefonu.
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
          />

          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Numer telefonu"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors"
            disabled={createClientContactInfo.isPending}
          >
            {createClientContactInfo.isPending
              ? "Zapisywanie..."
              : "Zapisz zmiany"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientContactInfoForm;
