import { useState, useRef } from "react";
import {
  UserRound,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  Smartphone,
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
  Globe
} from "lucide-react";
import tuhinaAvatar from "../../assets/tuhina_avatar.jpg";

export default function StudentSettings({ hideHeader = false }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Profile Form States
  const [avatarPreview, setAvatarPreview] = useState(tuhinaAvatar || "/tuhina_avatar.jpg");
  const [profileData, setProfileData] = useState({
    fullName: "Tuhina Banerjee",
    rollNo: "CSE2024012",
    regNo: "MAKAUT-2024-009182",
    department: "Computer Science & Engineering",
    batch: "2024 - 2028",
    semester: "Semester 4",
    institutionalEmail: "cse202413@recruit.org.in",
    personalEmail: "tuhinabanerjee134@gmail.com",
    abcId: "9284-1823-9012",
    bloodGroup: "O+",
    phone: "+91 91239 30828",
    emergencyPhone: "+91 98301 99887",
    address: "Flat 4B, Greenwood Residency, Action Area II, New Town, Kolkata - 700156",
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
    setAvatarPreview(tuhinaAvatar || "/tuhina_avatar.jpg");
  };

  const handleSave = (e) => {
    e?.preventDefault();
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
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-5 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto pb-10">
      
      {/* Top Header if not hidden */}
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">
              Student Settings
            </h1>
            <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">
              Manage your personal credentials, digital ID parameters, security, and notification channels.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. BLUE HERO BANNER (Synchronized with Admin Portal structure)           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2384FD] via-[#1d6fd6] to-[#174eb8] border border-blue-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ambient Glows */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
              Student Identity &amp; Account
            </span>
            <span className="text-blue-100 text-xs font-semibold">• B.Tech CSE 2024-28 (Sem 4)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Student Profile &amp; Account Settings
          </h2>
          <p className="text-xs text-blue-50/90 font-normal max-w-xl">
            Update your digital profile picture, Academic Bank of Credits (ABC ID), personal contact details, security credentials, and alert preferences.
          </p>
        </div>

        {/* Hero Save Action Button */}
        <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#2384FD] hover:bg-blue-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
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
            <span>Your student profile details and account preferences have been saved successfully!</span>
          </div>
          <span className="text-xs text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
            Synced
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STAT CHIPS ROW: Academic Identity & Security Overview                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ABC ID */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2384FD] flex items-center justify-center shrink-0 border border-blue-100">
            <Award size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ABC ID Status</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">{profileData.abcId || "Not Linked"}</p>
            <p className="text-[11px] text-blue-600 font-semibold">DigiLocker Verified</p>
          </div>
        </div>

        {/* Card 2: Security State */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Security Protection</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">{twoFactorAuth ? "2FA Enabled" : "Password Only"}</p>
            <p className="text-[11px] text-emerald-600 font-semibold">High Account Security</p>
          </div>
        </div>

        {/* Card 3: Digital ID */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-indigo-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <CreditCard size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Digital ID Card</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">Valid till 2028</p>
            <p className="text-[11px] text-indigo-600 font-semibold">Live Campus Pass</p>
          </div>
        </div>

        {/* Card 4: Blood Group & Health */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-rose-500 shadow-xs flex items-center gap-3.5 hover:-translate-y-0.5 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <Droplet size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Blood Group</p>
            <p className="text-sm font-bold text-gray-900 truncate my-0.5">{profileData.bloodGroup} (Rh Positive)</p>
            <p className="text-[11px] text-rose-600 font-semibold">Emergency Record</p>
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
                  ? "bg-[#2384FD] text-white shadow-md shadow-blue-500/25 scale-[1.01]"
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
        <div className="space-y-6">
          
          {/* Section: Profile Image & Digital Avatar */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Student Profile Photo</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  This photo appears on your official Digital ID card, Grade Sheets, and portal dashboard.
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2384FD] border border-blue-100">
                Official Digital ID
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500/40 ring-4 ring-blue-50 shadow-md">
                  <img
                    src={avatarPreview}
                    alt="Student Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/tuhina_avatar.jpg";
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 p-2 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                  title="Upload New Photo"
                >
                  <Camera size={14} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>Upload New Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Supported formats: JPG, PNG, WEBP (Max 5MB). High resolution with clear face exposure is recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Editable Student Contact & Academic IDs */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Editable Student Credentials</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Update your ABC ID, personal email, blood group, and emergency contact details.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Personal Email ID (Editable) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Personal Email Address <span className="text-blue-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="email"
                      value={profileData.personalEmail}
                      onChange={(e) => setProfileData({ ...profileData, personalEmail: e.target.value })}
                      placeholder="your.email@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Used for password recovery and fee receipts.</p>
                </div>

                {/* ABC ID (Academic Bank of Credits) (Editable) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ABC ID (Academic Bank of Credits) <span className="text-blue-600">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" size={15} />
                    <input
                      type="text"
                      value={profileData.abcId}
                      onChange={(e) => setProfileData({ ...profileData, abcId: e.target.value })}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-mono focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-blue-600 mt-1">Official 12-digit APAAR / ABC ID from DigiLocker.</p>
                </div>

                {/* Blood Group (Editable) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Blood Group <span className="text-blue-600">*</span>
                  </label>
                  <div className="relative">
                    <Droplet className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500" size={15} />
                    <select
                      value={profileData.bloodGroup}
                      onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
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
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Printed on your Digital Emergency ID card.</p>
                </div>

                {/* Primary Phone Number (Editable) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Mobile Phone Number <span className="text-blue-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+91 90000 00000"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Emergency Contact Phone (Editable) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Emergency Contact Phone <span className="text-blue-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" size={15} />
                    <input
                      type="tel"
                      value={profileData.emergencyPhone}
                      onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Residential Address (Editable) */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Residential Address
                  </label>
                  <textarea
                    rows={2}
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    placeholder="Enter your current residential address"
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Form Action Row */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Save size={15} />
                  <span>Save Profile Details</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section: Official Institutional Records (Locked by Admission Registry) */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-slate-600" />
                <h3 className="text-sm font-bold text-slate-800">Verified Academic Registry (Read-Only)</h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 border border-slate-300">
                Institutional Lock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">College Roll No</label>
                <input
                  type="text"
                  value={profileData.rollNo}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">University Registration No</label>
                <input
                  type="text"
                  value={profileData.regNo}
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
                <label className="block font-semibold text-slate-500 mb-1">Academic Batch &amp; Semester</label>
                <input
                  type="text"
                  value={`${profileData.batch} • ${profileData.semester}`}
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
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 2: SECURITY & PASSWORD                                             */}
      {/* ========================================================================= */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Header Row */}
          <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2384FD] flex items-center justify-center shrink-0 shadow-2xs">
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
                      className="w-full px-3.5 pr-10 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
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
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
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
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Right Column: Password Requirements Checklist Card */}
              <div className="bg-[#f8faff] border border-blue-100/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
                <div>
                  <h4 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider mb-3">
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

                <div className="flex items-center justify-between pt-2 border-t border-blue-100/80">
                  <span className="text-xs font-bold text-[#1e3a8a]">Password Strength Rating:</span>
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
                  <p className="text-xs text-gray-400 mt-0.5">Require OTP on new device logins</p>
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
                <h3 className="text-base font-bold text-gray-900">Academic &amp; Portal Notification Alerts</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Select which real-time academic events trigger instant alerts.
                </p>
              </div>
              <span className="text-xs font-bold text-[#2384FD] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                Customized
              </span>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              
              {/* Notification 1: Exam & SGPA Results */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Semester Exam &amp; SGPA Results</p>
                  <p className="text-xs text-gray-500">Get notified the instant official semester grade cards and marks are published.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.examResults}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, examResults: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              {/* Notification 2: Attendance Warning Flags */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Low Attendance Warning Alerts</p>
                  <p className="text-xs text-gray-500">Receive proactive warnings if subject attendance falls near or below the 75% institutional threshold.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.attendanceAlerts}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, attendanceAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              {/* Notification 3: Official Notice Circulars */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Official Notices &amp; Circulars</p>
                  <p className="text-xs text-gray-500">Urgent circulars, holiday announcements, and exam schedule broadcasts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.notices}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, notices: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              {/* Notification 4: Faculty Mentor Messages */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Faculty Mentor Direct Communications</p>
                  <p className="text-xs text-gray-500">Messages, meeting requests, and academic feedback sent from your assigned mentor.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.mentorMessages}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, mentorMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              {/* Notification 5: Credit Point Approvals */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Co-Curricular Credit Point Approvals</p>
                  <p className="text-xs text-gray-500">Updates whenever submitted activity certificates and credit points are verified.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.creditPointApprovals}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, creditPointApprovals: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

            </div>

            {/* Notification Delivery Channels */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Alert Delivery Channels</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.emailChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailChannel: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                  />
                  <span className="text-xs font-semibold text-gray-800">Email Notifications</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.pushChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, pushChannel: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                  />
                  <span className="text-xs font-semibold text-gray-800">In-Portal Push Alerts</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationPreferences.smsChannel}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, smsChannel: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-[#2384FD]"
                  />
                  <span className="text-xs font-semibold text-gray-800">SMS / Urgent Text</span>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
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
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Academic Privacy &amp; Digital ID Controls</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Control what information is visible on your campus digital credentials.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-gray-100">
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Show Emergency Contact on Digital ID QR Code</p>
                  <p className="text-xs text-gray-500">Enables campus medical staff and security to view emergency numbers upon scanning your digital badge.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={privacyPreferences.showEmergencyOnId}
                    onChange={(e) => setPrivacyPreferences({ ...privacyPreferences, showEmergencyOnId: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Allow Faculty Mentor Direct Contact View</p>
                  <p className="text-xs text-gray-500">Allows your assigned mentor (Prof. Kaushik Chatterjee) to view your personal phone and email for academic guidance.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={privacyPreferences.allowMentorViewContact}
                    onChange={(e) => setPrivacyPreferences({ ...privacyPreferences, allowMentorViewContact: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Auto-Generate PDF Receipt on Grade Downloads</p>
                  <p className="text-xs text-gray-500">Automatically attach an institutional verification watermark to downloaded marksheet PDFs.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={privacyPreferences.autoDownloadMarkSheetPdf}
                    onChange={(e) => setPrivacyPreferences({ ...privacyPreferences, autoDownloadMarkSheetPdf: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2384FD]"></div>
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
