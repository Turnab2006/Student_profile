// ============================================================================
// Comprehensive Centralized Mentor Dataset for Mentor Portal
// Contains complete mentor profile metadata, academic credentials, and statistics
// ============================================================================

import { Users, CheckCircle2, TrendingUp, Star } from "lucide-react";
import { STUDENTS_DATA } from "./studentsData";

export const MENTOR_DETAILS = {
  id: "mentor-01",
  prefix: "Prof.",
  firstName: "Kaushik",
  middleName: "",
  lastName: "Chatterjee",
  fullName: "Prof. Kaushik Chatterjee",
  name: "Kaushik Chatterjee",
  role: "Senior Faculty Mentor",
  designation: "Associate Professor & Senior Faculty Mentor",
  department: "Computer Science & Engineering",
  dept: "Computer Science & Engineering",
  deptCode: "CSE",
  empId: "EMP202001",
  employeeId: "EMP202001",
  gender: "Male",
  phone: "+91 98365 24102",
  collegeEmail: "kaushik.c@trackademy.edu",
  institutionalEmail: "kaushik.c@trackademy.edu",
  personalEmail: "kaushik.chatterjee.prof@gmail.com",
  email: "kaushik.c@trackademy.edu",
  joiningDate: "15 July 2020",
  joiningDateFormatted: "July 15, 2020",
  qualification: "Ph.D in Computer Science & Engineering (IIT Kharagpur), M.Tech (CSE), B.Tech (IT)",
  experience: "8+ Years",
  location: "Room 304, Academic Block-B, Trackademy Campus, Kolkata, West Bengal - 700015",
  officeLocation: "Room 304, Academic Block-B, Trackademy Campus",
  officeHours: "Mon - Fri (2:00 PM - 4:30 PM)",
  consultationHours: "Mon, Wed, Fri • 2:00 PM - 4:30 PM",
  availabilityStatus: "Active",
  status: "Active",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80",
  initials: "KC",
  aadharNumber: "9874 5612 9012",
  assignedMenteesCount: "20 Students",
  totalMentees: 20,
  activeMentees: 20,
  inactiveMentees: 0,
  avgAttendance: "91.5%",
  attendanceRate: "91.5%",
  creditsIssued: "1,745 Pts",
  creditsIssuedCount: "1,745",
  resultsPublished: "18 Batches",
  resultsPublishedCount: "18",
  coreSubjects: "Data Structures & Algorithms, Computer Networks, Machine Learning, Cloud Computing, Distributed Systems",
  specialization: "Artificial Intelligence, Distributed Systems, Cloud Computing, Edge Computing",
  bio: "Dedicated faculty mentor with over 8 years of academic and industry research experience. Actively guiding undergraduate students in core computing disciplines, competitive programming, hackathons, and research paper publications.",
};

// Mentor Dashboard Stat Cards
export const getMentorDashboardStats = (mentees = STUDENTS_DATA) => {
  const totalMentees = mentees.length;
  const avgAttendance = Math.round(
    mentees.reduce((acc, curr) => acc + (curr.percentage || curr.attendanceRate || 90), 0) / (totalMentees || 1)
  );
  const totalCredits = mentees.reduce((acc, curr) => acc + (curr.totalEarned || 0), 0);

  return [
    {
      key: "mentees",
      label: "Total Mentees",
      value: String(totalMentees),
      note: "Assigned students",
      icon: Users,
      cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]",
      valueClass: "text-[#111827]",
      iconWrap: "bg-[#F3EEFF] text-[#7656f4]",
      pageKey: "mentees",
    },
    {
      key: "attendance",
      label: "Attendance Rate",
      value: `${avgAttendance}%`,
      note: "Class average",
      icon: CheckCircle2,
      cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#22C55E]",
      valueClass: "text-[#111827]",
      iconWrap: "bg-[#EAFBF1] text-[#22C55E]",
      pageKey: "attendance",
    },
    {
      key: "results",
      label: "Results Published",
      value: "18",
      note: "Semester evaluations",
      icon: TrendingUp,
      cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#F59E0B]",
      valueClass: "text-[#111827]",
      iconWrap: "bg-[#FFF5E8] text-[#F59E0B]",
      pageKey: "results",
    },
    {
      key: "credits",
      label: "Credit Points Issued",
      value: totalCredits.toLocaleString(),
      note: "Total approved points",
      icon: Star,
      cardClass: "bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#3B82F6]",
      valueClass: "text-[#111827]",
      iconWrap: "bg-[#EEF5FF] text-[#3B82F6]",
      pageKey: "credit-points",
    },
  ];
};

export const MENTOR_NOTIFICATIONS = [
  {
    id: "1",
    title: "New Project Deadline Extended",
    desc: "Final term major project deadline is extended to Sep 15.",
    time: "10 mins ago",
    icon: "Megaphone",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "2",
    title: "Credit Point Request from Turnab Roy",
    desc: "Turnab Roy submitted certificate for 'Smart India Hackathon 2025' (+30 pts).",
    time: "35 mins ago",
    icon: "Star",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    id: "3",
    title: "Attendance Notice",
    desc: "Monthly attendance review ledger is ready for signature.",
    time: "2 hours ago",
    icon: "AlertTriangle",
    iconBg: "bg-amber-100 text-amber-600",
  },
];
