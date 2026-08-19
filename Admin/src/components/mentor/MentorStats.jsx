import { Users, CalendarCheck, ClipboardList, Star } from "lucide-react";

const iconMap = {
  users: Users,
  check: CalendarCheck,
  trend: ClipboardList,
  star: Star,
};

const defaultCardStyles = {
  users: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#f0eaff] text-[#7656f4]",
    note: "Assigned students",
    pageKey: "mentees",
  },
  mentees: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#f0eaff] text-[#7656f4]",
    note: "Assigned students",
    pageKey: "mentees",
  },
  check: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-red-500",
    valueClass: "text-slate-900",
    iconWrap: "bg-[#fff1f1] text-red-500",
    note: "Classes recorded",
    pageKey: "attendance",
  },
  attendance: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-red-500",
    valueClass: "text-slate-900",
    iconWrap: "bg-[#fff1f1] text-red-500",
    note: "Classes recorded",
    pageKey: "attendance",
  },
  trend: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#f59e0b]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff1dc] text-[#f59e0b]",
    note: "Published results",
    pageKey: "results",
  },
  results: {
    cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#f59e0b]",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#fff1dc] text-[#f59e0b]",
    note: "Published results",
    pageKey: "results",
  },
  star: {
    cardClass: "bg-white text-emerald-700 border border-emerald-200 border-l-4 border-l-emerald-500",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#e7f7ec] text-emerald-600",
    note: "Total points issued",
    pageKey: "credit-points",
  },
  credits: {
    cardClass: "bg-white text-emerald-700 border border-emerald-200 border-l-4 border-l-emerald-500",
    valueClass: "text-[#111827]",
    iconWrap: "bg-[#e7f7ec] text-emerald-600",
    note: "Total points issued",
    pageKey: "credit-points",
  },
};

export default function MentorStats({ items = [], onNavigate }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
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
          "bg-[#f0eaff] text-[#7656f4]";
        const pageKey =
          item.pageKey || item.tab || styleDefaults.pageKey || item.key;

        return (
          <div
            key={label}
            onClick={() => {
              if (pageKey && onNavigate) onNavigate(pageKey);
            }}
            className={`rounded-2xl border px-4 py-4 sm:py-5 shadow-sm ${cardClass} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all`}
          >
            <div className="flex items-center gap-5">
              <div
                className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl ${iconWrap}`}
              >
                <Icon size={23} className="stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  {label}
                </div>
                <div
                  className={`text-2xl sm:text-[28px] font-extrabold leading-none mt-1 mb-0.5 ${valueClass}`}
                >
                  {value}
                </div>
                <div className="text-xs text-slate-400 font-medium truncate">
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
