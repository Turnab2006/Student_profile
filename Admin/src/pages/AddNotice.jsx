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
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export default function AddNotice({ onNavigate }) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    publishDate: "",
    status: "Draft",
  });

  const upd = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const canSubmit = form.title && form.category && form.content;

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate?.("notices")}>
            <Menu size={20} className="text-gray-500" />
          </button>
          <h1 className="text-base font-semibold text-gray-800">Create Notice</h1>
        </div>
        <AdminProfile />
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-5">Notice Details</h2>

            {/* Title */}
            <div className="mb-4">
              <Label required>Notice Title</Label>
              <div className="relative">
                <Type size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="Enter notice title" value={form.title} onChange={upd("title")}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
            </div>

            {/* Category + Publish Date */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label required>Category</Label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select value={form.category} onChange={upd("category")}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 appearance-none">
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
                <Label required>Publish Date</Label>
                <input type="date" value={form.publishDate} onChange={upd("publishDate")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
            </div>

            {/* Status */}
            <div className="mb-4">
              <Label required>Status</Label>
              <div className="flex gap-4">
                {["Draft", "Active"].map((s) => (
                  <label key={s} className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    form.status === s ? "border-primary bg-green-50 text-primary" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}>
                    <input type="radio" name="status" value={s} checked={form.status === s} onChange={upd("status")} className="hidden" />
                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                      form.status === s ? "border-primary" : "border-gray-300"
                    }`}>
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
                <textarea placeholder="Write the notice content here..." value={form.content} onChange={upd("content")} rows={8}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300 resize-y min-h-[160px]" />
              </div>
            </div>

            {/* File Attachments */}
            <div className="mb-6">
              <Label>Attachments (optional)</Label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files).map((f) => f.name)]); }}
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
              <button onClick={() => onNavigate?.("notices")}
                className="text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <div className="flex items-center gap-3">
                <button disabled={!canSubmit}
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    canSubmit ? "border border-primary text-primary hover:bg-green-50" : "border border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}>
                  <Save size={14} />
                  Save as Draft
                </button>
                <button disabled={!canSubmit}
                  className={`flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-lg transition-colors ${
                    canSubmit ? "bg-primary text-white hover:bg-green-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
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
