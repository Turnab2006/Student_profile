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
      className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 -translate-x-full flex-col border-r border-gray-100 bg-white shadow-2xl transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : ""}`}
    >
      {/* Logo */}
      <div className="h-[65px] flex items-center justify-between gap-3 border-b border-gray-100 px-5 shrink-0">
        <span className="block text-lg font-bold tracking-wide text-gray-800">LOGO</span>
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
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1">
              {section.label}
            </p>
            {section.items.map(({ icon: Icon, label, page }) => (
              <button
                key={label}
                onClick={() => onNavigate?.(page)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === page
                    ? "bg-primary/10 text-primary"
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
      <div className="border-t border-gray-100 px-3 py-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 transition-colors bg-red-50/70">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
