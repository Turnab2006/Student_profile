import React, { useState } from 'react';
import '../styles/contact.css';

export default function Contact({
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
