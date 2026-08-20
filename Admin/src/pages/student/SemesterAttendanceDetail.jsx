import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  CalendarClock,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import SubjectAttendanceOverview from "../../components/student/SubjectAttendanceOverview";

export default function SemesterAttendanceDetail({
  semester,
  allSemesters = [],
  onBack,
  onSelectSemester,
  onDownload,
  userRole = null,
  theme = null,
  isMentor = false,
}) {
  const isMentorMode = isMentor || userRole === 'mentor' || theme === 'purple';
  const semNum = Number(semester?.semester) || 1;

  // Helper for ordinal semester title (e.g. 1st, 2nd, 3rd, 5th Semester Attendance)
  const getOrdinalSemester = (n) => {
    const num = Number(n);
    if (num === 1) return "1st Semester Attendance";
    if (num === 2) return "2nd Semester Attendance";
    if (num === 3) return "3rd Semester Attendance";
    return `${num}th Semester Attendance`;
  };

  const currentIdx = allSemesters.findIndex((s) => s.semester === semester?.semester);
  const prevSem = currentIdx > 0 ? allSemesters[currentIdx - 1] : null;
  const nextSem = currentIdx < allSemesters.length - 1 ? allSemesters[currentIdx + 1] : null;

  return (
    <div className="space-y-5 font-['Roboto',sans-serif] w-full animate-in fade-in duration-200">

      {/* Top Header Card with Blue / Purple Gradient Background */}
      <div className={`relative overflow-hidden ${
        isMentorMode
          ? "bg-gradient-to-r from-[#5b32e8] via-[#7656f4] to-[#9073fa] border-purple-400/30 shadow-purple-700/15"
          : "bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] border-blue-400/30 shadow-blue-700/15"
      } rounded-2xl border shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-['Roboto',sans-serif]`}>

        {/* Soft light gradient highlight on the right side for optimal button contrast */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/12 via-white/5 to-transparent pointer-events-none" />

        {/* Left: Back Button & Dynamic Semester Title */}
        <div className="flex items-center gap-3.5 z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/25 text-white shadow-xs backdrop-blur-md transition-all cursor-pointer group active:scale-95"
            title="Go back to Semester Attendance"
          >
            <ArrowLeft size={19} className="group-hover:-translate-x-0.5 transition-transform stroke-[2.4]" />
          </button>

          <div className="ml-1 sm:ml-2">
            <h1 className="text-xl sm:text-xl font-bold text-white tracking-tight leading-tight drop-shadow-xs">
              {getOrdinalSemester(semNum)}
            </h1>
            <p className={`text-xs sm:text-xs ${isMentorMode ? "text-purple-100/90" : "text-blue-100/90"} font-medium mt-0.5`}>
              Academic Year {semester?.academicYear || "2024 - 2025"} &bull; Total Classes Held: <strong className="text-white font-bold">{semester?.totalHeld || 60}</strong>
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons & Semester Pager */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap z-10">
          {/* Semester Prev/Next Navigator */}
          {allSemesters.length > 0 && (
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md p-1 rounded-xl border border-white/25 shadow-xs">
              <button
                type="button"
                disabled={!prevSem}
                onClick={() => prevSem && onSelectSemester(prevSem)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title={prevSem ? `Go to Sem ${prevSem.semester}` : "No previous semester"}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold text-white px-2.5 select-none tracking-wide">
                Sem {semNum} / {allSemesters.length}
              </span>
              <button
                type="button"
                disabled={!nextSem}
                onClick={() => nextSem && onSelectSemester(nextSem)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title={nextSem ? `Go to Sem ${nextSem.semester}` : "No next semester"}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Download Report Button (High-contrast White CTA) */}
          <button
            type="button"
            onClick={() => onDownload && onDownload(semester)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 bg-white ${
              isMentorMode ? "hover:bg-purple-50 text-[#7656f4] shadow-purple-950/20" : "hover:bg-blue-50 text-[#1d4ed8] shadow-blue-950/20"
            } rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer`}
          >
            <Download size={15} className={`stroke-[2.5] ${isMentorMode ? "text-[#7656f4]" : "text-[#1d4ed8]"}`} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards for this Semester */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Overall Attendance (Emerald Theme) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-emerald-200 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
            <CheckCircle2 size={24} className="stroke-[2.2]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overall Attendance</p>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-0.5">
              {semester?.attendance || "88.5"}%
            </p>
            <p className="text-[11px] text-slate-500 font-medium truncate">Above minimum (75%)</p>
          </div>
        </div>

        {/* 2. Present Classes (Blue / Purple Theme) */}
        <div className={`bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 ${isMentorMode ? "hover:border-purple-200" : "hover:border-blue-200"} transition-colors`}>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
            isMentorMode ? "bg-[#f0eaff] text-[#7656f4] border border-purple-100/80" : "bg-blue-50 text-blue-600 border border-blue-100/80"
          }`}>
            <UserCheck size={24} className="stroke-[2.2]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Present Classes</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-0.5">
              {semester?.attended || 212} / {semester?.totalHeld || 240}
            </p>
            <p className={`text-[11px] ${isMentorMode ? "text-[#7656f4]" : "text-blue-600"} font-medium truncate`}>Recorded lectures</p>
          </div>
        </div>

        {/* 3. Leaves Approved (Yellow Theme) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-amber-200 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-2xs">
            <CalendarClock size={24} className="stroke-[2.2]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Leaves Approved</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-0.5">
              {semester?.leavesApproved || 6} Days
            </p>
            <p className="text-[11px] text-amber-600 font-medium truncate">Medical &amp; Event excused</p>
          </div>
        </div>

        {/* 4. Absence Status (Rose Theme) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-rose-200 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/80 shadow-2xs">
            <UserX size={24} className="stroke-[2.2]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Absence Status</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-0.5">
              {semester?.absent || 28} Days
            </p>
            <p className="text-[11px] text-rose-500 font-medium truncate">Regular standing</p>
          </div>
        </div>
      </div>

      {/* Main Reusable Subject Attendance Overview Table */}
      <SubjectAttendanceOverview
        subjects={semester?.subjects}
        title="Subject Attendance Overview"
        showHeader={true}
        cardClassName="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-md shadow-slate-200/60 space-y-5"
        isMentor={isMentorMode}
      />

    </div>
  );
}

