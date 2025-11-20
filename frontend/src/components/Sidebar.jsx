import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  Settings,
  Home
} from 'lucide-react';

const Sidebar = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pos', label: 'POS', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'hrm', label: 'HRM', icon: Users },
    { id: 'cms', label: 'CMS', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sidebar-primary">Restaurant POS</h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Back Office System</p>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                      : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
