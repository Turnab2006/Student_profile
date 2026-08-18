import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import {
  ArrowLeft,
  Search,
  Bell,
  ChevronDown,
  Mail,
  Phone,
  Building,
  Building2,
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
  Shield,
  User,
  Users,
  Briefcase,
  X,
  Check,
  Clock,
  CheckCircle,
  Edit3,
  Hash,
  Star,
  Download,
  Share2,
  FlaskConical,
  ClipboardList,
  Megaphone,
  Utensils,
  Trophy,
  Headphones,
  RotateCw,
  PieChart,
  Info,
  UserCheck,
  CalendarClock,
  UserX
} from "lucide-react";
import { initialStudentData } from "../../data/studentProfileData";
import tuhinaAvatar from "../../assets/tuhina_avatar.jpg";

function Barcode({ value, width = 1.25, height = 38, fontSize = 11, font = "Roboto, sans-serif" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, String(value), {
          format: "CODE128",
          width,
          height,
          displayValue: true,
          font,
          fontSize,
          fontOptions: "bold",
          margin: 0,
          background: "transparent",
          lineColor: "#0f172a",
        });
      } catch (e) {
        console.error("Barcode generation error:", e);
      }
    }
  }, [value, width, height, fontSize, font]);

  return <svg ref={svgRef} className="max-w-full" />;
}

