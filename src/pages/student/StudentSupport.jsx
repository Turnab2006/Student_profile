import { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  Clock,
  Headset,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Ticket,
  CheckCircle2,
  X,
  Search,
  Upload,
  Trash2,
  Copy,
  Check,
  History
} from "lucide-react";
import { getStoredTickets, saveStoredTickets } from "../../data/ticketData";

const contactCards = [
  {
    badge: "ACADEMIC REGISTRAR",
    email: "academics@trackademy.edu",
    meta: "Room 102 • 9 AM - 5 PM",
    icon: Mail,
    iconBg: "bg-blue-50 text-[#2384FD] border border-blue-100",
    metaColor: "text-[#2384FD]",
  },
  {
    badge: "STUDENT HELPDESK",
    email: "+91 33 2456 7890",
    meta: "Toll Free Helpline • 9 AM - 6 PM",
    icon: Phone,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    metaColor: "text-emerald-600",
  },
  {
    badge: "TECHNICAL SUPPORT",
    email: "support@trackademy.edu",
    meta: "Portal, Attendance & Login Queries",
    icon: Headset,
    iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    metaColor: "text-purple-600",
  },
];

const studentFaqs = [
  {
    question: "How do I request a correction for an attendance discrepancy?",
    answer: "First verify the date and lecture session with your course instructor or faculty mentor (Prof. Kaushik Chatterjee). If confirmed, submit a ticket under 'Attendance Discrepancy' with the date and subject details for registry approval.",
  },
  {
    question: "When and how can I download my official semester grade cards?",
    answer: "Official digital grade cards are published under the Results tab within 10 days of semester exam evaluations. You can download verifiable PDF marksheet cards featuring SGPA and CGPA breakdowns.",
  },
  {
    question: "How do co-curricular credit points get approved by my mentor?",
    answer: "Submit your event certificate under the Activities/Credit Points section. Your assigned mentor reviews the submitted documents and verifies credits within 3 business days.",
  },
  {
    question: "How do I update my Academic Bank of Credits (ABC ID) or blood group?",
    answer: "Go to Student Settings -> Profile & Identity. You can edit your 12-digit ABC ID, personal email, phone numbers, and blood group. Click 'Save Profile Details' to sync with your Digital ID card.",
  },
  {
    question: "What should I do if a downloaded marksheet or circular PDF fails to open?",
    answer: "Ensure you have a stable network and a standard PDF viewer. If the file stream is corrupted, submit a technical helpdesk ticket below for instant re-generation.",
  },
  {
    question: "How long does it take for a submitted support ticket to be resolved?",
    answer: "Most academic and portal queries are reviewed and resolved by the department registrar and IT helpdesk within 24 to 48 working hours.",
  },
];

