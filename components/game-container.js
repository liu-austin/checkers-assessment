// jshint esversion:6
import { useState, useEffect, useCallback } from "react";
import CheckerBoard from "./checker-board";
import axios from 'axios';

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

  // const affectSize = useCallback((n) => {
  //   console.log('changed size')
  //   changeNumber(n);
  // }, [])

//   const retrieveSize= function() {
//     axios.get(`http://localhost:1128/size`, {}).then(results => {
//         console.log(results.data)
//         if (results.data[0]) {
//             console.log('working')
//           changeNumber(results.data[0].size);
//         } 
//         axios.delete(`http://localhost:1128/size`, {}).then(() => console.log('delete after refresh')).catch(err1 => console.log(err1));
//       }).catch(err => console.log(err));
// }

//     useEffect(() => {
//         retrieveSize();
//     }, []);
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
            axios.delete(`http://localhost:1128/board`, {}).then(() => {
                axios.delete(`http://localhost:1128/size`, {}).then(() => console.log('deleted previous board')).catch(err => console.log(err));
            }).catch(err => console.log(err));
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
        <label htmlFor="yellow-green">Purple / Green</label>
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
