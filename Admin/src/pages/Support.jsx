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
} from "lucide-react";
import AdminProfile from "../components/AdminProfile";

const quickActions = [
  { title: "Raise a Ticket", desc: "Report bugs, feature requests, or account issues.", icon: Ticket },
  { title: "Live Chat", desc: "Talk to our support team during business hours.", icon: MessageSquare },
  { title: "Browse Guides", desc: "Find setup instructions and common troubleshooting steps.", icon: BookOpen },
  { title: "System Status", desc: "Check maintenance notices and service availability.", icon: ShieldCheck },
];

const contactCards = [
  { label: "Email Support", value: "support@edusmart.com", meta: "Replies within 24 hours", icon: Mail },
  { label: "Phone Support", value: "+91 98765 43210", meta: "Mon - Fri, 9:00 AM - 6:00 PM", icon: Phone },
  { label: "Help Desk", value: "Ext. 204", meta: "Campus office support", icon: Headset },
];

const faqItems = [
  {
    question: "How do I create a new student record?",
    answer: "Go to Students, click Add Student, complete the form, and submit the record from the review screen.",
  },
  {
    question: "Why is my profile photo not updating?",
    answer: "Check the file size and format. JPG and PNG files under 2 MB are supported.",
  },
  {
    question: "How do I report a system problem?",
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

export default function Support({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#f6f8fb]">
      <header className="h-[65px] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigate?.("dashboard")}
            className="h-9 w-9 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 lg:hidden"
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

      <main className="flex-1 overflow-y-auto p-4 lg:p-5">
        <div className="max-w-[1500px] mx-auto space-y-4">
          <section className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#e8f7ea] via-[#eefbf0] to-[#dff4e7] shadow-sm p-5 lg:p-6 overflow-hidden relative">
            <div className="max-w-xl">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Support Center</h2>
              <p className="mt-2 text-sm text-gray-500 max-w-lg">
                Find help articles, contact support, and raise tickets for any issue in the dashboard.
              </p>
            </div>
            <div className="pointer-events-none absolute right-4 top-4 hidden md:block">
              <div className="relative h-36 w-52">
                <div className="absolute inset-x-6 top-5 h-24 rounded-2xl bg-white/85 border border-white shadow-lg" />
                <div className="absolute left-10 top-0 h-8 w-40 rounded-t-xl bg-white/90 border border-white shadow-sm" />
                <div className="absolute right-0 top-8 h-14 w-14 rounded-full bg-primary/10 blur-[0.5px]" />
                <div className="absolute left-16 top-12 h-20 w-28 rounded-2xl bg-white/90 border border-white shadow-md flex items-center justify-center text-primary">
                  <Headset size={28} />
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4 items-start">
            <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 lg:sticky lg:top-4">
              <p className="px-3 pb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Categories</p>
              <div className="space-y-1">
                {categories.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      index === 0 ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    <span>{item}</span>
                    {index === 0 ? <CircleHelp size={14} /> : null}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-primary-light p-4 border border-green-100">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Clock3 size={16} />
                  <p className="text-sm font-semibold">Support Hours</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">
                  Monday to Friday, 9:00 AM to 6:00 PM. Emergency system issues are monitored after hours.
                </p>
              </div>
            </aside>

            <div className="space-y-4">
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredQuickActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary mb-3">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{item.desc}</p>
                    </div>
                  );
                })}
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Contact Options</h2>
                    <p className="mt-0.5 text-xs text-gray-400">Reach out through the channel that works best for you.</p>
                  </div>
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-green-50 transition-colors">
                    <Send size={14} />
                    Create Ticket
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactCards.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-2xl border border-gray-100 p-4 bg-gray-50/30">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary border border-gray-100">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.meta}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-4 items-start">
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-800">Frequently Asked Questions</h2>
                      <p className="mt-0.5 text-xs text-gray-400">Quick answers to common questions.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredFaqItems.length > 0 ? filteredFaqItems.map((item, index) => {
                      const open = openFaq === index;
                      return (
                        <button
                          key={item.question}
                          type="button"
                          onClick={() => setOpenFaq(open ? -1 : index)}
                          className="w-full rounded-xl border border-gray-100 p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-800">{item.question}</span>
                            <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                          </div>
                          {open && <p className="mt-3 text-xs leading-5 text-gray-500">{item.answer}</p>}
                        </button>
                      );
                    }) : (
                      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
                        No help articles match your search.
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                        <Wrench size={18} />
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800">Raise a Ticket</h2>
                        <p className="text-xs text-gray-400">Describe the issue and our team will follow up.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block">
                        <span className="mb-1.5 block text-[11px] font-medium text-gray-600">Subject</span>
                        <input className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" placeholder="Short issue summary" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[11px] font-medium text-gray-600">Description</span>
                        <textarea rows={5} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" placeholder="Tell us what happened, what you expected, and any error messages." />
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/40 p-3 text-center">
                          <Camera size={18} className="mx-auto text-primary" />
                          <p className="mt-2 text-xs text-gray-500">Attach a screenshot</p>
                        </div>
                        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/40 p-3 text-center">
                          <Ticket size={18} className="mx-auto text-primary" />
                          <p className="mt-2 text-xs text-gray-500">Attach logs or files</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button type="button" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                        <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors">
                          Submit Ticket
                        </button>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-blue-100 bg-white shadow-sm p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-500 mt-0.5">
                        <ShieldCheck size={14} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-blue-500">System Notice</h3>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          For urgent issues, include the affected screen and a screenshot so the support team can respond faster.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}