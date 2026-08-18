import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  GraduationCap,
  Info,
  Medal,
  Printer,
  Quote,
  TrendingUp,
  Trophy,
  X,
  CheckCircle,
  Eye,
  Award,
  Sparkles,
  Search,
  Filter,
  Users
} from "lucide-react";
import SemesterResultDetail from "./SemesterResultDetail";

export const semesterResultsData = [
  {
    id: 1,
    year: 1,
    semester: 1,
    sgpa: "9.20",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#f3f0ff] text-[#7c3aed]",
    rowBgClass: "bg-[#f8f7ff] hover:bg-[#f0efff] border border-indigo-100/50",
    circleBadgeClass: "bg-[#ede9fe] text-[#7c3aed]",
    quoteColor: "text-blue-500",
    remark: "Excellent Result",
    academicYear: "2022 - 2023",
    totalCredits: 22,
    subjects: [
      { code: "BS101", name: "Engineering Mathematics - I", credits: 4, internal: "28/30", theory: "65/70", total: "93/100", grade: "O", point: 10 },
      { code: "BS102", name: "Engineering Physics", credits: 4, internal: "27/30", theory: "63/70", total: "90/100", grade: "O", point: 10 },
      { code: "ES101", name: "Basic Electrical Engineering", credits: 4, internal: "26/30", theory: "61/70", total: "87/100", grade: "A+", point: 9 },
      { code: "ES102", name: "Programming for Problem Solving", credits: 4, internal: "29/30", theory: "67/70", total: "96/100", grade: "O", point: 10 },
      { code: "BS191", name: "Physics Lab", credits: 1.5, internal: "25/25", theory: "24/25", total: "49/50", grade: "O", point: 10 },
      { code: "ES192", name: "Programming Lab", credits: 1.5, internal: "25/25", theory: "25/25", total: "50/50", grade: "O", point: 10 }
    ]
  },
  {
    id: 2,
    year: 1,
    semester: 2,
    sgpa: "9.01",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#f3f0ff] text-[#7c3aed]",
    rowBgClass: "bg-[#f8f7ff] hover:bg-[#f0efff] border border-indigo-100/50",
    circleBadgeClass: "bg-[#ede9fe] text-[#7c3aed]",
    quoteColor: "text-emerald-500",
    remark: "Excellent Result",
    academicYear: "2022 - 2023",
    totalCredits: 22,
    subjects: [
      { code: "BS201", name: "Engineering Mathematics - II", credits: 4, internal: "27/30", theory: "63/70", total: "90/100", grade: "O", point: 10 },
      { code: "BS202", name: "Engineering Chemistry", credits: 4, internal: "26/30", theory: "60/70", total: "86/100", grade: "A+", point: 9 },
      { code: "ES201", name: "Basic Electronics Engineering", credits: 4, internal: "28/30", theory: "62/70", total: "90/100", grade: "O", point: 10 },
      { code: "ES202", name: "Engineering Graphics & Design", credits: 3, internal: "28/30", theory: "64/70", total: "92/100", grade: "O", point: 10 },
      { code: "HM201", name: "English Language & Communication", credits: 2, internal: "29/30", theory: "58/70", total: "87/100", grade: "A+", point: 9 }
    ]
  },
  {
    id: 3,
    year: 2,
    semester: 3,
    sgpa: "9.12",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#f2faf5] hover:bg-[#e7f7ed] border border-emerald-100/50",
    circleBadgeClass: "bg-[#dcfce7] text-[#16a34a]",
    quoteColor: "text-emerald-500",
    remark: "Excellent Result",
    academicYear: "2023 - 2024",
    totalCredits: 24,
    subjects: [
      { code: "CS301", name: "Digital Logic & Electronic Circuits", credits: 4, internal: "28/30", theory: "64/70", total: "92/100", grade: "O", point: 10 },
      { code: "CS302", name: "Data Structures & Algorithms", credits: 4, internal: "30/30", theory: "65/70", total: "95/100", grade: "O", point: 10 },
      { code: "CS303", name: "Computer Architecture", credits: 4, internal: "27/30", theory: "62/70", total: "89/100", grade: "A+", point: 9 },
      { code: "BS301", name: "Discrete Mathematics", credits: 4, internal: "28/30", theory: "62/70", total: "90/100", grade: "O", point: 10 },
      { code: "CS391", name: "Data Structures Lab", credits: 2, internal: "50/50", theory: "48/50", total: "98/100", grade: "O", point: 10 }
    ]
  },
  {
    id: 4,
    year: 2,
    semester: 4,
    sgpa: "8.88",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#edf9f0] text-[#16a34a]",
    rowBgClass: "bg-[#f2faf5] hover:bg-[#e7f7ed] border border-emerald-100/50",
    circleBadgeClass: "bg-[#dcfce7] text-[#16a34a]",
    quoteColor: "text-emerald-500",
    remark: "Good Result",
    academicYear: "2023 - 2024",
    totalCredits: 24,
    subjects: [
      { code: "CS401", name: "Design & Analysis of Algorithms", credits: 4, internal: "27/30", theory: "60/70", total: "87/100", grade: "A+", point: 9 },
      { code: "CS402", name: "Operating Systems", credits: 4, internal: "28/30", theory: "59/70", total: "87/100", grade: "A+", point: 9 },
      { code: "CS403", name: "Object Oriented Programming (Java)", credits: 4, internal: "29/30", theory: "63/70", total: "92/100", grade: "O", point: 10 },
      { code: "BS401", name: "Probability & Statistics", credits: 3, internal: "26/30", theory: "58/70", total: "84/100", grade: "A+", point: 9 },
      { code: "CS491", name: "Operating Systems Lab", credits: 2, internal: "48/50", theory: "46/50", total: "94/100", grade: "O", point: 10 }
    ]
  },
  {
    id: 5,
    year: 3,
    semester: 5,
    sgpa: "9.70",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    rowBgClass: "bg-[#fffbf2] hover:bg-[#fdf3dc] border border-amber-100/50",
    circleBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    quoteColor: "text-amber-500",
    remark: "Excellent Result",
    academicYear: "2024 - 2025",
    totalCredits: 22,
    subjects: [
      { code: "CS501", name: "Database Management Systems", credits: 4, internal: "30/30", theory: "68/70", total: "98/100", grade: "O", point: 10 },
      { code: "CS502", name: "Software Engineering & Agile", credits: 4, internal: "29/30", theory: "66/70", total: "95/100", grade: "O", point: 10 },
      { code: "CS503", name: "Theory of Computation", credits: 4, internal: "28/30", theory: "65/70", total: "93/100", grade: "O", point: 10 },
      { code: "CS504", name: "Artificial Intelligence", credits: 3, internal: "29/30", theory: "67/70", total: "96/100", grade: "O", point: 10 },
      { code: "CS591", name: "DBMS Laboratory", credits: 2, internal: "50/50", theory: "49/50", total: "99/100", grade: "O", point: 10 }
    ]
  },
  {
    id: 6,
    year: 3,
    semester: 6,
    sgpa: "8.20",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    rowBgClass: "bg-[#fffbf2] hover:bg-[#fdf3dc] border border-amber-100/50",
    circleBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    quoteColor: "text-amber-500",
    remark: "Good Result",
    academicYear: "2024 - 2025",
    totalCredits: 22,
    subjects: [
      { code: "CS601", name: "Computer Networks & Security", credits: 4, internal: "26/30", theory: "56/70", total: "82/100", grade: "A", point: 8 },
      { code: "CS602", name: "Compiler Design", credits: 4, internal: "25/30", theory: "57/70", total: "82/100", grade: "A", point: 8 },
      { code: "CS603", name: "Cloud Computing", credits: 3, internal: "27/30", theory: "58/70", total: "85/100", grade: "A+", point: 9 },
      { code: "CS691", name: "Networking Lab", credits: 2, internal: "45/50", theory: "45/50", total: "90/100", grade: "O", point: 10 }
    ]
  },
  {
    id: 7,
    year: 4,
    semester: 7,
    sgpa: "9.50",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    rowBgClass: "bg-[#f0f9ff] hover:bg-[#e0f2fe] border border-sky-100/50",
    circleBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    quoteColor: "text-rose-500",
    remark: "Excellent Result",
    academicYear: "2025 - 2026",
    totalCredits: 20,
    subjects: [
      { code: "CS701", name: "Cryptography & Network Security", credits: 4, internal: "29/30", theory: "66/70", total: "95/100", grade: "O", point: 10 },
      { code: "CS702", name: "Machine Learning & Deep Learning", credits: 4, internal: "30/30", theory: "65/70", total: "95/100", grade: "O", point: 10 },
      { code: "CS703", name: "Internet of Things (IoT)", credits: 3, internal: "28/30", theory: "63/70", total: "91/100", grade: "O", point: 10 },
      { code: "CS791", name: "Major Project - Phase I", credits: 4, internal: "50/50", theory: "48/50", total: "98/100", grade: "O", point: 10 }
    ]
  },
  {
    id: 8,
    year: 4,
    semester: 8,
    sgpa: "9.60",
    grade: "A",
    status: "Pass",
    remarksBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    rowBgClass: "bg-[#f0f9ff] hover:bg-[#e0f2fe] border border-sky-100/50",
    circleBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    quoteColor: "text-rose-500",
    remark: "Excellent Result",
    academicYear: "2025 - 2026",
    totalCredits: 20,
    subjects: [
      { code: "CS801", name: "Distributed Systems & Blockchain", credits: 4, internal: "29/30", theory: "67/70", total: "96/100", grade: "O", point: 10 },
      { code: "CS802", name: "Industrial Management & Economics", credits: 3, internal: "28/30", theory: "64/70", total: "92/100", grade: "O", point: 10 },
      { code: "CS891", name: "Major Project - Final Phase", credits: 6, internal: "100/100", theory: "96/100", total: "196/200", grade: "O", point: 10 },
      { code: "CS892", name: "Grand Viva Voce", credits: 2, internal: "50/50", theory: "48/50", total: "98/100", grade: "O", point: 10 }
    ]
  }
];

