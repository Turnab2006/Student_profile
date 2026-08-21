import { useState, useEffect } from "react";
import {
  Type,
  BookOpen,
  CalendarDays,
  FileText,
  Upload,
  ChevronDown,
  Menu,
  Send,
  Save,
  Paperclip,
  X,
  Users,
  ArrowLeft,
  AlertTriangle,
  Clock,
  Activity,
  CalendarCheck,
  Eye,
  FileSpreadsheet,
  File,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredNotices, saveStoredNotices } from "../../data/noticesData";

const categoryColors = {
  Academic:  "bg-purple-100 text-purple-700 border border-purple-200",
  General:   "bg-blue-100 text-blue-700 border border-blue-200",
  Placement: "bg-teal-100 text-teal-700 border border-teal-200",
  Event:     "bg-orange-100 text-orange-700 border border-orange-200",
  Exam:      "bg-rose-100 text-rose-700 border border-rose-200",
  Holiday:   "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const priorityStyles = {
  Urgent: "bg-rose-100 text-rose-700 border border-rose-200",
  High:   "bg-amber-100 text-amber-700 border border-amber-200",
  Medium: "bg-blue-100 text-blue-700 border border-blue-200",
  Low:    "bg-slate-100 text-slate-700 border border-slate-200",
};

const statusStyles = {
  Active:   "bg-green-100 text-green-700 border border-green-200",
  Draft:    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export default function AddNotice({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const [toastMsg, setToastMsg] = useState("");

  const [editingId, setEditingId] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_notice");
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

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_notice");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          title: parsed.title || "",
          category: parsed.category || "Academic",
          priority: parsed.priority || "Medium",
          status: parsed.status || "Active",
          audience: parsed.audience || (isMentor ? "All Mentees" : "All Students"),
          content: parsed.content || "",
          publishDate: parsed.date || new Date().toISOString().split("T")[0],
          expiryDate: parsed.expiryDate || "",
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      title: "",
      category: "",
      priority: "Medium",
      status: "Active",
      audience: isMentor ? "All Mentees" : "All Students",
      content: "",
      publishDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
    };
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("trackademy_editing_notice");
      if (saved) {
        const parsed = JSON.parse(saved);
        setEditingId(parsed.id || null);
        setForm({
          title: parsed.title || "",
          category: parsed.category || "Academic",
          priority: parsed.priority || "Medium",
          status: parsed.status || "Active",
          audience: parsed.audience || (isMentor ? "All Mentees" : "All Students"),
          content: parsed.content || "",
          publishDate: parsed.date || new Date().toISOString().split("T")[0],
          expiryDate: parsed.expiryDate || "",
        });
      }
    } catch (e) {
      console.error("Error loading notice for editing:", e);
    }
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const upd = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFilesAdded = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const newItems = Array.from(fileList).map((f) => {
      const isImg = f.type?.startsWith("image/");
      const ext = f.name?.split(".").pop()?.toUpperCase() || "DOC";
      return {
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
        type: ext,
        isImage: isImg,
        previewUrl: isImg ? URL.createObjectURL(f) : null,
        fileObj: f,
      };
    });
    setFiles((prev) => [...prev, ...newItems]);
    setSelectedPreviewIndex(0);
    showToast("Document attached successfully!");
  };

  const removeFile = (i) => {
    setFiles((prev) => {
      const updated = prev.filter((_, idx) => idx !== i);
      if (selectedPreviewIndex >= updated.length) {
        setSelectedPreviewIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  const canSubmit = form.title.trim() && form.category && form.content.trim();

  const handleReset = () => {
    setForm({
      title: "",
      category: "",
      priority: "Medium",
      status: "Active",
      audience: isMentor ? "All Mentees" : "All Students",
      content: "",
      publishDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
    });
    setFiles([]);
    setEditingId(null);
    localStorage.removeItem("trackademy_editing_notice");
    showToast("Form has been reset.");
  };

  const handleCancel = () => {
    localStorage.removeItem("trackademy_editing_notice");
    if (onNavigate) onNavigate("notices");
  };

  const handleSubmit = (statusOverride) => {
    if (!canSubmit) return;
    const currentNotices = getStoredNotices();
    const resolvedStatus = statusOverride || form.status || "Active";

    if (isEditMode) {
      const updatedNotices = currentNotices.map((n) => {
        if (n.id === editingId) {
          return {
            ...n,
            title: form.title.trim(),
            category: form.category,
            priority: form.priority || "Medium",
            status: resolvedStatus,
            audience: form.audience || n.audience || (isMentor ? "All Mentees" : "All Students"),
            date: form.publishDate || n.date,
            expiryDate: form.expiryDate || "",
            badgeColor:
              resolvedStatus === "Active"
                ? "bg-green-100 text-green-600"
                : resolvedStatus === "Draft"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-200 text-gray-600",
            content: form.content.trim(),
          };
        }
        return n;
      });

      saveStoredNotices(updatedNotices);
      localStorage.removeItem("trackademy_editing_notice");
    } else {
      const nextNum = currentNotices.length + 1;
      const newId = `NTC${String(nextNum).padStart(3, "0")}`;

      const finalNotice = {
        id: newId,
        title: form.title.trim(),
        category: form.category,
        priority: form.priority || "Medium",
        status: resolvedStatus,
        audience: form.audience || (isMentor ? "All Mentees" : "All Students"),
        date: form.publishDate || new Date().toISOString().split("T")[0],
        expiryDate: form.expiryDate || "",
        badgeColor:
          resolvedStatus === "Active"
            ? "bg-green-100 text-green-600"
            : resolvedStatus === "Draft"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-gray-200 text-gray-600",
        author: isMentor ? user?.name || "Kaushik Chatterjee (Mentor)" : "Super Admin",
        content: form.content.trim(),
      };

      saveStoredNotices([finalNotice, ...currentNotices]);
    }

    if (onNavigate) {
      onNavigate("notices");
    }
  };

  const currentPreviewFile = files[selectedPreviewIndex] || null;

  const getDocTypeIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText size={24} className="text-red-500" />;
      case "DOC":
      case "DOCX":
        return <FileText size={24} className="text-blue-500" />;
      case "XLS":
      case "XLSX":
      case "CSV":
        return <FileSpreadsheet size={24} className="text-emerald-500" />;
      default:
        return <File size={24} className="text-emerald-600" />;
    }
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

      {/* Top Header */}
      {!isMentor && (
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
                {isEditMode ? "Edit Notice" : "Create Notice"}
              </h1>
              <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={handleCancel}>
                  Notices
                </span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">
                  {isEditMode ? "Edit Notice" : "Create Notice"}
                </span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        <div className="w-full space-y-5">
          {/* Header Banner */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-5 py-4 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative z-10 flex items-center gap-3.5">
              <button
                type="button"
                onClick={handleCancel}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 border border-white/25 shadow-2xs transition-all cursor-pointer active:scale-95"
                title="Back to Notices"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isEditMode ? "Edit Announcement" : "Create Campus Announcement"}
                </h2>
                <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                  {isEditMode
                    ? "Modify notice details, validity period, priority level, and target audience"
                    : "Broadcast academic circulars, exam schedules, and official notices to students & staff"}
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

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Notice Details &amp; Configuration</h3>
              {isEditMode && (
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                  ID: {editingId}
                </span>
              )}
            </div>

            {/* Row 1: Notice Title */}
            <div>
              <Label required>Notice Title</Label>
              <div className="relative">
                <Type size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter notice title (e.g., Semester Exam Schedule 2026)"
                  value={form.title}
                  onChange={upd("title")}
                  className="w-full pl-10 pr-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Category, Priority, Status, and Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <Label required>Category</Label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <select
                    value={form.category}
                    onChange={upd("category")}
                    className="w-full pl-10 pr-8 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select category</option>
                    <option value="Academic">Academic</option>
                    <option value="General">General</option>
                    <option value="Placement">Placement</option>
                    <option value="Event">Event</option>
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority */}
              <div>
                <Label required>Priority Level</Label>
                <div className="relative">
                  <AlertTriangle size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <select
                    value={form.priority}
                    onChange={upd("priority")}
                    className="w-full pl-10 pr-8 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status */}
              <div>
                <Label required>Notice Status</Label>
                <div className="relative">
                  <Activity size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <select
                    value={form.status}
                    onChange={upd("status")}
                    className="w-full pl-10 pr-8 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <Label required>Target Audience</Label>
                <div className="relative">
                  <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <select
                    value={form.audience}
                    onChange={upd("audience")}
                    className="w-full pl-10 pr-8 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                  >
                    <option value="All Students">All Students</option>
                    <option value="1st Year Students">1st Year Students</option>
                    <option value="2nd Year Students">2nd Year Students</option>
                    <option value="3rd Year Students">3rd Year Students</option>
                    <option value="4th Year Students">4th Year Students</option>
                    <option value="All Mentees">All Mentees</option>
                    <option value="Faculty & Staff">Faculty &amp; Staff</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: Publish Date & Expiry Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label required>Publish Date</Label>
                <div className="relative">
                  <CalendarDays size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <input
                    type="date"
                    value={form.publishDate}
                    onChange={upd("publishDate")}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <Label>Expiry Date / Valid Till (Optional)</Label>
                <div className="relative">
                  <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={upd("expiryDate")}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Notice Content */}
            <div>
              <Label required>Notice Content &amp; Announcement Details</Label>
              <textarea
                rows={4}
                placeholder="Write full announcement details, official instructions, venue, and important guidelines..."
                value={form.content}
                onChange={upd("content")}
                className="w-full p-3.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
              />
            </div>

            {/* Row 5: Attach Files Area AND Document Preview in the SAME ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              {/* Left Column: Drag & Drop Attach Files Area */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <Label>Attach Files / Circulars (Optional)</Label>
                  {files.length > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {files.length} file{files.length > 1 ? "s" : ""} selected
                    </span>
                  )}
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFilesAdded(e.dataTransfer.files);
                  }}
                  className={`flex-1 min-h-[210px] border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all ${
                    dragOver
                      ? "border-[#0da651] bg-emerald-50 scale-[0.99]"
                      : "border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/60 hover:border-emerald-300"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-[#0da651] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    Drag &amp; drop files here, or{" "}
                    <label className="text-[#0da651] hover:underline cursor-pointer">
                      browse files
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFilesAdded(e.target.files)}
                      />
                    </label>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">Supports PDF, DOCX, JPG, PNG (Max 10MB)</p>
                </div>

                {/* Selected Files Chips */}
                {files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {files.map((f, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedPreviewIndex(i)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                          selectedPreviewIndex === i
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs ring-1 ring-emerald-400/30"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Paperclip size={12} className={selectedPreviewIndex === i ? "text-emerald-600" : "text-gray-400"} />
                        <span className="truncate max-w-[130px]">{f.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(i);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-red-50 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Attached Document Preview */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <Label>Attached Document Preview</Label>
                  {currentPreviewFile && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 flex items-center gap-1">
                      <Eye size={11} /> File Preview
                    </span>
                  )}
                </div>

                <div className="flex-1 min-h-[210px] rounded-xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5 flex flex-col justify-center items-center relative overflow-hidden">
                  {currentPreviewFile ? (
                    currentPreviewFile.isImage && currentPreviewFile.previewUrl ? (
                      /* Image File Preview */
                      <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-slate-900 shadow-inner flex items-center justify-center">
                          <img
                            src={currentPreviewFile.previewUrl}
                            alt={currentPreviewFile.name}
                            className="w-full h-full object-contain"
                          />
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-white rounded text-[10px] font-mono backdrop-blur-xs">
                            {currentPreviewFile.type}
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between text-xs px-1">
                          <span className="font-semibold text-gray-800 truncate max-w-[200px]" title={currentPreviewFile.name}>
                            {currentPreviewFile.name}
                          </span>
                          <span className="text-gray-400 font-mono text-[11px]">{currentPreviewFile.size}</span>
                        </div>
                      </div>
                    ) : (
                      /* Document / PDF File Preview */
                      <div className="w-full h-full flex flex-col justify-between py-1">
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
                          <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                            {getDocTypeIcon(currentPreviewFile.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#0da651] text-white rounded">
                                {currentPreviewFile.type}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono">{currentPreviewFile.size}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-1" title={currentPreviewFile.name}>
                              {currentPreviewFile.name}
                            </h4>
                            <p className="text-[11px] text-emerald-700 mt-0.5 flex items-center gap-1 font-medium">
                              <CheckCircle2 size={12} /> Ready to attach with notice
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-1.5 mt-3">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400">File Type:</span>
                            <span className="font-semibold text-gray-700">{currentPreviewFile.type} Document</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400">File Size:</span>
                            <span className="font-mono text-gray-700 font-semibold">{currentPreviewFile.size}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-[#0da651] font-semibold flex items-center gap-1">
                              <CheckCircle2 size={11} /> Attached
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    /* Empty State when no document is attached */
                    <div className="text-center py-6 px-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2.5">
                        <FileText size={22} className="text-gray-400" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-700">No Document Attached</h4>
                      <p className="text-[11px] text-gray-400 mt-1 max-w-[220px] mx-auto">
                        Attach a PDF circular, notice image, or document on the left to preview it here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 6: Form Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => handleSubmit("Draft")}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    canSubmit
                      ? "border-[#0da651] text-[#0da651] hover:bg-emerald-50"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Save size={14} />
                  <span>Save as Draft</span>
                </button>
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => handleSubmit()}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm ${
                    canSubmit
                      ? "bg-[#0da651] text-white hover:bg-[#0c9548] hover:shadow active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={14} />
                  <span>{isEditMode ? "Save Changes" : "Publish Notice"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
