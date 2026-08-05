import {
  Users,
  UserCheck,
  Bell,
  CalendarDays,
  UserPlus,
  UserCheck2,
  Upload,
  Megaphone,
  BookOpen,
} from "lucide-react";
import adminHeroImage from "../assets/admin-hero.svg";
import AdminProfile from "../components/AdminProfile";

const stats = [
  { label: "Total Students", value: "2847", icon: Users, color: "text-rose-500", bg: "bg-rose-50", border: "border-l-rose-500" },
  { label: "Total Mentors", value: "156", icon: UserCheck, color: "text-blue-500", bg: "bg-blue-50", border: "border-l-blue-400" },
  { label: "Active Notices", value: "10", icon: Bell, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500" },
  { label: "Upcoming Events", value: "6", icon: CalendarDays, color: "text-amber-500", bg: "bg-amber-50", border: "border-l-amber-400" },
];

const activities = [
  { name: "Henry Vecna",  action: "registered as new student", detail: "Computer Science & Engineering", badge: "Student", badgeColor: "bg-emerald-100 text-emerald-600", time: "2 min ago", avatar: "HV", avatarBg: "bg-emerald-100" },
  { name: "Harry Potter", action: "registered as new mentor", detail: "Computer Science & Engineering", badge: "Mentor", badgeColor: "bg-purple-100 text-purple-600", time: "3 min ago", avatar: "HP", avatarBg: "bg-purple-100" },
  { name: "Admin",        action: "published a new notice", detail: "Exam Routine for upcoming semester", badge: "Notice", badgeColor: "bg-blue-100 text-blue-600", time: "7 min ago", avatar: "AD", avatarBg: "bg-blue-100" },
  { name: "Admin",        action: "published a new event", detail: "Regalia 2026 - Cultural Event", badge: "Event", badgeColor: "bg-amber-100 text-amber-600", time: "8 min ago", avatar: "AD", avatarBg: "bg-amber-100" },
  { name: "Admin",        action: "updated the semester details", detail: "", badge: "Semester", badgeColor: "bg-rose-100 text-rose-600", time: "10 min ago", avatar: "AD", avatarBg: "bg-rose-100" },
];

const quickActions = [
  { icon: UserPlus,     label: "Add Student",     page: "add-student",  color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: UserCheck2,   label: "Add Mentor",      page: "add-mentor",   color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: Upload,       label: "Upload Activity", page: "add-activity", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: Megaphone,    label: "Upload Notice",   page: "add-notice",   color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: CalendarDays, label: "Update Semester", page: "semesters",    color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: BookOpen,     label: "Upload Subject",  page: "add-subject",  color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
];

export default function Dashboard({ onNavigate }) {
  const handleAction = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      const event = new CustomEvent("app-navigate", { detail: page });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Topbar */}
      <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold leading-tight text-gray-800 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Welcome back, Admin! Here&apos;s what&apos;s happening today.</p>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Hero Banner */}
        <div className="rounded-2xl overflow-hidden relative min-h-[190px] shadow-sm border border-gray-100">
          <img src={adminHeroImage} alt="Dashboard hero" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 p-6 md:p-7">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Hello Admin 👋!</h2>
            <p className="mt-4 inline-flex items-center rounded-lg bg-white/15 px-3 py-1 text-xs text-white/95 backdrop-blur-sm border border-white/20 font-mono">
              admin.example@gmail.com
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`bg-white rounded-2xl p-5 flex items-start justify-between shadow-2xs border border-gray-100 border-l-4 ${border}`}>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
                <p className="mt-2 text-2xl md:text-[28px] font-bold tracking-tight text-gray-800">{value}</p>
              </div>
              <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
          {/* Recent Activity */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Recent Activity</h3>
            <div className="space-y-2">
              {activities.map((act, i) => (
                <div key={i} className="flex items-center justify-between gap-3 rounded-xl p-3 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-full ${act.avatarBg} text-xs font-bold flex items-center justify-center shrink-0 text-gray-700 shadow-2xs`}>
                      {act.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-800">
                        <span className="font-bold">{act.name}</span> {act.action}
                      </p>
                      {act.detail && <p className="text-[11px] text-gray-400 truncate mt-0.5">{act.detail}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${act.badgeColor}`}>{act.badge}</span>
                    <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Quick Action</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {quickActions.map(({ icon: Icon, label, page, color, bg }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleAction(page)}
                  className={`min-h-[85px] flex items-center justify-center gap-2.5 px-4 py-5 rounded-2xl text-xs sm:text-sm font-bold border border-emerald-200/60 ${color} ${bg} transition-all cursor-pointer hover:shadow-sm active:scale-[0.98] select-none`}
                >
                  <Icon size={18} className="stroke-[2.2]" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
