'use client'
import React, { useState, useEffect } from 'react';

interface Game {
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const GameComponent: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);

  const fetchGame = async () => {
    try {
      // Get the game ID from the URL
      const gameID = window.location.pathname.split('/').pop();
      console.log(gameID);

      // Make an API request to fetch the game data
      const response = await fetch(`http://localhost:8000/api-v1/game/${gameID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log(data.game);

      // Update the game state variable with the fetched data
      setGame(data.game);
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <div>
      <div>{game ? <p>Title: {game.title}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Username: {game.userName}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Category: {game.category}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Description: {game.description}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Image: {game.image}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Link: {game.link}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>Github: {game.github}</p> : <p>Loading...</p>}</div>
        <div>{game ? <p>TechStack: {game.techstack}</p> : <p>Loading...</p>}</div>
    </div>
  );
};

export default GameComponent;
