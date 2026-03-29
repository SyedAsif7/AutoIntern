import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Search,
  Filter,
  Download,
  Mail,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Enrollments', value: '452', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Courses Published', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Completion Rate', value: '68%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Internships Listed', value: '86', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Certificates Issued', value: '312', icon: Award, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-black text-brand">Admin Panel</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">AutoIntern Platform</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'internships', label: 'Internships', icon: Briefcase },
            { id: 'reports', label: 'Reports', icon: FileTextIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === item.id ? 'bg-brand text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'courses' && <CoursesTab />}
      </main>
    </div>
  );
};

const OverviewTab = ({ stats }) => {
  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [{
      label: 'New Enrollments',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)),
      borderColor: '#6366F1',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(99, 102, 241, 0.05)'
    }]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 text-brand mr-2" /> Enrollment Trends (Last 30 Days)
          </h3>
          <div className="h-64">
            <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <PieChartIcon className="h-5 w-5 text-emerald-500 mr-2" /> Domain Distribution
          </h3>
          <div className="h-64 flex justify-center">
            <Pie data={{
              labels: ['Web Dev', 'Python & ML', 'UI/UX', 'Cloud'],
              datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6']
              }]
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentsTab = () => {
  const students = [
    { name: 'Aditya Sharma', college: 'VJTI Mumbai', branch: 'CSE', courses: 2, streak: 12, lastActive: '2 hours ago' },
    { name: 'Priya Patel', college: 'COEP Pune', branch: 'IT', courses: 1, streak: 5, lastActive: '1 day ago' },
    { name: 'Rahul Kumar', college: 'NIT Trichy', branch: 'ECE', courses: 3, streak: 24, lastActive: 'Just now' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Student Directory</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border-gray-200 rounded-xl text-sm focus:ring-brand" />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">College</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Branch</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Courses</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Streak</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-all cursor-pointer">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.lastActive}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.college}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.branch}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg">{student.courses}</span></td>
                <td className="px-6 py-4"><span className="flex items-center text-sm font-bold text-orange-600"><Flame className="h-4 w-4 mr-1 fill-orange-500" /> {student.streak}</span></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-brand bg-gray-50 rounded-lg"><Mail className="h-4 w-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-brand bg-gray-50 rounded-lg"><Edit className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CoursesTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <button className="flex items-center px-6 py-3 bg-brand text-white font-bold rounded-2xl text-sm shadow-lg shadow-indigo-100">
          <Plus className="h-4 w-4 mr-2" /> Build New Course
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Full Stack Web Dev', domain: 'Web Dev', enrolled: 124, status: 'Published' },
          { title: 'Python for Data Science', domain: 'Data Science', enrolled: 86, status: 'Draft' },
          { title: 'UI/UX Masterclass', domain: 'UI/UX', enrolled: 42, status: 'Published' },
        ].map((course, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                course.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
              }`}>{course.status}</span>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="h-5 w-5" /></button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{course.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{course.domain}</p>
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-600">{course.enrolled} Students</span>
              </div>
              <button className="text-brand font-bold text-sm">Analytics</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileTextIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const MoreVertical = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

export default AdminDashboard;
