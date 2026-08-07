import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Mentors from "./pages/Mentors";
import MentorDetails from "./pages/MentorDetails";
import AddMentor from "./pages/AddMentor";
import Notices from "./pages/Notices";
import AddNotice from "./pages/AddNotice";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Semesters from "./pages/Semesters";
import Subjects from "./pages/Subjects";
import AddSubject from "./pages/AddSubject";
import Attendances from "./pages/Attendances";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    function handleGlobalNav(e) {
      if (e.detail) {
        setActivePage(e.detail);
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

  function renderPage() {
    const handleOpenSidebar = () => setMobileSidebarOpen(true);
    switch (activePage) {
      case "dashboard":    return <Dashboard onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "students":     return <Students onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "add-student":  return <AddStudent onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "mentors":      return <Mentors onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "mentor-details": return <MentorDetails mentor={activePage?.mentor} onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "add-mentor":   return <AddMentor onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "notices":      return <Notices onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "add-notice":   return <AddNotice onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "activities":   return <Activities onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "add-activity": return <AddActivity onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "semesters":    return <Semesters onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "subjects":     return <Subjects onNavigate={setActivePage} subjectsList={subjectsList} setSubjectsList={setSubjectsList} onOpenSidebar={handleOpenSidebar} />;
      case "add-subject":  return <AddSubject onNavigate={setActivePage} subjectsList={subjectsList} setSubjectsList={setSubjectsList} onOpenSidebar={handleOpenSidebar} />;
      case "attendances":  return <Attendances onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "settings":     return <Settings onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      case "support":      return <Support onNavigate={setActivePage} onOpenSidebar={handleOpenSidebar} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Page coming soon
          </div>
        );
    }
  }

  return (
    <div className="relative flex h-full w-full bg-gray-50 overflow-hidden">
      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      ) : null}

      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setMobileSidebarOpen(false);
        }}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      {renderPage()}
    </div>
  );
}
