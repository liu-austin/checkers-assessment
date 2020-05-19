import GamePiece from './game-piece';

export default function Cell({ color, filled, colorset, shapeset }) {
    return (
      <td className={color % 2 ? 'white' : 'black'}>
      {
          filled ? 
          (
            <GamePiece colorset={colorset} shape={shapeset} color={filled}/>
          ) 
          : 
          (
              null
          )
      }
        <style jsx>{`
        td {
            z-index: 0;
            height: 100px;
            width: 100px;
            padding: 0px;
        }

        .white {
            border: 1px solid gray;
            background-color: white;
        }

        .black {
            border: 1px solid gray;
            background-color: gray;
        }
        `}</style>
      </td>
    )
  }