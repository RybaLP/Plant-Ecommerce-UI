import { FaPhone, FaShoppingCart, FaBars, FaTimes, FaUser, FaShoppingBag, FaStar, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthenticationStore } from '../../../store/authenticationStore';

const MobileNavbar = () => {

  const { isAuthenticated, logout } = useAuthenticationStore();   
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { href: "/rosliny/owocowe", label: "Rośliny owocowe" },
    { href: "/rosliny/lisciaste", label: "Drzewa liściaste" },
    { href: "/rosliny/iglaste", label: "Krzewy iglaste" },
    { href: "/rosliny/ozdobne", label: "Krzewy ozdobne" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLogout = () => {
    logout();
    toast.success("Pomyślnie wylogowano");
    navigate("/");
    closeMenu();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      <div className="flex justify-between items-center py-3 px-4">
        <a href="/" className="flex items-center">
          <div className="bg-white/10 p-2 rounded-xl mr-3">
            <span className="text-xl">🌿</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Roślinny Dom
          </span>
        </a>

        <button
          onClick={toggleMenu}
          className="bg-white/10 p-3 rounded-xl hover:bg-white/15 transition-all duration-200"
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <FaTimes className="text-lg text-white" />
          ) : (
            <FaBars className="text-lg text-white" />
          )}
        </button>
      </div>

      <div className={`
        fixed inset-0 bg-gradient-to-b from-emerald-700 to-teal-600 z-50 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <span className="font-bold text-xl text-white">Menu</span>
          <button
            onClick={closeMenu}
            className="bg-white/10 p-2 rounded-lg hover:bg-white/15 transition-all"
          >
            <FaTimes className="text-white text-lg" />
          </button>
        </div>

        <div className="p-6 space-y-6 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="bg-white/10 rounded-xl p-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <span className="text-white font-semibold">Twoje konto</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation("/uzytkownik/zamowienia")}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-all text-white text-left"
                  >
                    <FaShoppingBag className="text-emerald-200" />
                    <span>Zamówienia</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("/uzytkownik/opinie")}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-all text-white text-left"
                  >
                    <FaStar className="text-emerald-200" />
                    <span>Opinie</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("/uzytkownik/adres")}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/10 transition-all text-white text-left"
                  >
                    <FaMapMarkerAlt className="text-emerald-200" />
                    <span>Adres wysyłkowy</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/20 transition-all text-red-200 text-left mt-2"
                  >
                    <FaSignOutAlt className="text-red-300" />
                    <span>Wyloguj</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full bg-white/20 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-white/25 transition-all"
                >
                  Zaloguj się
                </button>
              </div>
            )}
          </div>

          <nav>
            <h3 className="text-white font-semibold mb-3 text-lg">Kategorie</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center p-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-white font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-white/10 rounded-xl p-4">
            <a 
              href="tel:+48123456789" 
              className="flex items-center gap-3 text-white hover:text-emerald-100 transition-colors"
              onClick={closeMenu}
            >
              <FaPhone className="text-emerald-200" />
              <span className="font-medium">+48 123 456 789</span>
            </a>
          </div>

          <a 
            href="/koszyk"
            onClick={closeMenu}
            className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <FaShoppingCart className="text-emerald-200" />
            <span className="text-white font-medium">Koszyk</span>
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default MobileNavbar;