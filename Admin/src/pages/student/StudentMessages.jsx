import { useState, useRef, useEffect } from "react";
import {
  Send,
  Briefcase,
  Mail,
  Phone,
  Lightbulb,
  CheckCheck,
  Building2,
  ChevronDown
} from "lucide-react";
import { initialStudentData } from "../../data/studentProfileData";

export default function StudentMessages({ hideHeader = false }) {
  const [student] = useState(initialStudentData);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Initial chat messages matching the reference design exactly
  const [messages, setMessages] = useState([
    // Older chat history (scroll up to discover)
    {
      id: "hist-0",
      dateBadge: "28 April 2024",
    },
    {
      id: "hist-1",
      sender: "mentor",
      text: "Welcome to the new academic term! Feel free to reach out here whenever you need guidance with your course projects or research topics.",
      time: "09:30 AM",
    },
    {
      id: "hist-2",
      sender: "student",
      text: "Thank you so much Sir! I will definitely keep that in mind.",
      time: "09:45 AM",
      status: "read",
    },
    // Main reference chat flow
    {
      id: "date-1",
      dateBadge: "2 May 2024",
    },
    {
      id: "msg-1",
      sender: "student",
      text: "Hello Sir, How are you?",
      time: "10:15 AM",
      status: "read",
    },
    {
      id: "msg-2",
      sender: "mentor",
      text: "Hello Arjun,\nI'm good, thank you! How can I help you today?",
      time: "10:18 AM",
    },
    {
      id: "msg-3",
      sender: "student",
      text: "I wanted to discuss about my final year project idea and get your guidance on the next steps.",
      time: "10:20 AM",
      status: "read",
    },
    {
      id: "msg-4",
      sender: "mentor",
      text: "Sure, I'd be happy to help. Please share your project idea and current progress.",
      time: "10:22 AM",
    },
    {
      id: "date-2",
      dateBadge: "Today",
    },
    {
      id: "msg-5",
      sender: "student",
      text: "Here is a brief overview of my project and the problems I'm facing. Could we schedule a meeting to discuss it in detail?",
      time: "10:25 AM",
      status: "read",
    },
    {
      id: "msg-6",
      sender: "mentor",
      text: "Thank you for reaching out. Let's meet tomorrow at 11:00 AM in my cabin.",
      time: "10:30 AM",
    },
  ]);

  // Scroll to bottom on initial load and when sending a new message
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: "msg-" + Date.now(),
      sender: "student",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");

    setTimeout(() => {
      scrollToBottom("smooth");
    }, 50);
  };

  const mentorAvatar = student.mentorDetails?.avatar || "/rahul_sharma_avatar.png";
  const mentorName = "Kawshik Chattarji";
  const mentorRole = "Mentor";
  const mentorDept = "Computer Science & Engineering";
  const mentorEmail = "kawshik.chattarji@trackademy.in";
  const mentorPhone = "+91 98305 10022";

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-3 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto">
      {/* Optional Top Page Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Messages
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Direct academic guidance and communication with your faculty mentor.
            </p>
          </div>
        </div>
      )}

      {/* Main Container: Two Columns on Laptop/Desktop, Single Chat Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: MENTOR DETAILS (Visible on Laptop/Desktop, Hidden on Mobile) */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-4">
          
          {/* 1. Main Mentor Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 p-5 sm:p-6 space-y-5">
            
            {/* Top Mentor Avatar & Status */}
            <div className="text-center space-y-3">
              <div className="relative inline-block mx-auto">
                <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden ring-4 ring-slate-100/90 shadow-md bg-slate-100 flex items-center justify-center">
                  <img
                    src={mentorAvatar}
                    alt={mentorName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden h-full w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl items-center justify-center">
                    KC
                  </div>
                </div>

                {/* Online Indicator Badge */}
                <span
                  className="absolute bottom-1 right-2 h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full bg-[#10b981] ring-3 ring-white shadow-xs"
                  title="Online"
                />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {mentorName}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-[#1d61e7] mt-0.5">
                  {mentorRole}
                </p>
              </div>
            </div>

            {/* Contact Details Card (Soft Blue Container) */}
            <div className="bg-[#f0f6fe]/90 rounded-2xl p-4 space-y-3 border border-blue-100/70 shadow-2xs">
              
              {/* Department */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1d61e7] shadow-2xs border border-blue-50">
                  <Briefcase size={16} className="stroke-[2.2]" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Department
                  </p>
                  <p className="text-xs font-bold text-slate-800 truncate" title={mentorDept}>
                    {mentorDept}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1d61e7] shadow-2xs border border-blue-50">
                  <Mail size={16} className="stroke-[2.2]" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-xs font-bold text-slate-800 truncate" title={mentorEmail}>
                    {mentorEmail}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#1d61e7] shadow-2xs border border-blue-50">
                  <Phone size={16} className="stroke-[2.2]" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {mentorPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* About Mentor */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                About Mentor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                I'm here to help you with academic guidance, career advice and any professional queries you may have.
              </p>
            </div>

            {/* Tips Card */}
            <div className="bg-[#f0f6fe]/90 rounded-2xl p-3.5 flex items-start gap-3 border border-blue-100/70 shadow-2xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#1d61e7] shadow-2xs border border-blue-50 mt-0.5">
                <Lightbulb size={16} className="stroke-[2.2]" />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <p className="text-xs font-bold text-slate-900">Tips</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Be clear and specific about your questions to get the best guidance.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: CHAT CONVERSATION VIEW (Full Width on Mobile & Laptop)      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 w-full bg-white rounded-3xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex flex-col overflow-hidden h-[calc(100vh-125px)] sm:h-[calc(100vh-110px)] min-h-[550px]">
          
          {/* Mobile-Only Header Bar with Mentor Summary (Primary Blue Gradient) */}
          <div className="lg:hidden p-3.5 sm:p-4 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] text-white flex items-center justify-between gap-3 shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={mentorAvatar}
                  alt={mentorName}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white shadow-2xs" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight tracking-tight">
                  {mentorName}
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-sky-100 mt-0.5">
                  {mentorRole} &bull; {mentorDept}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Message Flow Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 scroll-smooth custom-scrollbar bg-white"
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

              const isStudent = item.sender === "student";

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-2.5 sm:gap-3 ${
                    isStudent ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Mentor Profile Thumbnail beside incoming messages */}
                  {!isStudent && (
                    <div className="relative shrink-0 mt-1">
                      <img
                        src={mentorAvatar}
                        alt="Mentor"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-1 ring-slate-200 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Message Bubble with Box Shadow */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] sm:max-w-[72%] transition-all duration-200 ${
                      isStudent
                        ? "bg-[#eef5fe] border border-blue-200/70 text-slate-800 rounded-tr-xs shadow-[0_4px_16px_rgba(29,97,231,0.09)] hover:shadow-[0_6px_20px_rgba(29,97,231,0.13)] ml-auto"
                        : "bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.09)] text-slate-800 rounded-tl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line text-slate-800 font-normal">
                      {item.text}
                    </p>

                    {/* Time & Read Status */}
                    <div
                      className={`flex items-center justify-end gap-1.5 text-[10px] sm:text-[11px] mt-1.5 ${
                        isStudent ? "text-blue-500 font-medium" : "text-slate-400"
                      }`}
                    >
                      <span>{item.time}</span>
                      {isStudent && (
                        <CheckCheck size={14} className="text-[#1d61e7] stroke-[2.4]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Scroll Anchor */}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Bottom Message Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f8fafc] sm:bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="px-5 sm:px-6 py-3 bg-[#1d61e7] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95 shrink-0"
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
