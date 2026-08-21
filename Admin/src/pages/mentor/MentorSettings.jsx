import { useState, useRef } from "react";
import {
  UserRound,
  Lock,
  Bell,
  Eye,
  EyeOff,
  ShieldCheck,
  Save,
  CheckCircle2,
  Mail,
  Camera,
  Upload,
  Building,
  Phone,
  RotateCcw,
  Sparkles,
  Check,
  KeyRound,
  Calendar,
  GraduationCap,
  Briefcase,
  Clock,
  Radio,
  MapPin,
  FileText,
  Activity,
  AlertCircle
} from "lucide-react";

export default function MentorSettings({ hideHeader = false, onNavigate }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Profile Form States
  const defaultAvatar = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80";
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  
  const [profileData, setProfileData] = useState({
    fullName: "Prof. Kaushik Chatterjee",
    employeeId: "EPM202001",
    designation: "Associate Professor & Mentor Coordinator",
    department: "Computer Science & Engineering",
    joiningDate: "July 15, 2018",
    institutionalEmail: "kaushik.c@trackademy.edu",
    personalEmail: "kaushik.chatterjee.prof@gmail.com",
    availabilityStatus: "Active", // "Active" | "On-Leave" | "Inactive"
    phone: "+91 91639 26383",
    officeLocation: "Room 304, 3rd Floor, Tech Block",
    consultationHours: "Mon, Wed, Fri • 2:00 PM - 4:30 PM",
    specialization: "Artificial Intelligence, Distributed Systems, Cloud Computing",
  });

  // Password / Security States
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Notification Preferences States
  const [notificationPreferences, setNotificationPreferences] = useState({
    studentMessages: true,
    attendanceReminders: true,
    creditPointRequests: true,
    resultSubmissionAlerts: true,
    departmentNotices: true,
    emailChannel: true,
    pushChannel: true,
    smsChannel: false,
  });

  // Mentorship & Academic Preferences
  const [mentorshipPreferences, setMentorshipPreferences] = useState({
    autoApproveVerifiedCredits: false,
    allowDirectStudentCalls: true,
    showConsultationOnPortal: true,
    weeklyMenteeDigest: true,
  });

  // Handle Avatar Upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleResetAvatar = () => {
    setAvatarPreview(defaultAvatar);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const tabs = [
    { id: "profile", label: "Profile & Availability", icon: UserRound },
    { id: "security", label: "Security & Password", icon: Lock },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "mentorship", label: "Mentorship & Academic", icon: ShieldCheck },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return {
          label: "Active & Available",
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dotClass: "bg-emerald-500",
        };
      case "On-Leave":
        return {
          label: "On-Leave / Away",
          badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
          dotClass: "bg-amber-500",
        };
      case "Inactive":
      default:
        return {
          label: "Inactive / Offline",
          badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
          dotClass: "bg-slate-400",
        };
    }
  };

  const currentStatusInfo = getStatusBadge(profileData.availabilityStatus);

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-5 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto pb-10">
      
      {/* ========================================================================= */}
      {/* 1. PURPLE HERO BANNER (Synchronized with Mentor Portal Theme)              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7656F4] via-[#6342E8] to-[#512FD8] border border-purple-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ambient Glows */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
              Faculty Profile &amp; Account
            </span>
            <span className="text-purple-100 text-xs font-semibold">• Computer Science &amp; Engineering</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Mentor Profile &amp; Account Settings
          </h2>
          <p className="text-xs text-purple-50/90 font-normal max-w-xl">
            Update your faculty photo, personal email, availability status (Active / On-Leave / Inactive), security credentials, and consultation configurations.
          </p>
        </div>

        {/* Hero Save Action Button */}
        <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#7656f4] hover:bg-purple-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Save size={15} className="stroke-[2.5]" />
            <span>Save All Settings</span>
          </button>
        </div>
      </section>

      {/* Success Save Banner */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>Your faculty profile, availability status, and security preferences have been updated successfully!</span>
          </div>
          <span className="text-xs text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
            Synced
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STAT CHIPS ROW: Faculty Identity & Availability Overview               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Faculty ID */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-[#7656f4] shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0 border border-purple-100">
            <Briefcase size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Faculty ID</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">{profileData.employeeId}</p>
            <p className="text-[11px] text-[#7656f4] font-semibold">Senior Mentor</p>
          </div>
        </div>

        {/* Card 2: Availability Status */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Activity size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Duty Status</p>
            <div className="flex items-center gap-1.5 my-0.5">
              <span className={`w-2 h-2 rounded-full ${currentStatusInfo.dotClass}`} />
              <p className="text-sm font-bold text-gray-900 truncate">{profileData.availabilityStatus}</p>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold">{currentStatusInfo.label}</p>
          </div>
        </div>

        {/* Card 3: Security State */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <ShieldCheck size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Security State</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">{twoFactorAuth ? "2FA Enabled" : "Password Only"}</p>
            <p className="text-[11px] text-blue-600 font-semibold">High Security Level</p>
          </div>
        </div>

        {/* Card 4: Office Location */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <MapPin size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Office Cabin</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">Room 304 (Tech Block)</p>
            <p className="text-[11px] text-amber-600 font-semibold">Consultation Desk</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TABS NAVIGATION (Modern Elevated Segmented Control)                   */}
      {/* ========================================================================= */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#7656F4] text-white shadow-md shadow-purple-500/25 scale-[1.01]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. TAB 1: PROFILE & AVAILABILITY STATUS                                   */}
      {/* ========================================================================= */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          
          {/* Main Profile & Photo Edit Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Faculty Identity &amp; Contact Details</h3>
                <p className="text-xs text-gray-400 mt-0.5">Manage your public mentor photo, personal email, and on-duty availability status.</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentStatusInfo.badgeClass}`}>
                {currentStatusInfo.label}
              </span>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-purple-50/40 rounded-2xl border border-purple-100">
              <div className="relative group shrink-0">
                <img
                  src={avatarPreview}
                  alt="Faculty Mentor"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-purple-400/50"
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity cursor-pointer backdrop-blur-2xs"
                  aria-label="Change photo"
                >
                  <Camera size={20} />
                  <span className="text-[10px] font-bold">Change</span>
                </button>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900">Faculty Profile Picture</h4>
                <p className="text-xs text-gray-500 max-w-md">
                  Upload a clear portrait photo. This image will appear across the Mentor Portal, mentee chat, and official circulars.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-[#7656F4] hover:bg-[#6342E8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Upload size={13} />
                    <span>Upload New Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="px-3.5 py-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editable Fields Form */}
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Personal Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Personal Email Address <span className="text-[#7656f4]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="email"
                      value={profileData.personalEmail}
                      onChange={(e) => setProfileData({ ...profileData, personalEmail: e.target.value })}
                      placeholder="e.g. personal.email@gmail.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">Used for emergency password recovery &amp; confidential alerts.</span>
                </div>

                {/* Availability Status Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Faculty Availability / Duty Status <span className="text-[#7656f4]">*</span>
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <select
                      value={profileData.availabilityStatus}
                      onChange={(e) => setProfileData({ ...profileData, availabilityStatus: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all cursor-pointer font-semibold"
                    >
                      <option value="Active">🟢 Active (On Campus &amp; Accepting Inquiries)</option>
                      <option value="On-Leave">🟡 On-Leave (Away on Sabbatical / Medical Leave)</option>
                      <option value="Inactive">⚪ Inactive (Offline / Semester Recess)</option>
                    </select>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1 block">When On-Leave, students are notified that responses may be delayed.</span>
                </div>

                {/* Primary Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Contact Phone Number <span className="text-[#7656f4]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+91 98300 00000"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Office Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Office / Cabin Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="text"
                      value={profileData.officeLocation}
                      onChange={(e) => setProfileData({ ...profileData, officeLocation: e.target.value })}
                      placeholder="e.g. Room 304, Tech Block"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Consultation Hours */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Student Office Hours / Consultation Timing
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="text"
                      value={profileData.consultationHours}
                      onChange={(e) => setProfileData({ ...profileData, consultationHours: e.target.value })}
                      placeholder="e.g. Mon, Wed, Fri • 2:00 PM - 4:30 PM"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Research Specialization &amp; Focus
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="text"
                      value={profileData.specialization}
                      onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                      placeholder="e.g. Artificial Intelligence, Cloud Systems"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7656F4] hover:bg-[#6342E8] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Save size={15} />
                  <span>Save Profile &amp; Status</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section: Official Institutional Records (Read-Only) */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-slate-600" />
                <h3 className="text-sm font-bold text-slate-800">Verified Institutional Faculty Record (Read-Only)</h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 border border-slate-300">
                Administration Lock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Faculty Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={profileData.employeeId}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Designation &amp; Role</label>
                <input
                  type="text"
                  value={profileData.designation}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Department</label>
                <input
                  type="text"
                  value={profileData.department}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Institutional Email</label>
                <input
                  type="text"
                  value={profileData.institutionalEmail}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Date of Joining</label>
                <input
                  type="text"
                  value={profileData.joiningDate}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 2: SECURITY & PASSWORD (Exact Checklist Layout)                    */}
      {/* ========================================================================= */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Header Row */}
          <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-[#7656f4] flex items-center justify-center shrink-0 shadow-2xs">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Account Security &amp; Credentials</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Update master password and configure multi-factor authorization
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Middle 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              
              {/* Left Column: Password Inputs */}
              <div className="space-y-4">
                {/* Current Master Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Current Master Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="Enter existing password"
                      className="w-full px-3.5 pr-10 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New Master Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    New Master Password
                  </label>
                  <input
                    type="password"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="Create strong new password"
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Re-type new password"
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Right Column: Password Requirements Checklist Card */}
              <div className="bg-[#FAF8FF] border border-purple-100/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div>
                  <h4 className="text-xs font-bold text-[#4c1d95] uppercase tracking-wider mb-3">
                    PASSWORD REQUIREMENTS CHECKLIST
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                      <span>Minimum 8 characters length</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                      <span>At least one uppercase English letter (A-Z)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                      <span>At least one numeric digit (0-9)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                      <span>At least one special symbol (!@#$%^&amp;*)</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-100/80">
                  <span className="text-xs font-bold text-[#4c1d95]">Password Strength Rating:</span>
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Strong • 95%
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Two Feature Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              {/* Card 1: Two-Factor Authentication */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-gray-400 mt-0.5">Require OTP on new faculty logins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Card 2: Idle Session Auto-Timeout */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Idle Session Auto-Timeout</p>
                  <p className="text-xs text-gray-400 mt-0.5">Auto logout after inactivity</p>
                </div>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs shrink-0">
                  30 Minutes
                </span>
              </div>

            </div>

            {/* Action Button Row */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <KeyRound size={15} />
                <span>Update Security Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 3: NOTIFICATION PREFERENCES                                        */}
      {/* ========================================================================= */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Faculty &amp; Student Alert Preferences</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure which mentorship and academic activities trigger real-time notifications.
                </p>
              </div>
              <span className="text-xs font-bold text-[#7656f4] bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                Customized
              </span>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              
              {/* Notification 1: Student Messages */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Student Mentee Inquiries &amp; Messages</p>
                  <p className="text-xs text-gray-500">Get notified when an assigned mentee sends a direct message or guidance request.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.studentMessages}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, studentMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

              {/* Notification 2: Attendance Upload Reminders */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Weekly Attendance Upload Reminders</p>
                  <p className="text-xs text-gray-500">Receive alert reminders before the 48-hour attendance ledger lock deadline.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.attendanceReminders}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, attendanceReminders: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

              {/* Notification 3: Credit Points Verification */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Credit Point Approval Submissions</p>
                  <p className="text-xs text-gray-500">Instant notification when students upload hackathon or workshop certificates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.creditPointRequests}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, creditPointRequests: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

              {/* Notification 4: Exam Circulars */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Examination Cell &amp; Result Deadlines</p>
                  <p className="text-xs text-gray-500">Broadcasts regarding semester evaluation schedules and marksheet publishing windows.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.resultSubmissionAlerts}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, resultSubmissionAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

            </div>

            {/* Notification Delivery Channels */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Alert Delivery Channels</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50/20 hover:border-purple-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.emailChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailChannel: e.target.checked })}
                    className="accent-[#7656F4] rounded w-4 h-4"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Email Digest</p>
                    <p className="text-[10px] text-gray-500">To verified inbox</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50/20 hover:border-purple-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.pushChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, pushChannel: e.target.checked })}
                    className="accent-[#7656F4] rounded w-4 h-4"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Portal Push</p>
                    <p className="text-[10px] text-gray-500">Live dashboard badges</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-purple-50/20 hover:border-purple-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.smsChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, smsChannel: e.target.checked })}
                    className="accent-[#7656F4] rounded w-4 h-4"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">SMS Alerts</p>
                    <p className="text-[10px] text-gray-500">Emergency notices only</p>
                  </div>
                </label>

              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#7656F4] hover:bg-[#6342E8] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB 4: MENTORSHIP & ACADEMIC PREFERENCES                                */}
      {/* ========================================================================= */}
      {activeTab === "mentorship" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Mentorship &amp; Consultation Controls</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure student visibility, consultation booking rules, and mentee cohort reporting.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Active Cohort
              </span>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Display Office Hours on Student Portal</p>
                  <p className="text-xs text-gray-500">Allow your assigned mentees to view your cabin room number and consultation schedule.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mentorshipPreferences.showConsultationOnPortal}
                    onChange={(e) => setMentorshipPreferences({ ...mentorshipPreferences, showConsultationOnPortal: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Automated Weekly Mentee Performance Digest</p>
                  <p className="text-xs text-gray-500">Receive an automated Monday summary of low-attendance warnings and academic flags.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mentorshipPreferences.weeklyMenteeDigest}
                    onChange={(e) => setMentorshipPreferences({ ...mentorshipPreferences, weeklyMenteeDigest: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Direct Phone Calls via Helpdesk</p>
                  <p className="text-xs text-gray-500">Allow academic helpdesk staff to forward urgent student queries to your verified mobile number.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mentorshipPreferences.allowDirectStudentCalls}
                    onChange={(e) => setMentorshipPreferences({ ...mentorshipPreferences, allowDirectStudentCalls: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7656F4]"></div>
                </label>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#7656F4] hover:bg-[#6342E8] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Save Mentorship Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
