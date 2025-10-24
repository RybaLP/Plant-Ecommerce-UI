import { useAuthenticationStore } from "../store/authenticationStore";
import NotFoundPage from "./notFoundPage";
import UpdateAddressForm from "../components/updateAddressForm";
import type { Address } from "../interfaces/address";
import { useState } from "react";
import { useClientContactInfo } from "../hooks/useClientContactInfo";
import { useUpdateClientAddress } from "../hooks/useUpdateClientAddress";
import toast from "react-hot-toast";

const AddressPage = () => {
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const { clientContactInfo } = useClientContactInfo();
  const { isAuthenticated } = useAuthenticationStore();
  const { mutateAsync } = useUpdateClientAddress();

  const finalShippingAddress = clientContactInfo?.address;

  const handleSubmitUpdatedAddress = async (updatedAddress: Address) => {
    try {
      await mutateAsync(updatedAddress);
      setIsAddressFormOpen(false);
    } catch (error) {
      toast.error("Nie udało się zaktualizować adresu.");
    }
  };

  if (!isAuthenticated) return <NotFoundPage />;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
        Twoje dane do wysyłki
      </h1>

      {clientContactInfo ? (
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-600">Miasto:</span>
            <span>{clientContactInfo.address.city}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-600">Kod pocztowy:</span>
            <span>{clientContactInfo.address.postalCode}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-600">Ulica:</span>
            <span>{clientContactInfo.address.street}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">
          Nie znaleziono danych adresowych.
        </p>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => setIsAddressFormOpen(true)}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-sm hover:bg-emerald-700 transition-all duration-200 hover:cursor-pointer"
        >
          Edytuj adres
        </button>
      </div>

      {isAddressFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-lg p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsAddressFormOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              title="Zamknij"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-emerald-700 mb-4 text-center">
              Zaktualizuj adres
            </h2>
            <UpdateAddressForm
              setIsAddressFormOpen={setIsAddressFormOpen}
              finalShippingAddress={finalShippingAddress}
              handleSubmitUpdatedAddress={handleSubmitUpdatedAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;
