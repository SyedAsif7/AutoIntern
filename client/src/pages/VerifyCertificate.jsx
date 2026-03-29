import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Award, User, BookOpen, Calendar, MapPin, Globe } from 'lucide-react';

const VerifyCertificate = () => {
  const { certificateId } = useParams();
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching certificate verification
    setTimeout(() => {
      setCertData({
        id: certificateId,
        student: "Aditya Sharma",
        course: "Full Stack Web Development",
        date: "2026-03-28",
        college: "VJTI Mumbai",
        grade: "A+",
        domain: "Web Development",
        duration: "8 Weeks"
      });
      setLoading(false);
    }, 1500);
  }, [certificateId]);

  if (loading) return <div>Verifying Certificate...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-brand p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Certificate Verified</h1>
          <p className="text-indigo-100 mt-2 font-medium">AutoIntern Certification Program</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-indigo-50 text-brand rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Student Name</p>
              <h2 className="text-2xl font-black text-gray-900">{certData.student}</h2>
              <p className="text-gray-500 font-medium">{certData.college}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Course Name</p>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand" />
                <span className="font-bold text-gray-900">{certData.course}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Grade Achieved</p>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="font-bold text-emerald-600">Grade {certData.grade}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Completion Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-bold text-gray-900">{new Date(certData.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Certificate ID</p>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="font-mono text-xs text-gray-500 break-all">{certData.id}</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              This digital certificate is officially issued by AutoIntern and has been verified as authentic.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-200 transition-all">
                Download PDF
              </button>
              <button className="px-6 py-2 bg-brand text-white font-bold rounded-xl text-sm hover:bg-brand-dark transition-all shadow-lg shadow-indigo-100">
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
