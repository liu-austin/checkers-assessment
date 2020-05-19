// jshint esversion:6
import {useState, useEffect} from 'react';
import CheckerBoard from './checker-board';

export default function GameContainer() {
    const [number, changeNumber] = useState(8);
    return (
      <div className="game-container">
        <label htmlFor="input_number"><strong>Enter Board Size:</strong></label>
        <input name="input_number" type="number" value={number} onChange={(e) => {changeNumber(e.target.value);}}/>
        <CheckerBoard size={Number(number)}/>
        <style jsx>{`
          .game-container {
            display: inline-block;
          }
          input {
            font: 13px Helvetica, Arial;
            margin: 10px 0;
            text-align: center;
            margin-bottom: 50px;
          }
          label {
              display: block;
          }
        `}</style>
      </div>
    )
  }