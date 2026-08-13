import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Grid,
  ClipboardList,
  Bell,
  Megaphone,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navSections = [
  {
    label: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
      { icon: Users,           label: "Students",  page: "students"  },
      { icon: UserCheck,       label: "Mentors",   page: "mentors"   },
    ],
  },
  {
    label: "ACADEMICS",
    items: [
      { icon: BookOpen,      label: "Semesters",   page: "semesters"   },
      { icon: Grid,          label: "Subjects",    page: "subjects"    },
      { icon: ClipboardList, label: "Attendances", page: "attendances" },
    ],
  },
  {
    label: "ANNOUNCEMENT",
    items: [
      { icon: Megaphone, label: "Activities", page: "activities" },
      { icon: Bell,      label: "Notices",    page: "notices"    },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { icon: Settings,   label: "Profile & Settings", page: "settings" },
      { icon: HelpCircle, label: "Support Center",     page: "support"  },
    ],
  },
];

export default function Sidebar({ activePage = "dashboard", onNavigate, open = false, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-gray-100 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="h-[60px] flex items-center justify-between gap-3 border-b border-gray-100 px-5 shrink-0">
        <span className="block text-lg font-extrabold tracking-wide text-gray-800">
          TRACK<span className="text-blue-600">ADEMY</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Close navigation"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-2.5 overflow-hidden">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1">
              {section.label}
            </p>
            {section.items.map(({ icon: Icon, label, page }) => (
              <button
                key={label}
                onClick={() => onNavigate?.(page)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  activePage === page
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 px-3 py-3 shrink-0">
        <button
          type="button"
          onClick={() => onNavigate?.("logout")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-red-500 hover:bg-red-50 transition-colors bg-red-50/70 font-semibold"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
