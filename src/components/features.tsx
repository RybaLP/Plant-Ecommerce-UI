import { FaShieldAlt, FaStar, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="bg-green-100 py-12 px-4 md:px-8">
      <h2 className="sr-only">Dlaczego warto nam zaufać?</h2>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">

        <div className="flex flex-col items-center text-center p-4 transition-transform duration-300 transform hover:scale-105">
          <FaShieldAlt size={60} className="text-green-600 mb-2" />
          <p className="font-semibold text-gray-700 select-none">Bezpieczne zakupy</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 transition-transform duration-300 transform hover:scale-105">
          <FaStar size={60} className="text-green-600 mb-2" />
          <p className="font-semibold text-gray-700 select-none">Najwyższa jakość produktów</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 transition-transform duration-300 transform hover:scale-105">
          <FaShippingFast size={60} className="text-green-600 mb-2" />
          <p className="font-semibold text-gray-700 select-none">Szybka i bezpieczna dostawa</p>
        </div>

        <div className="flex flex-col items-center text-center p-4 transition-transform duration-300 transform hover:scale-105">
          <FaCheckCircle size={60} className="text-green-600 mb-2" />
          <p className="font-semibold text-gray-700 select-none">Gwarancja produktu</p>
        </div>
      </div>
    </section>
  );
};

export default Features;