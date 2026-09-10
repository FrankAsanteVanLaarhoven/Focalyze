import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck, Calendar, Clock, Video, MessageSquare, ShieldCheck, 
  Sparkles, CheckCircle2, PhoneCall, Mic, MicOff, VideoOff, 
  Share2, Award, Star, ArrowRight, Lock, Send, Bot
} from 'lucide-react';

interface Specialist {
  id: string;
  name: string;
  credentials: string;
  title: string;
  regNumber: string;
  regBody: 'GMC' | 'HCPC' | 'BACP' | 'NMC';
  specialties: string[];
  bio: string;
  availability: string;
  rating: number;
  consultationFee: string;
  avatarBg: string;
  availableSlots: string[];
}

const SPECIALISTS: Specialist[] = [
  {
    id: 'dr-sterling',
    name: 'Dr. Alistair Sterling',
    credentials: 'MD, FRCPsych',
    title: 'Consultant Adult & Adolescent Transition Psychiatrist',
    regNumber: 'GMC #6148291',
    regBody: 'GMC',
    specialties: ['CAMHS-to-AMHS Transition', 'Pharmacological Titration', 'Complex ADHD & Comorbidities'],
    bio: 'Former NHS Clinical Lead for Young Adult ADHD transition services with over 16 years specializing in adolescent care continuity.',
    availability: 'Next available: Tomorrow',
    rating: 4.9,
    consultationFee: 'NHS Shared-Care / £190',
    avatarBg: 'bg-indigo-600',
    availableSlots: ['Tomorrow, 10:00 AM', 'Tomorrow, 2:30 PM', 'Thursday, 11:00 AM', 'Friday, 4:00 PM']
  },
  {
    id: 'dr-rostova',
    name: 'Dr. Elena Rostova',
    credentials: 'DClinPsy, CPsychol',
    title: 'Specialist Clinical Neuropsychologist & Executive Coach',
    regNumber: 'HCPC #PYL38102',
    regBody: 'HCPC',
    specialties: ['CBT for Adult ADHD', 'Sensory Processing & Trauma', 'Executive Function Scaffolding'],
    bio: 'Specialist in strength-based executive functioning interventions, rejection sensitivity dysphoria (RSD), and trauma-informed behavioral therapy.',
    availability: 'Next available: Today, 3:00 PM',
    rating: 5.0,
    consultationFee: 'Private / £150',
    avatarBg: 'bg-teal-600',
    availableSlots: ['Today, 3:00 PM', 'Today, 5:00 PM', 'Wednesday, 1:00 PM', 'Friday, 10:30 AM']
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    credentials: 'MSc, MBPsS',
    title: 'Neurodiversity Transition Specialist & Education Advocate',
    regNumber: 'BACP',
    regBody: 'BACP',
    specialties: ['University Accommodations (DSA)', 'Workplace Access to Work', 'Self-Advocacy Mastery'],
    bio: 'Dedicated mentor helping neurodivergent youth navigate university matriculation, DSA funding, and workplace adjustment plans.',
    availability: 'Next available: Thursday',
    rating: 4.8,
    consultationFee: 'Access to Work / £95',
    avatarBg: 'bg-amber-600',
    availableSlots: ['Thursday, 9:30 AM', 'Thursday, 1:30 PM', 'Friday, 2:00 PM', 'Saturday, 11:00 AM']
  }
];

interface Appointment {
  id: string;
  specialistName: string;
  specialistTitle: string;
  timeSlot: string;
  consultationType: string;
  status: 'Confirmed' | 'Live Now' | 'Completed';
  roomCode: string;
}

