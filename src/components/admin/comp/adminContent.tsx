// components/AdminContent.tsx
import React from 'react';
import PlantsSection from '../sections/plantSection';
import OrdersSection from '../sections/orderSection';
import ReviewsSection from '../sections/reviewSection';
import UsersSection from '../sections/usersSection';
import { useAdminAuthStore } from '../../../store/adminAuthState';

interface AdminContentProps {
  activeSection: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeSection }) => {

  const {isAuthenticated} = useAdminAuthStore();

  const renderSection = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersSection />;
      case 'plants':
        return <PlantsSection isAuthenticated={isAuthenticated}/>;
      case 'reviews':
        return <ReviewsSection />;
      case 'users':
        return <UsersSection />;
      default:
        return <OrdersSection />;
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminContent;