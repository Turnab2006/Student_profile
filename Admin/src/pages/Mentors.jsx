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
import AdminProfile from "../components/AdminProfile";

const mentors = [
  { initials: "DR", name: "Debarati Roy",            empId: "EMP001", dept: "EE",  specialization: "Power Systems",     students: 12, status: "Active",   avatarBg: "bg-purple-200", avatarText: "text-purple-700" },
  { initials: "PD", name: "Payel Dutta",             empId: "EMP002", dept: "ECE", specialization: "Embedded Systems",   students: 8,  status: "Active",   avatarBg: "bg-pink-200",   avatarText: "text-pink-700" },
  { initials: "SK", name: "Sourav Kumar",            empId: "EMP003", dept: "CS",  specialization: "Machine Learning",  students: 15, status: "Active",   avatarBg: "bg-blue-200",   avatarText: "text-blue-700" },
  { initials: "AD", name: "Anindita Das",             empId: "EMP004", dept: "EE",  specialization: "Control Systems",   students: 10, status: "Active",   avatarBg: "bg-teal-200",   avatarText: "text-teal-700" },
  { initials: "MG", name: "Moumita Ghosh",            empId: "EMP005", dept: "ME",  specialization: "Thermodynamics",    students: 6,  status: "On Leave", avatarBg: "bg-orange-200", avatarText: "text-orange-700" },
  { initials: "RC", name: "Rajat Chakraborty",        empId: "EMP006", dept: "CE",  specialization: "Structural Engg",   students: 9,  status: "Active",   avatarBg: "bg-green-200",  avatarText: "text-green-700" },
  { initials: "SN", name: "Sneha Nandi",              empId: "EMP007", dept: "ECE", specialization: "VLSI Design",        students: 7,  status: "Active",   avatarBg: "bg-sky-200",    avatarText: "text-sky-700" },
  { initials: "AK", name: "Arun Kumar Mandal",        empId: "EMP008", dept: "CS",  specialization: "Cyber Security",    students: 11, status: "Active",   avatarBg: "bg-yellow-200", avatarText: "text-yellow-700" },
];

const deptColors = {
  EE:  "bg-blue-100 text-blue-600",
  ECE: "bg-purple-100 text-purple-600",
  CS:  "bg-green-100 text-green-600",
  ME:  "bg-orange-100 text-orange-600",
  CE:  "bg-teal-100 text-teal-600",
};

const stats = [
  { icon: <Users size={22} className="text-green-600" />,         bg: "bg-green-50",  value: "156", label: "Total Mentors",    sub: "Active mentors" },
  { icon: <Star size={22} className="text-yellow-500" />,        bg: "bg-yellow-50", value: "92",  label: "Senior Mentors",  sub: "5+ years experience" },
  { icon: <GraduationCap size={22} className="text-blue-500" />, bg: "bg-blue-50",   value: "64",  label: "Junior Mentors",  sub: "Under 5 years" },
  { icon: <Briefcase size={22} className="text-purple-500" />,   bg: "bg-purple-50", value: "8",   label: "Departments",    sub: "Active departments" },
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

export default function Mentors({ onNavigate }) {
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

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-gray-500" />
          <div>
            <h1 className="text-base font-semibold text-gray-800">Mentors</h1>
            <p className="text-xs text-gray-400">Manage mentor accounts and profiles</p>
          </div>
        </div>
        <AdminProfile />
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
          <FilterDropdown value={sortBy} onChange={setSortBy} options={[{ value: "name-asc", label: "Sort by: Name (A-Z)" }, { value: "name-desc", label: "Sort by: Name (Z-A)" }, { value: "students-desc", label: "Sort by: Students (High-Low)" }, { value: "students-asc", label: "Sort by: Students (Low-High)" }, { value: "dept-asc", label: "Sort by: Department (A-Z)" }, { value: "dept-desc", label: "Sort by: Department (Z-A)" }]} />
          <button
            onClick={() => onNavigate?.("add-mentor")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
          >
            <Plus size={15} />
            Add Mentor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-medium text-gray-600">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">Showing {visibleMentors.length} of {mentors.length} mentors</p>
            <div className="flex items-center gap-2">
              <FilterDropdown value={sortBy} onChange={setSortBy} options={[{ value: "name-asc", label: "Sort by: Name (A-Z)" }, { value: "name-desc", label: "Sort by: Name (Z-A)" }, { value: "students-desc", label: "Sort by: Students (High-Low)" }, { value: "students-asc", label: "Sort by: Students (Low-High)" }, { value: "dept-asc", label: "Sort by: Department (A-Z)" }, { value: "dept-desc", label: "Sort by: Department (Z-A)" }]} />
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal size={14} className="text-gray-500" />
              </button>
            </div>
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
