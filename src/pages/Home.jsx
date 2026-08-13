import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import CertificatesSection from '../components/CertificatesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="font-heebo">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
