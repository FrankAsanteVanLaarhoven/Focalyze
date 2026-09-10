
import React from 'react';
import { Smartphone, Cloud, Shield, Stethoscope, Bot, Cpu, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Technology = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section id="technology" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-adhd-primary mb-3">Technical Innovation</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Leveraging cutting-edge technology for superior ADHD support</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Bot className="mr-3" size={28} /> Advanced AI Integration
              </h3>
              <p className="text-gray-700 mb-4">OpenRouter LLM API powers personalized guidance, explanations, and a conversational ADHD coach, providing tailored support based on individual needs and preferences.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">NLP</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Machine Learning</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Personalization</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/self-management')}
              >
                Try AI Assistant
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Stethoscope className="mr-3" size={28} /> FHIR-Compliant Healthcare Integration
              </h3>
              <p className="text-gray-700 mb-4">AWS HealthLake enables secure, standardized healthcare data exchange, ensuring interoperability with existing healthcare systems and EHRs for seamless clinical integration.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">HL7 FHIR</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">AWS HealthLake</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">EHR Integration</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/monitoring')}
              >
                Explore Health Data
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Smartphone className="mr-3" size={28} /> Cross-Platform Accessibility
              </h3>
              <p className="text-gray-700 mb-4">React Native and Capacitor implementations ensure availability across all devices, providing a consistent experience regardless of whether users access via web, iOS, or Android.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">React Native</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Capacitor</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">PWA</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/dashboard')}
              >
                View on All Devices
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Cpu className="mr-3" size={28} /> Scalable Cloud Architecture
              </h3>
              <p className="text-gray-700 mb-4">Microservices architecture with containerization and Kubernetes orchestration ensures high availability, scalability, and resilience, even as user numbers grow.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Microservices</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Kubernetes</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Docker</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/dashboard')}
              >
                Experience Performance
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Lock className="mr-3" size={28} /> Security and Compliance
              </h3>
              <p className="text-gray-700 mb-4">End-to-end encryption with HIPAA and GDPR compliance built-in, ensuring that patient data is protected and regulatory requirements are met at every level of the application.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">HIPAA</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">GDPR</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">E2E Encryption</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/clinical')}
              >
                View Security Features
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
              <h3 className="flex items-center text-xl font-bold mb-4 text-adhd-primary">
                <Database className="mr-3" size={28} /> Real-time Data Processing
              </h3>
              <p className="text-gray-700 mb-4">Stream processing infrastructure handles continuous data inflow from wearable devices and user interactions, enabling real-time insights and adaptive interventions.</p>
              <div className="flex gap-2 text-sm text-gray-500 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Stream Processing</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Real-time Analytics</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">IoT Integration</span>
              </div>
              <Button 
                variant="outline" 
                className="text-adhd-primary border-adhd-primary hover:bg-adhd-primary/10"
                onClick={() => handleNavigate('/monitoring')}
              >
                Monitor Real-time Data
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            variant="default" 
            className="bg-adhd-primary hover:bg-adhd-primary/90 text-white px-6 py-3 rounded-lg text-lg font-medium"
            onClick={() => handleNavigate('/dashboard')}
          >
            Try All Technologies Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Technology;
