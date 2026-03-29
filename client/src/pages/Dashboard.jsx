import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  BookOpen, 
  Flame, 
  Bookmark, 
  UserCheck, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Briefcase,
  FileText,
  Target,
  Trophy,
  Award,
  Download,
  GraduationCap,
  ShieldCheck,
  BarChart3,
  X,
  BrainCircuit,
  TrendingUp,
  Zap,
  Terminal,
  Send,
  Sparkles,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  
  // Persistence logic for Hackathon Demo
  const getSavedName = () => {
    const isSyedAsif = currentUser?.email === 'syedgaffarsyedrajjak1@gmail.com';
    const storageKey = isSyedAsif ? 'profileData' : `profileData_${currentUser?.uid}`;
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed.name;
    }
    return currentUser?.displayName || (isSyedAsif ? 'Syed Asif' : 'New User');
  };

  const [userName, setUserName] = useState(getSavedName());
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [referralText, setReferralText] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Check if welcome card should be shown
  const isSyedAsif = currentUser?.email === 'syedgaffarsyedrajjak1@gmail.com';
  
  useEffect(() => {
    if (currentUser && !isSyedAsif) {
      const enrollmentKey = `enrollments_${currentUser.uid}`;
      const savedEnrollments = JSON.parse(localStorage.getItem(enrollmentKey) || '[]');
      setEnrolledCourses(savedEnrollments);
    }
  }, [currentUser, isSyedAsif]);
  const welcomeKey = isSyedAsif ? 'dismissedWelcome' : `dismissedWelcome_${currentUser?.uid}`;
  const profileKey = isSyedAsif ? 'profileData' : `profileData_${currentUser?.uid}`;
  
  const [showWelcome, setShowWelcome] = useState(() => {
    if (isSyedAsif) return false;
    const isDismissed = localStorage.getItem(welcomeKey) === 'true';
    const hasProfile = localStorage.getItem(profileKey);
    // Hide if dismissed OR if they have already filled profile data (beyond the default "New User" state)
    if (isDismissed) return false;
    if (hasProfile) {
      const data = JSON.parse(hasProfile);
      // If they have more than just a name/email, they've likely completed onboarding
      return !data.college || data.college === 'Not Specified';
    }
    return true;
  });

  const dismissWelcome = () => {
    localStorage.setItem(welcomeKey, 'true');
    setShowWelcome(false);
  };

  // Update name if currentUser or localStorage changes
  useEffect(() => {
    if (currentUser) {
      setUserName(getSavedName());
    }
    
    const handleStorageChange = () => {
      setUserName(getSavedName());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentUser]);

  // Gamification State
  const [xp, setXp] = useState(isSyedAsif ? 2450 : 0);
  const [level, setLevel] = useState(isSyedAsif ? 12 : 1);
  const xpToNextLevel = isSyedAsif ? 3000 : 500;
  const xpPercentage = (xp / xpToNextLevel) * 100;

  // Update stats based on user
   const stats = [
     { label: 'Courses Enrolled', value: isSyedAsif ? '3' : enrolledCourses.length.toString(), icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/courses' },
     { label: 'Current Streak', value: isSyedAsif ? '5 Days' : '0 Days', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50', path: '/dashboard' },
     { label: 'Interview Score', value: isSyedAsif ? '8.5/10' : 'N/A', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', path: '/prep' },
     { label: 'Profile Completion', value: isSyedAsif ? '85%' : '20%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/profile' },
   ];

   const studyNotes = [
     {
       title: 'Getting Started',
       content: 'Welcome to AutoIntern! Complete your profile and browse courses to start your journey.',
       icon: Target,
       color: 'text-indigo-600',
       bg: 'bg-indigo-50'
     },
     {
       title: 'Profile Completion',
       content: 'A complete profile increases your chances of getting matched with the right internships by 80%.',
       icon: ShieldCheck,
       color: 'text-emerald-600',
       bg: 'bg-emerald-50'
     },
     {
       title: 'Skill Assessment',
       content: 'Take our skill assessment tests to verify your knowledge and earn badges.',
       icon: Clock,
       color: 'text-amber-600',
       bg: 'bg-amber-50'
     }
   ];
   
   const skillData = {
     labels: ['React', 'Node.js', 'MongoDB', 'UI/UX', 'System Design', 'Soft Skills'],
     datasets: [
       {
         label: 'Current Level',
         data: isSyedAsif ? [85, 40, 65, 90, 30, 75] : [0, 0, 0, 0, 0, 0],
         backgroundColor: 'rgba(79, 70, 229, 0.2)',
         borderColor: 'rgba(79, 70, 229, 1)',
         borderWidth: 2,
         pointBackgroundColor: 'rgba(79, 70, 229, 1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgba(79, 70, 229, 1)',
       },
       {
         label: 'Target for Internships',
         data: [90, 70, 70, 80, 60, 85],
         backgroundColor: 'rgba(16, 185, 129, 0.1)',
         borderColor: 'rgba(16, 185, 129, 0.5)',
         borderWidth: 2,
         borderDash: [5, 5],
         pointBackgroundColor: 'rgba(16, 185, 129, 0.5)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgba(16, 185, 129, 0.5)',
       },
     ],
   };

   const chartOptions = {
     scales: {
       r: {
         angleLines: {
           display: true
         },
         suggestedMin: 0,
         suggestedMax: 100,
         ticks: {
           stepSize: 20,
           display: false
         }
       }
     },
     plugins: {
       legend: {
         position: 'bottom',
         labels: {
           usePointStyle: true,
           padding: 20,
           font: {
             size: 12,
             weight: 'bold'
           }
         }
       }
     },
     maintainAspectRatio: false
   };

  const matchedInternships = isSyedAsif ? [
      { 
        title: 'Frontend Developer Intern', 
        company: 'TechFlow Solutions', 
        location: 'Remote', 
        match: '98%', 
        stipend: '₹15,000/mo',
        domain: 'Web Dev'
      },
      { 
        title: 'React.js Intern', 
        company: 'DataScale AI', 
        location: 'Hybrid', 
        match: '92%', 
        stipend: '₹12,000/mo',
        domain: 'Web Dev'
      },
      { 
        title: 'UI/UX Design Intern', 
        company: 'CreativeDots', 
        location: 'Onsite', 
        match: '85%', 
        stipend: '₹10,000/mo',
        domain: 'UI/UX'
      },
    ] : [
      { 
        title: 'Web Dev Intern (Frontend)', 
        company: 'StartupX', 
        location: 'Remote', 
        match: '65%', 
        stipend: '₹8,000/mo',
        domain: 'Web Dev'
      }
    ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-gray-50">
      <Sidebar />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto"
      >
        {/* Header */}
        <div className="mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-dark to-indigo-700 p-8 md:p-10 shadow-2xl shadow-indigo-200">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Good morning, {userName}! 👋
              </h1>
              <p className="text-indigo-100 font-medium text-lg flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-sm font-black border border-white/10 shadow-lg">
                  <Flame className="h-5 w-5 fill-orange-500 text-orange-500 animate-pulse" /> {isSyedAsif ? 'Day 5' : 'Day 0'} Streak
                </span>
                <span className="text-indigo-100/90 font-bold">{isSyedAsif ? 'Keep the momentum going!' : 'Start your first streak today!'}</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Hackathon Win: Gamification Level Bar */}
              <div className="w-full md:w-80 bg-white/10 backdrop-blur-md p-5 rounded-[2rem] border border-white/20 shadow-2xl">
              <div className="flex justify-between items-end mb-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Current Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white">Lvl {level}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1 block">XP Points</span>
                  <span className="text-lg font-black text-white">{xp} / {xpToNextLevel}</span>
                </div>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full shadow-lg relative transition-all duration-1000 ease-out"
                  style={{ width: `${xpPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <p className="text-[10px] text-indigo-100 font-bold mt-2 text-center uppercase tracking-[0.15em]">
                {xpToNextLevel - xp} XP until next reward
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 -mt-6 relative z-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link key={index} to={stat.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm text-gray-500 font-semibold mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Course Completion / Career Achievement */}
            {isSyedAsif && (
              <section id="course-completion">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" /> Course Completed
                  </h2>
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm">
                    Graduated
                  </span>
                </div>
                <div className="bg-gradient-to-br from-white via-emerald-50/20 to-white p-8 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-100/30 hover:shadow-2xl hover:shadow-emerald-200/40 transition-all duration-500 flex flex-col md:flex-row items-center gap-6 group">
                  <div className="w-full md:w-40 h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Trophy className="h-16 w-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Professional Path</span>
                      <span className="text-xs text-gray-400 font-medium">Completed on March 25, 2026</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Full Stack Web Development</h3>
                    <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed">
                      Mastered modern web architecture, frontend frameworks, and scalable backend systems.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">
                            {['R', 'N', 'M', 'P'][i-1]}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-500">+12 Skills Verified</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => setShowPortfolio(true)}
                      className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                    >
                      View Portfolio
                    </button>
                  </div>
                </div>
              </section>
            )}

            <AnimatePresence>
              {showWelcome && (
                <motion.section 
                  id="welcome-new-user"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-gradient-to-br from-brand/10 via-white to-brand/5 p-8 rounded-3xl border border-brand/20 shadow-xl shadow-brand/5 transition-all duration-500 relative group/welcome">
                    <button 
                      onClick={dismissWelcome}
                      className="absolute top-4 right-4 p-2 bg-white/50 text-gray-400 hover:text-gray-600 rounded-xl opacity-0 group-hover/welcome:opacity-100 transition-all"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-24 h-24 bg-brand rounded-2xl flex items-center justify-center shadow-lg">
                        <Sparkles className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome to Your Career Journey!</h2>
                        <p className="text-lg text-gray-600 font-medium mb-6">
                          You're just a few steps away from landing your dream internship. Start by completing your profile or browsing our courses.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <Link 
                            to="/profile" 
                            onClick={dismissWelcome}
                            className="px-8 py-3 bg-brand text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all"
                          >
                            Complete Profile
                          </Link>
                          <Link 
                            to="/courses" 
                            onClick={dismissWelcome}
                            className="px-8 py-3 bg-white border-2 border-brand/20 text-brand font-black rounded-xl hover:bg-brand/5 transition-all"
                          >
                            Browse Courses
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Continue Learning - Ongoing Courses */}
            {isSyedAsif ? (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-brand" /> Continue Learning
                  </h2>
                  <Link to="/courses">
                    <button className="group px-5 py-2.5 bg-white border-2 border-indigo-100 text-brand text-sm font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2">
                      All Courses <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Ongoing Course 1 */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-3 transition-transform">
                        <Target className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 leading-tight">Advanced System Design</h3>
                        <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">Backend Architecture</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-black text-gray-600 mb-2">
                        <span>Course Progress</span>
                        <span className="text-brand">75%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-[75%] rounded-full transition-all duration-500" />
                      </div>
                    </div>
                    <Link to="/learning/advanced-system-design">
                      <button className="w-full py-3 bg-gray-50 text-gray-700 text-xs font-black rounded-xl hover:bg-brand hover:text-white transition-all duration-300">
                        Resume Module
                      </button>
                    </Link>
                  </div>

                  {/* Ongoing Course 2 */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-3 transition-transform">
                        <ShieldCheck className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 leading-tight">AI & LLM Integration</h3>
                        <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">Modern AI Engineering</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-black text-gray-600 mb-2">
                        <span>Course Progress</span>
                        <span className="text-pink-600">30%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-full w-[30%] rounded-full transition-all duration-500" />
                      </div>
                    </div>
                    <Link to="/learning/ai-integration">
                      <button className="w-full py-3 bg-gray-50 text-gray-700 text-xs font-black rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300">
                        Resume Module
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            ) : enrolledCourses.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-brand" /> My Courses
                  </h2>
                  <Link to="/courses">
                    <button className="group px-5 py-2.5 bg-white border-2 border-indigo-100 text-brand text-sm font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2">
                      Browse More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {enrolledCourses.map((enrollment, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-3 transition-transform overflow-hidden">
                          {enrollment.thumbnail ? (
                            <img src={enrollment.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Target className="h-7 w-7 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 leading-tight">{enrollment.title}</h3>
                          <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">{enrollment.domain}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-black text-gray-600 mb-2">
                          <span>Course Progress</span>
                          <span className="text-brand">{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand h-full transition-all duration-500" style={{ width: `${enrollment.progress}%` }} />
                        </div>
                      </div>
                      <Link to={`/learning/${enrollment.slug}`}>
                        <button className="w-full py-3 bg-gray-50 text-gray-700 text-xs font-black rounded-xl hover:bg-brand hover:text-white transition-all duration-300">
                          {enrollment.progress > 0 ? 'Resume Module' : 'Start Course'}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-brand" /> Recommended Courses
                  </h2>
                  <Link to="/courses">
                    <button className="group px-5 py-2.5 bg-white border-2 border-indigo-100 text-brand text-sm font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2">
                      Browse All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300">
                    <h3 className="font-black text-gray-900 mb-2">Web Development for Beginners</h3>
                    <p className="text-sm text-gray-500 mb-4">Start your journey with HTML, CSS, and JavaScript.</p>
                    <Link to="/courses/web-dev-beginners">
                      <button className="w-full py-3 bg-brand text-white text-xs font-black rounded-xl hover:bg-brand-dark transition-all">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300">
                    <h3 className="font-black text-gray-900 mb-2">UI/UX Design Fundamentals</h3>
                    <p className="text-sm text-gray-500 mb-4">Learn the basics of user interface and experience design.</p>
                    <Link to="/courses/ui-ux-fundamentals">
                      <button className="w-full py-3 bg-brand text-white text-xs font-black rounded-xl hover:bg-brand-dark transition-all">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Review Materials & Preparation */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-indigo-600" /> Review Materials
                </h2>
                <Link to="/courses">
                  <span className="text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest cursor-pointer">
                    View Study Library
                  </span>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900">React Cheat Sheet</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Hooks & State Management</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium mb-6 leading-relaxed">
                    Quick reference guide for the most commonly used React hooks and best practices.
                  </p>
                  <Link to="/materials/react-cheatsheet">
                    <button className="w-full py-3 bg-indigo-50 text-indigo-700 text-[11px] font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300">
                      Open Document
                    </button>
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900">Backend Interview Prep</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">System Design Basics</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium mb-6 leading-relaxed">
                    Essential questions and concepts for backend developer internship interviews.
                  </p>
                  <Link to="/materials/backend-interview">
                    <button className="w-full py-3 bg-emerald-50 text-emerald-700 text-[11px] font-black rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300">
                      Open Document
                    </button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Weekly Quiz: React Mastery */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-brand" /> Weekly Quiz
                </h2>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg border border-amber-200 uppercase tracking-widest">
                  Test Your Knowledge
                </span>
              </div>
              <div className="bg-gradient-to-br from-white via-amber-50/30 to-white p-8 rounded-3xl border border-amber-100 shadow-xl shadow-amber-100/30 hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <p className="text-gray-700 font-medium text-base mb-2">Test your knowledge from this week's lessons.</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-amber-500" /> 10 Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-500" /> 15 Minutes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" /> 100 Points
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                    <span>Your Progress</span>
                    <span>0/10 Completed</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-0 rounded-full transition-all duration-500" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/learning/123?quiz=true">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                      <Trophy className="h-5 w-5" /> Start Quiz
                    </button>
                  </Link>
                  <button 
                    onClick={() => setShowNotes(true)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-amber-100 text-amber-700 font-black rounded-xl hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <BookOpen className="h-5 w-5" /> Review Notes
                  </button>
                </div>

                {/* Achievement Badge Preview */}
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Reward</p>
                      <p className="text-sm font-black text-gray-900">React Mastery Certificate + 100 XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Links Grid */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-5">Quick Links</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Browse Courses', icon: BookOpen, color: 'from-blue-500 to-cyan-500', path: '/courses' },
                  { label: 'Find Internships', icon: Briefcase, color: 'from-purple-500 to-pink-500', path: '/internships' },
                  { label: 'My Applications', icon: FileText, color: 'from-amber-500 to-orange-500', path: '/applications' },
                  { label: 'My Reports', icon: FileText, color: 'from-emerald-500 to-green-500', path: '/sample-report' },
                ].map((link, i) => (
                  <Link key={i} to={link.path} className="group block">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <link.icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 text-center">{link.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Skill Gap Analysis */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <Target className="h-6 w-6 text-brand" /> Skill Gap Analysis
              </h2>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="h-[260px] w-full mb-8">
                  <Radar data={skillData} options={chartOptions} />
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Skill Focus</span>
                    <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Target: Backend Dev</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'System Design', current: 30, target: 85, color: 'bg-indigo-500' },
                      { name: 'Node.js', current: 40, target: 90, color: 'bg-blue-500' },
                      { name: 'MongoDB', current: 65, target: 85, color: 'bg-emerald-500' }
                    ].map((skill, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black text-gray-700">{skill.name}</span>
                          <span className="text-[10px] font-bold text-gray-400">Gap: {skill.target - skill.current}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative">
                          <div 
                            className={`absolute top-0 left-0 h-full ${skill.color} opacity-20 rounded-full`}
                            style={{ width: `${skill.target}%` }}
                          />
                          <div 
                            className={`absolute top-0 left-0 h-full ${skill.color} rounded-full shadow-sm group-hover:brightness-110 transition-all`}
                            style={{ width: `${skill.current}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-brand/5 rounded-2xl border border-indigo-100 mt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Flame className="h-4 w-4 text-orange-500" />
                      </div>
                      <p className="text-xs font-black text-indigo-700 uppercase tracking-wider">Priority Skill to Improve</p>
                    </div>
                    <p className="text-base font-black text-gray-900 mb-1">System Design & Node.js</p>
                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">Focus on scalable architecture and microservices to reach your target match.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WIN FACTOR 1: Live Market Pulse */}
            <section className="animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" /> Live Market Pulse
                </h2>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg animate-pulse">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> LIVE FEED
                </span>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="space-y-4">
                  {[
                    { name: 'Node.js Performance', type: 'ARTICLE', trend: 'Trending', color: 'text-emerald-400' },
                    { name: 'Senior React Developer', type: 'NEW JOB', trend: '2m ago', color: 'text-blue-400' },
                    { name: 'System Design Interview', type: 'RESOURCE', trend: 'Hot', color: 'text-rose-400' }
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center justify-between group/item border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{tech.type}</p>
                        <span className="text-sm font-bold text-slate-300 group-hover/item:text-white transition-colors">{tech.name}</span>
                      </div>
                      <span className={`text-[10px] font-black ${tech.color} bg-white/5 px-2 py-1 rounded-lg`}>{tech.trend}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">
                  View Full Market Report
                </button>
              </div>
            </section>



            {/* Matched Internships */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-brand" /> Internship Matches
                </h2>
                <Link to="/internships">
                  <button className="group px-5 py-2.5 bg-gradient-to-r from-brand to-brand-dark text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                    View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedInternships.map((intern, i) => (
                  <div key={i} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[9px] font-black rounded-lg uppercase tracking-wider shadow-md shadow-emerald-200">
                        {intern.match} Match
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{intern.location}</span>
                    </div>
                    <h3 className="font-black text-gray-800 text-sm leading-tight mb-1 group-hover:text-brand transition-colors line-clamp-1">{intern.title}</h3>
                    <p className="text-xs text-gray-500 font-bold mb-3 line-clamp-1">{intern.company}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5 tracking-tight">Stipend</p>
                        <span className="text-base font-black text-brand">{intern.stipend}</span>
                      </div>
                      <Link to={`/internships/${intern.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <button className="p-2 bg-gradient-to-r from-brand to-brand-dark text-white rounded-lg shadow-lg shadow-indigo-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group/btn">
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.main>

      {/* Hackathon Win: Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <button className="w-16 h-16 bg-gradient-to-br from-brand to-brand-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group-hover:shadow-indigo-500/50">
          <BrainCircuit className="h-8 w-8" />
          <div className="absolute -top-2 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-20 right-0 w-64 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all pointer-events-none">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">AI Career Coach</p>
          <p className="text-sm font-medium leading-relaxed">
            {isSyedAsif 
              ? `"Hi Syed! I've analyzed your new skills. You're now a 98% match for the Frontend Intern role!"`
              : `"Welcome! I'm your AI career coach. Let's start by completing your profile to find the best internship matches for you."`
            }
          </p>
          <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-3 h-3 bg-slate-900" />
        </div>
      </div>

      {/* Career Achievement Portfolio Modal */}
      {showPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowPortfolio(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-700 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-4 py-2 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-xl border border-indigo-100 uppercase tracking-[0.2em]">
                    Verified Credential
                  </div>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">Full Stack Web Development Portfolio</h2>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
                      Comprehensive assessment report and official industry-recognized certification for the Full Stack program.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-700 bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                      <Target className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span>8 Performance Metrics</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-700 bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span>Weekly Progress Charts</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-700 bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-amber-600" />
                    </div>
                    <span>Verified Identity ID</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/sample-report" className="flex-1 py-5 bg-indigo-600 text-white text-base font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                    View Detailed Report <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link to="/sample-certificate" className="flex-1 py-5 bg-white border-2 border-indigo-100 text-indigo-600 text-base font-black rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                    <Award className="h-6 w-6" /> Professional Certificate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Study Notes Modal */}
      {showNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setShowNotes(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-700 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl -mr-24 -mt-24" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest">
                    Quick Review Notes
                  </div>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">React Mastery Study Guide</h2>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Essential concepts to review before starting your weekly quiz.
                  </p>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {studyNotes.map((note, i) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 ${note.bg} ${note.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <note.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-black text-gray-900">{note.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button 
                    onClick={() => setShowNotes(false)}
                    className="w-full py-4 bg-amber-500 text-white text-sm font-black rounded-xl shadow-lg shadow-amber-100 hover:bg-amber-600 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Got it, Ready for Quiz!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Referral Generator Modal */}
      {showReferral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowReferral(false)}
              className="absolute top-6 right-6 z-20 p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-700 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">AI Referral Generator</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">LinkedIn Ready</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                <textarea 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-700 font-medium leading-relaxed resize-none h-40"
                  value={referralText}
                  onChange={(e) => setReferralText(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(referralText);
                    alert("Copied to clipboard!");
                  }}
                  className="flex-1 py-4 bg-indigo-600 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
