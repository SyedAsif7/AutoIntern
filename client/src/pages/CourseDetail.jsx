import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  FileText, 
  HelpCircle,
  Users,
  Star,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // Detailed Course Data Map
    const courseData = {
      'c-lang': {
        title: "C Programming Mastery",
        domain: "Programming",
        duration: 4,
        level: "Beginner",
        industryRole: "System Software Developer / Firmware Engineer",
        description: "Master the foundation of modern computing. Learn memory management, pointers, and data structures in C to build high-performance systems.",
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
        enrolled: 1200,
        rating: 4.7,
        modules: [
          { weekNumber: 1, title: "Basics & Data Types", lessons: [{ title: "Variables & Operators", duration: "20 min" }, { title: "Control Flow (If/Else, Loops)", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Arrays & Functions", lessons: [{ title: "1D & 2D Arrays", duration: "25 min" }, { title: "Function Scope & Recursion", duration: "35 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Pointers & Memory", lessons: [{ title: "Pointer Arithmetic", duration: "40 min" }, { title: "Dynamic Memory Allocation", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Structures & File I/O", lessons: [{ title: "Custom Data Types", duration: "25 min" }, { title: "File Handling", duration: "20 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Understand low-level memory management", "Build robust command-line applications", "Strong foundation for C++ and Java", "Verified C Certification"]
      },
      'python-lang': {
        title: "Python for Data Science",
        domain: "Programming",
        duration: 6,
        level: "Beginner",
        industryRole: "Data Analyst / ML Engineer / Automation Specialist",
        description: "The most popular language for AI and Data Science. Start from zero and build real-world automation scripts and data models.",
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        enrolled: 3500,
        rating: 4.9,
        modules: [
          { weekNumber: 1, title: "Python Fundamentals", lessons: [{ title: "Syntax & Variables", duration: "15 min" }, { title: "Lists, Tuples, Dicts", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Functional Programming", lessons: [{ title: "Lambda Functions", duration: "20 min" }, { title: "List Comprehensions", duration: "20 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "OOP in Python", lessons: [{ title: "Classes & Inheritance", duration: "35 min" }, { title: "Decorators", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Data Handling", lessons: [{ title: "Pandas Basics", duration: "45 min" }, { title: "NumPy Arrays", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 5, title: "Visualization", lessons: [{ title: "Matplotlib & Seaborn", duration: "40 min" }], quiz: true, assignment: true },
          { weekNumber: 6, title: "Final Project", lessons: [{ title: "Building a Data Dashboard", duration: "60 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Automate repetitive tasks with Python", "Analyze large datasets using Pandas", "Build basic Machine Learning models", "Verified Python Certification"]
      },
      'java-lang': {
        title: "Java Backend Development",
        domain: "Programming",
        duration: 8,
        level: "Intermediate",
        industryRole: "Backend Developer / Software Engineer (Enterprise)",
        description: "Build enterprise-grade applications with Java. Learn OOP deeply, multi-threading, and Spring Boot architecture.",
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        enrolled: 2100,
        rating: 4.9,
        modules: [
          { weekNumber: 1, title: "Java OOP Basics", lessons: [{ title: "Classes & Objects", duration: "30 min" }, { title: "Encapsulation", duration: "20 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Inheritance & Interfaces", lessons: [{ title: "Abstract Classes", duration: "35 min" }, { title: "Polymorphism", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Collections Framework", lessons: [{ title: "ArrayList & HashMap", duration: "40 min" }, { title: "Generics", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Exception Handling", lessons: [{ title: "Try-Catch Blocks", duration: "25 min" }, { title: "Custom Exceptions", duration: "20 min" }], quiz: true, assignment: true },
          { weekNumber: 5, title: "Java Streams API", lessons: [{ title: "Lambda Expressions", duration: "30 min" }, { title: "Functional Interfaces", duration: "35 min" }], quiz: true, assignment: true },
          { weekNumber: 6, title: "Multithreading", lessons: [{ title: "Thread Life Cycle", duration: "40 min" }, { title: "Synchronization", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 7, title: "JDBC & Databases", lessons: [{ title: "Connecting to MySQL", duration: "45 min" }], quiz: true, assignment: true },
          { weekNumber: 8, title: "Spring Boot Intro", lessons: [{ title: "Creating REST APIs", duration: "60 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Master Object-Oriented Programming", "Build multi-threaded applications", "Create REST APIs with Spring Boot", "Verified Java Certification"]
      },
      'autocad-civil': {
        title: "AutoCAD & Revit for Civil Engineers",
        domain: "Civil",
        duration: 4,
        level: "Beginner",
        industryRole: "Draftsman / Site Engineer / BIM Modeler",
        description: "Essential design tools for Civil Engineering. Learn 2D drafting, site planning, and 3D building modeling.",
        thumbnail: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&w=800&q=80',
        enrolled: 420,
        rating: 4.7,
        modules: [
          { weekNumber: 1, title: "AutoCAD 2D Drafting", lessons: [{ title: "Draw & Modify Tools", duration: "40 min" }, { title: "Layers & Annotation", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Civil Plan Design", lessons: [{ title: "Floor Plans & Sections", duration: "50 min" }, { title: "Site Layouts", duration: "45 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Revit 3D Modeling", lessons: [{ title: "Walls, Doors & Windows", duration: "45 min" }, { title: "Roof & Floor Design", duration: "40 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Rendering & Walkthrough", lessons: [{ title: "Material Mapping", duration: "35 min" }, { title: "Final Project Presentation", duration: "60 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Professional 2D Civil Drafting", "3D Building Information Modeling (BIM)", "Create high-quality renders", "Verified AutoCAD Certification"]
      },
      'solidworks-mech': {
        title: "SolidWorks Masterclass",
        domain: "Mech",
        duration: 6,
        level: "Intermediate",
        industryRole: "Design Engineer / R&D Specialist / Production Planner",
        description: "Industry-standard 3D CAD software. Design complex mechanical parts, assemblies, and perform simulations.",
        thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
        enrolled: 580,
        rating: 4.6,
        modules: [
          { weekNumber: 1, title: "Sketching Basics", lessons: [{ title: "Geometric Relations", duration: "30 min" }, { title: "Dimensions & Constraints", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Part Modeling I", lessons: [{ title: "Extrude & Revolve", duration: "40 min" }, { title: "Sweeps & Lofts", duration: "45 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Part Modeling II", lessons: [{ title: "Fillets, Chamfers & Shell", duration: "30 min" }, { title: "Patterning", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Assembly Design", lessons: [{ title: "Mates & Constraints", duration: "50 min" }, { title: "Exploded Views", duration: "35 min" }], quiz: true, assignment: true },
          { weekNumber: 5, title: "Engineering Drawings", lessons: [{ title: "BOM & Annotations", duration: "40 min" }], quiz: true, assignment: true },
          { weekNumber: 6, title: "Simulation Intro", lessons: [{ title: "Static Stress Analysis", duration: "55 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Design complex 3D mechanical parts", "Build multi-component assemblies", "Perform basic FEA simulations", "Verified SolidWorks Certification"]
      },
      'full-stack-web-dev': {
        title: "Full Stack Web Development",
        domain: "CSE",
        duration: 8,
        level: "Intermediate",
        industryRole: "Full Stack Developer / React Engineer / Node.js Backend Developer",
        description: "Master React, Node.js, and MongoDB in this intensive 8-week certification course. Build production-ready MERN applications.",
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        enrolled: 1240,
        rating: 4.8,
        modules: [
          { weekNumber: 1, title: "Frontend Foundations", lessons: [{ title: "HTML5 & Semantic Web", duration: "15 min" }, { title: "Modern CSS & Tailwind", duration: "25 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "React Mastery", lessons: [{ title: "React Hooks & State", duration: "30 min" }, { title: "Context API", duration: "20 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Advanced React", lessons: [{ title: "Custom Hooks", duration: "25 min" }, { title: "Performance Optimization", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Backend with Node.js", lessons: [{ title: "Express Server Setup", duration: "25 min" }, { title: "REST API Design", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 5, title: "Database Design", lessons: [{ title: "MongoDB Schema", duration: "35 min" }, { title: "Aggregation Pipelines", duration: "40 min" }], quiz: true, assignment: true },
          { weekNumber: 6, title: "Authentication", lessons: [{ title: "JWT & Firebase Auth", duration: "45 min" }], quiz: true, assignment: true },
          { weekNumber: 7, title: "Deployment", lessons: [{ title: "CI/CD Pipelines", duration: "30 min" }, { title: "Docker Basics", duration: "40 min" }], quiz: true, assignment: true },
          { weekNumber: 8, title: "Capstone Project", lessons: [{ title: "Real-time E-commerce App", duration: "120 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Build scalable full-stack applications", "Master modern state management", "Deploy apps to production", "Verified Certification"]
      },
      'iot-embedded': {
        title: "IoT & Embedded Systems",
        domain: "EEE/ECE",
        duration: 6,
        level: "Beginner",
        industryRole: "IoT Developer / Embedded Engineer / Automation Tech",
        description: "Bridge the gap between hardware and software. Learn to build smart devices using Arduino, ESP32, and Python.",
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        enrolled: 860,
        rating: 4.9,
        modules: [
          { weekNumber: 1, title: "Electronics Basics", lessons: [{ title: "Circuit Components", duration: "30 min" }, { title: "Multimeter & Testing", duration: "20 min" }], quiz: true, assignment: true },
          { weekNumber: 2, title: "Microcontrollers", lessons: [{ title: "Arduino Programming", duration: "40 min" }, { title: "Digital/Analog I/O", duration: "35 min" }], quiz: true, assignment: true },
          { weekNumber: 3, title: "Sensors & Actuators", lessons: [{ title: "Interfacing Sensors", duration: "45 min" }, { title: "Motor Control", duration: "30 min" }], quiz: true, assignment: true },
          { weekNumber: 4, title: "Wireless Protocols", lessons: [{ title: "Bluetooth & WiFi", duration: "40 min" }, { title: "MQTT Protocol", duration: "35 min" }], quiz: true, assignment: true },
          { weekNumber: 5, title: "Cloud Integration", lessons: [{ title: "IoT Dashboards", duration: "50 min" }], quiz: true, assignment: true },
          { weekNumber: 6, title: "Smart Home Project", lessons: [{ title: "Building a Connected Device", duration: "90 min" }], quiz: true, assignment: true }
        ],
        outcomes: ["Design smart hardware systems", "Program embedded microcontrollers", "Connect devices to the cloud", "Verified IoT Certification"]
      }
    };

    // Default Fallback
    const defaultCourse = {
      title: "Full Stack Web Development",
      domain: "Web Dev",
      duration: 8,
      level: "Intermediate",
      description: "Master React, Node.js, and MongoDB in this intensive 8-week certification course designed for engineering students.",
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      enrolled: 1240,
      rating: 4.8,
      modules: [
        { weekNumber: 1, title: "Frontend Foundations", lessons: [{ title: "HTML5 & Semantic Web", duration: "15 min" }, { title: "Modern CSS & Tailwind", duration: "25 min" }], quiz: true, assignment: true },
        { weekNumber: 2, title: "React Mastery", lessons: [{ title: "React Hooks & State", duration: "30 min" }, { title: "Context API", duration: "20 min" }], quiz: true, assignment: true },
        { weekNumber: 3, title: "Backend with Node.js", lessons: [{ title: "Express Server Setup", duration: "25 min" }, { title: "REST API Design", duration: "30 min" }], quiz: true, assignment: true },
        { weekNumber: 4, title: "Database & Auth", lessons: [{ title: "MongoDB Schema", duration: "35 min" }, { title: "Firebase Auth", duration: "25 min" }], quiz: true, assignment: true }
      ],
      outcomes: ["Build scalable full-stack applications", "Master modern state management", "Deploy apps to production", "Verified Certification"]
    };

    setTimeout(() => {
      setCourse(courseData[slug] || defaultCourse);
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleEnroll = async () => {
    setEnrolling(true);
    // Mock enrollment logic
    setTimeout(() => {
      toast.success('Successfully enrolled!');
      navigate('/dashboard');
      setEnrolling(false);
    }, 1500);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-brand text-xs font-black uppercase tracking-widest rounded-lg">{course.domain}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-black uppercase tracking-widest rounded-lg">{course.level}</span>
                {course.industryRole && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-lg">Target: {course.industryRole}</span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-brand rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Duration</p>
                    <p className="text-sm font-bold text-gray-900">{course.duration} Weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Enrolled</p>
                    <p className="text-sm font-bold text-gray-900">{course.enrolled}+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Rating</p>
                    <p className="text-sm font-bold text-gray-900">{course.rating}/5</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full md:w-auto px-10 py-5 bg-brand text-white font-black rounded-2xl text-lg shadow-2xl shadow-indigo-200 hover:bg-brand-dark hover:-translate-y-1 transition-all flex items-center justify-center"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'} <Zap className="h-5 w-5 ml-2 fill-white" />
              </button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 border-8 border-white group relative cursor-pointer">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white text-white">
                    <Play className="h-8 w-8 fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Curriculum */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black text-gray-900">Course Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 bg-gray-50/50 flex items-center justify-between border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 bg-white border border-gray-200 text-brand rounded-xl flex items-center justify-center font-black text-sm">W{module.weekNumber}</span>
                        <h3 className="font-bold text-gray-900">{module.title}</h3>
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{module.lessons.length} Lessons</span>
                    </div>
                    <div className="p-6 space-y-4">
                      {module.lessons.map((lesson, li) => (
                        <div key={li} className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-3">
                            <Play className="h-4 w-4 text-gray-400" />
                            {lesson.title}
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase">{lesson.duration}</span>
                        </div>
                      ))}
                      <div className="pt-4 flex gap-4">
                        <div className="flex items-center text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-50 px-2 py-1 rounded-lg">
                          <HelpCircle className="h-3 w-3 mr-1" /> Weekly Quiz
                        </div>
                        <div className="flex items-center text-[10px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">
                          <FileText className="h-3 w-3 mr-1" /> Assignment
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-gray-900 mb-6">What you'll learn</h3>
                <div className="space-y-4">
                  {course.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
                <Award className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2 tracking-tight">Verified Certificate</h3>
                <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-6">
                  Get a blockchain-verified certificate upon successful completion to boost your LinkedIn profile and resume.
                </p>
                <div className="w-full h-1 bg-white/20 rounded-full mb-6"></div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Industry Recognized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
