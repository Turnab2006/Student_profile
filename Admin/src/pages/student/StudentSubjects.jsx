import { useState } from "react";
import {
  BookOpen,
  Search,
  CheckCircle,
  X,
  ChevronDown,
  Check,
  LayoutGrid,
  List,
  Clock,
  Download,
  User,
  Hash,
  Award,
  Calendar,
  UserCheck
} from "lucide-react";
import SubjectCard, { SUBJECT_THEMES } from "../../components/student/SubjectCard";

export const semesterSubjectsData = {
  "1": [
    { code: "BS101", name: "Engineering Mathematics - I", credits: 4, instructor: "Dr. A. K. Sharma", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 38, attendance: 95, colorTheme: "blue" },
    { code: "BS102", name: "Engineering Physics", credits: 4, instructor: "Prof. S. Banerjee", lectureHours: "42 Hours", totalClasses: 38, attendedClasses: 35, attendance: 92, colorTheme: "green" },
    { code: "ES101", name: "Basic Electrical Engineering", credits: 4, instructor: "Dr. R. N. Dutta", lectureHours: "40 Hours", totalClasses: 40, attendedClasses: 36, attendance: 90, colorTheme: "purple" },
    { code: "ES102", name: "Programming for Problem Solving", credits: 4, instructor: "Prof. P. K. Das", lectureHours: "48 Hours", totalClasses: 40, attendedClasses: 39, attendance: 97, colorTheme: "orange" },
    { code: "BS191", name: "Physics Laboratory", credits: 1.5, instructor: "Dr. S. Roy", lectureHours: "30 Hours", totalClasses: 15, attendedClasses: 15, attendance: 100, colorTheme: "pink" },
    { code: "ES192", name: "Programming Laboratory", credits: 1.5, instructor: "Prof. M. Bose", lectureHours: "30 Hours", totalClasses: 15, attendedClasses: 14, attendance: 94, colorTheme: "teal" }
  ],
  "2": [
    { code: "BS201", name: "Engineering Mathematics - II", credits: 4, instructor: "Dr. A. K. Sharma", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 37, attendance: 93, colorTheme: "blue" },
    { code: "BS202", name: "Engineering Chemistry", credits: 4, instructor: "Prof. M. K. Pal", lectureHours: "42 Hours", totalClasses: 37, attendedClasses: 34, attendance: 91, colorTheme: "green" },
    { code: "ES201", name: "Basic Electronics Engineering", credits: 4, instructor: "Dr. S. K. Roy", lectureHours: "44 Hours", totalClasses: 40, attendedClasses: 38, attendance: 95, colorTheme: "purple" },
    { code: "ES202", name: "Engineering Graphics & Design", credits: 3, instructor: "Prof. T. K. Seal", lectureHours: "36 Hours", totalClasses: 36, attendedClasses: 32, attendance: 89, colorTheme: "orange" },
    { code: "HM201", name: "English Communication Skills", credits: 2, instructor: "Dr. N. Sengupta", lectureHours: "28 Hours", totalClasses: 28, attendedClasses: 27, attendance: 96, colorTheme: "pink" }
  ],
  "3": [
    { code: "CS301", name: "Digital Logic & Circuits", credits: 4, instructor: "Dr. P. Chakraborty", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 38, attendance: 94, colorTheme: "blue" },
    { code: "CS302", name: "Data Structures & Algorithms", credits: 4, instructor: "Dr. Sourav Mukherjee", lectureHours: "48 Hours", totalClasses: 40, attendedClasses: 39, attendance: 98, colorTheme: "green" },
    { code: "CS303", name: "Computer Organization & Arch", credits: 4, instructor: "Prof. D. K. Ghosh", lectureHours: "42 Hours", totalClasses: 40, attendedClasses: 36, attendance: 90, colorTheme: "purple" },
    { code: "BS301", name: "Discrete Mathematics", credits: 4, instructor: "Dr. R. C. Maiti", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 37, attendance: 92, colorTheme: "orange" },
    { code: "CS391", name: "Data Structures Lab", credits: 2, instructor: "Prof. A. Nandi", lectureHours: "30 Hours", totalClasses: 15, attendedClasses: 15, attendance: 100, colorTheme: "teal" }
  ],
  "4": [
    { code: "CS401", name: "Formal Language & Automata", credits: 4, instructor: "Dr. S. Samanta", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 36, attendance: 91, colorTheme: "blue" },
    { code: "CS402", name: "Software Engineering & Agile", credits: 4, instructor: "Prof. Ananya Sen", lectureHours: "44 Hours", totalClasses: 40, attendedClasses: 38, attendance: 95, colorTheme: "green" },
    { code: "CS403", name: "Object Oriented Java Programming", credits: 4, instructor: "Dr. Kaushik Chatterjee", lectureHours: "46 Hours", totalClasses: 40, attendedClasses: 37, attendance: 93, colorTheme: "purple" },
    { code: "BS401", name: "Probability & Applied Statistics", credits: 3, instructor: "Dr. B. K. Mallik", lectureHours: "36 Hours", totalClasses: 36, attendedClasses: 32, attendance: 88, colorTheme: "orange" },
    { code: "CS491", name: "Java Programming Lab", credits: 2, instructor: "Prof. S. Kar", lectureHours: "30 Hours", totalClasses: 20, attendedClasses: 19, attendance: 95, colorTheme: "pink" }
  ],
  "5": [
    {
      code: "CS501",
      name: "Design & Analysis of Algorithms",
      credits: 4,
      instructor: "Dr. Kaushik Chatterjee",
      lectureHours: "45 Hours",
      totalClasses: 36,
      attendedClasses: 34,
      attendance: 94,
      colorTheme: "blue"
    },
    {
      code: "CS502",
      name: "Database Management Systems",
      credits: 4,
      instructor: "Prof. Ananya Sen",
      lectureHours: "48 Hours",
      totalClasses: 37,
      attendedClasses: 35,
      attendance: 96,
      colorTheme: "green"
    },
    {
      code: "CS503",
      name: "Operating Systems",
      credits: 4,
      instructor: "Dr. Sourav Mukherjee",
      lectureHours: "42 Hours",
      totalClasses: 33,
      attendedClasses: 30,
      attendance: 91,
      colorTheme: "purple"
    },
    {
      code: "CS504",
      name: "Computer Networks",
      credits: 3,
      instructor: "Prof. Debashis Roy",
      lectureHours: "40 Hours",
      totalClasses: 25,
      attendedClasses: 23,
      attendance: 92,
      colorTheme: "orange"
    },
    {
      code: "CS505",
      name: "Artificial Intelligence",
      credits: 3,
      instructor: "Dr. Rina Ghosh",
      lectureHours: "45 Hours",
      totalClasses: 38,
      attendedClasses: 36,
      attendance: 95,
      colorTheme: "pink"
    },
    {
      code: "HU501",
      name: "Principles of Management",
      credits: 2,
      instructor: "Prof. S. K. Mitra",
      lectureHours: "30 Hours",
      totalClasses: 27,
      attendedClasses: 24,
      attendance: 90,
      colorTheme: "teal"
    }
  ],
  "6": [
    { code: "CS601", name: "Compiler Design", credits: 4, instructor: "Dr. P. Roy", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 37, attendance: 92, colorTheme: "blue" },
    { code: "CS602", name: "Computer Graphics & Multimedia", credits: 4, instructor: "Prof. A. Ray", lectureHours: "44 Hours", totalClasses: 40, attendedClasses: 38, attendance: 94, colorTheme: "green" },
    { code: "CS603", name: "Cloud Computing & DevOps", credits: 3, instructor: "Dr. S. K. Basu", lectureHours: "38 Hours", totalClasses: 38, attendedClasses: 36, attendance: 96, colorTheme: "purple" },
    { code: "CS691", name: "Cloud & Networking Lab", credits: 2, instructor: "Prof. R. Paul", lectureHours: "30 Hours", totalClasses: 15, attendedClasses: 15, attendance: 100, colorTheme: "teal" }
  ],
  "7": [
    { code: "CS701", name: "Cryptography & Cyber Security", credits: 4, instructor: "Dr. A. Pramanik", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 38, attendance: 95, colorTheme: "blue" },
    { code: "CS702", name: "Deep Learning & Neural Networks", credits: 4, instructor: "Prof. B. N. Das", lectureHours: "48 Hours", totalClasses: 40, attendedClasses: 39, attendance: 97, colorTheme: "green" },
    { code: "CS703", name: "Internet of Things (IoT)", credits: 3, instructor: "Dr. S. C. Roy", lectureHours: "36 Hours", totalClasses: 36, attendedClasses: 33, attendance: 91, colorTheme: "orange" },
    { code: "CS791", name: "Major Project - Phase I", credits: 4, instructor: "Dept Project Committee", lectureHours: "60 Hours", totalClasses: 30, attendedClasses: 29, attendance: 98, colorTheme: "pink" }
  ],
  "8": [
    { code: "CS801", name: "Blockchain Architecture", credits: 4, instructor: "Dr. S. De", lectureHours: "45 Hours", totalClasses: 40, attendedClasses: 38, attendance: 96, colorTheme: "blue" },
    { code: "CS802", name: "Quantum Computing Foundations", credits: 3, instructor: "Prof. R. N. Sen", lectureHours: "36 Hours", totalClasses: 36, attendedClasses: 33, attendance: 92, colorTheme: "purple" },
    { code: "CS891", name: "Major Project - Final Phase", credits: 6, instructor: "Dept Project Committee", lectureHours: "90 Hours", totalClasses: 45, attendedClasses: 44, attendance: 99, colorTheme: "green" },
    { code: "CS892", name: "Grand Viva Voce", credits: 2, instructor: "External Board", lectureHours: "20 Hours", totalClasses: 10, attendedClasses: 10, attendance: 100, colorTheme: "teal" }
  ]
};

