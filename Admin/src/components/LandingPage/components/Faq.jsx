import React, { useState } from 'react';
import '../styles/faq.css';

const DEFAULT_FAQS = [
    {
        question: 'Who can use the Student Management Portal?',
        answer: 'The portal is designed for three types of users: students, mentors, and administrators. Each user is given role-based access, meaning they can only view or manage the information relevant to them. Students can check their academic details, mentors can monitor and update performance, and administrators have full control over the system.',
        open: false
    },
    {
        question: 'What features are available in the portal?',
        answer: 'The portal offers a wide range of features including profile management, attendance tracking, academic results, notices, and activity records. All these features are integrated into a single dashboard, making it easy for users to access and manage information without switching between multiple systems.',
        open: false
    },
    {
        question: 'How does the AI chatbot help users?',
        answer: 'The AI-powered chatbot simplifies data access by providing quick summaries of student information. Instead of manually searching through records, users can ask the chatbot and instantly get insights about attendance, performance, and activities. This helps mentors and administrators make faster and more informed decisions.',
        open: false
    },
    {
        question: 'Is the portal accessible on mobile devices?',
        answer: 'Yes, the portal is fully web-based and designed to be responsive across different devices. Users can access it on smartphones, tablets, or desktops without any loss of functionality. This ensures convenience and allows users to stay updated anytime and from anywhere.',
        open: false
    },
    {
        question: 'What happens if there is incorrect or missing data?',
        answer: 'If any data is incorrect or missing, authorized users such as mentors or administrators can easily update and correct it through the system. The portal also includes validation mechanisms to reduce errors, ensuring that the stored information remains accurate and reliable.',
        open: false
    }
];

export default function Faq({ faqs = DEFAULT_FAQS, onSupportClick }) {
    const [faqList, setFaqList] = useState(faqs);

    const toggleFaq = (index) => {
        setFaqList(prev => prev.map((item, i) => ({
            ...item,
            open: i === index ? !item.open : false
        })));
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                <div className="faq-header">
                    <div className="faq-label-badge">
                        <span className="faq-label">FAQ</span>
                    </div>
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">Everything you need to know about the product and billing.</p>
                </div>

                <div className="faq-list">
                    {faqList.map((item, index) => (
                        <div key={index} className={`faq-item ${item.open ? 'faq-item--open' : ''}`}>
                            <button
                                type="button"
                                className="faq-trigger"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={item.open}
                            >
                                <span className="faq-question">{item.question}</span>
                                <svg
                                    className={`faq-icon ${item.open ? 'faq-icon--rotated' : ''}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {item.open && (
                                <div className="faq-content">
                                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="faq-footer">
                    Didn’t find the answer you are looking for?{' '}
                    <a
                        href="#contact"
                        onClick={(e) => {
                            if (onSupportClick) {
                                e.preventDefault();
                                onSupportClick(e);
                            }
                        }}
                    >
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
}
