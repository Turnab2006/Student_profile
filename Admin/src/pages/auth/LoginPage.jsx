import { useState } from 'react';
import {
  Shield,
  UserCheck,
  GraduationCap,
  ArrowLeft,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function LoginPage({ initialRole = 'mentor', onLoginSuccess, onBackToLanding }) {
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(role);
    }
  }

  function handleQuickDemo(demoRole) {
    if (onLoginSuccess) {
      onLoginSuccess(demoRole);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        type="button"
        onClick={onBackToLanding}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 transition-all z-20"
      >
        <ArrowLeft size={16} /> Back to Landing Page
      </button>

      <div className="relative z-10 max-w-md w-full bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30">
            <GraduationCap size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">TRACK<span className="text-purple-400">ADEMY</span></h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Select your role to access your portal</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-1.5 rounded-2xl mb-6 border border-slate-700/50">
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'admin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield size={14} /> Admin
          </button>

          <button
            type="button"
            onClick={() => setRole('mentor')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'mentor'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck size={14} /> Mentor
          </button>

          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'student'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap size={14} /> Student
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {role.toUpperCase()} Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                placeholder={
                  role === 'admin' ? 'admin@trackademy.edu' : role === 'mentor' ? 'kaushik.c@trackademy.edu' : 'student@trackademy.edu'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 rounded-xl text-xs outline-none focus:border-purple-500 text-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/80 rounded-xl text-xs outline-none focus:border-purple-500 text-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${
              role === 'admin'
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                : role === 'mentor'
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={16} />
          </button>
        </form>

        {/* One-Click Quick Demo Login Switcher */}
        <div className="mt-8 pt-6 border-t border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold mb-3 justify-center">
            <Sparkles size={14} /> Quick Demo Access (One-Click Login):
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-[11px] font-bold text-center transition-colors"
            >
              🛡️ Admin Site
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('mentor')}
              className="py-2 px-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-xl text-[11px] font-bold text-center transition-colors"
            >
              👨‍🏫 Mentor Site
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11px] font-bold text-center transition-colors"
            >
              🎓 Student Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
