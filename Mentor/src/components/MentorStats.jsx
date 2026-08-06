import { FiCheckCircle, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';

const iconMap = {
  users: FiUsers,
  check: FiCheckCircle,
  trend: FiTrendingUp,
  star: FiStar,
};

export default function MentorStats({ items }) {
  return (
    <div className="mentor-stats-container">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <section key={item.title} className={`mentor-stat-item accent-${item.accent}`}>
            <div className="mentor-stat-icon-box">
              <div className="mentor-stat-icon">
                <Icon />
              </div>
            </div>
            <div className="mentor-stat-copy">
              <strong>{item.value}</strong>
              <span>{item.title}</span>
            </div>
          </section>
        );
      })}
    </div>
  );
}
