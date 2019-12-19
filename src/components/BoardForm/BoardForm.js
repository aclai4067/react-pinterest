import './BoardForm.scss';
import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardShape from '../../helpers/propz/boardShape';

class BoardForm extends React.Component {
  static propTypes = {
    addNewBoard: PropTypes.func,
    editMode: PropTypes.bool,
    boardToEdit: boardShape.boardShape,
  }

  state = {
    boardName: '',
    boardDescription: '',
  }

  componentDidMount() {
    const { boardToEdit, editMode } = this.props;
    if (editMode) {
      this.setState({ boardName: boardToEdit.name, boardDescription: boardToEdit.description });
    }
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    const saveNewBoard = this.props.addNewBoard;
    const newBoardObj = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    saveNewBoard(newBoardObj);
    this.setState({ boardName: '', boardDescription: '' });
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  render() {
    const { editMode } = this.props;

    return (
      <form className='col-6 offset-3 BoardForm'>
        <div className="form-group">
          <label htmlFor="order-name">Board Name:</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter board name"
            value={this.state.boardName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-name">Board Description:</label>
          <input
            type="text"
            className="form-control"
            id="board-description"
            placeholder="Enter board description"
            value={this.state.boardDescription}
            onChange={this.descriptionChange}
          />
        </div>
        {
          (!editMode) ? (<button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Board</button>)
            : (<button className="btn btn-outline-secondary" onClick={() => {}}>Update Board</button>)
        }
      </form>
    );
  }
}

export default BoardForm;
