import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Linkedin, 
  Github, 
  Globe, 
  Settings, 
  Shield, 
  Trash2, 
  Upload,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Persistence logic for Hackathon Demo
  const getInitialData = () => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) return JSON.parse(savedData);
    return {
      name: currentUser?.displayName || 'Syed Asif',
      email: currentUser?.email || 'syedgaffarsyedrajjak1@gmail.com',
      phone: '9876543210',
      college: 'VJTI Mumbai',
      branch: 'Computer Engineering',
      year: '3',
      city: 'Mumbai',
      bio: 'Passionate full-stack developer interested in React and Node.js.',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      linkedinUrl: 'https://linkedin.com/in/adityasharma',
      githubUrl: 'https://github.com/adityasharma',
      portfolioUrl: 'https://aditya.dev',
      isPublic: true,
    };
  };

  const [formData, setFormData] = useState(getInitialData());
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || null);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePic(base64String);
        localStorage.setItem('profilePic', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Persist to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));
    
    // Mock API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    // Reset to last saved state from localStorage
    setFormData(getInitialData());
    setProfilePic(localStorage.getItem('profilePic') || null);
    toast('Changes discarded', { icon: 'ℹ️' });
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and account settings</p>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Profile Header Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-16 w-16 text-brand" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                </div>
                <input 
                  type="file" 
                  id="profile-pic" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handlePicUpload} 
                />
                <label 
                  htmlFor="profile-pic" 
                  className="absolute bottom-0 right-0 p-2 bg-brand text-white rounded-full shadow-lg hover:bg-brand-dark transition-all cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                </label>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-black text-gray-900 leading-none mb-2">{formData.name}</h2>
                <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">{formData.branch} • {formData.college}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 uppercase tracking-widest">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> Verified Student
                  </div>
                  <div className="flex items-center text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 uppercase tracking-widest">
                    <Shield className="h-3.5 w-3.5 mr-2" /> Profile Public
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <User className="h-5 w-5 text-brand mr-2" /> Personal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand bg-gray-50 cursor-not-allowed" value={formData.email} disabled />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">City</label>
                    <input type="text" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <GraduationCap className="h-5 w-5 text-brand mr-2" /> Academic Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">College</label>
                    <input type="text" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Branch</label>
                    <input type="text" className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Year</label>
                    <select className="w-full px-4 py-2 border-gray-200 rounded-xl focus:ring-brand" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Globe className="h-5 w-5 text-brand mr-2" /> Online Presence
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input type="url" className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-brand" placeholder="LinkedIn URL" value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input type="url" className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-brand" placeholder="GitHub URL" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input type="url" className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-brand" placeholder="Portfolio URL" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Skills Management */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Briefcase className="h-5 w-5 text-brand mr-2" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-brand text-xs font-black rounded-xl border border-indigo-100 flex items-center transition-all hover:bg-indigo-100 group">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  
                  {showSkillInput ? (
                    <form onSubmit={addSkill} className="flex gap-2">
                      <input 
                        autoFocus
                        type="text" 
                        className="px-3 py-1.5 border border-brand text-xs font-bold rounded-xl focus:ring-0 outline-none w-24"
                        placeholder="Skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onBlur={() => !newSkill && setShowSkillInput(false)}
                      />
                    </form>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowSkillInput(true)}
                      className="px-3 py-1.5 border-2 border-dashed border-gray-200 text-gray-400 text-xs font-black rounded-xl hover:border-brand hover:text-brand hover:bg-brand/5 transition-all flex items-center gap-1"
                    >
                      + Add Skill
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={formData.isPublic} onChange={e => setFormData({...formData, isPublic: e.target.checked})} />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublic ? 'bg-brand' : 'bg-gray-200'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublic ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <span className="ml-3 text-sm font-bold text-gray-700">Make profile public to recruiters</span>
                </label>
              </div>
                <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="flex-1 md:flex-none px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="flex-1 md:flex-none px-8 py-3 bg-brand text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-brand-dark transition-all disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100 space-y-4">
              <h3 className="text-lg font-bold text-red-600 flex items-center">
                <Settings className="h-5 w-5 mr-2" /> Danger Zone
              </h3>
              <p className="text-sm text-red-500 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
              <div className="flex gap-4">
                <button type="button" className="px-6 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl text-xs hover:bg-red-50">Change Password</button>
                <button type="button" className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl text-xs hover:bg-red-700">Delete Account</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
