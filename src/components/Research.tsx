
import ResearchItem from './ResearchItem';

const Research = () => {
  const researchPartners = [
    {
      logoSrc: "/placeholder.svg",
      name: "King's College London",
      description: "Neurodevelopmental Disorders Lab and RADAR-base platform for remote monitoring technology"
    },
    {
      logoSrc: "/placeholder.svg",
      name: "University of Huddersfield",
      description: "AI diagnostic algorithms for ADHD assessment and monitoring"
    },
    {
      logoSrc: "/placeholder.svg",
      name: "R2D2-MH Consortium",
      description: "Resilience-focused models for mental health transition"
    },
    {
      logoSrc: "/placeholder.svg",
      name: "Trinity College Dublin",
      description: "Digital treatment protocols and ADMiRE's red-flag system"
    },
    {
      logoSrc: "/placeholder.svg",
      name: "Andrew Huberman",
      description: "Neuroscience-based protocols for ADHD management"
    },
    {
      logoSrc: "/placeholder.svg",
      name: "Dr. Hallowell",
      description: "Strengths-based approach to ADHD management (Sheng methodology)"
    }
  ];

  return (
    <section id="research" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>Research Foundation</h2>
          <p>Built on cutting-edge research from world-leading institutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPartners.map((partner, index) => (
            <ResearchItem 
              key={index}
              logoSrc={partner.logoSrc}
              name={partner.name}
              description={partner.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
