import './MentorDashboard.css';
import MentorSidebar from '../components/MentorSidebar';
import MentorNavbar from '../components/MentorNavbar';
import MentorProfileCard from '../components/MentorProfileCard';
import MentorStats from '../components/MentorStats';
import MentorQuickActions from '../components/MentorQuickActions';
import MentorCalendar from '../components/MentorCalendar';
import MentorMenteeChart from '../components/MentorMenteeChart';

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

export default function MentorDashboard() {
  return (
    <div className="mentor-dashboard-shell">
      <MentorSidebar />

      <main className="mentor-dashboard-main">
        <MentorNavbar />
        <div className="mentor-dashboard-content">
          <section className="mentor-grid mentor-profile-row">
            <MentorProfileCard />
          </section>

          <section className="mentor-stats-wrap mentor-stats-section">
            <MentorStats items={stats} />
          </section>

          <section className="mentor-grid mentor-lower-grid mentor-bottom-row">
            <MentorMenteeChart />
            <MentorQuickActions />
            <MentorCalendar />
          </section>
        </div>
      </main>
    </div>
  );
}
