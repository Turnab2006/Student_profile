import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  FileText,
  Lock,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Settings2,
  Database,
  Clock3,
  MoonStar,
  MonitorCog,
  Globe,
  ToggleLeft,
  ToggleRight,
  Upload,
  Camera,
  Menu,
  CheckCircle2,
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

const menuItems = [
  { label: "Profile Settings", icon: UserRound, active: true },
  { label: "Account Security", icon: Lock },
  { label: "System Preferences", icon: Settings2 },
  { label: "Maintenance Mode", icon: Sparkles },
  { label: "Notification Settings", icon: Bell },
  { label: "User & Role Management", icon: SlidersHorizontal },
  { label: "Backup & Recovery", icon: Database },
  { label: "Appearance Settings", icon: Palette },
  { label: "API & Integrations", icon: Globe },
  { label: "Activity Logs", icon: FileText },
];

function Field({ label, value, placeholder, className = "", type = "text" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] font-medium text-gray-600">{label}</span>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
    </label>
  );
}

function SelectField({ label, value, options }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-gray-600">{label}</span>
      <div className="relative">
        <select
          defaultValue={value}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </label>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      {badge}
    </div>
  );
}

function Toggle({ on }) {
  return (
    <div className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${on ? "bg-primary" : "bg-gray-300"}`}>
      <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
    </div>
  );
}

function StatChip({ icon: Icon, label, value, accent = "green" }) {
  const accentMap = {
    green: "bg-green-50 text-primary border-green-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    blue: "bg-blue-50 text-blue-500 border-blue-100",
    red: "bg-red-50 text-red-500 border-red-100",
  };

  return (
    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${accentMap[accent]}`}>
      <Icon size={15} />
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide opacity-80">{label}</p>
        <p className="text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function Settings({ onNavigate }) {
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [attendanceTracking, setAttendanceTracking] = useState(true);
  const [studentRegistration, setStudentRegistration] = useState(true);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f6f8fb]">
      <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          <button type="button" onClick={() => onNavigate?.("dashboard")} className="h-9 w-9 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 lg:hidden">
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Settings</h1>
            <p className="text-xs text-gray-400 mt-0.5">Configure portal preferences and system settings</p>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 items-start max-w-[1500px] mx-auto">
          <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 lg:sticky lg:top-4">
            <p className="px-3 pb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Settings</p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      item.active ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-left">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl bg-primary-light p-4 border border-green-100">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Settings2 size={16} />
                <p className="text-sm font-semibold">Upgrade to Pro</p>
              </div>
              <p className="text-xs leading-5 text-gray-500">
                Unlock advanced system controls, analytics, and priority support.
              </p>
              <button type="button" className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors w-full">
                Upgrade Now
              </button>
            </div>
          </aside>

          <div className="space-y-4">
            <section className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#e8f7ea] via-[#eefbf0] to-[#dff4e7] shadow-sm p-5 lg:p-6 overflow-hidden relative">
              <div className="max-w-xl">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Settings &amp; System Preferences</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-lg">
                  Manage your profile, security, system configuration, maintenance and more.
                </p>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 hidden md:block">
                <div className="relative h-36 w-52">
                  <div className="absolute inset-x-6 top-5 h-24 rounded-2xl bg-white/85 border border-white shadow-lg" />
                  <div className="absolute left-10 top-0 h-8 w-40 rounded-t-xl bg-white/90 border border-white shadow-sm" />
                  <div className="absolute right-0 top-8 h-14 w-14 rounded-full bg-primary/10 blur-[0.5px]" />
                  <div className="absolute left-16 top-12 h-20 w-28 rounded-2xl bg-white/90 border border-white shadow-md flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <ShieldCheck size={26} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
              <SectionHeader
                icon={UserRound}
                title="Profile Settings"
                subtitle="Manage your personal and institutional information"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name" value="Admin User" />
                <Field label="Username" value="adminuser" />
                <Field label="Email Address" value="admin@edusmart.com" type="email" />
                <Field label="Phone Number" value="+91 98765 43210" />
                <SelectField label="Designation" value="Super Administrator" options={["Super Administrator", "Administrator", "Manager"]} />
                <Field label="Institute Name" value="EduSmart International School" />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-800">Admin Profile Photo</p>
                    <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      <Upload size={14} />
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                        alt="Admin profile"
                        className="h-full w-full object-cover"
                      />
                      <button type="button" className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-white text-primary shadow-sm flex items-center justify-center border border-gray-200">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">JPG, PNG (Max. 2MB)</p>
                      <p className="mt-2 text-sm font-medium text-gray-700">Upload a new profile image</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-800">Institute Logo</p>
                    <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      <Upload size={14} />
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-2xl bg-gray-50 overflow-hidden border border-gray-200 flex items-center justify-center text-primary">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck size={26} />
                      </div>
                      <button type="button" className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-white text-primary shadow-sm flex items-center justify-center border border-gray-200">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">PNG, JPG (Max. 2MB)</p>
                      <p className="mt-2 text-sm font-medium text-gray-700">Upload your institution logo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button type="button" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4 items-start">
                <div>
                  <SectionHeader
                    icon={Lock}
                    title="Account Security"
                    subtitle="Keep your account secure and protect your data"
                    badge={
                      <div className="hidden md:flex gap-2">
                        <StatChip icon={ShieldCheck} label="Two-Factor Auth" value="Enabled" />
                        <StatChip icon={Clock3} label="Active Sessions" value="2 Sessions" accent="blue" />
                        <StatChip icon={CalendarDays} label="Last Password Change" value="May 10, 2024" accent="orange" />
                      </div>
                    }
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <Field label="Current Password" placeholder="Enter current password" type="password" />
                      <Field label="New Password" placeholder="Enter new password" type="password" />
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-[72%] bg-primary" />
                      </div>
                      <p className="text-xs text-primary font-medium">Password Strength: Strong</p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 p-4 space-y-4">
                      <Field label="Confirm Password" placeholder="Confirm new password" type="password" />
                      <div className="space-y-2 text-xs text-gray-600">
                        {[
                          "At least 8 characters",
                          "One uppercase letter",
                          "One number",
                          "One special character",
                        ].map((rule) => (
                          <div key={rule} className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-primary" />
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors inline-flex items-center gap-2">
                      <Lock size={15} />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
              <SectionHeader
                icon={Sparkles}
                title="Maintenance Mode"
                subtitle="Temporarily disable access to the system for maintenance"
                badge={<Toggle on={maintenanceEnabled} />}
              />

              <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-4">
                <div className="rounded-2xl border border-gray-100 p-4 bg-[#f8fbff] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <MonitorCog size={18} />
                      <p className="text-sm font-semibold">Maintenance Information</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-500">
                      When maintenance mode is enabled, only administrators can access the system. Users will see the maintenance message on the login screen.
                    </p>
                  </div>
                  <div className="mt-4 rounded-xl bg-white border border-gray-100 p-3">
                    <p className="text-[11px] text-gray-400">Scheduled window</p>
                    <p className="text-sm font-semibold text-gray-700">May 25, 2024 - 11:00 PM</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Enable Maintenance Mode</p>
                        <p className="text-xs text-gray-400 mt-0.5">Turn on to temporarily suspend student access</p>
                      </div>
                      <Toggle on={maintenanceEnabled} />
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block text-[11px] font-medium text-gray-600">Maintenance Message</span>
                      <textarea
                        defaultValue="We are currently performing scheduled maintenance. Please check back later. Thank you for your patience!"
                        rows={4}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Start Date & Time" value="May 25, 2024 | 11:00 PM" />
                    <Field label="End Date & Time" value="May 26, 2024 | 05:00 AM" />
                  </div>

                  <div className="flex justify-end">
                    <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors inline-flex items-center gap-2">
                      <Sparkles size={15} />
                      Save Maintenance Settings
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
              <SectionHeader
                icon={Settings2}
                title="System Preferences"
                subtitle="Configure general system preferences"
                badge={null}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <SelectField label="Portal Name" value="EduSmart Student Portal" options={["EduSmart Student Portal", "EduSmart Admin Portal"]} />
                <SelectField label="Academic Session" value="2024 - 25" options={["2024 - 25", "2023 - 24", "2022 - 23"]} />
                <SelectField label="Default Language" value="English (US)" options={["English (US)", "English (UK)", "বাংলা"]} />
                <SelectField label="Time Zone" value="(UTC+05:30) Asia/Kolkata" options={["(UTC+05:30) Asia/Kolkata", "(UTC+00:00) UTC"]} />
                <SelectField label="Date Format" value="DD-MM-YYYY" options={["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]} />
                <div className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-gray-600">Attendance Tracking</p>
                    <p className="text-xs text-gray-400">Enabled</p>
                  </div>
                  {attendanceTracking ? <ToggleRight className="text-primary" /> : <ToggleLeft className="text-gray-300" />}
                </div>
                <div className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-gray-600">Auto Semester Upgrade</p>
                    <p className="text-xs text-gray-400">Enabled</p>
                  </div>
                  {autoUpdate ? <ToggleRight className="text-primary" /> : <ToggleLeft className="text-gray-300" />}
                </div>
                <div className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-gray-600">Student Registration</p>
                    <p className="text-xs text-gray-400">Enabled</p>
                  </div>
                  {studentRegistration ? <ToggleRight className="text-primary" /> : <ToggleLeft className="text-gray-300" />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
