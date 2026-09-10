import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import BrainExplorer3D from '@/components/neuro3d/BrainExplorer3D';

const Neuro3D: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <BrainExplorer3D />
      </div>
    </MainLayout>
  );
};

export default Neuro3D;
