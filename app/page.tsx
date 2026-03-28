'use client';

import { LandingHero } from '@/components/landing-hero';
import { LandingFeatures } from '@/components/landing-features';
import { LandingCTA } from '@/components/landing-cta';
import { LandingFooter } from '@/components/landing-footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
      <Navbar />
      <LandingHero />
      <LandingFeatures />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
