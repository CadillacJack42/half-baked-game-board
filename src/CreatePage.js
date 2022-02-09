import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from './services/fetch-utils';

export default function CreatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  // here's the state you'll need:
  // title;
  // genre;
  // designer;
  // description;
  // minPlayers;
  // maxPlayers;
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [designer, setDesigner] = useState('');
  const [description, setDescription] = useState('');
  const [minPlayers, setMinPlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(1);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    // create a game
    const newGame = {
      title,
      genre,
      designer,
      description,
      min_players: minPlayers,
      max_players: maxPlayers,
    };
    await createGame(newGame);

    // use history.push to send the user to the list page
    history.push('/board-games');
  }

  return (
    <div className="create">
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Add board game</h2>
        <label>
          Title
          {/* on change, set the title in state */}
          <input required name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          Genre
          {/* on change, set the genre in state */}
          <select required onChange={(e) => setGenre(e.target.value)} value={genre}>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
          Designer
          {/* on change, set the designer in state */}
          <input
            required
            name="designer"
            onChange={(e) => setDesigner(e.target.value)}
            value={designer}
          />
        </label>
        <label>
          Min Players
          {/* on change, set the min players in state */}
          <input
            required
            name="min_players"
            onChange={(e) => setMinPlayers(e.target.value)}
            value={minPlayers}
          />
        </label>
        <label>
          Max Players
          {/* on change, set the max players in state */}
          <input
            required
            name="max_players"
            onChange={(e) => setMaxPlayers(e.target.value)}
            value={maxPlayers}
          />
        </label>
        <label>
          Description
          {/* on change, set the description in state */}
          <textarea
            required
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <button>Create game</button>
      </form>
    </div>
  );
}
