import { useState } from 'react';
import { Star, Award, CheckCircle2 } from 'lucide-react';

export default function MentorCreditPoints() {
  const [issued, setIssued] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Issue Credit Points</h2>
        <p className="text-sm text-slate-500">Assign activity and achievement credit points to your mentees.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); setIssued(true); }} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Mentee</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500">
              <option>Aarav Sharma (STU001)</option>
              <option>Riya Sen (STU002)</option>
              <option>Vikram Roy (STU003)</option>
              <option>Ananya Das (STU004)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500">
              <option>Co-curricular Achievement</option>
              <option>Research Paper Presentation</option>
              <option>Hackathon Victory</option>
              <option>Community Leadership</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Points Amount</label>
            <input
              type="number"
              placeholder="e.g. 15"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Remarks / Certificate Note</label>
            <textarea
              rows={3}
              placeholder="Provide reason for credit allocation..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
            />
          </div>

          {issued && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} /> Credit points issued successfully!
            </div>
          )}

          <button
            type="submit"
            className="mt-2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Award size={18} /> Issue Credit Points
          </button>
        </form>
      </div>
    </div>
  );
}
