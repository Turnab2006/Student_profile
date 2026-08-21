import React, { useEffect, useState } from 'react';

// Styles
import './styles/landing-page.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/feature.css';
import './styles/overview.css';
import './styles/faq.css';
import './styles/team.css';
import './styles/contact.css';
import './styles/footer.css';

// Assets
import trackademyLogo from './assets/trackademy.svg';
import pngImg from './assets/png.png';
import secureIcon from './assets/secure.svg';
import seamlessIcon from './assets/seamless.svg';
import smartIcon from './assets/smart.svg';
import Turnab from './assets/Turnab.svg';
import Srija from './assets/Srija.svg';
import Tuhina from './assets/Tuhina.svg';
import SohamDa from './assets/SohamDa.svg';

// Robust Smooth Scroll Utility
export function scrollToSection(sectionId) {
    if (!sectionId) return;
    const targetId = sectionId.replace(/^#/, '');

    let targetElement = document.getElementById(targetId);
    if (!targetElement && (targetId === 'overview' || targetId === 'about')) {
        targetElement = document.getElementById('about') || document.getElementById('overview');
    }
    if (!targetElement && (targetId === 'home' || targetId === 'top')) {
        targetElement = document.getElementById('home');
    }

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}

// -------------------------------------------------------------
// 1. NAVBAR COMPONENT
// -------------------------------------------------------------
export function Navbar({
    onLoginClick,
    navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ],
    logoSrc = trackademyLogo,
    loginText = 'Login',
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Active section scrollspy using getBoundingClientRect
            const sections = ['home', 'features', 'about', 'contact'];
            const triggerPoint = 200;

            let currentActive = '#home';
            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionId = sections[i];
                const element = document.getElementById(sectionId) ||
                    (sectionId === 'about' ? document.getElementById('overview') : null);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= triggerPoint) {
                        currentActive = `#${sectionId}`;
                        break;
                    }
                }
            }
            setActiveLink(currentActive);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
        setMenuClosing(false);
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        setMenuClosing(false);
        setMenuOpen((prev) => !prev);
    };

    const handleLinkClick = (e, href) => {
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            setActiveLink(href);
            closeMenu();
            scrollToSection(targetId);

            if (window.history.pushState) {
                window.history.pushState(null, '', href);
            }
        } else {
            setActiveLink(href);
            closeMenu();
        }
    };

    const handleLoginClick = (e) => {
        closeMenu();
        if (onLoginClick) {
            e.preventDefault();
            onLoginClick(e);
        }
    };

    const mobileMenuState = menuClosing ? 'closing' : menuOpen ? 'open' : '';

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="tlp-container">
                <div className="nav-wrapper">
                    <div className="logo">
                        <a href="#home" className="nav-link" onClick={(e) => handleLinkClick(e, '#home')}>
                            <img src={logoSrc} alt="Trackademy" />
                        </a>
                    </div>

                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={openMenu}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M6 6L18 18" />
                                <path d="M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M4 6H20" />
                                <path d="M4 12H20" />
                                <path d="M4 18H20" />
                            </svg>
                        )}
                    </button>

                    <nav className="nav-menu desktop-menu">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`nav-link ${activeLink === item.href ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.href)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a href="/login" className="login-btn" onClick={handleLoginClick}>
                            {loginText} <span className="arrow">→</span>
                        </a>
                    </nav>
                </div>

                <div
                    className={`mobile-menu-backdrop ${mobileMenuState}`}
                    onClick={closeMenu}
                    aria-hidden={!menuOpen}
                />

                <div className={`mobile-menu-panel ${mobileMenuState}`} aria-hidden={!menuOpen}>
                    <div className="mobile-menu-top">
                        <a href="#home" className="nav-link" onClick={(e) => handleLinkClick(e, '#home')}>
                            <img src={logoSrc} alt="Trackademy" />
                        </a>

                        <button type="button" className="mobile-close" onClick={closeMenu} aria-label="Close navigation menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M6 6L18 18" />
                                <path d="M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    <div className="mobile-menu-body">
                        <div className="mobile-menu-links">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`mobile-menu-link ${activeLink === item.href ? 'active' : ''}`}
                                    onClick={(e) => handleLinkClick(e, item.href)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <a href="/login" className="mobile-login-btn" onClick={handleLoginClick}>
                            {loginText} <span className="arrow">→</span>
                        </a>

                        <p className="mobile-menu-footer">© 2026 Trackademy. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

// -------------------------------------------------------------
// 2. HERO COMPONENT
// -------------------------------------------------------------
export function Hero({
    onGetStarted,
    onBookDemo,
    heroImage = pngImg,
}) {
    return (
        <section className="hero" id="home">
            <div className="tlp-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="tag">
                            <span>😊</span> All-in-One Educational Platform
                        </div>
                        <h2>
                            One Platform.<br />Three Portals.<br />
                            <span className="highlight">Infinite Possibilities.</span>
                        </h2>
                        <div className="button-div">
                            <button
                                type="button"
                                className="btn btn-primary"
                                id="get-started"
                                onClick={onGetStarted}
                            >
                                Get Started
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="demo-btn"
                                onClick={onBookDemo}
                            >
                                Book Demo
                            </button>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={heroImage} alt="Trackademy Dashboard Preview" />
                    </div>

                    {/* Features Below Hero */}
                    <div className="feature-wrapper">
                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={secureIcon} alt="Secure Icon" />
                            </div>
                            <div className="text">
                                <h3>Secure</h3>
                                <p>Complete peace of mind</p>
                            </div>
                        </div>

                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={seamlessIcon} alt="Seamless Icon" />
                            </div>
                            <div className="text">
                                <h3>Seamless</h3>
                                <p>Smooth and fast workflow</p>
                            </div>
                        </div>

                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={smartIcon} alt="Smart Icon" />
                            </div>
                            <div className="text">
                                <h3>Smart</h3>
                                <p>Actionable real-time insights</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 3. FEATURE COMPONENT
// -------------------------------------------------------------
export function Feature() {
    return (
        <section className="feature-section" id="features">
            <div className="feature-container">
                <div className="feature-header">
                    <div className="feature-label-badge">
                        <span className="feature-label">Platform Capabilities</span>
                    </div>
                    <h2 className="feature-title">Everything You Need to Power Academic Excellence</h2>
                    <p className="feature-subtitle">
                        A unified academic ecosystem engineered to streamline evaluations, automate attendance, verify co-curricular credentials, and connect your entire campus.
                    </p>
                </div>

                <div className="feature-grid">
                    {/* Card 1: Grades & Performance Analytics */}
                    <div className="feature-card">
                        <div className="feature-card__icon-slot"> 
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="5" width="30" height="36" rx="5" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M29 5v8a3 3 0 0 0 3 3h6" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M14 18h9M14 24h18M14 30h14" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M29 27l3 3 6-6" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="17" cy="35" r="3" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Grades & Results Tracking</h3>
                        <p className="feature-card__description">Real-time semester SGPA calculation, subject score breakdowns, and downloadable official grade cards.</p>
                    </div>

                    {/* Card 2: Smart Attendance Tracking */}
                    <div className="feature-card feature-card--border-left">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="7" y="10" width="32" height="28" rx="5" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M7 18h32" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M15 6v6M31 6v6" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M15 27l3 3 6-6" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="30" cy="27" r="4" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Smart Attendance Monitoring</h3>
                        <p className="feature-card__description">Live class-wise attendance monitoring with automatic threshold warnings and subject percentage analytics.</p>
                    </div>

                    {/* Card 3: Profile & Digital ID Card */}
                    <div className="feature-card feature-card--border-left">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="6" y="8" width="34" height="30" rx="5" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <circle cx="16" cy="20" r="4.5" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.2" />
                                <path d="M10 32c1-3 3.5-5 6-5s5 2 6 5" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M26 18h8M26 23h6M26 28h5" stroke="#7FB3E8" strokeWidth="2.4" strokeLinecap="round" />
                                <rect x="29" y="11" width="7" height="4" rx="1.5" fill="#1D5FA7" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Digital ID & Verified Profiles</h3>
                        <p className="feature-card__description">Centralized profile records with QR-ready verified Digital ID cards for fast campus identification.</p>
                    </div>

                    {/* Card 4: Mentorship & Mentee Directory */}
                    <div className="feature-card feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17" cy="18" r="5" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" />
                                <path d="M8 34c1.5-5 5-8 9-8s7.5 3 9 8" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="31" cy="16" r="3.5" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.2" />
                                <path d="M26 31c1-3 3-5 5-5s4 2 5 5" stroke="#1D5FA7" strokeWidth="2.2" strokeLinecap="round" />
                                <path d="M28 20l4-3 4 3" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Faculty Mentorship Network</h3>
                        <p className="feature-card__description">Direct mentee monitoring, attendance alerts, messaging channels, and personalized student guidance.</p>
                    </div>

                    {/* Card 5: Notice & Circular Broadcast */}
                    <div className="feature-card feature-card--border-left feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 26V18a2 2 0 0 1 2-2h4l10-6v24l-10-6h-4a2 2 0 0 1-2-2z" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M10 26l2 9h4l-2-9" fill="#B9DDFF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M28 17a5 5 0 0 1 0 10M32 14a9 9 0 0 1 0 16" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="11" cy="21" r="1.5" fill="#1D5FA7" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Notice & Circular Broadcasts</h3>
                        <p className="feature-card__description">Targeted institutional announcements with priority tags, PDF attachments, and instant notice board updates.</p>
                    </div>

                    {/* Card 6: Co-curricular Credit Points & Activities */}
                    <div className="feature-card feature-card--border-left feature-card--border-top">
                        <div className="feature-card__icon-slot">
                            <svg className="feature-card__icon" width="60" height="60" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 10h20v11a10 10 0 0 1-20 0V10z" fill="#EAF4FF" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M13 14H8a3 3 0 0 0-3 3v2a4 4 0 0 0 4 4h4" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M33 14h5a3 3 0 0 1 3 3v2a4 4 0 0 1-4 4h-4" stroke="#1D5FA7" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M23 21v8M17 37h12M19 29h8v8h-8z" stroke="#1D5FA7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M23 13l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="feature-card__title">Credit Points & Activities</h3>
                        <p className="feature-card__description">Record hackathons, research papers, and co-curricular achievements with verified mentor credit approvals.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 4. OVERVIEW COMPONENT
// -------------------------------------------------------------
export function Overview() {
    return (
        <section className="overview-section" id="about">
            <div className="overview-container">
                <div className="overview-header">
                    <div className="overview-label-badge">
                        <span className="overview-label">Portals Overview</span>
                    </div>
                    <h2 className="overview-title">One Platform. Three Tailored Portals.</h2>
                    <p className="overview-subtitle">
                        Purpose-built environments designed specifically for students, faculty mentors, and academic administrators to collaborate, track progress, and excel.
                    </p>
                </div>

                <div className="overview-rows">
                    {/* Row 1: Student Portal */}
                    <div className="overview-row overview-row--student">
                        <div className="overview-text-col">
                            <div className="overview-portal-badge overview-portal-badge--student">
                                Student Portal
                            </div>
                            <div className="overview-title-container">
                                <div className="overview-icon-box overview-icon-box--student">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Empowering Students to Excel</h3>
                            </div>
                            <p className="overview-row-desc">
                                A personalized academic hub where students can track semester-wise results, subject attendance, co-curricular credit points, downloadable grade cards, and official notices in real time.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Live attendance tracking with subject breakdown and percentage alerts",
                                    "Instant semester SGPA, grade cards and academic performance analytics",
                                    "Verified Digital ID Card and co-curricular credit points tracker",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--left">
                                <img
                                    alt="Student Portal Dashboard Preview"
                                    src="/student%20portal.svg"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Mentor Portal */}
                    <div className="overview-row overview-row--reverse overview-row--mentor">
                        <div className="overview-text-col">
                            <div className="overview-portal-badge overview-portal-badge--mentor">
                                Mentor Portal
                            </div>
                            <div className="overview-title-container">
                                <div className="overview-icon-box overview-icon-box--mentor">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Actionable Mentee Insights & Guidance</h3>
                            </div>
                            <p className="overview-row-desc">
                                Equips faculty mentors with holistic student records, automated attendance warnings, direct mentee communication channels, and fast credit point evaluations.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Comprehensive mentee directory with real-time academic indicators",
                                    "Direct messaging and proactive academic intervention tools",
                                    "Fast credit point issuance and co-curricular activity reviews",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7656f4" strokeWidth="2" fill="#f5f3ff" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7656f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--right">
                                <img
                                    alt="Mentor Portal Dashboard Preview"
                                    src="/mentor%20portal.svg"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Admin Portal */}
                    <div className="overview-row overview-row--admin">
                        <div className="overview-text-col">
                            <div className="overview-portal-badge overview-portal-badge--admin">
                                Admin Portal
                            </div>
                            <div className="overview-title-container">
                                <div className="overview-icon-box overview-icon-box--admin">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Centralized Governance & Operations</h3>
                            </div>
                            <p className="overview-row-desc">
                                Comprehensive administrative command to manage departments, faculty allocations, student admissions, syllabus curricula, circulars, and institutional support.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "End-to-end student, faculty mentor, and department management",
                                    "Comprehensive curriculum, semester timetable, and subject controls",
                                    "Institution-wide notice broadcasting with priority categorizations",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#4338ca" strokeWidth="2" fill="#eef2ff" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--left">
                                <img
                                    alt="Admin Portal Dashboard Preview"
                                    src="/admin%20portal.svg"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 5. FAQ COMPONENT
// -------------------------------------------------------------
const DEFAULT_FAQS = [
    {
        category: 'Portal Architecture',
        question: 'How do the Student, Mentor, and Admin portals communicate with each other?',
        answer: 'Trackademy unites all three portals under a synchronized academic engine. <strong>Students</strong> track real-time attendance, SGPA results, credit point histories, and circulars; <strong>Mentors</strong> review their assigned mentees, approve co-curricular credits, and communicate directly; and <strong>Administrators</strong> govern departments, semester curricula, faculty assignments, and institution-wide circulars with complete security controls.',
        open: true
    },
    {
        category: 'Smart Attendance',
        question: 'How is subject-wise attendance computed and how do low attendance warnings work?',
        answer: 'Attendance is recorded per lecture session. The system instantly computes individual subject percentages and overall semester averages. Whenever attendance dips below institutional thresholds (e.g. 75%), clear visual warning indicators and notifications are flagged for both student and mentor.',
        open: false
    },
    {
        category: 'Digital Credentials',
        question: 'What is the Digital ID Card and how does campus verification work?',
        answer: 'The Digital ID Card is an official, verifiable digital credential accessible on student and mentor profile dashboards. It features key student records (Roll Number, Department, Batch, Blood Group, Emergency Contact) with an interactive 3D front-and-back view for instant campus verification.',
        open: false
    },
    {
        category: 'Academic Results',
        question: 'Can students and mentors download verified semester grade cards and SGPA reports?',
        answer: 'Yes. Students and faculty can view comprehensive internal, theory, and practical mark breakdowns for all completed semesters. Official PDF grade cards featuring SGPA, cumulative CGPA, and letter grade classifications can be downloaded directly with a single click.',
        open: false
    },
    {
        category: 'Credit Points',
        question: 'How does the co-curricular activity and credit points approval system operate?',
        answer: 'Students submit verifiable records for hackathons, research papers, technical workshops, cultural events, and sports. Assigned faculty mentors review the evidence and approve verified credit points that immediately reflect on the student’s profile and graduation records.',
        open: false
    }
];

export function Faq({ faqs = DEFAULT_FAQS, onSupportClick }) {
    const [faqList, setFaqList] = useState(faqs);

    const toggleFaq = (index) => {
        setFaqList(prev => prev.map((item, i) => ({
            ...item,
            open: i === index ? !item.open : false
        })));
    };

    const handleSupportClick = (e) => {
        if (onSupportClick) {
            e.preventDefault();
            onSupportClick(e);
        } else {
            e.preventDefault();
            scrollToSection('contact');
        }
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                <div className="faq-header">
                    <div className="faq-label-badge">
                        <span className="faq-label">FAQ</span>
                    </div>
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">Quick answers to common questions about portals, attendance monitoring, grade cards, and institutional verification.</p>
                </div>

                <div className="faq-list">
                    {faqList.map((item, index) => (
                        <div key={index} className={`faq-item ${item.open ? 'faq-item--open' : ''}`}>
                            <button
                                type="button"
                                className="faq-trigger"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={item.open}
                            >
                                <div className="faq-question-wrap">
                                    {item.category && (
                                        <span className="faq-category-tag">{item.category}</span>
                                    )}
                                    <span className="faq-question">{item.question}</span>
                                </div>
                                <div className="faq-icon-circle">
                                    <svg
                                        className={`faq-icon ${item.open ? 'faq-icon--rotated' : ''}`}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {item.open && (
                                <div className="faq-content">
                                    <div className="faq-content-inner">
                                        <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Updated Still Have Questions Card */}
                <div className="faq-support-card">
                    <div className="faq-support-main">
                        <div className="faq-support-icon-box">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                <circle cx="9" cy="10" r="1" fill="currentColor" />
                                <circle cx="12" cy="10" r="1" fill="currentColor" />
                                <circle cx="15" cy="10" r="1" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="faq-support-info">
                            <h4 className="faq-support-title">Still have questions?</h4>
                            <p className="faq-support-desc">Can’t find the answer you’re looking for? Our campus support team is here to assist you.</p>
                        </div>
                    </div>

                    <div className="faq-support-actions">
                        <a href="mailto:support@trackademy.in" className="faq-support-link-email">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span>support@trackademy.in</span>
                        </a>

                        <a href="#contact" className="faq-support-btn" onClick={handleSupportClick}>
                            <span>Contact Support</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 6. TEAM COMPONENT
// -------------------------------------------------------------
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

export function Team({ members = DEFAULT_MEMBERS }) {
    return (
        <section className="team-section" id="team">
            <div className="team-container">
                <div className="team-header">
                    <div className="team-label-badge">
                        <span className="team-label">Our Creators</span>
                    </div>
                    <h2 className="team-title">Meet the Builders Behind Trackademy</h2>
                    <p className="team-subtitle">
                        Passionate student engineers and designers dedicated to crafting intuitive, next-generation academic software.
                    </p>
                </div>

                <div className="team-grid">
                    {members.map((item) => (
                        <div key={item.name} className="team-card">
                            <div className="team-avatar-wrapper">
                                <div className="team-avatar-ring">
                                    <img src={item.avatarUrl} alt={item.name} className="team-avatar" />
                                </div>
                            </div>
                            <div className="team-card-content">
                                <h3 className="team-member-name">{item.name}</h3>
                                <div className="team-member-role-badge">
                                    <span>{item.title}</span>
                                </div>
                                <p className="team-member-bio">{item.summary}</p>
                                <div className="team-socials">
                                    {item.socials.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            className={`team-social-link team-social-link--${social.platform}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${item.name} ${social.platform}`}
                                            title={`${item.name}'s ${social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}`}
                                        >
                                            {renderSocialIcon(social.platform)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 7. CONTACT COMPONENT
// -------------------------------------------------------------
export function Contact({
    onContactSubmit,
    contactInfo = {
        location: 'Trackademy Campus HQ, Sector V, Bidhannagar, Kolkata, West Bengal 700091',
        phone: '+91 98300 12345 / +91 33 2357 0000',
        email: 'support@trackademy.in',
        hours: 'Monday – Saturday: 9:00 AM – 6:00 PM IST',
    }
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'student_support',
        subject: '',
        message: ''
    });

    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onContactSubmit) {
            onContactSubmit(formData);
        } else {
            setStatusMessage(`Thank you, ${formData.name}! Your inquiry regarding "${formData.subject || 'Portal Support'}" has been received. Our team will contact you within 24 hours.`);
            setTimeout(() => setStatusMessage(''), 6000);
        }
        setFormData({
            name: '',
            email: '',
            phone: '',
            inquiryType: 'student_support',
            subject: '',
            message: ''
        });
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <div className="contact-grid">
                    
                    {/* Left Info Column */}
                    <div className="contact-info-col">
                        <div className="contact-label-badge">
                            <span className="contact-label">CONTACT US</span>
                        </div>
                        <h2 className="contact-title">We're Here to Help</h2>
                        <p className="contact-description">
                            Have questions about our portals, student grading workflows, attendance integrations, or institutional deployment? Reach out to our dedicated campus support team.
                        </p>

                        <div className="contact-cards-grid">
                            <div className="contact-info-card">
                                <div className="contact-icon-wrapper contact-icon-wrapper--location">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Campus Location</h3>
                                    <p className="contact-info-value">{contactInfo.location}</p>
                                </div>
                            </div>

                            <div className="contact-info-card">
                                <div className="contact-icon-wrapper contact-icon-wrapper--phone">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Helpline Support</h3>
                                    <p className="contact-info-value">
                                        <a href="tel:+919830012345" className="contact-link">+91 98300 12345</a> / <a href="tel:+913323570000" className="contact-link">+91 33 2357 0000</a>
                                    </p>
                                </div>
                            </div>

                            <div className="contact-info-card">
                                <div className="contact-icon-wrapper contact-icon-wrapper--email">
                                    <svg viewBox="0 0 24 24">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Email Inquiries</h3>
                                    <p className="contact-info-value">
                                        <a href={`mailto:${contactInfo.email}`} className="contact-link">{contactInfo.email}</a>
                                    </p>
                                </div>
                            </div>

                            <div className="contact-info-card">
                                <div className="contact-icon-wrapper contact-icon-wrapper--hours">
                                    <svg viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <div className="contact-label-row">
                                        <h3 className="contact-info-label">Working Hours</h3>
                                        <span className="contact-status-pill">
                                            <span className="contact-status-dot"></span> Open Today
                                        </span>
                                    </div>
                                    <p className="contact-info-value">{contactInfo.hours}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Column */}
                    <div className="contact-form-card">
                        <div className="contact-form-header">
                            <h3 className="contact-form-title">Send Us a Message</h3>
                            <p className="contact-form-subtitle">Fill in the details below and our academic support team will get back to you promptly.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            {statusMessage && (
                                <div className="contact-status-alert">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <span>{statusMessage}</span>
                                </div>
                            )}

                            {/* Inquiry Category */}
                            <div className="contact-form-group">
                                <label htmlFor="inquiryType">Inquiry Category</label>
                                <select
                                    name="inquiryType"
                                    id="inquiryType"
                                    value={formData.inquiryType}
                                    onChange={handleChange}
                                    className="contact-select"
                                    required
                                >
                                    <option value="student_support">Student Portal & Academic Support</option>
                                    <option value="faculty_onboarding">Faculty & Mentor Inquiries</option>
                                    <option value="institution_demo">Institutional Deployment & Demo</option>
                                    <option value="technical_issue">Technical & Login Assistance</option>
                                    <option value="general_query">General Feedback & Other</option>
                                </select>
                            </div>

                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="contact-input"
                                        required
                                    />
                                </div>

                                <div className="contact-form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="e.g. rahul.sharma@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="contact-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label htmlFor="phone">Contact Number (Optional)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="contact-input"
                                    />
                                </div>

                                <div className="contact-form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        placeholder="Brief summary of your query"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="contact-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Please describe your question or requirement in detail..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="contact-textarea"
                                    required
                                />
                            </div>

                            <button type="submit" className="contact-btn-submit">
                                <span>Send Inquiry</span>
                                <svg viewBox="0 0 24 24">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// 8. FOOTER COMPONENT
