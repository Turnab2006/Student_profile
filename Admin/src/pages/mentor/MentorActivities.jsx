import { Activity, Clock } from 'lucide-react';

const activitiesList = [
  { id: 1, text: 'Published Spring 2024 semester results for CSE mentees', time: '2 hours ago' },
  { id: 2, text: 'Approved 15 Credit Points for Aarav Sharma (Hackathon Winner)', time: 'Yesterday' },
  { id: 3, text: 'Recorded weekly attendance for Mentorship Session #12', time: 'Aug 04, 2026' },
  { id: 4, text: 'Posted notice: Project Submission Deadline Extension', time: 'Aug 02, 2026' },
];

export default function MentorActivities() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Activity Log</h2>
        <p className="text-sm text-slate-500">Recent actions, approvals, and logs in your mentor account.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          {activitiesList.map((a) => (
            <div key={a.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                <Activity size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">{a.text}</p>
                <span className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <Clock size={12} /> {a.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
