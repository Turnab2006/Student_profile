// Default seed tickets for Support & Tracking
export const defaultTickets = [
  {
    id: "TCK-2026-8941",
    subject: "Attendance record discrepancy in CS304 Theory",
    category: "Attendance",
    priority: "High",
    status: "Resolved",
    date: "2026-08-19",
    submitter: "Tanuka Saha (CS2021001)",
    email: "tanukas@gmail.com",
    department: "Computer Science & Engg",
    description: "My attendance for CS304 on 12th Aug was marked absent despite physical presence in lecture hall 302. Roll call signed with Dr. Sen.",
    assignedTo: "Academic Helpdesk (Dr. Kaushik Chatterjee)",
    estimatedResolution: "Resolved in 24 hrs",
    timeline: [
      {
        step: "Ticket Submitted",
        desc: "Inquiry logged via Student Portal and assigned to Computer Science Department.",
        time: "19 Aug 2026, 10:15 AM",
        completed: true,
      },
      {
        step: "Under Triage & Verification",
        desc: "Physical attendance register cross-verified with subject faculty Dr. Sen.",
        time: "19 Aug 2026, 02:30 PM",
        completed: true,
      },
      {
        step: "Attendance Log Updated",
        desc: "Database attendance ledger updated from 88% to 92.4%.",
        time: "20 Aug 2026, 11:00 AM",
        completed: true,
      },
      {
        step: "Resolution Complete",
        desc: "Issue resolved. Confirmation sent to student email & portal inbox.",
        time: "20 Aug 2026, 11:30 AM",
        completed: true,
      },
    ],
  },
  {
    id: "TCK-2026-7732",
    subject: "Semester IV grade card download error (PDF corrupt)",
    category: "Results",
    priority: "Urgent",
    status: "In Progress",
    date: "2026-08-14",
    submitter: "Turnab Roy (CS2024012)",
    email: "turnab.r@edusmart.edu",
    department: "Computer Science & Engg",
    description: "When downloading the official Semester IV marksheet PDF from Results portal, it shows '0 KB invalid file stream'.",
    assignedTo: "Examination Cell & IT Systems (Mr. Debjit Paul)",
    estimatedResolution: "Within 12 hours",
    timeline: [
      {
        step: "Ticket Submitted",
        desc: "Reported with attachment of corrupted PDF download error.",
        time: "14 Aug 2026, 04:20 PM",
        completed: true,
      },
      {
        step: "Under Technical Review",
        desc: "PDF generation pipeline error identified on CDN server node 4.",
        time: "15 Aug 2026, 09:45 AM",
        completed: true,
      },
      {
        step: "Regenerating Grade Sheets",
        desc: "Batch script running to re-render cryptographic stamp marksheets.",
        time: "15 Aug 2026, 02:15 PM",
        completed: true,
      },
      {
        step: "Final Verification",
        desc: "Pending final check before dispatching fresh download link.",
        time: "Estimated: Today, 06:00 PM",
        completed: false,
      },
    ],
  },
  {
    id: "TCK-2026-6190",
    subject: "Update faculty advisor mapping for BCA Section B",
    category: "Mentors",
    priority: "Medium",
    status: "Under Review",
    date: "2026-08-08",
    submitter: "Sneha Roy (BCA2023023)",
    email: "sneha.r@edusmart.edu",
    department: "Computer Applications (BCA)",
    description: "New semester mentor assignment still lists previous year faculty advisor instead of Prof. Alok Bhattacharya.",
    assignedTo: "Dean of Student Affairs",
    estimatedResolution: "2-3 business days",
    timeline: [
      {
        step: "Ticket Submitted",
        desc: "Request received for mentor reassignment update.",
        time: "08 Aug 2026, 11:00 AM",
        completed: true,
      },
      {
        step: "Under Review by HOD",
        desc: "Awaiting HOD approval for Section B mentor batch list.",
        time: "09 Aug 2026, 10:00 AM",
        completed: true,
      },
      {
        step: "Database Sync",
        desc: "Pending ERP portal sync.",
        time: "Pending",
        completed: false,
      },
      {
        step: "Resolution Complete",
        desc: "Notification to all Section B mentees.",
        time: "Pending",
        completed: false,
      },
    ],
  },
  {
    id: "TCK-2026-5520",
    subject: "Credit point approval for Smart India Hackathon 2026",
    category: "Academic",
    priority: "Medium",
    status: "Resolved",
    date: "2026-07-28",
    submitter: "Alice Johnson (CS2021001)",
    email: "alice.j@edusmart.edu",
    department: "Computer Science & Engg",
    description: "Uploaded 1st Runner Up Certificate for SIH 2026. Requesting 15 credit points credit to semester 6.",
    assignedTo: "Dean Academic Affairs",
    estimatedResolution: "Resolved",
    timeline: [
      {
        step: "Ticket Submitted",
        desc: "Certificate scanned document attached.",
        time: "28 Jul 2026, 01:10 PM",
        completed: true,
      },
      {
        step: "Certificate Verified",
        desc: "AICTE verified event code matched.",
        time: "29 Jul 2026, 11:30 AM",
        completed: true,
      },
      {
        step: "15 Credits Awarded",
        desc: "Credit points ledger updated successfully.",
        time: "30 Jul 2026, 03:00 PM",
        completed: true,
      },
      {
        step: "Closed",
        desc: "Ticket closed with full resolution.",
        time: "30 Jul 2026, 03:15 PM",
        completed: true,
      },
    ],
  },
  {
    id: "TCK-2026-4109",
    subject: "Two-Factor Authentication SMS OTP not receiving",
    category: "System",
    priority: "Urgent",
    status: "Resolved",
    date: "2026-07-15",
    submitter: "David Brown (CS2021004)",
    email: "david.b@edusmart.edu",
    department: "Computer Science & Engg",
    description: "Unable to login to portal from off-campus network due to SMS gateway timeout.",
    assignedTo: "Network & Security Operations",
    estimatedResolution: "Resolved",
    timeline: [
      {
        step: "Ticket Submitted",
        desc: "OTP failure reported.",
        time: "15 Jul 2026, 08:00 AM",
        completed: true,
      },
      {
        step: "SMS Gateway Restored",
        desc: "Primary telecom route failover triggered.",
        time: "15 Jul 2026, 08:45 AM",
        completed: true,
      },
      {
        step: "Verified & Resolved",
        desc: "Student successfully logged in.",
        time: "15 Jul 2026, 09:00 AM",
        completed: true,
      },
    ],
  },
];

export function getStoredTickets() {
  try {
    const saved = localStorage.getItem("trackademy_support_tickets");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error reading stored tickets:", e);
  }
  return defaultTickets;
}

export function saveStoredTickets(tickets) {
  try {
    localStorage.setItem("trackademy_support_tickets", JSON.stringify(tickets));
  } catch (e) {
    console.error("Error saving tickets:", e);
  }
}
