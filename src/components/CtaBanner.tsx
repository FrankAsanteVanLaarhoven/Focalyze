
import { Button } from "@/components/ui/button";

const CtaBanner = () => {
  return (
    <section className="bg-adhd-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Addressing the Critical Transition Gap</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          The transition from pediatric to adult healthcare services (ages 16-25) is poorly managed, 
          leading to treatment discontinuation and negative outcomes. Our application bridges this gap.
        </p>
        <a href="#technology">
          <Button className="bg-white text-adhd-primary hover:bg-gray-100">
            Learn How
          </Button>
        </a>
      </div>
    </section>
  );
};

export default CtaBanner;
