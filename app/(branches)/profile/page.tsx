'use client';
import React, { useState, useEffect } from 'react';
import PasswordReset from '../../components/PasswordReset/page';
import jwt from 'jsonwebtoken';
import { ProfileForm } from '@/app/components/ProfileForm/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token as string);

  useEffect(() => {
    if (!token || typeof decodedToken !== 'object') {
      console.error('Token not found or invalid.');
      // Handle error scenario, such as redirecting to the login page
      return;
    }

    const userId = decodedToken?.id;

    const fetchUserGames = async () => {
      try {
        // Make an API request to fetch random games data
        const response = await fetch(`${apiUrl}/api-v1/game/all`);
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
        `${apiUrl}/api-v1/game/${gameId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token as string,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting game:', error);
    }
    fetchUserGames();
  };

  return (
    <>
    {token ?
      <div className="p-6 bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6 text-white">
        Hi{' '}
        {decodedToken && typeof decodedToken === 'object'
          ? decodedToken.name
          : ''}
      </h2>
      <ProfileForm />
          <div>
            <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:mb-6 pt-9 text-white">
              Your Games
            </h2>
            <Button
              variant="secondary"
              className="py-2 px-4 mb-4 md:mb-6"
              onClick={() => (window.location.href = 'profile/upload')}
            >
              Upload a Game
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {userGames.length > 0 ? (
                userGames.map((game) => (
                  <Card key={game._id}>
                    <CardHeader>
                      <CardTitle className="text-3xl md:text-5xl font-semibold mb-4">
                        {game.title}
                      </CardTitle>
                      <CardDescription>
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-48 object-cover mb-4 md:mb-6 rounded-lg"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base md:text-lg">
                        Category: {game.category}
                      </p>
                      <p className="text-base md:text-lg">
                        Description: {game.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 px-4">
                      <div className="flex-grow">
                        <Button
                          className="w-full md:w-auto" // This ensures the button takes the full width on mobile and auto width on desktop
                          variant="destructive"
                          onClick={() => deleteGame(game._id)}
                        >
                          Delete Game
                        </Button>
                      </div>

                      <div className="flex-grow">
                        <Button
                          className="w-full md:w-auto"
                          variant="default"
                          onClick={() =>
                            (window.location.href = `/profile/blog/${game._id}`)
                          }
                        >
                          Blog Posts
                        </Button>
                      </div>

                      <div className="flex-grow">
                        <Button
                          className="w-full md:w-auto"
                          variant="default"
                          onClick={() =>
                            (window.location.href = `/profile/games/edit/${game._id}`)
                          }
                        >
                          Edit Game
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-gray-600">No games found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    :
    <div className="p-6 bg-gray-800"></div>
    }
    </>
  );
};

export default Profile;
function fetchUserGames() {
  throw new Error('Function not implemented.');
}
