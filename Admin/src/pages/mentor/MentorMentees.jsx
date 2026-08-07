import { useState } from 'react';
import { Search, Filter, Mail, Phone, ExternalLink } from 'lucide-react';

const menteeData = [
  { id: 'STU001', name: 'Aarav Sharma', dept: 'Computer Science & Engineering', year: '3rd Year', attendance: '95%', credits: 120, status: 'Active', avatar: 'AS', email: 'aarav.sharma@example.com', phone: '+91 9876543210' },
  { id: 'STU002', name: 'Riya Sen', dept: 'Computer Science & Engineering', year: '3rd Year', attendance: '92%', credits: 115, status: 'Active', avatar: 'RS', email: 'riya.sen@example.com', phone: '+91 9876543211' },
  { id: 'STU003', name: 'Vikram Roy', dept: 'Information Technology', year: '2nd Year', attendance: '88%', credits: 90, status: 'Active', avatar: 'VR', email: 'vikram.roy@example.com', phone: '+91 9876543212' },
  { id: 'STU004', name: 'Ananya Das', dept: 'Computer Science & Engineering', year: '4th Year', attendance: '98%', credits: 150, status: 'Active', avatar: 'AD', email: 'ananya.das@example.com', phone: '+91 9876543213' },
  { id: 'STU005', name: 'Sohan Mukherjee', dept: 'Electronics & Comm.', year: '1st Year', attendance: '72%', credits: 45, status: 'Inactive', avatar: 'SM', email: 'sohan.m@example.com', phone: '+91 9876543214' },
];

export default function MentorMentees() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentees = menteeData.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Assigned Mentees</h2>
          <p className="text-sm text-slate-500">Manage and track performance of your assigned student mentees.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search mentee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-5">Student</th>
              <th className="py-3.5 px-4">Department & Year</th>
              <th className="py-3.5 px-4">Attendance</th>
              <th className="py-3.5 px-4">Credit Points</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMentees.map((mentee) => (
              <tr key={mentee.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                      {mentee.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{mentee.name}</h4>
                      <span className="text-xs text-slate-400">{mentee.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-slate-900 font-medium">{mentee.dept}</div>
                  <div className="text-xs text-slate-400">{mentee.year}</div>
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-600">
                  {mentee.attendance}
                </td>
                <td className="py-4 px-4 font-bold text-slate-800">
                  {mentee.credits} Pts
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    mentee.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {mentee.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`mailto:${mentee.email}`} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Mail size={16} />
                    </a>
                    <a href={`tel:${mentee.phone}`} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Phone size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
