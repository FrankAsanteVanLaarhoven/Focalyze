
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import FocalyzeLogo from '@/components/FocalyzeLogo';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/store/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar on internal app pages (MainLayout handles those)
  const isAppPage = ['/dashboard','/monitoring','/clinical','/self-management','/transition','/profile','/mentor'].some(
    p => location.pathname.startsWith(p)
  );
  if (isAppPage) return null;

  const publicNavLinks = [
    { name: 'Features',      href: '/#features' },
    { name: 'Research',      href: '/#research' },
    { name: 'Technology',    href: '/#technology' },
    { name: 'About',         href: '/#about' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" aria-label="Focalyze home">
            <FocalyzeLogo size={36} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {publicNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-adhd-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center gap-2 border-l pl-4 ml-1">
              <Link to="/children">
                <Button variant="outline" size="sm" className="text-xs">👶 Children's Mode</Button>
              </Link>
              <Link to="/ptsd">
                <Button variant="outline" size="sm" className="text-xs">💜 PTSD Support</Button>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button size="sm" className="bg-adhd-primary hover:bg-adhd-secondary text-white gap-1">
                      <LayoutDashboard size={14} /> Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 gap-1">
                    <LogOut size={14} /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="sm" className="bg-adhd-primary hover:bg-adhd-secondary text-white">🔐 Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
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
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {publicNavLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-700 hover:text-adhd-primary py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <hr className="border-gray-100" />
              <Link to="/children" className="text-gray-700 hover:text-adhd-primary py-2" onClick={() => setIsMenuOpen(false)}>👶 Children's Mode</Link>
              <Link to="/ptsd" className="text-gray-700 hover:text-adhd-primary py-2" onClick={() => setIsMenuOpen(false)}>💜 PTSD Support</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-adhd-primary font-semibold py-2" onClick={() => setIsMenuOpen(false)}>📊 Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-gray-500 py-2">Sign Out</button>
                </>
              ) : (
                <Link to="/login" className="text-adhd-primary font-semibold py-2" onClick={() => setIsMenuOpen(false)}>🔐 Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
