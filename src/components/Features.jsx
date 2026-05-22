import React from 'react';
import gradeImg from '../../assets/landing-page/grade.svg';
import profileImg from '../../assets/landing-page/profile.svg';
import analyticsImg from '../../assets/landing-page/smart.svg';
import attendanceImg from '../../assets/landing-page/attandance.svg';
import calendarImg from '../../assets/landing-page/calender.svg';
import aiImg from '../../assets/landing-page/AI.svg';

const Features = () => {
  const featureList = [
    {
      icon: <img src={gradeImg} alt="Grades" />,
      title: 'Grades & Feedback',
      description: 'Track academic performance and provide meaningful, timely feedback to students.'
    },
    {
      icon: <img src={profileImg} alt="Profile" />,
      title: 'Profile Management',
      description: 'Manage comprehensive student, mentor, and admin profiles with secure, granular access control.'
    },
    {
      icon: <img src={analyticsImg} alt="Analytics" />,
      title: 'Advanced Analytics',
      description: 'Leverage data-driven dashboards to monitor visual trends, progress, and performance.'
    },
    {
      icon: <img src={attendanceImg} alt="Attendance" />,
      title: 'Attendance Tracking',
      description: 'Automated attendance records with instant compliance summaries and reporting.'
    },
    {
      icon: <img src={calendarImg} alt="Calendar" />,
      title: 'Academic Calendar',
      description: 'Organize, schedule, and sync institutional events, assignments, and exam deadlines.'
    },
    {
      icon: <img src={aiImg} alt="AI Assistance" />,
      title: 'AI Assistance',
      description: 'Access smart automated summaries and predictive educational outcomes.'
    }
  ];

  return (
    <section className="designed-for" id="features">
      <div className="container">
        <p className="section-subtitle1">One Platform, Three Experiences</p>
        <h3 className="section-title">Designed for Every Role in Education</h3>
        <p className="section-subtitle">
          Unlock a dedicated, custom-tailored workspace designed specifically for students, mentors, and administrators.
        </p>
        
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
