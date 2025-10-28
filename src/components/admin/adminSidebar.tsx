import React from 'react';
import { useAdminAuthStore } from '../../store/adminAuthState';
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
  const {logout} = useAdminAuthStore();

  const handleLogout = () => {
     logout();
     navigate("/super/secret/admin/login");
  }

  return (
    <div className="w-64 bg-green-600 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-8 text-center">Panel Admina</h2>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
              activeSection === item.id 
                ? 'bg-green-700 text-white shadow-md' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}

        <button className='bg-red-600 text-white p-5 rounded-full text-2xl hover:cursor-pointer' onClick={handleLogout}>
            Wyloguj się
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;