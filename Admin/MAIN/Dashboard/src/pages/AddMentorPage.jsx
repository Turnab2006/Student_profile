import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Hash,
  BadgeCheck,
  BookOpen,
  Upload,
  Download,
  Shield,
  Building2,
  ArrowRight,
  ChevronDown,
  Info,
  Menu,
} from "lucide-react";

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextInput({ icon: Icon, placeholder, type = "text", disabled }) {
  return (
    <div className="relative">
      {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border border-gray-200 rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${
          Icon ? "pl-9 pr-3" : "px-3"
        } ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}`}
      />
    </div>
  );
}

function SelectInput({ placeholder, options = [] }) {
  return (
    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow appearance-none">
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function AddMentorPage({ onNavigate }) {
  const [dragOver, setDragOver] = useState(false);

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
        <div className="grid grid-cols-2 gap-6 items-start">

          {/* ── Left: Manual Form ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Section header */}
            <div className="flex items-start gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Add Mentor Manually</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the mentor details below</p>
              </div>
            </div>

            {/* Personal Information */}
            <p className="text-xs font-semibold text-primary mb-3">Personal Information</p>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <Label required>First Name</Label>
                <TextInput icon={User} placeholder="Enter first name" />
              </div>
              <div>
                <Label>Middle Name</Label>
                <TextInput placeholder="Enter middle name" />
              </div>
              <div>
                <Label required>Last Name</Label>
                <TextInput icon={User} placeholder="Enter last name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <Label required>College Email</Label>
                <TextInput icon={Mail} placeholder="Enter college email" type="email" />
              </div>
              <div>
                <Label required>Contact Number</Label>
                <TextInput icon={Phone} placeholder="Enter contact number" type="tel" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div>
                <Label required>Date of Birth</Label>
                <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
              <div>
                <Label required>Gender</Label>
                <SelectInput placeholder="Select gender" options={["Male", "Female", "Other"]} />
              </div>
              <div>
                <Label required>Blood Group</Label>
                <SelectInput placeholder="Select blood group" options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
              </div>
            </div>

            {/* Professional Information */}
            <p className="text-xs font-semibold text-primary mb-3">Professional Information</p>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <Label required>Employee ID</Label>
                <TextInput icon={Hash} placeholder="Enter employee ID" />
              </div>
              <div>
                <Label required>Department</Label>
                <SelectInput placeholder="Select department" options={["CS", "EE", "ECE", "ME", "CE"]} />
              </div>
              <div>
                <Label required>Designation</Label>
                <SelectInput placeholder="Select designation" options={["Professor", "Associate Professor", "Assistant Professor", "Senior Lecturer", "Lecturer"]} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <Label required>Specialization</Label>
                <SelectInput placeholder="Select specialization" options={["Power Systems", "Embedded Systems", "Machine Learning", "Control Systems", "Thermodynamics", "Structural Engg", "VLSI Design", "Cyber Security"]} />
              </div>
              <div>
                <Label required>Qualification</Label>
                <SelectInput placeholder="Select qualification" options={["Ph.D", "M.Tech", "M.Sc", "B.Tech"]} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <Label required>Joining Date</Label>
                <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
              </div>
              <div>
                <Label>Years of Experience</Label>
                <TextInput placeholder="Auto-calculated" disabled />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Info size={13} />
                Fields marked with <span className="text-red-500 font-bold mx-0.5">*</span> are required
              </p>
              <button className="flex items-center gap-2 text-sm font-medium text-primary border border-primary px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                Next: Additional Details
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* ── Right: CSV Import ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Section header */}
              <div className="flex items-start gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">Import Mentors via CSV</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Upload a CSV file to add multiple mentors at once</p>
                </div>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-2 transition-colors ${
                  dragOver ? "border-primary bg-green-50" : "border-gray-200 bg-gray-50/50"
                }`}
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

            {/* How it works */}
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

            {/* Secure Import */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Shield size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Secure Import</p>
                <p className="text-xs text-gray-400 mt-0.5">Your data is safe with us. We never share your information.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
