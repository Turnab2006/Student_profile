import React from 'react';
import logoImg from '../../assets/logo.svg';
import locationImg from '../../assets/landing-page/location.svg';
import phoneImg from '../../assets/landing-page/phone.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo" style={{ marginBottom: '10px' }}>
              <img src={logoImg} alt="TrackAdemy" className="logo-icon" />
              <span className="logo-text">Track<span>Ademy</span></span>
            </div>
            <p>Empowering educational systems and stakeholders through scalable technology.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="social-links">
              <div className="footer-contact-row">
                <img src={locationImg} alt="Location" />
                <span>Canal S Rd, Beleghata, Kolkata, West Bengal 700015</span>
              </div>
              <div className="footer-contact-row">
                <img src={phoneImg} alt="Phone" />
                <span>+91 9853962140</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} TrackAdemy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