// -------------------------------------------------------------
export function Footer({
    logoSrc = trackademyLogo,
    onNewsletterSubmit,
    companyLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ],
    helpLinks = [
        { label: 'Customer Support', href: '#contact' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Privacy Policy', href: '#' },
    ]
}) {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleScrollClick = (e, href) => {
        if (href && href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href);
            if (window.history.pushState) {
                window.history.pushState(null, '', href);
            }
        }
    };

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (onNewsletterSubmit) {
            onNewsletterSubmit(email);
        }
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <section className="footer-section">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-col-logo">
                        <img src={logoSrc} alt="Trackademy Logo" />

                        <p className="footer-description">
                            Streamlining education through powerful, intuitive software for students, mentors, and administrators.
                        </p>

                        <ul className="footer-social-list">
                            <li>
                                <a href="#" title="Twitter / X" className="footer-social-link" aria-label="Twitter">
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a href="#" title="Facebook" className="footer-social-link" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a href="#" title="Instagram" className="footer-social-link" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
                                        <circle cx="16.806" cy="7.207" r="1.078" />
                                        <path
                                            d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a href="#" title="GitHub" className="footer-social-link" aria-label="GitHub">
                                    <svg viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col-nav">
                        <p className="footer-nav-title">Company</p>
                        <ul className="footer-nav-list">
                            {companyLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="footer-nav-link"
                                        onClick={(e) => handleScrollClick(e, item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col-nav">
                        <p className="footer-nav-title">Help</p>
                        <ul className="footer-nav-list">
                            {helpLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="footer-nav-link"
                                        onClick={(e) => handleScrollClick(e, item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col-newsletter">
                        <p className="footer-nav-title">Subscribe to newsletter</p>
                        <form onSubmit={handleNewsletter} className="footer-newsletter-form">
                            <div className="footer-input-group">
                                <label htmlFor="newsletter-email">Email</label>
                                <input
                                    type="email"
                                    name="newsletter-email"
                                    id="newsletter-email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="footer-input-email"
                                    required
                                />
                            </div>

                            <button type="submit" className="footer-btn-subscribe">
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="footer-divider" />

                <p className="footer-copyright">© Copyright 2026, All Rights Reserved by Trackademy</p>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// MAIN LANDING PAGE CONTAINER
// -------------------------------------------------------------
export default function LandingPage({
    onLoginClick,
    onGetStarted,
    onBookDemo,
    onContactSubmit,
    className = '',
}) {
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash) {
                const id = window.location.hash.substring(1);
                setTimeout(() => {
                    scrollToSection(id);
                }, 100);
            }
        };

        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    return (
        <div className={`trackademy-landing-root ${className}`}>
            <Navbar onLoginClick={onLoginClick} />
            <Hero onGetStarted={onGetStarted} onBookDemo={onBookDemo} />
            <Feature />
            <Overview />
            <Faq />
            <Team />
            <Contact onContactSubmit={onContactSubmit} />
            <Footer />
        </div>
    );
}
