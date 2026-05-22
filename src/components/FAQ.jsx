import React, { useState } from 'react';
import { ChevronIcon } from './Icons';
import faqImg from '../../assets/landing-page/FAQ.svg';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First item active by default

  const faqItems = [
    {
      question: 'Who can use the Student Management Portal?',
      answer: 'The portal is designed for three distinct roles: students, mentors, and administrators. Each group has secure, role-based access to the dashboard. Students manage their study tasks, mentors monitor classes and grades, and administrators control configurations and global permissions.'
    },
    {
      question: 'What features are available in the portal?',
      answer: 'The platform integrates attendance tracking, marks and feedback, profile management, academic calendars, notifications, and analytics. Everything is housed in a single glassmorphic interface, minimizing app context switching.'
    },
    {
      question: 'How does the AI chatbot help users?',
      answer: 'The AI assistant answers instant queries and parses portal databases to summarize academic metrics. Rather than filtering through spreadsheets, mentors can ask the bot to pull student reports, calculate attendance averages, or project grades.'
    },
    {
      question: 'Is the portal accessible on mobile devices?',
      answer: 'Yes! The entire application is web-based, utilizing responsive flex grids and collapse drawers to adjust perfectly across desktops, tablets, and smartphones.'
    },
    {
      question: 'What happens if there is incorrect or missing data?',
      answer: 'Authorized administrators and mentors can edit records directly through the system. Auto-validation guards prevent formatting errors, ensuring that the database remains correct and reliable.'
    }
  ];

  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close if clicked again
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq-section">
      <div className="container faq-layout">
        <div className="faq-intro">
          <h3 className="faq-heading">Frequently Asked<br /><span>Questions</span></h3>
          <p>Find answers to common questions about TrackAdemy. Need further assistance? Feel free to contact our support team!</p>
          <div className="faq-illustration">
            <img src={faqImg} alt="FAQ" />
          </div>
        </div>

        <div className="faq-container">
          {faqItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                className={`faq-item ${isActive ? 'active' : ''}`} 
                key={index}
              >
                <div 
                  className="faq-question" 
                  onClick={() => handleToggle(index)}
                  role="button"
                  aria-expanded={isActive}
                >
                  <h4>{item.question}</h4>
                  <span className="faq-toggle">
                    <ChevronIcon open={isActive} className="logo-icon" />
                  </span>
                </div>
                <div 
                  className="faq-answer"
                  style={{ 
                    maxHeight: isActive ? '300px' : '0px',
                    transition: 'max-height 0.3s ease-out'
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
