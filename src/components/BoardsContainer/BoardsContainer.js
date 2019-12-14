import './BoardsContainer.scss';
import React from 'react';
// import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';

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
    return (<div>{this.state.boards.map((board) => <h6>{board.name}</h6>)}</div>);
  }
}

export default BoardsContainer;
