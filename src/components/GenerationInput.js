import "../App.css";
import React from "react";

const GenerationInput = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        name="gen1"
        onClick={() =>
          props.toggleGeneration({ generation: 1, min: 1, max: 151 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen1"> Gen 1 (RBGY)</label>

      <input
        type="checkbox"
        name="gen2"
        onClick={() =>
          props.toggleGeneration({ generation: 2, min: 152, max: 251 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen2"> Gen 2 (GSC)</label>

      <input
        type="checkbox"
        name="gen3"
        onClick={() =>
          props.toggleGeneration({ generation: 3, min: 252, max: 386 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen3"> Gen 3 (RSE)</label>

      <input
        type="checkbox"
        name="gen4"
        onClick={() =>
          props.toggleGeneration({ generation: 4, min: 387, max: 493 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen4"> Gen 4 (DPPl)</label>

      <input
        type="checkbox"
        name="gen5"
        onClick={() =>
          props.toggleGeneration({ generation: 5, min: 494, max: 649 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen5"> Gen 5 (BW/BW2)</label>

      <input
        type="checkbox"
        name="gen6"
        onClick={() =>
          props.toggleGeneration({ generation: 6, min: 650, max: 721 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen6"> Gen 6 (XY)</label>

      <input
        type="checkbox"
        name="gen7"
        onClick={() =>
          props.toggleGeneration({ generation: 7, min: 722, max: 809 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen7"> Gen 7 (SM/USUM)</label>

      <input
        type="checkbox"
        name="gen8"
        onClick={() =>
          props.toggleGeneration({ generation: 8, min: 810, max: 898 })
        }
        defaultChecked="true"
      />
      <label htmlFor="gen8"> Gen 8 (SwSh)</label>
    </div>
  );
};

export default GenerationInput;
