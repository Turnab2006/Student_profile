import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MentorCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const monthTitle = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const calendarDays = (() => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - firstDayIndex);

    const days = [];
    for (let i = 0; i < 42; i += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  })();

  const isSameDay = (d1, d2) => {
    return (
      d1 &&
      d2 &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(new Date(date));
    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#0F172A]">
            <CalendarDays size={18} className="text-slate-700" />
            <h3>Calendar</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              setSelectedDate(now);
              setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
            }}
            className="text-[11px] font-semibold text-[#7656f4] hover:underline cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-1 mb-6">
          <button
            type="button"
            aria-label="Previous month"
            onClick={goToPreviousMonth}
            className="p-1 rounded-lg text-gray-500 hover:text-[#7656f4] hover:bg-[#f0eaff] transition-colors cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="text-xs sm:text-sm font-bold text-gray-800">{monthTitle}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={goToNextMonth}
            className="p-1 rounded-lg text-gray-500 hover:text-[#7656f4] hover:bg-[#f0eaff] transition-colors cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-gray-400 mb-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={`${day}-${index}`}>{day}</div>
          ))}
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs font-medium text-gray-700">
          {calendarDays.map((date) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isSelected = isSameDay(selectedDate, date);
            const isToday = isSameDay(today, date);

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => handleDateClick(date)}
                className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center mx-auto transition-all text-[11px] font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-[#7656f4] font-bold text-white shadow-xs'
                    : isToday
                    ? 'bg-[#f0eaff] text-[#7656f4] font-bold ring-1 ring-[#7656f4]/30'
                    : isCurrentMonth
                    ? 'hover:bg-purple-50 hover:text-[#7656f4] text-gray-700'
                    : 'text-gray-300 hover:text-gray-500'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
