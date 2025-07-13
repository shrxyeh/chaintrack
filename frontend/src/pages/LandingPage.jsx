import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureShowcase from '../components/FeatureShowcase';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import { setupCardHovers } from '../utils/animations';

export default function LandingPage() {
  useEffect(() => {
    // Initialize animations with proper timing
    const timer = setTimeout(() => {
      setupCardHovers();
    }, 500);
    
    return () => clearTimeout(timer);
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