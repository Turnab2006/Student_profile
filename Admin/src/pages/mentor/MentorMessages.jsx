import { useState } from 'react';
import { Send, Search, User, CheckCheck } from 'lucide-react';

const conversations = [
  { id: 1, name: 'Aarav Sharma', lastMsg: 'Sir, I have submitted my semester project draft.', time: '10:42 AM', unread: 2, avatar: 'AS' },
  { id: 2, name: 'Riya Sen', lastMsg: 'Thank you for approving my credit points request!', time: 'Yesterday', unread: 0, avatar: 'RS' },
  { id: 3, name: 'Vikram Roy', lastMsg: 'Can I meet during your office hours tomorrow?', time: 'Aug 5', unread: 0, avatar: 'VR' },
];

export default function MentorMessages() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'student', text: 'Good morning Sir! I wanted to inquire about my attendance status.', time: '10:30 AM' },
    { id: 2, sender: 'mentor', text: 'Good morning Aarav! Your current attendance is at 95%, which is excellent.', time: '10:35 AM' },
    { id: 3, sender: 'student', text: 'Sir, I have submitted my semester project draft.', time: '10:42 AM' },
  ]);

  function handleSend() {
    if (!messageText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'mentor', text: messageText, time: 'Just now' },
    ]);
    setMessageText('');
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[580px]">
      {/* Conversations sidebar */}
      <div className="border-r border-slate-200/80 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 mb-3">Mentee Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                activeChat.id === chat.id ? 'bg-purple-50/80' : 'hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-slate-900 text-sm truncate">{chat.name}</h4>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat pane */}
      <div className="md:col-span-2 flex flex-col h-full bg-slate-50/50">
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
            {activeChat.avatar}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{activeChat.name}</h4>
            <span className="text-[10px] text-emerald-600 font-medium">Online</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                  m.sender === 'mentor'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                }`}
              >
                <p>{m.text}</p>
                <span className={`text-[9px] mt-1 block text-right ${m.sender === 'mentor' ? 'text-purple-200' : 'text-slate-400'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
          />
          <button
            type="button"
            onClick={handleSend}
            className="p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors shadow-sm"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
