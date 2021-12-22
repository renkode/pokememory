import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function getRandomInt(max) {
  // between 1 and max (inclusive of both)
  return Math.ceil(Math.random() * max);
}

function generateIds(slots, range) {
  let ids = [];
  while (ids.length < slots) {
    let id = getRandomInt(range);
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

function App() {
  const [score, setScore] = useState(0);
  const [slots, setSlots] = useState(6);
  const [pokemon, setPokemon] = useState([]);

  async function fetchPokemon() {
    const ids = generateIds(slots, 898);
    let promises = [];

    ids.forEach((id) => {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    Promise.all(promises).then((responses) => {
      setPokemon([...responses.map((response) => response.data)]);
    });
  }

  function resetPokemon() {
    setScore(0);
    setPokemon([]);
    fetchPokemon();
  }

  function shufflePokemon() {
    let arr = [...pokemon];
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    setPokemon(arr);
  }

  function gameOver() {
    setScore(0);
    resetPokemon();
  }

  function attemptToCatch(pokemon) {
    if (pokemon.caught) {
      gameOver();
    } else {
      pokemon.caught = true;
      setScore(score + 1);
      shufflePokemon();
    }
  }

  function handleChange(e) {
    setSlots(e.target.value);
  }

  // fetch pokemon on component mount
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <div>Score: {score}</div>
      <label for="cards">Number of Pokemon:</label>
      <select name="cards" id="cards" onChange={handleChange}>
        <option value="6" selected>
          6
        </option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>
      <button onClick={resetPokemon}>Reset</button>

      <div className="poke-wrapper">
        {pokemon.map((mon, index) => {
          return (
            <PokemonCard
              key={index}
              pokemon={mon}
              attemptToCatch={attemptToCatch}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
