import { useState, useRef, useEffect } from "react";
import {
  Award,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Mail,
  Megaphone,
  Phone,
  Star,
  User,
  XCircle,
  Zap
} from "lucide-react";
import StudentSidebar from "../../components/student/StudentSidebar";
import StudentHeader from "../../components/student/StudentHeader";
import StudentProfile from "./StudentProfile";
import StudentSubjects from "./StudentSubjects";
import StudentResults from "./StudentResults";
import StudentAttendance from "./StudentAttendance";
import StudentCreditPoints from "./StudentCreditPoints";
import StudentMessages from "./StudentMessages";
import StudentActivities from "./StudentActivities";
import StudentNotices from "./StudentNotices";
import StudentSettings from "./StudentSettings";
import StudentSupport from "./StudentSupport";
import { tuhinaStudentData, tanukaStudentData } from "../../data/studentProfileData";

const semesterAttendanceData = {
  1: { percentage: 91, attended: 98, absent: 10 },
  2: { percentage: 94, attended: 106, absent: 7 },
  3: { percentage: 89, attended: 96, absent: 12 },
  4: { percentage: 93, attended: 104, absent: 8 },
  5: { percentage: 95, attended: 112, absent: 6 },
  6: { percentage: 92, attended: 102, absent: 9 },
  7: { percentage: 90, attended: 99, absent: 11 },
  8: { percentage: 96, attended: 108, absent: 4 },
};

const statCardsConfig = [
  {
    key: "attendance",
    label: "Attendance",
    note: "Classes attended",
    icon: CalendarCheck,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-red-500",
    valueClass: "text-slate-900",
    iconWrap: "bg-[#fff1f1] text-red-500",
    pageKey: "attendances",
  },
  {
    key: "events",
    label: "Active Events",
    value: "6",
    note: "Upcoming events",
    icon: CalendarDays,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#2d6df6]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#ecf3ff] text-[#2d6df6]",
    pageKey: "activities",
  },
  {
    key: "notices",
    label: "Active Notices",
    value: "5",
    note: "Unread notices",
    icon: Megaphone,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#f59e0b]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff1dc] text-[#f59e0b]",
    pageKey: "notices",
  },
  {
    key: "credits",
    label: "Credit Points",
    value: "45",
    note: "Earn more to grow",
    icon: Star,
    cardClass: "bg-white text-emerald-700 border border-emerald-200 border-l-4 border-l-emerald-500",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#e7f7ec] text-emerald-600",
    pageKey: "credit-points",
  },
];

const quickActions = [
  {
    label: "View Results",
    icon: ClipboardList,
    tone: "bg-[#F0F5FF]",
    borderTone: "border-[#D6E4FF]",
    iconTone: "text-[#2384FD]",
    iconBg: "bg-white/90",
    textTone: "text-[#2384FD]",
    pageKey: "results",
  },
  {
    label: "View Notices",
    icon: Megaphone,
    tone: "bg-[#FFF9EE]",
    borderTone: "border-[#FFE8C2]",
    iconTone: "text-[#F59E0B]",
    iconBg: "bg-white/90",
    textTone: "text-[#D97706]",
    pageKey: "notices",
  },
  {
    label: "View Events",
    icon: CalendarDays,
    tone: "bg-[#F9F5FF]",
    borderTone: "border-[#ECD9FF]",
    iconTone: "text-[#8B5CF6]",
    iconBg: "bg-white/90",
    textTone: "text-[#8B5CF6]",
    pageKey: "activities",
  },
  {
    label: "View Credit Point",
    icon: Star,
    tone: "bg-[#F0FDF4]",
    borderTone: "border-[#DCFCE7]",
    iconTone: "text-[#16A34A]",
    iconBg: "bg-white/90",
    textTone: "text-[#16A34A]",
    pageKey: "credit-points",
  },
];