// Strict Semester Options ordered from 1 to 8
export const semesterOptions = [
  { value: "1", label: "Semester 1" },
  { value: "2", label: "Semester 2" },
  { value: "3", label: "Semester 3" },
  { value: "4", label: "Semester 4" },
  { value: "5", label: "Semester 5 (Current)" },
  { value: "6", label: "Semester 6" },
  { value: "7", label: "Semester 7" },
  { value: "8", label: "Semester 8" },
];

const THEME_KEYS = ["blue", "green", "purple", "orange", "pink", "teal"];

export default function StudentSubjects({ hideHeader = false }) {
  const [selectedSemester, setSelectedSemester] = useState("5");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function handleDownloadSyllabus(subject) {
    showToast(`Downloading official syllabus for ${subject.code} - ${subject.name} (PDF)...`);
  }

  const currentSubjects = semesterSubjectsData[selectedSemester] || semesterSubjectsData["5"];

  const filteredSubjects = currentSubjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.instructor && sub.instructor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedOpt = semesterOptions.find((s) => s.value === selectedSemester) || semesterOptions[4];

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-4 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto animate-in fade-in duration-200">
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

      {/* Header Card: Row 1 Search Bar | Row 2 (Mobile) / Right Column (Desktop) Grid/List Toggle + Semester Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-[20px] border border-slate-200/90 shadow-md shadow-slate-200/50">
        
        {/* Row 1 (Mobile) / Left Column (Desktop): Search Bar */}
        <div className="relative w-full sm:w-[340px] md:w-[400px] lg:w-[460px] shrink-0">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search subject, code, or faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
          />
        </div>

        {/* Row 2 (Mobile) / Right Column (Desktop): Grid/List Buttons & Semester Filter side-by-side */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          {/* View Mode Toggle Buttons ("Grid View" & "List View") */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Grid View"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#2563eb] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <LayoutGrid size={15} className="stroke-[2.2]" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              title="List View"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#2563eb] text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <List size={15} className="stroke-[2.2]" />
              <span>List View</span>
            </button>
          </div>

          {/* Custom Semester Dropdown Filter */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-50 hover:bg-slate-100/90 active:bg-slate-100 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer shadow-2xs hover:shadow-xs min-w-[140px] sm:min-w-[170px]"
            >
              <span>{selectedOpt.label}</span>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

          {/* Custom Floating Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Click-away Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Menu Container */}
              <div className="absolute right-0 top-full mt-2 w-52 sm:w-56 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-300/40 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                {semesterOptions.map((opt) => {
                  const isSelected = opt.value === selectedSemester;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSelectedSemester(opt.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 text-[#2563eb]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check size={16} className="text-[#2563eb] stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          </div>
        </div>

      </div>

      {/* Mode 1: CARD VIEW GRID */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredSubjects.map((subject, index) => (
            <SubjectCard
              key={subject.code}
              subject={subject}
              index={index}
              onDownload={handleDownloadSyllabus}
            />
          ))}
        </div>
      )}

      {/* Mode 2: LIST VIEW TABLE */}
      {viewMode === "list" && filteredSubjects.length > 0 && (
        <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5 lg:p-6 overflow-hidden animate-in fade-in duration-150">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[960px]">
              <thead>
                <tr className="bg-[#f0f6ff]/90 text-xs font-bold text-[#1d61e7] rounded-2xl overflow-hidden">
                  <th className="py-4 px-5 rounded-l-2xl whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Hash size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">CODE</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">SUBJECT & FACULTY</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <Award size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">CREDITS</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <Clock size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">LECTURE HOURS</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">ATTENDANCE %</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <UserCheck size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      <span className="whitespace-nowrap">ATTENDED / TOTAL</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 rounded-r-2xl text-center whitespace-nowrap">
                    <span className="whitespace-nowrap">ACTION</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubjects.map((subject, idx) => {
                  const theme = SUBJECT_THEMES[subject.colorTheme || THEME_KEYS[idx % THEME_KEYS.length]] || SUBJECT_THEMES.blue;
                  const pct = typeof subject.attendance === "string" 
                    ? parseInt(subject.attendance.replace("%", ""), 10) 
                    : (subject.attendance || 94);

                  let barColor = "bg-[#10b981]";
                  if (pct < 75) barColor = "bg-[#ef4444]";
                  else if (pct <= 80) barColor = "bg-[#f97316]";

                  return (
                    <tr key={subject.code} className="hover:bg-slate-50/70 transition-colors">
                      {/* Code Badge */}
                      <td className="py-4 px-5 font-extrabold text-[#2563eb] text-sm tracking-tight whitespace-nowrap">
                        <span className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg}`}>
                          {subject.code}
                        </span>
                      </td>

                      {/* Subject & Faculty */}
                      <td className="py-4 px-5 min-w-[220px]">
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-snug">{subject.name}</p>
                          <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5 whitespace-nowrap">
                            <User size={12} className="text-slate-400 shrink-0" />
                            <span>{subject.instructor || "Faculty"}</span>
                          </p>
                        </div>
                      </td>

                      {/* Credits */}
                      <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm whitespace-nowrap">
                        <span className={`inline-block whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-semibold ${theme.badgeBg}`}>
                          {subject.credits} Credits
                        </span>
                      </td>

                      {/* Lecture Hours */}
                      <td className="py-4 px-5 text-center font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
                        {subject.lectureHours}
                      </td>

                      {/* Attendance % Progress Bar */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-24 sm:w-28 bg-slate-100 rounded-full h-2 overflow-hidden shrink-0">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-800 shrink-0">
                            {pct}%
                          </span>
                        </div>
                      </td>

                      {/* Attended / Total */}
                      <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm whitespace-nowrap">
                        {subject.attendedClasses} / {subject.totalClasses} Classes
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDownloadSyllabus(subject)}
                          className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98] whitespace-nowrap ${theme.btnBg}`}
                        >
                          <Download size={13} className="stroke-[2.4]" />
                          <span>Download Syllabus</span>
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

      {/* Empty State if search finds no matches */}
      {filteredSubjects.length === 0 && (
        <div className="bg-white rounded-[20px] border border-slate-200/90 p-10 text-center shadow-sm space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mx-auto">
            <Search size={22} />
          </div>
          <h3 className="text-base font-bold text-slate-800">No subjects found</h3>
          <p className="text-xs text-slate-500">
            No subjects matched your search query &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
