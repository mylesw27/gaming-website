'use client';
import React, { useState, useEffect } from 'react';
import Like from '../Like/Like';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

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
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const copyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Link copied to clipboard');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 justify-center items-center  bg-gray-800 px-64 text-gray-200">
      <div className="col-span-1 md:col-span-1">
        <div className="my-4 text-center">
          {game ? (
            <p className="text-3xl font-bold mb-2">{game.title}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-full h-64 rounded-lg overflow-hidden flex justify-center items-center">
          {game ? (
            <img
              src={game.image || 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'}
              alt={game.title}
              onError={(e) => {
                e.currentTarget.src = 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <p>Loading...</p>
          )}
          {game ? 
            <div className='absolute'>
              <Like game={game} /> 
            </div>
          : 
            <p>Loading...</p>
          }
        </div>
        <div className="my-4 text-center">
          {game ? (
            <p>
              Username:{' '}
              <a className="underline" href={`../profile/${game.userId}`}>
                {game.userName}
              </a>
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="my-4 text-center">
          {game ? <p>Category: {game.category}</p> : <p>Loading...</p>}
        </div>
        <div className="my-4">
          <p className="text-xl font-bold text-center">Share:</p>
          <div className="flex justify-center space-x-4">
            <FacebookShareButton url={window.location.href}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Share on Facebook
              </button>
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                Share on Twitter
              </button>
            </TwitterShareButton>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={copyLink}
            >
              Copy Link
            </button>
          </div>
        </div>
        <div className="my-4">
          {game ? (
            <p className="text-xl font-bold text-center">Description:</p>
          ) : (
            <p>Loading...</p>
          )}
          {game ? <p className="text-center">{game.description}</p> : null}
        </div>
        <div className="my-4">
          {game ? (
            <p className="text-xl font-bold text-center">Link:</p>
          ) : (
            <p>Loading...</p>
          )}
          {game ? (
            <p className="text-center">
              <a className="underline" href={game.link} target="_blank">
                {' '}
                {game.link}{' '}
              </a>
            </p>
          ) : null}
        </div>
        <div className="my-4">
          {game ? (
            <p className="text-xl font-bold text-center">Github:</p>
          ) : (
            <p>Loading...</p>
          )}
          {game ? (
            <p className="text-center">
              <a className="underline" href={game.github} target="_blank">
                {' '}
                {game.github}{' '}
              </a>
            </p>
          ) : null}
        </div>
        <div className="my-4">
          {game ? (
            <p className="text-xl font-bold text-center">TechStack:</p>
          ) : (
            <p>Loading...</p>
          )}
          {game ? <p className="text-center">{game.techstack}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
