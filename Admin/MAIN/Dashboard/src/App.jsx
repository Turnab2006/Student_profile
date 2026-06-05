import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";
import MentorsPage from "./pages/MentorsPage";
import AddMentorPage from "./pages/AddMentorPage";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  function renderPage() {
    switch (activePage) {
      case "dashboard":   return <DashboardPage />;
      case "students":    return <StudentsPage onNavigate={setActivePage} />;
      case "add-student": return <AddStudentPage onNavigate={setActivePage} />;
      case "mentors":     return <MentorsPage onNavigate={setActivePage} />;
      case "add-mentor":  return <AddMentorPage onNavigate={setActivePage} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Page coming soon
          </div>
        );
    }
  }

  return (
    <div className="flex h-full w-full bg-gray-50 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
}
