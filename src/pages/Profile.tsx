
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bell, FileText, KeyRound, Settings, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-adhd-dark">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account and preferences
            </p>
          </div>
          <Button className="bg-adhd-primary hover:bg-adhd-secondary">
            Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-adhd-light text-adhd-primary flex items-center justify-center mb-4">
                    <User size={32} />
                  </div>
                  <h2 className="text-lg font-bold">{user?.name || 'User Name'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</p>
                  <Button variant="outline" className="mt-4 w-full">
                    Upload Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="mr-2" size={16} />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="mr-2" size={16} />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <KeyRound className="mr-2" size={16} />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user?.name || 'User Name'} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user?.email || 'user@example.com'} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">About</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us a bit about yourself"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>ADHD Information</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="diagnosis">Diagnosis Date</Label>
                          <Input id="diagnosis" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">ADHD Type</Label>
                          <select id="type" className="w-full rounded-md border border-gray-300 p-2">
                            <option>Combined Presentation</option>
                            <option>Predominantly Inattentive</option>
                            <option>Predominantly Hyperactive-Impulsive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile} className="bg-adhd-primary hover:bg-adhd-secondary">
                      Save Profile
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="emailNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="smsNotifications" />
                        <div>
                          <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive text messages for important alerts</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="appNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="appNotifications" className="font-medium">In-App Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications within the application</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="reminderNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="reminderNotifications" className="font-medium">Reminders</Label>
                          <p className="text-sm text-gray-500">Receive reminders for tasks, appointments, and medication</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="sprintNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="sprintNotifications" className="font-medium">Sprint Updates</Label>
                          <p className="text-sm text-gray-500">Receive updates about your active sprints and goals</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="transitionNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="transitionNotifications" className="font-medium">Transition Milestones</Label>
                          <p className="text-sm text-gray-500">Receive notifications about your transition journey</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox id="insightNotifications" defaultChecked />
                        <div>
                          <Label htmlFor="insightNotifications" className="font-medium">AI Insights</Label>
                          <p className="text-sm text-gray-500">Receive notifications about new insights from your data</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSavePreferences} className="bg-adhd-primary hover:bg-adhd-secondary">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button onClick={handleChangePassword} className="bg-adhd-primary hover:bg-adhd-secondary">
                        Change Password
                      </Button>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="twoFactorAuth" />
                        <div>
                          <Label htmlFor="twoFactorAuth" className="font-medium">Enable Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Set Up Two-Factor Authentication
                      </Button>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Data & Privacy</h3>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="dataSharing" defaultChecked />
                        <div>
                          <Label htmlFor="dataSharing" className="font-medium">Data Sharing for Research</Label>
                          <p className="text-sm text-gray-500">Allow anonymized data to be used for ADHD research</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Download My Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
