
import { CheckCircle } from 'lucide-react';

const About = () => {
  const approaches = [
    { text: "Evidence-based: Grounded in rigorous scientific research" },
    { text: "Strengths-focused: Leveraging ADHD-related strengths rather than just managing deficits" },
    { text: "Personalized: Adapting to each individual's unique profile and needs" },
    { text: "Comprehensive: Addressing all aspects of ADHD management" },
    { text: "Accessible: Available across all devices and platforms" }
  ];

  return (
    <section id="about" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <h2>About the Project</h2>
          <p>Our mission and vision for revolutionizing ADHD care</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Focalyze Team" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-adhd-dark mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize ADHD care by providing a comprehensive, evidence-based digital solution 
                that supports individuals across all life stages, with special emphasis on the critical 
                16-25 age transition period.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-adhd-dark mb-3">Our Vision</h3>
              <p className="text-gray-600">
                A world where every individual with ADHD has access to personalized, effective support 
                that empowers them to leverage their unique strengths and navigate life transitions successfully.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-adhd-dark mb-3">Our Approach</h3>
              <p className="text-gray-600 mb-4">
                We combine cutting-edge research from leading institutions with innovative technology to create 
                a solution that addresses the unique challenges faced by people with ADHD. Our approach is:
              </p>
              <ul className="space-y-3">
                {approaches.map((approach, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-adhd-primary mr-2 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600">{approach.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
