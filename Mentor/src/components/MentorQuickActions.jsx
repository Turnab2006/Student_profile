import { FiFileText, FiUpload, FiUsers, FiAward } from 'react-icons/fi';

const actions = [
  { title: 'Upload Attendance', icon: FiUsers },
  { title: 'Upload Results', icon: FiFileText },
  { title: 'Upload Credit Points', icon: FiAward },
  { title: 'View Mentees', icon: FiUpload },
];

export default function MentorQuickActions() {
  return (
    <section className="mentor-panel mentor-actions-panel">
      <div className="mentor-panel-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">⚡</span>
          <h3>Quick Actions</h3>
        </div>
        <span className="mentor-panel-dots">•••</span>
      </div>

      <div className="mentor-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.title} type="button" className="mentor-action-card">
              <span className="mentor-action-icon">
                <Icon />
              </span>
              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
