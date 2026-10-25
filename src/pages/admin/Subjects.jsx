import { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Search,
  CheckCircle2,
  CheckCircle,
  X,
  Menu,
  MoreHorizontal,
  ArrowLeft,
  LayoutGrid,
  List,
  Hash,
  Award,
  Clock,
  User,
  UserCheck,
  Download,
  Check,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import SubjectCard, { SUBJECT_THEMES } from "../../components/student/SubjectCard";
import { semesterSubjectsData, semesterOptions } from "../student/StudentSubjects";

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

const defaultSubjects = [
  {
    id: "1",
    code: "CS501",
    name: "Design & Analysis of Algorithms",
    credits: 4,
    totalHours: "45 Hours",
    totalClasses: 36,
    facultyName: "Dr. Kaushik Chatterjee",
    instructor: "Dr. Kaushik Chatterjee",
    syllabusFileName: "CS501_Algorithms_Syllabus.pdf",
    syllabusFileSize: "1.4 MB",
    program: "B.Tech",
    department: "Computer Science Engineering",
    year: "3rd Year",
    semester: "Semester 5",
    badgeColor: "bg-emerald-50 text-[#0da651] border-emerald-200/80",
  },
  {
    id: "2",
    code: "EC302",
    name: "Analog Communication",
    credits: 4,
    totalHours: "45 Hours",
    totalClasses: 36,
    facultyName: "Prof. Arindam Roy",
    instructor: "Prof. Arindam Roy",
    syllabusFileName: "EC302_Analog_Comm_Syllabus.pdf",
    syllabusFileSize: "1.1 MB",
    program: "B.Tech",
    department: "Electronics & Communication Engineering",
    year: "2nd Year",
    semester: "Semester 3",
    badgeColor: "bg-emerald-50 text-[#0da651] border-emerald-200/80",
  },
  {
    id: "3",
    code: "EE701",
    name: "Control Systems",
    credits: 3,
    totalHours: "40 Hours",
    totalClasses: 32,
    facultyName: "Dr. Ananya Sen",
    instructor: "Dr. Ananya Sen",
    syllabusFileName: "EE701_Control_Systems_Syllabus.pdf",
    syllabusFileSize: "980 KB",
    program: "B.Tech",
    department: "Electrical Engineering",
    year: "4th Year",
    semester: "Semester 7",
    badgeColor: "bg-emerald-50 text-[#0da651] border-emerald-200/80",
  },
  {
    id: "4",
    code: "MT101",
    name: "Advanced Algorithms",
    credits: 4,
    totalHours: "45 Hours",
    totalClasses: 36,
    facultyName: "Dr. Kaushik Chatterjee",
    instructor: "Dr. Kaushik Chatterjee",
    syllabusFileName: "MT101_Adv_Algorithms_Syllabus.pdf",
    syllabusFileSize: "1.6 MB",
    program: "M.Tech",
    department: "Computer Science Engineering",
    year: "1st Year",
    semester: "Semester 1",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-200/80",
  },
  {
    id: "5",
    code: "VL301",
    name: "Low Power VLSI",
    credits: 4,
    totalHours: "45 Hours",
    totalClasses: 36,
    facultyName: "Prof. Pritam Paul",
    instructor: "Prof. Pritam Paul",
    syllabusFileName: "VL301_VLSI_Design_Syllabus.pdf",
    syllabusFileSize: "1.3 MB",
    program: "M.Tech",
    department: "VLSI Design",
    year: "2nd Year",
    semester: "Semester 3",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-200/80",
  },
  {
    id: "6",
    code: "BCA101",
    name: "Computer Fundamentals",
    credits: 3,
    totalHours: "35 Hours",
    totalClasses: 30,
    facultyName: "Prof. Debarati Ghosh",
    instructor: "Prof. Debarati Ghosh",
    syllabusFileName: "BCA101_Fundamentals_Syllabus.pdf",
    syllabusFileSize: "850 KB",
    program: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "Semester 1",
    badgeColor: "bg-violet-50 text-violet-600 border-violet-200/80",
  },
  {
    id: "7",
    code: "MCA301",
    name: "Cloud Computing",
    credits: 4,
    totalHours: "45 Hours",
    totalClasses: 36,
    facultyName: "Dr. Sourav Das",
    instructor: "Dr. Sourav Das",
    syllabusFileName: "MCA301_Cloud_Computing_Syllabus.pdf",
    syllabusFileSize: "1.5 MB",
    program: "MCA",
    department: "Master of Computer Applications",
    year: "2nd Year",
    semester: "Semester 3",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-200/80",
  },
];

const programBadges = {
  "B.Tech": "bg-[#f2faf5] text-[#0da651] border-emerald-200/90",
  "M.Tech": "bg-[#fff8f2] text-orange-600 border-orange-200/90",
  BCA: "bg-[#f7f5fd] text-violet-600 border-violet-200/90",
  MCA: "bg-[#f2f7ff] text-blue-600 border-blue-200/90",
};

const THEME_KEYS = ["blue", "green", "purple", "orange", "pink", "teal"];

export default function Subjects({ onNavigate, subjectsList = [], setSubjectsList, onOpenSidebar }) {
  const list = subjectsList && subjectsList.length > 0 ? subjectsList : defaultSubjects;

  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedSem, setSelectedSem] = useState("All Semesters");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Full-page Student Portal Subject View state
  const [viewingSubjectView, setViewingSubjectView] = useState(null); // active subject item for stream view
  const [selectedSemester, setSelectedSemester] = useState("5");
  const [subjectViewMode, setSubjectViewMode] = useState("grid"); // "grid" | "list"
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleCloseMenus = () => setActiveMenuId(null);
    window.addEventListener("click", handleCloseMenus);
    return () => window.removeEventListener("click", handleCloseMenus);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadSyllabus = (subject) => {
    showToast(`Downloading official syllabus for ${subject.code} - ${subject.name} (PDF)...`);
  };

  // Normalize semester string for comparison (e.g. "Semester 5", "V Semester", "5")
  const normalizeSemester = (s) => {
    if (!s) return "";
    const num = s.toString().replace(/[^0-9]/g, "");
    if (num) return `Semester ${num}`;
    if (s.includes("I") && !s.includes("III") && !s.includes("IV") && !s.includes("V")) return "Semester 1";
    if (s.includes("II") && !s.includes("III")) return "Semester 2";
    if (s.includes("III")) return "Semester 3";
    if (s.includes("IV")) return "Semester 4";
    if (s.includes("V") && !s.includes("VI") && !s.includes("VII") && !s.includes("VIII")) return "Semester 5";
    if (s.includes("VI") && !s.includes("VII") && !s.includes("VIII")) return "Semester 6";
    if (s.includes("VII") && !s.includes("VIII")) return "Semester 7";
    if (s.includes("VIII")) return "Semester 8";
    return s;
  };

  // Normalize year string (e.g. "Third Year" -> "3rd Year", "3" -> "3rd Year")
  const normalizeYear = (y) => {
    if (!y) return "";
    if (y.toLowerCase().includes("first") || y === "1") return "1st Year";
    if (y.toLowerCase().includes("second") || y === "2") return "2nd Year";
    if (y.toLowerCase().includes("third") || y === "3") return "3rd Year";
    if (y.toLowerCase().includes("fourth") || y === "4") return "4th Year";
    return y;
  };

  // Open Full-page Student Subject View
  const handleOpenSubjectView = (subject) => {
    const semNum = normalizeSemester(subject.semester).replace(/[^0-9]/g, "") || "5";
    setSelectedSemester(semNum);
    setSubjectSearchQuery("");
    setViewingSubjectView(subject);
  };

  // Filters for Main Table View
  const filteredSubjects = useMemo(() => {
    return list.filter((item) => {
      const normSem = normalizeSemester(item.semester);
      const normYr = normalizeYear(item.year);

      if (selectedProgram !== "All Programs" && item.program !== selectedProgram) return false;
      if (selectedDept !== "All Departments" && item.department !== selectedDept) return false;
      if (selectedYear !== "All Years" && normYr !== selectedYear && item.year !== selectedYear) return false;
      if (selectedSem !== "All Semesters" && normSem !== selectedSem && item.semester !== selectedSem) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.program.toLowerCase().includes(q) ||
          item.department.toLowerCase().includes(q) ||
          item.year.toLowerCase().includes(q) ||
          item.semester.toLowerCase().includes(q) ||
          (item.code && item.code.toLowerCase().includes(q)) ||
          (item.name && item.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [list, selectedProgram, selectedDept, selectedYear, selectedSem, searchQuery]);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage) || 1;
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubjects.slice(start, start + itemsPerPage);
  }, [filteredSubjects, currentPage, itemsPerPage]);

  const handleDelete = (id) => {
    if (setSubjectsList) {
      setSubjectsList(list.filter((s) => s.id !== id));
    }
    setDeletingId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingSubject) return;
    if (setSubjectsList) {
      setSubjectsList(
        list.map((s) => (s.id === editingSubject.id ? editingSubject : s))
      );
    }
    setEditingSubject(null);
  };

  // Student Subject View Data
  const currentSubjects = semesterSubjectsData[selectedSemester] || semesterSubjectsData["5"] || [];
  const filteredSemesterSubjects = currentSubjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(subjectSearchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(subjectSearchQuery.toLowerCase()) ||
      (sub.instructor && sub.instructor.toLowerCase().includes(subjectSearchQuery.toLowerCase()))
  );
  const selectedOpt = semesterOptions.find((s) => s.value === selectedSemester) || semesterOptions[4];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl border border-emerald-500 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top Header */}
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
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
              {viewingSubjectView ? `${viewingSubjectView.program} Subjects View` : "Subjects"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              {viewingSubjectView
                ? `${viewingSubjectView.department} - ${selectedOpt.label}`
                : "Manage subject details, course codes, and academic curriculums"}
            </p>
          </div>
        </div>

        <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* ========================================================================= */}
        {/* VIEW 1: FULL STUDENT PORTAL SUBJECT VIEW (WHEN VIEW BUTTON CLICKED)      */}
        {/* ========================================================================= */}
        {viewingSubjectView ? (
          <div className="space-y-4 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto animate-in fade-in duration-200">
            {/* Top Navigation & Stream Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200/90">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewingSubjectView(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={15} />
                  <span>Back to Subjects List</span>
                </button>
                <div className="h-4 w-[1px] bg-slate-200" />
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${programBadges[viewingSubjectView.program] || "bg-slate-100 text-slate-700"}`}>
                    {viewingSubjectView.program}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {viewingSubjectView.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Total Semester Courses:</span>
                <span className="font-extrabold text-[#0da651] bg-[#f4fbf7] px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  {currentSubjects.length} Subjects
                </span>
              </div>
            </div>

            {/* Header Card: Row 1 Search Bar | Row 2 Grid/List Toggle + Semester Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-[20px] border border-slate-200/90">
              {/* Search Bar */}
              <div className="relative w-full sm:w-[340px] md:w-[400px] lg:w-[460px] shrink-0">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subject, code, or faculty..."
                  value={subjectSearchQuery}
                  onChange={(e) => setSubjectSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* Grid/List Buttons & Semester Filter */}
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                {/* View Mode Toggle Buttons */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSubjectViewMode("grid")}
                    title="Grid View"
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      subjectViewMode === "grid"
                        ? "bg-emerald-50 text-[#0da651] border border-emerald-200 shadow-2xs"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubjectViewMode("list")}
                    title="List View"
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      subjectViewMode === "list"
                        ? "bg-emerald-50 text-[#0da651] border border-emerald-200 shadow-2xs"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Custom Semester Dropdown Filter */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-50 hover:bg-slate-100/90 active:bg-slate-100 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer min-w-[140px] sm:min-w-[170px]"
                  >
                    <span>{selectedOpt.label}</span>
                    <ChevronDown
                      size={15}
                      className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#0da651]" : ""
                        }`}
                    />
                  </button>

                  {/* Floating Semester Menu */}
                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                        {semesterOptions.map((opt) => {
                          const isSelected = opt.value === selectedSemester;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSelectedSemester(opt.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${isSelected
                                ? "bg-[#f4fbf7] text-[#0da651]"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <Check size={16} className="text-[#0da651] stroke-[2.5]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mode 1: CARD VIEW GRID */}
            {subjectViewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredSemesterSubjects.map((subject, index) => (
                  <SubjectCard
                    key={subject.code}
                    subject={subject}
                    index={index}
                    onDownload={handleDownloadSyllabus}
                    showAttendance={false}
                  />
                ))}
              </div>
            )}

            {/* Mode 2: LIST VIEW TABLE */}
            {subjectViewMode === "list" && filteredSemesterSubjects.length > 0 && (
              <div className="bg-white rounded-[20px] border border-slate-200/90 p-4 sm:p-5 lg:p-6 overflow-hidden animate-in fade-in duration-150 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[840px]">
                    <thead>
                      <tr className="bg-[#f0f6ff]/90 text-xs font-bold text-[#1d61e7] rounded-2xl overflow-hidden">
                        <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Hash size={14} className="text-[#1d61e7] stroke-[2.4]" />
                            <span className="whitespace-nowrap">CODE</span>
                          </div>
                        </th>
                        <th className="py-4 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={14} className="text-[#1d61e7] stroke-[2.4]" />
                            <span className="whitespace-nowrap">SUBJECT &amp; FACULTY</span>
                          </div>
                        </th>
                        <th className="py-4 px-5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <Award size={14} className="text-[#1d61e7] stroke-[2.4]" />
                            <span className="whitespace-nowrap">CREDITS</span>
                          </div>
                        </th>
                        <th className="py-4 px-5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <Clock size={14} className="text-[#1d61e7] stroke-[2.4]" />
                            <span className="whitespace-nowrap">LECTURE HOURS</span>
                          </div>
                        </th>
                        <th className="py-4 px-5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <CalendarDays size={14} className="text-[#1d61e7] stroke-[2.4]" />
                            <span className="whitespace-nowrap">TOTAL CLASSES</span>
                          </div>
                        </th>
                        <th className="py-4 px-5 rounded-r-2xl text-center whitespace-nowrap">
                          <span className="whitespace-nowrap">ACTION</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSemesterSubjects.map((subject, idx) => {
                        const theme = SUBJECT_THEMES[subject.colorTheme || THEME_KEYS[idx % THEME_KEYS.length]] || SUBJECT_THEMES.blue;

                        return (
                          <tr key={subject.code} className="hover:bg-slate-50/70 transition-colors">
                            {/* Code Badge */}
                            <td className="py-4 px-5 font-extrabold text-[#2563eb] text-sm tracking-tight whitespace-nowrap">
                              <span className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg}`}>
                                {subject.code}
                              </span>
                            </td>

                            {/* Subject & Faculty */}
                            <td className="py-4 px-5 min-w-[220px]">
                              <div>
                                <p className="font-bold text-slate-900 text-sm leading-snug">{subject.name}</p>
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5 whitespace-nowrap">
                                  <User size={12} className="text-slate-400 shrink-0" />
                                  <span>{subject.facultyName || subject.instructor || "Faculty"}</span>
                                </p>
                              </div>
                            </td>

                            {/* Credits */}
                            <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm whitespace-nowrap">
                              <span className={`inline-block whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-semibold ${theme.badgeBg}`}>
                                {subject.credits} Credits
                              </span>
                            </td>

                            {/* Lecture Hours */}
                            <td className="py-4 px-5 text-center font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
                              {subject.lectureHours || subject.totalHours || "45 Hours"}
                            </td>

                            {/* Total Classes */}
                            <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm whitespace-nowrap">
                              <span className="inline-block px-3 py-1 bg-slate-100/80 rounded-lg text-slate-800 font-bold">
                                {subject.totalClasses || 36} Classes
                              </span>
                            </td>

                            {/* Action */}
                            <td className="py-4 px-5 text-center whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleDownloadSyllabus(subject)}
                                className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap ${theme.btnBg}`}
                              >
                                <Download size={13} className="stroke-[2.4]" />
                                <span>Download Syllabus</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredSemesterSubjects.length === 0 && (
              <div className="bg-white rounded-[20px] border border-slate-200/90 p-10 text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#0da651] border border-emerald-200/80 mx-auto">
                  <Search size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-800">No subjects found</h3>
                <p className="text-xs text-slate-500">
                  No subjects matched your search query &quot;{subjectSearchQuery}&quot;.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: MAIN SUBJECTS MANAGEMENT TABLE VIEW                               */
          /* ========================================================================= */
          <>
            {/* Upper Green Gradient Hero Header */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                    Global Configuration
                  </span>
                  <span className="text-emerald-100 text-xs font-semibold">• Super Admin Access</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Subject Management
                </h2>
                <p className="text-xs sm:text-sm text-emerald-50/90 font-normal max-w-xl">
                  Manage, configure course codes, and view semester-wise subjects across all streams.
                </p>
              </div>

              {/* Decorative background shape */}
              <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </section>

            {/* Filter Controls Bar & Add Subject Button */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                {/* Program Filter */}
                <div className="relative flex items-center">
                  <select
                    value={selectedProgram}
                    onChange={(e) => {
                      setSelectedProgram(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full appearance-none rounded-xl border border-emerald-200/90 bg-[#f4fbf7] hover:bg-[#eaf8ee] py-2.5 px-3.5 pr-8 text-xs sm:text-sm font-bold text-[#085a2b] focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option>All Programs</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>BCA</option>
                    <option>MCA</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
                </div>

                {/* Department Filter */}
                <div className="relative flex items-center">
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full appearance-none rounded-xl border border-emerald-200/90 bg-[#f4fbf7] hover:bg-[#eaf8ee] py-2.5 px-3.5 pr-8 text-xs sm:text-sm font-bold text-[#085a2b] focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option>All Departments</option>
                    <option>Computer Science Engineering</option>
                    <option>Electronics & Communication Engineering</option>
                    <option>Electrical Engineering</option>
                    <option>VLSI Design</option>
                    <option>Computer Applications</option>
                    <option>Master of Computer Applications</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
                </div>

                {/* Year Filter (in Numbers) */}
                <div className="relative flex items-center">
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full appearance-none rounded-xl border border-emerald-200/90 bg-[#f4fbf7] hover:bg-[#eaf8ee] py-2.5 px-3.5 pr-8 text-xs sm:text-sm font-bold text-[#085a2b] focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option>All Years</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
                </div>

                {/* Semester Filter (in Student Page format) */}
                <div className="relative flex items-center">
                  <select
                    value={selectedSem}
                    onChange={(e) => {
                      setSelectedSem(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full appearance-none rounded-xl border border-emerald-200/90 bg-[#f4fbf7] hover:bg-[#eaf8ee] py-2.5 px-3.5 pr-8 text-xs sm:text-sm font-bold text-[#085a2b] focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option>All Semesters</option>
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                    <option>Semester 3</option>
                    <option>Semester 4</option>
                    <option>Semester 5</option>
                    <option>Semester 6</option>
                    <option>Semester 7</option>
                    <option>Semester 8</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
                </div>
              </div>

              {/* Add New Subject Button (No button shadow) */}
              <button
                type="button"
                onClick={() => onNavigate?.("add-subject")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer shrink-0"
              >
                <Plus size={16} className="stroke-[2.5]" />
                Add New Subject
              </button>
            </div>

            {/* Subjects Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] text-white text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-6">Program</th>
                      <th className="py-3.5 px-6">Department</th>
                      <th className="py-3.5 px-6">Year</th>
                      <th className="py-3.5 px-6">Semester</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {currentData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          No subjects found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      currentData.map((item) => {
                        const badgeStyle = programBadges[item.program] || "bg-[#f2faf5] text-[#0da651] border-emerald-200/90";
                        const formattedYear = normalizeYear(item.year);
                        const formattedSemester = normalizeSemester(item.semester);

                        return (
                          <tr key={item.id} className="hover:bg-gray-50/60 transition-colors group">
                            {/* Program */}
                            <td className="py-4 px-6 font-semibold text-gray-800">
                              <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${badgeStyle}`}>
                                  <GraduationCap size={18} />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{item.program}</p>
                                  {item.code && (
                                    <p className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">{item.code}</p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="py-4 px-6 font-semibold text-gray-700">
                              {formatDept(item.department)}
                            </td>

                            {/* Year in Number */}
                            <td className="py-4 px-6 font-semibold text-gray-700">
                              {formattedYear}
                            </td>

                            {/* Semester in Student format */}
                            <td className="py-4 px-6">
                              <span className="text-xs font-semibold text-primary">
                                {formattedSemester}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="relative inline-flex items-center justify-end gap-2">
                                {/* View Button */}
                                <button
                                  type="button"
                                  onClick={() => handleOpenSubjectView(item)}
                                  className="text-[11px] font-semibold text-[#0da651] bg-[#f4fbf7] hover:bg-[#eaf8ee] border border-emerald-200/80 px-3 py-1 rounded-full transition-colors cursor-pointer"
                                >
                                  View
                                </button>

                                {/* 3 Dots Menu Button */}
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(activeMenuId === item.id ? null : item.id);
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
                                    aria-label="More actions"
                                  >
                                    <MoreHorizontal size={16} />
                                  </button>

                                  {/* Dropdown Popup Menu */}
                                  {activeMenuId === item.id && (
                                    <div
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-gray-200/90 py-1.5 z-40 text-left"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          setEditingSubject(item);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                                      >
                                        <Pencil size={13} className="text-emerald-600" />
                                        Edit Subject
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          setDeletingId(item.id);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-medium"
                                      >
                                        <Trash2 size={13} />
                                        Delete Subject
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Pagination Matching Student Page Exactly */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-t border-gray-100 bg-white gap-3">
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
                      <option value={7}>7</option>
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
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-7 h-7 text-xs rounded font-medium transition-colors cursor-pointer ${p === currentPage ? "bg-[#0da651] text-white" : "text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                  {totalPages > 3 && (
                    <>
                      <span className="text-xs text-gray-400 px-1">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-7 h-7 text-xs rounded font-medium transition-colors cursor-pointer ${currentPage === totalPages ? "bg-[#0da651] text-white" : "text-gray-500 hover:bg-gray-100"
                          }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
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
                      if (val >= 1 && val <= totalPages) {
                        setCurrentPage(val);
                      }
                    }}
                    className="w-12 border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-green-300"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Delete Subject</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete this subject? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Edit Subject</h3>
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Program</label>
                <select
                  value={editingSubject.program}
                  onChange={(e) => setEditingSubject({ ...editingSubject, program: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                >
                  <option>B.Tech</option>
                  <option>M.Tech</option>
                  <option>BCA</option>
                  <option>MCA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={editingSubject.year}
                  onChange={(e) => setEditingSubject({ ...editingSubject, year: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={editingSubject.department}
                onChange={(e) => setEditingSubject({ ...editingSubject, department: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject Code</label>
                <input
                  type="text"
                  value={editingSubject.code || ""}
                  onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  value={editingSubject.name || ""}
                  onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Credits</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editingSubject.credits || 4}
                  onChange={(e) => setEditingSubject({ ...editingSubject, credits: parseInt(e.target.value, 10) || 4 })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Total Hours</label>
                <input
                  type="text"
                  value={editingSubject.totalHours || "45 Hours"}
                  onChange={(e) => setEditingSubject({ ...editingSubject, totalHours: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Total Classes</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={editingSubject.totalClasses || 36}
                  onChange={(e) => setEditingSubject({ ...editingSubject, totalClasses: parseInt(e.target.value, 10) || 36 })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Faculty Name</label>
                <input
                  type="text"
                  value={editingSubject.facultyName || editingSubject.instructor || ""}
                  onChange={(e) => setEditingSubject({ ...editingSubject, facultyName: e.target.value, instructor: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Syllabus File Name</label>
                <input
                  type="text"
                  value={editingSubject.syllabusFileName || ""}
                  onChange={(e) => setEditingSubject({ ...editingSubject, syllabusFileName: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0da651] rounded-xl hover:bg-emerald-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
