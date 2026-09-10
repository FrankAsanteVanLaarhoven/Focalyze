
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
          <div className="lg:w-1/2 animate-fade-in w-full">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-adhd-primary">The Focalyze Care Continuum</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-green-50 text-green-700 font-semibold">Continuous Care</span>
              </div>

              {/* Stage 1 */}
              <div className="flex items-start gap-4 p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Pediatric & Childhood Foundations</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Low-sensory routines, gentle emotion check-ins, and parental visibility.</p>
                </div>
              </div>

              {/* Stage 2 - Highlighted */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-adhd-primary text-white shadow-md relative overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">The Bridge Nexus (Ages 16–25)</h4>
                    <span className="text-[10px] bg-white/30 px-2 py-0.2 rounded-full font-semibold">Core Focus</span>
                  </div>
                  <p className="text-xs text-purple-100 mt-1">Preventing the 70% service drop-off as teens transfer into adult healthcare systems.</p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="flex items-start gap-4 p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Adult Executive Flourishing</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Deep work sprints, workplace accommodations, and circadian dopamine schedules.</p>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="flex items-start gap-4 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Clinician & Mentor Portal</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Automated DSM-5 screeners, symptom logs, and early red-flag notifications.</p>
                </div>
              </div>
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
