import { Users } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';

export default function MentorMenteeChart({ onNavigate, mentees = STUDENTS_DATA }) {
  const total = mentees.length || 20;
  const active = mentees.filter((m) => (m.status || "Active").toLowerCase() === "active").length || total;
  const inactive = total - active;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#0F172A]">
            <Users size={18} className="text-slate-700" />
            <h3>Total Mentees</h3>
          </div>
        </div>

        {/* Circular Donut Gauge */}
        <div className="relative flex items-center justify-center my-4">
          <svg className="w-[180px] h-[180px] transform -rotate-90" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#E2E8F0"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Active Progress track (100% full for assigned mentees) */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#7656f4"
              strokeWidth="7"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={0}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-4xl font-bold text-[#7656f4] tracking-tight leading-none transition-all">
              {total}
            </span>
            <span className="text-xs text-gray-400 font-medium mt-3">
              Total Mentees
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Stats Split Box */}
      <div
        onClick={() => onNavigate && onNavigate('mentees')}
        className="grid grid-cols-2 gap-2.5 p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200/80 cursor-pointer hover:bg-gray-100/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#D1FAE5]">
            <Users size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{active}</p>
            <p className="text-[10px] text-gray-500 font-medium">Active Mentees</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F3EEFF] text-[#7656f4] flex items-center justify-center shrink-0 border border-[#E4D9FF]">
            <Users size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{inactive}</p>
            <p className="text-[10px] text-gray-500 font-medium">On Leave</p>
          </div>
        </div>
      </div>
    </div>
  );
}
