
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white via-adhd-light/30 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-adhd-primary/10 text-adhd-primary text-xs font-semibold mb-6 animate-fade-in">
              <Sparkles size={14} />
              <span>Evidence-Based Neurodivergent Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-adhd-dark tracking-tight leading-tight mb-6 animate-fade-in">
              Revolutionizing ADHD <span className="text-adhd-primary">Transitions</span> & Focus
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in">
              Empowering neurodivergent individuals across all life stages — with specialized clinical protocols,
              continuous passive monitoring, and a dedicated bridge for the critical 16–25 transition into adult care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/login">
                <Button className="bg-adhd-primary hover:bg-adhd-secondary text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-adhd-primary/20 w-full sm:w-auto flex items-center justify-center gap-2 group">
                  Launch Interactive Demo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-6 rounded-xl w-full sm:w-auto font-medium">
                  Explore Features
                </Button>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-green-600" /> NHS / DSM-5 Aligned
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-amber-500" /> Evidence-Based Sprints
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-adhd-primary" /> Low-Sensory UI
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full animate-fade-in">
            {/* Live Interactive Product Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-adhd-primary/5 to-teal-500/10 p-2 sm:p-4 shadow-2xl border border-purple-100">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Window Topbar */}
                <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold text-gray-500 ml-2">Focalyze Dashboard</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live Pulse Active
                  </div>
                </div>

                {/* Window Body Mockup */}
                <div className="p-5 space-y-4">
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100">
                      <div className="flex items-center justify-between text-xs text-purple-700 font-medium">
                        Focus Score
                        <TrendingUp size={13} className="text-green-600" />
                      </div>
                      <div className="text-xl font-bold text-gray-800 mt-1">8.5<span className="text-xs text-gray-500 font-normal">/10</span></div>
                      <div className="text-[10px] text-green-600 font-semibold">+12% this week</div>
                    </div>
                    <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
                        Current Sprint
                        <Clock size={13} />
                      </div>
                      <div className="text-sm font-bold text-gray-800 mt-1 truncate">Dopamine Morning</div>
                      <div className="text-[10px] text-amber-700 font-semibold">Day 5 of 14</div>
                    </div>
                    <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 col-span-2 sm:col-span-1">
                      <div className="text-xs text-teal-800 font-medium">Transition Bridge</div>
                      <div className="text-xl font-bold text-gray-800 mt-1">65%</div>
                      <div className="text-[10px] text-teal-700 font-semibold">Stage 3/5: Active</div>
                    </div>
                  </div>

                  {/* Active Task Checklist */}
                  <div className="bg-gray-50/70 p-3.5 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2.5">
                      <span>Today's Neuro-Protocols</span>
                      <span className="text-adhd-primary text-[11px]">3 of 4 done</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                        <span className="line-through text-gray-400">10m morning sunlight exposure</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                        <span className="line-through text-gray-400">Protein-first breakfast & medication log</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                        <span className="line-through text-gray-400">25m deep work sprint #1</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-800 font-medium bg-white p-2 rounded border border-adhd-primary/20 shadow-xs">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-adhd-primary shrink-0" />
                        <span>Transition documentation check with care mentor</span>
                        <span className="ml-auto text-[10px] bg-adhd-primary text-white px-2 py-0.5 rounded-full font-semibold">Next</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
