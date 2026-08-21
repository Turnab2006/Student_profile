import { useState, useEffect } from 'react';
import {
  Shield,
  UserCheck,
  GraduationCap,
  ArrowLeft,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import trackademyLogo from '../../components/LandingPage/assets/trackademy.svg';

const PORTAL_ROLES = {
  student: {
    email: 'alex.rivers@student.trackademy.edu',
    password: 'studentpassword123',
    name: 'Student Portal',
    color: 'blue',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25',
    activeTabClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/20',
    inactiveTabClass: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    inputFocusClass: 'focus:border-blue-600 focus:ring-blue-600/20'
  },
  mentor: {
    email: 'kaushik.c@trackademy.edu',
    password: 'mentorpassword123',
    name: 'Faculty Mentor',
    color: 'purple',
    btnClass: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25',
    activeTabClass: 'bg-purple-600 text-white shadow-md shadow-purple-600/20',
    inactiveTabClass: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    inputFocusClass: 'focus:border-purple-600 focus:ring-purple-600/20'
  },
  admin: {
    email: 'john.doe@trackademy.edu',
    password: 'adminpassword123',
    name: 'Administrator',
    color: 'emerald',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25',
    activeTabClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
    inactiveTabClass: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    inputFocusClass: 'focus:border-emerald-600 focus:ring-emerald-600/20'
  }
};

export default function LoginPage({ initialRole = 'student', onLoginSuccess, onBackToLanding }) {
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState(PORTAL_ROLES[initialRole]?.email || PORTAL_ROLES.student.email);
  const [password, setPassword] = useState(PORTAL_ROLES[initialRole]?.password || PORTAL_ROLES.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currentConfig = PORTAL_ROLES[role] || PORTAL_ROLES.student;

  // Sync role if initialRole changes
  useEffect(() => {
    if (initialRole && PORTAL_ROLES[initialRole]) {
      setRole(initialRole);
      setEmail(PORTAL_ROLES[initialRole].email);
      setPassword(PORTAL_ROLES[initialRole].password);
    }
  }, [initialRole]);

  // Handle role switch & update dummy credentials
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail(PORTAL_ROLES[newRole].email);
    setPassword(PORTAL_ROLES[newRole].password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(role);
      }
    }, 350);
  };

  return (
    <div className="h-screen max-h-screen w-full bg-slate-50 flex flex-col justify-between relative overflow-hidden font-roboto select-none">
      
      {/* Background Subtle Gradient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-blue-50/60 via-purple-50/30 to-transparent pointer-events-none" />
      <div className="fixed top-[-80px] right-[-80px] w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-80px] left-[-80px] w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Back Button */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3 flex items-center justify-between flex-shrink-0">
        <button
          type="button"
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95 cursor-pointer font-roboto"
        >
          <ArrowLeft size={16} />
          <span>Back to Landing Page</span>
        </button>

        <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 shadow-sm font-roboto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Institutional ERP Active</span>
        </div>
      </header>

      {/* Main Centered Login Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-2 relative z-10 overflow-y-auto sm:overflow-hidden">
        <div className="w-full max-w-lg sm:max-w-xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 relative flex-shrink-0 my-auto font-roboto">
          
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <img
                src={trackademyLogo}
                alt="Trackademy Logo"
                className="h-8 sm:h-9 w-auto"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sign In to Your Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-1">
              Select your role to access your academic dashboard
            </p>
          </div>

          {/* Role Selection Buttons (Student first & default, Mentor, Admin) */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-5 border border-slate-200/70">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === 'student'
                  ? PORTAL_ROLES.student.activeTabClass
                  : PORTAL_ROLES.student.inactiveTabClass
              }`}
            >
              <GraduationCap size={16} />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('mentor')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === 'mentor'
                  ? PORTAL_ROLES.mentor.activeTabClass
                  : PORTAL_ROLES.mentor.inactiveTabClass
              }`}
            >
              <UserCheck size={15} />
              <span>Mentor</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === 'admin'
                  ? PORTAL_ROLES.admin.activeTabClass
                  : PORTAL_ROLES.admin.inactiveTabClass
              }`}
            >
              <Shield size={15} />
              <span>Admin</span>
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {currentConfig.name} Email ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentConfig.email}
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:ring-4 transition-all font-roboto ${currentConfig.inputFocusClass}`}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:ring-4 transition-all font-roboto ${currentConfig.inputFocusClass}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-600 cursor-pointer select-none font-roboto">
                Keep me signed in on this device
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-1 cursor-pointer font-roboto ${
                currentConfig.btnClass
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'}`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Entering Portal...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {currentConfig.name}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

        </div>
      </main>

      {/* Clean Compact Footer */}
      <footer className="relative z-10 py-2.5 text-center text-xs text-slate-500 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm flex-shrink-0 font-roboto">
        <div className="flex items-center justify-center gap-2">
          <span>© 2026 Trackademy Academic ERP</span>
          <span>•</span>
          <span className="text-slate-400">All Portals Connected</span>
        </div>
      </footer>

    </div>
  );
}
