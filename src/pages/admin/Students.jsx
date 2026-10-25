import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Download,
  Users,
  GraduationCap,
  UserRound,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SlidersHorizontal,
  Menu,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { STUDENTS_DATA, DEPT_BADGE_COLORS } from "../../data/studentsData";

const deptColors = {
  CSE: "bg-purple-100 text-purple-700 border-purple-200",
  IT: "bg-blue-100 text-blue-700 border-blue-200",
  ECE: "bg-teal-100 text-teal-700 border-teal-200",
  EE: "bg-amber-100 text-amber-700 border-amber-200",
  ME: "bg-rose-100 text-rose-700 border-rose-200",
  BCA: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

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

export default function Students({ onNavigate, onOpenSidebar }) {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  // Dynamic Metrics computed from 20 students sample dataset
  const stats = useMemo(() => {
    const total = STUDENTS_DATA.length;
    const maleCount = STUDENTS_DATA.filter((s) => s.gender === "Male").length;
    const femaleCount = STUDENTS_DATA.filter((s) => s.gender === "Female").length;
    const newAdmissions = STUDENTS_DATA.filter((s) => s.admissionYear === "2025" || s.yearNum === 1).length;

    return [
      {
        icon: <Users size={22} className="text-green-600" />,
        bg: "bg-green-50",
        value: String(total),
        label: "Total Students",
        sub: "Enrolled in portal",
      },
      {
        icon: <GraduationCap size={22} className="text-green-600" />,
        bg: "bg-green-50",
        value: String(newAdmissions),
        label: "This Year",
        sub: "1st Year admissions",
      },
      {
        icon: <UserRound size={22} className="text-purple-500" />,
        bg: "bg-purple-50",
        value: String(maleCount),
        label: "Male Students",
        sub: `${Math.round((maleCount / total) * 100)}% of total`,
      },
      {
        icon: <UserRound size={22} className="text-orange-400" />,
        bg: "bg-orange-50",
        value: String(femaleCount),
        label: "Female Students",
        sub: `${Math.round((femaleCount / total) * 100)}% of total`,
      },
    ];
  }, []);

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const searchText = query.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        student.name.toLowerCase().includes(searchText) ||
        student.roll.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.program.toLowerCase().includes(searchText) ||
        student.dept.toLowerCase().includes(searchText) ||
        student.deptCode.toLowerCase().includes(searchText) ||
        student.mentor.toLowerCase().includes(searchText);

      const matchesProgram = programFilter === "all" || student.program === programFilter;
      const matchesYear =
        yearFilter === "all" ||
        student.year === yearFilter ||
        String(student.yearNum) === yearFilter ||
        student.yearStr?.toLowerCase().includes(yearFilter.toLowerCase());
      const matchesDept =
        deptFilter === "all" ||
        student.deptCode === deptFilter ||
        student.dept.toLowerCase().includes(deptFilter.toLowerCase());

      return matchesSearch && matchesProgram && matchesYear && matchesDept;
    });
  }, [query, programFilter, yearFilter, deptFilter]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((left, right) => {
      switch (sortBy) {
        case "name-desc":
          return right.name.localeCompare(left.name);
        case "roll-asc":
          return left.roll.localeCompare(right.roll);
        case "roll-desc":
          return right.roll.localeCompare(left.roll);
        case "year-asc":
          return (left.yearNum || 0) - (right.yearNum || 0);
        case "year-desc":
          return (right.yearNum || 0) - (left.yearNum || 0);
        case "name-asc":
        default:
          return left.name.localeCompare(right.name);
      }
    });
  }, [filteredStudents, sortBy]);

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
      prev.includes(roll) ? prev.filter((item) => item !== roll) : [...prev, roll]
    );

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
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
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Students</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Manage student accounts and profiles</p>
          </div>
        </div>
        <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search students by name, ID or email..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <FilterDropdown
            value={programFilter}
            onChange={setProgramFilter}
            options={[
              { value: "all", label: "All Programs" },
              { value: "B.Tech", label: "B.Tech" },
              { value: "B.Tech Lateral", label: "B.Tech Lateral" },
              { value: "BCA", label: "BCA" },
            ]}
          />
          <FilterDropdown
            value={yearFilter}
            onChange={setYearFilter}
            options={[
              { value: "all", label: "All Years" },
              { value: "1", label: "1st Year" },
              { value: "2", label: "2nd Year" },
              { value: "3", label: "3rd Year" },
              { value: "4", label: "4th Year" },
            ]}
          />
          <FilterDropdown
            value={deptFilter}
            onChange={setDeptFilter}
            options={[
              { value: "all", label: "All Departments" },
              { value: "CSE", label: "CSE" },
              { value: "IT", label: "IT" },
              { value: "ECE", label: "ECE" },
              { value: "EE", label: "EE" },
              { value: "ME", label: "ME" },
              { value: "BCA", label: "BCA" },
            ]}
          />
          <button
            onClick={() => onNavigate?.("add-student")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            <Plus size={15} />
            Add Student
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="col-span-1 bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/90 shadow-md shadow-slate-200/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0 border border-slate-100/80 shadow-2xs`}>
                {s.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-600 truncate">{s.label}</p>
                <p className="text-[10px] text-gray-400 truncate">{s.sub}</p>
              </div>
            </div>
          ))}

          {/* Export */}
          <div className="col-span-1 bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/90 shadow-md shadow-slate-200/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 cursor-pointer hover:bg-gray-50/80 transition-all duration-200">
            <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-slate-100/80 shadow-2xs">
              <Download size={18} className="text-gray-600" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-bold text-gray-800">Export</p>
              <p className="text-[10px] text-gray-400 truncate">Export student list</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden">
          {/* Table meta row with solid green gradient */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white border-b border-emerald-600/30">
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
              <p className="text-xs font-semibold text-white tracking-wide">
                Showing <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md border border-white/20">{visibleStudents.length}</span> of <span className="font-bold text-white">{STUDENTS_DATA.length}</span> students
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-[210px] pl-3.5 pr-8 py-1.5 bg-[#eaf8ee] hover:bg-[#dff3e5] text-[#085a2b] font-bold text-xs rounded-lg border border-emerald-300/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer transition-colors"
                >
                  <option value="name-asc" className="bg-white text-gray-800">Sort by: Name (A-Z)</option>
                  <option value="name-desc" className="bg-white text-gray-800">Sort by: Name (Z-A)</option>
                  <option value="roll-asc" className="bg-white text-gray-800">Sort by: Roll (A-Z)</option>
                  <option value="roll-desc" className="bg-white text-gray-800">Sort by: Roll (Z-A)</option>
                  <option value="year-asc" className="bg-white text-gray-800">Sort by: Year (Low-High)</option>
                  <option value="year-desc" className="bg-white text-gray-800">Sort by: Year (High-Low)</option>
                </select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0da651]" />
              </div>
              <button className="p-1.5 bg-[#eaf8ee] hover:bg-[#dff3e5] text-[#085a2b] border border-emerald-300/80 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs" aria-label="Table options">
                <SlidersHorizontal size={14} />
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
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
                      <div
                        onClick={() => onNavigate?.("student-profile")}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <div className={`w-8 h-8 rounded-full ${s.avatarBg} ${s.avatarText} text-xs font-bold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                          {s.initials}
                        </div>
                        <span className="font-medium text-primary text-xs group-hover:underline">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.roll}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${deptColors[s.deptCode] ?? deptColors[s.dept] ?? "bg-gray-100 text-gray-600"}`}>
                        {s.deptCode || s.dept}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.program}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.yearStr || `${s.year} Year`}</td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-medium text-primary">{s.semester}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.mentor}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigate?.("student-profile")}
                          className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors cursor-pointer"
                        >
                          View
                        </button>
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
