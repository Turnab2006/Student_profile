import {
  LayoutGrid,
  Users,
  User,
  MessageSquare,
  ClipboardList,
  CalendarCheck,
  Star,
  Megaphone,
  Bell,
  Settings,
  Headphones,
  LogOut,
} from 'lucide-react';

const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { id: 'mentees', label: 'Mentee', icon: Users },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'messages', label: 'Message', icon: MessageSquare },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'results', label: 'Result', icon: ClipboardList },
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
      { id: 'support', label: 'System Support', icon: Headphones },
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
                    <Icon className="mentor-nav-icon" size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <button type="button" className="mentor-logout-btn" onClick={onLogout}>
        <LogOut className="mentor-logout-icon" size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
