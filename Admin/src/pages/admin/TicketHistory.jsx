import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Menu,
  Ticket,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Activity,
  FileText,
  Eye,
  ShieldCheck,
  Tag,
  User,
  CalendarDays,
  X,
  ExternalLink,
  Plus,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredTickets, saveStoredTickets } from "../../data/ticketData";

const categoryBadgeColors = {
  Academic:   "bg-purple-100 text-purple-700 border border-purple-200",
  Attendance: "bg-blue-100 text-blue-700 border border-blue-200",
  Results:    "bg-teal-100 text-teal-700 border border-teal-200",
  Mentors:    "bg-indigo-100 text-indigo-700 border border-indigo-200",
  System:     "bg-rose-100 text-rose-700 border border-rose-200",
  General:    "bg-slate-100 text-slate-700 border border-slate-200",
};

const priorityStyles = {
  Urgent: "bg-rose-100 text-rose-700 border border-rose-200",
  High:   "bg-amber-100 text-amber-700 border border-amber-200",
  Medium: "bg-blue-100 text-blue-700 border border-blue-200",
  Low:    "bg-slate-100 text-slate-700 border border-slate-200",
};

const statusStyles = {
  Resolved:       "bg-green-100 text-green-700 border border-green-200",
  "In Progress":  "bg-amber-100 text-amber-700 border border-amber-200",
  "Under Review": "bg-blue-100 text-blue-700 border border-blue-200",
  Closed:         "bg-gray-100 text-gray-600 border border-gray-200",
};

