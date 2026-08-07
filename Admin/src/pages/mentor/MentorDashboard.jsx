import { useState } from 'react';
import { Rocket, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import './MentorDashboard.css';
import MentorSidebar from '../../components/mentor/MentorSidebar';
import MentorNavbar from '../../components/mentor/MentorNavbar';
import MentorProfileCard from '../../components/mentor/MentorProfileCard';
import MentorStats from '../../components/mentor/MentorStats';
import MentorQuickActions from '../../components/mentor/MentorQuickActions';
import MentorCalendar from '../../components/mentor/MentorCalendar';
import MentorMenteeChart from '../../components/mentor/MentorMenteeChart';

const stats = [
  {
    title: 'Total Mentees',
    value: '25',
    icon: 'users',
    accent: 'purple',
  },
  {
    title: 'Attendance Rate',
    value: '92%',
    icon: 'check',
    accent: 'green',
  },
  {
    title: 'Results Published',
    value: '18',
    icon: 'trend',
    accent: 'orange',
  },
  {
    title: 'Credit Points Issued',
    value: '120',
    icon: 'star',
    accent: 'blue',
  },
];

const tabTitles = {
  mentees: 'Mentees Portal',
  profile: 'Mentor Profile',
  messages: 'Messages & Chat',
  results: 'Student Results',
  attendance: 'Attendance Management',
  'credit-points': 'Credit Points',
  notices: 'Notices & Announcements',
  activities: 'Activity Logs',
  settings: 'Portal Settings',
  support: 'Help & Support',
};

function MentorComingSoon({ title, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[62vh] text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm my-4">
      <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-200 text-[#0da651] flex items-center justify-center mb-5 shadow-inner">
        <Rocket size={36} className="animate-bounce" />
      </div>
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0da651] border border-emerald-200/80 mb-3">
        <Sparkles size={13} />
        <span>FEATURE IN DEVELOPMENT</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
        {title} <span className="text-[#0da651]">Coming Soon</span>
      </h2>
      <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
        We are building a seamless and powerful interface for this module. This feature will be live in our upcoming release!
      </p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0da651] text-white text-sm font-bold hover:bg-green-600 active:scale-95 transition-all shadow-md cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
    </div>
  );
}

export default function MentorDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  function renderView() {
    if (activeTab !== 'dashboard') {
      const title = tabTitles[activeTab] || 'This Page';
      return (
        <MentorComingSoon
          title={title}
          onBack={() => setActiveTab('dashboard')}
        />
      );
    }

    return (
      <>
        <section className="mentor-grid mentor-profile-row">
          <MentorProfileCard />
        </section>

        <section className="mentor-stats-wrap mentor-stats-section">
          <MentorStats items={stats} />
        </section>

        <section className="mentor-grid mentor-lower-grid mentor-bottom-row">
          <MentorMenteeChart onNavigate={setActiveTab} />
          <MentorQuickActions onNavigate={setActiveTab} />
          <MentorCalendar />
        </section>
      </>
    );
  }

  return (
    <div className="mentor-dashboard-shell">
      <MentorSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="mentor-dashboard-main">
        <MentorNavbar onSelectTab={setActiveTab} onLogout={onLogout} />
        <div className="mentor-dashboard-content">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
