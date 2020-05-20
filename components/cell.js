import GamePiece from './game-piece';

export default function Cell({ movePiece, validMove, positions, color, filled, colorset, shapeset, memoizedHandleClick, col, row, selectedPiece }) {
    return (
      <td onClick={() => {
          if (validMove) {
            movePiece(row, col)
          } else {
            memoizedHandleClick(row, col, filled);
          }
    }} className={validMove ? 'valid' : color % 2 ? 'white' : 'black'}>
      {
          selectedPiece
      }
      {
          filled ? 
          (
            <GamePiece selectedPiece={selectedPiece} colorset={colorset} shape={shapeset} color={filled}/>
          ) 
          : 
          (
              null
          )
      }
        <style jsx>{`
        td {
            height: 100px;
            width: 100px;
            padding: 0px;
        }

        .valid {
            background-color: #5fdde5;
            border: 1px solid #5fdde5;
        }

        .white {
            border: 1px solid lightgray;
            background-color: lightgray;
        }

        .black {
            border: 1px solid gray;
            background-color: gray;
        }
        `}</style>
      </td>
    )
  }