import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
  GraduationCap,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  Users,
  X,
  Plus,
  CheckCircle2,
  School,
  BookOpen,
  Filter,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const summaryCards = [
  {
    label: "Total Programs",
    value: "4",
    subtext: "B.Tech, M.Tech, BCA, MCA",
    icon: GraduationCap,
    bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "4 Degree Programs",
    badgeBg: "bg-emerald-100/80 text-emerald-700",
  },
  {
    label: "Academic Sessions",
    value: "3",
    subtext: "2022 - 2025 Active Terms",
    icon: CalendarDays,
    bg: "bg-violet-50 text-violet-600 border-violet-100",
    badge: "Session 2024-25",
    badgeBg: "bg-violet-100/80 text-violet-700",
  },
  {
    label: "Departments",
    value: "8",
    subtext: "Engineering & Sciences",
    icon: School,
    bg: "bg-orange-50 text-orange-500 border-orange-100",
    badge: "8 Active Depts",
    badgeBg: "bg-orange-100/80 text-orange-700",
  },
  {
    label: "Total Students",
    value: "2,847",
    subtext: "Enrolled Across Batches",
    icon: Users,
    bg: "bg-blue-50 text-blue-600 border-blue-100",
    badge: "+12.5% Growth",
    badgeBg: "bg-blue-100/80 text-blue-700",
  },
];

const overviewData = [
  { label: "B.Tech", value: 1894, percent: 66.6, color: "#1bb15e" },
  { label: "M.Tech", value: 432, percent: 15.2, color: "#ff8a66" },
  { label: "BCA", value: 286, percent: 10.0, color: "#a66cff" },
  { label: "MCA", value: 235, percent: 8.2, color: "#4d8cff" },
];

const sessions = [
  {
    year: "2023-2024",
    current: true,
    dateRange: "01 Aug 2023 - 31 Jul 2024",
    totalStudents: 1710,
    programs: [
      { name: "B.Tech", students: 1142, accent: "bg-emerald-50 text-emerald-700" },
      { name: "M.Tech", students: 298, accent: "bg-violet-50 text-violet-700" },
      { name: "BCA", students: 152, accent: "bg-orange-50 text-orange-600" },
      { name: "MCA", students: 118, accent: "bg-blue-50 text-blue-700" },
    ],
  },
  {
    year: "2022-2023",
    current: false,
    dateRange: "01 Aug 2022 - 31 Jul 2023",
    totalStudents: 1514,
    programs: [
      { name: "B.Tech", students: 1032, accent: "bg-emerald-50 text-emerald-700" },
      { name: "M.Tech", students: 246, accent: "bg-violet-50 text-violet-700" },
      { name: "BCA", students: 134, accent: "bg-orange-50 text-orange-600" },
      { name: "MCA", students: 102, accent: "bg-blue-50 text-blue-700" },
    ],
  },
  {
    year: "2021-2022",
    current: false,
    dateRange: "01 Aug 2021 - 31 Jul 2022",
    totalStudents: 1376,
    programs: [
      { name: "B.Tech", students: 956, accent: "bg-emerald-50 text-emerald-700" },
      { name: "M.Tech", students: 210, accent: "bg-violet-50 text-violet-700" },
      { name: "BCA", students: 118, accent: "bg-orange-50 text-orange-600" },
      { name: "MCA", students: 92, accent: "bg-blue-50 text-blue-700" },
    ],
  },
];

