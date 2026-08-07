import { useState, useMemo } from "react";
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
  ChevronsLeft,
  ChevronsRight,
  Share2,
  BookOpen,
  Bell,
  HelpCircle,
  Search,
  CheckCircle2,
  X,
  Menu,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const defaultSubjects = [
  {
    id: "1",
    code: "CS501",
    name: "Database Management Systems",
    program: "B.Tech",
    department: "Computer Science Engineering",
    year: "Third Year",
    semester: "V Semester",
    badgeColor: "bg-emerald-100 text-emerald-600 border-emerald-200",
  },
  {
    id: "2",
    code: "EC302",
    name: "Analog Communication",
    program: "B.Tech",
    department: "Electronics & Communication Engineering",
    year: "Second Year",
    semester: "III Semester",
    badgeColor: "bg-purple-100 text-purple-600 border-purple-200",
  },
  {
    id: "3",
    code: "EE701",
    name: "Control Systems",
    program: "B.Tech",
    department: "Electrical Engineering",
    year: "Fourth Year",
    semester: "VII Semester",
    badgeColor: "bg-amber-100 text-amber-600 border-amber-200",
  },
  {
    id: "4",
    code: "MT101",
    name: "Advanced Algorithms",
    program: "M.Tech",
    department: "Computer Science Engineering",
    year: "First Year",
    semester: "I Semester",
    badgeColor: "bg-blue-100 text-blue-600 border-blue-200",
  },
  {
    id: "5",
    code: "VL301",
    name: "Low Power VLSI",
    program: "M.Tech",
    department: "VLSI Design",
    year: "Second Year",
    semester: "III Semester",
    badgeColor: "bg-rose-100 text-rose-600 border-rose-200",
  },
  {
    id: "6",
    code: "BCA101",
    name: "Computer Fundamentals",
    program: "BCA",
    department: "Computer Applications",
    year: "First Year",
    semester: "I Semester",
    badgeColor: "bg-purple-100 text-purple-600 border-purple-200",
  },
  {
    id: "7",
    code: "MCA301",
    name: "Cloud Computing",
    program: "MCA",
    department: "Master of Computer Applications",
    year: "Second Year",
    semester: "III Semester",
    badgeColor: "bg-teal-100 text-teal-600 border-teal-200",
  },
];

const programBadges = {
  "B.Tech": "bg-emerald-100 text-emerald-600 border-emerald-200",
  "M.Tech": "bg-blue-100 text-blue-600 border-blue-200",
  BCA: "bg-purple-100 text-purple-600 border-purple-200",
  MCA: "bg-teal-100 text-teal-600 border-teal-200",
};

