'use client'
import React from 'react';
import Navigation from '../components/Navigation/page'
import Random from '../components/Random/page';
import NewGames from '../components/NewGames/page';
import HeroSection from '../components/HeroSection/page';

// Grab games from API and 

export default function Landing() {

  const objectIDs = ['648b504e826d1d431510d8bc']

  return (
    <div>
      <div>
        <Navigation />
        <h1>Discover Amazing Designs</h1>
        <p>Be inspired by talented designers around the world.</p>
        <Random />
        <NewGames />
        <HeroSection objectIDs={objectIDs}/>
      </div>
      <footer>
        <p>© 2023 Website</p>
      </footer>
    </div>
  );
}