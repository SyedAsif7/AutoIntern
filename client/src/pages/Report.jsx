import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import axios from 'axios';
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
  Loader2
} from 'lucide-react';
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

const Report = () => {
  const { enrollmentId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  useEffect(() => {
    // Mock fetching report
    setTimeout(() => {
      setReport({
        student: { name: "Aditya Sharma", college: "VJTI Mumbai", branch: "Computer Engineering" },
        course: { title: "Full Stack Web Development", domain: "Web Dev", duration: 8, level: "Intermediate" },
        performance: {
          overallScore: 92,
          totalLessonsCompleted: 24,
          totalTimeSpentHours: 48,
          assignmentsSubmitted: 8,
          assignmentsTotal: 8,
          consistencyScore: 95,
          grade: 'A+'
        },
        weeklyData: [85, 90, 88, 95, 92, 94, 96, 92],
        dailyActivity: [20, 45, 60, 30, 90, 45, 120, 60, 45, 90, 30, 45, 60, 90],
        skills: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Firebase', 'REST APIs'],
        recommendation: "Excellent performance in React development. Recommended for Frontend Internship roles at top-tier startups."
      });
      setLoading(false);
    }, 1000);
  }, [enrollmentId]);

  const handleDownloadReport = async () => {
    setDownloadingReport(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/api/enrollments/${enrollmentId}/report/pdf`,
        method: 'GET',
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Report_${report.student.name.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Report Download Error:', error);
      toast.error('Failed to download report. Please try again.');
    } finally {
      setDownloadingReport(false);
    }
  };

  const handleDownloadCertificate = async () => {
    setDownloadingCert(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/api/enrollments/${enrollmentId}/certificate`,
        method: 'GET',
        responseType: 'blob', // Important for handling binary data
      });

      // Create a blob from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${report.student.name.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      console.error('Certificate Download Error:', error);
      toast.error('Failed to download certificate. Please try again.');
    } finally {
      setDownloadingCert(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const barData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    datasets: [{
      label: 'Quiz Score %',
      data: report.weeklyData,
      backgroundColor: '#6366F1',
      borderRadius: 8,
    }]
  };

  const lineData = {
    labels: report.dailyActivity.map((_, i) => `Day ${i+1}`),
    datasets: [{
      label: 'Minutes Studied',
      data: report.dailyActivity,
      fill: true,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
    }]
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-brand text-white rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Trophy className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{report.course.title}</h1>
                <p className="text-gray-600 font-medium">Completed on {new Date().toLocaleDateString()}</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">Grade {report.performance.grade}</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100">{report.course.domain}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleDownloadReport}
                disabled={downloadingReport}
                className="flex items-center px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm disabled:opacity-70"
              >
                {downloadingReport ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
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

          {/* Performance Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Overall Score', value: `${report.performance.overallScore}%`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Total Hours', value: report.performance.totalTimeSpentHours, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Consistency', value: `${report.performance.consistencyScore}%`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
              { label: 'Assignments', value: `${report.performance.assignmentsSubmitted}/${report.performance.assignmentsTotal}`, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                  <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 text-brand mr-2" /> Weekly Performance
              </h3>
              <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 text-emerald-500 mr-2" /> Daily Learning Activity
              </h3>
              <div className="h-64">
                <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>

          {/* AI Recommendation & Skills */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2" /> AI Recommendation
              </h3>
              <p className="text-indigo-50 leading-relaxed text-lg italic">
                "{report.recommendation}"
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills Gained</h3>
              <div className="flex flex-wrap gap-2">
                {report.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
