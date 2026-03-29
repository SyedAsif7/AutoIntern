import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    college: '',
    city: '',
    branch: '',
    year: '',
    skills: [],
    interests: [],
    careerGoal: '',
  });

  const skillOptions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'UI/UX Design', 
    'Machine Learning', 'Data Analytics', 'Cybersecurity', 
    'Cloud Computing', 'Digital Marketing'
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSkillToggle = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // In a real app, you'd send this to your backend
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      //   uid: currentUser.uid,
      //   email: currentUser.email,
      //   ...formData
      // });
      console.log('Profile saved:', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-1/3 h-2 rounded-full mx-1 ${
                  s <= step ? 'bg-brand' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Academic Background'}
            {step === 3 && 'Career Goals'}
          </h2>
          <p className="text-gray-600">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch / Specialization</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Year</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        formData.skills.includes(skill)
                          ? 'bg-brand text-white border-brand'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-brand'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">What are you interested in?</label>
                <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Web Development', 'App Development', 'Data Science', 'UI/UX Design'].map((domain) => (
                    <label key={domain} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="text-brand focus:ring-brand"
                        onChange={(e) => {
                          const updated = e.target.checked 
                            ? [...formData.interests, domain]
                            : formData.interests.filter(i => i !== domain);
                          setFormData({...formData, interests: updated});
                        }}
                      />
                      <span className="text-sm">{domain}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Career Goal</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                  rows="4"
                  placeholder="Tell us about your long-term goals..."
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                ></textarea>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
