import { useState, useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Download,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  CheckCircle2,
  FileText,
  PieChart as PieIcon,
  BarChart3,
  Award,
  DollarSign,
  Tag,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Building2,
  Phone,
  Mail,
  Code,
  Briefcase,
  Trophy,
  BookOpen,
  HeartHandshake,
  Compass,
  Calendar,
  Layers,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// Category Badges & Colors
const categoryBadgeStyles = {
  Technical: "bg-indigo-600/90 text-white border border-indigo-400/40",
  Career: "bg-blue-600/90 text-white border border-blue-400/40",
  Sports: "bg-amber-600/90 text-white border border-amber-400/40",
  Cultural: "bg-fuchsia-600/90 text-white border border-fuchsia-400/40",
  Academics: "bg-emerald-600/90 text-white border border-emerald-400/40",
  Campaign: "bg-rose-600/90 text-white border border-rose-400/40",
  Trip: "bg-cyan-600/90 text-white border border-cyan-400/40",
};

const categoryIcons = {
  Technical: Code,
  Career: Briefcase,
  Sports: Trophy,
  Cultural: Sparkles,
  Academics: BookOpen,
  Campaign: HeartHandshake,
  Trip: Compass,
};

function getActivityIcon(type, size = 14, className = "") {
  const IconComp = categoryIcons[type] || Calendar;
  return <IconComp size={size} className={className} />;
}

const statusStyles = {
  Upcoming: "bg-emerald-50 text-[#0da651] border border-emerald-200/80",
  Ongoing: "bg-amber-50 text-amber-700 border border-amber-200/80",
  Completed: "bg-purple-50 text-purple-700 border border-purple-200/80",
  Cancelled: "bg-rose-50 text-rose-700 border border-rose-200/80",
};

// Seed student pool for generating realistic registered student rosters
const studentBasePool = [
  { name: "Alice Johnson", email: "alice.j@edusmart.edu", phone: "+91 98301 23456", roll: "CS2021001", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "3", semester: "5", avatarBg: "bg-emerald-500" },
  { name: "Bob Smith", email: "bob.s@edusmart.edu", phone: "+91 98302 34567", roll: "CS2021002", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "2", semester: "3", avatarBg: "bg-blue-500" },
  { name: "Carol Williams", email: "carol.w@edusmart.edu", phone: "+91 98303 45678", roll: "CS2021003", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "3", semester: "5", avatarBg: "bg-purple-500" },
  { name: "David Brown", email: "david.b@edusmart.edu", phone: "+91 98304 56789", roll: "CS2021004", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "1", semester: "1", avatarBg: "bg-rose-500" },
  { name: "Eva Martinez", email: "eva.m@edusmart.edu", phone: "+91 98305 67890", roll: "CS2021005", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "4", semester: "7", avatarBg: "bg-teal-500" },
  { name: "Frank Lee", email: "frank.l@edusmart.edu", phone: "+91 98306 78901", roll: "CS2021006", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "2", semester: "3", avatarBg: "bg-pink-500" },
  { name: "Grace Taylor", email: "grace.t@edusmart.edu", phone: "+91 98307 89012", roll: "EC2022007", dept: "ECE", program: "B.Tech", course: "Electronics & Comm Engg", year: "3", semester: "5", avatarBg: "bg-indigo-500" },
  { name: "Henry Wilson", email: "henry.w@edusmart.edu", phone: "+91 98308 90123", roll: "EE2023008", dept: "EE", program: "B.Tech", course: "Electrical Engineering", year: "4", semester: "7", avatarBg: "bg-orange-500" },
  { name: "Isabella Clark", email: "isabella.c@edusmart.edu", phone: "+91 98309 01234", roll: "BCA2024009", dept: "BCA", program: "BCA", course: "Computer Applications", year: "2", semester: "3", avatarBg: "bg-violet-500" },
  { name: "Jack Davis", email: "jack.d@edusmart.edu", phone: "+91 98310 12345", roll: "MC2023010", dept: "MCA", program: "MCA", course: "Master of Comp Apps", year: "1", semester: "1", avatarBg: "bg-cyan-500" },
  { name: "Tamsha Sengupta", email: "tamsha.s@edusmart.edu", phone: "+91 98311 23456", roll: "EE2024011", dept: "EE", program: "B.Tech", course: "Electrical Engineering", year: "3", semester: "6", avatarBg: "bg-teal-600" },
  { name: "Turnab Roy", email: "turnab.r@edusmart.edu", phone: "+91 98312 34567", roll: "CS2024012", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "3", semester: "6", avatarBg: "bg-blue-600" },
  { name: "Madhurima Chatterjee", email: "madhurima.c@edusmart.edu", phone: "+91 98313 45678", roll: "EE2024013", dept: "EE", program: "B.Tech", course: "Electrical Engineering", year: "3", semester: "6", avatarBg: "bg-pink-600" },
  { name: "Nilankur Das", email: "nilankur.d@edusmart.edu", phone: "+91 98314 56789", roll: "EE2024014", dept: "EE", program: "B.Tech", course: "Electrical Engineering", year: "3", semester: "6", avatarBg: "bg-amber-600" },
  { name: "Abhinandan Roy", email: "abhinandan.r@edusmart.edu", phone: "+91 98315 67890", roll: "EE2024015", dept: "EE", program: "B.Tech", course: "Electrical Engineering", year: "3", semester: "6", avatarBg: "bg-purple-600" },
  { name: "Subhamita Ganguly", email: "subhamita.g@edusmart.edu", phone: "+91 98316 78901", roll: "EC2024016", dept: "ECE", program: "B.Tech", course: "Electronics & Comm Engg", year: "3", semester: "6", avatarBg: "bg-emerald-600" },
  { name: "Alok Bhattacharya", email: "alok.b@edusmart.edu", phone: "+91 98317 89012", roll: "EC2024017", dept: "ECE", program: "B.Tech", course: "Electronics & Comm Engg", year: "3", semester: "6", avatarBg: "bg-yellow-600" },
  { name: "Subhankar Mazumdar", email: "subhankar.m@edusmart.edu", phone: "+91 98318 90123", roll: "EC2024018", dept: "ECE", program: "B.Tech", course: "Electronics & Comm Engg", year: "3", semester: "6", avatarBg: "bg-sky-600" },
  { name: "Priya Sharma", email: "priya.s@edusmart.edu", phone: "+91 98319 01234", roll: "CS2022019", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "2", semester: "4", avatarBg: "bg-fuchsia-500" },
  { name: "Sourav Ghosh", email: "sourav.g@edusmart.edu", phone: "+91 98320 12345", roll: "CS2021020", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "4", semester: "8", avatarBg: "bg-blue-700" },
  { name: "Ananya Mukherjee", email: "ananya.m@edusmart.edu", phone: "+91 98321 23456", roll: "IT2022021", dept: "IT", program: "B.Tech", course: "Information Technology", year: "3", semester: "5", avatarBg: "bg-rose-600" },
  { name: "Debjit Paul", email: "debjit.p@edusmart.edu", phone: "+91 98322 34567", roll: "MC2023022", dept: "MCA", program: "MCA", course: "Master of Comp Apps", year: "2", semester: "3", avatarBg: "bg-cyan-600" },
  { name: "Sneha Roy", email: "sneha.r@edusmart.edu", phone: "+91 98323 45678", roll: "BCA2023023", dept: "BCA", program: "BCA", course: "Computer Applications", year: "3", semester: "5", avatarBg: "bg-teal-700" },
  { name: "Ritwik Chakraborty", email: "ritwik.c@edusmart.edu", phone: "+91 98324 56789", roll: "CS2023024", dept: "CSE", program: "B.Tech", course: "Computer Science & Engg", year: "1", semester: "2", avatarBg: "bg-emerald-700" },
];

function generateStudentsForActivity(activity) {
  const count = Math.max(12, Math.min(activity.registered || 24, studentBasePool.length));
  return studentBasePool.slice(0, count).map((s, idx) => ({
    ...s,
    id: `REG-${activity.id}-${idx + 1}`,
    initials: s.name.split(" ").map(n => n[0]).join(""),
    registeredAt: "2026-05-" + String(10 + (idx % 12)).padStart(2, "0") + " 10:30 AM",
    status: idx % 7 === 0 ? "Waitlisted" : idx % 5 === 0 ? "Attended" : "Confirmed",
  }));
}

// Chart Colors
const DEPT_COLORS = {
  CSE: "#0da651",
  ECE: "#3b82f6",
  EE: "#f59e0b",
  BCA: "#8b5cf6",
  MCA: "#06b6d4",
  IT: "#ec4899",
};

const YEAR_COLORS = {
  "1st Year": "#10b981",
  "2nd Year": "#3b82f6",
  "3rd Year": "#f59e0b",
  "4th Year": "#8b5cf6",
};

export default function ActivityDetailView({
  activity,
  onBack,
  onEdit,
  onDelete,
}) {
  const [activeTab, setActiveTab] = useState("details"); // 'details' or 'students'
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [semFilter, setSemFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Generate participant dataset for this activity
  const registeredStudents = useMemo(() => {
    return generateStudentsForActivity(activity);
  }, [activity]);

  // Filtered student records
  const filteredStudents = useMemo(() => {
    return registeredStudents.filter((st) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        st.name.toLowerCase().includes(q) ||
        st.roll.toLowerCase().includes(q) ||
        st.email.toLowerCase().includes(q) ||
        st.phone.toLowerCase().includes(q) ||
        st.dept.toLowerCase().includes(q);

      const matchesDept = deptFilter === "all" || st.dept === deptFilter;
      const matchesYear = yearFilter === "all" || st.year === yearFilter || `${st.year}st` === yearFilter || `${st.year}nd` === yearFilter || `${st.year}rd` === yearFilter || `${st.year}th` === yearFilter;
      const matchesSem = semFilter === "all" || st.semester === semFilter || `Semester ${st.semester}` === semFilter;

      return matchesSearch && matchesDept && matchesYear && matchesSem;
    });
  }, [registeredStudents, searchQuery, deptFilter, yearFilter, semFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Analytics Computations for Charts
  const deptChartData = useMemo(() => {
    const counts = {};
    registeredStudents.forEach((st) => {
      counts[st.dept] = (counts[st.dept] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: DEPT_COLORS[name] || "#64748b",
      percent: Math.round((value / registeredStudents.length) * 100),
    }));
  }, [registeredStudents]);

  const yearChartData = useMemo(() => {
    const counts = { "1st Year": 0, "2nd Year": 0, "3rd Year": 0, "4th Year": 0 };
    registeredStudents.forEach((st) => {
      const label = `${st.year}${st.year === "1" ? "st" : st.year === "2" ? "nd" : st.year === "3" ? "rd" : "th"} Year`;
      if (counts[label] !== undefined) counts[label] += 1;
      else counts["3rd Year"] += 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      students: count,
      fill: YEAR_COLORS[name] || "#0da651",
    }));
  }, [registeredStudents]);

  const programChartData = useMemo(() => {
    const counts = {};
    registeredStudents.forEach((st) => {
      counts[st.program] = (counts[st.program] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [registeredStudents]);

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = [
      "Name",
      "College Roll",
      "Email",
      "Phone",
      "Department",
      "Program",
      "Course",
      "Year",
      "Semester",
      "Status",
      "Registered At",
    ];

    const rows = filteredStudents.map((st) => [
      `"${st.name}"`,
      `"${st.roll}"`,
      `"${st.email}"`,
      `"${st.phone}"`,
      `"${st.dept}"`,
      `"${st.program}"`,
      `"${st.course}"`,
      `"Year ${st.year}"`,
      `"Semester ${st.semester}"`,
      `"${st.status}"`,
      `"${st.registeredAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(",")].concat(rows.map((e) => e.join(","))).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${activity.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_students_${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Participant list exported to CSV successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-[#0da651] hover:text-white text-gray-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0 active:scale-95"
            title="Back to Activities"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              {activity.title}
            </h2>
          </div>
        </div>

        {/* Action Controls: 2 Main View Switcher Buttons + Edit & Delete Buttons */}
        <div className="flex items-center gap-2 flex-wrap self-stretch md:self-auto justify-between md:justify-end">
          {/* Two Main Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "details"
                  ? "bg-[#0da651] text-white shadow-sm hover:bg-[#0c9548]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                }`}
            >
              <FileText size={15} />
              <span>Activity Details</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "students"
                  ? "bg-[#0da651] text-white shadow-sm hover:bg-[#0c9548]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                }`}
            >
              <Users size={15} />
              <span>Registered Students ({activity.registered || registeredStudents.length})</span>
            </button>
          </div>

          {/* Edit & Delete Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onEdit?.(activity)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-emerald-50 hover:text-[#0da651] border border-gray-200 shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Edit size={14} className="text-emerald-600" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(activity.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-white hover:bg-red-50 border border-gray-200 shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Trash2 size={14} className="text-red-500" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Content: Activity Details Tab vs Registered Students Tab */}
      {activeTab === "details" ? (
        <div className="space-y-6">
          {/* Hero Banner Section with Poster, Title, and Key Meta */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row">
            {/* Poster Section */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-slate-900 shrink-0">
              {activity.image ? (
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950 flex items-center justify-center">
                  {getActivityIcon(activity.type, 48, "text-white/40")}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Badges on Poster */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold shadow-md backdrop-blur-md ${categoryBadgeStyles[activity.type] || "bg-black/60 text-white border border-white/20"
                    }`}
                >
                  {getActivityIcon(activity.type, 14)}
                  <span>{activity.type}</span>
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg shadow-md backdrop-blur-md ${statusStyles[activity.status] || "bg-gray-100 text-gray-700"
                    }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>

            {/* Poster Details Information Side */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                  <span>ID: {activity.id}</span>
                  <span>&bull;</span>
                  <span>Category: {activity.type}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {activity.title}
                </h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Event Date</p>
                    <p className="font-bold text-gray-800">{activity.date || "Scheduled Date"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Time & Schedule</p>
                    <p className="font-bold text-gray-800">{activity.time || "10:00 AM Onwards"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Location & Venue</p>
                    <p className="font-bold text-gray-800 truncate">{activity.venue || "Campus Venue"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Students Registered</p>
                    <p className="font-bold text-gray-800">
                      {activity.registered || registeredStudents.length} Students
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("students")}
                  className="flex items-center justify-center gap-2 px-6 h-12 bg-[#0da651] hover:bg-[#0c9548] text-white font-bold text-sm rounded-lg shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                >
                  <Users size={17} className="stroke-[2.3]" />
                  <span>View Registered Students</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-md shadow-slate-200/50 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#0da651] shadow-2xs">
                <Users size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">TOTAL REGISTRATIONS</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">
                  {activity.registered || registeredStudents.length}
                </p>
                <p className="text-xs text-emerald-600 font-medium">Active participants</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 shadow-md shadow-slate-200/50 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
                <Layers size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">CAPACITY STATUS</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">85%</p>
                <p className="text-xs text-gray-400 font-normal">300 max capacity</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 shadow-md shadow-slate-200/50 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-2xs">
                <Award size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">REWARDS &amp; PRIZES</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">Certificates</p>
                <p className="text-xs text-gray-400 font-normal">With Merit Badges</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-purple-500 shadow-md shadow-slate-200/50 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-2xs">
                <GraduationCap size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">ACTIVITY POINTS</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">15 Points</p>
                <p className="text-xs text-purple-600 font-medium">MAR / Activity points</p>
              </div>
            </div>
          </div>

          {/* Detailed Content 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Comprehensive Description & Agenda Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Description & Highlights Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <BookOpen size={18} className="text-[#0da651]" />
                  <h3 className="text-base font-bold text-gray-900">Activity Overview &amp; Description</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {activity.description}
                </p>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-900 leading-relaxed">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <Sparkles size={14} className="text-[#0da651]" />
                    <span>Key Learning Outcomes &amp; Participation Highlights:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-emerald-800/90 pl-1">
                    <li>Hands-on practical exposure and direct collaboration with faculty mentors &amp; peer leads.</li>
                    <li>Verified institutional Certificate of Participation credited directly to Student Activity Ledger.</li>
                    <li>Opportunities for peer networking, teamwork building, and competitive excellence awards.</li>
                  </ul>
                </div>
              </div>

              {/* Event Timeline & Agenda Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Clock size={18} className="text-[#0da651]" />
                  <h3 className="text-base font-bold text-gray-900">Event Schedule &amp; Agenda Timeline</h3>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                  {activity.timeline && activity.timeline.length > 0 ? (
                    activity.timeline.map((item, idx) => {
                      const palette = [
                        { text: "text-[#0da651]", dot: "bg-[#0da651]", ring: "ring-emerald-100" },
                        { text: "text-blue-600", dot: "bg-blue-500", ring: "ring-blue-100" },
                        { text: "text-amber-600", dot: "bg-amber-500", ring: "ring-amber-100" },
                        { text: "text-purple-600", dot: "bg-purple-500", ring: "ring-purple-100" },
                        { text: "text-rose-600", dot: "bg-rose-500", ring: "ring-rose-100" },
                        { text: "text-indigo-600", dot: "bg-indigo-500", ring: "ring-indigo-100" },
                        { text: "text-cyan-600", dot: "bg-cyan-500", ring: "ring-cyan-100" },
                      ];
                      const color = palette[idx % palette.length];
                      return (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full ${color.dot} ring-4 ${color.ring}`} />
                          <p className={`text-xs font-bold ${color.text}`}>{item.time || "Scheduled Time"}</p>
                          <p className="text-sm font-bold text-gray-800 mt-0.5">{item.title || "Agenda Session"}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#0da651] ring-4 ring-emerald-100" />
                        <p className="text-xs font-bold text-[#0da651]">09:30 AM – 10:00 AM</p>
                        <p className="text-sm font-bold text-gray-800">Student Reporting &amp; Registration Check-in</p>
                        <p className="text-xs text-gray-500">Badge collection, attendance logging, and seating arrangement at venue.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                        <p className="text-xs font-bold text-blue-600">10:00 AM – 12:30 PM</p>
                        <p className="text-sm font-bold text-gray-800">Keynote &amp; Interactive Workshop Session</p>
                        <p className="text-xs text-gray-500">Live demonstrations, expert guidance, and hands-on modules.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                        <p className="text-xs font-bold text-amber-600">01:30 PM – 03:30 PM</p>
                        <p className="text-sm font-bold text-gray-800">Challenge / Project Expo &amp; Evaluation</p>
                        <p className="text-xs text-gray-500">Student presentations, peer discussions, and judge evaluations.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-100" />
                        <p className="text-xs font-bold text-purple-600">04:00 PM – 05:00 PM</p>
                        <p className="text-sm font-bold text-gray-800">Valedictory Ceremony &amp; Award Distribution</p>
                        <p className="text-xs text-gray-500">Announcement of top performers, certificate distribution, and closing note.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Coordinators, Venue & Logistics Cards */}
            <div className="space-y-6">
              {/* Coordinators & Organizing Team */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Building2 size={18} className="text-[#0da651]" />
                  <h3 className="text-base font-bold text-gray-900">Organizing Committee</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Organizing Department</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">Department of Computer Science &amp; Engineering</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Faculty Coordinator</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">Dr. Alok Nath</p>
                    <p className="text-gray-500 mt-0.5">Associate Professor, CSE Dept</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Student Leads</p>
                    <p className="font-bold text-gray-800 text-sm mt-0.5">Turnab Roy &amp; Priya Sharma</p>
                    <p className="text-gray-500 mt-0.5">Student Council Representatives</p>
                  </div>
                </div>
              </div>

              {/* Guidelines & Logistics */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <ShieldCheck size={18} className="text-[#0da651]" />
                  <h3 className="text-base font-bold text-gray-900">Guidelines &amp; Logistics</h3>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#0da651] shrink-0 mt-0.5" />
                    <span>College ID Card is mandatory for entry and attendance verification.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#0da651] shrink-0 mt-0.5" />
                    <span>Laptops required for coding and technical workshop tracks.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#0da651] shrink-0 mt-0.5" />
                    <span>100% attendance during the event is necessary to claim Activity points.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Registered Students & Analytics Section */
        <div className="space-y-6">
          {/* Charts Section for Analytics of Participating Students */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Chart 1: Department Distribution Donut */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <PieIcon size={16} className="text-[#0da651]" />
                    <span>Department Distribution</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400">By Department</span>
                </div>
                <p className="text-xs text-gray-500">Student enrollment breakdown by department</p>
              </div>

              <div className="relative w-full h-44 my-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl">
                              <p>{data.name}: {data.value} students ({data.percent}%)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={deptChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={46}
                      outerRadius={68}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {deptChartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <p className="text-xl font-extrabold text-gray-900 leading-none">
                    {registeredStudents.length}
                  </p>
                  <p className="text-[10px] font-semibold text-gray-500 mt-0.5">Students</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-bold">
                {deptChartData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-gray-700">{d.name} ({d.percent}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Academic Year Breakdown Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <BarChart3 size={16} className="text-blue-600" />
                    <span>Academic Year Breakdown</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400">By Year</span>
                </div>
                <p className="text-xs text-gray-500">Participants count across study years</p>
              </div>

              <div className="w-full h-44 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl">
                              <p>{d.name}: {d.students} students</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                      {yearChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-bold text-gray-600">
                <span>Top Batch: 3rd Year (B.Tech)</span>
              </div>
            </div>

            {/* Chart 3: Program Representation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <TrendingUp size={16} className="text-purple-600" />
                    <span>Program Representation</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400">By Degree</span>
                </div>
                <p className="text-xs text-gray-500">Enrollment by degree curriculum</p>
              </div>

              <div className="w-full h-44 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={programChartData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl">
                              <p>{d.name}: {d.count} registrations</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
                <span>Highest: B.Tech (68%)</span>
                <span>Active: 4 Degrees</span>
              </div>
            </div>
          </div>

          {/* Controls Bar for Registered Students Table */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[220px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search students by name, roll no, email, phone..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-xl text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Filters + Export CSV Button */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              {/* Department Filter */}
              <div className="relative min-w-[130px]">
                <select
                  value={deptFilter}
                  onChange={(e) => {
                    setDeptFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EE">EE</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Year Filter */}
              <div className="relative min-w-[115px]">
                <select
                  value={yearFilter}
                  onChange={(e) => {
                    setYearFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="all">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Semester Filter */}
              <div className="relative min-w-[125px]">
                <select
                  value={semFilter}
                  onChange={(e) => {
                    setSemFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="all">All Semesters</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* CSV Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-[#0da651] px-4 py-2.5 text-xs font-bold shadow-2xs transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Registered Students Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5 text-left">STUDENT</th>
                    <th className="py-3.5 px-5 text-left">COLLEGE ROLL</th>
                    <th className="py-3.5 px-5 text-left">EMAIL</th>
                    <th className="py-3.5 px-5 text-left">PHONE</th>
                    <th className="py-3.5 px-5 text-center">PROGRAM</th>
                    <th className="py-3.5 px-5 text-left">COURSE</th>
                    <th className="py-3.5 px-5 text-center">YEAR</th>
                    <th className="py-3.5 px-5 text-center">SEMESTER</th>
                    <th className="py-3.5 px-5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400">
                        No registered students found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-gray-50/60 transition-colors">
                        {/* Student Name & Avatar */}
                        <td className="py-3.5 px-5 text-left">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-2xs ${st.avatarBg}`}
                            >
                              {st.initials}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm leading-tight">{st.name}</p>
                              <p className="text-[11px] text-gray-400 font-normal">{st.dept} Dept</p>
                            </div>
                          </div>
                        </td>

                        {/* College Roll */}
                        <td className="py-3.5 px-5 text-left font-semibold text-gray-800 text-xs">
                          {st.roll}
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-5 text-left text-xs text-gray-600 font-medium">
                          {st.email}
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-5 text-left text-xs text-gray-600 font-medium">
                          {st.phone}
                        </td>

                        {/* Program */}
                        <td className="py-3.5 px-5 text-center font-semibold text-gray-700 text-xs">
                          {st.program}
                        </td>

                        {/* Course */}
                        <td className="py-3.5 px-5 text-left text-xs text-gray-600 font-medium max-w-[200px] truncate" title={st.course}>
                          {st.course}
                        </td>

                        {/* Year */}
                        <td className="py-3.5 px-5 text-center font-bold text-gray-700 text-xs">
                          {st.year}
                        </td>

                        {/* Semester */}
                        <td className="py-3.5 px-5 text-center font-bold text-[#0da651] text-xs">
                          {st.semester}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-5 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.status === "Confirmed"
                                ? "bg-emerald-50 text-[#0da651] border border-emerald-200"
                                : st.status === "Attended"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                          >
                            {st.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-white font-['Roboto',sans-serif]">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Show</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="appearance-none border border-gray-200 rounded px-2 py-1 pr-6 hover:bg-gray-50 text-xs text-gray-700 cursor-pointer focus:outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <ChevronDown size={11} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <span>per page</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft size={14} className="text-gray-500" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 text-xs rounded font-medium transition-colors cursor-pointer ${currentPage === pageNum
                        ? "bg-primary text-white shadow-xs"
                        : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight size={14} className="text-gray-500" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Go to page</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= totalPages) {
                      setCurrentPage(val);
                    }
                  }}
                  className="w-12 border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-green-300 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
