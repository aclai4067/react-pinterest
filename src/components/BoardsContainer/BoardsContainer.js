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
    editMode: false,
    boardToEdit: {},
    displayBoardForm: false,
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
        this.setState({ displayBoardForm: false });
      }).catch((err) => console.error(err));
  }

  editBoard = (boardId, newBoardObj) => {
    boardData.updateBoard(boardId, newBoardObj)
      .then(() => {
        this.getBoards();
        this.setState({ editMode: false, displayBoardForm: false });
      }).catch((err) => console.error(err));
  }

  changeEditMode = (editMode) => {
    this.setState({ editMode, displayBoardForm: true });
  }

  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  showBoardForm = () => {
    this.setState({ displayBoardForm: true });
  }

  render() {
    const { setSingleBoard } = this.props;

    return (
      <div>
        {
          (this.state.displayBoardForm) ? (<BoardForm addNewBoard={this.addBoard} editBoard={this.editBoard} boardToEdit={this.state.boardToEdit} editMode={this.state.editMode} />)
            : (<button onClick={this.showBoardForm} className="btn btn-warning mt-2">Show Board Form</button>)
        }
        <div className="row d-flex flex-wrap justify-content-around">
          {this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} changeEditMode={this.changeEditMode} setBoardToEdit={this.setBoardToEdit} />)}
        </div>
      </div>
    );
  }
}

export default BoardsContainer;
