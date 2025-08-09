import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Menu as MenuIcon, 
  BarChart3, 
  Settings, 
  LogOut,
  ChefHat
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Pesanan', icon: ShoppingBag },
  { id: 'menu', label: 'Menu', icon: MenuIcon },
  { id: 'reports', label: 'Laporan', icon: BarChart3 },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isCollapsed }) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">RestoKu</h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 group">
          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          {!isCollapsed && (
            <span className="ml-3 font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;