import { useState } from "react";
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
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

const activities = [
  { id: "ACT001", title: "TECHNOVATE 2026",          type: "Technical",      date: "2026-05-17", time: "04:30 AM", venue: "RCCIIT", status: "Upcoming",   registered: 234, badgeColor: "bg-purple-100 text-purple-600", image: "https://via.placeholder.com/120x60?text=Techno", description: "Showcase innovation, creativity, and technical excellence among students and professionals." },
  { id: "ACT002", title: "Annual Startup Speech 2026",   type: "Career",   date: "2026-05-25", time: "05:30 AM", venue: "Seminar Hall, RCCIIT", status: "Upcoming",   registered: 89,  badgeColor: "bg-pink-100 text-pink-600", image: "https://via.placeholder.com/120x60?text=Startup", description: "An inspiring startup event featuring successful entrepreneurs and innovative ideas." },
  { id: "ACT003", title: "Annual Sports Meet 2026",              type: "Sports",  date: "2026-06-01", time: "10:00 AM", venue: "College Sport Complex", status: "Upcoming",    registered: 156, badgeColor: "bg-cyan-100 text-cyan-600", image: "https://via.placeholder.com/120x60?text=Sports", description: "A celebration of teamwork, determination, and athletic excellence." },
  { id: "ACT004", title: "Cultural Fest 2026",                 type: "Cultural",      date: "2026-06-10", time: "06:00 PM", venue: "Main Auditorium", status: "Upcoming",  registered: 412, badgeColor: "bg-yellow-100 text-yellow-600", image: "https://via.placeholder.com/120x60?text=Cultural", description: "Experience diversity, art, music and cultural performances." },
  { id: "ACT005", title: "AI Workshop for Students",   type: "Academics",  date: "2026-06-15", time: "02:00 PM", venue: "Lab 3, RCCIIT", status: "Upcoming",  registered: 67,  badgeColor: "bg-green-100 text-green-600", image: "https://via.placeholder.com/120x60?text=AI", description: "Hands-on workshop to explore the future of Artificial Intelligence." },
  { id: "ACT006", title: "Coding Challenge 2026",      type: "Technical",   date: "2026-06-20", time: "11:00 AM", venue: "Computer Lab", status: "Upcoming",  registered: 45,  badgeColor: "bg-purple-100 text-purple-600", image: "https://via.placeholder.com/120x60?text=Coding", description: "Test your coding skills and compete with the best." },
  { id: "ACT007", title: "Blood Donation Camp",      type: "Campaign", date: "2026-05-28", time: "09:00 AM", venue: "Campus Health Center", status: "Completed",  registered: 156, badgeColor: "bg-orange-100 text-orange-600", image: "https://via.placeholder.com/120x60?text=Blood", description: "Join to save lives — camp organized with local blood bank." },
  { id: "ACT008", title: "Industrial Visit: Tech Park",      type: "Trip",      date: "2026-06-05", time: "08:00 AM", venue: "Tech Park", status: "Cancelled",  registered: 0,   badgeColor: "bg-red-100 text-red-600", image: "https://via.placeholder.com/120x60?text=Visit", description: "A guided visit to local tech companies and startups." },
];

const typeColors = {
  Event:    "bg-purple-100 text-purple-600",
  Seminar:  "bg-teal-100 text-teal-600",
  Campaign: "bg-orange-100 text-orange-600",
  Workshop: "bg-pink-100 text-pink-600",
  Trip:     "bg-cyan-100 text-cyan-600",
};

const stats = [
  { icon: <Megaphone size={22} className="text-blue-500" />,     bg: "bg-blue-50",   value: "24", label: "Total Activities",   sub: "All time" },
  { icon: <CalendarCheck size={22} className="text-green-600" />, bg: "bg-green-50", value: "8",  label: "Upcoming",          sub: "Scheduled activities" },
  { icon: <Clock size={22} className="text-yellow-500" />,       bg: "bg-yellow-50", value: "3",  label: "Ongoing",           sub: "In progress" },
  { icon: <Trophy size={22} className="text-purple-500" />,      bg: "bg-purple-50", value: "13", label: "Completed",         sub: "Past activities" },
];

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

export default function Activities({ onNavigate }) {
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredActivities = activities.filter((activity) => {
    const searchText = query.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      activity.title.toLowerCase().includes(searchText) ||
      activity.type.toLowerCase().includes(searchText) ||
      activity.venue.toLowerCase().includes(searchText);

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
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-gray-500" />
          <div>
            <h1 className="text-base font-semibold text-gray-800">Activities</h1>
            <p className="text-xs text-gray-400">Manage campus activities and events</p>
          </div>
        </div>
        <AdminProfile />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search activities by title, type..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <FilterDropdown value={typeFilter} onChange={setTypeFilter} options={[{ value: "all", label: "All Types" }, { value: "Technical", label: "Technical" }, { value: "Career", label: "Career" }, { value: "Sports", label: "Sports" }, { value: "Cultural", label: "Cultural" }, { value: "Academics", label: "Academics" }, { value: "Campaign", label: "Campaign" }, { value: "Trip", label: "Trip" }]} />
          <FilterDropdown value={statusFilter} onChange={setStatusFilter} options={[{ value: "all", label: "All Status" }, { value: "Upcoming", label: "Upcoming" }, { value: "Ongoing", label: "Ongoing" }, { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" }]} />
          <button onClick={() => onNavigate?.("add-activity")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors whitespace-nowrap">
            <Plus size={15} />
            Create Activity
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setView("grid")} className={`px-3 py-2 rounded-lg border ${view === "grid" ? "bg-gray-100" : "bg-white"}`}>Grid View</button>
            <button onClick={() => setView("list")} className={`px-3 py-2 rounded-lg border ${view === "list" ? "bg-gray-100" : "bg-white"}`}>List View</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
        <div className=""> 
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <div key={a.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-white flex items-end p-3">
                    <div className="bg-white/60 px-2 py-1 rounded text-[11px] font-semibold text-gray-700">{a.type}</div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-800">{a.title}</h3>
                        <div className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${a.badgeColor}`}>{a.status}</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-2"><CalendarDays size={14} /> {a.date}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users size={14} className="text-gray-400" /> {a.registered} registered
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onNavigate?.("view-activity", a)} className="text-[12px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors">View</button>
                        <button className="text-[12px] font-semibold text-primary border border-primary px-3 py-1 rounded-full">Edit</button>
                        <button className="text-[12px] font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500">Showing {visibleActivities.length} of {activities.length} activities</p>
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
                      {["Activity", "Type", "Date & Time", "Venue", "Actions"].map((h) => (
                        <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {visibleActivities.map((a) => (
                      <tr key={a.id} className={`hover:bg-gray-50/60 transition-colors ${selected.includes(a.id) ? "bg-green-50/40" : ""}`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggleOne(a.id)} className="rounded border-gray-300 accent-primary" />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <img src={a.image} alt="thumb" className="w-28 h-14 object-cover rounded-md" />
                            <div>
                              <div className="text-sm font-semibold text-gray-800">{a.title}</div>
                              <div className="text-xs text-gray-500 mt-1 max-w-[420px]">{a.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${a.badgeColor}`}>{a.type}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col text-xs text-gray-600">
                            <div className="flex items-center gap-2"><CalendarDays size={14} className="text-green-500" /> {a.date}</div>
                            <div className="flex items-center gap-2 mt-1"><Clock size={14} className="text-gray-400" /> {a.time}</div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2 text-xs text-gray-600"><MapPin size={14} className="text-green-500" /> {a.venue}</div>
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
