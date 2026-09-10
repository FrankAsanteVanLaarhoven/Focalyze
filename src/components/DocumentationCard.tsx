
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DocumentationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  url: string;
}

const DocumentationCard = ({ icon: Icon, title, description, url }: DocumentationCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 animate-fade-in">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-adhd-light text-adhd-primary mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-adhd-dark">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <a href={url}>
        <Button variant="outline" className="w-full border-adhd-primary text-adhd-primary hover:bg-adhd-light">
          View Document
        </Button>
      </a>
    </div>
  );
};

export default DocumentationCard;
