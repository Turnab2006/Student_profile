import { useState, useMemo } from "react";
import {
  Trophy,
  Star,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  Filter,
  TrendingUp,
  Download,
  Plus,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Paperclip,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Info,
  BookOpen,
  Send,
  Layers,
  ArrowUpRight,
  Users,
  Eye,
  FileText,
  Building,
  GraduationCap,
  SlidersHorizontal,
  ChevronRight,
  ArrowLeft,
  UserCheck,
  RotateCcw
} from "lucide-react";

// Mock student mentees with credit totals
export const initialMenteesCreditData = [
  {
    id: "STU-001",
    name: "Tanuka Saha",
    rollNo: "CSE2024012",
    department: "Computer Science & Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "Semester 5",
    avatar: "/tuhina_avatar.jpg",
    earnedPoints: 75,
    currentSemPoints: 25,
    pendingPoints: 15,
    criteriaMet: true, // >= 20 points in current semester
    totalTarget: 100,
  },
  {
    id: "STU-002",
    name: "Aarav Sharma",
    rollNo: "IT2024002",
    department: "Information Technology",
    program: "B.Tech",
    year: "3rd Year",
    semester: "Semester 5",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 100,
    currentSemPoints: 30,
    pendingPoints: 0,
    criteriaMet: true,
    totalTarget: 100,
  },
  {
    id: "STU-003",
    name: "Amitav Basu",
    rollNo: "ECE2024018",
    department: "Electronics & Comm. Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "Semester 5",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 45,
    currentSemPoints: 10,
    pendingPoints: 10,
    criteriaMet: false,
    totalTarget: 100,
  },
  {
    id: "STU-004",
    name: "Ananya Das",
    rollNo: "ME2024005",
    department: "Mechanical Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "Semester 5",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 90,
    currentSemPoints: 20,
    pendingPoints: 10,
    criteriaMet: true,
    totalTarget: 100,
  },
  {
    id: "STU-005",
    name: "Debjit Paul",
    rollNo: "CSE2024031",
    department: "Computer Science & Engineering",
    program: "B.Tech",
    year: "4th Year",
    semester: "Semester 7",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 100,
    currentSemPoints: 35,
    pendingPoints: 0,
    criteriaMet: true,
    totalTarget: 100,
  },
  {
    id: "STU-006",
    name: "Priya Roy",
    rollNo: "IT2024015",
    department: "Information Technology",
    program: "BCA",
    year: "2nd Year",
    semester: "Semester 3",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 35,
    currentSemPoints: 15,
    pendingPoints: 10,
    criteriaMet: false,
    totalTarget: 100,
  },
  {
    id: "STU-007",
    name: "Sayan Mukherjee",
    rollNo: "CSE2024055",
    department: "Computer Science & Engineering",
    program: "M.Tech",
    year: "1st Year",
    semester: "Semester 1",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 65,
    currentSemPoints: 20,
    pendingPoints: 5,
    criteriaMet: true,
    totalTarget: 100,
  },
  {
    id: "STU-008",
    name: "Rohan Sen",
    rollNo: "ECE2024040",
    department: "Electronics & Comm. Engineering",
    program: "B.Tech",
    year: "3rd Year",
    semester: "Semester 5",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    earnedPoints: 85,
    currentSemPoints: 25,
    pendingPoints: 0,
    criteriaMet: true,
    totalTarget: 100,
  },
];

