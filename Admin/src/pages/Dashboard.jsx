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
  ChevronDown,
} from "lucide-react";
import adminHeroImage from "../assets/admin-hero.svg";

const stats = [
  { label: "Total Students", value: "2847", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Total Mentors", value: "156", icon: UserCheck, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Active Notices", value: "10", icon: Bell, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Upcoming Events", value: "6", icon: CalendarDays, color: "text-green-500", bg: "bg-green-50" },
];

const activities = [
  { name: "Henry Nacha",  action: "registered a new student", detail: "B.Sc of Engineering",                          badge: "Student",  badgeColor: "bg-green-100 text-green-600",  time: "2 min ago",  avatar: "HN", avatarBg: "bg-blue-200" },
  { name: "Harry Porter", action: "registered a new mentor",  detail: "B.Sc of Engineering",                          badge: "Mentor",   badgeColor: "bg-purple-100 text-purple-600", time: "5 min ago",  avatar: "HP", avatarBg: "bg-purple-200" },
  { name: "Admin",        action: "published a new notice",   detail: "Lorem ipsum dolor sit amet consectetur adipiscing", badge: "Cancel",   badgeColor: "bg-red-100 text-red-600",      time: "7 min ago",  avatar: "AD", avatarBg: "bg-orange-200" },
  { name: "Admin",        action: "published a new event",    detail: "Events 2K7S — Economics",                      badge: "Cancel",   badgeColor: "bg-red-100 text-red-600",      time: "9 min ago",  avatar: "AD", avatarBg: "bg-orange-200" },
  { name: "Admin",        action: "updated the semester details", detail: "",                                          badge: "Semester", badgeColor: "bg-blue-100 text-blue-600",    time: "10 min ago", avatar: "AD", avatarBg: "bg-orange-200" },
];

const quickActions = [
  { icon: UserPlus,    label: "Add Student",      color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { icon: UserCheck2,  label: "Add Mentor",        color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { icon: Upload,      label: "Upload Activity",   color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { icon: Megaphone,   label: "Upload Notice",     color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { icon: CalendarDays,label: "Update Seminar",    color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
  { icon: BookOpen,    label: "Upload Subject",    color: "text-green-600", bg: "bg-green-50 hover:bg-green-100" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <p className="text-xs text-gray-400">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-400">Super admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            A
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Hero Banner */}
        <div className="rounded-2xl overflow-hidden relative min-h-[130px]">
          <img src={adminHeroImage} alt="Dashboard hero" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
          <div className="relative z-10 p-6">
            <h2 className="text-4xl font-extrabold text-white leading-tight">Hello Admin 👋!</h2>
            <p className="mt-3 inline-flex items-center rounded-md bg-white/15 px-3 py-1 text-xs text-white/95 backdrop-blur-sm border border-white/20">
              admin.example@gmail.com
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-5 gap-5">
          {/* Recent Activity */}
          <div className="col-span-3 bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${act.avatarBg} text-xs font-semibold flex items-center justify-center shrink-0 text-gray-700`}>
                    {act.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">{act.name}</span> {act.action}
                    </p>
                    {act.detail && <p className="text-[11px] text-gray-400 truncate">{act.detail}</p>}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${act.badgeColor}`}>{act.badge}</span>
                  <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Action</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ icon: Icon, label, color, bg }) => (
                <button key={label} className={`flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-semibold ${color} ${bg} transition-colors`}>
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
