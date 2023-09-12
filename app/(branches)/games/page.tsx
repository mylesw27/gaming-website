'use client'
import CategoryGames from '../../components/CategoryGames/page'
import { SetStateAction, useState } from 'react';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('Action');

  const handleCategoryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Redirect to the selected category page
    window.location.href = `/games/categories/${selectedCategory}`;
  };
  
  return (
    
    <div>
 <form onSubmit={handleSubmit}>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Strategy">Strategy</option>
          <option value="RPG">RPG</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Simulation">Simulation</option>
          <option value="Sports">Sports</option>
          <option value="Racing">Racing</option>
          <option value="CardandBoard">Card and Board</option>
          <option value="Casual">Casual</option>
          <option value="MMO">MMO</option>
          <option value="Arcade">Arcade</option>
        </select>
        <button type="submit">View Games</button>
      </form>
      <CategoryGames category='Action'/>
      <CategoryGames category='Adventure'/>
      <CategoryGames category='Strategy'/>
      <CategoryGames category='RPG'/>
      <CategoryGames category='Puzzle'/>
      <CategoryGames category='Simulation'/>
      <CategoryGames category='Sports'/>
      <CategoryGames category='Racing'/>
      <CategoryGames category='CardandBoard'/>
      <CategoryGames category='Casual'/>
      <CategoryGames category='MMO'/>
      <CategoryGames category='Arcade'/>
    </div>
  );
};

export default Games;
