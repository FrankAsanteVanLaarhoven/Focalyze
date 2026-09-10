
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-adhd-dark mb-6 animate-fade-in">
              Revolutionizing ADHD Management
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in">
              A comprehensive solution for individuals with ADHD across all life stages, 
              with special emphasis on the critical 16-25 age transition period.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <a href="#features">
                <Button className="bg-adhd-primary hover:bg-adhd-secondary w-full sm:w-auto">
                  Explore Features
                </Button>
              </a>
              <a href="#documentation">
                <Button variant="outline" className="border-adhd-primary text-adhd-primary hover:bg-adhd-light w-full sm:w-auto">
                  View Documentation
                </Button>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 animate-fade-in">
            <div className="bg-adhd-light p-4 rounded-2xl shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Focalyze App Interface" 
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
