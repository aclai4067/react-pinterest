import './Board.scss';
import React from 'react';
import PropTypes from 'prop-types';
import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func,
    changeEditMode: PropTypes.func,
    setBoardToEdit: PropTypes.func,
  }

  //  event to view single board
  setSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard, board } = this.props;
    setSingleBoard(board.id);
  };

  setEditMode = (e) => {
    const { changeEditMode, setBoardToEdit, board } = this.props;
    e.preventDefault();
    changeEditMode(true);
    setBoardToEdit(board);
  }

  render() {
    const myBoard = this.props.board;

    return (
      <div className="Board col-4 p-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{myBoard.name}</h5>
            <p className="card-text">{myBoard.description}</p>
            <button onClick={this.setSelectedBoardId} className="btn btn-info">View Pins</button>
            <button onClick={this.setEditMode} className="btn btn-secondary">Edit Board</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
