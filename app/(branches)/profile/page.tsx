'use client'
import React, { use } from 'react';
import PasswordReset from '../../components/PasswordReset/page';
import Navigation from '../../components/Navigation/page';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';

const handlePasswordReset = async (newPassword: string) => {
  try {
    // Get the user ID from the jwt payload
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      console.log('Decoded token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const userId = decodedToken.id;

    console.log('User ID from JWT:', userId);
    console.log('Decoded token:', decodedToken);

    // Make a PUT request to update the user's password
    const response = await fetch(`http://localhost:8000/api-v1/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (response.ok) {
      console.log('Password reset successful!');
      // Perform any additional actions upon successful password reset
    } else {
      console.log('Password reset failed.');
      // Handle error scenario, such as displaying an error message to the user
    }
  } catch (error) {
    console.log('An error occurred during password reset:', error);
    // Handle error scenario
  }
};

const handleUpdateBio = async (newBio: string) => {
  try {
    // Get the user ID from the jwt payload
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      console.log('Decoded token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const userId = decodedToken.id;

    console.log('User ID from JWT:', userId);
    console.log('Decoded token:', decodedToken);

    // Make a PUT request to update the user's bio
    const response = await fetch(`http://localhost:8000/api-v1/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio: newBio }),
    });

    if (response.ok) {
      console.log('Bio update successful!');
      // Perform any additional actions upon successful bio update
    } else {
      console.log('Bio update failed.');
      // Handle error scenario, such as displaying an error message to the user
    }
  } catch (error) {
    console.log('An error occurred during bio update:', error);
  }
}

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

  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Token not found.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken || typeof decodedToken !== 'object') {
    console.log('Decoded token not found or invalid.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }
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

  const userId = decodedToken? (decodedToken as any).id : null;

  // This will filter the games by the userId
  const userGames = games.filter(game => game.userId === userId);


  useEffect(() => {
    fetchUserGames();
    setBio((decodedToken as any).bio);
  }
  , []);

  const deleteGame = async (gameId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api-v1/game/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }); 
      console.log(gameId)
    } catch (error) {
      console.error('Error deleting game:', error);
    }
    fetchUserGames();
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Hi {decodedToken.name}</h2>
      <PasswordReset onSubmit={handlePasswordReset} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Update your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border rounded w-full py-2 px-3"
        />
        <button
          onClick={() => handleUpdateBio(bio)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
        >
          Update Bio
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6">Your Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userGames.length > 0 ? (
            userGames.map((game) => (
              <div key={game._id} className="flex flex-col items-center space-y-6">
                <a href={`/profile/games/edit/${game._id}`} className="text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-semibold mb-4">{game.title}</h3>
                </a>
                <img src={game.image} alt={game.title} className="w-24 h-24 rounded-full" />
                <p className="text-base md:text-lg">Category: {game.category}</p>
                <p className="text-base md:text-lg">Description: {game.description}</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => deleteGame(game._id)}
                >
                  Delete Game
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Upload a Game
        </button>
      </a>
    </div>
    </div>
  );

};


export default Profile;
