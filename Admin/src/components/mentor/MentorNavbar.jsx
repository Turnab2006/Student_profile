import { Bell, ChevronDown } from 'lucide-react';

export default function MentorNavbar({ onSelectTab }) {
  return (
    <header className="mentor-navbar">
      <div className="mentor-navbar-copy">
        <h1>Welcome back, Kaushik! 👋</h1>
        <p>Here's what's happening with your mentoring program.</p>
      </div>

      <div className="mentor-navbar-actions">
        <button
          type="button"
          className="mentor-bell-btn"
          aria-label="Notifications"
          onClick={() => onSelectTab && onSelectTab('notices')}
        >
          <Bell size={25} className="mentor-bell-icon" />
          <span className="mentor-bell-badge">3</span>
        </button>

        <div
          className="mentor-profile-trigger"
          onClick={() => onSelectTab && onSelectTab('profile')}
        >
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80"
            alt="Mentor profile"
            className="mentor-navbar-avatar"
          />
          <ChevronDown size={19} className="mentor-navbar-chevron" />
        </div>
      </div>
    </header>
  );
}
