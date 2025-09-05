import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import TrustIndicators from '../components/home/TrustIndicators';
import ValuePropsSection from '../components/home/ValuePropsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CallToActionSection from '../components/home/CallToActionSection';
import DemoShowcaseSection from '../components/home/DemoShowcaseSection';
import LocationSection from '../components/home/LocationSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <div className="bg-slate-950" id="home">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" id="about">
          <TrustIndicators />
        </section>
        <div id="services">
          <ValuePropsSection />
          <HowItWorksSection />
          <DemoShowcaseSection />
        </div>
        <LocationSection />
        <section id="contact">
          <CallToActionSection />
        </section>
      </div>
    </>
  );
};