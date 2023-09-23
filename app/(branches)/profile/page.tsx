'use client'
import React, { useState, useEffect } from 'react';
import PasswordReset from '../../components/PasswordReset/page';
import jwt from 'jsonwebtoken';
import { ProfileForm } from '@/app/components/ProfileForm/page';

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

const Profile = () => {
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);

  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token as string);

  useEffect(() => {
    if (!token || typeof decodedToken !== 'object') {
      console.log('Token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const userId = decodedToken?.id;

    const fetchUserGames = async () => {
      try {
        // Make an API request to fetch random games data
        const response = await fetch(`http://localhost:8000/api-v1/game/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch random games');
        }
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error('Error fetching user games:', error);
      }
    };

    // This will fetch all the games and then filter by the userId from the jwt.
    fetchUserGames();
    setBio(decodedToken?.bio || '');
  }, [decodedToken, setBio, token]);

  const userId = decodedToken ? (decodedToken as any).id : null;

  // This will filter the games by the userId
  const userGames = games.filter((game) => game.userId === userId);

  const deleteGame = async (gameId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api-v1/game/${gameId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token as string,
          },
        }
      );
      console.log(gameId);
    } catch (error) {
      console.error('Error deleting game:', error);
    }
    fetchUserGames();
  };



  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Hi {decodedToken && typeof decodedToken === 'object' ? decodedToken.name : ''}</h2>
      <ProfileForm />

     
      <div>
        <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6">
          Your Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userGames.length > 0 ? (
            userGames.map((game) => (
              <div
                key={game._id}
                className="flex flex-col items-center space-y-6"
              >
               
                  <h3 className="text-3xl md:text-5xl font-semibold mb-4">
                    {game.title}
                  </h3>
         
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-24 h-24 rounded-full"
                />
                <p className="text-base md:text-lg">
                  Category: {game.category}
                </p>
                <p className="text-base md:text-lg">
                  Description: {game.description}
                </p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => deleteGame(game._id)}
                >
                  Delete Game
                </button>
                <button
        onClick={() => (window.location.href = '/profile/blog')}
        className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
      >
        Blog Post Form
      </button>
      <button
        onClick={() => (window.location.href = '/profile/games/edit/${game._id}')}
        className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
      >
        Edit Game Info
      </button>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No games found.</div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <a href="/profile/upload">
          <button className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Upload a Game
          </button>
        </a>
      </div>
    </div>
  );
};

export default Profile;
function fetchUserGames() {
  throw new Error('Function not implemented.');
}