function FilterDropdown({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none min-w-[135px] px-3.5 py-2.5 pr-8 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-2xs"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default function TicketHistory({ onNavigate, onOpenSidebar, isMentor = false }) {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState("");

  useEffect(() => {
    setTickets(getStoredTickets());
  }, []);

  const handleBackToSupport = () => {
    if (onNavigate) onNavigate("support");
  };

  const handleCopyTicket = (id) => {
    navigator.clipboard?.writeText?.(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Stats calculation
  const totalCount = tickets.length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const underReviewCount = tickets.filter((t) => t.status === "Under Review").length;

  const stats = [
    {
      label: "TOTAL TICKETS",
      value: String(totalCount),
      sub: "Historical requests",
      icon: <Ticket size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
      borderAccent: "border-l-blue-500",
    },
    {
      label: "RESOLVED",
      value: String(resolvedCount),
      sub: "Successfully closed",
      icon: <CheckCircle2 size={22} className="text-[#0da651]" />,
      bg: "bg-emerald-50",
      borderAccent: "border-l-emerald-500",
    },
    {
      label: "IN PROGRESS",
      value: String(inProgressCount),
      sub: "Under investigation",
      icon: <Clock size={22} className="text-amber-600" />,
      bg: "bg-amber-50",
      borderAccent: "border-l-amber-500",
    },
    {
      label: "UNDER REVIEW",
      value: String(underReviewCount),
      sub: "Pending initial review",
      icon: <Activity size={22} className="text-purple-600" />,
      bg: "bg-purple-50",
      borderAccent: "border-l-purple-500",
    },
  ];

  // Filtering
  const filteredTickets = tickets.filter((ticket) => {
    const s = query.trim().toLowerCase();
    const matchesQuery =
      !s ||
      ticket.id.toLowerCase().includes(s) ||
      ticket.subject.toLowerCase().includes(s) ||
      (ticket.submitter && ticket.submitter.toLowerCase().includes(s)) ||
      (ticket.category && ticket.category.toLowerCase().includes(s));

    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;

    return matchesQuery && matchesCategory && matchesPriority && matchesStatus;
  });

  // Sorting
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return a.date.localeCompare(b.date);
      case "priority-high": {
        const pMap = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
        return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
      }
      case "subject-az":
        return a.subject.localeCompare(b.subject);
      case "newest":
      default:
        return b.date.localeCompare(a.date);
    }
  });

  // Pagination
  const totalItems = sortedTickets.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedTickets = sortedTickets.slice(startIndex, endIndex);

  const visibleIds = paginatedTickets.map((t) => t.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedTickets.includes(id));

  const toggleAll = () =>
    setSelectedTickets((prev) =>
      allVisibleSelected ? prev.filter((id) => !visibleIds.includes(id)) : Array.from(new Set([...prev, ...visibleIds]))
    );

  const toggleOne = (id) =>
    setSelectedTickets((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const p = parseInt(jumpPage, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setCurrentPage(p);
      setJumpPage("");
    }
  };

  return (
    <div className={`flex-1 ${isMentor ? "w-full" : "h-full flex flex-col overflow-hidden bg-gray-50/50 font-['Roboto',sans-serif]"}`}>
      {/* Top Header */}
      {!isMentor && (
        <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0 pr-2">
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
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Ticket History</h1>
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer font-medium" onClick={handleBackToSupport}>
                  Support Center
                </span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Ticket History</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      {/* Main Container */}
      <main className={isMentor ? "p-2 sm:px-5 sm:py-2.5 space-y-5 pb-10" : "flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 font-['Roboto',sans-serif]"}>
        
        {/* Upper Green Hero Header */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-6 py-5 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative z-10 flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleBackToSupport}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 border border-white/25 shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Back to Support"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Support Ticket Archive &amp; Audit Log
              </h2>
              <p className="text-xs text-emerald-50/90 font-normal mt-0.5 max-w-xl">
                Comprehensive historical log of all inquiries, technical reports, and resolution timestamps.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate("support");
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0da651] hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Plus size={15} className="stroke-[2.5]" />
              <span>Raise New Ticket</span>
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        </section>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] ${s.borderAccent} shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${s.bg} border border-gray-100 shadow-2xs`}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 tracking-tight my-0.5">{s.value}</p>
                <p className="text-xs text-gray-400 font-normal truncate">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar with Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              placeholder="Search by ticket ID, subject, submitter..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-xl text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {/* Category Filter */}
            <FilterDropdown
              value={categoryFilter}
              onChange={(val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { value: "all", label: "All Categories" },
                { value: "Academic", label: "Academic" },
                { value: "Attendance", label: "Attendance" },
                { value: "Results", label: "Results" },
                { value: "Mentors", label: "Mentors" },
                { value: "System", label: "System" },
              ]}
            />

            {/* Priority Filter */}
            <FilterDropdown
              value={priorityFilter}
              onChange={(val) => {
                setPriorityFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { value: "all", label: "All Priorities" },
                { value: "Urgent", label: "Urgent" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
            />

            {/* Status Filter */}
            <FilterDropdown
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { value: "all", label: "All Status" },
                { value: "Resolved", label: "Resolved" },
                { value: "In Progress", label: "In Progress" },
                { value: "Under Review", label: "Under Review" },
              ]}
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-5 py-3.5 border-b border-gray-100 bg-white">
            <p className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-gray-800">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{" "}
              <strong className="text-gray-800">{endIndex}</strong> of{" "}
              <strong className="text-gray-800">{totalItems}</strong> support tickets
            </p>
            <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
              <FilterDropdown
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: "newest", label: "Sort by: Newest" },
                  { value: "oldest", label: "Sort by: Oldest" },
                  { value: "priority-high", label: "Sort by: Priority (High-to-Low)" },
                  { value: "subject-az", label: "Sort by: Subject (A-Z)" },
                ]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] text-white text-xs font-bold uppercase tracking-wider">
                  <th className="w-10 py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleAll}
                      className="rounded border-white/40 accent-emerald-800 cursor-pointer"
                    />
                  </th>
                  <th className="w-36 min-w-[130px] py-3.5 px-4 text-center">TICKET ID</th>
                  <th className="py-3.5 px-4 text-left max-w-xs sm:max-w-md">SUBJECT &amp; DETAILS</th>
                  <th className="w-28 min-w-[100px] py-3.5 px-4 text-center">CATEGORY</th>
                  <th className="w-28 min-w-[100px] py-3.5 px-4 text-center">PRIORITY</th>
                  <th className="w-32 min-w-[110px] py-3.5 px-4 text-center">DATE LOGGED</th>
                  <th className="w-32 min-w-[110px] py-3.5 px-4 text-center">STATUS</th>
                  <th className="w-28 min-w-[100px] py-3.5 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                      No support tickets found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedTickets.map((t) => {
                    const isSelected = selectedTickets.includes(t.id);
                    return (
                      <tr
                        key={t.id}
                        className={`hover:bg-emerald-50/40 transition-colors ${
                          isSelected ? "bg-emerald-50/60" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOne(t.id)}
                            className="rounded border-gray-300 accent-primary cursor-pointer"
                          />
                        </td>

                        {/* Ticket ID */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-900 text-xs sm:text-sm tracking-wide">
                          {t.id}
                        </td>

                        {/* Subject & Summary */}
                        <td className="py-3.5 px-4 text-left max-w-xs sm:max-w-md">
                          <div className="flex flex-col">
                            <span
                              onClick={() => setViewingTicket(t)}
                              className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 hover:text-[#0da651] cursor-pointer transition-colors"
                              title={t.subject}
                            >
                              {t.subject}
                            </span>
                            <span className="text-[11px] text-gray-500 line-clamp-1 truncate mt-0.5">
                              {t.description || (t.submitter ? `Submitted by ${t.submitter}` : "Support inquiry")}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                              categoryBadgeColors[t.category] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {t.category}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                              priorityStyles[t.priority] || priorityStyles.Medium
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>

                        {/* Date Logged */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 font-medium">
                            <CalendarDays size={13} className="text-gray-400 shrink-0" />
                            <span>{t.date}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              statusStyles[t.status] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>

                        {/* Action: Track / View */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setViewingTicket(t)}
                            className="text-[11px] font-bold text-[#0da651] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1 cursor-pointer border border-emerald-200/60 shadow-2xs active:scale-95"
                          >
                            <Eye size={12} />
                            <span>Track</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Standard 3-Part Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-white gap-3">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronLeft size={15} className="text-gray-500" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) {
                    acc.push("ellipsis-" + p);
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((item) =>
                  typeof item === "string" ? (
                    <span key={item} className="text-xs text-gray-400 px-1">
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCurrentPage(item)}
                      className={`w-7 h-7 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                        currentPage === item
                          ? "bg-[#0da651] text-white shadow-2xs"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronRight size={15} className="text-gray-500" />
              </button>
            </div>

            {/* Jump to page */}
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-2 text-xs text-gray-500">
              <span>Go to page</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                placeholder={String(currentPage)}
                className="w-12 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </form>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* RICH TICKET TRACKING DETAIL MODAL (Fixed Scrollbar & Sticky Header/Footer) */}
      {/* ========================================================================= */}
      {viewingTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden font-['Roboto',sans-serif]">
            
            {/* Fixed Sticky Header */}
            <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-gray-100 bg-white shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-extrabold px-3 py-1 rounded-xl bg-emerald-50 text-[#09803d] border border-emerald-200 shadow-2xs flex items-center gap-1.5">
                  <span>{viewingTicket.id}</span>
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${categoryBadgeColors[viewingTicket.category] || "bg-gray-100 text-gray-700"}`}>
                  {viewingTicket.category}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${priorityStyles[viewingTicket.priority] || priorityStyles.Medium}`}>
                  {viewingTicket.priority} Priority
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold px-3.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyles[viewingTicket.status]}`}>
                  <span className={`w-2 h-2 rounded-full ${viewingTicket.status === "Resolved" ? "bg-emerald-600" : viewingTicket.status === "In Progress" ? "bg-amber-600 animate-pulse" : "bg-blue-600"}`} />
                  <span>{viewingTicket.status}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setViewingTicket(null)}
                  className="w-9 h-9 rounded-xl bg-gray-100/80 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center cursor-pointer transition-all active:scale-95 ml-1"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Inset Scrollable Body (Contained strictly inside rounded bounds) */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
              {/* Title & Metadata Strip */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                  {viewingTicket.subject}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-gray-400" />
                    <span>Logged on <strong className="text-gray-700 font-semibold">{viewingTicket.date}</strong></span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-gray-400" />
                    <span>Submitted by <strong className="text-gray-700 font-semibold">{viewingTicket.submitter || "Student / User"}</strong></span>
                  </div>
                  {viewingTicket.department && (
                    <>
                      <span>•</span>
                      <span className="text-gray-500 font-medium">{viewingTicket.department}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Issue Description Card */}
              <div className="rounded-2xl bg-gray-50/80 border border-gray-200/80 p-5 space-y-1.5 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Issue Description &amp; Details
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  {viewingTicket.description || "No additional description details provided for this inquiry."}
                </p>
              </div>

              {/* Live Resolution Timeline */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock size={16} className="text-emerald-600" />
                    <span>Live Resolution Progress Timeline</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    Realtime Sync
                  </span>
                </div>

                <div className="relative pl-7 sm:pl-8 space-y-5 border-l-2 border-emerald-300 ml-3 py-1.5">
                  {(viewingTicket.timeline || [
                    { step: "Ticket Submitted", desc: "Inquiry logged and assigned to department queue.", time: `${viewingTicket.date} 10:00 AM`, completed: true },
                    { step: "Triage & Review", desc: "Under review by assigned coordinator.", time: `${viewingTicket.date} 02:30 PM`, completed: true },
                    { step: "Action & Investigation", desc: "Verifying portal ledger records and system logs.", time: "In Progress", completed: viewingTicket.status === "Resolved" },
                    { step: "Final Resolution", desc: "Issue successfully resolved and confirmed.", time: "Pending", completed: viewingTicket.status === "Resolved" },
                  ]).map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[35px] sm:-left-[39px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ${
                          step.completed
                            ? "bg-[#0da651] ring-emerald-100 text-white"
                            : "bg-gray-300 ring-gray-100 text-transparent"
                        }`}
                      >
                        {step.completed && <Check size={11} className="stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className={`text-xs sm:text-sm font-bold ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                            {step.step}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-normal">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpdesk Assignment Card */}
              <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#f0fdf4] via-[#f0fdf4] to-emerald-50/70 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                      Assigned Desk &amp; Officer
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {viewingTicket.assignedTo || "Academic & Technical Help Desk"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-bold text-[#09803d] bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{viewingTicket.estimatedResolution || "Est. 24-48 hrs"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Fixed Sticky Footer */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50/70 shrink-0">
              <button
                type="button"
                onClick={() => handleCopyTicket(viewingTicket.id)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                {copiedId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedId ? "ID Copied!" : "Copy Ticket ID"}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingTicket(null)}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Close Tracking View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
