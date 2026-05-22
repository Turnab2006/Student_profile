import React, { useState, useEffect } from 'react';
import { LogoIcon, MenuIcon, CloseIcon } from './Icons';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrapper">
        <div className="logo">
          <a href="#home" className="nav-link logo-link" onClick={() => handleLinkClick('#home')} style={{ padding: 0 }}>
            <LogoIcon className="logo-icon" />
            <span className="logo-text">Track<span>Ademy</span></span>
          </a>
        </div>

        <button 
          className="hamburger-btn" 
          onClick={toggleMobileMenu} 
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <CloseIcon className="logo-icon" /> : <MenuIcon className="logo-icon" />}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a 
            href="#home" 
            className={`nav-link ${activeLink === '#home' ? 'active-link' : ''}`} 
            onClick={() => handleLinkClick('#home')}
          >
            Home
          </a>
          <a 
            href="#features" 
            className={`nav-link ${activeLink === '#features' ? 'active-link' : ''}`} 
            onClick={() => handleLinkClick('#features')}
          >
            Features
          </a>
          <a 
            href="#about" 
            className={`nav-link ${activeLink === '#about' ? 'active-link' : ''}`} 
            onClick={() => handleLinkClick('#about')}
          >
            About
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeLink === '#contact' ? 'active-link' : ''}`} 
            onClick={() => handleLinkClick('#contact')}
          >
            Contact
          </a>
          <a href="/login" className="login-btn" onClick={() => setMobileMenuOpen(false)}>
            Login <span className="arrow">→</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
