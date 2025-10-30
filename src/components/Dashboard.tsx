import { useState } from 'react';
import { AdminDashboard } from './admin/AdminDashboard';
import { DriverDashboard } from './driver/DriverDashboard';
import { ParentDashboard } from './parent/ParentDashboard';
import { Sidebar } from './Sidebar';
import { AutoNotification } from './shared/AutoNotification';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

export function Dashboard({ user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'driver':
        return <DriverDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'parent':
        return <ParentDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <AdminDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Auto notification system */}
      <AutoNotification role={user.role} userId={user.id} />
      
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {renderDashboard()}
      </div>
    </div>
  );
}
