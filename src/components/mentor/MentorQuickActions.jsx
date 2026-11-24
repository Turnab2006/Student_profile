import { Zap, UserPlus, ClipboardList, Star, GraduationCap, ChevronRight } from 'lucide-react';

const actions = [
  {
    title: 'Upload Attendance',
    icon: UserPlus,
    tab: 'attendance',
    tone: 'bg-[#F0FDF4]',
    borderTone: 'border-[#DCFCE7]',
    iconTone: 'text-[#16A34A]',
    iconBg: 'bg-white/90',
    textTone: 'text-[#16A34A]',
  },
  {
    title: 'Upload Results',
    icon: ClipboardList,
    tab: 'results',
    tone: 'bg-[#F0F5FF]',
    borderTone: 'border-[#D6E4FF]',
    iconTone: 'text-[#2384FD]',
    iconBg: 'bg-white/90',
    textTone: 'text-[#2384FD]',
  },
  {
    title: 'Upload Credit Points',
    icon: Star,
    tab: 'credit-points',
    tone: 'bg-[#FFF9EE]',
    borderTone: 'border-[#FFE8C2]',
    iconTone: 'text-[#F59E0B]',
    iconBg: 'bg-white/90',
    textTone: 'text-[#D97706]',
  },
  {
    title: 'View Mentees',
    icon: GraduationCap,
    tab: 'mentees',
    tone: 'bg-[#F9F5FF]',
    borderTone: 'border-[#ECD9FF]',
    iconTone: 'text-[#7656f4]',
    iconBg: 'bg-white/90',
    textTone: 'text-[#7656f4]',
  },
];

export default function MentorQuickActions({ onNavigate }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-sm flex flex-col justify-between w-full h-full">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2.5 text-sm sm:text-base font-bold text-[#0F172A]">
        <Zap size={18} className="text-slate-700" />
        <h3>Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 flex-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              type="button"
              onClick={() => onNavigate && onNavigate(action.tab, action.tab === 'attendance')}
              className={`rounded-2xl border ${action.borderTone} ${action.tone} p-2.5 sm:p-3 flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all hover:scale-[1.02] hover:shadow-xs cursor-pointer group`}
            >
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full ${action.iconBg} shadow-2xs flex items-center justify-center ${action.iconTone} group-hover:scale-110 transition-transform`}>
                <Icon size={20} className="sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className={`flex items-center justify-center gap-0.5 sm:gap-1 text-[11px] sm:text-[12px] font-bold ${action.textTone} text-center leading-tight`}>
                <span className="truncate">{action.title}</span>
                <ChevronRight size={13} className="shrink-0 stroke-[2.5]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
