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

export default function Sidebar({ activePage = "dashboard", onNavigate }) {
  return (
    <aside className="w-56 h-full bg-white flex flex-col border-r border-gray-100 shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <span className="text-lg font-bold text-gray-800 tracking-wide">LOGO</span>
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
                    ? "bg-primary text-white"
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
      <div className="px-3 py-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 transition-colors">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
