import React, { useState, useEffect } from 'react';


interface Game {
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

interface Props {
  category: string;
}

const CategoryGames: React.FC<Props> = ({ category }) => {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGamesByCategory = async () => {
    try {
      // Make an API request to fetch games data by category
      const response = await fetch(`http://localhost:8000/api-v1/game/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch games for category: ${category}`);
      }

      // Parse the response data as JSON
      const data = await response.json();
      // Update the games state variable with the fetched data
      setGames(data.games);
    } catch (error) {
      console.error(`Error fetching games for category ${category}:`, error);
    }
  };

  useEffect(() => {
    fetchGamesByCategory();
  }, [category]);

  return (
    <div>
      <h2>{category} Games</h2>
      <div className="carousel">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game._id} className="carousel-item">
              <a href={`/games/${game._id}`}>
                <h3>{game.title}</h3>
              </a>
              <img src={game.image} alt={game.title} width={50} height={50} />
              <p>Category: {game.category}</p>
              <p>Description: {game.description}</p>
              <p>By: {game.userName}</p>
            </div>
          ))
        ) : (
          <div>No games found.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryGames;
