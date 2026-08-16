import { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  BookText,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  FileText,
  GraduationCap,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  School,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  User,
  UserRound,
  XCircle,
} from "lucide-react";
import StudentProfile from "./StudentProfile";

const navSections = [
  {
    label: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutGrid },
      { label: "Profile", icon: UserRound },
    ],
  },
  {
    label: "ACADEMICS",
    items: [
      { label: "Semesters", icon: GraduationCap },
      { label: "Subjects", icon: BookOpen },
      { label: "Attendances", icon: CalendarDays },
      { label: "Credit Points", icon: Trophy },
    ],
  },
  {
    label: "COMMUNICATION",
    items: [
      { label: "Activities", icon: NotebookPen },
      { label: "Notices", icon: Bell },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { label: "Profile & Settings", icon: School },
      { label: "Support Center", icon: FileText },
    ],
  },
];

const statCards = [
  {
    label: "Attendance",
    value: "93%",
    note: "Classes attended",
    icon: CheckCircle2,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-red-500",
    valueClass: "text-slate-900",
    iconWrap: "bg-[#fff1f1] text-red-500",
  },
  {
    label: "Active Events",
    value: "6",
    note: "Upcoming events",
    icon: CalendarDays,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#2d6df6]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#ecf3ff] text-[#2d6df6]",
  },
  {
    label: "Active Notices",
    value: "5",
    note: "Unred notices",
    icon: Bell,
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#f59e0b]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff1dc] text-[#f59e0b]",
  },
  {
    label: "Credit Points",
    value: "0",
    note: "Earn more to grow",
    icon: Star,
    cardClass: "bg-white text-emerald-700 border border-emerald-200 border-l-4 border-l-emerald-500",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#e7f7ec] text-emerald-600",
  },
];

const quickActions = [
  { label: "View Results", icon: BookText, tone: "bg-[#F5F7FF] text-[#2b6df7]" },
  { label: "View Notices", icon: Bell, tone: "bg-[#fff1d9] text-[#f59e0b]" },
  { label: "View Events", icon: CalendarDays, tone: "bg-[#f3eaff] text-[#8b5cf6]" },
  { label: "View Credit Point", icon: Trophy, tone: "bg-[#eafaf2] text-[#16a34a]" },
];

function InfoRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={14} />
      </div>
      <span>{text}</span>
    </div>
  );
}

