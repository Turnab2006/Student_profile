import { Check, CreditCard, PhoneCall, Mail } from 'lucide-react';

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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C11.3 2 10.6 2.3 10.1 2.8L9.1 3.8C8.7 4.2 8.1 4.4 7.5 4.3L6.1 4.1C5.1 4 4 5.1 4.1 6.1L4.3 7.5C4.4 8.1 4.2 8.7 3.8 9.1L2.8 10.1C2.3 10.6 2 11.3 2 12C2 12.7 2.3 13.4 2.8 13.9L3.8 14.9C4.2 15.3 4.4 15.9 4.3 16.5L4.1 17.9C4 18.9 5.1 20 6.1 19.9L7.5 19.7C8.1 19.6 8.7 19.8 9.1 20.2L10.1 21.2C10.6 21.7 11.3 22 12 22C12.7 22 13.4 21.7 13.9 21.2L14.9 20.2C15.3 19.8 15.9 19.6 16.5 19.7L17.9 19.9C18.9 20 20 18.9 19.9 17.9L19.7 16.5C19.6 15.9 19.8 15.3 20.2 14.9L21.2 13.9C21.7 13.4 22 12.7 22 12C22 11.3 21.7 10.6 21.2 10.1L20.2 9.1C19.8 8.7 19.6 8.1 19.7 7.5L19.9 6.1C20 5.1 18.9 4 17.9 4.1L16.5 4.3C15.9 4.4 15.3 4.2 14.9 3.8L13.9 2.8C13.4 2.3 12.7 2 12 2Z"
                fill="#ffffff"
              />
              <polyline
                points="16.5 8.5 10.5 14.5 7.5 11.5"
                stroke="var(--mentor-primary)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="mentor-profile-dept">Computer Science &amp; Engineering</p>

        <div className="mentor-profile-meta">
          <div className="mentor-meta-pill">
            <CreditCard size={15} />
            <span>EPM202001</span>
          </div>
          <div className="mentor-meta-pill">
            <PhoneCall size={15} />
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
