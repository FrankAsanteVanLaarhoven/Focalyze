import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeletherapyPortal from '@/components/expert/TeletherapyPortal';

const AskExpert: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <TeletherapyPortal />
      </div>
    </MainLayout>
  );
};

export default AskExpert;
