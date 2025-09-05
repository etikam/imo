import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IllustrationSection } from '../components/home/IllustrationSection';
import { FeaturedPropertiesSection } from '../components/home/FeaturedPropertiesSection';
import TrustIndicators from '../components/home/TrustIndicators';
import ValuePropsSection from '../components/home/ValuePropsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CallToActionSection from '../components/home/CallToActionSection';
import DemoShowcaseSection from '../components/home/DemoShowcaseSection';
import LocationSection from '../components/home/LocationSection';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <IllustrationSection />
      <div className="relative" id="home">
        <AnimatedBackground />
        {/* Featured Properties - Overlay clair */}
        <div className="relative z-10">
          <div className="absolute inset-0 bg-white/15 backdrop-blur-[2px]" />
          <FeaturedPropertiesSection />
        </div>
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" id="about">
          <TrustIndicators />
        </section>
        <div id="services" className="relative z-10">
          <ValuePropsSection />
          <HowItWorksSection />
          <DemoShowcaseSection />
        </div>
        <div className="relative z-10">
          <LocationSection />
        </div>
        <section id="contact" className="relative z-10">
          <CallToActionSection />
        </section>
      </div>
    </>
  );
};