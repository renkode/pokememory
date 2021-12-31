import "../App.css";
import React, { memo } from "react";

const PokemonCard = (props) => {
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div
      className="card"
      onClick={() => {
        props.attemptToCatch(props.pokemon);
      }}
    >
      <img
        width="100%"
        src={props.pokemon.sprites.front_default}
        alt={props.pokemon.name}
      />
      <span className="name">{capitalize(props.pokemon.name)}</span>
    </div>
  );
};

export default memo(PokemonCard);
