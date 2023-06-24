'use client'
import React from 'react';
import Navigation from '../../../components/Navigation/page';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';


// List of games that the user has uploaded
// This page will be a list of games that the user has uploaded
// Under each game will be a link to edit the game
interface Game {
  userId: number;
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

const UserGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  // This will fetch all the games and then filter by the userId from the jwt. 
  const fetchUserGames = async () => {
    try {
      // Make an API request to fetch random games data
      const response = await fetch(`http://localhost:8000/api-v1/game/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch random games');
      }
      const data = await response.json();
      setGames(data.games)

    } catch (error) {
      console.error('Error fetching user games:', error);
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwt.decode(token) : null;
  const userId = decodedToken? (decodedToken as any).id : null;

  // This will filter the games by the userId
  const userGames = games.filter(game => game.userId === userId);


  useEffect(() => {
    fetchUserGames();
  }
  , []);
  return (
    <div>
      <Navigation />
      <h2>Only User Games</h2>
      <ul>
        {userGames.length > 0 ? (
          userGames.map((game) => (
            <li key={game._id}>
              <a href={`/profile/games/edit/${game._id}`}>
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
};

export default UserGames;