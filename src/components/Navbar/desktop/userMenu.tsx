import { FaUser, FaShoppingBag, FaStar, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuthenticationStore } from '../../../store/authenticationStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';

const UserMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthenticationStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logout();
    toast.success("Pomyślnie wylogowano");
    navigate("/");
    setIsOpen(false);
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl hover:bg-white/15 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-sm" />
        </div>
        <svg 
          className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">Witaj z powrotem! 👋</p>
              </div>

              <div className="py-2">
                <button 
                  onClick={() => handleNavigation("/uzytkownik/zamowienia")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all duration-150 text-left"
                >
                  <FaShoppingBag className="text-emerald-600" />
                  <span>Moje zamówienia</span>
                </button>

                <button 
                  onClick={() => handleNavigation("/uzytkownik/opinie")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all duration-150 text-left"
                >
                  <FaStar className="text-emerald-600" />
                  <span>Moje opinie</span>
                </button>

                <button 
                  onClick={() => handleNavigation("/uzytkownik/adres")}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all duration-150 text-left"
                >
                  <FaMapMarkerAlt className="text-emerald-600" />
                  <span>Adres wysyłkowy</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-2">
                <button 
                  onClick={handleLogOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-150 text-left"
                >
                  <FaSignOutAlt />
                  <span>Wyloguj się</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-3">Zaloguj się na swoje konto</p>
              <button 
                onClick={() => handleNavigation("/login")}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium"
              >
                Zaloguj się
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;