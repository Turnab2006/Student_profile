import { useState } from "react";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  CalendarDays,
  IdCard,
  Building2,
  Briefcase,
  GraduationCap,
  Clock,
  Check,
  Upload,
  FileText,
  Download,
  Users,
  X,
  Plus,
  ShieldCheck,
  CircleUserRound,
  ChevronDown,
  Info,
  Menu,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const defaultStudents = [
  { id: "1", initials: "TS", name: "Tamoha Sengupta", email: "tamoha.sengupta@abc.edu.in", rollNo: "lee2024001", program: "B.Tech CSE", year: "3rd Year", bg: "bg-emerald-100 text-emerald-700" },
  { id: "2", initials: "TR", name: "Tarun Roy", email: "tarun.roy@abc.edu.in", rollNo: "lee2024002", program: "B.Tech ECE", year: "3rd Year", bg: "bg-blue-100 text-blue-700" },
  { id: "3", initials: "MC", name: "Madhurima Chatterjee", email: "madhurima.c@abc.edu.in", rollNo: "lee2024003", program: "B.Tech CSE", year: "3rd Year", bg: "bg-purple-100 text-purple-700" },
  { id: "4", initials: "ND", name: "Nilankur Das", email: "nilankur.das@abc.edu.in", rollNo: "lee2024004", program: "B.Tech CSE", year: "3rd Year", bg: "bg-amber-100 text-amber-700" },
  { id: "5", initials: "AR", name: "Abhinandan Roy", email: "abhinandan.roy@abc.edu.in", rollNo: "lee2024005", program: "B.Tech EE", year: "3rd Year", bg: "bg-emerald-100 text-emerald-700" },
  { id: "6", initials: "SG", name: "Subhamita Ganguly", email: "subhamita.g@abc.edu.in", rollNo: "lee2024006", program: "B.Tech ME", year: "2nd Year", bg: "bg-rose-100 text-rose-700" },
  { id: "7", initials: "AB", name: "Alok Bhattacharya", email: "alok.bhattacharya@abc.edu.in", rollNo: "lee2024007", program: "B.Tech CE", year: "4th Year", bg: "bg-sky-100 text-sky-700" },
];

