import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, MapPin, Briefcase, Filter, Bookmark, ArrowRight, Info, Map as MapIcon, Building2, Clock, X, Sparkles, FileCheck, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Internships = () => {
  const { currentUser } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isBoosting, setIsBoosting] = useState(true);
  const [applying, setApplying] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    domain: '',
    mode: '',
    location: ''
  });
  
  const internshipHubs = [
    { id: 'mumbai', name: 'Mumbai', x: '28%', y: '65%', count: 145, companies: ['TechFlow', 'FinEdge', 'Reliance'] },
    { id: 'bangalore', name: 'Bangalore', x: '42%', y: '82%', count: 280, companies: ['DataScale', 'Flipkart', 'Infosys'] },
    { id: 'delhi', name: 'Delhi NCR', x: '35%', y: '32%', count: 190, companies: ['Zomato', 'Paytm', 'Oyo'] },
    { id: 'pune', name: 'Pune', x: '32%', y: '68%', count: 85, companies: ['CreativeDots', 'Tata Motors'] },
    { id: 'hyderabad', name: 'Hyderabad', x: '45%', y: '72%', count: 120, companies: ['Microsoft', 'Google', 'Amazon'] },
    { id: 'chennai', name: 'Chennai', x: '48%', y: '85%', count: 65, companies: ['TCS', 'Freshworks'] },
  ];

  const [studentProfile, setStudentProfile] = useState({
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    city: 'Mumbai',
    preferredDomain: 'Web Dev'
  });

  useEffect(() => {
    fetchInternships();
  }, [filters]);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      
      const mockInternships = [
        { 
          id: 1, title: 'C Programming Intern', company: 'SystemSoft', 
          location: 'Bangalore', mode: 'onsite', domain: 'Programming', 
          duration: 8, stipend: '₹12,000/mo', skills: ['C', 'Data Structures', 'Algorithms']
        },
        { 
          id: 2, title: 'C++ Developer Intern', company: 'GameLogic Studio', 
          location: 'Hyderabad', mode: 'hybrid', domain: 'Programming', 
          duration: 12, stipend: '₹18,000/mo', skills: ['C++', 'OOP', 'STL']
        },
        { 
          id: 3, title: 'Java Backend Intern', company: 'EnterpriseHub', 
          location: 'Mumbai', mode: 'remote', domain: 'Programming', 
          duration: 12, stipend: '₹20,000/mo', skills: ['Java', 'Spring Boot', 'Hibernate']
        },
        { 
          id: 4, title: 'Python Developer Intern', company: 'AI Innovations', 
          location: 'Delhi NCR', mode: 'remote', domain: 'Programming', 
          duration: 6, stipend: '₹25,000/mo', skills: ['Python', 'Django', 'REST APIs']
        },
        { 
          id: 5, title: 'JavaScript Developer Intern', company: 'WebCrafters', 
          location: 'Pune', mode: 'remote', domain: 'Programming', 
          duration: 8, stipend: '₹15,000/mo', skills: ['JavaScript', 'React', 'Node.js']
        },
        { 
          id: 6, title: 'SQL & Database Intern', company: 'DataVault Solutions', 
          location: 'Chennai', mode: 'onsite', domain: 'Database', 
          duration: 4, stipend: '₹10,000/mo', skills: ['SQL', 'MySQL', 'Database Design']
        },
        { 
          id: 7, title: 'Embedded Systems Intern', company: 'Larsen & Toubro (L&T)', 
          location: 'Bangalore', mode: 'onsite', domain: 'Embedded Systems', 
          duration: 12, stipend: '₹18,000/mo', skills: ['C', 'Arduino', 'Microcontrollers']
        },
        { 
          id: 8, title: 'Structural Engineer Intern', company: 'Tata Projects', 
          location: 'Pune', mode: 'onsite', domain: 'Structural Design', 
          duration: 16, stipend: '₹12,000/mo', skills: ['AutoCAD', 'STAAD.Pro', 'Steel Design']
        },
        { 
          id: 9, title: 'Mechanical Design Intern', company: 'Mahindra & Mahindra', 
          location: 'Chennai', mode: 'onsite', domain: 'CAD/CAM', 
          duration: 12, stipend: '₹15,000/mo', skills: ['SolidWorks', 'CATIA', 'ANSYS']
        },
        { 
          id: 10, title: 'Power Electronics Intern', company: 'ABB Group', 
          location: 'Hyderabad', mode: 'hybrid', domain: 'Power Systems', 
          duration: 12, stipend: '₹22,000/mo', skills: ['MATLAB', 'Circuit Design', 'PLC']
        }
      ];

      // Apply Filters
      const filtered = mockInternships.filter(intern => {
        const matchesSearch = 
          intern.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          intern.company.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesDomain = filters.domain === '' || intern.domain.includes(filters.domain);
        const matchesMode = filters.mode === '' || intern.mode === filters.mode;
        const matchesLocation = filters.location === '' || intern.location.toLowerCase().includes(filters.location.toLowerCase());

        return matchesSearch && matchesDomain && matchesMode && matchesLocation;
      });

      setInternships(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setIsApplyModalOpen(true);
  };

  const confirmApply = async () => {
    if (!currentUser) {
      toast.error("Please login to apply");
      return;
    }

    try {
      setApplying(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications`, {
        uid: currentUser.uid,
        internshipId: selectedInternship._id || selectedInternship.id, // Support both real and mock IDs
        status: 'applied',
        boostedWithReport: isBoosting
      });

      toast.success(`Applied to ${selectedInternship.company} successfully!`);
      setIsApplyModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  const calculateMatch = (internship) => {
    let score = 0;
    const matchedSkills = [];
    
    internship.skills.forEach(skill => {
      if (studentProfile.skills.includes(skill)) {
        score += 20;
        matchedSkills.push(skill);
      }
    });
    
    if (internship.domain === studentProfile.preferredDomain) score += 20;
    if (internship.mode === 'remote' || internship.location === studentProfile.city) score += 10;
    
    const finalScore = Math.min(score, 100);
    return { score: finalScore, matchedSkills };
  };

  const getBadgeColor = (score) => {
    if (score >= 80) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (score >= 60) return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Internships</h1>
              <p className="text-gray-600">Discover roles matched to your skills and goals</p>
            </div>
            <button 
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                showMap ? 'bg-brand text-white' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <MapIcon className="h-5 w-5" />
              {showMap ? 'Hide Internship Map' : 'Explore Internship Hubs'}
            </button>
          </div>

          <AnimatePresence>
            {showMap && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-brand" /> Interactive Internship Hubs (India)
                  </h3>
                  
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Map Visualization */}
                    <div className="lg:col-span-2 relative aspect-[4/5] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center group">
                      {/* Placeholder India Map Shape (Simplified) */}
                      <svg viewBox="0 0 400 500" className="w-full h-full p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                        <path d="M150,50 L250,50 L300,150 L350,250 L300,400 L200,450 L100,400 L50,250 L100,150 Z" fill="currentColor" className="text-brand" />
                      </svg>
                      
                      {/* Hotspots */}
                      {internshipHubs.map((hub) => (
                        <motion.button
                          key={hub.id}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setSelectedCity(hub)}
                          className="absolute w-4 h-4 rounded-full bg-brand shadow-[0_0_15px_rgba(79,70,229,0.5)] cursor-pointer z-10"
                          style={{ left: hub.x, top: hub.y }}
                        >
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {hub.name} ({hub.count})
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Details Panel */}
                    <div className="space-y-6">
                      {selectedCity ? (
                        <motion.div 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          key={selectedCity.id}
                          className="bg-brand/5 p-6 rounded-2xl border border-brand/10"
                        >
                          <h4 className="text-2xl font-bold text-brand">{selectedCity.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{selectedCity.count} Active Internships</p>
                          
                          <div className="mt-6">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Top Recruiters</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedCity.companies.map(c => (
                                <span key={c} className="px-3 py-1 bg-white border border-brand/20 text-brand text-xs font-bold rounded-lg shadow-sm">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => setFilters({...filters, location: selectedCity.name})}
                            className="w-full mt-8 py-3 bg-brand text-white font-bold rounded-xl shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                          >
                            Show Internships in {selectedCity.name} <ArrowRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          <MapIcon className="h-12 w-12 text-gray-300 mb-4" />
                          <p className="text-gray-500 font-medium">Select a city on the map to see local internship trends</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by title or company..."
                className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-brand focus:border-brand"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <select 
              className="border-gray-200 rounded-xl px-4 py-2 focus:ring-brand"
              value={filters.domain}
              onChange={(e) => setFilters({...filters, domain: e.target.value})}
            >
              <option value="">All Domains</option>
              <option value="Web Dev">Web Development (CSE)</option>
              <option value="Data Science">Data Science (CSE)</option>
              <option value="Embedded Systems">Embedded Systems (EEE/ECE)</option>
              <option value="Power Systems">Power Systems (EEE)</option>
              <option value="Structural Design">Structural Design (Civil)</option>
              <option value="CAD/CAM">CAD/CAM Design (Mech)</option>
              <option value="Robotics">Robotics (Mech/EEE)</option>
            </select>
            <select 
              className="border-gray-200 rounded-xl px-4 py-2 focus:ring-brand"
              value={filters.mode}
              onChange={(e) => setFilters({...filters, mode: e.target.value})}
            >
              <option value="">All Modes</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          {/* Internship Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((intern) => {
              const { score, matchedSkills } = calculateMatch(intern);
              return (
                <div key={intern.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                      <Briefcase className="h-6 w-6 text-brand" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor(score)} flex items-center gap-1 group relative cursor-help`}>
                      {score}% Match
                      <Info className="h-3 w-3" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-gray-900 text-white p-2 rounded-lg text-[10px] font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Matches: {matchedSkills.join(', ')}
                        {intern.domain === studentProfile.preferredDomain && " + Domain match"}
                        {intern.location === studentProfile.city && " + City match"}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{intern.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{intern.company}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" /> {intern.location} • <span className="capitalize ml-1">{intern.mode}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" /> {intern.duration} Weeks
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {intern.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] rounded-md border border-gray-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                    <span className="font-bold text-brand">{intern.stipend}</span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand bg-gray-50 rounded-lg">
                        <Bookmark className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleApplyClick(intern)}
                        className="px-4 py-2 bg-brand text-white text-sm font-bold rounded-lg hover:bg-brand-dark transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Apply Confirmation Modal */}
      <AnimatePresence>
        {isApplyModalOpen && selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-indigo-600 p-6 text-white relative">
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Apply for Internship</h3>
                    <p className="text-indigo-100 text-sm">{selectedInternship.company}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{selectedInternship.title}</h4>
                  <div className="flex items-center text-sm text-slate-500 gap-4">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedInternship.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedInternship.duration} Weeks</span>
                  </div>
                </div>

                {/* Resume Booster Card */}
                <div 
                  onClick={() => setIsBoosting(!isBoosting)}
                  className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer group ${
                    isBoosting 
                      ? 'border-indigo-600 bg-indigo-50/50' 
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isBoosting ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'
                    }`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-bold transition-colors ${isBoosting ? 'text-indigo-900' : 'text-slate-700'}`}>
                          AutoIntern Resume Booster
                        </h5>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isBoosting ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isBoosting && <FileCheck className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${isBoosting ? 'text-indigo-700' : 'text-slate-500'}`}>
                        Include your official Performance Report and verified skill badges to stand out to recruiters.
                      </p>
                    </div>
                  </div>
                  {isBoosting && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-indigo-100 flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest"
                    >
                      <Sparkles className="w-3 h-3" /> Increases selection chance by 45%
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => setIsApplyModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmApply}
                    disabled={applying}
                    className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {applying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Confirm Application <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                  By applying, you agree to share your profile with the recruiter
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Internships;
