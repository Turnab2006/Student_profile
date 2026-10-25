import { useState, useMemo } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Calendar,
  Eye,
  Paperclip,
  X,
  Download,
  Printer,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Flag,
  Layers,
  BookOpen,
  Trophy,
  Star,
  ShieldCheck,
  Megaphone,
  GraduationCap,
  FileText,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  LayoutGrid,
  List
} from "lucide-react";
import NoticeDetailView from "../admin/NoticeDetailView";

export const initialNoticesData = [
  {
    id: "NTC-001",
    title: "Exam Schedule Update",
    description: "The final exam schedule has been updated for Semester II.",
    fullContent: "The detailed schedule for the upcoming Semester II regular and backpaper examinations has been released by the Controller of Examinations. All students are advised to download the attached timetable PDF and verify their subject codes, exam shift timings, and respective room allocations. Admit cards will be available on the portal starting next Monday.",
    priority: "High", // 'High' | 'Medium' | 'Low'
    category: "Academic",
    publishedDate: "Jan 30, 2024",
    publishedTime: "10:30 AM",
    dateObj: new Date(2024, 0, 30, 10, 30),
    hasAttachment: true,
    attachmentName: "Semester_II_Exam_Schedule_Final.pdf",
    attachmentSize: "1.4 MB",
    author: "Controller of Examinations & Academic Cell",
    icon: Megaphone,
    iconBg: "bg-blue-50 text-blue-500",
    priorityBadgeClass: "bg-amber-100/80 text-amber-700 border border-amber-200/80",
    categoryBadgeClass: "bg-purple-50 text-purple-600 border border-purple-100"
  },
  {
    id: "NTC-002",
    title: "Library Timing Change",
    description: "The library will be open from 8 AM to 10 PM starting next week.",
    fullContent: "To accommodate extended study hours for mid-term and semester exam preparation, the Central Library reading rooms and digital catalog section will remain open from 8:00 AM to 10:00 PM on all weekdays and Saturdays. RFID self-checkout kiosks will be active throughout extended hours.",
    priority: "Medium",
    category: "General",
    publishedDate: "Jan 28, 2024",
    publishedTime: "09:15 AM",
    dateObj: new Date(2024, 0, 28, 9, 15),
    hasAttachment: false,
    author: "Chief Librarian & Administration",
    icon: BookOpen,
    iconBg: "bg-indigo-50 text-indigo-500",
    priorityBadgeClass: "bg-blue-50 text-blue-600 border border-blue-100",
    categoryBadgeClass: "bg-rose-50 text-rose-600 border border-rose-100"
  },
  {
    id: "NTC-003",
    title: "Workshop Registration Open",
    description: "Register now for the upcoming AI/ML workshop & limited seats.",
    fullContent: "The Department of Computer Science & Engineering is hosting a 3-day hands-on workshop on 'Applied Machine Learning & LLM Pipelines' in collaboration with industry practitioners. Topics include Neural Networks, Prompt Engineering, and Vector Search. Limited to 60 seats on a first-come, first-served basis.",
    priority: "Low",
    category: "Workshop",
    publishedDate: "Jan 25, 2024",
    publishedTime: "11:45 AM",
    dateObj: new Date(2024, 0, 25, 11, 45),
    hasAttachment: true,
    attachmentName: "AIML_Workshop_Brochure_Syllabus.pdf",
    attachmentSize: "2.1 MB",
    author: "CSE Department & Tech Club",
    icon: Trophy,
    iconBg: "bg-emerald-50 text-emerald-500",
    priorityBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    categoryBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100"
  },
  {
    id: "NTC-004",
    title: "Fee Payment Deadline",
    description: "Last date for Semester II fee payment is 9th February 2024.",
    fullContent: "Students who have not completed their tuition and laboratory fee payments for Semester II are hereby reminded that the final deadline without late fee penalty is 9th February 2024. Payments must be processed through the online fee payment gateway. Contact the Accounts Office for fee receipts or loan clearance vouchers.",
    priority: "High",
    category: "Finance",
    publishedDate: "Jan 22, 2024",
    publishedTime: "02:30 PM",
    dateObj: new Date(2024, 0, 22, 14, 30),
    hasAttachment: false,
    author: "Accounts & Finance Department",
    icon: Star,
    iconBg: "bg-amber-50 text-amber-500",
    priorityBadgeClass: "bg-amber-100/80 text-amber-700 border border-amber-200/80",
    categoryBadgeClass: "bg-slate-100 text-slate-700 border border-slate-200"
  },
  {
    id: "NTC-005",
    title: "Campus Maintenance Notice",
    description: "The campus will be under maintenance this weekend.",
    fullContent: "Scheduled electrical grid maintenance and high-speed campus Wi-Fi infrastructure upgrades will occur this Saturday and Sunday. Expect brief power switchovers between 1:00 PM and 4:00 PM in Block B and the Server Room. Main campus cafeteria and student recreation rooms will remain open.",
    priority: "Medium",
    category: "General",
    publishedDate: "Jan 20, 2024",
    publishedTime: "05:00 PM",
    dateObj: new Date(2024, 0, 20, 17, 0),
    hasAttachment: false,
    author: "Campus Facilities & Estate Office",
    icon: ShieldCheck,
    iconBg: "bg-emerald-50 text-emerald-500",
    priorityBadgeClass: "bg-blue-50 text-blue-600 border border-blue-100",
    categoryBadgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-100"
  },
  {
    id: "NTC-006",
    title: "Guest Lecture Update",
    description: "The guest lecture has been rescheduled for Saturday.",
    fullContent: "The distinguished guest lecture by Dr. Arnab Mukherjee (Chief AI Scientist) on 'Scalable Neural Architecture & Quantum Computing Trends' originally set for Thursday has been rescheduled to this Saturday at 3:10 PM in the Main Auditorium. Registered participants are requested to be seated 15 minutes prior.",
    priority: "High",
    category: "Academic",
    publishedDate: "Jan 18, 2024",
    publishedTime: "03:10 PM",
    dateObj: new Date(2024, 0, 18, 15, 10),
    hasAttachment: true,
    attachmentName: "Guest_Lecture_Speaker_Bio_Schedule.pdf",
    attachmentSize: "850 KB",
    author: "Academic Programs & Seminar Committee",
    icon: Calendar,
    iconBg: "bg-rose-50 text-rose-500",
    priorityBadgeClass: "bg-amber-100/80 text-amber-700 border border-amber-200/80",
    categoryBadgeClass: "bg-purple-50 text-purple-600 border border-purple-100"
  },
  {
    id: "NTC-007",
    title: "Library E-Resource Access",
    description: "The library e-resources are live. Set up 2FA for secure access.",
    fullContent: "Access to IEEE Xplore, ACM Digital Library, SpringerLink, and ScienceDirect journals has been updated for all enrolled students. Log in with your institutional email credentials and activate Two-Factor Authentication (2FA) via the student portal for remote off-campus access.",
    priority: "Medium",
    category: "Access",
    publishedDate: "Jan 15, 2024",
    publishedTime: "10:00 AM",
    dateObj: new Date(2024, 0, 15, 10, 0),
    hasAttachment: false,
    author: "Digital Library & IT Services",
    icon: GraduationCap,
    iconBg: "bg-blue-50 text-blue-500",
    priorityBadgeClass: "bg-blue-50 text-blue-600 border border-blue-100",
    categoryBadgeClass: "bg-cyan-50 text-cyan-600 border border-cyan-100"
  }
];

