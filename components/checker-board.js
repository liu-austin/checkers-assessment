import Cell from './cell';
import {useState} from 'react';

export default function CheckerBoard({ size }) {
    let rows = new Array(size).fill(0);
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
                                            <Cell key={j} color={i % 2 + j % 2}/>
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
  