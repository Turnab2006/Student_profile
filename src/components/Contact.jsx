import React, { useState } from 'react';
import { LocationIcon, PhoneIcon, ContactIllustration } from './Icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'contact-name': 'name',
      'contact-email': 'email',
      'contact-message': 'message'
    };
    setFormData(prev => ({
      ...prev,
      [fieldMap[id]]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <h3>Contact Us</h3>
          <p>We're here to help—reach out anytime and our support team will get back to you soon.</p>
          
          <div className="contact-info">
            <div className="contact-info-row">
              <LocationIcon />
              <span>Canal S Rd, Beleghata, Kolkata, West Bengal 700015</span>
            </div>
            <div className="contact-info-row">
              <PhoneIcon />
              <span>+91 9853962140</span>
            </div>
          </div>
          
          <div className="contact-illustration">
            <ContactIllustration />
          </div>
        </div>

        <div className="contact-form-wrap">
          {isSubmitted ? (
            <div className="contact-success-state">
              <div className="success-icon">✓</div>
              <h4>Message Sent!</h4>
              <p>Thank you for reaching out to TrackAdemy. Our administration will contact you shortly.</p>
              <button 
                className="contact-submit-btn" 
                onClick={() => setIsSubmitted(false)}
                style={{ width: 'auto', padding: '10px 24px' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="contact-name">Full Name</label>
                <input 
                  id="contact-name" 
                  type="text" 
                  placeholder="Enter Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                />

                <label htmlFor="contact-email">Email Address</label>
                <input 
                  id="contact-email" 
                  type="email" 
                  placeholder="Enter Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                />

                <label htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message" 
                  placeholder="Enter Your Message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                ></textarea>

                <button 
                  type="submit" 
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
