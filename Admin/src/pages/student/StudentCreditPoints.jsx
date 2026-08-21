import { useState, useMemo } from "react";
import {
  Trophy,
  Star,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  Filter,
  TrendingUp,
  Download,
  Plus,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Paperclip,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Info,
  BookOpen,
  Send,
  Layers,
  ArrowUpRight
} from "lucide-react";

export const initialCreditHistoryData = [
  {
    id: "CRD-001",
    title: "TECHNOVATE 2026 Hackathon Winner",
    category: "Technical",
    semester: "Semester 5",
    points: 15,
    date: "May 20, 2026",
    issuer: "CSE Dept & Tech Club",
    status: "Approved", // 'Approved' | 'Pending' | 'Approval Failed'
    proofDoc: "technovate_winner_cert.pdf",
    remarks: "First prize in AI Track with ₹25,000 cash award.",
  },
  {
    id: "CRD-002",
    title: "AWS Cloud Practitioner Certification",
    category: "Certifications",
    semester: "Semester 5",
    points: 10,
    date: "Apr 15, 2026",
    issuer: "Amazon Web Services",
    status: "Approved",
    proofDoc: "aws_cert_validation_89412.pdf",
    remarks: "Scored 890/1000 in official AWS exam.",
  },
  {
    id: "CRD-003",
    title: "AI Workshop & LLM Prompting Sprint",
    category: "Technical",
    semester: "Semester 5",
    points: 10,
    date: "Mar 10, 2026",
    issuer: "ACM Student Chapter",
    status: "Approved",
    proofDoc: "acm_workshop_certificate.pdf",
    remarks: "3-day hands-on workshop completion.",
  },
  {
    id: "CRD-004",
    title: "NPTEL Deep Learning Specialization",
    category: "Certifications",
    semester: "Semester 4",
    points: 10,
    date: "Feb 22, 2026",
    issuer: "IIT Madras / NPTEL",
    status: "Approved",
    proofDoc: "nptel_elite_gold_cert.pdf",
    remarks: "Elite + Gold Medal (Top 2% score).",
  },
  {
    id: "CRD-005",
    title: "Smart India Hackathon (SIH) Internal Round",
    category: "Technical",
    semester: "Semester 4",
    points: 10,
    date: "Jan 18, 2026",
    issuer: "Ministry of Education & RCCIIT",
    status: "Approved",
    proofDoc: "sih_round1_nomination.pdf",
    remarks: "Selected in top 5 teams from college.",
  },
  {
    id: "CRD-006",
    title: "Semester 4 Exemplary Attendance (>90%)",
    category: "Attendance",
    semester: "Semester 4",
    points: 5,
    date: "Dec 30, 2025",
    issuer: "Office of the Dean Academics",
    status: "Approved",
    proofDoc: "attendance_merit_transcript.pdf",
    remarks: "Achieved 94.2% overall attendance.",
  },
  {
    id: "CRD-007",
    title: "Google Cloud Study Jam Certification",
    category: "Certifications",
    semester: "Semester 5",
    points: 5,
    date: "May 12, 2026",
    issuer: "Google Developers Group",
    status: "Pending",
    proofDoc: "gcp_study_jam_badges.pdf",
    remarks: "Completed 4 skill badges on Google Cloud Skills Boost.",
  },
  {
    id: "CRD-008",
    title: "Inter-College Robotics Obstacle Challenge",
    category: "Technical",
    semester: "Semester 5",
    points: 5,
    date: "May 05, 2026",
    issuer: "Robotics & IoT Club",
    status: "Pending",
    proofDoc: "robotics_participation_cert.pdf",
    remarks: "2nd runner up in autonomous line follower category.",
  },
  {
    id: "CRD-009",
    title: "Introductory Web Dev 2-Hour Seminar",
    category: "Workshops",
    semester: "Semester 3",
    points: 0,
    date: "Nov 15, 2025",
    issuer: "Third-party Online Webinar",
    status: "Approval Failed",
    proofDoc: "webinar_attendance_screenshot.png",
    rejectionReason: "Non-accredited webinar. Mandatory minimum duration is 16 contact hours for academic credit eligibility.",
  },
  {
    id: "CRD-010",
    title: "Social Media Marketing Crash Course",
    category: "Extracurricular",
    semester: "Semester 2",
    points: 0,
    date: "Aug 10, 2025",
    issuer: "Independent Online Blog",
    status: "Approval Failed",
    proofDoc: "certificate_of_completion_draft.pdf",
    rejectionReason: "Missing official credential ID and issuer verification seal. Department guidelines require verifiable QR or institutional accreditation.",
  },
];