// All submitted requests and historical logs across mentees
export const initialMentorCreditRequests = [
  {
    id: "REQ-2026-901",
    studentId: "STU-001",
    studentName: "Tanuka Saha",
    rollNo: "CSE2024012",
    title: "TECHNOVATE 2026 AI Hackathon Winner (1st Prize)",
    category: "Technical",
    semester: "Semester 5",
    points: 15,
    date: "May 20, 2026",
    issuer: "CSE Dept & Innovation Council",
    status: "Approved",
    proofDoc: "technovate_winner_cert.pdf",
    remarks: "First prize in Generative AI track with ₹25,000 cash award.",
    reviewedDate: "May 22, 2026",
    mentorNote: "Verified with department hackathon committee.",
  },
  {
    id: "REQ-2026-902",
    studentId: "STU-001",
    studentName: "Tanuka Saha",
    rollNo: "CSE2024012",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    category: "Certifications",
    semester: "Semester 5",
    points: 10,
    date: "Apr 15, 2026",
    issuer: "Amazon Web Services",
    status: "Approved",
    proofDoc: "aws_cert_validation_89412.pdf",
    remarks: "Scored 890/1000 in official AWS exam.",
    reviewedDate: "Apr 17, 2026",
    mentorNote: "Credly digital badge verified.",
  },
  {
    id: "REQ-2026-903",
    studentId: "STU-001",
    studentName: "Tanuka Saha",
    rollNo: "CSE2024012",
    title: "Google Cloud Study Jam - 4 Skill Badges",
    category: "Certifications",
    semester: "Semester 5",
    points: 15,
    date: "May 18, 2026",
    issuer: "Google Developers Group (GDG)",
    status: "Pending",
    proofDoc: "gcp_study_jam_badges.pdf",
    remarks: "Completed 4 architect skill badges on Google Cloud Skills Boost.",
    reviewedDate: null,
    mentorNote: "",
  },
  {
    id: "REQ-2026-904",
    studentId: "STU-002",
    studentName: "Aarav Sharma",
    rollNo: "IT2024002",
    title: "Smart India Hackathon (SIH 2026) Grand Finalist",
    category: "Technical",
    semester: "Semester 5",
    points: 20,
    date: "May 10, 2026",
    issuer: "Ministry of Education & AICTE",
    status: "Approved",
    proofDoc: "sih_finalist_nomination.pdf",
    remarks: "Represented university in national hardware edition.",
    reviewedDate: "May 12, 2026",
    mentorNote: "National competition achievement confirmed.",
  },
  {
    id: "REQ-2026-905",
    studentId: "STU-002",
    studentName: "Aarav Sharma",
    rollNo: "IT2024002",
    title: "IEEE International Conference Research Paper Presentation",
    category: "Technical",
    semester: "Semester 5",
    points: 10,
    date: "Apr 28, 2026",
    issuer: "IEEE Kolkata Section",
    status: "Approved",
    proofDoc: "ieee_paper_presentation_cert.pdf",
    remarks: "Oral presentation on federated learning optimization.",
    reviewedDate: "Apr 30, 2026",
    mentorNote: "Conference proceedings indexed.",
  },
  {
    id: "REQ-2026-906",
    studentId: "STU-003",
    studentName: "Amitav Basu",
    rollNo: "ECE2024018",
    title: "VLSI Circuit Design 5-Day Workshop",
    category: "Workshops",
    semester: "Semester 5",
    points: 10,
    date: "May 14, 2026",
    issuer: "Cadence & ECE Dept",
    status: "Pending",
    proofDoc: "vlSI_workshop_cadence.pdf",
    remarks: "Hands-on simulation of CMOS logic gates.",
    reviewedDate: null,
    mentorNote: "",
  },
  {
    id: "REQ-2026-907",
    studentId: "STU-004",
    studentName: "Ananya Das",
    rollNo: "ME2024005",
    title: "Formula Student Electric Powertrain Challenge",
    category: "Technical",
    semester: "Semester 5",
    points: 10,
    date: "May 16, 2026",
    issuer: "SAEINDIA Student Chapter",
    status: "Pending",
    proofDoc: "formula_student_ev_cert.pdf",
    remarks: "Lead chassis design engineer for collegiate EV car.",
    reviewedDate: null,
    mentorNote: "",
  },
  {
    id: "REQ-2026-908",
    studentId: "STU-004",
    studentName: "Ananya Das",
    rollNo: "ME2024005",
    title: "NPTEL Certified: Advanced CAD & 3D Printing",
    category: "Certifications",
    semester: "Semester 4",
    points: 10,
    date: "Mar 05, 2026",
    issuer: "IIT Kharagpur / NPTEL",
    status: "Approved",
    proofDoc: "nptel_cad_elite.pdf",
    remarks: "Scored 86% in 12-week course.",
    reviewedDate: "Mar 08, 2026",
    mentorNote: "Verified with Swayam portal ledger.",
  },
  {
    id: "REQ-2026-909",
    studentId: "STU-006",
    studentName: "Priya Roy",
    rollNo: "IT2024015",
    title: "Introductory Web Dev 2-Hour Webinar",
    category: "Workshops",
    semester: "Semester 5",
    points: 0,
    date: "Apr 20, 2026",
    issuer: "Third-party Tech Blog",
    status: "Approval Failed",
    proofDoc: "webinar_screenshot.png",
    remarks: "Attended introductory webinar on React basics.",
    reviewedDate: "Apr 22, 2026",
    mentorNote: "Non-accredited webinar. Mandatory minimum duration is 16 contact hours for academic credit eligibility.",
  },
  {
    id: "REQ-2026-910",
    studentId: "STU-007",
    studentName: "Sayan Mukherjee",
    rollNo: "CSE2024055",
    title: "Inter-College Robotics Obstacle Course (2nd Runner Up)",
    category: "Technical",
    semester: "Semester 5",
    points: 5,
    date: "May 19, 2026",
    issuer: "Robotics & IoT Club",
    status: "Pending",
    proofDoc: "robotics_merit_cert.pdf",
    remarks: "Constructed Arduino-based autonomous line follower.",
    reviewedDate: null,
    mentorNote: "",
  },
];

