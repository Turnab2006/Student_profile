import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  UploadCloud,
  Calendar,
  CalendarDays,
  IdCard,
  ChevronDown,
  LayoutGrid,
  List,
  Eye,
  Building2,
  UserCheck,
  X,
  CheckCircle2,
  FileText,
  Download,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  User,
  GraduationCap,
  MessageSquareText,
  ArrowLeft,
  ClipboardList,
  MoreVertical,
  Pencil,
  Trash2
} from 'lucide-react';

const mockMentees = [
  {
    id: 1,
    name: 'Tanuka Saha',
    rollNo: 'CSE2024011',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '89%',
    status: 'Excellent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.90',
    cgpa: '8.85',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A+', marks: '91%' },
      { code: 'CS302', name: 'Computer Organization & Arch.', credits: 4, grade: 'A', marks: '85%' },
      { code: 'CS303', name: 'Object Oriented Programming', credits: 3, grade: 'O', marks: '94%' },
      { code: 'CS304', name: 'Discrete Mathematics', credits: 4, grade: 'A+', marks: '88%' },
      { code: 'HU301', name: 'Values & Ethics in Profession', credits: 2, grade: 'O', marks: '95%' },
    ]
  },
  {
    id: 2,
    name: 'Arjun Mukherjee',
    rollNo: 'CSE2024031',
    department: 'CSE',
    year: '1st Year',
    semester: '1st Sem',
    yearSem: '1st Year / 1st Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '91.6%',
    status: 'Outstanding',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sgpa: '9.16',
    cgpa: '9.16',
    subjects: [
      { code: 'CS101', name: 'Programming for Problem Solving', credits: 4, grade: 'O', marks: '96%' },
      { code: 'PH101', name: 'Engineering Physics', credits: 4, grade: 'A+', marks: '90%' },
      { code: 'M101', name: 'Mathematics - I', credits: 4, grade: 'A+', marks: '89%' },
      { code: 'EE101', name: 'Basic Electrical Engineering', credits: 3, grade: 'O', marks: '93%' },
      { code: 'HU101', name: 'English Communication Skills', credits: 2, grade: 'A+', marks: '90%' },
    ]
  },
  {
    id: 3,
    name: 'Sneha Roy',
    rollNo: 'ECE2024005',
    department: 'ECE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Prof. S. Chatterjee',
    lastResult: '84%',
    status: 'Very Good',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.40',
    cgpa: '8.32',
    subjects: [
      { code: 'EC301', name: 'Analog Electronic Circuits', credits: 4, grade: 'A', marks: '83%' },
      { code: 'EC302', name: 'Digital Logic & Circuit Design', credits: 4, grade: 'A+', marks: '88%' },
      { code: 'EC303', name: 'Signals and Systems', credits: 4, grade: 'B+', marks: '79%' },
      { code: 'M301', name: 'Engineering Mathematics III', credits: 3, grade: 'A', marks: '84%' },
      { code: 'HU301', name: 'Environmental Sciences', credits: 2, grade: 'O', marks: '92%' },
    ]
  },
  {
    id: 4,
    name: 'Rohan Sharma',
    rollNo: 'CSE2024015',
    department: 'CSE',
    year: '3rd Year',
    semester: '5th Sem',
    yearSem: '3rd Year / 5th Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '78%',
    status: 'Good',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    sgpa: '7.80',
    cgpa: '7.75',
    subjects: [
      { code: 'CS501', name: 'Database Management Systems', credits: 4, grade: 'A', marks: '82%' },
      { code: 'CS502', name: 'Operating Systems', credits: 4, grade: 'B+', marks: '76%' },
      { code: 'CS503', name: 'Design & Analysis of Algorithms', credits: 4, grade: 'B', marks: '72%' },
      { code: 'CS504', name: 'Software Engineering', credits: 3, grade: 'A', marks: '81%' },
    ]
  },
  {
    id: 5,
    name: 'Priya Patel',
    rollNo: 'IT2024009',
    department: 'IT',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. A. K. Sen',
    lastResult: '93%',
    status: 'Outstanding',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    sgpa: '9.30',
    cgpa: '9.22',
    subjects: [
      { code: 'IT301', name: 'Object Oriented Programming with Java', credits: 4, grade: 'O', marks: '96%' },
      { code: 'IT302', name: 'Data Structures & Files', credits: 4, grade: 'O', marks: '94%' },
      { code: 'IT303', name: 'Digital Electronics', credits: 3, grade: 'A+', marks: '90%' },
      { code: 'IT304', name: 'Formal Language & Automata', credits: 4, grade: 'A+', marks: '92%' },
    ]
  },
  {
    id: 6,
    name: 'Aniket Das',
    rollNo: 'ME2024021',
    department: 'ME',
    year: '1st Year',
    semester: '2nd Sem',
    yearSem: '1st Year / 2nd Sem',
    mentor: 'Prof. M. Dutta',
    lastResult: '72%',
    status: 'Good',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    sgpa: '7.20',
    cgpa: '7.15',
    subjects: [
      { code: 'ME201', name: 'Engineering Mechanics', credits: 4, grade: 'B+', marks: '74%' },
      { code: 'ME202', name: 'Thermodynamics', credits: 4, grade: 'B', marks: '69%' },
      { code: 'PH201', name: 'Applied Physics', credits: 3, grade: 'B+', marks: '73%' },
    ]
  },
  {
    id: 7,
    name: 'Vikram Singh',
    rollNo: 'EE2024003',
    department: 'EE',
    year: '3rd Year',
    semester: '6th Sem',
    yearSem: '3rd Year / 6th Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '88%',
    status: 'Excellent',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.80',
    cgpa: '8.74',
    subjects: [
      { code: 'EE601', name: 'Control Systems Engineering', credits: 4, grade: 'A+', marks: '90%' },
      { code: 'EE602', name: 'Power Electronics', credits: 4, grade: 'A', marks: '86%' },
      { code: 'EE603', name: 'Electrical Machines II', credits: 4, grade: 'A+', marks: '89%' },
    ]
  },
  {
    id: 8,
    name: 'Isha Roy',
    rollNo: 'CSE2024028',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '86%',
    status: 'Very Good',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.60',
    cgpa: '8.55',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A+', marks: '88%' },
      { code: 'CS302', name: 'Computer Organization & Arch.', credits: 4, grade: 'A', marks: '84%' },
      { code: 'CS303', name: 'Object Oriented Programming', credits: 3, grade: 'A+', marks: '87%' },
    ]
  },
  {
    id: 9,
    name: 'Sourav Ganguly',
    rollNo: 'CSE2024040',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '90%',
    status: 'Outstanding',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    sgpa: '9.00',
    cgpa: '8.92',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'O', marks: '93%' },
      { code: 'CS302', name: 'Computer Organization', credits: 4, grade: 'A+', marks: '89%' },
    ]
  },
  {
    id: 10,
    name: 'Debjani Paul',
    rollNo: 'ECE2024018',
    department: 'ECE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Prof. S. Chatterjee',
    lastResult: '82%',
    status: 'Very Good',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.20',
    cgpa: '8.10',
    subjects: [
      { code: 'EC301', name: 'Analog Circuits', credits: 4, grade: 'A', marks: '81%' },
      { code: 'EC302', name: 'Digital Logic', credits: 4, grade: 'A', marks: '83%' },
    ]
  },
  {
    id: 11,
    name: 'Manish Kumar',
    rollNo: 'IT2024014',
    department: 'IT',
    year: '1st Year',
    semester: '2nd Sem',
    yearSem: '1st Year / 2nd Sem',
    mentor: 'Dr. A. K. Sen',
    lastResult: '75%',
    status: 'Good',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    sgpa: '7.50',
    cgpa: '7.45',
    subjects: [
      { code: 'IT201', name: 'Data Structures with C', credits: 4, grade: 'B+', marks: '76%' },
      { code: 'IT202', name: 'Discrete Math', credits: 3, grade: 'B', marks: '74%' },
    ]
  },
  {
    id: 12,
    name: 'Ritika Ghosal',
    rollNo: 'CSE2024052',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '95%',
    status: 'Outstanding',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    sgpa: '9.50',
    cgpa: '9.48',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'O', marks: '97%' },
      { code: 'CS302', name: 'Computer Architecture', credits: 4, grade: 'O', marks: '95%' },
    ]
  },
  {
    id: 13,
    name: 'Aditya Sen',
    rollNo: 'ME2024011',
    department: 'ME',
    year: '3rd Year',
    semester: '5th Sem',
    yearSem: '3rd Year / 5th Sem',
    mentor: 'Prof. M. Dutta',
    lastResult: '79%',
    status: 'Good',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    sgpa: '7.90',
    cgpa: '7.82',
    subjects: [
      { code: 'ME501', name: 'Fluid Mechanics', credits: 4, grade: 'A', marks: '80%' },
      { code: 'ME502', name: 'Heat Transfer', credits: 4, grade: 'B+', marks: '78%' },
    ]
  },
  {
    id: 14,
    name: 'Pooja Bose',
    rollNo: 'EE2024019',
    department: 'EE',
    year: '2nd Year',
    semester: '4th Sem',
    yearSem: '2nd Year / 4th Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '87%',
    status: 'Excellent',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.70',
    cgpa: '8.65',
    subjects: [
      { code: 'EE401', name: 'Electromagnetic Field Theory', credits: 4, grade: 'A+', marks: '89%' },
      { code: 'EE402', name: 'Electrical Measurements', credits: 3, grade: 'A', marks: '85%' },
    ]
  },
  {
    id: 15,
    name: 'Aakash Verma',
    rollNo: 'CSE2024061',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '81%',
    status: 'Very Good',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.10',
    cgpa: '8.05',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A', marks: '82%' },
      { code: 'CS302', name: 'Computer Architecture', credits: 4, grade: 'A', marks: '80%' },
    ]
  },
  {
    id: 16,
    name: 'Shreya Nandi',
    rollNo: 'ECE2024029',
    department: 'ECE',
    year: '1st Year',
    semester: '2nd Sem',
    yearSem: '1st Year / 2nd Sem',
    mentor: 'Prof. S. Chatterjee',
    lastResult: '89%',
    status: 'Excellent',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.90',
    cgpa: '8.82',
    subjects: [
      { code: 'EC201', name: 'Basic Electronics', credits: 4, grade: 'A+', marks: '90%' },
      { code: 'M201', name: 'Mathematics II', credits: 4, grade: 'A+', marks: '88%' },
    ]
  },
  {
    id: 17,
    name: 'Subhajit Dey',
    rollNo: 'IT2024022',
    department: 'IT',
    year: '3rd Year',
    semester: '5th Sem',
    yearSem: '3rd Year / 5th Sem',
    mentor: 'Dr. A. K. Sen',
    lastResult: '76%',
    status: 'Good',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    sgpa: '7.60',
    cgpa: '7.52',
    subjects: [
      { code: 'IT501', name: 'Web Technology', credits: 4, grade: 'A', marks: '78%' },
      { code: 'IT502', name: 'Computer Networks', credits: 4, grade: 'B+', marks: '74%' },
    ]
  },
  {
    id: 18,
    name: 'Ananya Mitra',
    rollNo: 'CSE2024074',
    department: 'CSE',
    year: '2nd Year',
    semester: '3rd Sem',
    yearSem: '2nd Year / 3rd Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '92%',
    status: 'Outstanding',
    avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&auto=format&fit=crop&q=80',
    sgpa: '9.20',
    cgpa: '9.15',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'O', marks: '94%' },
      { code: 'CS302', name: 'Computer Organization', credits: 4, grade: 'A+', marks: '90%' },
    ]
  },
  {
    id: 19,
    name: 'Chirag Banerjee',
    rollNo: 'ME2024035',
    department: 'ME',
    year: '2nd Year',
    semester: '4th Sem',
    yearSem: '2nd Year / 4th Sem',
    mentor: 'Prof. M. Dutta',
    lastResult: '80%',
    status: 'Very Good',
    avatar: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.00',
    cgpa: '7.95',
    subjects: [
      { code: 'ME401', name: 'Manufacturing Processes', credits: 4, grade: 'A', marks: '81%' },
      { code: 'ME402', name: 'Kinematics of Machinery', credits: 4, grade: 'A', marks: '79%' },
    ]
  },
  {
    id: 20,
    name: 'Tania Biswas',
    rollNo: 'CSE2024089',
    department: 'CSE',
    year: '1st Year',
    semester: '1st Sem',
    yearSem: '1st Year / 1st Sem',
    mentor: 'Dr. Rahul Verma',
    lastResult: '88%',
    status: 'Excellent',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    sgpa: '8.80',
    cgpa: '8.80',
    subjects: [
      { code: 'CS101', name: 'Programming Fundamentals', credits: 4, grade: 'A+', marks: '89%' },
      { code: 'PH101', name: 'Physics', credits: 4, grade: 'A+', marks: '87%' },
    ]
  }
];

