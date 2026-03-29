import { useState } from 'react';
import Sidebar from '../components/Sidebar';
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
  Star
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
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Prep Tools</h1>
            <p className="text-gray-600">Prepare for your dream internship with personalized AI insights</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-8 w-fit overflow-x-auto">
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
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [formData, setFormData] = useState({ role: '', domain: '' });

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      // const res = await axios.post('/api/ai/roadmap', { ...formData, uid: 'user123' });
      // setRoadmap(res.data);
      
      // Mock Roadmap for demo
      setTimeout(() => {
        setRoadmap({
          week1: {
            title: "Foundations & Core Skills",
            days: [
              { day: 1, tasks: [{ time: "2 hours", task: "Review JavaScript ES6+ Concepts", resource: "https://javascript.info/" }] },
              { day: 2, tasks: [{ time: "3 hours", task: "React Component Lifecycle & Hooks", resource: "https://react.dev" }] }
            ]
          },
          week2: {
            title: "Advanced Projects & Review",
            days: [
              { day: 8, tasks: [{ time: "4 hours", task: "Build a Portfolio Project with Tailwind", resource: "https://tailwindcss.com" }] }
            ]
          },
          tips: ["Focus on performance optimization", "Practice coding on LeetCode daily"]
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
        <Sparkles className="h-12 w-12 text-brand mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Custom Prep Roadmap</h2>
        <p className="text-gray-500 max-w-md mx-auto mt-2">Generate a personalized 2-week preparation plan for your target role.</p>
        
        <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Target Role (e.g. Frontend Developer)"
            className="flex-1 border-gray-200 rounded-2xl px-6 py-3 focus:ring-brand focus:border-brand"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          />
          <button 
            onClick={generateRoadmap}
            disabled={loading || !formData.role}
            className="px-8 py-3 bg-brand text-white font-bold rounded-2xl hover:bg-brand-dark transition-all disabled:opacity-50 flex items-center justify-center min-w-[200px]"
          >
            {loading ? 'Generating...' : 'Generate My Roadmap'}
          </button>
        </div>
      </div>

      {roadmap && (
        <div className="grid md:grid-cols-2 gap-8">
          {[roadmap.week1, roadmap.week2].map((week, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="w-8 h-8 bg-brand text-white rounded-lg flex items-center justify-center mr-3 text-sm">W{i+1}</span>
                {week.title}
              </h3>
              <div className="space-y-4">
                {week.days.map((day, di) => (
                  <div key={di} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Day {day.day}</p>
                    {day.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{task.task}</p>
                          <p className="text-sm text-gray-500 mt-1">{task.time} • <a href={task.resource} className="text-brand hover:underline">Resource Link</a></p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

  const startInterview = () => {
    // Mock questions
    setSession([
      { question: "How does React's virtual DOM improve performance?", difficulty: "Medium", skill: "React Fundamentals", modelAnswer: "The virtual DOM is a lightweight copy of the real DOM. React uses it to calculate minimal changes required..." },
      { question: "Explain closures in JavaScript with an example.", difficulty: "Hard", skill: "Core JS", modelAnswer: "A closure is the combination of a function bundled together with references to its surrounding state..." }
    ]);
  };

  const getFeedback = async () => {
    setLoading(true);
    // const res = await axios.post('/api/ai/interview-feedback', { ... });
    setTimeout(() => {
      setFeedback({
        score: 8,
        strengths: ["Clear explanation of virtual DOM", "Good use of technical terms"],
        improvements: ["Mention diffing algorithm", "Give a real-world example"],
        summary: "Solid answer, you clearly understand the core concept but could be more specific about the reconciliation process."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {!session ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
          <BrainCircuit className="h-16 w-16 text-brand mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900">AI Mock Interview</h2>
          <p className="text-gray-500 mt-2 mb-8">Practice technical and HR questions with instant AI feedback.</p>
          <button 
            onClick={startInterview}
            className="px-10 py-4 bg-brand text-white font-bold rounded-2xl hover:bg-brand-dark transition-all shadow-lg shadow-indigo-100"
          >
            Start Mock Interview
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentIdx + 1} of {session.length}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              session[currentIdx].difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
              session[currentIdx].difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
            }`}>
              {session[currentIdx].difficulty}
            </span>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 leading-relaxed mb-6">
              {session[currentIdx].question}
            </h3>
            <textarea 
              className="w-full border-gray-200 rounded-2xl p-6 h-48 focus:ring-brand focus:border-brand bg-gray-50/50"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            
            <div className="mt-6 flex justify-between gap-4">
              <button 
                onClick={getFeedback}
                disabled={loading || !answer}
                className="flex-1 py-4 bg-brand text-white font-bold rounded-2xl hover:bg-brand-dark transition-all disabled:opacity-50"
              >
                {loading ? 'Analysing...' : 'Get AI Feedback'}
              </button>
              <button 
                onClick={() => {
                  setCurrentIdx(prev => Math.min(prev + 1, session.length - 1));
                  setFeedback(null);
                  setAnswer('');
                }}
                className="px-8 py-4 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50"
              >
                Skip
              </button>
            </div>
          </div>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl border-2 border-brand/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-2" />
                  AI Evaluation
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Score</span>
                  <span className="text-2xl font-black text-brand">{feedback.score}/10</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Strengths</p>
                  {feedback.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Improvements</p>
                  {feedback.improvements.map((im, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      {im}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic">
                "{feedback.summary}"
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

// --- RESUME ANALYSER COMPONENT ---
const ResumeAnalyser = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  
  const onDrop = (acceptedFiles) => {
    handleUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const handleUpload = async (file) => {
    setLoading(true);
    // Mock Analysis for Hackathon Demo
    setTimeout(() => {
      setAnalysis({
        overallScore: 78,
        presentSkills: ['React', 'JavaScript', 'Tailwind', 'Git'],
        missingSkills: ['Redux', 'Unit Testing', 'Node.js', 'System Design'],
        scoreBreakdown: [
          { label: 'Technical Depth', score: 65, color: 'bg-indigo-500' },
          { label: 'Formatting', score: 90, color: 'bg-emerald-500' },
          { label: 'Action-Oriented', score: 80, color: 'bg-amber-500' },
          { label: 'Quantifiability', score: 45, color: 'bg-red-500' }
        ],
        suggestions: [
          { section: "Experience", issue: "Vague descriptions", fix: "Use action verbs and quantifiable results (e.g. 'Improved speed by 20%')" },
          { section: "Projects", issue: "Missing live links", fix: "Add GitHub and Vercel/Netlify deployment links" },
          { section: "Skills", issue: "No testing mentioned", fix: "Add Jest/React Testing Library to show quality focus" }
        ],
        summary: "Your resume is strong in frontend fundamentals but lacks mention of state management and testing which are critical for mid-to-senior level internships."
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {!analysis ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all cursor-pointer ${
            isDragActive ? 'border-brand bg-brand/5' : 'border-gray-200 bg-white hover:border-brand'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`h-16 w-16 mx-auto mb-6 ${isDragActive ? 'text-brand animate-bounce' : 'text-gray-300'}`} />
          <h2 className="text-2xl font-bold text-gray-900">Upload your Resume</h2>
          <p className="text-gray-500 mt-2">Drag and drop your PDF here, or click to select file</p>
          <div className="mt-8 inline-flex items-center px-6 py-3 bg-gray-50 text-gray-600 font-bold rounded-2xl text-sm border border-gray-100">
            Supports PDF format only
          </div>
          {loading && (
            <div className="mt-8 flex flex-col items-center">
              <div className="w-48 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand h-full animate-progress" />
              </div>
              <p className="text-xs font-bold text-brand mt-4 uppercase tracking-widest">AI is reading your resume...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-brand transition-all duration-1000 ease-out" strokeDasharray={364} strokeDashoffset={364 - (364 * analysis.overallScore) / 100} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-gray-900">{analysis.overallScore}%</span>
              </div>
              <h4 className="font-bold text-gray-900">Overall Score</h4>
              <p className="text-xs text-gray-500 mt-1">AI-Powered Evaluation</p>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-brand" /> Analysis Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {analysis.scoreBreakdown.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>{item.label}</span>
                      <span className="text-brand">{item.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 delay-300`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-6">Actionable Improvements</h4>
            <div className="space-y-4">
              {analysis.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand bg-brand/5 px-2 py-0.5 rounded">{s.section}</span>
                      <p className="font-bold text-gray-900 text-sm">{s.issue}</p>
                    </div>
                    <p className="text-xs text-gray-600">Fix: {s.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-6">Skill Match Analysis</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">Found in Resume</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.presentSkills.map(s => (
                      <span key={s} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Missing from Resume</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills.map(s => (
                      <span key={s} className="px-3 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <h4 className="font-bold text-gray-900 mb-4">AI Summary</h4>
              <p className="text-sm text-gray-600 italic leading-relaxed flex-1">
                "{analysis.summary}"
              </p>
              <button 
                onClick={() => setAnalysis(null)}
                className="mt-6 w-full py-3 bg-gray-50 text-gray-600 text-xs font-black rounded-xl hover:bg-brand hover:text-white transition-all duration-300"
              >
                Upload New Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prep;
