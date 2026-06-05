import { useState } from "react";
import {
  User, Mail, Phone, Hash, Upload, Download, Shield,
  ArrowRight, ArrowLeft, ChevronDown, Info, Menu, Check, BookOpen,
  GraduationCap, Users, Briefcase,
} from "lucide-react";

// ── Shared form components ──

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextInput({ icon: Icon, placeholder, type = "text", disabled, value, onChange }) {
  return (
    <div className="relative">
      {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <input type={type} placeholder={placeholder} disabled={disabled}
        value={value} onChange={onChange}
        className={`w-full border border-gray-200 rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${Icon ? "pl-9 pr-3" : "px-3"} ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}`}
      />
    </div>
  );
}

function SelectInput({ placeholder, options = [], value, onChange }) {
  return (
    <select value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Step indicator ──

const STEPS = [
  { n: 1, label: "Mentor Details" },
  { n: 2, label: "Assign Subject" },
  { n: 3, label: "Review & Submit" },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {STEPS.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                done ? "bg-primary text-white" : active ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {done ? <Check size={14} /> : s.n}
              </span>
              <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-primary" : done ? "text-gray-600" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${done ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Subject assignment data ──

const availableSubjects = [
  { code: "EE601", name: "Power System Analysis",    semester: "6th", dept: "EE", students: 45 },
  { code: "EE602", name: "Electrical Drives",         semester: "6th", dept: "EE", students: 40 },
  { code: "EE603", name: "Control System II",         semester: "6th", dept: "EE", students: 42 },
  { code: "EE604", name: "Microprocessor & Interfacing", semester: "6th", dept: "EE", students: 38 },
  { code: "ECE601", name: "Digital Signal Processing",  semester: "6th", dept: "ECE", students: 35 },
  { code: "ECE602", name: "Communication Engg",       semester: "6th", dept: "ECE", students: 32 },
  { code: "ECE603", name: "VLSI Design",              semester: "6th", dept: "ECE", students: 30 },
  { code: "CS601", name: "Machine Learning",          semester: "6th", dept: "CS", students: 50 },
];

// ── Step 1: Mentor Details Form ──

function MentorDetailsForm({ form, setForm }) {
  const upd = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Add Mentor Manually</h2>
          <p className="text-xs text-gray-400 mt-0.5">Fill in the mentor details below</p>
        </div>
      </div>

      <p className="text-xs font-semibold text-primary mb-3">Personal Information</p>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <Label required>First Name</Label>
          <TextInput icon={User} placeholder="Enter first name" value={form.firstName} onChange={upd("firstName")} />
        </div>
        <div>
          <Label>Middle Name</Label>
          <TextInput placeholder="Enter middle name" value={form.middleName} onChange={upd("middleName")} />
        </div>
        <div>
          <Label required>Last Name</Label>
          <TextInput icon={User} placeholder="Enter last name" value={form.lastName} onChange={upd("lastName")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Label required>College Email</Label>
          <TextInput icon={Mail} placeholder="Enter college email" type="email" value={form.email} onChange={upd("email")} />
        </div>
        <div>
          <Label required>Contact Number</Label>
          <TextInput icon={Phone} placeholder="Enter contact number" type="tel" value={form.phone} onChange={upd("phone")} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <Label required>Date of Birth</Label>
          <input type="date" value={form.dob} onChange={upd("dob")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <div>
          <Label required>Gender</Label>
          <SelectInput placeholder="Select gender" options={["Male", "Female", "Other"]} value={form.gender} onChange={upd("gender")} />
        </div>
        <div>
          <Label required>Blood Group</Label>
          <SelectInput placeholder="Select blood group" options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} value={form.bloodGroup} onChange={upd("bloodGroup")} />
        </div>
      </div>

      <p className="text-xs font-semibold text-primary mb-3">Professional Information</p>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <Label required>Employee ID</Label>
          <TextInput icon={Hash} placeholder="Enter employee ID" value={form.empId} onChange={upd("empId")} />
        </div>
        <div>
          <Label required>Department</Label>
          <SelectInput placeholder="Select department" options={["CS", "EE", "ECE", "ME", "CE"]} value={form.dept} onChange={upd("dept")} />
        </div>
        <div>
          <Label required>Designation</Label>
          <SelectInput placeholder="Select designation" options={["Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer"]} value={form.designation} onChange={upd("designation")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Label required>Specialization</Label>
          <SelectInput placeholder="Select specialization" options={["Power Systems", "Embedded Systems", "Machine Learning", "Control Systems", "Thermodynamics", "Structural Engg", "VLSI Design", "Cyber Security"]} value={form.specialization} onChange={upd("specialization")} />
        </div>
        <div>
          <Label required>Qualification</Label>
          <SelectInput placeholder="Select qualification" options={["Ph.D", "M.Tech", "M.Sc", "B.Tech"]} value={form.qualification} onChange={upd("qualification")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <Label required>Joining Date</Label>
          <input type="date" value={form.joiningDate} onChange={upd("joiningDate")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <div>
          <Label>Years of Experience</Label>
          <TextInput placeholder="Auto-calculated" disabled />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Info size={13} />
          Fields marked with <span className="text-red-500 font-bold mx-0.5">*</span> are required
        </p>
      </div>
    </div>
  );
}

// ── Step 2: Assign Subject ──

function AssignSubject({ selected, setSelected }) {
  const toggle = (code) =>
    setSelected((prev) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);

  const toggleAll = () =>
    setSelected(selected.length === availableSubjects.length ? [] : availableSubjects.map((s) => s.code));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Assign Subjects</h2>
          <p className="text-xs text-gray-400 mt-0.5">Select the subjects this mentor will teach</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <input type="text" placeholder="Search subjects..."
            className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
        </div>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>All Departments</option>
          <option>EE</option>
          <option>ECE</option>
          <option>CS</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
          <option>All Semesters</option>
          <option>6th</option>
        </select>
      </div>

      {/* Subject table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" checked={selected.length === availableSubjects.length} onChange={toggleAll} className="rounded border-gray-300 accent-primary" />
              </th>
              {["Subject Code", "Subject Name", "Department", "Semester", "Students"].map((h) => (
                <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {availableSubjects.map((sub) => (
              <tr key={sub.code}
                className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${selected.includes(sub.code) ? "bg-green-50/40" : ""}`}
                onClick={() => toggle(sub.code)}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(sub.code)} onChange={() => toggle(sub.code)}
                    className="rounded border-gray-300 accent-primary" />
                </td>
                <td className="px-3 py-3 text-xs font-semibold text-gray-700">{sub.code}</td>
                <td className="px-3 py-3 text-xs text-gray-600">{sub.name}</td>
                <td className="px-3 py-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-600">{sub.dept}</span>
                </td>
                <td className="px-3 py-3 text-xs text-gray-600">{sub.semester}</td>
                <td className="px-3 py-3 text-xs text-gray-600">{sub.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">{selected.length} subject{selected.length !== 1 ? "s" : ""} selected</p>
    </div>
  );
}

// ── Step 3: Review & Submit ──

function ReviewSubmit({ form, selectedSubjects, previousStep, onNavigate }) {
  const assigned = availableSubjects.filter((s) => selectedSubjects.includes(s.code));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start gap-3 mb-6">
        <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Review & Submit</h2>
          <p className="text-xs text-gray-400 mt-0.5">Please verify all the details before submitting</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Personal Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-primary mb-3">Personal Information</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "First Name", value: form.firstName },
              { label: "Middle Name", value: form.middleName },
              { label: "Last Name", value: form.lastName },
              { label: "Email", value: form.email },
              { label: "Contact", value: form.phone },
              { label: "Date of Birth", value: form.dob },
              { label: "Gender", value: form.gender },
              { label: "Blood Group", value: form.bloodGroup },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-xs font-medium text-gray-700 mt-0.5">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-primary mb-3">Professional Information</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Employee ID", value: form.empId },
              { label: "Department", value: form.dept },
              { label: "Designation", value: form.designation },
              { label: "Specialization", value: form.specialization },
              { label: "Qualification", value: form.qualification },
              { label: "Joining Date", value: form.joiningDate },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-xs font-medium text-gray-700 mt-0.5">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Subjects */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-primary mb-3">Assigned Subjects ({assigned.length})</p>
          {assigned.length > 0 ? (
            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    {["Code", "Subject", "Dept", "Semester", "Students"].map((h) => (
                      <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {assigned.map((sub) => (
                    <tr key={sub.code}>
                      <td className="px-3 py-2 text-xs font-semibold text-gray-700">{sub.code}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{sub.name}</td>
                      <td className="px-3 py-2"><span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-600">{sub.dept}</span></td>
                      <td className="px-3 py-2 text-xs text-gray-600">{sub.semester}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{sub.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No subjects assigned yet</p>
          )}
        </div>

        {/* Submit area */}
        <div className="flex items-center justify-between pt-2">
          <button onClick={previousStep}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft size={15} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400">You can edit after submission</span>
            <button
              onClick={() => { alert("Mentor added successfully!"); onNavigate?.("mentors"); }}
              className="flex items-center gap-2 text-sm font-medium text-white bg-primary px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors">
              <Check size={15} />
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──

export default function AddMentor({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "", email: "", phone: "",
    dob: "", gender: "", bloodGroup: "",
    empId: "", dept: "", designation: "", specialization: "", qualification: "", joiningDate: "",
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const canNextStep1 = form.firstName && form.lastName && form.email && form.phone && form.dob && form.gender && form.bloodGroup &&
    form.empId && form.dept && form.designation && form.specialization && form.qualification && form.joiningDate;

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate?.("mentors")}>
            <Menu size={20} className="text-gray-500" />
          </button>
          <h1 className="text-base font-semibold text-gray-800">Add Mentor</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">A</div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {/* Step indicator */}
        <StepIndicator current={step} />

        {step === 1 && (
          <div className="grid grid-cols-2 gap-6 items-start">
            <MentorDetailsForm form={form} setForm={setForm} />

            {/* Right: CSV Import */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Import Mentors via CSV</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Upload a CSV file to add multiple mentors at once</p>
                  </div>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 transition-colors ${dragOver ? "border-primary bg-green-50" : "border-gray-200 bg-gray-50/50"}`}
                >
                  <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-1">
                    <Upload size={22} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Drag &amp; drop your CSV file here</p>
                  <p className="text-xs text-gray-400">or</p>
                  <label className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer transition-colors">
                    <Upload size={14} />
                    Choose File
                    <input type="file" accept=".csv" className="hidden" />
                  </label>
                  <p className="text-[11px] text-gray-400 mt-1">Supports CSV files only. Max file size: 10MB</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-sm font-semibold text-primary mb-4">How it works?</p>
                <div className="space-y-4">
                  {[
                    { n: 1, title: "Download the CSV template", desc: "Use our template to ensure the correct format.", action: true },
                    { n: 2, title: "Fill in your mentor data",   desc: "Add mentor details in the template file." },
                    { n: 3, title: "Upload and import",          desc: "Upload the file and we'll import the data for you." },
                  ].map(({ n, title, desc, action }) => (
                    <div key={n} className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{title}</p>
                        <p className="text-xs text-gray-400">{desc}</p>
                        {action && (
                          <button className="flex items-center gap-2 text-xs font-medium text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors mt-2">
                            <Download size={13} />
                            Download Template
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Secure Import</p>
                  <p className="text-xs text-gray-400 mt-0.5">Your data is safe with us. We never share your information.</p>
                </div>
              </div>

              {/* Step 1 → Next button */}
              <div className="flex justify-end pt-2">
                <button onClick={nextStep} disabled={!canNextStep1}
                  className={`flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors ${
                    canNextStep1 ? "bg-primary text-white hover:bg-green-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
                  Next: Assign Subject
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <AssignSubject selected={selectedSubjects} setSelected={setSelectedSubjects} />
            <div className="flex items-center justify-between mt-6 max-w-3xl">
              <button onClick={prevStep}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowLeft size={15} />
                Back
              </button>
              <button onClick={nextStep}
                className="flex items-center gap-2 text-sm font-medium text-white bg-primary px-5 py-2.5 rounded-lg hover:bg-green-600 transition-colors">
                Next: Review & Submit
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <ReviewSubmit form={form} selectedSubjects={selectedSubjects} previousStep={prevStep} onNavigate={onNavigate} />
        )}
      </main>
    </div>
  );
}
