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
import AdminProfile from "../components/AdminProfile";

const students = [
  { initials: "TS", name: "Tamsha Sengupta",      roll: "lee2024001",  dept: "EE",  program: "B.Tech Lateral", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-teal-200",   avatarText: "text-teal-700" },
  { initials: "TR", name: "Turnab Roy",             roll: "lee2024002",  dept: "cse",  program: "B.Tech", year: "3rd", semester: "Semester 6", mentor: "Debarati Roy",  avatarBg: "bg-blue-200",   avatarText: "text-blue-700" },
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

function FilterDropdown({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none min-w-[150px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default function Students({ onNavigate }) {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredStudents = students.filter((student) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      student.name.toLowerCase().includes(searchText) ||
      student.roll.toLowerCase().includes(searchText) ||
      student.program.toLowerCase().includes(searchText) ||
      student.dept.toLowerCase().includes(searchText) ||
      student.mentor.toLowerCase().includes(searchText);

    const matchesProgram = programFilter === "all" || student.program === programFilter;
    const matchesYear = yearFilter === "all" || student.year === yearFilter;
    const matchesDept = deptFilter === "all" || student.dept === deptFilter;

    return matchesSearch && matchesProgram && matchesYear && matchesDept;
  });

  const sortedStudents = [...filteredStudents].sort((left, right) => {
    switch (sortBy) {
      case "name-desc":
        return right.name.localeCompare(left.name);
      case "roll-asc":
        return left.roll.localeCompare(right.roll);
      case "roll-desc":
        return right.roll.localeCompare(left.roll);
      case "year-asc":
        return (parseInt(left.year, 10) || 0) - (parseInt(right.year, 10) || 0);
      case "year-desc":
        return (parseInt(right.year, 10) || 0) - (parseInt(left.year, 10) || 0);
      case "name-asc":
      default:
        return left.name.localeCompare(right.name);
    }
  });

  const visibleStudents = sortedStudents;
  const visibleStudentIds = visibleStudents.map((student) => student.roll);
  const allVisibleSelected =
    visibleStudentIds.length > 0 && visibleStudentIds.every((roll) => selected.includes(roll));

  const toggleAll = () =>
    setSelected((prev) =>
      allVisibleSelected
        ? prev.filter((roll) => !visibleStudentIds.includes(roll))
        : Array.from(new Set([...prev, ...visibleStudentIds]))
    );

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
        <AdminProfile />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search students by name, ID or email..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <FilterDropdown value={programFilter} onChange={setProgramFilter} options={[{ value: "all", label: "All Programs" }, { value: "B.Tech Lateral", label: "B.Tech Lateral" }, { value: "B.Tech", label: "B.Tech" }, { value: "M.Tech", label: "M.Tech" }]} />
          <FilterDropdown value={yearFilter} onChange={setYearFilter} options={[{ value: "all", label: "All Years" }, { value: "1st", label: "1st Year" }, { value: "2nd", label: "2nd Year" }, { value: "3rd", label: "3rd Year" }, { value: "4th", label: "4th Year" }]} />
          <FilterDropdown value={deptFilter} onChange={setDeptFilter} options={[{ value: "all", label: "All Departments" }, { value: "EE", label: "EE" }, { value: "ECE", label: "ECE" }, { value: "CS", label: "CS" }, { value: "ME", label: "ME" }, { value: "CE", label: "CE" }]} />
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
            <p className="text-xs text-gray-500">Showing {visibleStudents.length} of {students.length} students</p>
            <div className="flex items-center gap-2">
              <FilterDropdown value={sortBy} onChange={setSortBy} options={[{ value: "name-asc", label: "Sort by: Name (A-Z)" }, { value: "name-desc", label: "Sort by: Name (Z-A)" }, { value: "roll-asc", label: "Sort by: Roll (A-Z)" }, { value: "roll-desc", label: "Sort by: Roll (Z-A)" }, { value: "year-asc", label: "Sort by: Year (Low-High)" }, { value: "year-desc", label: "Sort by: Year (High-Low)" }]} />
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
                      checked={allVisibleSelected}
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
                {visibleStudents.map((s) => (
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
