import Cell from './cell';
import {useState, useEffect, useCallback} from 'react';

export default function CheckerBoard({ size, colorset, shapeset }) {
    let resize = size;
    let rows = new Array(resize).fill(0);
    let pieceRowsPerSide = Math.floor(Math.min(2, resize / 2));
    const [selectedRow, changeSelectedRow] = useState(null);
    const [selectedCol, changeSelectedCol] = useState(null);
    const [rowToMoveTo, changeRowToMoveTo] = useState(null);
    const [colToMoveTo, changeColToMoveTo] = useState(null);
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

    const [previousSelectedRow, changePreviousSelectedRow] = useState(null);
    const [previousSelectedCol, changePreviousSelectedCol] = useState(null);
    const [validMoveRow1, changeValidMoveRow1] = useState(null);
    const [validMoveCol1, changeValidMoveCol1] = useState(null);
    const [validMoveRow2, changeValidMoveRow2] = useState(null);
    const [validMoveCol2, changeValidMoveCol2] = useState(null);
    const [selectedSide, changeSelectedSide] = useState(null);

    const movePiece = useCallback((moveToRow, moveToCol) => {
            if (Number(previousSelectedRow) === Number(selectedRow) && Number(previousSelectedCol) === Number(selectedCol)) {
                alert('Same piece cannot make consecutive moves.');
            } else {
                changePreviousSelectedRow(moveToRow);
                changePreviousSelectedCol(moveToCol);
                let currentPosition = positions;
                currentPosition[moveToRow][moveToCol] = selectedSide;
                currentPosition[selectedRow][selectedCol] = 0;
                changePositions(currentPosition);
                // changeSelectedRow(null);
                // changeSelectedCol(null);
                console.log(positions)
                changeValidMoveRow1(null);
                changeValidMoveRow2(null);
                changeValidMoveCol1(null);
                changeValidMoveCol2(null);
            }
    });

    // reset if board size changes
    useEffect(() => {
        changeSelectedRow(null);
        changeSelectedCol(null);
        changeValidMoveRow1(null);
        changeValidMoveRow2(null);
        changeValidMoveCol1(null);
        changeValidMoveCol2(null);
    }, [size]);

    // find cells that can be moved into
    const memoizedHandleClick = useCallback(
        (clickedRow, clickedCol, side, currentGrid) => {
          changeSelectedRow(Number(clickedRow));
          changeSelectedCol(Number(clickedCol));
          changeSelectedSide(Number(side));
            if (Number(side) === 2) {
                console.log(Number(clickedRow) + 1 < size && Number(clickedCol) - 1 >= 0 && !currentGrid[Number(clickedRow) + 1][Number(clickedCol) - 1])
                if (Number(clickedRow) + 1 < size && Number(clickedCol) - 1 >= 0 && !currentGrid[Number(clickedRow) + 1][Number(clickedCol) - 1]) {
                    changeValidMoveRow1(Number(clickedRow) + 1);
                    changeValidMoveCol1(Number(clickedCol) - 1);
                } else {
                    changeValidMoveRow1(null);
                    changeValidMoveCol1(null);
                }
                console.log(Number(clickedRow) + 1 < size && Number(clickedCol) + 1 < size && Number(clickedRow) + 1 < size && !currentGrid[Number(clickedRow) + 1][Number(clickedCol) + 1])
                if (Number(clickedRow) + 1 < size && Number(clickedCol) + 1 < size && Number(clickedRow) + 1 < size && !currentGrid[Number(clickedRow) + 1][Number(clickedCol) + 1]) {
                    changeValidMoveRow2(Number(clickedRow) + 1);
                    changeValidMoveCol2(Number(clickedCol) + 1);
                } else {
                    changeValidMoveRow2(null);
                    changeValidMoveCol2(null);
                }
            } else if (Number(side) === 1) {
                console.log(Number(clickedRow) - 1 >= 0 && Number(clickedCol) + 1 < size && !currentGrid[Number(clickedRow) - 1][Number(clickedCol) + 1])
                if (Number(clickedRow) - 1 >= 0 && Number(clickedCol) + 1 < size && !currentGrid[Number(clickedRow) - 1][Number(clickedCol) + 1]) {
                    changeValidMoveRow1(Number(clickedRow) - 1);
                    changeValidMoveCol1(Number(clickedCol) + 1);
                } else {
                    changeValidMoveRow1(null);
                    changeValidMoveCol1(null);
                }
                console.log(Number(clickedRow) - 1 >= 0 && Number(clickedCol) - 1 >= 0 && Number(clickedRow) + 1 < size && !currentGrid[Number(clickedRow) - 1][Number(clickedCol) + 1])
                if (Number(clickedRow) - 1 >= 0 && Number(clickedCol) - 1 >= 0 && Number(clickedRow) + 1 < size && !currentGrid[Number(clickedRow) - 1][Number(clickedCol) - 1]) {
                    changeValidMoveRow2(Number(clickedRow) - 1);
                    changeValidMoveCol2(Number(clickedCol) - 1);
                } else {
                    changeValidMoveRow2(null);
                    changeValidMoveCol2(null);
                }
            }
        },
        [], // Tells React to memoize regardless of arguments.
      );

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
                                            <Cell movePiece={movePiece} validMove={((validMoveRow1 === i && validMoveCol1 === j) || (validMoveRow2 === i && validMoveCol2 === j)) ? true : false} positions={positions} selectedPiece={(Number(i) === selectedRow && Number(j) === selectedCol) ? true: false} col={j} row={i} memoizedHandleClick={memoizedHandleClick} colorset={colorset} shapeset={shapeset} key={j} filled={positions[i] ? positions[i][j] : 0} color={i % 2 + j % 2}/>
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
  