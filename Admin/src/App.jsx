import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

// Landing & Auth
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";

// Admin Site
import Sidebar from "./components/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import AddStudent from "./pages/admin/AddStudent";
import StudentProfile from "./pages/student/StudentProfile";
import Mentors from "./pages/admin/Mentors";
import MentorDetails from "./pages/admin/MentorDetails";
import AddMentor from "./pages/admin/AddMentor";
import Notices from "./pages/admin/Notices";
import AddNotice from "./pages/admin/AddNotice";
import Activities from "./pages/admin/Activities";
import AddActivity from "./pages/admin/AddActivity";
import Settings from "./pages/admin/Settings";
import Support from "./pages/admin/Support";
import TicketHistory from "./pages/admin/TicketHistory";
import Semesters from "./pages/admin/Semesters";
import Subjects from "./pages/admin/Subjects";
import AddSubject from "./pages/admin/AddSubject";
import Attendances from "./pages/admin/Attendances";

// Mentor Site
import MentorDashboard from "./pages/mentor/MentorDashboard";

// Student Site
import StudentDashboard from "./pages/student/StudentDashboard";

import "./index.css";

function AdminLayout({ subjectsList, setSubjectsList, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const adminPathMap = {
    dashboard: "/admin/dashboard",
    students: "/admin/students",
    "student-profile": "/admin/students/profile",
    "add-student": "/admin/students/add",
    mentors: "/admin/mentors",
    "mentor-details": "/admin/mentors/detail",
    "add-mentor": "/admin/mentors/add",
    semesters: "/admin/semesters",
    subjects: "/admin/subjects",
    "add-subject": "/admin/subjects/add",
    attendances: "/admin/attendances",
    activities: "/admin/activities",
    "add-activity": "/admin/activities/add",
    notices: "/admin/notices",
    "add-notice": "/admin/notices/add",
    settings: "/admin/settings",
    support: "/admin/support",
    "ticket-history": "/admin/support/history",
  };

  const getActivePageFromPath = (path) => {
    if (path.includes("/admin/students/add")) return "add-student";
    if (path.includes("/admin/students/profile")) return "student-profile";
    if (path.includes("/admin/students")) return "students";
    if (path.includes("/admin/mentors/add")) return "add-mentor";
    if (path.includes("/admin/mentors/detail")) return "mentor-details";
    if (path.includes("/admin/mentors")) return "mentors";
    if (path.includes("/admin/semesters")) return "semesters";
    if (path.includes("/admin/subjects/add")) return "add-subject";
    if (path.includes("/admin/subjects")) return "subjects";
    if (path.includes("/admin/attendances")) return "attendances";
    if (path.includes("/admin/activities/add")) return "add-activity";
    if (path.includes("/admin/activities")) return "activities";
    if (path.includes("/admin/notices/add")) return "add-notice";
    if (path.includes("/admin/notices")) return "notices";
    if (path.includes("/admin/settings")) return "settings";
    if (path.includes("/admin/support/history")) return "ticket-history";
    if (path.includes("/admin/support")) return "support";
    return "dashboard";
  };

  const adminActivePage = getActivePageFromPath(location.pathname);

  const handleAdminNavigate = (page) => {
    if (page === "logout") {
      onLogout();
      return;
    }
    const target = adminPathMap[page] || "/admin/dashboard";
    navigate(target);
    setMobileSidebarOpen(false);
  };

  const handleOpenSidebar = () => setMobileSidebarOpen(true);

  function renderAdminPage() {
    switch (adminActivePage) {
      case "dashboard":       return <Dashboard onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "students":        return <Students onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "student-profile": return <StudentProfile onBack={() => navigate("/admin/students")} userRole="admin" onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "add-student":     return <AddStudent onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "mentors":         return <Mentors onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "mentor-details":  return <MentorDetails onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "add-mentor":      return <AddMentor onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "notices":         return <Notices onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "add-notice":      return <AddNotice onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "activities":      return <Activities onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "add-activity":    return <AddActivity onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "semesters":       return <Semesters onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "subjects":        return <Subjects onNavigate={handleAdminNavigate} subjectsList={subjectsList} setSubjectsList={setSubjectsList} onOpenSidebar={handleOpenSidebar} />;
      case "add-subject":     return <AddSubject onNavigate={handleAdminNavigate} subjectsList={subjectsList} setSubjectsList={setSubjectsList} onOpenSidebar={handleOpenSidebar} />;
      case "attendances":     return <Attendances onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "settings":        return <Settings onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "support":         return <Support onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "ticket-history":  return <TicketHistory onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      default:
        return <Dashboard onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
    }
  }

  return (
    <div className="relative flex h-full w-full bg-gray-50 overflow-hidden min-h-screen">
      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden cursor-pointer"
        />
      ) : null}
      <Sidebar
        activePage={adminActivePage}
        onNavigate={handleAdminNavigate}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {renderAdminPage()}
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("trackademy_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    function handleGlobalNav(e) {
      if (e.detail) {
        if (e.detail === "logout") {
          navigate("/");
        } else {
          const pathMap = {
            dashboard: "/admin/dashboard",
            students: "/admin/students",
            "student-profile": "/admin/students/profile",
            "add-student": "/admin/students/add",
            mentors: "/admin/mentors",
            "mentor-details": "/admin/mentors/detail",
            "add-mentor": "/admin/mentors/add",
            semesters: "/admin/semesters",
            subjects: "/admin/subjects",
            "add-subject": "/admin/subjects/add",
            attendances: "/admin/attendances",
            activities: "/admin/activities",
            "add-activity": "/admin/activities/add",
            notices: "/admin/notices",
            "add-notice": "/admin/notices/add",
            settings: "/admin/settings",
            support: "/admin/support",
            "ticket-history": "/admin/support/history",
          };
          if (pathMap[e.detail]) {
            navigate(pathMap[e.detail]);
          }
        }
      }
    }
    window.addEventListener("app-navigate", handleGlobalNav);
    return () => window.removeEventListener("app-navigate", handleGlobalNav);
  }, [navigate]);

  return (
    <Routes>
      {/* 1. Public Landing Page Route: "/" */}
      <Route
        path="/"
        element={
          <LandingPage
            onNavigateLogin={(targetView, initialRole = "mentor") => {
              if (targetView === "login") {
                navigate(`/login?role=${initialRole}`);
              } else if (targetView === "admin") {
                navigate("/admin/dashboard");
              } else if (targetView === "mentor") {
                navigate("/mentor/dashboard");
              } else if (targetView === "student") {
                navigate("/student/dashboard");
              } else {
                navigate(`/${targetView}`);
              }
            }}
          />
        }
      />

      {/* 2. Unified Login Page Route: "/login" */}
      <Route
        path="/login"
        element={
          <LoginPage
            initialRole={new URLSearchParams(location.search).get("role") || "mentor"}
            onLoginSuccess={(selectedRole) => {
              if (selectedRole === "admin") navigate("/admin/dashboard");
              else if (selectedRole === "mentor") navigate("/mentor/dashboard");
              else if (selectedRole === "student") navigate("/student/dashboard");
            }}
            onBackToLanding={() => navigate("/")}
          />
        }
      />

      {/* Role specific direct base routes */}
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/mentor" element={<Navigate to="/mentor/dashboard" replace />} />

      {/* 3. Student Portal & Sub-Routes */}
      <Route path="/student/*" element={<StudentDashboard onLogout={() => navigate("/")} />} />

      {/* 4. Mentor Portal & Sub-Routes */}
      <Route path="/mentor/*" element={<MentorDashboard onLogout={() => navigate("/")} />} />

      {/* 5. Admin Portal & Sub-Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminLayout
            subjectsList={subjectsList}
            setSubjectsList={setSubjectsList}
            onLogout={() => navigate("/")}
          />
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
