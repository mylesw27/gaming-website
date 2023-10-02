'use client';
import React, { useState, useEffect } from 'react';
import Like from '../Like/Like';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { TbCopy, TbBrandFacebook, TbBrandTwitter } from 'react-icons/tb'

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
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);

  const fetchGame = async () => {
    try {
      // Get the game ID from the URL
      const gameID = window.location.pathname.split('/').pop();
      console.log(gameID);

      // Make an API request to fetch the game data
      const response = await fetch(
        `http://localhost:8000/api-v1/game/${gameID}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log(data.game);

      // Update the game state variable with the fetched data
      setGame(data.game);

      const likeResponse = await fetch(
        `http://localhost:8000/api-v1/like/game/${gameID}/`
      );
      const likeData = await likeResponse.json();
      setNumberOfLikes(likeData.likes);
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  console.log(numberOfLikes)

  

  return (
    <div className="container mx-auto p-8 text-white ">
      {/* Game Header */}
      <div className="text-center mb-8 ">
        {game ? (
          <h1 className="text-4xl font-bold">{game.title}</h1>
        ) : (
          <p>Loading...</p>
        )}
        {game && (
          <p>
            By:{' '}
            <a className="underline" href={`../profile/${game.userId}`}>
              {game.userName}
            </a>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-700 rounded-lg">
        {/* Game Image */}
        <div className="md:col-span-1 ">
          {game ? (
            <div className="w-full h-97  overflow-hidden relative rounded-l-lg">
              <img
                src={game.image || 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'}
                alt={game.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-4 p-4 bg-white bg-opacity-50 text-black">
                <Like game={game}/>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Game Details */}
        <div className="md:col-span-1 p-9">
          {game ? (
            <div>
              <div className="mb-4">
                <p className="text-xl font-bold">Category:</p>
                <p>{game.category}</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Description:</p>
                <p>{game.description}</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Link:</p>
                <a className="underline" href={game.link} target="_blank" rel="noopener noreferrer">
                  {game.link}
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">Github:</p>
                <a className="underline" href={game.github} target="_blank" rel="noopener noreferrer">
                  {game.github}
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">TechStack:</p>
                <p>{game.techstack}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default GameComponent;
