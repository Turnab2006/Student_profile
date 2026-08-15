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
  Star,
  Trophy,
  UserRound,
  XCircle,
} from "lucide-react";

const navSections = [
  {
    label: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutGrid, active: true },
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
    cardClass: "bg-white text-slate-800 border border-slate-200",
    valueClass: "text-[#2D6DF6]",
    iconWrap: "bg-[#ecf3ff] text-[#2D6DF6]",
  },
  {
    label: "Active Events",
    value: "6",
    note: "Upcoming events",
    icon: CalendarDays,
    cardClass: "bg-white text-slate-800 border border-slate-200",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff1dc] text-[#f59e0b]",
  },
  {
    label: "Active Notices",
    value: "5",
    note: "Unred notices",
    icon: Bell,
    cardClass: "bg-white text-slate-800 border border-slate-200",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff4e5] text-[#f59e0b]",
  },
  {
    label: "Credit Points",
    value: "0",
    note: "Earn more to grow",
    icon: Star,
    cardClass: "bg-[#edfdf5] text-emerald-700 border border-emerald-200",
    valueClass: "text-emerald-700",
    iconWrap: "bg-white text-emerald-600",
  },
];

const quickActions = [
  { label: "View Results", icon: BookText, tone: "bg-[#F5F7FF] text-[#2b6df7]" },
  { label: "View Notices", icon: Bell, tone: "bg-[#fff1d9] text-[#f59e0b]" },
  { label: "View Events", icon: CalendarDays, tone: "bg-[#f3eaff] text-[#8b5cf6]" },
  { label: "View Credit Point", icon: Trophy, tone: "bg-[#eafaf2] text-[#16a34a]" },
];

const calendarDays = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

const monthTitle = "May 2026";

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
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#edf1f5]">
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
                  {section.items.map(({ label, icon: Icon, active }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm font-medium transition-colors ${
                        active
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      <Icon size={16} className={active ? "text-blue-600" : "text-gray-500"} />
                      <span>{label}</span>
                    </button>
                  ))}
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

        <div className="flex-1 bg-[#f6f7fb] overflow-y-auto">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-sm">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-slate-800">Welcome back, Tuhina!</h1>
              <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening today.</p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Bell size={18} />
              </button>
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-semibold text-white">
                3
              </span>
            </div>
          </header>

          <main className="space-y-5 p-6">
            <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-5 lg:grid-cols-[220px_1fr_280px]">
                <div className="flex items-center justify-center">
                  <div className="flex h-[160px] w-[160px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#f7d6d8] via-[#f5e5d7] to-[#dbeafe] text-5xl font-bold text-slate-700 shadow-inner">
                    TB
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-[44px] font-bold tracking-tight text-slate-800">Tuhina Banerjee</h2>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoRow icon={Mail} text="tuhinabanerjee134@gmail.com" />
                    <InfoRow icon={School} text="Department: CSE" />
                    <InfoRow icon={Phone} text="+91 89812 18381" />
                    <InfoRow icon={BookOpen} text="College Roll No: cse2024009" />
                    <InfoRow icon={Award} text="B.Tech" />
                    <InfoRow icon={MapPin} text="University Roll: NIL" />
                  </div>
                </div>

                <div className="flex flex-col justify-center rounded-[20px] border border-slate-200 bg-[#f9fafb] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Award size={16} className="text-slate-500" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Rank
                      </span>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-500"
                    >
                      CSE <ChevronDown size={12} />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-[52px] font-bold tracking-tight text-[#2563eb]">1</span>
                    <span className="text-xl font-semibold text-slate-400">/ 30</span>
                  </div>

                  <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf3ff] px-2.5 py-1 text-sm font-semibold text-[#2563eb]">
                    <ArrowUpRight size={14} />
                    Top Performer
                  </div>

                  <div className="mt-4 text-sm text-slate-500">
                    You&apos;re doing excellent!
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map(({ label, value, note, icon: Icon, cardClass, valueClass, iconWrap }) => (
                <div key={label} className={`rounded-[20px] border p-4 shadow-sm ${cardClass}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconWrap}`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="mt-5 space-y-1">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {label}
                    </div>
                    <div className={`text-[32px] font-bold ${valueClass}`}>{value}</div>
                    <div className="text-sm text-slate-500">{note}</div>
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

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_0_93%,#e2e8f0_93%_100%)] p-3">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center">
                      <div>
                        <div className="text-4xl font-bold text-slate-800">93%</div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Overall Attendance</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-[260px] space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
                        <span>Classes attended (93%)</span>
                      </div>
                      <span className="font-semibold text-slate-700">104</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#dbeafe]" />
                        <span>Classes absent (7%)</span>
                      </div>
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

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {quickActions.map(({ label, icon: Icon, tone }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex min-h-[88px] items-center justify-center gap-3 rounded-2xl border border-slate-200 ${tone} px-4 font-semibold shadow-sm transition-transform hover:-translate-y-0.5`}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500">
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-base font-semibold text-slate-700">{monthTitle}</span>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500">
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <div key={`${day}-${index}`}>{day}</div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm text-slate-500">
                  {calendarDays.flat().map((value, index) => {
                    const isSelected = index === 24 || index === 25;
                    const isEvent = index === 20 || index === 23;

                    return (
                      <div
                        key={`date-${index}`}
                        className={`flex h-8 items-center justify-center rounded-md ${
                          isSelected
                            ? "bg-[#2563eb] font-semibold text-white shadow-sm"
                            : isEvent
                              ? "bg-[#e8f3ff] text-[#2563eb]"
                              : "bg-slate-50"
                        }`}
                      >
                        {value || (index > 0 && index < 32 ? index : "")}
                      </div>
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
