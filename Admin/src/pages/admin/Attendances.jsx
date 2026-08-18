import { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  AlertCircle,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Download,
  Filter,
  Eye,
  Mail,
  MoreVertical,
  Bell,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  X,
  CheckCircle2,
  CalendarCheck,
  Menu,
  Building2,
  BookOpen,
  GraduationCap
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const defaultStudentsAttendance = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@edusmart.edu",
    initials: "AJ",
    avatarBg: "bg-emerald-500",
    rollNo: "CS2021001",
    department: "Computer Science",
    program: "B.Tech",
    course: "Data Structures",
    courseCode: "CS301",
    percentage: 95,
    attended: 57,
    total: 60,
    status: "Excellent", // Excellent, Good, Very Good, At Risk
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@edusmart.edu",
    initials: "BS",
    avatarBg: "bg-blue-500",
    rollNo: "CS2021002",
    department: "Computer Science",
    program: "B.Tech",
    course: "Algorithms",
    courseCode: "CS302",
    percentage: 78,
    attended: 47,
    total: 60,
    status: "Good",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.w@edusmart.edu",
    initials: "CW",
    avatarBg: "bg-purple-500",
    rollNo: "CS2021003",
    department: "Computer Science",
    program: "B.Tech",
    course: "Database Systems",
    courseCode: "CS303",
    percentage: 88,
    attended: 53,
    total: 60,
    status: "Very Good",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.b@edusmart.edu",
    initials: "DB",
    avatarBg: "bg-rose-500",
    rollNo: "CS2021004",
    department: "Computer Science",
    program: "B.Tech",
    course: "Operating Systems",
    courseCode: "CS304",
    percentage: 62,
    attended: 37,
    total: 60,
    status: "At Risk",
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva.m@edusmart.edu",
    initials: "EM",
    avatarBg: "bg-teal-500",
    rollNo: "CS2021005",
    department: "Computer Science",
    program: "B.Tech",
    course: "Computer Networks",
    courseCode: "CS305",
    percentage: 91,
    attended: 55,
    total: 60,
    status: "Excellent",
  },
  {
    id: "6",
    name: "Frank Lee",
    email: "frank.l@edusmart.edu",
    initials: "FL",
    avatarBg: "bg-pink-500",
    rollNo: "CS2021006",
    department: "Computer Science",
    program: "B.Tech",
    course: "Software Engineering",
    courseCode: "CS306",
    percentage: 45,
    attended: 27,
    total: 60,
    status: "At Risk",
  },
  {
    id: "7",
    name: "Grace Taylor",
    email: "grace.t@edusmart.edu",
    initials: "GT",
    avatarBg: "bg-indigo-500",
    rollNo: "CS2021007",
    department: "Electronics",
    program: "B.Tech",
    course: "Digital Signal Processing",
    courseCode: "EC301",
    percentage: 84,
    attended: 50,
    total: 60,
    status: "Good",
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry.w@edusmart.edu",
    initials: "HW",
    avatarBg: "bg-orange-500",
    rollNo: "CS2021008",
    department: "Electrical",
    program: "B.Tech",
    course: "Power Systems",
    courseCode: "EE301",
    percentage: 96,
    attended: 58,
    total: 60,
    status: "Excellent",
  },
  {
    id: "9",
    name: "Isabella Clark",
    email: "isabella.c@edusmart.edu",
    initials: "IC",
    avatarBg: "bg-violet-500",
    rollNo: "CS2021009",
    department: "Computer Applications",
    program: "BCA",
    course: "Web Development",
    courseCode: "BC301",
    percentage: 90,
    attended: 54,
    total: 60,
    status: "Excellent",
  },
  {
    id: "10",
    name: "Jack Davis",
    email: "jack.d@edusmart.edu",
    initials: "JD",
    avatarBg: "bg-cyan-500",
    rollNo: "CS2021010",
    department: "Computer Applications",
    program: "MCA",
    course: "Cloud Computing",
    courseCode: "MC301",
    percentage: 58,
    attended: 35,
    total: 60,
    status: "At Risk",
  },
];

