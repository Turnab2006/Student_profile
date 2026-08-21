import { Users, CheckCircle2, TrendingUp, Star, CalendarCheck, ClipboardList } from "lucide-react";

const iconMap = {
  users: Users,
  mentees: Users,
  check: CheckCircle2,
  attendance: CheckCircle2,
  trend: TrendingUp,
  results: TrendingUp,
  star: Star,
  credits: Star,
  calendar: CalendarCheck,
  clipboard: ClipboardList,
};

const defaultCardStyles = {
  users: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#F3EEFF] text-[#7656f4]",
    note: "Total Mentees",
    pageKey: "mentees",
  },
  mentees: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#F3EEFF] text-[#7656f4]",
    note: "Total Mentees",
    pageKey: "mentees",
  },
  check: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#22C55E]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EAFBF1] text-[#22C55E]",
    note: "Attendance Rate",
    pageKey: "attendance",
  },
  attendance: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#22C55E]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EAFBF1] text-[#22C55E]",
    note: "Attendance Rate",
    pageKey: "attendance",
  },
  trend: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#F59E0B]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#FFF5E8] text-[#F59E0B]",
    note: "Results Published",
    pageKey: "results",
  },
  results: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#F59E0B]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#FFF5E8] text-[#F59E0B]",
    note: "Results Published",
    pageKey: "results",
  },
  star: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#3B82F6]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EEF5FF] text-[#3B82F6]",
    note: "Credit Points Issued",
    pageKey: "credit-points",
  },
  credits: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#3B82F6]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#EEF5FF] text-[#3B82F6]",
    note: "Credit Points Issued",
    pageKey: "credit-points",
  },
};

function renderStatIcon(keyType, Icon) {
  if (keyType === "attendance" || keyType === "check") {
    return <CheckCircle2 size={24} className="fill-[#22C55E] text-white" />;
  }
  if (keyType === "credits" || keyType === "star") {
    return <Star size={22} className="fill-[#3B82F6] text-[#3B82F6]" />;
  }
  if (keyType === "results" || keyType === "trend") {
    return <TrendingUp size={23} className="stroke-[2.5]" />;
  }
  if (typeof Icon === "function") {
    return <Icon size={23} className="stroke-[2.2]" />;
  }
  return <Users size={23} className="stroke-[2.2]" />;
}

export default function MentorStats({ items = [], onNavigate }) {
  return (
    <div className="grid gap-2 sm:gap-2.5 grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const keyType = item.key || item.icon;
        const styleDefaults = defaultCardStyles[keyType] || {};

        const Icon =
          typeof item.icon === "function"
            ? item.icon
            : iconMap[item.icon] || Users;

        const label = item.label || item.title;
        const value = item.value;
        const note = item.note || item.subtext || styleDefaults.note || "";
        const cardClass =
          item.cardClass ||
          styleDefaults.cardClass ||
          "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]";
        const valueClass =
          item.valueClass || styleDefaults.valueClass || "text-[#111827]";
        const iconWrap =
          item.iconWrap ||
          styleDefaults.iconWrap ||
          "bg-[#F3EEFF] text-[#7656f4]";
        const pageKey =
          item.pageKey || item.tab || styleDefaults.pageKey || item.key;

        return (
          <div
            key={label}
            onClick={() => {
              if (pageKey && onNavigate) onNavigate(pageKey);
            }}
            className={`rounded-2xl border p-2.5 sm:px-4 sm:py-4 shadow-sm ${cardClass} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all`}
          >
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div
                className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${iconWrap}`}
              >
                {renderStatIcon(keyType, Icon)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  {label}
                </div>
                <div
                  className={`text-lg sm:text-[24px] font-extrabold leading-none mt-1 mb-0.5 ${valueClass}`}
                >
                  {value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                  {note}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

