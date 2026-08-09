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
      { id: 'results', label: 'Result', icon: ResultsClipboardIcon },
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

export default function MentorSidebar({ activeTab = 'dashboard', onSelectTab, onLogout }) {
  return (
    <aside className="mentor-sidebar">
      <div className="mentor-brand" onClick={() => onSelectTab && onSelectTab('dashboard')} style={{ cursor: 'pointer' }}>
        <span className="mentor-brand-track">TRACK</span>
        <span className="mentor-brand-academy">ADEMY</span>
      </div>

      <nav className="mentor-sidebar-nav">
        {menuGroups.map((group) => (
          <div key={group.title} className="mentor-nav-group">
            <p className="mentor-group-title">{group.title}</p>
            <div className="mentor-group-items">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectTab && onSelectTab(item.id)}
                    className={`mentor-nav-item${isActive ? ' active' : ''}`}
                  >
                    <Icon className="mentor-nav-icon" size={20} strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <button type="button" className="mentor-logout-btn" onClick={onLogout}>
        <LogOut className="mentor-logout-icon" size={20} strokeWidth={2} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
