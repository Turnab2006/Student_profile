function MenteesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#6C4CF5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 2c-3.1 0-7 1.6-7 4.5V19h14v-1.5c0-2.9-3.9-4.5-7-4.5z" />
      <path d="M5.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-1 2c-2.1 0-4.5 1.1-4.5 3V17h4v-1.5c0-.9.4-1.8 1.1-2.4-.2-.1-.4-.1-.6-.1z" />
      <path d="M18.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm1 2c.2 0 .4 0 .6.1.7.6 1.1 1.5 1.1 2.4V17h4v-1.5c0-1.9-2.4-3-4.5-3z" />
    </svg>
  );
}

function AttendanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#22C55E" />
      <path d="M8.5 12.5l2.2 2.2 4.8-4.8" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 18l7.5-7.5 5 5L23 6v13H1V18z" fill="#F59E0B" opacity="0.35" />
      <path d="M1 18l7.5-7.5 5 5L23 6" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h7v7" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CreditPointsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#4F8DFD" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const iconMap = {
  users: MenteesIcon,
  check: AttendanceIcon,
  trend: ResultsIcon,
  star: CreditPointsIcon,
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
