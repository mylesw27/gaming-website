'use client'
import React, { useState, useEffect } from 'react';
import Like from '../Like/Like';
import Link from 'next/link';

interface Game {
  _id: string;
  title: string;
  userName: string;
  userId: number;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
      <div className="col-span-2 md:col-span-1">
        <div className="my-4 text-center">
          {game ? <p className="text-3xl font-bold mb-2">{game.title}</p> : <p>Loading...</p>}
        </div>
        <div className="w-full h-64 rounded-lg overflow-hidden flex justify-center items-center">
          {game ? (
            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="my-4 text-center">
          {game ? <p>Username: <a className='underline' href={`../profile/${game.userId}`}>{game.userName}</a></p> : <p>Loading...</p>}
        </div>
        <div className="my-4 text-center">
          {game ? <p>Category: {game.category}</p> : <p>Loading...</p>}
        </div>
      </div>
      <div className="col-span-1">
        {game ? <Like game={game}/> : <p>Loading...</p>}
        <div className="my-4">
          {game ? <p className="text-xl font-bold text-center">Description:</p> : <p>Loading...</p>}
          {game ? <p className="text-center">{game.description}</p> : null}
        </div>
        <div className="my-4">
          {game ? <p className="text-xl font-bold text-center">Link:</p> : <p>Loading...</p>}
          {game ? <p className="text-center"><a className='underline' href={game.link} target='_blank'> {game.link} </a></p> : null}
        </div>
        <div className="my-4">
          {game ? <p className="text-xl font-bold text-center">Github:</p> : <p>Loading...</p>}
          {game ? <p className="text-center"><a className='underline' href={game.github} target='_blank'> {game.github} </a></p> : null}
        </div>
        <div className="my-4">
          {game ? <p className="text-xl font-bold text-center">TechStack:</p> : <p>Loading...</p>}
          {game ? <p className="text-center">{game.techstack}</p> : null}
        </div>
      </div>
    </div>
  );
  
};

export default GameComponent;
