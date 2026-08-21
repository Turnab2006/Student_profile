import React from 'react';
import '../styles/feature.css';

export default function Feature() {
    return (
        <section className="feature-section" id="features">
            <div className="feature-container">
                <div className="feature-header">
                    <div className="feature-label-badge">
                        <span className="feature-label">Features</span>
                    </div>
                    <h2 className="feature-title">Everything You Need, All in One Place</h2>
                    <p className="feature-subtitle">
                        Powerful tools designed to simplify the educational journey and drive better student outcomes through intuitive design.
                    </p>
                </div>

                <div className="feature-grid">
                    {/* Card 1: Grades & Feedback */}
                    <div className="feature-card">
                        <div className="feature-card__icon-slot"> 
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="5" width="30" height="34" rx="4" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M29 5v8a3 3 0 0 0 3 3h5" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M14 20l3 3 6-7" stroke="#1D5FA7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 29l3 3 6-7" stroke="#1D5FA7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M26 21h8M26 30h6" stroke="#7FB3E8" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Grades & Feedback</h3>
                        <p className="feature-card__description">Track academic performance and provide meaningful feedback to students</p>
                    </div>

                    {/* Card 2: Profile Management */}
                    <div className="feature-card feature-card--border-left">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="23" cy="23" r="18" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <circle cx="23" cy="18" r="6" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M12 36c2-8 6-12 11-12s9 4 11 12" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Profile Management</h3>
                        <p className="feature-card__description">Manage complete profile with secure access controls</p>
                    </div>

                    {/* Card 3: Advanced Analytics */}
                    <div className="feature-card feature-card--border-left">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="7" y="7" width="35" height="32" rx="5" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M7 15h35" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M15 33V27M22 33V22M29 33V25M35 33V18" stroke="#7FB3E8" strokeWidth="2.7" strokeLinecap="round" />
                                <path d="M13 25l8-7 8 4 7-9" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="13" cy="25" r="2" fill="#1D5FA7" />
                                <circle cx="21" cy="18" r="2" fill="#1D5FA7" />
                                <circle cx="29" cy="22" r="2" fill="#1D5FA7" />
                                <circle cx="36" cy="13" r="2" fill="#1D5FA7" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Advanced Analytics</h3>
                        <p className="feature-card__description">Data-driven insights for academic excellence</p>
                    </div>

                    {/* Card 4: Attendance Tracking */}
                    <div className="feature-card feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="7" y="12" width="32" height="26" rx="4" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M7 19h32" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M18 12V8h10v4" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="16" cy="27" r="3.5" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.2" />
                                <path d="M10 36c1.2-4.5 3.5-7 6-7s4.8 2.5 6 7" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M26 26h7M26 32h5" stroke="#7FB3E8" strokeWidth="2.4" strokeLinecap="round" />
                                <path d="M31 26l3 3 6-7" stroke="#1D5FA7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Attendance Tracking</h3>
                        <p className="feature-card__description">Automated attendance management and reports</p>
                    </div>

                    {/* Card 5: Academic Calendar */}
                    <div className="feature-card feature-card--border-left feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="10" width="30" height="28" rx="4" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M8 18h30" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M16 7v7M30 7v7" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <rect x="14" y="23" width="5" height="5" rx="1.3" fill="#B9DDFF" />
                                <rect x="22" y="23" width="5" height="5" rx="1.3" fill="#B9DDFF" />
                                <rect x="30" y="23" width="5" height="5" rx="1.3" fill="#B9DDFF" />
                                <path d="M16 33l3 3 7-8" stroke="#1D5FA7" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Academic Calendar</h3>
                        <p className="feature-card__description">Organize events and deadlines efficiently</p>
                    </div>

                    {/* Card 6: AI Assistance */}
                    <div className="feature-card feature-card--border-left feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="13" width="26" height="21" rx="7" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M17 13V9M29 13V9" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="18" cy="23" r="2.2" fill="#1D5FA7" />
                                <circle cx="28" cy="23" r="2.2" fill="#1D5FA7" />
                                <path d="M19 28c2.5 2 5.5 2 8 0" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M5 24h5M36 24h5" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M23 34v4M17 38h12" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M36 7l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">AI Assistance</h3>
                        <p className="feature-card__description">Get intelligent insights and recommendations for better outcomes</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
