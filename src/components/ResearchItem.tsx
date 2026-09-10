
import { GraduationCap, Award, BookOpen, Microscope, Sparkles, Building2 } from 'lucide-react';

interface ResearchItemProps {
  name: string;
  description: string;
  initials?: string;
  category?: string;
  accentColor?: string;
}

const ResearchItem = ({ name, description, initials, category, accentColor = 'bg-adhd-primary' }: ResearchItemProps) => {
  const monogram = initials || name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${accentColor} text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform`}>
            {monogram}
          </div>
          {category && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
              {category}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold mb-2 text-adhd-dark group-hover:text-adhd-primary transition-colors">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs text-adhd-primary font-medium">
        <Sparkles size={12} className="mr-1" /> Verified Evidence Base
      </div>
    </div>
  );
};

export default ResearchItem;

