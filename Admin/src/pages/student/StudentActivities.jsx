import { useState, useMemo } from "react";
import {
  Bell,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  Bookmark,
  Eye,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Ticket,
  Users,
  X,
  Share2,
  Download,
  CalendarPlus,
  Sparkles,
  Award,
  Check,
  Zap,
  Info,
  ShieldCheck
} from "lucide-react";

export const initialActivitiesData = [
  {
    id: "EVT-001",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "TECHNOVATE 2026 is the premier annual technical festival bringing together brightest minds in tech, engineering, and digital design. Featuring multi-track hackathons, robotics challenges, guest keynotes from industry veterans, hands-on workshop bootcamps, and competitive project exhibitions with lucrative cash prizes.",
    status: "Upcoming",
    isUpcoming: true,
    isRegistered: true,
    isBookmarked: false,
    registrationCount: 248,
    maxCapacity: 300,
    organizer: "Department of Computer Science & Engineering",
    coordinators: "Dr. Alok Nath (Faculty) & Sagnik Sen (Student Lead)",
    tags: ["Hackathon", "Robotics", "Project Expo", "Coding"],
    registrationFee: "Free for RCCIIT Students",
    prizes: "₹1,00,000+ Prize Pool with Merit Certificates",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-002",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "RoboCombat & Drone Racing Championship under TECHNOVATE 2026. Design, build, and pilot autonomous and manual robots in arena obstacles. Learn advanced embedded firmware design and telemetry systems.",
    status: "Upcoming",
    isUpcoming: true,
    isRegistered: true,
    isBookmarked: true,
    registrationCount: 142,
    maxCapacity: 180,
    organizer: "Robotics & IoT Club, RCCIIT",
    coordinators: "Prof. S. Dasgupta & Tanuka Saha",
    tags: ["Robotics", "Hardware", "IoT", "Drone"],
    registrationFee: "Free",
    prizes: "₹35,000 Cash + Tech Goodies",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-003",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "Web3 & Cloud Computing Workshop & Panel. Learn architecture scalability from engineering managers at top multinational tech firms. Includes live deployment walkthroughs on cloud infrastructure.",
    status: "Upcoming",
    isUpcoming: true,
    isRegistered: true,
    isBookmarked: false,
    registrationCount: 310,
    maxCapacity: 350,
    organizer: "Google Developer Student Club (GDSC)",
    coordinators: "Arjun Kumar & Mentor Lead",
    tags: ["Cloud", "Web3", "Microservices", "DevOps"],
    registrationFee: "Free",
    prizes: "Exclusive Swag Kits & Cloud Vouchers",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-004",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "Algorithm Master: Speed Coding Challenge & DSA Marathon. Multi-round algorithmic tournament testing logic, time complexity optimization, and problem-solving speed under pressure.",
    status: "Upcoming",
    isUpcoming: true,
    isRegistered: true,
    isBookmarked: true,
    registrationCount: 215,
    maxCapacity: 250,
    organizer: "Coding Club & ACM Student Chapter",
    coordinators: "Dr. K. Roy & Rahul Mitra",
    tags: ["Competitive Programming", "DSA", "Algorithms"],
    registrationFee: "Free",
    prizes: "₹25,000 + Internship Referrals",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-005",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "AI & GenAI Masterclass: Building Autonomous Multi-Agent Workflows. Hands-on deep dive into transformer models, vector databases, and real-time agentic system design with industry mentors.",
    status: "Past",
    isUpcoming: false,
    isRegistered: true,
    isBookmarked: false,
    registrationCount: 195,
    maxCapacity: 200,
    organizer: "AI/ML Center of Excellence",
    coordinators: "Dr. P. Chakraborty & Tuhina Banerjee",
    tags: ["Artificial Intelligence", "GenAI", "LLMs", "Python"],
    registrationFee: "Free",
    prizes: "Verified Digital Badges & Certificates",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-006",
    title: "TECHNOVATE 2026",
    category: "Technical",
    date: "17 May 2026",
    time: "04:30 AM",
    venue: "RCCIIT",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals.",
    detailedDescription: "Cyber Security CTF (Capture the Flag) Tournament. Reverse engineering, web security exploits, cryptography puzzles, and network defense challenges for cyber enthusiasts.",
    status: "Past",
    isUpcoming: false,
    isRegistered: false,
    isBookmarked: false,
    registrationCount: 160,
    maxCapacity: 160,
    organizer: "Cyber Security Student Forum",
    coordinators: "Prof. S. Ghosh",
    tags: ["Cyber Security", "CTF", "Ethical Hacking", "Networks"],
    registrationFee: "Free",
    prizes: "₹20,000 + Security Certifications",
    badgeTone: "bg-[#f5efff] text-[#7c3aed] border border-[#e9d5ff]",
    bannerTheme: "blue-technovate"
  },
  {
    id: "EVT-007",
    title: "Annual Startup Speech 2026",
    category: "Career",
    date: "25 May 2026",
    time: "05:30 AM",
    venue: "Seminar Hall, RCCIIT",
    description: "An inspiring startup summit featuring visionary founders, angel investors and live pitch sessions.",
    detailedDescription: "Annual Entrepreneurship Summit & Venture Pitch. Connect with startup founders, learn venture capital fundamentals, and pitch prototype products directly to angel investors.",
    status: "Past",
    isUpcoming: false,
    isRegistered: false,
    isBookmarked: false,
    registrationCount: 120,
    maxCapacity: 150,
    organizer: "E-Cell (Entrepreneurship Cell), RCCIIT",
    coordinators: "Dr. B. Sengupta & E-Cell Core Team",
    tags: ["Startup", "Pitch", "Investment", "Career"],
    registrationFee: "Free",
    prizes: "Incubation Grant Opportunities",
    badgeTone: "bg-[#fff1f2] text-[#e11d48] border border-[#ffe4e6]",
    bannerTheme: "pink-startup"
  }
];

