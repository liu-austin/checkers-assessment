// jshint esversion:6
import { useState, useEffect } from "react";
import CheckerBoard from "./checker-board";

export default function GameContainer() {
  const [number, changeNumber] = useState(8);
  const [colorset, changeColorSet] = useState(0);
  const [shapeset, changeShapeSet] = useState(0);
  const handleColorClick = function(e) {
    changeColorSet(e.target.value);
  };
  const handleShapeClick = function(e) {
    changeShapeSet(e.target.value);
  };
  return (
    <div className="game-container">
      <label htmlFor="input_number">
        <strong>Enter Board Size:</strong>
      </label>
      <input
        name="input_number"
        type="number"
        value={number}
        onChange={e => {
          changeNumber(e.target.value);
        }}
      />
      <div className="overall-radio-container">
      <div className="multi-container">
      <p>
        <strong>Choose piece colors:</strong>
      </p>
      <div className={"radio-container"}>
      <form>
      <div className={"radio-option"}>
        <input onClick={handleColorClick} type="radio" id="red-black" name="piece-color" value="0" />
        <label htmlFor="red-black">Red / Black</label>
      </div>
      <div className={"radio-option"}>
        <input onClick={handleColorClick} type="radio" id="blue-orange" name="piece-color" value="1" />
        <label htmlFor="blue-orange">Blue / Orange</label>
      </div>
      <div className={"radio-option"}>
        <input onClick={handleColorClick} type="radio" id="yellow-green" name="piece-color" value="2" />
        <label htmlFor="yellow-green">Yellow / Green</label>
      </div>
      </form>
      </div>
      </div>
      <div className="multi-container">
      <p>
        <strong>Choose piece shape:</strong>
      </p>
      <div className={"radio-container"}>
      <form>
      <div className={"radio-option"}>
        <input onClick={handleShapeClick} type="radio" id="circle" name="piece-shape" value="0"/>
        <label htmlFor="circle">Circle Shape</label>
      </div>
      <div className={"radio-option"}>
        <input onClick={handleShapeClick} type="radio" id="square" name="piece-shape" value="1" />
        <label htmlFor="square">Square Shape</label>
      </div>
      </form>
      </div>
      </div>
      </div>
      <CheckerBoard colorset={Number(colorset)} shapeset={Number(shapeset)} size={Number(number)} />
      <style jsx>{`
        .overall-radio-container {
          display: flex;
          justify-content: space-around;
        }
        .radio-container, .multi-container {
          display: inline-block;
        }
        .radio-option {
          display: inline-block;
          margin: 5px 15px;
        }
        .game-container {
          display: inline-block;
        }
        input {
          font: 13px Helvetica, Arial;
          margin: 10px 0;
          text-align: center;
        }
        p {
          font: 15px Helvetica, Arial;
          margin: 10px 0;
          text-align: center;
        }
        label {
          display: block;
        }
      `}</style>
    </div>
  );
}
