import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Building2,
  GraduationCap,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MoreVertical,
  PhoneCall,
  Mail,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Check,
  FileText,
  UploadCloud,
  AlertCircle,
  ArrowUpDown,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  Pencil,
  ShieldCheck,
  TrendingUp,
  Info,
  BarChart2,
  Download,
  Plus
} from 'lucide-react';

function FigmaViewIcon({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* More bent upper eyelid curve */}
      <path d="M2.5 14.5C5.5 4.8 18.5 4.8 21.5 14.5" />
      {/* Pupil circle with white fill and purple border */}
      <circle
        cx="12"
        cy="15"
        r="3.2"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function FigmaUploadCloudPlusIcon({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.5 19A4.5 4.5 0 0 0 21 12.3a4.5 4.5 0 0 0-3.3-4.3 7 7 0 0 0-13.2 2.2A4.5 4.5 0 0 0 5.5 19h12z" />
      <line x1="11.5" y1="12" x2="11.5" y2="17" />
      <line x1="9" y1="14.5" x2="14" y2="14.5" />
    </svg>
  );
}

function FigmaCaretSortIcon({ size = 13, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 9l5-5 5 5" />
      <path d="M7 15l5 5 5-5" />
    </svg>
  );
}

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Comm. Engineering',
  'Electrical Engineering',
  'Mechanical Engineering'
];

const PROGRAMS = [
  'All Programs',
  'B.Tech',
  'M.Tech',
  'BCA',
  'MCA',
  'Diploma'
];

const initialMentees = [
  {
    id: 'MNT-1001',
    name: 'Tanuka Saha',
    initials: 'TS',
    email: 'tanuka@gmail.com',
    rollNo: 'CSE2024012',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Data Structures',
    courseCode: 'CS301',
    attendanceRate: 95,
    attendanceFraction: '(57/60)',
    status: 'Excellent',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9123930828',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 57,
  },
  {
    id: 'MNT-1002',
    name: 'Rahul Mehta',
    initials: 'RM',
    email: 'rahul@gmail.com',
    rollNo: 'CSE2024015',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Algorithms',
    courseCode: 'CS302',
    attendanceRate: 78,
    attendanceFraction: '(47/60)',
    status: 'Good',
    statusBg: 'bg-indigo-50',
    statusText: 'text-indigo-600',
    phone: '+91 9128449997',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 47,
  },
  {
    id: 'MNT-1003',
    name: 'Ananya Pal',
    initials: 'AP',
    email: 'ananya@gmail.com',
    rollNo: 'CSE2024019',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Database Systems',
    courseCode: 'CS303',
    attendanceRate: 88,
    attendanceFraction: '(53/60)',
    status: 'Very Good',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9417720899',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 53,
  },
  {
    id: 'MNT-1004',
    name: 'Sourav Kundu',
    initials: 'SK',
    email: 'sourav@gmail.com',
    rollNo: 'CSE2024023',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Operating Systems',
    courseCode: 'CS304',
    attendanceRate: 62,
    attendanceFraction: '(37/60)',
    status: 'At Risk',

    statusBg: 'bg-rose-50',
    statusText: 'text-rose-600',
    phone: '+91 9472612618',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 37,
  },
  {
    id: 'MNT-1005',
    name: 'Nikita Paul',
    initials: 'NP',
    email: 'nikita@gmail.com',
    rollNo: 'CSE2024027',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Computer Networks',
    courseCode: 'CS305',
    attendanceRate: 91,
    attendanceFraction: '(55/60)',
    status: 'Excellent',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9652496638',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 55,
  },
  {
    id: 'MNT-1006',
    name: 'Arjun Mukherjee',
    initials: 'AM',
    email: 'arjun@gmail.com',
    rollNo: 'CSE2024031',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    course: 'Software Engineering',
    courseCode: 'CS306',
    attendanceRate: 45,
    attendanceFraction: '(27/60)',
    status: 'At Risk',
    statusBg: 'bg-rose-50',
    statusText: 'text-rose-600',
    phone: '+91 9371847237',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 27,
  },
  {
    id: 'MNT-1007',
    name: 'Sneha Banerjee',
    initials: 'SB',
    email: 'sneha@gmail.com',
    rollNo: 'IT2024011',
    department: 'Information Technology',
    program: 'B.Tech',
    course: 'Web Technology',
    courseCode: 'IT301',
    attendanceRate: 94,
    attendanceFraction: '(56/60)',
    status: 'Excellent',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9916430472',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 56,
  },
  {
    id: 'MNT-1008',
    name: 'Dev Kumar',
    initials: 'DK',
    email: 'dev@gmail.com',
    rollNo: 'ECE2024018',
    department: 'Electronics & Comm. Engineering',
    program: 'B.Tech',
    course: 'Digital Electronics',
    courseCode: 'EC301',
    attendanceRate: 85,
    attendanceFraction: '(51/60)',
    status: 'Very Good',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9676268411',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 51,
  },
  {
    id: 'MNT-1009',
    name: 'Ishita Bose',
    initials: 'IB',
    email: 'ishita@gmail.com',
    rollNo: 'ME2024005',
    department: 'Mechanical Engineering',
    program: 'B.Tech',
    course: 'Thermodynamics',
    courseCode: 'ME301',
    attendanceRate: 96,
    attendanceFraction: '(58/60)',
    status: 'Excellent',
    statusBg: 'bg-[#f0eaff]',
    statusText: 'text-[#7656f4]',
    phone: '+91 9831002244',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 58,
  },
  {
    id: 'MNT-1010',
    name: 'Rahul Verma',
    initials: 'RV',
    email: 'rahulv@gmail.com',
    rollNo: 'EE2024022',
    department: 'Electrical Engineering',
    program: 'B.Tech',
    course: 'Power Systems',
    courseCode: 'EE301',
    attendanceRate: 72,
    attendanceFraction: '(43/60)',
    status: 'Good',
    statusBg: 'bg-indigo-50',
    statusText: 'text-indigo-600',
    phone: '+91 9711003355',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    isOnline: true,
    totalClasses: 60,
    attendedClasses: 43,
  },
];

