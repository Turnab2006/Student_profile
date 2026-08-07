import { Megaphone, Calendar, User } from 'lucide-react';

const noticeList = [
  { id: 1, title: 'Project Submission Deadline Extension', date: 'Aug 07, 2026', audience: 'CSE 3rd Year Mentees', content: 'The final submission deadline for the Data Structures term project has been extended to August 15th.' },
  { id: 2, title: 'Mentorship Group Meeting Schedule', date: 'Aug 05, 2026', audience: 'All Mentees', content: 'Our weekly group mentorship session will take place this Friday at 3:00 PM in Room 304.' },
  { id: 3, title: 'Upcoming Internal Assessment Guidelines', date: 'Jul 30, 2026', audience: 'All Students', content: 'Internal assessment mid-term examination dates and syllabus outline have been published.' },
];

export default function MentorNotices() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notices & Announcements</h2>
          <p className="text-sm text-slate-500">View and broadcast official notices for your mentorship group.</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center gap-2">
          <Megaphone size={16} /> Post Notice
        </button>
      </div>

      <div className="space-y-4">
        {noticeList.map((n) => (
          <div key={n.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-900 text-lg">{n.title}</h3>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 font-semibold text-xs rounded-full">
                {n.audience}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1"><Calendar size={14} /> {n.date}</span>
              <span className="flex items-center gap-1"><User size={14} /> Issued by Kaushik Chatterjee</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
