'use client'
import React, { useState, useEffect } from 'react';

interface Game {
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const Random: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  const fetchRandomGames = async () => {
    try {
      // Make an API request to fetch random games data
      const response = await fetch(`http://localhost:8000/api-v1/game/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch random games');
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the games state variable with the fetched data
      setGames(data.games.slice(0, 10))
    } catch (error) {
      console.error('Error fetching random games:', error);
    }
  };

  useEffect(() => {
    fetchRandomGames();
  }
  , []);


  return (
    <div>
      <h2>Discover</h2>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game._id}>
              <a href={`/games/${game._id}`}>
                <h3>{game.title}</h3>
              </a>
              <img src={game.image} alt={game.title} width={50} height={50} />
              <p>{game.category}</p>
              <p>{game.description}</p>
            </li>
          ))
        ) : (
          <li>No games found.</li>
        )}
      </ul>
    </div>
  );
        }  

export default Random;
