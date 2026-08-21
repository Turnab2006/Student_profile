import {
  Users,
  UserCheck,
  Bell,
  Megaphone,
  UserPlus,
  BookOpen,
  Menu,
  Activity,
  CalendarDays,
  Zap,
} from "lucide-react";
import adminHeroImage from "../../assets/admin-hero.svg";
import AdminProfile from "../../components/admin/AdminProfile";

const stats = [
  {
    key: "students",
    label: "Total Students",
    value: "2,847",
    subtext: "Enrolled in department",
    icon: Users,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#F3EEFF] text-[#7656f4]",
    pageKey: "students",
  },
  {
    key: "mentors",
    label: "Total Mentors",
    value: "156",
    subtext: "Active faculty & staff",
    icon: UserCheck,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#22C55E]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EAFBF1] text-[#22C55E]",
    pageKey: "mentors",
  },
  {
    key: "notices",
    label: "Active Notices",
    value: "10",
    subtext: "Published announcements",
    icon: Bell,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#F59E0B]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#FFF5E8] text-[#F59E0B]",
    pageKey: "notices",
  },
  {
    key: "activities",
    label: "Upcoming Activities",
    value: "6",
    subtext: "Scheduled this month",
    icon: Megaphone,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#3B82F6]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EEF5FF] text-[#3B82F6]",
    pageKey: "activities",
  },
];

// Top 5 recent activities
const activities = [
  { name: "Henry Vecna", action: "registered as new student", detail: "Computer Science & Engineering", badge: "Student", badgeColor: "bg-emerald-100 text-emerald-600", time: "2 min ago", avatar: "HV", avatarBg: "bg-emerald-100" },
  { name: "Harry Potter", action: "registered as new mentor", detail: "Computer Science & Engineering", badge: "Mentor", badgeColor: "bg-purple-100 text-purple-600", time: "3 min ago", avatar: "HP", avatarBg: "bg-purple-100" },
  { name: "Admin", action: "published a new notice", detail: "Exam Routine for upcoming semester", badge: "Notice", badgeColor: "bg-blue-100 text-blue-600", time: "7 min ago", avatar: "AD", avatarBg: "bg-blue-100" },
  { name: "Admin", action: "published a new event", detail: "Regalia 2026 - Cultural Event", badge: "Activity", badgeColor: "bg-amber-100 text-amber-600", time: "8 min ago", avatar: "AD", avatarBg: "bg-amber-100" },
  { name: "Admin", action: "updated semester syllabus", detail: "Semester 5 course materials", badge: "Semester", badgeColor: "bg-rose-100 text-rose-600", time: "10 min ago", avatar: "AD", avatarBg: "bg-rose-100" },
];

const quickActions = [
  { icon: UserPlus, label: "Add Student", page: "add-student", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: UserCheck, label: "Add Mentor", page: "add-mentor", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: Megaphone, label: "Upload Activity", page: "add-activity", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: Bell, label: "Upload Notice", page: "add-notice", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: CalendarDays, label: "Update Semester", page: "semesters", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
  { icon: BookOpen, label: "Upload Subject", page: "add-subject", color: "text-[#0da651]", bg: "bg-[#eaf8f1] hover:bg-[#d8f3e5]" },
];

export default function Dashboard({ onNavigate, onOpenSidebar }) {
  const handleQuickActionClick = (page) => {
    if (page && onNavigate) {
      onNavigate(page);
      return;
    }
    const event = new CustomEvent("app-navigate", { detail: "add-student" });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Topbar aligned with sidebar logo border line (h-[65px]) matching other admin pages */}
      <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onOpenSidebar) onOpenSidebar();
              else window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
            }}
            className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-800 tracking-tight truncate">Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Welcome back, Admin! Here&apos;s what&apos;s happening today.</p>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 p-3.5 sm:p-4.5 space-y-3 overflow-y-auto">
        {/* Compact Hero Banner */}
        <div className="rounded-2xl overflow-hidden relative min-h-[160px] shadow-md shadow-slate-200/50 border border-slate-200/80 flex items-center">
          <img src={adminHeroImage} alt="Dashboard hero" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div className="relative z-10 ml-5 p-3.5 sm:p-4 flex flex-col justify-center">
            <h2 className="text-xl sm:text-3xl mb-3 font-extrabold text-white leading-tight">Hello Admin 👋!</h2>
            <p className="mt-1 inline-flex items-center rounded-lg bg-white/15 px-2.5 py-0.5 text-[15px] text-white/95 backdrop-blur-sm border border-white/20 font-mono w-fit">
              admin.example@gmail.com
            </p>
          </div>
        </div>

        {/* Stats Grid - Standardized to match Mentor and Student Dashboard Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {stats.map(({ key, label, value, subtext, icon: Icon, cardClass, valueClass, iconWrap, pageKey }) => (
            <div
              key={label}
              onClick={() => {
                if (pageKey && onNavigate) onNavigate(pageKey);
              }}
              className={`rounded-2xl border p-2.5 sm:px-4 sm:py-4 shadow-sm ${cardClass} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all`}
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div
                  className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${iconWrap}`}
                >
                  <Icon size={18} className="sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                    {label}
                  </div>
                  <div
                    className={`text-lg sm:text-[24px] font-extrabold leading-none mt-1 mb-0.5 ${valueClass}`}
                  >
                    {value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                    {subtext}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3.5">
          {/* Recent Activity (Top 5 items) */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-md shadow-slate-200/60 p-3.5 sm:p-4 border border-slate-200/90 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight uppercase flex items-center gap-2">
                <Activity size={16} className="text-gray-800 stroke-[2.4]" />
                <span>Recent Activity</span>
              </h3>
              <span className="text-[11px] text-gray-400 font-medium">Top 5 activities</span>
            </div>
            <div className="space-y-1 flex-1 flex flex-col justify-between">
              {activities.slice(0, 5).map((act, i) => (
                <div key={i} className="flex items-center justify-between gap-3 rounded-xl p-1.5 sm:p-2 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${act.avatarBg} text-[11px] font-bold flex items-center justify-center shrink-0 text-gray-700 shadow-2xs`}>
                      {act.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-800 truncate">
                        <span className="font-bold">{act.name}</span> {act.action}
                      </p>
                      {act.detail && <p className="text-[10px] sm:text-[11px] text-gray-400 truncate mt-0.5">{act.detail}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.badgeColor}`}>{act.badge}</span>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Card (Balanced height matching 5 activity rows without bottom gap) */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-md shadow-slate-200/60 p-3.5 sm:p-4 border border-slate-200/90 flex flex-col justify-between space-y-2">
            <div className="border-b border-gray-100 pb-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight uppercase flex items-center gap-2">
                <Zap size={16} className="text-gray-800 stroke-[2.4]" />
                <span>Quick Action</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 items-stretch">
              {quickActions.map(({ icon: Icon, label, page, color, bg }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickActionClick(page)}
                  className={`h-full min-h-[46px] sm:min-h-[50px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-200/60 ${color} ${bg} transition-all cursor-pointer hover:shadow-2xs active:scale-[0.98] select-none`}
                >
                  <Icon size={16} className="stroke-[2.2] shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
