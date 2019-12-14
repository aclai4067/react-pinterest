import './Board.scss';
import React from 'react';
import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const myBoard = this.props.board;

    return (
      <div className="Board col-4 p-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{myBoard.name}</h5>
            <p className="card-text">{myBoard.description}</p>
            <button className="btn btn-primary">View Pins</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
