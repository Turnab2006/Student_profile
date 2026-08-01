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
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Semesters from "./pages/Semesters";
import "./index.css";

export default function App() {
  const [activePage, setActivePage] = useState("settings");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
      case "semesters":    return <Semesters onNavigate={setActivePage} />;
      case "settings":     return <Settings onNavigate={setActivePage} />;
      case "support":      return <Support onNavigate={setActivePage} />;
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
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg lg:hidden"
        aria-label="Open navigation"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      </button>

      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
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
