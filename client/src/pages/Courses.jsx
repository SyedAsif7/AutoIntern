import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, BookOpen, Clock, Award, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [search, domainFilter]);

  const fetchCourses = () => {
    setLoading(true);
    // Mock courses for now
    setTimeout(() => {
      const mockCourses = [
        { 
          id: 1, slug: 'c-lang', title: 'C', 
          domain: 'Programming', duration: 4, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
          enrolled: 1200, rating: 4.7
        },
        { 
          id: 2, slug: 'cpp-lang', title: 'C++', 
          domain: 'Programming', duration: 6, level: 'Intermediate', 
          thumbnail: 'https://images.unsplash.com/photo-1629739947391-74718288397a?auto=format&fit=crop&w=800&q=80',
          enrolled: 950, rating: 4.8
        },
        { 
          id: 3, slug: 'java-lang', title: 'Java', 
          domain: 'Programming', duration: 8, level: 'Intermediate', 
          thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
          enrolled: 2100, rating: 4.9
        },
        { 
          id: 4, slug: 'python-lang', title: 'Python', 
          domain: 'Programming', duration: 6, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          enrolled: 3500, rating: 4.9
        },
        { 
          id: 5, slug: 'javascript-lang', title: 'JavaScript', 
          domain: 'Programming', duration: 6, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
          enrolled: 2800, rating: 4.8
        },
        { 
          id: 6, slug: 'sql-lang', title: 'SQL', 
          domain: 'Database', duration: 4, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
          enrolled: 1800, rating: 4.7
        },
        { 
          id: 7, slug: 'full-stack-web-dev', title: 'Full Stack Web Development', 
          domain: 'CSE', duration: 8, level: 'Intermediate', 
          thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
          enrolled: 1240, rating: 4.8
        },
        { 
          id: 8, slug: 'iot-embedded', title: 'IoT & Embedded Systems', 
          domain: 'EEE/ECE', duration: 6, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          enrolled: 860, rating: 4.9
        },
        { 
          id: 9, slug: 'autocad-civil', title: 'AutoCAD & Revit for Civil', 
          domain: 'Civil', duration: 4, level: 'Beginner', 
          thumbnail: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&w=800&q=80',
          enrolled: 420, rating: 4.7
        },
        { 
          id: 10, slug: 'solidworks-mech', title: 'SolidWorks Masterclass (Mechanical)', 
          domain: 'Mech', duration: 6, level: 'Intermediate', 
          thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
          enrolled: 580, rating: 4.6
        }
      ];

      const filtered = mockCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                             course.domain.toLowerCase().includes(search.toLowerCase());
        const matchesDomain = domainFilter === '' || course.domain === domainFilter;
        return matchesSearch && matchesDomain;
      });

      setCourses(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Certification Courses</h1>
            <p className="text-gray-600">4-8 week programs designed for industry roles</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by course name or domain..."
                className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-xl focus:ring-brand focus:border-brand"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="border-gray-200 rounded-xl px-4 py-2 focus:ring-brand"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
            >
              <option value="">All Domains</option>
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="CSE">CSE</option>
              <option value="EEE/ECE">EEE/ECE</option>
              <option value="Civil">Civil</option>
              <option value="Mech">Mech</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand">
                    {course.domain}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                      <span className="text-xs text-gray-400">({course.enrolled})</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-6">{course.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center text-sm text-gray-500 font-medium">
                      <Clock className="h-4 w-4 mr-2" /> {course.duration} Weeks
                    </div>
                    <Link 
                      to={`/courses/${course.slug}`} 
                      className="text-brand font-black text-sm flex items-center group-hover:gap-2 transition-all"
                    >
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
