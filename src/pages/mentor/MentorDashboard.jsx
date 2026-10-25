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
import MentorCreditPoints from './MentorCreditPoints';
import MentorNotices from './MentorNotices';
import MentorActivities from './MentorActivities';
import MentorSupport from './MentorSupport';
import MentorSettings from './MentorSettings';
import StudentProfile from '../student/StudentProfile';
import { initialStudentData } from '../../data/studentProfileData';
import { MENTOR_DETAILS, getMentorDashboardStats } from '../../data/mentorData';
import { STUDENTS_DATA } from '../../data/studentsData';

const stats = getMentorDashboardStats(STUDENTS_DATA);

const tabTitles = {
  mentees: 'Mentees Portal',
  'student-profile': 'Student Profile',
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
  const [selectedStudent, setSelectedStudent] = useState(location.state?.mentee || null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/mentor/mentees/profile') || path.includes('/mentor/student-profile') || path.includes('/mentor/students/profile')) {
      setActiveTab('student-profile');
    }
    else if (path.includes('/mentor/mentees')) setActiveTab('mentees');
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

  const handleNavigate = (tab, isUpload = false, menteeData = null) => {
    if (tab === 'logout') {
      if (onLogout) onLogout();
      navigate('/');
      return;
    }
    const mentorPathMap = {
      dashboard: '/mentor/dashboard',
      mentees: '/mentor/mentees',
      'student-profile': '/mentor/mentees/profile',
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
    if (menteeData) {
      setSelectedStudent(menteeData);
    }
    setActiveTab(tab);
    setStartWithUpload(Boolean(isUpload));
    setMobileSidebarOpen(false);
    navigate(mentorPathMap[tab] || '/mentor/dashboard', { state: menteeData ? { mentee: menteeData } : undefined });
  };

  function renderView() {
    if (activeTab !== 'dashboard') {
      if (activeTab === 'profile') {
        return (
          <div className="p-2 sm:px-5 sm:py-2.5 pb-10">
            <MentorProfilePage mentorData={user || MENTOR_DETAILS} />
          </div>
        );
      }
      if (activeTab === 'mentees') {
        return <MentorMentees onNavigate={handleNavigate} />;
      }
      if (activeTab === 'messages') {
        return <MentorMessages hideHeader={true} />;
      }
      if (activeTab === 'attendance') {
        return (
          <div className="p-2 sm:px-5 sm:py-2.5 pb-10">
            <MentorAttendance initialUpload={startWithUpload} />
          </div>
        );
      }
      if (activeTab === 'results') {
        return (
          <div className="p-2 sm:px-5 sm:py-2.5 pb-10">
            <MentorResults initialUpload={startWithUpload} />
          </div>
        );
      }
      if (activeTab === 'credit-points') {
        return <MentorCreditPoints onNavigate={handleNavigate} />;
      }
      if (activeTab === 'notices') {
        return <MentorNotices user={user} onNavigate={handleNavigate} />;
      }
      if (activeTab === 'activities') {
        return <MentorActivities user={user} />;
      }
      if (activeTab === 'support') {
        return <MentorSupport onNavigate={handleNavigate} />;
      }
      if (activeTab === 'settings') {
        return <MentorSettings onNavigate={handleNavigate} />;
      }
      const title = tabTitles[activeTab] || 'This Page';
      return (
        <div className="p-2 sm:px-5 sm:py-2.5 pb-10">
          <MentorComingSoon
            title={title}
            onBack={() => handleNavigate('dashboard')}
          />
        </div>
      );
    }

    return (
      <main className="space-y-2.5 p-2 sm:px-5 sm:py-2.5">
        {/* Top Section: Mentor Profile Hero Card */}
        <section className="w-full">
          <MentorProfileCard mentor={user || MENTOR_DETAILS} />
        </section>

        {/* Stats Section: 4 Stat Cards */}
        <section>
          <MentorStats items={stats} onNavigate={handleNavigate} />
        </section>

        {/* Bottom 3 Columns: Total Mentees, Quick Actions, Real-time Calendar */}
        <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr]">
          <MentorMenteeChart onNavigate={handleNavigate} mentees={STUDENTS_DATA} />
          <MentorQuickActions onNavigate={handleNavigate} />
          <MentorCalendar />
        </section>
      </main>
    );
  }

  if (activeTab === 'student-profile') {
    const studentToDisplay = selectedStudent
      ? {
          ...initialStudentData,
          name: selectedStudent.name || initialStudentData.name,
          rollNo: selectedStudent.rollNo || initialStudentData.rollNo,
          department: selectedStudent.department || initialStudentData.department,
          phone: selectedStudent.phone || initialStudentData.phone,
          email: selectedStudent.studentEmail || selectedStudent.email || initialStudentData.email,
          avatar: selectedStudent.avatar || initialStudentData.avatar,
          academicDetails: {
            ...initialStudentData.academicDetails,
            collegeRollNo: selectedStudent.rollNo || initialStudentData.academicDetails?.collegeRollNo,
            universityRollNo: `RTU/2024/${selectedStudent.rollNo?.slice(0, 3) || 'CS'}/` + (selectedStudent.rollNo?.replace(/\D/g, '') || '12345'),
            attendanceOverall: selectedStudent.attendance || initialStudentData.academicDetails?.attendanceOverall || '95.0%',
          },
          additionalDetails: {
            ...initialStudentData.additionalDetails,
            personalEmail: selectedStudent.studentEmail || selectedStudent.email || initialStudentData.additionalDetails?.personalEmail,
            phoneNumber: selectedStudent.phone || initialStudentData.additionalDetails?.phoneNumber,
            collegeEmail: selectedStudent.studentEmail || initialStudentData.additionalDetails?.collegeEmail,
          },
          mentorDetails: {
            ...initialStudentData.mentorDetails,
            name: user?.name || 'Kaushik Chatterjee',
            email: selectedStudent.mentorEmail || user?.email || 'kaushik.c@trackademy.edu',
          },
          attendanceDetails: {
            ...initialStudentData.attendanceDetails,
            overallPercentage: selectedStudent.attendance ? parseFloat(selectedStudent.attendance) : (initialStudentData.attendanceDetails?.overallPercentage || 95.0),
          }
        }
      : initialStudentData;

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

        {/* Right Content Pane for Student Profile */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <StudentProfile
            studentData={studentToDisplay}
            onBack={() => handleNavigate('mentees')}
            userRole="mentor"
            user={user}
            onNavigate={handleNavigate}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            onLogout={onLogout}
          />
        </div>
      </div>
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
