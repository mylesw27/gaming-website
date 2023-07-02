'use client'
import Navigation from '../../components/Navigation/page';

import CategoryGames from '../../components/CategoryGames/page'

const Games = () => {
  return (
    <div>
      <Navigation />
      <CategoryGames category='Adventure'/>
      <CategoryGames category='Action'/>
    </div>
  );
};

export default Games;
