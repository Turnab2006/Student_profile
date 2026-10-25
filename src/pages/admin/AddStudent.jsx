import { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";
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
  Hash,
  Droplet,
  Users,
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
        className={`w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all appearance-none pr-8 cursor-pointer ${
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

export default function AddStudent({ onNavigate, onOpenSidebar }) {
  const [registrationType, setRegistrationType] = useState("single"); // "single" | "multiple"
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    personalEmail: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    aadharNumber: "",
    rollNumber: "",
    program: "",
    department: "",
    admissionYear: "",
    graduationYear: "",
    year: "",
    currentSemester: "",
    universityName: "",
    universityRole: "Regular",
    universityRollNumber: "",
    registrationNumber: "",
    abcId: "",
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

  const handleAdmissionYearChange = (event) => {
    const newAdmissionYear = event.target.value;
    setForm((prev) => {
      const nextForm = { ...prev, admissionYear: newAdmissionYear };
      if (newAdmissionYear && prev.graduationYear && parseInt(prev.graduationYear, 10) < parseInt(newAdmissionYear, 10)) {
        nextForm.graduationYear = "";
      }
      return nextForm;
    });
  };

  const admissionYearNum = parseInt(form.admissionYear, 10);
  const startGradYear = !isNaN(admissionYearNum) ? admissionYearNum : 2026;
  const graduationYearOptions = Array.from({ length: 9 }, (_, idx) => String(startGradYear + idx));

  // Dynamic Country, State, City options using country-state-city
  const countryList = useMemo(() => Country.getAllCountries().map((c) => c.name), []);

  const selectedCountryObj = useMemo(() => {
    if (!form.country) return null;
    return Country.getAllCountries().find(
      (c) => c.name === form.country || c.isoCode === form.country
    );
  }, [form.country]);

  const stateList = useMemo(() => {
    if (!selectedCountryObj) return [];
    return State.getStatesOfCountry(selectedCountryObj.isoCode).map((s) => s.name);
  }, [selectedCountryObj]);

  const selectedStateObj = useMemo(() => {
    if (!form.state || !selectedCountryObj) return null;
    return State.getStatesOfCountry(selectedCountryObj.isoCode).find(
      (s) => s.name === form.state || s.isoCode === form.state
    );
  }, [form.state, selectedCountryObj]);

  const cityList = useMemo(() => {
    if (!selectedCountryObj || !selectedStateObj) return [];
    return City.getCitiesOfState(selectedCountryObj.isoCode, selectedStateObj.isoCode).map(
      (c) => c.name
    );
  }, [selectedCountryObj, selectedStateObj]);

  const handleCountryChange = (event) => {
    const selectedName = event.target.value;
    setForm((prev) => ({
      ...prev,
      country: selectedName,
      state: "",
      city: "",
    }));
  };

  const handleStateChange = (event) => {
    const selectedName = event.target.value;
    setForm((prev) => ({
      ...prev,
      state: selectedName,
      city: "",
    }));
  };

  const handleCityChange = (event) => {
    setForm((prev) => ({
      ...prev,
      city: event.target.value,
    }));
  };

  const checklistItems = [
    {
      key: "personal",
      label: "Personal information added",
      isDone: Boolean(form.firstName.trim() || form.lastName.trim() || form.email.trim() || form.personalEmail.trim()),
      targetStep: 1,
    },
    {
      key: "academic",
      label: "Academic information added",
      isDone: Boolean(form.rollNumber.trim() || form.program || form.department || form.universityName.trim()),
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
    "w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all";

  const renderParentIconInput = ({ placeholder, icon: Icon, type = "text", value, onChange }) => (
    <div className="relative group">
      <input type={type} placeholder={placeholder} value={value || ""} onChange={onChange} className={`${parentFieldClass} pl-9 pr-3`} />
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/70 group-focus-within:text-[#0da651] pointer-events-none transition-colors" />
    </div>
  );

  const reviewStudentDetails = [
    {
      label: "Full Name",
      value: [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ") || "Tamsha Sengupta",
      icon: CircleUserRound,
    },
    { label: "College Email", value: form.email || "tamsha.s@abc.edu.in", icon: Mail },
    { label: "Personal Email", value: form.personalEmail || "tamsha.personal@gmail.com", icon: Mail },
    { label: "Contact Number", value: form.phone || "+91 98765 43210", icon: Phone },
    { label: "Date of Birth", value: form.dob || "15 Apr 2002", icon: CalendarDays },
    { label: "Gender", value: form.gender || "Male", icon: User },
    { label: "Blood Group", value: form.bloodGroup || "O+", icon: Droplet },
    { label: "Aadhar Card No.", value: form.aadharNumber || "1234 5678 9012", icon: IdCard },
  ];

  const reviewAcademicDetails = [
    { label: "College Roll Number", value: form.rollNumber || "lee2024001", icon: IdCard },
    { label: "Program", value: form.program || "B.Tech Lateral", icon: Building2 },
    { label: "Department", value: form.department || "Electrical Engineering", icon: Building2 },
    { label: "Admission Year", value: form.admissionYear || "2024", icon: CalendarDays },
    { label: "Graduation Year", value: form.graduationYear || "2028", icon: CalendarDays },
    { label: "Current Year", value: form.year || "3rd Year", icon: CalendarDays },
    { label: "Current Semester", value: form.currentSemester || "Semester 6", icon: CalendarDays },
    { label: "University Name", value: form.universityName || "State Technical University", icon: Building2 },
    { label: "University Role", value: form.universityRole || "Regular", icon: User },
    { label: "University Roll No.", value: form.universityRollNumber || "12024001", icon: Hash },
    { label: "Registration No.", value: form.registrationNumber || "REG2024001", icon: Hash },
    { label: "ABC ID", value: form.abcId || "ABC12345678", icon: Hash },
  ];

  const reviewParentDetails = [
    {
      section: "Father's Details",
      fields: [
        {
          label: "Full Name",
          value: [form.fatherFirstName, form.fatherMiddleName, form.fatherLastName].filter(Boolean).join(" ") || "Anirban Kumar Sengupta",
        },
        { label: "Contact Number", value: form.fatherPhone || "+91 91234 56789" },
        { label: "Email Address", value: form.fatherEmail || "anirban.sengupta@gmail.com" },
        { label: "Occupation", value: form.fatherOccupation || "Business" },
      ],
    },
    {
      section: "Mother's Details",
      fields: [
        {
          label: "Full Name",
          value: [form.motherFirstName, form.motherMiddleName, form.motherLastName].filter(Boolean).join(" ") || "Madhurima Sengupta",
        },
        { label: "Contact Number", value: form.motherPhone || "+91 98765 07690" },
        { label: "Email Address", value: form.motherEmail || "madhurima.sengupta@gmail.com" },
        { label: "Occupation", value: form.motherOccupation || "Homemaker" },
      ],
    },
  ];

  const reviewAddressDetails = [
    { label: "Address Line 1", value: form.addressLine1 || "123, Rabindra Sarny, Salt Lake" },
    { label: "Address Line 2", value: form.addressLine2 || "Block A, Near City Center" },
    { label: "Country", value: form.country || "India" },
    { label: "State", value: form.state || "West Bengal" },
    { label: "City", value: form.city || "Kolkata" },
    { label: "Postal Code", value: form.postalCode || "700064" },
  ];

  if (step === 2) {
    return (
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50">
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Add Student</h1>
              <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
                <span>&gt;</span>
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => setStep(1)}>Add Student</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Parents Details</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1500px] mx-auto space-y-5">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                  <Users size={18} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Parent / Guardian Details
                  </h2>
                  <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                    Enter Father&apos;s, Mother&apos;s, and residential address details
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-stretch">
              {/* Father's Details Card */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 h-full flex flex-col justify-between">
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
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6 h-full flex flex-col justify-between">
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

            {/* Address Details Card */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                    <MapPinned size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">Address Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>Address Line 1</Label>
                    <input value={form.addressLine1} onChange={update("addressLine1")} className={parentFieldClass} placeholder="House no., Building, Street" />
                  </div>
                  <div>
                    <Label>Address Line 2</Label>
                    <input value={form.addressLine2} onChange={update("addressLine2")} className={parentFieldClass} placeholder="Area, Landmark (Optional)" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label required>Country</Label>
                    <SelectField
                      placeholder="Select Country"
                      options={countryList}
                      value={form.country}
                      onChange={handleCountryChange}
                    />
                  </div>
                  <div>
                    <Label required>State</Label>
                    <SelectField
                      placeholder={form.country ? "Select State" : "Select Country first"}
                      options={stateList}
                      value={form.state}
                      onChange={handleStateChange}
                      disabled={!form.country}
                    />
                  </div>
                  <div>
                    <Label required>City</Label>
                    {cityList.length > 0 ? (
                      <SelectField
                        placeholder="Select City"
                        options={cityList}
                        value={form.city}
                        onChange={handleCityChange}
                      />
                    ) : (
                      <input
                        value={form.city}
                        onChange={handleCityChange}
                        className={parentFieldClass}
                        placeholder={form.state ? "Enter City" : "Select state first"}
                      />
                    )}
                  </div>
                  <div>
                    <Label required>Postal Code</Label>
                    <input value={form.postalCode} onChange={update("postalCode")} className={parentFieldClass} placeholder="Enter Pin code" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Add Student</h1>
              <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
                <span>&gt;</span>
                <span className="hover:text-gray-600 cursor-pointer" onClick={() => setStep(1)}>Add Student</span>
                <span>&gt;</span>
                <span className="text-[#0da651] font-semibold">Review &amp; Submit</span>
              </nav>
            </div>
          </div>
          <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1500px] mx-auto space-y-4">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Review &amp; Submit
                  </h2>
                  <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                    Please review all the information carefully before submitting the student details
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </section>

          <div className="space-y-5">
            {/* Personal Information Review Section */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {reviewStudentDetails.map((item) => (
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

            {/* Academic Information Review Section */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Academic Information</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Review academic record, programs, and roll numbers</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {reviewAcademicDetails.map((item) => (
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

            {/* Parent / Guardian Details Review Section */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Parent / Guardian Details</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Review father&apos;s and mother&apos;s details</p>
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

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {reviewParentDetails.map((group) => (
                  <div key={group.section} className="rounded-2xl border border-emerald-200/80 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-emerald-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 text-[#0da651]">
                        <CircleUserRound size={15} />
                      </div>
                      <p className="text-xs font-bold text-[#0da651] uppercase tracking-wider">{group.section}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {group.fields.map((field) => (
                        <div key={field.label} className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all min-w-0">
                          <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">{field.label}</p>
                          <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 break-all sm:break-normal" title={field.value}>{field.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Address Details Review Section */}
            <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center text-[#0da651]">
                    <MapPinned size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Address Details</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Review residential address information</p>
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

              <div className="space-y-3.5">
                {/* Row 1: Address Line 1 */}
                <div className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all">
                  <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">Address Line 1</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5">{form.addressLine1 || "123, Rabindra Sarny, Salt Lake"}</p>
                </div>

                {/* Row 2: Address Line 2 */}
                <div className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all">
                  <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">Address Line 2</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5">{form.addressLine2 || "Block A, Near City Center"}</p>
                </div>

                {/* Row 3: Country, State, City, Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {[
                    { label: "Country", value: form.country || "India" },
                    { label: "State", value: form.state || "West Bengal" },
                    { label: "City", value: form.city || "Kolkata" },
                    { label: "Postal Code", value: form.postalCode || "700064" },
                  ].map((item) => (
                    <div key={item.label} className="p-3.5 rounded-xl bg-[#f4fbf7] border border-emerald-200/80 hover:bg-[#ebf8f0]/80 transition-all min-w-0">
                      <p className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider">{item.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 truncate" title={item.value}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Action Buttons */}
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
                  onClick={() => onNavigate?.("students")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.("students")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Register
                  <ArrowRight size={15} />
                </button>
              </div>
            </section>
          </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Add Student</h1>
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <span className="hover:text-gray-600 cursor-pointer" onClick={() => onNavigate?.("students")}>Students</span>
              <span>&gt;</span>
              <span className="text-[#0da651] font-semibold">Add Student</span>
            </nav>
          </div>
        </div>
        <AdminProfile name="John Doe" role="Super Admin" avatar="JD" onNavigate={onNavigate} />
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-[1500px] mx-auto space-y-5">
          {/* Header Banner */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm">
            <div className="relative z-10 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/25">
                <CircleUserRound size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Student Information
                </h2>
                <p className="text-xs text-emerald-50/90 font-normal mt-0.5">
                  Enter student&apos;s personal and academic details
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
                  How many students do you want to register?
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Choose single student to fill details manually, or multiple students to import via CSV
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shrink-0">
                <button
                  type="button"
                  onClick={() => setRegistrationType("single")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    registrationType === "single"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <User size={15} />
                  Single Student
                </button>

                <button
                  type="button"
                  onClick={() => setRegistrationType("multiple")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    registrationType === "multiple"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users size={15} />
                  Multiple Students
                </button>
              </div>
            </div>
          </section>

          {/* Conditional Rendering based on Registration Mode */}
          {registrationType === "single" ? (
            <div className="space-y-5">
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-5 sm:p-7 space-y-6">
                <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
                  <NumberBadge value={1} />
                  <div>
                    <h2 className="text-base font-bold text-gray-800">Add Student Details</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Fill in the student&apos;s personal and academic information below</p>
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
                      <TextField placeholder="Enter middle name" value={form.middleName} onChange={update("middleName")} />
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
                      <Label required>Personal Email Address</Label>
                      <TextField icon={Mail} placeholder="name@gmail.com" type="email" value={form.personalEmail} onChange={update("personalEmail")} />
                    </div>
                    <div>
                      <Label required>Contact Number</Label>
                      <TextField icon={Phone} placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label required>Date of Birth</Label>
                      <div className="relative group">
                        <input
                          type="date"
                          value={form.dob}
                          onChange={update("dob")}
                          className="w-full border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 hover:border-emerald-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <Label required>Gender</Label>
                      <SelectField placeholder="Select gender" options={["Male", "Female", "Other"]} value={form.gender} onChange={update("gender")} />
                    </div>
                    <div>
                      <Label required>Blood Group</Label>
                      <SelectField
                        placeholder="Select Blood Group"
                        options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                        value={form.bloodGroup}
                        onChange={update("bloodGroup")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Aadhar Card Number</Label>
                      <TextField icon={IdCard} placeholder="Enter 12-digit Aadhar number" value={form.aadharNumber} onChange={update("aadharNumber")} />
                    </div>
                  </div>
                </div>

                {/* Separator between sections */}
                <div className="my-8 border-t border-slate-100" />

                {/* Academic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100/80">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0da651] flex items-center justify-center shrink-0">
                      <Building2 size={15} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Academic Information</h3>
                      <p className="text-[11px] text-gray-400">Course, department, roll numbers, and academic record</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label required>Program</Label>
                      <SelectField placeholder="Select program" options={["B.Tech", "B.Tech Lateral", "M.Tech", "BCA", "MCA"]} value={form.program} onChange={update("program")} />
                    </div>
                    <div>
                      <Label required>Department</Label>
                      <SelectField placeholder="Select department" options={["Computer Science & Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"]} value={form.department} onChange={update("department")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label required>Admission Year</Label>
                      <SelectField
                        placeholder="Select year"
                        options={["2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020"]}
                        value={form.admissionYear}
                        onChange={handleAdmissionYearChange}
                      />
                    </div>
                    <div>
                      <Label required>Graduation Year</Label>
                      <SelectField
                        placeholder="Select graduation year"
                        options={graduationYearOptions}
                        value={form.graduationYear}
                        onChange={update("graduationYear")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label required>Year</Label>
                      <SelectField placeholder="Select year" options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} value={form.year} onChange={update("year")} />
                    </div>
                    <div>
                      <Label required>Current Semester</Label>
                      <SelectField placeholder="Select semester" options={["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"]} value={form.currentSemester} onChange={update("currentSemester")} />
                    </div>
                    <div>
                      <Label required>College Roll Number</Label>
                      <TextField icon={Hash} placeholder="e.g. CSE2024001" value={form.rollNumber} onChange={update("rollNumber")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label required>University Name</Label>
                      <TextField icon={Building2} placeholder="Enter university name" value={form.universityName} onChange={update("universityName")} />
                    </div>
                    <div>
                      <Label required>University Role</Label>
                      <SelectField
                        placeholder="Select role"
                        options={["Regular", "Part Time"]}
                        value={form.universityRole}
                        onChange={update("universityRole")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label required>University Roll Number</Label>
                      <TextField icon={Hash} placeholder="e.g. 12024001" value={form.universityRollNumber} onChange={update("universityRollNumber")} />
                    </div>
                    <div>
                      <Label required>Registration Number</Label>
                      <TextField icon={Hash} placeholder="e.g. REG2024001" value={form.registrationNumber} onChange={update("registrationNumber")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>ABC ID</Label>
                      <TextField icon={Hash} placeholder="Enter ABC ID" value={form.abcId} onChange={update("abcId")} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  Fields marked with <span className="text-red-500 font-semibold">*</span> are required
                </div>
              </section>

              {/* Bottom Action Buttons for Single Mode */}
              <section className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate?.("students")}
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
            /* Multiple Students (Bulk CSV Import) View */
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
                        <p className="text-xs text-gray-400 mt-0.5">Upload a CSV spreadsheet with student records</p>
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
                        <p className="text-xs text-gray-400 mt-0.5">Follow instructions to format your student data</p>
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
                            <p className="text-xs font-bold text-gray-800">Fill in Student Information</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">Add names, emails, roll numbers, programs, and contact details.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-800">Upload and Process</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">Our system will validate headers and import all students at once.</p>
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
                  onClick={() => onNavigate?.("students")}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.("students")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-emerald-600/20 w-full sm:w-auto"
                >
                  Add Students
                  <ArrowRight size={15} />
                </button>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}