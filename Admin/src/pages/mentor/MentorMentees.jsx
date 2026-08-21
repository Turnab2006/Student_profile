import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Mail,
  PhoneCall,
  Eye,
  MessageSquare,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  List,
  LayoutGrid,
  Building2,
  X,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Filter,
  User,
  Send,
  Award,
  Target,
  Camera,
  Globe,
  Heart,
  MapPin,
  Home,
  Droplet,
  Calendar,
  Users,
  Briefcase,
  Star,
  Shield,
  Check,
  BookOpen,
  BookAudio,
  Flag,
  CreditCard,
  Code,
  Lightbulb,
  Clock,
  RefreshCw,
  Brain,
  FileText
} from 'lucide-react';

function ActionEyeIcon({ size = 18, className = "text-[#7656f4]" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ActionMessageIcon({ size = 18, className = "text-[#7656f4]" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="8" x2="16" y2="8" strokeWidth="2" />
      <line x1="8" y1="12" x2="13" y2="12" strokeWidth="2" />
    </svg>
  );
}

const customMenteeRecords = [
  { name: 'Tanuka Saha', rollNo: 'CSE2024012', department: 'Computer Science & Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9123930828', studentEmail: 'cse202413@recruit.org.in', avatar: '/tanuka_saha_avatar.png' },
  { name: 'Aarav Sharma', rollNo: 'IT2024002', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9128449997', studentEmail: 'it2024002@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Aarav Sharma 2', rollNo: 'IT2024022', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9997921760', studentEmail: 'it2024022@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Aarav Sharma 3', rollNo: 'IT2024042', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9323772077', studentEmail: 'it2024042@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Amitav Basu', rollNo: 'ECE2024018', department: 'Electronics & Comm. Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9417720899', studentEmail: 'ece2024018@recruit.org.in' },
  { name: 'Amitav Basu 2', rollNo: 'ECE2024038', department: 'Electronics & Comm. Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9676268411', studentEmail: 'ece2024038@recruit.org.in' },
  { name: 'Ananya Das', rollNo: 'ME2024005', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9472612618', studentEmail: 'me2024005@recruit.org.in' },
  { name: 'Ananya Das 2', rollNo: 'ME2024025', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9652496638', studentEmail: 'me2024025@recruit.org.in' },
  { name: 'Ananya Das 3', rollNo: 'ME2024045', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9371847237', studentEmail: 'me2024045@recruit.org.in' },
  { name: 'Arpan Ghosh', rollNo: 'IT2024012', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9916430472', studentEmail: 'it2024012@recruit.org.in' },
  { name: 'Arpan Ghosh 2', rollNo: 'IT2024032', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9621720096', studentEmail: 'it2024032@recruit.org.in' }
];

const initialMentees = Array.from({ length: 50 }, (_, i) => {
  if (i < customMenteeRecords.length) {
    const rec = customMenteeRecords[i];
    const avatarId = (i % 70) + 1;
    const avatarGender = (i % 2 === 0) ? 'women' : 'men';
    return {
      id: `MNT-${1000 + i}`,
      name: rec.name,
      rollNo: rec.rollNo,
      department: rec.department,
      mentorEmail: rec.mentorEmail,
      phone: rec.phone,
      studentEmail: rec.studentEmail,
      avatar: rec.avatar || `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`,
      isOnline: i % 3 !== 0,
      attendance: `${88 + (i % 12)}%`,
      credits: 90 + (i * 3) % 80,
      status: 'Active',
      year: `${(i % 4) + 1}rd Year`
    };
  }

  const names = [
    'Riya Sen', 'Vikram Roy', 'Sohan Mukherjee', 'Priya Roy', 'Rahul Verma',
    'Sneha Banerjee', 'Dev Kumar', 'Ishita Bose', 'Meera Nair', 'Karan Patel',
    'Pooja Gupta', 'Subhajit Dutta', 'Taniya Chatterji', 'Nandini Das', 'Rohan Mehta'
  ];
  const depts = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Comm. Engineering',
    'Electrical Engineering',
    'Mechanical Engineering'
  ];
  const prefixes = ['CSE', 'IT', 'ECE', 'EE', 'ME'];

  const nameIdx = i % names.length;
  const deptIdx = i % depts.length;
  const prefix = prefixes[deptIdx];
  const rollNum = `${prefix}2024${String(i + 1).padStart(3, '0')}`;

  const avatarId = (i % 70) + 1;
  const avatarGender = (i % 2 === 0) ? 'women' : 'men';

  return {
    id: `MNT-${1000 + i}`,
    name: `${names[nameIdx]} ${Math.floor(i / 15) + 1}`,
    rollNo: rollNum,
    department: depts[deptIdx],
    mentorEmail: 'arindam.roy@trackademy.in',
    phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
    studentEmail: `${rollNum.toLowerCase()}@recruit.org.in`,
    avatar: `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`,
    isOnline: i % 3 !== 0,
    attendance: `${85 + (i % 15)}%`,
    credits: 80 + (i * 3) % 100,
    status: 'Active',
    year: `${(i % 4) + 1}rd Year`
  };
});

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Comm. Engineering',
  'Electrical Engineering',
  'Mechanical Engineering'
];

export default function MentorMentees({ onNavigate }) {
  const navigate = useNavigate();

  const handleViewProfile = (mentee) => {
    if (onNavigate) {
      onNavigate('student-profile', false, mentee);
    } else {
      navigate('/mentor/mentees/profile', { state: { mentee } });
    }
  };

  const handleGoToMessages = (mentee) => {
    if (onNavigate) {
      onNavigate('messages');
    } else {
      navigate('/mentor/messages');
    }
  };

  const [mentees, setMentees] = useState(initialMentees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState('All Mentors');
  const [sortBy, setSortBy] = useState('Name (A-Z)');
  const [viewMode, setViewMode] = useState('grid'); // 'list' | 'grid'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [messagingMentee, setMessagingMentee] = useState(null); // For Quick Message modal
  const [toastMessage, setToastMessage] = useState(null);

  // New Mentee Form State
  const [newMentee, setNewMentee] = useState({
    name: '',
    rollNo: '',
    program: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    mentorEmail: 'kaushik.c@trackademy.edu',
    phone: '',
    studentEmail: '',
  });

  // Message Form State
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Toast notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter & Sort Logic
  const filteredMentees = useMemo(() => {
    return mentees.filter((m) => {
      const text = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !text ||
        (m.name && m.name.toLowerCase().includes(text)) ||
        (m.rollNo && m.rollNo.toLowerCase().includes(text)) ||
        (m.studentEmail && m.studentEmail.toLowerCase().includes(text)) ||
        (m.email && m.email.toLowerCase().includes(text)) ||
        (m.phone && m.phone.includes(text));

      const matchesDept =
        selectedDepartment === 'all' ||
        selectedDepartment === 'All Departments' ||
        m.department === selectedDepartment;

      const matchesProgram =
        selectedProgram === 'all' ||
        selectedProgram === 'All Programs' ||
        m.program === selectedProgram;

      const matchesYear =
        selectedYear === 'all' ||
        selectedYear === 'All Years' ||
        m.year === selectedYear;

      return matchesSearch && matchesDept && matchesProgram && matchesYear;
    }).sort((a, b) => {
      if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
      if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
      if (sortBy === 'Roll No') return a.rollNo.localeCompare(b.rollNo);
      return 0;
    });
  }, [mentees, searchTerm, selectedDepartment, selectedProgram, selectedYear, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMentees.length / rowsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * rowsPerPage;
  const paginatedMentees = filteredMentees.slice(startIndex, startIndex + rowsPerPage);

  // Handlers
  const handleAddMenteeSubmit = (e) => {
    e.preventDefault();
    if (!newMentee.name || !newMentee.rollNo) {
      triggerToast('Please fill in required fields (Name & Roll No)');
      return;
    }

    const createdMentee = {
      id: `MNT-${Date.now()}`,
      name: newMentee.name,
      rollNo: newMentee.rollNo,
      program: newMentee.program || 'B.Tech',
      department: newMentee.department,
      year: newMentee.year || '1st Year',
      mentorEmail: newMentee.mentorEmail || 'kaushik.c@trackademy.edu',
      phone: newMentee.phone || '+91 9123456789',
      studentEmail: newMentee.studentEmail || `${newMentee.rollNo.toLowerCase()}@student.edu`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      isOnline: true,
      attendance: '95%',
      credits: 100,
      status: 'Active',
    };

    setMentees((prev) => [createdMentee, ...prev]);
    setShowAddModal(false);
    setNewMentee({
      name: '',
      rollNo: '',
      program: 'B.Tech',
      department: 'Computer Science & Engineering',
      year: '1st Year',
      mentorEmail: 'kaushik.c@trackademy.edu',
      phone: '',
      studentEmail: '',
    });
    triggerToast(`Added ${createdMentee.name} to assigned mentees successfully!`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      triggerToast('Please write a message before sending.');
      return;
    }
    triggerToast(`Message sent to ${messagingMentee.name} (${messagingMentee.studentEmail})`);
    setMessagingMentee(null);
    setMessageSubject('');
    setMessageBody('');
  };

  return (
    <div className="flex flex-col gap-2.5 text-slate-800 font-sans p-2 sm:px-5 sm:py-2.5 pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl animate-fade-in border border-slate-700">
          <Sparkles className="text-emerald-400" size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SEARCH AND FILTERS BAR (EXACTLY MATCHING USER SCREENSHOT) */}
      <div className="flex items-center gap-3 flex-wrap bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search students by name, ID or email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300 text-gray-800"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* All Programs Dropdown */}
        <div className="relative">
          <select
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[140px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Programs</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Tech Lateral">B.Tech Lateral</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* All Years Dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[120px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Years</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* All Departments Dropdown */}
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[150px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Electrical Engineering">EE</option>
            <option value="Electronics & Comm. Engineering">ECE</option>
            <option value="Information Technology">IT</option>
            <option value="Mechanical Engineering">ME</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* List / Grid View Toggles */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1 ml-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            title="Grid View"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            title="List View"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT AREA: LIST VIEW OR GRID VIEW */}
      {viewMode === 'list' ? (
        /* TABLE LIST VIEW MATCHING SCREENSHOT EXACTLY */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f0eaff] text-[#7656f4] text-[11.5px] font-extrabold uppercase tracking-wider border-b border-[#e2d9fd]">
                  <th className="py-3.5 px-4 sm:px-5">MENTEE</th>
                  <th className="py-3.5 px-4">ID / COLLEGE ROLL NO.</th>
                  <th className="py-3.5 px-4">DEPARTMENT</th>
                  <th className="py-3.5 px-4">EMAIL</th>
                  <th className="py-3.5 px-4">CONTACT</th>
                  <th className="py-3.5 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
                {paginatedMentees.length > 0 ? (
                  paginatedMentees.map((mentee) => (
                    <tr
                      key={mentee.id}
                      className="hover:bg-[#f0eaff]/40 transition-colors group"
                    >
                      {/* MENTEE (Avatar + Name) */}
                      <td className="py-3.5 px-4 sm:px-5">
                        <div
                          onClick={() => handleViewProfile(mentee)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={mentee.avatar}
                              alt={mentee.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  'https://ui-avatars.com/api/?name=' +
                                  encodeURIComponent(mentee.name) +
                                  '&background=7656f4&color=fff';
                              }}
                            />
                            {mentee.isOnline && (
                              <span
                                title="Active Online"
                                className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0 shadow-sm"
                              />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-[13px] text-slate-900 group-hover:text-[#7656f4] group-hover:underline transition-colors block">
                              {mentee.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ID / COLLEGE ROLL NO. (Pill badge) */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-3 py-1 bg-[#f0eaff] text-[#7656f4] border border-[#e2d9fd] rounded-full text-[12px] font-semibold tracking-wide">
                          {mentee.rollNo}
                        </span>
                      </td>

                      {/* DEPARTMENT */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium text-[13px] leading-snug block">
                          {mentee.department}
                        </span>
                      </td>

                      {/* EMAIL (Student / Mentee Email) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail size={14} className="text-[#7656f4] flex-shrink-0" />
                          <span className="text-[13px]">{mentee.studentEmail || mentee.email}</span>
                        </div>
                      </td>

                      {/* CONTACT (Phone number only) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <PhoneCall size={14} className="text-[#7656f4] flex-shrink-0" />
                          <span className="text-[13px] font-medium">{mentee.phone}</span>
                        </div>
                      </td>

                      {/* ACTIONS (Eye + Message) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2.5">
                          {/* View Profile Action */}
                          <button
                            onClick={() => handleViewProfile(mentee)}
                            title="View Student Profile"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200/90 text-[#7656f4] hover:border-[#7656f4] hover:bg-[#f0eaff] transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <ActionEyeIcon size={18} />
                          </button>

                          {/* Quick Message Action -> Redirects to Message Section */}
                          <button
                            onClick={() => handleGoToMessages(mentee)}
                            title="Open Message Section"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200/90 text-[#7656f4] hover:border-[#7656f4] hover:bg-[#f0eaff] transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <ActionMessageIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={32} className="text-slate-300" />
                        <p className="text-sm font-semibold">No mentees found</p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search query or department filter
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER CONTROL INSIDE THE SAME CARD MATCHING SCREENSHOT */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-white">
            {/* Rows per page dropdown */}
            <div className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium z-10">
              <span>Rows per page:</span>
              <div className="relative">
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200/90 rounded-xl text-[12px] font-semibold text-slate-800 outline-none cursor-pointer hover:border-slate-300"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Page navigation controls: << < 1 2 3 4 5 > >> (CENTER ALIGNED) */}
            <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center gap-3.5 text-slate-600">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronsLeft size={16} />
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center cursor-pointer ${validCurrentPage === pageNum
                      ? 'bg-[#7656f4] text-white shadow-sm shadow-[#7656f4]/20'
                      : 'text-slate-600 hover:text-[#7656f4] hover:bg-[#f0eaff]'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW LAYOUT MATCHING SCREENSHOT EXACTLY */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedMentees.map((mentee) => (
            <div
              key={mentee.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
            >
              {/* Mentee Header: Avatar + Name + Roll Badge */}
              <div
                onClick={() => handleViewProfile(mentee)}
                className="flex items-center gap-3 cursor-pointer group/header"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 group-hover/header:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://ui-avatars.com/api/?name=' +
                        encodeURIComponent(mentee.name) +
                        '&background=7656f4&color=fff';
                    }}
                  />
                  {mentee.isOnline && (
                    <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0 shadow-xs" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-[#7656f4] group-hover/header:underline text-[14px] leading-snug">
                    {mentee.name}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#f0eaff] text-[#7656f4] border border-[#e2d9fd] rounded-full text-[11px] font-semibold tracking-wide w-max">
                    {mentee.rollNo}
                  </span>
                </div>
              </div>

              {/* Contact Info: Phone & Email */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2 text-[12px] text-slate-700 font-medium">
                  <PhoneCall size={13} className="text-[#7656f4] flex-shrink-0" />
                  <span>{mentee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-slate-600">
                  <Mail size={13} className="text-[#7656f4] flex-shrink-0" />
                  <span className="truncate">{mentee.studentEmail}</span>
                </div>
              </div>

              {/* Action Buttons: View Profile & Message */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleViewProfile(mentee)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#f0eaff] hover:bg-[#7656f4] text-[#7656f4] hover:text-white rounded-xl text-[12px] font-semibold transition-all cursor-pointer border border-[#e2d9fd]"
                >
                  <ActionEyeIcon size={16} />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => handleGoToMessages(mentee)}
                  title="Open Message Section"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-[#f0eaff] text-[#7656f4] rounded-xl border border-slate-200/90 hover:border-[#7656f4] transition-all cursor-pointer flex-shrink-0 shadow-2xs"
                >
                  <ActionMessageIcon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL 1: ADD NEW MENTEE --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#f0eaff] text-[#7656f4] rounded-xl">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Add New Mentee</h3>
                  <p className="text-xs text-slate-500">Assign a student profile to your mentorship</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMenteeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanuka Saha"
                  value={newMentee.name}
                  onChange={(e) => setNewMentee({ ...newMentee, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    College Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE2024012"
                    value={newMentee.rollNo}
                    onChange={(e) => setNewMentee({ ...newMentee, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Department
                  </label>
                  <select
                    value={newMentee.department}
                    onChange={(e) => setNewMentee({ ...newMentee, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4] bg-white"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mentor Email
                </label>
                <input
                  type="email"
                  value={newMentee.mentorEmail}
                  onChange={(e) => setNewMentee({ ...newMentee, mentorEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 9123930828"
                    value={newMentee.phone}
                    onChange={(e) => setNewMentee({ ...newMentee, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    placeholder="student@recruit.org.in"
                    value={newMentee.studentEmail}
                    onChange={(e) => setNewMentee({ ...newMentee, studentEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#7656f4] hover:bg-[#6242e2] text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Confirm & Add Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* --- MODAL 3: QUICK MESSAGE --- */}
      {messagingMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#f0eaff] text-[#7656f4] rounded-xl">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Send Message to {messagingMentee.name}
                  </h3>
                  <p className="text-xs text-slate-500">{messagingMentee.studentEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setMessagingMentee(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Assignment Review & Feedback"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your mentorship message here..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMessagingMentee(null)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#7656f4] text-white rounded-xl text-sm font-semibold hover:bg-[#5b3be8] shadow-md shadow-[#7656f4]/20"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FILTER DRAWER --- */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="text-[#7656f4]" size={20} />
                  <h3 className="font-extrabold text-slate-900 text-lg">Filter Mentees</h3>
                </div>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Sort Order
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white"
                  >
                    <option value="Name (A-Z)">Name (A-Z)</option>
                    <option value="Name (Z-A)">Name (Z-A)</option>
                    <option value="Roll No">Roll No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedDepartment('All Departments');
                  setSearchTerm('');
                  setSortBy('Name (A-Z)');
                  setShowFilterDrawer(false);
                }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 bg-[#7656f4] text-white rounded-xl text-sm font-semibold hover:bg-[#5b3be8]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
