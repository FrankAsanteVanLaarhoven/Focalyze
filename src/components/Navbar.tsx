
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import FocalyzeLogo from '@/components/FocalyzeLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features',      href: '#features' },
    { name: 'Research',      href: '#research' },
    { name: 'Technology',    href: '#technology' },
    { name: 'Documentation', href: '#documentation' },
    { name: 'About',         href: '#about' },
  ];

  const featureLinks = [
    { name: "👶 Children's Mode", to: '/children' },
    { name: '💜 PTSD Support',    to: '/ptsd' },
    { name: '🔐 Sign In',         to: '/login' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" aria-label="Focalyze home">
            <FocalyzeLogo size={36} />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-adhd-primary transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}

            {/* Feature shortcuts */}
            <div className="flex items-center gap-2 border-l pl-4 ml-2">
              {featureLinks.map(fl => (
                <Link key={fl.to} to={fl.to}>
                  <Button
                    variant={fl.to === '/login' ? 'default' : 'outline'}
                    size="sm"
                    className={fl.to === '/login' ? 'bg-adhd-primary hover:bg-adhd-secondary' : 'text-xs'}
                  >
                    {fl.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-adhd-primary py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-gray-100" />
              {featureLinks.map(fl => (
                <Link
                  key={fl.to}
                  to={fl.to}
                  className="text-gray-700 hover:text-adhd-primary py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {fl.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
