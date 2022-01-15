import "../App.css";
import React, { memo } from "react";
import GenerationInput from "./GenerationInput";

const Options = (props) => {
  return (
    <div>
      <GenerationInput
        generations={props.generations}
        toggleGeneration={props.toggleGeneration}
      />

      <label htmlFor="slots">
        <h4 style={{ marginTop: "4px", marginBottom: "4px" }}>
          Number of Pokemon:
        </h4>
      </label>
      <select
        id="slots"
        defaultValue={props.slots}
        onChange={props.handleSlots}
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>

      <h4 style={{ marginTop: "4px", marginBottom: "4px" }}>Miscellaneous:</h4>
      <div style={{ marginTop: "4px", marginBottom: "4px" }}>
        <input
          type="checkbox"
          id="enableFlip"
          onChange={props.toggleFlipAnimation}
          checked={props.enableFlip}
        />
        <label htmlFor="enableFlip"> Enable flip animation</label>
      </div>

      <div className="buttons">
        <button className="resetBtn" onClick={props.resetPokemon}>
          Reset
        </button>
        <button className="closeBtn" onClick={props.closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default memo(Options);
