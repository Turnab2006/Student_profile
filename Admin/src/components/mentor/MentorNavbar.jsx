import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, HelpCircle, ChevronDown, User, Settings, LogOut, ShieldCheck, AlertTriangle, Megaphone } from 'lucide-react';

export default function MentorNavbar({
  activeTab = 'dashboard',
  user = {
    name: 'Kaushik Chatterjee',
    firstName: 'Kaushik',
    role: 'Senior Mentor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80',
    initials: 'K',
  },
  onSelectTab,
  onLogout,
  onOpenSidebar,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const containerRef = useRef(null);

  const currentUser = {
    name: user?.name || 'Kaushik Chatterjee',
    firstName: user?.firstName || user?.name?.split(' ')[0] || 'Kaushik',
    role: user?.role || 'Senior Mentor',
    avatar: user?.avatar,
    initials: user?.initials || (user?.name ? user.name.charAt(0) : 'K'),
  };

  const pageMeta = {
    dashboard: {
      title: 'Dashboard',
      subtitle: `Welcome back, ${currentUser.firstName}! Here's what's happening today.`,
    },
    mentees: {
      title: 'Mentee',
      subtitle: 'Manage and view your assigned mentees.',
    },
    profile: {
      title: 'Profile',
      subtitle: 'View and update your mentor profile details.',
    },
    messages: {
      title: 'Message',
      subtitle: 'Chat and communicate with your mentees.',
    },
    results: {
      title: 'Results',
      subtitle: "Manage and upload mentees' academic results",
    },
    attendance: {
      title: 'Attendance',
      subtitle: 'Track and record student attendance.',
    },
    'credit-points': {
      title: 'Credit Point',
      subtitle: 'Award and review student credit points.',
    },
    notices: {
      title: 'Notice',
      subtitle: 'Latest announcements and official notices.',
    },
    activities: {
      title: 'Activity',
      subtitle: 'Track system activities and updates.',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage portal preferences and configurations.',
    },
    support: {
      title: 'System Support',
      subtitle: 'Help desk and technical assistance.',
    },
  };

  const currentMeta = pageMeta[activeTab] || {
    title: activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Dashboard',
    subtitle: `Welcome back, ${currentUser.firstName}! Here's what's happening today.`,
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateTo = (tab) => {
    setProfileOpen(false);
    setNotifOpen(false);
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs w-full">
      {/* Left side: Mobile menu button + Title & Subtitle */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-800 tracking-tight truncate">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Bell (3) + Help Circle + Divider + User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 relative select-none shrink-0" ref={containerRef}>
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all cursor-pointer focus:outline-none"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
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

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                <div
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigateTo('notices')}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Megaphone size={15} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-800 leading-tight">New Project Deadline Extended</p>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Final term project deadline is extended to Aug 15.</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">10 mins ago</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigateTo('attendance')}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <AlertTriangle size={15} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-800 leading-tight">Mentee Attendance Alert</p>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">2 mentees are below 75% attendance threshold.</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 text-center">
                <button
                  type="button"
                  onClick={() => navigateTo('notices')}
                  className="w-full py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                >
                  View All Notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Circle Button */}
        <button
          type="button"
          onClick={() => navigateTo('support')}
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all cursor-pointer focus:outline-none"
          title="Support Center"
        >
          <HelpCircle size={18} />
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-[1px] bg-gray-200" />

        {/* User Profile Block */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 p-1 rounded-xl hover:bg-gray-100/70 transition-all cursor-pointer focus:outline-none group"
          >
            {/* Avatar on LEFT with online green dot */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border border-gray-200 shadow-sm">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span className={`${currentUser.avatar ? 'hidden ' : ''}w-full h-full flex items-center justify-center text-xs font-bold text-[#7656f4]`}>
                  {currentUser.initials}
                </span>
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* Name & Role Text on RIGHT */}
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#7656f4] transition-colors">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500 capitalize font-medium">{currentUser.role}</p>
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              size={15}
              className={`text-gray-500 transition-transform duration-200 ${
                profileOpen ? 'rotate-180 text-[#7656f4]' : 'group-hover:text-gray-700'
              }`}
            />
          </button>

          {/* Profile Dropdown Menu - Same as Student and Admin */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2.5 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => navigateTo('settings')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 rounded-xl hover:bg-purple-50 hover:text-[#7656f4] transition-colors cursor-pointer group"
                >
                  <Settings size={15} className="text-gray-400 group-hover:text-[#7656f4]" />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    if (onLogout) onLogout();
                  }}
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
    </header>
  );
}
