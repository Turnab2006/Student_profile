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
  Circle,
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
    <label className="block text-xs font-bold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function InputWithIcon({ icon: Icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative">
      {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 transition-all ${
          Icon ? "pl-10 pr-3.5" : "px-3.5"
        }`}
      />
    </div>
  );
}

function SelectWithIcon({ icon: Icon, placeholder, options = [], value, onChange }) {
  return (
    <div className="relative">
      {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <select
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 transition-all appearance-none pr-8 ${
          Icon ? "pl-10" : "px-3.5"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
    </div>
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
    return matchesSearch && matchesProg;
  });

  const selectedMentees = defaultStudents.filter((st) => selectedStudentIds.includes(st.id));

  const toggleStudentSelect = (id) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedStudentIds((prev) => [...prev, id]);
    }
  };

  const fullMentorName = `${form.firstName || "Prof. Kawshik"} ${form.middleName ? form.middleName + " " : ""}${form.lastName || "Chattarji"}`;

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f8fafc]">
      {/* Header */}
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
            <h1 className="text-xl font-bold leading-tight text-gray-800 tracking-tight">Add Mentor</h1>
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("mentors")}>Mentors</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Mentor</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
      </header>

      {/* Stepper Header Bar for Steps 2 and 3 */}
      {step > 1 && (
        <div className="bg-white border-b border-gray-100 px-6 py-4 shrink-0 shadow-2xs">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            {/* Step 1 Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0da651] text-white flex items-center justify-center font-bold text-sm">
                <Check size={16} strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Mentor Details</p>
                <p className="text-[11px] text-[#0da651] font-semibold">Completed</p>
              </div>
            </div>

            <div className="h-0.5 flex-1 mx-6 bg-emerald-200" />

            {/* Step 2 Indicator */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === 2 ? "bg-[#0da651] text-white" : step > 2 ? "bg-[#0da651] text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {step > 2 ? <Check size={16} strokeWidth={3} /> : "2"}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Assign Mentees</p>
                <p className={`text-[11px] font-semibold ${step === 2 ? "text-[#0da651]" : step > 2 ? "text-[#0da651]" : "text-gray-400"}`}>
                  {step === 2 ? "In Progress" : step > 2 ? "Completed" : "Pending"}
                </p>
              </div>
            </div>

            <div className={`h-0.5 flex-1 mx-6 ${step === 3 ? "bg-emerald-200" : "bg-gray-200"}`} />

            {/* Step 3 Indicator */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === 3 ? "bg-[#0da651] text-white" : "bg-gray-100 text-gray-400"
              }`}>
                3
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Review &amp; Submit</p>
                <p className={`text-[11px] font-semibold ${step === 3 ? "text-[#0da651]" : "text-gray-400"}`}>
                  {step === 3 ? "In Progress" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-6">
        <div className="max-w-[1500px] mx-auto">
          {/* STEP 1: MENTOR DETAILS & CSV UPLOAD */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Mode Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAddMode("manual")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    addMode === "manual"
                      ? "border-emerald-300 bg-[#eaf8f1] shadow-2xs"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    addMode === "manual" ? "bg-emerald-100 text-[#0da651]" : "bg-gray-100 text-gray-500"
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Add Mentor Manually</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Fill in the mentor details</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAddMode("csv")}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    addMode === "csv"
                      ? "border-emerald-300 bg-[#eaf8f1] shadow-2xs"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    addMode === "csv" ? "bg-emerald-100 text-[#0da651]" : "bg-gray-100 text-gray-500"
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Bulk Add Mentors</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Upload CSV file to add multiple mentors</p>
                  </div>
                </button>
              </div>

              {/* Main Content Grid with OR divider */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,0.85fr)] gap-8 items-start">
                  
                  {/* Left Form: Mentor Details */}
                  <div className="space-y-4">
                    <h2 className="text-base font-bold text-[#0da651] mb-5">Mentor Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label required>First Name</Label>
                        <InputWithIcon icon={User} placeholder="Enter first name" value={form.firstName} onChange={update("firstName")} />
                      </div>
                      <div>
                        <Label>Middle Name</Label>
                        <InputWithIcon icon={User} placeholder="Enter middle name" value={form.middleName} onChange={update("middleName")} />
                      </div>
                      <div>
                        <Label required>Last Name</Label>
                        <InputWithIcon icon={User} placeholder="Enter last name" value={form.lastName} onChange={update("lastName")} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label required>College Email</Label>
                        <InputWithIcon icon={Mail} type="email" placeholder="Enter college email address" value={form.email} onChange={update("email")} />
                      </div>
                      <div>
                        <Label required>Contact Number</Label>
                        <InputWithIcon icon={Phone} type="tel" placeholder="Enter contact number" value={form.phone} onChange={update("phone")} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label required>Gender</Label>
                        <SelectWithIcon
                          placeholder="Select gender"
                          options={["Male", "Female", "Other"]}
                          value={form.gender}
                          onChange={update("gender")}
                        />
                      </div>
                      <div>
                        <Label required>Employee ID</Label>
                        <InputWithIcon icon={IdCard} placeholder="Enter employee ID" value={form.empId} onChange={update("empId")} />
                      </div>
                      <div>
                        <Label required>Department</Label>
                        <SelectWithIcon
                          placeholder="Select department"
                          options={["Computer Science & Engineering", "Electrical Engineering", "Electronics & Comm. Engg", "Mechanical Engineering", "Civil Engineering"]}
                          value={form.department}
                          onChange={update("department")}
                        />
                      </div>
                    </div>

                    <div>
                      <Label required>Designation / Role</Label>
                      <InputWithIcon icon={Briefcase} placeholder="Enter designation or role (e.g. Assistant Professor)" value={form.designation} onChange={update("designation")} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label required>Qualification</Label>
                        <InputWithIcon icon={GraduationCap} placeholder="Enter highest qualification" value={form.qualification} onChange={update("qualification")} />
                      </div>
                      <div>
                        <Label required>Experience (Years)</Label>
                        <InputWithIcon icon={Clock} placeholder="Enter years of experience" value={form.experience} onChange={update("experience")} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label required>Date of Joining</Label>
                        <InputWithIcon icon={CalendarDays} type="date" value={form.joiningDate} onChange={update("joiningDate")} />
                      </div>
                      <div>
                        <Label required>Status</Label>
                        <SelectWithIcon
                          placeholder="Select status"
                          options={["Active", "Inactive", "On Leave"]}
                          value={form.status}
                          onChange={update("status")}
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] font-bold text-gray-500">i</span>
                      Fields marked with <span className="text-red-500 font-bold">*</span> are required
                    </div>
                  </div>

                  {/* Divider Line with OR Badge */}
                  <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-[480px]">
                    <div className="w-[1px] flex-1 border-l-2 border-dashed border-gray-200" />
                    <span className="my-4 w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-400 font-bold text-xs flex items-center justify-center shadow-2xs">
                      OR
                    </span>
                    <div className="w-[1px] flex-1 border-l-2 border-dashed border-gray-200" />
                  </div>

                  {/* Right Column: Import Mentors via CSV */}
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-[#0da651]">Import Mentors via CSV</h3>
                      <p className="text-xs text-gray-400 mt-1">Upload a CSV file to add multiple mentors at once.</p>
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
                      className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all ${
                        dragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-gray-50/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center mb-4">
                        <Upload size={22} className="text-[#0da651]" />
                      </div>
                      <p className="text-sm font-bold text-gray-700">Drag &amp; drop your CSV file here</p>
                      <p className="text-xs text-gray-400 mt-1 mb-4">or</p>
                      <label className="inline-flex items-center gap-2 rounded-xl bg-[#0da651] px-5 py-2.5 text-sm font-bold text-white shadow-2xs hover:bg-green-600 transition-colors cursor-pointer">
                        <FileText size={16} />
                        Choose File
                        <input type="file" accept=".csv" className="hidden" />
                      </label>
                      <p className="text-[11px] text-gray-400 mt-4">Supports CSV files only. Max file size: 10MB</p>
                    </div>

                    {/* How it works */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0da651]">
                        <FileText size={15} />
                        <span>How it works?</span>
                      </div>
                      <div className="space-y-3.5">
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-white border border-emerald-300 text-[#0da651] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-700">Download the CSV template</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Use our template to ensure the correct format.</p>
                            <button
                              type="button"
                              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#0da651] hover:bg-emerald-50 transition-colors cursor-pointer"
                            >
                              <Download size={13} />
                              Download Template
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-white border border-emerald-300 text-[#0da651] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-700">Fill in your mentor data</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Add mentor details in the template file.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-white border border-emerald-300 text-[#0da651] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-700">Upload and import</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Upload the file and we'll import the data for you.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate?.("mentors")}
                  className="rounded-xl border border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0da651] px-6 py-2.5 text-sm font-bold text-white shadow-2xs hover:bg-green-600 transition-all cursor-pointer active:scale-98"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ASSIGN MENTEES */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Assign Mentees</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Search and select students to assign under this mentor.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)] gap-6 items-start">
                  {/* Left Column: Available Students */}
                  <div className="border border-gray-100 rounded-2xl p-4 bg-white space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by roll number or email address..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-gray-800 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                        />
                      </div>
                      <select
                        value={programFilter}
                        onChange={(e) => setProgramFilter(e.target.value)}
                        className="border border-emerald-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0da651] bg-emerald-50/50 focus:outline-none"
                      >
                        <option value="All Programs">All Programs</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-800">Available Students</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0da651] text-[11px] font-bold">
                        {availableStudents.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {availableStudents.map((st) => {
                        const isSelected = selectedStudentIds.includes(st.id);
                        return (
                          <div
                            key={st.id}
                            onClick={() => toggleStudentSelect(st.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected ? "border-emerald-300 bg-emerald-50/40" : "border-gray-100 hover:bg-gray-50"
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
                                <p className="text-[10px] text-gray-400">Roll Number</p>
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
                      })}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 pt-2 border-t border-gray-100">
                      {selectedStudentIds.length} mentees selected
                    </p>
                  </div>

                  {/* Transfer Arrows */}
                  <div className="hidden lg:flex flex-col gap-2 justify-center my-auto pt-16">
                    <button
                      type="button"
                      className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0da651] flex items-center justify-center hover:bg-emerald-100 transition-colors"
                    >
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  </div>

                  {/* Right Column: Selected Mentees */}
                  <div className="space-y-4">
                    <div className="border border-gray-100 rounded-2xl p-4 bg-white space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-gray-800">Selected Mentees</h3>
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0da651] text-xs font-bold flex items-center justify-center">
                            {selectedMentees.length}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedStudentIds([])}
                          className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                        {selectedMentees.length === 0 ? (
                          <div className="p-8 text-center text-xs text-gray-400 border border-dashed rounded-xl">
                            No mentees selected yet. Click + Add on available students.
                          </div>
                        ) : (
                          selectedMentees.map((st) => (
                            <div key={st.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50">
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
                                  <p className="text-[10px] text-gray-400">Roll Number</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleStudentSelect(st.id)}
                                  className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Bottom Info Box */}
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#0da651] flex items-center justify-center shrink-0 mt-0.5">
                        <Users size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">Assign Multiple Mentees</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          You can assign multiple students to this mentor. Use search to find students quickly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("mentors")}
                    className="rounded-xl border border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0da651] px-6 py-2.5 text-sm font-bold text-white shadow-2xs hover:bg-green-600 transition-all cursor-pointer active:scale-98"
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,0.9fr)] gap-6 items-start">
                {/* Left Review Cards */}
                <div className="space-y-6">
                  {/* Review Mentor Details Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-gray-800">Review Mentor Details</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Please review all the information before submitting.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/50 px-4 py-1.5 text-xs font-bold text-[#0da651] hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <User size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Full Name</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{fullMentorName}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <IdCard size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Employee ID</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.empId || "EMP2024001"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Building2 size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Department</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.department || "Computer Science & Engineering"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Mail size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">College Email</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.email || "kawshik.c@abc.edu.in"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Phone size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Contact Number</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.phone || "+91 98765 43210"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <User size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Gender</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.gender || "Male"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Briefcase size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Designation / Role</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.designation || "Assistant Professor"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <GraduationCap size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Qualification</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.qualification || "M.Tech in Computer Science"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Clock size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Experience</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.experience || "6"} Years</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <CalendarDays size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Date of Joining</p>
                          <p className="text-xs font-bold text-gray-800 truncate">{form.joiningDate || "15 Apr 2022"}</p>
                        </div>
                      </div>

                      <div className="min-w-0 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#0da651] mt-0.5">
                            {form.status || "Active"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Mentees Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-gray-800">
                          Assigned Mentees ({selectedMentees.length})
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Review the mentees assigned to this mentor.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/50 px-4 py-1.5 text-xs font-bold text-[#0da651] hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50/80 text-gray-400 uppercase text-[10px] font-bold border-b border-gray-100">
                          <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Mentee Name</th>
                            <th className="py-3 px-4">College Roll No.</th>
                            <th className="py-3 px-4">Email Address</th>
                            <th className="py-3 px-4">Program</th>
                            <th className="py-3 px-4">Year</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                          {selectedMentees.map((st, idx) => (
                            <tr key={st.id} className="hover:bg-gray-50/60 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-gray-400">{idx + 1}</td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-7 h-7 rounded-full ${st.bg} text-[11px] font-bold flex items-center justify-center`}>
                                    {st.initials}
                                  </div>
                                  <span className="font-bold text-gray-800">{st.name}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-gray-600">{st.rollNo}</td>
                              <td className="py-3.5 px-4 text-gray-500">{st.email}</td>
                              <td className="py-3.5 px-4">{st.program}</td>
                              <td className="py-3.5 px-4">{st.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Review Sidebar */}
                <div className="space-y-5">
                  {/* Summary Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h3 className="text-sm font-bold text-[#0da651]">Summary</h3>
                    
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Mentor</p>
                          <p className="font-bold text-gray-800">{fullMentorName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Building2 size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Department</p>
                          <p className="font-bold text-gray-800">{form.department || "Computer Science & Engineering"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <IdCard size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Employee ID</p>
                          <p className="font-bold text-gray-800">{form.empId || "EMP2024001"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <Users size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Total Mentees</p>
                          <p className="font-bold text-gray-800">{selectedMentees.length}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-[#0da651] mt-0.5">
                            {form.status || "Active"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h3 className="text-sm font-bold text-[#0da651]">Checklist</h3>
                    <div className="space-y-3">
                      {[
                        "Mentor details added",
                        "Required information provided",
                        "Mentees assigned",
                        "All information looks correct",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <CheckCircle2 size={16} className="text-[#0da651] shrink-0" />
                          <span className="text-xs font-semibold text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Please Note Card */}
                  <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-bold text-sm">i</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-blue-700">Please Note</h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        Once you submit, the mentor will be created and assigned to the selected mentees. You can edit the details later if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("mentors")}
                    className="w-full sm:w-auto rounded-xl border border-gray-200 bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("mentors")}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0da651] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-600 transition-all cursor-pointer active:scale-98 whitespace-nowrap"
                    >
                      <span>Submit &amp; Assign Mentor</span>
                      <ArrowRight size={16} />
                    </button>
                    <p className="text-[11px] text-gray-400 mt-1.5 flex items-center justify-center gap-1.5 font-medium">
                      <ShieldCheck size={13} className="text-[#0da651]" />
                      <span>Your data is safe and secure</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