export default function StudentActivities({ onNavigate, hideHeader = false }) {
  const [activities, setActivities] = useState(initialActivitiesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'upcoming' | 'past' | 'registered' | 'bookmarked' | 'Technical' | 'Career' | 'Sports' | 'Cultural'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const itemsPerPage = 6;

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  // Toggle bookmark
  function handleToggleBookmark(id, e) {
    if (e) e.stopPropagation();
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isBookmarked;
          showToast(nextState ? `Saved "${item.title}" to bookmarks` : `Removed from bookmarks`);
          return { ...item, isBookmarked: nextState };
        }
        return item;
      })
    );
  }

  // Toggle registration
  function handleToggleRegistration(activity) {
    setActivities((prev) =>
      prev.map((item) => {
        if (item.id === activity.id) {
          const nextRegistered = !item.isRegistered;
          const nextCount = nextRegistered ? item.registrationCount + 1 : item.registrationCount - 1;
          showToast(
            nextRegistered
              ? `Successfully registered for ${item.title}!`
              : `Registration cancelled for ${item.title}`
          );
          const updated = {
            ...item,
            isRegistered: nextRegistered,
            registrationCount: Math.max(0, nextCount)
          };
          if (selectedActivity && selectedActivity.id === item.id) {
            setSelectedActivity(updated);
          }
          return updated;
        }
        return item;
      })
    );
  }

  // Filter logic
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query) ||
        activity.venue.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Filter Dropdown
      if (filterType === "all") return true;
      if (filterType === "upcoming") return activity.status === "Upcoming" || activity.isUpcoming;
      if (filterType === "past") return activity.status === "Past" || !activity.isUpcoming;
      if (filterType === "registered") return activity.isRegistered;
      if (filterType === "bookmarked") return activity.isBookmarked;
      if (filterType === activity.category) return true;

      return true;
    });
  }, [activities, searchQuery, filterType]);

  // KPI counts
  const totalEventsCount = activities.length;
  const upcomingEventsCount = activities.filter((a) => a.status === "Upcoming" || a.isUpcoming).length;
  const pastEventsCount = activities.filter((a) => a.status === "Past" || !a.isUpcoming).length;
  const myRegistrationsCount = activities.filter((a) => a.isRegistered).length;

  // Pagination calculation
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "upcoming", label: "Upcoming Events" },
    { value: "past", label: "Past Events" },
    { value: "registered", label: "My Registrations" },
    { value: "bookmarked", label: "Bookmarked Events" },
    { value: "Technical", label: "Technical" },
    { value: "Career", label: "Career" },
    { value: "Sports", label: "Sports" },
    { value: "Cultural", label: "Cultural" },
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
              Activities
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Explore and manage all events and activities.
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

      {/* Main Content Pane matching Dashboard padding & spacing */}
      <main className="space-y-3.5 p-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                placeholder="Search events by name, category, or location..."
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

            {/* Filter Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setFilterDropdownOpen((prev) => !prev)}
                className="flex items-center justify-between gap-3 min-w-[180px] w-full sm:w-auto px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-slate-500" />
                  <span>
                    {filterOptions.find((o) => o.value === filterType)?.label || "All Events"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    filterDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {filterDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFilterType(option.value);
                        setFilterDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                        filterType === option.value
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {filterType === option.value && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Events */}
            <div
              onClick={() => {
                setFilterType("all");
                setCurrentPage(1);
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CalendarDays size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-tight">
                  {totalEventsCount}
                </p>
              </div>
            </div>

            {/* Upcoming Events */}
            <div
              onClick={() => {
                setFilterType("upcoming");
                setCurrentPage(1);
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CheckCircle2 size={22} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Upcoming Events
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-tight">
                  {upcomingEventsCount}
                </p>
              </div>
            </div>

            {/* Past Events */}
            <div
              onClick={() => {
                setFilterType("past");
                setCurrentPage(1);
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Ticket size={22} className="text-purple-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Past Events
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-tight">
                  {pastEventsCount}
                </p>
              </div>
            </div>

            {/* My Registrations */}
            <div
              onClick={() => {
                setFilterType("registered");
                setCurrentPage(1);
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users size={22} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  My Registrations
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-tight">
                  {myRegistrationsCount}
                </p>
              </div>
            </div>
          </div>

          {/* Section Subheader & View Controls */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {paginatedActivities.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {filteredActivities.length}
              </span>{" "}
              events
            </p>

            {/* View Switcher */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Activities Cards Grid / List */}
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-2xs space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 mx-auto flex items-center justify-center">
                <CalendarDays size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">No events found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any activities matching your current filters or search terms.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFilterType("all");
                }}
                className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* 3-Column Grid matching reference image */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-[22px] border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-blue-300/80 transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  {/* Poster Banner Section */}
                  <div className="relative w-full h-[155px] bg-[#0c2461] overflow-hidden select-none">
                    {/* Visual Graphic Representation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0c2461] via-[#1e3799] to-[#0a3d62]">
                      {/* Abstract Tech circuit pattern & brush styling */}
                      <div className="absolute inset-0 opacity-20 mix-blend-screen bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-blue-400/20 blur-2xl" />
                      <div className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-indigo-500/20 blur-2xl" />

                      {/* Poster Content matching uploaded image */}
                      <div className="relative h-full flex flex-col justify-between p-4 z-10 text-white">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-blue-200/90">
                            Annual Technical
                          </p>
                          <h4 className="text-xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xs">
                            {activity.title}
                          </h4>
                          <p className="text-[8px] uppercase tracking-[0.14em] text-blue-200/80 font-medium mt-0.5">
                            Innovate Today, Impact Tomorrow!
                          </p>
                        </div>

                        {/* Icons pill row */}
                        <div className="flex items-center justify-between text-[8px] text-blue-100/90 font-medium pt-1 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <span>⚡ Hackathon</span>
                            <span>•</span>
                            <span>🛠 Workshop</span>
                            <span>•</span>
                            <span>🏆 Awards</span>
                          </div>
                          <div className="text-[8px] font-semibold text-blue-200">
                            24-26 May • RCCIIT
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Ribbon Button in Top-Right corner */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(activity.id, e)}
                      title={activity.isBookmarked ? "Remove Bookmark" : "Save Event"}
                      className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        activity.isBookmarked
                          ? "bg-white text-blue-600 shadow-md"
                          : "bg-white/90 hover:bg-white text-slate-500 hover:text-slate-900 shadow-xs backdrop-blur-xs"
                      }`}
                    >
                      <Bookmark
                        size={15}
                        className={activity.isBookmarked ? "fill-blue-600 text-blue-600" : ""}
                      />
                    </button>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Category Badge */}
                      <div>
                        <span className="inline-block text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                          {activity.category}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-[17px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {activity.description}
                      </p>

                      {/* Meta Information Row */}
                      <div className="grid grid-cols-3 gap-1.5 pt-2 text-[11px] font-medium text-slate-600">
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{activity.venue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Button: View Details & Register in a Single Row */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedActivity(activity)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 active:scale-[0.99] font-semibold text-xs transition-all cursor-pointer shadow-2xs"
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleRegistration(activity)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-xs active:scale-95 ${
                          activity.isRegistered
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        <span>{activity.isRegistered ? "Registered" : "Register"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View Alternative */
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
              {paginatedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs font-bold text-center p-1">
                      <span className="text-[10px] uppercase tracking-wider opacity-80">TECH</span>
                      <span className="text-xs">2026</span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                          {activity.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
                          {activity.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" /> {activity.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" /> {activity.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400" /> {activity.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions in a Single Row */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(activity.id, e)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        activity.isBookmarked
                          ? "bg-blue-50 border-blue-200 text-blue-600"
                          : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                      }`}
                      title={activity.isBookmarked ? "Bookmarked" : "Bookmark"}
                    >
                      <Bookmark
                        size={15}
                        className={activity.isBookmarked ? "fill-blue-600" : ""}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedActivity(activity)}
                      className="px-4 py-2.5 rounded-xl border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleRegistration(activity)}
                      className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                        activity.isRegistered
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{activity.isRegistered ? "Registered" : "Register"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls matching reference */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-6">
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
          )}
      </main>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Banner */}
            <div className="relative h-44 sm:h-48 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 flex flex-col justify-between text-white shrink-0">
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-200 border border-purple-400/30 backdrop-blur-xs">
                  {selectedActivity.category}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs ${
                    selectedActivity.status === "Upcoming"
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                      : "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                  }`}
                >
                  {selectedActivity.status}
                </span>
                {selectedActivity.isRegistered && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-200 border border-blue-400/30 flex items-center gap-1">
                    <Check size={11} /> Registered
                  </span>
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-blue-300">
                  Annual Campus Event
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                  {selectedActivity.title}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
              {/* Event Info Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium text-[11px]">Date</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Calendar size={14} className="text-blue-600" />
                    <span>{selectedActivity.date}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium text-[11px]">Time</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Clock size={14} className="text-blue-600" />
                    <span>{selectedActivity.time}</span>
                  </div>
                </div>

                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 font-medium text-[11px]">Venue</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 truncate">
                    <MapPin size={14} className="text-blue-600 shrink-0" />
                    <span className="truncate">{selectedActivity.venue}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium text-[11px]">Registration Fee</span>
                  <div className="font-bold text-emerald-600">{selectedActivity.registrationFee}</div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium text-[11px]">Registrations</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Users size={14} className="text-blue-600" />
                    <span>{selectedActivity.registrationCount} Participants</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 font-medium text-[11px]">Event Code</span>
                  <div className="font-mono font-bold text-slate-800">{selectedActivity.id}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  About the Event
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedActivity.detailedDescription || selectedActivity.description}
                </p>
              </div>

              {/* Prizes & Awards */}
              {selectedActivity.prizes && (
                <div className="flex items-center gap-3 p-3.5 bg-amber-50/80 border border-amber-200/60 rounded-2xl text-xs text-amber-900">
                  <Award size={20} className="text-amber-600 shrink-0" />
                  <div>
                    <strong className="font-bold">Awards & Perks:</strong> {selectedActivity.prizes}
                  </div>
                </div>
              )}

              {/* Organizer & Coordinators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Organized by</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedActivity.organizer}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Coordinators</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedActivity.coordinators}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedActivity.tags && selectedActivity.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Topics & Tracks
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedActivity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(selectedActivity.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    selectedActivity.isBookmarked
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Bookmark
                    size={14}
                    className={selectedActivity.isBookmarked ? "fill-blue-600" : ""}
                  />
                  <span>{selectedActivity.isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleRegistration(selectedActivity)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
                    selectedActivity.isRegistered
                      ? "bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {selectedActivity.isRegistered ? (
                    <>
                      <X size={14} />
                      <span>Cancel Registration</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Register Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
