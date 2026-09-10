
interface ResearchItemProps {
  logoSrc: string;
  name: string;
  description: string;
}

const ResearchItem = ({ logoSrc, name, description }: ResearchItemProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 animate-fade-in">
      <div className="h-16 mb-4 flex items-center justify-center">
        <img 
          src={logoSrc} 
          alt={`${name} logo`} 
          className="h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-adhd-dark">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ResearchItem;
