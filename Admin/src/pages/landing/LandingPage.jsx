import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageComponent, { scrollToSection } from '../../components/LandingPage';

export default function LandingPage({ onNavigateLogin }) {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onNavigateLogin) {
      onNavigateLogin('login', 'mentor');
    } else {
      navigate('/login');
    }
  };

  const handleGetStarted = () => {
    if (onNavigateLogin) {
      onNavigateLogin('login', 'student');
    } else {
      navigate('/login?role=student');
    }
  };

  const handleBookDemo = () => {
    scrollToSection('contact');
  };

  return (
    <LandingPageComponent
      onLoginClick={handleLoginClick}
      onGetStarted={handleGetStarted}
      onBookDemo={handleBookDemo}
    />
  );
}
