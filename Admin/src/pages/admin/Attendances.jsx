import { useState, useMemo, useEffect } from "react";
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
  MoreHorizontal,
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
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import SemesterAttendanceDetail from "../student/SemesterAttendanceDetail";

const defaultStudentSubjects = {
  1: [
    { code: "CS101", name: "Programming in C", attended: 58, total: 60, percentage: 96 },
    { code: "MA101", name: "Engineering Mathematics I", attended: 54, total: 60, percentage: 90 },
    { code: "PH101", name: "Engineering Physics", attended: 52, total: 60, percentage: 86 },
    { code: "EE101", name: "Basic Electrical Engineering", attended: 56, total: 60, percentage: 93 },
    { code: "CS191", name: "C Programming Lab", attended: 30, total: 30, percentage: 100 },
  ],
  2: [
    { code: "CS201", name: "Data Structures & OOP", attended: 55, total: 60, percentage: 91 },
    { code: "MA201", name: "Engineering Mathematics II", attended: 50, total: 60, percentage: 83 },
    { code: "EC201", name: "Digital Electronics", attended: 54, total: 60, percentage: 90 },
    { code: "CH201", name: "Engineering Chemistry", attended: 51, total: 60, percentage: 85 },
  ],
  3: [
    { code: "CS301", name: "Data Structures & Algorithms", attended: 57, total: 60, percentage: 95 },
    { code: "CS302", name: "Computer Organization & Arch", attended: 47, total: 60, percentage: 78 },
    { code: "CS303", name: "Database Management Systems", attended: 53, total: 60, percentage: 88 },
    { code: "CS304", name: "Operating Systems", attended: 37, total: 60, percentage: 62 },
    { code: "CS305", name: "Discrete Mathematics", attended: 55, total: 60, percentage: 91 },
  ],
  4: [
    { code: "CS401", name: "Design & Analysis of Algorithms", attended: 56, total: 60, percentage: 93 },
    { code: "CS402", name: "Software Engineering", attended: 52, total: 60, percentage: 86 },
    { code: "CS403", name: "Formal Language & Automata", attended: 48, total: 60, percentage: 80 },
    { code: "CS404", name: "Computer Networks", attended: 54, total: 60, percentage: 90 },
  ],
  5: [
    { code: "CS501", name: "Design & Analysis of Algorithms", attended: 57, total: 60, percentage: 95 },
    { code: "CS502", name: "Compiler Design", attended: 47, total: 60, percentage: 78 },
    { code: "CS503", name: "Database Management Systems", attended: 53, total: 60, percentage: 88 },
    { code: "CS504", name: "Operating Systems", attended: 37, total: 60, percentage: 62 },
    { code: "CS505", name: "Computer Networks", attended: 55, total: 60, percentage: 91 },
    { code: "CS506", name: "Software Engineering", attended: 27, total: 60, percentage: 45 },
  ],
  6: [
    { code: "CS601", name: "Artificial Intelligence", attended: 55, total: 60, percentage: 91 },
    { code: "CS602", name: "Web Technologies", attended: 58, total: 60, percentage: 96 },
    { code: "CS603", name: "Cloud Computing", attended: 52, total: 60, percentage: 86 },
    { code: "CS604", name: "Information Security", attended: 50, total: 60, percentage: 83 },
  ],
  7: [
    { code: "CS701", name: "Machine Learning", attended: 56, total: 60, percentage: 93 },
    { code: "CS702", name: "Internet of Things (IoT)", attended: 54, total: 60, percentage: 90 },
    { code: "CS703", name: "Big Data Analytics", attended: 51, total: 60, percentage: 85 },
  ],
  8: [
    { code: "CS801", name: "Major Project & Internship", attended: 60, total: 60, percentage: 100 },
    { code: "CS802", name: "Distributed Systems", attended: 56, total: 60, percentage: 93 },
  ],
};

const formatDept = (dept) => {
  if (!dept) return "";
  const d = dept.toLowerCase().trim();
  if (d.includes("computer science") || d === "cs" || d === "cse") return "CSE";
  if (d.includes("electronics") || d.includes("communication") || d === "ece") return "ECE";
  if (d.includes("electrical") || d === "ee") return "EE";
  if (d.includes("master of computer applications") || d === "mca") return "MCA";
  if (d.includes("computer applications") || d === "ca" || d === "bca") return "BCA";
  if (d.includes("vlsi")) return "VLSI";
  if (d.includes("civil") || d === "ce") return "CE";
  if (d.includes("mechanical") || d === "me") return "ME";
  return dept.toUpperCase();
};

