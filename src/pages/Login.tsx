
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useRedux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      dispatch({
        type: 'auth/loginSuccess',
        payload: { id: '1', email: email || 'user@focalyze.app', name: email ? email.split('@')[0] : 'User' }
      });
      toast({ title: "Welcome back!", description: "Signed in to Focalyze" });
      navigate('/dashboard');
    } catch (error) {
      toast({ variant: "destructive", title: "Login failed", description: "Please try again" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = () => {
    dispatch({
      type: 'auth/loginSuccess',
      payload: { id: 'demo', email: 'demo@focalyze.app', name: 'Demo User' }
    });
    toast({ title: "Demo Mode 🚀", description: "Exploring Focalyze — no account needed" });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-adhd-primary">Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your Focalyze dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-adhd-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-adhd-primary hover:bg-adhd-secondary" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">or</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full border-adhd-primary text-adhd-primary hover:bg-adhd-primary hover:text-white transition-colors"
              onClick={handleDemo}
            >
              🚀 Try Demo — No Account Needed
            </Button>
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-adhd-primary hover:underline font-medium">
                Sign up free
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
