import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Mentors from "./pages/Mentors";
import AddMentor from "./pages/AddMentor";
import Notices from "./pages/Notices";
import AddNotice from "./pages/AddNotice";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  function renderPage() {
    switch (activePage) {
      case "dashboard":    return <Dashboard />;
      case "students":     return <Students onNavigate={setActivePage} />;
      case "add-student":  return <AddStudent onNavigate={setActivePage} />;
      case "mentors":      return <Mentors onNavigate={setActivePage} />;
      case "add-mentor":   return <AddMentor onNavigate={setActivePage} />;
      case "notices":      return <Notices onNavigate={setActivePage} />;
      case "add-notice":   return <AddNotice onNavigate={setActivePage} />;
      case "activities":   return <Activities onNavigate={setActivePage} />;
      case "add-activity": return <AddActivity onNavigate={setActivePage} />;
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
