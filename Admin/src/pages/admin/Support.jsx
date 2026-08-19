import { useState } from "react";
import {
  BookOpen,
  Camera,
  ChevronDown,
  CircleHelp,
  Clock3,
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
} from "lucide-react";
import AdminProfile from "../../components/admin/AdminProfile";

const quickActions = [
  { title: "Raise a Ticket", desc: "Report bugs, feature requests, or account issues.", icon: Ticket },
  { title: "Live Chat", desc: "Talk to our support team during business hours.", icon: MessageSquare },
  { title: "Browse Guides", desc: "Find setup instructions and common troubleshooting steps.", icon: BookOpen },
  { title: "System Status", desc: "Check maintenance notices and service availability.", icon: ShieldCheck },
];

const contactCards = [
  { label: "Email Support", value: "support@trackademy.edu", meta: "Replies within 24 hours", icon: Mail },
  { label: "Phone Support", value: "+91 1800-456-7890", meta: "Mon - Fri, 9:00 AM - 6:00 PM", icon: Phone },
  { label: "Help Desk", value: "Ext. 204", meta: "Campus office support", icon: Headset },
];

const faqItems = [
  {
    question: "How do I create a new notice or announcement?",
    answer: "Go to the Notices menu, click '+ Create Notice', complete the title, category, target audience, and content fields, and click Publish.",
  },
  {
    question: "How do I upload student grades and examination results?",
    answer: "Go to Results, select the batch or mentee, click Upload Results, and choose your CSV/Excel result sheet.",
  },
  {
    question: "Why is my profile photo not updating?",
    answer: "Check the file size and format. JPG and PNG files under 2 MB are supported.",
  },
  {
    question: "How do I report a system problem or portal bug?",
    answer: "Use the Raise a Ticket form below and include a clear description with a screenshot if possible.",
  },
];

const categories = [
  "General",
  "Accounts",
  "Students",
  "Mentors",
  "Notices",
  "Activities",
  "System",
];

export default function Support({ onNavigate, onOpenSidebar, isMentor = false }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({ subject: "", description: "" });
  const [ticketSent, setTicketSent] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredQuickActions = quickActions.filter((item) => {
    if (!normalizedSearch) return true;
    return (
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.desc.toLowerCase().includes(normalizedSearch)
    );
  });

  const filteredFaqItems = faqItems.filter((item) => {
    if (!normalizedSearch) return true;
    return (
      item.question.toLowerCase().includes(normalizedSearch) ||
      item.answer.toLowerCase().includes(normalizedSearch)
    );
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject || !ticketForm.description) return;
    setTicketSent(true);
    setTicketForm({ subject: "", description: "" });
    setTimeout(() => {
      setTicketSent(false);
    }, 6000);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f6f8fb]">
      {!isMentor && (
        <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
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
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">Support Center</h1>
              <p className="text-xs text-gray-400 mt-0.5">Help articles, contact support, and tickets</p>
            </div>
          </div>

          <AdminProfile name="Admin User" role="Super Admin" avatar="A" onNavigate={onNavigate} />
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 lg:p-5">
        <div className="max-w-[1500px] mx-auto space-y-4">
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredQuickActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300/40 transition-all duration-200">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-[#0da651] mb-3 border border-green-100 shadow-2xs">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{item.desc}</p>
                    </div>
                  );
                })}
              </section>

              <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Contact Options</h2>
                    <p className="mt-0.5 text-xs text-gray-400">Reach out through the channel that works best for you.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const element = document.getElementById("raise-ticket-section");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#0da651]/30 px-4 py-2 text-sm font-semibold text-[#0da651] hover:bg-green-50 transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                    Create Ticket
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactCards.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-2xl border border-slate-200/70 p-4 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0da651] border border-gray-200/80 shadow-2xs">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.meta}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-700">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-4 items-start">
                <div className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-800">Frequently Asked Questions</h2>
                      <p className="mt-0.5 text-xs text-gray-400">Quick answers to common portal questions.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredFaqItems.length > 0 ? (
                      filteredFaqItems.map((item, index) => {
                        const open = openFaq === index;
                        return (
                          <button
                            key={item.question}
                            type="button"
                            onClick={() => setOpenFaq(open ? -1 : index)}
                            className="w-full rounded-xl border border-gray-100 p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-gray-800">{item.question}</span>
                              <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180 text-[#0da651]" : ""}`} />
                            </div>
                            {open && <p className="mt-3 text-xs leading-5 text-gray-500 border-t border-gray-100 pt-3">{item.answer}</p>}
                          </button>
                        );
                      })
                    ) : (
                      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
                        No help articles match your search.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4" id="raise-ticket-section">
                  <section className="rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-200/50 p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-[#0da651]">
                        <Wrench size={18} />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800">Raise a Ticket</h2>
                        <p className="text-xs text-gray-400">Describe the issue and our support team will respond.</p>
                      </div>
                    </div>

                    {ticketSent && (
                      <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          <span>Ticket #TCK-2026-8941 submitted successfully! Our team will contact you.</span>
                        </div>
                        <button onClick={() => setTicketSent(false)} className="text-emerald-600 hover:text-emerald-800">
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    <form onSubmit={handleTicketSubmit} className="space-y-3">
                      <label className="block">
                        <span className="mb-1.5 block text-[11px] font-medium text-gray-600">Subject</span>
                        <input
                          required
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                          placeholder="Short issue summary"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[11px] font-medium text-gray-600">Description</span>
                        <textarea
                          required
                          rows={4}
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-y"
                          placeholder="Tell us what happened, what you expected, and any error messages."
                        />
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/40 p-3 text-center cursor-pointer hover:bg-green-50/40 transition-colors">
                          <Camera size={18} className="mx-auto text-[#0da651]" />
                          <p className="mt-1 text-xs text-gray-500">Attach screenshot</p>
                        </div>
                        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/40 p-3 text-center cursor-pointer hover:bg-green-50/40 transition-colors">
                          <Ticket size={18} className="mx-auto text-[#0da651]" />
                          <p className="mt-1 text-xs text-gray-500">Attach logs or files</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setTicketForm({ subject: "", description: "" })}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="rounded-lg bg-[#0da651] px-5 py-2 text-sm font-bold text-white hover:bg-green-600 transition-colors cursor-pointer shadow-sm active:scale-95"
                        >
                          Submit Ticket
                        </button>
                      </div>
                    </form>
                  </section>

                  <section className="rounded-2xl border border-blue-100 bg-white shadow-sm p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-500 mt-0.5">
                        <ShieldCheck size={14} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-blue-600">System Notice</h3>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          For urgent issues, include the affected screen and a screenshot so the support team can respond faster.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
        </div>
      </main>
    </div>
  );
}