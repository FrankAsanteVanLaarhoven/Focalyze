import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import CardiacBiofeedback from '@/components/biofeedback/CardiacBiofeedback';

const Biofeedback: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <CardiacBiofeedback />
      </div>
    </MainLayout>
  );
};

export default Biofeedback;
