'use client'
import React from 'react';
import { Brain, Search, Clock } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-10 h-10" />}
            title="AI-Powered Summaries"
            description="Get instant, intelligent summaries of your notes. Focus on writing while AI handles organization."
          />
          <FeatureCard
            icon={<Search className="w-10 h-10" />}
            title="Search Your Notes"
            description="Quickly find what you need with powerful search. Instantly access any note with ease."
          />
          <FeatureCard
            icon={<Clock className="w-10 h-10" />}
            title="Time-Saving"
            description="Spend less time organizing and more time focusing on what matters. Quick access to key insights."
          />
        </div>
      </div>
    </section>
  );
}
