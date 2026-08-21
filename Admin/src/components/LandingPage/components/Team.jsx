import React from 'react';
import '../styles/team.css';
import Turnab from '../assets/Turnab.svg';
import Srija from '../assets/Srija.svg';
import Tuhina from '../assets/Tuhina.svg';
import SohamDa from '../assets/SohamDa.svg';

const DEFAULT_MEMBERS = [
    {
        name: "Turnab Roy",
        title: "Frontend Developer",
        summary: "Building responsive and user-friendly web applications with modern frontend technologies.",
        avatarUrl: Turnab,
        socials: [
            { platform: "github", href: "https://github.com/Turnab2006" },
            { platform: "linkedin", href: "https://www.linkedin.com/in/turnab-roy-3963aa327" },
        ]
    },
    {
        name: "Srija Banerjee",
        title: "Frontend Developer",
        summary: "Transforming designs into fast, responsive, and accessible web applications.",
        avatarUrl: Srija,
        socials: [
            { platform: "github", href: "https://github.com/Srija2006-star" },
            { platform: "linkedin", href: "https://www.linkedin.com/in/srija-banerjee-7793a8327/" },
        ]
    },
    {
        name: "Tuhina Banerjee",
        title: "UI/UX Designer & Frontend Developer",
        summary: "Designing intuitive user experiences and developing responsive web interfaces.",
        avatarUrl: Tuhina,
        socials: [
            { platform: "github", href: "https://github.com/Tuhinaa13" },
            { platform: "linkedin", href: "https://www.linkedin.com/in/tuhina-banerjee-355676321/" },
        ]
    },
    {
        name: "Soham Dey",
        title: "Full Stack Developer",
        summary: "Developing scalable web applications by integrating efficient frontend and backend solutions.",
        avatarUrl: SohamDa,
        socials: [
            { platform: "github", href: "https://github.com/sohamdey07" },
            { platform: "linkedin", href: "https://www.linkedin.com/in/soham-kumar-dey/" },
        ]
    }
];

const renderSocialIcon = (platform) => {
    switch (platform) {
        case "github":
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.162 19.486c.5.092.682-.217.682-.483v-1.69c-2.776.604-3.362-1.192-3.362-1.192-.455-1.156-1.11-1.465-1.11-1.465-.907-.62.069-.607.069-.607 1.003.07 1.53 1.03 1.53 1.03.89 1.525 2.335 1.085 2.904.83.09-.644.35-1.085.636-1.335-2.22-.252-4.556-1.11-4.556-4.94 0-1.09.39-1.982 1.029-2.68-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025a9.52 9.52 0 0 1 5 0c1.91-1.295 2.75-1.025 2.75-1.025.544 1.377.2 2.394.098 2.647.64.698 1.029 1.59 1.029 2.68 0 3.84-2.34 4.686-4.566 4.933.359.31.678.92.678 1.855v2.749c0 .268.18.579.688.48A10 10 0 0 0 12 2Z" />
                </svg>
            );
        case "linkedin":
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            );
        default:
            return null;
    }
};

export default function Team({ members = DEFAULT_MEMBERS }) {
    return (
        <section className="team-section" id="team">
            <div className="team-container">
                <div className="team-header">
                    <h2 className="team-title">Meet our team</h2>
                    <p className="team-subtitle">
                        Our mission is to simplify student management through technology, creating a seamless platform that connects students, mentors, and administrators while fostering academic growth and collaboration.
                    </p>
                </div>

                <div className="team-grid">
                    {members.map((item) => (
                        <div key={item.name} className="team-card">
                            <div className="team-avatar-container">
                                <img src={item.avatarUrl} alt={item.name} className="team-avatar" />
                            </div>
                            <h3 className="team-member-name">{item.name}</h3>
                            <p className="team-member-role">{item.title}</p>
                            <p className="team-member-bio">{item.summary}</p>
                            <div className="team-socials">
                                {item.socials.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="team-social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${item.name} ${social.platform}`}
                                    >
                                        {renderSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
