import React from 'react';

// Gradients definitions to be embedded in SVGs (specifically clean greens, blues and pinks)
export const GradientDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
    <defs>
      <linearGradient id="grad-logo-green" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
      <linearGradient id="grad-indigo-purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="grad-cyan-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="grad-pink-orange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="grad-emerald-teal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
  </svg>
);

export const LogoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5" stroke="url(#grad-logo-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 15.5h12" stroke="url(#grad-logo-green)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 11.5h12" stroke="url(#grad-logo-green)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 7.5h8" stroke="url(#grad-logo-green)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 22h20" stroke="url(#grad-logo-green)" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const SecureIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#grad-cyan-indigo)" opacity="0.1" />
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11v6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SeamlessIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H6a4 4 0 00-4 4 4 4 0 004 4h12a4 4 0 004-4 4 4 0 00-4-4z" fill="url(#grad-cyan-indigo)" opacity="0.1" />
    <path d="M22 10v4a4 4 0 01-4 4H6a4 4 0 01-4-4v-4a4 4 0 014-4h12a4 4 0 014 4z" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M12 6V2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22v-4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 12a5 5 0 00-10 0" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SmartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="url(#grad-cyan-indigo)" opacity="0.1"/>
    <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M12 2a10 10 0 0110 10" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0" stroke="#3b82f6" strokeWidth="1.5"/>
  </svg>
);

export const GradesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#grad-indigo-purple)" opacity="0.1" />
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#4f46e5" strokeWidth="2"/>
    <path d="M9 17h6" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 13h6" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 9h3" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ProfileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" fill="url(#grad-cyan-indigo)" opacity="0.1" />
    <circle cx="12" cy="7" r="4" stroke="#3b82f6" strokeWidth="2"/>
  </svg>
);

export const AnalyticsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3v18h18" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="17" y="5" width="3" height="3" rx="1" fill="#3b82f6" />
  </svg>
);

export const AttendanceIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#grad-emerald-teal)" opacity="0.1" />
    <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" fill="url(#grad-indigo-purple)" opacity="0.1" />
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4f46e5" strokeWidth="2"/>
    <path d="M16 2v4" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 2v4" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 10h18" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const AIIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="4" fill="url(#grad-indigo-purple)" opacity="0.1" />
    <circle cx="12" cy="12" r="4" stroke="#8b5cf6" strokeWidth="2"/>
  </svg>
);

export const StudentsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#3b82f6" strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MentorsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10v6M2 10v6M12 4L2 9l10 5 10-5-10-5z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InstitutionsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18M3 10h18M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
    <rect x="9" y="14" width="6" height="7" stroke="#8b5cf6" strokeWidth="2"/>
  </svg>
);

export const LocationIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" stroke="#3b82f6" strokeWidth="2"/>
  </svg>
);

export const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#3b82f6" strokeWidth="2"/>
  </svg>
);

