import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GradientDefs } from './components/Icons';

function App() {
  return (
    <>
      <GradientDefs />
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
