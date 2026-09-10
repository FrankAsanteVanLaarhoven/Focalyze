
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import FocalyzeLogo from '@/components/FocalyzeLogo';
import CrisisBar from '@/components/ptsd/CrisisBar';
import BoxBreathing from '@/components/ptsd/BoxBreathing';
import GroundingExercise from '@/components/ptsd/GroundingExercise';
import TriggerJournal from '@/components/ptsd/TriggerJournal';
import WindowOfTolerance from '@/components/ptsd/WindowOfTolerance';

const PSYCHOEDUCATION = [
  {
    title: 'What is a trauma response?',
    content: 'When we experience something very frightening or overwhelming, our nervous system activates a survival response — fight, flight, or freeze. This is normal and protective. PTSD occurs when this response keeps activating even when the danger is past.',
  },
  {
    title: 'Why does my brain do this?',
    content: 'The amygdala (your brain\'s alarm system) has learned to associate certain triggers with danger. It reacts before the thinking part of your brain can evaluate the situation. This isn\'t a weakness — it\'s how brains are wired to protect us.',
  },
  {
    title: 'What is hypervigilance?',
    content: 'Hypervigilance is a state of heightened alertness where you are constantly scanning for threats. It\'s exhausting, but it developed because your brain was trying to keep you safe. Grounding exercises help regulate this response.',
  },
  {
    title: 'Can PTSD be treated?',
    content: 'Yes. Evidence-based treatments including EMDR, trauma-focused CBT, and somatic therapies are highly effective. Reaching out to a GP or mental health professional is the first step — you don\'t have to manage this alone.',
  },
];

const PTSDSupport: React.FC = () => (
  <div className="min-h-screen bg-teal-50/30 pb-20">
    {/* Top bar */}
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <FocalyzeLogo size={32} />
      <Link to="/" className="text-sm text-adhd-primary hover:underline">← Home</Link>
    </div>

    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-adhd-dark">PTSD Support</h1>
        <p className="text-gray-600 mt-2">A calm space for grounding, reflection, and understanding your nervous system. No login required.</p>
      </div>

      <Tabs defaultValue="breathing">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8 h-auto gap-1">
          <TabsTrigger value="breathing" className="text-xs py-2">Box Breathing</TabsTrigger>
          <TabsTrigger value="grounding" className="text-xs py-2">5-4-3-2-1</TabsTrigger>
          <TabsTrigger value="tolerance" className="text-xs py-2">My Window</TabsTrigger>
          <TabsTrigger value="journal" className="text-xs py-2">My Journal</TabsTrigger>
          <TabsTrigger value="learn" className="text-xs py-2">Learn</TabsTrigger>
        </TabsList>

        <TabsContent value="breathing">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle>Box Breathing</CardTitle>
              <CardDescription>A breathing technique used by first responders to regulate the nervous system. Inhale → Hold → Exhale → Hold, each for 4 seconds.</CardDescription>
            </CardHeader>
            <CardContent>
              <BoxBreathing />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grounding">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle>5-4-3-2-1 Grounding</CardTitle>
              <CardDescription>Use your five senses to anchor yourself in the present moment. Works well during flashbacks, panic, or dissociation.</CardDescription>
            </CardHeader>
            <CardContent>
              <GroundingExercise />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tolerance">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle>My Window of Tolerance</CardTitle>
              <CardDescription>Your "window of tolerance" is the zone where you can function well. Use this gauge to check in with your nervous system and find the right support.</CardDescription>
            </CardHeader>
            <CardContent>
              <WindowOfTolerance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle>Trigger Journal</CardTitle>
              <CardDescription>Track your triggers and coping responses over time. Private and local — never shared or synced.</CardDescription>
            </CardHeader>
            <CardContent>
              <TriggerJournal />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learn">
          <div className="space-y-4">
            {PSYCHOEDUCATION.map((item, i) => (
              <Card key={i} className="border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-teal-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                </CardContent>
              </Card>
            ))}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
              <p className="text-sm text-teal-800 font-medium">Ready to talk to someone?</p>
              <p className="text-sm text-teal-700 mt-1">Your GP can refer you to trauma-focused therapy. You can also self-refer to IAPT/Talking Therapies in England: <a href="https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/" className="underline" target="_blank" rel="noreferrer">nhs.uk/talking-therapies</a></p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <CrisisBar />
  </div>
);

export default PTSDSupport;
