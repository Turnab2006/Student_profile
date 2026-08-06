import { FiAward, FiMail, FiPhone, FiUser } from 'react-icons/fi';

export default function MentorProfileCard() {
  return (
    <article className="mentor-profile-card">
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
          <span className="mentor-verified-badge">
            <FiAward /> Verified
          </span>
        </div>

        <p className="mentor-profile-dept">Computer Science &amp; Engineering</p>

        <div className="mentor-profile-meta">
          <div className="mentor-meta-pill">
            <FiUser />
            <span>EPM202001</span>
          </div>
          <div className="mentor-meta-pill">
            <FiPhone />
            <span>+91 9163926383</span>
          </div>
          <div className="mentor-meta-pill">
            <FiMail />
            <span>kaushikchatterjee123@gmail.com</span>
          </div>
        </div>
      </div>
    </article>
  );
}
