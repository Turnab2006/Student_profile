import { Users, MoreHorizontal } from 'lucide-react';

export default function MentorMenteeChart({ onNavigate }) {
  return (
    <section className="mentor-panel mentor-chart-panel">
      <div className="mentor-panel-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">
            <Users size={16} />
          </span>
          <h3>Total Mentees</h3>
        </div>
        <button
          type="button"
          className="mentor-panel-dots-btn"
          aria-label="Options"
          onClick={() => onNavigate && onNavigate('mentees')}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mentor-chart-wrap">
        <div className="mentor-donut" aria-label="Total mentees donut chart">
          <div className="mentor-donut-inner">
            <strong>25</strong>
            <span>Mentees</span>
          </div>
        </div>
      </div>

      <div className="mentor-chart-legend">
        <div className="mentor-legend-item">
          <span className="legend-dot active"></span>
          <span>Active</span>
          <strong>20</strong>
        </div>
        <div className="mentor-legend-item">
          <span className="legend-dot inactive"></span>
          <span>Inactive</span>
          <strong>5</strong>
        </div>
      </div>
    </section>
  );
}
