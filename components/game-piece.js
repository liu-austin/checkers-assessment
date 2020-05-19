export default function GamePiece({ color, shape }) {
    let pieceColor = color === 2 ? 'red-piece' : 'black-piece';
    return (
      <div className={pieceColor + ' game-piece circular ' + shape}>
        <style jsx>{`
           {
            .game-piece {
                z-index: 1;
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

            .circular {
                border-radius: 50%;
            }
          }
        `}</style>
      </div>
    )
  }