import { useState } from 'react';
import { CalendarCheck, Save, CheckCircle2 } from 'lucide-react';

const menteeAttendanceList = [
  { id: 'STU001', name: 'Aarav Sharma', roll: '2024CS01', present: true },
  { id: 'STU002', name: 'Riya Sen', roll: '2024CS02', present: true },
  { id: 'STU003', name: 'Vikram Roy', roll: '2024IT05', present: true },
  { id: 'STU004', name: 'Ananya Das', roll: '2024CS10', present: true },
  { id: 'STU005', name: 'Sohan Mukherjee', roll: '2024ECE03', present: false },
];

export default function MentorAttendance() {
  const [attendance, setAttendance] = useState(menteeAttendanceList);
  const [saved, setSaved] = useState(false);

  function togglePresence(id) {
    setAttendance((prev) =>
      prev.map((item) => (item.id === id ? { ...item, present: !item.present } : item))
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Upload Attendance</h2>
        <p className="text-sm text-slate-500">Record daily or session-wise mentee attendance records.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-3xl">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
            <input type="date" defaultValue="2026-08-07" className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Session Type</label>
            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
              <option>Mentorship Meeting</option>
              <option>Lab Evaluation</option>
              <option>Project Review</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {attendance.map((m) => (
            <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div>
                <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                <span className="text-xs text-slate-400 ml-2">({m.roll})</span>
              </div>
              <button
                type="button"
                onClick={() => togglePresence(m.id)}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                  m.present
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : 'bg-rose-100 text-rose-700 border border-rose-300'
                }`}
              >
                {m.present ? 'Present' : 'Absent'}
              </button>
            </div>
          ))}
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> Attendance saved successfully!
          </div>
        )}

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
        >
          <Save size={18} /> Save Attendance Records
        </button>
      </div>
    </div>
  );
}
