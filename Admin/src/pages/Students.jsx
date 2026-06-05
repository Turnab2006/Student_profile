import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Download,
  Upload,
  Users,
  GraduationCap,
  UserRound,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SlidersHorizontal,
  Menu,
} from "lucide-react";

const students = [
  { initials: "TS", name: "Tamsha Sengupta",      roll: "lee2024001",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-teal-200",   avatarText: "text-teal-700" },
  { initials: "TR", name: "Tarun Roy",             roll: "lee2024002",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-blue-200",   avatarText: "text-blue-700" },
  { initials: "MC", name: "Madhurima Chatterjee",  roll: "lee2024003",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-pink-200",   avatarText: "text-pink-700" },
  { initials: "ND", name: "Nilankur Das",          roll: "lee2024004",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-orange-200", avatarText: "text-orange-700" },
  { initials: "AR", name: "Abhinandan Roy",        roll: "lee2024005",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-purple-200", avatarText: "text-purple-700" },
  { initials: "SG", name: "Subhamita Ganguly",     roll: "lece2024001", dept: "ECE", program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Payel Dutta",   avatarBg: "bg-green-200",  avatarText: "text-green-700" },
  { initials: "AB", name: "Alok Bhattacharya",     roll: "lece2024002", dept: "ECE", program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Payel Dutta",   avatarBg: "bg-yellow-200", avatarText: "text-yellow-700" },
  { initials: "SM", name: "Subhankar Mazumdar",    roll: "lece2024003", dept: "ECE", program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Payel Dutta",   avatarBg: "bg-sky-200",    avatarText: "text-sky-700" },
];

const deptColors = {
  EE:  "bg-blue-100 text-blue-600",
  ECE: "bg-purple-100 text-purple-600",
};

const stats = [
  {
    icon: <Users size={22} className="text-green-600" />,
    bg: "bg-green-50",
    value: "140",
    label: "Total Students",
    sub: "Active students",
  },
  {
    icon: <GraduationCap size={22} className="text-green-600" />,
    bg: "bg-green-50",
    value: "48",
    label: "This Year",
    sub: "New admissions",
  },
  {
    icon: <UserRound size={22} className="text-purple-500" />,
    bg: "bg-purple-50",
    value: "82",
    label: "Male Students",
    sub: "58.6% of total",
  },
  {
    icon: <UserRound size={22} className="text-orange-400" />,
    bg: "bg-orange-50",
    value: "58",
    label: "Female Students",
    sub: "41.4% of total",
  },
];

function FilterDropdown({ label }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">
      {label}
      <ChevronDown size={14} />
    </button>
  );
}

export default function Students({ onNavigate }) {
  const [selected, setSelected] = useState([]);

  const toggleAll = () =>
    setSelected(selected.length === students.length ? [] : students.map((s) => s.roll));

  const toggleOne = (roll) =>
    setSelected((prev) =>
      prev.includes(roll) ? prev.filter((r) => r !== roll) : [...prev, roll]
    );

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-gray-500" />
          <div>
            <h1 className="text-base font-semibold text-gray-800">Students</h1>
            <p className="text-xs text-gray-400">Manage student accounts and profiles</p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-semibold text-gray-600">
          A
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, ID or email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <FilterDropdown label="All Programs" />
          <FilterDropdown label="All Years" />
          <FilterDropdown label="All Departments" />
          <button
            onClick={() => onNavigate?.("add-student")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            <Plus size={15} />
            Add Student
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="col-span-1 bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-medium text-gray-600">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}

          {/* Export */}
          <div className="col-span-1 bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
              <Download size={18} className="text-gray-500" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-700">Export</p>
              <p className="text-[10px] text-gray-400">Export student list</p>
            </div>
          </div>

          {/* Import CSV */}
          <div className="col-span-1 bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
              <Upload size={18} className="text-gray-500" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-700">Import CSV</p>
              <p className="text-[10px] text-gray-400">Bulk import students</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table meta row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">Showing 1 to 10 of 140 students</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
                Sort by: Name (A-Z) <ChevronDown size={12} />
              </button>
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.length === students.length}
                      onChange={toggleAll}
                      className="rounded border-gray-300 accent-primary"
                    />
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">College Roll</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Semester</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mentor</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((s) => (
                  <tr
                    key={s.roll}
                    className={`hover:bg-gray-50/60 transition-colors ${selected.includes(s.roll) ? "bg-green-50/40" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.roll)}
                        onChange={() => toggleOne(s.roll)}
                        className="rounded border-gray-300 accent-primary"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${s.avatarBg} ${s.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>
                          {s.initials}
                        </div>
                        <span className="font-medium text-primary text-xs">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.roll}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${deptColors[s.dept] ?? "bg-gray-100 text-gray-600"}`}>{s.dept}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.program}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.year}</td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-medium text-primary">{s.semester}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.mentor}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors">View</button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">
                10 <ChevronDown size={11} />
              </button>
              <span>per page</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <ChevronLeft size={14} className="text-gray-500" />
              </button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 text-xs rounded font-medium transition-colors ${p === 1 ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                  {p}
                </button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button className="w-7 h-7 text-xs rounded font-medium text-gray-500 hover:bg-gray-100 transition-colors">14</button>
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <ChevronRight size={14} className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Go to page</span>
              <input type="number" defaultValue={1} className="w-12 border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-green-300" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
