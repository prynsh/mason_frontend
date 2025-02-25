import React from 'react';
import Header from './components/Header';
import HeroSection from './components/heroSection';
import FeaturesSection from './components/FeatureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header/>
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
