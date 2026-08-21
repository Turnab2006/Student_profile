import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Megaphone,
  CalendarCheck,
  Clock,
  Trophy,
  MoreVertical,
  Menu,
  CalendarDays,
  Users,
  MapPin,
  Eye,
  Trash2,
  Edit,
  X,
  LayoutGrid,
  List,
  CheckCircle2,
  Code,
  Briefcase,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Compass,
  Calendar,
  Save,
  UserPlus,
  Check,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import ActivityDetailView from "./ActivityDetailView";
import { getStoredActivities, saveStoredActivities } from "../../data/activitiesData";

const MENTEE_OPTIONS = [
  { id: "MNT-01", name: "Tanuka Saha", roll: "CSE2024012", dept: "CSE", year: "2nd Year" },
  { id: "MNT-02", name: "Turnab Roy", roll: "CSE2024025", dept: "CSE", year: "3rd Year" },
  { id: "MNT-03", name: "Madhurima Chatterjee", roll: "ECE2024009", dept: "ECE", year: "2nd Year" },
  { id: "MNT-04", name: "Nilankur Das", roll: "EE2024015", dept: "EE", year: "3rd Year" },
  { id: "MNT-05", name: "Abhinandan Roy", roll: "CSE2024031", dept: "CSE", year: "2nd Year" },
  { id: "MNT-06", name: "Subhamita Ganguly", roll: "IT2024004", dept: "IT", year: "2nd Year" },
];

// Category Badges & Color Tones
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

// Status Badges
const statusStyles = {
  Upcoming: "bg-emerald-50 text-[#0da651] border border-emerald-200/80",
  Ongoing: "bg-amber-50 text-amber-700 border border-amber-200/80",
  Completed: "bg-purple-50 text-purple-700 border border-purple-200/80",
  Cancelled: "bg-rose-50 text-rose-700 border border-rose-200/80",
};

