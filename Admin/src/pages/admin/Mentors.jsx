import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Users,
  Star,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SlidersHorizontal,
  Menu,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const mentors = [
  { initials: "DR", name: "Debarati Roy", empId: "EMP001", dept: "EE", specialization: "Power Systems", students: 12, status: "Active", avatarBg: "bg-purple-200", avatarText: "text-purple-700" },
  { initials: "PD", name: "Payel Dutta", empId: "EMP002", dept: "ECE", specialization: "Embedded Systems", students: 8, status: "Active", avatarBg: "bg-pink-200", avatarText: "text-pink-700" },
  { initials: "SK", name: "Sourav Kumar", empId: "EMP003", dept: "CS", specialization: "Machine Learning", students: 15, status: "Active", avatarBg: "bg-blue-200", avatarText: "text-blue-700" },
  { initials: "AD", name: "Anindita Das", empId: "EMP004", dept: "EE", specialization: "Control Systems", students: 10, status: "Active", avatarBg: "bg-teal-200", avatarText: "text-teal-700" },
  { initials: "MG", name: "Moumita Ghosh", empId: "EMP005", dept: "ME", specialization: "Thermodynamics", students: 6, status: "On Leave", avatarBg: "bg-orange-200", avatarText: "text-orange-700" },
  { initials: "RC", name: "Rajat Chakraborty", empId: "EMP006", dept: "CE", specialization: "Structural Engg", students: 9, status: "Active", avatarBg: "bg-green-200", avatarText: "text-green-700" },
  { initials: "SN", name: "Sneha Nandi", empId: "EMP007", dept: "ECE", specialization: "VLSI Design", students: 7, status: "Active", avatarBg: "bg-sky-200", avatarText: "text-sky-700" },
  { initials: "AK", name: "Arun Kumar Mandal", empId: "EMP008", dept: "CS", specialization: "Cyber Security", students: 11, status: "Active", avatarBg: "bg-yellow-200", avatarText: "text-yellow-700" },
];

const deptColors = {
  EE: "bg-blue-100 text-blue-600",
  ECE: "bg-purple-100 text-purple-600",
  CS: "bg-green-100 text-green-600",
  ME: "bg-orange-100 text-orange-600",
  CE: "bg-teal-100 text-teal-600",
};

const stats = [
  { icon: <Users size={22} className="text-green-600" />, bg: "bg-green-50", value: "156", label: "Total Mentors", sub: "Active mentors" },
  { icon: <Star size={22} className="text-yellow-500" />, bg: "bg-yellow-50", value: "92", label: "Senior Mentors", sub: "5+ years experience" },
  { icon: <GraduationCap size={22} className="text-blue-500" />, bg: "bg-blue-50", value: "64", label: "Junior Mentors", sub: "Under 5 years" },
  { icon: <Briefcase size={22} className="text-purple-500" />, bg: "bg-purple-50", value: "8", label: "Departments", sub: "Active departments" },
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

export default function Mentors({ onNavigate, onOpenSidebar }) {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredMentors = mentors.filter((mentor) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      mentor.name.toLowerCase().includes(searchText) ||
      mentor.empId.toLowerCase().includes(searchText) ||
      mentor.specialization.toLowerCase().includes(searchText) ||
      mentor.dept.toLowerCase().includes(searchText);

    const matchesDept = deptFilter === "all" || mentor.dept === deptFilter;
    const matchesStatus = statusFilter === "all" || mentor.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const sortedMentors = [...filteredMentors].sort((left, right) => {
    switch (sortBy) {
      case "name-desc":
        return right.name.localeCompare(left.name);
      case "students-asc":
        return left.students - right.students;
      case "students-desc":
        return right.students - left.students;
      case "dept-asc":
        return left.dept.localeCompare(right.dept);
      case "dept-desc":
        return right.dept.localeCompare(left.dept);
      case "name-asc":
      default:
        return left.name.localeCompare(right.name);
    }
  });

  const visibleMentors = sortedMentors;
  const visibleMentorIds = visibleMentors.map((mentor) => mentor.empId);
  const allVisibleSelected =
    visibleMentorIds.length > 0 && visibleMentorIds.every((id) => selected.includes(id));

  const toggleAll = () =>
    setSelected((prev) =>
      allVisibleSelected
        ? prev.filter((id) => !visibleMentorIds.includes(id))
        : Array.from(new Set([...prev, ...visibleMentorIds]))
    );

  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const openMentorDetails = (mentor) => onNavigate?.("mentor-details", mentor);

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
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Mentors</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Manage mentor accounts and profiles</p>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search mentors by name, ID or email..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <FilterDropdown value={deptFilter} onChange={setDeptFilter} options={[{ value: "all", label: "All Departments" }, { value: "EE", label: "EE" }, { value: "ECE", label: "ECE" }, { value: "CS", label: "CS" }, { value: "ME", label: "ME" }, { value: "CE", label: "CE" }]} />
          <FilterDropdown value={statusFilter} onChange={setStatusFilter} options={[{ value: "all", label: "All Status" }, { value: "Active", label: "Active" }, { value: "On Leave", label: "On Leave" }]} />
          <button
            onClick={() => onNavigate?.("add-mentor")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            <Plus size={15} />
            Add Mentor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/90 shadow-md shadow-slate-200/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0 border border-slate-100/80 shadow-2xs`}>{s.icon}</div>
              <div className="overflow-hidden">
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-600 truncate">{s.label}</p>
                <p className="text-[10px] text-gray-400 truncate">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden">
          {/* Table meta row with solid green gradient */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white border-b border-emerald-600/30">
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
              <p className="text-xs font-semibold text-white tracking-wide">
                Showing <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md border border-white/20">{visibleMentors.length}</span> of <span className="font-bold text-white">{mentors.length}</span> mentors
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
                  <option value="students-desc" className="bg-white text-gray-800">Sort by: Students (High-Low)</option>
                  <option value="students-asc" className="bg-white text-gray-800">Sort by: Students (Low-High)</option>
                  <option value="dept-asc" className="bg-white text-gray-800">Sort by: Department (A-Z)</option>
                  <option value="dept-desc" className="bg-white text-gray-800">Sort by: Department (Z-A)</option>
                </select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0da651]" />
              </div>
              <button className="p-1.5 bg-[#eaf8ee] hover:bg-[#dff3e5] text-[#085a2b] border border-emerald-300/80 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs" aria-label="Table options">
                <SlidersHorizontal size={14} />
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="rounded border-gray-300 accent-primary" />
                  </th>
                  {["Mentor", "Employee ID", "Department", "Specialization", "Students", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visibleMentors.map((m) => (
                  <tr key={m.empId} className={`hover:bg-gray-50/60 transition-colors ${selected.includes(m.empId) ? "bg-green-50/40" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(m.empId)} onChange={() => toggleOne(m.empId)} className="rounded border-gray-300 accent-primary" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${m.avatarBg} ${m.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>{m.initials}</div>
                        <span className="font-medium text-primary text-xs">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{m.empId}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${deptColors[m.dept] ?? "bg-gray-100 text-gray-600"}`}>{m.dept}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{m.specialization}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{m.students}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${m.status === "Active" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>{m.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openMentorDetails(m)}
                          className="text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors"
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
              <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">10 <ChevronDown size={11} /></button>
              <span>per page</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft size={14} className="text-gray-500" /></button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 text-xs rounded font-medium transition-colors ${p === 1 ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button className="w-7 h-7 text-xs rounded font-medium text-gray-500 hover:bg-gray-100">16</button>
              <button className="p-1.5 rounded hover:bg-gray-100"><ChevronRight size={14} className="text-gray-500" /></button>
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
