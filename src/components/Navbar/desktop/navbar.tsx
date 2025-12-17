import { FaPhone, FaShoppingCart } from 'react-icons/fa';
import UserMenu from './userMenu';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <header className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Link to={"/"} className='flex items-center group'>
          <div className="bg-white/10 p-2 rounded-xl mr-3 group-hover:bg-white/20 transition-all duration-300">
            <span className="text-2xl">🌿</span>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Roślinny Dom
          </span>
        </Link>
      </div>

      <nav className="hidden lg:block">
        <ul className="flex space-x-1">
          {[
            { href : "/rosliny/owocowe" , label: "Rośliny owocowe"},
            { href: "/rosliny/lisciaste", label: "Drzewa liściaste" },
            { href: "/rosliny/iglaste", label: "Krzewy iglaste" },
            { href: "/rosliny/ozdobne", label: "Krzewy ozdobne" }
          ].map((item) => (

            <li key={item.href}>

                <Link to={item.href} className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">

                <span className="group-hover:text-emerald-100 transition-colors font-medium">
                  {item.label}
                </span>

                </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 max-w-lg mx-8">
        <SearchBar/>
      </div>
     
      <nav aria-label="Nawigacja użytkownika" className="flex items-center space-x-4">
        
        <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-xl hover:bg-white/15 transition-all duration-200 group">
          <FaPhone className="text-emerald-200 text-lg mr-2 group-hover:text-white transition-colors" aria-hidden="true" />
          <a href="tel:+48123456789" className="text-sm font-medium group-hover:text-white transition-colors">
            +48 123 456 789
          </a>
        </div>

        <div className="bg-white/10 p-2 rounded-xl hover:bg-white/15 transition-all duration-200">
          <UserMenu/>
        </div>

        <Link to={"/koszyk"} aria-label="Koszyk" className="bg-white/10 p-3 rounded-xl hover:bg-white/15 transition-all duration-200 group relative">
          <FaShoppingCart className="text-lg text-emerald-200 group-hover:text-white transition-colors" aria-hidden="true" />
          <span className="sr-only">Koszyk</span>
        </Link>

      </nav>
    </header>
  );
};

export default Navbar;