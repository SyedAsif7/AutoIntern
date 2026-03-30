import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  FileText, 
  User, 
  LogOut,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Courses', path: '/courses', icon: BookOpen },
    { name: 'Find Internships', path: '/internships', icon: Briefcase },
    { name: 'My Applications', path: '/applications', icon: FileText },
    { name: 'AI Prep Tools', path: '/prep', icon: Sparkles },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  if (isAdmin) {
    menuItems.push({ name: 'Admin Dashboard', path: '/admin', icon: ShieldCheck });
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-brand">AutoIntern</h1>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Student Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-brand text-white shadow-md shadow-indigo-100' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold group"
          >
            <div className="w-10 h-10 bg-gray-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center mr-3 transition-colors">
              <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
            </div>
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50 overflow-x-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center ${isActive ? 'text-brand' : 'text-gray-400'}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[10px] mt-1 font-medium">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
        <button onClick={handleLogout} className="flex flex-col items-center text-gray-400 hover:text-red-600 transition-colors">
          <LogOut className="h-6 w-6" />
          <span className="text-[10px] mt-1 font-medium">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
