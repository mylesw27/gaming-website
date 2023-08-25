'use client'
import React, { useEffect, useState, FormEvent } from 'react';

interface Game {
  title: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
  userId: string;
}

interface GameData {
  title: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
}

const EditGame: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);

  const fetchGame = async (gameId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api-v1/game/${gameId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }
      const data = await response.json();
      return data.game;
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  const gameId = window.location.pathname.split('/').pop();

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId).then((game) => {
        setGame(game);
      });
    }
  }, [gameId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const gameData: GameData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      techstack: formData.get('techstack') as string,
      github: formData.get('github') as string,
      link: formData.get('link') as string,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8000/api-v1/game/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Game uploaded successfully:', data);
        window.location.href = '/profile/games';
      } else {
        console.error('Error uploading game:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading game:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input type="text" name="title" defaultValue={game?.title} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Category:</label>
          <input type="text" name="category" defaultValue={game?.category} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Description:</label>
          <input type="text" name="description" defaultValue={game?.description} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Image:</label>
          <input type="text" name="image" defaultValue={game?.image} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Techstack:</label>
          <input type="text" name="techstack" defaultValue={game?.techstack} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Github:</label>
          <input type="text" name="github" defaultValue={game?.github} required className="w-full p-2 border rounded" />

          <label className="block font-semibold">Deployment:</label>
          <input type="text" name="link" defaultValue={game?.link} required className="w-full p-2 border rounded" />

          <input type="hidden" name="userId" defaultValue={game?.userId} />

          <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700" />
        </div>
      </form>
    </div>
  );
};

export default EditGame;
