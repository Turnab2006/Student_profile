import { useState, useRef } from "react";
import {
  UserRound,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  Save,
  CheckCircle2,
  Mail,
  Camera,
  Upload,
  Droplet,
  Award,
  CreditCard,
  Building,
  Phone,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  FileText,
  KeyRound,
  Info,
  Calendar,
  Globe,
  Menu,
  HelpCircle,
  MapPin,
  ChevronDown,
  Hash,
  Clock,
  Smartphone,
  ExternalLink
} from "lucide-react";
import { tanukaStudentData } from "../../data/studentProfileData";
import tuhinaAvatar from "../../assets/studentAssests/tuhina_avatar.jpg";

export default function StudentSettings({
  hideHeader = false,
  onOpenSidebar,
  onNavigate,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Your student profile details and account preferences have been saved successfully!"
  );
  const fileInputRef = useRef(null);

  // Profile Form States
  const [avatarPreview, setAvatarPreview] = useState(tuhinaAvatar);
  const [profileData, setProfileData] = useState({
    fullName: tanukaStudentData.name,
    rollNo: tanukaStudentData.rollNo,
    regNo: tanukaStudentData.registrationNo,
    department: tanukaStudentData.department,
    batch: tanukaStudentData.batch,
    semester: tanukaStudentData.semester,
    institutionalEmail: tanukaStudentData.studentEmail,
    personalEmail: tanukaStudentData.email,
    abcId: tanukaStudentData.abcId,
    bloodGroup: tanukaStudentData.additionalDetails.bloodGroup,
    phone: tanukaStudentData.phone,
    emergencyPhone: tanukaStudentData.additionalDetails.emergencyContact,
    address: tanukaStudentData.addressDetails.fullAddress,
  });

  // Password / Security States
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Notification Preferences States
  const [notificationPreferences, setNotificationPreferences] = useState({
    examResults: true,
    attendanceAlerts: true,
    notices: true,
    mentorMessages: true,
    creditPointApprovals: true,
    eventReminders: true,
    emailChannel: true,
    pushChannel: true,
    smsChannel: false,
  });

  // Academic & Privacy Preferences
  const [privacyPreferences, setPrivacyPreferences] = useState({
    showEmergencyOnId: true,
    allowMentorViewContact: true,
    autoDownloadMarkSheetPdf: true,
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
    setAvatarPreview(tuhinaAvatar);
  };

  const handleSave = (e, customMsg) => {
    e?.preventDefault();
    if (customMsg) setSuccessMessage(customMsg);
    else
      setSuccessMessage(
        "Your student profile details and account preferences have been saved successfully!"
      );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const tabs = [
    { id: "profile", label: "Profile & Identity", icon: UserRound },
    { id: "security", label: "Security & Password", icon: Lock },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "privacy", label: "Academic & Privacy", icon: ShieldCheck },
  ];

  return (
    <div className="font-['Roboto',sans-serif] w-full min-w-0">
      {/* ========================================================================= */}
      {/* OPTIONAL STANDALONE HEADER (When hideHeader is false)                     */}
      {/* ========================================================================= */}
      {!hideHeader && (
        <header className="sticky top-0 z-30 h-[60px] sm:h-[65px] bg-white border-b border-gray-100 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs w-full">
          {/* Left: Mobile Toggle + Page Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenSidebar) onOpenSidebar();
                else window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
              }}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gray-100/80 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-700 lg:hidden cursor-pointer transition-all shrink-0"
              aria-label="Open sidebar"
            >
              <Menu size={19} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-gray-800 tracking-tight truncate">
                Settings
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
                Manage your student account preferences and security.
              </p>
            </div>
          </div>

          {/* Right: Notification, Help, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                3
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate("support");
              }}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Help & Support"
            >
              <HelpCircle size={18} />
            </button>
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200 ring-2 ring-blue-500/20">
                <img
                  src={avatarPreview}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div className="p-3 sm:px-5 sm:py-3.5 space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-12 w-full min-w-0">
        {/* ========================================================================= */}
        {/* 1. BLUE HERO BANNER                                                       */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2384FD] via-[#1d6fd6] to-[#174eb8] border border-blue-600/30 p-4 sm:p-6 shadow-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          {/* Ambient Glows */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Text Content */}
          <div className="relative z-10 space-y-2 min-w-0 flex-1 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs shadow-2xs">
                Student Identity &amp; Account
              </span>
              <span className="text-blue-100 text-xs font-semibold">
                • B.Tech CSE 2024-28 (Sem 4)
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug break-words">
              Student Profile &amp; Account Settings
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 font-normal max-w-xl leading-relaxed break-words">
              Update your digital profile picture, Academic Bank of Credits (ABC ID), personal contact details, security credentials, and alert preferences.
            </p>
          </div>

          {/* Hero Save Action Button (Horizontally centered on mobile) */}
          <div className="relative z-10 flex items-center justify-center md:justify-end w-full md:w-auto shrink-0 pt-2 md:pt-0">
            <button
              type="button"
              onClick={(e) => handleSave(e, "All student account settings and preferences have been synchronized successfully!")}
              className="w-full sm:w-auto max-w-[260px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#2384FD] hover:bg-blue-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95 mx-auto md:mx-0"
            >
              <Save size={16} className="stroke-[2.5] shrink-0" />
              <span>Save All Settings</span>
            </button>
          </div>
        </section>

        {/* Success Save Banner */}
        {savedSuccess && (
          <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span className="truncate sm:whitespace-normal">{successMessage}</span>
            </div>
            <span className="text-xs text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 font-bold shrink-0 shadow-2xs">
              Synced
            </span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. STAT STATUS CARDS ROW: Identity & Security Overview                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {/* Card 1: ABC ID */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[4px] border-l-[#2384FD] shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2384FD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <Award size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                ABC ID Status
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate my-0.5 font-mono">
                {profileData.abcId || "Not Linked"}
              </p>
              <p className="text-[11px] sm:text-xs text-[#2384FD] font-semibold flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2384FD] inline-block shrink-0" />
                DigiLocker Verified
              </p>
            </div>
          </div>

          {/* Card 2: Security State */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[4px] border-l-emerald-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
              <ShieldCheck size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Security Protection
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate my-0.5">
                {twoFactorAuth ? "2FA Enabled" : "Password Only"}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                High Account Security
              </p>
            </div>
          </div>

          {/* Card 3: Digital ID */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[4px] border-l-indigo-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
              <CreditCard size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Digital ID Card
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate my-0.5">
                Valid till 2028
              </p>
              <p className="text-[11px] sm:text-xs text-indigo-600 font-semibold flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block shrink-0" />
                Live Campus Pass
              </p>
            </div>
          </div>

          {/* Card 4: Blood Group & Health */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[4px] border-l-rose-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
              <Droplet size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Blood Group
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate my-0.5">
                {profileData.bloodGroup} (Rh Positive)
              </p>
              <p className="text-[11px] sm:text-xs text-rose-600 font-semibold flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block shrink-0" />
                Emergency Record
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TABS NAVIGATION (Modern Elevated Segmented Control)                   */}
        {/* ========================================================================= */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-98 ${
                  isActive
                    ? "bg-[#2384FD] text-white shadow-md shadow-blue-500/20"
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
        {/* 4. TAB 1: PROFILE & IDENTITY                                              */}
        {/* ========================================================================= */}
        {activeTab === "profile" && (
          <div className="space-y-5 sm:space-y-6">
            {/* Section: Profile Image & Digital Avatar */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-gray-100 pb-3.5">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Student Profile Photo
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    This photo appears on your official Digital ID card, Grade Sheets, and portal dashboard.
                  </p>
                </div>
                <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2384FD] border border-blue-100 shadow-2xs">
                  Official Digital ID
                </span>
              </div>

              {/* Profile Photo Display centered on mobile */}
              <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-center gap-5 sm:gap-6 pt-1">
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-500/30 ring-4 ring-blue-50 shadow-md">
                    <img
                      src={avatarPreview}
                      alt="Student Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = tuhinaAvatar;
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 p-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer ring-2 ring-white"
                    title="Upload New Photo"
                    aria-label="Upload New Photo"
                  >
                    <Camera size={15} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="space-y-3 flex-1 flex flex-col items-center sm:items-start w-full">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer min-w-[150px]"
                    >
                      <Upload size={15} />
                      <span>Upload New Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetAvatar}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Reset</span>
                    </button>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-slate-50/70 p-3 rounded-xl border border-slate-100 w-full max-w-xl text-left">
                    <Info size={15} className="text-[#2384FD] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Supported formats: <strong className="text-gray-700">JPG, PNG, WEBP</strong> (Max 5MB). High-resolution portrait with clear face exposure is recommended for verified biometric passes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Editable Student Contact & Academic IDs */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
              <div className="border-b border-gray-100 pb-3.5">
                <h3 className="text-base font-bold text-gray-900">
                  Editable Student Credentials
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update your ABC ID, personal email, blood group, and emergency contact details.
                </p>
              </div>

              <form onSubmit={(e) => handleSave(e, "Student credentials updated successfully!")} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {/* Personal Email ID (Editable) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Personal Email Address <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      <input
                        type="email"
                        value={profileData.personalEmail}
                        onChange={(e) =>
                          setProfileData({ ...profileData, personalEmail: e.target.value })
                        }
                        placeholder="your.email@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Used for password recovery and fee receipts.
                    </p>
                  </div>

                  {/* ABC ID (Academic Bank of Credits) (Editable) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      ABC ID (Academic Bank of Credits) <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2384FD] pointer-events-none" size={16} />
                      <input
                        type="text"
                        value={profileData.abcId}
                        onChange={(e) =>
                          setProfileData({ ...profileData, abcId: e.target.value })
                        }
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 font-mono focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-[#2384FD] font-semibold mt-1">
                      Official 12-digit APAAR / ABC ID from DigiLocker.
                    </p>
                  </div>

                  {/* Blood Group (Editable) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Blood Group <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Droplet className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" size={16} />
                      <select
                        value={profileData.bloodGroup}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bloodGroup: e.target.value })
                        }
                        className="w-full pl-10 pr-8 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer shadow-2xs appearance-none"
                      >
                        <option value="A+">A+ (A Rh Positive)</option>
                        <option value="A-">A- (A Rh Negative)</option>
                        <option value="B+">B+ (B Rh Positive)</option>
                        <option value="B-">B- (B Rh Negative)</option>
                        <option value="O+">O+ (O Rh Positive)</option>
                        <option value="O-">O- (O Rh Negative)</option>
                        <option value="AB+">AB+ (AB Rh Positive)</option>
                        <option value="AB-">AB- (AB Rh Negative)</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Printed on your Digital Emergency ID card.
                    </p>
                  </div>

                  {/* Primary Phone Number (Editable) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Mobile Phone Number <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        placeholder="+91 90000 00000"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Primary mobile contact for campus alerts.
                    </p>
                  </div>

                  {/* Emergency Contact Phone (Editable) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Emergency Contact Phone <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" size={16} />
                      <input
                        type="tel"
                        value={profileData.emergencyPhone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, emergencyPhone: e.target.value })
                        }
                        placeholder="+91 98000 00000"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      Guardian emergency contact for urgent reach.
                    </p>
                  </div>

                  {/* Residential Address (Editable) */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Residential Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={16} />
                      <textarea
                        rows={2}
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData({ ...profileData, address: e.target.value })
                        }
                        placeholder="Enter your current residential address"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs resize-none"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Permanent communication address recorded on file.
                    </p>
                  </div>
                </div>

                {/* Form Action Row */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Save size={15} />
                    <span>Save Profile Details</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Section: Official Institutional Records (Locked by Admission Registry) */}
            <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Building size={17} className="text-slate-600" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Verified Academic Registry (Read-Only)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Official credentials verified and locked by the Registrar &amp; Examination Cell.
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700 border border-slate-300 flex items-center gap-1 shadow-2xs">
                  <Lock size={11} />
                  <span>Institutional Lock</span>
                </span>
              </div>

              {/* 6 Read-Only Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Student Full Name */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>Student Full Name</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 break-words">
                    {profileData.fullName}
                  </p>
                </div>

                {/* 2. College Roll No */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>College Roll No</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 font-mono break-words">
                    {profileData.rollNo}
                  </p>
                </div>

                {/* 3. University Registration No */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>University Reg. No</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 font-mono break-words">
                    {profileData.regNo}
                  </p>
                </div>

                {/* 4. Department */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>Department</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 break-words">
                    {profileData.department}
                  </p>
                </div>

                {/* 5. Academic Batch & Semester */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>Batch &amp; Semester</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 break-words">
                    {profileData.batch} • {profileData.semester}
                  </p>
                </div>

                {/* 6. Institutional Email */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>Institutional Email</span>
                    <Lock size={12} className="text-slate-300" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#2384FD] break-all">
                    {profileData.institutionalEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. TAB 2: SECURITY & PASSWORD                                             */}
        {/* ========================================================================= */}
        {activeTab === "security" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
            {/* Header Row */}
            <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2384FD] flex items-center justify-center shrink-0 shadow-2xs">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Account Security &amp; Credentials
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update master password and configure multi-factor authorization.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => handleSave(e, "Security credentials and authentication rules saved successfully!")}
              className="space-y-6"
            >
              {/* Middle 2-Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left Column: Password Inputs */}
                <div className="space-y-4">
                  {/* Current Master Password */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Current Master Password <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({ ...passwords, current: e.target.value })
                        }
                        placeholder="Enter existing password"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                        aria-label="Toggle password visibility"
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Master Password */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      New Master Password <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={passwords.newPass}
                        onChange={(e) =>
                          setPasswords({ ...passwords, newPass: e.target.value })
                        }
                        placeholder="Create strong new password"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                        aria-label="Toggle new password visibility"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Confirm New Password <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({ ...passwords, confirm: e.target.value })
                        }
                        placeholder="Re-type new password"
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                        aria-label="Toggle confirm password visibility"
                      >
                        {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Password Requirements Checklist Card */}
                <div className="bg-[#f8faff] border border-blue-100/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                  <div>
                    <h4 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider mb-3">
                      PASSWORD REQUIREMENTS CHECKLIST
                    </h4>
                    <ul className="space-y-2.5">
                      <li className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                        <span>Minimum 8 characters length</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                        <span>At least one uppercase English letter (A-Z)</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                        <span>At least one numeric digit (0-9)</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 stroke-[2.5]" />
                        <span>At least one special symbol (!@#$%^&amp;*)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-blue-100/80">
                    <span className="text-xs font-bold text-[#1e3a8a]">
                      Password Strength Rating:
                    </span>
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
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Two-Factor Authentication (2FA)
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Require OTP verification on new device logins
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-2xs"></div>
                  </label>
                </div>

                {/* Card 2: Idle Session Auto-Timeout */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Idle Session Auto-Timeout
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Auto logout after 30 minutes of inactivity
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs shrink-0 flex items-center gap-1.5">
                    <Clock size={13} className="text-gray-500" />
                    <span>30 Minutes</span>
                  </span>
                </div>
              </div>

              {/* Action Button Row */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer active:scale-95"
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
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Academic &amp; Portal Notification Alerts
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select which real-time academic events trigger instant alerts.
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-bold text-[#2384FD] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs">
                  Customized
                </span>
              </div>

              <div className="space-y-4 divide-y divide-gray-100">
                {/* Notification 1: Exam & SGPA Results */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Semester Exam &amp; SGPA Results
                    </p>
                    <p className="text-xs text-gray-500">
                      Get notified the instant official semester grade cards and marks are published.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.examResults}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          examResults: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                {/* Notification 2: Attendance Warning Flags */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Low Attendance Warning Alerts
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive proactive warnings if subject attendance falls near or below the 75% institutional threshold.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.attendanceAlerts}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          attendanceAlerts: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                {/* Notification 3: Official Notice Circulars */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Official Notices &amp; Circulars
                    </p>
                    <p className="text-xs text-gray-500">
                      Urgent circulars, holiday announcements, and exam schedule broadcasts.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.notices}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          notices: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                {/* Notification 4: Faculty Mentor Messages */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Faculty Mentor Direct Communications
                    </p>
                    <p className="text-xs text-gray-500">
                      Messages, meeting requests, and academic feedback sent from your assigned mentor.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.mentorMessages}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          mentorMessages: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                {/* Notification 5: Credit Point Approvals */}
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Co-Curricular Credit Point Approvals
                    </p>
                    <p className="text-xs text-gray-500">
                      Updates whenever submitted activity certificates and credit points are verified.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.creditPointApprovals}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          creditPointApprovals: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>
              </div>

              {/* Notification Delivery Channels */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Alert Delivery Channels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer hover:bg-gray-100/60 transition-colors shadow-2xs">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.emailChannel}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          emailChannel: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      Email Notifications
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer hover:bg-gray-100/60 transition-colors shadow-2xs">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.pushChannel}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          pushChannel: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      In-Portal Push Alerts
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer hover:bg-gray-100/60 transition-colors shadow-2xs">
                    <input
                      type="checkbox"
                      checked={notificationPreferences.smsChannel}
                      onChange={(e) =>
                        setNotificationPreferences({
                          ...notificationPreferences,
                          smsChannel: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                    />
                    <span className="text-xs font-semibold text-gray-800">
                      SMS / Urgent Text
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => handleSave(e, "Notification preferences updated successfully!")}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Save Notification Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. TAB 4: ACADEMIC & PRIVACY                                              */}
        {/* ========================================================================= */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  Academic Privacy &amp; Digital ID Controls
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Control what information is visible on your campus digital credentials.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-gray-100">
                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Show Emergency Contact on Digital ID QR Code
                    </p>
                    <p className="text-xs text-gray-500">
                      Enables campus medical staff and security to view emergency numbers upon scanning your digital badge.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={privacyPreferences.showEmergencyOnId}
                      onChange={(e) =>
                        setPrivacyPreferences({
                          ...privacyPreferences,
                          showEmergencyOnId: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Allow Faculty Mentor Direct Contact View
                    </p>
                    <p className="text-xs text-gray-500">
                      Allows your assigned mentor (Prof. Kaushik Chatterjee) to view your personal phone and email for academic guidance.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={privacyPreferences.allowMentorViewContact}
                      onChange={(e) =>
                        setPrivacyPreferences({
                          ...privacyPreferences,
                          allowMentorViewContact: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Auto-Generate PDF Receipt on Grade Downloads
                    </p>
                    <p className="text-xs text-gray-500">
                      Automatically attach an institutional verification watermark to downloaded marksheet PDFs.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={privacyPreferences.autoDownloadMarkSheetPdf}
                      onChange={(e) =>
                        setPrivacyPreferences({
                          ...privacyPreferences,
                          autoDownloadMarkSheetPdf: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => handleSave(e, "Academic privacy settings saved successfully!")}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Save Privacy Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
