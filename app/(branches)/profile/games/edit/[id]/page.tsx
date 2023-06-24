'use client'
import Navigation from '../../../../../components/Navigation/page';
import React, { useEffect, useState, FormEvent } from 'react';

// Define the Game type
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

// Define the GameData type
interface GameData {
  title: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
}

// Make the data available to be edited in the form
const EditGame: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);

  // Fetch the game data from the API
  const fetchGame = async (gameId: string) => {
    try {
      // Make an API request to fetch the game data
      const response = await fetch(`http://localhost:8000/api-v1/game/${gameId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log(data.game);

      // Return the game data
      return data.game;
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  // Get the game ID from the URL
  const gameId = window.location.pathname.split('/').pop();

  // Fetch the game data from the API
  useEffect(() => {
    if (gameId) {
      fetchGame(gameId).then((game) => {
        setGame(game);
      });
    }
  }, [gameId]);

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Get the form data from the event
    const formData = new FormData(event.currentTarget);

    // Convert the form data into a JSON object
    const gameData: GameData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      techstack: formData.get('techstack') as string,
      github: formData.get('github') as string,
      link: formData.get('link') as string,
    };

    // Get the token from local storage
    const token = localStorage.getItem('token');
    
    // Make a fetch request to upload the game
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
    <div>
      <Navigation />
      <h2>Edit Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" defaultValue={game?.title} required />

          <label>Category:</label>
          <input type="text" name="category" defaultValue={game?.category} required />

          <label>Description:</label>
          <input type="text" name="description" defaultValue={game?.description} required />

          <label>Image:</label>
          <input type="text" name="image" defaultValue={game?.image} required />

          <label>Techstack:</label>
          <input type="text" name="techstack" defaultValue={game?.techstack} required />

          <label>Github:</label>
          <input type="text" name="github" defaultValue={game?.github} required />

          <label>Deployment:</label>
          <input type="text" name="link" defaultValue={game?.link} required />

          <input type="hidden" name="userId" defaultValue={game?.userId} />

          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default EditGame;
