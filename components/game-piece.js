export default function GamePiece({ color, colorset, shape, selectedPiece }) {
    let color1;
    let color2;
    if (colorset === 0) {
      color1 = "red-piece";
      color2 = "black-piece";
    } else if (colorset === 1) {
      color1 = "blue-piece";
      color2 = "orange-piece";
    } else {
      color1 = "purple-piece";
      color2 = "green-piece";
    }
    let selected = selectedPiece ? 'highlighted' : '';
    let pieceColor = color === 2 ? color1 : color2;
    let pieceShape = shape === 1 ? "square" : "circular";
    return (
      <div className={pieceColor + " game-piece " + pieceShape + " " + selected}>
        <style jsx>{`
           {
            .highlighted {
                border: 3px solid rgba(250, 235, 39, 1);
            }
            .game-piece {
              width: 75px;
              height: 75px;
              margin: 0 auto;
            }
            .red-piece {
              background-color: red;
            }
  
            .black-piece {
              background-color: black;
            }
            .blue-piece {
              background-color: blue;
            }
  
            .orange-piece {
              background-color: orange;
            }
            .purple-piece {
              background-color: purple;
            }
  
            .green-piece {
              background-color: green;
            }
  
            .square {
              border-radius: 10%;
            }
  
            .circular {
              border-radius: 50%;
            }
          }
        `}</style>
      </div>
    );
  }
  