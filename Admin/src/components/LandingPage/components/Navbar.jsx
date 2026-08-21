import React, { useEffect, useState } from 'react';
import trackademyLogo from '../assets/trackademy.svg';
import '../styles/navbar.css';

export default function Navbar({
    onLoginClick,
    navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Features', href: '#features' },
        { label: 'Overview', href: '#about' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
    ],
    logoSrc = trackademyLogo,
    loginText = 'Login',
}) {
    const MENU_CLOSE_DELAY = 600;
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
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
        if (!menuOpen || menuClosing) {
            return;
        }

        setMenuClosing(true);

        setTimeout(() => {
            setMenuOpen(false);
            setMenuClosing(false);
        }, MENU_CLOSE_DELAY);
    };

    const openMenu = () => {
        setMenuClosing(false);
        setMenuOpen((current) => !current);
    };

    const handleLinkClick = (e, href) => {
        setActiveLink(href);
        closeMenu();
    };

    const handleLoginClick = (e) => {
        if (onLoginClick) {
            e.preventDefault();
            onLoginClick(e);
            closeMenu();
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
