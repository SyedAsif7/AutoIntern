import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Calendar, 
  BookOpen, 
  Clock, 
  Download, 
  FileText, 
  Award,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Flame,
  Star,
  Zap,
  Target,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SampleReport = () => {
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [downloadingCert, setDownloadingCert] = useState(false);

  const handleDownload = async (type) => {
    const isCert = type === 'certificate';
    const loadingToast = toast.loading(`Preparing your premium ${isCert ? 'certificate' : 'performance report'}...`);
    
    isCert ? setDownloadingCert(true) : setDownloadingReport(true);
    
    const sampleId = 'sample-syed-asif';
    // Corrected endpoint mapping for premium downloads
    const endpoint = isCert ? `/api/enrollments/${sampleId}/certificate` : `/api/enrollments/${sampleId}/report/pdf`;

    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        method: 'GET',
        responseType: 'blob',
        timeout: 15000 // Added timeout for PDF generation
      });

      // Create a blob from the response data with explicit type
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      // Use clean filenames for the downloaded system
      const filename = isCert ? `AutoIntern_Certificate_Syed_Asif.pdf` : `AutoIntern_Report_Syed_Asif.pdf`;
      link.setAttribute('download', filename);
      
      // Essential for some browsers to trigger download properly
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 150);
      
      toast.success(`${isCert ? 'Certificate' : 'Report'} downloaded successfully!`, { id: loadingToast });
    } catch (err) {
      console.error('Download error:', err);
      const errorMessage = err.code === 'ECONNABORTED' 
        ? "Generation took too long. Please try again." 
        : "Failed to download. Ensure the backend server is active.";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      isCert ? setDownloadingCert(false) : setDownloadingReport(false);
    }
  };

  const report = {
    student: { 
      name: "Syed Asif",
      email: "syedgaffarsyedrajjak1@gmail.com",
      college: "Engineering College", 
      branch: "Computer Engineering"
    },
    course: { 
      title: "Full Stack Web Development", 
      domain: "Web Dev", 
      duration: 8, 
      level: "Intermediate",
      certificateId: "AIC-2026-SA-0042"
    },
    performance: {
      overallScore: 96,
      totalLessonsCompleted: 45,
      totalTimeSpentHours: 72,
      assignmentsSubmitted: 12,
      assignmentsTotal: 12,
      consistencyScore: 98,
      grade: 'A+',
      quizAverage: 94,
      projectScore: 98
    },
    weeklyData: [85, 88, 92, 89, 95, 93, 97, 96],
    dailyActivity: [45, 60, 75, 50, 135, 60, 165, 75, 60, 105, 60, 75, 90, 135],
    skills: [
      'React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 
      'Firebase', 'REST APIs', 'System Design', 'Git & GitHub',
      'JavaScript ES6+', 'Responsive Design'
    ],
    achievements: [
      'Top 2% Performer',
      'Perfect Assignment Streak',
      'Quiz Master',
      'Fast Learner'
    ],
    recommendation: "Syed Asif has demonstrated exceptional mastery in full-stack development with outstanding performance across all modules. His consistent dedication, perfect assignment submission record, and high quiz scores place him in the top 2% of candidates. He shows particular strength in React.js architecture and backend system design. Highly recommended for SDE-1 or Full Stack Developer roles at leading tech companies."
  };

  const lineData = {
    labels: report.weeklyData.map((_, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'Performance Score',
      data: report.weeklyData,
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4f46e5',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
    }]
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Minutes Spent',
      data: report.dailyActivity,
      backgroundColor: '#4f46e5',
      borderRadius: 8,
      hoverBackgroundColor: '#4338ca',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <Home className="w-4 h-4" />
          Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-md">Official Report</span>
                <span className="text-slate-400 text-xs font-medium">Generated on March 28, 2026</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{report.student.name}</h1>
              <p className="text-slate-500 font-medium text-sm">{report.student.email}</p>
              <p className="text-slate-500 font-medium">{report.course.title} • {report.course.level}</p>
              <p className="text-slate-400 text-xs font-bold mt-1">Certificate ID: {report.course.certificateId}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => handleDownload('report')}
              disabled={downloadingReport}
              className="flex items-center px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm shadow-sm disabled:opacity-50"
            >
              {downloadingReport ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              PDF Report
            </button>
            <Link 
              to="/sample-certificate"
              className="flex-1 py-3 bg-white border-2 border-indigo-100 text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <Award className="h-5 w-5" /> Professional Certificate
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Score Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Overall Score', value: `${report.performance.overallScore}%`, icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Final Grade', value: report.performance.grade, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Consistency', value: `${report.performance.consistencyScore}%`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Time Spent', value: `${report.performance.totalTimeSpentHours}h`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Quiz Average', value: `${report.performance.quizAverage}%`, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Project Score', value: `${report.performance.projectScore}%`, icon: Award, color: 'text-pink-600', bg: 'bg-pink-50' },
                { label: 'Lessons Done', value: report.performance.totalLessonsCompleted, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Assignments', value: `${report.performance.assignmentsSubmitted}/${report.performance.assignmentsTotal}`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <Icon className={`w-6 h-6 ${stat.color} mb-4`} />
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Performance Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Weekly Performance</h3>
                  <p className="text-sm text-slate-500">Academic progress over the 8-week program</p>
                </div>
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="h-64">
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Learning Consistency</h3>
                  <p className="text-sm text-slate-500">Minutes spent per day over the last 14 days</p>
                </div>
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="h-64">
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            {/* Skills Acquired */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" /> Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8 rounded-3xl border border-amber-200 shadow-lg shadow-amber-100/50">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" /> Achievements & Honors
              </h3>
              <div className="space-y-3">
                {report.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-amber-200">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Performance Ranking</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Top Performer Status</span>
                  <span className="text-lg font-black text-amber-600">Top 2%</span>
                </div>
                <div className="mt-2 w-full bg-amber-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">AutoIntern Mentor Review</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-8 italic">
                  "{report.recommendation}"
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-lg">
                  Explore Matched Internships <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Affiliation */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Official Affiliation</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <FileText className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{report.student.college}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{report.student.branch}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleReport;
