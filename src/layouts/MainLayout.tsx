
import React, { useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      {/* Content offset by sidebar width (w-60 = 240px) */}
      <div className="flex-1 ml-60 overflow-auto min-h-screen">
        <main className="min-h-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
