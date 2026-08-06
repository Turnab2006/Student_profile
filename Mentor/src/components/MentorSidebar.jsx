import {
  FiGrid,
  FiUsers,
  FiUser,
  FiMessageSquare,
  FiBarChart2,
  FiCalendar,
  FiCreditCard,
  FiBell,
  FiActivity,
  FiSettings,
  FiHeadphones,
  FiLogOut,
} from 'react-icons/fi';
import { LiaMedalSolid } from 'react-icons/lia';

const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', icon: FiGrid, active: true },
      { label: 'Mentees', icon: FiUsers },
      { label: 'Profile', icon: FiUser },
      { label: 'Messages', icon: FiMessageSquare },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { label: 'Results', icon: FiBarChart2 },
      { label: 'Attendance', icon: FiCalendar },
      { label: 'Credit Points', icon: LiaMedalSolid },
    ],
  },
  {
    title: 'ANNOUNCEMENT',
    items: [
      { label: 'Notice', icon: FiBell },
      { label: 'Activity', icon: FiActivity },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', icon: FiSettings },
      { label: 'System Support', icon: FiHeadphones },
    ],
  },
];

export default function MentorSidebar() {
  return (
    <aside className="mentor-sidebar mentor-sidebar--compact mentor-sidebar--refined">
      <div className="mentor-brand">
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
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`mentor-nav-item${item.active ? ' active' : ''}`}
                  >
                    <Icon className="mentor-nav-icon" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <button type="button" className="mentor-logout-btn">
        <FiLogOut className="mentor-nav-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