export default function StudentDashboard({ onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 25));
  const [profileOpen, setProfileOpen] = useState(false);
  const containerRef = useRef(null);

  console.log("StudentDashboard currentPage:", currentPage);

  if (currentPage === "profile") {
    console.log("Rendering StudentProfile");
    return <StudentProfile onBack={() => setCurrentPage("dashboard")} />;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setProfileOpen(false);
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

  const eventDates = new Set([
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 20).toDateString(),
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 23).toDateString(),
  ]);

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto bg-[#edf1f5]">
      <div className="flex min-h-screen border border-slate-200 bg-[#f4f6f8] shadow-[0_18px_45px_rgba(15,23,42,0.13)] ring-1 ring-slate-200/80">
        <aside className="sticky top-0 flex h-screen w-[250px] shrink-0 flex-col border-r border-gray-100 bg-white shadow-sm">
          <div className="flex h-[60px] shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-5">
            <span className="block text-lg font-extrabold tracking-wide text-gray-800">
              TRACK<span className="text-blue-600">ADEMY</span>
            </span>
          </div>

          <nav className="flex-1 space-y-3 overflow-y-auto px-2.5 py-2.5">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                  {section.label}
                </p>

                <div className="space-y-1">
                  {section.items.map(({ label, icon: Icon }) => {
                    const isActive = 
                      (label === "Dashboard" && currentPage === "dashboard") ||
                      (label === "Profile" && currentPage === "profile");
                    
                    const handleClick = () => {
                      console.log("Sidebar button clicked:", label);
                      if (label === "Dashboard") {
                        console.log("Setting page to dashboard");
                        setCurrentPage("dashboard");
                      }
                      if (label === "Profile") {
                        console.log("Setting page to profile");
                        setCurrentPage("profile");
                      }
                    };
                    
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={handleClick}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                      >
                        <Icon size={16} className={isActive ? "text-blue-600" : "text-gray-500"} />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto border-t border-gray-100 px-3 py-3">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg bg-red-50/80 px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto bg-[#f6f7fb]">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-sm">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-slate-800">Welcome back, Tuhina!</h1>
              <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening today.</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
                >
                  <Bell size={18} />
                </button>
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-semibold text-white">
                  3
                </span>
              </div>

              <button
                type="button"
                aria-label="Messages"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Mail size={18} />
              </button>

              <div className="hidden h-5 w-px bg-slate-200 sm:block" />

              <div className="relative" ref={containerRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-100/80 transition-colors cursor-pointer focus:outline-none group"
                >
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                      Tuhina Banerjee
                    </p>
                    <p className="text-[11px] text-slate-400 capitalize">Student</p>
                  </div>

                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5b8def] to-[#1d4ed8] text-xs font-bold text-white ring-2 ring-blue-100">
                      TB
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                  </div>

                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      profileOpen ? "rotate-180 text-emerald-600" : "group-hover:text-slate-600"
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/50 rounded-xl mb-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                          TB
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-gray-800 truncate">Tuhina Banerjee</p>
                          <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                            <ShieldCheck size={10} /> Student
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          setCurrentPage("profile");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-[#0da651] transition-colors cursor-pointer"
                      >
                        <User size={15} className="text-gray-400" />
                        <span>View Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-[#0da651] transition-colors cursor-pointer"
                      >
                        <Settings size={15} className="text-gray-400" />
                        <span>Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={15} className="text-rose-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="space-y-3 p-4">
            <section className="grid gap-3 xl:grid-cols-[1.7fr_0.8fr]">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[26px] bg-gradient-to-br from-[#f7d6d8] via-[#f5e5d7] to-[#dbeafe] text-[52px] font-bold text-slate-700 shadow-inner">
                    TB
                  </div>

                  <div className="flex-1">
                    <h2 className="text-[26px] font-bold tracking-tight text-slate-800">Tuhina Banerjee</h2>

                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      <InfoRow icon={Mail} text="tuhinabanerjee134@gmail.com" />
                      <InfoRow icon={School} text="Department: CSE" />
                      <InfoRow icon={Phone} text="+91 89812 18381" />
                      <InfoRow icon={BookOpen} text="College Roll No: cse2024009" />
                      <InfoRow icon={Award} text="B.Tech" />
                      <InfoRow icon={MapPin} text="University Roll: NIL" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[700px] rounded-[26px] border border-slate-200 bg-white p-3.5 shadow-sm text-slate-800">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[22px] font-bold leading-none text-slate-800">
                    <Award size={18} className="text-slate-700" />
                    <span>Rank</span>
                  </div>

                  <div className="relative w-[130px]">
                    <select
                      defaultValue="CSE"
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-[#f1f3f5] px-3 py-2 pr-8 text-base font-medium text-slate-700 outline-none transition focus:border-blue-300"
                      aria-label="Select department"
                    >
                      <option value="CSE">CSE</option>
                      <option value="EE">EE</option>
                      <option value="ECE">ECE</option>
                      <option value="AIML">AIML</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  </div>
                </div>

                <div className="mt-2 flex items-baseline justify-center gap-2 text-center">
                  <span className="text-[38px] font-bold tracking-tight text-[#2563eb] leading-none">1</span>
                  <span className="text-[28px] font-semibold text-slate-400 leading-none">/ 30</span>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-[14px] font-semibold text-[#16a34a]">
                  <span>Top Performer</span>
                  <ArrowUpRight size={16} className="text-[#16a34a]" />
                </div>

                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#dfe3ea]">
                  <div className="h-full w-[88%] rounded-full bg-[#2563eb]" />
                </div>

                <div className="mt-4 text-center text-[17px] font-medium tracking-tight text-slate-700">
                  You&apos;re doing excellent!
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map(({ label, value, note, icon: Icon, cardClass, valueClass, iconWrap }) => (
                <div key={label} className={`rounded-[20px] border px-4 py-2.5 shadow-sm ${cardClass}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconWrap}`}>
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {label}
                      </div>
                      <div className={`text-[30px] font-bold leading-none ${valueClass}`}>{value}</div>
                      <div className="text-[14px] text-slate-500">{note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.25fr_1fr_1fr]">
              <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Attendance Overview</h3>
                  <button className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                    Semester 4
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_0_93%,#e6ebf3_93%_100%)] p-3">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center">
                      <div>
                        <div className="text-[46px] font-bold leading-none text-slate-800">93%</div>
                        <div className="mt-2 text-[12px] uppercase tracking-[0.14em] text-slate-400">Overall Attendance</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-[260px] space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
                      <span className="flex-1">Classes attended (93%)</span>
                      <span className="font-semibold text-slate-700">104</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#dfe3ea]" />
                      <span className="flex-1">Classes absent (7%)</span>
                      <span className="font-semibold text-slate-700">8</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
                      <div className="flex items-center gap-2 rounded-xl bg-[#eef9f3] px-3 py-2 text-emerald-700">
                        <CheckCircle2 size={16} />
                        <span>104</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-[#fff1f1] px-3 py-2 text-rose-500">
                        <XCircle size={16} />
                        <span>8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-5 text-xl font-bold text-slate-800">Quick Actions</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {quickActions.map(({ label, icon: Icon, tone }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex min-h-[130px] flex-col items-center justify-center gap-3 rounded-[20px] border border-slate-200 ${tone} px-4 py-4 font-semibold shadow-sm transition-transform hover:-translate-y-0.5`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/50">
                        <Icon size={20} />
                      </div>
                      <span className="text-[15px]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={goToPreviousMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-base font-semibold text-slate-700">{monthTitle}</span>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={goToNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <div key={`${day}-${index}`}>{day}</div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm text-slate-500">
                  {calendarDays.map((date) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const isSelected = selectedDate.toDateString() === date.toDateString();
                    const isEvent = eventDates.has(date.toDateString());

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(new Date(date))}
                        className={`flex h-8 items-center justify-center rounded-md transition ${
                          isSelected
                            ? "bg-[#2563eb] font-semibold text-white shadow-sm"
                            : isEvent
                              ? "bg-[#e8f3ff] text-[#2563eb]"
                              : isCurrentMonth
                                ? "bg-slate-50 text-slate-600"
                                : "bg-transparent text-slate-300"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-center gap-5 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
                    Selected
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e8f3ff]" />
                    Events
                  </span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
