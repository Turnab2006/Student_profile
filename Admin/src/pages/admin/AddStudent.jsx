import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Bell,
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
  Building2,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

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

const reviewStudentDetails = [
  { label: "Full Name", value: "Tamsha Sengupta", icon: CircleUserRound },
  { label: "College Roll No.", value: "lee2024001", icon: IdCard },
  { label: "Program", value: "B.Tech Lateral", icon: Building2 },
  { label: "College Email", value: "tamsha.s@abc.edu.in", icon: Mail },
  { label: "Contact Number", value: "+91 98765 43210", icon: Phone },
  { label: "Date of Birth", value: "15 Apr 2002", icon: CalendarDays },
  { label: "Gender", value: "Male", icon: User },
  { label: "Admission Year", value: "2024", icon: CalendarDays },
  { label: "Session Name", value: "2024-2025", icon: CalendarDays },
  { label: "Current Year", value: "3rd Year", icon: Building2 },
  { label: "Current Semester", value: "Semester 6", icon: Building2 },
  { label: "Status", value: "Active", icon: CheckCircle2, pill: true },
];

const reviewAcademicDetails = [
  { label: "College Roll Number", value: "lee2024001", icon: IdCard },
  { label: "Program", value: "B.Tech Lateral", icon: Building2 },
  { label: "Department", value: "Electrical Engineering", icon: Building2 },
  { label: "Admission Year", value: "2024", icon: CalendarDays },
  { label: "Session Name", value: "2024-2025", icon: CalendarDays },
  { label: "Graduation Year", value: "2027", icon: CalendarDays },
  { label: "Current Year", value: "3rd Year", icon: CalendarDays },
  { label: "Current Semester", value: "Semester 6", icon: CalendarDays },
];

const reviewParentDetails = [
  { section: "Father's Details", fields: [
    { label: "First Name", value: "Anirban" },
    { label: "Middle Name", value: "Kumar" },
    { label: "Last Name", value: "Sengupta" },
    { label: "Contact Number", value: "+91 91234 56789" },
    { label: "Email Address", value: "anirban.sengupta@gmail.com" },
    { label: "Occupation", value: "Business" },
  ] },
  { section: "Mother's Details", fields: [
    { label: "First Name", value: "Madhurima" },
    { label: "Middle Name", value: "N/A" },
    { label: "Last Name", value: "Sengupta" },
    { label: "Contact Number", value: "+91 98765 07690" },
    { label: "Email Address", value: "madhurima.sengupta@gmail.com" },
    { label: "Occupation", value: "Homemaker" },
  ] },
];

const reviewAddressDetails = [
  { label: "Address Line 1", value: "123, Rabindra Sarny, Salt Lake" },
  { label: "Address Line 2", value: "Block A, Near City Center" },
  { label: "Country", value: "India" },
  { label: "State / Province", value: "West Bengal" },
  { label: "City", value: "Kolkata" },
  { label: "Postal Code", value: "700064" },
];

const reviewChecklist = [
  "Personal information added",
  "Academic information added",
  "Parent/Guardian details added",
  "Address information added",
];

