import { useGuestFormStore } from "../store/useGuestFormStore"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";
import { FaArrowRight, FaShoppingBag, FaLock, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

interface GuestErrors {
  guestFirstName?: string;
  guestLastName?: string;
  guestEmail?: string;
  guestPhone?: string;
  nip?: string,
  companyName?: string,
  shippingAddress?: {     
    street?: string;
    postalCode?: string;
    city?: string;
  };
}

const GuestOrderPage = () => {
  const { guestEmail, guestFirstName, guestLastName, shippingAddress, guestPhone, setGuestInfo } = useGuestFormStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<GuestErrors>({});
  const { totalPrice } = useCartStore();

  const validate = (): boolean => {
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

    const addressErrors: GuestErrors["shippingAddress"] = {};

    if (!shippingAddress?.street?.trim()) {
      addressErrors.street = "Podaj ulicę";
    }

    if (!shippingAddress?.postalCode?.trim()) {
      addressErrors.postalCode = "Podaj kod pocztowy";
    } else if (!/^\d{2}-\d{3}$/.test(shippingAddress.postalCode)) {
      addressErrors.postalCode = "Niepoprawny format (np. 00-000)";
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

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2, 5);
    }
    setGuestInfo({
      shippingAddress: {
        ...shippingAddress,
        postalCode: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() === true) {
      navigate("/koszyk/zamowienie");
    } else {
      toast.error("Popraw błędy w formularzu");
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zamówienie jako gość</h1>
          <p className="text-gray-600">Wprowadź swoje dane, aby dokończyć zamówienie</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaShoppingBag className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Dane do zamówienia</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    Dane osobowe
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imię *
                      </label>
                      <input
                        type="text"
                        value={guestFirstName}
                        onChange={(e) => setGuestInfo({ guestFirstName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.guestFirstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Wprowadź imię"
                      />
                      {errors.guestFirstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.guestFirstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nazwisko *
                      </label>
                      <input
                        type="text"
                        value={guestLastName}
                        onChange={(e) => setGuestInfo({ guestLastName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.guestLastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Wprowadź nazwisko"
                      />
                      {errors.guestLastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.guestLastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      Adres email *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestInfo({ guestEmail: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.guestEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="twoj@email.pl"
                    />
                    {errors.guestEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.guestEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaPhone className="text-blue-500" />
                      Numer telefonu *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestInfo({ guestPhone: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.guestPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+48 123 456 789"
                    />
                    {errors.guestPhone && (
                      <p className="text-red-500 text-sm mt-1">{errors.guestPhone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    Adres dostawy
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ulica i numer *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress?.street || ''}
                      onChange={(e) => setGuestInfo({
                        shippingAddress: {
                          ...shippingAddress,
                          street: e.target.value
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.shippingAddress?.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ul. Przykładowa 123"
                    />
                    {errors.shippingAddress?.street && (
                      <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.street}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress?.postalCode || ''}
                        onChange={handlePostalCodeChange}
                        maxLength={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center font-mono ${
                          errors.shippingAddress?.postalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="00-000"
                      />
                      {errors.shippingAddress?.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.postalCode}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Miasto *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress?.city || ''}
                        onChange={(e) => setGuestInfo({
                          shippingAddress: {
                            ...shippingAddress,
                            city: e.target.value
                          }
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.shippingAddress?.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Warszawa"
                      />
                      {errors.shippingAddress?.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.city}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <span>Przejdź do podsumowania</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Podsumowanie */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FaLock className="text-emerald-600 text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Podsumowanie</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Kwota do zapłaty:</span>
                  <span className="text-2xl font-bold text-green-600">{totalPrice.toFixed(2)} zł</span>
                </div>
                
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Cena zawiera VAT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Bezpieczna transakcja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Szybka dostawa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestOrderPage;