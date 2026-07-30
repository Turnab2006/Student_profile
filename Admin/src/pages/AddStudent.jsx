import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Upload,
  FileText,
  Download,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  CalendarDays,
  IdCard,
  CircleUserRound,
  MapPinned,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextField({ icon: Icon, placeholder, type = "text", disabled = false, value, onChange }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-200 rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${
          Icon ? "pl-9 pr-3" : "px-3"
        } ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}`}
      />
    </div>
  );
}

function SelectField({ placeholder, options = [], value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow appearance-none pr-8"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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

export default function AddStudent({ onNavigate }) {
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    rollNumber: "",
    program: "",
    department: "",
    admissionYear: "",
    sessionName: "",
    graduationYear: "",
  });

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const noOp = () => {};

  const checklistItems = [
    "Personal information added",
    "Academic information added",
    "Parent/Guardian details added",
    "Address information added",
  ];

  const parentFieldClass =
    "w-full border border-gray-200 rounded-lg py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow placeholder:text-gray-400";

  const renderParentIconInput = ({ placeholder, icon: Icon, type = "text" }) => (
    <div className="relative">
      <input type={type} placeholder={placeholder} className={`${parentFieldClass} pl-9 pr-3`} />
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  if (step === 2) {
    return (
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => onNavigate?.("students")} className="text-gray-500 hover:text-gray-700 transition-colors">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-800">Add Student</h1>
              <p className="text-xs text-gray-400 mt-0.5">Students  &gt;  Add Student  &gt;  <span className="text-primary font-medium">Parents Details</span></p>
            </div>
          </div>
          <AdminProfile />
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-[1500px] mx-auto space-y-4">
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
              <h2 className="text-[22px] font-medium text-gray-800 leading-tight">Parent / Guardian Details</h2>
              <p className="text-sm text-gray-500 mt-1">Enter Father&apos;s &amp; Mother&apos;s Details</p>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start">
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                    <CircleUserRound size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">Father&apos;s Details</h3>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <Label required>First Name</Label>
                    <input className={parentFieldClass} placeholder="Enter First Name" />
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <input className={parentFieldClass} placeholder="Enter Middle Name" />
                  </div>
                  <div>
                    <Label required>Last Name</Label>
                    <input className={parentFieldClass} placeholder="Enter Last Name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label required>Contact Number</Label>
                    {renderParentIconInput({ placeholder: "Enter Contact Number", icon: Phone })}
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    {renderParentIconInput({ placeholder: "Enter Email Address", icon: Mail, type: "email" })}
                  </div>
                </div>

                <div>
                  <Label required>Contact Number</Label>
                  {renderParentIconInput({ placeholder: "Enter Occupation", icon: Briefcase })}
                </div>
              </section>

              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                    <CircleUserRound size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">Mother&apos;s Details</h3>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <Label required>First Name</Label>
                    <input className={parentFieldClass} placeholder="Enter First Name" />
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <input className={parentFieldClass} placeholder="Enter Middle Name" />
                  </div>
                  <div>
                    <Label required>Last Name</Label>
                    <input className={parentFieldClass} placeholder="Enter Last Name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label required>Contact Number</Label>
                    {renderParentIconInput({ placeholder: "Enter Contact Number", icon: Phone })}
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    {renderParentIconInput({ placeholder: "Enter Email Address", icon: Mail, type: "email" })}
                  </div>
                </div>

                <div>
                  <Label required>Contact Number</Label>
                  {renderParentIconInput({ placeholder: "Enter Occupation", icon: Briefcase })}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.75fr)] gap-4 items-start">
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                    <MapPinned size={17} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">Address Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label required>Address Line 1</Label>
                    <input className={parentFieldClass} placeholder="House no., Building, Street" />
                  </div>
                  <div>
                    <Label>Address Line 2</Label>
                    <input className={parentFieldClass} placeholder="Area, Landmark (Optional)" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label required>Country</Label>
                    <SelectField placeholder="Select Country" options={[]} value="" onChange={noOp} />
                  </div>
                  <div>
                    <Label required>State</Label>
                    <SelectField placeholder="Select state" options={[]} value="" onChange={noOp} />
                  </div>
                  <div>
                    <Label required>City</Label>
                    <input className={parentFieldClass} placeholder="Enter City" />
                  </div>
                  <div>
                    <Label required>Postal Code</Label>
                    <input className={parentFieldClass} placeholder="Enter Pin code" />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 h-full">
                <h3 className="text-sm font-semibold text-primary mb-5">Checklist</h3>
                <div className="space-y-4">
                  {checklistItems.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span className="text-xs font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs font-semibold text-primary">
                  All required fields completed
                </div>
              </section>
            </div>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={15} />
                Previous
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
              >
                Review &amp; Submit
                <ArrowRight size={15} />
              </button>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onNavigate?.("students")} className="text-gray-500 hover:text-gray-700 transition-colors">
            <Menu size={20} />
          </button>
          <h1 className="text-base font-semibold text-gray-800">Add Student</h1>
        </div>
        <AdminProfile />
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)] gap-5 items-start">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-3 mb-5">
              <NumberBadge value={1} />
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Add Student Manually</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the student details below</p>
              </div>
            </div>

            <p className="text-xs font-semibold text-primary mb-3">Personal Information</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <Label required>First Name</Label>
                <TextField icon={User} placeholder="Enter first name" value={form.firstName} onChange={update("firstName")} />
              </div>
              <div>
                <Label>Middle Name</Label>
                <TextField placeholder="Enter middle name" value={form.middleName} onChange={update("middleName")} />
              </div>
              <div>
                <Label required>Last Name</Label>
                <TextField icon={User} placeholder="Enter last name" value={form.lastName} onChange={update("lastName")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Label required>College Email</Label>
                <TextField icon={Mail} placeholder="Enter college email" type="email" value={form.email} onChange={update("email")} />
              </div>
              <div>
                <Label required>Contact Number</Label>
                <TextField icon={Phone} placeholder="Enter contact number" type="tel" value={form.phone} onChange={update("phone")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <Label required>Date of Birth</Label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={update("dob")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow"
                />
              </div>
              <div>
                <Label required>Gender</Label>
                <SelectField
                  placeholder="Select gender"
                  options={["Male", "Female", "Other"]}
                  value={form.gender}
                  onChange={update("gender")}
                />
              </div>
            </div>

            <div className="h-px bg-gray-100 mb-4" />

            <p className="text-xs font-semibold text-primary mb-3">Academic Information</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <Label required>College Roll Number</Label>
                <TextField icon={IdCard} placeholder="Enter roll number" value={form.rollNumber} onChange={update("rollNumber")} />
              </div>
              <div>
                <Label required>Select Program</Label>
                <SelectField
                  placeholder="Select program"
                  options={["B.Tech", "B.Tech Lateral", "M.Tech", "B.Sc"]}
                  value={form.program}
                  onChange={update("program")}
                />
              </div>
              <div>
                <Label required>Department</Label>
                <SelectField
                  placeholder="Select department"
                  options={["CSE", "ECE", "EE", "ME", "CE"]}
                  value={form.department}
                  onChange={update("department")}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <Label required>Admission Year</Label>
                <SelectField
                  placeholder="Select admission year"
                  options={["2024", "2023", "2022", "2021"]}
                  value={form.admissionYear}
                  onChange={update("admissionYear")}
                />
              </div>
              <div>
                <Label required>Session Name</Label>
                <SelectField
                  placeholder="Select session"
                  options={["2024-2025", "2023-2024", "2022-2023"]}
                  value={form.sessionName}
                  onChange={update("sessionName")}
                />
              </div>
              <div>
                <Label required>Graduation Year</Label>
                <TextField placeholder="Auto-calculated" disabled value={form.graduationYear} onChange={noOp} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <Label required>Current Year</Label>
                <TextField placeholder="Auto-calculated" disabled value="" onChange={noOp} />
              </div>
              <div>
                <Label required>Current Semester</Label>
                <TextField placeholder="Auto-calculated" disabled value="" onChange={noOp} />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary-light px-4 py-2 text-sm font-medium text-primary hover:bg-green-100 transition-colors"
              >
                Next: Additional Details
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] text-gray-500">i</span>
              Fields marked with <span className="text-red-500 font-semibold">*</span> are required
            </div>
          </section>

          <div className="space-y-5">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3 mb-3">
                <NumberBadge value={2} />
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">Import Students via CSV</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Upload a CSV file to add multiple students at once</p>
                </div>
              </div>

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragOver(false);
                }}
                className={`rounded-xl border border-dashed p-6 flex flex-col items-center justify-center text-center transition-colors ${
                  dragOver ? "border-primary bg-green-50" : "border-gray-200 bg-gray-50/40"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <Upload size={22} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-700">Drag & drop your CSV file here</p>
                <p className="text-xs text-gray-400 mt-1">or</p>
                <label className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 transition-colors cursor-pointer">
                  <FileText size={14} />
                  Choose File
                  <input type="file" accept=".csv" className="hidden" />
                </label>
                <p className="text-[11px] text-gray-400 mt-4">Supports CSV files only. Max file size: 10MB</p>
              </div>

              <div className="mt-4 rounded-xl border border-green-100 bg-primary-light p-4">
                <p className="text-xs font-semibold text-primary mb-3">How it works?</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <NumberBadge value={1} />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Download the CSV template</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Use our template to ensure the correct format.</p>
                      <button
                        type="button"
                        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium text-primary hover:bg-green-50 transition-colors"
                      >
                        <Download size={13} />
                        Download Template
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <NumberBadge value={2} />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Fill in your student data</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Add student details in the template file.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <NumberBadge value={3} />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Upload and import</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Upload the file and we'll import the data for you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-green-100 bg-green-50/50 p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Secure Import</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Your data is safe with us. We never share your information.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </main>
    </div>
  );
}