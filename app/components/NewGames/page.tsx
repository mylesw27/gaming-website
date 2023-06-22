'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
      // Sort the games by date created
      setGames(data.games.sort ((a: Game, b: Game) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }).slice(0, 10))
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
      <h2>New</h2>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game._id}>
              <Link href={`/games/${game._id}`} as={`/games/${game._id}`} passHref>
                <h3>{game.title}</h3>
              </Link>
              <p>{game.image}</p>
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
