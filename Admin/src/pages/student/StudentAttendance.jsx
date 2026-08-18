import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Users,
  CheckCircle2,
  TrendingUp,
  PieChart,
  Info,
  X,
  CheckCircle,
  CalendarCheck,
  Printer,
  Eye
} from "lucide-react";
import SemesterAttendanceDetail from "./SemesterAttendanceDetail";

export const semesterAttendanceData = [
  {
    id: 1,
    year: 1,
    semester: 1,
    attendance: "88.5",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#f8f7ff] hover:bg-[#f0efff] border border-indigo-100/50",
    circleBadgeClass: "bg-[#ede9fe] text-[#7c3aed]",
    academicYear: "2022 - 2023",
    totalHeld: 240,
    attended: 212,
    absent: 28,
    leavesApproved: 6,
    subjects: [
      { code: "BS101", name: "Engineering Mathematics - I", attended: 42, total: 46, percentage: 91.3, status: "Excellent" },
      { code: "BS102", name: "Engineering Physics", attended: 38, total: 44, percentage: 86.4, status: "Good" },
      { code: "ES101", name: "Basic Electrical Engineering", attended: 39, total: 45, percentage: 86.7, status: "Good" },
      { code: "ES102", name: "Programming for Problem Solving", attended: 43, total: 45, percentage: 95.6, status: "Excellent" },
      { code: "BS191", name: "Physics Lab", attended: 25, total: 30, percentage: 83.3, status: "Good" },
      { code: "ES192", name: "Programming Lab", attended: 25, total: 30, percentage: 83.3, status: "Good" }
    ]
  },
  {
    id: 2,
    year: 1,
    semester: 2,
    attendance: "90.6",
    remarks: "Excellent",
    remarksBadgeClass: "bg-[#f3f0ff] text-[#7c3aed]",
    rowBgClass: "bg-[#f8f7ff] hover:bg-[#f0efff] border border-indigo-100/50",
    circleBadgeClass: "bg-[#ede9fe] text-[#7c3aed]",
    academicYear: "2022 - 2023",
    totalHeld: 250,
    attended: 226,
    absent: 24,
    leavesApproved: 5,
    subjects: [
      { code: "BS201", name: "Engineering Mathematics - II", attended: 44, total: 48, percentage: 91.7, status: "Excellent" },
      { code: "BS202", name: "Engineering Chemistry", attended: 41, total: 46, percentage: 89.1, status: "Good" },
      { code: "ES201", name: "Basic Electronics Engineering", attended: 43, total: 46, percentage: 93.5, status: "Excellent" },
      { code: "ES202", name: "Engineering Graphics & Design", attended: 38, total: 42, percentage: 90.5, status: "Excellent" },
      { code: "HM201", name: "English Language & Communication", attended: 36, total: 40, percentage: 90.0, status: "Excellent" },
      { code: "BS291", name: "Chemistry Lab", attended: 24, total: 28, percentage: 85.7, status: "Good" }
    ]
  },
  {
    id: 3,
    year: 2,
    semester: 3,
    attendance: "86.4",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#f2faf5] hover:bg-[#e7f7ed] border border-emerald-100/50",
    circleBadgeClass: "bg-[#dcfce7] text-[#16a34a]",
    academicYear: "2023 - 2024",
    totalHeld: 260,
    attended: 225,
    absent: 35,
    leavesApproved: 8,
    subjects: [
      { code: "CS301", name: "Digital Logic & Electronic Circuits", attended: 40, total: 48, percentage: 83.3, status: "Good" },
      { code: "CS302", name: "Data Structures & Algorithms", attended: 44, total: 48, percentage: 91.7, status: "Excellent" },
      { code: "CS303", name: "Computer Architecture", attended: 41, total: 48, percentage: 85.4, status: "Good" },
      { code: "BS301", name: "Discrete Mathematics", attended: 42, total: 48, percentage: 87.5, status: "Good" },
      { code: "CS391", name: "Data Structures Lab", attended: 30, total: 34, percentage: 88.2, status: "Good" },
      { code: "CS392", name: "Digital Electronics Lab", attended: 28, total: 34, percentage: 82.4, status: "Good" }
    ]
  },
  {
    id: 4,
    year: 2,
    semester: 4,
    attendance: "96.8",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#f2faf5] hover:bg-[#e7f7ed] border border-emerald-100/50",
    circleBadgeClass: "bg-[#dcfce7] text-[#16a34a]",
    academicYear: "2023 - 2024",
    totalHeld: 250,
    attended: 242,
    absent: 8,
    leavesApproved: 4,
    subjects: [
      { code: "CS401", name: "Design & Analysis of Algorithms", attended: 46, total: 48, percentage: 95.8, status: "Excellent" },
      { code: "CS402", name: "Operating Systems", attended: 47, total: 48, percentage: 97.9, status: "Excellent" },
      { code: "CS403", name: "Object Oriented Programming (Java)", attended: 48, total: 48, percentage: 100.0, status: "Perfect" },
      { code: "BS401", name: "Probability & Statistics", attended: 44, total: 46, percentage: 95.7, status: "Excellent" },
      { code: "CS491", name: "Operating Systems Lab", attended: 29, total: 30, percentage: 96.7, status: "Excellent" },
      { code: "CS492", name: "Java Programming Lab", attended: 28, total: 30, percentage: 93.3, status: "Excellent" }
    ]
  },
  {
    id: 5,
    year: 3,
    semester: 5,
    attendance: "90.7",
    remarks: "Excellent",
    remarksBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    rowBgClass: "bg-[#fffbf2] hover:bg-[#fdf3dc] border border-amber-100/50",
    circleBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    academicYear: "2024 - 2025",
    totalHeld: 245,
    attended: 222,
    absent: 23,
    leavesApproved: 6,
    subjects: [
      { code: "CS501", name: "Database Management Systems", attended: 45, total: 48, percentage: 93.8, status: "Excellent" },
      { code: "CS502", name: "Software Engineering & Agile", attended: 42, total: 46, percentage: 91.3, status: "Excellent" },
      { code: "CS503", name: "Theory of Computation", attended: 40, total: 45, percentage: 88.9, status: "Good" },
      { code: "CS504", name: "Artificial Intelligence", attended: 42, total: 46, percentage: 91.3, status: "Excellent" },
      { code: "CS591", name: "DBMS Laboratory", attended: 28, total: 30, percentage: 93.3, status: "Excellent" },
      { code: "CS592", name: "AI Laboratory", attended: 25, total: 30, percentage: 83.3, status: "Good" }
    ]
  },
  {
    id: 6,
    year: 3,
    semester: 6,
    attendance: "84.2",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#fffbf2] hover:bg-[#fdf3dc] border border-amber-100/50",
    circleBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    academicYear: "2024 - 2025",
    totalHeld: 240,
    attended: 202,
    absent: 38,
    leavesApproved: 7,
    subjects: [
      { code: "CS601", name: "Computer Networks & Security", attended: 38, total: 46, percentage: 82.6, status: "Good" },
      { code: "CS602", name: "Compiler Design", attended: 39, total: 46, percentage: 84.8, status: "Good" },
      { code: "CS603", name: "Cloud Computing", attended: 37, total: 44, percentage: 84.1, status: "Good" },
      { code: "CS604", name: "Web Technologies", attended: 40, total: 46, percentage: 87.0, status: "Good" },
      { code: "CS691", name: "Networking Lab", attended: 24, total: 29, percentage: 82.8, status: "Good" },
      { code: "CS692", name: "Cloud Lab", attended: 24, total: 29, percentage: 82.8, status: "Good" }
    ]
  },
  {
    id: 7,
    year: 4,
    semester: 7,
    attendance: "85.5",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee5e5] border border-rose-100/50",
    circleBadgeClass: "bg-[#ffe4e6] text-[#e11d48]",
    academicYear: "2025 - 2026",
    totalHeld: 230,
    attended: 197,
    absent: 33,
    leavesApproved: 6,
    subjects: [
      { code: "CS701", name: "Cryptography & Network Security", attended: 38, total: 44, percentage: 86.4, status: "Good" },
      { code: "CS702", name: "Machine Learning & Deep Learning", attended: 40, total: 46, percentage: 87.0, status: "Good" },
      { code: "CS703", name: "Internet of Things (IoT)", attended: 36, total: 44, percentage: 81.8, status: "Good" },
      { code: "CS791", name: "Major Project - Phase I", attended: 45, total: 50, percentage: 90.0, status: "Excellent" },
      { code: "CS792", name: "IoT & Embedded Lab", attended: 38, total: 46, percentage: 82.6, status: "Good" }
    ]
  },
  {
    id: 8,
    year: 4,
    semester: 8,
    attendance: "92.8",
    remarks: "Good",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee5e5] border border-rose-100/50",
    circleBadgeClass: "bg-[#ffe4e6] text-[#e11d48]",
    academicYear: "2025 - 2026",
    totalHeld: 210,
    attended: 195,
    absent: 15,
    leavesApproved: 4,
    subjects: [
      { code: "CS801", name: "Distributed Systems & Blockchain", attended: 42, total: 44, percentage: 95.5, status: "Excellent" },
      { code: "CS802", name: "Industrial Management & Economics", attended: 38, total: 42, percentage: 90.5, status: "Excellent" },
      { code: "CS891", name: "Major Project - Final Phase", attended: 75, total: 80, percentage: 93.8, status: "Excellent" },
      { code: "CS892", name: "Grand Viva Voce", attended: 40, total: 44, percentage: 90.9, status: "Excellent" }
    ]
  }
];

