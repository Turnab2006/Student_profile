import { useState, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  CalendarDays,
  MapPin,
  Clock,
  Send,
  RotateCcw,
  Sparkles,
  Building2,
  Users,
  Award,
  DollarSign,
  Tag,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  UserCheck,
  Upload,
  Plus,
  Trash2,
  ListOrdered,
  Save,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredActivities, saveStoredActivities } from "../../data/activitiesData";

function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextField({ icon: Icon, placeholder, type = "text", value, onChange, disabled = false, required = false }) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all ${
          Icon ? "pl-10 pr-3.5" : "px-3.5"
        } ${disabled ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : ""}`}
      />
    </div>
  );
}

function SelectField({ icon: Icon, placeholder, options = [], value, onChange, disabled = false, required = false }) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors"
        />
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg py-2.5 text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none pr-9 cursor-pointer ${
          Icon ? "pl-10" : "px-3.5"
        } ${disabled ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-75" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors" />
    </div>
  );
}

function NumberBadge({ value }) {
  return (
    <span className="w-6 h-6 rounded-full bg-[#0da651] text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-2xs">
      {value}
    </span>
  );
}

// Convert "09:30 AM" or "02:00 PM" to "09:30" / "14:00"
function parse12to24(time12Str) {
  if (!time12Str) return "";
  const cleaned = time12Str.trim();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = (match[3] || "").toUpperCase();

  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function parseTimeRangeTo24(rangeStr) {
  if (!rangeStr) return { startTime: "", endTime: "" };
  const parts = rangeStr.split(/[–-]/);
  return {
    startTime: parse12to24(parts[0] || ""),
    endTime: parse12to24(parts[1] || ""),
  };
}

// Utility to convert 24h format to 12h AM/PM string
function format24to12(timeStr) {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  if (hStr === undefined || mStr === undefined) return timeStr;
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const formattedH = String(h).padStart(2, "0");
  return `${formattedH}:${m} ${ampm}`;
}

function computeTimeString(start, end) {
  if (!start) return "";
  const start12 = format24to12(start);
  if (end) {
    const end12 = format24to12(end);
    return `${start12} – ${end12}`;
  }
  return `${start12} Onwards`;
}

// Preset color palette for auto-assigned timeline styling
const timelineColorPalette = [
  { name: "Emerald", text: "text-[#0da651]", dot: "bg-[#0da651]", ring: "ring-emerald-100", border: "border-emerald-500", bg: "bg-emerald-50/50" },
  { name: "Blue", text: "text-blue-600", dot: "bg-blue-500", ring: "ring-blue-100", border: "border-blue-500", bg: "bg-blue-50/50" },
  { name: "Amber", text: "text-amber-600", dot: "bg-amber-500", ring: "ring-amber-100", border: "border-amber-500", bg: "bg-amber-50/50" },
  { name: "Purple", text: "text-purple-600", dot: "bg-purple-500", ring: "ring-purple-100", border: "border-purple-500", bg: "bg-purple-50/50" },
  { name: "Rose", text: "text-rose-600", dot: "bg-rose-500", ring: "ring-rose-100", border: "border-rose-500", bg: "bg-rose-50/50" },
  { name: "Indigo", text: "text-indigo-600", dot: "bg-indigo-500", ring: "ring-indigo-100", border: "border-indigo-500", bg: "bg-indigo-50/50" },
  { name: "Cyan", text: "text-cyan-600", dot: "bg-cyan-500", ring: "ring-cyan-100", border: "border-cyan-500", bg: "bg-cyan-50/50" },
];

export default function AddActivity({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  // Check if editing an existing activity
  const [editingId, setEditingId] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_activity");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.id || null;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const isEditMode = Boolean(editingId);

  // Form state initialized to empty for creation or prefilled for editing
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_activity");
      if (saved) {
        const parsed = JSON.parse(saved);
        const times = parseTimeRangeTo24(parsed.time || "");
        return {
          title: parsed.title || "",
          type: parsed.type || "",
          status: parsed.status || "",
          date: parsed.date || "",
          startTime: parsed.startTime || times.startTime || "",
          endTime: parsed.endTime || times.endTime || "",
          time: parsed.time || "",
          venue: parsed.venue || "",
          capacity: parsed.capacity || "",
          points: parsed.points || "",
          rewards: parsed.rewards || "",
          fee: parsed.fee || "",
          department: parsed.department || "",
          facultyCoordinator: parsed.facultyCoordinator || "",
          studentLeads: parsed.studentLeads || "",
          image: parsed.image || "",
          description: parsed.description || "",
          highlights: parsed.highlights || "",
          guidelines: parsed.guidelines || "",
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      title: "",
      type: "",
      status: "",
      date: "",
      startTime: "",
      endTime: "",
      time: "",
      venue: "",
      capacity: "",
      points: "",
      rewards: "",
      fee: "",
      department: "",
      facultyCoordinator: "",
      studentLeads: "",
      image: "",
      description: "",
      highlights: "",
      guidelines: "",
    };
  });

  // Dynamic timeline slots initialized
  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_activity");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timeline && Array.isArray(parsed.timeline) && parsed.timeline.length > 0) {
          return parsed.timeline.map((slot) => {
            const slotTimes = parseTimeRangeTo24(slot.time || "");
            return {
              startTime: slot.startTime || slotTimes.startTime || "",
              endTime: slot.endTime || slotTimes.endTime || "",
              time: slot.time || "",
              title: slot.title || "",
              description: slot.description || "",
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [{ startTime: "", endTime: "", time: "", title: "", description: "" }];
  });

  const [dragOver, setDragOver] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Main Event Time Selection handler
  const handleMainTimeChange = (field, val) => {
    setForm((prev) => {
      const nextStart = field === "startTime" ? val : prev.startTime;
      const nextEnd = field === "endTime" ? val : prev.endTime;
      const formatted = computeTimeString(nextStart, nextEnd);
      return {
        ...prev,
        [field]: val,
        time: formatted,
      };
    });
  };

  // Timeline slot time selection handler
  const handleSlotTimeChange = (index, field, val) => {
    setTimeline((prev) => {
      const updated = [...prev];
      const slot = { ...updated[index] };
      const nextStart = field === "startTime" ? val : slot.startTime;
      const nextEnd = field === "endTime" ? val : slot.endTime;
      const formatted = computeTimeString(nextStart, nextEnd);
      updated[index] = {
        ...slot,
        [field]: val,
        time: formatted,
      };
      return updated;
    });
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((prev) => ({ ...prev, image: e.target.result }));
      showToast("Poster image loaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const addTimelineSlot = () => {
    setTimeline((prev) => [
      ...prev,
      { startTime: "", endTime: "", time: "", title: "", description: "" },
    ]);
  };

  const updateTimelineSlot = (index, field, value) => {
    setTimeline((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeTimelineSlot = (index) => {
    setTimeline((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setForm({
      title: "",
      type: "",
      status: "",
      date: "",
      startTime: "",
      endTime: "",
      time: "",
      venue: "",
      capacity: "",
      points: "",
      rewards: "",
      fee: "",
      department: "",
      facultyCoordinator: "",
      studentLeads: "",
      image: "",
      description: "",
      highlights: "",
      guidelines: "",
    });
    setTimeline([{ startTime: "", endTime: "", time: "", title: "", description: "" }]);
    localStorage.removeItem("trackademy_editing_activity");
    showToast("Form has been reset.");
  };

  const handleCancel = () => {
    localStorage.removeItem("trackademy_editing_activity");
    if (onNavigate) onNavigate("activities");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Please provide an Activity Title.");
      return;
    }

    const currentActivities = getStoredActivities();
    const validTimeline = timeline.filter(
      (t) => t.title.trim() || t.time.trim() || t.description.trim()
    );

    if (isEditMode) {
      const updatedActivities = currentActivities.map((act) => {
        if (act.id === editingId) {
          return {
            ...act,
            title: form.title.trim(),
            type: form.type || act.type || "Technical",
            status: form.status || act.status || "Upcoming",
            date: form.date || act.date,
            time: form.time || act.time || "10:00 AM Onwards",
            venue: form.venue || act.venue || "Campus Venue",
            capacity: form.capacity || act.capacity || "100",
            points: form.points || act.points || "10 Points",
            rewards: form.rewards || act.rewards || "Participation Certificate",
            fee: form.fee || act.fee || "Free",
            department: form.department || act.department || "Department of Computer Science & Engineering",
            facultyCoordinator: form.facultyCoordinator || act.facultyCoordinator || "Faculty Coordinator",
            studentLeads: form.studentLeads || act.studentLeads || "Student Lead",
            image: form.image || act.image,
            description: form.description || act.description,
            highlights: form.highlights,
            guidelines: form.guidelines,
            timeline: validTimeline,
          };
        }
        return act;
      });

      saveStoredActivities(updatedActivities);
      localStorage.removeItem("trackademy_editing_activity");
      showToast("Activity updated successfully!");
    } else {
      const nextNum = currentActivities.length + 1;
      const newId = `ACT${String(nextNum).padStart(3, "0")}`;

      const newActivity = {
        id: newId,
        title: form.title.trim(),
        type: form.type || "Technical",
        status: form.status || "Upcoming",
        date: form.date || new Date().toISOString().split("T")[0],
        time: form.time || "10:00 AM Onwards",
        venue: form.venue || "Campus Venue",
        registered: 0,
        capacity: form.capacity || "100",
        points: form.points || "10 Points",
        rewards: form.rewards || "Participation Certificate",
        fee: form.fee || "Free",
        department: form.department || "Department of Computer Science & Engineering",
        facultyCoordinator: form.facultyCoordinator || "Faculty Coordinator",
        studentLeads: form.studentLeads || "Student Lead",
        image: form.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        description: form.description || "Activity description.",
        highlights: form.highlights,
        guidelines: form.guidelines,
        timeline: validTimeline,
      };

      saveStoredActivities([newActivity, ...currentActivities]);
      showToast("Activity published successfully!");
    }

    setTimeout(() => {
      if (onNavigate) onNavigate("activities");
    }, 400);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50/50 font-['Roboto',sans-serif]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Top Header with Breadcrumbs in subtext position */}
      {!isMentor && (
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
              <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span
                  className="hover:text-gray-600 cursor-pointer"
                  onClick={handleCancel}
                >
                  Activities
                </span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">
                  {isEditMode ? "Edit Activity" : "Create Activity"}
                </span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      {/* Main Form Area using full width without excessive side margin */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        <div className="w-full space-y-5">
          {/* Green Gradient Banner */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-5 py-4 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative z-10 flex items-center gap-3.5">
              <button
                type="button"
                onClick={handleCancel}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 border border-white/25 shadow-2xs transition-all cursor-pointer active:scale-95"
                title="Back to Activities"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isEditMode ? "Edit Campus Activity" : "Add New Campus Activity"}
                </h2>
                <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                  {isEditMode
                    ? "Update event schedule, coordinators, poster image, and agenda timeline"
                    : "Publish events, workshops, technical seminars & track student participation"}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw size={14} />
                <span>Reset Form</span>
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          </section>

          {/* Main Form Container */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section 1: Basic Information & Poster Drag/Drop Area */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <NumberBadge value="1" />
                <h3 className="text-sm font-bold text-gray-900">Basic Information &amp; Poster</h3>
              </div>

              {/* Title, Category & Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Label required>Activity Title</Label>
                  <TextField
                    icon={BookOpen}
                    placeholder="Enter activity title"
                    value={form.title}
                    onChange={update("title")}
                    required
                  />
                </div>

                <div>
                  <Label required>Activity Category</Label>
                  <SelectField
                    icon={Tag}
                    placeholder="Select category"
                    value={form.type}
                    onChange={update("type")}
                    options={[
                      "Technical",
                      "Career",
                      "Sports",
                      "Cultural",
                      "Academics",
                      "Campaign",
                      "Trip",
                    ]}
                    required
                  />
                </div>

                <div>
                  <Label required>Status</Label>
                  <SelectField
                    icon={Sparkles}
                    placeholder="Select status"
                    value={form.status}
                    onChange={update("status")}
                    options={["Upcoming", "Ongoing", "Completed", "Cancelled"]}
                    required
                  />
                </div>
              </div>

              {/* Poster Drop/Upload Area and Live Preview Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                {/* Left Column: Drag & Drop Poster Upload Area */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <Label>Activity Poster Image</Label>
                    {form.image && (
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, image: "" }))}
                        className="text-[11px] font-semibold text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Remove Poster
                      </button>
                    )}
                  </div>

                  {/* Drag & Drop Box */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer?.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className={`flex-1 min-h-[190px] border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      dragOver
                        ? "border-[#0da651] bg-emerald-50/70 scale-[0.99]"
                        : "border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/60 hover:border-emerald-300"
                    }`}
                    onClick={() => document.getElementById("poster-file-input")?.click()}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-[#0da651] flex items-center justify-center mb-2.5 shadow-2xs">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-gray-800">
                      Drag &amp; drop poster image here, or{" "}
                      <span className="text-[#0da651] hover:underline">browse files</span>
                    </p>
                    <input
                      id="poster-file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Supports PNG, JPG, WEBP (Max 5MB)</p>
                  </div>
                </div>

                {/* Right Column: Live Poster Card Preview */}
                <div className="flex flex-col">
                  <Label>Live Poster Preview</Label>

                  <div className="flex-1 min-h-[190px] rounded-xl overflow-hidden relative bg-slate-900 border border-slate-200/80 shadow-md flex flex-col justify-end">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Poster Preview"
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex flex-col items-center justify-center text-white/50 text-xs p-4 text-center">
                        <ImageIcon size={34} className="mb-2 text-white/30" />
                        <p className="font-semibold text-white/70">No Poster Uploaded</p>
                        <p className="text-[11px] text-white/40 mt-0.5">Drag an image file or browse to preview</p>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#0da651] text-white shadow-2xs">
                          {form.type || "Category"}
                        </span>
                        {form.status && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                            {form.status}
                          </span>
                        )}
                      </div>
                      <h4 className="text-white text-sm font-bold leading-tight line-clamp-1">
                        {form.title || "Your Activity Title"}
                      </h4>
                      <p className="text-emerald-100/70 text-[11px] mt-0.5 line-clamp-1">
                        {form.venue || "Venue Location"} &bull; {form.date || "Date"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Schedule, Venue, Capacity & Rewards Logistics */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <NumberBadge value="2" />
                <h3 className="text-sm font-bold text-gray-900">Schedule, Logistics &amp; Rewards</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Event Date */}
                <div>
                  <Label required>Event Date</Label>
                  <TextField
                    icon={CalendarDays}
                    type="date"
                    placeholder="Select event date"
                    value={form.date}
                    onChange={update("date")}
                    required
                  />
                </div>

                {/* Event Time (Start & End Time Component) */}
                <div>
                  <Label required>Time &amp; Schedule</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 block mb-1">Start Time *</span>
                      <div className="relative group">
                        <Clock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                        <input
                          type="time"
                          value={form.startTime || ""}
                          onChange={(e) => handleMainTimeChange("startTime", e.target.value)}
                          className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg pl-7 pr-2 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 cursor-pointer"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 block mb-1">End Time</span>
                      <div className="relative group">
                        <Clock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                        <input
                          type="time"
                          value={form.endTime || ""}
                          onChange={(e) => handleMainTimeChange("endTime", e.target.value)}
                          className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg pl-7 pr-2 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  {form.time && (
                    <span className="text-[10px] font-bold text-[#0da651] block mt-1">
                      Schedule: {form.time}
                    </span>
                  )}
                </div>

                {/* Venue / Location */}
                <div>
                  <Label required>Venue / Location</Label>
                  <TextField
                    icon={MapPin}
                    placeholder="e.g. RCCIIT Main Auditorium / Lab 3"
                    value={form.venue}
                    onChange={update("venue")}
                    required
                  />
                </div>

                {/* Max Capacity */}
                <div>
                  <Label>Max Capacity (Students)</Label>
                  <TextField
                    icon={Users}
                    type="number"
                    placeholder="e.g. 300"
                    value={form.capacity}
                    onChange={update("capacity")}
                  />
                </div>

                {/* MAR / Activity Points */}
                <div>
                  <Label>Activity / MAR Points</Label>
                  <TextField
                    icon={Award}
                    placeholder="e.g. 15 Points"
                    value={form.points}
                    onChange={update("points")}
                  />
                </div>

                {/* Rewards & Prizes */}
                <div>
                  <Label>Rewards &amp; Prizes</Label>
                  <TextField
                    icon={Trophy}
                    placeholder="e.g. Certificates &amp; ₹50,000 Prize Pool"
                    value={form.rewards}
                    onChange={update("rewards")}
                  />
                </div>

                {/* Registration Fee */}
                <div>
                  <Label>Registration Fee</Label>
                  <TextField
                    icon={DollarSign}
                    placeholder="e.g. Free or ₹100"
                    value={form.fee}
                    onChange={update("fee")}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Organizing Committee & Coordinators */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <NumberBadge value="3" />
                <h3 className="text-sm font-bold text-gray-900">Organizing Committee &amp; Faculty Leads</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Department */}
                <div>
                  <Label required>Organizing Department</Label>
                  <SelectField
                    icon={Building2}
                    placeholder="Select department"
                    value={form.department}
                    onChange={update("department")}
                    options={[
                      "Department of Computer Science & Engineering",
                      "Department of Electronics & Communication Engg",
                      "Department of Electrical Engineering",
                      "Department of Computer Applications (BCA/MCA)",
                      "Department of Information Technology",
                      "Student Affairs & Cultural Council",
                      "Sports Committee",
                    ]}
                    required
                  />
                </div>

                {/* Faculty Coordinator */}
                <div>
                  <Label>Faculty Coordinator</Label>
                  <TextField
                    icon={UserCheck}
                    placeholder="e.g. Dr. Alok Nath"
                    value={form.facultyCoordinator}
                    onChange={update("facultyCoordinator")}
                  />
                </div>

                {/* Student Leads */}
                <div>
                  <Label>Student Leads</Label>
                  <TextField
                    icon={Users}
                    placeholder="e.g. Turnab Roy &amp; Priya Sharma"
                    value={form.studentLeads}
                    onChange={update("studentLeads")}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Event Schedule & Agenda Timeline Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <NumberBadge value="4" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Event Schedule &amp; Agenda Timeline Breakdown</h3>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      Select times and break down event milestones with session headings and descriptions
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addTimelineSlot}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-[#0da651] text-[#0da651] hover:text-white border border-emerald-200/80 hover:border-transparent rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  <Plus size={14} className="stroke-[2.5]" />
                  <span>Add Timeline Slot</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left (7 Cols): List of Timeline Slot Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  {timeline.map((slot, idx) => {
                    const color = timelineColorPalette[idx % timelineColorPalette.length];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border border-slate-200/90 border-l-4 ${color.border} ${color.bg} shadow-2xs space-y-3 transition-all`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                            <span className={`text-xs font-bold ${color.text}`}>
                              Timeline Slot #{idx + 1}
                            </span>
                          </div>

                          {timeline.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTimelineSlot(idx)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Slot"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        {/* Row 1: Time Slot Selection */}
                        <div>
                          <Label required>Time Slot</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[10px] font-semibold text-gray-500 block mb-1">Start Time *</span>
                              <div className="relative group">
                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                                <input
                                  type="time"
                                  value={slot.startTime || ""}
                                  onChange={(e) => handleSlotTimeChange(idx, "startTime", e.target.value)}
                                  className="w-full border border-emerald-200/80 bg-white hover:border-emerald-300 rounded-lg pl-8 pr-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 cursor-pointer"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-semibold text-gray-500 block mb-1">End Time</span>
                              <div className="relative group">
                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                                <input
                                  type="time"
                                  value={slot.endTime || ""}
                                  onChange={(e) => handleSlotTimeChange(idx, "endTime", e.target.value)}
                                  className="w-full border border-emerald-200/80 bg-white hover:border-emerald-300 rounded-lg pl-8 pr-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                          {slot.time && (
                            <span className="text-[11px] font-bold text-[#0da651] block mt-1">
                              Selected Slot: {slot.time}
                            </span>
                          )}
                        </div>

                        {/* Row 2: Session Heading / Title */}
                        <div>
                          <Label required>Session Heading / Title</Label>
                          <TextField
                            icon={BookOpen}
                            placeholder="e.g. Student Reporting & Registration Check-in"
                            value={slot.title}
                            onChange={(e) => updateTimelineSlot(idx, "title", e.target.value)}
                          />
                        </div>

                        {/* Row 3: Subtext & Activity Details */}
                        <div>
                          <Label>Subtext &amp; Activity Details</Label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Badge collection, attendance logging, and seating arrangement at venue."
                            value={slot.description}
                            onChange={(e) => updateTimelineSlot(idx, "description", e.target.value)}
                            className="w-full border border-emerald-200/80 bg-white hover:border-emerald-300 rounded-lg p-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
                          />
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={addTimelineSlot}
                    className="w-full py-2.5 border-2 border-dashed border-emerald-300/80 hover:border-[#0da651] bg-[#f4fbf7] hover:bg-emerald-50/60 rounded-xl text-xs font-bold text-[#0da651] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>Add Another Timeline Slot</span>
                  </button>
                </div>

                {/* Right (5 Cols): Live Visual Timeline Preview */}
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#0da651]" />
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Live Timeline Preview
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {timeline.filter((t) => t.title || t.time).length} Milestones
                    </span>
                  </div>

                  {timeline.some((t) => t.title || t.time) ? (
                    <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                      {timeline.map((slot, idx) => {
                        const color = timelineColorPalette[idx % timelineColorPalette.length];
                        return (
                          <div key={idx} className="relative animate-in fade-in duration-150">
                            <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full ${color.dot} ring-4 ${color.ring}`} />
                            <p className={`text-xs font-bold ${color.text}`}>
                              {slot.time || `Time Slot #${idx + 1}`}
                            </p>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">
                              {slot.title || `Agenda Item #${idx + 1}`}
                            </p>
                            {slot.description && (
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {slot.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-gray-400">
                      <ListOrdered size={32} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-xs font-semibold text-gray-600">No timeline slots filled yet</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Select start/end times and type session details on the left to see the timeline render here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Detailed Description, Highlights & Guidelines */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <NumberBadge value="5" />
                <h3 className="text-sm font-bold text-gray-900">Detailed Description, Highlights &amp; Guidelines</h3>
              </div>

              <div className="space-y-4">
                {/* Activity Description */}
                <div>
                  <Label required>Activity Overview &amp; Description</Label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={update("description")}
                    placeholder="Write a comprehensive description of the event, objective, and agenda..."
                    className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg p-3.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Learning Outcomes / Highlights */}
                  <div>
                    <Label>Key Participation Highlights &amp; Outcomes</Label>
                    <textarea
                      rows={3}
                      value={form.highlights}
                      onChange={update("highlights")}
                      placeholder="List key learning outcomes and highlights (one per line)..."
                      className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg p-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
                    />
                  </div>

                  {/* Guidelines & Logistics */}
                  <div>
                    <Label>Eligibility, Guidelines &amp; Logistics</Label>
                    <textarea
                      rows={3}
                      value={form.guidelines}
                      onChange={update("guidelines")}
                      placeholder="List prerequisites, ID requirements, and venue guidelines..."
                      className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg p-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Form Actions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-7 py-2.5 bg-[#0da651] hover:bg-[#0c9548] text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                >
                  {isEditMode ? (
                    <>
                      <Save size={15} />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Publish Activity</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
