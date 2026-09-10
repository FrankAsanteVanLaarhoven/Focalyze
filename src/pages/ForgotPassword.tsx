import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: `Instructions have been sent to ${email}`,
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-gray-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-adhd-primary">
              {isSubmitted ? "Check your inbox" : "Reset your password"}
            </CardTitle>
            <CardDescription>
              {isSubmitted
                ? `We've emailed a password reset link to ${email}`
                : "Enter the email associated with your account and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4 text-center py-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or request another link.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-adhd-primary text-adhd-primary hover:bg-adhd-light"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-adhd-primary hover:bg-adhd-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending link..." : "Send reset link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-adhd-primary hover:underline"
            >
              <ArrowLeft size={16} className="mr-1.5" /> Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
