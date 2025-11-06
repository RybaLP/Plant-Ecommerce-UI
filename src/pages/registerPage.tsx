import React, { useState } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import type { RegistrationForm } from '../interfaces/registrationForm';
import { registerUser } from '../api/register';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../store/authenticationStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAuthenticationStore(state => state.setAuthenticated);

  const [formData, setFormData] = useState<RegistrationForm>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Polska'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Usuń wszystko oprócz cyfr
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2, 5);
    }
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        postalCode: value
      }
    }));
  };

  const validate = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "Imię jest wymagane.";
    if (!formData.lastName) newErrors.lastName = "Nazwisko jest wymagane.";
    if (!formData.username) newErrors.username = "Nazwa użytkownika jest wymagana";

    if (!formData.email) {
      newErrors.email = "E-mail jest wymagany.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adres e-mail jest nieprawidłowy.";
    }

    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane.";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
      newErrors.password =
        "Hasło musi zawierać min. 8 znaków, w tym małą literę, dużą literę i cyfrę.";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Numer telefonu jest wymagany.";
    } else if (!/^(\+?\d{9,15})$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Numer telefonu jest nieprawidłowy.";
    }

    if (!formData.shippingAddress.postalCode) {
      newErrors.postalCode = "Kod pocztowy jest wymagany.";
    } else if (!/^\d{2}-\d{3}$/.test(formData.shippingAddress.postalCode)) {
      newErrors.postalCode = "Niepoprawny format (np. 00-000)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { return; }

    try {
      const success = await registerUser(formData);
      if (success) {
        setAuthenticated();
        navigate("/");
      }
    } catch (error) {
      alert("Wystąpił błąd");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 md:px-8 font-sans">
      <div className="container mx-auto max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
        
        <div className="md:w-1/2 p-8 flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            NIE MASZ JESZCZE KONTA?
          </h2>
          <p className="text-gray-600 text-center mb-8">ZAREJESTRUJ SIĘ!</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwa użytkownika *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Wprowadź nazwę użytkownika"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imię *
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Wprowadź imię"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwisko *
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Wprowadź nazwisko"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="twoj@email.pl"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasło *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Wprowadź hasło"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Hasło musi zawierać min. 8 znaków, w tym małą literę, dużą literę i cyfrę.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numer telefonu *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+48 123 456 789"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ulica i numer
              </label>
              <input
                type="text"
                value={formData.shippingAddress.street}
                onChange={handleAddressChange}
                name='street'
                placeholder='ul. Przykładowa 123'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kod pocztowy *
                </label>
                <input
                  type="text"
                  name='postalCode'
                  value={formData.shippingAddress.postalCode}
                  onChange={handlePostalCodeChange}
                  maxLength={6}
                  placeholder='00-000'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center font-mono'
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Miasto *
                </label>
                <input
                  type="text"
                  name='city'
                  value={formData.shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder='Warszawa'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kraj
              </label>
              <input
                type="text"
                name='country'
                value={formData.shippingAddress.country}
                onChange={handleAddressChange}
                placeholder='Polska'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50'
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-6"
            >
              ZAREJESTRUJ SIĘ
            </button>
          </form>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            ZAREJESTRUJ SIĘ I ZYSKAJ SZYBKI DOSTĘP DO:
          </h2>
          <ul className="space-y-6 text-gray-700">
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-4 flex-shrink-0" />
              <span className="text-lg">Szybkie i wygodne zakupy</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-4 flex-shrink-0" />
              <span className="text-lg">Możliwość śledzenia statusu swojego zamówienia</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-4 flex-shrink-0" />
              <span className="text-lg">Dostęp do historii zakupów i listy życzeń</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-4 flex-shrink-0" />
              <span className="text-lg">Personalne promocje i zniżki</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-4 flex-shrink-0" />
              <span className="text-lg">Szybkie powtarzanie zamówień</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;