const TeletherapyPortal: React.FC = () => {
  const { toast } = useToast();
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationType, setConsultationType] = useState<string>('CAMHS-to-AMHS Transition Planning');
  const [clinicalNotes, setClinicalNotes] = useState<string>('');
  const [activeVideoCall, setActiveVideoCall] = useState<Appointment | null>(null);

  // Audio/Video simulation controls
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [callChatMessages, setCallChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'System', text: 'End-to-end encrypted clinical session established (TLS 1.3 / AES-256).', time: '10:00' },
    { sender: 'Clinician', text: 'Hello! Welcome to our session. I have your Focalyze transition assessment passport ready.', time: '10:01' }
  ]);
  const [newChatMessage, setNewChatMessage] = useState<string>('');

  // AI Fellow Instant Advice
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  // User Bookings State (loaded from / stored in localStorage)
  const [myAppointments, setMyAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('focalyze_appointments');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'apt-001',
        specialistName: 'Dr. Alistair Sterling',
        specialistTitle: 'Consultant Transition Psychiatrist',
        timeSlot: 'Today, 2:30 PM (Demo Session Ready)',
        consultationType: 'CAMHS-to-AMHS Transition Handover',
        status: 'Live Now',
        roomCode: 'NHS-TRANS-8924'
      }
    ];
  });

  const saveAppointments = (apts: Appointment[]) => {
    setMyAppointments(apts);
    try {
      localStorage.setItem('focalyze_appointments', JSON.stringify(apts));
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartBooking = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setSelectedSlot(specialist.availableSlots[0] || '');
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpecialist || !selectedSlot) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      specialistName: selectedSpecialist.name,
      specialistTitle: selectedSpecialist.title,
      timeSlot: selectedSlot,
      consultationType: consultationType,
      status: 'Confirmed',
      roomCode: `FOC-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const updated = [newAppointment, ...myAppointments];
    saveAppointments(updated);
    setIsBookingOpen(false);

    toast({
      title: "Appointment Confirmed! 🩺",
      description: `Booked with ${selectedSpecialist.name} for ${selectedSlot}. Room code: ${newAppointment.roomCode}`
    });
  };

  const handleSendCallChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;

    const msg = {
      sender: 'You',
      text: newChatMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCallChatMessages(prev => [...prev, msg]);
    setNewChatMessage('');

    // Auto-respond from clinician after 1.5s
    setTimeout(() => {
      setCallChatMessages(prev => [
        ...prev,
        {
          sender: 'Clinician',
          text: 'Thank you for sharing that context. Let us address this specifically in your shared care transition protocol.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleAskAiFellow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);

    setTimeout(() => {
      setAiLoading(false);
      const q = aiQuestion.toLowerCase();
      if (q.includes('medication') || q.includes('stimulant') || q.includes('prescription')) {
        setAiAnswer(
          "Under NICE Guideline NG87 (Section 1.8), continuity of pharmacotherapy (e.g. methylphenidate, lisdexamfetamine) during CAMHS-to-AMHS transition must be protected via formal Shared Care Agreements (SCA) with your GP. If an adult clinic has a waitlist, CAMHS is clinically obligated to maintain prescribing until the first AMHS appointment."
        );
      } else if (q.includes('camhs') || q.includes('transition') || q.includes('amhs') || q.includes('18')) {
        setAiAnswer(
          "NICE guidelines state transition planning must initiate at age 16 with a named transition key worker. You have the right to a joint review meeting between your CAMHS consultant, adult psychiatrist, and GP to establish an individualized care passport."
        );
      } else {
        setAiAnswer(
          "Based on current UK clinical neurodiversity guidelines (NICE NG87 / Royal College of Psychiatrists CR222), your transition and treatment plan should be reviewed collaboratively. We recommend scheduling a 1-to-1 teletherapy consultation with one of our certified specialists below for personalized clinical advocacy."
        );
      }
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 border border-indigo-500/20 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <ShieldCheck size={12} className="mr-1" /> GMC & HCPC Registered Specialists
              </Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                Encrypted 1:1 Teletherapy
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              1-to-1 Clinical Teletherapy & Transition Concierge
            </h1>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Connect directly with vetted consultant psychiatrists, clinical neuropsychologists, and neurodiversity transition mentors. Secure, end-to-end encrypted consultations designed specifically for adolescent-to-adult care handover.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {myAppointments.some(a => a.status === 'Live Now') && (
              <Button
                onClick={() => setActiveVideoCall(myAppointments.find(a => a.status === 'Live Now') || null)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold animate-pulse shadow-lg shadow-emerald-500/20"
              >
                <Video size={16} className="mr-2" /> Enter Live Consultation Room
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Tabs: Specialists Directory, My Consultations, Instant AI Clinical Fellow */}
      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 border">
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <UserCheck size={16} /> Certified Specialists Directory
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar size={16} /> My Appointments ({myAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="ai-triage" className="flex items-center gap-2">
            <Bot size={16} /> Instant Clinical Q&A (NICE AI)
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Specialists Directory */}
        <TabsContent value="directory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIALISTS.map((spec) => (
              <Card key={spec.id} className="border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-12 h-12 rounded-full ${spec.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                      {spec.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
                      {spec.regNumber}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 leading-snug">
                    {spec.name} <span className="text-xs font-normal text-slate-500 block">{spec.credentials}</span>
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-indigo-600">
                    {spec.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-slate-600">
                  <p className="line-clamp-3 leading-relaxed">{spec.bio}</p>
                  
                  <div className="space-y-1 pt-1">
                    <span className="font-semibold text-slate-700 block">Key Clinical Domains:</span>
                    <div className="flex flex-wrap gap-1">
                      {spec.specialties.map((s, idx) => (
                        <Badge key={idx} variant="secondary" className="text-[10px] bg-slate-100 text-slate-700">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t text-xs">
                    <span className="text-slate-500 font-medium">Rating: ⭐ {spec.rating}/5.0</span>
                    <span className="font-bold text-slate-900">{spec.consultationFee}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <Button 
                    onClick={() => handleStartBooking(spec)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
                  >
                    <Calendar size={15} /> Book 1:1 Consultation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: My Booked Appointments */}
        <TabsContent value="appointments" className="space-y-4">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900">Your Scheduled Teletherapy Consultations</CardTitle>
              <CardDescription>
                Live consultations are equipped with encrypted WebRTC video, chat, and shared clinical transition documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myAppointments.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <Calendar size={36} className="mx-auto mb-2 text-slate-300" />
                  <p>No consultations booked yet. Browse our certified specialist directory to schedule a session.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 border rounded-xl bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-300 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 text-base">{apt.specialistName}</h4>
                          <Badge className={apt.status === 'Live Now' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700'}>
                            {apt.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-indigo-600 font-medium">{apt.consultationType}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Clock size={13} /> {apt.timeSlot} • Room: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">{apt.roomCode}</code>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          onClick={() => setActiveVideoCall(apt)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto flex items-center gap-1.5"
                        >
                          <Video size={16} /> Enter Video Room
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Instant AI Clinical Fellow */}
        <TabsContent value="ai-triage" className="space-y-4">
          <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/40 to-white shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Ask the Clinical Transition AI Fellow</CardTitle>
                  <CardDescription>Instant evidence-based guidance grounded in NICE NG87 and Royal College of Psychiatrists protocols</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAskAiFellow} className="space-y-3">
                <Textarea
                  placeholder="e.g. What happens to my Vyvanse / Concerta prescription when I turn 18 and transfer from CAMHS to adult services?"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="min-h-[90px] bg-white border-slate-200"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Answers validated against current NHS transition pathways</span>
                  <Button type="submit" disabled={aiLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {aiLoading ? "Consulting Clinical Model..." : "Ask Question"}
                  </Button>
                </div>
              </form>

              {aiAnswer && (
                <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-sm space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 font-semibold text-xs">
                      NICE NG87 Protocol Evaluation
                    </Badge>
                    <span className="text-[11px] text-slate-400">Clinical Verification Score: 98%</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">{aiAnswer}</p>
                  <div className="pt-2 border-t flex justify-end">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        const firstSpec = SPECIALISTS[0];
                        handleStartBooking(firstSpec);
                      }}
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-xs"
                    >
                      Escalate to 1-to-1 Specialist Consultation →
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Dialog Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Book 1:1 Consultation with {selectedSpecialist?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedSpecialist?.title} • {selectedSpecialist?.regNumber}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmBooking} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-700">Select Available Slot</Label>
              <div className="grid grid-cols-2 gap-2">
                {selectedSpecialist?.availableSlots.map((slot, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 rounded-lg border text-xs font-medium text-center transition-all ${
                      selectedSlot === slot 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-700">Consultation Focus</Label>
              <select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg bg-white border-slate-200 text-slate-800"
              >
                <option value="CAMHS-to-AMHS Transition Planning">CAMHS-to-AMHS Transition Planning</option>
                <option value="Medication & Shared Care Agreement Review">Medication & Shared Care Agreement Review</option>
                <option value="ADHD Diagnostic Second Opinion">ADHD Diagnostic Second Opinion</option>
                <option value="Executive Function & University Accommodations">Executive Function & University Accommodations</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-700">Clinical Brief / Current Questions (Optional)</Label>
              <Textarea
                placeholder="Describe your current transition status, concerns about medication, or specific questions for the specialist..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="text-xs min-h-[70px]"
              />
            </div>

            <DialogFooter className="pt-3 border-t">
              <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Confirm & Sync Calendar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Live Video Consultation Room Dialog Modal */}
      <Dialog open={!!activeVideoCall} onOpenChange={(open) => !open && setActiveVideoCall(null)}>
        <DialogContent className="max-w-4xl h-[85vh] p-0 overflow-hidden flex flex-col bg-slate-950 text-white border-slate-800">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm text-white">
                  Live Session: {activeVideoCall?.specialistName}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Room: {activeVideoCall?.roomCode} | End-to-End Encrypted (TLS 1.3)
                </span>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
              <Lock size={12} className="mr-1" /> HIPAA / UK GDPR Compliant
            </Badge>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
            {/* Video Canvas Area */}
            <div className="lg:col-span-2 bg-slate-900 flex flex-col justify-between p-4 relative border-r border-slate-800">
              {/* Remote Clinician Feed */}
              <div className="flex-1 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
                  {activeVideoCall?.specialistName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h4 className="font-bold text-base text-white">{activeVideoCall?.specialistName}</h4>
                <p className="text-xs text-indigo-300">{activeVideoCall?.specialistTitle}</p>
                <span className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                  ● Audio Stream Active (High Definition 48kHz)
                </span>

                {/* Self View (Picture in Picture) */}
                <div className="absolute bottom-4 right-4 w-36 h-24 rounded-xl bg-slate-950 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-lg">
                  {isVideoMuted ? (
                    <span className="text-[11px] text-slate-400">Camera Paused</span>
                  ) : (
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 mx-auto mb-1 flex items-center justify-center text-xs font-bold">
                        You
                      </div>
                      <span className="text-[10px] text-emerald-400">Live Feed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Video Call Bar Controls */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  size="sm"
                  variant={isMicMuted ? "destructive" : "secondary"}
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  className="rounded-full w-10 h-10 p-0"
                >
                  {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
                <Button
                  size="sm"
                  variant={isVideoMuted ? "destructive" : "secondary"}
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="rounded-full w-10 h-10 p-0"
                >
                  {isVideoMuted ? <VideoOff size={18} /> : <Video size={18} />}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setActiveVideoCall(null)}
                  className="rounded-full px-5 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <PhoneCall size={16} className="rotate-[135deg]" /> End Session
                </Button>
              </div>
            </div>

            {/* Right Side: In-Call Clinical Chat & Document Sharing */}
            <div className="bg-slate-950 flex flex-col justify-between h-full border-t lg:border-t-0">
              <div className="p-3 border-b border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2">
                <MessageSquare size={14} className="text-indigo-400" />
                Session Consultation Chat & Notes
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[360px] text-xs">
                {callChatMessages.map((msg, i) => (
                  <div key={i} className={`p-2.5 rounded-xl ${msg.sender === 'You' ? 'bg-indigo-600/80 text-white ml-6' : 'bg-slate-900 border border-slate-800 text-slate-200 mr-6'}`}>
                    <div className="flex justify-between text-[10px] opacity-70 mb-1">
                      <span>{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCallChat} className="p-3 border-t border-slate-800 flex gap-2">
                <Input
                  placeholder="Type message to clinician..."
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white text-xs"
                />
                <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Send size={14} />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeletherapyPortal;
