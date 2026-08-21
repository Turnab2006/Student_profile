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
  Clock,
  MoonStar,
  MonitorCog,
  Globe,
  Upload,
  Camera,
  Menu,
  CheckCircle2,
  Save,
  RotateCcw,
  Building,
  Mail,
  Phone,
  KeyRound,
  HardDrive,
  Check,
  Shield,
  Smartphone,
  Layers,
  AlertCircle,
  Eye,
  EyeOff,
  Radio,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

export default function Settings({ onNavigate, onOpenSidebar }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    fullName: "Tuhina Roy",
    username: "tuhina_admin",
    email: "tuhina.roy@trackademy.edu",
    phone: "+91 98301 23456",
    designation: "Super Administrator",
    instituteName: "Trackademy Institute of Higher Learning",
    instituteCode: "TK-EDU-2026",
    address: "Kolkata Knowledge Park, Sector V, Bidhannagar, Kolkata - 700091",
  });

  const [securityData, setSecurityData] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30 Minutes",
    loginAlerts: true,
    forcePasswordResetDays: "90 Days",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);

  const [systemPreferences, setSystemPreferences] = useState({
    portalName: "Trackademy ERP & Student Portal",
    academicSession: "2024 - 25",
    defaultLanguage: "English (India)",
    timeZone: "(UTC+05:30) Asia/Kolkata",
    dateFormat: "DD-MM-YYYY",
    attendanceTracking: true,
    autoSemesterUpgrade: true,
    studentRegistration: true,
    creditPointsSystem: true,
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    enabled: false,
    message: "We are currently performing scheduled maintenance. Please check back later. Thank you for your patience!",
    startDate: "2026-08-25",
    startTime: "23:00",
    endDate: "2026-08-26",
    endTime: "05:00",
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotices: true,
    attendanceAlerts: true,
    resultPublications: true,
    ticketUpdates: true,
    systemBackups: false,
  });

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const tabs = [
    { id: "profile", label: "Profile & Institution", icon: UserRound },
    { id: "security", label: "Account & Security", icon: Lock },
    { id: "system", label: "System & Academics", icon: Settings2 },
    { id: "maintenance", label: "Maintenance & Backup", icon: Sparkles },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
  ];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f6f8fb] font-['Roboto',sans-serif]">
      {/* Top Standard Navigation Header */}
      <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
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
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Portal Settings</h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Configure administrator profile, institutional preferences, and system parameters
            </p>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="max-w-[1500px] mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. UPPER GREEN GRADIENT HERO HEADER                                       */}
          {/* ========================================================================= */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                  Global Configuration
                </span>
                <span className="text-emerald-100 text-xs font-semibold">• Super Admin Access</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                System Configuration &amp; Administration
              </h2>
              <p className="text-xs text-emerald-50/90 font-normal max-w-xl">
                Manage your institutional branding, administrator security protocols, academic parameters, and platform preferences.
              </p>
            </div>

            {/* Upper Action Buttons */}
            <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0da651] hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Save size={15} className="stroke-[2.5]" />
                <span>Save All Settings</span>
              </button>
            </div>

            {/* Decorative background shape */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          </section>

          {/* Success Save Banner */}
          {savedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#0da651] shrink-0" />
                <span>Portal preferences and system settings have been saved successfully!</span>
              </div>
              <span className="text-xs text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                Synced
              </span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. STAT CHIPS ROW: System Health Overview                                */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-md shadow-slate-200/50 flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                <ShieldCheck size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Security State</p>
                <p className="text-sm font-bold text-gray-900 truncate my-0.5">Two-Factor Active</p>
                <p className="text-[11px] text-emerald-600 font-semibold">High Protection</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 shadow-md shadow-slate-200/50 flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2384FD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                <Smartphone size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Sessions</p>
                <p className="text-sm font-bold text-gray-900 truncate my-0.5">2 Logged Devices</p>
                <p className="text-[11px] text-blue-600 font-semibold">Kolkata, IN (Current)</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 shadow-md shadow-slate-200/50 flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-2xs">
                <Database size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Database Backup</p>
                <p className="text-sm font-bold text-gray-900 truncate my-0.5">Automated Daily</p>
                <p className="text-[11px] text-amber-600 font-semibold">Last: Today, 03:00 AM</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-purple-500 shadow-md shadow-slate-200/50 flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-2xs">
                <Layers size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Academic Session</p>
                <p className="text-sm font-bold text-gray-900 truncate my-0.5">2024 - 2025</p>
                <p className="text-[11px] text-purple-600 font-semibold">Active &bull; Sem IV/VI</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. SETTINGS NAVIGATION TABS STRIP                                         */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-2 flex items-center gap-1.5 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${isActive
                      ? "bg-[#0da651] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 4. TAB CONTENTS                                                           */}
          {/* ========================================================================= */}

          {/* TAB 1: Profile & Institution */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Personal Administrator Information */}
              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0da651] flex items-center justify-center border border-emerald-100">
                    <UserRound size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Administrator Profile</h3>
                    <p className="text-xs text-gray-400">Personal details and administrative contact credentials</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Official Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Mobile / Telephone Number
                    </label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Administrative Role
                    </label>
                    <select
                      value={profileData.designation}
                      onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all cursor-pointer"
                    >
                      <option value="Super Administrator">Super Administrator</option>
                      <option value="Academic Dean">Academic Dean</option>
                      <option value="Examination Officer">Examination Officer</option>
                      <option value="System Admin">System Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Institute Registration Code
                    </label>
                    <input
                      type="text"
                      value={profileData.instituteCode}
                      onChange={(e) => setProfileData({ ...profileData, instituteCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] transition-all"
                    />
                  </div>
                </div>

                {/* Profile Photo & Institution Logo Uploaders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 sm:p-5 flex items-center gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-100 overflow-hidden border-2 border-emerald-200 shrink-0 shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Admin avatar"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white text-[#0da651] shadow-xs flex items-center justify-center border border-gray-200 cursor-pointer"
                      >
                        <Camera size={12} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-900">Administrator Avatar</p>
                      <p className="text-[11px] text-gray-500">JPG, PNG (Max 2MB)</p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0da651] hover:underline cursor-pointer pt-1"
                      >
                        <Upload size={12} />
                        <span>Change Photo</span>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 sm:p-5 flex items-center gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white overflow-hidden border-2 border-gray-200 shrink-0 shadow-2xs flex items-center justify-center text-[#0da651]">
                      <Building size={32} />
                      <button
                        type="button"
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white text-[#0da651] shadow-xs flex items-center justify-center border border-gray-200 cursor-pointer"
                      >
                        <Camera size={12} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-900">Institution Logo &amp; Seal</p>
                      <p className="text-[11px] text-gray-500">Official SVG or PNG format</p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0da651] hover:underline cursor-pointer pt-1"
                      >
                        <Upload size={12} />
                        <span>Upload New Emblem</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0da651] hover:bg-[#0c9548] text-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer transition-all active:scale-95"
                  >
                    <Save size={15} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: Account & Security */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2384FD] flex items-center justify-center border border-blue-100">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Account Security &amp; Credentials</h3>
                    <p className="text-xs text-gray-400">Update master password and configure multi-factor authorization</p>
                  </div>
                </div>

                {/* Password Update Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Current Master Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          placeholder="Enter existing password"
                          className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        New Master Password
                      </label>
                      <input
                        type="password"
                        value={passwords.newPass}
                        onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                        placeholder="Create strong new password"
                        className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        placeholder="Re-type new password"
                        className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Password Checklist & Security Policies */}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                      Password Requirements Checklist
                    </h4>
                    <div className="space-y-2.5 text-xs text-gray-600">
                      {[
                        "Minimum 8 characters length",
                        "At least one uppercase English letter (A-Z)",
                        "At least one numeric digit (0-9)",
                        "At least one special symbol (!@#$%^&*)",
                      ].map((rule) => (
                        <div key={rule} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-[#0da651]" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs font-semibold text-blue-900">
                      <span>Password Strength Rating:</span>
                      <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        Strong &bull; 95%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2FA & Session Controls */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Two-Factor Authentication (2FA)</p>
                      <p className="text-[11px] text-gray-400">Require OTP on new device logins</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSecurityData({ ...securityData, twoFactorAuth: !securityData.twoFactorAuth })}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${securityData.twoFactorAuth ? "bg-[#0da651]" : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${securityData.twoFactorAuth ? "right-0.5" : "left-0.5"
                          }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">Idle Session Auto-Timeout</p>
                      <p className="text-[11px] text-gray-400">Auto logout after inactivity</p>
                    </div>
                    <span className="text-xs font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                      30 Minutes
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <KeyRound size={15} />
                    <span>Update Security Settings</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: System & Academics */}
          {activeTab === "system" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                    <Settings2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Academic &amp; System Preferences</h3>
                    <p className="text-xs text-gray-400">Global defaults for terms, sessions, attendance, and grading</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Portal System Title</label>
                    <input
                      type="text"
                      value={systemPreferences.portalName}
                      onChange={(e) => setSystemPreferences({ ...systemPreferences, portalName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Active Academic Session</label>
                    <select
                      value={systemPreferences.academicSession}
                      onChange={(e) => setSystemPreferences({ ...systemPreferences, academicSession: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] cursor-pointer"
                    >
                      <option value="2024 - 25">2024 - 25 (Current)</option>
                      <option value="2025 - 26">2025 - 26 (Upcoming)</option>
                      <option value="2023 - 24">2023 - 24 (Archived)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">System Time Zone</label>
                    <select
                      value={systemPreferences.timeZone}
                      onChange={(e) => setSystemPreferences({ ...systemPreferences, timeZone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] cursor-pointer"
                    >
                      <option value="(UTC+05:30) Asia/Kolkata">(UTC+05:30) Asia/Kolkata (IST)</option>
                      <option value="(UTC+00:00) UTC">(UTC+00:00) Coordinated Universal Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Default Language</label>
                    <select
                      value={systemPreferences.defaultLanguage}
                      onChange={(e) => setSystemPreferences({ ...systemPreferences, defaultLanguage: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] cursor-pointer"
                    >
                      <option value="English (India)">English (India)</option>
                      <option value="English (US)">English (US)</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="Bengali">Bengali (বাংলা)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date Display Format</label>
                    <select
                      value={systemPreferences.dateFormat}
                      onChange={(e) => setSystemPreferences({ ...systemPreferences, dateFormat: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651] cursor-pointer"
                    >
                      <option value="DD-MM-YYYY">DD-MM-YYYY (21-08-2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-21)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (08/21/2026)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0da651] hover:bg-[#0c9548] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Save size={15} />
                    <span>Save Academic Settings</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 4: Maintenance & Backup */}
          {activeTab === "maintenance" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Maintenance Mode &amp; Server Backups</h3>
                      <p className="text-xs text-gray-400">Suspend student/mentor access during updates or run manual backups</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-700">Maintenance Status:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setMaintenanceSettings({
                          ...maintenanceSettings,
                          enabled: !maintenanceSettings.enabled,
                        })
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${maintenanceSettings.enabled ? "bg-rose-500" : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${maintenanceSettings.enabled ? "right-0.5" : "left-0.5"
                          }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                  {/* Maintenance Notice Box */}
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                        <MonitorCog size={16} />
                        <span>Maintenance Warning</span>
                      </div>
                      <p className="text-xs text-amber-800/90 leading-relaxed font-normal">
                        When enabled, non-admin users (Students &amp; Mentors) cannot log in. They will be greeted by the custom announcement message below.
                      </p>
                    </div>
                    <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs">
                      <span className="text-[10px] font-bold uppercase text-amber-800 block">Scheduled Downtime</span>
                      <span className="font-semibold text-gray-800">25 Aug 2026 &bull; 11:00 PM IST</span>
                    </div>
                  </div>

                  {/* Message & Schedule Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Maintenance Announcement Message
                      </label>
                      <textarea
                        rows={3}
                        value={maintenanceSettings.message}
                        onChange={(e) =>
                          setMaintenanceSettings({ ...maintenanceSettings, message: e.target.value })
                        }
                        className="w-full p-3 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 focus:bg-white rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-[#0da651]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Start Date &amp; Time</label>
                        <input
                          type="datetime-local"
                          defaultValue="2026-08-25T23:00"
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Estimated Resumption Time</label>
                        <input
                          type="datetime-local"
                          defaultValue="2026-08-26T05:00"
                          className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Database Backup Trigger */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HardDrive size={22} className="text-[#0da651] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">Manual PostgreSQL Database Dump</p>
                      <p className="text-[11px] text-gray-400">Generate immediate snapshot of student records &amp; gradebooks</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert("Database snapshot export generated successfully!")}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0da651] border border-emerald-200 font-bold text-xs rounded-xl transition-all cursor-pointer self-start sm:self-auto shadow-2xs"
                  >
                    Export Snapshot (.SQL)
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 5: Notifications & Alerts */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                    <Bell size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Broadcast &amp; Notification Preferences</h3>
                    <p className="text-xs text-gray-400">Configure automated email triggers and portal push alerts</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotices",
                      title: "Automatic Notice Broadcasts",
                      desc: "Send instant email notification to selected audience whenever a notice is published.",
                    },
                    {
                      key: "attendanceAlerts",
                      title: "Low Attendance Warning Alerts",
                      desc: "Trigger email alert to parents and mentees when overall attendance drops below 75%.",
                    },
                    {
                      key: "resultPublications",
                      title: "Semester Result Publication Notices",
                      desc: "Send automated SMS and email blasts when examination grade cards are released.",
                    },
                    {
                      key: "ticketUpdates",
                      title: "Support Ticket Status Tracking Updates",
                      desc: "Notify administrators and students whenever a ticket status changes.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="p-4 rounded-2xl border border-gray-200 bg-white flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationPreferences({
                            ...notificationPreferences,
                            [item.key]: !notificationPreferences[item.key],
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${notificationPreferences[item.key] ? "bg-[#0da651]" : "bg-gray-300"
                          }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${notificationPreferences[item.key] ? "right-0.5" : "left-0.5"
                            }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0da651] hover:bg-[#0c9548] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Save size={15} />
                    <span>Save Notification Settings</span>
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
