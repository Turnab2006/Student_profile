import { useState } from 'react';
import { Headphones, Mail, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function MentorSupport() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Support</h2>
        <p className="text-sm text-slate-500">Contact the admin tech support team for portal help.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm md:col-span-2">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Mail size={18} className="text-purple-600" /> Submit a Support Ticket
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issue Category</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
                <option>Mentee Mapping Issue</option>
                <option>Grade Upload Error</option>
                <option>Portal Login Issue</option>
                <option>Other Technical Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
              <input type="text" placeholder="Brief summary of the issue..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
              <textarea rows={4} placeholder="Describe the problem in detail..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" required />
            </div>

            {sent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} /> Ticket submitted! The admin support team will reach out shortly.
              </div>
            )}

            <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md">
              Send Support Ticket
            </button>
          </form>
        </div>

        <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Headphones size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Urgent Help?</h3>
            <p className="text-purple-100 text-xs leading-relaxed">
              Our IT Helpdesk is available Mon - Fri (9 AM - 6 PM) for immediate portal assistance.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-purple-500/50 text-xs space-y-1">
            <p className="font-bold">Email: support@trackademy.edu</p>
            <p className="font-bold">Phone: +91 1800-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
