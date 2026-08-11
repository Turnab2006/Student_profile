import { Check, Mail, PhoneCall, MapPin, Award, BookOpen, Calendar } from 'lucide-react';

export default function MentorProfile() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-start justify-between">
        <div className="flex items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80"
            alt="Kaushik Chatterjee"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-200 shadow-md"
          />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">Kaushik Chatterjee</h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 font-semibold text-xs rounded-full">
                <Check size={14} /> Senior Mentor
              </span>
            </div>
            <p className="text-slate-500 font-medium mt-1">Assistant Professor, Dept. of Computer Science & Engineering</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-purple-600" /> kaushikchatterjee123@gmail.com</span>
              <span className="flex items-center gap-1.5"><PhoneCall size={14} className="text-purple-600" /> +91 9163926383</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-purple-600" /> Kolkata, West Bengal</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Award className="text-purple-600" size={18} /> Mentorship Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Assigned Mentees</span>
              <span className="font-bold text-slate-900">25 Students</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Avg. Attendance</span>
              <span className="font-bold text-emerald-600">92%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-500">Total Credits Issued</span>
              <span className="font-bold text-purple-600">120 Pts</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4 md:col-span-2">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-purple-600" size={18} /> Specialization & Responsibilities
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-900">Core Subjects</h4>
              <p className="text-slate-600 text-xs mt-1">Data Structures, Algorithms, Software Engineering, Machine Learning</p>
            </div>
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
              <h4 className="font-bold text-purple-900">Office Hours</h4>
              <p className="text-slate-600 text-xs mt-1">Mon - Fri (2:00 PM - 4:00 PM), Room 304 Academic Block</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
