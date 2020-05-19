import GamePiece from './game-piece';

export default function Cell({ color, filled, colorset, shapeset, memoizedHandleClick, col, row, selectedPiece }) {
    return (
      <td onClick={() => {
        memoizedHandleClick(row, col);
    }} className={color % 2 ? 'white' : 'black'}>
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