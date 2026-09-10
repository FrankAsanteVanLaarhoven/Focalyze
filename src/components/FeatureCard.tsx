
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 animate-fade-in">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-adhd-light text-adhd-primary mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-adhd-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
