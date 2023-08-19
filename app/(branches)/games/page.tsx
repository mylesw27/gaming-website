'use client'
import Navigation from '../../components/Navigation/page';
import CategoryGames from '../../components/CategoryGames/page'

const Games = () => {
  return (
    <div>
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
