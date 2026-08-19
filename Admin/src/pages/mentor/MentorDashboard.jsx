import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Rocket,
  ArrowLeft,
  Sparkles,
  Clock,
  Users,
  CheckCircle2,
  TrendingUp,
  Star,
} from 'lucide-react';
import './MentorDashboard.css';
import MentorSidebar from '../../components/mentor/MentorSidebar';
import MentorNavbar from '../../components/mentor/MentorNavbar';
import MentorProfileCard from '../../components/mentor/MentorProfileCard';
import MentorStats from '../../components/mentor/MentorStats';
import MentorQuickActions from '../../components/mentor/MentorQuickActions';
import MentorCalendar from '../../components/mentor/MentorCalendar';
import MentorMenteeChart from '../../components/mentor/MentorMenteeChart';
import MentorProfilePage from '../../components/mentor/MentorProfilePage';
import MentorMentees from './MentorMentees';
import MentorMessages from './MentorMessages';
import MentorAttendance from './MentorAttendance';
import MentorResults from './MentorResults';
import MentorNotices from './MentorNotices';
import MentorActivities from './MentorActivities';
import MentorSupport from './MentorSupport';

const stats = [
  {
    key: 'mentees',
    label: 'Total Mentees',
    value: '25',
    note: 'Assigned students',
    icon: Users,
    cardClass: 'bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#7656f4]',
    valueClass: 'text-[#111827]',
    iconWrap: 'bg-[#F3EEFF] text-[#7656f4]',
    pageKey: 'mentees',
  },
  {
    key: 'attendance',
    label: 'Attendance Rate',
    value: '92%',
    note: 'Classes recorded',
    icon: CheckCircle2,
    cardClass: 'bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#22C55E]',
    valueClass: 'text-[#111827]',
    iconWrap: 'bg-[#EAFBF1] text-[#22C55E]',
    pageKey: 'attendance',
  },
  {
    key: 'results',
    label: 'Results Published',
    value: '18',
    note: 'Published results',
    icon: TrendingUp,
    cardClass: 'bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#F59E0B]',
    valueClass: 'text-[#111827]',
    iconWrap: 'bg-[#FFF5E8] text-[#F59E0B]',
    pageKey: 'results',
  },
  {
    key: 'credits',
    label: 'Credit Points Issued',
    value: '120',
    note: 'Total points issued',
    icon: Star,
    cardClass: 'bg-white text-slate-800 border border-slate-200 border-l-4 border-l-[#3B82F6]',
    valueClass: 'text-[#111827]',
    iconWrap: 'bg-[#EEF5FF] text-[#3B82F6]',
    pageKey: 'credit-points',
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

export default function MentorDashboard({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [startWithUpload, setStartWithUpload] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/mentor/mentees')) setActiveTab('mentees');
    else if (path.includes('/mentor/profile')) setActiveTab('profile');
    else if (path.includes('/mentor/messages')) setActiveTab('messages');
    else if (path.includes('/mentor/results')) setActiveTab('results');
    else if (path.includes('/mentor/attendances')) setActiveTab('attendance');
    else if (path.includes('/mentor/credit-points')) setActiveTab('credit-points');
    else if (path.includes('/mentor/notices')) setActiveTab('notices');
    else if (path.includes('/mentor/activities')) setActiveTab('activities');
    else if (path.includes('/mentor/settings')) setActiveTab('settings');
    else if (path.includes('/mentor/support')) setActiveTab('support');
    else setActiveTab('dashboard');
  }, [location.pathname]);

  const handleNavigate = (tab, isUpload = false) => {
    if (tab === 'logout') {
      if (onLogout) onLogout();
      navigate('/');
      return;
    }
    const mentorPathMap = {
      dashboard: '/mentor/dashboard',
      mentees: '/mentor/mentees',
      profile: '/mentor/profile',
      messages: '/mentor/messages',
      results: '/mentor/results',
      attendance: '/mentor/attendances',
      attendances: '/mentor/attendances',
      'credit-points': '/mentor/credit-points',
      notices: '/mentor/notices',
      activities: '/mentor/activities',
      settings: '/mentor/settings',
      support: '/mentor/support',
    };
    setActiveTab(tab);
    setStartWithUpload(Boolean(isUpload));
    setMobileSidebarOpen(false);
    navigate(mentorPathMap[tab] || '/mentor/dashboard');
  };

  function renderView() {
    if (activeTab !== 'dashboard') {
      if (activeTab === 'profile' || activeTab === 'settings') {
        return <MentorProfilePage />;
      }
      if (activeTab === 'mentees') {
        return <MentorMentees />;
      }
      if (activeTab === 'messages') {
        return <MentorMessages hideHeader={true} />;
      }
      if (activeTab === 'attendance') {
        return <MentorAttendance initialUpload={startWithUpload} />;
      }
      if (activeTab === 'results') {
        return <MentorResults initialUpload={startWithUpload} />;
      }
      if (activeTab === 'notices') {
        return <MentorNotices user={user} />;
      }
      if (activeTab === 'activities') {
        return <MentorActivities user={user} />;
      }
      if (activeTab === 'support') {
        return <MentorSupport onNavigate={handleNavigate} />;
      }
      const title = tabTitles[activeTab] || 'This Page';
      return (
        <MentorComingSoon
          title={title}
          onBack={() => handleNavigate('dashboard')}
        />
      );
    }

    return (
      <main className="space-y-2.5 p-2 sm:px-5 sm:py-2.5">
        {/* Top Section: Mentor Profile Hero Card */}
        <section className="w-full">
          <MentorProfileCard />
        </section>

        {/* Stats Section: 4 Stat Cards */}
        <section>
          <MentorStats items={stats} onNavigate={handleNavigate} />
        </section>

        {/* Bottom 3 Columns: Total Mentees, Quick Actions, Real-time Calendar */}
        <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr]">
          <MentorMenteeChart onNavigate={handleNavigate} />
          <MentorQuickActions onNavigate={handleNavigate} />
          <MentorCalendar />
        </section>
      </main>
    );
  }

  return (
    <div className="relative flex h-full w-full bg-[#EEF2F6] overflow-hidden min-h-screen">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Mentor Sidebar */}
      <MentorSidebar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        onLogout={onLogout}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MentorNavbar
          activeTab={activeTab}
          user={user}
          onSelectTab={handleNavigate}
          onLogout={onLogout}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />
        <div className="flex-1 overflow-y-auto min-w-0 bg-[#EEF2F6]">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
