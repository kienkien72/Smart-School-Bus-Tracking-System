import { Button } from './ui/button';
import { 
  Bus, 
  Users, 
  Route as RouteIcon, 
  Calendar, 
  MapPin, 
  Bell, 
  LogOut,
  UserCog,
  LayoutDashboard,
  Clock
} from 'lucide-react';
import { cn } from './ui/utils';

export function Sidebar({ user, onLogout, isOpen, onClose, activeTab, setActiveTab }) {

  const adminMenuItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'students', label: 'Quản lý học sinh', icon: Users },
    { id: 'buses', label: 'Quản lý xe buýt', icon: Bus },
    { id: 'drivers', label: 'Quản lý tài xế', icon: UserCog },
    { id: 'routes', label: 'Quản lý tuyến đường', icon: RouteIcon },
    { id: 'schedules', label: 'Quản lý lịch trình', icon: Calendar },
    { id: 'tracking', label: 'Theo dõi xe', icon: MapPin },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
  ];

  const driverMenuItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'schedule', label: 'Lịch trình', icon: Calendar },
    { id: 'tracking', label: 'Cập nhật vị trí', icon: MapPin },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
  ];

  const parentMenuItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'tracking', label: 'Theo dõi xe', icon: MapPin },
    { id: 'schedule', label: 'Lịch trình', icon: Clock },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
  ];

  const getMenuItems = () => {
    switch (user.role) {
      case 'admin':
        return adminMenuItems;
      case 'driver':
        return driverMenuItems;
      case 'parent':
        return parentMenuItems;
      default:
        return adminMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm text-gray-600">SSB 1.0</h2>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {user.role === 'admin' ? 'Quản lý xe buýt' : 
                 user.role === 'driver' ? 'Tài xế' : 'Phụ huynh'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info & Logout */}
          <div className="p-4 border-t">
            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-500 mb-1">Đăng nhập với</p>
              <p className="text-sm text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">{user.email || user.phone}</p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
