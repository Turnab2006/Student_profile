import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Users,
  User,
  Edit,
  Trash2,
  FileText,
  Paperclip,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Download,
  BookOpen,
  Tag,
  ShieldCheck,
  Eye,
  FileSpreadsheet,
  File,
} from "lucide-react";

// Category Badges & Colors
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

const priorityBoxThemes = {
  Urgent: {
    bg: "bg-rose-50/70",
    border: "border-rose-100 border-l-4 border-l-rose-500",
    label: "text-rose-700",
    icon: "text-rose-600",
    sub: "text-rose-600",
  },
  High: {
    bg: "bg-amber-50/70",
    border: "border-amber-100 border-l-4 border-l-amber-500",
    label: "text-amber-700",
    icon: "text-amber-600",
    sub: "text-amber-600",
  },
  Medium: {
    bg: "bg-blue-50/70",
    border: "border-blue-100 border-l-4 border-l-blue-500",
    label: "text-blue-700",
    icon: "text-blue-600",
    sub: "text-blue-600",
  },
  Low: {
    bg: "bg-slate-50",
    border: "border-slate-200 border-l-4 border-l-slate-400",
    label: "text-slate-700",
    icon: "text-slate-600",
    sub: "text-slate-500",
  },
};

const statusStyles = {
  Active:   "bg-green-100 text-green-700 border border-green-200",
  Draft:    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function NoticeDetailView({
  notice,
  onBack,
  onEdit,
  onDelete,
  isMentor = false,
  isStudent = false,
}) {
  if (!notice) return null;

  const isStudentPortal = isStudent || (!isMentor && isStudent);
  const isMentorPortal = isMentor;
  const isAdmin = !isStudent && !isMentor;

  // Attached files
  const attachedFiles = notice.files || (notice.hasAttachment ? [
    {
      name: notice.attachmentName || `${notice.id || 'Notice'}_Circular.pdf`,
      size: notice.attachmentSize || "420.5 KB",
      type: "PDF",
    }
  ] : [
    {
      name: `${notice.id || 'Notice'}_Official_Circular.pdf`,
      size: "420.5 KB",
      type: "PDF",
    },
  ]);

  const getDocTypeIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText size={22} className="text-red-500" />;
      case "DOC":
      case "DOCX":
        return <FileText size={22} className="text-blue-500" />;
      case "XLS":
      case "XLSX":
      case "CSV":
        return <FileSpreadsheet size={22} className="text-emerald-500" />;
      default:
        return <File size={22} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />;
    }
  };

  const priorityTheme = priorityBoxThemes[notice.priority || "Medium"] || priorityBoxThemes.Medium;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200 font-['Roboto',sans-serif]">
      {/* Top Header / Action Bar with Back Button */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className={`w-10 h-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 text-gray-700 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs border border-gray-200/60 ${
              isStudentPortal
                ? "hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                : isMentorPortal
                ? "hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                : ""
            }`}
            title="Back to Notices"
            aria-label="Back to Notices"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">
              {notice.title}
            </h2>
          </div>
        </div>

        {/* Action Buttons: Only show Edit and Delete for Admin (no edit/delete or 3-dots for student/mentor) */}
        {isAdmin ? (
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => onEdit?.(notice)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0da651] hover:bg-[#0c9548] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Edit size={14} />
              <span>Edit Notice</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(notice.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        ) : (
          attachedFiles.length > 0 && (
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={() => alert(`Downloading circular: ${attachedFiles[0].name}`)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 text-white ${
                  isStudentPortal
                    ? "bg-[#2563eb] hover:bg-[#1d4ed8]"
                    : "bg-[#7656f4] hover:bg-[#6242e2]"
                }`}
              >
                <Download size={14} />
                <span>Download Attachment</span>
              </button>
            </div>
          )
        )}
      </div>

      {/* Hero Notice Banner */}
      <section
        className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 shadow-md text-white space-y-4 ${
          isStudentPortal
            ? "bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e40af] border-blue-600/30 shadow-blue-900/10"
            : isMentorPortal
            ? "bg-gradient-to-r from-[#7656f4] via-[#6845f2] to-[#5531dc] border-purple-600/30 shadow-purple-900/10"
            : "bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border-emerald-600/30 shadow-emerald-900/10"
        }`}
      >
        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          {notice.category && (
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md ${
                categoryColors[notice.category] || "bg-white/20 text-white"
              }`}
            >
              <Tag size={12} />
              <span>{notice.category}</span>
            </span>
          )}

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-md ${
              priorityStyles[notice.priority || "Medium"] || priorityStyles.Medium
            }`}
          >
            <AlertTriangle size={12} />
            <span>{notice.priority || "Medium"} Priority</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
              statusStyles[notice.status] || "bg-white/20 text-white"
            }`}
          >
            <Activity size={12} />
            <span>{notice.status}</span>
          </span>

          <span className="text-xs font-mono font-bold text-white/90 ml-auto bg-black/25 px-2.5 py-1 rounded-lg border border-white/25 backdrop-blur-xs">
            ID: {notice.id}
          </span>
        </div>

        {/* Notice Title */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight">
            {notice.title}
          </h1>
        </div>

        {/* Key Logistics Pills */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-xs text-white">
            <CalendarDays size={14} className="text-white/90" />
            <span>Published: <strong className="font-semibold">{notice.date}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-xs text-white">
            <Clock size={14} className="text-white/90" />
            <span>Valid Till: <strong className="font-semibold">{notice.expiryDate || "No Expiry / Open-ended"}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-xs text-white">
            <Users size={14} className="text-white/90" />
            <span>Target Audience: <strong className="font-semibold">{notice.audience || "All Students"}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-xs text-white">
            <User size={14} className="text-white/90" />
            <span>Issued By: <strong className="font-semibold">{notice.author || "Super Admin"}</strong></span>
          </div>
        </div>

        {/* Decorative background blur */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* 2-Column Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Left Column: Official Announcement Content & Target Scope (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Announcement Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FileText size={16} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />
                <span>Notice Announcement Content &amp; Details</span>
              </h3>
              <span className="text-[11px] text-gray-400 font-medium">Official Notice</span>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border text-gray-800 text-sm leading-relaxed whitespace-pre-wrap ${
              isStudentPortal
                ? "bg-[#f8faff] border-blue-100/80"
                : isMentorPortal
                ? "bg-[#faf8ff] border-purple-100/80"
                : "bg-[#f8fbf9] border-emerald-100/80"
            }`}>
              {notice.content || notice.description || notice.fullContent}
            </div>

            {/* Important Notice Guidelines Banner */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle size={17} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-amber-950 mb-0.5">Important Notice Instruction:</strong>
                <span>
                  All concerned students and department members falling under the{" "}
                  <strong>{notice.audience || "target group"}</strong> are advised to follow the
                  guidelines and deadlines mentioned in this announcement.
                </span>
              </div>
            </div>
          </div>

          {/* Target Audience & Scope Card with distinct colors for each box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Users size={16} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />
                <span>Target Audience &amp; Broadcast Scope</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Box 1: Applicable Audience (Purple Theme) */}
              <div className="p-4 rounded-2xl bg-[#faf5ff] border border-purple-200/80 border-l-4 border-l-purple-500 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Applicable Audience</span>
                  <Users size={15} className="text-purple-600" />
                </div>
                <p className="text-sm sm:text-base font-extrabold text-gray-900">{notice.audience || "All Students"}</p>
                <p className="text-[11px] text-purple-600 mt-1 font-medium">Broadcast recipient group</p>
              </div>

              {/* Box 2: Category (Themed) */}
              <div className={`p-4 rounded-2xl border-l-4 shadow-2xs ${
                isStudentPortal
                  ? "bg-[#f0f7ff] border-blue-200/80 border-l-blue-500"
                  : isMentorPortal
                  ? "bg-[#faf5ff] border-purple-200/80 border-l-purple-500"
                  : "bg-[#f0fdf4] border-emerald-200/80 border-l-emerald-500"
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    isStudentPortal ? "text-blue-700" : isMentorPortal ? "text-purple-700" : "text-emerald-700"
                  }`}>Category</span>
                  <BookOpen size={15} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />
                </div>
                <p className="text-sm sm:text-base font-extrabold text-gray-900">{notice.category}</p>
                <p className={`text-[11px] mt-1 font-medium ${
                  isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"
                }`}>Departmental classification</p>
              </div>

              {/* Box 3: Priority Ranking (Themed by Priority Level) */}
              <div className={`p-4 rounded-2xl ${priorityTheme.bg} ${priorityTheme.border} shadow-2xs`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${priorityTheme.label}`}>Priority Ranking</span>
                  <AlertTriangle size={15} className={priorityTheme.icon} />
                </div>
                <p className="text-sm sm:text-base font-extrabold text-gray-900">{notice.priority || "Medium"}</p>
                <p className={`text-[11px] mt-1 font-medium ${priorityTheme.sub}`}>Urgency of announcement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Attached Documents & Schedule Logistics (1 col) */}
        <div className="space-y-5">
          {/* Attached Files & Circulars Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Paperclip size={16} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />
                <span>Attached Circulars &amp; Files</span>
              </h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                isStudentPortal
                  ? "text-blue-700 bg-blue-50 border-blue-200"
                  : isMentorPortal
                  ? "text-purple-700 bg-purple-50 border-purple-200"
                  : "text-emerald-700 bg-emerald-50 border-emerald-200"
              }`}>
                {attachedFiles.length} File{attachedFiles.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-2.5">
              {attachedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    isStudentPortal
                      ? "bg-blue-50/60 border-blue-200/70 hover:bg-blue-50"
                      : isMentorPortal
                      ? "bg-purple-50/60 border-purple-200/70 hover:bg-purple-50"
                      : "bg-emerald-50/60 border-emerald-200/70 hover:bg-emerald-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      {getDocTypeIcon(file.type || "PDF")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 font-mono">{file.size || "350 KB"}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading circular: ${file.name}`)}
                    className={`p-2 rounded-xl transition-all cursor-pointer shadow-2xs border shrink-0 ${
                      isStudentPortal
                        ? "text-blue-700 hover:bg-white border-blue-200/60"
                        : isMentorPortal
                        ? "text-purple-700 hover:bg-white border-purple-200/60"
                        : "text-emerald-700 hover:bg-white border-emerald-200/60"
                    }`}
                    title="Download Document"
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Timeline & Validity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Clock size={16} className={isStudentPortal ? "text-blue-600" : isMentorPortal ? "text-purple-600" : "text-emerald-600"} />
                <span>Notice Schedule &amp; Timeline</span>
              </h3>
            </div>

            {/* Vertical Flow Steps */}
            <div className={`relative pl-6 space-y-5 border-l-2 ml-2 py-1 ${
              isStudentPortal ? "border-blue-200" : isMentorPortal ? "border-purple-200" : "border-emerald-200"
            }`}>
              {/* Step 1: Published */}
              <div className="relative">
                <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                  isStudentPortal
                    ? "bg-[#2563eb] ring-4 ring-blue-100"
                    : isMentorPortal
                    ? "bg-[#7656f4] ring-4 ring-purple-100"
                    : "bg-[#0da651] ring-4 ring-emerald-100"
                }`} />
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isStudentPortal
                      ? "text-blue-700 bg-blue-50 border-blue-200"
                      : isMentorPortal
                      ? "text-purple-700 bg-purple-50 border-purple-200"
                      : "text-emerald-700 bg-emerald-50 border-emerald-200"
                  }`}>
                    Published On
                  </span>
                  <p className="text-xs font-bold text-gray-900 mt-1">{notice.date}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Broadcasted by {notice.author || "Admin"}</p>
                </div>
              </div>

              {/* Step 2: Validity */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Valid Until / Expiry
                  </span>
                  <p className="text-xs font-bold text-gray-900 mt-1">{notice.expiryDate || "No Expiry (Active indefinitely)"}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">End of official active notice window</p>
                </div>
              </div>

              {/* Step 3: Current Status */}
              <div className="relative">
                <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                  isStudentPortal
                    ? "bg-blue-600 ring-4 ring-blue-100"
                    : isMentorPortal
                    ? "bg-purple-600 ring-4 ring-purple-100"
                    : "bg-emerald-600 ring-4 ring-emerald-100"
                }`} />
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isStudentPortal
                      ? "text-blue-700 bg-blue-50 border-blue-200"
                      : isMentorPortal
                      ? "text-purple-700 bg-purple-50 border-purple-200"
                      : "text-emerald-700 bg-emerald-50 border-emerald-200"
                  }`}>
                    Broadcast Status
                  </span>
                  <p className="text-xs font-bold text-gray-900 mt-1">{notice.status || "Active"}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Visible on all student and mentor portals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
