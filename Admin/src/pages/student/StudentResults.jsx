import { useState } from "react";
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
  Filter
} from "lucide-react";

export const semesterResultsData = [
  {
    id: 1,
    year: 1,
    semester: 1,
    sgpa: "9.20",
    grade: "A",
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#f4f9ff] hover:bg-[#ebf4ff]",
    circleBadgeClass: "bg-blue-100 text-blue-600",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#f4f9ff] hover:bg-[#ebf4ff]",
    circleBadgeClass: "bg-blue-100 text-blue-600",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#f4fbf7] hover:bg-[#e7f7ed]",
    circleBadgeClass: "bg-teal-100 text-teal-700",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#f4fbf7] hover:bg-[#e7f7ed]",
    circleBadgeClass: "bg-emerald-100 text-emerald-700",
    quoteColor: "text-emerald-500",
    remark: "Excellent Result",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#fffbf0] hover:bg-[#fdf4db]",
    circleBadgeClass: "bg-amber-100 text-amber-700",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#fffbf0] hover:bg-[#fdf4db]",
    circleBadgeClass: "bg-amber-100 text-amber-700",
    quoteColor: "text-amber-500",
    remark: "Excellent Result",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee2e2]",
    circleBadgeClass: "bg-rose-100 text-rose-700",
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
    gradeBadgeClass: "bg-emerald-100 text-emerald-700",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee2e2]",
    circleBadgeClass: "bg-rose-100 text-rose-700",
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

export default function StudentResults({ hideHeader = false }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedSemesterModal, setSelectedSemesterModal] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

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

  const totalSems = filteredResults.length;
  const avgSGPA = (
    filteredResults.reduce((acc, curr) => acc + parseFloat(curr.sgpa), 0) / (totalSems || 1)
  ).toFixed(2);

  const highestSem = filteredResults.reduce((prev, curr) => {
    return parseFloat(curr.sgpa) > parseFloat(prev.sgpa) ? curr : prev;
  }, filteredResults[0] || semesterResultsData[4]);

  return (
    <div className="flex-1 h-full w-full min-h-0 bg-[#f8fafc] text-slate-800 flex flex-col overflow-hidden font-sans">
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

      {/* Top Header */}
      {!hideHeader && (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-sm font-barlow">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-slate-800 font-barlow">
              Results
            </h1>
            <p className="text-sm text-slate-500 font-barlow">
              An overview of your academic performance and outcomes
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <Bell size={18} />
              </button>
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-semibold text-white">
                3
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="w-full space-y-4 pb-12">
          {/* Main Semester Results Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
            {/* Card Header with Icon, Title, and Filter Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={20} className="stroke-[2.2]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Semester Results
                </h2>
              </div>

              {/* Dropdown Filter */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all"
                >
                  <Calendar size={15} className="text-slate-500" />
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

            {/* 4 Top KPI Cards matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Total Semesters */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-blue-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Total Semesters</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {totalSems}
                  </p>
                </div>
              </div>

              {/* 2. Average SGPA */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Average SGPA</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-0.5">
                    {avgSGPA}
                  </p>
                </div>
              </div>

              {/* 3. Highest SGPA */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-purple-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Highest SGPA</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {highestSem.sgpa}
                  </p>
                  <p className="text-[11px] font-medium text-purple-600">Semester {highestSem.semester}</p>
                </div>
              </div>

              {/* 4. Overall Grade */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-amber-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Overall Grade</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-0.5">
                    A
                  </p>
                  <p className="text-[11px] font-medium text-slate-400">Excellent</p>
                </div>
              </div>
            </div>

            {/* Results Data Table matching exact design */}
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-xs font-semibold text-slate-500 tracking-wide">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Semester</th>
                    <th className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span>SGPA</span>
                        <Info size={13} className="text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center">Overall Grade</th>
                    <th className="py-3 px-4 text-center">Action</th>
                    <th className="py-3 px-4">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((sem) => (
                    <tr
                      key={sem.id}
                      onClick={() => setSelectedSemesterModal(sem)}
                      className={`${sem.rowBgClass} transition-colors rounded-xl cursor-pointer group`}
                    >
                      {/* Number badge */}
                      <td className="py-3.5 px-4 rounded-l-xl">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${sem.circleBadgeClass} text-xs font-bold shadow-xs`}>
                          {sem.id}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {sem.year}
                      </td>

                      {/* Semester */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {sem.semester}
                      </td>

                      {/* SGPA */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {sem.sgpa}
                      </td>

                      {/* Overall Grade Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                          {sem.grade}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(sem);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-600 text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
                        >
                          <Download size={13} className="stroke-[2.5]" />
                          <span>Download</span>
                        </button>
                      </td>

                      {/* Remark with Quote Icon */}
                      <td className="py-3.5 px-4 rounded-r-xl">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <span className={`${sem.quoteColor} text-base leading-none font-serif`}>“</span>
                          <span>{sem.remark}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grading System Footer Bar matching screenshot */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-600 text-xs sm:text-xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-blue-600">
                <Info size={16} />
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                <span className="font-bold text-blue-700">Grading System:</span>
                <span>O (Outstanding) 10.0 – 9.0</span>
                <span className="text-slate-300">|</span>
                <span>A+ (Excellent) 8.9 – 8.0</span>
                <span className="text-slate-300">|</span>
                <span>A (Very Good) 7.9 – 7.0</span>
                <span className="text-slate-300">|</span>
                <span>B (Good) 6.9 – 6.0</span>
                <span className="text-slate-300">|</span>
                <span>C (Average) 5.9 – 5.0</span>
                <span className="text-slate-300">|</span>
                <span>F (Fail) Below 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SEMESTER MARKS BREAKDOWN MODAL */}
      {selectedSemesterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Semester {selectedSemesterModal.semester} Grade Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Academic Year {selectedSemesterModal.academicYear} • SGPA: <strong className="text-blue-600">{selectedSemesterModal.sgpa}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSemesterModal(null)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Subject Marks Table */}
            <div className="p-6 overflow-x-auto space-y-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Subject Code</th>
                    <th className="py-2.5 px-3">Subject Name</th>
                    <th className="py-2.5 px-3">Credits</th>
                    <th className="py-2.5 px-3">Internal</th>
                    <th className="py-2.5 px-3">Theory</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3 text-center">Grade</th>
                    <th className="py-2.5 px-3 text-center">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedSemesterModal.subjects.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-semibold text-blue-600 text-xs">{sub.code}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">{sub.name}</td>
                      <td className="py-3 px-3 text-slate-600">{sub.credits}</td>
                      <td className="py-3 px-3 text-xs text-slate-600">{sub.internal}</td>
                      <td className="py-3 px-3 text-xs text-slate-600">{sub.theory}</td>
                      <td className="py-3 px-3 text-xs font-bold text-slate-800">{sub.total}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-700">{sub.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold">
                <div className="flex items-center gap-6">
                  <span>Total Credits: <strong className="text-slate-800">{selectedSemesterModal.totalCredits}</strong></span>
                  <span>Semester SGPA: <strong className="text-emerald-600 text-sm">{selectedSemesterModal.sgpa}</strong></span>
                  <span>Overall Grade: <strong className="text-blue-600">{selectedSemesterModal.grade} (Outstanding)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedSemesterModal)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Printer size={13} />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
