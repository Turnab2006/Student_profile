import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, HelpCircle, ChevronDown, Settings, LogOut, Megaphone, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MENTOR_DETAILS } from '../../data/mentorData';

export default function MentorNavbar({
  activeTab = 'dashboard',
  user = MENTOR_DETAILS,
  onSelectTab,
  onLogout,
  onOpenSidebar,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const containerRef = useRef(null);

  const currentUser = {
    name: user?.name || user?.fullName || MENTOR_DETAILS.fullName,
    firstName: user?.firstName || (user?.name || user?.fullName || MENTOR_DETAILS.name).split(' ')[0],
    role: user?.role || user?.designation || MENTOR_DETAILS.role,
    avatar: user?.avatar || MENTOR_DETAILS.avatar,
    initials: user?.initials || MENTOR_DETAILS.initials,
  };

  const pageMeta = {
    dashboard: {
      title: 'Dashboard',
      subtitle: `Welcome back, ${currentUser.firstName}! Here's what's happening today.`,
    },
    mentees: {
      title: 'Mentees',
      subtitle: 'Manage and view your assigned student mentees.',
    },
    'student-profile': {
      title: 'Student Profile',
      subtitle: 'Comprehensive academic and personal record of mentee.',
    },
    profile: {
      title: 'Mentor Profile',
      subtitle: 'View and update your mentor profile information.',
    },
    messages: {
      title: 'Messages',
      subtitle: 'Chat and communicate with your assigned mentees.',
    },
    results: {
      title: 'Results',
      subtitle: "Manage and upload mentees' academic results and grades.",
    },
    attendance: {
      title: 'Attendances',
      subtitle: 'Track and record student attendance records.',
    },
    'credit-points': {
      title: 'Credit Points',
      subtitle: 'Award and review student credit points and achievements.',
    },
    notices: {
      title: 'Notices',
      subtitle: 'Latest campus announcements and official circulars.',
    },
    activities: {
      title: 'Activities',
      subtitle: 'Track student extracurricular events and activity logs.',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage portal preferences and configurations.',
    },
    support: {
      title: 'Support Center',
      subtitle: 'Help desk and technical assistance for mentors.',
    },
  };

  const currentMeta = pageMeta[activeTab] || {
    title: activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Dashboard',
    subtitle: `Welcome back, ${currentUser.firstName}! Here's what's happening today.`,
  };

  const notifications = [
    {
      id: '1',
      title: 'New Project Deadline Extended',
      desc: 'Final term project deadline is extended to Aug 15.',
      time: '10 mins ago',
      icon: Megaphone,
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: '2',
      title: 'Mentee Attendance Alert',
      desc: '2 mentees are below 75% attendance threshold.',
      time: '1 hour ago',
      icon: AlertTriangle,
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: '3',
      title: 'Semester Grade Submission',
      desc: 'Grade submission portal for Semester V is now active.',
      time: '3 hours ago',
      icon: CheckCircle2,
      iconBg: 'bg-blue-100 text-blue-600',
    },
  ];

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
    <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs w-full font-['Roboto',sans-serif]">
      {/* Left side: Mobile menu button + Title & Subtitle matching Admin header */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
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
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Bell + Help Circle + Divider + User Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5 relative select-none shrink-0" ref={containerRef}>
        {/* Notification Bell */}
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
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigateTo('notices')}
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
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
          title="Support Center"
          aria-label="Support Center"
        >
          <HelpCircle size={19} className="stroke-[1.8]" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-[1px] bg-gray-200" />

        {/* User Profile Block matching Admin profile styling */}
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
            {/* Avatar on LEFT with online green dot */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border border-gray-200 shadow-xs ring-2 ring-purple-500/20">
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

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2.5 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => navigateTo('settings')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#7656f4] rounded-xl transition-colors cursor-pointer"
                >
                  <Settings size={15} className="text-gray-400 group-hover:text-[#7656f4]" />
                  <span>Settings</span>
                </button>

                <div className="h-[1px] bg-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    if (onLogout) onLogout();
                  }}
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
