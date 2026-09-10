
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CtaBanner = () => {
  return (
    <section className="bg-adhd-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Support for Everyone</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Whether you're a mentor supporting clients, a parent with a young child, or navigating trauma — Focalyze has a space for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          {/* Mentor tool — requires login */}
          <Link to="/login">
            <Button className="bg-white text-adhd-primary hover:bg-gray-100 font-semibold px-6 py-3 text-base h-auto">
              🔍 Mentor Screening Tool
            </Button>
          </Link>

          {/* Children's mode — public */}
          <Link to="/children">
            <Button className="bg-yellow-300 text-gray-900 hover:bg-yellow-200 font-semibold px-6 py-3 text-base h-auto">
              👶 Children's Mode
            </Button>
          </Link>

          {/* PTSD support — public */}
          <Link to="/ptsd">
            <Button className="bg-teal-400 text-white hover:bg-teal-300 font-semibold px-6 py-3 text-base h-auto">
              💜 PTSD Grounding Support
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
