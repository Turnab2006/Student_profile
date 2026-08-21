import React from 'react';
import '../styles/hero.css';
import pngImg from '../assets/png.png';
import secureIcon from '../assets/secure.svg';
import seamlessIcon from '../assets/seamless.svg';
import smartIcon from '../assets/smart.svg';

export default function Hero({
    onGetStarted,
    onBookDemo,
    heroImage = pngImg,
}) {
    return (
        <section className="hero" id="home">
            <div className="tlp-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="tag">
                            <span>😊</span> All-in-One Educational Platform
                        </div>
                        <h2>
                            One Platform.<br />Three Portals.<br />
                            <span className="highlight">Infinite Possibilities.</span>
                        </h2>
                        <div className="button-div">
                            <button
                                type="button"
                                className="btn btn-primary"
                                id="get-started"
                                onClick={onGetStarted}
                            >
                                Get Started
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="demo-btn"
                                onClick={onBookDemo}
                            >
                                Book Demo
                            </button>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={heroImage} alt="Trackademy Dashboard Preview" />
                    </div>

                    {/* Features Below Hero */}
                    <div className="feature-wrapper">
                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={secureIcon} alt="Secure Icon" />
                            </div>
                            <div className="text">
                                <h3>Secure</h3>
                                <p>Role-based Access</p>
                            </div>
                        </div>

                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={seamlessIcon} alt="Seamless Icon" />
                            </div>
                            <div className="text">
                                <h3>Seamless</h3>
                                <p>Cloud Experience</p>
                            </div>
                        </div>

                        <div className="feature-box">
                            <div className="icon-box">
                                <img src={smartIcon} alt="Smart Icon" />
                            </div>
                            <div className="text">
                                <h3>Smart</h3>
                                <p>Data-Driven Insights</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
