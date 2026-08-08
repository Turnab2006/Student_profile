import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const weekDays = [
  { day: 'Mo', isWeekend: false },
  { day: 'Tu', isWeekend: false },
  { day: 'We', isWeekend: false },
  { day: 'Th', isWeekend: false },
  { day: 'Fr', isWeekend: false },
  { day: 'Sa', isWeekend: true },
  { day: 'Su', isWeekend: true },
];

const monthsList = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MentorCalendar() {
  const [now, setNow] = useState(() => new Date());
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Automatically update system date/time state every 30 seconds so it advances every day seamlessly
  useEffect(() => {
    const timer = setInterval(() => {
      const updated = new Date();
      setNow(updated);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonthToday =
    now.getFullYear() === year && now.getMonth() === month;

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days for current month grid (Monday start)
  const getCalendarCells = () => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust for Monday start: Mon=0, Tue=1, ..., Sun=6
    const offset = (firstDayIndex + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // Prev month trailing days
    for (let i = offset - 1; i >= 0; i--) {
      cells.push({
        dayNumber: daysInPrevMonth - i,
        isMuted: true,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = isCurrentMonthToday && now.getDate() === d;
      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === d;

      cells.push({
        dayNumber: d,
        isMuted: false,
        isCurrentMonth: true,
        isToday,
        isSelected,
        dateObj: new Date(year, month, d),
      });
    }

    // Next month leading days to complete 35 or 42 grid cells
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({
        dayNumber: i,
        isMuted: true,
        isCurrentMonth: false,
      });
    }

    return cells;
  };

  const cells = getCalendarCells();

  return (
    <section className="mentor-panel mentor-calendar-panel">
      <div className="mentor-panel-header mentor-calendar-header">
        <div className="mentor-panel-title-wrap">
          <span className="mentor-panel-icon">
            <CalendarIcon size={16} />
          </span>
          <h3>Calendar</h3>
        </div>

        <div className="mentor-month-switcher">
          <button type="button" aria-label="Previous month" onClick={handlePrevMonth}>
            <ChevronLeft size={14} />
          </button>
          <span>{`${monthsList[month]} ${year}`}</span>
          <button type="button" aria-label="Next month" onClick={handleNextMonth}>
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

        {cells.map((cell, index) => {
          const { dayNumber, isMuted, isSelected, isToday, dateObj } = cell;
          const activeClass = isSelected || isToday ? ' selected' : '';
          const mutedClass = isMuted ? ' muted' : '';

          return (
            <div
              key={`${dayNumber}-${index}`}
              className={`mentor-calendar-day${activeClass}${mutedClass}`}
              onClick={() => dateObj && setSelectedDate(dateObj)}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </section>
  );
}
