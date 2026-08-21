import { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import {
  User,
  Briefcase,
  Phone,
  Mail,
  Building2,
  Building,
  GraduationCap,
  CalendarDays,
  IdCard,
  CheckCircle2,
  CheckCircle,
  Clock,
  MapPin,
  BookOpen,
  ShieldCheck,
  Shield,
  Check,
  CreditCard,
  ArrowLeft,
  RotateCw,
  Download,
  Share2,
  Home,
  Headphones,
  FlaskConical,
  ClipboardList,
  Utensils,
  Trophy,
  X
} from 'lucide-react';
import { MENTOR_DETAILS } from '../../data/mentorData';

function Barcode({ value, width = 1.25, height = 38, fontSize = 11, font = 'Roboto, sans-serif' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, String(value), {
          format: 'CODE128',
          width,
          height,
          displayValue: true,
          font,
          fontSize,
          fontOptions: 'bold',
          margin: 0,
          background: 'transparent',
          lineColor: '#0f172a',
        });
      } catch (e) {
        console.error('Barcode generation error:', e);
      }
    }
  }, [value, width, height, fontSize, font]);

  return <svg ref={svgRef} className="max-w-full" />;
}

function DigitalMentorIDSection({ mentor = MENTOR_DETAILS, onBack, showToast }) {
  const currentMentor = mentor || MENTOR_DETAILS;
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const empId = currentMentor.empId || currentMentor.employeeId || MENTOR_DETAILS.empId;
  const department = currentMentor.department || MENTOR_DETAILS.department;
  const designation = currentMentor.designation || MENTOR_DETAILS.designation;
  const phone = currentMentor.phone || MENTOR_DETAILS.phone;
  const collegeEmail = currentMentor.collegeEmail || currentMentor.email || MENTOR_DETAILS.collegeEmail;
  const fullAddress = currentMentor.location || MENTOR_DETAILS.location;

  return (
    <div className="w-full space-y-3.5 pb-8 animate-in fade-in duration-200">
      {/* 1. Top Banner / Header Card with Deep Vibrant Purple Gradient */}
      <div className="bg-gradient-to-r from-[#4f2bd8] via-[#633ef2] to-[#7450fa] rounded-2xl border border-purple-300/30 p-3.5 sm:px-5 sm:py-3.5 shadow-lg shadow-purple-950/20 flex items-center justify-between gap-4 relative overflow-hidden text-white">
        {/* Subtle Decorative White Dot Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.2px, transparent 1.2px)`,
            backgroundSize: '14px 14px',
          }}
        />

        {/* Ambient Glow Effect */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

        {/* Left Header Info: Back Arrow + Shield Badge + Title */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer shrink-0 -ml-1 backdrop-blur-xs shadow-2xs active:scale-95"
            title="Back to Mentor Profile"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="stroke-[2.4]" />
          </button>

          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white text-[#5531dc] shadow-md shadow-purple-950/30 shrink-0">
            <ShieldCheck size={22} className="stroke-[2.4]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Digital Faculty & Mentor ID
              </h1>
              <CheckCircle2 size={16} className="text-purple-200 stroke-[2.2] shrink-0" />
            </div>
            <p className="text-xs sm:text-[13px] text-purple-100/90 font-normal mt-0.5 truncate">
              Verified digital faculty identity for academic and mentorship access
            </p>
          </div>
        </div>

        {/* Right Verified Badge (Frosted Glass Pill) */}
        <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-[13px] font-semibold backdrop-blur-md shadow-2xs shrink-0 transition-colors">
          <Shield size={14} className="text-purple-200 stroke-[2.4]" />
          <span>Verified Faculty</span>
        </div>
      </div>

      {/* 2. Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Left Column (Span 7): Physical-Style Digital ID Card + Action Buttons */}
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
                className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] min-h-[380px] sm:min-h-[400px] ${
                  isCardFlipped ? '[transform:rotateY(-180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(-180deg)]'
                }`}
              >
                {/* ======================================================== */}
                {/* FRONT FACE (Mentor ID Card)                              */}
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
                        <h2 className="text-lg sm:text-[20px] font-bold text-[#4927b5] tracking-tight leading-tight">
                          Trackademy
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Faculty & Mentor Directory
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf9f0] border border-[#bbf0c8] text-[#16a34a] text-xs font-bold shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <span>Active Faculty</span>
                    </div>
                  </div>

                  {/* Middle Section: Soft Lavender/Purple Container with Photo & Info */}
                  <div className="bg-[#f6f2fe] rounded-2xl p-4 sm:p-5 border border-purple-100/90 my-2.5">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                      {/* Mentor Photo with Purple Ring */}
                      <div className="relative shrink-0">
                        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-[3px] border-[#6846f6] p-0.5 overflow-hidden bg-white shadow-xs flex items-center justify-center">
                          <img
                            src={mentor.avatar}
                            alt={mentor.fullName}
                            className="h-full w-full object-cover rounded-[13px]"
                          />
                        </div>
                      </div>

                      {/* Mentor Credentials */}
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 flex-1 min-w-0">
                        <h3 className="text-xl sm:text-[24px] font-bold mb-1 mt-1 text-[#4927b5] tracking-tight">
                          {mentor.fullName}
                        </h3>

                        <p className="text-xs sm:text-[14px] font-bold text-[#64748b] tracking-wide">
                          Employee ID: {empId}
                        </p>

                        <p className="text-xs sm:text-[14px] font-semibold text-[#64748b]">
                          {designation}
                        </p>

                        <p className="text-xs sm:text-[14px] font-semibold text-[#64748b]">
                          {department}
                        </p>

                        {/* Principal Signature */}
                        <div className="pt-2 self-center sm:self-end flex flex-col items-center sm:items-end">
                          <img
                            src="/dummy sign.svg"
                            alt="Director Signature"
                            className="h-10 sm:h-12 w-auto object-contain brightness-90 contrast-125"
                          />
                          <p className="text-[11px] sm:text-xs font-bold text-[#4927b5] tracking-tight mt-0.5">
                            Dean / Director
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Valid Until & Barcode */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        VALID UNTIL
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-[#4927b5] mt-0.5 leading-none">
                        Permanent / Active
                      </p>
                    </div>

                    {/* Barcode generated via react-barcode using employee ID */}
                    <div className="shrink-0 flex items-center justify-end">
                      <Barcode
                        value={`EMP${empId}`}
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
                {/* BACK FACE                                                */}
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
                        <h2 className="text-lg sm:text-[20px] font-bold text-[#4927b5] tracking-tight leading-tight">
                          Trackademy
                        </h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Faculty & Mentor Directory
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edf9f0] border border-[#bbf0c8] text-[#16a34a] text-xs font-bold shadow-2xs">
                      <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      <span>Active Faculty</span>
                    </div>
                  </div>

                  {/* Middle Section: Soft Lavender Container with Contact & Location */}
                  <div className="bg-[#f6f2fe] rounded-2xl p-4 sm:p-5 border border-purple-100/90 space-y-3.5 my-2.5 flex-1 flex flex-col justify-center">
                    {/* Phone */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#6846f6] shrink-0 shadow-2xs">
                        <Phone size={18} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#475569]">
                        {phone}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#6846f6] shrink-0 shadow-2xs">
                        <Mail size={18} className="stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#475569] truncate">
                        {collegeEmail}
                      </span>
                    </div>

                    {/* Address / Office */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#6846f6] shrink-0 shadow-2xs mt-0.5">
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
                        VALID UNTIL
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-[#4927b5] mt-0.5 leading-none">
                        Permanent / Active
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center justify-end">
                      <Barcode
                        value={`EMP${empId}`}
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-[#6846f6] text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCw
                  size={12}
                  className={`text-[#6846f6] transition-transform duration-500 ${
                    isCardFlipped ? 'rotate-180' : ''
                  }`}
                />
                <span>{isCardFlipped ? 'Click to View Front Side' : 'Click / Hover to View Back Side'}</span>
              </button>
            </div>
          </div>

          {/* B. Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => showToast('Downloading Faculty Digital ID Card...')}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#6846f6] hover:bg-[#5531dc] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <Download size={16} className="stroke-[2.2]" />
              <span>Download ID Card</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Digital ID card link copied to clipboard!')}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
            >
              <Share2 size={16} className="stroke-[2.2]" />
              <span>Share ID</span>
            </button>
          </div>
        </div>

        {/* Right Column (Span 5): Faculty Contact Info & Where to Use Your ID */}
        <div className="lg:col-span-5 space-y-4">
          {/* A. Faculty Contact Information Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-md shadow-slate-200/60 space-y-3.5">
            <div className="flex items-center gap-2.5 text-[#6846f6]">
              <User size={18} className="stroke-[2.2]" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">Faculty Contact Details</h3>
                <p className="text-xs text-slate-400 font-normal">Linked to faculty & mentorship portal</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* College Email */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 hover:border-purple-200 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#6846f6]">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">College Email</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {mentor.collegeEmail}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 hover:border-purple-200 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#6846f6]">
                  <Phone size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Phone Number</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {mentor.phone}
                  </p>
                </div>
              </div>

              {/* Date of Joining */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 hover:border-purple-200 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#6846f6]">
                  <CalendarDays size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Date of Joining</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {mentor.joiningDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* B. Where to Use Your Faculty ID Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-md shadow-slate-200/60 space-y-3.5">
            <div className="flex items-center gap-2 text-[#6846f6]">
              <MapPin size={18} className="stroke-[2.2]" />
              <h3 className="text-sm sm:text-base font-bold text-slate-800">Faculty Privileges & Access</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <BookOpen size={16} />
                </div>
                <span className="truncate">Central Library</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <FlaskConical size={16} />
                </div>
                <span className="truncate">Research Labs</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <ClipboardList size={16} />
                </div>
                <span className="truncate">Exam Control</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <Building size={16} />
                </div>
                <span className="truncate">Faculty Lounge</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <Utensils size={16} />
                </div>
                <span className="truncate">Faculty Dining</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f8f5fe] border border-purple-100 text-slate-800 text-xs sm:text-sm font-semibold hover:border-purple-300 hover:bg-[#f2ecfd] transition-colors">
                <div className="text-[#6846f6] shrink-0">
                  <Trophy size={16} />
                </div>
                <span className="truncate">Sports Complex</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer Bar */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-50 text-[#6846f6] shrink-0">
            <ShieldCheck size={14} />
          </div>
          <span className="font-medium">
            This digital faculty ID is verified and valid across all Trackademy institutional facilities.
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <Headphones size={15} className="text-[#6846f6]" />
          <span>
            Need Help?{' '}
            <button
              type="button"
              onClick={() => showToast('Connecting to Faculty IT Support Desk...')}
              className="text-[#6846f6] font-semibold hover:underline cursor-pointer"
            >
              Contact Support
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MentorProfilePage({ mentorData: propMentorData }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [showDigitalCard, setShowDigitalCard] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Mentor data populated with all fields from centralized MENTOR_DETAILS dataset
  const mentor = propMentorData || MENTOR_DETAILS;

  return (
    <div className="w-full space-y-3.5 pb-8 font-['Roboto',sans-serif]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#5531dc] text-white px-5 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-purple-200 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {showDigitalCard ? (
        <DigitalMentorIDSection
          mentor={mentor}
          onBack={() => setShowDigitalCard(false)}
          showToast={showToast}
        />
      ) : (
        <>
          {/* ==================================================================== */}
          {/* UPPER USER INFO CARD (DEEPER VIBRANT PURPLE GRADIENT WITH CONTRAST) */}
          {/* ==================================================================== */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4d2db7] via-[#5c37d8] to-[#7048f0] border border-purple-300/30 p-4 sm:p-5 lg:p-6 shadow-lg shadow-purple-950/15 group text-white">
            {/* Ambient Purple/Indigo Gradient Glow */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

            {/* Decorative Dot Matrix on Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: `radial-gradient(#ffffff 1.2px, transparent 1.2px)`,
                backgroundSize: '14px 14px',
              }}
            />

            {/* ==================================================================== */}
            {/* 1. DESKTOP VIEW (hidden on mobile, flex on md and above)              */}
            {/* ==================================================================== */}
            <div className="relative z-10 hidden md:flex items-start justify-between gap-6">
              {/* Left Column: Avatar & Details */}
              <div className="flex items-center gap-6">
                {/* Mentor Avatar with White Ring */}
                <div className="relative shrink-0">
                  <div className="h-28 w-28 lg:h-32 lg:w-32 rounded-full ring-[4px] ring-white shadow-xl shadow-purple-950/40 overflow-hidden bg-white flex items-center justify-center border border-white/40">
                    <img
                      src={mentor.avatar}
                      alt={mentor.fullName}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-full w-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-3xl items-center justify-center">
                      {(mentor.firstName || 'K').charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Middle Mentor Info Details */}
                <div className="flex flex-col items-start space-y-2">
                  {/* Mentor Full Name */}
                  <h2 className="text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-tight">
                    {mentor.fullName}
                  </h2>

                  {/* Employee ID & Status Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-lg bg-white/20 border border-white/30 text-white text-xs lg:text-[13px] font-bold tracking-wide shadow-2xs backdrop-blur-md">
                      Employee ID: {mentor.empId}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 font-bold text-xs rounded-lg shadow-2xs backdrop-blur-md">
                      <Check size={13} className="stroke-[3]" /> {mentor.status}
                    </span>
                  </div>

                  {/* Contact Info & Department Horizontal Row with Subtle Vertical Dividers */}
                  <div className="flex flex-wrap items-center justify-start gap-4 lg:gap-5 pt-1 text-xs lg:text-[13px] font-medium text-purple-100">
                    {/* Phone Number */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                        <Phone size={13} className="fill-white stroke-[1.5]" />
                      </div>
                      <span className="font-semibold text-white tracking-tight">
                        {mentor.phone}
                      </span>
                    </div>

                    {/* Divider 1 */}
                    <div className="h-4 w-[1px] bg-white/25 self-center" />

                    {/* Email ID */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                        <Mail size={14} className="stroke-[2.2]" />
                      </div>
                      <span className="font-semibold text-white">
                        {mentor.collegeEmail}
                      </span>
                    </div>

                    {/* Divider 2 */}
                    <div className="h-4 w-[1px] bg-white/25 self-center" />

                    {/* Department */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                        <Building2 size={14} className="stroke-[2.2]" />
                      </div>
                      <span className="font-semibold text-white">
                        {mentor.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upper Right Action: View Digital Card Button */}
              <div className="shrink-0 flex items-center self-start">
                <button
                  type="button"
                  onClick={() => setShowDigitalCard(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#5531dc] font-bold text-xs lg:text-sm tracking-tight transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer group/btn"
                >
                  <CreditCard size={15} className="text-[#5531dc] group-hover/btn:scale-110 transition-transform stroke-[2.2]" />
                  <span>View Digital ID Card</span>
                </button>
              </div>
            </div>

            {/* ==================================================================== */}
            {/* 2. MOBILE VIEW (flex on mobile, hidden on md and above)               */}
            {/* ==================================================================== */}
            <div className="relative z-10 flex md:hidden flex-col items-center w-full">
              {/* 1. Top Corner: View Digital ID Card Button */}
              <div className="w-full flex justify-end mb-1">
                <button
                  type="button"
                  onClick={() => setShowDigitalCard(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-[#5531dc] font-bold text-xs tracking-tight transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer group/btn"
                >
                  <CreditCard size={14} className="text-[#5531dc] group-hover/btn:scale-110 transition-transform stroke-[2.2]" />
                  <span>View Digital ID Card</span>
                </button>
              </div>

              {/* 2. Middle: Profile Image */}
              <div className="relative shrink-0 mb-3">
                <div className="h-24 w-24 rounded-full ring-[4px] ring-white shadow-xl shadow-purple-950/40 overflow-hidden bg-white flex items-center justify-center border border-white/40 mx-auto">
                  <img
                    src={mentor.avatar}
                    alt={mentor.fullName}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden h-full w-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-3xl items-center justify-center">
                    {(mentor.firstName || 'K').charAt(0)}
                  </div>
                </div>
              </div>

              {/* Mentor Full Name & Badges */}
              <div className="flex flex-col items-center text-center space-y-1 mb-3">
                <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  {mentor.fullName}
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-lg bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide shadow-2xs backdrop-blur-md">
                    Employee ID: {mentor.empId}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 font-bold text-xs rounded-lg shadow-2xs backdrop-blur-md">
                    <Check size={13} className="stroke-[3]" /> {mentor.status}
                  </span>
                </div>
              </div>

              {/* 3. Details in TWO ROWS */}
              <div className="w-full max-w-2xl flex flex-col items-center gap-2 text-xs font-medium text-purple-100">
                {/* Row 1: Contact Info (Phone & Email) */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                      <Phone size={12} className="fill-white stroke-[1.5]" />
                    </div>
                    <span className="font-semibold text-white tracking-tight">
                      {mentor.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                      <Mail size={13} className="stroke-[2.2]" />
                    </div>
                    <span className="font-semibold text-white">
                      {mentor.collegeEmail}
                    </span>
                  </div>
                </div>

                {/* Row 2: Department */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white shadow-2xs border border-white/25 shrink-0 backdrop-blur-xs">
                      <Building2 size={13} className="stroke-[2.2]" />
                    </div>
                    <span className="font-semibold text-white">
                      {mentor.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* TAB NAVIGATION BUTTONS (SINGLE LINE ON ALL DEVICES)                  */}
          {/* ==================================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-1.5 flex items-center justify-start gap-1 sm:gap-2.5 overflow-x-auto scrollbar-none flex-nowrap">
            {/* 1. Personal & Contact Details (Default Active) */}
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'personal'
                  ? 'text-[#5531dc] font-bold bg-[#f6f2fe]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User size={16} className={activeTab === 'personal' ? 'text-[#5531dc]' : 'text-slate-400'} />
              <span className="whitespace-nowrap">Personal & Contact Info</span>
              {activeTab === 'personal' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#5531dc] rounded-full" />
              )}
            </button>

            {/* 2. Professional & Academic Details */}
            <button
              type="button"
              onClick={() => setActiveTab('professional')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === 'professional'
                  ? 'text-[#5531dc] font-bold bg-[#f6f2fe]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase size={16} className={activeTab === 'professional' ? 'text-[#5531dc]' : 'text-slate-400'} />
              <span className="whitespace-nowrap">Professional Details</span>
              {activeTab === 'professional' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#5531dc] rounded-full" />
              )}
            </button>
          </div>


          {/* ==================================================================== */}
          {/* TAB 1: PERSONAL & CONTACT DETAILS (DEFAULT ACTIVE)                   */}
          {/* ==================================================================== */}
          {activeTab === 'personal' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* 1. Personal Details Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#5531dc] border-b border-slate-100 pb-3">
                  <User size={18} className="stroke-[2.2]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                  {/* First Name */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">First Name</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.firstName}
                      </p>
                    </div>
                  </div>

                  {/* Middle Name */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Middle Name</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.middleName || '—'}
                      </p>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Last Name</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Employee ID */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <IdCard size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Employee ID</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.empId}
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Gender</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.gender}
                      </p>
                    </div>
                  </div>

                  {/* Aadhar Card Number */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Aadhar Card No.</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.aadharNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Contact Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#5531dc] border-b border-slate-100 pb-3">
                  <Phone size={18} className="stroke-[2.2]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    Contact Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                  {/* Phone Number */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Phone size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Phone Number</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.phone}
                      </p>
                    </div>
                  </div>

                  {/* Personal Email */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Personal Email</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={mentor.personalEmail}>
                        {mentor.personalEmail}
                      </p>
                    </div>
                  </div>

                  {/* College Email */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">College Email</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={mentor.collegeEmail}>
                        {mentor.collegeEmail}
                      </p>
                    </div>
                  </div>

                  {/* Campus Office Location */}
                  <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <MapPin size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Office Location</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* TAB 2: PROFESSIONAL & ACADEMIC DETAILS                               */}
          {/* ==================================================================== */}
          {activeTab === 'professional' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              {/* Professional Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#5531dc] border-b border-slate-100 pb-3">
                  <Briefcase size={18} className="stroke-[2.2]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    Professional & Academic Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-0.5">
                  {/* Department */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Building2 size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Department</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.department}
                      </p>
                    </div>
                  </div>

                  {/* Designation / Role */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Briefcase size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Designation / Role</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.designation}
                      </p>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <GraduationCap size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Qualification</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={mentor.qualification}>
                        {mentor.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Total Experience */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <Clock size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Experience</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.experience}
                      </p>
                    </div>
                  </div>

                  {/* Date of Joining */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede5ff] text-[#5531dc]">
                      <CalendarDays size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Date of Joining</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {mentor.joiningDate}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-purple-100/90 bg-[#f8f5fe] hover:border-purple-300 hover:bg-[#f2ecfd] transition-all">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Account Status</p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-600 truncate">
                        {mentor.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialization & Responsibilities Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-md shadow-slate-200/60 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#5531dc] border-b border-slate-100 pb-3">
                  <BookOpen size={18} className="stroke-[2.2]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800">
                    Specialization & Responsibilities
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
                  <div className="p-4 bg-[#f8f5fe] rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2 text-[#5531dc] font-bold text-sm mb-1.5">
                      <BookOpen size={16} />
                      <h4>Core Teaching Subjects</h4>
                    </div>
                    <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                      {mentor.coreSubjects}
                    </p>
                  </div>

                  <div className="p-4 bg-[#f8f5fe] rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2 text-[#5531dc] font-bold text-sm mb-1.5">
                      <Clock size={16} />
                      <h4>Office & Mentoring Hours</h4>
                    </div>
                    <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                      {mentor.officeHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