function FilterDropdown({ value, onChange, options, isMentor = false, isStudent = false }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`appearance-none min-w-[135px] px-3.5 py-2.5 pr-8 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50/80 transition-colors whitespace-nowrap focus:outline-none cursor-pointer shadow-2xs ${
          isStudent
            ? "focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb]"
            : isMentor
            ? "focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4]"
            : "focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default function Activities({ onNavigate, onOpenSidebar, isMentor = false, isStudent = false, user = null }) {
  const [activitiesList, setActivitiesList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewingActivity, setViewingActivity] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  // Student direct registration state
  const [studentRegisteredIds, setStudentRegisteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_student_registered_activities");
      return saved ? JSON.parse(saved) : ["EVT-001", "EVT-002", "EVT-003", "1", "2"];
    } catch (e) {
      return ["EVT-001", "EVT-002", "EVT-003", "1", "2"];
    }
  });

  // Registration Modal State for Mentor
  const [registerModalActivity, setRegisterModalActivity] = useState(null);
  const [selectedMenteesForReg, setSelectedMenteesForReg] = useState(MENTEE_OPTIONS.map((m) => m.id));

  useEffect(() => {
    setActivitiesList(getStoredActivities());
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleCloseMenus = () => setActiveMenuId(null);
    window.addEventListener("click", handleCloseMenus);
    return () => window.removeEventListener("click", handleCloseMenus);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleStudentRegisterToggle = (activity) => {
    const isReg = studentRegisteredIds.includes(activity.id);
    const nextList = isReg
      ? studentRegisteredIds.filter((id) => id !== activity.id)
      : [...studentRegisteredIds, activity.id];
    setStudentRegisteredIds(nextList);
    try {
      localStorage.setItem("trackademy_student_registered_activities", JSON.stringify(nextList));
    } catch (e) {}

    const updated = activitiesList.map((a) =>
      a.id === activity.id
        ? { ...a, registered: Math.max(0, (a.registered || 0) + (isReg ? -1 : 1)) }
        : a
    );
    handleSaveActivities(updated);

    showToast(
      !isReg
        ? `🎉 Successfully registered for ${activity.title}!`
        : `Registration cancelled for ${activity.title}`
    );
  };

  const handleOpenRegisterModal = (activity) => {
    setRegisterModalActivity(activity);
    setSelectedMenteesForReg(MENTEE_OPTIONS.map((m) => m.id));
  };

  const handleToggleMenteeReg = (id) => {
    setSelectedMenteesForReg((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllReg = () => {
    if (selectedMenteesForReg.length === MENTEE_OPTIONS.length) {
      setSelectedMenteesForReg([]);
    } else {
      setSelectedMenteesForReg(MENTEE_OPTIONS.map((m) => m.id));
    }
  };

  const handleConfirmActivityRegistration = (e) => {
    e.preventDefault();
    if (!registerModalActivity) return;
    if (selectedMenteesForReg.length === 0) {
      showToast("Please select at least one mentee to register.");
      return;
    }
    const updated = activitiesList.map((a) =>
      a.id === registerModalActivity.id
        ? { ...a, registered: (a.registered || 0) + selectedMenteesForReg.length }
        : a
    );
    setActivitiesList(updated);
    saveStoredActivities(updated);
    showToast(`Successfully registered ${selectedMenteesForReg.length} mentees for ${registerModalActivity.title}!`);
    setRegisterModalActivity(null);
  };

  const handleSaveActivities = (updated) => {
    setActivitiesList(updated);
    saveStoredActivities(updated);
  };

  const handleDeleteActivity = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      const updated = activitiesList.filter((a) => a.id !== id);
      handleSaveActivities(updated);
      if (viewingActivity?.id === id) setViewingActivity(null);
      showToast("Activity deleted successfully!");
    }
  };

  const handleCreateActivity = () => {
    localStorage.removeItem("trackademy_editing_activity");
    if (onNavigate) onNavigate("add-activity");
  };

  const handleEditActivity = (activity) => {
    setActiveMenuId(null);
    localStorage.setItem("trackademy_editing_activity", JSON.stringify(activity));
    if (onNavigate) onNavigate("add-activity");
  };

  // Stats calculation
  const totalActivities = activitiesList.length;
  const upcomingActivities = activitiesList.filter((a) => a.status === "Upcoming").length;
  const ongoingActivities = activitiesList.filter((a) => a.status === "Ongoing").length;
  const completedActivities = activitiesList.filter((a) => a.status === "Completed").length;

  const stats = isStudent
    ? [
        { icon: <Megaphone size={22} className="text-[#2563eb]" />, borderAccent: "border-l-[#2563eb]", bg: "bg-blue-50", value: String(totalActivities), label: "TOTAL ACTIVITIES", sub: "All time" },
        { icon: <CalendarCheck size={22} className="text-emerald-600" />, borderAccent: "border-l-emerald-500", bg: "bg-emerald-50", value: String(upcomingActivities), label: "UPCOMING", sub: "Scheduled activities" },
        { icon: <Clock size={22} className="text-amber-600" />, borderAccent: "border-l-amber-500", bg: "bg-amber-50", value: String(ongoingActivities), label: "ONGOING", sub: "In progress" },
        { icon: <Trophy size={22} className="text-purple-600" />, borderAccent: "border-l-purple-500", bg: "bg-purple-50", value: String(completedActivities), label: "COMPLETED", sub: "Past activities" },
      ]
    : isMentor
    ? [
        { icon: <Megaphone size={22} className="text-[#7656f4]" />, borderAccent: "border-l-[#7656f4]", bg: "bg-[#f0eaff]", value: String(totalActivities), label: "TOTAL ACTIVITIES", sub: "All time" },
        { icon: <CalendarCheck size={22} className="text-emerald-600" />, borderAccent: "border-l-emerald-500", bg: "bg-emerald-50", value: String(upcomingActivities), label: "UPCOMING", sub: "Scheduled activities" },
        { icon: <Clock size={22} className="text-amber-600" />, borderAccent: "border-l-amber-500", bg: "bg-amber-50", value: String(ongoingActivities), label: "ONGOING", sub: "In progress" },
        { icon: <Trophy size={22} className="text-purple-600" />, borderAccent: "border-l-purple-500", bg: "bg-purple-50", value: String(completedActivities), label: "COMPLETED", sub: "Past activities" },
      ]
    : [
        { icon: <Megaphone size={22} className="text-blue-600" />, borderAccent: "border-l-blue-500", bg: "bg-blue-50", value: String(totalActivities), label: "TOTAL ACTIVITIES", sub: "All time" },
        { icon: <CalendarCheck size={22} className="text-[#0da651]" />, borderAccent: "border-l-emerald-500", bg: "bg-emerald-50", value: String(upcomingActivities), label: "UPCOMING", sub: "Scheduled activities" },
        { icon: <Clock size={22} className="text-amber-600" />, borderAccent: "border-l-amber-500", bg: "bg-amber-50", value: String(ongoingActivities), label: "ONGOING", sub: "In progress" },
        { icon: <Trophy size={22} className="text-purple-600" />, borderAccent: "border-l-purple-500", bg: "bg-purple-50", value: String(completedActivities), label: "COMPLETED", sub: "Past activities" },
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
        return (left.date || "").localeCompare(right.date || "");
      case "title-asc":
        return (left.title || "").localeCompare(right.title || "");
      case "title-desc":
        return (right.title || "").localeCompare(left.title || "");
      case "newest":
      default:
        return (right.date || "").localeCompare(left.date || "");
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
    <div className={`flex-1 ${isMentor || isStudent ? 'w-full' : 'h-full flex flex-col overflow-hidden bg-[#f8fafc]'}`}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl ${isStudent ? 'bg-blue-600' : isMentor ? 'bg-[#5c37d8]' : 'bg-emerald-700'} px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4`}>
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Top Header - Hidden for Mentors & Students */}
      {!isMentor && !isStudent && (
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              {viewingActivity ? (
                <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <span
                    className="hover:text-gray-600 cursor-pointer"
                    onClick={() => setViewingActivity(null)}
                  >
                    Activities
                  </span>
                  <span>&gt;</span>
                  <span className="text-[#0da651] font-semibold">View Activity</span>
                </nav>
              ) : (
                <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
                  Manage campus activities, student registrations, and analytics
                </p>
              )}
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      <main className={isMentor || isStudent ? "p-2 sm:px-5 sm:py-2.5 space-y-5 pb-10" : "flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 font-['Roboto',sans-serif]"}>
        {/* If viewingActivity is selected, render the full ActivityDetailView in the main area */}
        {viewingActivity ? (
          <ActivityDetailView
            activity={viewingActivity}
            onBack={() => setViewingActivity(null)}
            onEdit={(act) => handleEditActivity(act)}
            onDelete={(id) => handleDeleteActivity(id)}
            isMentor={isMentor}
            isStudent={isStudent}
            isRegistered={viewingActivity ? studentRegisteredIds.includes(viewingActivity.id) : false}
            onRegisterToggle={handleStudentRegisterToggle}
          />
        ) : (
          <>
            {/* Metric Cards Row */}
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
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search activities by title, type, venue..."
                  className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-xl text-xs sm:text-sm font-medium text-gray-700 focus:outline-none transition-all ${
                    isStudent
                      ? "focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563eb]"
                      : isMentor
                      ? "focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4]"
                      : "focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  }`}
                />
              </div>

              {/* Right Group: Filters + Grid/List View Toggle + Create Activity Button */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                {/* Type Filter */}
                <FilterDropdown
                  value={typeFilter}
                  onChange={setTypeFilter}
                  isMentor={isMentor}
                  isStudent={isStudent}
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

                {/* Status Filter */}
                <FilterDropdown
                  value={statusFilter}
                  onChange={setStatusFilter}
                  isMentor={isMentor}
                  isStudent={isStudent}
                  options={[
                    { value: "all", label: "All Status" },
                    { value: "Upcoming", label: "Upcoming" },
                    { value: "Ongoing", label: "Ongoing" },
                    { value: "Completed", label: "Completed" },
                    { value: "Cancelled", label: "Cancelled" },
                  ]}
                />

                {/* Grid / List View Toggle */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      view === "grid"
                        ? isStudent
                          ? "bg-blue-50 text-[#2563eb] border border-blue-200 shadow-2xs"
                          : isMentor
                          ? "bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs"
                          : "bg-emerald-50 text-[#0da651] border border-emerald-200 shadow-2xs"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      view === "list"
                        ? isStudent
                          ? "bg-blue-50 text-[#2563eb] border border-blue-200 shadow-2xs"
                          : isMentor
                          ? "bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs"
                          : "bg-emerald-50 text-[#0da651] border border-emerald-200 shadow-2xs"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Create Activity Button - Hidden for Mentors & Students */}
                {!isMentor && !isStudent && (
                  <button
                    type="button"
                    onClick={handleCreateActivity}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0da651] hover:bg-[#0c9548] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                    <span>Create Activity</span>
                  </button>
                )}
              </div>
            </div>

            {/* Activities List / Grid Container */}
            <div>
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visibleActivities.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-gray-400 text-sm bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50">
                      <CalendarDays size={32} className="mx-auto text-gray-300 mb-2" />
                      <p className="font-semibold text-gray-600">No activities found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search keywords.</p>
                    </div>
                  ) : (
                    visibleActivities.map((a) => (
                      <div
                        key={a.id}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-200 group"
                      >
                        {/* Card Poster Image Section */}
                        <div className="h-44 relative overflow-hidden bg-slate-900">
                          {a.image ? (
                            <img
                              src={a.image}
                              alt={a.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80";
                              }}
                            />
                          ) : (
                            <div className={`w-full h-full ${isStudent ? 'bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950' : isMentor ? 'bg-gradient-to-br from-[#5c37d8] via-[#4d2db7] to-[#1e1548]' : 'bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950'} flex items-center justify-center`}>
                              {getActivityIcon(a.type, 36, "text-white/40")}
                            </div>
                          )}

                          {/* Dark Gradient Overlay for Badges & Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                          {/* Category Type Badge with Icon on Bottom-Left */}
                          <div className="absolute bottom-3 left-3 z-10">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm backdrop-blur-md ${categoryBadgeStyles[a.type] || "bg-black/60 text-white border border-white/20"
                                }`}
                            >
                              {getActivityIcon(a.type, 13)}
                              <span>{a.type}</span>
                            </span>
                          </div>

                          {/* 3-Dots Menu Button at Top-Right Corner of Poster - Hidden for Mentors & Students */}
                          {!isMentor && !isStudent && (
                            <div className="absolute top-3 right-3 z-20">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(activeMenuId === a.id ? null : a.id);
                                }}
                                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                                title="More Options"
                                aria-label="More Options"
                              >
                                <MoreVertical size={16} />
                              </button>

                              {/* 3-Dots Dropdown Menu */}
                              {activeMenuId === a.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-2xl border border-gray-200/90 shadow-xl shadow-slate-400/30 p-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150 space-y-0.5 font-['Roboto',sans-serif]"
                                >
                                  <button
                                    type="button"
                                    onClick={() => handleEditActivity(a)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0da651] rounded-xl transition-colors cursor-pointer"
                                  >
                                    <Edit size={14} className="text-emerald-600" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      handleDeleteActivity(a.id);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} className="text-red-500" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Title & Status Badge */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h3 className="text-base font-bold text-gray-900 line-clamp-1 leading-snug" title={a.title}>
                                {a.title}
                              </h3>
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${statusStyles[a.status] || "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {a.status}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3.5">
                              {a.description}
                            </p>

                            {/* Meta Details Section: Date, Location, and Registered Students just after Location */}
                            <div className="space-y-2 text-xs text-gray-600 mb-4">
                              {/* Date & Time */}
                              <div className="flex items-center gap-2">
                                <CalendarDays size={14} className={`${isStudent ? 'text-[#2563eb]' : isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'} shrink-0`} />
                                <span className="font-medium text-gray-700">
                                  {a.date} {a.time ? `at ${a.time}` : ""}
                                </span>
                              </div>

                              {/* Location / Venue */}
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className={`${isStudent ? 'text-[#2563eb]' : isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'} shrink-0`} />
                                <span className="font-medium text-gray-700 truncate" title={a.venue || "Campus Venue"}>
                                  {a.venue || "Campus Venue"}
                                </span>
                              </div>

                              {/* Number of registered students - PLACED JUST AFTER LOCATION */}
                              <div className="flex items-center gap-2">
                                <Users size={14} className={`${isStudent ? 'text-[#2563eb]' : isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'} shrink-0`} />
                                <span className="font-medium text-gray-700">
                                  <strong className="text-gray-900 font-bold">{a.registered || 0}</strong> students registered
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* View Button & Register Button at the Bottom of the Card in a Single Row */}
                          <div className="pt-3 border-t border-slate-100 mt-auto">
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setViewingActivity(a)}
                                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs group/btn ${
                                  isStudent
                                    ? "bg-blue-50 hover:bg-blue-100 text-[#2563eb] border border-blue-200/80 hover:border-blue-300"
                                    : isMentor
                                    ? "bg-[#f6f2fe] hover:bg-purple-100 text-[#7656f4] border border-[#7656f4]/25 hover:border-[#7656f4]/40"
                                    : "bg-emerald-50 hover:bg-emerald-100 text-[#0da651] border border-emerald-200/80 hover:border-emerald-300"
                                }`}
                              >
                                <Eye size={14} className="group-hover/btn:scale-110 transition-transform stroke-[2.2]" />
                                <span>View Details</span>
                              </button>
                              
                              {isStudent ? (
                                <button
                                  type="button"
                                  onClick={() => handleStudentRegisterToggle(a)}
                                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 text-white ${
                                    studentRegisteredIds.includes(a.id)
                                      ? "bg-emerald-600 hover:bg-emerald-700"
                                      : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                                  }`}
                                >
                                  {studentRegisteredIds.includes(a.id) ? (
                                    <>
                                      <Check size={14} className="stroke-[2.5]" />
                                      <span>Registered</span>
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus size={14} className="stroke-[2.2]" />
                                      <span>Register</span>
                                    </>
                                  )}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenRegisterModal(a)}
                                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 text-white ${
                                    isMentor
                                      ? "bg-[#7656f4] hover:bg-[#6242e2]"
                                      : "bg-[#0da651] hover:bg-[#0c9548]"
                                  }`}
                                >
                                  <UserPlus size={14} className="stroke-[2.2]" />
                                  <span>Register</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden flex flex-col font-['Roboto',sans-serif]">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white">
                    <p className="text-xs text-gray-500 font-medium">
                      Showing <strong className="text-gray-800">{visibleActivities.length}</strong> of{" "}
                      <strong className="text-gray-800">{activitiesList.length}</strong> activities
                    </p>
                    <div className="flex items-center gap-2">
                      <FilterDropdown
                        value={sortBy}
                        onChange={setSortBy}
                        isMentor={isMentor}
                        isStudent={isStudent}
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
                        <tr className={`${
                          isStudent
                            ? "bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af]"
                            : isMentor
                            ? "bg-gradient-to-r from-[#7656f4] via-[#6845f2] to-[#5531dc]"
                            : "bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d]"
                        } text-white text-xs font-bold uppercase tracking-wider`}>
                          <th className="w-10 py-3.5 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={allVisibleSelected}
                              onChange={toggleAll}
                              className={`rounded border-white/40 cursor-pointer ${isStudent ? "accent-[#2563eb]" : isMentor ? "accent-[#7656f4]" : "accent-emerald-800"}`}
                            />
                          </th>
                          <th className="py-3.5 px-4 text-left">ACTIVITY</th>
                          <th className="py-3.5 px-4 text-center">TYPE</th>
                          <th className="py-3.5 px-4 text-left">DATE & TIME</th>
                          <th className="py-3.5 px-4 text-left">VENUE</th>
                          <th className="py-3.5 px-4 text-center">REGISTERED</th>
                          <th className="py-3.5 px-4 text-center">STATUS</th>
                          <th className="py-3.5 px-4 text-center">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                        {visibleActivities.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                              No activities found matching your criteria.
                            </td>
                          </tr>
                        ) : (
                          visibleActivities.map((a) => (
                            <tr
                              key={a.id}
                              className={`hover:bg-gray-50/60 transition-colors ${
                                selected.includes(a.id)
                                  ? isStudent
                                    ? "bg-blue-50/40"
                                    : isMentor
                                    ? "bg-purple-50/40"
                                    : "bg-emerald-50/30"
                                  : ""
                              }`}
                            >
                              <td className="px-4 py-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={selected.includes(a.id)}
                                  onChange={() => toggleOne(a.id)}
                                  className={`rounded border-gray-300 cursor-pointer ${isStudent ? "accent-[#2563eb]" : isMentor ? "accent-[#7656f4]" : "accent-primary"}`}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {a.image ? (
                                    <img
                                      src={a.image}
                                      alt={a.title}
                                      className="w-16 h-11 object-cover rounded-xl shrink-0 border border-gray-200/80 shadow-2xs"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80";
                                      }}
                                    />
                                  ) : (
                                    <div className={`w-16 h-11 rounded-xl ${isStudent ? 'bg-blue-100 text-[#2563eb]' : isMentor ? 'bg-purple-100 text-[#7656f4]' : 'bg-emerald-100 text-[#0da651]'} flex items-center justify-center font-bold text-xs shrink-0`}>
                                      {getActivityIcon(a.type, 18)}
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-xs font-bold text-gray-800 leading-snug">{a.title}</div>
                                    <div className="text-[11px] text-gray-400 line-clamp-1 max-w-[280px] mt-0.5">
                                      {a.description}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg ${categoryBadgeStyles[a.type] || "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                  {getActivityIcon(a.type, 11)}
                                  <span>{a.type}</span>
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex flex-col text-xs text-gray-600">
                                  <div className="flex items-center gap-1.5 font-medium">
                                    <CalendarDays size={13} className={`${isStudent ? 'text-[#2563eb]' : isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'}`} /> {a.date}
                                  </div>
                                  {a.time && (
                                    <div className="flex items-center gap-1.5 mt-0.5 text-gray-400">
                                      <Clock size={13} /> {a.time}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                                  <MapPin size={13} className={`${isStudent ? 'text-[#2563eb]' : isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'}`} /> {a.venue || "Campus Venue"}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100/80 px-2.5 py-1 rounded-full">
                                  <Users size={13} className="text-gray-500" />
                                  <span>{a.registered || 0}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusStyles[a.status] || "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                  {a.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setViewingActivity(a)}
                                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer border ${
                                      isStudent
                                        ? "text-[#2563eb] bg-blue-50 hover:bg-[#2563eb] hover:text-white border-blue-200/60"
                                        : isMentor
                                        ? "text-[#7656f4] bg-[#f6f2fe] hover:bg-[#7656f4] hover:text-white border-[#7656f4]/30"
                                        : "text-[#0da651] bg-emerald-50 hover:bg-[#0da651] hover:text-white border-emerald-200/60"
                                    }`}
                                  >
                                    <Eye size={12} /> View
                                  </button>
                                  
                                  {isStudent ? (
                                    <button
                                      type="button"
                                      onClick={() => handleStudentRegisterToggle(a)}
                                      className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer text-white shadow-2xs active:scale-95 ${
                                        studentRegisteredIds.includes(a.id)
                                          ? "bg-emerald-600 hover:bg-emerald-700"
                                          : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                                      }`}
                                    >
                                      {studentRegisteredIds.includes(a.id) ? (
                                        <>
                                          <Check size={12} className="stroke-[2.5]" /> Registered
                                        </>
                                      ) : (
                                        <>
                                          <UserPlus size={12} /> Register
                                        </>
                                      )}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleOpenRegisterModal(a)}
                                      className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer text-white shadow-2xs active:scale-95 ${
                                        isMentor
                                          ? "bg-[#7656f4] hover:bg-[#6242e2]"
                                          : "bg-[#0da651] hover:bg-[#0c9548]"
                                      }`}
                                    >
                                      <UserPlus size={12} /> Register
                                    </button>
                                  )}

                                  {!isMentor && !isStudent && (
                                    <div className="relative">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveMenuId(activeMenuId === a.id ? null : a.id);
                                        }}
                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                        title="Actions"
                                      >
                                        <MoreVertical size={16} />
                                      </button>
                                      {activeMenuId === a.id && (
                                        <div
                                          onClick={(e) => e.stopPropagation()}
                                          className="absolute right-0 top-full mt-1 w-36 bg-white rounded-2xl border border-gray-200 shadow-xl p-1.5 z-40 text-left space-y-0.5"
                                        >
                                          <button
                                            type="button"
                                            onClick={() => handleEditActivity(a)}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0da651] rounded-xl transition-colors cursor-pointer"
                                          >
                                            <Edit size={13} className="text-emerald-600" />
                                            <span>Edit</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setActiveMenuId(null);
                                              handleDeleteActivity(a.id);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                          >
                                            <Trash2 size={13} className="text-red-500" />
                                            <span>Delete</span>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  )}
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
          </>
        )}
      </main>

      {/* Registration Modal */}
      {registerModalActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 font-['Roboto',sans-serif]">
            {/* Modal Header */}
            <div className={`p-6 border-b border-slate-100 flex items-center justify-between ${isMentor ? 'bg-gradient-to-r from-[#f6f2fe] to-white' : 'bg-gradient-to-r from-emerald-50 to-white'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${isMentor ? 'bg-[#7656f4] shadow-purple-500/20' : 'bg-[#0da651] shadow-emerald-500/20'} text-white flex items-center justify-center shadow-md`}>
                  <UserPlus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">Register for Activity</h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[260px] sm:max-w-xs">{registerModalActivity.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRegisterModalActivity(null)}
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm font-['Roboto',sans-serif]">
              {/* Event Brief Pill */}
              <div className={`p-3.5 ${isMentor ? 'bg-[#f6f2fe] border-purple-100/80' : 'bg-emerald-50 border-emerald-100/80'} border rounded-2xl flex items-center justify-between gap-3 text-xs`}>
                <div>
                  <p className="font-bold text-gray-900">{registerModalActivity.title}</p>
                  <p className="text-gray-500 mt-0.5">{registerModalActivity.date} &bull; {registerModalActivity.venue || "Campus Venue"}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg ${isMentor ? 'bg-[#7656f4]' : 'bg-[#0da651]'} text-white font-bold text-[11px] shrink-0`}>
                  15 MAR Points
                </span>
              </div>

              {/* Mentee List Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Students to Register ({selectedMenteesForReg.length}/{MENTEE_OPTIONS.length})
                  </p>
                  <button
                    type="button"
                    onClick={handleToggleSelectAllReg}
                    className={`text-xs font-bold ${isMentor ? 'text-[#7656f4]' : 'text-[#0da651]'} hover:underline cursor-pointer`}
                  >
                    {selectedMenteesForReg.length === MENTEE_OPTIONS.length ? "Deselect All" : "Select All"}
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {MENTEE_OPTIONS.map((mentee) => {
                    const isSelected = selectedMenteesForReg.includes(mentee.id);
                    return (
                      <div
                        key={mentee.id}
                        onClick={() => handleToggleMenteeReg(mentee.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? isMentor
                              ? "border-[#7656f4] bg-purple-50/50 shadow-2xs"
                              : "border-[#0da651] bg-emerald-50/50 shadow-2xs"
                            : "border-slate-200/80 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isSelected
                                ? isMentor
                                  ? "bg-[#7656f4] border-[#7656f4] text-white"
                                  : "bg-[#0da651] border-[#0da651] text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check size={13} className="stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{mentee.name}</p>
                            <p className="text-[11px] text-gray-400 font-medium">
                              {mentee.roll} &bull; {mentee.dept} &bull; {mentee.year}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[11px] font-semibold ${isMentor ? 'text-purple-700 bg-purple-100/60' : 'text-emerald-700 bg-emerald-100/60'} px-2 py-0.5 rounded-md`}>
                          Student
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRegisterModalActivity(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmActivityRegistration}
                className={`flex items-center gap-2 px-5 py-2.5 ${isMentor ? 'bg-[#7656f4] hover:bg-[#6242e2] shadow-purple-500/20' : 'bg-[#0da651] hover:bg-[#0c9548] shadow-emerald-500/20'} text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer`}
              >
                <UserPlus size={15} />
                <span>Confirm Registration ({selectedMenteesForReg.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