export default function MentorCreditPoints({ hideHeader = false, onNavigate }) {
  const [requestsList, setRequestsList] = useState(initialMentorCreditRequests);
  const [menteesList, setMenteesList] = useState(initialMenteesCreditData);

  // Active view mode: 'overview' (Per-Student Directory) vs 'requests' (All Submitted Requests Queue)
  const [activeTab, setActiveTab] = useState("overview");

  // Filtering & Sorting (Requests Queue)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Student Records Filters (Upper part filters)
  const [scoreFilter, setScoreFilter] = useState("all"); // 'all' | 'completed' (100/100) | 'in-progress' (<100)
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  const hasActiveStudentFilters =
    scoreFilter !== "all" ||
    selectedDepartment !== "all" ||
    selectedProgram !== "all" ||
    selectedYear !== "all" ||
    selectedSemester !== "all";

  const handleResetStudentFilters = () => {
    setScoreFilter("all");
    setSelectedDepartment("all");
    setSelectedProgram("all");
    setSelectedYear("all");
    setSelectedSemester("all");
    setSearchQuery("");
  };

  // Modals state
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [reviewingRequest, setReviewingRequest] = useState(null); // For Approval / Rejection modal
  const [rejectionReason, setRejectionReason] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Manual point issue form
  const [issueForm, setIssueForm] = useState({
    studentId: initialMenteesCreditData[0]?.id || "",
    category: "Technical",
    title: "",
    points: 10,
    semester: "Semester 5",
    remarks: "",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ==========================================
  // 4 COMPUTED STAT CARDS
  // ==========================================
  
  // 1. Total mentees who achieved criteria in current semester (>= 20 points in Sem 5)
  const menteesMeetingCriteriaCount = useMemo(() => {
    return menteesList.filter((m) => m.criteriaMet).length;
  }, [menteesList]);

  // 2. Total pending requests awaiting mentor verification
  const totalPendingRequestsCount = useMemo(() => {
    return requestsList.filter((r) => r.status === "Pending").length;
  }, [requestsList]);

  // 3. Total approved requests count
  const approvedRequestsCount = useMemo(() => {
    return requestsList.filter((r) => r.status === "Approved").length;
  }, [requestsList]);

  // 4. Total rejected requests count
  const rejectedRequestsCount = useMemo(() => {
    return requestsList.filter((r) => r.status === "Approval Failed").length;
  }, [requestsList]);

  // Total credit points approved across all mentees
  const totalApprovedPointsSum = useMemo(() => {
    return requestsList
      .filter((r) => r.status === "Approved")
      .reduce((acc, curr) => acc + (Number(curr.points) || 0), 0);
  }, [requestsList]);

  // Degree Completion Ready (Mentees who reached 100/100 points)
  const degreeReadyMenteesCount = useMemo(() => {
    return menteesList.filter((m) => m.earnedPoints >= 100).length;
  }, [menteesList]);

  // ==========================================
  // ACTIONS: APPROVE / REJECT / ISSUE
  // ==========================================

  const handleApproveRequest = (requestId) => {
    const target = requestsList.find((r) => r.id === requestId);
    if (!target) return;

    const updated = requestsList.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: "Approved",
          reviewedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          mentorNote: "Verified and approved by Faculty Mentor.",
        };
      }
      return r;
    });
    setRequestsList(updated);

    // Update student's points
    setMenteesList((prev) =>
      prev.map((m) => {
        if (m.id === target.studentId) {
          const newEarned = m.earnedPoints + target.points;
          const newCurrent = m.currentSemPoints + target.points;
          return {
            ...m,
            earnedPoints: Math.min(100, newEarned),
            currentSemPoints: newCurrent,
            pendingPoints: Math.max(0, m.pendingPoints - target.points),
            criteriaMet: newCurrent >= 20,
          };
        }
        return m;
      })
    );

    setReviewingRequest(null);
    showToast(`Approved ${target.points} credit points for ${target.studentName}!`);
  };

  const handleRejectRequest = (e) => {
    e.preventDefault();
    if (!reviewingRequest) return;

    const reason = rejectionReason.trim() || "Does not fulfill mandatory university credit criteria.";
    const updated = requestsList.map((r) => {
      if (r.id === reviewingRequest.id) {
        return {
          ...r,
          status: "Approval Failed",
          points: 0,
          reviewedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          mentorNote: reason,
        };
      }
      return r;
    });
    setRequestsList(updated);

    // Deduct pending points from mentee
    setMenteesList((prev) =>
      prev.map((m) => {
        if (m.id === reviewingRequest.studentId) {
          return {
            ...m,
            pendingPoints: Math.max(0, m.pendingPoints - reviewingRequest.points),
          };
        }
        return m;
      })
    );

    setReviewingRequest(null);
    setRejectionReason("");
    showToast(`Request rejected with feedback note.`);
  };

  const handleIssueDirectPoints = (e) => {
    e.preventDefault();
    const student = menteesList.find((m) => m.id === issueForm.studentId);
    if (!student) return;

    const newReqId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id: newReqId,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      title: issueForm.title.trim(),
      category: issueForm.category,
      semester: issueForm.semester,
      points: Number(issueForm.points) || 10,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      issuer: "Faculty Mentor Allocation",
      status: "Approved",
      proofDoc: "faculty_mentor_award.pdf",
      remarks: issueForm.remarks.trim() || "Awarded directly by faculty mentor for departmental merit.",
      reviewedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      mentorNote: "Direct mentor issuance.",
    };

    setRequestsList([newRecord, ...requestsList]);

    // Update student mentee points
    setMenteesList((prev) =>
      prev.map((m) => {
        if (m.id === student.id) {
          const newEarned = m.earnedPoints + (Number(issueForm.points) || 10);
          const newCurrent = m.currentSemPoints + (Number(issueForm.points) || 10);
          return {
            ...m,
            earnedPoints: Math.min(100, newEarned),
            currentSemPoints: newCurrent,
            criteriaMet: newCurrent >= 20,
          };
        }
        return m;
      })
    );

    setShowIssueModal(false);
    setIssueForm({
      studentId: menteesList[0]?.id || "",
      category: "Technical",
      title: "",
      points: 10,
      semester: "Semester 5",
      remarks: "",
    });
    showToast(`Successfully issued ${newRecord.points} credit points to ${student.name}!`);
  };

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    return requestsList.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.rollNo.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesStatus =
        (statusFilter === "pending" && item.status === "Pending") ||
        (statusFilter === "approved" && item.status === "Approved") ||
        (statusFilter === "failed" && item.status === "Approval Failed");

      const matchesCategory =
        categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [requestsList, searchQuery, statusFilter, categoryFilter]);

  // Filtered mentees list for directory
  const filteredMentees = useMemo(() => {
    return menteesList.filter((m) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.rollNo.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);

      const matchesScore =
        scoreFilter === "all" ||
        (scoreFilter === "completed" && m.earnedPoints >= 100) ||
        (scoreFilter === "in-progress" && m.earnedPoints < 100);

      const matchesDept =
        selectedDepartment === "all" || m.department === selectedDepartment;

      const matchesProgram =
        selectedProgram === "all" || m.program === selectedProgram;

      const matchesYear =
        selectedYear === "all" || m.year === selectedYear;

      const matchesSemester =
        selectedSemester === "all" || m.semester === selectedSemester;

      return (
        matchesSearch &&
        matchesScore &&
        matchesDept &&
        matchesProgram &&
        matchesYear &&
        matchesSemester
      );
    });
  }, [
    menteesList,
    searchQuery,
    scoreFilter,
    selectedDepartment,
    selectedProgram,
    selectedYear,
    selectedSemester,
  ]);

  // History list for selected student modal
  const selectedStudentHistory = useMemo(() => {
    if (!selectedStudentForHistory) return [];
    return requestsList.filter((r) => r.studentId === selectedStudentForHistory.id);
  }, [requestsList, selectedStudentForHistory]);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "technical":
        return <Zap size={16} className="text-[#7656f4]" />;
      case "certifications":
        return <Award size={16} className="text-purple-600" />;
      case "attendance":
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      case "workshops":
        return <BookOpen size={16} className="text-amber-600" />;
      default:
        return <Sparkles size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="p-2 sm:px-5 sm:py-3.5 space-y-5 font-['Roboto',sans-serif] w-full max-w-[1600px] mx-auto pb-10">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-800">
          <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-purple-400" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PURPLE HERO BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7656F4] via-[#6342E8] to-[#512FD8] border border-purple-600/30 p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ambient Glows */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
              Mentee Credit Point Portal
            </span>
            <span className="text-purple-100 text-xs font-semibold">• Criteria Threshold: &gt;= 20 Pts/Sem</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Mentee Credit Points &amp; Activity Ledger
          </h2>
          <p className="text-xs text-purple-50/90 font-normal max-w-xl">
            Review submitted student credit point claims, verify certificates, track semester criteria progress, and award faculty merit points.
          </p>
        </div>

        {/* Hero Right Action Buttons */}
        <div className="relative z-10 flex items-center gap-2.5 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/25 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Clock size={15} />
            <span>Pending Requests ({totalPendingRequestsCount})</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#7656f4] hover:bg-purple-50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Plus size={15} className="stroke-[3]" />
            <span>Issue Credit Points</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STAT CHIPS ROW: 4 Essential Overview Cards                            */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Card 1: Total Mentees Meeting Criteria in Current Semester (User Requested) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-emerald-500 p-4 sm:p-5 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <UserCheck size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Criteria Achieved</p>
            <div className="flex items-baseline gap-1.5 my-0.5">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {menteesMeetingCriteriaCount}
              </span>
              <span className="text-xs font-semibold text-gray-500">/ {menteesList.length} Mentees</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-bold">
              {Math.round((menteesMeetingCriteriaCount / menteesList.length) * 100)}% Met Sem 5 Target
            </p>
          </div>
        </div>

        {/* Card 2: Total Pending Requests (User Requested) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-amber-500 p-4 sm:p-5 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pending Requests</p>
            <div className="flex items-baseline gap-1.5 my-0.5">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {totalPendingRequestsCount}
              </span>
              <span className="text-xs font-semibold text-gray-500">Submissions</span>
            </div>
            <p className="text-[11px] text-amber-600 font-bold">Action Needed for Review</p>
          </div>
        </div>

        {/* Card 3: Total Approved Credits Awarded (Added) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-[#7656f4] p-4 sm:p-5 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7656f4] flex items-center justify-center shrink-0 border border-purple-100">
            <Trophy size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Approved Credits</p>
            <div className="flex items-baseline gap-1.5 my-0.5">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {totalApprovedPointsSum}
              </span>
              <span className="text-xs font-semibold text-gray-500">Points</span>
            </div>
            <p className="text-[11px] text-[#7656f4] font-bold">Across Cohort Activities</p>
          </div>
        </div>

        {/* Card 4: Degree Ready Mentees (100/100 target) (Added) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 border-l-[3.5px] border-l-blue-500 p-4 sm:p-5 shadow-xs flex items-center gap-4 hover:-translate-y-0.5 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <GraduationCap size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Degree Requirement Ready</p>
            <div className="flex items-baseline gap-1.5 my-0.5">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {degreeReadyMenteesCount}
              </span>
              <span className="text-xs font-semibold text-gray-500">Completed (100/100)</span>
            </div>
            <p className="text-[11px] text-blue-600 font-bold">Graduation Eligible</p>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION TOGGLE TABS (Per-Student Directory vs All Requests History)    */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
        
        {/* Toggle Pills */}
        {/* Toggle Pills - Modern Flat Segmented Tabs without Shadows */}
        <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-[#7656F4] text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            <Users size={16} />
            <span>Student Records</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === "overview" ? "bg-white text-[#7656f4]" : "bg-purple-100 text-[#7656f4]"
            }`}>
              {menteesList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "requests"
                ? "bg-[#7656F4] text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
            }`}
          >
            <Layers size={16} />
            <span>Requests &amp; History</span>
            {totalPendingRequestsCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === "requests" ? "bg-white text-[#7656f4]" : "bg-amber-100 text-amber-700"
              }`}>
                {totalPendingRequestsCount} pending
              </span>
            )}
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder={activeTab === "overview" ? "Search mentee by name or roll..." : "Search request title or student..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-[#7656f4] focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TAB VIEW 1: PER-STUDENT CREDIT POINT DIRECTORY                         */}
      {/* ========================================================================= */}
      {activeTab === "overview" && (
        <section className="space-y-4 animate-in fade-in duration-200">
          
          {/* Upper Section: Filter Bar with 100/100, Dept, Program, Year, Semester */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#7656f4] flex items-center justify-center">
                  <SlidersHorizontal size={15} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Filter Mentee Credit Records</h3>
                  <p className="text-[11px] text-slate-400">Refine students by graduation target, department, batch, and semester</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200/80">
                  Showing {filteredMentees.length} of {menteesList.length} Mentees
                </span>
                
                {hasActiveStudentFilters && (
                  <button
                    type="button"
                    onClick={handleResetStudentFilters}
                    className="text-xs font-bold text-[#7656f4] hover:text-[#6342e8] hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* 5 Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              
              {/* Filter 1: 100/100 Points Target */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Degree Target (100 Pts)
                </label>
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                    scoreFilter !== "all"
                      ? "bg-purple-50 border-[#7656f4] text-[#7656f4]"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#7656f4]"
                  }`}
                >
                  <option value="all">All Credit Scores</option>
                  <option value="completed">🏆 100/100 Points Scored</option>
                  <option value="in-progress">⏳ In Progress (&lt;100 Pts)</option>
                </select>
              </div>

              {/* Filter 2: Department */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                    selectedDepartment !== "all"
                      ? "bg-purple-50 border-[#7656f4] text-[#7656f4]"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#7656f4]"
                  }`}
                >
                  <option value="all">All Departments</option>
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Electronics & Comm. Engineering">ECE</option>
                  <option value="Mechanical Engineering">ME</option>
                </select>
              </div>

              {/* Filter 3: Program */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Program
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                    selectedProgram !== "all"
                      ? "bg-purple-50 border-[#7656f4] text-[#7656f4]"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#7656f4]"
                  }`}
                >
                  <option value="all">All Programs</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="BCA">BCA</option>
                </select>
              </div>

              {/* Filter 4: Year */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                    selectedYear !== "all"
                      ? "bg-purple-50 border-[#7656f4] text-[#7656f4]"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#7656f4]"
                  }`}
                >
                  <option value="all">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Filter 5: Semester */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Semester
                </label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-xl text-xs font-semibold outline-none transition-all cursor-pointer ${
                    selectedSemester !== "all"
                      ? "bg-purple-50 border-[#7656f4] text-[#7656f4]"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-[#7656f4]"
                  }`}
                >
                  <option value="all">All Semesters</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
              </div>

            </div>
          </div>

          {/* 3 Cards per row grid layout */}
          {filteredMentees.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center space-y-3">
              <Users className="mx-auto text-slate-300" size={40} />
              <h4 className="text-sm font-bold text-slate-800">No mentee records found matching your filters</h4>
              <p className="text-xs text-slate-400">Try changing or resetting your filter criteria above.</p>
              <button
                type="button"
                onClick={handleResetStudentFilters}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-[#7656f4] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMentees.map((mentee) => {
                const progressPct = Math.min(100, Math.round((mentee.earnedPoints / mentee.totalTarget) * 100));
                const isCompleted = mentee.earnedPoints >= 100;
                
                return (
                  <div
                    key={mentee.id}
                    onClick={() => setSelectedStudentForHistory(mentee)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-5.5 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                  >
                    {/* Top: Avatar, Name, Roll, Dept & Status Badge */}
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={mentee.avatar}
                            alt={mentee.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
                            }}
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-[#7656f4] transition-colors leading-tight">
                              {mentee.name}
                            </h4>
                            <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">{mentee.rollNo}</p>
                          </div>
                        </div>

                        {/* Criteria Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                            mentee.criteriaMet
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {mentee.criteriaMet ? "✓ Criteria Met" : "⚠ Action Needed"}
                        </span>
                      </div>

                      {/* Department & Program Tag */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="truncate">{mentee.department}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700 shrink-0">{mentee.program}</span>
                      </div>
                    </div>

                    {/* Middle: Big Metric & Smooth Progress Bar */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-2xl sm:text-3xl font-black ${isCompleted ? "text-emerald-600" : "text-slate-900"}`}>
                            {mentee.earnedPoints}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-400">/ {mentee.totalTarget} pts</span>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          isCompleted ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" : "bg-purple-50 text-[#7656f4] border border-purple-200/60"
                        }`}>
                          {progressPct}% Completed
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? "bg-emerald-500" : "bg-[#7656f4]"
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* Semester stats sub-row */}
                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <span className="text-slate-500 font-medium">
                          {mentee.semester}: <strong className="text-slate-800 font-bold">{mentee.currentSemPoints} pts</strong>
                        </span>
                        {mentee.pendingPoints > 0 ? (
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                            {mentee.pendingPoints} pts pending
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">0 pending</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom: User-Friendly Action Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-[#7656f4] text-[#7656f4] hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer group-hover:bg-[#7656f4] group-hover:text-white"
                      >
                        <span>View Student History</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB VIEW 2: ALL SUBMITTED REQUESTS & HISTORY (Student Portal Style)    */}
      {/* ========================================================================= */}
      {activeTab === "requests" && (
        <section className="space-y-4 animate-in fade-in duration-200">
          
          {/* Controls Bar: Filters, Categories & View Toggles */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Segmented Status Tabs without Shadows */}
            <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 flex items-center gap-1.5 overflow-x-auto">
              
              {/* Tab 1: Pending Review */}
              <button
                type="button"
                onClick={() => setStatusFilter("pending")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "pending"
                    ? "bg-amber-500 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <Clock size={15} />
                <span>Pending Review</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                    statusFilter === "pending" ? "bg-white text-amber-600" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {totalPendingRequestsCount}
                </span>
              </button>

              {/* Tab 2: Approved */}
              <button
                type="button"
                onClick={() => setStatusFilter("approved")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "approved"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <CheckCircle2 size={15} />
                <span>Approved</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                    statusFilter === "approved" ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {approvedRequestsCount}
                </span>
              </button>

              {/* Tab 3: Rejected */}
              <button
                type="button"
                onClick={() => setStatusFilter("failed")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === "failed"
                    ? "bg-rose-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                <XCircle size={15} />
                <span>Rejected</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                    statusFilter === "failed" ? "bg-white text-rose-700" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {rejectedRequestsCount}
                </span>
              </button>
            </div>

            {/* Category Dropdown & Layout Mode */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-semibold outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical Events</option>
                <option value="certifications">Certifications</option>
                <option value="workshops">Workshops</option>
                <option value="attendance">Attendance</option>
              </select>

              <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>

          </div>

          {/* Request Cards / Rows */}
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center space-y-2">
              <Award className="mx-auto text-gray-300" size={36} />
              <h4 className="text-sm font-bold text-gray-700">No matching credit requests found</h4>
              <p className="text-xs text-gray-400">Try adjusting your filters or search keywords.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRequests.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-5.5 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Top: Category, Semester, Points Badge & Status Pill */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-700">{item.category}</span>
                          <span className="text-slate-300 text-xs mx-1.5">•</span>
                          <span className="text-xs font-medium text-slate-500">{item.semester}</span>
                        </div>
                      </div>
                      
                      {/* Points & Status Badges */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-black text-[#7656F4] bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-lg">
                          +{item.points} Pts
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            item.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#7656f4] transition-colors">
                      {item.title}
                    </h4>
                    
                    {/* Mentee info tag */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Users size={14} className="text-[#7656f4] shrink-0" />
                        <span className="font-bold text-slate-800 truncate">{item.studentName}</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-500 shrink-0 text-[11px]">
                        {item.rollNo}
                      </span>
                    </div>

                    {/* Details Box */}
                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Issuing Body:</span>
                        <span className="font-semibold text-slate-800 truncate ml-2 text-right">{item.issuer}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Submission Date:</span>
                        <span className="font-medium text-slate-700">{item.date}</span>
                      </div>
                      {item.remarks && (
                        <p className="text-[11px] text-slate-600 italic line-clamp-2 pt-1.5 mt-1 border-t border-slate-200/60">
                          "{item.remarks}"
                        </p>
                      )}
                      {item.status === "Approval Failed" && item.mentorNote && (
                        <p className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200/70 font-medium mt-1">
                          Rejection reason: {item.mentorNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Dedicated Equal-Size Action Buttons */}
                  <div className="pt-2 border-t border-slate-100">
                    {item.status === "Pending" ? (
                      <div className="flex items-center gap-2.5 w-full">
                        {/* Reject Button (Red, Equal Size) */}
                        <button
                          type="button"
                          onClick={() => setReviewingRequest(item)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                        >
                          <X size={14} className="stroke-[2.5]" />
                          <span>Reject</span>
                        </button>
                        
                        {/* Accept Button (Green, Equal Size) */}
                        <button
                          type="button"
                          onClick={() => handleApproveRequest(item.id)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                        >
                          <Check size={14} className="stroke-[2.5]" />
                          <span>Accept</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const mentee = menteesList.find((m) => m.id === item.studentId);
                          if (mentee) setSelectedStudentForHistory(mentee);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7656f4] text-slate-700 border border-slate-200/90 hover:border-purple-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>View Full Student Ledger</span>
                        <ArrowUpRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table / List View */
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Student &amp; Roll</th>
                    <th className="p-4">Activity Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Points</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map((item) => (
                    <tr key={item.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{item.studentName}</p>
                        <p className="text-[11px] font-mono text-gray-400">{item.rollNo}</p>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-gray-400">{item.issuer}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{item.date}</td>
                      <td className="p-4 text-center font-black text-gray-900">+{item.points}</td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            item.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {item.status === "Pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReviewingRequest(item)}
                              className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApproveRequest(item.id)}
                              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                            >
                              Accept
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              const mentee = menteesList.find((m) => m.id === item.studentId);
                              if (mentee) setSelectedStudentForHistory(mentee);
                            }}
                            className="text-xs font-bold text-[#7656f4] hover:underline"
                          >
                            History →
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: PER-STUDENT CREDIT HISTORY MODAL                                */}
      {/* ========================================================================= */}
      {selectedStudentForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStudentForHistory(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Student Header Summary */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <img
                src={selectedStudentForHistory.avatar}
                alt={selectedStudentForHistory.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-200 shadow-sm shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {selectedStudentForHistory.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7656f4]">
                    {selectedStudentForHistory.rollNo}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{selectedStudentForHistory.department} • {selectedStudentForHistory.semester}</p>
                
                {/* Points bar */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        selectedStudentForHistory.earnedPoints >= 100 ? "bg-emerald-500" : "bg-[#7656f4]"
                      }`}
                      style={{ width: `${Math.min(100, selectedStudentForHistory.earnedPoints)}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-gray-900">
                    {selectedStudentForHistory.earnedPoints} / 100 Pts
                  </span>
                </div>
              </div>
            </div>

            {/* History List for this student */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Submitted Activity History ({selectedStudentHistory.length} Records)
              </h4>

              {selectedStudentHistory.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-xl">
                  No credit records logged yet for this mentee.
                </div>
              ) : (
                selectedStudentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-200/80 space-y-2 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        {getCategoryIcon(item.category)}
                        <div>
                          <h5 className="text-xs font-bold text-gray-900">{item.title}</h5>
                          <p className="text-[11px] text-gray-500">{item.issuer} • {item.date}</p>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-gray-900">+{item.points} Pts</span>
                        <div>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                              item.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {item.remarks && (
                      <p className="text-[11px] text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                        {item.remarks}
                      </p>
                    )}

                    {item.mentorNote && (
                      <p className="text-[11px] text-[#7656f4] font-medium">
                        Mentor Verification: {item.mentorNote}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudentForHistory(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* 8. MODAL: REJECT REQUEST WITH REASON                                      */}
      {/* ========================================================================= */}
      {reviewingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative">
            <button
              type="button"
              onClick={() => setReviewingRequest(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <XCircle size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Reject Credit Claim</h3>
                <p className="text-xs text-gray-400">Provide rejection reason to notify the student</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <p className="font-bold text-gray-900">{reviewingRequest.title}</p>
              <p className="text-gray-500 mt-0.5">{reviewingRequest.studentName} ({reviewingRequest.rollNo}) • {reviewingRequest.points} Pts</p>
            </div>

            <form onSubmit={handleRejectRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Reason for Rejection <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Non-accredited webinar; certificate missing official credential ID..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewingRequest(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
