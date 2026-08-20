import { useState } from "react";
import {
  GraduationCap,
  Calendar,
  CalendarDays,
  Plus,
  Trash2,
  ChevronDown,
  BookOpen,
  Pencil,
  Lightbulb,
  Send,
  BookPlus,
  FolderOpen,
  Menu,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const programBadges = {
  "B.Tech": "bg-[#f2faf5] text-[#0da651] border-emerald-200/90",
  "M.Tech": "bg-[#fff8f2] text-orange-600 border-orange-200/90",
  BCA: "bg-[#f7f5fd] text-violet-600 border-violet-200/90",
  MCA: "bg-[#f2f7ff] text-blue-600 border-blue-200/90",
};

export default function AddSubject({ onNavigate, subjectsList = [], setSubjectsList, onOpenSidebar }) {
  // Form State - Filters MUST be selected first
  const [program, setProgram] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [queuedSubjects, setQueuedSubjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Add a single subject to queue
  const handleAddSubjectToQueue = (e) => {
    e?.preventDefault();
    if (!program) {
      setErrorMsg("Please select Program from the dropdown first.");
      return;
    }
    if (!courseBranch) {
      setErrorMsg("Please select Course / Branch from the dropdown first.");
      return;
    }
    if (!year) {
      setErrorMsg("Please select Academic Year from the dropdown first.");
      return;
    }
    if (!semester) {
      setErrorMsg("Please select Semester from the dropdown first.");
      return;
    }
    if (!subjectCode.trim()) {
      setErrorMsg("Please enter the Subject Code (e.g. CS501).");
      return;
    }
    if (!subjectName.trim()) {
      setErrorMsg("Please enter the Subject Name.");
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
      semester,
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
    setProgram("");
    setCourseBranch("");
    setYear("");
    setSemester("");
    setSubjectCode("");
    setSubjectName("");
    setQueuedSubjects([]);
    setErrorMsg("");
  };

  // Submit and save to global list
  const handleSubmitAndSave = () => {
    let toSave = [...queuedSubjects];

    // If inputs are currently filled and filters are selected, automatically include them
    if (program && courseBranch && year && semester && subjectCode.trim() && subjectName.trim()) {
      toSave.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
        code: subjectCode.trim().toUpperCase(),
        name: subjectName.trim(),
        program,
        department: courseBranch,
        year,
        semester,
      });
    }

    if (toSave.length === 0) {
      setErrorMsg("Please select all filters, enter subject details, and click 'Add Subject' before saving.");
      return;
    }

    if (setSubjectsList) {
      setSubjectsList((prev) => [...toSave, ...prev]);
    }

    onNavigate?.("subjects");
  };

  const selectFieldClass = (hasVal) =>
    `w-full appearance-none border ${hasVal ? "border-emerald-300 bg-[#eaf8ee]" : "border-emerald-200/80 bg-[#f4fbf7]"
    } hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg px-3 py-2 pr-8 text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer`;

  const inputFieldClass =
    "w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all";

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Top Header Bar */}
      <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
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
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Add Subject</h1>
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
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* Solid Green Gradient Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
              <BookPlus size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Add New Subject
              </h2>
              <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                First select program, course, year and semester then enter subject details to add subjects to the list
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </section>

        {/* Card 1: Step 1 - Select Program Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-800">1. Select Program &amp; Semester Filters</h3>
                <p className="text-xs text-gray-400 mt-0.5">Admin must select all 4 filters before adding subject details</p>
              </div>
            </div>
            {program && courseBranch && year && semester && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0da651] border border-emerald-200/80">
                <CheckCircle2 size={13} />
                Filters Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Program */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Program <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setErrorMsg("");
                  }}
                  className={selectFieldClass(!!program)}
                >
                  <option value="">Select Program</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
              </div>
            </div>

            {/* Course / Branch */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Course / Branch <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <select
                  value={courseBranch}
                  onChange={(e) => {
                    setCourseBranch(e.target.value);
                    setErrorMsg("");
                  }}
                  className={selectFieldClass(!!courseBranch)}
                >
                  <option value="">Select Course / Branch</option>
                  <option value="Computer Science Engineering">Computer Science Engineering</option>
                  <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="VLSI Design">VLSI Design</option>
                  <option value="Computer Applications">Computer Applications</option>
                  <option value="Master of Computer Applications">Master of Computer Applications</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setErrorMsg("");
                  }}
                  className={selectFieldClass(!!year)}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
              </div>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Semester <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    setErrorMsg("");
                  }}
                  className={selectFieldClass(!!semester)}
                >
                  <option value="">Select Semester</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Step 2 - Enter Subject Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
              <Pencil size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">2. Enter Subject Details</h3>
              <p className="text-xs text-gray-400 mt-0.5">Provide official course code and subject title for the selected stream</p>
            </div>
          </div>

          <form onSubmit={handleAddSubjectToQueue} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Subject Code */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Code <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={subjectCode}
                    onChange={(e) => {
                      setSubjectCode(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="Enter subject code (e.g. CS501)"
                    className={inputFieldClass}
                  />
                </div>
              </div>

              {/* Subject Name */}
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="Enter subject name (e.g. Algorithms)"
                    className={inputFieldClass}
                  />
                </div>
              </div>

              {/* Add Subject Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Plus size={16} className="stroke-[2.5]" />
                  Add
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Tip Notice Banner */}
            <div className="bg-[#fffbeb] border border-[#fef08a] rounded-xl p-3 flex items-center gap-3 text-xs text-amber-900">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/60 text-amber-700">
                <Lightbulb size={14} />
              </div>
              <p className="font-medium text-amber-800">
                First choose the 4 filters above, enter subject code and name, then click on &quot;Add Subject&quot; to list it below.
              </p>
            </div>
          </form>

          {/* Queue Count */}
          <div className="flex items-center justify-between pt-1">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Pending Subjects Queue ({queuedSubjects.length})
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              Total Subjects Added:{" "}
              <span className="font-extrabold text-[#0da651] text-sm">{queuedSubjects.length}</span>
            </p>
          </div>

          {/* Dashed Queue Box Container */}
          <div className="border-2 border-dashed border-emerald-300/70 rounded-2xl p-5 bg-[#f7fcf9] min-h-[160px] flex flex-col items-center justify-center">
            {queuedSubjects.length === 0 ? (
              <div className="text-center py-4 space-y-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/60 text-[#0da651]">
                  <FolderOpen size={30} className="stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">No subjects added yet!</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select Program, Course, Year &amp; Semester above, enter Subject Code &amp; Name, then click &quot;Add Subject&quot;.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div className="overflow-x-auto rounded-xl border border-emerald-200/80 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-emerald-50/70 text-emerald-900 font-bold border-b border-emerald-200/60">
                      <tr>
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4">Subject Name</th>
                        <th className="py-3 px-4">Program</th>
                        <th className="py-3 px-4">Department / Branch</th>
                        <th className="py-3 px-4">Year</th>
                        <th className="py-3 px-4">Semester</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {queuedSubjects.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3 px-4 font-extrabold text-emerald-700">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0da651]">
                              {item.code}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-gray-800 text-xs sm:text-sm">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-700">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${programBadges[item.program] || "bg-slate-100 text-slate-700"}`}>
                              {item.program}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 font-medium">
                            {item.department}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-700">
                            {item.year}
                          </td>
                          <td className="py-3 px-4 font-bold text-blue-600">
                            {item.semester}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveQueued(item.id)}
                              className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove subject"
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

        {/* Bottom Form Actions Card */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleClearForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/50 px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-100/70 hover:border-rose-300 transition-all cursor-pointer"
          >
            <Trash2 size={16} />
            Clear Form
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate?.("subjects")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50/80 px-6 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitAndSave}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Send size={16} />
              Save and Submit
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
