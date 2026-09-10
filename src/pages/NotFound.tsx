import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import FocalyzeLogo from "@/components/FocalyzeLogo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-2">
          <FocalyzeLogo size={36} />
        </div>
        <div>
          <h1 className="text-6xl font-black text-adhd-primary mb-2">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-sm text-gray-500">
            The page <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">{location.pathname}</code> does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Go Back
          </Button>
          <Link to="/">
            <Button className="w-full sm:w-auto bg-adhd-primary hover:bg-adhd-secondary flex items-center justify-center gap-2">
              <Home size={16} /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
