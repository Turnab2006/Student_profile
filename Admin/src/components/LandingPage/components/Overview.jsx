import React from 'react';
import '../styles/overview.css';

export default function Overview() {
    return (
        <section className="overview-section" id="about">
            <div className="overview-container">
                <div className="overview-header">
                    <div className="overview-label-badge">
                        <span className="overview-label">Portals Overview</span>
                    </div>
                    <h2 className="overview-title">Beautiful analytics to grow smarter</h2>
                    <p className="overview-subtitle">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <div className="overview-rows">
                    {/* Row 1 */}
                    <div className="overview-row">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Share team inboxes</h3>
                            </div>
                            <p className="overview-row-desc">
                                Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Leverage automation to move fast",
                                    "Always give customers a human to chat to",
                                    "Automate customer support and close leads faster",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--left">
                                <img
                                    alt="Dashboard mockup showing application interface"
                                    src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="overview-row overview-row--reverse">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Deliver instant answers</h3>
                            </div>
                            <p className="overview-row-desc">
                                An all-in-one customer service platform that helps you balance everything your customers need to be happy.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Keep your customers in the loop with live chat",
                                    "Embed help articles right on your website",
                                    "Customers never have to leave the page to find an answer",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--right">
                                <img
                                    alt="Dashboard mockup showing application interface"
                                    src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="overview-row">
                        <div className="overview-text-col">
                            <div className="overview-title-container">
                                <div className="overview-icon-box">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                        <path d="M18 17V9M12 17V7M6 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="overview-row-title">Manage your team with reports</h3>
                            </div>
                            <p className="overview-row-desc">
                                Measure what matters with Trackademy's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.
                            </p>
                            <ul className="overview-checklist">
                                {[
                                    "Filter, export, and drilldown on the data quickly",
                                    "Save, schedule, and automate reports to your inbox",
                                    "Connect the tools you already use with 100+ integrations",
                                ].map((feat, idx) => (
                                    <li key={idx} className="overview-check-item">
                                        <div className="overview-check-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="#7F56D9" strokeWidth="2" fill="#F9F5FF" />
                                                <path d="M8.5 12.5L11 15L15.5 9" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="overview-image-col">
                            <div className="overview-mockup overview-mockup--left">
                                <img
                                    alt="Dashboard mockup showing application interface"
                                    src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
