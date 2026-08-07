import { Rocket, Sparkles, LogOut, GraduationCap } from 'lucide-react';

export default function StudentDashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6 sm:p-8">
      {/* Header */}
      <header className="flex items-center justify-between bg-white border border-slate-200/80 px-6 py-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
            <GraduationCap size={22} />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-lg leading-tight">
              TRACK<span className="text-emerald-600">ADEMY</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Student Portal
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Main Coming Soon Container */}
      <main className="my-auto flex flex-col items-center justify-center text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto w-full">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-200 text-[#0da651] flex items-center justify-center mb-6 shadow-inner">
          <Rocket size={40} className="animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0da651] border border-emerald-200/80 mb-4">
          <Sparkles size={14} />
          <span>PORTAL IN DEVELOPMENT</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Student Portal <span className="text-[#0da651]">Coming Soon</span>
        </h1>

        <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
          We are currently building an intuitive experience for students to view attendance, grade reports, credit points, and communicate with mentors. Stay tuned!
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0da651] text-white text-xs sm:text-sm font-bold hover:bg-green-600 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <LogOut size={16} /> Back to Landing Page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        © 2026 TRACKADEMY. All rights reserved.
      </footer>
    </div>
  );
}
