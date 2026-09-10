
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/store/slices/authSlice';
import FocalyzeLogo from '@/components/FocalyzeLogo';
import {
  LayoutDashboard, TrendingUp, Users, CheckCircle, Repeat2,
  Brain, HeartPulse, Baby, LogOut, User, ChevronRight, Home,
  Heart, Sparkles, Video
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard',          to: '/dashboard',        icon: LayoutDashboard },
  { label: 'AI Monitoring',      to: '/monitoring',       icon: TrendingUp },
  { label: 'Clinical Support',   to: '/clinical',         icon: Users },
  { label: 'Self-Management',    to: '/self-management',  icon: CheckCircle },
  { label: 'Transition Bridge',  to: '/transition',       icon: Repeat2 },
];

const specialisedNav: NavItem[] = [
  { label: '1:1 Teletherapy',    to: '/expert',       icon: Video,      badge: '1:1' },
  { label: 'Heart Biofeedback',  to: '/biofeedback',  icon: Heart,      badge: 'Live' },
  { label: '3D Brain Explorer',  to: '/neuro-3d',     icon: Sparkles,   badge: '3D' },
  { label: 'Mentor Portal',      to: '/mentor',       icon: Brain,      badge: 'Pro' },
  { label: 'PTSD Support',       to: '/ptsd',         icon: HeartPulse },
  { label: "Children's Mode",    to: '/children',     icon: Baby },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + '/');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.to);
    return (
      <Link
        to={item.to}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
          active
            ? 'bg-adhd-primary text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-adhd-primary'
        }`}
      >
        <item.icon size={18} className={active ? 'text-white' : 'text-gray-400 group-hover:text-adhd-primary'} />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${active ? 'bg-white/20 text-white' : 'bg-adhd-primary/10 text-adhd-primary'}`}>
            {item.badge}
          </span>
        )}
        {active && <ChevronRight size={14} className="text-white/70" />}
      </Link>
    );
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <Link to="/" className="inline-flex">
          <FocalyzeLogo size={34} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</p>
        {mainNav.map(item => <NavLink key={item.to} item={item} />)}

        <div className="pt-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Specialised</p>
          {specialisedNav.map(item => <NavLink key={item.to} item={item} />)}
        </div>

        <div className="pt-4 border-t border-gray-100 mt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-adhd-primary transition-all"
          >
            <Home size={18} className="text-gray-400" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3 space-y-1">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-adhd-primary transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-adhd-primary flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || <User size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || 'My Account'}</p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email || ''}</p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <LogOut size={18} className="text-gray-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
