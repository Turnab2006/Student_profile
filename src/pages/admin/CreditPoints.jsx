import { useState, useMemo } from "react";
import {
  Award,
  Search,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  Menu,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Building2,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { STUDENTS_DATA, DEPT_BADGE_COLORS } from "../../data/studentsData";

export default function CreditPoints({ onNavigate, onOpenSidebar }) {
  const [studentsData] = useState(STUDENTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // all | completed | in-progress

  // Filter logic
  const filteredStudents = useMemo(() => {
    return studentsData.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.dept.toLowerCase().includes(q) ||
        s.deptCode.toLowerCase().includes(q) ||
        s.mentor.toLowerCase().includes(q);

      const matchesDept = deptFilter === "all" || s.deptCode === deptFilter;
      const matchesProg = programFilter === "all" || s.program === programFilter;
      const matchesYear =
        yearFilter === "all" ||
        s.year === yearFilter ||
        s.yearStr === yearFilter ||
        String(s.yearNum) === yearFilter ||
        `${s.year} Year` === yearFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && s.totalEarned >= 100) ||
        (statusFilter === "in-progress" && s.totalEarned < 100);

      return matchesSearch && matchesDept && matchesProg && matchesYear && matchesStatus;
    });
  }, [studentsData, searchQuery, deptFilter, programFilter, yearFilter, statusFilter]);

  // Aggregate Stats
  const totalEarnedAll = useMemo(() => {
    return studentsData.reduce((acc, curr) => acc + curr.totalEarned, 0);
  }, [studentsData]);

  const targetAchievedCount = useMemo(() => {
    return studentsData.filter((s) => s.totalEarned >= 100).length;
  }, [studentsData]);

  const inProgressCount = studentsData.length - targetAchievedCount;
  const avgScore = studentsData.length ? Math.round(totalEarnedAll / studentsData.length) : 0;

  const hasActiveFilters =
    searchQuery !== "" ||
    deptFilter !== "all" ||
    programFilter !== "all" ||
    yearFilter !== "all" ||
    statusFilter !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setDeptFilter("all");
    setProgramFilter("all");
    setYearFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
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
            <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-800 tracking-tight truncate">
              Credit Points Directory
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Institutional credit score ledger, graduation compliance &amp; student activity records
            </p>
          </div>
        </div>

        <AdminProfile onNavigate={onNavigate} />
      </header>

      {/* 2. Main Scrollable Container */}
      <main className="flex-1 p-3.5 sm:p-5 space-y-4 overflow-y-auto">
        
        {/* ========================================================================= */}
        {/* HERO BANNER (Admin Theme Gradient: #0da651 / Emerald & Dark Green)         */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#059669] to-[#047857] p-4 sm:p-5 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-600/30">
          {/* Ambient Glows */}
          <div className="absolute -right-10 -top-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-1 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Institute Student Credit Points
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50/90 font-normal leading-relaxed">
              Track, audit, and inspect student co-curricular credits, verified credentials, department benchmarks, and student graduation readiness across all academic programs.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap shrink-0">
            <div className="bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/25 text-white flex items-center gap-2.5 shadow-xs">
              <Building2 size={17} className="text-emerald-200" />
              <div className="text-left">
                <div className="text-[10px] text-emerald-100 uppercase tracking-wider font-semibold">Current Session</div>
                <div className="text-xs font-bold font-mono">2024 - 2025 Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4 METRIC STAT CARDS (Standardized Admin Portal Design)                    */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          
          {/* Card 1: Total Credits Awarded */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-sm border-l-4 border-l-[#0da651] hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#eaf8f1] text-[#0da651]">
                <Award size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Total Credits Awarded
                </div>
                <div className="text-lg sm:text-[22px] font-extrabold text-slate-900 leading-tight mt-0.5">
                  {totalEarnedAll.toLocaleString()} Pts
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                  Across all active mentees
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 100/100 Criteria Met */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-sm border-l-4 border-l-emerald-600 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  100/100 Criteria Met
                </div>
                <div className="text-lg sm:text-[22px] font-extrabold text-emerald-600 leading-tight mt-0.5">
                  {targetAchievedCount} Students
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                  Ready for graduation clearance
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: In-Progress Students */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600">
                <Clock size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  In-Progress (&lt;100 Pts)
                </div>
                <div className="text-lg sm:text-[22px] font-extrabold text-slate-900 leading-tight mt-0.5">
                  {inProgressCount} Students
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                  Submitting semester claims
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Average Score */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-sm border-l-4 border-l-[#3B82F6] hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#EEF5FF] text-[#3B82F6]">
                <TrendingUp size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Institute Average
                </div>
                <div className="text-lg sm:text-[22px] font-extrabold text-slate-900 leading-tight mt-0.5">
                  {avgScore} Pts / 100
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                  Mean institutional score
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* FILTER CONTROL BAR                                                        */}
        {/* ========================================================================= */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0da651] flex items-center justify-center border border-emerald-100 shrink-0">
                <SlidersHorizontal size={16} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Filter &amp; Search Student Records</h3>
                <p className="text-[11px] text-slate-400">Search by student name, roll number, department, program or criteria status</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                Showing {filteredStudents.length} of {studentsData.length} Students
              </span>
              
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#0da651] hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Search Student
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Name, roll, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-gray-400 outline-none focus:bg-white focus:border-[#0da651] focus:ring-2 focus:ring-emerald-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Department
              </label>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                  deptFilter !== "all"
                    ? "bg-emerald-50 border-[#0da651] text-[#0da651]"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#0da651]"
                }`}
              >
                <option value="all">All Departments</option>
                <option value="CSE">Computer Science &amp; Engg (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics &amp; Comm. (ECE)</option>
                <option value="EE">Electrical Engineering (EE)</option>
                <option value="ME">Mechanical Engineering (ME)</option>
                <option value="BCA">Computer Applications (BCA)</option>
              </select>
            </div>

            {/* Program Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Program
              </label>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                  programFilter !== "all"
                    ? "bg-emerald-50 border-[#0da651] text-[#0da651]"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#0da651]"
                }`}
              >
                <option value="all">All Programs</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.Tech Lateral">B.Tech Lateral</option>
                <option value="M.Tech">M.Tech</option>
                <option value="BCA">BCA</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Year of Study
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                  yearFilter !== "all"
                    ? "bg-emerald-50 border-[#0da651] text-[#0da651]"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#0da651]"
                }`}
              >
                <option value="all">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            {/* Target Status Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Graduation Target (100 Pts)
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                  statusFilter !== "all"
                    ? "bg-emerald-50 border-[#0da651] text-[#0da651]"
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#0da651]"
                }`}
              >
                <option value="all">All Scores</option>
                <option value="completed">🏆 100/100 Pts Achieved</option>
                <option value="in-progress">⏳ In Progress (&lt;100 Pts)</option>
              </select>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDENT CREDIT POINTS TABLE (All Students in Institute)                   */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden">
          {/* Table meta row with solid green gradient matching other Admin tables */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white border-b border-emerald-600/30">
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0" />
              <p className="text-xs font-semibold text-white tracking-wide">
                Showing <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md border border-white/20">{filteredStudents.length}</span> of <span className="font-bold text-white">{studentsData.length}</span> student credit records
              </p>
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Users className="mx-auto text-slate-300" size={44} />
              <h4 className="text-sm font-bold text-slate-800">No student records found matching your filter criteria</h4>
              <p className="text-xs text-slate-400">Try changing keywords or resetting filter dropdowns.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0da651] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">College Roll</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Semester</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Points</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStudents.map((student) => {
                    const pct = Math.min(100, Math.round((student.totalEarned / student.target) * 100));
                    const isCompleted = student.totalEarned >= 100;
                    const yearDisplay = student.yearNum ?? (student.year ? String(student.year).replace(/\D/g, "") : "") || "3";
                    const semDisplay = student.semNum ?? (student.semester ? String(student.semester).replace(/\D/g, "") : "") || "5";

                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        {/* 1. Student Name (Left aligned) */}
                        <td className="px-4 py-3 text-left align-middle">
                          <div className="min-w-0">
                            <span className="font-medium text-primary text-xs block leading-tight">{student.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">Mentor: {student.mentor}</span>
                          </div>
                        </td>

                        {/* 2. College Roll */}
                        <td className="px-3 py-3 text-center align-middle text-xs text-gray-600 font-mono">
                          {student.roll}
                        </td>

                        {/* 3. Department */}
                        <td className="px-3 py-3 text-center align-middle">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${DEPT_BADGE_COLORS[student.deptCode] ?? "bg-gray-100 text-gray-600"}`}>
                            {student.deptCode}
                          </span>
                        </td>

                        {/* 4. Program */}
                        <td className="px-3 py-3 text-center align-middle text-xs text-gray-600 whitespace-nowrap">
                          {student.program}
                        </td>

                        {/* 5. Year (Plain number, borderless) */}
                        <td className="px-3 py-3 text-center align-middle text-xs text-gray-600">
                          {yearDisplay}
                        </td>

                        {/* 6. Semester (Plain number, borderless) */}
                        <td className="px-3 py-3 text-center align-middle text-xs text-gray-600">
                          {semDisplay}
                        </td>

                        {/* 7. Total Points with Progress Bar */}
                        <td className="px-3 py-3 text-center align-middle min-w-[160px]">
                          <div className="space-y-1 max-w-[150px] mx-auto">
                            <div className="flex items-baseline justify-between text-xs">
                              <span className={`font-bold ${isCompleted ? "text-emerald-600" : "text-gray-800"}`}>
                                {student.totalEarned} <span className="text-[10px] text-gray-400 font-normal">/ {student.target} Pts</span>
                              </span>
                              <span className={`text-[10px] font-bold ${isCompleted ? "text-emerald-600" : "text-gray-500"}`}>
                                {pct}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  isCompleted ? "bg-[#0da651]" : "bg-emerald-500"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* 8. Action Button: View Details (Dummy) */}
                        <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                          <button
                            type="button"
                            className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <Eye size={12} />
                            <span>View Details</span>
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
