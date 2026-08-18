import { useState } from "react";
import {
  Send,
  Paperclip,
  Search,
  CheckCheck,
  Phone,
  Video,
} from "lucide-react";

export default function MentorMessages({ hideHeader = false }) {
  const [activeContactId, setActiveContactId] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    {
      id: "1",
      name: "Tuhina Banerjee",
      role: "Mentee • B.Tech CSE",
      department: "CSE Dept",
      avatar: "TB",
      online: true,
      lastMessage: "Just add the comparative analysis diagram...",
      time: "10:42 AM",
      unread: 0,
    },
    {
      id: "2",
      name: "Aarav Sharma",
      role: "Mentee • B.Tech CSE",
      department: "CSE Dept",
      avatar: "AS",
      online: true,
      lastMessage: "Sir, I have submitted my semester project draft.",
      time: "10:42 AM",
      unread: 2,
    },
    {
      id: "3",
      name: "Riya Sen",
      role: "Mentee • B.Tech CSE",
      department: "CSE Dept",
      avatar: "RS",
      online: false,
      lastMessage: "Thank you for approving my credit points request!",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "4",
      name: "Vikram Roy",
      role: "Mentee • B.Tech CSE",
      department: "CSE Dept",
      avatar: "VR",
      online: false,
      lastMessage: "Can I meet during your office hours tomorrow?",
      time: "Aug 5",
      unread: 0,
    },
  ];

  const [conversations, setConversations] = useState({
    "1": [
      {
        id: "m1",
        sender: "mentor",
        text: "Hello Tuhina! Please make sure to submit your semester project proposal draft before this Friday.",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "student",
        text: "Yes sir, I have already uploaded the draft in the activities portal. Could you please review Section 3 when you get a chance?",
        time: "10:35 AM",
      },
      {
        id: "m3",
        sender: "mentor",
        text: "I checked it, looks very promising! Just add the comparative analysis diagram and you are good to go.",
        time: "10:42 AM",
      },
    ],
    "2": [
      {
        id: "m1",
        sender: "student",
        text: "Good morning Sir! I wanted to inquire about my attendance status.",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Good morning Aarav! Your current attendance is at 95%, which is excellent.",
        time: "10:35 AM",
      },
      {
        id: "m3",
        sender: "student",
        text: "Sir, I have submitted my semester project draft.",
        time: "10:42 AM",
      },
    ],
    "3": [
      {
        id: "m1",
        sender: "student",
        text: "Thank you for approving my credit points request!",
        time: "Yesterday",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "You are welcome Riya! Keep up the good work.",
        time: "Yesterday",
      },
    ],
    "4": [
      {
        id: "m1",
        sender: "student",
        text: "Can I meet during your office hours tomorrow?",
        time: "Aug 5",
      },
      {
        id: "m2",
        sender: "mentor",
        text: "Sure Vikram, drop by around 2:00 PM tomorrow.",
        time: "Aug 5",
      },
    ],
  });

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const messages = conversations[activeContactId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: "mentor",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg],
    }));
    setMessageInput("");
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 font-['Roboto',sans-serif]">
      {!hideHeader && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Barlow',sans-serif]">
            Mentee Messages &amp; Chat
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-['Barlow',sans-serif]">
            Direct communication with your assigned mentees and students.
          </p>
        </div>
      )}

      {/* Main Messaging Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-[560px]">
        {/* Left Contacts Sidebar */}
        <div className="border-r border-gray-100 flex flex-col justify-between">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentees & students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === activeContactId;
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setActiveContactId(contact.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected ? "bg-[#E7EFFE]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected ? "bg-[#2384FD] text-white" : "bg-blue-100 text-[#2384FD]"
                      }`}
                    >
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? "text-[#2384FD]" : "text-gray-900"}`}>
                        {contact.name}
                      </h4>
                      <span className="text-[10px] text-gray-400">{contact.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">{contact.role}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-1">{contact.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat View */}
        <div className="flex flex-col justify-between h-full bg-[#FAFAFC]">
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2384FD] font-bold text-xs flex items-center justify-center">
                {activeContact.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{activeContact.name}</h3>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {activeContact.role} &bull; {activeContact.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer transition-colors"
                title="Voice Call"
              >
                <Phone size={16} />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer transition-colors"
                title="Video Call"
              >
                <Video size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isMentor = msg.sender === "mentor";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMentor ? "justify-end" : "justify-start"}`}
                >
                  {!isMentor && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#2384FD] font-bold text-[10px] flex items-center justify-center shrink-0">
                      {activeContact.avatar}
                    </div>
                  )}

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isMentor
                        ? "bg-[#2384FD] text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
                        isMentor ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      <span>{msg.time}</span>
                      {isMentor && <CheckCheck size={12} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center gap-2 sm:gap-3"
          >
            <button
              type="button"
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder={`Write message to ${activeContact.name}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="px-4 py-2.5 bg-[#2384FD] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send size={15} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
