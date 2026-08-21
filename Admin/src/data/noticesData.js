export const defaultNotices = [
  {
    id: "NTC001",
    title: "Semester Exam Schedule 2026",
    category: "Academic",
    priority: "Urgent",
    date: "2026-05-20",
    expiryDate: "2026-06-30",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Academic Cell",
    audience: "All Students",
    content: "The detailed schedule for the upcoming semester examinations has been published. All students must check their portals for exam dates and venue details."
  },
  {
    id: "NTC002",
    title: "Project Submission Deadline Extension",
    category: "Academic",
    priority: "High",
    date: "2026-05-18",
    expiryDate: "2026-08-15",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Prof. Kaushik Chatterjee",
    audience: "CSE 3rd Year Mentees",
    content: "The final submission deadline for the Data Structures term project has been extended to August 15th."
  },
  {
    id: "NTC003",
    title: "Mentorship Group Meeting Schedule",
    category: "General",
    priority: "Medium",
    date: "2026-05-15",
    expiryDate: "2026-05-25",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Prof. Kaushik Chatterjee",
    audience: "All Mentees",
    content: "Our weekly group mentorship session will take place this Friday at 3:00 PM in Room 304."
  },
  {
    id: "NTC004",
    title: "Holiday Notice: Summer Break",
    category: "General",
    priority: "Medium",
    date: "2026-05-15",
    expiryDate: "2026-06-21",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Admin Office",
    audience: "All Students & Staff",
    content: "The institution will remain closed for summer break from June 1st to June 20th. Classes will resume on June 21st."
  },
  {
    id: "NTC005",
    title: "Library Timings Extended for Exams",
    category: "Academic",
    priority: "Low",
    date: "2026-05-12",
    expiryDate: "2026-06-15",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Library Admin",
    audience: "All Students",
    content: "To assist students during exam preparation, central library hours will be extended till 10:00 PM starting next Monday."
  },
  {
    id: "NTC006",
    title: "Campus Placement Drive Registration",
    category: "Placement",
    priority: "High",
    date: "2026-05-10",
    expiryDate: "2026-05-30",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "Placement Cell",
    audience: "4th Year Students",
    content: "Registration for upcoming tech company placement drives is now open for 4th year students."
  },
  {
    id: "NTC007",
    title: "Hostel Fee Payment Deadline",
    category: "General",
    priority: "High",
    date: "2026-05-08",
    expiryDate: "2026-05-25",
    status: "Draft",
    badgeColor: "bg-yellow-100 text-yellow-600",
    author: "Accounts Dept",
    audience: "Hostel Residents",
    content: "Hostel residents are requested to clear all pending fee dues before May 25th to avoid late fee penalties."
  },
  {
    id: "NTC008",
    title: "Faculty Meeting Schedule",
    category: "Academic",
    priority: "Low",
    date: "2026-05-05",
    expiryDate: "2026-05-06",
    status: "Archived",
    badgeColor: "bg-gray-200 text-gray-600",
    author: "HOD CSE",
    audience: "Faculty Members",
    content: "Department faculty meeting regarding curriculum review is scheduled for 2:00 PM in Conference Room A."
  },
  {
    id: "NTC009",
    title: "Blood Donation Camp",
    category: "Event",
    priority: "Medium",
    date: "2026-05-03",
    expiryDate: "2026-05-05",
    status: "Active",
    badgeColor: "bg-green-100 text-green-600",
    author: "NSS Club",
    audience: "All Students & Staff",
    content: "Annual NSS Blood Donation Camp will be held in the auditorium. All interested volunteers are invited."
  },
  {
    id: "NTC010",
    title: "Sports Week Announcement",
    category: "Event",
    priority: "Low",
    date: "2026-04-28",
    expiryDate: "2026-05-04",
    status: "Archived",
    badgeColor: "bg-gray-200 text-gray-600",
    author: "Sports Committee",
    audience: "All Students",
    content: "Annual inter-department sports tournament schedule and team registration guidelines."
  }
];

export function getStoredNotices() {
  try {
    const data = localStorage.getItem("trackademy_notices");
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure priority and expiryDate exist on each notice
        return parsed.map((item, idx) => ({
          ...item,
          priority: item.priority || (defaultNotices[idx]?.priority || "Medium"),
          expiryDate: item.expiryDate || (defaultNotices[idx]?.expiryDate || ""),
        }));
      }
    }
  } catch (e) {
    console.error("Error reading notices from localStorage", e);
  }
  return defaultNotices;
}

export function saveStoredNotices(notices) {
  try {
    localStorage.setItem("trackademy_notices", JSON.stringify(notices));
  } catch (e) {
    console.error("Error saving notices to localStorage", e);
  }
}
