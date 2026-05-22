import React from 'react';
import studentsImg from '../../assets/landing-page/Active-students.svg';
import mentorsImg from '../../assets/landing-page/Expert-mentors.svg';
import institutionsImg from '../../assets/landing-page/Institutions.svg';

const Stats = () => {
  return (
    <section className="endless-possibilities" id="about">
      <div className="container">
        <h3 className="section-title">One Platform. Endless Possibilities.</h3>
        <p className="section-subtitle">
          Whether you are a student tracking goals, a mentor guiding growth, or an admin orchestrating operations, we scale to fit you.
        </p>
        
        <div className="benefits-grid">
          {/* Students */}
          <div className="benefit-card stat students">
            <div className="benefit-icon">
              <img src={studentsImg} alt="Active Students" />
            </div>
            <div className="stat-content">
              <div className="stat-number">10k+</div>
              <div className="stat-title">Active Students</div>
              <div className="stat-desc">Learning, tracking, and succeeding daily</div>
            </div>
          </div>

          {/* Mentors */}
          <div className="benefit-card stat mentors">
            <div className="benefit-icon">
              <img src={mentorsImg} alt="Expert Mentors" />
            </div>
            <div className="stat-content">
              <div className="stat-number">500+</div>
              <div className="stat-title">Expert Mentors</div>
              <div className="stat-desc">Directly guiding students toward excellence</div>
            </div>
          </div>

          {/* Institutions */}
          <div className="benefit-card stat institutions">
            <div className="benefit-icon">
              <img src={institutionsImg} alt="Institutions" />
            </div>
            <div className="stat-content">
              <div className="stat-number">100+</div>
              <div className="stat-title">Institutions</div>
              <div className="stat-desc">Trusting TrackAdemy for unified management</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
