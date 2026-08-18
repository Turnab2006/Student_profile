import { useState, useEffect } from "react";

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
import Semesters from "./pages/admin/Semesters";
import Subjects from "./pages/admin/Subjects";
import AddSubject from "./pages/admin/AddSubject";
import Attendances from "./pages/admin/Attendances";

// Mentor Site
import MentorDashboard from "./pages/mentor/MentorDashboard";

// Student Site
import StudentDashboard from "./pages/student/StudentDashboard";

import "./index.css";

export default function App() {
  // Navigation state: 'landing' | 'login' | 'admin' | 'mentor' | 'student'
  const [currentView, setCurrentView] = useState("landing");
  const [loginRole, setLoginRole] = useState("mentor");

  // Admin internal page state
  const [adminActivePage, setAdminActivePage] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    function handleGlobalNav(e) {
      if (e.detail) {
        if (e.detail === "logout") {
          handleLogout();
        } else {
          setAdminActivePage(e.detail);
        }
      }
    }
    function handleToggleSidebar() {
      setMobileSidebarOpen((prev) => !prev);
    }
    window.addEventListener("app-navigate", handleGlobalNav);
    window.addEventListener("toggle-mobile-sidebar", handleToggleSidebar);
    return () => {
      window.removeEventListener("app-navigate", handleGlobalNav);
      window.removeEventListener("toggle-mobile-sidebar", handleToggleSidebar);
    };
  }, []);

  function handleNavigateToLogin(targetView = 'login', initialRole = 'mentor') {
    if (targetView === 'login') {
      setLoginRole(initialRole);
      setCurrentView('login');
    } else {
      setCurrentView(targetView);
    }
  }

  function handleLoginSuccess(selectedRole) {
    if (selectedRole === 'admin') {
      setCurrentView('admin');
      setAdminActivePage('dashboard');
    } else if (selectedRole === 'mentor') {
      setCurrentView('mentor');
    } else if (selectedRole === 'student') {
      setCurrentView('student');
    }
  }

  function handleLogout() {
    setCurrentView('landing');
  }

  function handleAdminNavigate(page) {
    if (page === "logout") {
      handleLogout();
    } else {
      setAdminActivePage(page);
    }
  }

  // Render Admin Site Pages
  function renderAdminPage() {
    const handleOpenSidebar = () => setMobileSidebarOpen(true);
    switch (adminActivePage) {
      case "dashboard":       return <Dashboard onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "students":        return <Students onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "student-profile": return <StudentProfile onBack={() => setAdminActivePage("students")} userRole="admin" />;
      case "add-student":     return <AddStudent onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "mentors":         return <Mentors onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
      case "mentor-details":  return <MentorDetails mentor={adminActivePage?.mentor} onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
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
      default:
        return <Dashboard onNavigate={handleAdminNavigate} onOpenSidebar={handleOpenSidebar} />;
    }
  }

  // 1. PUBLIC LANDING PAGE
  if (currentView === "landing") {
    return <LandingPage onNavigateLogin={handleNavigateToLogin} />;
  }

  // 2. UNIFIED LOGIN PAGE
  if (currentView === "login") {
    return (
      <LoginPage
        initialRole={loginRole}
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setCurrentView("landing")}
      />
    );
  }

  // 3. SITE 1: ADMIN SITE
  if (currentView === "admin") {
    return (
      <div className="relative flex h-full w-full bg-gray-50 overflow-hidden min-h-screen">
        {mobileSidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
          />
        ) : null}

        <Sidebar
          activePage={adminActivePage}
          onNavigate={(page) => {
            if (page === "logout") {
              handleLogout();
            } else {
              setAdminActivePage(page);
              setMobileSidebarOpen(false);
            }
          }}
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {renderAdminPage()}
        </div>
      </div>
    );
  }

  // 4. SITE 2: MENTOR SITE
  if (currentView === "mentor") {
    return <MentorDashboard onLogout={handleLogout} />;
  }

  // 5. SITE 3: STUDENT SITE
  if (currentView === "student") {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  return <LandingPage onNavigateLogin={handleNavigateToLogin} />;
}
