import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Bell,
  ChevronDown,
  Edit3,
  Mail,
  Phone,
  Building,
  GraduationCap,
  CalendarDays,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Droplet,
  CreditCard,
  MapPin,
  Globe,
  Home,
  ShieldCheck,
  User,
  Users,
  Briefcase,
  Info,
  Download,
  Printer,
  X,
  Check,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  BookmarkCheck,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { initialStudentData } from "../../data/studentProfileData";

export default function StudentProfile({ onBack, studentData: propStudentData, userRole = "student", defaultTab = "parents" }) {
  const [student, setStudent] = useState(propStudentData || initialStudentData);
  const [activeTab, setActiveTab] = useState(defaultTab || "parents"); // "academic" | "parents" | "result" | "attendance"
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeEditSection, setActiveEditSection] = useState("personal");

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function handleOpenEdit() {
    setEditFormData(JSON.parse(JSON.stringify(student)));
    setIsEditModalOpen(true);
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    setStudent(editFormData);
    setIsEditModalOpen(false);
    showToast("Student profile updated successfully!");
  }

  return (
    <div className="flex-1 h-full w-full min-h-0 bg-[#f8fafc] text-slate-800 flex flex-col overflow-hidden font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-200 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top Header matching reference */}
      <header className="shrink-0 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 z-20">
        {/* Left: Back Button & Title & Breadcrumbs */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200 cursor-pointer"
            title="Go Back to Dashboard"
          >
            <ArrowLeft size={18} className="stroke-[2.5]" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Student Profile
            </h1>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="hover:text-blue-600 cursor-pointer" onClick={onBack}>Home</span>
              <span className="text-slate-400">&gt;</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={onBack}>Students</span>
              <span className="text-slate-400">&gt;</span>
              <span className="text-blue-600 font-semibold">Student Profile</span>
            </nav>
          </div>
        </div>

        {/* Right: Search, Notifications, and User Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors relative"
              title="3 Unread Notifications"
            >
              <Bell size={17} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                3
              </span>
            </button>
          </div>

          {/* User Badge / Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <img
              src={student.avatar || "/tuhina_avatar.jpg"}
              alt={userRole === "admin" ? "Admin User" : student.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100 shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs hidden items-center justify-center shadow-sm">
              {student.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {userRole === "admin" ? "Admin User" : student.name}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {userRole === "admin" ? "Super Admin" : "Student"}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Profile Page Body with smooth vertical scrolling */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl w-full mx-auto space-y-6 pb-12">
          {/* Action Button Row: Edit Profile */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleOpenEdit}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-blue-500 text-blue-600 bg-white hover:bg-blue-50/80 hover:border-blue-600 font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Edit3 size={15} className="stroke-[2.2]" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Hero Profile Banner Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#eef5ff] via-[#f4f8ff] to-[#e8f1ff] border border-blue-200/70 p-6 sm:p-8 shadow-sm">
          {/* Decorative Dot Matrix Pattern on Right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-40"
            style={{
              backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
              backgroundSize: "14px 14px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
            {/* Student Avatar with Crisp White Ring */}
            <div className="relative group shrink-0">
              <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-white border border-blue-100 flex items-center justify-center">
                <img
                  src="/arjun_kumar_avatar.jpg"
                  alt={student.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden h-full w-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-3xl items-center justify-center">
                  {student.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="absolute bottom-1 right-2 p-1.5 bg-blue-600 text-white rounded-full ring-4 ring-white shadow-md">
                <Sparkles size={14} />
              </span>
            </div>

            {/* Student Details & 6 Grid Items */}
            <div className="flex-1 w-full text-center md:text-left space-y-4">
              {/* Name & Verified Badge */}
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {student.name}
                </h2>
                {student.verified && (
                  <span className="inline-flex items-center justify-center text-blue-600" title="Verified Student">
                    <svg className="w-6 h-6 fill-blue-600 text-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                )}
              </div>

              {/* 6 Quick Info Pills / Cards in a 3-column x 2-row grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                {/* 1. Email ID */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email ID</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate" title={student.email}>
                      {student.email}
                    </p>
                  </div>
                </div>

                {/* 2. Phone Number */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Phone size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                      {student.phone}
                    </p>
                  </div>
                </div>

                {/* 3. Department */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Building size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Department</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate" title={student.department}>
                      {student.department}
                    </p>
                  </div>
                </div>

                {/* 4. Course */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <GraduationCap size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Course</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                      {student.course}
                    </p>
                  </div>
                </div>

                {/* 5. Current Semester */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CalendarDays size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Semester</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                      {student.semester}
                    </p>
                  </div>
                </div>

                {/* 6. Current Year */}
                <div className="flex items-center gap-3 bg-white/85 backdrop-blur-sm border border-blue-100/80 rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white hover:border-blue-300 transition-all">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Award size={17} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Year</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                      {student.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 flex items-center justify-between sm:justify-start gap-1 sm:gap-4 overflow-x-auto">
          {/* Academic Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("academic")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === "academic"
                ? "text-blue-600 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <GraduationCap size={18} className={activeTab === "academic" ? "text-blue-600" : "text-slate-400"} />
            <span>Academic</span>
            {activeTab === "academic" && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Parents Tab (Active by default matching screenshot) */}
          <button
            type="button"
            onClick={() => setActiveTab("parents")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === "parents"
                ? "text-blue-600 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Users size={18} className={activeTab === "parents" ? "text-blue-600" : "text-slate-400"} />
            <span>Parents</span>
            {activeTab === "parents" && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Result Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("result")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === "result"
                ? "text-blue-600 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Clock size={18} className={activeTab === "result" ? "text-blue-600" : "text-slate-400"} />
            <span>Result</span>
            {activeTab === "result" && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          {/* Attendance Tab */}
          <button
            type="button"
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all relative ${
              activeTab === "attendance"
                ? "text-blue-600 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Calendar size={18} className={activeTab === "attendance" ? "text-blue-600" : "text-slate-400"} />
            <span>Attendance</span>
            {activeTab === "attendance" && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: PARENTS & PERSONAL DETAILS (Matches reference screenshot 100%) */}
        {activeTab === "parents" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 1. Additional Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3.5">
                <FileText size={20} className="stroke-[2.2]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Additional Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                {/* Personal Email */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Personal Email</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.additionalDetails.personalEmail}>
                      {student.additionalDetails.personalEmail}
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Phone size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {student.additionalDetails.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* College Email */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">College Email</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.additionalDetails.collegeEmail}>
                      {student.additionalDetails.collegeEmail}
                    </p>
                  </div>
                </div>

                {/* Blood Group */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Droplet size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Blood Group</p>
                    <p className="text-sm font-bold text-slate-800">
                      {student.additionalDetails.bloodGroup}
                    </p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CalendarDays size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Date of Birth</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {student.additionalDetails.dateOfBirth}
                    </p>
                  </div>
                </div>

                {/* Aadhar Card Number */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CreditCard size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Aadhar Card Number</p>
                    <p className="text-sm font-semibold text-slate-800 tracking-wider">
                      {student.additionalDetails.aadharCardNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Address Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3.5">
                <MapPin size={20} className="stroke-[2.2]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Address Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                {/* Country */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Globe size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Country</p>
                    <p className="text-sm font-semibold text-slate-800">{student.addressDetails.country}</p>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <BookOpen size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">State</p>
                    <p className="text-sm font-semibold text-slate-800">{student.addressDetails.state}</p>
                  </div>
                </div>

                {/* District */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Building size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">District</p>
                    <p className="text-sm font-semibold text-slate-800">{student.addressDetails.district}</p>
                  </div>
                </div>

                {/* Pin Code */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <MapPin size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Pin Code</p>
                    <p className="text-sm font-semibold text-slate-800">{student.addressDetails.pinCode}</p>
                  </div>
                </div>

                {/* Postal Address */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Postal Address</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.addressDetails.postalAddress}>
                      {student.addressDetails.postalAddress}
                    </p>
                  </div>
                </div>

                {/* Police Station */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Police Station</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.addressDetails.policeStation}>
                      {student.addressDetails.policeStation}
                    </p>
                  </div>
                </div>

                {/* Full Address (Spanning 3 columns full width) */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Home size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Address</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {student.addressDetails.fullAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Father's Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3.5">
                <User size={20} className="stroke-[2.2]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Father&apos;s Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {/* Full Name */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <User size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.fatherDetails.fullName}</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email Address</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.fatherDetails.emailAddress}>
                      {student.fatherDetails.emailAddress}
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Phone size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.fatherDetails.phoneNumber}</p>
                  </div>
                </div>

                {/* Occupation */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Briefcase size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Occupation</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.fatherDetails.occupation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Mother's Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3.5">
                <User size={20} className="stroke-[2.2]" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Mother&apos;s Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                {/* Full Name */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <User size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.motherDetails.fullName}</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email Address</p>
                    <p className="text-sm font-semibold text-slate-800 truncate" title={student.motherDetails.emailAddress}>
                      {student.motherDetails.emailAddress}
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Phone size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.motherDetails.phoneNumber}</p>
                  </div>
                </div>

                {/* Occupation */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Briefcase size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Occupation</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{student.motherDetails.occupation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Info Note Footer */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-blue-900 text-xs sm:text-sm shadow-sm">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                i
              </div>
              <p className="font-medium text-slate-700">
                For any correction in parent or personal details, please contact the administration.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: ACADEMIC DETAILS */}
        {activeTab === "academic" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Cumulative GPA</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-blue-600">{student.academicDetails.cgpa}</span>
                  <span className="text-xs text-slate-400">/ 10.0</span>
                </div>
                <p className="text-xs text-emerald-600 font-medium mt-1">Top 5% in CSE Department</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Credits Earned</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-800">{student.academicDetails.creditsEarned}</span>
                  <span className="text-xs text-slate-400">/ {student.academicDetails.totalCredits}</span>
                </div>
                <p className="text-xs text-blue-600 font-medium mt-1">82.5% Degree Completed</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Faculty Mentor</p>
                <div className="mt-1">
                  <p className="text-base font-bold text-slate-800">{student.mentor}</p>
                  <p className="text-xs text-slate-500">Associate Professor, CSE</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Current Standing</p>
                <div className="mt-1">
                  <p className="text-lg font-bold text-emerald-600">{student.academicDetails.classRank}</p>
                  <p className="text-xs text-slate-500">{student.semester} - Active</p>
                </div>
              </div>
            </div>

            {/* Enrolled Courses Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5 text-blue-600">
                  <BookOpen size={20} className="stroke-[2.2]" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    Enrolled Courses (VI Semester)
                  </h3>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  6 Subjects
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Code</th>
                      <th className="py-3 px-3">Subject Name</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Credits</th>
                      <th className="py-3 px-3">Faculty</th>
                      <th className="py-3 px-3">Syllabus Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.academicDetails.currentSubjects.map((sub) => (
                      <tr key={sub.code} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-blue-600 text-xs">{sub.code}</td>
                        <td className="py-3.5 px-3 font-semibold text-slate-800">{sub.name}</td>
                        <td className="py-3.5 px-3">
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {sub.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-slate-600">{sub.credits}</td>
                        <td className="py-3.5 px-3 text-xs text-slate-600">{sub.faculty}</td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${sub.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-600">{sub.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESULT DETAILS */}
        {activeTab === "result" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Academic Grade Performance</h3>
                <p className="text-xs text-slate-500">Official Semester-wise Grade Point Average (SGPA) records</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => showToast("Downloading official Grade Card PDF...")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Download size={14} /> Download Grade Card
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>

            {/* Semester Progression Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {student.resultDetails.semesters.map((s, idx) => (
                <div
                  key={s.sem}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    idx === 5
                      ? "bg-blue-50/50 border-blue-300 ring-2 ring-blue-100"
                      : "bg-white border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-500">{s.sem}</p>
                  <p className="text-2xl font-extrabold text-blue-700 my-1">
                    {s.sgpa}
                  </p>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      s.status === "Passed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{s.credits} Credits</p>
                </div>
              ))}
            </div>

            {/* Semester 5 Detailed Grade Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <Award size={20} />
                  <h4 className="text-base font-bold text-slate-800">Last Published Result (Semester 5)</h4>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  SGPA: 8.95 (First Class with Distinction)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Subject Code</th>
                      <th className="py-3 px-3">Subject Name</th>
                      <th className="py-3 px-3">Internal</th>
                      <th className="py-3 px-3">Theory</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Grade</th>
                      <th className="py-3 px-3">Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.resultDetails.sem5Grades.map((g) => (
                      <tr key={g.code} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3 font-semibold text-blue-600 text-xs">{g.code}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">{g.subject}</td>
                        <td className="py-3 px-3 text-xs text-slate-600">{g.internal}</td>
                        <td className="py-3 px-3 text-xs text-slate-600">{g.theory}</td>
                        <td className="py-3 px-3 text-xs font-bold text-slate-800">{g.total}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs">
                            {g.grade}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-700">{g.gradePoint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ATTENDANCE DETAILS */}
        {activeTab === "attendance" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Attendance Metric Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Overall Attendance</p>
                  <p className="text-2xl font-extrabold text-emerald-600">
                    {student.attendanceDetails.overallPercentage}%
                  </p>
                  <p className="text-[11px] text-slate-500">Above minimum (75%)</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Present Classes</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">
                  {student.attendanceDetails.presentDays} / {student.attendanceDetails.totalWorkingDays}
                </p>
                <p className="text-[11px] text-blue-600 font-medium">Recorded lectures</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Leaves Approved</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">
                  {student.attendanceDetails.leavesApproved} Days
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">Medical & Event excused</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase">Absence Status</p>
                <p className="text-2xl font-extrabold text-amber-600 mt-1">
                  {student.attendanceDetails.unexcusedAbsent} Days
                </p>
                <p className="text-[11px] text-slate-400">Regular standing</p>
              </div>
            </div>

            {/* Subject-wise Attendance Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5 text-blue-600">
                  <CalendarDays size={20} />
                  <h4 className="text-base font-bold text-slate-800">Subject-wise Attendance (VI Semester)</h4>
                </div>
                <span className="text-xs text-slate-400">Updated today</span>
              </div>

              <div className="space-y-4">
                {student.attendanceDetails.subjectAttendance.map((item) => (
                  <div key={item.subject} className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-sm">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {item.attended}/{item.total} classes
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            item.percentage >= 90
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.percentage >= 90 ? "bg-emerald-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      {/* INTERACTIVE EDIT PROFILE MODAL */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <Edit3 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Student Profile</h3>
                  <p className="text-xs text-slate-400">Update personal, contact and parent details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Edit Section Tabs */}
            <div className="flex border-b border-slate-100 px-6 gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveEditSection("personal")}
                className={`py-3 border-b-2 transition-colors ${
                  activeEditSection === "personal"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Personal & Contact
              </button>
              <button
                type="button"
                onClick={() => setActiveEditSection("address")}
                className={`py-3 border-b-2 transition-colors ${
                  activeEditSection === "address"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Address
              </button>
              <button
                type="button"
                onClick={() => setActiveEditSection("parents")}
                className={`py-3 border-b-2 transition-colors ${
                  activeEditSection === "parents"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Parents Information
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {activeEditSection === "personal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Student Full Name</label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Personal Email</label>
                      <input
                        type="email"
                        value={editFormData.additionalDetails.personalEmail}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          additionalDetails: { ...editFormData.additionalDetails, personalEmail: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                          additionalDetails: { ...editFormData.additionalDetails, phoneNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Blood Group</label>
                      <select
                        value={editFormData.additionalDetails.bloodGroup}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          additionalDetails: { ...editFormData.additionalDetails, bloodGroup: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Date of Birth</label>
                      <input
                        type="text"
                        value={editFormData.additionalDetails.dateOfBirth}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          additionalDetails: { ...editFormData.additionalDetails, dateOfBirth: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Aadhar Card Number</label>
                      <input
                        type="text"
                        value={editFormData.additionalDetails.aadharCardNumber}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          additionalDetails: { ...editFormData.additionalDetails, aadharCardNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeEditSection === "address" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.country}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, country: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.state}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, state: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">District</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.district}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, district: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Pin Code</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.pinCode}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, pinCode: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Postal Address</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.postalAddress}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, postalAddress: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Police Station</label>
                      <input
                        type="text"
                        value={editFormData.addressDetails.policeStation}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          addressDetails: { ...editFormData.addressDetails, policeStation: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Address</label>
                    <textarea
                      rows={2}
                      value={editFormData.addressDetails.fullAddress}
                      onChange={(e) => setEditFormData({
                        ...editFormData,
                        addressDetails: { ...editFormData.addressDetails, fullAddress: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              {activeEditSection === "parents" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">Father&apos;s Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Father&apos;s Name</label>
                      <input
                        type="text"
                        value={editFormData.fatherDetails.fullName}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          fatherDetails: { ...editFormData.fatherDetails, fullName: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Father&apos;s Occupation</label>
                      <input
                        type="text"
                        value={editFormData.fatherDetails.occupation}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          fatherDetails: { ...editFormData.fatherDetails, occupation: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Father&apos;s Email</label>
                      <input
                        type="email"
                        value={editFormData.fatherDetails.emailAddress}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          fatherDetails: { ...editFormData.fatherDetails, emailAddress: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Father&apos;s Phone</label>
                      <input
                        type="text"
                        value={editFormData.fatherDetails.phoneNumber}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          fatherDetails: { ...editFormData.fatherDetails, phoneNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 pt-3">Mother&apos;s Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mother&apos;s Name</label>
                      <input
                        type="text"
                        value={editFormData.motherDetails.fullName}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          motherDetails: { ...editFormData.motherDetails, fullName: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mother&apos;s Occupation</label>
                      <input
                        type="text"
                        value={editFormData.motherDetails.occupation}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          motherDetails: { ...editFormData.motherDetails, occupation: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mother&apos;s Email</label>
                      <input
                        type="email"
                        value={editFormData.motherDetails.emailAddress}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          motherDetails: { ...editFormData.motherDetails, emailAddress: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mother&apos;s Phone</label>
                      <input
                        type="text"
                        value={editFormData.motherDetails.phoneNumber}
                        onChange={(e) => setEditFormData({
                          ...editFormData,
                          motherDetails: { ...editFormData.motherDetails, phoneNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
