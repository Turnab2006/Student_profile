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
                    <h2 className="overview-title">Beautiful analytics to grow smarter</h2>
                    <p className="overview-subtitle">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <div className="overview-rows">
                    {/* Row 1 */}
                    <div className="overview-row">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Share team inboxes</h3>
                            </div>
                            <p className="overview-row-desc">
                                Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Leverage automation to move fast",
                                    "Always give customers a human to chat to",
                                    "Automate customer support and close leads faster",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                    {/* Row 2 */}
                    <div className="overview-row overview-row--reverse">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Deliver instant answers</h3>
                            </div>
                            <p className="overview-row-desc">
                                An all-in-one customer service platform that helps you balance everything your customers need to be happy.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Keep your customers in the loop with live chat",
                                    "Embed help articles right on your website",
                                    "Customers never have to leave the page to find an answer",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                    {/* Row 3 */}
                    <div className="overview-row">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                        <path d="M18 17V9M12 17V7M6 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Manage your team with reports</h3>
                            </div>
                            <p className="overview-row-desc">
                                Measure what matters with Trackademy's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Filter, export, and drilldown on the data quickly",
                                    "Save, schedule, and automate reports to your inbox",
                                    "Connect the tools you already use with 100+ integrations",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        question: 'Who can use the Student Management Portal?',
        answer: 'The portal is designed for three types of users: students, mentors, and administrators. Each user is given role-based access, meaning they can only view or manage the information relevant to them. Students can check their academic details, mentors can monitor and update performance, and administrators have full control over the system.',
        open: false
    },
    {
        question: 'What features are available in the portal?',
        answer: 'The portal offers a wide range of features including profile management, attendance tracking, academic results, notices, and activity records. All these features are integrated into a single dashboard, making it easy for users to access and manage information without switching between multiple systems.',
        open: false
    },
    {
        question: 'How does the AI chatbot help users?',
        answer: 'The AI-powered chatbot simplifies data access by providing quick summaries of student information. Instead of manually searching through records, users can ask the chatbot and instantly get insights about attendance, performance, and activities. This helps mentors and administrators make faster and more informed decisions.',
        open: false
    },
    {
        question: 'Is the portal accessible on mobile devices?',
        answer: 'Yes, the portal is fully web-based and designed to be responsive across different devices. Users can access it on smartphones, tablets, or desktops without any loss of functionality. This ensures convenience and allows users to stay updated anytime and from anywhere.',
        open: false
    },
    {
        question: 'What happens if there is incorrect or missing data?',
        answer: 'If any data is incorrect or missing, authorized users such as mentors or administrators can easily update and correct it through the system. The portal also includes validation mechanisms to reduce errors, ensuring that the stored information remains accurate and reliable.',
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
                    <p className="faq-subtitle">Everything you need to know about the product and billing.</p>
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
                                <span className="faq-question">{item.question}</span>
                                <svg
                                    className={`faq-icon ${item.open ? 'faq-icon--rotated' : ''}`}
                                    width="24"
                                    height="24"
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
                            </button>

                            {item.open && (
                                <div className="faq-content">
                                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="faq-footer">
                    Didn’t find the answer you are looking for?{' '}
                    <a href="#contact" onClick={handleSupportClick}>
                        Contact our support
                    </a>
                </p>
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

// -------------------------------------------------------------
// 7. CONTACT COMPONENT
// -------------------------------------------------------------
export function Contact({
    onContactSubmit,
    contactInfo = {
        location: 'Canal 5 Rd, Belinghatta, Kolkata, West Bengal 700015',
        phone: '+91 9853563240',
        email: 'support@trackademy.com',
    }
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
            setStatusMessage(`Thank you, ${formData.name}! Your message has been sent.`);
            setTimeout(() => setStatusMessage(''), 5000);
        }
        setFormData({ name: '', email: '', subject: '', message: '' });
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
                        <h2 className="contact-title">Get in Touch</h2>
                        <p className="contact-description">
                            We're here to help and answer any questions you may have about how Trackademy can transform your educational institution.
                        </p>

                        <ul className="contact-info-list">
                            <li className="contact-info-item">
                                <div className="contact-icon-wrapper">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Our Location</h3>
                                    <p className="contact-info-value">{contactInfo.location}</p>
                                </div>
                            </li>

                            <li className="contact-info-item">
                                <div className="contact-icon-wrapper">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Call Us</h3>
                                    <p className="contact-info-value">{contactInfo.phone}</p>
                                </div>
                            </li>

                            <li className="contact-info-item">
                                <div className="contact-icon-wrapper">
                                    <svg viewBox="0 0 24 24">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="contact-info-text">
                                    <h3 className="contact-info-label">Email Support</h3>
                                    <p className="contact-info-value">{contactInfo.email}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right Form Column */}
                    <div className="contact-form-card">
                        <form onSubmit={handleSubmit} className="contact-form">
                            {statusMessage && (
                                <div style={{ padding: '10px 14px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    {statusMessage}
                                </div>
                            )}

                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="John Doe"
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
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="contact-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="contact-input"
                                    required
                                />
                            </div>

                            <div className="contact-form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="contact-textarea"
                                    required
                                />
                            </div>

                            <button type="submit" className="contact-btn-submit">
                                <span>Send Message</span>
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
