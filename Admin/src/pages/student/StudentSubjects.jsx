import { useState } from "react";
import {
  FileText,
  BookOpen,
  User,
  Clock,
  Download,
  GraduationCap,
  Award,
  Search,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function StudentSubjects({ hideHeader = false }) {
  const [selectedSemester, setSelectedSemester] = useState("5");
  const [searchQuery, setSearchQuery] = useState("");

  const subjectsData = [
    {
      code: "CS501",
      name: "Design & Analysis of Algorithms",
      credits: 4,
      instructor: "Dr. Kaushik Chatterjee",
      type: "Theory + Lab",
      schedule: "Mon, Wed, Fri (10:00 AM - 11:30 AM)",
      room: "Lab 3B",
      attendance: "94%",
      progress: 75,
      status: "In Progress",
      color: "from-blue-500 to-indigo-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      code: "CS502",
      name: "Database Management Systems",
      credits: 4,
      instructor: "Prof. Ananya Sen",
      type: "Theory + Lab",
      schedule: "Tue, Thu (02:00 PM - 03:30 PM)",
      room: "Room 402",
      attendance: "96%",
      progress: 80,
      status: "In Progress",
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      code: "CS503",
      name: "Operating Systems",
      credits: 4,
      instructor: "Dr. Sourav Mukherjee",
      type: "Theory",
      schedule: "Mon, Wed (01:00 PM - 02:30 PM)",
      room: "Room 305",
      attendance: "91%",
      progress: 70,
      status: "In Progress",
      color: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      code: "CS504",
      name: "Computer Networks",
      credits: 3,
      instructor: "Prof. Debashis Roy",
      type: "Theory + Lab",
      schedule: "Tue, Fri (11:30 AM - 01:00 PM)",
      room: "Lab 2A",
      attendance: "92%",
      progress: 65,
      status: "In Progress",
      color: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      code: "CS505",
      name: "Artificial Intelligence",
      credits: 3,
      instructor: "Dr. Rina Ghosh",
      type: "Theory",
      schedule: "Wed, Thu (03:30 PM - 05:00 PM)",
      room: "Room 208",
      attendance: "95%",
      progress: 60,
      status: "In Progress",
      color: "from-rose-500 to-pink-600",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      code: "HU501",
      name: "Principles of Management",
      credits: 2,
      instructor: "Prof. S. K. Mitra",
      type: "Theory",
      schedule: "Friday (03:30 PM - 05:00 PM)",
      room: "Hall B",
      attendance: "90%",
      progress: 85,
      status: "In Progress",
      color: "from-cyan-500 to-blue-600",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
  ];

  const filteredSubjects = subjectsData.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCredits = subjectsData.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <div className="p-4 sm:p-6 space-y-5 font-['Roboto',sans-serif]">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-['Barlow',sans-serif]">
              Enrolled Subjects
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-['Barlow',sans-serif]">
              Semester {selectedSemester} &bull; Total {subjectsData.length} Subjects &bull; {totalCredits} Total Credits
            </p>
          </div>
        </div>
      )}

      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-600">Semester:</span>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-blue-500"
          >
            <option value="5">Semester 5 (Current)</option>
            <option value="4">Semester 4</option>
            <option value="3">Semester 3</option>
            <option value="2">Semester 2</option>
            <option value="1">Semester 1</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subject, code, faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.code}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold font-mono">
                  {subject.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold">
                  {subject.credits} Credits
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                {subject.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
                <User size={13} className="text-gray-400" />
                <span>{subject.instructor}</span>
              </p>

              <div className="space-y-1.5 text-xs text-gray-600 py-2 border-t border-b border-gray-100 my-3">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-gray-400" />
                  <span className="truncate">{subject.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={13} className="text-gray-400" />
                  <span>{subject.type} &bull; {subject.room}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-500">Attendance</span>
                <span className="font-bold text-emerald-600">{subject.attendance}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#2384FD] rounded-full"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-50 hover:bg-[#E7EFFE] text-gray-700 hover:text-[#2384FD] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Download Syllabus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
