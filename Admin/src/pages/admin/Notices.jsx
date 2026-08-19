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
  MoreHorizontal,
  Menu,
  CalendarDays,
  Eye,
  Trash2,
  X,
  User,
  Users,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredNotices, saveStoredNotices } from "../../data/noticesData";

const categoryColors = {
  Academic:  "bg-purple-100 text-purple-600 border border-purple-200",
  General:   "bg-blue-100 text-blue-600 border border-blue-200",
  Placement: "bg-teal-100 text-teal-600 border border-teal-200",
  Event:     "bg-orange-100 text-orange-600 border border-orange-200",
  Exam:      "bg-rose-100 text-rose-600 border border-rose-200",
  Holiday:   "bg-emerald-100 text-emerald-600 border border-emerald-200",
};

function FilterDropdown({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none min-w-[150px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default function Notices({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  const [noticesList, setNoticesList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewingNotice, setViewingNotice] = useState(null);

  useEffect(() => {
    setNoticesList(getStoredNotices());
  }, []);

  const handleSaveNotices = (updated) => {
    setNoticesList(updated);
    saveStoredNotices(updated);
  };

  const handleDeleteNotice = (id) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      const updated = noticesList.filter((n) => n.id !== id);
      handleSaveNotices(updated);
      if (viewingNotice?.id === id) setViewingNotice(null);
    }
  };

  // Stats calculation
  const totalNotices = noticesList.length;
  const activeNotices = noticesList.filter((n) => n.status === "Active").length;
  const draftNotices = noticesList.filter((n) => n.status === "Draft").length;
  const archivedNotices = noticesList.filter((n) => n.status === "Archived").length;

  const stats = [
    { icon: <Bell size={22} className="text-blue-500" />, bg: "bg-blue-50", value: String(totalNotices), label: "Total Notices", sub: "All time" },
    { icon: <Megaphone size={22} className="text-green-600" />, bg: "bg-green-50", value: String(activeNotices), label: "Active", sub: "Published notices" },
    { icon: <FileText size={22} className="text-yellow-500" />, bg: "bg-yellow-50", value: String(draftNotices), label: "Drafts", sub: "Awaiting publish" },
    { icon: <Archive size={22} className="text-gray-500" />, bg: "bg-gray-100", value: String(archivedNotices), label: "Archived", sub: "Past notices" },
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
    const matchesStatus = statusFilter === "all" || notice.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
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

  const visibleNotices = sortedNotices;
  const visibleNoticeIds = visibleNotices.map((notice) => notice.id);
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

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50/50">
      {!isMentor && (
        <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Notices</h1>
              <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Manage announcements and notices</p>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search notices by title, category..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <FilterDropdown
            value={categoryFilter}
            onChange={setCategoryFilter}
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
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Draft", label: "Draft" },
              { value: "Archived", label: "Archived" },
            ]}
          />
          <button
            onClick={() => onNavigate?.("add-notice")}
            className="flex items-center gap-2 px-4 py-2 bg-[#0da651] text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} />
            Create Notice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/90 shadow-md shadow-slate-200/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0 border border-slate-100/80 shadow-2xs`}>{s.icon}</div>
              <div className="overflow-hidden">
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-600 truncate">{s.label}</p>
                <p className="text-[10px] text-gray-400 truncate">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 shrink-0">Showing {visibleNotices.length} of {noticesList.length} notices</p>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="rounded border-gray-300 accent-primary cursor-pointer" />
                  </th>
                  {["Notice ID", "Title", "Category", "Published Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visibleNotices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                      No notices found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  visibleNotices.map((n) => {
                    const badgeClass =
                      n.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : n.status === "Draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600";
                    return (
                      <tr key={n.id} className={`hover:bg-gray-50/60 transition-colors ${selected.includes(n.id) ? "bg-green-50/40" : ""}`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleOne(n.id)} className="rounded border-gray-300 accent-primary cursor-pointer" />
                        </td>
                        <td className="px-3 py-3 text-xs font-semibold text-gray-700">{n.id}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-800 line-clamp-1">{n.title}</span>
                            <span className="text-[11px] text-gray-400 line-clamp-1">{n.content}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${categoryColors[n.category] ?? "bg-gray-100 text-gray-600"}`}>{n.category}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CalendarDays size={12} />
                            {n.date}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>{n.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingNotice(n)}
                              className="text-[11px] font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Eye size={12} /> View
                            </button>
                            <button
                              onClick={() => handleDeleteNotice(n.id)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                              title="Delete Notice"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show 10 per page</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50"><ChevronLeft size={14} className="text-gray-500" /></button>
              <button className="w-7 h-7 text-xs rounded font-medium bg-[#0da651] text-white">1</button>
              <button className="p-1.5 rounded hover:bg-gray-100"><ChevronRight size={14} className="text-gray-500" /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Notice Detail View Modal */}
      {viewingNotice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setViewingNotice(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${categoryColors[viewingNotice.category] || "bg-gray-100 text-gray-600"}`}>
                {viewingNotice.category}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                viewingNotice.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {viewingNotice.status}
              </span>
              <span className="text-xs text-gray-400 font-mono ml-auto mr-6">{viewingNotice.id}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">{viewingNotice.title}</h3>

            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl mb-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-gray-400" />
                <span>Date: <strong className="text-gray-800">{viewingNotice.date}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-gray-400" />
                <span>Author: <strong className="text-gray-800">{viewingNotice.author || "Admin"}</strong></span>
              </div>
              {viewingNotice.audience && (
                <div className="flex items-center gap-1.5 col-span-2">
                  <Users size={14} className="text-gray-400" />
                  <span>Audience: <strong className="text-gray-800">{viewingNotice.audience}</strong></span>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notice Content</h4>
              <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xl text-sm text-gray-700 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {viewingNotice.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={() => handleDeleteNotice(viewingNotice.id)}
                className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} /> Delete Notice
              </button>
              <button
                onClick={() => setViewingNotice(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs rounded-xl cursor-pointer transition-all"
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
