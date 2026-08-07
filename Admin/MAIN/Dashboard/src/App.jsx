import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import "./index.css";

const pages = {
  dashboard: <Dashboard />,
  students:  <Students />,
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-full w-full bg-gray-50 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      {pages[activePage] ?? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Page coming soon
        </div>
      )}
    </div>
  );
}

export default App;
