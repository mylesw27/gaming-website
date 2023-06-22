import Navigation from '../../../components/Navigation/page';

// List of games that the user has uploaded
// This page will be a list of games that the user has uploaded
// Under each game will be a link to edit the game


const UserGames = () => {
  return (
    <div>
      <Navigation />
      <h2>Only User Games</h2>
      <a href="/games/edit">Edit</a>
    </div>
  );
};

export default UserGames;