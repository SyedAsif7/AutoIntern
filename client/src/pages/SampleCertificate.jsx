import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Award, ShieldCheck, MapPin, Calendar, Globe, User, Briefcase, CheckCircle2, ArrowLeft, Home } from 'lucide-react';

const SampleCertificate = () => {
  const { currentUser } = useAuth();

  // Get student data from Profile persistence logic
  const getStudentName = () => {
    const storageKey = currentUser ? `profileData_${currentUser.uid}` : 'profileData';
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed.name;
    }
    return currentUser?.displayName || "Student Name";
  };

  const studentName = getStudentName();
  const certId = `AIC-2026-${studentName.split(' ').map(n => n[0]).join('')}-0042`;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-10 font-serif">
      {/* Navigation Bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-700 hover:text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-700 hover:text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Home className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="max-w-[1100px] w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden p-1 border-[12px] border-slate-50">
        
        {/* Main Background with subtle pattern */}
        <div className="absolute inset-0 bg-[#fffdfa] opacity-50" style={{ backgroundImage: 'radial-gradient(#e2e8f0 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        {/* Intricate Outer Border (Double Line) */}
        <div className="absolute inset-2 border-[1px] border-slate-300" />
        <div className="absolute inset-4 border-[3px] border-double border-indigo-900/20" />
        
        {/* Decorative Corners (Ornate) */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-900 fill-current">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-900 fill-current">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>

        {/* Central Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <h1 className="text-[18rem] font-black uppercase rotate-[-30deg] tracking-widest text-indigo-900">VERIFIED</h1>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 p-10 md:p-16 text-center">
          
          {/* Official Header */}
          <div className="flex justify-between items-start mb-12">
            <div className="text-left flex items-center gap-4">
              {/* Logo */}
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <div className="relative">
                  <Briefcase className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tighter font-sans leading-none">AutoIntern</h1>
                <p className="text-[10px] text-slate-400 font-sans font-bold tracking-[0.3em] uppercase mt-1">Accelerating Engineering Careers</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end pt-2">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Globe className="w-3 h-3" />
                <span className="text-[10px] font-bold font-sans tracking-widest">VERIFIED CREDENTIAL</span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">ID: {certId}</p>
              <p className="text-[9px] font-mono text-slate-300 mt-1">{currentUser?.email || 'student@example.com'}</p>
            </div>
          </div>
          <div className="mb-14 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 opacity-[0.03] text-8xl font-black text-indigo-900 select-none whitespace-nowrap uppercase">
              Official Credential
            </div>
            <h2 className="text-5xl font-bold text-slate-800 tracking-tight font-sans uppercase mb-2">
              Professional Certification
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-indigo-600" />
              <Award className="w-6 h-6 text-indigo-600" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-indigo-600" />
            </div>
          </div>

          {/* Award Text */}
          <div className="space-y-6 mb-12">
            <p className="text-xl text-slate-500 font-medium italic">
              Upon successful evaluation of project work and academic assessments,
              this official certification is hereby awarded to:
            </p>

            <div className="relative inline-block px-12 py-4">
              <div className="absolute inset-0 bg-indigo-50/30 -skew-x-12 rounded-lg" />
              <h3 className="text-6xl font-black text-slate-900 tracking-tight relative z-10">{studentName}</h3>
            </div>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-8">
              In recognition of the exceptional mastery, technical proficiency, and successful completion 
              of the intensive, industry-aligned career acceleration program for:
            </p>
            
            <div className="py-6 border-y border-slate-100 my-8">
              <h4 className="text-3xl font-black text-indigo-900 tracking-tight uppercase font-sans">
                Full Stack Web Development
              </h4>
              <p className="text-sm font-bold text-indigo-600 mt-2 tracking-widest uppercase">
                Industry-Verified Specialized Track
              </p>
            </div>

            <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm leading-relaxed italic">
              "This candidate has demonstrated the core competencies, practical skills, and rigorous 
              problem-solving abilities required for high-impact engineering roles."
            </p>
          </div>

          {/* Verification & Footnote Grid */}
          <div className="grid grid-cols-3 items-center gap-10 mt-20 border-t border-slate-100 pt-12">
            
            {/* Left: Validation */}
            <div className="text-left flex items-start gap-4">
              <div className="w-20 h-20 bg-white p-1 border-2 border-slate-100 rounded-lg shadow-sm group">
                {/* Mock QR */}
                <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center p-1.5 overflow-hidden">
                   <div className="grid grid-cols-5 gap-0.5 w-full h-full">
                      {[...Array(25)].map((_, i) => (
                        <div key={i} className={`bg-white rounded-[1px] ${Math.random() > 0.4 ? 'opacity-100' : 'opacity-10'}`} />
                      ))}
                   </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Security Verification</p>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Scan the QR code to verify this certificate's authenticity on our official portal.
                </p>
                <div className="flex items-center gap-1 text-[9px] text-indigo-600 font-bold mt-2">
                  <Globe className="w-2 h-2" />
                  <span>verify.autointern.com</span>
                </div>
              </div>
            </div>

            {/* Center: Gold Seal */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Sunburst effect */}
                <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full scale-150 animate-pulse" />
                <div className="w-24 h-24 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-4 border-amber-200/50 relative z-10">
                  <div className="absolute inset-1 border border-amber-100/30 rounded-full" />
                  <div className="text-center">
                    <ShieldCheck className="w-10 h-10 text-white drop-shadow-md" />
                  </div>
                </div>
                {/* Ribbon effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-0">
                  <div className="w-4 h-12 bg-indigo-900 rounded-b-sm shadow-md" />
                  <div className="w-4 h-12 bg-indigo-900 rounded-b-sm shadow-md" />
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-800 mt-8 tracking-widest uppercase">Certified Program</p>
            </div>

            {/* Right: Official Signature */}
            <div className="text-center flex flex-col items-center">
              <div className="w-48 relative">
                {/* Digital Signature line */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 opacity-70">
                   <svg viewBox="0 0 200 60" className="w-full h-full">
                      <path d="M10,40 Q30,20 50,40 T90,40 T130,20 T170,40" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                   </svg>
                </div>
                <div className="w-full border-b-2 border-slate-200 pb-2 mb-2 italic text-slate-400 font-medium text-xs">
                  Authorized Signatory
                </div>
                <p className="text-sm font-black text-slate-800 font-sans tracking-tight">Director, AutoIntern</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified & Authenticated</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleCertificate;
