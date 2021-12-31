import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerationInput from "./components/GenerationInput";
import LoadingCard from "./components/LoadingCard";
import PokemonCard from "./components/PokemonCard";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function findMinAndMax(arr) {
  let min = 898;
  let max = 1;
  for (let i = 0; i < arr.length; i++) {
    if (min > arr[i].min) min = arr[i].min;
    if (max < arr[i].max) max = arr[i].max;
  }
  console.log(`min:  ${min}, max: ${max}`);
  return { min, max };
}

function App() {
  const [pokeballs, setPokeballs] = useState(6);
  const [slots, setSlots] = useState(6);
  const [pokemon, setPokemon] = useState([]);
  const [generations, setGenerations] = useState([
    { generation: 1, min: 1, max: 151 },
    { generation: 2, min: 152, max: 251 },
    { generation: 3, min: 252, max: 386 },
    { generation: 4, min: 387, max: 493 },
    { generation: 5, min: 494, max: 649 },
    { generation: 6, min: 650, max: 721 },
    { generation: 7, min: 722, max: 809 },
    { generation: 8, min: 810, max: 898 },
  ]);
  const [loading, setLoading] = useState(true);

  function isInGenerationsRange(num) {
    let isIncluded = false;
    generations.forEach((gen) => {
      if (num >= gen.min && num <= gen.max) isIncluded = true;
    });
    return isIncluded;
  }

  function generateIds(slots, min, max) {
    let ids = [];
    while (ids.length < slots) {
      let id = getRandomIntInclusive(min, max);
      if (!ids.includes(id) && isInGenerationsRange(id)) ids.push(id);
    }
    return ids;
  }

  async function fetchPokemon() {
    const idRange = findMinAndMax(generations);
    const ids = generateIds(slots, idRange.min, idRange.max);
    let promises = [];

    ids.forEach((id) => {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    // promise.all does not directly return data
    Promise.all(promises).then((responses) => {
      setPokemon([...responses.map((response) => response.data)]);
      setLoading(false);
    });
  }

  function resetPokemon() {
    setLoading(true);
    setPokeballs(slots);
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
    setPokeballs(slots);
    resetPokemon();
  }

  function attemptToCatch(mon) {
    if (mon.caught) {
      gameOver();
    } else {
      mon.caught = true;
      setPokeballs(pokeballs - 1);
      shufflePokemon();
    }
  }

  function handleChange(e) {
    setSlots(e.target.value);
  }

  function toggleGeneration(gen) {
    if (generations.some((g) => g.generation === gen.generation)) {
      setGenerations(
        generations.filter((g) => g.generation !== gen.generation)
      );
    } else {
      setGenerations([...generations, gen]);
    }
  }

  // fetch pokemon on component mount
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <GenerationInput toggleGeneration={toggleGeneration} />

      <div>Pokeballs Left: {pokeballs}</div>
      <label htmlFor="cards">Number of Pokemon:</label>
      <select name="cards" id="cards" onChange={handleChange}>
        <option value="6" defaultValue>
          6
        </option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>
      <button onClick={resetPokemon}>Reset</button>

      <div className="poke-wrapper">
        {loading &&
          Array.from({ length: slots }).map((_, index) => (
            <LoadingCard key={index} />
          ))}

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