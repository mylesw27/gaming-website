'use client'
import React from 'react';
import Navigation from '../components/Navigation/page'
import Random from '../components/Random/page';
import NewGames from '../components/NewGames/page';
import HeroSection from '../components/HeroSection/page';

// Grab games from API and 

export default function Landing() {

  const objectIDs = ['648ef4e763c484e397d5dfa3']

  return (
    <div className="text-slate-300 bg-gradient-to-b from-gray-800 to-gray-950 h-screen">
      <div>
        <Navigation />
        <h1>Discover Amazing Designs</h1>
        <p>Be inspired by talented designers around the world.</p>
        <HeroSection objectIDs={objectIDs}/>
        <Random />
        <NewGames />
      </div>
      <footer>
        <p>© 2023 Website</p>
      </footer>
    </div>
  );
}