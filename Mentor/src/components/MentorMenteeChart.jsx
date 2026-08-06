export default function MentorMenteeChart() {
  return (
    <section className="mentor-panel mentor-chart-panel">
      <div className="mentor-panel-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">👥</span>
          <h3>Total Mentees</h3>
        </div>
        <span className="mentor-panel-dots">•••</span>
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
