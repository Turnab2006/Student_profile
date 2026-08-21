import {
  BookOpen,
  Clock,
  Download,
  User
} from "lucide-react";

export const SUBJECT_THEMES = {
  blue: {
    badgeBg: "bg-[#eef4ff] text-[#2563eb]",
    iconBg: "bg-[#2563eb] shadow-blue-500/25 text-white",
    clockColor: "text-[#2563eb]",
    attendanceColor: "text-[#2563eb]",
    progressColor: "bg-[#2563eb]",
    btnBg: "bg-[#eef4ff] hover:bg-[#dbeafe] text-[#2563eb]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-blue-50/30 via-white to-white",
  },
  green: {
    badgeBg: "bg-[#ecfdf5] text-[#10b981]",
    iconBg: "bg-[#10b981] shadow-emerald-500/25 text-white",
    clockColor: "text-[#10b981]",
    attendanceColor: "text-[#10b981]",
    progressColor: "bg-[#10b981]",
    btnBg: "bg-[#ecfdf5] hover:bg-[#d1fae5] text-[#10b981]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-emerald-50/30 via-white to-white",
  },
  purple: {
    badgeBg: "bg-[#f5f3ff] text-[#7c3aed]",
    iconBg: "bg-[#8b5cf6] shadow-purple-500/25 text-white",
    clockColor: "text-[#8b5cf6]",
    attendanceColor: "text-[#8b5cf6]",
    progressColor: "bg-[#8b5cf6]",
    btnBg: "bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#7c3aed]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-purple-50/30 via-white to-white",
  },
  orange: {
    badgeBg: "bg-[#fff7ed] text-[#ea580c]",
    iconBg: "bg-[#f97316] shadow-orange-500/25 text-white",
    clockColor: "text-[#f97316]",
    attendanceColor: "text-[#f97316]",
    progressColor: "bg-[#f97316]",
    btnBg: "bg-[#fff7ed] hover:bg-[#ffedd5] text-[#ea580c]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-orange-50/30 via-white to-white",
  },
  pink: {
    badgeBg: "bg-[#fdf2f8] text-[#db2777]",
    iconBg: "bg-[#ec4899] shadow-pink-500/25 text-white",
    clockColor: "text-[#ec4899]",
    attendanceColor: "text-[#ec4899]",
    progressColor: "bg-[#ec4899]",
    btnBg: "bg-[#fdf2f8] hover:bg-[#fce7f3] text-[#db2777]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-pink-50/30 via-white to-white",
  },
  teal: {
    badgeBg: "bg-[#ecfeff] text-[#0891b2]",
    iconBg: "bg-[#06b6d4] shadow-cyan-500/25 text-white",
    clockColor: "text-[#06b6d4]",
    attendanceColor: "text-[#06b6d4]",
    progressColor: "bg-[#06b6d4]",
    btnBg: "bg-[#ecfeff] hover:bg-[#cffafe] text-[#0891b2]",
    cardBorder: "border-slate-100/90",
    cardBgGlow: "from-cyan-50/30 via-white to-white",
  },
};

const THEME_KEYS = ["blue", "green", "purple", "orange", "pink", "teal"];

export default function SubjectCard({
  subject,
  index = 0,
  onDownload,
  className = "",
  showAttendance = true,
}) {
  const code = subject?.code || "CS501";
  const name = subject?.name || "Design & Analysis of Algorithms";
  const credits = subject?.credits !== undefined ? subject?.credits : 4;
  const instructor = subject?.facultyName || subject?.instructor || "Dr. Kaushik Chatterjee";
  const lectureHours = subject?.lectureHours || subject?.totalHours || subject?.hours || "45 Hours";
  const totalClasses = subject?.totalClasses || subject?.total || 36;
  const attendedClasses = subject?.attendedClasses || subject?.attended || 34;
  const attendancePct = typeof subject?.attendance === "string" 
    ? parseInt(subject.attendance.replace("%", ""), 10) 
    : (subject?.attendance || 94);

  // Resolve theme
  const themeKey = subject?.colorTheme || subject?.theme || THEME_KEYS[index % THEME_KEYS.length] || "blue";
  const theme = SUBJECT_THEMES[themeKey] || SUBJECT_THEMES.blue;

  return (
    <div
      className={`group relative overflow-hidden bg-white bg-gradient-to-b ${theme.cardBgGlow} rounded-[15px] border ${theme.cardBorder} p-5 shadow-sm shadow-slate-200/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-200 flex flex-col justify-between font-['Roboto',sans-serif] ${className}`}
    >
      {/* Decorative top-right background shine */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />

      <div>
        {/* 1. Top Badges: Subject Code (Left) & Credits (Right) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-3 py-0.5 rounded-full text-xs font-bold tracking-wide ${theme.badgeBg}`}>
            {code}
          </span>
          <span className={`px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide ${theme.badgeBg}`}>
            {credits} Credits
          </span>
        </div>

        {/* 2. Common Icon (BookOpen for all subjects) + Title + Instructor */}
        <div className="flex items-start gap-3.5 my-2">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${theme.iconBg} transition-transform group-hover:scale-105`}
          >
            <BookOpen size={22} className="stroke-[2.2]" />
          </div>

          <div className="overflow-hidden">
            <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
              {name}
            </h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
              <User size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{instructor}</span>
            </p>
          </div>
        </div>

        {/* 3. Split Info Block: Lecture Hours (Left) & Classes (Right) */}
        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-slate-100 my-3 text-xs">
          {/* Left Column: Lecture Hours */}
          <div className="space-y-0.5 border-r border-slate-100 pr-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
              <Clock size={14} className={`stroke-[2.4] ${theme.clockColor}`} />
              <span>Lecture Hours</span>
            </div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm pl-5">
              {typeof lectureHours === "number" ? `${lectureHours} Hours` : lectureHours}
            </p>
          </div>

          {/* Right Column: Classes */}
          <div className="space-y-0.5 pl-2">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
              <BookOpen size={14} className={`stroke-[2.4] ${theme.clockColor}`} />
              <span>Classes</span>
            </div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm pl-5">
              {totalClasses} Classes
            </p>
          </div>
        </div>

        {/* 4. Attendance Panel (Only rendered when showAttendance is true) */}
        {showAttendance && (
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100/80 space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500 font-medium">Attendance</span>
              <span className={`font-extrabold text-sm ${theme.attendanceColor}`}>
                {attendancePct}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${theme.progressColor}`}
                style={{ width: `${Math.min(attendancePct, 100)}%` }}
              />
            </div>

            {/* Attended / Total Classes count */}
            <div className="text-[11px] font-semibold text-slate-400 pt-0.5">
              {attendedClasses} / {totalClasses} Classes
            </div>
          </div>
        )}
      </div>

      {/* 5. Download Syllabus Button */}
      <button
        type="button"
        onClick={() => onDownload ? onDownload(subject) : null}
        className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-sm active:scale-[0.99] ${theme.btnBg}`}
      >
        <Download size={14} className="stroke-[2.4]" />
        <span>Download Syllabus</span>
      </button>
    </div>
  );
}
