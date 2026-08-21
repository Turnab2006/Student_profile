import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Bell,
  Megaphone,
  FileText,
  Archive,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Menu,
  CalendarDays,
  Eye,
  Trash2,
  Edit,
  X,
  User,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import NoticeDetailView from "./NoticeDetailView";
import { getStoredNotices, saveStoredNotices } from "../../data/noticesData";

const categoryColors = {
  Academic: "bg-purple-100 text-purple-700 border border-purple-200",
  General: "bg-blue-100 text-blue-700 border border-blue-200",
  Placement: "bg-teal-100 text-teal-700 border border-teal-200",
  Event: "bg-orange-100 text-orange-700 border border-orange-200",
  Exam: "bg-rose-100 text-rose-700 border border-rose-200",
  Holiday: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const priorityStyles = {
  Urgent: "bg-rose-100 text-rose-700 border border-rose-200",
  High: "bg-amber-100 text-amber-700 border border-amber-200",
  Medium: "bg-blue-100 text-blue-700 border border-blue-200",
  Low: "bg-slate-100 text-slate-700 border border-slate-200",
};

const statusStyles = {
  Active: "bg-green-100 text-green-700 border border-green-200",
  Draft: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

function FilterDropdown({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
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

export default function Notices({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  const [noticesList, setNoticesList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewingNotice, setViewingNotice] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpPage, setJumpPage] = useState("");

  useEffect(() => {
    setNoticesList(getStoredNotices());
  }, []);

  // Close 3-dots menus on outside click
  useEffect(() => {
    const handleClose = () => setActiveMenuId(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleSaveNotices = (updated) => {
    setNoticesList(updated);
    saveStoredNotices(updated);
  };

  const handleDeleteNotice = (id) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      const updated = noticesList.filter((n) => n.id !== id);
      handleSaveNotices(updated);
      if (viewingNotice?.id === id) setViewingNotice(null);
      showToast("Notice deleted successfully!");
    }
  };

  const handleCreateNotice = () => {
    localStorage.removeItem("trackademy_editing_notice");
    if (onNavigate) onNavigate("add-notice");
  };

  const handleEditNotice = (notice) => {
    setActiveMenuId(null);
    localStorage.setItem("trackademy_editing_notice", JSON.stringify(notice));
    if (onNavigate) onNavigate("add-notice");
  };

  // Stats calculation
  const totalNotices = noticesList.length;
  const activeNotices = noticesList.filter((n) => n.status === "Active").length;
  const draftNotices = noticesList.filter((n) => n.status === "Draft").length;
  const archivedNotices = noticesList.filter((n) => n.status === "Archived").length;

  // Stat cards matching the dashboard styling
  const stats = [
    {
      icon: <Bell size={22} className="text-blue-600" />,
      borderAccent: "border-l-blue-500",
      bg: "bg-blue-50",
      value: String(totalNotices),
      label: "TOTAL NOTICES",
      sub: "All time",
    },
    {
      icon: <Megaphone size={22} className="text-[#0da651]" />,
      borderAccent: "border-l-emerald-500",
      bg: "bg-emerald-50",
      value: String(activeNotices),
      label: "ACTIVE",
      sub: "Published notices",
    },
    {
      icon: <FileText size={22} className="text-amber-600" />,
      borderAccent: "border-l-amber-500",
      bg: "bg-amber-50",
      value: String(draftNotices),
      label: "DRAFTS",
      sub: "Awaiting publish",
    },
    {
      icon: <Archive size={22} className="text-purple-600" />,
      borderAccent: "border-l-purple-500",
      bg: "bg-purple-50",
      value: String(archivedNotices),
      label: "ARCHIVED",
      sub: "Past notices",
    },
  ];

  const filteredNotices = noticesList.filter((notice) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      notice.id.toLowerCase().includes(searchText) ||
      notice.title.toLowerCase().includes(searchText) ||
      notice.category.toLowerCase().includes(searchText) ||
      (notice.content && notice.content.toLowerCase().includes(searchText));

    const matchesCategory = categoryFilter === "all" || notice.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || notice.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || notice.status === statusFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const sortedNotices = [...filteredNotices].sort((left, right) => {
    switch (sortBy) {
      case "oldest":
        return left.date.localeCompare(right.date);
      case "title-asc":
        return left.title.localeCompare(right.title);
      case "title-desc":
        return right.title.localeCompare(left.title);
      case "newest":
      default:
        return right.date.localeCompare(left.date);
    }
  });

  // Pagination calculation
  const totalItems = sortedNotices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedNotices = sortedNotices.slice(startIndex, endIndex);

  const visibleNoticeIds = paginatedNotices.map((notice) => notice.id);
  const allVisibleSelected =
    visibleNoticeIds.length > 0 && visibleNoticeIds.every((id) => selected.includes(id));

  const toggleAll = () =>
    setSelected((prev) =>
      allVisibleSelected
        ? prev.filter((id) => !visibleNoticeIds.includes(id))
        : Array.from(new Set([...prev, ...visibleNoticeIds]))
    );

  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

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
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Top Header */}
      {!isMentor && (
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
                {viewingNotice ? "Notice Details" : "Notices"}
              </h1>
              {viewingNotice ? (
                <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <span
                    className="hover:text-gray-600 cursor-pointer font-medium"
                    onClick={() => setViewingNotice(null)}
                  >
                    Notices
                  </span>
                  <span>&gt;</span>
                  <span className="text-[#0da651] font-semibold">View Notice</span>
                </nav>
              ) : (
                <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
                  Manage campus announcements, student notices & circulars
                </p>
              )}
            </div>
          </div>
          <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
        </header>
      )}

      <main className={isMentor ? "p-2 sm:px-5 sm:py-2.5 space-y-4 pb-10" : "flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-['Roboto',sans-serif]"}>
        {/* If viewingNotice is selected, render the dedicated full NoticeDetailView */}
        {viewingNotice ? (
          <NoticeDetailView
            notice={viewingNotice}
            onBack={() => setViewingNotice(null)}
            onEdit={(n) => {
              setViewingNotice(null);
              handleEditNotice(n);
            }}
            onDelete={(id) => handleDeleteNotice(id)}
            isMentor={isMentor}
          />
        ) : (
          <>
            {/* Metric Cards Row - Standardized to Dashboard Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`bg-white p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] ${s.borderAccent} shadow-md shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${s.bg} border border-gray-100/60 shadow-2xs`}>
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

            {/* Search, Filter & Action Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Left: Search Box */}
              <div className="relative flex-1 min-w-[220px]">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  type="text"
                  placeholder="Search notices by title, ID, category..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-xl text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Right Group: Filters + Create Notice Button */}
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
                    { value: "General", label: "General" },
                    { value: "Placement", label: "Placement" },
                    { value: "Event", label: "Event" },
                    { value: "Exam", label: "Exam" },
                    { value: "Holiday", label: "Holiday" },
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
                    { value: "Active", label: "Active" },
                    { value: "Draft", label: "Draft" },
                    { value: "Archived", label: "Archived" },
                  ]}
                />

                {/* Create Notice Button */}
                <button
                  onClick={handleCreateNotice}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0da651] hover:bg-[#0c9548] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0"
                >
                  <Plus size={16} className="stroke-[2.5]" />
                  <span>Create Notice</span>
                </button>
              </div>
            </div>

            {/* Table Container matching other admin tables */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-5 py-3.5 border-b border-gray-100 bg-white">
                <p className="text-xs text-gray-500 font-medium">
                  Showing <strong className="text-gray-800">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{" "}
                  <strong className="text-gray-800">{endIndex}</strong> of{" "}
                  <strong className="text-gray-800">{totalItems}</strong> notices
                </p>
                <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
                  <FilterDropdown
                    value={sortBy}
                    onChange={setSortBy}
                    options={[
                      { value: "newest", label: "Sort by: Newest" },
                      { value: "oldest", label: "Sort by: Oldest" },
                      { value: "title-asc", label: "Sort by: Title (A-Z)" },
                      { value: "title-desc", label: "Sort by: Title (Z-A)" },
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
                      <th className="w-28 min-w-[105px] py-3.5 px-4 text-center">NOTICE ID</th>
                      <th className="py-3.5 px-4 text-left max-w-xs sm:max-w-sm">TITLE &amp; SUMMARY</th>
                      <th className="w-28 min-w-[100px] py-3.5 px-4 text-center">CATEGORY</th>
                      <th className="w-28 min-w-[100px] py-3.5 px-4 text-center">PRIORITY</th>
                      <th className="w-36 min-w-[130px] py-3.5 px-4 text-center">PUBLISHED DATE</th>
                      <th className="w-28 min-w-[90px] py-3.5 px-4 text-center">STATUS</th>
                      <th className="w-36 min-w-[130px] py-3.5 px-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {paginatedNotices.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                          No notices found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedNotices.map((n) => {
                        const isSelected = selected.includes(n.id);
                        // Summary description with character limit and ellipsis
                        const summaryText =
                          n.content && n.content.length > 70
                            ? n.content.slice(0, 70) + "..."
                            : n.content || "";

                        const priorityKey = n.priority || "Medium";

                        return (
                          <tr
                            key={n.id}
                            className={`hover:bg-emerald-50/40 transition-colors ${isSelected ? "bg-emerald-50/60" : ""
                              }`}
                          >
                            {/* Checkbox */}
                            <td className="py-3.5 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleOne(n.id)}
                                className="rounded border-gray-300 accent-primary cursor-pointer"
                              />
                            </td>

                            {/* Notice ID Column (Bold Font & Centered) */}
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-900 text-sm sm:text-[15px] tracking-wide">
                              {n.id}
                            </td>

                            {/* Title & Description Column (Reduced Width with Ellipsis Limit) */}
                            <td className="py-3.5 px-4 text-left max-w-xs sm:max-w-sm lg:max-w-md">
                              <div className="flex flex-col">
                                <span
                                  onClick={() => setViewingNotice(n)}
                                  className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 hover:text-[#0da651] cursor-pointer transition-colors"
                                  title={n.title}
                                >
                                  {n.title}
                                </span>
                                {summaryText && (
                                  <span
                                    className="text-[11px] text-gray-500 line-clamp-1 truncate mt-0.5"
                                    title={n.content}
                                  >
                                    {summaryText}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Category Column */}
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${categoryColors[n.category] ?? "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {n.category}
                              </span>
                            </td>

                            {/* Priority Column */}
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold ${priorityStyles[priorityKey] || priorityStyles.Medium
                                  }`}
                              >
                                {priorityKey}
                              </span>
                            </td>

                            {/* Published Date Column */}
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 font-medium">
                                <CalendarDays size={13} className="text-gray-400 shrink-0" />
                                <span>{n.date}</span>
                              </div>
                            </td>

                            {/* Status Column */}
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusStyles[n.status] || "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {n.status}
                              </span>
                            </td>

                            {/* Actions Column: View Button + Vertical 3-Dots Menu */}
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* View Button */}
                                <button
                                  type="button"
                                  onClick={() => setViewingNotice(n)}
                                  className="text-[11px] font-bold text-[#0da651] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer border border-emerald-200/60 shadow-2xs active:scale-95"
                                >
                                  <Eye size={12} />
                                  <span>View</span>
                                </button>

                                {/* Vertical 3-dots Menu Button */}
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(activeMenuId === n.id ? null : n.id);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer active:scale-95"
                                    title="Notice Options"
                                    aria-label="Notice Options"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {/* 3-Dots Dropdown Menu */}
                                  {activeMenuId === n.id && (
                                    <div
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute right-0 top-full mt-1 w-36 bg-white rounded-2xl border border-gray-200/90 shadow-xl p-1.5 z-40 text-left space-y-0.5 animate-in fade-in zoom-in-95 duration-150"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => handleEditNotice(n)}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0da651] rounded-xl transition-colors cursor-pointer"
                                      >
                                        <Edit size={13} className="text-emerald-600" />
                                        <span>Edit</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveMenuId(null);
                                          handleDeleteNotice(n.id);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                      >
                                        <Trash2 size={13} className="text-red-500" />
                                        <span>Delete</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
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
                {/* Left: Page Size Selector */}
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

                {/* Middle: Page Number Navigation */}
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
                          className={`w-7 h-7 text-xs rounded-lg font-bold transition-all cursor-pointer ${currentPage === item
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

                {/* Right: Go to page */}
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
          </>
        )}
      </main>
    </div>
  );
}
