import FeatureCard from './FeatureCard';
import { BarChart2, Stethoscope, Brain, PackageOpen } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart2,
      title: 'AI-Powered Remote Monitoring',
      description: "Track focus, activity, sleep, and screen time patterns with advanced AI analysis based on King's College London's RADAR-base platform."
    },
    {
      icon: Stethoscope,
      title: 'Clinical Decision Support',
      description: "Access structured assessment tools and clinical pathways incorporating University of Huddersfield's AI diagnostic algorithms and Trinity College Dublin's ADMiRE red-flag system."
    },
    {
      icon: Brain,
      title: 'Self-Management Module',
      description: "Leverage your ADHD-related strengths and implement science-based protocols based on Andrew Huberman's research and Dr. Hallowell's strengths-based approach."
    },
    {
      icon: PackageOpen,
      title: 'Transition Bridge System',
      description: "Navigate the transition from pediatric to adult ADHD care with stage-appropriate milestones and resources utilizing R2D2-MH Consortium's resilience models."
    }
  ];

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>Core Features</h2>
          <p>Our application integrates four powerful modules to provide comprehensive ADHD support</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
