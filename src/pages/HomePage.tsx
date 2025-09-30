import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { WelcomePopup } from '../components/ui/WelcomePopup';
import { HeroSection } from '../components/home/HeroSection';
import { IllustrationSection } from '../components/home/IllustrationSection';
import { FeaturedPropertiesSection } from '../components/home/FeaturedPropertiesSection';
import TrustIndicators from '../components/home/TrustIndicators';
import ValuePropsSection from '../components/home/ValuePropsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CallToActionSection from '../components/home/CallToActionSection';
import DemoShowcaseSection from '../components/home/DemoShowcaseSection';
import LocationSection from '../components/home/LocationSection';
// import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { SectionDivider } from '../components/ui/SectionDivider';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const scrollToHash = () => {
      if (!location.hash) return;
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    // Ensure sections are mounted
    const id = window.setTimeout(scrollToHash, 0);
    return () => window.clearTimeout(id);
  }, [location.hash]);

  useEffect(() => {
    // Affiche le popup à la première arrivée sur Home après login
    if (currentUser && sessionStorage.getItem('welcomed') !== '1') {
      setShowWelcome(true);
      sessionStorage.setItem('welcomed', '1');
    }
  }, [currentUser]);

  return (
    <>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="illustration">
        <IllustrationSection />
      </div>
      <SectionDivider />
      <div className="relative" id="home">
        {/* AnimatedBackground removed to avoid double animated layers */}
        {/* Featured Properties - Overlay clair */}
        <div className="relative z-10" id="featured">
          <FeaturedPropertiesSection />
        </div>
        <SectionDivider />
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" id="about">
          <TrustIndicators />
        </section>
        <SectionDivider />
        <div id="services" className="relative z-10">
          <ValuePropsSection />
          <HowItWorksSection />
          <div id="demo">
            <DemoShowcaseSection />
          </div>
        </div>
        <SectionDivider />
        <div className="relative z-10">
          <LocationSection />
        </div>
        <SectionDivider />
        <section id="contact" className="relative z-10">
          <CallToActionSection />
        </section>
      </div>
      {showWelcome && (
        <WelcomePopup userType={currentUser?.user_type ?? null} onClose={() => setShowWelcome(false)} />
      )}
    </>
  );
};