import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
} from "lucide-react";

export default function AdminProfile({
  name = "Admin User",
  role = "Super Admin",
  avatar = "A",
  onNavigate,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const containerRef = useRef(null);

  const notifications = [
    {
      id: "1",
      title: "Exam Schedule Released",
      desc: "Semester V examination schedule has been published.",
      time: "10 mins ago",
      icon: Megaphone,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "2",
      title: "Attendance Alert",
      desc: "3 students at risk of low attendance in CS304.",
      time: "1 hour ago",
      icon: AlertTriangle,
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      id: "3",
      title: "New Faculty Assigned",
      desc: "New mentor assigned for BCA department.",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-blue-100 text-blue-600",
    },
  ];

  // Close dropdowns when clicking outside
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

  const navigateTo = (page) => {
    setProfileOpen(false);
    setNotifOpen(false);
    if (onNavigate) {
      onNavigate(page);
    } else {
      const event = new CustomEvent("app-navigate", { detail: page });
      window.dispatchEvent(event);
    }
  };

  const handleLogoutClick = () => {
    setProfileOpen(false);
    if (onNavigate) {
      onNavigate("logout");
    } else {
      const event = new CustomEvent("app-navigate", { detail: "logout" });
      window.dispatchEvent(event);
    }
  };

  return (
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

        {/* Notification Dropdown Menu */}
        {notifOpen && (
          <div className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 px-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-gray-800">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setUnreadCount(0)}
                className="text-[11px] font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            </div>

            {/* Notification Items List */}
            <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
              {notifications.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigateTo("notices")}
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

            {/* View All Button */}
            <div className="border-t border-gray-100 pt-2 text-center">
              <button
                type="button"
                onClick={() => navigateTo("notices")}
                className="w-full py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
              >
                View All Notices & Notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Help Circle Icon */}
      <button
        type="button"
        onClick={() => navigateTo("support")}
        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
        title="Support Center"
        aria-label="Support Center"
      >
        <HelpCircle size={19} className="stroke-[1.8]" />
      </button>

      {/* Vertical Divider */}
      <div className="hidden sm:block h-5 w-[1px] bg-gray-200" />

      {/* 3. Admin Profile Pill - Avatar on Left, Name & Role in Middle (like Student Portal) */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setProfileOpen((prev) => !prev);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2.5 sm:gap-3 p-1 rounded-xl hover:bg-gray-100/70 transition-all cursor-pointer focus:outline-none group"
        >
          {/* Avatar Icon on LEFT */}
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden text-sm font-bold text-white shadow-sm ring-2 ring-emerald-500/20">
              {avatar}
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* Name & Role Text on RIGHT of Avatar */}
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#0da651] transition-colors">
              {name}
            </p>
            <p className="text-[11px] text-gray-400 capitalize font-medium">{role}</p>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform duration-200 ${
              profileOpen ? "rotate-180 text-emerald-600" : "group-hover:text-gray-600"
            }`}
          />
        </button>

        {/* Profile Dropdown Menu - Strictly ONLY Settings & Logout */}
        {profileOpen && (
          <div className="absolute right-0 top-full mt-2.5 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Menu Items: Only Settings & Logout */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => navigateTo("settings")}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-[#0da651] transition-colors cursor-pointer"
              >
                <Settings size={15} className="text-gray-400 group-hover:text-[#0da651]" />
                <span>Settings</span>
              </button>

              <button
                type="button"
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut size={15} className="text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
