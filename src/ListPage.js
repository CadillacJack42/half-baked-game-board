import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default function ListPage({ user }) {
  // you'll need some state to hold onto the array of games
  const [games, setGames] = useState([]);

  // fetch the games on load and inject them into state

  useEffect(() => {
    const fetchGames = async () => {
      const gamesList = await getGames();
      setGames(gamesList);
    };
    user ? fetchGames() : null;
  }, [user]);

  return (
    <div className="list games">
      {/* map through the games in state and render Game components */}
      {games.map((game, i) => {
        return <Game key={game.title + i} game={game} />;
      })}
    </div>
  );
}
