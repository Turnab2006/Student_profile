const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const calendarDays = [
  30, 31, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 1, 2,
];

export default function MentorCalendar() {
  return (
    <section className="mentor-panel mentor-calendar-panel">
      <div className="mentor-panel-header mentor-calendar-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">🗓</span>
          <h3>Calendar</h3>
        </div>

        <div className="mentor-month-switcher">
          <button type="button" aria-label="Previous month">‹</button>
          <span>January 2024</span>
          <button type="button" aria-label="Next month">›</button>
        </div>
      </div>

      <div className="mentor-calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="mentor-weekday">{day}</div>
        ))}

        {calendarDays.map((day, index) => {
          const isSelected = day === 25 && index === 25;
          const isMuted = index < 2 || index > 33;
          return (
            <div
              key={`${day}-${index}`}
              className={`mentor-calendar-day${isSelected ? ' selected' : ''}${isMuted ? ' muted' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </section>
  );
}
