import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const weekDays = [
  { day: 'Mo', isWeekend: false },
  { day: 'Tu', isWeekend: false },
  { day: 'We', isWeekend: false },
  { day: 'Th', isWeekend: false },
  { day: 'Fr', isWeekend: false },
  { day: 'Sa', isWeekend: true },
  { day: 'Su', isWeekend: true },
];

const calendarDays = [
  30, 31, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 1, 2,
  3, 4, 5, 6, 7, 8, 9
];

export default function MentorCalendar() {
  return (
    <section className="mentor-panel mentor-calendar-panel">
      <div className="mentor-panel-header mentor-calendar-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">
            <Calendar size={16} />
          </span>
          <h3>Calendar</h3>
        </div>

        <div className="mentor-month-switcher">
          <button type="button" aria-label="Previous month">
            <ChevronLeft size={14} />
          </button>
          <span>January 2024</span>
          <button type="button" aria-label="Next month">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="mentor-calendar-grid">
        {weekDays.map(({ day, isWeekend }) => (
          <div key={day} className={`mentor-weekday${isWeekend ? ' weekend' : ''}`}>
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isSelected = day === 25 && index === 26;
          const isMuted = index < 2 || index >= 33;
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