export const ChevronIcon = ({ className, open }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18h16M4 12h16M4 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// High-End, Premium Illustration of Laptop, Plant, and Books (matches screenshot perfectly)
export const DashboardIllustration = () => (
  <div className="dashboard-ill-wrap">
    {/* Soft light blue base platform */}
    <div className="dashboard-base-pedestal"></div>
    
    {/* Floating background grids/dots decoration */}
    <div className="ill-dots">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>

    {/* Small green plant in a pot on the left */}
    <div className="ill-plant">
      <div className="plant-leaves">
        <div className="leaf l1"></div>
        <div className="leaf l2"></div>
        <div className="leaf l3"></div>
        <div className="leaf l4"></div>
        <div className="leaf l5"></div>
      </div>
      <div className="plant-pot"></div>
    </div>

    {/* Floating calendar on the right */}
    <div className="ill-float-cal">
      <div className="cal-head">
        <span>May 2024</span>
        <span>&gt;</span>
      </div>
      <div className="cal-grid">
        <span style={{color: '#94a3b8'}}>Mo</span><span style={{color: '#94a3b8'}}>Tu</span><span style={{color: '#94a3b8'}}>We</span><span style={{color: '#94a3b8'}}>Th</span><span style={{color: '#94a3b8'}}>Fr</span><span style={{color: '#94a3b8'}}>Sa</span><span style={{color: '#94a3b8'}}>Su</span>
        <span>29</span><span>30</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
        <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
        <span>20</span><span>21</span><span className="cal-day active">22</span><span>23</span><span>24</span><span>25</span><span>26</span>
        <span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>1</span><span>2</span>
      </div>
    </div>

    {/* The Laptop showing modern Alex Dashboard */}
    <div className="ill-laptop-container">
      <div className="laptop-screen">
        <div className="screen-content">
          <div className="screen-header">
            <div className="nav-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="search-bar"></div>
            <div className="profile-dot"></div>
          </div>
          
          <div className="screen-body">
            <div className="screen-sidebar">
              <div className="menu-bar active"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
            </div>
            
            <div className="screen-main">
              <div className="welcome-banner">
                Welcome back, Alex! 👋
              </div>
              <div className="dashboard-blocks">
                <div className="dash-card c1">
                  <span className="c-val">8</span>
                  <span className="c-lbl">Courses</span>
                </div>
                <div className="dash-card c2">
                  <span className="c-val">5</span>
                  <span className="c-lbl">Tasks</span>
                </div>
                <div className="dash-card c3">
                  <span className="c-val">92%</span>
                  <span className="c-lbl">Attendance</span>
                </div>
              </div>
              <div className="screen-list">
                <div className="list-row">
                  <span style={{display:'flex', alignItems:'center', gap: '3px'}}>
                    <span className="indicator"></span> Data Structures
                  </span>
                  <span style={{color: '#94a3b8'}}>08:00 AM</span>
                </div>
                <div className="list-row">
                  <span style={{display:'flex', alignItems:'center', gap: '3px'}}>
                    <span className="indicator" style={{background: '#10b981'}}></span> Operating Systems
                  </span>
                  <span style={{color: '#94a3b8'}}>11:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="laptop-keyboard-base"></div>
    </div>

    {/* Textbooks on the right with graduation cap sitting on top */}
    <div className="ill-textbooks">
      <div className="book-stack">
        <div className="book bottom"></div>
        <div className="book middle"></div>
        <div className="book top"></div>
        
        {/* Graduation cap */}
        <div className="graduation-cap">
          <div className="cap-board"></div>
          <div className="cap-skull"></div>
          <div className="cap-tassel"></div>
        </div>
      </div>
    </div>
  </div>
);

// Support bubble mockup
export const FAQIllustration = () => (
  <div className="faq-ill-wrap" style={{ border: '1px solid #e2e8f0', background: '#f8fafc' }}>
    <div className="faq-bubble b-1" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
      <div className="avatar">👦</div>
      <div className="msg" style={{ color: '#475569' }}>How does AI chatbot work?</div>
    </div>
    <div className="faq-bubble b-2" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
      <div className="avatar">🤖</div>
      <div className="msg" style={{ color: '#2563eb' }}>It parses academic metrics instantly!</div>
    </div>
    <div className="faq-bubble b-3" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
      <div className="avatar">👩</div>
      <div className="msg" style={{ color: '#475569' }}>Can mentors update attendance?</div>
    </div>
    <div className="faq-bubble b-4" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
      <div className="avatar">🤖</div>
      <div className="msg" style={{ color: '#2563eb' }}>Yes, with direct role-based access!</div>
    </div>
  </div>
);

// Map / Contact globe mockup
export const ContactIllustration = () => (
  <div className="contact-ill-wrap">
    <div className="globe" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', borderColor: 'rgba(59, 130, 246, 0.15)' }}>
      <div className="circle-1" style={{ borderColor: 'rgba(59, 130, 246, 0.1)' }}></div>
      <div className="circle-2" style={{ borderColor: 'rgba(59, 130, 246, 0.15)' }}></div>
      <div className="mail-icon" style={{ background: 'var(--gradient-button)', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <path d="M22 6l-10 7L2 6"/>
        </svg>
      </div>
    </div>
  </div>
);