function DigitalStudentIDSection({ student, onBack, showToast }) {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const collegeRoll = student.academicDetails?.collegeRollNo || "CSE2022077";
  const univRoll = student.academicDetails?.universityRollNo || "RTU/2022/CS/12345";
  const university = student.academicDetails?.university || "Rajasthan Technical University";
  const univRole = student.academicDetails?.universityRole || "Regular";
  const course = student.course || "B.Tech";
  const dept = student.department || "Computer Science & Engineering";
  const phone = student.phone || student.additionalDetails?.phoneNumber || "+91-9123930828";
  const collegeEmail = student.additionalDetails?.collegeEmail || "tanuka.s@edusmart.edu";
  const fullAddress =
    student.addressDetails?.fullAddress ||
    "Flat 4B, Greenwood Heights, Plot 14, Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal - 700091";

  return (
    <div className="w-full space-y-3.5 pb-8 animate-in fade-in duration-200">
      {/* 1. Top Banner / Header Card with Primary Blue Gradient & White Accents */}
      <div className="bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] rounded-2xl border border-blue-400/30 p-3.5 sm:px-5 sm:py-3.5 shadow-md shadow-blue-600/15 flex items-center justify-between gap-4 relative overflow-hidden text-white">
        {/* Subtle Decorative White Dot Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.2px, transparent 1.2px)`,
            backgroundSize: "14px 14px",
          }}
        />

        {/* Ambient Glow Effect */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Left Header Info: Frosted Back Arrow + White Shield Badge + White Title/Subtitle */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer shrink-0 -ml-1 backdrop-blur-xs shadow-2xs active:scale-95"
            title="Back to Student Profile"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="stroke-[2.4]" />
          </button>

          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-md shadow-blue-950/20 shrink-0">
            <ShieldCheck size={22} className="stroke-[2.4]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Digital Student ID
              </h1>
              <CheckCircle2 size={16} className="text-sky-300 stroke-[2.2] shrink-0" />
            </div>
            <p className="text-xs sm:text-[13px] text-blue-100/90 font-normal mt-0.5 truncate">
              Your verified digital identity for campus services and beyond
            </p>
          </div>
        </div>

        {/* Right Verified Badge (Frosted Glass Pill) */}
        <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-[13px] font-semibold backdrop-blur-md shadow-2xs shrink-0 transition-colors">
          <Shield size={14} className="text-sky-300 stroke-[2.4]" />
          <span>Verified Identity</span>
        </div>
      </div>

      {/* 2. Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Left Column (Span 7): Physical-Style Digital ID Card + Action Buttons + Blockchain Banner */}
        <div className="lg:col-span-7 space-y-3.5">

          {/* A. Digital ID Card with 3D Flip Animation */}
          <div className="space-y-2">
            <div
              className="group [perspective:1400px] w-full cursor-pointer select-none"
              onClick={() => setIsCardFlipped((prev) => !prev)}
              title="Click or hover to flip ID Card"
            >
              {/* 3D Rotating Wrapper */}
              <div
                className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] min-h-[380px] sm:min-h-[400px] ${isCardFlipped ? "[transform:rotateY(-180deg)]" : "[@media(hover:hover)]:group-hover:[transform:rotateY(-180deg)]"
                  }`}
              >
                {/* ======================================================== */}
                {/* FRONT FACE (ID card front.png)                           */}
                {/* ======================================================== */}
                <div className="w-full h-full [backface-visibility:hidden] rounded-3xl bg-white border border-slate-200/90 shadow-md p-5 sm:p-6 flex flex-col justify-between overflow-hidden">

                  {/* Top Row: Trackademy Logo & Active Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200/90 shadow-2xs p-0.5 shrink-0 overflow-hidden">
                        <img
                          src="/favicon.svg"
                          alt="Trackademy Logo"
                          className="h-full w-full object-contain rounded-full"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-[20px] font-bold text-[#0055a5] tracking-tight leading-tight">
                          Trackademy
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Empowering Future Leaders
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf9f0] border border-[#bbf0c8] text-[#16a34a] text-xs font-bold shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <span>Active</span>
                    </div>
                  </div>

                  {/* Middle Section: Soft Sky-Blue Container with Photo & Info */}
                  <div className="bg-[#edf5fb] rounded-2xl p-4 sm:p-5 border border-sky-100/90 my-2.5">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                      {/* Student Photo with Cyan-Blue Glow Border */}
                      <div className="relative shrink-0">
                        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-[3px] border-[#38bdf8] p-0.5 overflow-hidden bg-white shadow-xs flex items-center justify-center">
                          <img
                            src={tuhinaAvatar || "/tuhina_avatar.jpg"}
                            alt={student.name || "Tanuka Saha"}
                            className="h-full w-full object-cover rounded-[13px]"
                            onError={(e) => {
                              e.target.src = "/tuhina_avatar.jpg";
                            }}
                          />
                        </div>
                      </div>

                      {/* Student Credentials */}
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 flex-1 min-w-0">
                        <h3 className="text-xl sm:text-[26px] font-bold mb-2  mt-2 text-[#0055a5] tracking-tight">
                          {student.name || "Tanuka Saha"}
                        </h3>

                        <p className="text-xs sm:text-[15px] font-bold text-[#5c708a] tracking-wide pt-1 ">
                          {collegeRoll} | {univRoll}
                        </p>

                        <p className="text-xs sm:text-[15px] font-semibold text-[#5c708a] pt-1">
                          {course} | {dept}
                        </p>

                        <p className="text-xs sm:text-[15px] font-semibold text-[#5c708a] pt-1">
                          {university} ({univRole})
                        </p>

                        {/* Principle Dummy Signature */}
                        <div className="pt-2 self-center sm:self-end flex flex-col items-center sm:items-end">
                          <img
                            src="/dummy sign.svg"
                            alt="Principal Signature"
                            className="h-10 sm:h-12 w-auto object-contain brightness-90 contrast-125"
                          />
                          <p className="text-[11px] sm:text-xs font-bold text-[#0055a5] tracking-tight mt-0.5">
                            John Doe (Principle)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Valid Until & Barcode */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        VALID UNTILL
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-[#0055a5] mt-0.5 leading-none">
                        May 2027
                      </p>
                    </div>

                    {/* Barcode generated via react-barcode using student college roll number */}
                    <div className="shrink-0 flex items-center justify-end">
                      <Barcode
                        value={collegeRoll}
                        width={1.25}
                        height={38}
                        fontSize={11}
                        margin={0}
                        displayValue={true}
                        font="Roboto"
                        fontOptions="bold"
                        background="transparent"
                        lineColor="#0f172a"
                      />
                    </div>
                  </div>

                </div>

                {/* ======================================================== */}
                {/* BACK FACE (ID card back.png)                             */}
                {/* ======================================================== */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-white border border-slate-200/90 shadow-md p-5 sm:p-6 flex flex-col justify-between overflow-hidden">

                  {/* Top Row: Trackademy Logo & Active Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200/90 shadow-2xs p-0.5 shrink-0 overflow-hidden">
                        <img
                          src="/favicon.svg"
                          alt="Trackademy Logo"
                          className="h-full w-full object-contain rounded-full"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-[20px] font-bold text-[#0055a5] tracking-tight leading-tight">
                          Trackademy
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Empowering Future Leaders
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf9f0] border border-[#bbf0c8] text-[#16a34a] text-xs font-bold shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <span>Active</span>
                    </div>
                  </div>

                  {/* Middle Section: Soft Sky-Blue Container with Contact & Address */}
                  <div className="bg-[#edf5fb] rounded-2xl p-4 sm:p-5 border border-sky-100/90 space-y-3.5 my-2.5 flex-1 flex flex-col justify-center">
                    {/* Phone */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb] shrink-0 shadow-2xs">
                        <Phone size={18} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#475569]">
                        {phone}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb] shrink-0 shadow-2xs">
                        <Mail size={18} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#475569] truncate">
                        {collegeEmail}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2563eb] shrink-0 shadow-2xs mt-0.5">
                        <Home size={18} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#475569] leading-snug">
                        {fullAddress}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Valid Until & Barcode */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        VALID UNTILL
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-[#0055a5] mt-0.5 leading-none">
                        May 2027
                      </p>
                    </div>

                    {/* Barcode generated via react-barcode */}
                    <div className="shrink-0 flex items-center justify-end">
                      <Barcode
                        value={collegeRoll}
                        width={1.25}
                        height={38}
                        fontSize={11}
                        margin={0}
                        displayValue={true}
                        font="Roboto"
                        fontOptions="bold"
                        background="transparent"
                        lineColor="#0f172a"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Flip Hint */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCardFlipped((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCw
                  size={12}
                  className={`text-blue-600 transition-transform duration-500 ${isCardFlipped ? "rotate-180" : ""
                    }`}
                />
                <span>{isCardFlipped ? "Click to View Front Side" : "Click / Hover to View Back Side"}</span>
              </button>
            </div>
          </div>

          {/* B. Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <Download size={16} className="stroke-[2.2]" />
              <span>Download ID Card</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
            >
              <Share2 size={16} className="stroke-[2.2]" />
              <span>Share ID</span>
            </button>
          </div>

        </div>

        {/* Right Column (Span 5): Contact Information & Where to Use Your ID */}
        <div className="lg:col-span-5 space-y-4">

          {/* A. Contact Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-md shadow-slate-200/60 space-y-3.5">
            <div className="flex items-center gap-2.5 text-blue-600">
              <User size={18} className="stroke-[2.2]" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">Contact Information</h3>
                <p className="text-xs text-slate-400 font-normal">Linked to your student account</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {student.email || student.additionalDetails?.personalEmail || "tanuka.saha@gmail.com"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {student.phone || student.additionalDetails?.phoneNumber || "+91 91239 30828"}
                  </p>
                </div>
              </div>

              {/* Enrollment */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-blue-100 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Enrollment</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    August 2022
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* B. Where to Use Your ID Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-md shadow-slate-200/60 space-y-3.5">
            <div className="flex items-center gap-2 text-blue-600">
              <MapPin size={18} className="stroke-[2.2]" />
              <h3 className="text-sm sm:text-base font-bold text-slate-800">Where to Use Your ID</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <BookOpen size={16} />
                </div>
                <span className="truncate">Library Access</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <FlaskConical size={16} />
                </div>
                <span className="truncate">Lab Entry</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <ClipboardList size={16} />
                </div>
                <span className="truncate">Exam Halls</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <Megaphone size={16} />
                </div>
                <span className="truncate">Campus Events</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <Utensils size={16} />
                </div>
                <span className="truncate">Cafeteria</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-blue-600 shrink-0">
                  <Trophy size={16} />
                </div>
                <span className="truncate">Sports Facilities</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Footer Bar */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
            <ShieldCheck size={14} />
          </div>
          <span className="font-medium">
            This digital ID is valid across all Trackademy campus services and partner institutions.
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <Headphones size={15} className="text-blue-600" />
          <span>
            Need Help?{" "}
            <button
              type="button"
              onClick={() => showToast("Connecting to Student Support Desk...")}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Contact Support
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudentProfile({
  onBack,
  studentData: propStudentData,
  userRole = "student",
  defaultTab = "academic",
  hideHeader = false,
  showDigitalCard: propShowDigitalCard,
  onToggleDigitalCard,
}) {
  const [student] = useState(propStudentData || initialStudentData);
  const [activeTab, setActiveTab] = useState(defaultTab || "academic");
  const [internalShowDigitalCard, setInternalShowDigitalCard] = useState(false);
  const isDigitalCard = propShowDigitalCard !== undefined ? propShowDigitalCard : internalShowDigitalCard;

  const handleSetShowDigitalCard = (val) => {
    if (onToggleDigitalCard) {
      onToggleDigitalCard(val);
    }
    setInternalShowDigitalCard(val);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [showAttendanceInfo, setShowAttendanceInfo] = useState(false);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  return (
    <div className="flex-1 h-full w-full min-h-0 bg-[#EEF2F6] text-slate-800 flex flex-col overflow-hidden font-['Roboto',sans-serif]">
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

      {/* Top Header matching reference when not embedded */}
      {!hideHeader && (
        <header className="shrink-0 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 z-20 font-['Roboto',sans-serif]">
          {/* Left: Back Button & Title & Breadcrumbs */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-2xs border border-slate-200 cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft size={16} className="stroke-[2.5]" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                {isDigitalCard ? "Digital Student ID" : "Student Profile"}
              </h1>
              <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={onBack}>Home</span>
                <span className="text-slate-400">&gt;</span>
                <span
                  className={`cursor-pointer ${isDigitalCard ? "text-blue-600 hover:underline font-semibold" : "text-blue-600 font-semibold"}`}
                  onClick={() => handleSetShowDigitalCard(false)}
                >
                  Profile
                </span>
                {isDigitalCard && (
                  <>
                    <span className="text-slate-400">&gt;</span>
                    <span className="text-slate-700 font-medium">Digital ID Card</span>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Right: Search, Notifications, and User Pill */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block w-60 lg:w-68">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search profile..."
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
                title="Notifications"
              >
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs ring-2 ring-white">
                  3
                </span>
              </button>
            </div>

            {/* User Badge / Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={student.avatar || "/tanuka_saha_avatar.png"}
                alt={userRole === "admin" ? "Admin User" : student.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 shadow-2xs"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs hidden items-center justify-center shadow-2xs">
                {(student.name || "TS").slice(0, 2).toUpperCase()}
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
      )}

      {/* Main Profile Page Body with spacing matching dashboard */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:px-5 sm:py-3.5 font-['Roboto',sans-serif]">
        {isDigitalCard ? (
          <DigitalStudentIDSection
            student={student}
            onBack={() => handleSetShowDigitalCard(false)}
            showToast={showToast}
          />
        ) : (
          <div className="w-full space-y-3.5 pb-8">

            {/* ==================================================================== */}
            {/* UPPER USER INFO CARD (LIGHT BLUE / SKY GRADIENT WITH DOT PATTERN)   */}
            {/* ==================================================================== */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ebf5ff] via-[#f3f9ff] to-[#e0f0fe] border border-sky-200/80 p-4 sm:p-5 lg:p-6 shadow-xs group">

              {/* Ambient Sky/Blue Gradient Glow */}
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-sky-200/45 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-blue-200/35 rounded-full blur-3xl pointer-events-none" />

              {/* Decorative Dot Matrix on Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage: `radial-gradient(#38bdf8 1.2px, transparent 1.2px)`,
                  backgroundSize: "14px 14px",
                }}
              />

              {/* Inner Content Layout */}
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-5 sm:gap-6">

                {/* Left Column: Avatar & Middle Info */}
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
                  {/* 1. Student Avatar with White Glowing Ring */}
                  <div className="relative shrink-0">
                    <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full ring-[4px] ring-white shadow-[0_4px_18px_rgba(14,165,233,0.15)] overflow-hidden bg-white flex items-center justify-center border border-sky-200/80">
                      <img
                        src={student.avatar || "/tanuka_saha_avatar.png"}
                        alt={student.name || "Tanuka Saha"}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden h-full w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-3xl items-center justify-center">
                        {(student.name || "TS").slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* 2. Middle Student Info Details */}
                  <div className="flex flex-col items-center sm:items-start space-y-2">
                    {/* Student Full Name */}
                    <h2 className="text-2xl sm:text-[28px] font-bold text-[#0c2340] tracking-tight leading-tight">
                      {student.name || "Tanuka Saha"}
                    </h2>

                    {/* Student ID / Roll Pill Badge */}
                    <div>
                      <span className="inline-flex items-center px-3.5 py-1 mb-3 rounded-lg bg-white/90 border border-blue-200/80 text-[#1d61e7] text-xs sm:text-[13px] font-bold tracking-wide shadow-2xs">
                        {student.rollNo || student.id || "CSE2024012"}
                      </span>
                    </div>

                    {/* Contact Info, Course & Department Horizontal Row with Subtle Vertical Dividers */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 sm:gap-5 pt-1 text-xs sm:text-[13px] font-medium text-slate-700">

                      {/* Phone Number */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1d61e7] shadow-2xs border border-blue-100/90 shrink-0">
                          <Phone size={13} className="fill-[#1d61e7] stroke-[1.5]" />
                        </div>
                        <span className="font-semibold text-slate-800 tracking-tight">
                          {student.phone || student.additionalDetails?.phoneNumber || "+91 9123930828"}
                        </span>
                      </div>

                      {/* Divider 1 */}
                      <div className="hidden sm:block h-4 w-[1px] bg-slate-300/80 self-center" />

                      {/* Email ID */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1d61e7] shadow-2xs border border-blue-100/90 shrink-0">
                          <Mail size={14} className="stroke-[2.2]" />
                        </div>
                        <span className="font-semibold text-slate-800">
                          {student.email || student.additionalDetails?.personalEmail || "tanuka.saha@gmail.com"}
                        </span>
                      </div>

                      {/* Divider 2 */}
                      <div className="hidden sm:block h-4 w-[1px] bg-slate-300/80 self-center" />

                      {/* Course: B.Tech */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1d61e7] shadow-2xs border border-blue-100/90 shrink-0">
                          <GraduationCap size={14} className="stroke-[2.2]" />
                        </div>
                        <span className="font-semibold text-slate-800">
                          {student.course || "B.Tech"}
                        </span>
                      </div>

                      {/* Divider 3 */}
                      <div className="hidden sm:block h-4 w-[1px] bg-slate-300/80 self-center" />

                      {/* Department */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1d61e7] shadow-2xs border border-blue-100/90 shrink-0">
                          <Building size={14} className="stroke-[2.2]" />
                        </div>
                        <span className="font-semibold text-slate-800">
                          {student.department || "Computer Science & Engineering"}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Upper Right Action: View Digital Card Button */}
                <div className="shrink-0 flex items-center self-center md:self-start">
                  <button
                    type="button"
                    onClick={() => handleSetShowDigitalCard(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-blue-200/90 text-xs sm:text-sm font-semibold tracking-tight transition-all active:scale-95 shadow-2xs cursor-pointer group/btn"
                  >
                    <CreditCard size={15} className="text-blue-600 group-hover/btn:scale-110 transition-transform stroke-[2.2]" />
                    <span>View Digital ID Card</span>
                  </button>
                </div>

              </div>
            </div>

            {/* ==================================================================== */}
            {/* TAB NAVIGATION BUTTONS                                               */}
            {/* ==================================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-1.5 flex items-center justify-between sm:justify-start gap-1 sm:gap-2.5 overflow-x-auto">
              {/* 1. Academic Tab (Default Active) */}
              <button
                type="button"
                onClick={() => setActiveTab("academic")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${activeTab === "academic"
                  ? "text-blue-600 font-bold bg-blue-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <GraduationCap size={17} className={activeTab === "academic" ? "text-blue-600" : "text-slate-400"} />
                <span>Academics</span>
                {activeTab === "academic" && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* 2. Personal Info Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${(activeTab === "personal" || activeTab === "parents")
                  ? "text-blue-600 font-bold bg-blue-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <User size={17} className={(activeTab === "personal" || activeTab === "parents") ? "text-blue-600" : "text-slate-400"} />
                <span>Personal Info</span>
                {(activeTab === "personal" || activeTab === "parents") && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* 3. Result Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("result")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${activeTab === "result"
                  ? "text-blue-600 font-bold bg-blue-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <Clock size={17} className={activeTab === "result" ? "text-blue-600" : "text-slate-400"} />
                <span>Result</span>
                {activeTab === "result" && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* 4. Attendance Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("attendance")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${activeTab === "attendance"
                  ? "text-blue-600 font-bold bg-blue-50/70"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                <Calendar size={17} className={activeTab === "attendance" ? "text-blue-600" : "text-slate-400"} />
                <span>Attendance</span>
                {activeTab === "attendance" && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {/* ==================================================================== */}
            {/* TAB 1: ACADEMIC DETAILS (DEFAULT ACTIVE)                             */}
            {/* ==================================================================== */}
            {activeTab === "academic" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* 1. Academic Information Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <FileText size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Academic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                    {/* 1. University / Institution */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Building2 size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">University / Institution</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.academicDetails?.institution || "Rajasthan Technical University, Kota"}>
                          {student.academicDetails?.institution || "Rajasthan Technical University, Kota"}
                        </p>
                      </div>
                    </div>

                    {/* 2. University Role */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">University Role</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.universityRole || "Regular"}
                        </p>
                      </div>
                    </div>

                    {/* 3. Admission Batch */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CalendarDays size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Admission Batch</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.admissionBatch || student.batch || "2022 - 2026"}
                        </p>
                      </div>
                    </div>

                    {/* 4. ABCD ID / ABC ID */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">ABCD ID</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider truncate">
                          {student.academicDetails?.abcId || "ABCD1234567890"}
                        </p>
                      </div>
                    </div>

                    {/* 5. Registration Number */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileText size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Registration Number</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.registrationNumber || student.registrationNo || "22CS100123"}
                        </p>
                      </div>
                    </div>

                    {/* 6. University Roll No */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Hash size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">University Roll No</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.enrollmentNumber || student.rollNo || "RTU/2022/CS/12345"}
                        </p>
                      </div>
                    </div>

                    {/* 7. Current Year */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Award size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Current Year</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.currentYear || student.year || "Third Year"}
                        </p>
                      </div>
                    </div>

                    {/* 8. Current Semester */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <GraduationCap size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Current Semester</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.currentSemester || student.semester || "VI Semester"}
                        </p>
                      </div>
                    </div>

                    {/* 9. College Roll Number */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Hash size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">College Roll Number</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.academicDetails?.collegeRollNo || student.collegeRoll || "CSE2022077"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Mentor Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <Users size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Mentor Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
                    {/* Left Column: Avatar & Mentor Name/Department */}
                    <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
                      {/* Mentor Profile Image with Star Badge */}
                      <div className="relative shrink-0">
                        <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <img
                            src={student.mentorDetails?.avatar || "/rahul_sharma_avatar.png"}
                            alt={student.mentorDetails?.name || "Mentor"}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="hidden h-full w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl items-center justify-center">
                            {(student.mentorDetails?.name || "RS").slice(0, 2).toUpperCase()}
                          </div>
                        </div>

                        {/* Small Star Badge at bottom right */}
                        <div className="absolute bottom-0.5 right-0.5 h-7 w-7 rounded-full bg-emerald-500 text-white ring-2 ring-white flex items-center justify-center shadow-sm">
                          <Star size={13} className="fill-white stroke-[1.5]" />
                        </div>
                      </div>

                      {/* Mentor Name & Department */}
                      <div className="space-y-2.5">
                        <div>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Mentor Name
                          </p>
                          <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                            {student.mentorDetails?.name || student.mentor || "Prof. Rahul Sharma"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Department
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                            {student.mentorDetails?.department || student.department || "Computer Science Engineering"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Divider for Desktop */}
                    <div className="hidden lg:flex lg:col-span-1 justify-center">
                      <div className="h-24 w-[1px] bg-slate-200/80" />
                    </div>

                    {/* Right Column: Email, Phone, Office Location */}
                    <div className="lg:col-span-5 space-y-3">
                      {/* Email */}
                      <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Mail size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate" title={student.mentorDetails?.email || "rahul.sharma@edusmart.edu"}>
                            {student.mentorDetails?.email || "rahul.sharma@edusmart.edu"}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Phone size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone</p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {student.mentorDetails?.phone || "+91 91234 56789"}
                          </p>
                        </div>
                      </div>

                      {/* Office Location */}
                      <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <MapPin size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Office Location</p>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {student.mentorDetails?.officeLocation || "Block B, Room 203"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================================== */}
            {/* TAB 2: PERSONAL INFO (ADDITIONAL, ADDRESS & PARENTS DETAILS)          */}
            {/* ==================================================================== */}
            {(activeTab === "personal" || activeTab === "parents") && (
              <div className="space-y-3.5 animate-in fade-in duration-200">

                {/* 1. Additional Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <FileText size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Additional Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                    {/* Personal Email */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Personal Email</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.additionalDetails?.personalEmail || student.email || "tanuka.saha@gmail.com"}>
                          {student.additionalDetails?.personalEmail || student.email || "tanuka.saha@gmail.com"}
                        </p>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Phone size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {student.additionalDetails?.phoneNumber || student.phone || "+91 9123930828"}
                        </p>
                      </div>
                    </div>

                    {/* College Email */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">College Email</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.additionalDetails?.collegeEmail || "tanuka.s@edusmart.edu"}>
                          {student.additionalDetails?.collegeEmail || "tanuka.s@edusmart.edu"}
                        </p>
                      </div>
                    </div>

                    {/* Blood Group */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Droplet size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Blood Group</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {student.additionalDetails?.bloodGroup || "O+"}
                        </p>
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CalendarDays size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Date of Birth</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {student.additionalDetails?.dateOfBirth || "12 May 2004"}
                        </p>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Gender</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {student.additionalDetails?.gender || student.gender || "Female"}
                        </p>
                      </div>
                    </div>

                    {/* Aadhar Card Number */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CreditCard size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Aadhar Card Number</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-wider">
                          {student.additionalDetails?.aadharCardNumber || "4521 8901 2345"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Address Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <MapPin size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Address Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                    {/* Country */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Globe size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Country</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{student.addressDetails?.country || "India"}</p>
                      </div>
                    </div>

                    {/* State */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BookOpen size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">State</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{student.addressDetails?.state || "West Bengal"}</p>
                      </div>
                    </div>

                    {/* District */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Building size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">District</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{student.addressDetails?.district || "Kolkata"}</p>
                      </div>
                    </div>

                    {/* Pin Code */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MapPin size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Pin Code</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">{student.addressDetails?.pinCode || "700091"}</p>
                      </div>
                    </div>

                    {/* Postal Address */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Postal Address</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.addressDetails?.postalAddress || "Plot 14, Salt Lake Sector V"}>
                          {student.addressDetails?.postalAddress || "Plot 14, Salt Lake Sector V"}
                        </p>
                      </div>
                    </div>

                    {/* Police Station */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Police Station</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.addressDetails?.policeStation || "Bidhannagar East Police Station"}>
                          {student.addressDetails?.policeStation || "Bidhannagar East Police Station"}
                        </p>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Home size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Address</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {student.addressDetails?.fullAddress || "Flat 4B, Greenwood Heights, Plot 14, Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal - 700091"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Combined Parents Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-4">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <Users size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Parents Details
                    </h3>
                  </div>

                  {/* Father's Details Sub-section */}
                  <div className="space-y-2.5 pt-0.5">
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                        Father&apos;s Details
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {/* Full Name */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <User size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Name</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.fatherDetails?.fullName || "Subhash Saha"}</p>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Mail size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email Address</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.fatherDetails?.emailAddress || "subhash.saha@gmail.com"}>
                            {student.fatherDetails?.emailAddress || "subhash.saha@gmail.com"}
                          </p>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Phone size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.fatherDetails?.phoneNumber || "+91 9123930820"}</p>
                        </div>
                      </div>

                      {/* Occupation */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Briefcase size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Occupation</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.fatherDetails?.occupation || "Business Executive"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Divider */}
                  <div className="border-t border-slate-100 my-1" />

                  {/* Mother's Details Sub-section */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                        Mother&apos;s Details
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {/* Full Name */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <User size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Full Name</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.motherDetails?.fullName || "Ananya Saha"}</p>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Mail size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email Address</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={student.motherDetails?.emailAddress || "ananya.saha@gmail.com"}>
                            {student.motherDetails?.emailAddress || "ananya.saha@gmail.com"}
                          </p>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Phone size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Phone Number</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.motherDetails?.phoneNumber || "+91 9123930821"}</p>
                        </div>
                      </div>

                      {/* Occupation */}
                      <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-[#fafcff] hover:border-blue-200 transition-colors">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Briefcase size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Occupation</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{student.motherDetails?.occupation || "Professor"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Note Footer */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 text-blue-900 text-xs sm:text-sm shadow-2xs mt-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
                      i
                    </div>
                    <p className="font-medium text-slate-700">
                      For any correction in parent or personal details, please contact the administration office.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================================== */}
            {/* TAB 3: RESULT DETAILS                                                */}
            {/* ==================================================================== */}
            {activeTab === "result" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* 1. Academic Grade Performance Card (Combined) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-blue-600 border-b border-slate-100 pb-3">
                    <Award size={18} className="stroke-[2.2]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      Academic Grade Performance
                    </h3>
                  </div>

                  {/* Semester Progression Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-0.5">
                    {(student.resultDetails?.semesters || []).map((s, idx) => (
                      <div
                        key={s.sem}
                        className={`p-3.5 rounded-xl border text-center transition-all ${idx === 5
                          ? "bg-blue-50/60 border-blue-300 ring-2 ring-blue-100/80"
                          : "bg-[#fafcff] border-slate-100 hover:border-blue-200"
                          }`}
                      >
                        <p className="text-xs font-bold text-slate-500">{s.sem}</p>
                        <p className="text-xl sm:text-2xl font-extrabold text-blue-700 my-1.5">
                          {s.sgpa}
                        </p>
                        <span
                          className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${s.status === "Passed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Semester Detailed Grade Table */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-md shadow-slate-200/60 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Award size={18} />
                      <h4 className="text-sm sm:text-base font-bold text-slate-800">Last Published Result (Semester 5)</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      SGPA: 9.55 (First Class with Distinction)
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-3">Subject Code</th>
                          <th className="py-2.5 px-3">Subject Name</th>
                          <th className="py-2.5 px-3">Internal</th>
                          <th className="py-2.5 px-3">Theory</th>
                          <th className="py-2.5 px-3">Total</th>
                          <th className="py-2.5 px-3">Grade</th>
                          <th className="py-2.5 px-3">Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(student.resultDetails?.sem5Grades || []).map((g) => (
                          <tr key={g.code} className="hover:bg-slate-50/60">
                            <td className="py-2.5 px-3 font-semibold text-blue-600 text-xs">{g.code}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-800 text-xs sm:text-sm">{g.subject}</td>
                            <td className="py-2.5 px-3 text-xs text-slate-600">{g.internal}</td>
                            <td className="py-2.5 px-3 text-xs text-slate-600">{g.theory}</td>
                            <td className="py-2.5 px-3 text-xs font-bold text-slate-800">{g.total}</td>
                            <td className="py-2.5 px-3">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs">
                                {g.grade}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-700 text-xs sm:text-sm">{g.gradePoint}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================================== */}
            {/* TAB 4: ATTENDANCE DETAILS                                            */}
            {/* ==================================================================== */}
            {activeTab === "attendance" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Top Attendance Metric Header */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* 1. Overall Attendance (Emerald Theme) */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-emerald-200 transition-colors">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
                      <CheckCircle2 size={24} className="stroke-[2.2]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overall Attendance</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-0.5">
                        {student.attendanceDetails?.overallPercentage || "95.0"}%
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">Above minimum (75%)</p>
                    </div>
                  </div>

                  {/* 2. Present Classes (Blue Theme) */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-blue-200 transition-colors">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 shadow-2xs">
                      <UserCheck size={24} className="stroke-[2.2]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Present Classes</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-0.5">
                        {student.attendanceDetails?.presentDays || 172} / {student.attendanceDetails?.totalWorkingDays || 180}
                      </p>
                      <p className="text-[11px] text-blue-600 font-medium truncate">Recorded lectures</p>
                    </div>
                  </div>

                  {/* 3. Leaves Approved (Yellow Theme) */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-amber-200 transition-colors">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-2xs">
                      <CalendarClock size={24} className="stroke-[2.2]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Leaves Approved</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-0.5">
                        {student.attendanceDetails?.leavesApproved || 6} Days
                      </p>
                      <p className="text-[11px] text-amber-600 font-medium truncate">Medical & Event excused</p>
                    </div>
                  </div>

                  {/* 4. Absence Status (Rose Theme) */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex items-center gap-3.5 hover:border-rose-200 transition-colors">
                    <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/80 shadow-2xs">
                      <UserX size={24} className="stroke-[2.2]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Absence Status</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-rose-600 mt-0.5">
                        {student.attendanceDetails?.unexcusedAbsent || 2} Days
                      </p>
                      <p className="text-[11px] text-rose-500 font-medium truncate">Regular standing</p>
                    </div>
                  </div>
                </div>

                {/* Subject Attendance Overview Card (Matching Reference Image) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-md shadow-slate-200/60 space-y-5">
                  {/* Header with Hover Pop-up Info Icon */}
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] border border-blue-100 text-blue-600 shrink-0 shadow-2xs">
                      <BookOpen size={20} className="stroke-[2.2]" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                        Subject Attendance Overview
                      </h3>
                      
                      {/* Interactive Info Button with Hover Pop-up */}
                      <div
                        className="relative inline-flex items-center group"
                        onMouseEnter={() => setShowAttendanceInfo(true)}
                        onMouseLeave={() => setShowAttendanceInfo(false)}
                      >
                        <button
                          type="button"
                          onClick={() => setShowAttendanceInfo(!showAttendanceInfo)}
                          className="h-6 w-6 rounded-full flex items-center justify-center transition-all cursor-pointer bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200/70 hover:border-blue-600 shadow-2xs hover:shadow-xs"
                          aria-label="Subject Attendance Information"
                        >
                          <Info size={13} className="stroke-[2.4]" />
                        </button>

                        {/* Hover Pop-up Tooltip */}
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 w-72 sm:w-80 p-3 rounded-xl bg-slate-900/95 text-white shadow-xl backdrop-blur-md border border-slate-700/80 z-30 transition-all duration-200 pointer-events-none ${
                            showAttendanceInfo
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                          }`}
                        >
                          {/* Arrow Pointer */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 sm:left-2.5 sm:translate-x-0 w-3 h-3 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
                          
                          <div className="relative flex items-start gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white mt-0.5 shadow-2xs">
                              <Info size={11} className="stroke-[2.5]" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-slate-100 leading-snug">
                                Attendance Details
                              </p>
                              <p className="text-[11px] text-slate-300 font-normal leading-relaxed">
                                View your attendance percentage and class summary for each subject.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Layout */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#f0f6ff]/90 text-xs font-bold text-[#1d61e7] rounded-xl overflow-hidden">
                          <th className="py-4 px-5 rounded-l-xl">
                            <div className="flex items-center gap-2">
                              <Hash size={14} className="text-[#1d61e7] stroke-[2.4]" />
                              <span>SUBJECT CODE</span>
                            </div>
                          </th>
                          <th className="py-4 px-5">
                            <div className="flex items-center gap-2">
                              <BookOpen size={14} className="text-[#1d61e7] stroke-[2.4]" />
                              <span>SUBJECT NAME</span>
                            </div>
                          </th>
                          <th className="py-4 px-5">
                            <div className="flex items-center gap-2">
                              <PieChart size={14} className="text-[#1d61e7] stroke-[2.4]" />
                              <span>ATTENDANCE %</span>
                            </div>
                          </th>
                          <th className="py-4 px-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Calendar size={14} className="text-[#1d61e7] stroke-[2.4]" />
                              <span>CLASSES ATTENDED</span>
                            </div>
                          </th>
                          <th className="py-4 px-5 rounded-r-xl">
                            <div className="flex items-center gap-2">
                              <Award size={14} className="text-[#1d61e7] stroke-[2.4]" />
                              <span>STATUS</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(student.attendanceDetails?.subjectAttendanceDetails || [
                          { code: "CS301", subject: "Data Structures", attended: 57, total: 60, percentage: 95 },
                          { code: "CS302", subject: "Algorithms", attended: 47, total: 60, percentage: 78 },
                          { code: "CS303", subject: "Database Systems", attended: 53, total: 60, percentage: 88 },
                          { code: "CS304", subject: "Operating Systems", attended: 37, total: 60, percentage: 62 },
                          { code: "CS305", subject: "Computer Networks", attended: 55, total: 60, percentage: 91 },
                          { code: "CS306", subject: "Software Engineering", attended: 27, total: 60, percentage: 45 },
                        ]).map((item) => {
                          const pct = Number(item.percentage) || 0;
                          let barColor = "bg-[#22c55e]"; // Green (>80%)
                          let statusLabel = "Excellent";
                          let statusBadge = "bg-[#edf9f0] text-[#16a34a]";
                          let dotColor = "bg-[#16a34a]";

                          if (pct < 75) {
                            barColor = "bg-[#ef4444]"; // Red (<75%)
                            statusLabel = "At Risk";
                            statusBadge = "bg-[#fef2f2] text-[#dc2626]";
                            dotColor = "bg-[#dc2626]";
                          } else if (pct <= 80) {
                            barColor = "bg-[#f59e0b]"; // Yellow/Amber (75% to 80%)
                            statusLabel = "Good";
                            statusBadge = "bg-[#fef8eb] text-[#d97706]";
                            dotColor = "bg-[#d97706]";
                          } else if (pct < 90) {
                            barColor = "bg-[#22c55e]"; // Green (>80%)
                            statusLabel = "Very Good";
                            statusBadge = "bg-[#edf5fb] text-[#2563eb]";
                            dotColor = "bg-[#2563eb]";
                          }

                          return (
                            <tr key={item.code} className="hover:bg-slate-50/70 transition-colors">
                              {/* 1. Subject Code */}
                              <td className="py-4 px-5 font-bold text-blue-600 text-sm tracking-tight">
                                {item.code}
                              </td>

                              {/* 2. Subject Name */}
                              <td className="py-4 px-5 font-semibold text-slate-800 text-sm">
                                {item.subject}
                              </td>

                              {/* 3. Attendance % (Progress Bar + Percentage Value) */}
                              <td className="py-4 px-5">
                                <div className="flex items-center gap-3 sm:gap-4">
                                  <div className="w-28 sm:w-36 bg-slate-100 rounded-full h-2 overflow-hidden shrink-0">
                                    <div
                                      className={`h-full rounded-full ${barColor} transition-all duration-500`}
                                      style={{ width: `${Math.min(pct, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-extrabold text-slate-800 shrink-0">
                                    {pct}%
                                  </span>
                                </div>
                              </td>

                              {/* 4. Classes Attended (Aligned in the middle with header) */}
                              <td className="py-4 px-5 text-center font-bold text-slate-800 text-sm">
                                {item.attended} / {item.total}
                              </td>

                              {/* 5. Status Badge */}
                              <td className="py-4 px-5">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${statusBadge} shadow-2xs`}
                                >
                                  <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                                  <span>{statusLabel}</span>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
