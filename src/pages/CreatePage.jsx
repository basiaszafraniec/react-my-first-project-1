import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const [gameName, setGameName] = useState("");
  const [timeOfPlay, setTimeOfPlay] = useState("");
  const [minPlayers, setMinPlayers] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");
  const [store, setStore] = useState("");
  const [shelfSpace, setShelfSpace] = useState("");

  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newGame = {
      id: Date.now().toString(),
      gameName: gameName,
      timeOfPlay: timeOfPlay,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      difficulty: difficulty,
      image: image,
      store: store,
      shelfSpace: shelfSpace,
    };

    console.log(newGame);

    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];

    gamesData.push(newGame);
    localStorage.setItem("games", JSON.stringify(gamesData));

    navigate("/");
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Create New Game</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="gameName">Game Name</label>
          <input
            id="gameName"
            type="text"
            placeholder="Type a game name"
            onChange={(e) => setGameName(e.target.value)}
          />
          
          <label htmlFor="timeOfPlay">Time of Play (in ')</label>
          <input
            id="timeOfPlay"
            type="text"
            placeholder="Type the time of play"
            onChange={(e) => setTimeOfPlay(e.target.value)}
          />
          
          <label htmlFor="minPlayers">Min. Players</label>
          <input
            id="minPlayers"
            type="number"
            placeholder="Type the minimum number of players"
            onChange={(e) => setMinPlayers(e.target.value)}
          />
          
          <label htmlFor="maxPlayers">Max. Players</label>
          <input
            id="maxPlayers"
            type="number"
            placeholder="Type the maximum number of players"
            onChange={(e) => setMaxPlayers(e.target.value)}
          />
          
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label htmlFor="store">Select Store</label>
          <select id="store" onChange={(e) => setStore(e.target.value)}>
            <option value="">Select a store</option>
            <option value="Vestergade">Vestergade</option>
            <option value="Fredensgade">Fredensgade</option>
            <option value="Aalborg">Aalborg</option>
          </select>

          <label htmlFor="shelfSpace">Shelf Space</label>
          <input
            id="shelfSpace"
            type="text"
            placeholder="Type the shelf space"
            onChange={(e) => setShelfSpace(e.target.value)}
          />

          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            placeholder="Paste image url"
            onChange={(e) => setImage(e.target.value)}
          />
          
          <label htmlFor="image-preview"></label>
          <img
            id="image-preview"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={(e) =>
              (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")
            }
          />

          <div className="btns">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
