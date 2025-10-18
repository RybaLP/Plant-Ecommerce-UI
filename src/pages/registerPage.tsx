import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import type { RegistrationForm } from '../interfaces/registrationForm';
import { registerUser } from '../api/register';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../store/authenticationStore';

const RegisterPage = () => {

  const navigate = useNavigate();

  const setAuthenticated = useAuthenticationStore(state => state.setAuthenticated);

  const [formData, setFormData] = useState <RegistrationForm>({
    username : '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    shippingAddress : {
      street : '',
      city : '',
      postalCode : '',
      country : ''
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



  const validate = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "Imię jest wymagane.";
    if (!formData.lastName) newErrors.lastName = "Nazwisko jest wymagane.";
    if (!formData.username) newErrors.username = "Nazwa uzytkownika jest wymagana";

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if(!validate()) {return;}

    try {
      const success = await registerUser(formData);

      console.log("ssucces");
      console.log(success);

      if(success) {
          setAuthenticated();
          navigate("/");
      }
    } catch (error) {
      alert("Wystąpił błąd");
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 font-sans">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Lewa kolumna - Rejestracja */}
        <div className="md:w-1/2 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            NIE MASZ JESZCZE KONTA? <br /> ZAREJESTRUJ SIĘ!
          </h2>
          <form onSubmit={handleSubmit} className="w-full">

            {/* Username */}
            <div className='mb-4'>
              <input type="text" 
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Login'
              className='w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600'
              />
            </div>

            {/* Imię */}
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Imię *"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Nazwisko */}
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                placeholder="Nazwisko *"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Hasło */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Hasło *"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-400 py-2 pr-24 focus:outline-none focus:border-green-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "UKRYJ" : "POKAŻ"} HASŁO
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Hasło musi zawierać min. 8 znaków, w tym małą literę, dużą literę i cyfrę.
              </p>
            </div>

            {/* Telefon */}
            <div className="mb-4">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Nr telefonu *"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

              {/* Ulica */}
            <div className='mb-4'>
              <input type="text"
              value={formData.shippingAddress.street}
              onChange={handleAddressChange}
              name='street' 
              placeholder='Ulica'
              className='w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600'
              />
            </div>

            {/* Miasto */}

            <div className='mb-4'>
              <input type="text"
              name='city' 
              value={formData.shippingAddress.city}
              onChange={handleAddressChange}
              placeholder='Miasto'
              className='w-full border-b border-gray-400 focus:outline-none focus:border-green-600'/>
            </div>

            {/* Kod pocztowy */}

            <div className='mb-4'>
              <input type="text"
              name='postalCode' 
              value={formData.shippingAddress.postalCode}
              onChange={handleAddressChange}
              placeholder='Kod pocztowy'
              className='w-full border-b border-gray-400 focus:outline-none focus:border-green-600'/>
            </div>


            {/* Kraj */}
              <div className='mb-4'>
                <input type="text" 
                name='country'
                value={formData.shippingAddress.country}
                onChange={handleAddressChange}
                placeholder='Kraj'
                className='w-full border-b border-gray-400 focus:outline-none focus:border-green-600'/>
              </div>


            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition-colors mt-6"
            >
              ZAREJESTRUJ SIĘ
            </button>
          </form>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center md:text-left">
            ZAREJESTRUJ SIĘ I ZYSKAJ SZYBKI DOSTĘP DO:
          </h2>
          <ul className="text-left space-y-4 text-gray-700 mx-auto">
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-2" aria-hidden="true" />
              <span>Szybkie i wygodne zakupy</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-2" aria-hidden="true" />
              <span>Możliwość śledzenia statusu swojego zamówienia</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mt-1 mr-2" aria-hidden="true" />
              <span>Dostęp do historii zakupów i listy życzeń</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;