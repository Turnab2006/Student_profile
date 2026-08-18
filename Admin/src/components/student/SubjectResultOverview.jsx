import { useState } from "react";
import {
  Award,
  BookOpen,
  Hash,
  Clock,
  FileText,
  FlaskConical,
  CheckCircle2,
  Star,
  Info
} from "lucide-react";

export default function SubjectResultOverview({
  subjects,
  title = "Subject Marks & Grade Breakdown",
  showHeader = true,
  cardClassName = "bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5",
}) {
  const [showResultInfo, setShowResultInfo] = useState(false);

  // Default fallback subject results matching student data
  const defaultSubjects = [
    { code: "CS501", name: "Database Management Systems", credits: 4, internal: "30/30", theory: "68/70", total: "98/100", grade: "O", point: 10 },
    { code: "CS502", name: "Software Engineering & Agile", credits: 4, internal: "29/30", theory: "66/70", total: "95/100", grade: "O", point: 10 },
    { code: "CS503", name: "Theory of Computation", credits: 4, internal: "28/30", theory: "65/70", total: "93/100", grade: "O", point: 10 },
    { code: "CS504", name: "Artificial Intelligence", credits: 3, internal: "29/30", theory: "67/70", total: "96/100", grade: "O", point: 10 },
    { code: "CS591", name: "DBMS Laboratory", credits: 2, internal: "50/50", theory: "49/50", total: "99/100", grade: "O", point: 10 },
  ];

  const items = subjects && subjects.length > 0 ? subjects : defaultSubjects;

  return (
    <div className={cardClassName}>
      {/* Header matching Profile Result Tab style (text-sm sm:text-base font-bold text-slate-800 with border-b) */}
      {showHeader && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Award size={18} className="stroke-[2.2]" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <span>{title}</span>
            </h3>
          </div>

          {/* Interactive Info Button with Hover Pop-up */}
          <div
            className="relative inline-flex items-center group"
            onMouseEnter={() => setShowResultInfo(true)}
            onMouseLeave={() => setShowResultInfo(false)}
          >
            <button
              type="button"
              onClick={() => setShowResultInfo(!showResultInfo)}
              className="h-5 w-5 rounded-full flex items-center justify-center transition-all cursor-pointer bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200/70 hover:border-blue-600 shadow-2xs hover:shadow-xs"
              aria-label="Subject Marks & Grade Information"
            >
              <Info size={11} className="stroke-[2.4]" />
            </button>

            {/* Hover Pop-up Tooltip */}
            <div
              className={`absolute right-0 top-full mt-2 w-72 sm:w-80 p-3 rounded-xl bg-slate-900/95 text-white shadow-xl backdrop-blur-md border border-slate-700/80 z-30 transition-all duration-200 pointer-events-none ${
                showResultInfo
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
              }`}
            >
              {/* Arrow Pointer */}
              <div className="absolute -top-1.5 right-2 sm:right-3 w-3 h-3 bg-slate-900 rotate-45 border-t border-r border-slate-700/80" />

              <div className="relative flex items-start gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white mt-0.5 shadow-2xs">
                  <Info size={11} className="stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-100 leading-snug">
                    Grade Point Calculation
                  </p>
                  <p className="text-[11px] text-slate-300 font-normal leading-relaxed">
                    Internal and Theory marks combine to evaluate final grade points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Table Layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#f0f6ff]/90 text-xs font-bold text-[#1d61e7] rounded-2xl overflow-hidden">
              <th className="py-4 px-5 rounded-l-2xl">
                <div className="flex items-center gap-1.5">
                  <Hash size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>SUBJECT CODE</span>
                </div>
              </th>
              <th className="py-4 px-5">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>SUBJECT NAME</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Clock size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>CREDITS</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <FlaskConical size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>INTERNAL</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <FileText size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>THEORY</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>TOTAL</span>
                </div>
              </th>
              <th className="py-4 px-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Award size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>GRADE</span>
                </div>
              </th>
              <th className="py-4 px-5 rounded-r-2xl text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Star size={14} className="text-[#1d61e7] stroke-[2.4]" />
                  <span>POINT</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const subCode = item.code || item.subjectCode;
              const subName = item.name || item.subject;
              const credits = item.credits !== undefined ? item.credits : 4;
              const internal = item.internal || "--";
              const theory = item.theory || "--";
              const total = item.total || "--";
              const grade = item.grade || "O";
              const point = item.point !== undefined ? item.point : item.gradePoint || 10;

              let gradeBadge = "bg-emerald-50 text-emerald-700 border border-emerald-200/70";
              if (grade === "A+" || grade === "A") {
                gradeBadge = "bg-blue-50 text-blue-700 border border-blue-200/70";
              } else if (grade === "B+" || grade === "B") {
                gradeBadge = "bg-amber-50 text-amber-700 border border-amber-200/70";
              } else if (grade === "F") {
                gradeBadge = "bg-rose-50 text-rose-700 border border-rose-200/70";
              }

              return (
                <tr key={subCode} className="hover:bg-slate-50/70 transition-colors">
                  {/* 1. Subject Code */}
                  <td className="py-4 px-5 font-extrabold text-blue-600 text-sm tracking-tight">
                    {subCode}
                  </td>

                  {/* 2. Subject Name */}
                  <td className="py-4 px-5 font-semibold text-slate-800 text-sm">
                    {subName}
                  </td>

                  {/* 3. Credits */}
                  <td className="py-4 px-5 text-center font-bold text-slate-700 text-xs sm:text-sm">
                    {credits}
                  </td>

                  {/* 4. Internal */}
                  <td className="py-4 px-5 text-center font-medium text-slate-600 text-xs sm:text-sm">
                    {internal}
                  </td>

                  {/* 5. Theory */}
                  <td className="py-4 px-5 text-center font-medium text-slate-600 text-xs sm:text-sm">
                    {theory}
                  </td>

                  {/* 6. Total */}
                  <td className="py-4 px-5 text-center font-extrabold text-slate-900 text-xs sm:text-sm">
                    {total}
                  </td>

                  {/* 7. Grade Badge */}
                  <td className="py-4 px-5 text-center">
                    <span
                      className={`inline-flex items-center justify-center h-7 min-w-7 px-2.5 rounded-lg font-extrabold text-xs shadow-2xs ${gradeBadge}`}
                    >
                      {grade}
                    </span>
                  </td>

                  {/* 8. Point */}
                  <td className="py-4 px-5 text-center font-extrabold text-slate-800 text-sm">
                    {point}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
