import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  Compass, 
  MessageSquare, 
  FileSearch, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit,
  Star,
  Trophy,
  User,
  Zap,
  Target,
  Shield,
  BarChart3,
  ArrowRight,
  Terminal,
  Github,
  FileText,
  Globe,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Prep = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  
  const tabs = [
    { id: 'roadmap', label: 'Roadmap Generator', icon: Compass },
    { id: 'interview', label: 'Mock Interview', icon: MessageSquare },
    { id: 'resume', label: 'Resume Analyser', icon: FileSearch },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="no-print">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Prep Tools</h1>
            <p className="text-gray-600">Prepare for your dream internship with personalized AI insights</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation flex space-x-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-8 w-fit overflow-x-auto no-print">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-brand text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-2 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'roadmap' && <RoadmapGenerator />}
              {activeTab === 'interview' && <MockInterview />}
              {activeTab === 'resume' && <ResumeAnalyser />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// --- ROADMAP GENERATOR COMPONENT ---
const RoadmapGenerator = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [formData, setFormData] = useState({ role: '' });
  const [isActivated, setIsActivated] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  // Persistence keys
  const isSyedAsif = currentUser?.email === 'syedgaffarsyedrajjak1@gmail.com';
  const roadmapKey = isSyedAsif ? 'roadmapData' : `roadmapData_${currentUser?.uid}`;
  const progressKey = isSyedAsif ? 'roadmapProgress' : `roadmapProgress_${currentUser?.uid}`;

  // Load saved roadmap and progress
  useEffect(() => {
    const savedRoadmap = localStorage.getItem(roadmapKey);
    const savedProgress = localStorage.getItem(progressKey);
    if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));
    if (savedProgress) setCompletedTasks(JSON.parse(savedProgress));
  }, [roadmapKey, progressKey]);

  // Save progress when it changes
  useEffect(() => {
    if (Object.keys(completedTasks).length > 0) {
      localStorage.setItem(progressKey, JSON.stringify(completedTasks));
    }
  }, [completedTasks, progressKey]);

  const toggleTask = (dayId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
    toast.success('Progress updated!');
  };

  const calculateProgress = () => {
    if (!roadmap) return 0;
    const totalTasks = roadmap.weeks.reduce((acc, week) => acc + week.days.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completedCount / totalTasks) * 100);
  };

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      // Mock Roadmap for demo with more detail
      setTimeout(() => {
        const newRoadmap = {
          weeks: [
            {
              week: 1,
              title: "Foundation & Core Architecture",
              focus: "Building a rock-solid understanding of industry-standard tools and patterns.",
              milestone: "Professional Setup Verified",
              days: [
                { id: 'w1d1', day: 1, task: "Master ES6+ & TypeScript", time: "4 hours", details: "Interfaces, Generics, and modern JS patterns used in large-scale apps.", icon: Terminal },
                { id: 'w1d2', day: 2, task: "Advanced Version Control", time: "2 hours", details: "Git Rebase, Stashing, and Collaborative workflows (GitFlow).", icon: Github },
                { id: 'w1d3', day: 3, task: "Responsive Design Systems", time: "4 hours", details: "Mastering Tailwind CSS and building reusable component libraries.", icon: Zap },
                { id: 'w1d4', day: 4, task: "Project Scoping & Logic", time: "3 hours", details: "Defining MVP features and mapping out technical requirements.", icon: FileText },
                { id: 'w1d5', day: 5, task: "UI/UX Accessibility (a11y)", time: "3 hours", details: "Building inclusive interfaces that meet WCAG standards.", icon: Shield }
              ]
            },
            {
              week: 2,
              title: "Frontend Engineering Mastery",
              focus: "Developing high-performance, interactive user interfaces.",
              milestone: "Architecture Review Passed",
              days: [
                { id: 'w2d1', day: 8, task: "Complex State Management", time: "5 hours", details: "Zustand vs Redux Toolkit: When to use what and why.", icon: BrainCircuit },
                { id: 'w2d2', day: 9, task: "Custom Hooks & Logic", time: "4 hours", details: "Extracting business logic into reusable, testable React hooks.", icon: Zap },
                { id: 'w2d3', day: 10, task: "Client-Side Optimization", time: "3 hours", details: "Memoization, Code Splitting, and Lazy Loading techniques.", icon: Zap },
                { id: 'w2d4', day: 11, task: "Form Design Patterns", time: "3 hours", details: "Handling complex multi-step forms with Zod and React Hook Form.", icon: FileText },
                { id: 'w2d5', day: 12, task: "Unit Testing Foundations", time: "4 hours", details: "Writing your first tests with Vitest and React Testing Library.", icon: CheckCircle2 }
              ]
            },
            {
              week: 3,
              title: "Backend & Systems Integration",
              focus: "Building secure, scalable, and well-documented APIs.",
              milestone: "Full-Stack MVP Functional",
              days: [
                { id: 'w3d1', day: 15, task: "RESTful API Design", time: "4 hours", details: "Resource naming, status codes, and HATEOAS principles.", icon: Globe },
                { id: 'w3d2', day: 16, task: "Database Normalization", time: "4 hours", details: "Optimizing MongoDB schemas for performance and scalability.", icon: BarChart3 },
                { id: 'w3d3', day: 17, task: "Auth & Security Headers", time: "5 hours", details: "JWT implementation with secure cookies and CSRF protection.", icon: Shield },
                { id: 'w3d4', day: 18, task: "Error Handling Middleware", time: "3 hours", details: "Global error boundaries and consistent API responses.", icon: AlertCircle },
                { id: 'w3d5', day: 19, task: "Cloud Storage Integration", time: "4 hours", details: "Handling file uploads securely with AWS S3 or Cloudinary.", icon: Upload }
              ]
            },
            {
              week: 4,
              title: "Production & Career Readiness",
              focus: "Polishing the product and preparing for the industry spotlight.",
              milestone: "Live Deployment Complete",
              days: [
                { id: 'w4d1', day: 22, task: "End-to-End Testing", time: "5 hours", details: "Automating user flows with Playwright or Cypress.", icon: CheckCircle2 },
                { id: 'w4d2', day: 23, task: "Performance Benchmarking", time: "4 hours", details: "Core Web Vitals audit and database query optimization.", icon: BarChart3 },
                { id: 'w4d3', day: 24, task: "CI/CD Pipeline Setup", time: "4 hours", details: "Automated deployments with GitHub Actions and Vercel.", icon: Zap },
                { id: 'w4d4', day: 25, task: "Resume & Portfolio Sync", time: "3 hours", details: "Highlighting technical wins from this roadmap on your resume.", icon: FileSearch },
                { id: 'w4d5', day: 26, task: "Mock Interview Review", time: "4 hours", details: "Final polish on technical and behavioral explanations.", icon: MessageSquare }
              ]
            }
          ],
          summary: {
            totalHours: "82 Hours",
            totalTasks: 20,
            completionEstimate: "28 Days"
          }
        };
        setRoadmap(newRoadmap);
        localStorage.setItem(roadmapKey, JSON.stringify(newRoadmap));
        setLoading(false);
        toast.success('Your personalized roadmap is ready!');
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Failed to generate roadmap');
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="roadmap-form bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Compass className="h-10 w-10 text-brand animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Precision Career Roadmap</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-4 font-medium text-lg leading-relaxed">
            Our AI analyzes thousands of successful placements to generate your optimal 4-week preparation path.
          </p>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="mb-4">
              <div className="relative">
                <label className="absolute left-5 top-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Role</label>
                <input 
                  type="text" 
                  placeholder="e.g. Full Stack Developer"
                  className="w-full pl-5 pr-5 pt-7 pb-3 border-2 border-gray-100 rounded-2xl focus:border-brand focus:ring-0 transition-all font-bold text-gray-700 bg-gray-50/30"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>
            <button 
              onClick={generateRoadmap}
              disabled={loading || !formData.role}
              className="w-full py-5 bg-brand text-white font-black rounded-[2rem] hover:bg-brand-dark transition-all disabled:opacity-50 flex items-center justify-center shadow-xl shadow-indigo-100 group"
            >
              {loading ? (
                <>
                  <Clock className="h-6 w-6 mr-3 animate-spin" /> Optimizing Your Path...
                </>
              ) : (
                <>
                  Build My Custom Roadmap <Sparkles className="ml-3 h-5 w-5 group-hover:scale-125 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {roadmap && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 roadmap-container"
        >
          {/* Print Only Header */}
          <div className="hidden print:block mb-12 border-b-2 border-brand pb-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">AutoIntern Career Roadmap</h1>
                <p className="text-xl text-brand font-bold">Target Role: {formData.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                <p className="text-sm font-bold text-gray-500">www.autointern.com</p>
              </div>
            </div>
          </div>

            {/* Summary Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 summary-grid">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Overall Progress</p>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">{calculateProgress()}%</p>
                <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-brand transition-all duration-500" 
                    style={{ width: `${calculateProgress()}%` }} 
                  />
                </div>
              </div>
            </div>
            {[
              { label: 'Intensity', value: roadmap.summary.totalHours, sub: 'Targeted Study', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Milestones', value: roadmap.summary.totalTasks, sub: 'Industry Skills', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Commitment', value: roadmap.summary.completionEstimate, sub: 'To Job Ready', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-bold">{stat.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Structure */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand via-brand/50 to-gray-50 rounded-full hidden md:block timeline-line" />
            
            <div className="space-y-24 relative">
              {roadmap.weeks.map((week, wi) => (
                <div key={wi} className="relative md:pl-24">
                  {/* Week Bubble */}
                  <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-brand text-brand rounded-[1.5rem] hidden md:flex items-center justify-center shadow-xl z-10 font-black text-xl week-bubble">
                    {week.week}
                  </div>

                  <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">Week {week.week}: {week.title}</h3>
                      <span className="px-4 py-1.5 bg-brand text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-md shadow-indigo-100 w-fit">
                        {week.milestone}
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium max-w-3xl text-lg leading-relaxed">{week.focus}</p>
                  </div>

                  {/* Daily Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {week.days.map((day, di) => {
                      const Icon = day.icon || Star;
                      return (
                        <div key={di} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                          
                          <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => toggleTask(day.id)}
                                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    completedTasks[day.id] 
                                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                                      : 'border-gray-200 hover:border-brand text-transparent'
                                  }`}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                                <span className="text-[10px] font-black text-brand bg-brand/5 px-4 py-1.5 rounded-xl uppercase tracking-[0.15em]">Day {day.day}</span>
                              </div>
                              <div className="w-10 h-10 bg-gray-50 text-gray-400 group-hover:bg-brand/10 group-hover:text-brand rounded-xl flex items-center justify-center transition-colors">
                                <Icon className="h-5 w-5" />
                              </div>
                            </div>
                            
                            <h4 className={`font-black text-gray-900 text-xl leading-tight mb-3 transition-all ${completedTasks[day.id] ? 'line-through opacity-50' : 'group-hover:text-brand'}`}>{day.task}</h4>
                            <p className={`text-sm text-gray-500 font-medium mb-8 leading-relaxed line-clamp-3 transition-all ${completedTasks[day.id] ? 'opacity-30' : ''}`}>{day.details}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                              <span className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Clock className="h-3.5 w-3.5" /> {day.time}
                              </span>
                              <a 
                                href={day.resource} 
                                target="_blank" 
                                rel="noreferrer"
                                className="p-2 bg-gray-50 text-gray-400 hover:bg-brand hover:text-white rounded-lg transition-all"
                                title="Access Resource"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation Panel */}
          <div className="motivation-panel bg-slate-900 p-16 rounded-[3.5rem] text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] -ml-48 -mt-48" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mb-32" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-brand text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand/20 rotate-3">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="text-4xl font-black mb-4 tracking-tight">Ready to Elevate Your Career?</h3>
              <p className="text-slate-400 font-medium mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                Following this specialized path increases your visibility to recruiters by <span className="text-brand font-black">85%</span>. Your success starts with Day 1.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button 
                  onClick={() => setIsActivated(!isActivated)}
                  className={`px-12 py-5 font-black rounded-[2rem] transition-all shadow-xl text-lg flex items-center justify-center gap-2 ${
                    isActivated 
                      ? 'bg-emerald-500 text-white shadow-emerald-100' 
                      : 'bg-brand text-white shadow-brand/20 hover:bg-brand-dark'
                  }`}
                >
                  {isActivated ? (
                    <>
                      Roadmap Activated <CheckCircle2 className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Activate Roadmap <Zap className="h-5 w-5" />
                    </>
                  )}
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-12 py-5 bg-white/10 text-white font-black rounded-[2rem] border border-white/10 hover:bg-white/20 transition-all text-lg flex items-center justify-center gap-2"
                >
                  Download PDF <FileText className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Print Footer */}
          <div className="hidden print-footer">
            <p>© {new Date().getFullYear()} AutoIntern - Career Acceleration Platform. This roadmap is a personalized career preparation guide.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// --- MOCK INTERVIEW COMPONENT ---
const MockInterview = () => {
  const [session, setSession] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startInterview = () => {
    setLoading(true);
    setTimeout(() => {
      setSession([
        { 
          id: 1,
          question: "How does React's virtual DOM improve performance?", 
          difficulty: "Medium", 
          category: "Frontend Architecture",
          context: "This question tests your understanding of React internals and reconciliation."
        },
        { 
          id: 2,
          question: "Explain the difference between SQL and NoSQL databases with use cases.", 
          difficulty: "Hard", 
          category: "System Design",
          context: "Focus on scalability, schema flexibility, and ACID properties."
        },
        { 
          id: 3,
          question: "Tell me about a challenging technical problem you solved.", 
          difficulty: "Medium", 
          category: "Behavioral",
          context: "Use the STAR method: Situation, Task, Action, Result."
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  const getFeedback = async () => {
    setLoading(true);
    setTimeout(() => {
      setFeedback({
        score: 8.5,
        strengths: [
          "Accurate technical explanation of reconciliation",
          "Excellent use of industry terminology (diffing, batching)",
          "Clear and concise delivery"
        ],
        improvements: [
          "Mention the role of 'keys' in list rendering performance",
          "Explain fiber architecture briefly for extra points"
        ],
        summary: "Impressive answer! You've mastered the core concepts. Adding a real-world example of a performance bottleneck you solved would make this a 10/10 response."
      });
      setLoading(false);
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentIdx < session.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setFeedback(null);
      setAnswer('');
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-100">
          <Trophy className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Interview Session Complete!</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          Great job! You've successfully practiced 3 critical industry questions. Your average AI score was <span className="text-brand font-black">8.2/10</span>.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time Spent</p>
            <p className="text-xl font-black text-gray-900">12:45</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Confidence</p>
            <p className="text-xl font-black text-emerald-600">High</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setSession(null);
            setIsFinished(false);
            setCurrentIdx(0);
          }}
          className="px-10 py-4 bg-brand text-white font-black rounded-2xl hover:bg-brand-dark transition-all shadow-xl shadow-indigo-100"
        >
          Start New Session
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!session ? (
        <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mx-auto mb-8">
              <BrainCircuit className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">AI Mock Interview</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10 font-medium text-lg leading-relaxed">
              Master your technical and behavioral interviews with our real-time AI coach. Get instant feedback on accuracy, tone, and delivery.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
              {[
                { title: 'Real-time Analysis', desc: 'Instant scoring and feedback.', icon: Zap },
                { title: 'Industry Topics', desc: 'Questions from top tech firms.', icon: Target },
                { title: 'Behavioral Prep', desc: 'Master the STAR method.', icon: User }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Icon className="h-6 w-6 text-brand mb-3" />
                    <h4 className="font-black text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={startInterview}
              disabled={loading}
              className="px-12 py-5 bg-brand text-white font-black rounded-2xl hover:bg-brand-dark transition-all shadow-xl shadow-indigo-100 flex items-center justify-center mx-auto min-w-[280px]"
            >
              {loading ? (
                <>
                  <Clock className="h-5 w-5 mr-3 animate-spin" /> Preparing Session...
                </>
              ) : 'Start Interview Session'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-black">
                {currentIdx + 1}/{session.length}
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Category</p>
                <p className="text-sm font-black text-gray-900">{session[currentIdx].category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                session[currentIdx].difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                session[currentIdx].difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {session[currentIdx].difficulty} Difficulty
              </span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">
                  {session[currentIdx].question}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium italic">
                  <Sparkles className="h-4 w-4" />
                  {session[currentIdx].context}
                </div>
              </div>

              <div className="relative">
                <textarea 
                  className="w-full border-2 border-gray-100 rounded-[2rem] p-8 h-64 focus:ring-brand focus:border-brand bg-gray-50/30 text-gray-700 font-medium transition-all"
                  placeholder="Type your answer here... Be as detailed as possible."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={!!feedback}
                />
                {!feedback && (
                  <div className="absolute bottom-6 right-8 text-xs font-bold text-gray-400 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Press Enter to Submit
                  </div>
                )}
              </div>
              
              {!feedback ? (
                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={getFeedback}
                    disabled={loading || !answer}
                    className="flex-1 py-5 bg-brand text-white font-black rounded-2xl hover:bg-brand-dark transition-all disabled:opacity-50 shadow-xl shadow-indigo-100 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Clock className="h-5 w-5 mr-3 animate-spin" /> Analysing Answer...
                      </>
                    ) : 'Submit for AI Feedback'}
                  </button>
                  <button 
                    onClick={nextQuestion}
                    className="px-10 py-5 bg-gray-50 text-gray-600 font-black rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    Skip Question
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 pt-10 border-t border-gray-100"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black text-gray-900 flex items-center gap-3">
                      <span className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                      </span>
                      AI Evaluation
                    </h4>
                    <div className="px-6 py-2 bg-brand/5 text-brand rounded-2xl border border-brand/10">
                      <span className="text-[10px] font-black uppercase tracking-widest mr-2">Score</span>
                      <span className="text-2xl font-black">{feedback.score}/10</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Key Strengths
                      </p>
                      <ul className="space-y-3">
                        {feedback.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50">
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Areas for Growth
                      </p>
                      <ul className="space-y-3">
                        {feedback.improvements.map((im, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                            {im}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-600 italic font-medium leading-relaxed border border-gray-100 mb-8">
                    "{feedback.summary}"
                  </div>

                  <button 
                    onClick={nextQuestion}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
                  >
                    {currentIdx < session.length - 1 ? (
                      <>
                        Next Question <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        Finish Interview Session <Trophy className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- RESUME ANALYSER COMPONENT ---
const ResumeAnalyser = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [jdText, setJdText] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  
  const onDrop = (acceptedFiles) => {
    handleUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleMatchJD = () => {
    if (!jdText) return;
    setIsMatching(true);
    setTimeout(() => {
      setAnalysis(prev => ({
        ...prev,
        jdMatchScore: 72,
        missingKeywords: ['Redis', 'Microservices', 'GraphQL', 'AWS Lambda'],
        matchFeedback: "Your resume covers 70% of the technical requirements. Focus on adding cloud experience and caching mechanisms to better align with this specific role."
      }));
      setIsMatching(false);
      toast.success('JD Match analysis complete!');
    }, 2000);
  };

  const handleUpload = async (file) => {
    setLoading(true);
    setTimeout(() => {
      setAnalysis({
        overallScore: 84,
        presentSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'Node.js', 'REST APIs'],
        missingSkills: ['Unit Testing (Jest)', 'Redux/Zustand', 'CI/CD Pipelines', 'AWS/Cloud'],
        scoreBreakdown: [
          { label: 'Technical Depth', score: 78, color: 'bg-indigo-500' },
          { label: 'ATS Formatting', score: 92, color: 'bg-emerald-500' },
          { label: 'Action Impact', score: 85, color: 'bg-amber-500' },
          { label: 'Skill Coverage', score: 70, color: 'bg-blue-500' }
        ],
        suggestions: [
          { section: "Experience", issue: "Lack of metrics", fix: "Quantify achievements (e.g., 'Reduced load time by 30%')" },
          { section: "Projects", issue: "Deployment links", fix: "Include Vercel or Netlify live links for all projects" },
          { section: "Skills", issue: "Missing testing", fix: "Add Jest/Cypress to demonstrate production-ready code habits" }
        ],
        summary: "Your resume is highly professional and ATS-optimized. To move from 'Good' to 'Exceptional', focus on adding quantifiable results to your experience and mention modern state management tools."
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {!analysis ? (
        <div className="space-y-8">
          <div 
            {...getRootProps()} 
            className={`group relative border-4 border-dashed rounded-[3rem] p-20 text-center transition-all cursor-pointer overflow-hidden ${
              isDragActive ? 'border-brand bg-brand/5 ring-8 ring-brand/5' : 'border-gray-100 bg-white hover:border-brand/30'
            }`}
          >
            <input {...getInputProps()} />
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 overflow-hidden">
              {loading && <div className="h-full bg-brand animate-progress w-full" />}
            </div>

            <div className="relative z-10">
              <div className={`w-24 h-24 mx-auto mb-8 rounded-[2rem] flex items-center justify-center transition-all duration-500 ${
                isDragActive ? 'bg-brand text-white scale-110 rotate-6' : 'bg-gray-50 text-gray-300 group-hover:bg-brand/10 group-hover:text-brand'
              }`}>
                <Upload className={`h-10 w-10 ${isDragActive ? 'animate-bounce' : ''}`} />
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Resume Analysis</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium text-lg">
                Upload your PDF resume to get instant ATS scoring, skill gap analysis, and actionable AI feedback.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: 'ATS Scoring', icon: Target },
                  { label: 'Skill Matching', icon: BrainCircuit },
                  { label: 'Actionable Tips', icon: Sparkles }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-xl text-xs font-black text-gray-600 border border-gray-100">
                      <Icon className="h-4 w-4 text-brand" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mb-6" />
                <p className="text-lg font-black text-gray-900">Analysing your profile...</p>
                <p className="text-sm text-gray-500 font-medium mt-2">Our AI is scanning 50+ data points</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
              <Shield className="h-8 w-8 text-indigo-600 mb-4" />
              <h4 className="font-black text-indigo-900 mb-2">Privacy Guaranteed</h4>
              <p className="text-xs text-indigo-700/70 font-medium leading-relaxed">Your data is processed securely and never shared with third parties without consent.</p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mb-4" />
              <h4 className="font-black text-emerald-900 mb-2">ATS-Ready Results</h4>
              <p className="text-xs text-emerald-700/70 font-medium leading-relaxed">We use the same parsing logic as top Applicant Tracking Systems (Workday, Greenhouse).</p>
            </div>
            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
              <Zap className="h-8 w-8 text-amber-600 mb-4" />
              <h4 className="font-black text-amber-900 mb-2">Instant Feedback</h4>
              <p className="text-xs text-amber-700/70 font-medium leading-relaxed">No waiting. Get a comprehensive report in under 30 seconds.</p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Main Score Header */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                  <circle 
                    cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    className="text-brand transition-all duration-[1.5s] ease-out" 
                    strokeDasharray={465} 
                    strokeDashoffset={465 - (465 * analysis.overallScore) / 100} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-gray-900">{analysis.overallScore}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Score</span>
                </div>
              </div>
              <h4 className="text-lg font-black text-gray-900">Overall Match</h4>
              <p className="text-xs text-gray-500 font-medium mt-2">Optimized for Engineering Roles</p>
            </div>

            {/* JD Match Section (New) */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
              <h4 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-brand" /> Job Description Match
              </h4>
              <textarea 
                className="flex-1 w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium focus:ring-brand focus:border-brand mb-4 min-h-[120px]"
                placeholder="Paste the Job Description here to see how well you match..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <button 
                onClick={handleMatchJD}
                disabled={isMatching || !jdText}
                className="w-full py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                {isMatching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Compare with JD
              </button>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  Analysis Breakdown
                </h4>
                <button className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Download PDF Report</button>
              </div>
              <div className="grid grid-cols-1 gap-y-6">
                {analysis.scoreBreakdown.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">{item.label}</span>
                      <span className="text-xs font-black text-gray-900">{item.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-[1.5s] ease-out delay-300`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* JD Match Results Section (Conditional) */}
          {analysis.jdMatchScore && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-32 h-32 flex-shrink-0 bg-white/10 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-xl">
                  <span className="text-4xl font-black">{analysis.jdMatchScore}%</span>
                  <span className="text-[8px] font-black uppercase tracking-widest">JD Match</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black mb-2">Job Description Match Insights</h4>
                  <p className="text-indigo-200 text-sm font-medium mb-6 leading-relaxed">
                    {analysis.matchFeedback}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map(keyword => (
                      <span key={keyword} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-black flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400" /> {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actionable Suggestions */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </span>
              Critical Improvements
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {analysis.suggestions.map((s, i) => (
                <div key={i} className="flex flex-col p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand bg-brand/5 px-3 py-1 rounded-lg w-fit mb-3">{s.section}</span>
                  <p className="font-black text-gray-900 text-sm mb-2 leading-tight">{s.issue}</p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    <span className="text-emerald-600 font-black">AI Fix:</span> {s.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Analysis & Summary */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h4 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </span>
                Skill Match Analysis
              </h4>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Detected Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.presentSkills.map(s => (
                      <span key={s} className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border border-emerald-100 shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Skill Gaps
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map(s => (
                      <span key={s} className="px-4 py-2 bg-red-50 text-red-700 text-xs font-black rounded-xl border border-red-100 shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10 flex-1">
                <div className="w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 fill-white" />
                </div>
                <h4 className="text-2xl font-black mb-4">AI Final Verdict</h4>
                <p className="text-slate-400 font-medium italic leading-relaxed text-lg">
                  "{analysis.summary}"
                </p>
              </div>
              <div className="relative z-10 mt-10 flex gap-4">
                <button 
                  onClick={() => setAnalysis(null)}
                  className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/10 transition-all text-xs"
                >
                  Upload New Resume
                </button>
                <button className="flex-1 py-4 bg-brand hover:bg-brand-dark text-white font-black rounded-2xl transition-all text-xs shadow-xl shadow-brand/20">
                  Improve My Skills
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Prep;
