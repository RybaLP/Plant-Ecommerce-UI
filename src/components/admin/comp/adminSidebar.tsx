import React from 'react';
import { useAdminAuthStore } from '../../../store/adminAuthState';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'orders', label: 'Zamówienia', icon: '📦' },
    { id: 'plants', label: 'Rośliny', icon: '🌱' },
    { id: 'reviews', label: 'Recenzje', icon: '⭐' },
    { id: 'users', label: 'Użytkownicy', icon: '👥' },
  ];

  const navigate = useNavigate();
  const { logout } = useAdminAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/super/secret/admin/login");
  }

  return (
    <div className="w-80 bg-gradient-to-b from-green-700 to-green-800 text-white h-screen flex flex-col shadow-xl sticky top-0">
      {/* Nagłówek */}
      <div className="p-6 border-b border-green-600">
        <h2 className="text-2xl font-bold text-white mb-2">Panel Admina</h2>
        <p className="text-green-100 text-sm">
          {new Date().toLocaleDateString('pl-PL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Nawigacja */}
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-4 group ${
              activeSection === item.id 
                ? 'bg-white text-green-700 shadow-lg transform scale-[1.02]' 
                : 'bg-green-600 hover:bg-green-500 hover:shadow-md text-white'
            }`}
          >
            <span className="text-xl transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="font-semibold text-lg">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stopka z przyciskiem wylogowania */}
      <div className="p-6 border-t border-green-600">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <span>🚪</span>
          <span>Wyloguj się</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;