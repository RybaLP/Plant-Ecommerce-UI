import { FaUser } from 'react-icons/fa';
import { useAuthenticationStore } from '../../store/authenticationStore';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const isAuthenticated = useAuthenticationStore(state => state.isAuthenticated);
  const logout = useAuthenticationStore(state => state.logout);
  const navigate = useNavigate();


  const handleLogOut = () => {
    logout();
    navigate("/");
  }


  return (

    <div className="relative group inline-block">
      <FaUser className="text-lg cursor-pointer" />

      <div
        className="absolute right-0 top-full w-48 bg-[#333] text-white rounded shadow-lg py-2 z-50
                   opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                   transform transition-all duration-200 ease-out
                   pointer-events-none group-hover:pointer-events-auto"
      >
        {isAuthenticated ? (

          
          <ul>
            <li className="px-4 py-2 hover:bg-[#444] cursor-pointer">Zamówienia</li>
            <li className="px-4 py-2 hover:bg-[#444] cursor-pointer">Opinie</li>
            <li className="px-4 py-2 hover:bg-[#444] cursor-pointer">Adres wysyłkowy</li>
            <li className="px-4 py-2 hover:bg-[#444] cursor-pointer" onClick={handleLogOut}>Wyloguj</li>
          </ul>
        ) : (
          <button className="w-full text-left px-4 py-2 hover:bg-[#444] hover:cursor-pointer" onClick={()=>navigate("/login")}>
            Zaloguj się
          </button>
        )}
      </div>
    </div>
  );
};

export default UserMenu;