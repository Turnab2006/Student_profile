import { useState } from "react";
import {
  GraduationCap,
  Calendar,
  CalendarDays,
  Plus,
  Trash2,
  ChevronDown,
  Share2,
  BookOpen,
  Bell,
  HelpCircle,
  Search,
  Pencil,
  Mail,
  Hash,
  Lightbulb,
  Send,
  X,
  BookPlus,
  Command,
  FolderOpen,
  Menu,
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

export default function AddSubject({ onNavigate, subjectsList = [], setSubjectsList, onOpenSidebar }) {
  // Form State
  const [program, setProgram] = useState("B.Tech");
  const [courseBranch, setCourseBranch] = useState("Computer Science Engineering");
  const [year, setYear] = useState("Third Year");
  const [semester, setSemester] = useState("V - Fifth Semester");

  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [queuedSubjects, setQueuedSubjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Clean semester display (e.g. "V - Fifth Semester" -> "V Semester")
  const formatSem = (semStr) => {
    if (semStr.includes(" - ")) {
      const parts = semStr.split(" - ");
      return `${parts[0]} Semester`;
    }
    return semStr;
  };

  // Add a single subject to queue
  const handleAddSubjectToQueue = (e) => {
    e?.preventDefault();
    if (!subjectCode.trim() || !subjectName.trim()) {
      setErrorMsg("Please enter both Subject Code and Subject Name.");
      return;
    }
    setErrorMsg("");

    const newSubject = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      code: subjectCode.trim().toUpperCase(),
      name: subjectName.trim(),
      program,
      department: courseBranch,
      year,
      semester: formatSem(semester),
    };

    setQueuedSubjects((prev) => [...prev, newSubject]);
    setSubjectCode("");
    setSubjectName("");
  };

  // Remove subject from queue
  const handleRemoveQueued = (id) => {
    setQueuedSubjects((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all
  const handleClearForm = () => {
    setProgram("B.Tech");
    setCourseBranch("Computer Science Engineering");
    setYear("Third Year");
    setSemester("V - Fifth Semester");
    setSubjectCode("");
    setSubjectName("");
    setQueuedSubjects([]);
    setErrorMsg("");
  };

  // Submit and save to global list
  const handleSubmitAndSave = () => {
    let toSave = [...queuedSubjects];

    // If inputs are currently filled, automatically add them to list too
    if (subjectCode.trim() && subjectName.trim()) {
      toSave.push({
        id: Date.now().toString(),
        code: subjectCode.trim().toUpperCase(),
        name: subjectName.trim(),
        program,
        department: courseBranch,
        year,
        semester: formatSem(semester),
      });
    }

    if (toSave.length === 0) {
      setErrorMsg("Please add at least one subject before saving.");
      return;
    }

    if (setSubjectsList) {
      setSubjectsList((prev) => [...toSave, ...prev]);
    }

    onNavigate?.("subjects");
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Top Header Bar */}
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
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Add New Subject</h1>
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("subjects")}>Subjects</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Subject</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#eaf8f1] via-[#edf9f3] to-[#e4f5ec] border border-[#d2f0e1] p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0da651] text-white shadow-lg shadow-emerald-600/20">
                <BookPlus size={28} className="stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                  Add New <span className="text-[#0da651]">Subject</span>
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Select program, course, year and semester then enter subject details to add a new subject.
                </p>
              </div>
            </div>

            {/* Illustration Graphic */}
            <div className="hidden md:flex items-center shrink-0 pr-4">
              <svg width="220" height="110" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                {/* Yellow Book */}
                <rect x="25" y="82" width="115" height="18" rx="4" fill="#eab308" />
                <rect x="30" y="86" width="105" height="10" rx="2" fill="#fde047" />
                <rect x="25" y="82" width="10" height="18" rx="2" fill="#ca8a04" />

                {/* Purple Book */}
                <rect x="35" y="62" width="105" height="18" rx="4" fill="#8b5cf6" />
                <rect x="40" y="66" width="95" height="10" rx="2" fill="#a78bfa" />
                <rect x="35" y="62" width="10" height="18" rx="2" fill="#6d28d9" />

                {/* Blue Book */}
                <rect x="45" y="44" width="95" height="16" rx="3" fill="#3b82f6" />
                <rect x="50" y="48" width="85" height="8" rx="1.5" fill="#60a5fa" />
                <rect x="45" y="44" width="8" height="16" rx="1.5" fill="#1d4ed8" />

                {/* Open Diploma / Certificate Scroll */}
                <rect x="15" y="102" width="150" height="12" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Graduation Cap */}
                <path d="M145 35 L200 15 L255 35 L200 55 Z" fill="#1e293b" />
                <polygon points="200,15 250,33 200,51 150,33" fill="#334155" />
                <rect x="180" y="43" width="40" height="20" rx="4" fill="#1e293b" />
                {/* Gold tassel */}
                <path d="M240 35 L240 60 L246 66" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="246" cy="68" r="3" fill="#f59e0b" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 1: Select Program Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Mail size={15} />
            </div>
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Select Program Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Program */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Program <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <GraduationCap size={16} />
                </div>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-8 text-xs sm:text-sm font-medium text-gray-700 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option>B.Tech</option>
                  <option>M.Tech</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>B.Sc</option>
                  <option>M.Sc</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 text-gray-400" />
              </div>
            </div>

            {/* Course / Branch */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Course / Branch <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Share2 size={16} />
                </div>
                <select
                  value={courseBranch}
                  onChange={(e) => setCourseBranch(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-8 text-xs sm:text-sm font-medium text-gray-700 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option>Computer Science Engineering</option>
                  <option>Electronics & Communication Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>VLSI Design</option>
                  <option>Computer Applications</option>
                  <option>Master of Computer Applications</option>
                  <option>Civil Engineering</option>
                  <option>Mechanical Engineering</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 text-gray-400" />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Calendar size={16} />
                </div>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-8 text-xs sm:text-sm font-medium text-gray-700 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 text-gray-400" />
              </div>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Semester <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                  <CalendarDays size={16} />
                </div>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-8 text-xs sm:text-sm font-medium text-gray-700 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option>I - First Semester</option>
                  <option>II - Second Semester</option>
                  <option>III - Third Semester</option>
                  <option>IV - Fourth Semester</option>
                  <option>V - Fifth Semester</option>
                  <option>VI - Sixth Semester</option>
                  <option>VII - Seventh Semester</option>
                  <option>VIII - Eighth Semester</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Enter Subject Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Pencil size={15} />
            </div>
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Enter Subject Details</h3>
          </div>

          <form onSubmit={handleAddSubjectToQueue} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Subject Code */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Code <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100/80 text-[#0da651] font-bold text-sm">
                    #
                  </div>
                  <input
                    type="text"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    placeholder="Enter subject code (e.g. CS301)"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-4 text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Subject Name */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 z-10 pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/80 text-blue-600">
                    <BookOpen size={16} />
                  </div>
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Enter subject name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-14 pr-4 text-xs sm:text-sm font-medium text-gray-800 placeholder-gray-400 shadow-2xs focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Add Subject Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Plus size={16} className="stroke-[3]" />
                  Add Subject
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>
            )}

            {/* Tip Notice Banner */}
            <div className="bg-[#fffbeb] border border-[#fef08a] rounded-xl p-3 flex items-center gap-3 text-xs text-amber-900 shadow-2xs">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/60 text-amber-700">
                <Lightbulb size={14} />
              </div>
              <p className="font-medium text-amber-800">
                Enter subject code and name, then click on Add Subject to include it in the list.
              </p>
            </div>
          </form>

          {/* Queue Count */}
          <div className="flex items-center justify-end pt-2">
            <p className="text-xs text-gray-500 font-medium">
              Total Subjects Added:{" "}
              <span className="font-bold text-[#0da651] text-sm">{queuedSubjects.length}</span>
            </p>
          </div>

          {/* Dashed Queue Box Container */}
          <div className="border-2 border-dashed border-emerald-300/70 rounded-2xl p-6 bg-[#f7fcf9] min-h-[180px] flex flex-col items-center justify-center">
            {queuedSubjects.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                {/* Folder Graphic */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/60 text-[#0da651] shadow-inner">
                  <FolderOpen size={36} className="stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">No subjects added yet!</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the subject details above and click on Add Subject.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Pending Subjects to Save ({queuedSubjects.length})
                </h4>
                <div className="overflow-x-auto rounded-xl border border-emerald-200/80 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-emerald-50/60 text-emerald-900 font-semibold border-b border-emerald-200/60">
                      <tr>
                        <th className="py-2.5 px-4">Code</th>
                        <th className="py-2.5 px-4">Subject Name</th>
                        <th className="py-2.5 px-4">Program</th>
                        <th className="py-2.5 px-4">Year & Semester</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {queuedSubjects.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-50/30">
                          <td className="py-2.5 px-4 font-bold text-emerald-700">{item.code}</td>
                          <td className="py-2.5 px-4 font-medium text-gray-800">{item.name}</td>
                          <td className="py-2.5 px-4 text-gray-600">{item.program} ({item.department})</td>
                          <td className="py-2.5 px-4 text-gray-600">{item.year} - {item.semester}</td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              onClick={() => handleRemoveQueued(item.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50"
                              title="Remove"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Form Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleClearForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 shadow-2xs hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer"
          >
            <Trash2 size={16} />
            Clear Form
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate?.("subjects")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitAndSave}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all cursor-pointer"
            >
              <Send size={16} />
              Submit & Save Subjects
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