export default function Subjects({ onNavigate, subjectsList = [], setSubjectsList, onOpenSidebar }) {
  const list = subjectsList && subjectsList.length > 0 ? subjectsList : defaultSubjects;

  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedSem, setSelectedSem] = useState("All Semesters");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const itemsPerPage = 7;

  // Filters
  const filteredSubjects = useMemo(() => {
    return list.filter((item) => {
      if (selectedProgram !== "All Programs" && item.program !== selectedProgram) return false;
      if (selectedDept !== "All Departments" && item.department !== selectedDept) return false;
      if (selectedYear !== "All Years" && item.year !== selectedYear) return false;
      if (selectedSem !== "All Semesters" && item.semester !== selectedSem) return false;
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
  }, [filteredSubjects, currentPage]);

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

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
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
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Subjects</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Manage subject details, course codes, and academic curriculums</p>
          </div>
        </div>

        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#eaf8f1] via-[#edf9f3] to-[#e4f5ec] border border-[#d2f0e1] p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0da651] text-white shadow-lg shadow-emerald-600/20">
                <BookOpen size={28} className="stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                  Subjects <span className="text-[#0da651]">Management</span>
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Manage and organize subjects across programs, years, departments and semesters.
                </p>
              </div>
            </div>

            {/* Illustration Graphic */}
            <div className="hidden md:flex items-center shrink-0 pr-4">
              <svg width="220" height="110" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                {/* Book 1 (Blue bottom) */}
                <rect x="20" y="80" width="120" height="20" rx="4" fill="#3b82f6" />
                <rect x="25" y="84" width="110" height="12" rx="2" fill="#60a5fa" />
                <rect x="20" y="80" width="12" height="20" rx="2" fill="#1d4ed8" />

                {/* Book 2 (Orange middle) */}
                <rect x="35" y="58" width="110" height="18" rx="4" fill="#f97316" />
                <rect x="40" y="62" width="100" height="10" rx="2" fill="#fb923c" />
                <rect x="35" y="58" width="10" height="18" rx="2" fill="#c2410c" />

                {/* Book 3 (Green top) */}
                <rect x="45" y="38" width="100" height="16" rx="3" fill="#10b981" />
                <rect x="50" y="42" width="90" height="8" rx="1.5" fill="#34d399" />
                <rect x="45" y="38" width="8" height="16" rx="1.5" fill="#047857" />

                {/* Graduation Cap */}
                <path d="M140 30 L195 10 L250 30 L195 50 Z" fill="#1e293b" />
                <polygon points="195,10 245,28 195,46 145,28" fill="#334155" />
                <rect x="175" y="38" width="40" height="22" rx="4" fill="#1e293b" />
                {/* Tassel */}
                <path d="M235 30 L235 55 L242 62" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="242" cy="64" r="3" fill="#eab308" />

                {/* Plant Pot */}
                <path d="M195 85 L203 105 L225 105 L233 85 Z" fill="#065f46" />
                <ellipse cx="214" cy="85" rx="19" ry="4" fill="#047857" />
                {/* Leaves */}
                <path d="M214 85 Q200 65 190 70 Q205 80 214 85 Z" fill="#10b981" />
                <path d="M214 85 Q228 60 238 68 Q223 78 214 85 Z" fill="#34d399" />
                <path d="M214 85 Q214 55 218 58 Q216 75 214 85 Z" fill="#059669" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
            {/* Program Filter */}
            <div className="relative flex items-center">
              <div className="absolute left-2.5 z-10 pointer-events-none flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-600">
                <GraduationCap size={15} />
              </div>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-12 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                <option>All Programs</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
                <option>BCA</option>
                <option>MCA</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>

            {/* Department Filter */}
            <div className="relative flex items-center">
              <div className="absolute left-2.5 z-10 pointer-events-none flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100/70 text-purple-600">
                <Share2 size={15} />
              </div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-12 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                <option>All Departments</option>
                <option>Computer Science Engineering</option>
                <option>Electronics & Communication Engineering</option>
                <option>Electrical Engineering</option>
                <option>VLSI Design</option>
                <option>Computer Applications</option>
                <option>Master of Computer Applications</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>

            {/* Year Filter */}
            <div className="relative flex items-center">
              <div className="absolute left-2.5 z-10 pointer-events-none flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100/70 text-amber-600">
                <Calendar size={15} />
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-12 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                <option>All Years</option>
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Fourth Year</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 text-gray-400" />
            </div>

            {/* Semester Filter */}
            <div className="relative flex items-center">
              <div className="absolute left-2.5 z-10 pointer-events-none flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100/70 text-blue-600">
                <CalendarDays size={15} />
              </div>
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-12 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
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

          {/* Add New Subject Button */}
          <button
            onClick={() => onNavigate?.("add-subject")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer shrink-0"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <Plus size={14} className="stroke-[3]" />
            </div>
            Add New Subject
          </button>
        </div>

        {/* Subjects Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/40 text-xs font-semibold text-gray-600">
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-emerald-600" />
                      <span>Program</span>
                    </div>
                  </th>
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Share2 size={16} className="text-emerald-600" />
                      <span>Department</span>
                    </div>
                  </th>
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-emerald-600" />
                      <span>Year</span>
                    </div>
                  </th>
                  <th className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-emerald-600" />
                      <span>Semester</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-right font-bold text-gray-700">
                    Actions
                  </th>
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
                    const badgeStyle = programBadges[item.program] || "bg-emerald-100 text-emerald-600 border-emerald-200";
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
                        <td className="py-4 px-6 font-medium text-gray-600">
                          {item.department}
                        </td>

                        {/* Year */}
                        <td className="py-4 px-6 font-medium text-gray-600">
                          {item.year}
                        </td>

                        {/* Semester */}
                        <td className="py-4 px-6 font-medium text-gray-600">
                          {item.semester}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingSubject(item)}
                              title="Edit Subject"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => setDeletingId(item.id)}
                              title="Delete Subject"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50/50 text-rose-500 hover:bg-rose-100 hover:border-rose-300 transition-all cursor-pointer shadow-sm"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="border-t border-gray-100 bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
            <div>
              Showing {currentData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredSubjects.length)} of {filteredSubjects.length} entries
            </div>

            <div className="flex items-center gap-1.5">
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
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-semibold transition-all ${currentPage === pageNum
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
      </main>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
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
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 shadow-sm"
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
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Edit Subject</h3>
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="text-gray-400 hover:text-gray-600"
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
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50"
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
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={editingSubject.department}
                onChange={(e) => setEditingSubject({ ...editingSubject, department: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Semester</label>
                <input
                  type="text"
                  value={editingSubject.semester}
                  onChange={(e) => setEditingSubject({ ...editingSubject, semester: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject Code</label>
                <input
                  type="text"
                  value={editingSubject.code || ""}
                  onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-gray-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditingSubject(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0da651] rounded-xl hover:bg-emerald-700 shadow-sm"
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