const defaultStudentsAttendance = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@edusmart.edu",
    initials: "AJ",
    avatarBg: "bg-emerald-500",
    rollNo: "CS2021001",
    department: "CSE",
    program: "B.Tech",
    year: "3",
    semester: "5",
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
    department: "CSE",
    program: "B.Tech",
    year: "2",
    semester: "3",
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
    department: "CSE",
    program: "B.Tech",
    year: "3",
    semester: "5",
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
    department: "CSE",
    program: "B.Tech",
    year: "1",
    semester: "1",
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
    department: "CSE",
    program: "B.Tech",
    year: "4",
    semester: "7",
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
    department: "CSE",
    program: "B.Tech",
    year: "2",
    semester: "3",
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
    department: "ECE",
    program: "B.Tech",
    year: "3",
    semester: "5",
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
    department: "EE",
    program: "B.Tech",
    year: "4",
    semester: "7",
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
    department: "BCA",
    program: "BCA",
    year: "2",
    semester: "3",
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
    department: "MCA",
    program: "MCA",
    year: "1",
    semester: "1",
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

  const [viewingStudent, setViewingStudent] = useState(null);
  const [selectedStudentSem, setSelectedStudentSem] = useState(5);
  const [emailModal, setEmailModal] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const handleCloseMenus = () => setActiveMenuId(null);
    window.addEventListener("click", handleCloseMenus);
    return () => window.removeEventListener("click", handleCloseMenus);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Filtered Students
  const filteredData = useMemo(() => {
    return defaultStudentsAttendance.filter((s) => {
      if (selectedDept !== "All Departments" && formatDept(s.department) !== selectedDept) return false;
      if (selectedProgram !== "All Programs" && s.program !== selectedProgram) return false;
      if (selectedSem !== "All Semesters") {
        const selSemNum = selectedSem.replace(/[^0-9]/g, "");
        const studentSemNum = s.semester ? s.semester.toString().replace(/[^0-9]/g, "") : "";
        if (selSemNum && studentSemNum && selSemNum !== studentSemNum) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          formatDept(s.department).toLowerCase().includes(q) ||
          s.program.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDept, selectedProgram, selectedSem, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Semester attendance data for currently selected student in detail view
  const allSemestersData = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
      const subjects = defaultStudentSubjects[sem] || defaultStudentSubjects[5];
      const totalAttended = subjects.reduce((sum, sub) => sum + sub.attended, 0);
      const totalClasses = subjects.reduce((sum, sub) => sum + sub.total, 0);
      const pct = Math.round((totalAttended / totalClasses) * 100);

      return {
        semester: sem,
        name: `Semester ${sem}`,
        academicYear: "2024 - 2025",
        totalHeld: totalClasses,
        attended: totalAttended,
        attendance: pct,
        leavesApproved: 2,
        absent: Math.max(0, totalClasses - totalAttended - 2),
        subjects: subjects,
      };
    });
  }, [viewingStudent]);

  const currentSemData = useMemo(() => {
    return allSemestersData.find((s) => s.semester === selectedStudentSem) || allSemestersData[4];
  }, [allSemestersData, selectedStudentSem]);

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
        {viewingStudent ? (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Student Info Chip Bar above Semester Attendance Detail */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-['Roboto',sans-serif]">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-2xs ${viewingStudent.avatarBg}`}>
                  {viewingStudent.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-gray-900">{viewingStudent.name}</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0da651] border border-emerald-200">
                      {viewingStudent.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Roll: <strong className="text-gray-800 font-semibold">{viewingStudent.rollNo}</strong> &bull; Dept: <strong className="text-gray-800 font-semibold">{formatDept(viewingStudent.department)}</strong> &bull; Program: <strong className="text-gray-800 font-semibold">{viewingStudent.program}</strong> &bull; Year: <strong className="text-gray-800 font-semibold">{viewingStudent.year}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setEmailModal(viewingStudent)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
                >
                  <Mail size={15} className="stroke-[2.4]" />
                  <span>Send Mail</span>
                </button>
              </div>
            </div>

            {/* Semester Attendance Detail view from Student Portal */}
            <SemesterAttendanceDetail
              semester={currentSemData}
              allSemesters={allSemestersData}
              onBack={() => setViewingStudent(null)}
              onSelectSemester={(sem) => setSelectedStudentSem(sem.semester)}
              onDownload={(sem) => showToast(`Downloading attendance report for ${viewingStudent.name} (Semester ${sem.semester})...`)}
            />
          </div>
        ) : (
          <>
            {/* Metric Cards Row with Left Colored Border Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Students - Purple Left Accent Border */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-indigo-600 shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/60 shadow-2xs">
                  <Users size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">TOTAL STUDENTS</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">2,847</p>
                  <p className="text-xs text-gray-400 font-normal truncate">Enrolled in department</p>
                </div>
              </div>

              {/* Card 2: Average Attendance - Green Left Accent Border */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-2xs">
                  <CheckCircle2 size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">AVERAGE ATTENDANCE</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">89.4%</p>
                  <p className="text-xs text-gray-400 font-normal truncate">Overall active rate</p>
                </div>
              </div>

              {/* Card 3: At Risk Students - Orange/Amber Left Accent Border */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100/60 shadow-2xs">
                  <TrendingUp size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">STUDENTS AT RISK</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">245</p>
                  <p className="text-xs text-gray-400 font-normal truncate">Below 75% threshold</p>
                </div>
              </div>

              {/* Card 4: Highest Attendance - Blue Left Accent Border */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/60 shadow-2xs">
                  <CalendarCheck size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">HIGHEST ATTENDANCE</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">95.1%</p>
                  <p className="text-xs text-gray-400 font-normal truncate">Top performing batch</p>
                </div>
              </div>
            </div>

            {/* Filter & Action Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Expanded Search Box */}
              <div className="relative flex-1 min-w-[220px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-3 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Right Group: Filters + Export Button */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                {/* Department Filter */}
                <div className="relative min-w-[130px] sm:w-auto">
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                  >
                    <option>All Departments</option>
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EE</option>
                    <option>BCA</option>
                    <option>MCA</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Program Filter */}
                <div className="relative min-w-[125px] sm:w-auto">
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                  >
                    <option>All Programs</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>BCA</option>
                    <option>MCA</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Semester Filter */}
                <div className="relative min-w-[130px] sm:w-auto">
                  <select
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                  >
                    <option>All Semesters</option>
                    <option>I Semester</option>
                    <option>III Semester</option>
                    <option>V Semester</option>
                    <option>VII Semester</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/60 px-3.5 py-2.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-100 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <Download size={15} />
                  Export
                </button>
              </div>
            </div>

            {/* Student Attendance Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] text-white text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-6 text-center">STUDENT</th>
                      <th className="py-3.5 px-6 text-left">ROLL NO.</th>
                      <th className="py-3.5 px-6 text-center">DEPARTMENT</th>
                      <th className="py-3.5 px-6 text-center">PROGRAM</th>
                      <th className="py-3.5 px-6 text-center">YEAR</th>
                      <th className="py-3.5 px-6 text-center">SEMESTER</th>
                      <th className="py-3.5 px-6 text-center">ATTENDANCE</th>
                      <th className="py-3.5 px-6 text-center">STATUS</th>
                      <th className="py-3.5 px-6 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {currentStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-gray-400">
                          No student attendance records found.
                        </td>
                      </tr>
                    ) : (
                      currentStudents.map((s) => {
                        const yearNum = s.year ? s.year.toString().replace(/[^0-9]/g, "") : "3";
                        const semNum = s.semester ? s.semester.toString().replace(/[^0-9]/g, "") : "5";

                        return (
                          <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                            {/* Student Info */}
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center gap-3">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-2xs ${s.avatarBg}`}>
                                  {s.initials}
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-gray-800 text-sm leading-tight">{s.name}</p>
                                  <p className="text-[11px] text-gray-400 font-normal">{s.email}</p>
                                </div>
                              </div>
                            </td>

                            {/* Roll No */}
                            <td className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">
                              {s.rollNo}
                            </td>

                            {/* Department */}
                            <td className="py-4 px-6 text-center font-semibold text-gray-700">
                              {formatDept(s.department)}
                            </td>

                            {/* Program */}
                            <td className="py-4 px-6 text-center font-medium text-gray-600">
                              {s.program}
                            </td>

                            {/* Year (Number only) */}
                            <td className="py-4 px-6 text-center font-bold text-gray-700">
                              {yearNum}
                            </td>

                            {/* Semester (Number only) */}
                            <td className="py-4 px-6 text-center">
                              <span className="text-xs font-bold text-primary">
                                {semNum}
                              </span>
                            </td>

                            {/* Attendance Progress */}
                            <td className="py-4 px-6 text-center">
                              <div className="w-36 space-y-1 mx-auto">
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
                            <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${statusStyles[s.status] || "bg-gray-100 text-gray-700"}`}>
                                {s.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-center">
                              <div className="relative inline-flex items-center justify-center">
                                {/* 3 Dots Action Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenuId(activeMenuId === s.id ? null : s.id);
                                  }}
                                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
                                  aria-label="More actions"
                                >
                                  <MoreVertical size={18} />
                                </button>

                                {/* Dropdown Popup Menu */}
                                {activeMenuId === s.id && (
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute right-0 top-full mt-1 w-44 bg-white rounded-2xl border border-gray-200/90 shadow-xl shadow-slate-300/40 p-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150 space-y-0.5"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveMenuId(null);
                                        setViewingStudent(s);
                                        const sem = parseInt(s.semester ? s.semester.toString().replace(/[^0-9]/g, "") : "5") || 5;
                                        setSelectedStudentSem(sem);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0da651] rounded-xl transition-colors cursor-pointer"
                                    >
                                      <Eye size={14} className="text-emerald-600" />
                                      View Attendance
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveMenuId(null);
                                        setEmailModal(s);
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors cursor-pointer"
                                    >
                                      <Mail size={14} className="text-blue-500" />
                                      Send Email Notice
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Pagination Bar matching other admin pages exactly */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-t border-gray-100 bg-white gap-3 font-['Roboto',sans-serif]">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Show</span>
                  <div className="relative">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none border border-gray-200 rounded px-2.5 py-1 pr-6 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer focus:outline-none"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <ChevronDown size={11} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <span>per page</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft size={14} className="text-gray-500" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 text-xs rounded font-medium transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#0da651] text-white shadow-sm"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight size={14} className="text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Go to page</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 1 && val <= totalPages) setCurrentPage(val);
                    }}
                    className="w-12 border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

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
