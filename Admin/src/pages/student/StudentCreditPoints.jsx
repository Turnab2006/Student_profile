import { useState } from "react";
import {
  Trophy,
  Star,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
  Filter,
  TrendingUp,
  Download
} from "lucide-react";

export default function StudentCreditPoints({ hideHeader = false }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const creditSummary = {
    totalPoints: 45,
    requiredPoints: 60,
    technical: 25,
    certifications: 15,
    attendance: 5,
  };

  const activities = [
    {
      id: "CRD-001",
      title: "TECHNOVATE 2026 Hackathon Winner",
      category: "technical",
      points: 15,
      date: "May 20, 2026",
      issuer: "CSE Dept & Tech Club",
      status: "Approved",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "CRD-002",
      title: "AWS Cloud Practitioner Certification",
      category: "certifications",
      points: 10,
      date: "Apr 15, 2026",
      issuer: "Amazon Web Services",
      status: "Approved",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "CRD-003",
      title: "AI Workshop & Coding Sprint",
      category: "technical",
      points: 10,
      date: "Mar 10, 2026",
      issuer: "ACM Student Chapter",
      status: "Approved",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "CRD-004",
      title: "Python Data Structures Mastery",
      category: "certifications",
      points: 5,
      date: "Feb 22, 2026",
      issuer: "Coursera / Trackademy",
      status: "Approved",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "CRD-005",
      title: "Semester 4 Exemplary Attendance (>90%)",
      category: "attendance",
      points: 5,
      date: "Jan 30, 2026",
      issuer: "Academic Dean Office",
      status: "Approved",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const filteredActivities =
    activeCategory === "all"
      ? activities
      : activities.filter((act) => act.category === activeCategory);

  return (
    <div className="p-4 sm:p-6 space-y-5 font-['Roboto',sans-serif]">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
              Credit Points &amp; Achievements
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Track your extracurricular, technical, and academic credits.
            </p>
          </div>
        </div>
      )}

      {/* Top Banner Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-xs">
              <Trophy size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {creditSummary.totalPoints}
                </h2>
                <span className="text-sm font-bold text-gray-400">/ {creditSummary.requiredPoints} Points</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  75% of Degree Goal
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                15 more credit points needed to complete graduation threshold
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto"
          >
            <Sparkles size={15} />
            <span>Claim Activity Points</span>
          </button>
        </div>

        {/* Categories Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Technical Events
              </p>
              <p className="text-2xl font-bold text-blue-950 mt-1">25 Pts</p>
              <p className="text-[11px] text-blue-500 mt-0.5">Hackathons, coding sprints</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap size={20} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Certifications
              </p>
              <p className="text-2xl font-bold text-purple-950 mt-1">15 Pts</p>
              <p className="text-[11px] text-purple-500 mt-0.5">AWS, Python, NPTEL</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Attendance Reward
              </p>
              <p className="text-2xl font-bold text-amber-950 mt-1">5 Pts</p>
              <p className="text-[11px] text-amber-500 mt-0.5">Consistent &gt;90% attendance</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Activities Ledger */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <h3 className="text-base font-bold text-gray-900">
            Approved Credit Points History
          </h3>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["all", "technical", "certifications", "attendance"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#2384FD] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-gray-50/50 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{act.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {act.date}
                    </span>
                    <span>&bull;</span>
                    <span>Issuer: {act.issuer}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-sm font-bold text-[#2384FD]">
                  +{act.points} Pts
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
