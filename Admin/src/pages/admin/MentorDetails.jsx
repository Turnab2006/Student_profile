import { ArrowLeft, BadgeCheck, Briefcase, CalendarDays, Mail, Phone, UserRound, Users, Menu } from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

export default function MentorDetails({ mentor, onNavigate, onOpenSidebar }) {
  if (!mentor) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-500">No mentor selected.</p>
        <button
          onClick={() => onNavigate?.("mentors")}
          className="mt-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 cursor-pointer"
        >
          Back to mentors
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="h-[65px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onOpenSidebar) onOpenSidebar();
              else window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
            }}
            className="h-10 w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate?.("mentors")}
              className="h-9 w-9 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 cursor-pointer transition-all shrink-0"
              aria-label="Back to mentors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Mentor Details</h1>
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("mentors")}>Mentors</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Mentor Details</span>
              </nav>
            </div>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-200/50">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${mentor.avatarBg} ${mentor.avatarText} text-lg font-bold shadow-2xs`}>
                  {mentor.initials}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{mentor.name}</h2>
                  <p className="text-sm text-gray-500">{mentor.specialization}</p>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${mentor.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                <BadgeCheck size={15} />
                {mentor.status}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Briefcase size={15} className="text-green-600" />
                  Department
                </div>
                <p className="mt-2 text-sm text-gray-600 font-medium">{mentor.dept}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users size={15} className="text-green-600" />
                  Students Mentored
                </div>
                <p className="mt-2 text-sm text-gray-600 font-medium">{mentor.students}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-200/50">
              <h3 className="text-sm font-semibold text-gray-800">Profile Overview</h3>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <UserRound size={15} className="text-gray-400" />
                  <span>Employee ID: {mentor.empId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-gray-400" />
                  <span>Email: {mentor.empId.toLowerCase()}@college.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-gray-400" />
                  <span>Phone: +880 17XXX XXXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays size={15} className="text-gray-400" />
                  <span>Joined: 2018</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-6 shadow-md shadow-emerald-200/30">
              <h3 className="text-sm font-bold text-gray-800">Quick Notes</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                This mentor is currently {mentor.status.toLowerCase()} and manages {mentor.students} student(s) in the {mentor.dept} department.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