export default function StudentResults({
  activeSemester = null,
  onSelectSemester = null,
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [internalActiveSemester, setInternalActiveSemester] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Controlled vs uncontrolled mode
  const isControlled = onSelectSemester !== null && onSelectSemester !== undefined;
  const activeDetailSemester = isControlled ? activeSemester : internalActiveSemester;

  const setActiveDetailSemester = (sem) => {
    if (isControlled) {
      onSelectSemester(sem);
    } else {
      setInternalActiveSemester(sem);
    }
  };

  // Auto-scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeDetailSemester?.semester]);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function handleDownload(sem) {
    showToast(`Downloading Official Grade Card for Semester ${sem.semester} (PDF)...`);
  }

  const filteredResults = semesterResultsData.filter((item) => {
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
  const avgSGPA = (
    filteredResults.reduce((acc, curr) => acc + parseFloat(curr.sgpa), 0) / (filteredResults.length || 1)
  ).toFixed(2);

  const highestSem = filteredResults.reduce((prev, curr) => {
    return parseFloat(curr.sgpa) > parseFloat(prev.sgpa) ? curr : prev;
  }, filteredResults[0] || semesterResultsData[4]);

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-4 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-200 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Conditional In-Page View: Dedicated Result Detail Page OR Main Semester Table */}
      {activeDetailSemester ? (
        <SemesterResultDetail
          semester={activeDetailSemester}
          allSemesters={semesterResultsData}
          onBack={() => setActiveDetailSemester(null)}
          onSelectSemester={setActiveDetailSemester}
          onDownload={handleDownload}
        />
      ) : (
        /* Main Semester Results Card Container */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-5 sm:p-7 lg:p-8 space-y-6 animate-in fade-in duration-200">
          
          {/* Card Header with Icon, Title, and Filter Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1d61e7] shrink-0 shadow-2xs">
                <FileText size={20} className="stroke-[2.2]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Semester Results
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
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedFilter === "all" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
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
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedFilter === "year1" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
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
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedFilter === "year2" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
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
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedFilter === "year3" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
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
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      selectedFilter === "year4" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
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

          {/* 4 Top KPI Cards matching Attendance, Profile and Dashboard standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Total Semesters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-blue-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 shadow-2xs">
                <GraduationCap size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL SEMESTERS</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {totalSems}
                </p>
              </div>
            </div>

            {/* 2. Average SGPA */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-emerald-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
                <TrendingUp size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AVERAGE SGPA</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {avgSGPA}
                </p>
              </div>
            </div>

            {/* 3. Highest SGPA */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-purple-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/80 shadow-2xs">
                <Trophy size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">HIGHEST SGPA</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {highestSem.sgpa}
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">Semester {highestSem.semester}</p>
              </div>
            </div>

            {/* 4. Overall Grade */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-amber-200 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-2xs">
                <Award size={24} className="stroke-[2.2]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">OVERALL GRADE</p>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  A
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">Excellent</p>
              </div>
            </div>
          </div>

          {/* Results Data Table matching Attendance layout, font size, space, and colors */}
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
                      <span>SGPA</span>
                      <Info size={14} className="text-[#1d61e7] stroke-[2.4]" />
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center">
                    Grade
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
                {filteredResults.map((sem) => (
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

                    {/* 1. Year */}
                    <td className="py-4 px-5 text-center font-semibold text-slate-800 text-sm">
                      {sem.year}
                    </td>

                    {/* 2. Semester */}
                    <td className="py-4 px-5 text-center font-semibold text-slate-800 text-sm">
                      {sem.semester}
                    </td>

                    {/* 3. SGPA */}
                    <td className="py-4 px-5 text-center font-extrabold text-slate-900 text-sm">
                      {sem.sgpa}
                    </td>

                    {/* 4. Grade */}
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-bold bg-[#edf9f0] text-[#16a34a] shadow-2xs">
                        {sem.grade}
                      </span>
                    </td>

                    {/* 5. Remarks Badge */}
                    <td className="py-4 px-5 text-center">
                      <span className={`inline-flex px-3.5 py-1 rounded-full text-xs font-bold ${sem.remarksBadgeClass} shadow-2xs`}>
                        {sem.remark}
                      </span>
                    </td>

                    {/* 6. View Details Button */}
                    <td className="py-4 px-5 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDetailSemester(sem);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50/90 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200/70 hover:border-blue-600 text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                        title={`View Semester ${sem.semester} breakdown`}
                      >
                        <Eye size={13} className="stroke-[2.4]" />
                        <span>View</span>
                      </button>
                    </td>

                    {/* 7. Action Button */}
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

          {/* Note Footer matching Attendance */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#f8fafc] text-xs text-slate-500 font-medium border border-slate-100/90">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1d61e7]">
              <Info size={13} className="stroke-[2.4]" />
            </div>
            <p className="leading-relaxed">
              <strong className="text-slate-800 font-bold">Grading System:</strong> O (Outstanding) 10.0 – 9.0 &bull; A+ (Excellent) 8.9 – 8.0 &bull; A (Very Good) 7.9 – 7.0 &bull; B (Good) 6.9 – 6.0 &bull; C (Average) 5.9 – 5.0 &bull; F (Fail) Below 5.0
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
