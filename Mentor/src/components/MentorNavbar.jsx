import { FiBell, FiChevronDown } from 'react-icons/fi';

export default function MentorNavbar() {
  return (
    <header className="mentor-navbar">
      <div className="mentor-navbar-copy">
        <h1>Welcome back, Kaushik! 👋</h1>
        <p>Here's what's happening with your mentoring program.</p>
      </div>

      <div className="mentor-navbar-actions">
        <button type="button" className="mentor-icon-btn" aria-label="Notifications">
          <FiBell />
          <span className="mentor-badge">3</span>
        </button>

        <div className="mentor-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
            alt="Mentor profile"
            className="mentor-navbar-avatar"
          />
          <FiChevronDown className="mentor-chevron" />
        </div>
      </div>
    </header>
  );
}
