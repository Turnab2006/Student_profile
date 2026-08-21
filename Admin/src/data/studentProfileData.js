// ============================================================================
// Comprehensive Centralized Student Dataset for Student Portal
// Student: Tanuka Saha (Roll No: CSE2024012, Dept: Computer Science & Engineering)
// ============================================================================

import { MENTOR_DETAILS } from "./mentorData";

export const tanukaStudentData = {
  id: "CSE2024012",
  name: "Tanuka Saha",
  fullName: "Tanuka Saha",
  firstName: "Tanuka",
  lastName: "Saha",
  verified: true,
  avatar: "/tuhina_avatar.jpg",
  initials: "TS",
  email: "tanuka.saha@gmail.com",
  studentEmail: "tanuka.s@trackademy.edu",
  phone: "+91 91239 30828",
  department: "Computer Science & Engineering",
  dept: "Computer Science & Engineering",
  deptCode: "CSE",
  course: "BTech",
  program: "BTech",
  degree: "Bachelor of Technology",
  semester: "5th Semester",
  semesterStr: "Semester 5",
  semNum: 5,
  year: "3rd Year",
  yearStr: "3rd Year",
  yearNum: 3,
  rollNo: "CSE2024012",
  roll: "CSE2024012",
  collegeRollNo: "CSE2024012",
  universityRollNo: "11700124178",
  registrationNo: "REG-2024-CSE-0012",
  registrationNumber: "REG-2024-CSE-0012",
  enrollmentNo: "TITM/2024/CSE/012",
  enrollmentNumber: "TITM/2024/CSE/012",
  abcId: "9284-1823-9012",
  academicYear: "2024 - 2025",
  batch: "2024 - 2028",
  admissionBatch: "2024 - 2028",
  section: "Section A",
  mentor: MENTOR_DETAILS.fullName,
  mentorEmail: MENTOR_DETAILS.collegeEmail,
  mentorPhone: MENTOR_DETAILS.phone,
  status: "Active",
  cgpa: "9.42",
  currentSGPA: "9.50",
  classRank: "1st in Department (Rank #1)",
  creditsEarned: "96",
  totalCredits: "160",
  attendanceOverall: "95.0%",
  attendanceRate: 95,
  creditPointsEarned: 75,
  creditPointsTarget: 100,

  // Personal / Parents Details
  additionalDetails: {
    personalEmail: "tanuka.saha@gmail.com",
    phoneNumber: "+91 91239 30828",
    collegeEmail: "tanuka.s@trackademy.edu",
    bloodGroup: "O+",
    dateOfBirth: "12 May 2004",
    aadharCardNumber: "4521 8901 2345",
    gender: "Female",
    category: "General",
    nationality: "Indian",
    emergencyContact: "+91 91239 30829",
    religion: "Hinduism",
    motherTongue: "Bengali",
    maritalStatus: "Single",
  },

  // Address Details
  addressDetails: {
    country: "India",
    state: "West Bengal",
    district: "Kolkata",
    pinCode: "700091",
    postalAddress: "Plot 14, Block EP & GP, Salt Lake Sector V",
    policeStation: "Bidhannagar East Police Station",
    fullAddress: "Flat 4B, Greenwood Heights, Plot 14, Block EP & GP, Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal - 700091",
    presentAddress: "Flat 4B, Greenwood Heights, Plot 14, Block EP & GP, Salt Lake Sector V, Bidhannagar, Kolkata - 700091",
    permanentAddress: "Flat 4B, Greenwood Heights, Plot 14, Block EP & GP, Salt Lake Sector V, Bidhannagar, Kolkata - 700091",
  },

  // Father Details
  fatherDetails: {
    fullName: "Subhash Saha",
    emailAddress: "subhash.saha@gmail.com",
    phoneNumber: "+91 91239 30820",
    occupation: "Business Executive",
    designation: "General Manager, Tech Operations",
    officeAddress: "Bikash Bhavan, Salt Lake, Kolkata, West Bengal",
    annualIncome: "₹ 18,00,000",
  },

  // Mother Details
  motherDetails: {
    fullName: "Ananya Saha",
    emailAddress: "ananya.saha@gmail.com",
    phoneNumber: "+91 91239 30821",
    occupation: "Professor & Academician",
    designation: "Associate Professor",
    institution: "University of Calcutta",
    qualification: "Ph.D in Mathematics, M.Sc",
    officeAddress: "College Street Campus, Kolkata, West Bengal",
    annualIncome: "₹ 14,00,000",
  },

  // Mentor Details
  mentorDetails: {
    name: MENTOR_DETAILS.fullName,
    fullName: MENTOR_DETAILS.fullName,
    designation: MENTOR_DETAILS.designation,
    department: MENTOR_DETAILS.department,
    email: MENTOR_DETAILS.collegeEmail,
    phone: MENTOR_DETAILS.phone,
    officeLocation: MENTOR_DETAILS.officeLocation,
    officeHours: MENTOR_DETAILS.officeHours,
    consultationHours: MENTOR_DETAILS.consultationHours,
    avatar: MENTOR_DETAILS.avatar,
    empId: MENTOR_DETAILS.empId,
  },

  // Academic Information
  academicDetails: {
    institution: "Trackademy Institute of Technology & Management",
    universityName: "Maulana Abul Kalam Azad University of Technology",
    universityRole: "Regular",
    registrationNumber: "REG-2024-CSE-0012",
    abcId: "9284-1823-9012",
    enrollmentNumber: "TITM/2024/CSE/012",
    admissionBatch: "2024 - 2028",
    currentYear: "3rd Year",
    currentSemester: "5th Semester",
    collegeRollNo: "CSE2024012",
    universityRollNo: "11700124178",
    cgpa: "9.42",
    creditsEarned: "96",
    totalCredits: "160",
    currentSGPA: "9.50",
    classRank: "1st in Department (Rank #1)",
    attendanceOverall: "95.0%",
    currentSubjects: [
      { code: "CS501", name: "Design & Analysis of Algorithms", credits: 4, faculty: MENTOR_DETAILS.fullName, type: "Core Theory", progress: 94 },
      { code: "CS502", name: "Database Management Systems", credits: 4, faculty: "Prof. Ananya Sen", type: "Core Theory", progress: 92 },
      { code: "CS503", name: "Operating Systems Architecture", credits: 4, faculty: "Dr. Sourav Mukherjee", type: "Core Theory", progress: 90 },
      { code: "CS504", name: "Object Oriented Java Programming", credits: 3, faculty: "Dr. P. Chakraborty", type: "Core Theory", progress: 96 },
      { code: "CS591", name: "Algorithms & DBMS Laboratory", credits: 2, faculty: MENTOR_DETAILS.fullName, type: "Practical", progress: 98 },
      { code: "CS592", name: "Minor Project & Development", credits: 3, faculty: MENTOR_DETAILS.fullName, type: "Project Work", progress: 88 }
    ]
  },

  // Semester Results History
  resultDetails: {
    semesters: [
      { sem: "Semester 1", sgpa: "9.20", credits: 22, status: "Passed", year: "Autumn 2024" },
      { sem: "Semester 2", sgpa: "9.35", credits: 22, status: "Passed", year: "Spring 2025" },
      { sem: "Semester 3", sgpa: "9.50", credits: 22, status: "Passed", year: "Autumn 2025" },
      { sem: "Semester 4", sgpa: "9.45", credits: 22, status: "Passed", year: "Spring 2026" },
      { sem: "Semester 5", sgpa: "9.55", credits: 22, status: "Passed", year: "Autumn 2026" },
      { sem: "Semester 6", sgpa: "In Progress", credits: 20, status: "Ongoing", year: "Spring 2027" }
    ],
    sem5Grades: [
      { code: "CS501", subject: "Design & Analysis of Algorithms", internal: "29/30", theory: "68/70", total: "97/100", grade: "O", gradePoint: "10" },
      { code: "CS502", subject: "Database Management Systems", internal: "28/30", theory: "64/70", total: "92/100", grade: "O", gradePoint: "10" },
      { code: "CS503", subject: "Operating Systems Architecture", internal: "29/30", theory: "62/70", total: "91/100", grade: "O", gradePoint: "10" },
      { code: "CS504", subject: "Object Oriented Java Programming", internal: "28/30", theory: "65/70", total: "93/100", grade: "O", gradePoint: "10" },
      { code: "CS591", subject: "Algorithms & DBMS Laboratory", internal: "40/40", theory: "58/60", total: "98/100", grade: "O", gradePoint: "10" }
    ]
  },

  // Semester Attendance History
  attendanceDetails: {
    overallPercentage: 95.0,
    presentDays: 172,
    totalWorkingDays: 180,
    leavesApproved: 6,
    unexcusedAbsent: 2,
    subjectAttendance: [
      { subject: "Design & Analysis of Algorithms", attended: 36, total: 38, percentage: 94.7, status: "Excellent" },
      { subject: "Database Management Systems", attended: 35, total: 37, percentage: 94.6, status: "Excellent" },
      { subject: "Operating Systems Architecture", attended: 38, total: 40, percentage: 95.0, status: "Excellent" },
      { subject: "Object Oriented Java Programming", attended: 36, total: 38, percentage: 94.7, status: "Excellent" },
      { subject: "Algorithms & DBMS Laboratory", attended: 18, total: 18, percentage: 100.0, status: "Perfect" },
      { subject: "Minor Project & Development", attended: 29, total: 30, percentage: 96.7, status: "Excellent" }
    ]
  },

  // MAR / Credit Points Activities Portfolio
  activities: [
    {
      id: "CRD-001",
      title: "TECHNOVATE 2026 Hackathon Winner (1st Prize)",
      category: "Technical",
      semester: "Semester 5",
      points: 15,
      date: "May 20, 2026",
      issuer: "CSE Dept & Innovation Council",
      status: "Approved",
      proofDoc: "technovate_winner_cert.pdf",
      remarks: "First prize in Generative AI track with ₹25,000 cash award.",
      mentorNote: "Verified with department hackathon committee.",
    },
    {
      id: "CRD-002",
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      category: "Certifications",
      semester: "Semester 5",
      points: 10,
      date: "Apr 15, 2026",
      issuer: "Amazon Web Services",
      status: "Approved",
      proofDoc: "aws_cert_validation_89412.pdf",
      remarks: "Scored 890/1000 in official AWS exam.",
      mentorNote: "Credly digital badge verified.",
    },
    {
      id: "CRD-003",
      title: "Google Cloud Study Jam - 4 Skill Badges",
      category: "Certifications",
      semester: "Semester 5",
      points: 15,
      date: "May 18, 2026",
      issuer: "Google Developers Group (GDG)",
      status: "Pending",
      proofDoc: "gcp_study_jam_badges.pdf",
      remarks: "Completed 4 architect skill badges on Google Cloud Skills Boost.",
      mentorNote: "Pending final review.",
    },
    {
      id: "CRD-004",
      title: "NPTEL Elite Certificate: Deep Learning",
      category: "Certifications",
      semester: "Semester 4",
      points: 15,
      date: "Mar 10, 2026",
      issuer: "IIT Kharagpur / SWAYAM",
      status: "Approved",
      proofDoc: "nptel_deep_learning_elite.pdf",
      remarks: "Top 5% candidate with 88% overall score in 12-week course.",
      mentorNote: "Scorecard verified on Swayam ledger.",
    },
    {
      id: "CRD-005",
      title: "Inter-College Robotics Obstacle Runner Up",
      category: "Technical",
      semester: "Semester 4",
      points: 10,
      date: "Feb 22, 2026",
      issuer: "Robotics & IoT Club",
      status: "Approved",
      proofDoc: "robotics_silver_award.pdf",
      remarks: "Constructed autonomous line follower with computer vision camera.",
      mentorNote: "Project demo validated.",
    }
  ]
};

export const STUDENT_PORTAL_DATA = tanukaStudentData;
export const initialStudentData = tanukaStudentData;
export const tuhinaStudentData = tanukaStudentData;
export const arjunStudentData = tanukaStudentData;
