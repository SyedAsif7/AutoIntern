import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Flame,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const Learning = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if quiz should be shown from URL parameter
  useEffect(() => {
    const quizParam = searchParams.get('quiz');
    if (quizParam === 'true') {
      setShowQuiz(true);
    }
  }, [searchParams]);

  // Mock course data for learning (Matches CourseDetail.jsx slugs)
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseDataMap = {
      'c-lang': {
        title: "C Programming Mastery",
        modules: [
          {
            weekNumber: 1,
            title: "Basics & Data Types",
            lessons: [
              { title: "Variables & Operators", videoId: "bWPMSSsVdPk", duration: "20 min", completed: true },
              { title: "Control Flow (If/Else, Loops)", videoId: "bWPMSSsVdPk", duration: "30 min", completed: true }
            ],
            quiz: {
              questions: [
                { q: "What is the size of int in C (typically)?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"], answer: "4 bytes" },
                { q: "Which symbol is used for comments in C?", options: ["//", "#", "/* */", "Both // and /* */"], answer: "Both // and /* */" }
              ]
            }
          },
          {
            weekNumber: 2,
            title: "Arrays & Functions",
            lessons: [
              { title: "1D & 2D Arrays", videoId: "bWPMSSsVdPk", duration: "25 min", completed: false },
              { title: "Function Scope & Recursion", videoId: "bWPMSSsVdPk", duration: "35 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'python-lang': {
        title: "Python for Data Science",
        modules: [
          {
            weekNumber: 1,
            title: "Python Fundamentals",
            lessons: [
              { title: "Syntax & Variables", videoId: "bWPMSSsVdPk", duration: "15 min", completed: true },
              { title: "Lists, Tuples, Dicts", videoId: "bWPMSSsVdPk", duration: "25 min", completed: false }
            ],
            quiz: {
              questions: [
                { q: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: "Tuple" }
              ]
            }
          }
        ]
      },
      'full-stack-web-dev': {
        title: "Full Stack Web Development",
        modules: [
          {
            weekNumber: 1,
            title: "Frontend Foundations",
            lessons: [
              { title: "HTML5 & Semantic Web", videoId: "bWPMSSsVdPk", duration: "15 min", completed: true },
              { title: "Modern CSS & Tailwind", videoId: "bWPMSSsVdPk", duration: "25 min", completed: true }
            ],
            quiz: {
              questions: [
                { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Machine Language", "None"], answer: "HyperText Markup Language" },
                { q: "Which CSS property is used to change text color?", options: ["font-color", "text-color", "color", "bgcolor"], answer: "color" }
              ]
            }
          }
        ]
      },
      'cpp-lang': {
        title: "C++ Object-Oriented Programming",
        modules: [
          {
            weekNumber: 1,
            title: "C++ Foundations",
            lessons: [
              { title: "Classes & Objects", videoId: "bWPMSSsVdPk", duration: "30 min", completed: false },
              { title: "Constructors & Destructors", videoId: "bWPMSSsVdPk", duration: "25 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'java-lang': {
        title: "Java Backend Development",
        modules: [
          {
            weekNumber: 1,
            title: "Java OOP Basics",
            lessons: [
              { title: "Inheritance & Interfaces", videoId: "bWPMSSsVdPk", duration: "40 min", completed: false },
              { title: "Collections Framework", videoId: "bWPMSSsVdPk", duration: "45 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'javascript-lang': {
        title: "JavaScript Foundations",
        modules: [
          {
            weekNumber: 1,
            title: "JS Core Concepts",
            lessons: [
              { title: "Promises & Async/Await", videoId: "bWPMSSsVdPk", duration: "35 min", completed: false },
              { title: "ES6+ Features", videoId: "bWPMSSsVdPk", duration: "30 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'sql-lang': {
        title: "SQL Database Mastery",
        modules: [
          {
            weekNumber: 1,
            title: "SQL Fundamentals",
            lessons: [
              { title: "Joins & Aggregations", videoId: "bWPMSSsVdPk", duration: "40 min", completed: false },
              { title: "Database Normalization", videoId: "bWPMSSsVdPk", duration: "35 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'iot-embedded': {
        title: "IoT & Embedded Systems",
        modules: [
          {
            weekNumber: 1,
            title: "Electronics & Arduino",
            lessons: [
              { title: "Microcontroller Basics", videoId: "bWPMSSsVdPk", duration: "45 min", completed: false },
              { title: "Cloud Integration", videoId: "bWPMSSsVdPk", duration: "50 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'autocad-civil': {
        title: "AutoCAD & Revit for Civil Engineers",
        modules: [
          {
            weekNumber: 1,
            title: "Civil Design Basics",
            lessons: [
              { title: "2D Drafting Foundations", videoId: "bWPMSSsVdPk", duration: "50 min", completed: false },
              { title: "BIM Modeler Overview", videoId: "bWPMSSsVdPk", duration: "55 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      },
      'solidworks-mech': {
        title: "SolidWorks Masterclass",
        modules: [
          {
            weekNumber: 1,
            title: "Mechanical CAD Design",
            lessons: [
              { title: "3D Part Modeling", videoId: "bWPMSSsVdPk", duration: "60 min", completed: false },
              { title: "Assembly & FEA", videoId: "bWPMSSsVdPk", duration: "60 min", completed: false }
            ],
            quiz: { questions: [] }
          }
        ]
      }
    };

    setTimeout(() => {
      // Use enrollmentId as slug for demo
      setCourse(courseDataMap[enrollmentId] || courseDataMap['full-stack-web-dev']);
      setLoading(false);
    }, 1000);
  }, [enrollmentId]);

  const handleLessonComplete = () => {
    toast.success('Lesson marked as complete!');
    // Logic to update progress
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    
    // Simulate quiz submission with API call
    setTimeout(() => {
      setQuizSubmitted(true);
      toast.success('Quiz submitted successfully! Score: 100% 🎉');
      
      // Navigate to next challenge after a brief delay
      setTimeout(() => {
        // Try to go to next module or lesson
        const nextModule = activeModule + 1;
        if (nextModule < course.modules.length && course.modules[nextModule].lessons.length > 0) {
          // Go to first lesson of next module
          setActiveModule(nextModule);
          setActiveLesson(0);
          setShowQuiz(false);
          navigate(`/learning/${enrollmentId}`);
        } else {
          // If no next module, go back to course overview
          navigate(`/dashboard`);
        }
      }, 2000);
    }, 500);
  };

  if (loading) return <div>Loading...</div>;

  const currentModule = course.modules[activeModule];
  const currentLesson = currentModule.lessons[activeLesson];

  // Calculate actual progress
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => 
    acc + m.lessons.filter(l => l.completed).length, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{course.title}</h1>
              <p className="text-xs text-gray-500 font-medium">Week {currentModule.weekNumber}: {currentModule.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
                </div>
                <span className="text-xs font-bold text-gray-700">{progressPercentage}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl border border-orange-100">
              <Flame className="h-4 w-4 fill-orange-500" />
              <span className="text-sm font-bold tracking-tight">5 Day Streak</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Player Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
            {!showQuiz ? (
              <>
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100/20 border-8 border-white group relative">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                    title="Course Lesson"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{currentLesson.title}</h2>
                    <p className="text-gray-500 font-medium mt-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2" /> {currentLesson.duration} • Video Lesson
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 md:flex-none px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" /> Notes
                    </button>
                    <button 
                      onClick={handleLessonComplete}
                      className="flex-1 md:flex-none px-8 py-3 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-brand-dark transition-all text-sm flex items-center justify-center"
                    >
                      Mark as Complete <CheckCircle2 className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">About this lesson</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      In this lesson, we'll cover the fundamental concepts of {currentLesson.title}. You'll learn the best practices and see real-world examples of how to implement these features in your projects. We'll also discuss common pitfalls and how to avoid them.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center gap-3 text-sm font-bold text-brand hover:underline">
                          <FileText className="h-4 w-4" /> Lesson Slides (PDF)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 text-sm font-bold text-brand hover:underline">
                          <ExternalLink className="h-4 w-4" /> Official Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 text-sm font-bold text-brand hover:underline">
                          <Play className="h-4 w-4" /> Supplementary Video
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="max-w-3xl mx-auto py-10">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">Weekly Quiz: {currentModule.title}</h2>
                  <p className="text-gray-500 mt-2">Test your knowledge from this week's lessons.</p>
                </div>

                <form onSubmit={handleQuizSubmit} className="space-y-8">
                  {currentModule.quiz.questions && currentModule.quiz.questions.length > 0 ? (
                    currentModule.quiz.questions.map((q, i) => (
                      <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Question {i+1}</p>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">{q.q}</h4>
                        <div className="space-y-3">
                          {q.options.map((opt, oi) => (
                            <label key={oi} className="flex items-center p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all group">
                              <input type="radio" name={`q${i}`} className="w-5 h-5 text-brand focus:ring-brand border-gray-300" required />
                              <span className="ml-4 text-gray-700 font-medium group-hover:text-gray-900">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 text-center">
                      <p className="text-amber-700 font-medium">This quiz has no questions yet. Check back soon!</p>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={quizSubmitted}
                    className={`w-full py-5 font-black rounded-3xl text-lg transition-all shadow-2xl shadow-indigo-100 ${
                      quizSubmitted 
                        ? 'bg-emerald-500 text-white cursor-not-allowed' 
                        : 'bg-brand text-white hover:bg-brand-dark hover:-translate-y-0.5'
                    }`}
                  >
                    {quizSubmitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-6 w-6" /> Submitted Successfully!
                      </span>
                    ) : (
                      'Submit Quiz'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Playlist */}
          <div className="w-full lg:w-[400px] bg-white border-l border-gray-100 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Course Curriculum</h3>
              <span className="text-xs font-bold text-brand uppercase tracking-widest">{course.modules.length} Weeks</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {course.modules.map((module, mi) => (
                <div key={mi} className="border-b border-gray-50">
                  <button 
                    onClick={() => setActiveModule(mi)}
                    className={`w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all ${activeModule === mi ? 'bg-indigo-50/50 border-l-4 border-brand' : ''}`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${activeModule === mi ? 'bg-brand text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-400'}`}>
                        W{module.weekNumber}
                      </span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{module.title}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{module.lessons.length} Lessons</p>
                      </div>
                    </div>
                    {activeModule === mi ? <ChevronUp className="h-5 w-5 text-brand" /> : <ChevronDown className="h-5 w-5 text-gray-300" />}
                  </button>
                  
                  {activeModule === mi && (
                    <div className="bg-white/50 px-2 pb-4 space-y-1">
                      {module.lessons.map((lesson, li) => (
                        <button
                          key={li}
                          onClick={() => {
                            setActiveLesson(li);
                            setShowQuiz(false);
                          }}
                          className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all ${activeLesson === li && !showQuiz ? 'bg-brand/5 text-brand' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-100 text-gray-400'}`}>
                            {lesson.completed ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-3 w-3 fill-current" />}
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-xs font-bold leading-tight">{lesson.title}</p>
                            <p className="text-[10px] font-medium opacity-60 mt-1">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                      {module.quiz && (
                        <button 
                          onClick={() => setShowQuiz(true)}
                          className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all ${showQuiz ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${quizSubmitted ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                            {quizSubmitted ? <CheckCircle2 className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />}
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold leading-tight">Weekly Quiz</p>
                            <p className="text-[10px] font-medium opacity-60 mt-1">2 Questions</p>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learning;
