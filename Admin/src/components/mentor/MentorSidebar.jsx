import {
  LayoutGrid,
  Users,
  User,
  CalendarCheck,
  Star,
  Megaphone,
  Bell,
  Settings,
  Headset,
  LogOut,
  X,
} from 'lucide-react';

function MessagesCustomIcon({ size = 20, strokeWidth = 2, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 7c0-2.2-1.8-4-4-4H7C4.8 3 3 4.8 3 7v7c0 2.2 1.8 4 4 4h3.5L12 21l1.5-3H17c2.2 0 4-1.8 4-4V7z" />
      <path d="M7.5 11h2l1.5-3 2 6 1.5-3h2" />
    </svg>
  );
}

function ResultsClipboardIcon({ size = 20, strokeWidth = 2, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function SystemSupportHeadsetIcon({ size = 20, strokeWidth = 2, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 11a9 9 0 0 1 18 0v5" />
      <rect x="2" y="12" width="4" height="6" rx="2" />
      <rect x="18" y="12" width="4" height="6" rx="2" />
      <path d="M18 16a5 5 0 0 1-5 5h-2" />
    </svg>
  );
}

const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { id: 'mentees', label: 'Mentee', icon: Users },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'messages', label: 'Message', icon: MessagesCustomIcon },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'results', label: 'Results', icon: ResultsClipboardIcon },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'credit-points', label: 'Credit Point', icon: Star },
    ],
  },
  {
    title: 'ANNOUNCEMENT',
    items: [
      { id: 'notices', label: 'Notice', icon: Megaphone },
      { id: 'activities', label: 'Activity', icon: Bell },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'support', label: 'System Support', icon: SystemSupportHeadsetIcon },
    ],
  },
];

export default function MentorSidebar({
  activeTab = 'dashboard',
  onSelectTab,
  onLogout,
  open = false,
  onClose,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-[240px] shrink-0 flex-col border-r border-gray-100 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-[240px] lg:translate-x-0 lg:shadow-none select-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-[65px] flex items-center justify-between border-b border-gray-100 px-5 shrink-0 select-none">
        <span
          className="block text-lg font-extrabold tracking-wide text-gray-800 cursor-pointer"
          onClick={() => {
            if (onSelectTab) onSelectTab('dashboard');
            if (onClose) onClose();
          }}
        >
          TRACK<span className="text-blue-600">ADEMY</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 lg:hidden cursor-pointer transition-colors"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3.5 py-3.5 space-y-3.5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2.5 mb-1">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (onSelectTab) onSelectTab(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#f0eaff] text-[#7656f4] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#7656f4]'
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className={isActive ? 'text-[#7656f4]' : 'text-slate-400'}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-3 mt-auto">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all cursor-pointer"
          onClick={() => {
            if (onLogout) onLogout();
            if (onClose) onClose();
          }}
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
