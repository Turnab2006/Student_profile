import React from 'react';
import './styles/landing-page.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Overview from './components/Overview';
import Faq from './components/Faq';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Trackademy Landing Page Component
 * 
 * Fully self-contained, modular, and compatible with Tailwind CSS.
 * Can be dropped directly into any React project with Tailwind CSS or custom CSS.
 * 
 * @param {Object} props
 * @param {Function} [props.onLoginClick] Callback when login button is clicked
 * @param {Function} [props.onGetStarted] Callback for Get Started CTA
 * @param {Function} [props.onBookDemo] Callback for Book Demo CTA
 * @param {Function} [props.onContactSubmit] Callback when contact form is submitted (receives form data)
 * @param {string} [props.className] Additional CSS class names to attach to root container
 */
export default function LandingPage({
    onLoginClick,
    onGetStarted,
    onBookDemo,
    onContactSubmit,
    className = '',
}) {
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

// Named exports for individual sections if needed
export {
    Navbar,
    Hero,
    Feature,
    Overview,
    Faq,
    Team,
    Contact,
    Footer,
};
