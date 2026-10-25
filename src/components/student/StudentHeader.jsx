import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  HelpCircle,
  ChevronDown,
  Settings,
  LogOut,
  Megaphone,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import tuhinaAvatar from "../../assets/studentAssests/tuhina_avatar.jpg";

export default function StudentHeader({
  activePage = "dashboard",
  studentName = "Tanuka Saha",
  studentRole = "Student",
  avatarUrl = tuhinaAvatar,
  onNavigate,
  onLogout,
  onOpenSidebar,
  isDigitalCardActive = false,
  onNavigateToProfile,
  isAttendanceDetailActive = false,
  onNavigateToAttendance,
  isResultDetailActive = false,
  onNavigateToResults,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const containerRef = useRef(null);

  const pageMeta = {
    dashboard: {
      title: "Dashboard",
      subtitle: `Welcome back, ${studentName.split(" ")[0]}! Here's what's happening today.`,
    },
    profile: {
      title: "Profile",
      subtitle: "View and manage your academic profile information.",
    },
    subjects: {
      title: "Subjects",
      subtitle: "Overview of all enrolled courses and subjects.",
    },
    results: {
      title: "Results",
      subtitle: "An overview of your academic performance and outcomes.",
    },
    attendances: {
      title: "Attendances",
      subtitle: "Track your attendance record across academic semesters.",
    },
    "credit-points": {
      title: "Credit Points",
      subtitle: "Check your earned academic credit points and achievements.",
    },
    message: {
      title: "Messages",
      subtitle: "Communicate directly with assigned mentors and faculty.",
    },
    activities: {
      title: "Activities",
      subtitle: "Explore and participate in campus events and hackathons.",
    },
    notices: {
      title: "Notices",
      subtitle: "Stay updated with important announcements and circulars.",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your student account preferences and security.",
    },
    support: {
      title: "Support Center",
      subtitle: "Get help and technical assistance from support staff.",
    },
  };

  const currentMeta = pageMeta[activePage] || {
    title: activePage ? activePage.charAt(0).toUpperCase() + activePage.slice(1) : "Dashboard",
    subtitle: `Welcome back, ${studentName.split(" ")[0]}! Here's what's happening today.`,
  };

  const notifications = [
    {
      id: "1",
      title: "Semester Results Published",
      desc: "Semester IV final marksheet is now available to view and download.",
      time: "15 mins ago",
      icon: Megaphone,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: "2",
      title: "Technovate 2026 Registration",
      desc: "Registration open for Annual Hackathon & Coding Challenge.",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "3",
      title: "Attendance Warning",
      desc: "Attendance in CS304 is below 75%. Please meet your faculty advisor.",
      time: "1 day ago",
      icon: AlertTriangle,
      iconBg: "bg-amber-100 text-amber-600",
    },
  ];

  const handleNav = (pageKey) => {
    setProfileOpen(false);
    setNotifOpen(false);
    if (onNavigate) onNavigate(pageKey);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    if (onLogout) onLogout();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs font-['Roboto',sans-serif] w-full">
      {/* Left: Mobile Toggle + Page Title / Breadcrumb matching Admin Portal header */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
            {activePage === "profile" && isDigitalCardActive
              ? "Digital Student ID"
              : activePage === "attendances" && isAttendanceDetailActive
              ? "Attendance Details"
              : activePage === "results" && isResultDetailActive
              ? "Result Details"
              : currentMeta.title}
          </h1>

          {activePage === "profile" && isDigitalCardActive ? (
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span
                onClick={onNavigateToProfile}
                className="hover:text-gray-600 font-medium cursor-pointer transition-colors"
              >
                Profile
              </span>
              <span>&gt;</span>
              <span className="text-[#2384FD] font-semibold">Digital ID Card</span>
            </nav>
          ) : activePage === "attendances" && isAttendanceDetailActive ? (
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span
                onClick={onNavigateToAttendance}
                className="hover:text-gray-600 font-medium cursor-pointer transition-colors"
              >
                Attendance
              </span>
              <span>&gt;</span>
              <span className="text-[#2384FD] font-semibold">View Attendance</span>
            </nav>
          ) : activePage === "results" && isResultDetailActive ? (
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span
                onClick={onNavigateToResults}
                className="hover:text-gray-600 font-medium cursor-pointer transition-colors"
              >
                Results
              </span>
              <span>&gt;</span>
              <span className="text-[#2384FD] font-semibold">View Result</span>
            </nav>
          ) : (
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              {currentMeta.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Actions + Profile Dropdown matching Admin Profile layout */}
      <div className="flex items-center gap-2 sm:gap-3.5 relative select-none shrink-0" ref={containerRef}>
        {/* 1. Notification Bell Icon with Red Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={19} className="stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 px-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-gray-800">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              {/* Items List */}
              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleNav("notices")}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
                        <Icon size={15} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-gray-800 leading-tight">{item.title}</p>
                        <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">{item.desc}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-2 text-center">
                <button
                  type="button"
                  onClick={() => handleNav("notices")}
                  className="w-full py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                >
                  View All Notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Help Circle Icon */}
        <button
          type="button"
          onClick={() => handleNav("support")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
          title="Support Center"
          aria-label="Support Center"
        >
          <HelpCircle size={19} className="stroke-[1.8]" />
        </button>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-5 w-[1px] bg-gray-200" />

        {/* 3. Student Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 p-1 rounded-xl hover:bg-gray-100/70 transition-all cursor-pointer focus:outline-none group"
            aria-expanded={profileOpen}
          >
            {/* Avatar on LEFT */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200 shadow-xs ring-2 ring-blue-500/20 bg-slate-100 flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center text-xs font-bold text-white">
                  {studentName.charAt(0)}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* Name & Role Text */}
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2384FD] transition-colors">
                {studentName}
              </p>
              <p className="text-xs text-gray-500 capitalize font-medium">{studentRole}</p>
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              size={15}
              className={`text-gray-500 transition-transform duration-200 ${
                profileOpen ? "rotate-180 text-blue-600" : "group-hover:text-gray-700"
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2.5 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleNav("settings")}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-gray-900 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings size={15} className="text-gray-500" />
                  <span>Settings</span>
                </button>
                <div className="h-[1px] bg-slate-100 my-1" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
