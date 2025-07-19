"use client";

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import Sidebar from '@/components/dashboard/Sidebar';
import AppHeader from '@/components/layout/AppHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader
          user={user}
          onLogout={logout}
          onProfileClick={() => {
            // Handle profile click if needed
          }}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;