'use client'
import CategoryGames from '../../components/CategoryGames/page';
import { SetStateAction, useState } from 'react';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('Action');
  const availableCategories = [
    'Action',
    'Adventure',
    'Strategy',
    'RPG',
    'Puzzle',
    'Simulation',
    'Sports',
    'Racing',
    'CardandBoard',
    'Casual',
    'MMO',
    'Arcade',
  ];

  const handleCategoryChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Redirect to the selected category page
    window.location.href = `/games/categories/${selectedCategory}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">View Games</button>
      </form>
      {/* Conditionally render CategoryGames components */}
      {availableCategories.map((category) => (
        <CategoryGames key={category} category={category} />
      ))}
    </div>
  );
};

export default Games;
