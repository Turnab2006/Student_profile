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
  Plus,
  IdCard
} from 'lucide-react';
import StudentAttendance from '../student/StudentAttendance';

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
  const [viewMode, setViewMode] = useState('grid'); // 'list' or 'grid'
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

  // IF SEMESTER ATTENDANCE FULL PAGE VIEW IS ACTIVE (MATCHING EXACT STUDENT PORTAL ATTENDANCE VIEW)
  if (selectedMenteeSemesterView) {
    return (
      <div className="w-full animate-in fade-in duration-200">
        <StudentAttendance
          studentName={selectedMenteeSemesterView.name}
          onBack={() => setSelectedMenteeSemesterView(null)}
          userRole="mentor"
        />
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
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${uploadStep >= 1
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : 'border border-slate-300 text-slate-400 bg-white'
                    }`}
                >
                  {uploadStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${uploadStep === 1 || uploadStep > 1
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
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${uploadStep === 2
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : uploadStep > 2
                        ? 'bg-[#7656f4] text-white shadow-xs'
                        : 'border border-slate-300 text-slate-400 bg-white'
                    }`}
                >
                  {uploadStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${uploadStep === 2 || uploadStep > 2
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
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${uploadStep === 3
                      ? 'bg-[#7656f4] text-white shadow-xs'
                      : 'border border-slate-300 text-slate-400 bg-white'
                    }`}
                >
                  3
                </div>
                <span
                  className={`text-sm whitespace-nowrap transition-all ${uploadStep === 3
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
                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${selectedDept === dept ? 'text-[#7656f4] bg-[#f0eaff]/40' : 'text-slate-700'
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
                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${selectedProgram === prog ? 'text-[#7656f4] bg-[#f0eaff]/40' : 'text-slate-700'
                      }`}
                  >
                    <span>{prog}</span>
                    {selectedProgram === prog && <Check size={14} className="text-[#7656f4]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View mode toggle (Grid vs List) in place of Filters */}
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
        /* GRID VIEW CARDS (SAME CARD AS RESULT SECTION WITHOUT IMAGES) */
        paginatedMentees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Mentee Header */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">
                        {mentee.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-[#f6f2fe] text-[#7656f4] text-[11px] font-semibold px-2 py-0.5 rounded-md mt-0.5">
                        <IdCard size={13} className="text-[#7656f4]" />
                        {mentee.rollNo}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`px-2.5 py-0.5 rounded-lg text-base font-extrabold inline-block ${mentee.statusBg} ${mentee.statusText}`}>
                        {mentee.attendanceRate}%
                      </div>
                      <span className="block text-[10px] text-gray-400 font-medium mt-0.5">
                        {mentee.status}
                      </span>
                    </div>
                  </div>

                  {/* Key-Value Details */}
                  <div className="space-y-2 py-2.5 border-t border-b border-gray-50 my-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-medium flex items-center gap-1.5">
                        <Building2 size={15} className="text-[#7656f4]" />
                        Department
                      </span>
                      <span className="font-bold text-gray-800">{mentee.department}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-medium flex items-center gap-1.5">
                        <PhoneCall size={15} className="text-[#7656f4]" />
                        Phone
                      </span>
                      <span className="font-bold text-gray-800">{mentee.phone}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-medium flex items-center gap-1.5">
                        <Mail size={15} className="text-[#7656f4]" />
                        Email
                      </span>
                      <span className="font-bold text-gray-800 truncate max-w-[170px]">{mentee.email}</span>
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="pb-2">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-gray-500 text-[11.5px]">Attendance Progress</span>
                      <span className="text-[11px] font-semibold text-gray-400">{mentee.attendanceFraction || ''}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7656f4] h-full rounded-full transition-all"
                        style={{ width: `${mentee.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedMenteeSemesterView(mentee)}
                    className="bg-[#f6f2fe] border border-[#7656f4]/30 text-[#7656f4] hover:bg-purple-100 py-[10.5px] px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => startUploadFlow(mentee)}
                    className="bg-[#7656f4] hover:bg-[#6242e2] text-white py-[10.5px] px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <UploadCloud size={16} />
                    <span>Upload Attendance</span>
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
            className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${currentPage === 1
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
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${currentPage === 2
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
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${currentPage === 3
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
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${currentPage === 10
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
                        className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${log.status === 'Present'
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