export default function StudentNotices({
  onNavigate,
  hideHeader = false,
  userRole = null,
  theme = null,
  isMentor = false,
}) {
  const isMentorMode = isMentor || userRole === 'mentor' || theme === 'purple';
  const [notices] = useState(initialNoticesData);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all"); // 'all' | 'High' | 'Medium' | 'Low'
  const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' | 'Academic' | 'General' | 'Workshop' | 'Finance' | 'Access'
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'oldest' | 'priority' | 'title'
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingNotice, setViewingNotice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function handleDownloadAttachment(notice, e) {
    if (e) e.stopPropagation();
    showToast(`Downloading "${notice.attachmentName || notice.title + '.pdf'}"...`);
  }

  // Filter logic
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      // Search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        notice.title.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query) ||
        notice.author.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Priority Filter
      if (selectedPriority !== "all" && notice.priority !== selectedPriority) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== "all" && notice.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [notices, searchQuery, selectedPriority, selectedCategory]);

  // Sort logic
  const sortedNotices = useMemo(() => {
    return [...filteredNotices].sort((a, b) => {
      if (sortBy === "latest") {
        return b.dateObj.getTime() - a.dateObj.getTime();
      }
      if (sortBy === "oldest") {
        return a.dateObj.getTime() - b.dateObj.getTime();
      }
      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [filteredNotices, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedNotices.length / entriesPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * entriesPerPage;
  const paginatedNotices = sortedNotices.slice(startIndex, startIndex + entriesPerPage);

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "High", label: "High Priority" },
    { value: "Medium", label: "Medium Priority" },
    { value: "Low", label: "Low Priority" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Academic", label: "Academic" },
    { value: "General", label: "General" },
    { value: "Workshop", label: "Workshop" },
    { value: "Finance", label: "Finance" },
    { value: "Access", label: "Access" },
  ];

  const sortOptions = [
    { value: "latest", label: "Sort: Latest First" },
    { value: "oldest", label: "Sort: Oldest First" },
    { value: "priority", label: "Sort: High Priority" },
    { value: "title", label: "Sort: Title (A-Z)" },
  ];

  if (viewingNotice) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#f6f7fb] min-w-0 font-sans p-2 sm:px-5 sm:py-3.5 max-w-[1600px] mx-auto w-full">
        <NoticeDetailView
          notice={{
            ...viewingNotice,
            content: viewingNotice.fullContent || viewingNotice.content || viewingNotice.description,
            date: viewingNotice.publishedDate || viewingNotice.date,
            files: viewingNotice.hasAttachment
              ? [{ name: viewingNotice.attachmentName || `${viewingNotice.title}.pdf`, size: viewingNotice.attachmentSize || "1.4 MB", type: "PDF" }]
              : viewingNotice.files || []
          }}
          onBack={() => setViewingNotice(null)}
          isStudent={!isMentorMode}
          isMentor={isMentorMode}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#f6f7fb] min-w-0 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-800">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-blue-400" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {!hideHeader && (
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs font-['Roboto',sans-serif]">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
              Notices
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Stay updated with important announcements and circulars.
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

      {/* Main Content matching Dashboard padding & spacing */}
      <main className="space-y-4 p-2 sm:px-5 sm:py-3.5 max-w-[1600px] mx-auto font-['Roboto',sans-serif]">
        
        {/* Upper Box-type Controls Bar matching reference image style */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-[20px] border border-slate-200/90 shadow-md shadow-slate-200/50">
          
          {/* Row 1 (Mobile) / Left Column (Desktop): Search Bar */}
          <div className="relative w-full sm:w-[320px] md:w-[380px] lg:w-[460px] shrink-0">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notice by title, keyword, or author..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none transition-all shadow-2xs ${
                isMentorMode
                  ? "focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100"
                  : "focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Row 2 (Mobile) / Right Column (Desktop): Filters + Grid/List Buttons at the last, right corner */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* Priority Filter */}
            <div className="relative shrink-0">
              <select
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value);
                  setCurrentPage(1);
                }}
                className={`appearance-none min-w-[125px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none cursor-pointer shadow-2xs ${
                  isMentorMode
                    ? "focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4]"
                    : "focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb]"
                }`}
              >
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Category Filter */}
            <div className="relative shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className={`appearance-none min-w-[130px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none cursor-pointer shadow-2xs ${
                  isMentorMode
                    ? "focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4]"
                    : "focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb]"
                }`}
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Sort Filter */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                className={`appearance-none min-w-[140px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none cursor-pointer shadow-2xs ${
                  isMentorMode
                    ? "focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4]"
                    : "focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb]"
                }`}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* View Mode Toggle Buttons ("Grid View" & "List View") at the last, right corner */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="Grid View"
                aria-label="Grid View"
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? isMentorMode
                      ? "bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs"
                      : "bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                title="List View"
                aria-label="List View"
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "list"
                    ? isMentorMode
                      ? "bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs"
                      : "bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Notices Content: Grid View vs List View */}
        {viewMode === "grid" ? (
          <div className="space-y-4">
            {paginatedNotices.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50">
                <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="font-semibold text-gray-600">No notices found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {paginatedNotices.map((notice) => {
                  const IconComponent = notice.icon || Megaphone;
                  return (
                    <div
                      key={notice.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-200 group p-5 justify-between font-['Roboto',sans-serif]"
                    >
                      <div>
                        {/* Top Badges & Icon */}
                        <div className="flex items-start justify-between gap-3 mb-3.5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${notice.iconBg}`}>
                            <IconComponent size={22} />
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${notice.priorityBadgeClass}`}>
                              {notice.priority}
                            </span>
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${notice.categoryBadgeClass}`}>
                              {notice.category}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3
                          onClick={() => setViewingNotice(notice)}
                          className={`text-base font-bold transition-colors leading-snug line-clamp-2 cursor-pointer mb-2 ${
                            isMentorMode ? "text-slate-900 group-hover:text-purple-700" : "text-slate-900 group-hover:text-blue-600"
                          }`}
                          title={notice.title}
                        >
                          {notice.title}
                        </h3>

                        <p className="text-xs text-slate-500 font-normal line-clamp-3 leading-relaxed mb-4">
                          {notice.description}
                        </p>
                      </div>

                      {/* Footer Meta & Actions */}
                      <div className="pt-3.5 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar size={13} className="text-slate-400 shrink-0" />
                            <span>{notice.publishedDate}</span>
                          </div>
                          {notice.hasAttachment && (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                              isMentorMode ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                            }`}>
                              <Paperclip size={11} />
                              <span>Attachment</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setViewingNotice(notice)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 text-white ${
                              isMentorMode
                                ? "bg-[#7656f4] hover:bg-[#6242e2] shadow-purple-500/20"
                                : "bg-[#2563eb] hover:bg-[#1d4ed8] shadow-blue-500/20"
                            }`}
                          >
                            <Eye size={14} className="stroke-[2.2]" />
                            <span>View Notice</span>
                          </button>

                          {notice.hasAttachment && (
                            <button
                              type="button"
                              onClick={(e) => handleDownloadAttachment(notice, e)}
                              title={`Download ${notice.attachmentName || 'Attachment'}`}
                              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs active:scale-95 ${
                                isMentorMode
                                  ? "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200"
                                  : "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
                              }`}
                            >
                              <Download size={14} className="stroke-[2.2]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Pagination for Grid View */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-['Roboto',sans-serif] select-none">
              {/* Show entries dropdown */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer ${
                    isMentorMode ? "focus:ring-1 focus:ring-purple-500" : "focus:ring-1 focus:ring-blue-500"
                  }`}
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
                <span>entries</span>
              </div>

              {/* Numbered Pagination */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      pageNumber === safeCurrentPage
                        ? isMentorMode ? "bg-[#7656f4] text-white shadow-xs" : "bg-blue-600 text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Previous / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className={`px-4 py-1.5 rounded-xl text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs ${
                    isMentorMode ? "bg-[#7656f4] hover:bg-[#6242e2]" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Notices Table Card (List View) */
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden font-['Roboto',sans-serif]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`${isMentorMode ? 'bg-gradient-to-r from-[#7656f4] via-[#6845f2] to-[#5531dc]' : 'bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af]'} text-white text-xs font-bold uppercase tracking-wider select-none`}>
                    <th className="py-3.5 px-6 text-left min-w-[320px] whitespace-nowrap">Notice</th>
                    <th className="py-3.5 px-4 text-center min-w-[110px] whitespace-nowrap">Priority</th>
                    <th className="py-3.5 px-4 text-center min-w-[120px] whitespace-nowrap">Category</th>
                    <th className="py-3.5 px-5 text-left min-w-[150px] whitespace-nowrap">Published On</th>
                    <th className="py-3.5 px-4 text-center min-w-[130px] whitespace-nowrap">Attachments</th>
                    <th className="py-3.5 px-6 text-right min-w-[100px] whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 text-sm">
                  {paginatedNotices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-14 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                            <FileText size={24} />
                          </div>
                          <p className="text-sm font-bold text-slate-700">No notices found</p>
                          <p className="text-xs text-slate-400 max-w-sm">
                            Try adjusting your search terms or clearing your priority and category filters.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedPriority("all");
                              setSelectedCategory("all");
                            }}
                            className="px-3.5 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Reset filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedNotices.map((notice) => {
                      const IconComponent = notice.icon || Megaphone;

                      return (
                        <tr
                          key={notice.id}
                          onClick={() => setViewingNotice(notice)}
                          className={`transition-colors cursor-pointer group ${isMentorMode ? 'hover:bg-purple-50/40' : 'hover:bg-blue-50/40'}`}
                        >
                          {/* Notice Column */}
                          <td className="py-4 px-6 text-left">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${notice.iconBg}`}
                              >
                                <IconComponent size={20} />
                              </div>

                              <div className="space-y-1 min-w-0">
                                <h3 className={`text-sm font-bold transition-colors leading-snug ${isMentorMode ? 'text-purple-700 hover:text-purple-900' : 'text-blue-600 hover:text-blue-700'}`}>
                                  {notice.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-normal line-clamp-1 leading-relaxed max-w-md">
                                  {notice.description}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Priority Column */}
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${notice.priorityBadgeClass}`}
                            >
                              {notice.priority}
                            </span>
                          </td>

                          {/* Category Column */}
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${notice.categoryBadgeClass}`}
                            >
                              {notice.category}
                            </span>
                          </td>

                          {/* Published On Column */}
                          <td className="py-4 px-5 text-left">
                            <div className="flex items-start gap-2 text-xs">
                              <Calendar size={14} className="text-slate-400 mt-0.5 shrink-0" />
                              <div>
                                <span className="font-semibold text-slate-700 block">
                                  {notice.publishedDate}
                                </span>
                                <span className="text-[11px] text-slate-400 block font-medium">
                                  {notice.publishedTime}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Attachments Column */}
                          <td className="py-4 px-4 text-center">
                            {notice.hasAttachment ? (
                              <button
                                type="button"
                                onClick={(e) => handleDownloadAttachment(notice, e)}
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold hover:underline cursor-pointer transition-colors ${isMentorMode ? 'text-purple-600 hover:text-purple-700' : 'text-blue-600 hover:text-blue-700'}`}
                              >
                                <Paperclip size={13} className={isMentorMode ? 'text-purple-500 shrink-0' : 'text-blue-500 shrink-0'} />
                                <span>Download</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 font-medium text-xs">-</span>
                            )}
                          </td>

                          {/* Action Column */}
                          <td className="py-4 px-6 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingNotice(notice);
                              }}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 text-white ${
                                isMentorMode
                                  ? "bg-[#7656f4] hover:bg-[#6242e2] shadow-purple-500/20"
                                  : "bg-[#2563eb] hover:bg-[#1d4ed8] shadow-blue-500/20"
                              }`}
                            >
                              <Eye size={14} className="stroke-[2.2]" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Controls Bar matching design */}
            <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white select-none">
              {/* Show entries dropdown */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              {/* Numbered Pagination */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      pageNumber === safeCurrentPage
                        ? "bg-blue-600 text-white shadow-xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Previous / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
