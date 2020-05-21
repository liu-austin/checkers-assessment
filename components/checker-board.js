import Cell from "./cell";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function CheckerBoard({  size, colorset, shapeset }) {
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
    if (
      Number(previousSelectedRow) === Number(selectedRow) &&
      Number(previousSelectedCol) === Number(selectedCol)
    ) {
      alert("Same piece cannot make consecutive moves.");
    } else {
      changePreviousSelectedRow(moveToRow);
      changePreviousSelectedCol(moveToCol);
      let currentPosition = positions;
      currentPosition[moveToRow][moveToCol] = selectedSide;
      currentPosition[selectedRow][selectedCol] = 0;
      changePositions(currentPosition);
      // changeSelectedRow(null);
      // changeSelectedCol(null);
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
        if (
          Number(clickedRow) + 1 < size &&
          Number(clickedCol) - 1 >= 0 &&
          !currentGrid[Number(clickedRow) + 1][Number(clickedCol) - 1]
        ) {
          changeValidMoveRow1(Number(clickedRow) + 1);
          changeValidMoveCol1(Number(clickedCol) - 1);
        } else {
          changeValidMoveRow1(null);
          changeValidMoveCol1(null);
        }
        if (
          Number(clickedRow) + 1 < size &&
          Number(clickedCol) + 1 < size &&
          Number(clickedRow) + 1 < size &&
          !currentGrid[Number(clickedRow) + 1][Number(clickedCol) + 1]
        ) {
          changeValidMoveRow2(Number(clickedRow) + 1);
          changeValidMoveCol2(Number(clickedCol) + 1);
        } else {
          changeValidMoveRow2(null);
          changeValidMoveCol2(null);
        }
      } else if (Number(side) === 1) {
        if (
          Number(clickedRow) - 1 >= 0 &&
          Number(clickedCol) + 1 < size &&
          !currentGrid[Number(clickedRow) - 1][Number(clickedCol) + 1]
        ) {
          changeValidMoveRow1(Number(clickedRow) - 1);
          changeValidMoveCol1(Number(clickedCol) + 1);
        } else {
          changeValidMoveRow1(null);
          changeValidMoveCol1(null);
        }
        if (
          Number(clickedRow) - 1 >= 0 &&
          Number(clickedCol) - 1 >= 0 &&
          Number(clickedRow) + 1 < size &&
          !currentGrid[Number(clickedRow) - 1][Number(clickedCol) - 1]
        ) {
          changeValidMoveRow2(Number(clickedRow) - 1);
          changeValidMoveCol2(Number(clickedCol) - 1);
        } else {
          changeValidMoveRow2(null);
          changeValidMoveCol2(null);
        }
      }
    },
    [] // Tells React to memoize regardless of arguments.
  );

  const [positions, changePositions] = useState(initialPosition);

  useEffect(() => {
    let initialPosition1 = [];
    for (let i = 0; i < resize; i++) {
      if (i < pieceRowsPerSide) {
        initialPosition1.push(new Array(resize).fill(2));
      } else if (i >= size - pieceRowsPerSide) {
        initialPosition1.push(new Array(resize).fill(1));
      } else {
        initialPosition1.push(new Array(resize).fill(0));
      }
    }
    changePositions(initialPosition1);
  }, [size]);

  const saveBoard = function () {
    alert("Note: Changing board size will clear what is stored in database");
    // axios
    //   .delete("http://localhost:1128/size", {})
    //   .then(() => {
        axios
          .delete(`http://localhost:1128/board`, {})
          .then(() => {
            axios
              .post("http://localhost:1128/board", {
                boardInfo: positions
              })
              .then(() => {
                //   axios.post(`http://localhost:1128/size`, {
                //       size: size
                //   }).then((res) => console.log("test")).catch(prob1 => console.log(prob1));
              })
              .catch(err => console.log(err));
          })
          .catch(error => console.log(error));
    //   })
    //   .catch(prob => console.log(prob));
  };

  const retrieveBoard = function () {
    axios
      .get(`http://localhost:1128/board`, {})
      .then(results => {
        if (results.data[0]) {
          changePositions(results.data[0].boardInfo);
          // affectSize(results.data[0].length);
        }
        axios
          .delete(`http://localhost:1128/board`, {})
          .then(() => {
            // axios
            //   .delete(`http://localhost:1128/size`, {})
            //   .then(() => console.log("delete after refresh"))
            //   .catch(err2 => console.log(err2));
          })
          .catch(err1 => console.log(err1));
      })
      .catch(err => console.log(err));
  };

  const resetBoard = function () {
    axios
      .delete(`http://localhost:1128/board`, {})
      .then(() => {
        let initialPosition2 = [];
        for (let i = 0; i < resize; i++) {
          if (i < pieceRowsPerSide) {
            initialPosition2.push(new Array(resize).fill(2));
          } else if (i >= size - pieceRowsPerSide) {
            initialPosition2.push(new Array(resize).fill(1));
          } else {
            initialPosition2.push(new Array(resize).fill(0));
          }
        }
        changePositions(initialPosition2);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    retrieveBoard();
  }, []);

  return (
    <>
      <div className="bottom-button-container">
        <button onClick={saveBoard}>Save</button>
        <button onClick={resetBoard}>Reset</button>
      </div>
      <table className="checker-board">
        <tbody>
          {size
            ? rows.map((row, i) => {
                return (
                  <tr key={i}>
                    {size
                      ? rows.map((cell, j) => {
                          return (
                            <Cell
                              movePiece={movePiece}
                              validMove={
                                (validMoveRow1 === i && validMoveCol1 === j) ||
                                (validMoveRow2 === i && validMoveCol2 === j)
                                  ? true
                                  : false
                              }
                              positions={positions}
                              selectedPiece={
                                Number(i) === selectedRow &&
                                Number(j) === selectedCol
                                  ? true
                                  : false
                              }
                              col={j}
                              row={i}
                              memoizedHandleClick={memoizedHandleClick}
                              colorset={colorset}
                              shapeset={shapeset}
                              key={j}
                              filled={positions[i] ? positions[i][j] : 0}
                              color={(i % 2) + (j % 2)}
                            />
                          );
                        })
                      : null}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <style jsx>{`
        button {
          cursor: pointer;
          width: 150px;
          height: 50px;
          margin: 0 20px;
        }
        button:hover {
          color: white;
          background-color: black;
        }
        .bottom-button-container {
          margin: 20px 0;
        }
        table {
          border-spacing: 0px;
        }

        .checker-board {
          text-align: center;
        }
      `}</style>
    </>
  );
}
