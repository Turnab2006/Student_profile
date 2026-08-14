export const defaultActivities = [
  {
    id: "ACT001",
    title: "TECHNOVATE 2026",
    type: "Technical",
    date: "2026-05-17",
    time: "04:30 AM",
    venue: "RCCIIT Main Campus",
    status: "Upcoming",
    registered: 234,
    badgeColor: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&auto=format&fit=crop&q=80",
    description: "Showcase innovation, creativity, and technical excellence among students and professionals."
  },
  {
    id: "ACT002",
    title: "Annual Startup Speech 2026",
    type: "Career",
    date: "2026-05-25",
    time: "05:30 AM",
    venue: "Seminar Hall, RCCIIT",
    status: "Upcoming",
    registered: 89,
    badgeColor: "bg-pink-100 text-pink-600",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&auto=format&fit=crop&q=80",
    description: "An inspiring startup event featuring successful entrepreneurs and innovative ideas."
  },
  {
    id: "ACT003",
    title: "Annual Sports Meet 2026",
    type: "Sports",
    date: "2026-06-01",
    time: "10:00 AM",
    venue: "College Sports Complex",
    status: "Upcoming",
    registered: 156,
    badgeColor: "bg-cyan-100 text-cyan-600",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&auto=format&fit=crop&q=80",
    description: "A celebration of teamwork, determination, and athletic excellence."
  },
  {
    id: "ACT004",
    title: "Cultural Fest 2026",
    type: "Cultural",
    date: "2026-06-10",
    time: "06:00 PM",
    venue: "Main Auditorium",
    status: "Upcoming",
    registered: 412,
    badgeColor: "bg-yellow-100 text-yellow-600",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    description: "Experience diversity, art, music and cultural performances."
  },
  {
    id: "ACT005",
    title: "AI Workshop for Students",
    type: "Academics",
    date: "2026-06-15",
    time: "02:00 PM",
    venue: "Lab 3, RCCIIT",
    status: "Upcoming",
    registered: 67,
    badgeColor: "bg-green-100 text-green-600",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80",
    description: "Hands-on workshop to explore the future of Artificial Intelligence."
  },
  {
    id: "ACT006",
    title: "Coding Challenge 2026",
    type: "Technical",
    date: "2026-06-20",
    time: "11:00 AM",
    venue: "Computer Lab",
    status: "Upcoming",
    registered: 45,
    badgeColor: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80",
    description: "Test your coding skills and compete with the best."
  },
  {
    id: "ACT007",
    title: "Blood Donation Camp",
    type: "Campaign",
    date: "2026-05-28",
    time: "09:00 AM",
    venue: "Campus Health Center",
    status: "Completed",
    registered: 156,
    badgeColor: "bg-orange-100 text-orange-600",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=300&auto=format&fit=crop&q=80",
    description: "Join to save lives — camp organized with local blood bank."
  },
  {
    id: "ACT008",
    title: "Industrial Visit: Tech Park",
    type: "Trip",
    date: "2026-06-05",
    time: "08:00 AM",
    venue: "Tech Park",
    status: "Cancelled",
    registered: 0,
    badgeColor: "bg-red-100 text-red-600",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80",
    description: "A guided visit to local tech companies and startups."
  }
];

export function getStoredActivities() {
  try {
    const data = localStorage.getItem("trackademy_activities");
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error loading activities", e);
  }
  return defaultActivities;
}

export function saveStoredActivities(activities) {
  try {
    localStorage.setItem("trackademy_activities", JSON.stringify(activities));
  } catch (e) {
    console.error("Error saving activities", e);
  }
}