export default function MentorResults({ initialUpload = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);

  // Upload Result Page View State
  const [isUploadView, setIsUploadView] = useState(false);
  const [selectedMenteeForUpload, setSelectedMenteeForUpload] = useState(null);
  const [selectedMenteeForDetails, setSelectedMenteeForDetails] = useState(null);

  // Semester Results Details View State
  const [detailsSearchQuery, setDetailsSearchQuery] = useState('');
  const [detailsYearFilter, setDetailsYearFilter] = useState('All');
  const [activeActionRowId, setActiveActionRowId] = useState(null);

  const [uploadMenteeName, setUploadMenteeName] = useState('Tanuka Saha');
  const [uploadMenteeRoll, setUploadMenteeRoll] = useState('CSE2024012');
  const [uploadMenteeEmail, setUploadMenteeEmail] = useState('cse2024012@rcciit.org.in');
  const [uploadAcademicYear, setUploadAcademicYear] = useState('2024 - 25');
  const [uploadSemester, setUploadSemester] = useState('3rd Semester');
  const [uploadSgpa, setUploadSgpa] = useState('');
  const [uploadGrade, setUploadGrade] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadRemarks, setUploadRemarks] = useState('');
  const [uploadToast, setUploadToast] = useState(false);

  const itemsPerPage = 12;

  // Filtering
  const filteredMentees = useMemo(() => {
    return mockMentees
      .filter((mentee) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          mentee.name.toLowerCase().includes(query) ||
          mentee.rollNo.toLowerCase().includes(query) ||
          (mentee.email && mentee.email.toLowerCase().includes(query)) ||
          (mentee.phone && mentee.phone.toLowerCase().includes(query)) ||
          (mentee.department && mentee.department.toLowerCase().includes(query));

        const matchesDept =
          departmentFilter === 'All' || mentee.department === departmentFilter;

        const menteeYear = mentee.year || mentee.yearSem?.split('/')[0]?.trim();
        const matchesYear =
          yearFilter === 'All' || menteeYear === yearFilter;

        const menteeSem = mentee.semester || mentee.yearSem?.split('/')[1]?.trim();
        const matchesSem =
          semesterFilter === 'All' || menteeSem === semesterFilter;

        return matchesSearch && matchesDept && matchesYear && matchesSem;
      });
  }, [searchQuery, departmentFilter, yearFilter, semesterFilter]);

  const totalPages = Math.ceil(filteredMentees.length / itemsPerPage) || 1;
  const showingStart = filteredMentees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredMentees.length);

  const currentPageMentees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMentees.slice(start, start + itemsPerPage);
  }, [filteredMentees, currentPage]);

  const handleOpenUpload = (mentee = null) => {
    const mName = mentee ? mentee.name : 'Tanuka Saha';
    const mRoll = mentee ? mentee.rollNo : 'CSE2024012';
    const mEmail = mentee ? `${mentee.rollNo.toLowerCase()}@rcciit.org.in` : 'cse2024012@rcciit.org.in';

    setSelectedMenteeForUpload(mentee);
    setUploadMenteeName(mName);
    setUploadMenteeRoll(mRoll);
    setUploadMenteeEmail(mEmail);
    setUploadAcademicYear('2024 - 25');
    setUploadSemester(mentee ? (mentee.yearSem.split('/')[1]?.trim() || '3rd Semester') : '3rd Semester');
    setUploadSgpa('');
    setUploadGrade('');
    setUploadFile(null);
    setUploadRemarks('');
    setUploadToast(false);
    setIsUploadView(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadToast(true);
    setTimeout(() => {
      setUploadToast(false);
      setIsUploadView(false);
      setSelectedMenteeForUpload(null);
    }, 1800);
  };

  if (isUploadView) {
    return (
      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10 animate-in fade-in duration-200">
        {/* Header Title Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Upload Result</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Upload mentees' academic result details</p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadView(false)}
            className="bg-[#7656f4] hover:bg-[#6242e2] text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <UploadCloud size={18} />
            <span>Upload Result</span>
          </button>
        </div>

        {uploadToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-semibold flex items-center gap-3 shadow-xs">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <span>Academic result for {uploadMenteeName} published successfully!</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="flex flex-col gap-6">
          {/* Mentee Information Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100/90 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <h3 className="text-base font-extrabold text-[#7656f4]">Mentee Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Name</label>
                <input
                  type="text"
                  value={uploadMenteeName}
                  onChange={(e) => setUploadMenteeName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-[#7656f4] focus:bg-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">College Roll No.</label>
                <input
                  type="text"
                  value={uploadMenteeRoll}
                  onChange={(e) => setUploadMenteeRoll(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-[#7656f4] focus:bg-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">College Email ID</label>
                <input
                  type="email"
                  value={uploadMenteeEmail}
                  onChange={(e) => setUploadMenteeEmail(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-[#7656f4] focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100/90 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-base font-extrabold text-[#7656f4]">Academic Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Academic Year</label>
                <div className="relative">
                  <select
                    value={uploadAcademicYear}
                    onChange={(e) => setUploadAcademicYear(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer focus:border-[#7656f4] focus:bg-white transition-colors"
                  >
                    <option value="2024 - 25">2024 - 25</option>
                    <option value="2023 - 24">2023 - 24</option>
                    <option value="2022 - 23">2022 - 23</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7656f4] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Semester</label>
                <div className="relative">
                  <select
                    value={uploadSemester}
                    onChange={(e) => setUploadSemester(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer focus:border-[#7656f4] focus:bg-white transition-colors"
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
                  <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7656f4] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">SGPA (Range 1 - 10)</label>
                <input
                  type="text"
                  placeholder="Enter SGPA (e.g. 8.46)"
                  value={uploadSgpa}
                  onChange={(e) => setUploadSgpa(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none focus:border-[#7656f4] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Grade</label>
                <div className="relative">
                  <select
                    value={uploadGrade}
                    onChange={(e) => setUploadGrade(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer focus:border-[#7656f4] focus:bg-white transition-colors"
                  >
                    <option value="">Select Grade</option>
                    <option value="O">O (Outstanding)</option>
                    <option value="A+">A+ (Excellent)</option>
                    <option value="A">A (Very Good)</option>
                    <option value="B+">B+ (Good)</option>
                    <option value="B">B (Above Average)</option>
                    <option value="C">C (Average)</option>
                    <option value="P">P (Pass)</option>
                    <option value="F">F (Fail)</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7656f4] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Upload Result File & Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Result File Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#7656f4]">Upload Result File</h3>
                </div>

                <div
                  onClick={() => document.getElementById('full-upload-file-input')?.click()}
                  className="border-2 border-dashed border-[#7656f4]/35 bg-[#fcfaff] hover:bg-[#f6f0ff] rounded-2xl p-7 text-center flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100/80 text-[#7656f4] flex items-center justify-center mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {uploadFile ? uploadFile.name : 'Drag & drop your file here'}
                  </span>
                  <span className="text-xs text-gray-400 my-1.5">or</span>
                  <button
                    type="button"
                    className="border border-[#7656f4] text-[#7656f4] bg-white hover:bg-purple-50 px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Choose File
                  </button>
                  <input
                    id="full-upload-file-input"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mt-4 px-1">
                <span>Maximum file size: 10MB</span>
                <span>Supported format: <strong className="text-[#7656f4]">PDF only</strong></span>
              </div>
            </div>

            {/* Remarks (Optional) Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0">
                    <MessageSquareText size={18} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#7656f4]">Remarks (Optional)</h3>
                </div>

                <textarea
                  value={uploadRemarks}
                  maxLength={500}
                  onChange={(e) => setUploadRemarks(e.target.value)}
                  placeholder="Enter any additional comments..."
                  className="w-full h-44 bg-[#f8fafc] border border-gray-200/70 rounded-2xl p-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#7656f4] focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="text-right text-xs text-gray-400 mt-2 px-1">
                {uploadRemarks.length} / 500
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={() => setIsUploadView(false)}
              className="px-6 py-2.5 border border-[#7656f4] text-[#7656f4] bg-white hover:bg-purple-50 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7656f4] hover:bg-[#6242e2] text-white rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              <UploadCloud size={18} />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* --- SEMESTER RESULTS DETAILS PAGE VIEW (When View Details is Clicked) --- */
  if (selectedMenteeForDetails) {
    const defaultSemesters = [
      { id: 1, year: 1, sem: 1, sgpa: '9.20', grade: 'A', file: 'result_sem1.pdf', size: '245 KB', remark: 'Excellent Result' },
      { id: 2, year: 1, sem: 2, sgpa: '9.01', grade: 'A', file: 'result_sem2.pdf', size: '250 KB', remark: 'Excellent Result' },
      { id: 3, year: 2, sem: 3, sgpa: '9.12', grade: 'A', file: 'result_sem3.pdf', size: '248 KB', remark: 'Excellent Result' },
      { id: 4, year: 2, sem: 4, sgpa: '8.88', grade: 'A', file: 'result_sem4.pdf', size: '247 KB', remark: 'Excellent Result' },
      { id: 5, year: 3, sem: 5, sgpa: '9.70', grade: 'A', file: 'result_sem5.pdf', size: '251 KB', remark: 'Excellent Result' },
      { id: 6, year: 3, sem: 6, sgpa: '8.20', grade: 'A', file: 'result_sem6.pdf', size: '245 KB', remark: 'Excellent Result' },
      { id: 7, year: 4, sem: 7, sgpa: '9.50', grade: 'A', file: 'result_sem7.pdf', size: '246 KB', remark: 'Excellent Result' },
      { id: 8, year: 4, sem: 8, sgpa: '9.60', grade: 'A', file: 'result_sem8.pdf', size: '250 KB', remark: 'Excellent Result' },
    ];

    const filteredSemesters = defaultSemesters.filter((s) => {
      const q = detailsSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        s.sem.toString().includes(q) ||
        s.year.toString().includes(q) ||
        s.remark.toLowerCase().includes(q) ||
        s.file.toLowerCase().includes(q);
      const matchesYear = detailsYearFilter === 'All' || s.year.toString() === detailsYearFilter;
      return matchesSearch && matchesYear;
    });

    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10 animate-in fade-in duration-200">
        {/* Header Navigation & Action Section */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setSelectedMenteeForDetails(null)}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 text-gray-600 hover:text-[#7656f4] hover:bg-purple-50 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            title="Back to All Mentees"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => handleOpenUpload(selectedMenteeForDetails)}
            className="bg-[#7656f4] hover:bg-[#6242e2] text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <UploadCloud size={18} />
            <span>Upload Result</span>
          </button>
        </div>

        {/* Semester Results Card */}
        <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 flex flex-col gap-6">
          {/* Card Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-100/60">
            {/* Title */}
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-50 text-[#7656f4]">
                <ClipboardList size={20} />
              </span>
              <h2 className="text-lg font-bold text-gray-900">Semester Results</h2>
            </div>

            {/* Controls Right */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-72">
                <input
                  type="text"
                  value={detailsSearchQuery}
                  onChange={(e) => setDetailsSearchQuery(e.target.value)}
                  placeholder="Search by year, semester or mentee name..."
                  className="w-full bg-[#f8fafc] border border-gray-200/70 rounded-xl pl-4 pr-10 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#7656f4] focus:bg-white transition-colors"
                />
                <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Filters Button */}
              <button
                type="button"
                className="bg-[#f8fafc] hover:bg-purple-50 text-[#7656f4] border border-purple-200/60 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Filter size={16} className="text-[#7656f4]" />
                <span>Filters</span>
              </button>

              {/* All Academic Years Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-[#f8fafc] hover:bg-gray-100 text-gray-700 border border-gray-200/70 pl-3 pr-8 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
                  <CalendarDays size={16} className="text-[#7656f4] shrink-0" />
                  <select
                    value={detailsYearFilter}
                    onChange={(e) => setDetailsYearFilter(e.target.value)}
                    className="bg-transparent text-gray-700 appearance-none outline-none cursor-pointer pr-1"
                  >
                    <option value="All">All Academic Years</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Semester Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f4eeff] text-[#7656f4] text-xs font-extrabold tracking-wider border-b border-purple-100/60">
                  <th className="py-3.5 px-4 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Semester</th>
                  <th className="py-3.5 px-4">SGPA</th>
                  <th className="py-3.5 px-4">Overall Grade</th>
                  <th className="py-3.5 px-4">Result File</th>
                  <th className="py-3.5 px-4">Remark</th>
                  <th className="py-3.5 px-4 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-medium text-gray-700">
                {filteredSemesters.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-4 text-center">
                      <span className="w-6 h-6 rounded-lg bg-purple-50 text-[#7656f4] font-bold inline-flex items-center justify-center">
                        {row.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-800">{row.year}</td>
                    <td className="py-4 px-4 font-bold text-gray-800">{row.sem}</td>
                    <td className="py-4 px-4 font-black text-gray-900">{row.sgpa}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 font-extrabold px-3 py-1 rounded-lg inline-block">
                        {row.grade}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[#7656f4]">
                        <FileText size={16} className="shrink-0" />
                        <div>
                          <span className="font-bold block leading-tight hover:underline cursor-pointer">
                            {row.file}
                          </span>
                          <span className="text-[10px] text-gray-400 font-normal">{row.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50/80 border border-emerald-100 text-emerald-600 text-xs font-semibold px-3.5 py-1 rounded-full inline-block">
                        {row.remark}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Action Menu */}
                      {activeActionRowId === row.id && (
                        <div className="absolute right-4 top-12 z-30 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 w-28 animate-in fade-in zoom-in duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveActionRowId(null);
                              handleOpenUpload(selectedMenteeForDetails);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#7656f4] rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Pencil size={14} className="text-[#7656f4]" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveActionRowId(null);
                              alert(`Deleted result for Semester ${row.sem}`);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} className="text-gray-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs sm:text-sm font-medium text-gray-500">
            <p>Showing 1 to {filteredSemesters.length} of {filteredSemesters.length} results</p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7656f4] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
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
          {/* Department Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 text-sm font-semibold text-slate-700 shadow-2xs hover:border-slate-300 transition-all cursor-pointer">
              <Building2 size={18} className="text-slate-500 shrink-0" />
              <select
                value={departmentFilter}
                onChange={(e) => {
                  setDepartmentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-700 font-semibold appearance-none outline-none cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="ME">ME</option>
                <option value="EE">EE</option>
              </select>
            </div>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 text-sm font-semibold text-slate-700 shadow-2xs hover:border-slate-300 transition-all cursor-pointer">
              <GraduationCap size={18} className="text-slate-500 shrink-0" />
              <select
                value={yearFilter}
                onChange={(e) => {
                  setYearFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-700 font-semibold appearance-none outline-none cursor-pointer"
              >
                <option value="All">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 text-sm font-semibold text-slate-700 shadow-2xs hover:border-slate-300 transition-all cursor-pointer">
              <CalendarDays size={18} className="text-slate-500 shrink-0" />
              <select
                value={semesterFilter}
                onChange={(e) => {
                  setSemesterFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-slate-700 font-semibold appearance-none outline-none cursor-pointer"
              >
                <option value="All">All Semesters</option>
                <option value="1st Sem">1st Sem</option>
                <option value="2nd Sem">2nd Sem</option>
                <option value="3rd Sem">3rd Sem</option>
                <option value="4th Sem">4th Sem</option>
                <option value="5th Sem">5th Sem</option>
                <option value="6th Sem">6th Sem</option>
                <option value="7th Sem">7th Sem</option>
                <option value="8th Sem">8th Sem</option>
              </select>
            </div>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* View mode toggle (Grid vs List) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#f0eaff] text-[#7656f4] border border-[#7656f4]/30 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentPageMentees.map((mentee) => (
            <div
              key={mentee.id}
              className="bg-white rounded-3xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-md hover:border-purple-200/80 transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-100 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#7656f4] transition-colors">{mentee.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{mentee.rollNo}</p>
                  </div>
                </div>
                <span className="bg-purple-50 text-[#7656f4] text-xs font-bold px-2.5 py-1 rounded-full border border-purple-100">
                  {mentee.department}
                </span>
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-3 grid grid-cols-2 gap-2 border border-gray-100/60">
                <div>
                  <p className="text-[11px] text-gray-400 font-semibold">Academic Year</p>
                  <p className="text-xs font-bold text-gray-800">{mentee.year || mentee.yearSem?.split('/')[0]?.trim()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-semibold">Semester</p>
                  <p className="text-xs font-bold text-gray-800">{mentee.semester || mentee.yearSem?.split('/')[1]?.trim()}</p>
                </div>
                <div className="col-span-2 flex items-center justify-between pt-1 border-t border-gray-200/40">
                  <span className="text-xs font-semibold text-gray-600">Last Score:</span>
                  <span className="text-sm font-extrabold text-emerald-600">{mentee.lastResult}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedMenteeForDetails(mentee)}
                  className="bg-[#f6f2fe] hover:bg-purple-100 text-[#7656f4] border border-[#7656f4]/30 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye size={15} />
                  <span>View Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpload(mentee)}
                  className="bg-[#7656f4] hover:bg-[#6242e2] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <UploadCloud size={15} />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden font-['Roboto',sans-serif]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#7656f4] via-[#6845f2] to-[#5531dc] text-white text-xs font-bold uppercase tracking-wider select-none">
                  <th className="py-3.5 px-5 text-left">Student</th>
                  <th className="py-3.5 px-4 text-left">Roll Number</th>
                  <th className="py-3.5 px-4 text-left">Department</th>
                  <th className="py-3.5 px-4 text-left">Year</th>
                  <th className="py-3.5 px-4 text-left">Semester</th>
                  <th className="py-3.5 px-4 text-left">Last Result</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {currentPageMentees.map((mentee) => (
                  <tr key={mentee.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={mentee.avatar}
                          alt={mentee.name}
                          className="w-9 h-9 rounded-full object-cover border border-purple-100"
                        />
                        <span className="font-bold text-gray-900">{mentee.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-[#f6f2fe] text-[#7656f4] text-xs font-semibold px-2 py-0.5 rounded-md">
                        {mentee.rollNo}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{mentee.department}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{mentee.year || mentee.yearSem?.split('/')[0]?.trim()}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{mentee.semester || mentee.yearSem?.split('/')[1]?.trim()}</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-50 text-emerald-600 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-emerald-100">
                        {mentee.lastResult}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedMenteeForDetails(mentee)}
                          className="bg-[#f6f2fe] border border-[#7656f4]/30 text-[#7656f4] hover:bg-purple-100 py-[8.5px] px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenUpload(mentee)}
                          className="bg-[#7656f4] hover:bg-[#6242e2] text-white py-[8.5px] px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <UploadCloud size={15} />
                          <span>Upload</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between mt-2">
        <p className="text-sm font-medium text-gray-500">
          Showing {showingStart} to {showingEnd} of {filteredMentees.length} mentees
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors cursor-pointer ${currentPage === pageNum
                  ? 'bg-[#7656f4] text-white shadow-xs'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>



    </div>
  );
}
