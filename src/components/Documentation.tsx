import React from 'react';
import DocumentationCard from './DocumentationCard';
import { BookOpen, FileText, Code2, ShieldCheck } from 'lucide-react';

const Documentation = () => {
  const documents = [
    {
      icon: BookOpen,
      title: "Focalyze Transition Bridge Guide",
      description: "Step-by-step documentation explaining adolescent-to-adult care handover, self-advocacy, and clinical tracking.",
      url: "/transition"
    },
    {
      icon: ShieldCheck,
      title: "NICE NG87 Clinical Guidance",
      description: "Official National Institute for Health and Care Excellence clinical guidelines for ADHD diagnosis, medication, and care transitions.",
      url: "https://www.nice.org.uk/guidance/ng87"
    },
    {
      icon: Code2,
      title: "Open Source Architecture & Specs",
      description: "Technical architecture, component library, Redux store persistence, and security audit on GitHub.",
      url: "https://github.com/FrankAsanteVanLaarhoven/Focalyze"
    }
  ];

  return (
    <section id="documentation" className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="section-header text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-adhd-dark mb-3">Documentation & Resources</h2>
          <p className="text-gray-600">Comprehensive evidence-based resources and guidelines for patients, parents, and clinicians</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
