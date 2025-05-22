import React, { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center lg:hidden">
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-sm">
          {/* <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              placeholder="Search..."
            />
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          {/* <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-amber-500 text-xs flex items-center justify-center text-white">
              3
            </span>
          </button> */}

          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img 
                src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                alt={user?.name || 'User'} 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
    </header>
  );
};