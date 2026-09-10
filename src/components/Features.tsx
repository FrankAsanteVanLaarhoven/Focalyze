import React from 'react';
import FeatureCard from './FeatureCard';
import { BarChart2, Stethoscope, Brain, PackageOpen, Heart, Sparkles, Video, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Features = () => {
  const coreFeatures = [
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
    <section id="features" className="bg-gray-50/70 py-20">
      <div className="container mx-auto px-4">
        
        {/* Flagship SOTA Innovations Spotlight */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-3 uppercase tracking-wide">
              <Sparkles size={14} className="text-indigo-600 animate-pulse" /> SOTA World-Leading Innovations
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pioneering Neurotech & Clinical Continuity
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Clinically backed features developed to transform neurodivergent healthcare through biofeedback, 3D neuroimaging, and instant teletherapy access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SOTA Card 1: 1:1 Expert Teletherapy */}
            <div className="bg-gradient-to-b from-white to-emerald-50/30 p-6 rounded-2xl border border-emerald-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video size={24} />
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px] mb-2 font-semibold">
                  1-to-1 Clinical Teletherapy
                </Badge>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  GMC & HCPC Specialist Concierge
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  Direct one-to-one therapy and shared care handover with certified adult ADHD psychiatrists and neuropsychologists. Instant scheduling and encrypted video rooms.
                </p>
              </div>
              <Link to="/expert">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                  Access 1:1 Specialists →
                </Button>
              </Link>
            </div>

            {/* SOTA Card 2: Cardiac Resonance Biofeedback */}
            <div className="bg-gradient-to-b from-white to-rose-50/30 p-6 rounded-2xl border border-rose-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart size={24} fill="currentColor" />
                </div>
                <Badge className="bg-rose-600 text-white text-[10px] mb-2 font-semibold">
                  Real Heartbeat Audio & ECG
                </Badge>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Cardiac Resonance Biofeedback
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  Experience authentic dual-valve cardiac acoustic audio, live oscilloscope wave rendering, and 0.1 Hz vagal tone coherence pacing grounded in the Neurovisceral Integration Model.
                </p>
              </div>
              <Link to="/biofeedback">
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">
                  Launch Biofeedback Stream →
                </Button>
              </Link>
            </div>

            {/* SOTA Card 3: 3D Neurodynamic Brain Explorer */}
            <div className="bg-gradient-to-b from-white to-indigo-50/30 p-6 rounded-2xl border border-indigo-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <Badge className="bg-indigo-600 text-white text-[10px] mb-2 font-semibold">
                  WebGL 3D Synaptic Cloud
                </Badge>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Interactive 3D Brain Explorer
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  Interactive 3D fronto-striatal neural mesh. Inspect DLPFC, Striatum, and Amygdala circuits with real-time dopamine transporter reuptake simulation.
                </p>
              </div>
              <Link to="/neuro-3d">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
                  Explore 3D Brain Mesh →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Platform Modules */}
        <div className="pt-10 border-t border-slate-200">
          <div className="section-header text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Foundational Clinical Modules</h2>
            <p className="text-slate-600 text-sm">Four integrated clinical pillars ensuring continuity from CAMHS through adulthood</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
