import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Grid,
  ClipboardList,
  Award,
  Bell,
  Megaphone,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const navSections = [
  {
    label: "MAIN",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "students",  label: "Students",  icon: Users },
      { id: "mentors",   label: "Mentors",   icon: UserCheck },
    ],
  },
  {
    label: "ACADEMICS",
    items: [
      { id: "semesters",     label: "Semesters",     icon: BookOpen },
      { id: "subjects",      label: "Subjects",      icon: Grid },
      { id: "attendances",   label: "Attendances",   icon: ClipboardList },
      { id: "credit-points", label: "Credit Points", icon: Award },
    ],
  },
  {
    label: "COMMUNICATION",
    items: [
      { id: "activities", label: "Activities", icon: Megaphone },
      { id: "notices",    label: "Notices",    icon: Bell },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { id: "settings", label: "Profile & Settings", icon: Settings },
      { id: "support",  label: "Support Center",     icon: HelpCircle },
    ],
  },
];

const PAGE_PARENT_MAP = {
  "add-student": "students",
  "student-profile": "students",
  "add-mentor": "mentors",
  "mentor-details": "mentors",
  "add-subject": "subjects",
  "add-activity": "activities",
  "add-notice": "notices",
  "ticket-history": "support",
};

export default function Sidebar({
  activePage = "dashboard",
  onNavigate,
  open = false,
  onClose,
  onLogout,
}) {
  const currentNavId = PAGE_PARENT_MAP[activePage] || activePage;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-[250px] shrink-0 flex-col border-r border-gray-100 bg-white font-['Roboto',sans-serif] shadow-xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-[250px] lg:translate-x-0 lg:shadow-none select-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Logo Header */}
      <div className="h-[65px] flex items-center justify-between border-b border-gray-100 px-6 shrink-0 bg-white">
        <img
          src="/logo.svg"
          alt="Trackademy"
          className="h-7 w-auto max-w-[170px] object-contain cursor-pointer select-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          onClick={() => {
            if (onNavigate) onNavigate("dashboard");
            if (onClose) onClose();
          }}
        />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 lg:hidden cursor-pointer transition-all duration-150 active:scale-95"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav List with proportional spacing matching Student Portal */}
      <nav className="flex-1 px-3.5 py-3.5 space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5 font-roboto select-none">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map(({ id, label, icon: Icon }) => {
                const isActive = currentNavId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      onNavigate?.(id);
                      onClose?.();
                    }}
                    className={`relative w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? "bg-[#eaf8f1] text-[#0da651] font-semibold shadow-xs"
                        : "text-[#5A6A80] hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1 font-medium"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#0da651] rounded-r-full" />
                    )}
                    <Icon
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "text-[#0da651] scale-105"
                          : "text-[#5A6A80] group-hover:text-gray-900 group-hover:scale-110"
                      }`}
                    />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Logout Button */}
      <div className="p-3.5 border-t border-gray-100 shrink-0 bg-white">
        <button
          type="button"
          onClick={() => {
            if (onLogout) onLogout();
            else onNavigate?.("logout");
          }}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-semibold text-[#FF4D4F] bg-[#FFF0F0] hover:bg-[#FEECEB] hover:shadow-xs active:scale-[0.98] transition-all duration-200 cursor-pointer group"
        >
          <LogOut size={18} className="shrink-0 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
