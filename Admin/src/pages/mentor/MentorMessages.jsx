import { useState, useRef, useEffect } from "react";
import {
  Send,
  Search,
  CheckCheck,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import { STUDENTS_DATA } from "../../data/studentsData";

export default function MentorMessages({ hideHeader = false }) {
  const [activeContactId, setActiveContactId] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const contacts = STUDENTS_DATA.map((s, idx) => ({
    id: String(idx + 1),
    name: s.name,
    role: `Student • ${s.semester}`,
    department: s.dept,
    deptCode: s.deptCode,
    rollNo: s.roll || s.rollNo,
    email: s.email,
    phone: s.phone,
    avatar: s.avatar,
    initials: s.initials,
    online: idx % 3 !== 0,
    lastMessage: idx === 0 ? "I wanted to discuss about my final year project idea..." : idx === 1 ? "Sir, I have submitted my semester project draft." : idx === 2 ? "Thank you for approving my credit points request!" : `Hello Prof. Chatterjee, I have a query regarding ${s.deptCode || 'my'} coursework.`,
    time: idx < 3 ? "10:30 AM" : idx < 7 ? "Yesterday" : "Aug 5",
    unread: idx === 1 ? 2 : idx === 4 ? 1 : 0,
  }));

  const [conversations, setConversations] = useState({
    "1": [
      {
        id: "hist-0",
        dateBadge: "28 April 2024",
      },
      {
        id: "m1",
        sender: "mentor",
        text: "Welcome to the new academic term! Feel free to reach out here whenever you need guidance with your course projects or research topics.",
        time: "09:30 AM",
      },
      {
        id: "m2",
        sender: "student",
        text: "Thank you so much Sir! I will definitely keep that in mind.",
        time: "09:45 AM",
        status: "read",
      },
      {
        id: "date-1",
        dateBadge: "2 May 2024",
      },
      {
        id: "m3",
        sender: "student",
        text: "Hello Sir, How are you?",
        time: "10:15 AM",
        status: "read",
      },
      {
        id: "m4",
        sender: "mentor",
        text: "Hello Tanuka,\nI'm good, thank you! How can I help you today?",
        time: "10:18 AM",
      },
      {
        id: "m5",
        sender: "student",
        text: "I wanted to discuss about my final year project idea and get your guidance on the next steps.",
        time: "10:20 AM",
        status: "read",
      },
      {
        id: "m6",
        sender: "mentor",
        text: "Sure, I'd be happy to help. Please share your project idea and current progress.",
        time: "10:22 AM",
      },
      {
        id: "date-2",
        dateBadge: "Today",
      },
      {
        id: "m7",
        sender: "student",
        text: "Here is a brief overview of my project and the problems I'm facing. Could we schedule a meeting to discuss it in detail?",
        time: "10:25 AM",
        status: "read",
      },
      {
        id: "m8",
        sender: "mentor",
        text: "Thank you for reaching out. Let's meet tomorrow at 11:00 AM in my cabin.",
        time: "10:30 AM",
      },
    ],
    "2": [
      {
        id: "date-1",
        dateBadge: "Today",
      },
      {
        id: "m1",
        sender: "student",
        text: "Good morning Sir! I wanted to inquire about my attendance status.",
        time: "10:30 AM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Good morning Arjun! Your current attendance is at 95%, which is excellent.",
        time: "10:35 AM",
      },
      {
        id: "m3",
        sender: "student",
        text: "Sir, I have submitted my semester project draft.",
        time: "10:42 AM",
        status: "read",
      },
    ],
    "3": [
      {
        id: "date-1",
        dateBadge: "Yesterday",
      },
      {
        id: "m1",
        sender: "student",
        text: "Thank you for approving my credit points request!",
        time: "03:15 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "You are welcome Riya! Keep up the good work.",
        time: "03:20 PM",
      },
    ],
    "4": [
      {
        id: "date-1",
        dateBadge: "5 August 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Can I meet during your office hours tomorrow?",
        time: "11:00 AM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Sure Vikram, drop by around 2:00 PM tomorrow.",
        time: "11:15 AM",
      },
    ],
    "5": [
      {
        id: "date-1",
        dateBadge: "4 August 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Sir, I have updated my hackathon project report with the dataset details.",
        time: "02:10 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Great work Sneha! I reviewed the submission and endorsed your team.",
        time: "02:25 PM",
      },
    ],
    "6": [
      {
        id: "date-1",
        dateBadge: "3 August 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Could you please sign my internship NOC form?",
        time: "11:40 AM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Please send the PDF over email or bring the hardcopy to room 302.",
        time: "12:05 PM",
      },
    ],
    "7": [
      {
        id: "date-1",
        dateBadge: "2 August 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Thanks Sir! The paper got accepted at the IEEE student conference.",
        time: "04:30 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Hearty congratulations Sourav! Very proud of your research effort.",
        time: "04:45 PM",
      },
    ],
    "8": [
      {
        id: "date-1",
        dateBadge: "29 July 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "I need some guidance regarding campus placement prep and coding interviews.",
        time: "01:15 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Let's schedule a mock technical interview session next Monday.",
        time: "01:30 PM",
      },
    ],
    "9": [
      {
        id: "date-1",
        dateBadge: "28 July 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Submitted my laboratory assignment on DBMS.",
        time: "05:00 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Acknowledged Pritam. Your queries and normalization schema look solid.",
        time: "05:20 PM",
      },
    ],
    "10": [
      {
        id: "date-1",
        dateBadge: "25 July 2024",
      },
      {
        id: "m1",
        sender: "student",
        text: "Thank you for the guidance during the counseling session.",
        time: "03:40 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "You are most welcome Pooja! Keep pushing ahead with confidence.",
        time: "04:00 PM",
      },
    ],
  });

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const messages = conversations[activeContactId] || [];

  // Scroll to bottom helper
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Auto-scroll when activeContact changes or component mounts
  useEffect(() => {
    scrollToBottom("auto");
  }, [activeContactId]);

  // Track scroll position to show/hide the "Scroll to Bottom" button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollBottom(isFarFromBottom);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: "msg-" + Date.now(),
      sender: "mentor",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));
    setMessageInput("");

    setTimeout(() => {
      scrollToBottom("smooth");
    }, 50);
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-3 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto">
      {/* Optional Top Page Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Mentee Messages &amp; Counseling
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Direct academic guidance and communication with your assigned mentees.
            </p>
          </div>
        </div>
      )}

      {/* Main Container: Two Columns on Laptop/Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: MENTEE CONTACTS (Desktop)                                    */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col">
          {/* Mentees List Selector Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-4 space-y-3 flex flex-col h-[calc(100vh-125px)] sm:h-[calc(100vh-110px)] min-h-[550px]">
            <div className="flex items-center justify-between px-1 shrink-0">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Mentees
              </h2>
              <span className="text-xs font-bold text-[#7656f4] bg-[#f0eaff] px-2.5 py-0.5 rounded-full">
                {contacts.length} Assigned
              </span>
            </div>

            {/* Search Input */}
            <div className="relative shrink-0">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search mentees by name, roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-slate-200/90 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4] transition-all"
              />
            </div>

            {/* Contacts Scroll List with Visible Styled Scrollbar */}
            <div className="space-y-1.5 flex-1 overflow-y-auto pr-1.5 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] hover:[scrollbar-color:#94a3b8_transparent] custom-scrollbar">
              {filteredContacts.map((contact) => {
                const isSelected = contact.id === activeContactId;
                return (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => setActiveContactId(contact.id)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#f0eaff] border-[#7656f4]/30 shadow-xs"
                        : "bg-white border-transparent hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-2xs flex items-center justify-center bg-purple-100">
                        {contact.avatar ? (
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <span className="hidden w-full h-full items-center justify-center text-xs font-bold text-[#7656f4]">
                          {contact.initials}
                        </span>
                      </div>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold truncate ${isSelected ? "text-[#7656f4]" : "text-slate-900"}`}>
                          {contact.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">{contact.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{contact.rollNo}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{contact.lastMessage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: CHAT CONVERSATION VIEW                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-8 w-full bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex flex-col overflow-hidden h-[calc(100vh-125px)] sm:h-[calc(100vh-110px)] min-h-[550px] relative">
          
          {/* Top Header Bar with Active Mentee Summary - Styled with Blue Gradient & Dot Grid Background */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] border-b border-blue-400/30 flex items-center justify-between gap-3 shrink-0 shadow-sm relative overflow-hidden text-white z-10">
            {/* Subtle Decorative White Dot Matrix Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(#ffffff 1.2px, transparent 1.2px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className="flex items-center gap-3 min-w-0 relative z-10">
              <div className="relative shrink-0">
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden h-10 w-10 rounded-full bg-white/20 text-white font-bold text-sm items-center justify-center">
                  {activeContact.initials}
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white shadow-2xs" />
              </div>

              <div className="overflow-hidden min-w-0">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white truncate drop-shadow-xs">
                  {activeContact.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-blue-100 flex items-center gap-1.5 truncate mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-xs" />
                  <span>{activeContact.role} &bull; {activeContact.department}</span>
                </p>
              </div>
            </div>

            {/* Mobile Contact Switcher Dropdown */}
            <div className="lg:hidden relative z-10">
              <select
                value={activeContactId}
                onChange={(e) => setActiveContactId(e.target.value)}
                className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/30 outline-none cursor-pointer"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} className="text-slate-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Scrollable Message Flow Area */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 scroll-smooth custom-scrollbar bg-white relative"
          >
            {messages.map((item) => {
              // Render Date Separator Pill
              if (item.dateBadge) {
                return (
                  <div key={item.id} className="flex items-center justify-center my-3">
                    <span className="bg-[#f0f4f9]/80 border border-slate-200/70 text-slate-600 font-semibold text-[11px] px-3.5 py-1 rounded-full shadow-2xs select-none">
                      {item.dateBadge}
                    </span>
                  </div>
                );
              }

              const isMentor = item.sender === "mentor";

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-2.5 sm:gap-3 ${
                    isMentor ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Student Profile Thumbnail beside incoming messages */}
                  {!isMentor && (
                    <div className="relative shrink-0 mt-1">
                      <img
                        src={activeContact.avatar}
                        alt="Mentee"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-1 ring-slate-200 shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-purple-100 text-[#7656f4] font-bold text-xs items-center justify-center">
                        {activeContact.initials}
                      </div>
                    </div>
                  )}

                  {/* Message Bubble with Box Shadow matching Student view */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] sm:max-w-[72%] transition-all duration-200 ${
                      isMentor
                        ? "bg-[#f0eaff] border border-purple-200/70 text-slate-800 rounded-tr-xs shadow-[0_4px_16px_rgba(118,86,244,0.09)] hover:shadow-[0_6px_20px_rgba(118,86,244,0.13)] ml-auto"
                        : "bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.09)] text-slate-800 rounded-tl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line text-slate-800 font-normal">
                      {item.text}
                    </p>

                    {/* Time & Read Status */}
                    <div
                      className={`flex items-center justify-end gap-1.5 text-[10px] sm:text-[11px] mt-1.5 ${
                        isMentor ? "text-[#7656f4] font-medium" : "text-slate-400"
                      }`}
                    >
                      <span>{item.time}</span>
                      {isMentor && (
                        <CheckCheck size={14} className="text-[#7656f4] stroke-[2.4]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Scroll Anchor */}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Floating "Scroll Down" Button if user has scrolled up */}
          {showScrollBottom && (
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className="absolute bottom-20 right-6 sm:right-8 z-30 p-2.5 rounded-full bg-[#7656f4] text-white shadow-lg hover:bg-[#6242e2] transition-all active:scale-95 flex items-center justify-center cursor-pointer animate-in fade-in zoom-in-75"
              title="Scroll to bottom"
              aria-label="Scroll to bottom"
            >
              <ArrowDown size={18} className="stroke-[2.5]" />
            </button>
          )}

          {/* Bottom Message Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <input
              type="text"
              placeholder={`Write message to ${activeContact.name}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f8fafc] sm:bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7656f4] transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="px-5 sm:px-6 py-3 bg-[#7656f4] hover:bg-[#6242e2] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-500/20 active:scale-95 shrink-0"
            >
              <span>Send</span>
              <Send size={15} className="stroke-[2.4]" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
