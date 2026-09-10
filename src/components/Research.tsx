
import ResearchItem from './ResearchItem';

const Research = () => {
  const researchPartners = [
    {
      name: "King's College London",
      initials: "KCL",
      category: "Remote Monitoring",
      accentColor: "bg-indigo-600",
      description: "Neurodevelopmental Disorders Lab and RADAR-base platform for continuous passive sensor monitoring technology."
    },
    {
      name: "University of Huddersfield",
      initials: "HUD",
      category: "Diagnostic AI",
      accentColor: "bg-purple-600",
      description: "Machine learning algorithms and diagnostic classifiers tailored for executive dysfunction profiling."
    },
    {
      name: "R2D2-MH Consortium",
      initials: "R2D2",
      category: "Resilience Science",
      accentColor: "bg-emerald-600",
      description: "EU Horizon resilience-focused frameworks for navigating neurodevelopmental health and transition."
    },
    {
      name: "Trinity College Dublin",
      initials: "TCD",
      category: "Clinical Pathways",
      accentColor: "bg-blue-600",
      description: "Digital treatment protocols and ADMiRE early-detection red-flag and escalation architecture."
    },
    {
      name: "Andrew Huberman Lab",
      initials: "HUB",
      category: "Neurobiology",
      accentColor: "bg-amber-600",
      description: "Science-based protocols for dopamine scheduling, circadian alignment, and focus state optimization."
    },
    {
      name: "Dr. Edward Hallowell",
      initials: "HAL",
      category: "Strength-Based",
      accentColor: "bg-rose-600",
      description: "Pioneering Strengths-based approach (Sheng methodology) reframing ADHD as a trait to harness."
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
              name={partner.name}
              initials={partner.initials}
              category={partner.category}
              accentColor={partner.accentColor}
              description={partner.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
