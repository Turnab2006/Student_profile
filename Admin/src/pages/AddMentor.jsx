import { useState } from "react";
import {
  User, Mail, Phone, Hash, Upload, Download, Shield,
  ArrowRight, ArrowLeft, ChevronDown, Info, Menu, Check,
  Users, CircleUserRound, MapPinned, CheckCircle2, Briefcase, GraduationCap,
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

const STEPS = [
  { n: 1, label: "Mentor Details" },
  { n: 2, label: "Assign Mentees" },
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

const availableMentees = [
  { initials: "TS", name: "Tamoha Sengupta", email: "tamoha.sengupta@abc.edu.in", roll: "lee2024001", avatarBg: "bg-emerald-100", avatarText: "text-emerald-700" },
  { initials: "TR", name: "Tarun Roy", email: "tarun.roy@abc.edu.in", roll: "lee2024002", avatarBg: "bg-sky-100", avatarText: "text-sky-700" },
  { initials: "MC", name: "Madhurima Chatterjee", email: "madhurima.c@abc.edu.in", roll: "lee2024003", avatarBg: "bg-violet-100", avatarText: "text-violet-700" },
  { initials: "ND", name: "Nilankur Das", email: "nilankur.das@abc.edu.in", roll: "lee2024004", avatarBg: "bg-amber-100", avatarText: "text-amber-700" },
  { initials: "AR", name: "Abhinandan Roy", email: "abhinandan.roy@abc.edu.in", roll: "lee2024005", avatarBg: "bg-green-100", avatarText: "text-green-700" },
  { initials: "SG", name: "Subhamita Ganguly", email: "subhamita.g@abc.edu.in", roll: "lee2024006", avatarBg: "bg-pink-100", avatarText: "text-pink-700" },
  { initials: "AB", name: "Alok Bhattacharya", email: "alok.bhattacharya@abc.edu.in", roll: "lee2024007", avatarBg: "bg-cyan-100", avatarText: "text-cyan-700" },
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
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
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
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
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

// ── Step 2: Assign Mentees ──

function AssignMentees({ selected, setSelected }) {
  const selectedMentees = availableMentees.filter((mentee) => selected.includes(mentee.roll));

  const toggle = (roll) => {
    setSelected((prev) =>
      prev.includes(roll) ? prev.filter((item) => item !== roll) : [...prev, roll]
    );
  };

  const remove = (roll) => setSelected((prev) => prev.filter((item) => item !== roll));
  const clearAll = () => setSelected([]);

  return (
    <div>
      <div className="flex items-start gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Assign Mentees</h2>
          <p className="text-xs text-gray-400 mt-0.5">Search and select students to assign under this mentor.</p>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.1fr)_auto_minmax(320px,0.9fr)] gap-6 items-start">
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Search by roll number or email address..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
              <select className="h-12 min-w-[132px] rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-green-300">
                <option>All Programs</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
              </select>
            </div>
          </div>

          <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800">Available Students</h3>
            <span className="inline-flex items-center justify-center min-w-7 h-6 px-2 rounded-full bg-primary/10 text-primary text-xs font-bold">128</span>
          </div>

          <div className="divide-y divide-gray-100">
            {availableMentees.map((mentee) => {
              const isSelected = selected.includes(mentee.roll);
              return (
                <div key={mentee.roll} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50/70 transition-colors">
                  <label className="shrink-0 inline-flex items-center justify-center w-5 h-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(mentee.roll)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-green-300"
                    />
                  </label>

                  <div className={`w-9 h-9 rounded-full ${mentee.avatarBg} ${mentee.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>
                    {mentee.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{mentee.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{mentee.email}</p>
                  </div>

                  <div className="text-right shrink-0 pr-2">
                    <p className="text-sm font-semibold text-gray-700 leading-tight">{mentee.roll}</p>
                    <p className="text-[11px] text-gray-400">Roll Number</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(mentee.roll)}
                    className="ml-1 inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
                  >
                    <span className="text-base leading-none">+</span>
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <div className="pt-28 flex flex-col items-center gap-3 shrink-0">
          <button type="button" className="w-12 h-12 rounded-lg border border-green-100 bg-primary-light text-primary flex items-center justify-center shadow-sm hover:bg-green-100 transition-colors">
            <ArrowRight size={18} />
          </button>
          <button type="button" className="w-12 h-12 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
        </div>

        <section className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-800">Selected Mentees</h3>
                <span className="inline-flex items-center justify-center min-w-7 h-6 px-2 rounded-full bg-primary/10 text-primary text-xs font-bold">{selected.length}</span>
              </div>
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Clear All</button>
            </div>

            <div className="p-3 space-y-3 min-h-[280px]">
              {selectedMentees.length > 0 ? (
                selectedMentees.map((mentee) => (
                  <div key={mentee.roll} className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-3 shadow-sm">
                    <div className={`w-9 h-9 rounded-full ${mentee.avatarBg} ${mentee.avatarText} text-xs font-bold flex items-center justify-center shrink-0`}>
                      {mentee.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{mentee.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{mentee.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-700 leading-tight">{mentee.roll}</p>
                      <p className="text-[11px] text-gray-400">Roll Number</p>
                    </div>
                    <button type="button" onClick={() => remove(mentee.roll)} className="ml-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-[240px] flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl">
                  No mentees selected
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary-light border border-green-100 rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-green-100 flex items-center justify-center shrink-0 text-primary">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Assign Multiple Mentees</p>
              <p className="text-xs text-gray-500 mt-0.5">You can assign multiple students to this mentor. Use search to find students quickly.</p>
            </div>
          </div>
        </section>
      </div>

      <p className="text-xs text-gray-500 mt-4">{selected.length} mentee{selected.length !== 1 ? "s" : ""} selected</p>
    </div>
  );
}

// ── Step 3: Review & Submit ──

function ReviewSubmit({ form, selectedSubjects, previousStep, onNavigate }) {
  const assigned = availableMentees.filter((mentee) => selectedSubjects.includes(mentee.roll));
  const mentorName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ").trim() || "Prof. Kawshik Chattarji";
  const mentorEmail = form.email || "kawshik.c@abc.edu.in";
  const employeeId = form.empId || "EMP2024001";
  const department = form.dept || "Computer Science & Engineering";
  const designation = form.designation || "Assistant Professor";
  const qualification = form.qualification || "M.Tech in Computer Science";
  const experience = "6 Years";
  const joiningDate = form.joiningDate || "15 Apr 2022";
  const totalMentees = selectedSubjects.length || 3;

  const summaryRows = [
    { icon: <CircleUserRound size={14} />, label: "Mentor", value: mentorName },
    { icon: <MapPinned size={14} />, label: "Department", value: department },
    { icon: <Hash size={14} />, label: "Employee ID", value: employeeId },
    { icon: <Users size={14} />, label: "Total Mentees", value: totalMentees },
    { icon: <CheckCircle2 size={14} />, label: "Status", value: "Active", pill: true },
  ];

  const checklistItems = [
    "Mentor details added",
    "Required information provided",
    "Mentees assigned",
    "All information looks correct",
  ];

  return (
    <div className="w-full max-w-none">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.75fr)_minmax(280px,0.95fr)] gap-4 items-start">
        <div className="space-y-4">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div>
                <h2 className="text-[15px] font-semibold text-gray-800">Review Mentor Details</h2>
                <p className="text-xs text-gray-400 mt-0.5">Please review all the information before submitting.</p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                </svg>
                Edit
              </button>
            </div>

            <div className="mt-4 rounded-lg border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-y divide-gray-100 bg-white">
                {[
                  { label: "Full Name", value: mentorName, icon: CircleUserRound },
                  { label: "Employee ID", value: employeeId, icon: Hash },
                  { label: "Department", value: department, icon: MapPinned },
                  { label: "College Email", value: mentorEmail, icon: Mail },
                  { label: "Contact Number", value: form.phone || "+91 98765 43210", icon: Phone },
                  { label: "Gender", value: form.gender || "Male", icon: Users },
                  { label: "Designation / Role", value: designation, icon: Briefcase },
                  { label: "Qualification", value: qualification, icon: GraduationCap },
                  { label: "Experience", value: experience, icon: CheckCircle2 },
                  { label: "Date of Joining", value: joiningDate, icon: MapPinned },
                  { label: "Status", value: "Active", icon: CheckCircle2, pill: true },
                ].map(({ label, value, icon: Icon, pill }) => (
                  <div key={label} className="min-h-[66px] p-3 flex items-start gap-3 bg-white">
                    <div className="w-6 h-6 rounded-md bg-primary-light flex items-center justify-center shrink-0 text-primary mt-0.5">
                      <Icon size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                      {pill ? (
                        <span className="inline-flex items-center rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary mt-1">{value}</span>
                      ) : (
                        <p className="text-sm font-semibold text-gray-700 leading-snug mt-0.5">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div>
                <h2 className="text-[15px] font-semibold text-gray-800">Assigned Mentees ({assigned.length})</h2>
                <p className="text-xs text-gray-400 mt-0.5">Review the mentees assigned to this mentor.</p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 2 4 4-14 14-4 1 1-4 14-14Z" />
                  <path d="M12 20h9" />
                </svg>
                Edit
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    {['#', 'Mentee Name', 'College Roll No.', 'Email Address', 'Program', 'Year'].map((column) => (
                      <th key={column} className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {assigned.map((mentee, index) => (
                    <tr key={mentee.roll} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-3 py-3 text-xs text-gray-500">{index + 1}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${mentee.avatarBg} ${mentee.avatarText} text-[10px] font-bold flex items-center justify-center shrink-0`}>
                            {mentee.initials}
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{mentee.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600">{mentee.roll}</td>
                      <td className="px-3 py-3 text-xs text-gray-600">{mentee.email}</td>
                      <td className="px-3 py-3 text-xs text-gray-600">B.Tech CSE</td>
                      <td className="px-3 py-3 text-xs text-gray-600">3rd Year</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex items-end justify-between pt-1">
            <button onClick={previousStep}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <ArrowLeft size={15} />
              Previous
            </button>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-3">
                <button onClick={() => onNavigate?.("mentors")}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => { alert("Mentor added successfully!"); onNavigate?.("mentors"); }}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                  Submit &amp; Assign Mentor
                </button>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Shield size={12} className="text-primary" />
                Your data is safe and secure
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[15px] font-semibold text-primary mb-4">Summary</h3>
            <div className="space-y-4">
              {summaryRows.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-primary-light flex items-center justify-center shrink-0 text-primary mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                    {item.pill ? (
                      <span className="inline-flex items-center rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary mt-1">{item.value}</span>
                    ) : (
                      <p className="text-xs text-gray-700 mt-0.5">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[15px] font-semibold text-primary mb-4">Checklist</h3>
            <div className="space-y-3">
              {checklistItems.map((item) => (
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
                <p className="mt-1 text-xs leading-5 text-gray-500">Once you submit, the mentor will be created and assigned to the selected mentees. You can edit the details later if needed.</p>
              </div>
            </div>
          </section>
        </aside>
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
        <AdminProfile />
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
                  Next: Assign Mentees
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <AssignMentees selected={selectedSubjects} setSelected={setSelectedSubjects} />
            <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-4 flex items-center justify-between">
              <button onClick={prevStep}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowLeft size={15} />
                Previous
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => onNavigate?.("mentors")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={nextStep}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-primary px-5 py-2.5 rounded-lg hover:bg-green-600 transition-colors">
                  Next
                  <ArrowRight size={15} />
                </button>
              </div>
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