export default function StudentSupport({ hideHeader = false }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    category: "Attendance Discrepancy",
    priority: "Medium",
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
      category: ticketForm.category,
      priority: ticketForm.priority,
      status: "Under Review",
      date: nowFormatted,
      submitter: "Tanuka Saha (CSE2024012)",
      email: "tanuka.saha@gmail.com",
      department: "Computer Science & Engineering",
      description: ticketForm.description.trim(),
      assignedTo: "Academic Helpdesk & IT Cell",
      estimatedResolution: "Within 24 hours",
      timeline: [
        {
          step: "Ticket Submitted",
          desc: "Inquiry logged via Student Portal and assigned to academic helpdesk.",
          time: "Just now",
          completed: true,
        },
        {
          step: "Triage & Review",
          desc: "Under initial review by department mentor & registrar.",
          time: "In Progress",
          completed: false,
        },
        {
          step: "Action & Investigation",
          desc: "Verifying academic ledger and system records.",
          time: "Pending",
          completed: false,
        },
        {
          step: "Final Resolution",
          desc: "Resolution documented and notified via student inbox.",
          time: "Pending",
          completed: false,
        },
      ],
    };

    const updatedList = [newTicket, ...ticketsList];
    setTicketsList(updatedList);
    saveStoredTickets(updatedList);

    setShowSuccessModal(true);
    setTicketForm({
      category: "Attendance Discrepancy",
      priority: "Medium",
      subject: "",
      description: "",
    });
    removeImage();
  };

  const handleCopyTicketId = () => {
    if (createdTicketId) {
      navigator.clipboard?.writeText?.(createdTicketId);
      setCopiedTicketId(true);
      setTimeout(() => setCopiedTicketId(false), 2000);
    }
  };

  const filteredFaqItems = studentFaqs.filter((item) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return item.question.toLowerCase().includes(s) || item.answer.toLowerCase().includes(s);
  });

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-5 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto pb-10">
      {/* ========================================================================= */}
      {/* 1. UPPER BLUE HERO BANNER                                                 */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2384FD] via-[#1d6fd6] to-[#174eb8] border border-blue-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ambient Glows */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
              Official Help Desk
            </span>
            <span className="text-blue-100 text-xs font-semibold">• 24/7 Academic Support</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Student Technical Assistance &amp; Help Desk
          </h2>
          <p className="text-xs text-blue-50/90 font-normal max-w-xl">
            Explore answers to common academic questions, submit support inquiries, or connect directly with the campus registrar and technical helpdesk.
          </p>
        </div>

        {/* Upper Header Right Buttons (Dummy / Visual only) */}
        <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/25 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Search size={15} />
            <span>Track Ticket Status</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#2384FD] hover:bg-blue-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <History size={15} />
            <span>Ticket History</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONTACT OPTIONS (3 Cards with Student Blue/Emerald/Purple tones)        */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-xs p-5 sm:p-6 space-y-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-gray-900">Direct Contact Options</h2>
          <p className="mt-0.5 text-xs text-gray-400">Reach out directly through institutional campus channels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.badge}
                className="rounded-2xl border border-slate-200/80 p-4 bg-white hover:bg-blue-50/20 hover:border-blue-200 hover:shadow-xs transition-all flex items-center gap-4"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} shrink-0`}>
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
      {/* 3. 2-COLUMN EQUAL GRID: FAQ (Left) & Ticket Form (Right)                  */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        
        {/* Left Column (1fr): Frequently Asked Questions */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-0.5 text-xs text-gray-400">Quick answers to common student and academic queries.</p>
            </div>
            <CircleHelp size={18} className="text-[#2384FD]" />
          </div>

          {/* Search FAQs Filter */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search help topics (e.g., attendance, grade card, ABC ID)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqItems.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-xl">
                No matching answers found. You can submit a support ticket on the right.
              </div>
            ) : (
              filteredFaqItems.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div
                    key={item.question}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      open ? "border-blue-200 bg-blue-50/30 shadow-2xs" : "border-gray-200/80 bg-white hover:bg-gray-50/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-gray-800">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                          open ? "rotate-180 text-[#2384FD]" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-blue-100/60">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (1fr): Raise a Support Ticket Form */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Raise a Support Ticket</h2>
              <p className="mt-0.5 text-xs text-gray-400">Describe your inquiry and our academic desk will assist you.</p>
            </div>
            <Ticket size={18} className="text-[#2384FD]" />
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            
            {/* Category & Priority Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Inquiry Category <span className="text-blue-600">*</span>
                </label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 outline-none focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                >
                  <option value="Attendance Discrepancy">Attendance Discrepancy</option>
                  <option value="Grade Card & Result Query">Grade Card &amp; Result Query</option>
                  <option value="Digital ID / Credentials">Digital ID / Credentials</option>
                  <option value="Credit Points Verification">Credit Points Verification</option>
                  <option value="Technical & Portal Login">Technical &amp; Portal Login</option>
                  <option value="Other Inquiry">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Priority Level <span className="text-blue-600">*</span>
                </label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 outline-none focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                >
                  <option value="Low">Low (General Query)</option>
                  <option value="Medium">Medium (Standard Request)</option>
                  <option value="High">High (Needs Prompt Action)</option>
                  <option value="Urgent">Urgent (Exam / Attendance Block)</option>
                </select>
              </div>
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Ticket Subject / Summary <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Absent mark in CS304 lecture on Aug 12"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Detailed Description <span className="text-blue-600">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Explain the specific issue with relevant course codes, semester numbers, dates, or error details..."
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-[#2384FD] focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>

            {/* Attachment Box */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Attach Screenshot or Certificate (Optional)
              </label>

              {imagePreview ? (
                <div className="flex items-center justify-between p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={imagePreview} alt="Uploaded attachment" className="w-10 h-10 object-cover rounded-lg border border-blue-200 shrink-0" />
                    <span className="text-xs text-gray-700 font-medium truncate">{attachedImage?.name || "attachment.png"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl bg-gray-50/50 hover:bg-blue-50/20 transition-all cursor-pointer text-center">
                  <Upload size={18} className="text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-600">Click to upload screenshot or PDF</span>
                  <span className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, WebP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Send size={15} />
              <span>Submit Support Ticket</span>
            </button>
          </form>
        </div>

      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2384FD] flex items-center justify-center mx-auto border border-blue-100">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">Support Ticket Raised!</h3>
              <p className="text-xs text-gray-500 mt-1">Your inquiry has been assigned to the student helpdesk.</p>
            </div>

            {/* Ticket ID Pill */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs font-mono font-bold text-gray-800">{createdTicketId}</span>
              <button
                type="button"
                onClick={handleCopyTicketId}
                className="flex items-center gap-1 text-xs font-bold text-[#2384FD] hover:text-blue-700 cursor-pointer"
              >
                {copiedTicketId ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedTicketId ? "Copied!" : "Copy ID"}</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Your inquiry has been logged. Our academic registrar and technical support team will process your request promptly.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Done &amp; Return
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
