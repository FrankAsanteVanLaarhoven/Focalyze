
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardList, BookOpen, BarChart2, Info } from 'lucide-react';
import ScreeningWizard from '@/components/mentor/ScreeningWizard';
import ObservationLog from '@/components/mentor/ObservationLog';
import ResultsDashboard from '@/components/mentor/ResultsDashboard';

const MentorPortal: React.FC = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link to="/dashboard" className="hover:text-adhd-primary transition-colors">Dashboard</Link>
          <span>›</span>
          <span>Mentor Portal</span>
        </div>
        <h1 className="text-3xl font-bold text-adhd-dark">Mentor Portal</h1>
        <p className="text-gray-600 mt-1">Screening tools, observation logs, and outcome tracking for clinicians, teachers, and support workers.</p>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <Info className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-sm text-amber-800">
            <strong>Clinical disclaimer:</strong> All screening tools on this portal are for <em>informational and discussion purposes only</em>. They do not constitute a diagnosis and should always be reviewed with a qualified clinician, psychologist, or psychiatrist. Results should never replace a formal clinical assessment.
          </p>
        </div>
      </div>

      <Tabs defaultValue="screening">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="screening" className="flex items-center gap-2">
            <ClipboardList size={15} /> Screening
          </TabsTrigger>
          <TabsTrigger value="observations" className="flex items-center gap-2">
            <BookOpen size={15} /> Observations
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart2 size={15} /> Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screening">
          <Card>
            <CardHeader>
              <CardTitle>Run a Screening</CardTitle>
              <CardDescription>Select a tool, enter a client identifier, and work through the questions. Results are saved automatically.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScreeningWizard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observations">
          <Card>
            <CardHeader>
              <CardTitle>Observation Log</CardTitle>
              <CardDescription>Record behavioural observations with structured tags. Use initials or codes — avoid full names.</CardDescription>
            </CardHeader>
            <CardContent>
              <ObservationLog />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Screening Results</CardTitle>
              <CardDescription>Review all past screening results. High-indicator results are flagged for referral consideration.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResultsDashboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </MainLayout>
);

export default MentorPortal;
