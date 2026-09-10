
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, FileText, Stethoscope, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Clinical = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              Clinical Decision Support
            </h1>
            <p className="text-gray-600 mt-1">
              Evidence-based assessment tools and clinical pathways
            </p>
          </div>
          <Button className="bg-adhd-primary hover:bg-adhd-secondary">
            Connect with Provider
          </Button>
        </div>
        
        <Tabs defaultValue="assessments" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="pathway">Clinical Pathway</TabsTrigger>
            <TabsTrigger value="alerts">Red Flag Alerts</TabsTrigger>
            <TabsTrigger value="team">Care Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assessments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2" size={20} />
                      Recent Assessments
                    </CardTitle>
                    <CardDescription>
                      Standardized assessments to track your ADHD symptoms and treatment efficacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-md bg-gray-50">
                        <div>
                          <h3 className="font-medium">ADHD-RS (ADHD Rating Scale)</h3>
                          <p className="text-sm text-gray-600">Completed on April 2, 2025</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">24/54</div>
                          <div className="text-sm text-green-600">-8 points since last assessment</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md bg-gray-50">
                        <div>
                          <h3 className="font-medium">WFIRS (Functional Impairment Scale)</h3>
                          <p className="text-sm text-gray-600">Completed on March 15, 2025</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">0.8/3.0</div>
                          <div className="text-sm text-amber-600">Mild functional impairment</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-md bg-gray-50">
                        <div>
                          <h3 className="font-medium">PHQ-9 (Depression Screening)</h3>
                          <p className="text-sm text-gray-600">Completed on March 10, 2025</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">6/27</div>
                          <div className="text-sm text-blue-600">Minimal depression symptoms</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-adhd-primary hover:bg-adhd-secondary mr-2">Complete New Assessment</Button>
                    <Button variant="outline">View Assessment History</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Insights</CardTitle>
                    <CardDescription>
                      AI-powered analysis of your assessment data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-green-50">
                        <h3 className="font-medium flex items-center text-green-800">
                          <CheckCircle size={16} className="mr-2" />
                          Positive Treatment Response
                        </h3>
                        <p className="text-sm text-green-700 mt-1">Your ADHD-RS score has improved by 30% over the past 3 months, indicating positive response to your current treatment plan.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-blue-50">
                        <h3 className="font-medium flex items-center text-blue-800">
                          <AlertCircle size={16} className="mr-2" />
                          Attention Detail
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">The inattention subscale (12/27) remains somewhat higher than the hyperactivity/impulsivity subscale (8/27). This pattern is consistent with primarily inattentive presentation.</p>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-amber-50">
                        <h3 className="font-medium flex items-center text-amber-800">
                          <AlertCircle size={16} className="mr-2" />
                          Functional Impact
                        </h3>
                        <p className="text-sm text-amber-700 mt-1">WFIRS scores indicate that ADHD symptoms are having the greatest impact in the "School/Work" domain. Consider discussing targeted accommodations with your provider.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Assessments</CardTitle>
                    <CardDescription>
                      Evidence-based tools to monitor your ADHD and related conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-md bg-adhd-light cursor-pointer hover:bg-adhd-light/80 transition-colors">
                        <h3 className="font-medium">ADHD-RS</h3>
                        <p className="text-sm text-gray-600">Core ADHD symptoms assessment</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Recommended</Badge>
                      </div>
                      
                      <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors">
                        <h3 className="font-medium">ASRS</h3>
                        <p className="text-sm text-gray-600">Adult ADHD Self-Report Scale</p>
                      </div>
                      
                      <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors">
                        <h3 className="font-medium">WFIRS</h3>
                        <p className="text-sm text-gray-600">Functional impairment assessment</p>
                      </div>
                      
                      <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors">
                        <h3 className="font-medium">PHQ-9</h3>
                        <p className="text-sm text-gray-600">Depression screening tool</p>
                      </div>
                      
                      <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors">
                        <h3 className="font-medium">GAD-7</h3>
                        <p className="text-sm text-gray-600">Anxiety screening tool</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border-b">
                        <div>
                          <h3 className="font-medium">ADHD-RS</h3>
                          <p className="text-xs text-gray-500">Monthly</p>
                        </div>
                        <div className="text-sm text-adhd-primary">Due in 24 days</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border-b">
                        <div>
                          <h3 className="font-medium">WFIRS</h3>
                          <p className="text-xs text-gray-500">Quarterly</p>
                        </div>
                        <div className="text-sm text-adhd-primary">Due in 74 days</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3">
                        <div>
                          <h3 className="font-medium">PHQ-9</h3>
                          <p className="text-xs text-gray-500">Quarterly</p>
                        </div>
                        <div className="text-sm text-green-600">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pathway" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="mr-2" size={20} />
                  Clinical Care Pathway
                </CardTitle>
                <CardDescription>
                  Your personalized ADHD management timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Clinical pathway visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2" size={20} />
                  Red Flag System
                </CardTitle>
                <CardDescription>
                  Potential concerns requiring clinical attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Red flag alerts will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2" size={20} />
                  Care Team
                </CardTitle>
                <CardDescription>
                  Your healthcare providers and support network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-gray-500">Care team information will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Clinical;