export default function StudentCreditPoints({ hideHeader = false }) {
  const [historyList, setHistoryList] = useState(initialCreditHistoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compute 4 Dynamic Metric Values
  const totalEarnedPoints = useMemo(() => {
    return historyList
      .filter((item) => item.status === "Approved")
      .reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [historyList]);

  const currentSemPoints = useMemo(() => {
    return historyList
      .filter((item) => item.status === "Approved" && item.semester === "Semester 5")
      .reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [historyList]);

  const pendingPoints = useMemo(() => {
    return historyList
      .filter((item) => item.status === "Pending")
      .reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [historyList]);

  const pendingCount = useMemo(() => {
    return historyList.filter((item) => item.status === "Pending").length;
  }, [historyList]);

  const failedCount = useMemo(() => {
    return historyList.filter((item) => item.status === "Approval Failed").length;
  }, [historyList]);

  // Overall Status
  const degreeStatus = useMemo(() => {
    if (totalEarnedPoints >= 100) {
      return {
        label: "Success",
        badge: "Completed (100/100)",
        color: "text-emerald-600",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        desc: "All degree requirements met! Ready for graduation.",
      };
    }
    if (totalEarnedPoints > 0) {
      return {
        label: "Not Complete",
        badge: "In Progress",
        color: "text-amber-600",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        desc: `${100 - totalEarnedPoints} points needed to reach 100/100 threshold.`,
      };
    }
    return {
      label: "Failed / Action Needed",
      badge: "No Credits",
      color: "text-rose-600",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      desc: "No points approved yet. Submit activity claims promptly.",
    };
  }, [totalEarnedPoints]);

  // Filtered & Sorted History
  const filteredHistory = useMemo(() => {
    return historyList.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.semester.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && item.status === "Approved") ||
        (statusFilter === "pending" && item.status === "Pending") ||
        (statusFilter === "failed" && item.status === "Approval Failed");

      const matchesCategory =
        categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [historyList, searchQuery, statusFilter, categoryFilter]);

  const sortedHistory = useMemo(() => {
    return [...filteredHistory].sort((a, b) => {
      if (sortBy === "points-high") {
        return (b.points || 0) - (a.points || 0);
      }
      if (sortBy === "points-low") {
        return (a.points || 0) - (b.points || 0);
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      // default: newest
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredHistory, sortBy]);

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case "technical":
        return <Zap size={16} className="text-blue-600" />;
      case "certifications":
        return <Award size={16} className="text-purple-600" />;
      case "attendance":
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      case "workshops":
        return <BookOpen size={16} className="text-amber-600" />;
      default:
        return <Sparkles size={16} className="text-indigo-600" />;
    }
  };

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-4 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-800">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-blue-400" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Top Header Card with Claim Button */}
      <div className="bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] text-white rounded-2xl border border-blue-600/30 shadow-md shadow-blue-500/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Credit Points &amp; Achievements
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs hidden sm:inline-flex items-center gap-1">
              <Sparkles size={12} /> {totalEarnedPoints}/100
            </span>
          </div>
          <p className="text-xs text-blue-100/90 font-normal">
            Track your extracurricular, technical, and academic credits required for degree completion.
          </p>
        </div>

        {/* Claim Activity Points Button with white background and blue text */}
        <button
          type="button"
          onClick={() => showToast("Claim request registered! Please submit your verified certificate copy to your faculty mentor.")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white hover:bg-blue-50 text-[#2563eb] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 border border-white/60"
        >
          <Sparkles size={16} className="stroke-[2.5] text-[#2563eb]" />
          <span>Claim Activity Points</span>
        </button>
      </div>

      {/* 4 Metric Cards Row (2 rows on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {/* 1. Total Credit Points Earned (out of 100) */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-[#2563eb] shadow-md shadow-slate-200/50 flex items-center gap-2.5 sm:gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
          <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-50 text-[#2563eb] border border-blue-100/60 shadow-2xs">
            <Trophy size={18} className="sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              TOTAL POINTS
            </p>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                {totalEarnedPoints}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-400">/ 100</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-600 font-medium truncate">
              <TrendingUp size={12} className="shrink-0" />
              <span className="truncate">{Math.min(100, Math.round((totalEarnedPoints / 100) * 100))}% of Goal</span>
            </div>
          </div>
        </div>

        {/* 2. Credit Points Earned in Current Semester */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-md shadow-slate-200/50 flex items-center gap-2.5 sm:gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
          <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-2xs">
            <Sparkles size={18} className="sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              CURRENT SEMESTER
            </p>
            <p className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight my-0.5">
              {currentSemPoints}
            </p>
            <p className="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">
              Semester 5 (Active)
            </p>
          </div>
        </div>

        {/* 3. Pending Credit Points */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 shadow-md shadow-slate-200/50 flex items-center gap-2.5 sm:gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
          <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 border border-amber-100/60 shadow-2xs">
            <Clock size={18} className="sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              PENDING POINTS
            </p>
            <p className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight my-0.5">
              {pendingPoints}
            </p>
            <p className="text-[10px] sm:text-xs text-amber-600 font-medium truncate">
              {pendingCount} claim{pendingCount === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* 4. Status About Credit Point Earned (100/100 Complete: Success / Not Complete / Failed) */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-purple-500 shadow-md shadow-slate-200/50 flex items-center gap-2.5 sm:gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
          <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-50 text-purple-600 border border-purple-100/60 shadow-2xs">
            <ShieldCheck size={18} className="sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              DEGREE STATUS
            </p>
            <div className="flex items-center gap-1 my-0.5">
              <span className={`text-sm sm:text-base font-bold ${degreeStatus.color} truncate`}>
                {degreeStatus.label}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-normal truncate" title={degreeStatus.desc}>
              {degreeStatus.desc}
            </p>
          </div>
        </div>
      </div>

      {/* History Filter Box Container matching image style */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-[20px] border border-slate-200/90 shadow-md shadow-slate-200/50 font-['Roboto',sans-serif]">
        {/* Left Column: Search Bar */}
        <div className="relative w-full sm:w-[320px] md:w-[380px] lg:w-[440px] shrink-0">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search activity, certificate, or issuer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right Column: Status Filter + Category Filter + Sort Dropdown + Grid/List View Toggle (Last, Right Corner) */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
          {/* Status Filter Dropdown */}
          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none min-w-[130px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] cursor-pointer shadow-2xs"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved ({historyList.filter(i => i.status === 'Approved').length})</option>
              <option value="pending">Pending ({pendingCount})</option>
              <option value="failed">Approval Failed ({failedCount})</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none min-w-[130px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] cursor-pointer shadow-2xs"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="certifications">Certifications</option>
              <option value="attendance">Attendance</option>
              <option value="workshops">Workshops</option>
              <option value="extracurricular">Extracurricular</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none min-w-[140px] px-3.5 py-2 pr-8 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb] cursor-pointer shadow-2xs"
            >
              <option value="newest">Sort: Latest First</option>
              <option value="points-high">Sort: Highest Points</option>
              <option value="points-low">Sort: Lowest Points</option>
              <option value="title-asc">Sort: Title (A-Z)</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* View Mode Toggle Buttons (Last, Right Corner) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Grid View"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-50 text-[#2563eb] border border-blue-200 shadow-2xs"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              title="List View"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-blue-50 text-[#2563eb] border border-blue-200 shadow-2xs"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Credit Points History Showcase */}
      {viewMode === "grid" ? (
        <div className="space-y-4">
          {sortedHistory.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50">
              <Award size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="font-semibold text-gray-600">No credit point records found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or status/category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedHistory.map((item) => {
                const isApproved = item.status === "Approved";
                const isPending = item.status === "Pending";
                const isFailed = item.status === "Approval Failed";

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border ${
                      isFailed
                        ? "border-rose-200 shadow-sm hover:border-rose-300"
                        : "border-slate-200/90 shadow-md shadow-slate-200/50 hover:border-blue-300"
                    } p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group`}
                  >
                    <div>
                      {/* Card Top: Category Icon & Status Badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xs">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-700 block">
                              {item.category}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {item.semester}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-1">
                          {isApproved && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={12} className="stroke-[2.5]" />
                              <span>Approved</span>
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock size={12} className="stroke-[2.5]" />
                              <span>Pending</span>
                            </span>
                          )}
                          {isFailed && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle size={12} className="stroke-[2.5]" />
                              <span>Approval Failed</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Remarks */}
                      <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-1.5" title={item.title}>
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                        {item.remarks || "Extracurricular credit point record."}
                      </p>

                      {/* If Approval Failed, showcase rejection reason prominently */}
                      {isFailed && item.rejectionReason && (
                        <div className="mb-3 p-3 rounded-xl bg-rose-50/80 border border-rose-200/90 text-xs text-rose-800 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-rose-900">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>Rejection Reason:</span>
                          </div>
                          <p className="leading-relaxed text-[11px] text-rose-700">
                            {item.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Date, Issuer, Points */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar size={12} className="text-gray-400" />
                          <span>{item.date}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 truncate max-w-[170px]" title={item.issuer}>
                          {item.issuer}
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-base font-extrabold ${
                            isApproved
                              ? "text-[#2563eb]"
                              : isPending
                              ? "text-amber-600"
                              : "text-rose-500 line-through"
                          }`}
                        >
                          {isFailed ? "0 Pts" : `+${item.points} Pts`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* List / Table View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden font-['Roboto',sans-serif]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] text-white text-xs font-bold uppercase tracking-wider select-none">
                  <th className="py-3.5 px-5 text-left w-[32%] min-w-[240px] whitespace-nowrap">Activity / Certificate</th>
                  <th className="py-3.5 px-4 text-center w-[15%] min-w-[130px] whitespace-nowrap">Category</th>
                  <th className="py-3.5 px-4 text-center w-[13%] min-w-[110px] whitespace-nowrap">Semester</th>
                  <th className="py-3.5 px-4 text-center w-[18%] min-w-[160px] whitespace-nowrap">Date &amp; Issuer</th>
                  <th className="py-3.5 px-4 text-center w-[10%] min-w-[90px] whitespace-nowrap">Points</th>
                  <th className="py-3.5 px-5 text-center w-[12%] min-w-[130px] whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {sortedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      No credit point records found.
                    </td>
                  </tr>
                ) : (
                  sortedHistory.map((item) => {
                    const isApproved = item.status === "Approved";
                    const isPending = item.status === "Pending";
                    const isFailed = item.status === "Approval Failed";

                    return (
                      <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3.5 px-5 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 leading-snug">{item.title}</p>
                              {item.remarks && (
                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.remarks}</p>
                              )}
                              {isFailed && item.rejectionReason && (
                                <p className="text-[11px] text-rose-600 font-medium mt-0.5 line-clamp-1">
                                  ⚠️ {item.rejectionReason}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center align-middle">
                          <span className="font-semibold text-gray-700 text-xs">{item.category}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center align-middle">
                          <span className="font-medium text-gray-500 text-xs">{item.semester}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center align-middle">
                          <div className="text-xs text-gray-600 font-medium flex flex-col items-center justify-center">
                            <span className="font-semibold text-gray-800">{item.date}</span>
                            <span className="text-[11px] text-gray-400 truncate max-w-[180px]">{item.issuer}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center align-middle">
                          <span
                            className={`font-extrabold text-sm ${
                              isApproved
                                ? "text-[#2563eb]"
                                : isPending
                                ? "text-amber-600"
                                : "text-rose-500 line-through"
                            }`}
                          >
                            {isFailed ? "0 Pts" : `+${item.points} Pts`}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-center align-middle">
                          {isApproved && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={12} className="stroke-[2.5]" /> Approved
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock size={12} className="stroke-[2.5]" /> Pending
                            </span>
                          )}
                          {isFailed && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle size={12} className="stroke-[2.5]" /> Approval Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
