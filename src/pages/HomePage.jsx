import { useEffect, useState } from "react";
import Game from "../components/Game.jsx";

export default function HomePage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    initializeGames(); // Initialize and merge default games if none exist
    getGames();

    function getGames() {
      const data = localStorage.getItem("games");
      let gamesData = [];

      if (data) {
        gamesData = JSON.parse(data);
      }

      const defaultGames = getDefaultGames(); // Get default games array
      // Merge default games with any existing games (prevent duplicates based on ID)
      const mergedGames = [...defaultGames, ...gamesData.filter(game => !defaultGames.some(defaultGame => defaultGame.id === game.id))];

      setGames(mergedGames);
    }

    function initializeGames() {
      const data = localStorage.getItem("games");

      // Initialize localStorage if it doesn't exist
      if (!data) {
        localStorage.setItem("games", JSON.stringify([])); // Start with an empty array
      }
    }

    function getDefaultGames() {
      return [
        {
          id: "1",
          gameName: "Cards Against Humanity",
          timeOfPlay: "30",
          minPlayers: 4,
          maxPlayers: 30,
          difficulty: 1,
          image: "https://thegiftstudio.com/cdn/shop/files/IMG_9973.jpg?v=1683095513&width=1445",
          store: "Vestergade",
          shelfSpace: "B4",
        },
        {
          id: "2",
          gameName: "Mastermind 44",
          timeOfPlay: "20-45",
          minPlayers: 4,
          maxPlayers: 4,
          difficulty: 2,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJqkn7l-lF9W5cmNPaomcexM6UvEkNBmfdg&s",
          store: "Vestergade",
          shelfSpace: "A1",
        },
        {
          id: "3",
          gameName: "Partners",
          timeOfPlay: "60",
          minPlayers: 2,
          maxPlayers: 4,
          difficulty: 1,
          image: "https://cdn2.momjunction.com/wp-content/uploads/2018/07/Balloon-Couple-Games.jpg.webp",
          store: "Aalborg",
          shelfSpace: "I2",
        },
      ];
    }
  }, []);

  return (
    <div className="page">
      <section className="grid">
        {games.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </section>
    </div>
  );
}