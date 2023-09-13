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
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 justify-center bg-gray-800 px-64 text-gray-200 h-screen">
      {/* Game Header */}
      <div className='col-span-1 lg:col-span-2'>
        <div className="my-4 text-center">
          {game ? (
            <p className="text-3xl font-bold mb-2">{game.title}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="my-4 text-center">
            {game ? (
              <p>
                By:{' '}
                <a className="underline" href={`../profile/${game.userId}`}>
                  {game.userName}
                </a>
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
      </div>
      {/* ---- Column 1 ---- */}
      <div className="col-span-1 md:col-span-1 row-span-1 ">
        <div className="w-full h-64 rounded-lg flex justify-center items-center relative">
          {game ? (
            <div className='h-full rounded-lg flex justify-center items-center relative'>
              <img
                src={game.image || 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'}
                alt={game.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://ucarecdn.com/5df07fe1-89d2-44b5-be91-004613f1e288/NYD.svg'
                }}
                className="h-full rounded-lg ob"
              />
              <div className='absolute left-2 top-64 flex justify-center space-x-4'>
                <Like game={game} /> 
                  <div className="flex justify-center space-x-4">
                    <FacebookShareButton url={window.location.href}>
                      <button
                        className="bg-gray-300 bg-opacity-60 hover:bg-opacity-70 text-gray-800 font-semibold h-10 w-10 rounded-full flex justify-center items-center"
                        onClick={copyLink}
                      >
                        <TbBrandFacebook className='text-center content-center justify-center text-2xl text-blue-900'/>
                      </ button>
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <button
                        className="bg-gray-300 bg-opacity-60 hover:bg-opacity-70 text-gray-800 font-semibold h-10 w-10 rounded-full flex justify-center items-center"
                        onClick={copyLink}
                      >
                        <TbBrandTwitter className='text-center content-center justify-center text-2xl text-blue-400'/>
                      </ button>
                    </TwitterShareButton>
                    <div>
                      <button
                        className="bg-gray-300 bg-opacity-60 hover:bg-opacity-70 text-gray-800 font-semibold h-10 w-10 rounded-full flex justify-center items-center"
                        onClick={copyLink}
                      >
                        <TbCopy className='text-center content-center justify-center text-2xl'/>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
        {/* ---- Column 2 ---- */}
      <div className='lg:col-span-1'>
        <div>
          <div className="my-4 text-center">
            {game ? <p>Category: {game.category}</p> : <p>Loading...</p>}
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
    </div>
  );
};

export default GameComponent;
