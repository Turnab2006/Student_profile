import { Users, CheckCircle, TrendingUp, Star } from 'lucide-react';

const iconMap = {
  users: Users,
  check: CheckCircle,
  trend: TrendingUp,
  star: Star,
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
                <Icon size={20} />
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
