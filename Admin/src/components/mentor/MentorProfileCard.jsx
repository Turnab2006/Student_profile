import { Check, CreditCard, Phone, Mail } from 'lucide-react';

export default function MentorProfileCard() {
  return (
    <article className="mentor-profile-card">
      <div className="mentor-profile-bg-pattern">
        <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mentor-dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="rgba(255, 255, 255, 0.25)" />
            </pattern>
          </defs>
          <polygon points="160,0 320,0 320,160" fill="rgba(255, 255, 255, 0.08)" />
          <polygon points="210,0 320,0 320,110" fill="rgba(255, 255, 255, 0.06)" />
          <polygon points="120,180 320,40 320,180" fill="rgba(255, 255, 255, 0.05)" />
          <rect x="220" y="20" width="80" height="130" fill="url(#mentor-dot-pattern)" />
        </svg>
      </div>

      <div className="mentor-profile-photo-block">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80"
          alt="Kaushik Chatterjee"
          className="mentor-profile-photo"
        />
      </div>

      <div className="mentor-profile-content">
        <div className="mentor-profile-heading">
          <h2>Kaushik Chatterjee</h2>
          <span className="mentor-verified-badge" title="Verified Mentor">
            <span className="mentor-verified-icon">
              <Check size={12} strokeWidth={3} />
            </span>
          </span>
        </div>

        <p className="mentor-profile-dept">Computer Science &amp; Engineering</p>

        <div className="mentor-profile-meta">
          <div className="mentor-meta-pill">
            <CreditCard size={15} />
            <span>EPM202001</span>
          </div>
          <div className="mentor-meta-pill">
            <Phone size={15} />
            <span>+91 9163926383</span>
          </div>
          <div className="mentor-meta-pill">
            <Mail size={15} />
            <span>kaushikchatterjee123@gmail.com</span>
          </div>
        </div>
      </div>
    </article>
  );
}
