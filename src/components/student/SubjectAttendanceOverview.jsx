import { useState } from "react";
import {
  BookOpen,
  Info,
  Hash,
  Clock,
  Calendar,
  Award
} from "lucide-react";

export default function SubjectAttendanceOverview({
  subjects,
  title = "Subject Attendance Overview",
  showHeader = true,
  cardClassName = "bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5",
  isMentor = false,
  userRole = null,
  theme = null,
}) {
  const isMentorMode = isMentor || userRole === 'mentor' || theme === 'purple';
  const [showAttendanceInfo, setShowAttendanceInfo] = useState(false);

  // Default subject dataset matching the reference mockup
  const defaultSubjects = [
    { code: "CS301", name: "Data Structures", attended: 57, total: 60, percentage: 95 },
    { code: "CS302", name: "Algorithms", attended: 47, total: 60, percentage: 78 },
    { code: "CS303", name: "Database Systems", attended: 53, total: 60, percentage: 88 },
    { code: "CS304", name: "Operating Systems", attended: 37, total: 60, percentage: 62 },
    { code: "CS305", name: "Computer Networks", attended: 55, total: 60, percentage: 91 },
    { code: "CS306", name: "Software Engineering", attended: 27, total: 60, percentage: 45 },
  ];

  const items = (subjects && subjects.length > 0) ? subjects : defaultSubjects;

  return (
    <div className={cardClassName}>
      {/* Header matching Profile Result Tab style (text-sm sm:text-base font-bold text-slate-800 with border-b) */}
      {showHeader && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className={`flex items-center gap-2.5 ${isMentorMode ? "text-[#7656f4]" : "text-blue-600"}`}>
            <BookOpen size={18} className="stroke-[2.2]" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <span>{title}</span>
            </h3>
          </div>

          {/* Interactive Info Button with Hover Pop-up */}
          <div
            className="relative inline-flex items-center group"
            onMouseEnter={() => setShowAttendanceInfo(true)}
            onMouseLeave={() => setShowAttendanceInfo(false)}
          >
            <button
              type="button"
              onClick={() => setShowAttendanceInfo(!showAttendanceInfo)}
              className={`h-5 w-5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                isMentorMode
                  ? "bg-[#f0eaff] hover:bg-[#7656f4] hover:text-white text-[#7656f4] border border-purple-200/70 hover:border-[#7656f4]"
                  : "bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200/70 hover:border-blue-600"
              }`}
              aria-label="Subject Attendance Information"
            >
              <Info size={11} className="stroke-[2.4]" />
            </button>

            {/* Hover Pop-up Tooltip */}
            <div
              className={`absolute right-0 top-full mt-2 w-72 sm:w-80 p-3 rounded-xl bg-slate-900/95 text-white shadow-xl backdrop-blur-md border border-slate-700/80 z-30 transition-all duration-200 pointer-events-none ${
                showAttendanceInfo
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
              }`}
            >
              {/* Arrow Pointer */}
              <div className="absolute -top-1.5 right-2 sm:right-3 w-3 h-3 bg-slate-900 rotate-45 border-t border-r border-slate-700/80" />

              <div className="relative flex items-start gap-2.5">
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white mt-0.5 shadow-2xs ${isMentorMode ? "bg-[#7656f4]" : "bg-blue-500"}`}>
                  <Info size={11} className="stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-100 leading-snug">
                    Attendance Details
                  </p>
                  <p className="text-[11px] text-slate-300 font-normal leading-relaxed">
                    View your attendance percentage and class summary for each subject.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Subject Attendance Overview Table (Visible on mobile < md: 3 Columns Only) */}
      <div className="block md:hidden w-full overflow-hidden">
        <table className="w-full table-fixed text-left border-collapse">
          <thead>
            <tr className={`${isMentorMode ? "bg-[#f8f6fe] text-[#7656f4]" : "bg-[#f0f6ff]/90 text-[#1d61e7]"} text-[11px] font-bold rounded-xl overflow-hidden`}>
              <th className="w-[44%] py-2.5 px-2 rounded-l-xl text-left whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <BookOpen size={13} className={`w-3.5 h-3.5 shrink-0 ${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span className="truncate">Subject Name</span>
                </div>
              </th>
              <th className="w-[27%] py-2.5 px-2 text-center whitespace-nowrap">
                <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                  <Calendar size={13} className={`w-3.5 h-3.5 shrink-0 ${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>Attended</span>
                </div>
              </th>
              <th className="w-[29%] py-2.5 px-2 pr-2.5 rounded-r-xl text-center whitespace-nowrap">
                <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                  <Clock size={13} className={`w-3.5 h-3.5 shrink-0 ${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>Attendance</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const subCode = item.code || item.subjectCode;
              const subName = item.name || item.subject;
              const attendedCount = Number(item.attended) || 0;
              const totalCount = Number(item.total) || 60;
              const displayPct = item.percentage !== undefined
                ? item.percentage
                : Math.round((attendedCount / totalCount) * 100);
              const numericPct = Number(displayPct);

              let statusBadge = "bg-[#edf9f0] text-[#16a34a]";
              if (numericPct < 75) {
                statusBadge = "bg-[#fef2f2] text-[#dc2626]";
              } else if (numericPct <= 80) {
                statusBadge = "bg-[#fefce8] text-[#ca8a04]";
              }

              return (
                <tr key={`mobile-${subCode}`} className="hover:bg-slate-50/70 transition-colors">
                  {/* 1. Complete Subject Name (Allowed to wrap naturally) */}
                  <td className="w-[44%] py-3 px-2 rounded-l-xl text-left align-middle">
                    <span className="font-semibold text-slate-800 text-xs leading-snug break-words">
                      {subName}
                    </span>
                  </td>

                  {/* 2. Classes Attended (e.g. 35/40) */}
                  <td className="w-[27%] py-3 px-2 text-center align-middle font-bold text-slate-700 text-xs whitespace-nowrap">
                    {attendedCount} / {totalCount}
                  </td>

                  {/* 3. Attendance Percentage (e.g. 87.5%) */}
                  <td className="w-[29%] py-3 px-2 pr-2.5 rounded-r-xl text-center align-middle whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-extrabold ${statusBadge} shadow-2xs`}>
                      {displayPct}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Main Desktop Table Layout (Visible on md+: 5 Columns Completely Unchanged) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className={`${isMentorMode ? "bg-[#f8f6fe] text-[#7656f4]" : "bg-[#f0f6ff]/90 text-[#1d61e7]"} text-xs font-bold rounded-2xl overflow-hidden`}>
              <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Hash size={14} className={`${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>SUBJECT CODE</span>
                </div>
              </th>
              <th className="py-4 px-5 whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <BookOpen size={14} className={`${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>SUBJECT NAME</span>
                </div>
              </th>
              <th className="py-4 px-5 whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Clock size={14} className={`${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>ATTENDANCE %</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center whitespace-nowrap">
                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                  <Calendar size={14} className={`${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>CLASSES ATTENDED</span>
                </div>
              </th>
              <th className="py-4 px-5 rounded-r-2xl whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Award size={14} className={`${isMentorMode ? "text-[#7656f4]" : "text-[#1d61e7]"} stroke-[2.4]`} />
                  <span>STATUS</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const subCode = item.code || item.subjectCode;
              const subName = item.name || item.subject;
              const attendedCount = Number(item.attended) || 0;
              const totalCount = Number(item.total) || 60;
              const pct = item.percentage !== undefined
                ? Math.round(Number(item.percentage))
                : Math.round((attendedCount / totalCount) * 100);

              // Strict threshold rules:
              // Below 75% -> Red
              // 75% - 80% -> Yellow
              // Above 80% -> Green
              let barColor = "bg-[#22c55e]"; // Green (> 80%)
              let statusLabel = pct >= 90 ? "Excellent" : "Very Good";
              let statusBadge = "bg-[#edf9f0] text-[#16a34a]";
              let dotColor = "bg-[#16a34a]";

              if (pct < 75) {
                barColor = "bg-[#ef4444]"; // Red (< 75%)
                statusLabel = "At Risk";
                statusBadge = "bg-[#fef2f2] text-[#dc2626]";
                dotColor = "bg-[#dc2626]";
              } else if (pct <= 80) {
                barColor = "bg-[#eab308]"; // Yellow (75% to 80%)
                statusLabel = "Good";
                statusBadge = "bg-[#fefce8] text-[#ca8a04]";
                dotColor = "bg-[#ca8a04]";
              }

              return (
                <tr key={subCode} className="hover:bg-slate-50/70 transition-colors">
                  {/* 1. Subject Code */}
                  <td className={`py-4 px-5 font-extrabold text-sm tracking-tight ${isMentorMode ? "text-[#7656f4]" : "text-blue-600"}`}>
                    {subCode}
                  </td>

                  {/* 2. Subject Name */}
                  <td className="py-4 px-5 font-semibold text-slate-800 text-sm">
                    {subName}
                  </td>

                  {/* 3. Attendance % (Progress Bar + Percentage Value) */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-28 sm:w-36 bg-slate-100 rounded-full h-2 overflow-hidden shrink-0">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 shrink-0">
                        {pct}%
                      </span>
                    </div>
                  </td>

                  {/* 4. Classes Attended (Centered) */}
                  <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm">
                    {attendedCount} / {totalCount}
                  </td>

                  {/* 5. Status Badge with Dot */}
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusBadge} shadow-2xs`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      {statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

