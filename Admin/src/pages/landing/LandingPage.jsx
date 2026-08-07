import {
  GraduationCap,
  Users,
  UserCheck,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  Award,
  Zap,
  BookOpen,
} from 'lucide-react';

export default function LandingPage({ onNavigateLogin }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-purple-500 selection:text-white flex flex-col">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div className="text-xl font-extrabold tracking-tight">
            TRACK<span className="text-purple-400">ADEMY</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#portals" className="hover:text-purple-400 transition-colors">Portals</a>
          <a href="#stats" className="hover:text-purple-400 transition-colors">Stats</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigateLogin && onNavigateLogin('login')}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            Sign In <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl w-full mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
          <Sparkles size={14} className="text-purple-400" />
          <span>Next-Gen Academic & Mentorship Management System</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Empowering Institutions with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Smart Mentorship & Academic Profiles</span>
        </h1>

        <p className="mt-6 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          TRACKADEMY unifies Administrators, Faculty Mentors, and Students into one seamless portal ecosystem — tracking attendance, results, credit points, and mentorship growth in real time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigateLogin && onNavigateLogin('login')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Access Portal Demo <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Pill Tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
            <CheckCircle2 size={14} className="text-emerald-400" /> Verified Faculty Badges
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
            <CheckCircle2 size={14} className="text-purple-400" /> Real-time Attendance Donut Charts
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
            <CheckCircle2 size={14} className="text-blue-400" /> Credit Point Distribution
          </span>
        </div>
      </section>

      {/* 3 Portal Showcase */}
      <section id="portals" className="relative z-10 max-w-7xl w-full mx-auto px-6 py-16 border-t border-slate-800/80">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white">Three Unified Sites in One Application</h2>
          <p className="text-slate-400 text-sm mt-2">Tailored experiences for every stakeholder in the educational ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Site Card */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-8 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Admin Portal</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Complete administrative control to register students, assign mentors, create semester programs, manage notices, and handle support tickets.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" /> Student & Faculty Management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" /> Semester Routine & Subjects
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" /> Activity Broadcasts
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLogin && onNavigateLogin('login', 'admin')}
              className="mt-8 w-full py-3 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-300 hover:text-white font-bold text-xs transition-all border border-blue-500/20"
            >
              Open Admin Portal →
            </button>
          </div>

          {/* Mentor Site Card */}
          <div className="bg-slate-800/60 border border-purple-500/40 rounded-3xl p-8 hover:border-purple-500 transition-all flex flex-col justify-between group relative shadow-xl shadow-purple-500/10">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-purple-600 text-white font-bold text-[10px] uppercase rounded-full tracking-wider">
              Featured Design
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. Mentor Portal</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                The exact TRACKADEMY mentor dashboard with Kaushik Chatterjee verified profile, assigned mentees, 1-click results & attendance uploads.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0" /> Pixel-Perfect Mentor Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0" /> Mentee Performance Donut Charts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0" /> Credit Point & Results Publishing
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLogin && onNavigateLogin('login', 'mentor')}
              className="mt-8 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-600/30"
            >
              Open Mentor Portal →
            </button>
          </div>

          {/* Student Site Card */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Student Portal</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Personalized student portal to monitor attendance rates, grade sheets, accumulated credit points, and mentorship schedules.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" /> Personal Academic Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" /> Attendance Percentage Tracker
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" /> Direct Mentor Interaction
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLogin && onNavigateLogin('login', 'student')}
              className="mt-8 w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-white font-bold text-xs transition-all border border-emerald-500/20"
            >
              Open Student Portal →
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="relative z-10 max-w-7xl w-full mx-auto px-6 py-16 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white">2,847+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Active Students</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-purple-400">156+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Faculty Mentors</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">92%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Avg Attendance Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-blue-400">120+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Credit Points Issued</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto relative z-10 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <GraduationCap size={18} className="text-purple-400" /> TRACKADEMY Platform &copy; 2026
          </div>
          <p>All-in-One Academic & Mentorship Management Portal System</p>
        </div>
      </footer>
    </div>
  );
}