const statusStyles = {
  Excellent: "bg-emerald-100/80 text-emerald-700 border border-emerald-200/80",
  "Very Good": "bg-blue-100/80 text-blue-700 border border-blue-200/80",
  Good: "bg-amber-100/80 text-amber-700 border border-amber-200/80",
  "At Risk": "bg-rose-100/80 text-rose-700 border border-rose-200/80",
};

const progressColors = {
  Excellent: "bg-[#0da651]",
  "Very Good": "bg-blue-500",
  Good: "bg-amber-500",
  "At Risk": "bg-rose-500",
};

export default function Attendances({ onNavigate, onOpenSidebar }) {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedSem, setSelectedSem] = useState("All Semesters");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [viewStudentModal, setViewStudentModal] = useState(null);
  const [emailModal, setEmailModal] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Filtered Students
  const filteredData = useMemo(() => {
    return defaultStudentsAttendance.filter((s) => {
      if (selectedDept !== "All Departments" && s.department !== selectedDept) return false;
      if (selectedProgram !== "All Programs" && s.program !== selectedProgram) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDept, selectedProgram, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Roll No,Name,Email,Department,Program,Attendance,Status"]
        .concat(
          filteredData.map(
            (s) =>
              `"${s.rollNo}","${s.name}","${s.email}","${s.department}","${s.program}","${s.percentage}% (${s.attended}/${s.total})","${s.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_attendance_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Attendance CSV report exported successfully!");
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
          <div className="min-w-0 pr-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Student Attendance</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Track daily student attendance, metrics, and risk alerts</p>
          </div>
        </div>

        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      {/* Scrollable Main Body */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Students */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#0da651]">
                <Users size={20} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 tracking-tight">2,847</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Total Students</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp size={13} />
                <span>12.5%</span>
                <span className="text-[10px] text-gray-400 font-normal ml-0.5">vs last month</span>
              </div>
              {/* Sparkline SVG */}
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                <path d="M2 15 L15 12 L28 16 L42 6 L58 4" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: Average Attendance */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <UserCheck size={20} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 tracking-tight">89.4%</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Average Attendance</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp size={13} />
                <span>5.3%</span>
                <span className="text-[10px] text-gray-400 font-normal ml-0.5">vs last month</span>
              </div>
              {/* Sparkline SVG */}
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                <path d="M2 14 L15 17 L28 10 L42 14 L58 6" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: At Risk Students */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertCircle size={20} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 tracking-tight">245</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">At Risk Students</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                <TrendingDown size={13} />
                <span>3.8%</span>
                <span className="text-[10px] text-gray-400 font-normal ml-0.5">vs last month</span>
              </div>
              {/* Sparkline SVG */}
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                <path d="M2 6 L15 10 L28 8 L42 15 L58 12" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Highest Attendance */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Calendar size={20} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 tracking-tight">95.1%</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Highest Attendance</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp size={13} />
                <span>7.1%</span>
                <span className="text-[10px] text-gray-400 font-normal ml-0.5">vs last month</span>
              </div>
              {/* Sparkline SVG */}
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                <path d="M2 16 L15 14 L28 10 L42 12 L58 4" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter & Action Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
            {/* Search Box */}
            <div className="relative flex items-center md:col-span-1">
              <Search size={15} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Department Filter */}
            <div className="relative flex items-center">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Electronics</option>
                <option>Electrical</option>
                <option>Computer Applications</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>

            {/* Program Filter */}
            <div className="relative flex items-center">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option>All Programs</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
                <option>BCA</option>
                <option>MCA</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>

            {/* Semester Filter */}
            <div className="relative flex items-center">
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option>All Semesters</option>
                <option>I Semester</option>
                <option>III Semester</option>
                <option>V Semester</option>
                <option>VII Semester</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/50 px-3.5 py-2 text-xs font-semibold text-[#0da651] hover:bg-emerald-100 shadow-2xs transition-all cursor-pointer"
            >
              <Download size={15} />
              Export
            </button>

            {/* Filters Button */}
            <button
              onClick={() => showToast("Filters applied")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-all cursor-pointer"
            >
              <Filter size={15} />
              Filters
            </button>
          </div>
        </div>

        {/* Student Attendance Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/40 text-[11px] font-bold tracking-wider uppercase text-gray-500">
                  <th className="py-4 px-6">STUDENT ↕</th>
                  <th className="py-4 px-6">ROLL NO. ↕</th>
                  <th className="py-4 px-6">DEPARTMENT ↕</th>
                  <th className="py-4 px-6">PROGRAM ↕</th>
                  <th className="py-4 px-6">ATTENDANCE ↕</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No student attendance records found.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Student Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-2xs ${s.avatarBg}`}>
                            {s.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm leading-tight">{s.name}</p>
                            <p className="text-[11px] text-gray-400 font-normal">{s.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Roll No */}
                      <td className="py-4 px-6 font-semibold text-gray-600 font-mono text-xs">
                        {s.rollNo}
                      </td>

                      {/* Department */}
                      <td className="py-4 px-6 font-medium text-gray-600">
                        {s.department}
                      </td>

                      {/* Program */}
                      <td className="py-4 px-6 font-medium text-gray-600">
                        {s.program}
                      </td>

                      {/* Attendance Progress */}
                      <td className="py-4 px-6">
                        <div className="w-36 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-gray-800">{s.percentage}%</span>
                            <span className="text-[10px] text-gray-400 font-medium">({s.attended}/{s.total})</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${progressColors[s.status] || "bg-emerald-500"}`}
                              style={{ width: `${s.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Pill Badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${statusStyles[s.status] || "bg-gray-100 text-gray-700"}`}>
                          {s.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Button */}
                          <button
                            onClick={() => setViewStudentModal(s)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-emerald-600 text-xs font-semibold hover:bg-emerald-50 transition-all cursor-pointer shadow-2xs"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          {/* Email Button */}
                          <button
                            onClick={() => setEmailModal(s)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-rose-600 transition-all cursor-pointer shadow-2xs"
                            title="Send Email Notice"
                          >
                            <Mail size={14} />
                          </button>

                          {/* More Options */}
                          <button
                            onClick={() => showToast(`Options for ${s.name}`)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-all cursor-pointer shadow-2xs"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Bar */}
          <div className="border-t border-gray-100 bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
            <div>
              Showing {currentStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} students
            </div>

            <div className="flex items-center gap-3">
              {/* Items Per Page Select */}
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsLeft size={14} />
                </button>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold transition-all ${
                      currentPage === pageNum
                        ? "bg-[#0da651] text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* View Student Attendance Modal */}
      {viewStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${viewStudentModal.avatarBg}`}>
                  {viewStudentModal.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{viewStudentModal.name}</h3>
                  <p className="text-xs text-gray-400">{viewStudentModal.rollNo} • {viewStudentModal.department}</p>
                </div>
              </div>
              <button
                onClick={() => setViewStudentModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-400">Course</p>
                <p className="font-bold text-gray-800 mt-1">{viewStudentModal.course} ({viewStudentModal.courseCode})</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-400">Program</p>
                <p className="font-bold text-gray-800 mt-1">{viewStudentModal.program}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-400">Total Classes</p>
                <p className="font-bold text-gray-800 mt-1">{viewStudentModal.total} Sessions</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-400">Attended</p>
                <p className="font-bold text-emerald-600 mt-1">{viewStudentModal.attended} Sessions</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Overall Attendance</span>
                <span className="text-[#0da651]">{viewStudentModal.percentage}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${progressColors[viewStudentModal.status]}`}
                  style={{ width: `${viewStudentModal.percentage}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewStudentModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0da651] rounded-xl hover:bg-emerald-700 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Notice Modal */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmailModal(null);
              showToast(`Attendance warning email sent to ${emailModal.name}!`);
            }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Send Attendance Alert</h3>
              <button type="button" onClick={() => setEmailModal(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Recipient</label>
                <input
                  type="text"
                  disabled
                  value={`${emailModal.name} <${emailModal.email}>`}
                  className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  defaultValue={`Attendance Warning Notice - ${emailModal.courseCode}`}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  defaultValue={`Dear ${emailModal.name},\n\nYour attendance in ${emailModal.course} (${emailModal.courseCode}) is currently at ${emailModal.percentage}%. Please ensure regular attendance.`}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-gray-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEmailModal(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0da651] rounded-xl hover:bg-emerald-700 shadow-sm"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
