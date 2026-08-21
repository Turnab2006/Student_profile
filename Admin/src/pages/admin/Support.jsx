import { useState, useEffect } from "react";
import {
  BookOpen,
  Camera,
  ChevronDown,
  CircleHelp,
  Clock,
  Headset,
  Mail,
  MessageSquare,
  Menu,
  Phone,
  Send,
  ShieldCheck,
  Ticket,
  Wrench,
  CheckCircle2,
  X,
  History,
  Search,
  Upload,
  Image as ImageIcon,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";
import { getStoredTickets, saveStoredTickets } from "../../data/ticketData";

const quickActions = [
  {
    title: "Raise a Ticket",
    desc: "Report bugs, feature requests, or account issues.",
    icon: Ticket,
    bg: "bg-rose-50",
    border: "border-rose-100",
    borderLeft: "border-l-4 border-l-rose-500",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100/70",
  },
  {
    title: "Live Chat",
    desc: "Talk to our support team during business hours.",
    icon: MessageSquare,
    bg: "bg-blue-50",
    border: "border-blue-100",
    borderLeft: "border-l-4 border-l-blue-500",
    iconColor: "text-[#2384FD]",
    iconBg: "bg-blue-100/70",
  },
  {
    title: "Browse Guides",
    desc: "Find setup instructions and common troubleshooting steps.",
    icon: BookOpen,
    bg: "bg-amber-50",
    border: "border-amber-100",
    borderLeft: "border-l-4 border-l-amber-500",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100/70",
  },
  {
    title: "System Status",
    desc: "Check maintenance notices and service availability.",
    icon: ShieldCheck,
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    borderLeft: "border-l-4 border-l-emerald-500",
    iconColor: "text-[#0da651]",
    iconBg: "bg-emerald-100/70",
  },
];

const contactCards = [
  {
    badge: "ACADEMIC REGISTRAR",
    email: "academics@trackademy.edu",
    meta: "Room 102 • 9 AM - 5 PM",
    icon: Mail,
    iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    metaColor: "text-blue-600",
  },
  {
    badge: "STUDENT HELPDESK",
    email: "+91 33 2456 7890",
    meta: "Toll Free Helpline",
    icon: Phone,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    metaColor: "text-emerald-600",
  },
  {
    badge: "TECHNICAL SUPPORT",
    email: "support@trackademy.edu",
    meta: "Portal & Login Queries",
    icon: Headset,
    iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    metaColor: "text-purple-600",
  },
];

const faqItems = [
  {
    question: "How do I create a new notice or campus announcement?",
    answer: "Go to the Notices menu, click '+ Create Notice', complete the title, category, priority level, target audience, and content fields, and click Publish Notice.",
  },
  {
    question: "How do I upload student grades and examination results?",
    answer: "Go to Results, select the batch, semester, or mentee, click Upload Results, and choose your CSV/Excel result sheet for automated validation.",
  },
  {
    question: "How do I update mentor assignments for a specific batch?",
    answer: "Open Mentors, select the mentor profile, and click 'Assign Students' to map students by department and semester.",
  },
  {
    question: "Why is an attached file or screenshot not uploading?",
    answer: "Ensure your file format is PNG, JPG, or WebP, and that the file size is under 5 MB. Check your internet connection if uploading larger files.",
  },
  {
    question: "How do I track resolution progress for a submitted support ticket?",
    answer: "Click the 'Track Ticket Status' button in the upper header or open the 'Ticket History' page to view live updates and resolution notes from our support engineers.",
  },
];

export default function Support({ onNavigate, onOpenSidebar, isMentor = false }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  const [trackSearchId, setTrackSearchId] = useState("");
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState(false);

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    category: "Academic Issue",
    subject: "",
    description: "",
  });
  const [attachedImage, setAttachedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createdTicketId, setCreatedTicketId] = useState("");
  const [ticketsList, setTicketsList] = useState([]);

  useEffect(() => {
    setTicketsList(getStoredTickets());
  }, []);

  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }
    setAttachedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setAttachedImage(null);
    setImagePreview(null);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return;

    const newId = `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicketId(newId);

    const nowFormatted = new Date().toISOString().split("T")[0];
    const newTicket = {
      id: newId,
      subject: ticketForm.subject.trim(),
      category: ticketForm.category.replace(" Issue", ""),
      priority: "Medium",
      status: "Under Review",
      date: nowFormatted,
      submitter: "Current User",
      description: ticketForm.description.trim(),
      assignedTo: "Technical Support Desk",
      estimatedResolution: "Within 24 hours",
      timeline: [
        {
          step: "Ticket Submitted",
          desc: "Inquiry logged via portal and assigned to helpdesk.",
          time: "Just now",
          completed: true,
        },
        {
          step: "Triage & Review",
          desc: "Under initial assessment by engineering team.",
          time: "Pending",
          completed: false,
        },
        {
          step: "Action & Investigation",
          desc: "Verifying system logs and records.",
          time: "Pending",
          completed: false,
        },
        {
          step: "Final Resolution",
          desc: "Issue resolved and documented.",
          time: "Pending",
          completed: false,
        },
      ],
    };

    const updatedList = [newTicket, ...ticketsList];
    setTicketsList(updatedList);
    saveStoredTickets(updatedList);

    setShowSuccessModal(true);
    setTicketForm({ category: "Academic Issue", subject: "", description: "" });
    removeImage();
  };

  const handleCopyTicketId = () => {
    if (createdTicketId) {
      navigator.clipboard?.writeText?.(createdTicketId);
      setCopiedTicketId(true);
      setTimeout(() => setCopiedTicketId(false), 2000);
    }
  };

  const handleTrackLookup = (e) => {
    e?.preventDefault();
    const query = trackSearchId.trim().toUpperCase();
    if (!query) return;
    setTrackError(false);

    const match = ticketsList.find((t) => t.id.toUpperCase() === query);
    if (match) {
      setTrackedTicket(match);
    } else {
      // Fallback ticket representation
      setTrackedTicket({
        id: query,
        subject: "Custom Portal Request Inquiry",
        category: "General",
        priority: "Medium",
        status: "Under Review",
        date: new Date().toISOString().split("T")[0],
        submitter: "Registered Portal User",
        description: "Your inquiry is in the processing queue and currently being handled by our support staff.",
        assignedTo: "General Help Desk",
        estimatedResolution: "Within 24 hours",
        timeline: [
          { step: "Ticket Submitted", desc: "Logged in helpdesk system.", time: "Today", completed: true },
          { step: "Triage & Review", desc: "Assigned to department coordinator.", time: "In Progress", completed: false },
          { step: "Action & Investigation", desc: "Investigating issue details.", time: "Pending", completed: false },
          { step: "Resolution Complete", desc: "Issue resolved and documented.", time: "Pending", completed: false },
        ],
      });
    }
  };

  const filteredFaqItems = faqItems.filter((item) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return item.question.toLowerCase().includes(s) || item.answer.toLowerCase().includes(s);
  });

  return (
    <div className={`flex-1 ${isMentor ? "w-full" : "h-full flex flex-col overflow-hidden bg-[#f6f8fb] font-['Roboto',sans-serif]"}`}>
      {/* Top Header Navbar */}
      {!isMentor && (
        <header className="sticky top-0 z-30 h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs font-['Roboto',sans-serif]">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
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
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight truncate">Support Center</h1>
              <p className="text-xs text-gray-400 mt-0.5 truncate hidden sm:block">Help articles, contact support, and tickets</p>
            </div>
          </div>

          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      {/* Main Container */}
      <main className={isMentor ? "p-2 sm:px-5 sm:py-2.5 space-y-5 pb-10 font-['Roboto',sans-serif]" : "flex-1 overflow-y-auto p-4 lg:p-5 font-['Roboto',sans-serif]"}>
        <div className="max-w-[1500px] mx-auto space-y-5">

          {/* ========================================================================= */}
          {/* 1. UPPER HEADER: Green Background with Track Status & History Buttons     */}
          {/* ========================================================================= */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0da651] via-[#0e9f4e] to-[#09803d] border border-emerald-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
                  Official Help Desk
                </span>
                <span className="text-emerald-100 text-xs font-semibold">• 24/7 Monitoring</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Technical Assistance &amp; Help Desk
              </h2>
              <p className="text-xs text-emerald-50/90 font-normal max-w-xl">
                Track your active support tickets, explore guides, or submit a request directly to our engineering and academic desk.
              </p>
            </div>

            {/* Upper Header Right Buttons */}
            <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setShowTrackModal(true);
                  setTrackedTicket(null);
                  setTrackSearchId("");
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/25 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Search size={15} />
                <span>Track Ticket Status</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("ticket-history");
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0da651] hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <History size={15} />
                <span>Ticket History</span>
              </button>
            </div>

            {/* Decorative background shape */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          </section>

          {/* ========================================================================= */}
          {/* 2. FIRST ROW: 4 Stat/Action Cards with DIFFERENT COLORS                  */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border ${item.border} ${item.borderLeft} bg-white shadow-md shadow-slate-200/50 p-4 sm:p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200 flex flex-col justify-between`}
                >
                  {/* Top Row: Icon + Title Beside It */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} shrink-0 border border-gray-100/80 shadow-2xs`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Row: Subtext Underneath */}
                  <p className="text-xs leading-relaxed text-gray-500 font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </section>

          {/* ========================================================================= */}
          {/* 3. CONTACT OPTIONS: Exact UI from Image (No "Create Ticket" Button)      */}
          {/* ========================================================================= */}
          <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Contact Options</h2>
              <p className="mt-0.5 text-xs text-gray-400">Reach out through the channel that works best for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.badge}
                    className="rounded-2xl border border-slate-200/80 p-4 bg-white hover:bg-[#fafcfa] hover:border-emerald-200 hover:shadow-md hover:shadow-slate-200/40 transition-all flex items-center gap-4"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} shrink-0 shadow-2xs`}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-800">
                        {item.badge}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 truncate mt-0.5">
                        {item.email}
                      </p>
                      <p className={`text-[11px] font-bold ${item.metaColor} mt-1`}>
                        {item.meta}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. 1fr 1fr EQUAL GRID: FAQ Column (Left) & Ticket Form Column (Right)    */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

            {/* Left Column (1fr): Frequently Asked Questions */}
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Frequently Asked Questions</h2>
                  <p className="mt-0.5 text-xs text-gray-400">Quick answers to common portal and academic queries.</p>
                </div>
                <CircleHelp size={18} className="text-emerald-600" />
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqItems.map((item, index) => {
                  const open = openFaq === index;
                  return (
                    <div
                      key={item.question}
                      className={`rounded-xl border transition-all overflow-hidden ${open ? "border-emerald-200 bg-[#f4fbf7]/40 shadow-2xs" : "border-gray-200/80 bg-white hover:bg-gray-50/50"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{item.question}</span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#0da651]" : ""
                            }`}
                        />
                      </button>
                      {open && (
                        <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-emerald-100/60 font-normal">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Notice Box */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/70 flex items-start gap-3 text-xs text-blue-900 mt-4">
                <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-blue-950 mb-0.5">Need immediate assistance?</strong>
                  <span className="text-blue-800">
                    If your query is not covered in the FAQs, use the ticket form on the right to reach our engineering support.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (1fr): Raise a Ticket Form */}
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0da651] border border-emerald-100">
                  <Wrench size={18} />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">Raise a Support Ticket</h2>
                  <p className="text-xs text-gray-400">Describe the issue and our support team will respond promptly.</p>
                </div>
              </div>

              <form onSubmit={handleTicketSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Issue Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 rounded-lg text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all cursor-pointer"
                  >
                    <option value="Academic Issue">Academic Issue</option>
                    <option value="Attendance Discrepancy">Attendance Discrepancy</option>
                    <option value="Grade/Result Issue">Grade / Result Issue</option>
                    <option value="Portal Technical Bug">Portal Technical Bug</option>
                    <option value="Account & Security">Account &amp; Security</option>
                    <option value="Mentor Guidance">Mentor Guidance</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief summary of your query"
                    className="w-full px-3.5 py-2.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 rounded-lg text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Explain what happened, expected behavior, roll number, and specific details..."
                    className="w-full p-3.5 border border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/70 rounded-lg text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#0da651] focus:ring-2 focus:ring-emerald-200 transition-all resize-y"
                  />
                </div>

                {/* Drag & Drop Image/Screenshot Upload Area */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Upload Screenshot / Image (Optional)
                  </label>

                  {imagePreview ? (
                    /* Uploaded Image Preview */
                    <div className="relative p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-emerald-200 bg-slate-900 shrink-0">
                          <img src={imagePreview} alt="Screenshot preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{attachedImage?.name}</p>
                          <p className="text-[11px] text-gray-500 font-mono">
                            {(attachedImage?.size ? (attachedImage.size / 1024).toFixed(1) : "0")} KB • Image Attached
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove Image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    /* Dropzone Box */
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files[0]);
                      }}
                      className="border-2 border-dashed border-emerald-200/80 bg-[#f4fbf7] hover:bg-[#ebf8f0]/60 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-[#0da651] group"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files?.[0])}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-full bg-emerald-100/80 text-[#0da651] flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform">
                        <Camera size={18} />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-gray-800">
                        Click or drag &amp; drop screenshot here
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Supports PNG, JPG, JPEG (Max 5MB)
                      </p>
                    </label>
                  )}
                </div>

                {/* Form Action Buttons: Create Ticket */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setTicketForm({ category: "Academic Issue", subject: "", description: "" });
                      removeImage();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0da651] hover:bg-[#0c9548] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
                  >
                    <Send size={14} />
                    <span>Create Ticket</span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: Ticket Creation Success Popup with Ticket ID & Close Option      */}
      {/* ========================================================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 relative text-center space-y-4">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-[#0da651] shadow-xs">
              <CheckCircle2 size={36} className="stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                Ticket Created Successfully!
              </h3>
              <p className="text-xs text-gray-500">
                Your support request has been registered with our team.
              </p>
            </div>

            {/* Ticket Number Highlight Box */}
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-emerald-200/80 space-y-2">
              <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Your Ticket Reference Number
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-[26px] font-mono font-extrabold text-[#09803d] tracking-wider">
                  {createdTicketId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyTicketId}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 cursor-pointer transition-all shadow-2xs"
                  title="Copy Ticket ID"
                >
                  {copiedTicketId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-[11px] text-emerald-700/90 font-medium">
                {copiedTicketId ? "Copied to clipboard!" : "Please save this ID to track your ticket status."}
              </p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed px-2">
              Our technical help desk will review your inquiry and follow up through your portal notifications and registered email.
            </p>

            {/* Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 px-5 bg-[#0da651] hover:bg-[#0c9548] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPGRADED TRACK TICKET STATUS (Fixed Scrollbar & Sticky Header/Footer) */}
      {/* ========================================================================= */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden font-['Roboto',sans-serif]">

            {/* Fixed Sticky Header */}
            <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-gray-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0da651] flex items-center justify-center border border-emerald-100 shadow-2xs shrink-0">
                  <Search size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                    Track Ticket Status
                  </h3>
                  <p className="text-xs text-gray-400">
                    Live lookup for portal inquiries and technical reports.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTrackModal(false)}
                className="w-9 h-9 rounded-xl bg-gray-100/80 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Inset Scrollable Body (Scrollbar strictly contained inside) */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
              {/* Lookup Form */}
              <form onSubmit={handleTrackLookup} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Ticket ID (e.g. TCK-2026-8941)"
                  value={trackSearchId}
                  onChange={(e) => setTrackSearchId(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0da651] hover:bg-[#0c9548] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  Track Live
                </button>
              </form>

              {/* Quick Select Recent Tickets */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] font-bold text-gray-400 uppercase shrink-0">Recent Inquiries:</span>
                {ticketsList.slice(0, 4).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTrackSearchId(t.id);
                      setTrackedTicket(t);
                    }}
                    className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 font-mono text-[11px] font-bold shrink-0 border border-gray-200/80 transition-colors cursor-pointer"
                  >
                    {t.id}
                  </button>
                ))}
              </div>

              {/* Rich Tracking Timeline Result */}
              {trackedTicket && (
                <div className="space-y-5 pt-3 border-t border-gray-100 animate-in fade-in duration-200">
                  {/* Status Badges Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl bg-[#f4fbf7] border border-emerald-200/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-emerald-900 bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                        {trackedTicket.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        {trackedTicket.category}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3.5 py-1 rounded-full ${trackedTicket.status === "Resolved"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : trackedTicket.status === "In Progress"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}
                    >
                      {trackedTicket.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900">{trackedTicket.subject}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {trackedTicket.description}
                    </p>
                  </div>

                  {/* Visual Timeline Stepper */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} className="text-emerald-600" />
                        <span>Live Resolution Progress Timeline</span>
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        Realtime Sync
                      </span>
                    </div>

                    <div className="relative pl-7 sm:pl-8 space-y-5 border-l-2 border-emerald-300 ml-3 py-1.5">
                      {(trackedTicket.timeline || [
                        { step: "Ticket Submitted", desc: "Logged in helpdesk system.", time: `${trackedTicket.date}`, completed: true },
                        { step: "Triage & Review", desc: "Assigned to department coordinator.", time: "In Progress", completed: true },
                        { step: "Action & Investigation", desc: "Investigating issue details.", time: "Pending", completed: trackedTicket.status === "Resolved" },
                        { step: "Resolution Complete", desc: "Issue resolved and documented.", time: "Pending", completed: trackedTicket.status === "Resolved" },
                      ]).map((step, idx) => (
                        <div key={idx} className="relative">
                          <div
                            className={`absolute -left-[35px] sm:-left-[39px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ${step.completed
                                ? "bg-[#0da651] ring-emerald-100 text-white"
                                : "bg-gray-300 ring-gray-100 text-transparent"
                              }`}
                          >
                            {step.completed && <Check size={11} className="stroke-[3]" />}
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className={`text-xs sm:text-sm font-bold ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                                {step.step}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed font-normal">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assignment Desk Banner */}
                  <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#f0fdf4] via-[#f0fdf4] to-emerald-50/70 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-2xs shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                          Assigned Desk &amp; Officer
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          {trackedTicket.assignedTo || "Technical Support Desk"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#09803d] bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                      {trackedTicket.estimatedResolution || "Est. 24-48 hrs"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Sticky Footer */}
            <div className="flex items-center justify-end px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50/70 shrink-0">
              <button
                type="button"
                onClick={() => setShowTrackModal(false)}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Close Tracking View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}