export default function AddStudent({ onNavigate, onOpenSidebar }) {
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
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherOccupation: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherPhone: "",
    motherEmail: "",
    motherOccupation: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const noOp = () => {};

  const checklistItems = [
    {
      key: "personal",
      label: "Personal information added",
      isDone: Boolean(form.firstName.trim() || form.lastName.trim() || form.email.trim()),
      targetStep: 1,
    },
    {
      key: "academic",
      label: "Academic information added",
      isDone: Boolean(form.rollNumber.trim() || form.program || form.department),
      targetStep: 1,
    },
    {
      key: "parent",
      label: "Parent/Guardian details added",
      isDone: Boolean(form.fatherFirstName.trim() || form.fatherPhone.trim() || form.motherFirstName.trim() || form.motherPhone.trim()),
      targetStep: 2,
    },
    {
      key: "address",
      label: "Address information added",
      isDone: Boolean(form.addressLine1.trim() || form.city.trim() || form.postalCode.trim()),
      targetStep: 2,
    },
  ];

  const parentFieldClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow placeholder:text-gray-400";

  const renderParentIconInput = ({ placeholder, icon: Icon, type = "text", value, onChange }) => (
    <div className="relative">
      <input type={type} placeholder={placeholder} value={value || ""} onChange={onChange} className={`${parentFieldClass} pl-9 pr-3`} />
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  if (step === 2) {
    return (
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50">
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
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Add Student</h1>
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
                <span>&gt;</span>
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => setStep(1)}>Add Student</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Parents Details</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1500px] mx-auto space-y-5">
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
              <h2 className="text-[22px] font-medium text-gray-800 leading-tight">Parent / Guardian Details</h2>
              <p className="text-sm text-gray-500 mt-1">Enter Father&apos;s &amp; Mother&apos;s Details</p>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-stretch">
              {/* Father's Details Card */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <CircleUserRound size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">Father&apos;s Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                    <div>
                      <Label required>First Name</Label>
                      <input value={form.fatherFirstName} onChange={update("fatherFirstName")} className={parentFieldClass} placeholder="Enter First Name" />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <input value={form.fatherMiddleName} onChange={update("fatherMiddleName")} className={parentFieldClass} placeholder="Enter Middle Name" />
                    </div>
                    <div>
                      <Label required>Last Name</Label>
                      <input value={form.fatherLastName} onChange={update("fatherLastName")} className={parentFieldClass} placeholder="Enter Last Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                    <div>
                      <Label required>Contact Number</Label>
                      {renderParentIconInput({ placeholder: "Enter Contact Number", icon: Phone, value: form.fatherPhone, onChange: update("fatherPhone") })}
                    </div>
                    <div>
                      <Label required>Email Address</Label>
                      {renderParentIconInput({ placeholder: "Enter Email Address", icon: Mail, type: "email", value: form.fatherEmail, onChange: update("fatherEmail") })}
                    </div>
                  </div>

                  <div>
                    <Label>Occupation</Label>
                    {renderParentIconInput({ placeholder: "Enter Occupation", icon: Briefcase, value: form.fatherOccupation, onChange: update("fatherOccupation") })}
                  </div>
                </div>
              </section>

              {/* Mother's Details Card */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <CircleUserRound size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">Mother&apos;s Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                    <div>
                      <Label required>First Name</Label>
                      <input value={form.motherFirstName} onChange={update("motherFirstName")} className={parentFieldClass} placeholder="Enter First Name" />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <input value={form.motherMiddleName} onChange={update("motherMiddleName")} className={parentFieldClass} placeholder="Enter Middle Name" />
                    </div>
                    <div>
                      <Label required>Last Name</Label>
                      <input value={form.motherLastName} onChange={update("motherLastName")} className={parentFieldClass} placeholder="Enter Last Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                    <div>
                      <Label required>Contact Number</Label>
                      {renderParentIconInput({ placeholder: "Enter Contact Number", icon: Phone, value: form.motherPhone, onChange: update("motherPhone") })}
                    </div>
                    <div>
                      <Label required>Email Address</Label>
                      {renderParentIconInput({ placeholder: "Enter Email Address", icon: Mail, type: "email", value: form.motherEmail, onChange: update("motherEmail") })}
                    </div>
                  </div>

                  <div>
                    <Label>Occupation</Label>
                    {renderParentIconInput({ placeholder: "Enter Occupation", icon: Briefcase, value: form.motherOccupation, onChange: update("motherOccupation") })}
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.75fr)] gap-5 items-stretch">
              {/* Address Details Card */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                      <MapPinned size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">Address Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                    <div>
                      <Label required>Address Line 1</Label>
                      <input value={form.addressLine1} onChange={update("addressLine1")} className={parentFieldClass} placeholder="House no., Building, Street" />
                    </div>
                    <div>
                      <Label>Address Line 2</Label>
                      <input value={form.addressLine2} onChange={update("addressLine2")} className={parentFieldClass} placeholder="Area, Landmark (Optional)" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div>
                      <Label required>Country</Label>
                      <SelectField placeholder="Select Country" options={["India", "USA", "UK", "Canada"]} value={form.country} onChange={update("country")} />
                    </div>
                    <div>
                      <Label required>State</Label>
                      <SelectField placeholder="Select state" options={["West Bengal", "Delhi", "Maharashtra", "Karnataka"]} value={form.state} onChange={update("state")} />
                    </div>
                    <div>
                      <Label required>City</Label>
                      <input value={form.city} onChange={update("city")} className={parentFieldClass} placeholder="Enter City" />
                    </div>
                    <div>
                      <Label required>Postal Code</Label>
                      <input value={form.postalCode} onChange={update("postalCode")} className={parentFieldClass} placeholder="Enter Pin code" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Checklist Card */}
              <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0da651] mb-4">Checklist</h3>
                  <div className="space-y-2">
                    {checklistItems.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setStep(item.targetStep)}
                        className="w-full flex items-center gap-3 text-left p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        {item.isDone ? (
                          <CheckCircle2 size={18} className="text-[#0da651] shrink-0" />
                        ) : (
                          <div className="h-4.5 w-4.5 rounded-full border-2 border-gray-300 group-hover:border-emerald-400 shrink-0" />
                        )}
                        <span className={`text-xs font-semibold ${item.isDone ? "text-gray-800" : "text-gray-400"}`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs font-bold">
                  {checklistItems.every((i) => i.isDone) ? (
                    <span className="text-[#0da651] flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={14} /> All required fields completed
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">
                      {checklistItems.filter((i) => i.isDone).length} of 4 steps completed
                    </span>
                  )}
                </div>
              </section>
            </div>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                <ArrowLeft size={15} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors w-full sm:w-auto"
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

  if (step === 3) {
    return (
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50">
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
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Add Student</h1>
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
                <span>&gt;</span>
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => setStep(1)}>Add Student</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Review &amp; Submit</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-[1500px] mx-auto space-y-4">
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
              <h2 className="text-[22px] font-medium text-gray-800 leading-tight">Review &amp; Submit</h2>
              <p className="text-sm text-gray-500 mt-1">Please review all the information carefully before submitting the student details.</p>
            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
              <div className="grid grid-cols-3 gap-3 items-center">
                <div className="flex items-center gap-3">
                  <NumberBadge value={1} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Personal Information</p>
                    <p className="text-xs text-primary">Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <NumberBadge value={2} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Academic Information</p>
                    <p className="text-xs text-primary">Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Review &amp; Submit</p>
                    <p className="text-xs text-primary">In Progress</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.75fr)_minmax(280px,0.95fr)] gap-4 items-start">
              <div className="space-y-4">
                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Please review the information below.</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                      </svg>
                      Edit
                    </button>
                  </div>

                  <div className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                      {reviewStudentDetails.map((item) => (
                        <div key={item.label} className="min-h-[66px] p-3 flex items-start gap-3 bg-white min-w-0">
                          <div className="w-6 h-6 rounded-md bg-primary-light flex items-center justify-center shrink-0 text-primary mt-0.5">
                            <item.icon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                            {item.pill ? (
                              <span className="inline-flex items-center rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary mt-1">{item.value}</span>
                            ) : (
                              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 truncate" title={item.value}>{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Academic Information</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Verify the academic details before submitting.</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                      </svg>
                      Edit
                    </button>
                  </div>

                  <div className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                      {reviewAcademicDetails.map((item) => (
                        <div key={item.label} className="min-h-[66px] p-3 flex items-start gap-3 bg-white min-w-0">
                          <div className="w-6 h-6 rounded-md bg-primary-light flex items-center justify-center shrink-0 text-primary mt-0.5">
                            <item.icon size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 truncate" title={item.value}>{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Parent / Guardian Details</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Check father&apos;s and mother&apos;s details carefully.</p>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                      </svg>
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {reviewParentDetails.map((group) => (
                      <div key={group.section} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-xs font-semibold text-primary mb-4">{group.section}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {group.fields.map((field) => (
                            <div key={field.label} className={`min-w-0 ${field.label === "Email Address" ? "col-span-1 md:col-span-2" : ""}`}>
                              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{field.label}</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 truncate" title={field.value}>{field.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">Address Information</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Review the current address details.</p>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                      </svg>
                      Edit
                    </button>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {reviewAddressDetails.map((item) => (
                        <div key={item.label} className="min-w-0">
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                          <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 truncate" title={item.value}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                    <ArrowLeft size={15} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                    <button type="button" onClick={() => onNavigate?.("students")} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      Cancel
                    </button>
                    <button type="button" onClick={() => onNavigate?.("students")} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors whitespace-nowrap">
                      Submit Student
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-primary mb-4">Student Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold">TS</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Tamsha Sengupta</p>
                        <p className="text-xs text-gray-400">B.Tech Lateral</p>
                      </div>
                    </div>

                    {[
                      ["College Roll Number", "lee2024001"],
                      ["Department", "Electrical Engineering"],
                      ["Year", "3rd Year"],
                      ["Admission Year", "2024"],
                      ["Session", "2024-2025"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-primary-light flex items-center justify-center shrink-0 text-primary mt-0.5">
                          <CheckCircle2 size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                          <p className="text-xs text-gray-700 mt-0.5">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-primary mb-4">Checklist</h3>
                  <div className="space-y-3">
                    {reviewChecklist.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        <span className="text-xs text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-500 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-blue-500">Please Note</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Once you submit, the student will be created and all entered information will be saved. You can edit the record later if needed.
                      </p>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
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
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Add Student</h1>
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Student</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
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