import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from '../pages/Dashboard';
import { VideoManagement } from '../pages/VideoManagement';
import { DietPlans } from '../pages/DietPlans';
import Consultancy from '../pages/ConsultancyRequests';;

import { VideoUpload } from '../pages/VideoUpload';
import { DietPlanUpload } from '../pages/DietPlanUpload';
import { VideoEdit } from '../pages/VideoEdit';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { Products } from '../pages/Products';
import { ProductUpload } from '../pages/ProductUpload';
import { Orders } from '../pages/Orders';
import { Login } from '../pages/Login';
import { TeamManagement } from '../pages/TeamManagement';
import { Chat } from '../pages/Chat';
import { Users } from '../pages/Users';

export const Layout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
             <Route path="/" element={<Login />} />
            <Route path="/videos" element={<VideoManagement />} />
            <Route path="/videos/upload" element={<VideoUpload />} />
            <Route path="/videos/edit/:id" element={<VideoEdit />} />
            <Route path="/diet-plans" element={<DietPlans />} />
            <Route path="/diet-plans/upload" element={<DietPlanUpload />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<ProductUpload />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/users" element={<Users />} />
<Route path="/chat" element={<Chat />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};