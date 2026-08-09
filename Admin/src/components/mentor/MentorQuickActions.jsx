import { Zap, UserPlus, ClipboardList, Star, GraduationCap, MoreHorizontal } from 'lucide-react';

const actions = [
  { title: 'Upload Attendance', icon: UserPlus, tab: 'attendance' },
  { title: 'Upload Results', icon: ClipboardList, tab: 'results' },
  { title: 'Upload Credit Point', icon: Star, tab: 'credit-points' },
  { title: 'View Mentee', icon: GraduationCap, tab: 'mentees' },
];

export default function MentorQuickActions({ onNavigate }) {
  return (
    <section className="mentor-panel mentor-actions-panel">
      <div className="mentor-panel-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">
            <Zap size={19} />
          </span>
          <h3>Quick Actions</h3>
        </div>
        <button type="button" className="mentor-panel-dots-btn" aria-label="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mentor-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              type="button"
              className="mentor-action-card"
              onClick={() => onNavigate && onNavigate(action.tab)}
            >
              <span className="mentor-action-icon">
                <Icon size={22} strokeWidth={2.2} />
              </span>
              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