export default function MentorAttendance({ initialUpload = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Stepper Full Page View State
  const [isUploadPage, setIsUploadPage] = useState(initialUpload);
  const [uploadStep, setUploadStep] = useState(1); // 1, 2, or 3

  useEffect(() => {
    if (initialUpload) {
      setIsUploadPage(true);
      setUploadStep(1);
    }
  }, [initialUpload]);
  const [selectedUploadMentee, setSelectedUploadMentee] = useState(initialMentees[0]);
  const [academicYear, setAcademicYear] = useState('2024 - 2025');
  const [semester, setSemester] = useState('1st Semester');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Subjects / Papers state for Step 2
  const [subjectPapers, setSubjectPapers] = useState([
    { code: 'RCC-POC-CSE-301', name: 'Data Structure & Algorithms', totalLectures: 30, attendedLectures: 19 },
    { code: 'RCC-POC-CSE-302', name: 'Digital Electronics', totalLectures: 30, attendedLectures: 20 },
    { code: 'RCC-POC-CSE-303', name: 'Programming in C', totalLectures: 30, attendedLectures: 18 },
    { code: 'RCC-POC-CSE-304', name: 'Discrete Mathematics', totalLectures: 30, attendedLectures: 21 },
    { code: 'RCC-HMC-001', name: 'Communicative English', totalLectures: 30, attendedLectures: 22 },
  ]);

  const [subjectSearchQuery, setSubjectSearchQuery] = useState('');

  const filteredSubjectPapers = useMemo(() => {
    if (!subjectSearchQuery.trim()) return subjectPapers;
    return subjectPapers.filter(
      (s) =>
        s.name.toLowerCase().includes(subjectSearchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(subjectSearchQuery.toLowerCase())
    );
  }, [subjectPapers, subjectSearchQuery]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjectPapers];
    updated[index] = { ...updated[index], [field]: Number(value) || 0 };
    setSubjectPapers(updated);
  };

  const totalLecturesSum = useMemo(() => {
    return subjectPapers.reduce((sum, s) => sum + (Number(s.totalLectures) || 0), 0);
  }, [subjectPapers]);

  const totalAttendedSum = useMemo(() => {
    return subjectPapers.reduce((sum, s) => sum + (Number(s.attendedLectures) || 0), 0);

  }, [subjectPapers]);

  const overallPercentage = useMemo(() => {
    if (!totalLecturesSum) return '0.00';
    return ((totalAttendedSum / totalLecturesSum) * 100).toFixed(2);
  }, [totalLecturesSum, totalAttendedSum]);

  // Modal & Menu States
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [viewMenteeModal, setViewMenteeModal] = useState(null);
  const [selectedMenteeSemesterView, setSelectedMenteeSemesterView] = useState(null);
  const [semFilterDropdownOpen, setSemFilterDropdownOpen] = useState(false);
  const [selectedSemFilter, setSelectedSemFilter] = useState('All Semesters');
  const [semesterDetailSubjectModal, setSemesterDetailSubjectModal] = useState(null);
  const [activeSemActionMenuId, setActiveSemActionMenuId] = useState(null);

  const [addMenteeModalOpen, setAddMenteeModalOpen] = useState(false);
  const [newMenteeData, setNewMenteeData] = useState({
    name: '',
    rollNo: '',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    email: '',
    phone: ''
  });

  const [successToast, setSuccessToast] = useState('');

  // Filtered Mentees
  const filteredMentees = useMemo(() => {
    return initialMentees.filter((mentee) => {
      const matchesSearch =
        mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentee.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentee.phone.includes(searchQuery);

      const matchesDept =
        selectedDept === 'All Departments' || mentee.department === selectedDept;

      const matchesProgram =
        selectedProgram === 'All Programs' || mentee.program === selectedProgram;

      return matchesSearch && matchesDept && matchesProgram;
    });
  }, [searchQuery, selectedDept, selectedProgram]);

  // Pagination Logic
  const totalCount = filteredMentees.length;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedMentees = filteredMentees.slice(startIndex, startIndex + rowsPerPage);
  const displayEndIndex = Math.min(startIndex + rowsPerPage, totalCount);

  const startUploadFlow = (mentee) => {
    setSelectedUploadMentee(mentee || initialMentees[0]);
    setUploadStep(1);
    setIsUploadPage(true);
  };

  const handleUploadSubmitFinal = () => {
    setSuccessToast(`Attendance for ${selectedUploadMentee.name} uploaded successfully!`);
    setIsUploadPage(false);
    setUploadStep(1);
    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  const handleAddMenteeSubmit = (e) => {
    e.preventDefault();
    setSuccessToast(`Mentee ${newMenteeData.name || 'Student'} added successfully!`);
    setAddMenteeModalOpen(false);
    setNewMenteeData({
      name: '',
      rollNo: '',
      department: 'Computer Science & Engineering',
      program: 'B.Tech',
      email: '',
      phone: ''
    });
    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  const semesterRecords = useMemo(() => [
    {
      id: 1,
      sem: 'Semester 1',
      year: 'Year 1',
      yearColor: 'bg-[#e0f2fe] text-[#0284c7]',
      percentage: '91.6%',
      rawPct: 91.6,
      fraction: '(55/60)',
      status: 'Excellent',
      statusBadge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
      barColor: 'bg-emerald-500'
    },
    {
      id: 2,
      sem: 'Semester 2',
      year: 'Year 1',
      yearColor: 'bg-[#e0f2fe] text-[#0284c7]',
      percentage: '86.6%',
      rawPct: 86.6,
      fraction: '(52/60)',
      status: 'Excellent',
      statusBadge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
      barColor: 'bg-emerald-500'
    },
    {
      id: 3,
      sem: 'Semester 3',
      year: 'Year 2',
      yearColor: 'bg-[#dcfce7] text-[#16a34a]',
      percentage: '78.3%',
      rawPct: 78.3,
      fraction: '(47/60)',
      status: 'Good',
      statusBadge: 'bg-blue-50 text-blue-600 border border-blue-200/60',
      barColor: 'bg-blue-500'
    },
    {
      id: 4,
      sem: 'Semester 4',
      year: 'Year 2',
      yearColor: 'bg-[#dcfce7] text-[#16a34a]',
      percentage: '83.3%',
      rawPct: 83.3,
      fraction: '(50/60)',
      status: 'Very Good',
      statusBadge: 'bg-purple-50 text-[#7656f4] border border-purple-200/60',
      barColor: 'bg-[#7656f4]'
    },
    {
      id: 5,
      sem: 'Semester 5',
      year: 'Year 3',
      yearColor: 'bg-[#fef3c7] text-[#d97706]',
      percentage: '63.3%',
      rawPct: 63.3,
      fraction: '(38/60)',
      status: 'At Risk',
      statusBadge: 'bg-rose-50 text-rose-600 border border-rose-200/60',
      barColor: 'bg-rose-500'
    },
    {
      id: 6,
      sem: 'Semester 6',
      year: 'Year 3',
      yearColor: 'bg-[#fef3c7] text-[#d97706]',
      percentage: '88.3%',
      rawPct: 88.3,
      fraction: '(53/60)',
      status: 'Excellent',
      statusBadge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
      barColor: 'bg-emerald-500'
    },
    {
      id: 7,
      sem: 'Semester 7',
      year: 'Year 4',
      yearColor: 'bg-[#f3e8ff] text-[#9333ea]',
      percentage: '95.0%',
      rawPct: 95.0,
      fraction: '(57/60)',
      status: 'Outstanding',
      statusBadge: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
      barColor: 'bg-emerald-600'
    },
    {
      id: 8,
      sem: 'Semester 8',
      year: 'Year 4',
      yearColor: 'bg-[#f3e8ff] text-[#9333ea]',
      percentage: '73.3%',
      rawPct: 73.3,
      fraction: '(44/60)',
      status: 'Average',
      statusBadge: 'bg-amber-50 text-amber-600 border border-amber-200/60',
      barColor: 'bg-amber-500'
    },
  ], []);

  const filteredSemesters = useMemo(() => {
    if (selectedSemFilter === 'Year 1') return semesterRecords.filter(s => s.year === 'Year 1');
    if (selectedSemFilter === 'Year 2') return semesterRecords.filter(s => s.year === 'Year 2');
    if (selectedSemFilter === 'Year 3') return semesterRecords.filter(s => s.year === 'Year 3');
    if (selectedSemFilter === 'Year 4') return semesterRecords.filter(s => s.year === 'Year 4');
    return semesterRecords;
  }, [selectedSemFilter, semesterRecords]);

  const handleExportExcel = (studentName) => {
    setSuccessToast(`Semester attendance record for ${studentName || 'student'} exported to Excel!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleDownloadSingleSem = (semName) => {
    setSuccessToast(`${semName} attendance report downloaded!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // IF SEMESTER ATTENDANCE FULL PAGE VIEW IS ACTIVE (MATCHING USER SCREENSHOT DESIGN)
  if (selectedMenteeSemesterView) {
    const menteeFirstName = selectedMenteeSemesterView.name ? selectedMenteeSemesterView.name.split(' ')[0] : 'Tanuka';
    return (
      <div className="flex flex-col gap-5 min-h-[calc(100vh-100px)] animate-fade-in">
        {/* SUCCESS TOAST NOTIFICATION */}
        {successToast && (
          <div className="fixed top-6 right-6 z-50 bg-[#1e1548] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-purple-400/30 flex items-center gap-3 animate-slide-in">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-semibold">{successToast}</span>
            <button
              onClick={() => setSuccessToast('')}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* TOP BAR: BACK BUTTON & EXPORT EXCEL BUTTON */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setSelectedMenteeSemesterView(null)}
            className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-[#f0eaff] text-[#7656f4] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Back to Attendance Roster"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => handleExportExcel(selectedMenteeSemesterView.name)}
            className="bg-white border border-[#7656f4]/40 hover:border-[#7656f4] text-[#7656f4] hover:bg-[#f0eaff]/40 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs flex flex-col gap-6">
          {/* HEADER ROW: ICON + TITLE + FILTER + DROPDOWN */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1e1548]">
                  {menteeFirstName}'s Semester Attendance
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  View and manage your semester-wise attendance records
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Filter Button */}
              <button
                type="button"
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
              >
                <Filter size={15} className="text-slate-500" />
                <span>Filter</span>
              </button>

              {/* All Semesters Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSemFilterDropdownOpen(!semFilterDropdownOpen)}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <span>{selectedSemFilter}</span>
                  <ChevronDown size={15} className={`text-slate-400 transition-transform ${semFilterDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {semFilterDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2 animate-scale-up">
                    {['All Semesters', 'Year 1', 'Year 2', 'Year 3', 'Year 4'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedSemFilter(opt);
                          setSemFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          selectedSemFilter === opt ? 'text-[#7656f4] bg-[#f0eaff]/40' : 'text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedSemFilter === opt && <Check size={14} className="text-[#7656f4]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABLE OF SEMESTERS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f6fe] border-b border-slate-200/80 text-[12px] font-bold text-[#7656f4] uppercase tracking-wider">
                    <th className="py-3.5 px-6">SEMESTER</th>
                    <th className="py-3.5 px-5">YEAR</th>
                    <th className="py-3.5 px-5">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <span>ATTENDANCE</span>
                        <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                      </div>
                    </th>
                    <th className="py-3.5 px-5">STATUS</th>
                    <th className="py-3.5 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSemesters.map((sem) => (
                    <tr key={sem.id} className="hover:bg-[#fbfafd] transition-colors">
                      {/* SEMESTER */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg border border-purple-200/60 bg-[#f0eaff]/60 text-[#7656f4] flex items-center justify-center flex-shrink-0">
                            <Calendar size={16} />
                          </div>
                          <span className="font-bold text-[#1e1548] text-sm">{sem.sem}</span>
                        </div>
                      </td>

                      {/* YEAR */}
                      <td className="py-4 px-5">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${sem.yearColor}`}>
                          {sem.year}
                        </span>
                      </td>

                      {/* ATTENDANCE */}
                      <td className="py-4 px-5 min-w-[210px]">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-[#1e1548] min-w-[45px]">{sem.percentage}</span>
                          <div className="w-24 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden flex-shrink-0">
                            <div
                              className={`${sem.barColor || 'bg-emerald-500'} h-full rounded-full transition-all`}
                              style={{ width: `${sem.rawPct}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-400">{sem.fraction}</span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-5">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${sem.statusBadge || 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'}`}>
                          {sem.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2.5 relative">
                          {/* View Details Button */}
                          <button
                            type="button"
                            onClick={() => setSemesterDetailSubjectModal(sem)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7656f4] border border-[#7656f4]/30 bg-[#f6f2fe] hover:bg-[#f0eaff] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Eye size={14} className="text-[#7656f4]" />
                            <span>View Details</span>
                          </button>

                          {/* Download Button */}
                          <button
                            type="button"
                            onClick={() => handleDownloadSingleSem(sem.sem)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7656f4] border border-[#7656f4]/30 bg-[#f6f2fe] hover:bg-[#f0eaff] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Download size={14} className="text-[#7656f4]" />
                            <span>Download</span>
                          </button>

                          {/* Options Menu Button */}
                          <button
                            type="button"
                            onClick={() => setActiveSemActionMenuId(activeSemActionMenuId === sem.id ? null : sem.id)}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeSemActionMenuId === sem.id && (
                            <div className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-40 py-1 text-left animate-scale-up">
                              <button
                                type="button"
                                onClick={() => {
                                  setSemesterDetailSubjectModal(sem);
                                  setActiveSemActionMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Eye size={14} />
                                <span>View Details</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDownloadSingleSem(sem.sem);
                                  setActiveSemActionMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Download size={14} />
                                <span>Download Report</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD FOOTER */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-500 font-medium">
            <div>
              Showing 1 to {filteredSemesters.length} of {filteredSemesters.length} semesters
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg bg-[#7656f4] text-white font-bold text-xs flex items-center justify-center shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* MODAL: VIEW ATTENDANCE (SEMESTER SUBJECT BREAKDOWN) */}
        {semesterDetailSubjectModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-4xl w-full p-6 sm:p-8 animate-scale-up flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
              {/* MODAL TOP HEADER */}
              <div className="flex items-center justify-between gap-4 pb-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 shadow-2xs">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1e1548]">View Attendance</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Detailed attendance record for the selected semester
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSemesterDetailSubjectModal(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* BOX 1: MENTEE PROFILE & TOTAL ATTENDANCE HEADER */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
                  <img
                    src={selectedMenteeSemesterView?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'}
                    alt={selectedMenteeSemesterView?.name || 'Student'}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-slate-200/60"
                  />
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h3 className="text-xl font-extrabold text-[#7656f4]">
                      {selectedMenteeSemesterView?.name || 'Arjun Mukherjee'}
                    </h3>
                    <div className="flex flex-col gap-2 text-xs font-semibold">
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <FileText size={15} className="text-[#7656f4] flex-shrink-0" />
                        <span className="text-[#7656f4] font-bold min-w-[130px]">College Roll No.</span>
                        <span className="font-bold text-slate-900 ml-2">{selectedMenteeSemesterView?.rollNo || 'CSE2024031'}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <Calendar size={15} className="text-[#7656f4] flex-shrink-0" />
                        <span className="text-[#7656f4] font-bold min-w-[130px]">Academic Year</span>
                        <span className="font-bold text-slate-900 ml-2">
                          {semesterDetailSubjectModal?.year === 'Year 1'
                            ? '1st Year'
                            : semesterDetailSubjectModal?.year === 'Year 2'
                            ? '2nd Year'
                            : semesterDetailSubjectModal?.year === 'Year 3'
                            ? '3rd Year'
                            : semesterDetailSubjectModal?.year === 'Year 4'
                            ? '4th Year'
                            : '1st Year'}
                        </span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <BookOpen size={15} className="text-[#7656f4] flex-shrink-0" />
                        <span className="text-[#7656f4] font-bold min-w-[130px]">Semester</span>
                        <span className="font-bold text-slate-900 ml-2">{semesterDetailSubjectModal?.sem || 'Semester 1'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-24 bg-slate-200/80" />

                <div className="flex flex-col items-center justify-center w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-500 mb-1">Total Attendance</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#7656f4] mb-2">
                    {semesterDetailSubjectModal?.percentage || '91.6%'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#dcfce7] text-[#16a34a] border border-emerald-200/80 text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                    <CheckCircle2 size={14} />
                    <span>{semesterDetailSubjectModal?.status || 'Good'}</span>
                  </span>
                </div>
              </div>

              {/* BOX 2: SUBJECTS / PAPERS TABLE */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f8f6fe] border-b border-slate-200/80 text-[12px] font-bold text-[#7656f4] uppercase tracking-wider">
                          <th className="py-3.5 px-4 text-center w-12">
                            <div className="flex items-center justify-center gap-1">
                              <BookOpen size={15} className="text-[#7656f4]" />
                              <span>#</span>
                            </div>
                          </th>
                          <th className="py-3.5 px-5">Paper Code</th>
                          <th className="py-3.5 px-5">Paper Name</th>
                          <th className="py-3.5 px-4 text-center">Total Lectures</th>
                          <th className="py-3.5 px-4 text-center">Total Attended</th>
                          <th className="py-3.5 px-4 text-center">Attendance (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {[
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                          { code: 'RCC-PCC-CSE-301', name: 'Data Structure & Algorithms', total: 30, attended: 19, pct: '63.33%' },
                        ].map((paper, idx) => (
                          <tr key={idx} className="hover:bg-[#fbfafd] transition-colors">
                            <td className="py-3.5 px-4 text-center">
                              <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold inline-flex items-center justify-center text-xs">
                                {idx + 1}.
                              </span>
                            </td>
                            <td className="py-3.5 px-5 font-extrabold text-slate-900">{paper.code}</td>
                            <td className="py-3.5 px-5 font-semibold text-slate-800 text-sm">{paper.name}</td>
                            <td className="py-3.5 px-4 text-center font-bold text-slate-700">{paper.total}</td>
                            <td className="py-3.5 px-4 text-center font-bold text-slate-700">{paper.attended}</td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-block px-3 py-1 rounded-full bg-[#f0eaff] text-[#7656f4] font-extrabold text-xs">
                                {paper.pct}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* BOX 3: OVERALL SUMMARY FOOTER */}
                <div className="bg-[#f8f6fe] border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={18} className="text-[#7656f4]" />
                    <span className="text-xs font-bold text-[#7656f4]">Overall Summary</span>
                  </div>

                  <div className="flex items-center gap-8 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-500">Total Lectures</span>
                      <span className="text-sm font-extrabold text-[#1e1548]">180</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-500">Total Attended</span>
                      <span className="text-sm font-extrabold text-[#1e1548]">114</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-semibold text-slate-500 mb-0.5">Overall Attendance</span>
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-[#7656f4] text-white font-extrabold text-xs shadow-2xs">
                      63.33%
                    </span>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER BUTTON */}
              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setSemesterDetailSubjectModal(null)}
                  className="px-6 py-2 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold shadow-2xs cursor-pointer active:scale-95 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // IF UPLOAD STEPPER PAGE IS ACTIVE (FIGMA UPLOAD ATTENDANCE VIEW)
  if (isUploadPage) {
    return (
      <div className="flex flex-col gap-6 min-h-[calc(100vh-100px)]">
        {/* SUCCESS TOAST NOTIFICATION */}
        {successToast && (
          <div className="fixed top-6 right-6 z-50 bg-[#1e1548] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-purple-400/30 flex items-center gap-3 animate-slide-in">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-sm font-semibold">{successToast}</span>
            <button
              onClick={() => setSuccessToast('')}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* TOP TITLE, SUBTITLE & TOP-RIGHT SEARCH BUTTON */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 shadow-2xs">
              <UploadCloud size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-[28px] font-semibold text-[#1e1548] tracking-tight">
                Upload Attendance
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                {uploadStep === 3
                  ? 'Review all details and upload your attendance file'
                  : 'Follow the steps below to upload attendance'}
              </p>
            </div>
          </div>

          {uploadStep === 2 && (
            <button
              type="button"
              className="bg-[#7656f4] hover:bg-[#6242e2] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Search size={17} />
              <span>Search</span>
            </button>
          )}
        </div>

        {/* MAIN UPLOAD CARD CONTAINER WITH STEPPER */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs flex flex-col gap-8">
          {/* STEPPER HEADER BAR */}
          <div className="flex items-center justify-center gap-4 sm:gap-10 pb-5 border-b border-slate-100 overflow-x-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 cursor-pointer relative" onClick={() => setUploadStep(1)}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    uploadStep >= 1
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : 'border border-slate-300 text-slate-400 bg-white'
                  }`}
                >
                  {uploadStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${
                    uploadStep === 1 || uploadStep > 1
                      ? 'font-bold text-[#7656f4]'
                      : 'font-medium text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Select Academic Details
                </span>
              </div>
              {uploadStep === 1 && (
                <div className="h-0.5 bg-[#7656f4] rounded-full w-full absolute -bottom-5" />
              )}
            </div>

            <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 cursor-pointer relative" onClick={() => setUploadStep(2)}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    uploadStep === 2
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : uploadStep > 2
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : 'border border-slate-300 text-slate-400 bg-white'
                  }`}
                >
                  {uploadStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${
                    uploadStep === 2 || uploadStep > 2
                      ? 'font-bold text-[#7656f4]'
                      : 'font-medium text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Enter Attendance Details
                </span>
              </div>
              {uploadStep === 2 && (
                <div className="h-0.5 bg-[#7656f4] rounded-full w-full absolute -bottom-5" />
              )}
            </div>

            <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 cursor-pointer relative" onClick={() => setUploadStep(3)}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    uploadStep === 3
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : 'border border-slate-300 text-slate-400 bg-white'
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${
                    uploadStep === 3
                      ? 'font-bold text-[#7656f4]'
                      : 'font-medium text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Review &amp; Upload
                </span>
              </div>
              {uploadStep === 3 && (
                <div className="h-0.5 bg-[#7656f4] rounded-full w-full absolute -bottom-5" />
              )}
            </div>
          </div>

          {/* STEP 1: SELECT ACADEMIC DETAILS */}
          {uploadStep === 1 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h2 className="text-base font-bold text-[#7656f4]">
                  Step 1: Select Academic Details
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Please confirm the student and academic details
                </p>
              </div>

              {/* BOX 1: STUDENT DETAILS */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                    <User size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#7656f4]">Student Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedUploadMentee?.name || 'Tanuka Saha'}
                      className="w-full bg-[#f8f9fc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>

                  {/* College Roll No */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">College Roll No.</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedUploadMentee?.rollNo || 'CSE2024012'}
                      className="w-full bg-[#f8f9fc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Department</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedUploadMentee?.department || 'Computer Science & Engineering'}
                      className="w-full bg-[#f8f9fc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* BOX 2: ACADEMIC DETAILS */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#7656f4]">Academic Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Academic Year</label>
                    <select
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#7656f4] cursor-pointer shadow-2xs"
                    >
                      <option value="2024 - 2025">2024 - 2025</option>
                      <option value="2025 - 2026">2025 - 2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#7656f4] cursor-pointer shadow-2xs"
                    >
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </select>
                  </div>
                </div>

                {/* Info Alert Banner */}
                <div className="bg-[#f4f0ff]/80 border border-[#7656f4]/20 rounded-xl p-3.5 px-4 flex items-center gap-3 text-xs font-semibold text-slate-900 shadow-2xs">
                  <Info size={18} className="text-[#7656f4] flex-shrink-0" />
                  <span className="text-slate-900 font-medium">Please ensure the selected academic details are correct before proceeding.</span>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-end gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadPage(false)}
                  className="px-6 py-2.5 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-98"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setUploadStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#7656f4] hover:bg-[#6242e2] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ENTER ATTENDANCE DETAILS */}
          {uploadStep === 2 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* BOX 1: ACADEMIC INFORMATION */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#7656f4]">Academic Information</h3>
                    <p className="text-xs text-slate-400 font-medium">Confirmed academic details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Academic Year */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Academic Year</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        readOnly
                        value={academicYear || '2024 - 2025'}
                        className="w-full bg-[#f8f9fc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester</label>
                    <div className="relative">
                      <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        readOnly
                        value={semester || '1st Semester'}
                        className="w-full bg-[#f8f9fc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BOX 2: SUBJECTS / PAPERS */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#7656f4]">Subjects / Papers</h3>
                    <p className="text-xs text-slate-400 font-medium">Enter total lectures and attended for each subject</p>
                  </div>
                </div>

                {/* SUBJECT PAPERS TABLE */}
                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8f6fe] border-b border-slate-200/80 text-[12px] font-bold text-[#7656f4] uppercase tracking-wider">
                        <th className="py-3.5 px-4 text-center w-12">#</th>
                        <th className="py-3.5 px-5">Paper Code</th>
                        <th className="py-3.5 px-5">Paper Name</th>
                        <th className="py-3.5 px-4 text-center">Total Lectures</th>
                        <th className="py-3.5 px-4 text-center">Total Attended</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjectPapers.map((paper, idx) => (
                        <tr key={paper.code} className="hover:bg-[#fbfafd] transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-700 text-xs">{idx + 1}</td>
                          <td className="py-3.5 px-5 font-bold text-slate-800 text-xs">{paper.code}</td>
                          <td className="py-3.5 px-5 font-bold text-slate-800 text-sm">{paper.name}</td>
                          <td className="py-3.5 px-4 text-center">
                            <input
                              type="number"
                              min="0"
                              value={paper.totalLectures}
                              onChange={(e) => handleSubjectChange(idx, 'totalLectures', e.target.value)}
                              className="w-24 bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-800 outline-none focus:border-[#7656f4] shadow-2xs mx-auto block"
                            />
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <input
                              type="number"
                              min="0"
                              value={paper.attendedLectures}
                              onChange={(e) => handleSubjectChange(idx, 'attendedLectures', e.target.value)}
                              className="w-24 bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-800 outline-none focus:border-[#7656f4] shadow-2xs mx-auto block"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Info Alert Banner */}
                <div className="bg-[#f4f0ff]/80 border border-[#7656f4]/20 rounded-xl p-3.5 px-4 flex items-center gap-3 text-xs font-semibold shadow-2xs">
                  <Info size={18} className="text-[#7656f4] flex-shrink-0" />
                  <span className="text-slate-900 font-medium">Please ensure all lectures and attendance details are accurate.</span>
                </div>
              </div>

              {/* FOOTER ACTION BUTTONS */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setUploadStep(1)}
                  className="px-6 py-2.5 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-2 active:scale-98"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setIsUploadPage(false)}
                    className="px-6 py-2.5 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-[#7656f4] hover:bg-[#6242e2] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & UPLOAD */}
          {uploadStep === 3 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* SECTION HEADER: REVIEW YOUR DETAILS */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold shadow-2xs">
                  <Eye size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#7656f4]">Review Your Details</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Please review all the information before uploading</p>
                </div>
              </div>

              {/* BOX 1: STUDENT DETAILS */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                      <User size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-[#7656f4]">Student Details</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUploadStep(1)}
                    className="border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 gap-4 md:gap-0">
                  <div className="md:pr-6 pb-3 md:pb-0">
                    <span className="block text-xs font-bold text-slate-500 mb-1">Name</span>
                    <span className="text-sm font-extrabold text-slate-900">{selectedUploadMentee?.name || 'Tanuka Saha'}</span>
                  </div>
                  <div className="md:px-6 py-3 md:py-0">
                    <span className="block text-xs font-bold text-slate-500 mb-1">College Roll No.</span>
                    <span className="text-sm font-extrabold text-slate-900">{selectedUploadMentee?.rollNo || 'CSE2024012'}</span>
                  </div>
                  <div className="md:pl-6 pt-3 md:pt-0">
                    <span className="block text-xs font-bold text-slate-500 mb-1">Department</span>
                    <span className="text-sm font-extrabold text-slate-900">{selectedUploadMentee?.department || 'Computer Science & Engineering'}</span>
                  </div>
                </div>
              </div>

              {/* BOX 2: ACADEMIC INFORMATION */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                      <GraduationCap size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-[#7656f4]">Academic Information</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUploadStep(1)}
                    className="border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 gap-4 md:gap-0">
                  <div className="md:pr-6 pb-3 md:pb-0">
                    <span className="block text-xs font-bold text-slate-500 mb-1">Academic Year</span>
                    <span className="text-sm font-extrabold text-slate-900">{academicYear || '2024 - 2025'}</span>
                  </div>
                  <div className="md:px-6 py-3 md:py-0">
                    <span className="block text-xs font-bold text-slate-500 mb-1">Semester</span>
                    <span className="text-sm font-extrabold text-slate-900">{semester || '1st Semester'}</span>
                  </div>
                  <div className="hidden md:block" />
                </div>
              </div>

              {/* BOX 3: SUBJECTS / PAPERS SUMMARY */}
              <div className="bg-[#fcfbfe] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                    <BookOpen size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#7656f4]">Subjects / Papers Summary</h3>
                </div>

                {/* SUMMARY TABLE */}
                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f8f6fe] border-b border-slate-200/80 text-[12px] font-bold text-[#7656f4] uppercase tracking-wider">
                          <th className="py-3.5 px-4 text-center w-12">#</th>
                          <th className="py-3.5 px-5">Paper Code</th>
                          <th className="py-3.5 px-5">Paper Name</th>
                          <th className="py-3.5 px-4 text-center">Total Lectures</th>
                          <th className="py-3.5 px-4 text-center">Total Attended</th>
                          <th className="py-3.5 px-4 text-center">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {subjectPapers.map((paper, idx) => {
                          const pct = paper.totalLectures ? ((paper.attendedLectures / paper.totalLectures) * 100) : 0;
                          const pctStr = pct.toFixed(2) + '%';
                          const badgeBg = pct >= 65 ? 'bg-[#dcfce7] text-[#16a34a]' : pct >= 50 ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-[#ffe4e6] text-[#e11d48]';

                          return (
                            <tr key={paper.code} className="hover:bg-[#fbfafd] transition-colors">
                              <td className="py-3.5 px-4 text-center font-bold text-slate-700 text-xs">{idx + 1}.</td>
                              <td className="py-3.5 px-5 font-bold text-slate-800 text-xs">{paper.code}</td>
                              <td className="py-3.5 px-5 font-bold text-slate-800 text-sm">{paper.name}</td>
                              <td className="py-3.5 px-4 text-center font-bold text-slate-700 text-xs">{paper.totalLectures}</td>
                              <td className="py-3.5 px-4 text-center font-bold text-slate-700 text-xs">{paper.attendedLectures}</td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${badgeBg}`}>
                                  {pctStr}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-[#f8f6fe] border-t-2 border-slate-200/80">
                        <tr>
                          <td colSpan={3} className="py-3.5 px-5">
                            <div className="flex items-center gap-2">
                              <BarChart2 size={16} className="text-[#7656f4]" />
                              <span className="text-xs font-bold text-[#7656f4]">Overall Summary</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] font-semibold text-slate-500">Total Lectures</span>
                              <span className="text-sm font-extrabold text-[#1e1548]">{totalLecturesSum}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] font-semibold text-slate-500">Total Attended</span>
                              <span className="text-sm font-extrabold text-[#1e1548]">{totalAttendedSum}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-[11px] font-semibold text-slate-500 mb-0.5">Overall Percentage</span>
                              <span className="inline-block px-4 py-1.5 rounded-lg bg-[#7656f4] text-white font-extrabold text-xs shadow-2xs">
                                {overallPercentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* EVERYTHING LOOKS GOOD BANNER */}
              <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Everything looks good!</h4>
                  <p className="text-xs text-slate-500 font-medium">You can now upload your attendance.</p>
                </div>
              </div>

              {/* FOOTER ACTION BUTTONS */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setUploadStep(2)}
                  className="px-6 py-2.5 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-2 active:scale-98"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setIsUploadPage(false)}
                    className="px-6 py-2.5 rounded-xl border border-[#7656f4] text-[#7656f4] bg-white hover:bg-[#f0eaff]/40 text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-98"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadSubmitFinal}
                    className="px-6 py-2.5 rounded-xl bg-[#7656f4] hover:bg-[#6242e2] text-white text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <UploadCloud size={16} />
                    <span>Upload Attendance</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN OVERVIEW ATTENDANCE LIST & GRID VIEW
  return (
    <div className="flex flex-col gap-5 min-h-[calc(100vh-100px)]">
      {/* SUCCESS TOAST NOTIFICATION */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1e1548] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-purple-400/30 flex items-center gap-3 animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-sm font-semibold">{successToast}</span>
          <button
            onClick={() => setSuccessToast('')}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}



      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input field */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search mentee by name, college roll number, email or phone"
            className="w-full bg-[#f8f9fc] border border-slate-200/60 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#7656f4] focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Right side control buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Department Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDeptDropdownOpen(!deptDropdownOpen);
                setProgramDropdownOpen(false);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 flex items-center gap-2.5 hover:border-slate-300 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <Building2 size={18} className="text-slate-500" />
              <span>{selectedDept}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${deptDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {deptDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setDeptDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedDept === dept ? 'text-[#7656f4] bg-[#f0eaff]/40' : 'text-slate-700'
                    }`}
                  >
                    <span>{dept}</span>
                    {selectedDept === dept && <Check size={14} className="text-[#7656f4]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProgramDropdownOpen(!programDropdownOpen);
                setDeptDropdownOpen(false);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 flex items-center gap-2.5 hover:border-slate-300 transition-all shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <GraduationCap size={18} className="text-slate-500" />
              <span>{selectedProgram}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${programDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {programDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2">
                {PROGRAMS.map((prog) => (
                  <button
                    key={prog}
                    onClick={() => {
                      setSelectedProgram(prog);
                      setProgramDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedProgram === prog ? 'text-[#7656f4] bg-[#f0eaff]/40' : 'text-slate-700'
                    }`}
                  >
                    <span>{prog}</span>
                    {selectedProgram === prog && <Check size={14} className="text-[#7656f4]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters Action Button */}
          <button
            type="button"
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
          >
            <Filter size={17} className="text-slate-500" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* META INFORMATIONAL ROW */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 font-medium px-1">
        <div>
          Showing{' '}
          <span className="font-bold text-[#7656f4]">
            {totalCount === 0 ? 0 : startIndex + 1}
          </span>{' '}
          to{' '}
          <span className="font-bold text-[#7656f4]">
            {displayEndIndex}
          </span>{' '}
          of <span className="font-bold text-[#7656f4]">{totalCount}</span> mentees
        </div>

        {/* View mode toggle (Grid vs List) */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium mr-1">View:</span>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN VIEW CONTENT AREA (LIST VIEW vs GRID VIEW) */}
      {viewMode === 'list' ? (
        /* DETAILED TABLE (FIGMA LIST VIEW) */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto max-h-[calc(100vh-280px)] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f6fe] border-b border-slate-200/80 text-[13px] font-bold text-[#7656f4] uppercase tracking-wider sticky top-0 z-10">
                  <th className="py-3.5 px-5">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>STUDENT</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>ROLL NO.</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>DEPARTMENT</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>PROGRAM</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>COURSE</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>ATTENDANCE</span>
                      <FigmaCaretSortIcon size={13} className="text-[#7656f4]" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedMentees.map((mentee) => (
                  <tr key={mentee.id} className="hover:bg-[#fbfafd] transition-colors">
                    {/* STUDENT */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          {/* Circle Avatar with Initials */}
                          <div className="w-10 h-10 rounded-full bg-[#7656f4] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                            {mentee.initials || 'TS'}
                          </div>
                          {/* Green Online Dot */}
                          <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1e1548] text-sm">{mentee.name}</span>
                          <span className="text-xs text-slate-400 font-medium">{mentee.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* ROLL NO. */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#1e1548] text-xs">{mentee.rollNo}</span>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <span className="text-xs font-semibold text-slate-700 block leading-snug">
                        {mentee.department}
                      </span>
                    </td>

                    {/* PROGRAM */}
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-semibold text-slate-700">{mentee.program || 'B.Tech'}</span>
                    </td>

                    {/* COURSE */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-xs">{mentee.course || 'Data Structures'}</span>
                        <span className="text-[11px] font-medium text-slate-400">{mentee.courseCode || 'CS301'}</span>
                      </div>
                    </td>

                    {/* ATTENDANCE */}
                    <td className="py-3.5 px-4 min-w-[170px]">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden flex-shrink-0">
                          <div
                            className="bg-[#7656f4] h-full rounded-full transition-all"
                            style={{ width: `${mentee.attendanceRate}%` }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-extrabold text-[#1e1548]">{mentee.attendanceRate}%</span>
                          <span className="text-[11px] font-medium text-slate-400">{mentee.attendanceFraction || '(57/60)'}</span>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${mentee.statusBg} ${mentee.statusText}`}
                      >
                        {mentee.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2 relative">
                        {/* View Square Icon Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedMenteeSemesterView(mentee)}
                          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#7656f4] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                          title="View Details"
                        >
                          <Eye size={16} className="text-[#7656f4]" />
                        </button>

                        {/* More Options Dropdown Button */}
                        <button
                          type="button"
                          onClick={() => setActiveActionMenuId(activeActionMenuId === mentee.id ? null : mentee.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                          title="More Options"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Action Dropdown Menu */}
                        {activeActionMenuId === mentee.id && (
                          <div className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-40 py-1 text-left animate-scale-up">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMenteeSemesterView(mentee);
                                setActiveActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Eye size={14} />
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                startUploadFlow(mentee);
                                setActiveActionMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <UploadCloud size={14} />
                              <span>Upload Attendance</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW CARDS */
        paginatedMentees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Header section with Avatar, Name, Roll No & Menu */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar with Online Status Indicator */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={mentee.avatar}
                          alt={mentee.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <span
                          className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"
                          title="Online"
                        />
                      </div>

                      {/* Mentee Name & Roll Number Pill Badge */}
                      <div className="flex flex-col">
                        <h3 className="text-[16px] font-bold text-[#7656f4] leading-snug">
                          {mentee.name}
                        </h3>
                        <div className="mt-1">
                          <span className="bg-[#f0eaff] text-[#7656f4] text-[11.5px] font-bold px-2.5 py-0.5 rounded-md inline-block">
                            {mentee.rollNo}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Three-dots Menu Icon */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveActionMenuId(activeActionMenuId === mentee.id ? null : mentee.id)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                        title="More Options"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeActionMenuId === mentee.id && (
                        <div className="absolute right-0 top-8 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-40 py-1 text-left animate-scale-up">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMenteeSemesterView(mentee);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Eye size={14} />
                            <span>View Details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              startUploadFlow(mentee);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0eaff]/50 hover:text-[#7656f4] flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <UploadCloud size={14} />
                            <span>Upload Attendance</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Details Section */}
                  <div className="my-4 pt-3.5 pb-3.5 border-t border-b border-slate-100 space-y-2 text-[13px] text-slate-600 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Building2 size={16} className="text-[#7656f4] flex-shrink-0" />
                      <span className="truncate">{mentee.department}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <PhoneCall size={16} className="text-[#7656f4] flex-shrink-0" />
                      <span>{mentee.phone}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail size={16} className="text-[#7656f4] flex-shrink-0" />
                      <span className="truncate">{mentee.email}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: View & Upload */}
                <div className="flex items-center gap-2.5 pt-1">
                  {/* View Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedMenteeSemesterView(mentee)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-[1.5px] border-[#7656f4] text-[#7656f4] hover:bg-[#f0eaff]/50 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-98"
                  >
                    <FigmaViewIcon size={17} />
                    <span>View</span>
                  </button>

                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => startUploadFlow(mentee)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#7656f4] hover:bg-[#6242e2] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
                  >
                    <FigmaUploadCloudPlusIcon size={17} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
            <AlertCircle size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No Mentees Found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search criteria or department filter.</p>
          </div>
        )
      )}

      {/* FOOTER PAGINATION BAR (FIGMA STYLE) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2 text-sm text-slate-500 font-medium">
        {/* Left: Rows per page selector */}
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer appearance-none pr-8 shadow-2xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Right: Page navigation buttons with First/Last controls */}
        <div className="flex items-center gap-1.5">
          {/* First Page */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg bg-[#f4effe] text-[#7656f4] flex items-center justify-center hover:bg-[#eadefe] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="First Page"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous Page */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg bg-[#f4effe] text-[#7656f4] flex items-center justify-center hover:bg-[#eadefe] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Active Page 1 */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-[#7656f4] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          {totalPages >= 2 && (
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 2
                  ? 'bg-[#7656f4] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              2
            </button>
          )}

          {/* Page 3 */}
          {totalPages >= 3 && (
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 3
                  ? 'bg-[#7656f4] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              3
            </button>
          )}

          {/* Ellipsis */}
          {totalPages > 4 && (
            <span className="px-1 text-slate-400 font-bold text-xs">...</span>
          )}

          {/* Last Page 10 */}
          {totalPages >= 10 && (
            <button
              type="button"
              onClick={() => setCurrentPage(10)}
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 10
                  ? 'bg-[#7656f4] text-white shadow-xs'
                  : 'bg-[#f4effe] text-[#7656f4] hover:bg-[#eadefe]'
              }`}
            >
              10
            </button>
          )}

          {/* Next Page */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-lg bg-[#f4effe] text-[#7656f4] flex items-center justify-center hover:bg-[#eadefe] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>

          {/* Last Page */}
          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 rounded-lg bg-[#f4effe] text-[#7656f4] flex items-center justify-center hover:bg-[#eadefe] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Last Page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL: ADD MENTEE */}
      {addMenteeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1e1548]">Add New Mentee</h3>
                  <p className="text-xs text-slate-400">Add a new student to your mentorship roster</p>
                </div>
              </div>
              <button
                onClick={() => setAddMenteeModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMenteeSubmit} className="my-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Mentee Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tanuka Saha"
                  value={newMenteeData.name}
                  onChange={(e) => setNewMenteeData({ ...newMenteeData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fc] border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#7656f4]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Roll Number</label>
                <input
                  type="text"
                  placeholder="e.g. CSE2024012"
                  value={newMenteeData.rollNo}
                  onChange={(e) => setNewMenteeData({ ...newMenteeData, rollNo: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fc] border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#7656f4]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Department</label>
                <select
                  value={newMenteeData.department}
                  onChange={(e) => setNewMenteeData({ ...newMenteeData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fc] border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#7656f4]"
                >
                  {DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Student Email</label>
                <input
                  type="email"
                  placeholder="e.g. tanuka@gmail.com"
                  value={newMenteeData.email}
                  onChange={(e) => setNewMenteeData({ ...newMenteeData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fc] border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#7656f4]"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setAddMenteeModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7656f4] hover:bg-[#6242e2] text-white font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Add Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW MENTEE ATTENDANCE */}
      {viewMenteeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#7656f4] text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {viewMenteeModal.initials || 'TS'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#7656f4]">{viewMenteeModal.name}</h3>
                  <span className="text-xs font-semibold text-[#7656f4] bg-[#f0eaff] px-2 py-0.5 rounded-md">
                    {viewMenteeModal.rollNo}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewMenteeModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-5 space-y-4">
              <div className="bg-[#fbfafd] p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase block">Overall Attendance</span>
                  <span className="text-2xl font-extrabold text-[#7656f4]">{viewMenteeModal.attendanceRate}%</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400 block">Classes Attended</span>
                  <span className="text-sm font-bold text-slate-800">
                    {viewMenteeModal.attendanceFraction || '(57/60)'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#7656f4] h-full rounded-full transition-all"
                    style={{ width: `${viewMenteeModal.attendanceRate}%` }}
                  />
                </div>
              </div>

              {/* Recent Log */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recent Session Logs</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {[
                    { date: '12 Aug 2026', title: 'Data Structures Lab Review', status: 'Present' },
                    { date: '05 Aug 2026', title: 'Algorithms Mid-Term Evaluation', status: 'Present' },
                    { date: '29 Jul 2026', title: 'Database Systems Viva', status: 'Present' },
                    { date: '22 Jul 2026', title: 'Group Guidance Session', status: 'Absent' },
                  ].map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 block">{log.title}</span>
                        <span className="text-slate-400">{log.date}</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${
                          log.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewMenteeModal(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

