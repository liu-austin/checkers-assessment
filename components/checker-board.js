import Cell from './cell';
import {useState, useEffect} from 'react';

export default function CheckerBoard({ size, colorset, shapeset }) {
    let resize = size;
    let rows = new Array(resize).fill(0);
    let pieceRowsPerSide = Math.floor(Math.min(2, resize / 2));

    let initialPosition = [];

    for (let i = 0; i < resize; i++) {
        if (i < pieceRowsPerSide) {
            initialPosition.push(new Array(resize).fill(2));
        } else if (i >= size - pieceRowsPerSide) {
            initialPosition.push(new Array(resize).fill(1));
        } else {
            initialPosition.push(new Array(resize).fill(0));
        }
    }

    const [positions, changePositions] = useState(initialPosition);
    useEffect(() => {
        let initialPosition = [];
        for (let i = 0; i < resize; i++) {
            if (i < pieceRowsPerSide) {
                initialPosition.push(new Array(resize).fill(2));
            } else if (i >= size - pieceRowsPerSide) {
                initialPosition.push(new Array(resize).fill(1));
            } else {
                initialPosition.push(new Array(resize).fill(0));
            }
        }
        changePositions(initialPosition);
    }, [size]);
    return (
      <>
        <table className="checker-board">
            <tbody>
            {
                size ? 
                (
                    rows.map((row, i) => {
                        return (
                            <tr key={i}>
                            {
                                size ? 
                                    (
                                        rows.map((cell, j) => {return (
                                            <Cell colorset={colorset} shapeset={shapeset} key={j} filled={positions[i] ? positions[i][j] : 0} color={i % 2 + j % 2}/>
                                        );
                                    })
                                    ) 
                                    : 
                                    (
                                        null
                                    )
                            }
                            </tr>
                        );
                    })
                ) 
                : 
                (
                    null
                )
            }
            </tbody>
        </table>
        <style jsx>{`
        table {
            border-spacing: 0px;
        }

        .checker-board {
            text-align: center;
        }
        `}</style>
      </>
    )
}
  