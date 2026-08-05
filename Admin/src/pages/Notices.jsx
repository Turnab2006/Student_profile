import { useState } from "react";
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
  SlidersHorizontal,
  Menu,
  CalendarDays,
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

const notices = [
  { id: "NTC001", title: "Semester Exam Schedule 2026",         category: "Academic",   date: "2026-05-20", status: "Active",   badgeColor: "bg-green-100 text-green-600" },
  { id: "NTC002", title: "Holiday Notice: Summer Break",         category: "General",    date: "2026-05-15", status: "Active",   badgeColor: "bg-green-100 text-green-600" },
  { id: "NTC003", title: "Library Timings Extended for Exams",   category: "Academic",   date: "2026-05-12", status: "Active",   badgeColor: "bg-green-100 text-green-600" },
  { id: "NTC004", title: "Campus Placement Drive Registration",  category: "Placement",  date: "2026-05-10", status: "Active",   badgeColor: "bg-green-100 text-green-600" },
  { id: "NTC005", title: "Hostel Fee Payment Deadline",          category: "General",    date: "2026-05-08", status: "Draft",    badgeColor: "bg-yellow-100 text-yellow-600" },
  { id: "NTC006", title: "Faculty Meeting Schedule",             category: "Academic",   date: "2026-05-05", status: "Archived", badgeColor: "bg-gray-200 text-gray-600" },
  { id: "NTC007", title: "Blood Donation Camp",                  category: "Event",      date: "2026-05-03", status: "Active",   badgeColor: "bg-green-100 text-green-600" },
  { id: "NTC008", title: "Sports Week Announcement",             category: "Event",      date: "2026-04-28", status: "Archived", badgeColor: "bg-gray-200 text-gray-600" },
];

const stats = [
  { icon: <Bell size={22} className="text-blue-500" />,     bg: "bg-blue-50",   value: "48", label: "Total Notices",   sub: "All time" },
  { icon: <Megaphone size={22} className="text-green-600" />, bg: "bg-green-50", value: "32", label: "Active",          sub: "Published notices" },
  { icon: <FileText size={22} className="text-yellow-500" />, bg: "bg-yellow-50", value: "8",  label: "Drafts",          sub: "Awaiting publish" },
  { icon: <Archive size={22} className="text-gray-500" />,    bg: "bg-gray-100",  value: "8",  label: "Archived",        sub: "Past notices" },
];

const categoryColors = {
  Academic:  "bg-purple-100 text-purple-600",
  General:   "bg-blue-100 text-blue-600",
  Placement: "bg-teal-100 text-teal-600",
  Event:     "bg-orange-100 text-orange-600",
};

function FilterDropdown({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none min-w-[150px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-300"
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

export default function Notices({ onNavigate }) {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredNotices = notices.filter((notice) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      notice.id.toLowerCase().includes(searchText) ||
      notice.title.toLowerCase().includes(searchText) ||
      notice.category.toLowerCase().includes(searchText);

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
    setSelected((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onNavigate?.("dashboard")} className="text-gray-500 hover:text-gray-700 transition-colors lg:hidden">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Notices</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage announcements and notices</p>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search notices by title, category..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <FilterDropdown value={categoryFilter} onChange={setCategoryFilter} options={[{ value: "all", label: "All Categories" }, { value: "Academic", label: "Academic" }, { value: "General", label: "General" }, { value: "Placement", label: "Placement" }, { value: "Event", label: "Event" }]} />
          <FilterDropdown value={statusFilter} onChange={setStatusFilter} options={[{ value: "all", label: "All Status" }, { value: "Active", label: "Active" }, { value: "Draft", label: "Draft" }, { value: "Archived", label: "Archived" }]} />
          <button onClick={() => onNavigate?.("add-notice")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap">
            <Plus size={15} />
            Create Notice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-lg font-bold text-gray-800 leading-tight">{s.value}</p>
                <p className="text-[11px] font-medium text-gray-600">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">Showing {visibleNotices.length} of {notices.length} notices</p>
            <div className="flex items-center gap-2">
              <FilterDropdown value={sortBy} onChange={setSortBy} options={[{ value: "newest", label: "Sort by: Newest" }, { value: "oldest", label: "Sort by: Oldest" }, { value: "title-asc", label: "Sort by: Title (A-Z)" }, { value: "title-desc", label: "Sort by: Title (Z-A)" }]} />
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="rounded border-gray-300 accent-primary" />
                  </th>
                  {["Notice ID", "Title", "Category", "Published Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visibleNotices.map((n) => (
                  <tr key={n.id} className={`hover:bg-gray-50/60 transition-colors ${selected.includes(n.id) ? "bg-green-50/40" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleOne(n.id)} className="rounded border-gray-300 accent-primary" />
                    </td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{n.id}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-800">{n.title}</span>
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
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${n.badgeColor}`}>{n.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors">View</button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreHorizontal size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Show</span>
              <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">10 <ChevronDown size={11} /></button>
              <span>per page</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft size={14} className="text-gray-500" /></button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 text-xs rounded font-medium transition-colors ${p === 1 ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button className="w-7 h-7 text-xs rounded font-medium text-gray-500 hover:bg-gray-100">5</button>
              <button className="p-1.5 rounded hover:bg-gray-100"><ChevronRight size={14} className="text-gray-500" /></button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Go to page</span>
              <input type="number" defaultValue={1} className="w-12 border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-green-300" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
