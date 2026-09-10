
import DocumentationCard from './DocumentationCard';
import { BookOpen } from 'lucide-react';

const Documentation = () => {
  const documents = [
    {
      icon: BookOpen,
      title: "User Guide",
      description: "Detailed guide for end-users explaining how to use all features of the application.",
      url: "#"
    }
  ];

  return (
    <section id="documentation" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>Documentation</h2>
          <p>Comprehensive resources for understanding the Focalyze platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {documents.map((doc, index) => (
            <DocumentationCard 
              key={index}
              icon={doc.icon}
              title={doc.title}
              description={doc.description}
              url={doc.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
