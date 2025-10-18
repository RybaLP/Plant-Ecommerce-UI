import { useState } from 'react';

const NewSeller = () => {

    const [email, setEmail] = useState('');

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Zapisano na newsletter: ${email}`);
    alert(`Dziękujemy za zapisanie się! Sprawdź skrzynkę pocztową.`);
  };


  return (
    <section 
      className="relative bg-cover bg-center text-white py-16 px-4 md:px-8 lg:px-16"
      style={{ backgroundImage: "url('/newsellersection.jpg')" }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto text-center z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Zapisz się do Newslettera <br /> i odbierz rabat -5% na <br /> pierwsze zamówienie
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center w-full max-w-2xl mx-auto mb-4">
          <label htmlFor="email" className="sr-only">Wpisz adres e-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Wpisz adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-2/3 px-6 py-4 bg-white rounded-full sm:rounded-r-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 sm:mb-0"
          />
          <button 
            type="submit" 
            className="w-full sm:w-1/3 bg-orange-500 text-white font-bold py-4 px-6 rounded-full sm:rounded-l-none hover:bg-orange-600 transition-colors"
          >
            Zapisz się
          </button>
        </form>
        <p className="text-xs text-gray-300">
          Akceptuję <a href="/polityka-prywatnosci" className="underline hover:text-white">Politykę Prywatności</a>
        </p>
      </div>

    </section>
  )
}

export default NewSeller