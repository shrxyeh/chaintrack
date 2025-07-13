import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureShowcase from '../components/FeatureShowcase';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import { setupCardHovers } from '../utils/animations';

export default function LandingPage() {
  useEffect(() => {
    setupCardHovers();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureShowcase />
      <HowItWorks />
      <StatsSection />
      <Footer />
    </div>
  );
}