export default function StudentDashboard({ onLogout }) {
  const today = new Date();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [profileTab, setProfileTab] = useState("academic");
  const [isDigitalCardActive, setIsDigitalCardActive] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [attendanceSemester, setAttendanceSemester] = useState(4);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const semesterDropdownRef = useRef(null);

  const currentAttendance = semesterAttendanceData[attendanceSemester] || semesterAttendanceData[4];

  const statCards = statCardsConfig.map((card) => {
    if (card.key === "attendance") {
      return {
        ...card,
        value: `${currentAttendance.percentage}%`,
      };
    }
    return card;
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (semesterDropdownRef.current && !semesterDropdownRef.current.contains(e.target)) {
        setSemesterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthTitle = currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" });

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

  const handleSelectDate = (date) => {
    setSelectedDate(new Date(date));
    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  function handleNavigate(pageKey) {
    if (pageKey === "logout") {
      if (onLogout) onLogout();
      return;
    }
    if (pageKey !== "profile") {
      setIsDigitalCardActive(false);
    }
    setCurrentPage(pageKey);
    setMobileSidebarOpen(false);
  }

  function renderStudentContent() {
    switch (currentPage) {
      case "profile":
        return (
          <StudentProfile
            studentData={tanukaStudentData}
            onBack={() => {
              if (isDigitalCardActive) {
                setIsDigitalCardActive(false);
              } else {
                setCurrentPage("dashboard");
              }
            }}
            userRole="student"
            defaultTab={profileTab}
            hideHeader={true}
            showDigitalCard={isDigitalCardActive}
            onToggleDigitalCard={setIsDigitalCardActive}
          />
        );

      case "subjects":
        return <StudentSubjects hideHeader={true} />;

      case "results":
        return <StudentResults hideHeader={true} />;

      case "attendances":
        return <StudentAttendance hideHeader={true} />;

      case "credit-points":
        return <StudentCreditPoints hideHeader={true} />;

      case "message":
        return <StudentMessages hideHeader={true} />;

      case "activities":
        return <StudentActivities onNavigate={setCurrentPage} hideHeader={true} />;

      case "notices":
        return <StudentNotices onNavigate={setCurrentPage} hideHeader={true} />;

      case "settings":
        return <StudentSettings hideHeader={true} />;

      case "support":
        return <StudentSupport hideHeader={true} />;

      case "dashboard":
      default:
        return (
          <main className="space-y-2.5 p-2 sm:px-5 sm:py-2.5">
            {/* Top Grid: Profile Hero Banner & Rank Card */}
            <section className="grid gap-2.5 xl:grid-cols-[1.8fr_0.8fr]">
              {/* Student Hero Summary Card matching UI reference */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm group flex flex-col justify-center">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6">
                  {/* Avatar Image */}
                  <div className="w-[125px] h-[125px] sm:w-[130px] sm:h-[130px] rounded-[16px] overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                    <img
                      src="/tuhina_avatar.jpg"
                      alt="Tuhina Banerjee"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 items-center justify-center text-3xl font-bold text-blue-700">
                      TB
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-[25px] font-bold text-gray-900 tracking-tight leading-tight">
                      Tuhina Banerjee
                    </h2>
                    <p className="text-xs sm:text-[13px] text-gray-500 font-normal mt-2 mb-4">
                      B.Tech | Computer Science &amp; Engineering
                    </p>

                    {/* User Info Area with Light Blue Background & Border */}
                    <div className="bg-[#F2F7FF] rounded-2xl border border-[#DCE8FC] p-2.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-fit sm:w-auto">
                      {/* Left Column */}
                      <div className="space-y-3 shrink-0">
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700">
                          <Mail size={15} className="text-gray-800 shrink-0 stroke-[1.8]" />
                          <span>
                            <strong className="font-semibold text-gray-900">Email :</strong>{" "}
                            <span className="text-gray-600">tuhinabanerjee134@gmail.com</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700">
                          <Phone size={15} className="text-gray-800 shrink-0 stroke-[1.8]" />
                          <span>
                            <strong className="font-semibold text-gray-900">Phone :</strong>{" "}
                            <span className="text-gray-600">+91-9999999999</span>
                          </span>
                        </div>
                      </div>

                      {/* Vertical Divider */}
                      <div className="hidden sm:block w-[1px] h-9 bg-[#D4E4FC] self-center" />

                      {/* Right Column */}
                      <div className="space-y-2 shrink-0">
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700">
                          <User size={15} className="text-gray-800 shrink-0 stroke-[1.8]" />
                          <span>
                            <strong className="font-semibold text-gray-900">College Roll :</strong>{" "}
                            <span className="text-gray-600">CSE2024012</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700">
                          <GraduationCap size={15} className="text-gray-800 shrink-0 stroke-[1.8]" />
                          <span>
                            <strong className="font-semibold text-gray-900">University Roll :</strong>{" "}
                            <span className="text-gray-600">11700124178</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rank Card */}
              <div className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm text-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold leading-none text-slate-800">
                    <Award size={18} className="text-slate-700" />
                    <span>Academic Rank</span>
                  </div>

                  <div className="relative w-[95px]">
                    <select
                      defaultValue="CSE"
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-[#f1f3f5] px-2.5 py-1 pr-6 text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-300"
                      aria-label="Select department"
                    >
                      <option value="CSE">CSE</option>
                      <option value="EE">EE</option>
                      <option value="ECE">ECE</option>
                      <option value="AIML">AIML</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" size={13} />
                  </div>
                </div>

                <div className="my-1.5 text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl sm:text-[34px] font-bold tracking-tight text-[#2384FD] leading-none">1</span>
                    <span className="text-xl sm:text-[20px] font-semibold text-slate-400 leading-none">/ 30</span>
                  </div>
                </div>

                <div>
                  <div className="h-2 w-[85%] mx-auto overflow-hidden rounded-full bg-[#dfe3ea]">
                    <div className="h-full w-[96%] rounded-full bg-[#2384FD]" />
                  </div>
                  <div className="mt-1.5 text-center text-[10px] sm:text-[11px] font-medium text-slate-500">
                    Top 4% in Department
                  </div>
                </div>
              </div>
            </section>

            {/* Stat Cards Grid with Enhanced Height & Larger Numbers */}
            <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map(({ label, value, note, icon: Icon, cardClass, valueClass, iconWrap, pageKey }) => (
                <div
                  key={label}
                  onClick={() => {
                    if (pageKey) handleNavigate(pageKey);
                  }}
                  className={`rounded-2xl border px-4 py-4 sm:py-5 shadow-sm ${cardClass} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl ${iconWrap}`}>
                      <Icon size={23} className="stroke-[2.2]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                        {label}
                      </div>
                      <div className={`text-2xl sm:text-[28px] font-extrabold leading-none mt-1 mb-0.5 ${valueClass}`}>{value}</div>
                      <div className="text-xs text-slate-400 font-medium truncate">{note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Bottom 3 Columns: Attendance Overview, Quick Actions, Functional Calendar */}
            <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr]">
              {/* 1. Attendance Overview Card with Interactive Semester 1-8 Dropdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                    <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#0F172A]">
                      <CalendarCheck size={18} className="text-slate-700" />
                      <h3>Attendance Overview</h3>
                    </div>

                    {/* Interactive Semester Dropdown (Semester 1 to 8) */}
                    <div className="relative" ref={semesterDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setSemesterDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#F8FAFC] border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                      >
                        <span>Semester {attendanceSemester}</span>
                        <ChevronDown
                          size={13}
                          className={`text-gray-400 transition-transform duration-200 ${
                            semesterDropdownOpen ? "rotate-180 text-blue-600" : ""
                          }`}
                        />
                      </button>

                      {semesterDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-150 max-h-52 overflow-y-auto">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <button
                              key={sem}
                              type="button"
                              onClick={() => {
                                setAttendanceSemester(sem);
                                setSemesterDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                                attendanceSemester === sem
                                  ? "bg-[#E7EFFE] text-[#2384FD] font-bold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span>Semester {sem}</span>
                              {attendanceSemester === sem && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2384FD]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Circular Donut Gauge dynamically reflecting currentAttendance */}
                  <div className="relative flex items-center justify-center my-4">
                    <svg className="w-[180px] h-[180px] transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background track */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#E2E8F0"
                        strokeWidth="7"
                        fill="transparent"
                      />
                      {/* Attended Progress track */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#2384FD"
                        strokeWidth="7"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * (1 - currentAttendance.percentage / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-4xl font-bold text-[#2384FD] tracking-tight leading-none transition-all">
                        {currentAttendance.percentage}%
                      </span>
                      <span className="text-xs text-gray-400 font-medium mt-3">
                        Overall Attendance
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Split Box reflecting selected semester */}
                <div
                  onClick={() => handleNavigate("attendances")}
                  className="grid grid-cols-2 gap-2.5 p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200/80 cursor-pointer hover:bg-gray-100/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#D1FAE5]">
                      <CalendarCheck size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight transition-all">
                        {currentAttendance.attended}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">Classes attended</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center shrink-0 border border-[#FEE2E2]">
                      <XCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight transition-all">
                        {currentAttendance.absent}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">Classes absent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Quick Actions Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2.5 text-sm sm:text-base font-bold text-[#0F172A]">
                  <Zap size={18} className="text-slate-700" />
                  <h3>Quick Actions</h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5 flex-1">
                  {quickActions.map(({ label, icon: Icon, tone, borderTone, iconTone, iconBg, textTone, pageKey }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleNavigate(pageKey)}
                      className={`rounded-2xl border ${borderTone} ${tone} p-3 flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-xs cursor-pointer group`}
                    >
                      <div className={`w-14 h-14 rounded-full ${iconBg} shadow-2xs flex items-center justify-center ${iconTone} group-hover:scale-110 transition-transform`}>
                        <Icon size={26} className="stroke-[2]" />
                      </div>
                      <div className={`flex items-center gap-1 text-[12px] font-bold ${textTone}`}>
                        <span>{label}</span>
                        <ChevronRight size={14} className="stroke-[2.5]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Pure Functional Real-time Calendar Card */}
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
                      className="text-[11px] font-semibold text-[#2384FD] hover:underline cursor-pointer"
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
                      className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-gray-800">{monthTitle}</span>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={goToNextMonth}
                      className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold text-gray-400 mb-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
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
                          onClick={() => handleSelectDate(date)}
                          className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center mx-auto transition-all text-[11px] font-medium cursor-pointer ${isSelected
                            ? "bg-[#2384FD] font-bold text-white shadow-xs"
                            : isToday
                              ? "bg-[#E7EFFE] text-[#2384FD] font-bold ring-1 ring-[#2384FD]/30"
                              : isCurrentMonth
                                ? "hover:bg-gray-100 text-gray-700"
                                : "text-gray-300 hover:text-gray-500"
                            }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
    }
  }

  return (
    <div className="relative flex h-full w-full bg-[#EEF2F6] overflow-hidden min-h-screen">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Student Sidebar with Roboto font, #2384FD active color, #E7EFFE bg */}
      <StudentSidebar
        activePage={currentPage}
        onNavigate={handleNavigate}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Right Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Student Top Header with Barlow font, dynamic title/subtitle, bell badge 3, help circle, profile dropdown */}
        <StudentHeader
          activePage={currentPage}
          studentName="Tuhina Banerjee"
          studentRole="Student"
          avatarUrl="/tuhina_avatar.jpg"
          onNavigate={handleNavigate}
          onLogout={onLogout}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          isDigitalCardActive={currentPage === "profile" && isDigitalCardActive}
          onNavigateToProfile={() => setIsDigitalCardActive(false)}
        />

        {/* Scrollable Page Body */}
        <div className="flex-1 overflow-y-auto min-w-0 bg-[#EEF2F6]">
          {renderStudentContent()}
        </div>
      </div>
    </div>
  );
}
