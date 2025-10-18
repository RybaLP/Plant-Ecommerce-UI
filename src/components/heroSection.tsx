import { FaFacebook } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative bg-cover bg-center rounded-lg overflow-hidden h-96" style={{ backgroundImage: "url('/garden.jpg')" }}>
          <div className="absolute inset-0 bg-green-900 bg-opacity-70 p-8 flex flex-col justify-end">
            <h2 className="text-white text-3xl font-bold mb-4">
              Nasze rośliny <br className="hidden md:inline" />w ogrodach <br />i sadach naszych <br />klientów
            </h2>
            <a href="/realizacje" className="inline-block px-8 py-3 bg-white text-green-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Sprawdź
            </a>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden h-96">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/voucher.jpg")' }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-30 p-8 flex flex-col justify-end items-end text-right">

            <a href="https://facebook.com" aria-label="Odwiedź nas na Facebooku" className="absolute top-4 right-4 text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors">
              <FaFacebook size={24} aria-hidden="true" />
            </a>
            
            <h2 className="text-white text-2xl font-bold mt-4">Voucher</h2>
            <img src="https://via.placeholder.com/200x100?text=Logo+Podkarpackie+Sady" alt="Logo Podkarpackie Sady" className="w-1/2 mb-4 mx-auto md:mx-0" />
            <h3 className="text-white text-xl text-right mb-4">Z myślą <br />o Twoim <br />ogrodzie</h3>
            <a href="/vouchery" className="px-8 py-3 bg-white text-green-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Sprawdź
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;