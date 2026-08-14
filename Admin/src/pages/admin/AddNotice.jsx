import { useState } from "react";
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
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredNotices, saveStoredNotices } from "../../data/noticesData";

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export default function AddNotice({ onNavigate, onOpenSidebar, isMentor = false, user = null }) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    audience: isMentor ? "All Mentees" : "All Students",
    content: "",
    publishDate: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  const upd = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const canSubmit = form.title && form.category && form.content;

  const handleSubmit = (statusOverride) => {
    if (!canSubmit) return;
    const currentNotices = getStoredNotices();
    const nextNum = currentNotices.length + 1;
    const newId = `NTC${String(nextNum).padStart(3, "0")}`;

    const finalNotice = {
      id: newId,
      title: form.title,
      category: form.category,
      audience: form.audience || (isMentor ? "All Mentees" : "All Students"),
      date: form.publishDate || new Date().toISOString().split("T")[0],
      status: statusOverride || form.status || "Active",
      badgeColor: (statusOverride || form.status) === "Active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600",
      author: isMentor ? (user?.name || "Kaushik Chatterjee (Mentor)") : "Super Admin",
      content: form.content,
    };

    saveStoredNotices([finalNotice, ...currentNotices]);
    if (onNavigate) {
      onNavigate("notices");
    }
  };

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
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Create Notice</h1>
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("notices")}>Notices</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Create Notice</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
              <h2 className="text-sm font-semibold text-gray-800">Notice Details</h2>
              {isMentor && (
                <button
                  type="button"
                  onClick={() => onNavigate?.("notices")}
                  className="text-xs text-gray-500 hover:text-gray-700 underline font-medium cursor-pointer"
                >
                  &larr; Back to Notices
                </button>
              )}
            </div>

            {/* Title */}
            <div className="mb-4">
              <Label required>Notice Title</Label>
              <div className="relative">
                <Type size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter notice title"
                  value={form.title}
                  onChange={upd("title")}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Category + Target Audience + Publish Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <Label required>Category</Label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    value={form.category}
                    onChange={upd("category")}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select category</option>
                    <option>Academic</option>
                    <option>General</option>
                    <option>Placement</option>
                    <option>Event</option>
                    <option>Exam</option>
                    <option>Holiday</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <Label required>Target Audience</Label>
                <div className="relative">
                  <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. All Students, CSE 3rd Year"
                    value={form.audience}
                    onChange={upd("audience")}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>
              <div>
                <Label required>Publish Date</Label>
                <input
                  type="date"
                  value={form.publishDate}
                  onChange={upd("publishDate")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            {/* Status */}
            <div className="mb-4">
              <Label required>Status</Label>
              <div className="flex gap-4">
                {["Draft", "Active"].map((s) => (
                  <label
                    key={s}
                    className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                      form.status === s ? "border-primary bg-green-50 text-primary" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <input type="radio" name="status" value={s} checked={form.status === s} onChange={upd("status")} className="hidden" />
                    <span
                      className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        form.status === s ? "border-primary" : "border-gray-300"
                      }`}
                    >
                      {form.status === s && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </span>
                    {s === "Active" ? "Published" : s}
                  </label>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <Label required>Notice Content</Label>
              <div className="relative">
                <textarea
                  placeholder="Write the notice content here..."
                  value={form.content}
                  onChange={upd("content")}
                  rows={8}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300 resize-y min-h-[160px]"
                />
              </div>
            </div>

            {/* File Attachments */}
            <div className="mb-6">
              <Label>Attachments (optional)</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files).map((f) => f.name)]);
                }}
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 transition-colors ${
                  dragOver ? "border-primary bg-green-50" : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                  <Paperclip size={18} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-700">Drag &amp; drop files here</p>
                <p className="text-xs text-gray-400">or</p>
                <label className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <Upload size={13} />
                  Browse Files
                  <input type="file" multiple className="hidden" onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files).map((f) => f.name)])} />
                </label>
                <p className="text-[11px] text-gray-400">PDF, DOC, DOCX, PNG, JPG. Max 5MB each</p>
              </div>

              {files.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <FileText size={13} className="text-gray-400" />
                        <span className="text-xs text-gray-600">{f}</span>
                      </div>
                      <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => onNavigate?.("notices")}
                className="text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => handleSubmit("Draft")}
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    canSubmit ? "border border-[#0da651] text-[#0da651] hover:bg-green-50" : "border border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Save size={14} />
                  Save as Draft
                </button>
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => handleSubmit("Active")}
                  className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer ${
                    canSubmit ? "bg-[#0da651] text-white hover:bg-green-600 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={14} />
                  Publish Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
