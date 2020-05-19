export default function Cell({ color }) {
    return (
      <td className={color % 2 ? 'white' : 'black'}>
        <style jsx>{`
        td {
            z-index: 0;
            height: 100px;
            width: 100px;
            padding: 0px;
        }

        .white {
            border: 1px solid black;
            background-color: white;
        }

        .black {
            border: 1px solid black;
            background-color: black;
        }
        `}</style>
      </td>
    )
  }