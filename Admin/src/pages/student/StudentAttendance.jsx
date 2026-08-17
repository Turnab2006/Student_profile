import { useState } from "react";
import {
  Bell,
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
  Clock,
  CalendarCheck,
  Printer,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export const semesterAttendanceData = [
  {
    id: 1,
    year: 1,
    semester: 1,
    attendance: "88.5",
    remarks: "Good",
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#f4f9ff] hover:bg-[#ebf4ff]",
    circleBadgeClass: "bg-blue-100 text-blue-600",
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
    remarksBadgeClass: "bg-purple-50 text-purple-600 border border-purple-100",
    rowBgClass: "bg-[#f4f9ff] hover:bg-[#ebf4ff]",
    circleBadgeClass: "bg-blue-100 text-blue-600",
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
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#f4fbf7] hover:bg-[#e7f7ed]",
    circleBadgeClass: "bg-teal-100 text-teal-700",
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
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#f4fbf7] hover:bg-[#e7f7ed]",
    circleBadgeClass: "bg-emerald-100 text-emerald-700",
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
    remarksBadgeClass: "bg-amber-50 text-amber-600 border border-amber-100",
    rowBgClass: "bg-[#fffbf0] hover:bg-[#fdf4db]",
    circleBadgeClass: "bg-amber-100 text-amber-700",
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
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#fffbf0] hover:bg-[#fdf4db]",
    circleBadgeClass: "bg-amber-100 text-amber-700",
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
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee2e2]",
    circleBadgeClass: "bg-rose-100 text-rose-700",
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
    remarksBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    rowBgClass: "bg-[#fff5f5] hover:bg-[#fee2e2]",
    circleBadgeClass: "bg-rose-100 text-rose-700",
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

export default function StudentAttendance({ hideHeader = false }) {
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

  const totalSems = filteredAttendance.length;
  const avgAttendance = (
    filteredAttendance.reduce((acc, curr) => acc + parseFloat(curr.attendance), 0) / (totalSems || 1)
  ).toFixed(1);

  const highestSem = filteredAttendance.reduce((prev, curr) => {
    return parseFloat(curr.attendance) > parseFloat(prev.attendance) ? curr : prev;
  }, filteredAttendance[0] || semesterAttendanceData[3]);

  const lowestSem = filteredAttendance.reduce((prev, curr) => {
    return parseFloat(curr.attendance) < parseFloat(prev.attendance) ? curr : prev;
  }, filteredAttendance[0] || semesterAttendanceData[5]);

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
              Attendance
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
          {/* Main Semester Attendance Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
            {/* Card Header with Icon, Title, and Filter Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={20} className="stroke-[2.2]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Semester Attendance
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
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Total Semesters</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {totalSems}
                  </p>
                </div>
              </div>

              {/* 2. Average Attendance */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-emerald-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Average Attendance</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {avgAttendance}%
                  </p>
                </div>
              </div>

              {/* 3. Highest Attendance */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-purple-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Highest Attendance</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {highestSem.attendance}%
                  </p>
                  <p className="text-[11px] font-medium text-purple-600">Semester {highestSem.semester}</p>
                </div>
              </div>

              {/* 4. Lowest Attendance */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-[#fbfcfe] flex items-center gap-4 shadow-sm hover:border-amber-200 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <PieChart size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Lowest Attendance</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {lowestSem.attendance}%
                  </p>
                  <p className="text-[11px] font-medium text-slate-400">Semester {lowestSem.semester}</p>
                </div>
              </div>
            </div>

            {/* Attendance Data Table matching exact design */}
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-xs font-semibold text-slate-500 tracking-wide">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Semester</th>
                    <th className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span>Attendance (%)</span>
                        <Info size={13} className="text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Remarks</th>
                    <th className="py-3 px-4">View Details</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((sem) => (
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

                      {/* Attendance % */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {sem.attendance}
                      </td>

                      {/* Remarks Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${sem.remarksBadgeClass}`}>
                          {sem.remarks}
                        </span>
                      </td>

                      {/* View Details Link */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSemesterModal(sem);
                          }}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          Click here...
                        </button>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 rounded-r-xl text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(sem);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 text-blue-600 text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
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
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50/80 text-slate-500 text-xs">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-blue-600 font-bold">
                <Info size={14} />
              </div>
              <p>
                <strong className="text-slate-700">Note:</strong> Attendance is calculated based on the classes you were present in out of the total classes held.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* SEMESTER ATTENDANCE BREAKDOWN MODAL */}
      {selectedSemesterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <CalendarCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Semester {selectedSemesterModal.semester} Attendance Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Academic Year {selectedSemesterModal.academicYear} • Overall: <strong className="text-blue-600">{selectedSemesterModal.attendance}%</strong> ({selectedSemesterModal.attended}/{selectedSemesterModal.totalHeld} classes)
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

            {/* Subject Attendance Table */}
            <div className="p-6 overflow-x-auto space-y-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Subject Code</th>
                    <th className="py-2.5 px-3">Subject Name</th>
                    <th className="py-2.5 px-3">Attended</th>
                    <th className="py-2.5 px-3">Total Held</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedSemesterModal.subjects.map((sub) => (
                    <tr key={sub.code} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-semibold text-blue-600 text-xs">{sub.code}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">{sub.name}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">{sub.attended}</td>
                      <td className="py-3 px-3 text-slate-500">{sub.total}</td>
                      <td className="py-3 px-3 font-extrabold text-blue-700">{sub.percentage}%</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${sub.percentage >= 90
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                          }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold">
                <div className="flex items-center gap-6">
                  <span>Classes Attended: <strong className="text-emerald-600 text-sm">{selectedSemesterModal.attended}</strong></span>
                  <span>Absences: <strong className="text-rose-500">{selectedSemesterModal.absent}</strong></span>
                  <span>Excused Leaves: <strong className="text-blue-600">{selectedSemesterModal.leavesApproved}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedSemesterModal)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
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
