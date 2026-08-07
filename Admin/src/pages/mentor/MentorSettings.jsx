import { useState } from 'react';
import { Settings, Shield, Bell, Lock, CheckCircle2 } from 'lucide-react';

export default function MentorSettings() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
        <p className="text-sm text-slate-500">Manage security preferences and notification configurations.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell size={16} className="text-purple-600" /> Notifications
          </h3>
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
            <span className="text-xs font-semibold text-slate-700">Email alerts on student messages</span>
            <input type="checkbox" defaultChecked className="accent-purple-600" />
          </label>
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
            <span className="text-xs font-semibold text-slate-700">Reminders for weekly attendance uploads</span>
            <input type="checkbox" defaultChecked className="accent-purple-600" />
          </label>
        </div>

        <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Lock size={16} className="text-purple-600" /> Change Password
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> Settings saved successfully!
          </div>
        )}

        <button
          type="button"
          onClick={() => setSaved(true)}
          className="py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