function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-600 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextField({ icon: Icon, type = "text", placeholder, value, onChange, disabled = false }) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all ${
          Icon ? "pl-9 pr-3" : "px-3"
        } ${disabled ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : ""}`}
      />
    </div>
  );
}

function SelectField({ icon: Icon, placeholder, options = [], value, onChange, disabled = false }) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors"
        />
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg py-2 text-sm text-gray-700 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none pr-8 cursor-pointer ${
          Icon ? "pl-9" : "px-3"
        } ${disabled ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-75" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors" />
    </div>
  );
}

function NumberBadge({ value }) {
  return (
    <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
      {value}
    </span>
  );
}

export default function AddMentor({ onNavigate, onOpenSidebar }) {
  const [step, setStep] = useState(1);
  const [addMode, setAddMode] = useState("manual"); // "manual" | "csv"
  const [dragOver, setDragOver] = useState(false);

  // Form State
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    empId: "",
    aadharNumber: "",
    department: "",
    designation: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    status: "Active",
  });

  // Selection for Step 2
  const [selectedStudentIds, setSelectedStudentIds] = useState(["3", "4"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [programFilter, setProgramFilter] = useState("All Programs");

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // Helper arrays for Step 2 student selection
  const availableStudents = defaultStudents.filter((st) => {
    const matchesSearch =
      !searchQuery ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProg = programFilter === "All Programs" || st.program.includes(programFilter);
    const matchesYear = yearFilter === "All Years" || st.year === yearFilter;
    return matchesSearch && matchesProg && matchesYear;
  });

  const selectedMentees = defaultStudents.filter((st) => selectedStudentIds.includes(st.id));

  const toggleStudentSelect = (id) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedStudentIds((prev) => [...prev, id]);
    }
  };

  const fullMentorName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ") || "Prof. Kawshik Chattarji";

  const reviewPersonalInfo = [
    { label: "Full Name", value: fullMentorName, icon: CircleUserRound },
    { label: "College Email", value: form.email || "kawshik.c@abc.edu.in", icon: Mail },
    { label: "Contact Number", value: form.phone || "+91 98765 43210", icon: Phone },
    { label: "Gender", value: form.gender || "Male", icon: User },
    { label: "Employee ID", value: form.empId || "EMP2024001", icon: IdCard },
    { label: "Aadhar Card No.", value: form.aadharNumber || "1234 5678 9012", icon: IdCard },
  ];

  const reviewProfessionalDetails = [
    { label: "Department", value: form.department || "Computer Science & Engineering", icon: Building2 },
    { label: "Designation / Role", value: form.designation || "Assistant Professor", icon: Briefcase },
    { label: "Qualification", value: form.qualification || "M.Tech in Computer Science", icon: GraduationCap },
    { label: "Experience", value: form.experience ? `${form.experience} Years` : "6 Years", icon: Clock },
    { label: "Date of Joining", value: form.joiningDate || "15 Apr 2022", icon: CalendarDays },
    { label: "Status", value: form.status || "Active", icon: CheckCircle2 },
  ];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50">
      {/* Topbar */}
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
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Add Mentor</h1>
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("mentors")}>Mentors</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Mentor</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-[1500px] mx-auto space-y-5">
          {/* STEP 1: MENTOR DETAILS & REGISTRATION MODE */}
          {step === 1 && (
            <>
              {/* Header Banner */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
                <div className="relative z-10 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                    <CircleUserRound size={18} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Mentor Information
                    </h2>
                    <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                      Enter mentor&apos;s personal, contact, and professional details
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
              </section>

              {/* Registration Mode Selector Card */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Users size={16} className="text-[#0da651]" />
                      How many mentors do you want to register?
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Choose single mentor to fill details manually, or multiple mentors to import via CSV
                    </p>
                  </div>

                  {/* Toggle Buttons */}
                  <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shrink-0">
                    <button
                      type="button"
                      onClick={() => setAddMode("manual")}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        addMode === "manual"
                          ? "bg-primary text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <User size={15} />
                      Single Mentor
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddMode("csv")}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        addMode === "csv"
                          ? "bg-primary text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Users size={15} />
                      Multiple Mentors
                    </button>
                  </div>
                </div>
              </section>

              {/* Conditional Rendering based on Registration Mode */}
              {addMode === "manual" ? (
                <div className="space-y-5">
                  <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                    <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                      <NumberBadge value={1} />
                      <div>
                        <h2 className="text-base font-bold text-gray-800">Add Mentor Details</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Fill in the mentor&apos;s personal and professional information below</p>
                      </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100/80">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <User size={15} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Personal Information</h3>
                          <p className="text-[11px] text-gray-400">Basic personal details and identification info</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label required>First Name</Label>
                          <TextField icon={User} placeholder="Enter first name" value={form.firstName} onChange={update("firstName")} />
                        </div>
                        <div>
                          <Label>Middle Name</Label>
                          <TextField icon={User} placeholder="Enter middle name" value={form.middleName} onChange={update("middleName")} />
                        </div>
                        <div>
                          <Label required>Last Name</Label>
                          <TextField icon={User} placeholder="Enter last name" value={form.lastName} onChange={update("lastName")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label required>College Email</Label>
                          <TextField icon={Mail} placeholder="name@college.edu.in" type="email" value={form.email} onChange={update("email")} />
                        </div>
                        <div>
                          <Label required>Contact Number</Label>
                          <TextField icon={Phone} placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} />
                        </div>
                        <div>
                          <Label required>Gender</Label>
                          <SelectField icon={User} placeholder="Select gender" options={["Male", "Female", "Other"]} value={form.gender} onChange={update("gender")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>Employee ID</Label>
                          <TextField icon={IdCard} placeholder="e.g. EMP2024001" value={form.empId} onChange={update("empId")} />
                        </div>
                        <div>
                          <Label>Aadhar Card Number</Label>
                          <TextField icon={IdCard} placeholder="Enter 12-digit Aadhar number" value={form.aadharNumber} onChange={update("aadharNumber")} />
                        </div>
                      </div>
                    </div>

                    {/* Separator between sections */}
                    <div className="my-8 border-t border-slate-100" />

                    {/* Professional Details Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100/80">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Briefcase size={15} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-800">Professional &amp; Department Details</h3>
                          <p className="text-[11px] text-gray-400">Department, designation, qualification, and service record</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>Department</Label>
                          <SelectField
                            icon={Building2}
                            placeholder="Select department"
                            options={["Computer Science & Engineering", "Electrical Engineering", "Electronics & Comm. Engg", "Mechanical Engineering", "Civil Engineering"]}
                            value={form.department}
                            onChange={update("department")}
                          />
                        </div>
                        <div>
                          <Label required>Designation / Role</Label>
                          <TextField icon={Briefcase} placeholder="e.g. Assistant Professor" value={form.designation} onChange={update("designation")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>Qualification</Label>
                          <TextField icon={GraduationCap} placeholder="e.g. M.Tech in Computer Science" value={form.qualification} onChange={update("qualification")} />
                        </div>
                        <div>
                          <Label required>Experience (Years)</Label>
                          <TextField icon={Clock} placeholder="e.g. 6" value={form.experience} onChange={update("experience")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label required>Date of Joining</Label>
                          <div className="relative group">
                            <CalendarDays
                              size={14}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors"
                            />
                            <input
                              type="date"
                              value={form.joiningDate}
                              onChange={update("joiningDate")}
                              className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
                            />
                          </div>
                        </div>
                        <div>
                          <Label required>Status</Label>
                          <SelectField
                            icon={CheckCircle2}
                            placeholder="Select status"
                            options={["Active", "Inactive", "On Leave"]}
                            value={form.status}
                            onChange={update("status")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-gray-100 text-xs text-gray-400">
                      Fields marked with <span className="text-red-500 font-semibold">*</span> are required
                    </div>
                  </section>

                  {/* Bottom Action Buttons */}
                  <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("mentors")}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer shadow-sm w-full sm:w-auto"
                    >
                      Continue
                      <ArrowRight size={15} />
                    </button>
                  </section>
                </div>
              ) : (
                /* Multiple Mentors (Bulk CSV Import) View */
                <div className="space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] gap-5 items-stretch">
                    {/* Left Dropzone Card */}
                    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#0da651] flex items-center justify-center shrink-0">
                            <Upload size={20} className="stroke-[2.2]" />
                          </div>
                          <div>
                            <h2 className="text-base font-bold text-gray-800">Bulk Import via CSV</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Upload a CSV spreadsheet with mentor records</p>
                          </div>
                        </div>

                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                          }}
                          className={`rounded-2xl border-2 border-dashed p-8 sm:p-10 flex flex-col items-center justify-center text-center transition-all ${
                            dragOver ? "border-[#0da651] bg-emerald-50/60 scale-[1.01]" : "border-emerald-200/80 bg-[#f4fbf7]/70 hover:bg-[#ebf8f0] hover:border-emerald-300"
                          }`}
                        >
                          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#0da651] flex items-center justify-center mb-4 shadow-xs">
                            <Upload size={28} className="stroke-[2.2]" />
                          </div>
                          <p className="text-base font-bold text-gray-800">Drag &amp; drop your CSV file here</p>
                          <p className="text-xs text-gray-400 mt-1 mb-4">Supports CSV files up to 10MB</p>
                          <label className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-green-600 active:scale-[0.98] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer">
                            <FileText size={16} />
                            Browse CSV File
                            <input type="file" accept=".csv" className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/80 via-[#f4fbf7] to-emerald-50/50 p-4 flex items-start gap-3.5 shadow-2xs">
                        <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 text-[#0da651] flex items-center justify-center shrink-0 shadow-2xs">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-950">Secure &amp; Encrypted Upload</p>
                          <p className="text-[11px] text-emerald-800/80 mt-0.5 leading-relaxed">
                            Your uploaded records are securely validated and imported into the institution database.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Right Guide Card */}
                    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#0da651] flex items-center justify-center shrink-0">
                            <FileText size={20} className="stroke-[2.2]" />
                          </div>
                          <div>
                            <h2 className="text-base font-bold text-gray-800">CSV Template &amp; Guidelines</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Follow instructions to format your mentor data</p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-[#f4fbf7] to-emerald-50/30 p-5 space-y-4">
                          <p className="text-xs font-bold text-[#0da651] flex items-center gap-1.5">How it works?</p>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3.5">
                              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                1
                              </span>
                              <div>
                                <p className="text-xs font-bold text-gray-800">Download the Official Template</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">Pre-configured with all required columns and headers.</p>
                                <button
                                  type="button"
                                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-50 hover:border-emerald-300 shadow-2xs transition-all cursor-pointer"
                                >
                                  <Download size={13} />
                                  Download CSV Template
                                </button>
                              </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                2
                              </span>
                              <div>
                                <p className="text-xs font-bold text-gray-800">Fill in Mentor Information</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">Add names, emails, employee IDs, departments, and roles.</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                3
                              </span>
                              <div>
                                <p className="text-xs font-bold text-gray-800">Upload and Process</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">Our system will validate headers and import all mentors at once.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Bottom Action Bar for Bulk Upload */}
                  <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("mentors")}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate?.("mentors")}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-emerald-600/20 w-full sm:w-auto"
                    >
                      Add Mentors
                      <ArrowRight size={15} />
                    </button>
                  </section>
                </div>
              )}
            </>
          )}

          {/* STEP 2: ASSIGN MENTEES */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Header Banner */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
                <div className="relative z-10 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Assign Mentees
                    </h2>
                    <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                      Select students to assign under {fullMentorName}
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
              </section>

              {/* Main Assign Mentees Card */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <NumberBadge value={2} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-gray-800">Select Students</h2>
                        
                        {/* Info Tooltip Pop-up */}
                        <div className="relative group/info inline-flex items-center">
                          <button
                            type="button"
                            className="w-5 h-5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#0da651] border border-emerald-200/80 flex items-center justify-center cursor-pointer transition-colors"
                            aria-label="Assign Multiple Mentees Information"
                          >
                            <Info size={12} className="stroke-[2.5]" />
                          </button>

                          {/* Pop-up Box on Hover */}
                          <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2.5 hidden group-hover/info:flex flex-col w-72 p-3.5 bg-white rounded-2xl shadow-xl border border-emerald-200/90 text-left z-30 pointer-events-none">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0 border border-emerald-200/60">
                                <Users size={13} />
                              </div>
                              <p className="text-xs font-bold text-emerald-950">Assign Multiple Mentees</p>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-relaxed">
                              You can assign multiple students to this mentor. Use the search box and filters (Year, Program) to find students quickly.
                            </p>
                            <div className="absolute top-full left-4 sm:left-1/2 sm:-translate-x-1/2 -mt-[5px] border-solid border-t-emerald-200 border-t-[6px] border-x-transparent border-x-[6px] border-b-0" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">Search and assign mentees from the available student records</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)] gap-6 items-stretch">
                  {/* Left Column: Available Students */}
                  <div className="border border-emerald-100 rounded-2xl p-4 bg-[#f4fbf7]/40 flex flex-col h-full space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <div className="relative flex-1">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by name, roll number, email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full border border-emerald-200/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>

                      {/* Year Filter (Left side of Program filter) */}
                      <div className="relative shrink-0">
                        <select
                          value={yearFilter}
                          onChange={(e) => setYearFilter(e.target.value)}
                          className="border border-emerald-200/80 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[#0da651] bg-white focus:outline-none cursor-pointer appearance-none"
                        >
                          <option value="All Years">All Years</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                      </div>

                      {/* Program Filter */}
                      <div className="relative shrink-0">
                        <select
                          value={programFilter}
                          onChange={(e) => setProgramFilter(e.target.value)}
                          className="border border-emerald-200/80 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-[#0da651] bg-white focus:outline-none cursor-pointer appearance-none"
                        >
                          <option value="All Programs">All Programs</option>
                          <option value="B.Tech">B.Tech</option>
                          <option value="M.Tech">M.Tech</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600/70 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-800">Available Students</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0da651] text-[11px] font-bold">
                        {availableStudents.length}
                      </span>
                    </div>

                    <div className="flex-1 space-y-2 min-h-[360px] max-h-[460px] overflow-y-auto pr-1">
                      {availableStudents.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-gray-400 border border-dashed border-emerald-200 rounded-xl bg-white min-h-[320px]">
                          No students match the selected search or filters.
                        </div>
                      ) : (
                        availableStudents.map((st) => {
                          const isSelected = selectedStudentIds.includes(st.id);
                          return (
                            <div
                              key={st.id}
                              onClick={() => toggleStudentSelect(st.id)}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                isSelected ? "border-emerald-300 bg-emerald-50/70" : "border-gray-200/80 bg-white hover:bg-emerald-50/30"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {}}
                                  className="w-4 h-4 rounded text-[#0da651] focus:ring-emerald-400 accent-[#0da651]"
                                />
                                <div className={`w-8 h-8 rounded-full ${st.bg} text-xs font-bold flex items-center justify-center shrink-0`}>
                                  {st.initials}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-gray-800 truncate">{st.name}</p>
                                  <p className="text-[11px] text-gray-400 truncate">{st.email}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                  <p className="text-xs font-bold text-gray-700">{st.rollNo}</p>
                                  <p className="text-[10px] text-gray-400">{st.year} &bull; {st.program}</p>
                                </div>
                                <button
                                  type="button"
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                                    isSelected ? "bg-emerald-100 text-[#0da651]" : "border border-emerald-200 text-[#0da651] hover:bg-emerald-50"
                                  }`}
                                >
                                  {isSelected ? <Check size={13} /> : <Plus size={13} />}
                                  <span>{isSelected ? "Added" : "Add"}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 pt-2 border-t border-emerald-100/80">
                      {selectedStudentIds.length} mentees selected
                    </p>
                  </div>

                  {/* Transfer Arrows */}
                  <div className="hidden lg:flex flex-col gap-2 justify-center my-auto pt-16">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0da651] flex items-center justify-center shadow-2xs">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Right Column: Selected Mentees */}
                  <div className="border border-emerald-100 rounded-2xl p-4 bg-white flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-gray-800">Selected Mentees</h3>
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0da651] text-xs font-bold flex items-center justify-center">
                          {selectedMentees.length}
                        </span>
                      </div>
                      {selectedMentees.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedStudentIds([])}
                          className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 min-h-[360px] max-h-[460px] overflow-y-auto pr-1">
                      {selectedMentees.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-gray-400 border border-dashed border-emerald-200 rounded-xl bg-[#f4fbf7]/40 min-h-[320px]">
                          <Users size={32} className="text-emerald-300 mb-2 stroke-[1.5]" />
                          <p className="font-semibold text-gray-600">No mentees selected yet</p>
                          <p className="text-[11px] text-gray-400 mt-1">Click + Add on available students from the left list.</p>
                        </div>
                      ) : (
                        selectedMentees.map((st) => (
                          <div key={st.id} className="flex items-center justify-between p-3 rounded-xl border border-emerald-100 bg-[#f4fbf7]/50 hover:bg-[#ebf8f0]/60 transition-all">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-full ${st.bg} text-xs font-bold flex items-center justify-center shrink-0`}>
                                {st.initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-800 truncate">{st.name}</p>
                                <p className="text-[11px] text-gray-400 truncate">{st.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <p className="text-xs font-bold text-gray-700">{st.rollNo}</p>
                                <p className="text-[10px] text-gray-400">{st.year}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleStudentSelect(st.id)}
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer rounded-md hover:bg-red-50"
                                aria-label="Remove student"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 pt-2 border-t border-gray-100">
                      {selectedMentees.length} mentees assigned to this mentor
                    </p>
                  </div>
                </div>
              </section>

              {/* Bottom Action Footer */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  <ArrowLeft size={15} />
                  Previous
                </button>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("mentors")}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    Continue
                    <ArrowRight size={15} />
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Header Banner */}
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
                <div className="relative z-10 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Review &amp; Register Mentor
                    </h2>
                    <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                      Verify mentor details and assigned mentees before final registration
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
              </section>

              {/* Review Section 1: Personal Information */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Personal Information</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Review personal details and identification info</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/80 bg-emerald-50/50 px-3.5 py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-100/70 transition-colors cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                    </svg>
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {reviewPersonalInfo.map((item) => (
                    <div key={item.label} className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white border border-emerald-200/80 flex items-center justify-center shrink-0 text-[#0da651] mt-0.5">
                        <item.icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 truncate" title={item.value}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Review Section 2: Professional & Department Details */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Professional &amp; Department Details</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Review department, designation, qualification, and service record</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/80 bg-emerald-50/50 px-3.5 py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-100/70 transition-colors cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                    </svg>
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
                  {reviewProfessionalDetails.map((item) => (
                    <div key={item.label} className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white border border-emerald-200/80 flex items-center justify-center shrink-0 text-[#0da651] mt-0.5">
                        <item.icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 truncate" title={item.value}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Review Section 3: Assigned Mentees */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <Users size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        Assigned Mentees ({selectedMentees.length})
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">Students currently assigned under this mentor</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/80 bg-emerald-50/50 px-3.5 py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-100/70 transition-colors cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                    </svg>
                    Edit
                  </button>
                </div>

                {selectedMentees.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-emerald-200 rounded-xl bg-[#f4fbf7]/40">
                    No mentees assigned. You can assign students later or click Edit.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-emerald-100">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f4fbf7] text-emerald-800/80 uppercase text-[10px] font-bold border-b border-emerald-100">
                        <tr>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Mentee Name</th>
                          <th className="py-3 px-4">College Roll No.</th>
                          <th className="py-3 px-4">Email Address</th>
                          <th className="py-3 px-4">Program</th>
                          <th className="py-3 px-4">Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-50 font-semibold text-gray-700 bg-white">
                        {selectedMentees.map((st, idx) => (
                          <tr key={st.id} className="hover:bg-[#f4fbf7]/50 transition-colors">
                            <td className="py-3 px-4 font-bold text-gray-400">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-7 h-7 rounded-full ${st.bg} text-[11px] font-bold flex items-center justify-center shrink-0`}>
                                  {st.initials}
                                </div>
                                <span className="font-bold text-gray-800">{st.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-gray-600">{st.rollNo}</td>
                            <td className="py-3 px-4 text-gray-500">{st.email}</td>
                            <td className="py-3 px-4">{st.program}</td>
                            <td className="py-3 px-4">{st.year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* Bottom Action Footer */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  <ArrowLeft size={15} />
                  Previous
                </button>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("mentors")}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("mentors")}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    Register
                    <ArrowRight size={15} />
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


