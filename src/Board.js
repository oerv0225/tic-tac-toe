import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

class Board extends Component {
    constructor (props) {
        super(props);

        this.state = {
            board: Array.from(Array(3), () => new Array(3)),
            start: Math.floor(Math.random() * Math.floor(2)),
            winner: 'not yet',
        }
    }

    updateBoard = (i, j) => {
        const { board, start } = this.state;

        board[i][j] = (start === 0) ? 'O' : 'X';
        this.setState({ board: board})
        this.setState({ start: (start === 0) ? 1 : 0 });
        this.findWinner();
    }

    findWinner = () => {
        const { board } = this.state;
        const saved_this = this;

        ['O', 'X'].forEach(function(item) {
            for (var i = 0; i<= 2; i++) {
                if (board[i][0] === item && board[i][1] === item && board[i][2] === item ) {
                    saved_this.setState({ winner: item });
                    return;
                }
                else if (board[0][i] === item && board[1][i] === item && board[2][i] === item ) {
                    saved_this.setState({ winner: item });
                    return;
                }
            }

            if (board[0][0] === item && board[1][1] === item && board[2][2] === item ) {
                saved_this.setState({ winner: item });
                return;
            }
            else if (board[0][2] === item && board[1][1] === item && board[2][0] === item ) {
                saved_this.setState({ winner: item });
                return;
            }
        });
    }

    render () {
        const { board, start, winner } = this.state;
        return (
            <div>
            <Table style={{width: 200 }}>
                <TableBody>
                    { board.map((row, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.updateBoard(i, 0)}
                                            disabled={(winner === 'X' || winner === 'O') ? 'disabled' : '' }>{row[0]}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.updateBoard(i, 1)}
                                            disabled={(winner === 'X' || winner === 'O') ? 'disabled' : '' }>{row[1]}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.updateBoard(i, 2)}
                                            disabled={(winner === 'X' || winner === 'O') ? 'disabled' : '' }>{row[2]}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
            It's { (start === 0) ? '0' : 'X' }'s turn <br></br>
            Winner: { winner }
            </div>
        )
    }
}

export default Board;