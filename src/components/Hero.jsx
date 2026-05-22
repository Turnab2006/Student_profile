import React from 'react';
import { SecureIcon, SeamlessIcon, SmartIcon, DashboardIllustration } from './Icons';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="tag">
               😊 All-in-One Educational Platform
            </div>
            <h2>
              One Platform.<br />
              Three Portals.<br />
              <span className="highlight">Infinite Possibilities.</span>
            </h2>
            <p>
              Empowering students, mentors, and administrators with role-based features to track attendance, grades, tasks, and analytics in a secure, unified cloud dashboard.
            </p>
            <button className="btn">
              <span>GET STARTED</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path d="M11.6801 14.62L14.2401 12.06L11.6801 9.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4 12.0601H14.17" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          
          <div className="hero-image">
            <DashboardIllustration />
          </div>
          
          {/* Outlined Feature Tray */}
          <div className="feature-wrapper">
            {/* Secure */}
            <div className="feature-box">
              <div className="icon-box">
                <SecureIcon />
              </div>
              <div className="text">
                <h3>Secure</h3>
                <p>Role-based<br />Access</p>
              </div>
            </div>

            {/* Seamless */}
            <div className="feature-box">
              <div className="icon-box">
                <SeamlessIcon />
              </div>
              <div className="text">
                <h3>Seamless</h3>
                <p>Cloud<br />Experience</p>
              </div>
            </div>

            {/* Smart */}
            <div className="feature-box">
              <div className="icon-box">
                <SmartIcon />
              </div>
              <div className="text">
                <h3>Smart</h3>
                <p>Data-Driven<br />Insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
