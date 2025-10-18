import { FaPhone,FaShoppingCart } from 'react-icons/fa';
import UserMenu from './userMenu';
import SearchBar from './searchBar';

const Navbar = () => {
  
  return (
    <header className="bg-[#1a1a1a] text-white py-4 px-6 flex justify-between items-center">
      <h1 className="flex items-center">
        <a href="/" className="flex items-center">
          <span className="font-bold text-2xl text-green-500">Roślinny Dom</span>
        </a>
      </h1>

      <nav className="bg-[#1a1a1a] text-white py-2 px-6">
      <ul className="flex justify-center space-x-8">
        <li>
          <a href="/rosliny-owocowe" className="flex items-center hover:text-green-500">
            <span>Rośliny owocowe</span>
          </a>
        </li>
        <li>
          <a href="/krzewy-iglaste" className="flex items-center hover:text-green-500">
            <span>Drzewa liściaste</span>
          </a>
        </li>
        <li>
          <a href="/krzewy-lisciaste" className="flex items-center hover:text-green-500">
            <span>Krzewy iglaste</span>
          </a>
        </li>
        <li>
          <a href="/promocje" className="hover:text-green-500">
            <span>Krzewy ozdobne</span>
          </a>
        </li>
      </ul>
    </nav>

      <SearchBar/>
     
      <nav aria-label="Nawigacja użytkownika" className="flex items-center space-x-6">
        <div className="flex items-center">
          <FaPhone className="text-green-500 text-lg mr-2" aria-hidden="true" />
          <a href="tel:+48724025050" className="text-sm">+48 123 456 789</a>
        </div>

        <UserMenu/>

        <a href="/koszyk" aria-label="Koszyk" className="hover:text-green-500 transition-colors">
          <FaShoppingCart className="text-lg" aria-hidden="true" />
          <span className="sr-only">Koszyk</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;