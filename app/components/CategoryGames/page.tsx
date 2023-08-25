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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesPerPage = 6;

  const fetchGamesByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api-v1/game/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch games for category: ${category}`);
      }
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
      console.error(`Error fetching games for category ${category}:`, error);
    }
  };

  useEffect(() => {
    fetchGamesByCategory();
  }, [category]);

  const handleNextClick = () => {
    const totalPages = Math.ceil(games.length / gamesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * gamesPerPage;
  const displayedGames = games.slice(startIndex, startIndex + gamesPerPage);

  return (
    <div className='text-slate-300 bg-gray-800 py-9'>
      <h2 className="text-slate-300 bg-gray-800 text-2xl font-bold mb-4 md:text-3xl md:mb-6 text-center">
        {category} Games
      </h2>
      <div className="flex justify-center mt-4 text-slate-300 bg-gray-800 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePreviousClick}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
      <div className="carousel grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedGames.length > 0 ? (
          displayedGames.map((game) => (
            <div key={game._id} className="carousel-item p-4 text-slate-300 bg-gray-700 rounded-lg">
              <a href={`/games/${game._id}`}>
                <h3 className="text-lg font-bold mb-2 md:text-xl">{game.title}</h3>
              </a>
              <div className="w-full h-64 md:h-80 lg:h-96">
              <a href={`/games/${game._id}`}>
                <img src={game.image} alt={game.title} className="object-cover w-full h-full rounded-lg" />
              </a>
              </div>
              <p className="text-sm text-slate-300 mb-2 md:text-base">Category: {game.category}</p>
              <p className="text-sm text-slate-300 mb-2 md:text-base">Description: {game.description}</p>
              <p className="text-sm text-slate-300">By: {game.userName}</p>
            </div>
          ))
        ) : (
          <div className="text-red-500">No games found.</div>
        )}
      </div>
    </div>
  );
}

export default CategoryGames;
