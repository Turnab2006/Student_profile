import { useState, useMemo } from "react";
import {
  X,
  Search,
  BookOpen,
  GraduationCap,
  Calendar,
  Layers,
  Clock,
  Award,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react";
import SubjectCard from "./SubjectCard";
import { semesterSubjectsData, semesterOptions } from "../../pages/student/StudentSubjects";

export default function SemesterSubjectsModal({
  isOpen,
  onClose,
  program = "B.Tech",
  department = "Computer Science Engineering",
  initialSemester = "5",
}) {
  const [selectedSemester, setSelectedSemester] = useState(initialSemester || "5");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  if (!isOpen) return null;

  // Resolve numeric sem value (e.g. "Semester 5" -> "5", "V Semester" -> "5")
  const semKey = selectedSemester.toString().replace(/[^0-9]/g, "") || "5";
  const subjects = semesterSubjectsData[semKey] || semesterSubjectsData["5"] || [];

  const filtered = subjects.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      (s.instructor && s.instructor.toLowerCase().includes(q))
    );
  });

  const totalCredits = subjects.reduce((sum, s) => sum + (s.credits || 0), 0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-2.5 rounded-xl border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-200 text-xs font-medium">
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        {/* Header with Green Gradient */}
        <div className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] px-6 py-5 text-white flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white border border-white/30 shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/30 uppercase tracking-wider">
                  {program}
                </span>
                <span className="text-white/80 text-xs font-medium">| {department}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">Curriculum &amp; Semester Subjects</h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Browse semester-wise subject listings, course codes, credit allocations, and faculty details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter and Stats Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
          {/* Semester Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {semesterOptions.map((opt) => {
              const val = opt.value;
              const isActive = semKey === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSelectedSemester(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-[#0da651] text-white border-[#0da651]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-emerald-50/50 hover:text-emerald-700 hover:border-emerald-200"
                  }`}
                >
                  Sem {val}
                </button>
              );
            })}
          </div>

          {/* Search + Stats */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subject or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 shrink-0 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
              <span>{subjects.length} Subjects</span>
              <span className="text-gray-300">|</span>
              <span className="text-emerald-700">{totalCredits} Credits</span>
            </div>
          </div>
        </div>

        {/* Modal Body: Subject Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <BookOpen size={36} className="mx-auto mb-2 opacity-40 text-gray-400" />
              <p className="text-sm font-semibold text-gray-600">No subjects found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria or switch semester tabs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((subject, idx) => (
                <SubjectCard
                  key={subject.code || idx}
                  subject={subject}
                  index={idx}
                  onDownload={() => showToast(`Downloaded syllabus for ${subject.code}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200/80 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <GraduationCap size={15} className="text-[#0da651]" />
            <span>Curriculum for <strong>{program}</strong> - <strong>Semester {semKey}</strong></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
