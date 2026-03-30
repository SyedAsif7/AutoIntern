import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
  Plus,
  MoreVertical,
  Flame,
  X,
  Loader2,
  Star
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
  Legend,
  Filler
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
  Legend,
  Filler
);

const AdminDashboard = () => {
  const { currentUser, isAdmin, logout, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="h-10 w-10 animate-spin text-brand" /></div>;
  if (!currentUser || !isAdmin) return <Navigate to="/login" replace />;

  const stats = [
    { label: 'Total Students', value: '1,284', sub: '+12% this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Enrollments', value: '452', sub: '85% active now', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Courses Published', value: '12', sub: '2 in draft', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Completion Rate', value: '68%', sub: '+5% vs last year', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Internships Listed', value: '86', sub: '14 new today', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue (Mock)', value: '₹4.2L', sub: 'Quarterly growth', icon: Award, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let fileName = `autointern_${activeTab}_${new Date().toLocaleDateString()}.csv`;

    switch(activeTab) {
      case 'overview':
        csvContent += "Metric,Value,Trend\n" + stats.map(s => `${s.label},${s.value},${s.sub}`).join("\n");
        break;
      case 'students':
        // Sample data for export
        const students = [
          { name: 'Aditya Sharma', email: 'aditya@example.com', college: 'VJTI Mumbai', courses: 2 },
          { name: 'Priya Patel', email: 'priya@example.com', college: 'COEP Pune', courses: 1 },
          { name: 'Syed Asif', email: 'syedgaffarsyedrajjak1@gmail.com', college: 'SGGSIET Nanded', courses: 3 }
        ];
        csvContent += "Name,Email,College,Active Courses\n" + students.map(s => `${s.name},${s.email},${s.college},${s.courses}`).join("\n");
        break;
      case 'courses':
        const courses = [
          { title: 'Full Stack Web Dev', domain: 'Web Dev', enrolled: 124, status: 'Published' },
          { title: 'Python for Data Science', domain: 'Data Science', enrolled: 86, status: 'Draft' }
        ];
        csvContent += "Course Title,Domain,Enrolled,Status\n" + courses.map(c => `${c.title},${c.domain},${c.enrolled},${c.status}`).join("\n");
        break;
      case 'internships':
        const internships = [
          { role: 'Full Stack Intern', company: 'Google', applicants: 124, status: 'Active' },
          { role: 'UI/UX Designer', company: 'Meta', applicants: 86, status: 'Active' }
        ];
        csvContent += "Role,Company,Applicants,Status\n" + internships.map(j => `${j.role},${j.company},${j.applicants},${j.status}`).join("\n");
        break;
      default:
        toast.error("Export not available for this tab");
        return;
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} data exported!`);
  };

  const handleCreateReport = () => {
    const reportName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ');
    toast.loading(`Generating ${reportName} report...`, { id: 'report' });
    
    setTimeout(() => {
      window.print();
      toast.success(`${reportName} Report generated!`, { id: 'report' });
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Admin logged out');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      {/* Admin Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 hidden md:flex shadow-sm">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-200 rotate-3">A</div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Admin Portal</h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">AutoIntern 2026</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'students', label: 'Student Directory', icon: Users },
            { id: 'courses', label: 'Course Catalog', icon: BookOpen },
            { id: 'internships', label: 'Internship Desk', icon: Briefcase },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-brand text-white shadow-xl shadow-indigo-100 translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-brand'
                }`}
              >
                <Icon className={`h-5 w-5 mr-4 transition-colors ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-brand'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 mt-auto border-t border-slate-100">
          <div className="bg-brand/5 p-5 rounded-[2rem] border border-brand/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-black text-brand border border-brand/10">SA</div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-slate-900 truncate">System Admin</p>
                <p className="text-[10px] font-bold text-slate-500 truncate">{currentUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-2.5 bg-white border border-brand/20 text-brand text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand hover:text-white transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-brand font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                <div className="w-4 h-0.5 bg-brand rounded-full" />
                Management Suite
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight capitalize leading-none">{activeTab.replace('-', ' ')}</h2>
              <p className="text-slate-500 font-medium mt-3 text-lg">Real-time control center for AutoIntern operations.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportCSV}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
              <button 
                onClick={handleCreateReport}
                className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Create Report
              </button>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'overview' && <OverviewTab stats={stats} />}
            {activeTab === 'students' && <StudentsTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'internships' && <InternshipTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

const OverviewTab = ({ stats }) => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Enrollments',
        data: [65, 59, 80, 81, 56, 95],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366f1',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
      }
    ]
  };

  const domainData = {
    labels: ['Web Dev', 'Data Science', 'UI/UX', 'Cloud', 'AI/ML'],
    datasets: [
      {
        label: 'Students',
        data: [450, 320, 280, 150, 190],
        backgroundColor: [
          '#6366f1',
          '#8b5cf6',
          '#ec4899',
          '#3b82f6',
          '#10b981'
        ],
        borderRadius: 12,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        displayColors: false
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { weight: 'bold' }, color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { font: { weight: 'bold', size: 11 }, color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700`} />
              <div className="relative z-10">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.value}</h3>
                  <span className="text-xs font-black text-emerald-500 mb-1">{stat.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Growth Analytics</h3>
                <p className="text-slate-500 text-sm font-medium">Monthly platform enrollment trends</p>
              </div>
              <select className="bg-slate-50 border-none rounded-xl text-xs font-black text-slate-600 px-4 py-2 outline-none cursor-pointer">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Enrollment by Domain</h3>
                <p className="text-slate-500 text-sm font-medium">Distribution across different technologies</p>
              </div>
            </div>
            <div className="h-[300px]">
              <Bar data={domainData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200 h-fit sticky top-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-2xl font-black mb-2 tracking-tight">System Health</h3>
            <p className="text-slate-400 text-sm font-medium mb-10">Live server and database metrics</p>
            
            <div className="space-y-8 flex-1">
              {[
                { label: 'API Response', value: '124ms', color: 'bg-emerald-500' },
                { label: 'Database Load', value: '12%', color: 'bg-brand' },
                { label: 'Storage Used', value: '64%', color: 'bg-amber-500' },
                { label: 'Active Socket', value: '1.2k', color: 'bg-blue-500' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm font-black text-white">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value.includes('%') ? item.value : '80%' }} />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">View Full Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternshipTab = () => {
  const [internships, setInternships] = useState([
    { id: 1, role: 'Full Stack Intern', company: 'Google', location: 'Remote', applicants: 124, status: 'Active', type: 'Engineering' },
    { id: 2, role: 'UI/UX Designer', company: 'Meta', location: 'Bangalore', applicants: 86, status: 'Active', type: 'Design' },
    { id: 3, role: 'Data Analyst', company: 'Amazon', location: 'Hyderabad', applicants: 215, status: 'Closed', type: 'Data Science' },
    { id: 4, role: 'Backend Dev', company: 'Microsoft', location: 'Remote', applicants: 156, status: 'Active', type: 'Engineering' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRole, setNewRole] = useState({ role: '', company: '', location: 'Remote', type: 'Engineering' });

  const handleAddRole = (e) => {
    e.preventDefault();
    const role = {
      ...newRole,
      id: Date.now(),
      applicants: 0,
      status: 'Active'
    };
    setInternships([role, ...internships]);
    setShowAddModal(false);
    setNewRole({ role: '', company: '', location: 'Remote', type: 'Engineering' });
    toast.success('New internship role posted!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this listing?')) {
      setInternships(internships.filter(i => i.id !== id));
      toast.success('Listing removed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Internship Desk</h2>
          <p className="text-slate-500 font-medium">Manage corporate listings and applicant flow</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-8 py-4 bg-brand text-white font-black rounded-2xl text-sm shadow-xl shadow-indigo-100 hover:bg-brand-dark transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Post New Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {internships.map((job) => (
          <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                {job.company[0]}
              </div>
              <div className="flex gap-1">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                  job.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                }`}>{job.status}</span>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-brand transition-colors">{job.role}</h4>
            <p className="text-sm font-bold text-slate-500 mb-6">{job.company} • {job.location}</p>
            
            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-black text-slate-600">{job.applicants} Applied</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-brand hover:bg-indigo-50 rounded-lg transition-all"><Edit className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900"><X className="h-6 w-6" /></button>
            <h3 className="text-3xl font-black text-gray-900 mb-2">Post New Role</h3>
            <p className="text-gray-500 font-medium mb-8">Add a new internship opportunity for students</p>
            
            <form onSubmit={handleAddRole} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Role</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand outline-none" 
                  placeholder="e.g. Software Engineer Intern"
                  value={newRole.role}
                  onChange={(e) => setNewRole({...newRole, role: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand outline-none" 
                  placeholder="e.g. Microsoft"
                  value={newRole.company}
                  onChange={(e) => setNewRole({...newRole, company: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand outline-none" 
                    placeholder="e.g. Remote"
                    value={newRole.location}
                    onChange={(e) => setNewRole({...newRole, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand outline-none"
                    value={newRole.type}
                    onChange={(e) => setNewRole({...newRole, type: e.target.value})}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-brand text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-brand-dark transition-all mt-4">Post Internship</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Aditya Sharma', email: 'aditya@example.com', college: 'VJTI Mumbai', branch: 'CSE', courses: 2, streak: 12, lastActive: '2 hours ago' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', college: 'COEP Pune', branch: 'IT', courses: 1, streak: 5, lastActive: '1 day ago' },
    { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', college: 'NIT Trichy', branch: 'ECE', courses: 3, streak: 24, lastActive: 'Just now' },
    { id: 4, name: 'Syed Asif', email: 'syedgaffarsyedrajjak1@gmail.com', college: 'SGGSIET Nanded', branch: 'CSE', courses: 3, streak: 45, lastActive: '5 mins ago' },
  ]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents(students.filter(s => s.id !== id));
      toast.success('Student removed successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-900">Student Directory</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or college..." 
              className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:ring-brand w-80 shadow-sm outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Courses</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Streak</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredStudents.length > 0 ? filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">
                      {student.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-gray-700">{student.college}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{student.branch}</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl">
                    {student.courses} Active
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="flex items-center text-sm font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl w-fit">
                    <Flame className="h-4 w-4 mr-1.5 fill-orange-500" /> {student.streak} Days
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-2">
                    <button className="p-3 text-gray-400 hover:text-brand hover:bg-indigo-50 rounded-xl transition-all"><Mail className="h-4 w-4" /></button>
                    <button className="p-3 text-gray-400 hover:text-brand hover:bg-indigo-50 rounded-xl transition-all"><Edit className="h-4 w-4" /></button>
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-8 py-12 text-center text-gray-400 font-bold">No students found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CoursesTab = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Full Stack Web Dev', domain: 'Web Dev', enrolled: 124, status: 'Published', rating: 4.8 },
    { id: 2, title: 'Python for Data Science', domain: 'Data Science', enrolled: 86, status: 'Draft', rating: 4.9 },
    { id: 3, title: 'UI/UX Masterclass', domain: 'UI/UX', enrolled: 42, status: 'Published', rating: 4.7 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', domain: 'Web Dev', level: 'Beginner', duration: 4 });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course? This cannot be undone.')) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success('Course deleted');
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const course = {
      ...newCourse,
      id: Date.now(),
      enrolled: 0,
      status: 'Published',
      rating: 5.0
    };
    setCourses([course, ...courses]);
    setShowAddModal(false);
    toast.success('Course published successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-900">Course Management</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-8 py-4 bg-brand text-white font-black rounded-2xl text-sm shadow-xl shadow-indigo-100 hover:bg-brand-dark transition-all"
        >
          <Plus className="h-5 w-5 mr-2" /> Build New Course
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                course.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500'
              }`}>{course.status}</span>
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-brand hover:bg-indigo-50 rounded-lg transition-all"><Edit className="h-4 w-4" /></button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 group-hover:text-brand transition-colors">{course.title}</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">{course.domain}</p>
            
            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-black text-gray-600">{course.enrolled} Enrolled</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-black text-gray-600">{course.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900"><X className="h-6 w-6" /></button>
            <h3 className="text-3xl font-black text-gray-900 mb-2">Create New Course</h3>
            <p className="text-gray-500 font-medium mb-8">Deploy a new learning track to the catalog</p>
            
            <form onSubmit={handleAddCourse} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand" 
                  placeholder="e.g. Advanced System Design"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Domain</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand"
                    value={newCourse.domain}
                    onChange={(e) => setNewCourse({...newCourse, domain: e.target.value})}
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Programming">Programming</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration (Weeks)</label>
                  <input 
                    type="number" 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-brand"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-brand text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-brand-dark transition-all mt-4">Publish to Catalog</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
