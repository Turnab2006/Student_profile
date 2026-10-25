import { useState, useRef } from "react";
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
  Award,
  Clock,
  User,
  Upload,
  FileText,
  FileCheck,
  X,
  Sparkles,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const programBadges = {
  "B.Tech": "bg-[#f2faf5] text-[#0da651] border-emerald-200/90",
  "M.Tech": "bg-[#fff8f2] text-orange-600 border-orange-200/90",
  BCA: "bg-[#f7f5fd] text-violet-600 border-violet-200/90",
  MCA: "bg-[#f2f7ff] text-blue-600 border-blue-200/90",
};

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

export default function AddSubject({ onNavigate, subjectsList = [], setSubjectsList, onOpenSidebar }) {
  // Step 1: Filter states (Program, Course/Branch, Year, Semester)
  const [program, setProgram] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  // Step 2: Subject Details states (All empty by default for new subject creation)
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [creditPoints, setCreditPoints] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [facultyName, setFacultyName] = useState("");
  
  // Syllabus upload state
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [syllabusFileName, setSyllabusFileName] = useState("");
  const [syllabusFileSize, setSyllabusFileSize] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [queuedSubjects, setQueuedSubjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle Syllabus File Selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setSyllabusFile(file);
    setSyllabusFileName(file.name);
    const sizeKB = (file.size / 1024).toFixed(1);
    setSyllabusFileSize(sizeKB > 1000 ? `${(sizeKB / 1024).toFixed(2)} MB` : `${sizeKB} KB`);
    setErrorMsg("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSyllabusFile(null);
    setSyllabusFileName("");
    setSyllabusFileSize("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      setErrorMsg("Please enter the Subject Title / Name.");
      return;
    }
    if (!facultyName.trim()) {
      setErrorMsg("Please enter the Faculty / Instructor Name.");
      return;
    }
    if (!creditPoints) {
      setErrorMsg("Please select Total Credit Points from the dropdown.");
      return;
    }
    if (!totalHours.trim()) {
      setErrorMsg("Please enter Total Lecture Hours (e.g. 45 Hours).");
      return;
    }
    if (!totalClasses.toString().trim()) {
      setErrorMsg("Please enter Total Classes / Lectures (e.g. 36).");
      return;
    }
    setErrorMsg("");

    const newSubject = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      code: subjectCode.trim().toUpperCase(),
      name: subjectName.trim(),
      credits: parseInt(creditPoints, 10) || 4,
      totalHours: totalHours.trim() || "45 Hours",
      totalClasses: parseInt(totalClasses, 10) || 36,
      facultyName: facultyName.trim(),
      instructor: facultyName.trim(),
      syllabusFileName: syllabusFileName || `${subjectCode.trim().toUpperCase()}_Syllabus.pdf`,
      syllabusFileSize: syllabusFileSize || "1.2 MB",
      hasSyllabus: !!syllabusFileName,
      program,
      department: courseBranch,
      year,
      semester,
    };

    setQueuedSubjects((prev) => [...prev, newSubject]);
    
    // Reset all form inputs to empty for next entry
    setSubjectCode("");
    setSubjectName("");
    setFacultyName("");
    setCreditPoints("");
    setTotalHours("");
    setTotalClasses("");
    handleRemoveFile();
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
    setFacultyName("");
    setCreditPoints("");
    setTotalHours("");
    setTotalClasses("");
    handleRemoveFile();
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
        credits: parseInt(creditPoints, 10) || 4,
        totalHours: totalHours.trim() || "45 Hours",
        totalClasses: parseInt(totalClasses, 10) || 36,
        facultyName: facultyName.trim() || "Assigned Faculty",
        instructor: facultyName.trim() || "Assigned Faculty",
        syllabusFileName: syllabusFileName || `${subjectCode.trim().toUpperCase()}_Syllabus.pdf`,
        syllabusFileSize: syllabusFileSize || "1.2 MB",
        hasSyllabus: !!syllabusFileName,
        program,
        department: courseBranch,
        year,
        semester,
      });
    }

    if (toSave.length === 0) {
      setErrorMsg("Please select all filters, enter subject details, and click 'Add to Queue' before saving.");
      return;
    }

    if (setSubjectsList) {
      setSubjectsList((prev) => [...toSave, ...prev]);
    }

    onNavigate?.("subjects");
  };

  const selectFieldClass = (hasVal) =>
    `w-full appearance-none border ${hasVal ? "border-emerald-300 bg-[#eaf8ee]" : "border-emerald-200/80 bg-[#f4fbf7]"
    } hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-semibold text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer`;

  const inputFieldClass =
    "w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all font-medium";

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc] font-['Roboto',sans-serif]">
      {/* Top Header Bar */}
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
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Add Subject</h1>
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("subjects")}>Subjects</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Subject</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* Solid Green Gradient Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3.5 sm:px-6 sm:py-4 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25 shadow-2xs">
              <BookPlus size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
                  Curriculum Setup
                </span>
                <span className="text-emerald-100 text-xs font-medium">• Academic Syllabus &amp; Faculty Allocation</span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight mt-0.5">
                Add New Course Subject &amp; Syllabus
              </h2>
              <p className="text-xs text-emerald-50/90 font-normal">
                Define credits, lecture hours, assigned faculty, and upload syllabus documents for students &amp; mentors.
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </section>

        {/* Card 1: Step 1 - Select Program Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-3 mb-2 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100/70 flex items-center justify-center text-[#0da651] border border-emerald-200 shadow-2xs">
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

        {/* Card 2: Step 2 - Enter Subject Details (With Total Credits, Hours, Classes, Faculty & Syllabus Upload) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/70 flex items-center justify-center text-[#0da651] border border-emerald-200 shadow-2xs">
              <Pencil size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">2. Enter Subject Details &amp; Syllabus</h3>
              <p className="text-xs text-gray-400 mt-0.5">Provide academic parameters, faculty allocation, and upload syllabus file</p>
            </div>
          </div>

          <form onSubmit={handleAddSubjectToQueue} className="space-y-5">
            {/* Row 1: Subject Code, Subject Name, Faculty Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subject Code */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subjectCode}
                  onChange={(e) => {
                    setSubjectCode(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. CS501"
                  className={inputFieldClass}
                />
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject Title / Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. Design & Analysis of Algorithms"
                  className={inputFieldClass}
                />
              </div>

              {/* Faculty Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                  <span>Faculty Name / Instructor <span className="text-rose-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={facultyName}
                    onChange={(e) => {
                      setFacultyName(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="e.g. Dr. Kaushik Chatterjee"
                    className={`${inputFieldClass} pl-9`}
                  />
                  <User size={15} className="absolute left-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Total Credit Points, Total Hours, Total Classes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Credit Points */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Award size={14} className="text-amber-500" />
                  <span>Total Credit Points <span className="text-rose-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <select
                    value={creditPoints}
                    onChange={(e) => {
                      setCreditPoints(e.target.value);
                      setErrorMsg("");
                    }}
                    className={selectFieldClass(!!creditPoints)}
                  >
                    <option value="">Select Credit Points</option>
                    <option value="1">1 Credit</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                    <option value="5">5 Credits</option>
                    <option value="6">6 Credits</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 text-[#0da651]" />
                </div>
              </div>

              {/* Total Hours */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-500" />
                  <span>Total Lecture Hours <span className="text-rose-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value)}
                    placeholder="e.g. 45 Hours"
                    className={inputFieldClass}
                  />
                </div>
              </div>

              {/* Total Classes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-purple-500" />
                  <span>Total Classes / Lectures <span className="text-rose-500">*</span></span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(e.target.value)}
                    placeholder="e.g. 36"
                    className={inputFieldClass}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Upload Syllabus Section */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700">
                Upload Subject Syllabus Document (PDF / DOC)
              </label>

              {syllabusFileName ? (
                /* Uploaded File Container */
                <div className="flex items-center justify-between p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#0da651] flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 truncate max-w-[280px] sm:max-w-md">
                        {syllabusFileName}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        {syllabusFileSize} • Ready for upload
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove File"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                /* Drag & Drop Upload Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? "border-[#0da651] bg-emerald-50/80 scale-[1.01]"
                      : "border-gray-200 bg-[#f4fbf7]/40 hover:bg-[#ebf8f0]/60 hover:border-emerald-300"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#0da651] flex items-center justify-center border border-emerald-200 shadow-2xs">
                    <Upload size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Click to upload syllabus or drag and drop
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      PDF, DOC, DOCX files up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl animate-in fade-in duration-150">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Add to Queue Button & Helper */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="bg-[#fffbeb] border border-[#fef08a] rounded-xl px-3.5 py-2 flex items-center gap-2.5 text-xs text-amber-900 w-full sm:w-auto">
                <Lightbulb size={15} className="text-amber-600 shrink-0" />
                <span className="font-medium text-amber-800">
                  Click &quot;Add to Subjects Queue&quot; to stage this subject before final submission.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] hover:bg-[#0c9548] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm active:scale-[0.99] transition-all cursor-pointer shrink-0"
              >
                <Plus size={16} className="stroke-[2.5]" />
                <span>Add to Subjects Queue</span>
              </button>
            </div>
          </form>

          {/* Queue Count */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Pending Subjects Queue ({queuedSubjects.length})
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              Total Staged:{" "}
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
                  <h4 className="text-sm font-bold text-gray-800">No subjects added to queue yet!</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select Program filters above, enter course code, title, credits, hours, classes &amp; faculty, then click &quot;Add to Subjects Queue&quot;.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div className="overflow-x-auto rounded-xl border border-emerald-200/80 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] text-white text-xs font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4">Subject Name</th>
                        <th className="py-3 px-4 text-center">Credits</th>
                        <th className="py-3 px-4 text-center">Hours / Classes</th>
                        <th className="py-3 px-4">Faculty / Instructor</th>
                        <th className="py-3 px-4">Syllabus</th>
                        <th className="py-3 px-4">Program &amp; Branch</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {queuedSubjects.map((item) => {
                        const yrNum = item.year ? item.year.toString().replace(/[^0-9]/g, "") : item.year;
                        const smNum = item.semester ? item.semester.toString().replace(/[^0-9]/g, "") : item.semester;

                        return (
                          <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                            <td className="py-3 px-4 font-extrabold text-emerald-700">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0da651]">
                                {item.code}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-gray-800 text-xs sm:text-sm">
                              {item.name}
                            </td>
                            <td className="py-3 px-4 text-center font-extrabold text-amber-700">
                              <span className="inline-block px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-lg">
                                {item.credits} Credits
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center text-gray-600 font-semibold">
                              <span>{item.totalHours}</span>
                              <span className="text-gray-400 mx-1">•</span>
                              <span className="text-purple-700 font-bold">{item.totalClasses} Cls</span>
                            </td>
                            <td className="py-3 px-4 font-bold text-gray-900">
                              <div className="flex items-center gap-1.5">
                                <User size={13} className="text-gray-400" />
                                <span>{item.facultyName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-[#0da651] border border-emerald-200 rounded-lg text-[11px] font-bold">
                                <FileText size={12} />
                                <span className="truncate max-w-[90px]">{item.syllabusFileName}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-700 font-semibold">
                              <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border mr-1.5 ${programBadges[item.program] || "bg-slate-100 text-slate-700"}`}>
                                {item.program}
                              </span>
                              <span>{formatDept(item.department)} (Y{yrNum}/S{smNum})</span>
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
                        );
                      })}
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#0da651] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
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
