import './BoardsContainer.scss';
import React from 'react';
// import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import Board from '../Board/Board';

class BoardsContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      }).catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="row d-flex flex-wrap justify-content-around">
        {this.state.boards.map((board) => <Board key={board.id} board={board} />)}
      </div>
    );
  }
}

export default BoardsContainer;
