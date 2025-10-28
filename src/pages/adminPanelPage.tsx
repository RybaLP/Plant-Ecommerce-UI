import { useState } from "react";
import { useAdminAuthStore } from "../store/adminAuthState";
import NotAllowed from "../components/notAllowed";
import AdminContent from "../components/admin/adminContent";
import AdminSidebar from "../components/admin/adminSidebar";

const AdminPanelPage = () => {
  const { isAuthenticated } = useAdminAuthStore();
  const [activeSection, setActiveSection] = useState('orders');

  if (!isAuthenticated) {
    return <NotAllowed />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <AdminContent activeSection={activeSection} />
    </div>
  );
};

export default AdminPanelPage;