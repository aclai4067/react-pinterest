import './BoardsContainer.scss';
import React from 'react';
import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      }).catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getBoards();
  }

  addBoard = (boardObj) => {
    boardData.newBoard(boardObj)
      .then(() => {
        this.getBoards();
      }).catch((err) => console.error(err));
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
      <div>
        <BoardForm addNewBoard={this.addBoard} />
        <div className="row d-flex flex-wrap justify-content-around">
          {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} />)}
        </div>
      </div>
    );
  }
}

export default BoardsContainer;
