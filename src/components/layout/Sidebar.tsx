import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sunrise,
  Bell,
  Package,
  ShoppingCart,
  Users,
  MessagesSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside 
      className={`bg-indigo-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } relative`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${collapsed ? 'justify-center w-full' : ''}`}>
          <Sunrise className="text-amber-400" size={24} />
          {!collapsed && <span className="text-xl font-semibold">GSB Pathy</span>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white absolute right-0 top-4 p-2"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-6">
        {/* <NavLinkItem 
          to="/" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          collapsed={collapsed} 
        /> */}
        <NavLinkItem 
          to="/videos" 
          icon={<Video size={20} />} 
          label="Videos" 
          collapsed={collapsed} 
        />
        <NavLinkItem 
          to="/diet-plans" 
          icon={<FileText size={20} />} 
          label="Diet Plans" 
          collapsed={collapsed}
        />
        <NavLinkItem 
          to="/consultancy" 
          icon={<MessageSquare size={20} />} 
          label="Consultancy" 
          collapsed={collapsed}
        />
        <NavLinkItem 
          to="/products" 
          icon={<Package size={20} />} 
          label="Products" 
          collapsed={collapsed}
        />
        <NavLinkItem 
          to="/orders" 
          icon={<ShoppingCart size={20} />} 
          label="Orders" 
          collapsed={collapsed}
        />
        <NavLinkItem 
          to="/notifications" 
          icon={<Bell size={20} />} 
          label="Notifications" 
          collapsed={collapsed}
        />
        {/* <NavLinkItem 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          collapsed={collapsed}
        /> */}
        <NavLinkItem 
  to="/team" 
  icon={<Users size={20} />} 
  label="Team" 
  collapsed={collapsed}
/>
<NavLinkItem 
  to="/chat" 
  icon={<MessagesSquare size={20} />} 
  label="Chat" 
  collapsed={collapsed}
/>
      </nav>
    </aside>
  );
};

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex items-center px-4 py-3 mb-1 transition-colors
        ${isActive 
          ? 'bg-indigo-800 text-amber-400' 
          : 'text-gray-300 hover:bg-indigo-800 hover:text-gray-100'
        }
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <span className="mr-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};