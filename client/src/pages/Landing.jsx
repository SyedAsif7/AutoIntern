import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  Trophy, 
  Star,
  Users,
  Award,
  Globe,
  Zap,
  Play,
  Sparkles
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-brand via-indigo-900 to-gray-900">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Global Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/70 via-indigo-900/60 to-gray-900/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Content Container - Above Video */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between sticky top-0 bg-white/10 backdrop-blur-xl z-50 border-b border-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg">A</div>
          <span className="text-2xl font-black text-white tracking-tight">AutoIntern</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">How it works</a>
          <a href="#courses" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Courses</a>
          <a href="#testimonials" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Success Stories</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-white/90 hover:text-white transition-colors px-4 py-2">Sign In</Link>
          <Link to="/register" className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand via-indigo-900 to-gray-900">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay - Reduced Opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/70 via-indigo-900/60 to-gray-900/70" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Animated Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white text-xs font-black rounded-full uppercase tracking-widest mb-8 border border-white/20 shadow-lg">
            <Sparkles className="h-4 w-4" /> AI-Powered Career Platform
          </div>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
            Find Your Internship. <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">Prep for It. Get It.</span>
          </h1>
          <p className="max-w-2xl text-xl text-white/90 font-medium mb-12 leading-relaxed drop-shadow-lg">
            The all-in-one platform for Indian engineering students to gain certifications, build job-ready skills, and land high-paying internships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="group px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black rounded-2xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all flex items-center justify-center">
              Start Your Journey <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/courses" className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-2xl text-lg hover:bg-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-2">
              <Play className="h-5 w-5" /> Explore Courses
            </Link>
          </div>
          
          {/* Live Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { label: 'Students Joined', value: '12k+', icon: Users },
              { label: 'Active Courses', value: '45+', icon: BookOpen },
              { label: 'Certificates Issued', value: '8k+', icon: Award },
              { label: 'Hiring Partners', value: '150+', icon: Globe },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="mx-auto w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-black rounded-full uppercase tracking-widest mb-6 border border-white/20">
              Simple Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">Your Path to Success</h2>
            <p className="text-white/80 font-medium text-lg max-w-2xl mx-auto">Four simple steps to transform your career trajectory</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 via-amber-400 to-emerald-400 opacity-70" />
            
            {[
              { title: 'Find', desc: 'Browse matched internships based on your domain and skills.', icon: Briefcase, color: 'from-blue-400 to-cyan-500' },
              { title: 'Enroll', desc: 'Complete 4-8 week certification courses built for industry roles.', icon: BookOpen, color: 'from-indigo-400 to-purple-500' },
              { title: 'Track', desc: 'Maintain daily learning streaks and monitor your progress.', icon: Trophy, color: 'from-amber-400 to-orange-500' },
              { title: 'Certify', desc: 'Get verified certificates and reports to share with recruiters.', icon: Award, color: 'from-emerald-400 to-green-500' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative group">
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                    <div className={`${step.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{step.title}</h3>
                    <p className="text-white/80 font-medium text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-black rounded-full uppercase tracking-widest mb-6 border border-white/20">
                Top Courses
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">Industry-Standard Certifications</h2>
              <p className="text-white/80 font-medium text-lg leading-relaxed">
                Our courses are co-designed with hiring managers from top tech companies in India to ensure you learn exactly what recruiters are looking for.
              </p>
            </div>
            <Link to="/courses" className="group text-white font-black flex items-center hover:gap-3 transition-all text-lg">
              View all courses <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Full Stack Web Development', domain: 'Web Dev', level: 'Intermediate', duration: '8 Weeks', color: 'from-indigo-400 to-purple-500' },
              { title: 'Python & Machine Learning', domain: 'Data Science', level: 'Beginner', duration: '6 Weeks', color: 'from-emerald-400 to-teal-500' },
              { title: 'UI/UX Design Masterclass', domain: 'Design', level: 'Beginner', duration: '4 Weeks', color: 'from-amber-400 to-orange-500' },
            ].map((course, i) => (
              <div key={i} className="group bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={`h-56 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${course.color}/20`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-5">
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/20">
                      {course.domain}
                    </span>
                    <span className="text-xs font-bold text-white/70 px-3 py-1.5 rounded-xl">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-6 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-sm font-bold text-white/70 px-3 py-1.5 rounded-lg">{course.level}</span>
                    <button className="text-white font-black text-sm flex items-center gap-2 group/btn hover:text-amber-300 transition-colors">
                      Enroll Now <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-black rounded-full uppercase tracking-widest mb-6 backdrop-blur-sm">
              Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">Landed Their Dream Jobs</h2>
            <p className="text-white/80 font-medium text-lg max-w-2xl mx-auto">Join thousands of students who transformed their careers with AutoIntern</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Aditya S.', college: 'VJTI Mumbai', role: 'Frontend Intern @ TechFlow', text: 'AutoIntern helped me bridge the gap between college theory and industry practice. The certification was the reason I got shortlisted!', color: 'from-blue-500 to-cyan-500' },
              { name: 'Priya P.', college: 'COEP Pune', role: 'Product Design Intern @ Meta', text: 'The AI Roadmap generator gave me a structured path to follow. I went from zero UI/UX knowledge to a paid internship in 2 months.', color: 'from-purple-500 to-pink-500' },
              { name: 'Rahul K.', college: 'NIT Trichy', role: 'SDE Intern @ Amazon', text: 'The daily learning streak kept me consistent. The platform is incredibly intuitive and the support is top-notch.', color: 'from-emerald-500 to-green-500' },
            ].map((t, i) => (
              <div key={i} className="group bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-xl hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">
                <div className="flex gap-1.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                  ))}
                </div>
                <p className="text-lg text-white italic mb-8 leading-relaxed line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{t.name}</h4>
                    <p className="text-xs text-white/70 font-medium mt-0.5">{t.college}</p>
                    <p className="text-xs text-amber-300 font-bold mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">Join thousands of students who are already building their careers with AutoIntern.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="group px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black rounded-2xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all flex items-center justify-center">
              Get Started Free <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/courses" className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-black rounded-2xl text-lg hover:bg-white/20 transition-all">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-xl border-t border-white/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-dark text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg">A</div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">AutoIntern</span>
              </div>
              <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6 max-w-sm">
                Empowering Indian engineering students with job-ready skills and premium internship opportunities.
              </p>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                  <button key={s} className="w-10 h-10 bg-white border border-gray-200 text-gray-500 rounded-xl flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all text-sm font-bold shadow-sm">
                    {s[0]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-3 text-sm font-medium text-gray-600">
                <li><Link to="/courses" className="hover:text-brand transition-colors">Courses</Link></li>
                <li><Link to="/internships" className="hover:text-brand transition-colors">Internships</Link></li>
                <li><Link to="/prep" className="hover:text-brand transition-colors">AI Prep Tools</Link></li>
                <li><Link to="/dashboard" className="hover:text-brand transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-3 text-sm font-medium text-gray-600">
                <li><a href="#" className="hover:text-brand transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-3 text-sm font-medium text-gray-600">
                <li><a href="#" className="hover:text-brand transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium text-gray-500">© 2026 AutoIntern Platform. All rights reserved.</p>
            <div className="flex gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-brand transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand transition-colors">Terms</a>
              <a href="#" className="hover:text-brand transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Landing;
