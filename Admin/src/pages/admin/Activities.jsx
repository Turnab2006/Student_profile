import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Megaphone,
  CalendarCheck,
  Clock,
  Trophy,
  MoreHorizontal,
  SlidersHorizontal,
  Menu,
  CalendarDays,
  Users,
  MapPin,
  Eye,
  Trash2,
  X,
  LayoutGrid,
  List,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredActivities, saveStoredActivities } from "../../data/activitiesData";

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

export default function Activities({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  const [activitiesList, setActivitiesList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewingActivity, setViewingActivity] = useState(null);

  useEffect(() => {
    setActivitiesList(getStoredActivities());
  }, []);

  const handleSaveActivities = (updated) => {
    setActivitiesList(updated);
    saveStoredActivities(updated);
  };

  const handleDeleteActivity = (id) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      const updated = activitiesList.filter((a) => a.id !== id);
      handleSaveActivities(updated);
      if (viewingActivity?.id === id) setViewingActivity(null);
    }
  };

  // Stats calculation
  const totalActivities = activitiesList.length;
  const upcomingActivities = activitiesList.filter((a) => a.status === "Upcoming").length;
  const ongoingActivities = activitiesList.filter((a) => a.status === "Ongoing").length;
  const completedActivities = activitiesList.filter((a) => a.status === "Completed").length;

  const stats = [
    { icon: <Megaphone size={22} className="text-blue-500" />, bg: "bg-blue-50", value: String(totalActivities), label: "Total Activities", sub: "All time" },
    { icon: <CalendarCheck size={22} className="text-green-600" />, bg: "bg-green-50", value: String(upcomingActivities), label: "Upcoming", sub: "Scheduled activities" },
    { icon: <Clock size={22} className="text-yellow-500" />, bg: "bg-yellow-50", value: String(ongoingActivities), label: "Ongoing", sub: "In progress" },
    { icon: <Trophy size={22} className="text-purple-500" />, bg: "bg-purple-50", value: String(completedActivities), label: "Completed", sub: "Past activities" },
  ];

  const filteredActivities = activitiesList.filter((activity) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      activity.title.toLowerCase().includes(searchText) ||
      activity.type.toLowerCase().includes(searchText) ||
      (activity.venue && activity.venue.toLowerCase().includes(searchText));

    const matchesType = typeFilter === "all" || activity.type === typeFilter;
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedActivities = [...filteredActivities].sort((left, right) => {
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

  const visibleActivities = sortedActivities;
  const visibleActivityIds = visibleActivities.map((activity) => activity.id);
  const allVisibleSelected =
    visibleActivityIds.length > 0 && visibleActivityIds.every((id) => selected.includes(id));

  const toggleAll = () =>
    setSelected((prev) =>
      allVisibleSelected
        ? prev.filter((id) => !visibleActivityIds.includes(id))
        : Array.from(new Set([...prev, ...visibleActivityIds]))
    );
  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50/50">
      {!isMentor && (
        <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
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
            <div className="min-w-0 pr-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Activities</h1>
              <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Manage campus activities and events</p>
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
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search activities by title, type..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <FilterDropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: "all", label: "All Types" },
              { value: "Technical", label: "Technical" },
              { value: "Career", label: "Career" },
              { value: "Sports", label: "Sports" },
              { value: "Cultural", label: "Cultural" },
              { value: "Academics", label: "Academics" },
              { value: "Campaign", label: "Campaign" },
              { value: "Trip", label: "Trip" },
            ]}
          />
          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Status" },
              { value: "Upcoming", label: "Upcoming" },
              { value: "Ongoing", label: "Ongoing" },
              { value: "Completed", label: "Completed" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
          <button
            onClick={() => onNavigate?.("add-activity")}
            className="flex items-center gap-2 px-4 py-2 bg-[#0da651] text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} />
            Create Activity
          </button>

          <div className="ml-auto flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-gray-100 text-[#0da651]" : "text-gray-400 hover:text-gray-600"}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-gray-100 text-[#0da651]" : "text-gray-400 hover:text-gray-600"}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

        {/* Activities list / grid */}
        <div>
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleActivities.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
                  No activities found matching your criteria.
                </div>
              ) : (
                visibleActivities.map((a) => (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 relative overflow-hidden flex items-end p-3">
                      {a.image && <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />}
                      <div className="relative z-10 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-bold text-white tracking-wide">
                        {a.type}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{a.title}</h3>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                            a.status === "Upcoming" ? "bg-green-100 text-green-700" :
                            a.status === "Ongoing" ? "bg-yellow-100 text-yellow-700" :
                            a.status === "Completed" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
                          }`}>
                            {a.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">{a.description}</p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <p className="flex items-center gap-2"><CalendarDays size={14} className="text-emerald-600" /> {a.date} {a.time ? `at ${a.time}` : ""}</p>
                          <p className="flex items-center gap-2"><MapPin size={14} className="text-emerald-600" /> {a.venue || "Campus Venue"}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <Users size={14} className="text-gray-400" /> {a.registered || 0} registered
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewingActivity(a)}
                            className="text-[11px] font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Eye size={12} /> View
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(a.id)}
                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                            title="Delete Activity"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500">Showing {visibleActivities.length} of {activitiesList.length} activities</p>
                <div className="flex items-center gap-2">
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
                      {["Activity", "Type", "Date & Time", "Venue", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {visibleActivities.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
                          No activities found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleActivities.map((a) => (
                        <tr key={a.id} className={`hover:bg-gray-50/60 transition-colors ${selected.includes(a.id) ? "bg-green-50/40" : ""}`}>
                          <td className="px-4 py-3">
                            <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggleOne(a.id)} className="rounded border-gray-300 accent-primary cursor-pointer" />
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              {a.image ? (
                                <img src={a.image} alt={a.title} className="w-16 h-10 object-cover rounded-lg shrink-0 border border-gray-100" />
                              ) : (
                                <div className="w-16 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                                  ACT
                                </div>
                              )}
                              <div>
                                <div className="text-xs font-bold text-gray-800">{a.title}</div>
                                <div className="text-[11px] text-gray-400 line-clamp-1 max-w-[300px]">{a.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                              {a.type}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex flex-col text-xs text-gray-600">
                              <div className="flex items-center gap-1.5"><CalendarDays size={13} className="text-emerald-600" /> {a.date}</div>
                              {a.time && <div className="flex items-center gap-1.5 mt-0.5 text-gray-400"><Clock size={13} /> {a.time}</div>}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600"><MapPin size={13} className="text-emerald-600" /> {a.venue || "Campus"}</div>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              a.status === "Upcoming" ? "bg-green-100 text-green-700" :
                              a.status === "Ongoing" ? "bg-yellow-100 text-yellow-700" :
                              a.status === "Completed" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setViewingActivity(a)}
                                className="text-[11px] font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Eye size={12} /> View
                              </button>
                              <button
                                onClick={() => handleDeleteActivity(a.id)}
                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                title="Delete Activity"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Viewing Activity Modal */}
      {viewingActivity && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setViewingActivity(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                {viewingActivity.type}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                viewingActivity.status === "Upcoming" ? "bg-green-100 text-green-700" :
                viewingActivity.status === "Ongoing" ? "bg-yellow-100 text-yellow-700" :
                viewingActivity.status === "Completed" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
              }`}>
                {viewingActivity.status}
              </span>
              <span className="text-xs text-gray-400 font-mono ml-auto mr-6">{viewingActivity.id}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">{viewingActivity.title}</h3>

            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl mb-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-emerald-600" />
                <span>Date: <strong className="text-gray-800">{viewingActivity.date}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-emerald-600" />
                <span>Time: <strong className="text-gray-800">{viewingActivity.time || "N/A"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <MapPin size={14} className="text-emerald-600" />
                <span>Venue: <strong className="text-gray-800">{viewingActivity.venue || "Campus Venue"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <Users size={14} className="text-emerald-600" />
                <span>Registrations: <strong className="text-gray-800">{viewingActivity.registered || 0} Participants</strong></span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</h4>
              <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xl text-sm text-gray-700 leading-relaxed max-h-52 overflow-y-auto whitespace-pre-wrap">
                {viewingActivity.description}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={() => handleDeleteActivity(viewingActivity.id)}
                className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} /> Delete Activity
              </button>
              <button
                onClick={() => setViewingActivity(null)}
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
