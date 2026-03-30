import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import AICareerMentor from './components/AICareerMentor.jsx';

// Protected Admin Route
const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin, loading } = useAuth();
  if (loading) return <PageSkeleton />;
  if (!currentUser || !isAdmin) return <Navigate to="/login" replace />;
  return children;
};

// Lazy load all pages for better performance
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Internships = lazy(() => import('./pages/Internships.jsx'));
const Prep = lazy(() => import('./pages/Prep.jsx'));
const Applications = lazy(() => import('./pages/Applications.jsx'));
const Report = lazy(() => import('./pages/Report.jsx'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate.jsx'));
const SampleCertificate = lazy(() => import('./pages/SampleCertificate.jsx'));
const SampleReport = lazy(() => import('./pages/SampleReport.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const Learning = lazy(() => import('./pages/Learning.jsx'));

// Simple loading skeleton for all pages
const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-8 flex flex-col gap-8 animate-pulse">
    <div className="h-12 w-48 bg-gray-200 rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="h-32 bg-gray-200 rounded-3xl" />
      <div className="h-32 bg-gray-200 rounded-3xl" />
      <div className="h-32 bg-gray-200 rounded-3xl" />
      <div className="h-32 bg-gray-200 rounded-3xl" />
    </div>
    <div className="h-64 bg-gray-200 rounded-3xl" />
  </div>
);

// Global Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Something went wrong.</h1>
            <p className="text-gray-500 mb-8">We encountered an unexpected error. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-brand-dark transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 font-sans selection:bg-brand selection:text-white">
            <Toaster position="top-center" reverseOrder={false} gutter={8} toastOptions={{
              className: 'font-bold text-sm rounded-2xl shadow-xl border border-gray-100 p-4',
              duration: 3000,
            }} />
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify/:certificateId" element={<VerifyCertificate />} />
                <Route path="/sample-certificate" element={<SampleCertificate />} />
                <Route path="/sample-report" element={<SampleReport />} />

                {/* Protected Student Routes */}
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/learning/:enrollmentId" element={<Learning />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/prep" element={<Prep />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-learning/:enrollmentId/report" element={<Report />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />

                {/* Fallback */}
                <Route path="/404" element={
                  <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                    <h1 className="text-9xl font-black text-brand mb-4">404</h1>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                    <Link to="/" className="px-8 py-3 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-brand-dark transition-all">Go Home</Link>
                  </div>
                } />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <AICareerMentor />
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