function FilterSelect({ label, options }) {
  return (
    <div className="relative w-full sm:w-auto">
      <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, subtext, bg, badge, badgeBg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-3.5 sm:p-4 hover:bg-white hover:border-green-200 hover:shadow-xs transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${bg}`}>
          <Icon size={19} />
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>
          {badge}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-extrabold tracking-tight text-gray-800 leading-tight">{value}</p>
        <p className="text-xs font-bold text-gray-700 mt-1">{label}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}

function DonutChart() {
  const gradient = useMemo(
    () =>
      `conic-gradient(${overviewData[0].color} 0 ${overviewData[0].percent}%, ${overviewData[1].color} ${overviewData[0].percent}% ${overviewData[0].percent + overviewData[1].percent}%, ${overviewData[2].color} ${overviewData[0].percent + overviewData[1].percent}% ${overviewData[0].percent + overviewData[1].percent + overviewData[2].percent}%, ${overviewData[3].color} ${overviewData[0].percent + overviewData[1].percent + overviewData[2].percent}% 100%)`,
    []
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative h-44 w-44">
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: gradient }}
        />
        <div className="absolute inset-4 rounded-full bg-white shadow-inner flex flex-col items-center justify-center text-center">
          <p className="text-[32px] font-semibold leading-none text-gray-800">2,847</p>
          <p className="mt-1 text-xs text-gray-500">Total Students</p>
        </div>
      </div>
    </div>
  );
}

function UpdateModal({ onClose }) {
  const rows = [
    ["B.Tech", "2024 - 2027", "Semester 4", "4", "1,894"],
    ["M.Tech", "2024 - 2026", "Semester 3", "3", "432"],
    ["BCA", "2024 - 2027", "Semester 2", "4", "286"],
    ["MCA", "2024 - 2026", "Semester 1", "3", "235"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-none border border-gray-100 bg-white shadow-2xl sm:max-w-4xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Update Academic Session</h3>
              <p className="text-xs text-gray-400">Manage and update academic sessions and their current semester</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1.3fr]">
            <FilterSelect label="Program" options={["All Programs", "B.Tech", "M.Tech", "BCA", "MCA"]} />
            <FilterSelect label="Session" options={["All Academic Sessions", "2024 - 2025", "2023 - 2024", "2022 - 2023"]} />
            <div className="relative">
              <input className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300" placeholder="Search session..." />
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {rows.map((row) => (
              <div key={row[0]} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{row[0]}</p>
                    <p className="mt-1 text-xs text-gray-500">{row[1]}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{row[2]}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-gray-400">Departments</p>
                    <p className="mt-1 font-semibold text-gray-800">{row[3]}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-gray-400">Students</p>
                    <p className="mt-1 font-semibold text-gray-800">{row[4]}</p>
                  </div>
                </div>
                <button type="button" className="mt-4 w-full rounded-lg border border-primary/20 px-3 py-2 text-xs font-semibold text-primary hover:bg-green-50">
                  Update Semester
                </button>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50/80 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  {[
                    "Program",
                    "Academic Session",
                    "Current Semester",
                    "Total Departments",
                    "Active Students",
                    "Action",
                  ].map((column) => (
                    <th key={column} className="px-4 py-3">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {rows.map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                        {row[0].slice(0, 2).toUpperCase()}
                      </div>
                      <span className="ml-3 text-sm font-semibold text-gray-700">{row[0]}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row[1]}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{row[2]}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row[3]}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row[4]}</td>
                    <td className="px-4 py-3">
                      <button type="button" className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-green-50">
                        Update Semester
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl bg-primary-light p-4 border border-green-100">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
                <Settings2 size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">How it works?</p>
                <p className="text-xs text-gray-500">Click on "Update Semester" to move the session to the next semester.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 inline-flex items-center gap-2">
                <CheckCircle2 size={15} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Semesters({ onNavigate, onOpenSidebar }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f6f8fb]">
      <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (onOpenSidebar) onOpenSidebar();
              else window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
            }}
            className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0 pr-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Academics</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Configure and track academic sessions and programs</p>
          </div>
        </div>

        <AdminProfile onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 relative">
        <div className="max-w-[1500px] mx-auto space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              <FilterSelect label="Program" options={["All Programs", "B.Tech", "M.Tech", "BCA", "MCA"]} />
              <FilterSelect label="Session" options={["All Academic Sessions", "2024 - 2025", "2023 - 2024", "2022 - 2023"]} />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 transition-colors"
            >
              <Plus size={15} />
              Update Academic Session
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-4 items-stretch">
            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Academic Summary</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Overview of your institution's academics</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                    <GraduationCap size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {summaryCards.map((card) => (
                    <SummaryCard key={card.label} {...card} />
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-gray-700">Academic Status: <strong className="text-emerald-600 font-semibold">Active &amp; Operational</strong></span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">Session 2024-25</span>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Student Overview</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Students across all programs and sessions</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Users size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 items-center pt-2">
                  <DonutChart />
                  <div className="space-y-3">
                    {overviewData.map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="font-semibold text-gray-700">{item.label}</span>
                          </div>
                          <p className="font-bold text-gray-800">
                            {item.value.toLocaleString()}{" "}
                            <span className="text-[11px] font-normal text-gray-400">({item.percent}%)</span>
                          </p>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Seat Capacity: <strong className="text-gray-900 font-bold">2,847 / 3,000 Seats</strong></span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  94.9% Occupancy
                </span>
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Academic Sessions</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage academic sessions and view program-wise student count</p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0">
                <Filter size={14} />
                Filters
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.year} className="rounded-2xl border border-gray-100 p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr_160px] gap-4 items-center">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${session.current ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                        <CalendarDays size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-gray-800">{session.year}</h3>
                          {session.current ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Current</span> : null}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">Academic Session</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {session.dateRange}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {session.programs.map((program) => (
                        <div key={program.name} className="rounded-xl border border-gray-100 bg-white px-3 py-3 text-center shadow-sm">
                          <p className="text-xs font-semibold text-gray-800">{program.name}</p>
                          <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${program.accent}`}>{program.students} Students</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between xl:justify-end gap-3">
                      <div className="rounded-2xl bg-primary-light px-4 py-3 min-w-[120px] text-center border border-green-100">
                        <p className="text-[11px] font-medium text-gray-500">Total Students</p>
                        <p className="text-xl font-semibold text-primary mt-1">{session.totalStudents.toLocaleString()}</p>
                      </div>
                      <button type="button" className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button type="button" className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                <ChevronLeft size={14} className="mx-auto" />
              </button>
              {[1, 2, 3].map((page) => (
                <button key={page} type="button" className={`h-8 w-8 rounded-lg text-sm font-medium ${page === 1 ? "bg-primary text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {page}
                </button>
              ))}
              <button type="button" className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                <ChevronRight size={14} className="mx-auto" />
              </button>
            </div>
          </section>
        </div>

        {showModal ? <UpdateModal onClose={() => setShowModal(false)} /> : null}
      </main>
    </div>
  );
}