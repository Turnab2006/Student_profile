import { useState } from "react";
import {
  Headphones,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function StudentSupport({ hideHeader = false }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    category: "academic",
    subject: "",
    description: "",
  });

  const faqs = [
    {
      q: "How do I request a correction in my attendance percentage?",
      a: "Attendance discrepancies should first be discussed directly with the respective course instructor or your assigned mentor Dr. Kaushik Chatterjee. Once validated, the faculty will update the portal attendance logs.",
    },
    {
      q: "When will the official Semester IV grade card be available for physical collection?",
      a: "Official signed grade cards can be collected from the Registrar Office (Ground Floor, Admin Block) between 11:00 AM and 3:00 PM on working weekdays.",
    },
    {
      q: "How do credit points get approved for external hackathons and workshops?",
      a: "Submit the participation certificate under the Activities/Credit Points section. The Department HOD and faculty coordinator will verify and approve the points within 3 working days.",
    },
    {
      q: "What should I do if I cannot access my course study materials?",
      a: "Make sure you are enrolled in the course under the Subjects tab. If the issue persists, submit a technical helpdesk ticket below.",
    },
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketData.subject || !ticketData.description) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketData({ category: "academic", subject: "", description: "" });
    }, 4000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 font-['Roboto',sans-serif]">
      {!hideHeader && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Barlow',sans-serif]">
            Student Support &amp; Help Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-['Barlow',sans-serif]">
            Get assistance with your academic records, mentor guidance, and technical portal queries.
          </p>
        </div>
      )}

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2384FD] flex items-center justify-center shrink-0 border border-blue-100">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Academic Registrar
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">academics@trackademy.edu</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">Room 102 &bull; 9 AM - 5 PM</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Student Helpdesk
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">+91 33 2456 7890</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Toll Free Helpline</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Headphones size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Technical Support
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">support@trackademy.edu</p>
            <p className="text-xs text-purple-600 font-semibold mt-1">Portal &amp; Login Queries</p>
          </div>
        </div>
      </div>

      {/* Two Columns: FAQ & Submit Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <HelpCircle size={18} className="text-[#2384FD]" />
            <h3 className="text-base font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-3 bg-gray-50/70 hover:bg-gray-100/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Ticket */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <MessageSquare size={18} className="text-[#2384FD]" />
            <h3 className="text-base font-bold text-gray-900">
              Submit a Support Query
            </h3>
          </div>

          {ticketSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Ticket Submitted Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Your ticket has been assigned to the Academic Helpdesk. Ticket Reference #TK-
                {Math.floor(1000 + Math.random() * 9000)}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Query Category
                </label>
                <select
                  value={ticketData.category}
                  onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="academic">Academic &amp; Results Query</option>
                  <option value="attendance">Attendance Discrepancy</option>
                  <option value="credits">Credit Point Verification</option>
                  <option value="technical">Portal Technical Bug</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Question regarding CS501 marksheet"
                  value={ticketData.subject}
                  onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your query in detail..."
                  value={ticketData.description}
                  onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Send size={15} />
                <span>Submit Query Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
