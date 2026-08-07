import { useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function MentorResults() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Upload Mentee Results</h2>
        <p className="text-sm text-slate-500">Publish semester grade sheets and marks for assigned mentees.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-2xl">
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Academic Session</label>
            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500">
              <option>Spring Semester 2024</option>
              <option>Autumn Semester 2023</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject / Course</label>
            <input
              type="text"
              placeholder="e.g. Data Structures & Algorithms (CS301)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Result CSV / Excel File</label>
            <div className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/60 transition-colors">
              <Upload className="text-purple-600 mb-2" size={32} />
              <span className="text-sm font-semibold text-slate-700">Click to upload or drag & drop</span>
              <span className="text-xs text-slate-400 mt-1">Supports XLSX, CSV up to 10MB</span>
            </div>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} /> Results published successfully to mentee portals!
            </div>
          )}

          <button
            type="submit"
            className="mt-2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
          >
            Publish Results
          </button>
        </form>
      </div>
    </div>
  );
}
