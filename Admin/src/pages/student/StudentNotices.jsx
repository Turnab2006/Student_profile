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
  CheckCircle2
} from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all"); // 'all' | 'High' | 'Medium' | 'Low'
  const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' | 'Academic' | 'General' | 'Workshop' | 'Finance' | 'Access'
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'oldest' | 'priority' | 'title'
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNoticeModal, setSelectedNoticeModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Dropdown open states
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

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
    { value: "latest", label: "Latest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "priority", label: "Priority (High to Low)" },
    { value: "title", label: "Title (A-Z)" },
  ];

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
        <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs font-['Roboto',sans-serif]">
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
      <main className="space-y-3.5 p-4">
        {/* Search & Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search notices by title or keyword..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filter 1: All Priorities */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setPriorityDropdownOpen((prev) => !prev);
                  setCategoryDropdownOpen(false);
                  setSortDropdownOpen(false);
                }}
                className="flex items-center justify-between gap-3 min-w-[160px] w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Flag size={15} className="text-slate-500" />
                  <span>
                    {priorityOptions.find((o) => o.value === selectedPriority)?.label ||
                      "All Priorities"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    priorityDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {priorityDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedPriority(option.value);
                        setPriorityDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                        selectedPriority === option.value
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedPriority === option.value && (
                        <Check size={14} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: All Categories */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setCategoryDropdownOpen((prev) => !prev);
                  setPriorityDropdownOpen(false);
                  setSortDropdownOpen(false);
                }}
                className="flex items-center justify-between gap-3 min-w-[170px] w-full md:w-auto px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers size={15} className="text-slate-500" />
                  <span>
                    {categoryOptions.find((o) => o.value === selectedCategory)?.label ||
                      "All Categories"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(option.value);
                        setCategoryDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                        selectedCategory === option.value
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedCategory === option.value && (
                        <Check size={14} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subheader: Showing counts & Sort Dropdown */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {paginatedNotices.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {sortedNotices.length}
              </span>{" "}
              notices
            </p>

            {/* Sort by Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort by:</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setSortDropdownOpen((prev) => !prev);
                    setPriorityDropdownOpen(false);
                    setCategoryDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>
                    {sortOptions.find((o) => o.value === sortBy)?.label || "Latest First"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      sortDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortBy(option.value);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          sortBy === option.value
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                        }`}
                      >
                        <span>{option.label}</span>
                        {sortBy === option.value && <Check size={13} className="text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notices Table Card matching design */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden font-['Roboto',sans-serif]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`${isMentorMode ? 'bg-gradient-to-r from-[#7656f4] via-[#6845f2] to-[#5531dc]' : 'bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af]'} text-white text-xs font-bold uppercase tracking-wider select-none`}>
                    <th className="py-3.5 px-6 text-left min-w-[320px]">Notice</th>
                    <th className="py-3.5 px-4 text-center min-w-[110px]">Priority</th>
                    <th className="py-3.5 px-4 text-center min-w-[120px]">Category</th>
                    <th className="py-3.5 px-5 text-left min-w-[150px]">Published On</th>
                    <th className="py-3.5 px-4 text-center min-w-[130px]">Attachments</th>
                    <th className="py-3.5 px-6 text-right min-w-[100px]">Action</th>
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
                          onClick={() => setSelectedNoticeModal(notice)}
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
                                setSelectedNoticeModal(notice);
                              }}
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${isMentorMode ? 'text-[#7656f4] bg-[#f6f2fe] hover:bg-[#7656f4] hover:text-white border-[#7656f4]/30' : 'text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white border-blue-200/80'}`}
                            >
                              <Eye size={14} />
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
      </main>

      {/* Notice Detail View Modal */}
      {selectedNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedNoticeModal.priorityBadgeClass}`}
                  >
                    {selectedNoticeModal.priority} Priority
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${selectedNoticeModal.categoryBadgeClass}`}
                  >
                    {selectedNoticeModal.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedNoticeModal.id}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedNoticeModal.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar size={13} className="text-slate-400" />
                    {selectedNoticeModal.publishedDate} at {selectedNoticeModal.publishedTime}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Megaphone size={13} className="text-slate-400" />
                    {selectedNoticeModal.author}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNoticeModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Official Announcement
                </h4>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-normal">
                  {selectedNoticeModal.fullContent || selectedNoticeModal.description}
                </div>
              </div>

              {/* Attachment if present */}
              {selectedNoticeModal.hasAttachment && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Attached Document
                  </h4>
                  <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {selectedNoticeModal.attachmentName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {selectedNoticeModal.attachmentSize || "Official Circular PDF"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDownloadAttachment(selectedNoticeModal, e)}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => showToast("Notice copied to clipboard!")}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNoticeModal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl cursor-pointer transition-all shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