export default function StudentAttendance({
  hideHeader = false,
  activeSemester = null,
  onSelectSemester = null,
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [internalActiveSemester, setInternalActiveSemester] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const isControlled = onSelectSemester !== null && onSelectSemester !== undefined;
  const activeDetailSemester = isControlled ? activeSemester : internalActiveSemester;

  const setActiveDetailSemester = (sem) => {
    if (isControlled) {
      onSelectSemester(sem);
    } else {
      setInternalActiveSemester(sem);
    }
  };

  // Scroll to top when switching between main table and detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeDetailSemester]);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function handleDownload(sem) {
    showToast(`Downloading Attendance Report for Semester ${sem.semester} (PDF)...`);
  }

  const filteredAttendance = semesterAttendanceData.filter((item) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "year1") return item.year === 1;
    if (selectedFilter === "year2") return item.year === 2;
    if (selectedFilter === "year3") return item.year === 3;
    if (selectedFilter === "year4") return item.year === 4;
    if (selectedFilter.startsWith("sem")) {
      const semNum = parseInt(selectedFilter.replace("sem", ""), 10);
      return item.semester === semNum;
    }
    return true;
  });

  const totalSems = 8;
  const avgAttendance = "88.6";
  const highestAttendance = "96.8";
  const highestSemNumber = "4";
  const lowestAttendance = "84.2";
  const lowestSemNumber = "6";

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-4 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-200 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Conditional View: Detail Page OR Main Semester Table */}
      {activeDetailSemester ? (
        <SemesterAttendanceDetail
          semester={activeDetailSemester}
          allSemesters={semesterAttendanceData}
          onBack={() => setActiveDetailSemester(null)}
          onSelectSemester={setActiveDetailSemester}
          onDownload={handleDownload}
        />
      ) : (
        /* Main Semester Attendance Card Container */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-5 sm:p-7 lg:p-8 space-y-6 animate-in fade-in duration-200">

          {/* Card Header with Icon, Title, and Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1d61e7] shrink-0 shadow-2xs">
                <Users size={20} className="stroke-[2.2]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Semester Attendance
              </h2>
            </div>

            {/* Dropdown Filter */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
              >
                <Calendar size={14} className="text-[#1d61e7]" />
                <span>
                  {selectedFilter === "all"
                    ? "All Semesters"
                    : selectedFilter === "year1"
                      ? "Year 1"
                      : selectedFilter === "year2"
                        ? "Year 2"
                        : selectedFilter === "year3"
                          ? "Year 3"
                          : selectedFilter === "year4"
                            ? "Year 4"
                            : `Semester ${selectedFilter.replace("sem", "")}`}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {filterDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilter("all");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "all" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    All Semesters
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilter("year1");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "year1" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    Year 1 (Sem 1 & 2)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilter("year2");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "year2" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    Year 2 (Sem 3 & 4)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilter("year3");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "year3" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    Year 3 (Sem 5 & 6)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilter("year4");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedFilter === "year4" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    Year 4 (Sem 7 & 8)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Divider Line with margin below */}
          <div className="border-b border-slate-100 my-1" />

          {/* 4 Top KPI Cards matching Profile and Dashboard standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* 1. Total Semesters (Light Blue Squircle) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-blue-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#1d61e7] flex items-center justify-center shrink-0 border border-blue-100/80 shadow-2xs">
                <Calendar size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL SEMESTERS</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {totalSems}
                </p>
              </div>
            </div>

            {/* 2. Average Attendance (Light Green Squircle) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-emerald-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
                <CheckCircle2 size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AVERAGE ATTENDANCE</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {avgAttendance}%
                </p>
              </div>
            </div>

            {/* 3. Highest Attendance (Light Purple/Indigo Squircle) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-purple-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center shrink-0 border border-purple-100/80 shadow-2xs">
                <TrendingUp size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">HIGHEST ATTENDANCE</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {highestAttendance}%
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  Semester {highestSemNumber}
                </p>
              </div>
            </div>

            {/* 4. Lowest Attendance (Light Amber Squircle) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-amber-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#f59e0b] flex items-center justify-center shrink-0 border border-amber-100/80 shadow-2xs">
                <PieChart size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">LOWEST ATTENDANCE</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {lowestAttendance}%
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  Semester {lowestSemNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Data Table matching exact design */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2.5 min-w-[800px]">
              <thead>
                <tr className="bg-[#f0f6ff]/90 text-xs font-bold text-[#1d61e7] rounded-2xl overflow-hidden">
                  <th className="py-4 px-5 rounded-l-2xl text-center w-16">
                    #
                  </th>
                  <th className="py-4 px-5 text-center">
                    Year
                  </th>
                  <th className="py-4 px-5 text-center">
                    Semester
                  </th>
                  <th className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Attendance (%)</span>
                      <Info size={14} className="text-[#1d61e7] stroke-[2.4]" />
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center">
                    Remarks
                  </th>
                  <th className="py-4 px-5 text-center">
                    View Details
                  </th>
                  <th className="py-4 px-5 rounded-r-2xl text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((sem) => (
                  <tr
                    key={sem.id}
                    className={`${sem.rowBgClass} transition-all duration-150 rounded-2xl shadow-2xs hover:shadow-sm cursor-pointer`}
                    onClick={() => setActiveDetailSemester(sem)}
                  >
                    {/* Number badge */}
                    <td className="py-4 px-5 rounded-l-2xl text-center">
                      <span className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${sem.circleBadgeClass} text-xs font-extrabold shadow-2xs`}>
                        {sem.id}
                      </span>
                    </td>

                    {/* Year */}
                    <td className="py-4 px-5 text-center font-semibold text-slate-800 text-sm">
                      {sem.year}
                    </td>

                    {/* Semester */}
                    <td className="py-4 px-5 text-center font-semibold text-slate-800 text-sm">
                      {sem.semester}
                    </td>

                    {/* Attendance % */}
                    <td className="py-4 px-5 text-center font-extrabold text-slate-900 text-sm">
                      {sem.attendance}
                    </td>

                    {/* Remarks Badge */}
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-flex px-3.5 py-1 rounded-full text-xs font-bold ${sem.remarksBadgeClass} shadow-2xs`}>
                        {sem.remarks}
                      </span>
                    </td>

                    {/* View Details Button (Proper Button) */}
                    <td className="py-4 px-5 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDetailSemester(sem);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50/90 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200/70 hover:border-blue-600 text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                        title={`View ${sem.semester}th Semester breakdown`}
                      >
                        <Eye size={13} className="stroke-[2.4]" />
                        <span>View</span>
                      </button>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-5 rounded-r-2xl text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(sem);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#1d61e7] text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <Download size={13} className="stroke-[2.5]" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note Footer matching screenshot */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#f8fafc] text-xs text-slate-500 font-medium border border-slate-100/90">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1d61e7]">
              <Info size={13} className="stroke-[2.4]" />
            </div>
            <p className="leading-relaxed">
              <strong className="text-slate-800 font-bold">Note:</strong> Attendance is calculated based on the classes you were present in out of the total classes held.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
