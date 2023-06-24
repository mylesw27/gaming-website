import React, { useState, useEffect } from 'react';

interface HeroGame {
  _id: string;
  title: string;
  image: string;
  description: string;
  userName: string;
}

interface HeroSectionProps {
  objectIDs: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ objectIDs }) => {
  const [heroGame, setHeroGame] = useState<HeroGame | null>(null);

  const fetchHeroGame = async () => {
    try {
      const objectID = objectIDs[0]; // Assuming only the first objectID is used

      // Make an API request to fetch the hero game data based on the provided objectID
      const response = await fetch(`http://localhost:8000/api-v1/game/${objectID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hero game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the hero game state variable with the fetched data
      setHeroGame(data.game);
    } catch (error) {
      console.error('Error fetching hero game:', error);
    }
  };

  useEffect(() => {
    fetchHeroGame();
  }, [objectIDs]);

  return (
    <div>
      {heroGame ? (
        <div>
          <h1>{heroGame.title}</h1>
          <p>By: {heroGame.userName} </p>
          <img src={heroGame.image} alt={heroGame.title} />
          <p>Description: {heroGame.description}</p>
        </div>
      ) : (
        <p>No hero game found.</p>
      )}
    </div>
  );
};

export default HeroSection;
